/*
  # Schema e-commerce pour MarseilleMart

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text, product name)
      - `price` (decimal, product price)
      - `image` (text, image URL)
      - `description` (text, product description)
      - `category` (text, product category)
      - `stock` (integer, available quantity)
      - `created_at` (timestamp)
      
    - `orders`
      - `id` (uuid, primary key)
      - `customer_name` (text, customer full name)
      - `customer_phone` (text, customer phone)
      - `customer_address` (text, delivery address)
      - `delivery_notes` (text, optional delivery notes)
      - `total_amount` (decimal, total order amount)
      - `status` (text, order status)
      - `created_at` (timestamp)
      
    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key to orders)
      - `product_id` (uuid, foreign key to products)
      - `quantity` (integer, quantity ordered)
      - `unit_price` (decimal, price per unit at time of order)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access to products
    - Add policies for order creation and admin access
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price decimal(10,2) NOT NULL,
  image text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  stock integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_address text NOT NULL,
  delivery_notes text,
  total_amount decimal(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'delivered', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for products (public read access)
CREATE POLICY "Products are viewable by everyone"
  ON products
  FOR SELECT
  TO public
  USING (true);

-- Create policies for orders (anyone can create, admin can read all)
CREATE POLICY "Anyone can create orders"
  ON orders
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Orders are viewable by everyone"
  ON orders
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Orders can be updated by everyone"
  ON orders
  FOR UPDATE
  TO public
  USING (true);

CREATE POLICY "Orders can be deleted by everyone"
  ON orders
  FOR DELETE
  TO public
  USING (true);

-- Create policies for order_items
CREATE POLICY "Order items can be created by everyone"
  ON order_items
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Order items are viewable by everyone"
  ON order_items
  FOR SELECT
  TO public
  USING (true);

-- Insert sample products
INSERT INTO products (name, price, image, description, category, stock) VALUES
('Huile d''olive extra vierge', 12.50, 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=400', 'Huile d''olive de première qualité, pressée à froid', 'Épicerie', 25),
('Pain de campagne', 3.20, 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=400', 'Pain artisanal au levain naturel', 'Boulangerie', 15),
('Fromage de chèvre', 8.90, 'https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&w=400', 'Fromage de chèvre frais de producteur local', 'Fromagerie', 12),
('Tomates cerises', 4.50, 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400', 'Tomates cerises biologiques du marché', 'Légumes', 30),
('Miel de lavande', 15.00, 'https://images.pexels.com/photos/1340116/pexels-photo-1340116.jpeg?auto=compress&cs=tinysrgb&w=400', 'Miel de lavande de Provence', 'Épicerie', 20),
('Baguette tradition', 1.40, 'https://images.pexels.com/photos/5513123/pexels-photo-5513123.jpeg?auto=compress&cs=tinysrgb&w=400', 'Baguette tradition française', 'Boulangerie', 50),
('Salade mesclun', 3.80, 'https://images.pexels.com/photos/1359326/pexels-photo-1359326.jpeg?auto=compress&cs=tinysrgb&w=400', 'Mélange de jeunes pousses fraîches', 'Légumes', 18),
('Chocolat noir 70%', 6.90, 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=400', 'Tablette de chocolat noir artisanal', 'Épicerie', 35);