import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import { Plus, Trash2, ArrowUp, ArrowDown, LogOut, CheckCircle, Edit3, Image as ImageIcon } from 'lucide-react';
import { getProducts, addProduct, updateProduct, deleteProduct, saveProducts } from '../utils/localStorage';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();

    // Form state
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: 'Clothes',
        quantity: '',
        image: null,
    });

    useEffect(() => {
        // Check auth
        if (localStorage.getItem('isAdminAuth') !== 'true') {
            navigate('/login');
        } else {
            setProducts(getProducts());
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isAdminAuth');
        navigate('/login');
        toast.success('Logged out successfully');
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const options = {
                maxSizeMB: 0.2, // 200KB
                maxWidthOrHeight: 800,
                useWebWorker: true,
            };
            const compressedFile = await imageCompression(file, options);

            // Convert to base64
            const reader = new FileReader();
            reader.readAsDataURL(compressedFile);
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
                setIsUploading(false);
                toast.success('Image compressed and ready');
            };
        } catch (error) {
            console.error(error);
            toast.error('Error compressing image');
            setIsUploading(false);
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData({
            name: '',
            price: '',
            description: '',
            category: 'Clothes',
            quantity: '',
            image: null,
        });
        document.getElementById('imageUpload').value = '';
    };

    const handleEdit = (product) => {
        setEditingId(product.id);
        setFormData({
            name: product.name,
            price: product.price,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            image: product.image,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.image) {
            toast.error('Please upload an image');
            return;
        }

        const productData = {
            name: formData.name,
            price: Number(formData.price),
            description: formData.description,
            category: formData.category,
            quantity: Number(formData.quantity),
            image: formData.image,
        };

        if (editingId) {
            updateProduct(editingId, productData);
            setProducts(products.map(p => p.id === editingId ? { ...p, ...productData } : p));
            toast.success('Product updated successfully!');
            handleCancelEdit();
        } else {
            const added = addProduct(productData);
            setProducts([...products, added].sort((a, b) => a.order - b.order));

            // Reset form
            setFormData({
                name: '',
                price: '',
                description: '',
                category: 'Clothes',
                quantity: '',
                image: null,
            });

            // Reset file input
            document.getElementById('imageUpload').value = '';
            toast.success('Product added successfully!');
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id);
            setProducts(products.filter(p => p.id !== id));
            toast.success('Product deleted');
        }
    };

    const handleUpdateQuantity = (id, newQuantity) => {
        updateProduct(id, { quantity: Number(newQuantity) });
        setProducts(products.map(p => p.id === id ? { ...p, quantity: Number(newQuantity) } : p));
        toast.success('Quantity updated');
    };

    const handleMarkSoldOut = (id) => {
        updateProduct(id, { quantity: 0 });
        setProducts(products.map(p => p.id === id ? { ...p, quantity: 0 } : p));
        toast.success('Marked as Sold Out');
    };

    const handleMove = (index, direction) => {
        if (
            (direction === -1 && index === 0) ||
            (direction === 1 && index === products.length - 1)
        ) return;

        const newProducts = [...products];
        // Swap elements
        const temp = newProducts[index];
        newProducts[index] = newProducts[index + direction];
        newProducts[index + direction] = temp;

        // Update order property
        const updatedProducts = newProducts.map((p, i) => ({ ...p, order: i + 1 }));
        saveProducts(updatedProducts);
        setProducts(updatedProducts);
    };

    return (
        <div className="min-h-screen bg-transparent py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-gray-900">Admin Dashboard</h1>
                        <p className="text-gray-500">Manage your MayraCollection store</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="mt-4 sm:mt-0 flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium transition-colors"
                    >
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Add Product Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                            <h2 className="text-xl font-serif font-semibold mb-6 flex items-center justify-between">
                                <span className="flex items-center gap-2">
                                    {editingId ? <Edit3 className="w-5 h-5 text-primary-600" /> : <Plus className="w-5 h-5 text-primary-600" />}
                                    {editingId ? 'Edit Product' : 'Add New Product'}
                                </span>
                                {editingId && (
                                    <button type="button" onClick={handleCancelEdit} className="text-sm text-red-500 hover:text-red-700">Cancel</button>
                                )}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">

                                {/* Image Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="space-y-1 text-center">
                                            {formData.image ? (
                                                <div className="relative">
                                                    <img src={formData.image} alt="Preview" className="mx-auto h-32 object-contain rounded-md" />
                                                    <button
                                                        type="button"
                                                        onClick={() => { setFormData({ ...formData, image: null }); document.getElementById('imageUpload').value = ''; }}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                                    <div className="flex text-sm text-gray-600 justify-center">
                                                        <label htmlFor="imageUpload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500">
                                                            <span>Upload a file</span>
                                                            <input
                                                                id="imageUpload"
                                                                type="file"
                                                                accept="image/*"
                                                                className="sr-only"
                                                                onChange={handleImageUpload}
                                                                disabled={isUploading}
                                                            />
                                                        </label>
                                                    </div>
                                                    <p className="text-xs text-gray-500">Auto compressed (Max 200KB)</p>
                                                </>
                                            )}
                                            {isUploading && <p className="text-sm text-primary-600 animate-pulse">Compressing...</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                                    <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                                        <input type="number" required min="0" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                                        <input type="number" required min="0" value={formData.quantity} onChange={e => setFormData({ ...formData, quantity: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500">
                                        <option value="Clothes">Clothes</option>
                                        <option value="Jewelry">Jewelry</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea required rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"></textarea>
                                </div>

                                <button type="submit" disabled={isUploading} className="w-full btn-primary flex justify-center py-3 rounded-lg">
                                    {isUploading ? 'Processing...' : (editingId ? 'Update Product' : 'Add Product')}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Product List */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-serif font-semibold mb-6">Manage Products ({products.length})</h2>

                            <div className="space-y-4">
                                {products.map((product, index) => (
                                    <div key={product.id} className="flex flex-col sm:flex-row items-center gap-4 p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow bg-stone-50/50">

                                        {/* Reorder Buttons */}
                                        <div className="flex flex-col gap-1 text-gray-400">
                                            <button onClick={() => handleMove(index, -1)} disabled={index === 0} className="hover:text-primary-600 disabled:opacity-30 disabled:hover:text-gray-400 p-1">
                                                <ArrowUp className="w-5 h-5" />
                                            </button>
                                            <button onClick={() => handleMove(index, 1)} disabled={index === products.length - 1} className="hover:text-primary-600 disabled:opacity-30 disabled:hover:text-gray-400 p-1">
                                                <ArrowDown className="w-5 h-5" />
                                            </button>
                                        </div>

                                        {/* Product Image */}
                                        <img src={product.image} alt={product.name} className="w-20 h-24 object-cover rounded-lg shadow-sm" />

                                        {/* Product Info */}
                                        <div className="flex-grow text-center sm:text-left">
                                            <div className="flex justify-center sm:justify-start items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                                                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">{product.category}</span>
                                            </div>
                                            <p className="text-primary-600 font-medium mb-2">₹{product.price}</p>
                                            <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-600">
                                                <span>Qty:</span>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={product.quantity}
                                                    onChange={(e) => handleUpdateQuantity(product.id, e.target.value)}
                                                    className="w-16 px-2 py-1 border rounded bg-white"
                                                />
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                                            {product.quantity > 0 && (
                                                <button
                                                    onClick={() => handleMarkSoldOut(product.id)}
                                                    className="flex-1 sm:flex-none flex justify-center items-center gap-1 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-md text-sm font-medium hover:bg-yellow-200"
                                                >
                                                    <CheckCircle className="w-4 h-4" /> Sold Out
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="flex-1 sm:flex-none flex justify-center items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-200"
                                            >
                                                <Edit3 className="w-4 h-4" /> Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="flex-1 sm:flex-none flex justify-center items-center gap-1 px-3 py-1.5 bg-red-100 text-red-600 rounded-md text-sm font-medium hover:bg-red-200"
                                            >
                                                <Trash2 className="w-4 h-4" /> Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {products.length === 0 && (
                                    <div className="text-center py-12 text-gray-500">
                                        No products added yet.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
