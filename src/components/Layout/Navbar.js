import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaSearch, 
  FaShoppingCart, 
  FaHeart, 
  FaUser, 
  FaBars, 
  FaTimes,
  FaChevronDown 
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const navigate = useNavigate();

  const categories = [
    'Electronics',
    'Clothing',
    'Home & Garden',
    'Sports',
    'Books',
    'Beauty',
    'Automotive',
    'Toys'
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2">
        <div className="container">
          <div className="flex justify-between items-center text-sm">
            <div className="flex gap-4">
              <span>📞 Customer Service: 1-800-SHOPNEST</span>
              <span>📧 support@shopnest.com</span>
            </div>
            <div className="flex gap-4">
              <span>🚚 Free shipping on orders over $50</span>
              <span>🎉 Sale: Up to 70% off!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-primary">
              🛍️ ShopNest
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="input-field pr-12"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
              >
                <FaSearch />
              </button>
            </div>
          </form>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center gap-1 text-gray-700 hover:text-primary"
              >
                Categories <FaChevronDown className="text-sm" />
              </button>
              
              {isCategoryOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg border z-10">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      to={`/products?category=${encodeURIComponent(category)}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary"
                      onClick={() => setIsCategoryOpen(false)}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative text-gray-700 hover:text-primary">
              <FaHeart className="text-xl" />
              {getWishlistCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getWishlistCount()}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative text-gray-700 hover:text-primary">
              <FaShoppingCart className="text-xl" />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 text-gray-700 hover:text-primary"
                >
                  <FaUser />
                  <span className="hidden md:block">{user.name}</span>
                  <FaChevronDown className="text-sm" />
                </button>

                {isMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border z-10">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="btn btn-outline btn-sm">
                  Sign In
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-primary"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container py-4">
            <div className="flex flex-col gap-4">
              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-2">Categories</h3>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      to={`/products?category=${encodeURIComponent(category)}`}
                      className="text-gray-700 hover:text-primary text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>

              {/* User Actions */}
              {!user && (
                <div className="flex flex-col gap-2 pt-4 border-t">
                  <Link
                    to="/login"
                    className="btn btn-outline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
