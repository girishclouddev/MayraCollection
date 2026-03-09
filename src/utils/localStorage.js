const STORAGE_KEY = 'mayra_products';

const dummyProducts = [
    {
        id: '1',
        name: 'Red Saree',
        price: 2499,
        description: 'Beautiful traditional red saree with gold embroidery. Perfect for special occasions and festivals.',
        category: 'Clothes',
        quantity: 5,
        image: 'https://images.unsplash.com/photo-1610189014168-a4007b8aed35?auto=format&fit=crop&q=80&w=800',
        order: 1
    },
    {
        id: '2',
        name: 'Designer Kurti',
        price: 999,
        description: 'Elegant party wear kurti, comfortable and stylish. Comes with a matching dupatta.',
        category: 'Clothes',
        quantity: 10,
        image: 'https://images.unsplash.com/photo-1583391733958-d20ed31e2d1d?auto=format&fit=crop&q=80&w=800',
        order: 2
    },
    {
        id: '3',
        name: 'Party Dress',
        price: 1999,
        description: 'Stunning western party wear dress. Premium net fabric with intricate detailing.',
        category: 'Clothes',
        quantity: 0,
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
        order: 3
    },
    {
        id: '4',
        name: 'Gold Necklace',
        price: 1499,
        description: 'Premium gold-plated necklace set with matching earrings. Perfect for bridal and party wear.',
        category: 'Jewelry',
        quantity: 3,
        image: 'https://images.unsplash.com/photo-1599643478524-fbeb612262c5?auto=format&fit=crop&q=80&w=800',
        order: 4
    },
    {
        id: '5',
        name: 'Diamond Earrings',
        price: 899,
        description: 'American diamond studded long earrings. Lightweight but gives a heavy look.',
        category: 'Jewelry',
        quantity: 15,
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800',
        order: 5
    },
    {
        id: '6',
        name: 'Bridal Set',
        price: 2999,
        description: 'Complete heavy bridal jewelry set including choker, long necklace, mang tika, and earrings.',
        category: 'Jewelry',
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1601004126154-159caba19dd8?auto=format&fit=crop&q=80&w=800',
        order: 6
    },
    {
        id: '7',
        name: 'Royal Velvet Lehenga',
        price: 8499,
        description: 'Exquisite deep maroon velvet lehenga with heavy zardosi work. A true masterpiece for brides.',
        category: 'Clothes',
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800',
        order: 7
    },
    {
        id: '8',
        name: 'Pastel Anarkali Suit',
        price: 3299,
        description: 'Soft pastel pink Anarkali suit in pure georgette with subtle mirror work around the neckline.',
        category: 'Clothes',
        quantity: 8,
        image: 'https://images.unsplash.com/photo-1621086055106-de014bd08dfc?auto=format&fit=crop&q=80&w=800',
        order: 8
    },
    {
        id: '9',
        name: 'Midnight Blue Gown',
        price: 4599,
        description: 'Elegant western fusion gown in midnight blue silk with a modern sweeping silhouette.',
        category: 'Clothes',
        quantity: 4,
        image: 'https://images.unsplash.com/photo-1566160983053-a1288b8e0b65?auto=format&fit=crop&q=80&w=800',
        order: 9
    },
    {
        id: '10',
        name: 'Kundan Pearl Choker',
        price: 3899,
        description: 'Traditional heavy Kundan choker interlaced with premium freshwater pearls and emerald drops.',
        category: 'Jewelry',
        quantity: 5,
        image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800',
        order: 10
    },
    {
        id: '11',
        name: 'Antique Gold Bangles',
        price: 1899,
        description: 'Set of 4 intricately carved antique finish gold-plated bangles for festive wear.',
        category: 'Jewelry',
        quantity: 12,
        image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800',
        order: 11
    },
    {
        id: '12',
        name: 'Rose Gold AD Ring',
        price: 599,
        description: 'Minimalist rose gold plated ring studded with premium American Diamonds.',
        category: 'Jewelry',
        quantity: 20,
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b2548e?auto=format&fit=crop&q=80&w=800',
        order: 12
    }
];

export const initDummyData = () => {
    const existing = localStorage.getItem(STORAGE_KEY);
    // Overwrite with new rich data if they only had the original 6 dummy items or less.
    if (!existing || JSON.parse(existing).length <= 6) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyProducts));
    }
};

export const getProducts = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data).sort((a, b) => a.order - b.order);
};

export const saveProducts = (products) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const addProduct = (product) => {
    const products = getProducts();
    const maxOrder = products.reduce((max, p) => Math.max(max, p.order || 0), 0);
    const newProduct = {
        ...product,
        id: Date.now().toString(),
        order: maxOrder + 1
    };
    saveProducts([...products, newProduct]);
    return newProduct;
};

export const updateProduct = (id, updates) => {
    const products = getProducts();
    const updatedProducts = products.map(p => p.id === id ? { ...p, ...updates } : p);
    saveProducts(updatedProducts);
};

export const deleteProduct = (id) => {
    const products = getProducts();
    saveProducts(products.filter(p => p.id !== id));
};

export const placeOrder = (id) => {
    const products = getProducts();
    const product = products.find(p => p.id === id);
    if (product && product.quantity > 0) {
        product.quantity -= 1;
        saveProducts(products);
        return product;
    }
    return null;
};
