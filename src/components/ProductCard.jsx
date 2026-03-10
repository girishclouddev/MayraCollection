import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductCard = ({ product, onOrder }) => {
    const [showModal, setShowModal] = useState(false);
    const [orderDetails, setOrderDetails] = useState({ name: '', phone: '', address: '' });

    const isSoldOut = product.quantity === 0;

    const handleOrderClick = () => {
        if (isSoldOut) return;
        setShowModal(true);
    };

    const submitOrder = (e) => {
        e.preventDefault();

        if (!orderDetails.name || !orderDetails.phone || !orderDetails.address) {
            toast.error('Please fill all details');
            return;
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(orderDetails.phone)) {
            toast.error('Please enter a valid 10-digit phone number');
            return;
        }

        // Simulate order logic via parent callback
        if (onOrder) {
            onOrder(product.id);
        }

        // Toast notification
        toast.success('Your order is placed! Redirecting to WhatsApp...', {
            duration: 4000,
            icon: '🎉',
        });

        // Send WhatsApp Message
        const phoneNumber = '917984964793';
        const message = `*New Order from MayraCollection*\n\n*Product:* ${product.name}\n*Price:* ₹${product.price}\n\n*Customer Details:*\n*Name:* ${orderDetails.name}\n*Phone:* ${orderDetails.phone}\n*Address:* ${orderDetails.address}`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        setShowModal(false);
        setOrderDetails({ name: '', phone: '', address: '' });

        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank');
    };

    return (
        <motion.div
            className="glass-card overflow-hidden group relative flex flex-col h-full ring-1 ring-gray-900/5"
            whileHover={{ y: -8, scale: 1.02 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
        >
            {/* Image container with zoom effect */}
            <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                <img
                    src={product.image || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800'}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                {/* Sold out badge */}
                {isSoldOut && (
                    <div className="absolute inset-x-0 top-4 flex justify-center z-10">
                        <span className="bg-red-500/90 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
                            SOLD OUT
                        </span>
                    </div>
                )}

                {/* Category badge */}
                <div className="absolute top-4 left-4 z-10 transition-transform duration-300 group-hover:scale-105">
                    <span className="bg-white/95 text-primary-900 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-badge backdrop-blur-md">
                        {product.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-serif font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
                    <span className="text-lg font-bold text-primary-600">₹{product.price}</span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                        {product.quantity > 0 ? `${product.quantity} left` : 'Out of stock'}
                    </span>

                    <button
                        onClick={handleOrderClick}
                        disabled={isSoldOut}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 text-sm ${isSoldOut
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-900 text-white hover:bg-primary-600 shadow-btn-dark hover:shadow-glow-primary-lg hover:-translate-y-0.5 active:scale-95'
                            }`}
                    >
                        {isSoldOut ? (
                            <span className="flex items-center gap-1">Unavailable</span>
                        ) : (
                            <span className="flex items-center gap-1"><ShoppingBag className="w-4 h-4" /> Order Now</span>
                        )}
                    </button>
                </div>
            </div>

            {/* Order Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <h3 className="text-xl font-serif font-bold text-gray-900 mb-1">Complete Your Order</h3>
                            <p className="text-sm text-gray-500 mb-6">Enter details to confirm order via WhatsApp</p>

                            <div className="flex gap-4 p-3 bg-gray-50 rounded-lg mb-6 items-center">
                                <img src={product.image} className="w-12 h-12 rounded object-cover" alt="" />
                                <div>
                                    <p className="font-medium text-gray-900 text-sm line-clamp-1">{product.name}</p>
                                    <p className="text-primary-600 font-bold">₹{product.price}</p>
                                </div>
                            </div>

                            <form onSubmit={submitOrder} className="space-y-4 text-left">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={orderDetails.name}
                                        onChange={(e) => setOrderDetails({ ...orderDetails, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                                    <input
                                        type="tel"
                                        required
                                        value={orderDetails.phone}
                                        onChange={(e) => setOrderDetails({ ...orderDetails, phone: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                                    <textarea
                                        required
                                        rows="3"
                                        value={orderDetails.address}
                                        onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Enter full delivery address with pincode"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full btn-primary py-3 rounded-lg font-medium flex justify-center items-center gap-2 mt-2"
                                >
                                    Confirm & Send via WhatsApp
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div >
    );
};

export default ProductCard;
