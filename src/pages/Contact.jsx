import { motion } from 'framer-motion';
import { Phone, MessageCircle, MapPin, Mail, ArrowRight } from 'lucide-react';

const Contact = () => {
    const handleWhatsApp = (number) => {
        window.open(`https://wa.me/${number}?text=Hello MayraCollection, I have a query.`, '_blank');
    };

    const handleCall = (number) => {
        window.location.href = `tel:+${number}`;
    };

    return (
        <div className="min-h-screen py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                    Get in <span className="text-primary-600 italic">Touch</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Have a question about our collections or an existing order? We are here to help you.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Contact Method 1 */}
                <motion.div
                    className="bg-white p-8 flex flex-col items-center text-center group rounded-2xl shadow-sm border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ y: -5 }}
                >
                    <div className="w-14 h-14 bg-[#FCF8F5] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <MessageCircle className="w-6 h-6 text-[#7B5F54] font-light" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">WhatsApp</h3>
                    <p className="text-gray-500 mb-8 text-sm">Fastest way to reach us for orders and questions.</p>

                    <div className="space-y-3 w-full mt-auto font-sans">
                        <button
                            onClick={() => handleWhatsApp('917984964793')}
                            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg font-medium transition-colors text-sm"
                        >
                            +91 79849 64793
                        </button>
                        <button
                            onClick={() => handleWhatsApp('919724549478')}
                            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg font-medium transition-colors text-sm"
                        >
                            +91 97245 49478
                        </button>
                    </div>
                </motion.div>

                {/* Contact Method 2 */}
                <motion.div
                    className="bg-white p-8 flex flex-col items-center text-center group rounded-2xl shadow-sm border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ y: -5 }}
                >
                    <div className="w-14 h-14 bg-[#FCF8F5] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Phone className="w-6 h-6 text-[#7B5F54] font-light" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Call Us</h3>
                    <p className="text-gray-500 mb-8 text-sm">Available 10 AM to 8 PM, Monday to Sunday.</p>

                    <div className="space-y-3 w-full mt-auto font-sans">
                        <button
                            onClick={() => handleCall('917984964793')}
                            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors text-sm"
                        >
                            +91 79849 64793
                        </button>
                        <button
                            onClick={() => handleCall('919724549478')}
                            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors text-sm"
                        >
                            +91 97245 49478
                        </button>
                    </div>
                </motion.div>

                {/* Contact Method 3 */}
                <motion.div
                    className="bg-white p-8 flex flex-col items-center text-center group rounded-2xl shadow-sm border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ y: -5 }}
                >
                    <div className="w-14 h-14 bg-[#FCF8F5] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <MapPin className="w-6 h-6 text-[#7B5F54] font-light" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Location</h3>
                    <p className="text-gray-500 mb-8 text-sm">Gujarat, India</p>

                    <div className="w-full mt-auto bg-[#f6f6f6] p-5 rounded-xl flex flex-col items-center justify-center gap-3 text-gray-700 font-sans">
                        <span className="text-xs font-semibold text-gray-600 tracking-wide">Available Monday to Sunday</span>
                        <div className="flex gap-4">
                            <button onClick={() => handleWhatsApp('917984964793')} className="text-gray-500 hover:text-[#25D366] transition-colors" aria-label="WhatsApp">
                                <MessageCircle className="w-5 h-5" />
                            </button>
                            <button onClick={() => handleCall('917984964793')} className="text-gray-500 hover:text-primary-600 transition-colors" aria-label="Call">
                                <Phone className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
