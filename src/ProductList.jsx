import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import FooterLoader from "./components/FooterLoader";
import { useEffect, useRef, useState } from "react";
// SkeletonCard can be imported if you decide to use it in the grid later
// import SkeletonCard from './components/SkeletonCard';

const productLimit = 10;

// --- Main Layout Component ---
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  // useEffect for infinite scrolling can be added here later
  useEffect(() => {
    // functions for fetching products can be implemented here
    const fetchProducts = async () => {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${productLimit}&skip=${
          productLimit * page
        }`
      );
      const data = await response.json();
      // Check if there are more products to load
      if (data.products.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
        setPage((prevPage) => prevPage + 1);
      }
    };

    // Intersection Observer for infinite scrolling
    const onInterSection = (items) => {
      const loaderItem = items[0];

      if (loaderItem.isIntersecting && hasMore) {
        fetchProducts();
      }
    };
    // Create an intersection observer
    const observer = new IntersectionObserver(onInterSection);
    // Observe the loaderRef element
    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    // Cleanup function
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [page, hasMore]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            New Arrivals
          </h1>
          <p className="mt-2 text-slate-500">
            Discover our latest collection of premium products.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Footer Loader Section */}
        <FooterLoader ref={loaderRef} />
      </main>
    </div>
  );
};

export default ProductList;
