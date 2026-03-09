import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { getProducts, placeOrder } from '../utils/localStorage';
import { Shirt } from 'lucide-react';

const Clothes = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Scroll to top
        window.scrollTo(0, 0);
        const allProducts = getProducts();
        setProducts(allProducts.filter(p => p.category === 'Clothes'));
    }, []);

    const handleOrder = (id) => {
        const updatedProduct = placeOrder(id);
        if (updatedProduct) {
            setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
        }
    };

    return (
        <div className="min-h-screen pb-24">
            {/* Header */}
            <div className="relative bg-white/40 backdrop-blur-md py-16 md:py-24 mb-12 border-b border-white/50 overflow-hidden">
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-50%] left-[-10%] w-[40%] h-[150%] rounded-[100%] bg-gradient-to-br from-primary-200/40 to-transparent blur-[80px] animate-[pulse_8s_ease-in-out_infinite]"></div>
                    <div className="absolute bottom-[-50%] right-[-10%] w-[30%] h-[120%] rounded-[100%] bg-gradient-to-tl from-rose-200/30 to-transparent blur-[80px] animate-[pulse_10s_ease-in-out_infinite_alternate]"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-primary-900">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-center mb-6 text-primary-600"
                    >
                        <Shirt className="w-16 h-16" />
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
                        Premium <span className="text-primary-600 italic">Clothes</span>
                    </h1>
                    <p className="max-w-xl mx-auto text-lg text-primary-800">
                        Discover our collection of elegant sarees, beautiful kurtis, and stunnings dresses.
                    </p>
                </div>
            </div>

            {/* Product Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <ProductCard product={product} onOrder={() => handleOrder(product.id)} />
                        </motion.div>
                    ))}
                </div>

                {products.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <Shirt className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No clothes found</h3>
                        <p className="text-gray-500">Check back later for new arrivals.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Clothes;
