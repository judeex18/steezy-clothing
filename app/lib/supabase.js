import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
export async function getProducts() {
  if (!supabase) throw new Error("Supabase not configured");
  const { data, error } = await supabase.from("products").select("*");
  if (error) throw error;
  return data;
}

export async function getProduct(id) {
  if (!supabase) throw new Error("Supabase not configured");
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function saveOrder(orderData, orderItems) {
  if (!supabase) throw new Error("Supabase not configured");

  // Start a transaction by inserting the order first
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert(orderData)
    .select()
    .single();

  if (orderError) throw orderError;

  // Insert order items
  const itemsWithOrderId = orderItems.map((item) => ({
    ...item,
    order_id: order.id,
  }));

  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .insert(itemsWithOrderId);

  if (itemsError) throw itemsError;

  return order;
}

export async function getOrders() {
  if (!supabase) throw new Error("Supabase not configured");
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items (
        id,
        product_id,
        size,
        quantity,
        price,
        products (
          name,
          image_url
        )
      )
    `,
    )
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}
export async function updateOrderStatus(id, status) {
  if (!supabase) throw new Error("Supabase not configured");
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id);
  if (error) throw error;
  return data;
}

export async function createProduct(product) {
  if (!supabase) throw new Error("Supabase not configured");
  const { data, error } = await supabase.from("products").insert(product);
  if (error) throw error;
  return data;
}

export async function updateProduct(id, product) {
  if (!supabase) throw new Error("Supabase not configured");
  const { data, error } = await supabase
    .from("products")
    .update(product)
    .eq("id", id);
  if (error) throw error;
  return data;
}

export async function deleteProduct(id) {
  if (!supabase) throw new Error("Supabase not configured");
  const { data, error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
  return data;
}

export async function uploadProductImage(file) {
  if (!supabase) throw new Error("Supabase not configured");
  const fileName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("products")
    .upload(fileName, file);
  if (error) throw error;
  return data;
}
