import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import FooterLoader from "./components/FooterLoader";
import { useEffect, useEffectEvent, useRef, useState } from "react";
// SkeletonCard can be imported if you decide to use it in the grid later
// import SkeletonCard from './components/SkeletonCard';

const productLimit = 10;

// --- Main Layout Component ---
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);
  // const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // TODO: add  useEffect for infinite scrolling
  // useEffect(() => {
  //   // functions for fetching products can be implemented here
  //   const fetchProducts = async () => {
  //     const response = await fetch(
  //       `https://dummyjson.com/products?limit=${productLimit}&skip=${
  //         productLimit * page
  //       }`
  //     );
  //     const data = await response.json();

  //     // Check if there are more products to load
  //     if (data.products.length === 0) {
  //       setHasMore(false);
  //     } else {
  //       setProducts((prevProducts) => [...prevProducts, ...data.products]);
  //       setPage((prevPage) => prevPage + 1);
  //     }
  //   };

  //   // Intersection Observer for infinite scrolling
  //   const onInterSection = (items) => {
  //     const loaderItem = items[0];

  //     if (loaderItem.isIntersecting && hasMore) {
  //       fetchProducts();
  //     }
  //   };
  //   // Create an intersection observer
  //   const observer = new IntersectionObserver(onInterSection);
  //   // Observe the loaderRef element
  //   if (observer && loaderRef.current) {
  //     observer.observe(loaderRef.current);
  //   }

  //   // Cleanup function
  //   return () => {
  //     if (observer) {
  //       observer.disconnect();
  //     }
  //   };
  // }, [page, hasMore]);

  // TODO: implement Search Functionality with before loading more products
  const fetchProducts = async (isNewSearch = false) => {
    if (!hasMore && !isNewSearch) return;

    // যদি নতুন সার্চ হয়, তবে পেজ ০ থেকে শুরু হবে, নাহলে বর্তমান পেজ
    const currentPage = isNewSearch ? 0 : page;

    try {
      const baseUrl = searchTerm
        ? `https://dummyjson.com/products/search?q=${searchTerm}`
        : `https://dummyjson.com/products`;

      const response = await fetch(
        `${baseUrl}${searchTerm ? "&" : "?"}limit=${productLimit}&skip=${
          productLimit * currentPage
        }`
      );
      const data = await response.json();

      if (data.products.length === 0) {
        setHasMore(false);
        if (isNewSearch) setProducts([]); // সার্চে কিছু না পেলে লিস্ট খালি করে দাও
      } else {
        // নতুন সার্চ হলে সরাসরি ডাটা সেট করো, আর স্ক্রলিং হলে আগের ডাটার সাথে যোগ করো
        setProducts((prev) =>
          isNewSearch ? data.products : [...prev, ...data.products]
        );
        setPage(currentPage + 1);
        setHasMore(data.total > (currentPage + 1) * productLimit);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const onScrollLoad = useEffectEvent(() => {
    if (hasMore && loaderRef.current) {
      fetchProducts();
    }
  });

  useEffect(() => {
    const onInterSection = (items) => {
      const loaderItem = items[0];
      if (loaderItem.isIntersecting) {
        onScrollLoad();
      }
    };

    const observer = new IntersectionObserver(onInterSection);
    if (loaderRef.current && hasMore) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [products.length, hasMore]);

  const onSearchLoad = useEffectEvent(() => {
    fetchProducts(true);
  });
  // Trigger search fetch when the term changes (debounced)
  useEffect(() => {
    const debounceId = setTimeout(() => {
      // Always trigger a fresh fetch on term change
      onSearchLoad();
    }, 400);

    return () => clearTimeout(debounceId);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar setSearchTerm={setSearchTerm} />

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
        {hasMore && <FooterLoader ref={loaderRef} />}
      </main>
    </div>
  );
};

export default ProductList;
