import { collection, doc, getDocs, getDoc, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product } from '../types';

export const productService = {
  async getProducts(): Promise<Product[]> {
    try {
      const productsRef = collection(db, 'products');
      const q = query(productsRef, orderBy('created_at', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          price: data.price,
          image: data.image,
          description: data.description,
          category: data.category,
          stock: data.stock,
          created_at: data.created_at instanceof Timestamp 
            ? data.created_at.toDate().toISOString() 
            : data.created_at
        } as Product;
      });
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  },

  async getProductById(id: string): Promise<Product | null> {
    try {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          name: data.name,
          price: data.price,
          image: data.image,
          description: data.description,
          category: data.category,
          stock: data.stock,
          created_at: data.created_at instanceof Timestamp 
            ? data.created_at.toDate().toISOString() 
            : data.created_at
        } as Product;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting product by ID:', error);
      throw error;
    }
  },

  async searchProducts(searchQuery: string, category?: string): Promise<Product[]> {
    try {
      const productsRef = collection(db, 'products');
      const q = query(productsRef);
      
      // Firebase Firestore doesn't support direct text search like SQL's LIKE
      // We'll fetch all products and filter in memory
      const querySnapshot = await getDocs(q);
      
      let products = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          price: data.price,
          image: data.image,
          description: data.description,
          category: data.category,
          stock: data.stock,
          created_at: data.created_at instanceof Timestamp 
            ? data.created_at.toDate().toISOString() 
            : data.created_at
        } as Product;
      });
      
      // Filter by search query
      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        products = products.filter(product => 
          product.name.toLowerCase().includes(lowerQuery) || 
          product.description.toLowerCase().includes(lowerQuery)
        );
      }
      
      // Filter by category
      if (category && category !== 'all') {
        products = products.filter(product => product.category === category);
      }
      
      // Sort by created_at (descending)
      products.sort((a, b) => {
        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
        return dateB - dateA;
      });
      
      return products;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }
};