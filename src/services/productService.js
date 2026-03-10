import { supabase } from '../lib/supabase';

export async function getProducts() {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
}

export async function addProduct(product) {
    const { data, error } = await supabase
        .from('products')
        .insert([{
            name: product.name,
            price: Number(product.price),
            description: product.description,
            category: product.category,
            quantity: Number(product.quantity),
            image: product.image
        }])
        .select();

    if (error) throw error;
    return data[0];
}

export async function updateProduct(id, updates) {
    const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select();

    if (error) throw error;
    return data[0];
}

export async function deleteProduct(id) {
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) throw error;
}

export async function updateQuantity(id, newQty) {
    const { data, error } = await supabase
        .from('products')
        .update({ quantity: newQty })
        .eq('id', id)
        .select();

    if (error) throw error;
    return data[0];
}
