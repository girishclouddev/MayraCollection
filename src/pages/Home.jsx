import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Diamond, Shirt } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts, placeOrder } from '../utils/localStorage';

const Hero = () => {
    return (
        <div className="relative bg-transparent py-20 lg:py-32 overflow-hidden overflow-x-hidden w-full">
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Floating animated blobs */}
                <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-[100%] bg-gradient-to-br from-primary-200/40 to-yellow-200/30 blur-[100px] animate-[pulse_8s_ease-in-out_infinite]"></div>
                <div className="absolute top-[30%] -left-[10%] w-[40%] h-[50%] rounded-[100%] bg-gradient-to-tr from-primary-300/30 to-rose-200/30 blur-[100px] animate-[pulse_10s_ease-in-out_infinite_alternate]"></div>
                <div className="absolute -bottom-[20%] right-[20%] w-[60%] h-[40%] rounded-[100%] bg-gradient-to-t from-primary-100/50 to-transparent blur-[80px] animate-[pulse_12s_ease-in-out_infinite]"></div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center justify-center w-full"
                >
                    <span className="text-primary-600 font-semibold tracking-wider uppercase text-sm mb-4 inline-block bg-primary-100 px-4 py-1 rounded-full items-center justify-center text-center mx-auto">
                        New Arrival
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-900 mb-6 leading-tight max-w-4xl mx-auto">
                        Discover True <span className="text-primary-600 italic">Elegance</span> & Style
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto flex">
                        Explore our exclusive collection of premium clothes and authentic jewelry crafted for your special moments.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 align-center justify-center w-full items-center">
                        <Link to="/clothes" className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 group mx-auto">
                            <Shirt className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            Shop Clothes
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/jewelry" className="btn-outline w-full sm:w-auto inline-flex items-center justify-center gap-2 group bg-white ml-auto mr-auto sm:ml-0 sm:mr-0">
                            <Diamond className="w-5 h-5 text-primary-600 group-hover:scale-110 transition-transform" />
                            Explore Jewelry
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(getProducts());
    }, []);

    const handleOrder = (id) => {
        const updatedProduct = placeOrder(id);
        if (updatedProduct) {
            setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
        }
    };

    const featuredClothes = products.filter(p => p.category === 'Clothes').slice(0, 3);
    const featuredJewelry = products.filter(p => p.category === 'Jewelry').slice(0, 3);

    return (
        <div>
            <Hero />

            {/* Featured Clothes */}
            <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-10 border-b border-primary-100 pb-4">
                    <div>
                        <span className="text-primary-600 font-medium mb-2 block">Trending Now</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Featured Clothes</h2>
                    </div>
                    <Link to="/clothes" className="text-primary-600 hover:text-primary-800 font-medium flex items-center gap-1 group">
                        View All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredClothes.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <ProductCard product={product} onOrder={() => handleOrder(product.id)} />
                        </motion.div>
                    ))}
                    {featuredClothes.length === 0 && (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            No clothes available right now.
                        </div>
                    )}
                </div>
            </section>

            <section className="py-16 md:py-24 bg-white/40 backdrop-blur-md border-y border-white/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-10 border-b border-primary-200 pb-4">
                        <div>
                            <span className="text-primary-600 font-medium mb-2 block">Authentic Designs</span>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Exclusive Jewelry</h2>
                        </div>
                        <Link to="/jewelry" className="text-primary-600 hover:text-primary-800 font-medium flex items-center gap-1 group">
                            View All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredJewelry.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ProductCard product={product} onOrder={() => handleOrder(product.id)} />
                            </motion.div>
                        ))}
                        {featuredJewelry.length === 0 && (
                            <div className="col-span-full text-center py-12 text-gray-500">
                                No jewelry available right now.
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
