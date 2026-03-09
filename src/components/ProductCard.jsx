import { motion } from 'framer-motion';
import { ShoppingBag, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductCard = ({ product, onOrder }) => {
    const isSoldOut = product.quantity === 0;

    const handleOrder = () => {
        if (isSoldOut) return;

        // Simulate order logic via parent callback
        if (onOrder) {
            onOrder(product.id);
        }

        // Toast notification
        toast.success('Your order is placed! We will contact you shortly with an update.', {
            duration: 4000,
            icon: '🎉',
        });

        // Send WhatsApp Message
        const phoneNumber = '917984964793';
        const message = `New Order from MayraCollection\nProduct: ${product.name}\nPrice: ₹${product.price}`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

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
                        onClick={handleOrder}
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
        </motion.div>
    );
};

export default ProductCard;
