import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaStar, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  // Sample data - in a real app, this would come from an API
  const banners = [
    {
      id: 1,
      title: "Summer Sale",
      subtitle: "Up to 70% Off",
      description: "Don't miss out on our biggest sale of the year!",
      image: "https://via.placeholder.com/1200x400/3b82f6/ffffff?text=Summer+Sale+70%25+Off",
      cta: "Shop Now",
      link: "/products?sale=true"
    },
    {
      id: 2,
      title: "New Arrivals",
      subtitle: "Fresh & Trendy",
      description: "Discover the latest fashion trends and styles",
      image: "https://via.placeholder.com/1200x400/10b981/ffffff?text=New+Arrivals",
      cta: "Explore",
      link: "/products?new=true"
    },
    {
      id: 3,
      title: "Electronics Deal",
      subtitle: "Tech at Best Prices",
      description: "Upgrade your tech with our exclusive deals",
      image: "https://via.placeholder.com/1200x400/f59e0b/ffffff?text=Electronics+Deal",
      cta: "Browse Tech",
      link: "/products?category=Electronics"
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      discountPrice: 199.99,
      image: "https://via.placeholder.com/300x300/3b82f6/ffffff?text=Headphones",
      rating: 4.8,
      reviews: 1247,
      badge: "Bestseller"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 399.99,
      discountPrice: 299.99,
      image: "https://via.placeholder.com/300x300/10b981/ffffff?text=Smart+Watch",
      rating: 4.7,
      reviews: 892,
      badge: "New"
    },
    {
      id: 3,
      name: "Organic Cotton T-Shirt",
      price: 39.99,
      discountPrice: 24.99,
      image: "https://via.placeholder.com/300x300/f59e0b/ffffff?text=T-Shirt",
      rating: 4.5,
      reviews: 567,
      badge: "Sale"
    },
    {
      id: 4,
      name: "Professional Camera",
      price: 1299.99,
      discountPrice: 999.99,
      image: "https://via.placeholder.com/300x300/ef4444/ffffff?text=Camera",
      rating: 4.9,
      reviews: 234,
      badge: "Deal"
    }
  ];

  const categories = [
    {
      name: "Electronics",
      image: "https://via.placeholder.com/200x200/3b82f6/ffffff?text=Electronics",
      count: "2,456 items"
    },
    {
      name: "Clothing",
      image: "https://via.placeholder.com/200x200/10b981/ffffff?text=Clothing",
      count: "1,892 items"
    },
    {
      name: "Home & Garden",
      image: "https://via.placeholder.com/200x200/f59e0b/ffffff?text=Home",
      count: "1,234 items"
    },
    {
      name: "Sports",
      image: "https://via.placeholder.com/200x200/ef4444/ffffff?text=Sports",
      count: "967 items"
    },
    {
      name: "Books",
      image: "https://via.placeholder.com/200x200/8b5cf6/ffffff?text=Books",
      count: "3,456 items"
    },
    {
      name: "Beauty",
      image: "https://via.placeholder.com/200x200/ec4899/ffffff?text=Beauty",
      count: "789 items"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleWishlistToggle = (product) => {
    addToWishlist(product);
  };

  return (
    <div className="home-page">
      {/* Hero Banner Slider */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="relative h-full flex items-center">
                <div className="container">
                  <div className="max-w-lg text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                      {banner.title}
                    </h1>
                    <h2 className="text-2xl md:text-3xl mb-4 text-yellow-300">
                      {banner.subtitle}
                    </h2>
                    <p className="text-lg mb-6">
                      {banner.description}
                    </p>
                    <Link
                      to={banner.link}
                      className="btn btn-primary btn-lg inline-flex items-center gap-2"
                    >
                      {banner.cta}
                      <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-gray-600">Find exactly what you're looking for</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="group"
              >
                <div className="card text-center hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
              <p className="text-gray-600">Handpicked favorites just for you</p>
            </div>
            <Link to="/products" className="btn btn-outline">
              View All Products
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="card card-hover group">
                <div className="relative mb-4">
                  {product.badge && (
                    <span className="absolute top-2 left-2 bg-primary text-white px-2 py-1 text-xs rounded-full z-10">
                      {product.badge}
                    </span>
                  )}
                  <button
                    onClick={() => handleWishlistToggle(product)}
                    className={`absolute top-2 right-2 p-2 rounded-full transition-colors z-10 ${
                      isInWishlist(product.id)
                        ? 'bg-error text-white'
                        : 'bg-white text-gray-600 hover:text-error'
                    }`}
                  >
                    <FaHeart />
                  </button>
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </div>

                <div className="flex-1">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold mb-2 hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`text-sm ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-primary">
                      ${product.discountPrice}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ${product.price}
                    </span>
                    <span className="text-sm text-success font-medium">
                      {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% off
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full btn btn-primary btn-sm flex items-center justify-center gap-2"
                  >
                    <FaShoppingCart />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new products, 
            exclusive deals, and special offers.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none"
              />
              <button className="btn bg-white text-primary hover:bg-gray-100 rounded-l-none">
                Subscribe
              </button>
            </div>
            <p className="text-sm mt-2 opacity-80">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on all orders over $50</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">Your payment information is safe with us</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">↩️</div>
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy for your peace of mind</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
