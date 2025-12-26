const ProductCard = ({ product }) => (
  <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-1">
    <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
      />
      <div className="absolute top-3 right-3">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-indigo-800 backdrop-blur-sm shadow-sm">
          {product.category}
        </span>
      </div>
    </div>
    <div className="p-5">
      <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
        {product.title}
      </h3>
      <p className="mt-1 text-sm text-slate-500 line-clamp-2">
        High-quality {product.category.toLowerCase()} item tailored for your
        needs. Premium materials and design.
      </p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xl font-extrabold text-slate-900">
          ${product.price}
        </span>
        <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          View Details
        </button>
      </div>
    </div>
  </div>
);

export default ProductCard;
