import { collection, doc, addDoc, getDocs, getDoc, updateDoc, query, where, orderBy, Timestamp, serverTimestamp, runTransaction } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Order, OrderFormData, CartItem, Product } from '../types';


export const orderService = {
  async createOrder(orderData: OrderFormData, cartItems: CartItem[]): Promise<string> {
    try {
      const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      // Create the order using a transaction to ensure consistency
      const orderRef = await addDoc(collection(db, 'orders'), {
        customer_name: orderData.customer_name,
        customer_phone: orderData.customer_phone,
        customer_address: orderData.customer_address,
        delivery_notes: orderData.delivery_notes || '',
        total_amount: totalAmount,
        status: 'pending',
        created_at: serverTimestamp()
      });

      // Create order items
      const orderItemsPromises = cartItems.map(item => {
        return addDoc(collection(db, 'order_items'), {
          order_id: orderRef.id,
          product_id: item.id,
          quantity: item.quantity,
          unit_price: item.price,
          created_at: serverTimestamp()
        });
      });

      await Promise.all(orderItemsPromises);
      return orderRef.id;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  async getOrders(): Promise<Order[]> {
    try {
      // Get all orders
      const ordersRef = collection(db, 'orders');
      const q = query(ordersRef, orderBy('created_at', 'desc'));
      const orderSnapshot = await getDocs(q);
      
      const orders = orderSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          customer_name: data.customer_name,
          customer_phone: data.customer_phone,
          customer_address: data.customer_address,
          delivery_notes: data.delivery_notes,
          total_amount: data.total_amount,
          status: data.status,
          created_at: data.created_at instanceof Timestamp 
            ? data.created_at.toDate().toISOString() 
            : data.created_at,
          order_items: []
        } as Order;
      });

      // For each order, get its order items
      const ordersWithItems = await Promise.all(orders.map(async (order) => {
        const orderItemsRef = collection(db, 'order_items');
        const q = query(orderItemsRef, where('order_id', '==', order.id));
        const orderItemsSnapshot = await getDocs(q);
        
        const orderItems = await Promise.all(orderItemsSnapshot.docs.map(async (itemDoc) => {
          const itemData = itemDoc.data();
          
          // Get product details for each order item
          let product: Product | undefined = undefined;
          if (itemData.product_id) {
            const productRef = doc(db, 'products', itemData.product_id);
            const productSnap = await getDoc(productRef);
            if (productSnap.exists()) {
              const productData = productSnap.data();
              product = {
                id: productSnap.id,
                name: productData.name,
                price: productData.price,
                image: productData.image,
                description: productData.description,
                category: productData.category,
                stock: productData.stock,
                created_at: productData.created_at instanceof Timestamp 
                  ? productData.created_at.toDate().toISOString() 
                  : productData.created_at
              };
            }
          }
          
          return {
            id: itemDoc.id,
            order_id: itemData.order_id,
            product_id: itemData.product_id,
            quantity: itemData.quantity,
            unit_price: itemData.unit_price,
            product: product
          };
        }));
        
        return { ...order, order_items: orderItems };
      }));
      
      return ordersWithItems;
    } catch (error) {
      console.error('Error getting orders:', error);
      throw error;
    }
  },

  async updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status });
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

  async deleteOrder(orderId: string): Promise<void> {
    try {
      // Use a transaction to delete the order and its items
      await runTransaction(db, async (transaction) => {
        // Delete order items first
        const orderItemsRef = collection(db, 'order_items');
        const q = query(orderItemsRef, where('order_id', '==', orderId));
        const orderItemsSnapshot = await getDocs(q);
        
        orderItemsSnapshot.docs.forEach(itemDoc => {
          transaction.delete(doc(db, 'order_items', itemDoc.id));
        });
        
        // Then delete the order
        transaction.delete(doc(db, 'orders', orderId));
      });
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  }
};