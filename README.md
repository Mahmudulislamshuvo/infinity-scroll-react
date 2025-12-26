# Infinity Scroll & Search (React 19)

<div align="center">
  <h3>
    🚀 High-Performance Infinite Scrolling with Server-Side Search
  </h3>
  <p>
    Built with <strong>React 19</strong>, <strong>Tailwind CSS</strong>, and <strong>Intersection Observer API</strong>.
  </p>
</div>

---

## 📸 Live Demo

> **[infinity-scroll-react-tau.vercel.app](#)** _(Infinity_Scroll_Project)_
>
> [ডিফল্ট পেজ](./screenshot.png)

---

## ✨ Key Features

- **⚡ Modern Data Fetching**

  - Efficiently retrieves data from the **DummyJSON API** using dynamic `limit` and `skip` parameters.
  - Optimized to fetch only what is needed, reducing payload size and improving load times.

- **📜 Infinite Pagination**

  - **Seamless Experience:** Automatically loads more products as the user scrolls to the bottom of the page.
  - **Intersection Observer:** Utilizes the browser's native API for performant scroll detection without event listener spam.

- **🔍 Smart Server-Side Search**

  - **Real-time Filtering:** Triggers backend API calls with a debounced search input (400ms).
  - **Auto-Reset:** Automatically resets the product list and pagination state whenever a new search query is entered to ensure accurate results.

- **⚛️ Modern React Patterns (React 19)**
  - **`useEffectEvent`:** Leverages the latest React 19 hook to decouple non-reactive logic (like data fetching) from the effect's dependency array.
  - **Stability:** Prevents unnecessary re-renders and re-subscriptions of the `IntersectionObserver`, ensuring a stable and optimized application.

---

## 🛠 Technical Deep Dive

### 1. Intersection Observer for Infinite Scroll

Instead of attaching a heavy `scroll` event listener to the window, this project uses the **Intersection Observer API**. A sentinel element (`<FooterLoader />`) is placed at the bottom of the list. When this element enters the viewport, the observer triggers the data fetch function.

### 2. React 19 `useEffectEvent` Optimization

One of the challenges in React effects is managing dependencies. We used the `useEffectEvent` hook to create stable event handlers for our effects.

```javascript
// Decoupling logic from the Effect
const onScrollLoad = useEffectEvent(() => {
  if (hasMore && loaderRef.current) {
    fetchProducts();
  }
});

// The Effect remains clean and only re-runs when necessary
useEffect(() => {
  const observer = new IntersectionObserver((items) => {
    if (items[0].isIntersecting) {
      onScrollLoad(); // Safe to call without adding to dependencies
    }
  });
  // ... observer setup
}, [products.length, hasMore]); // Minimal dependencies
```

This pattern ensures that `onScrollLoad` always has access to the latest state (like `hasMore`) without forcing the `IntersectionObserver` to disconnect and reconnect on every state change.

---

## 🚀 How to Run

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone <https://github.com/Mahmudulislamshuvo/infinity-scroll-react>
cd infinityScroll
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## 📂 Project Structure

```bash
src/
├── assets/             # Static assets (images, svg)
├── components/         # Reusable UI components
│   ├── FooterLoader.jsx  # Sentinel component for intersection observer
│   ├── Navbar.jsx        # Top navigation with search input
│   ├── ProductCard.jsx   # Individual product display card
│   └── SkeletonCard.jsx  # Loading state placeholders
├── App.jsx             # Main application layout
├── ProductList.jsx     # Core logic (Infinite Scroll & Search)
└── main.jsx            # Entry point
```

---

## 🧰 Tech Stack

| Technology       | Purpose                         |
| :--------------- | :------------------------------ |
| **React 19**     | UI Library (using latest hooks) |
| **Tailwind CSS** | Utility-first Styling           |
| **Vite**         | Blazing Fast Build Tool         |
| **Lucide React** | Modern Icons                    |
| **DummyJSON**    | Mock Backend API                |

---

<div align="center">
  <p>Made with ❤️ by a Frontend Engineer <a href="https://www.linkedin.com/in/mahmudul-islam-shuvo/">Mahmudul Islam</a></p>
</div>
