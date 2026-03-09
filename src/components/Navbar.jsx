import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Clothes', path: '/clothes' },
        { name: 'Jewelry', path: '/jewelry' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo brand */}
                    <div className="flex-shrink-0 flex items-center">
                        <NavLink to="/" className="text-2xl font-serif font-bold text-gray-900 flex items-center gap-2 group">
                            <img src="/logo.svg" alt="MayraCollection Logo" className="h-10 w-10 group-hover:scale-105 transition-transform drop-shadow-sm" />
                            <span className="tracking-wide text-[22px]">MayraCollection</span>
                        </NavLink>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:ml-6 md:flex md:space-x-8">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${isActive
                                        ? 'border-primary-600 text-primary-900'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    onClick={closeMenu}
                                    className={({ isActive }) =>
                                        `block px-3 py-2 rounded-md text-base font-medium ${isActive
                                            ? 'bg-primary-50 text-primary-900 border-l-4 border-primary-600'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
