# Mini Shop - React E-Commerce App

A simple, responsive mini e-commerce application built with **React** for the React Developer Intern take-home assessment.

Users can browse products, search and filter them, open a product details page, and manage a shopping cart that is saved in the browser.

## Features

- Product listing in a responsive grid (desktop, tablet and mobile)
- Search products by name
- Filter products by category
- Empty state when no product matches the search or filter
- Product details page with its own URL (`/product/:id`)
- Shopping cart: add, remove, increase and decrease quantity
- Total number of items and total price
- Cart is saved in `localStorage` (it stays after a page refresh)
- Loading, error (with "Try again") and empty states
- Product data comes from a local JSON file (no backend)

## Tech Stack

- React 18 (function components and Hooks)
- React Router v6 (routing)
- Vite (development server and build tool)
- Plain CSS

## Getting Started

You need **Node.js 18 or newer**.

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd mini-ecommerce

# 2. Install the packages
npm install

# 3. Start the app
npm run dev
```

Open the link shown in the terminal (usually http://localhost:5173).

Other commands:

```bash
npm run build     # creates a production build in the dist folder
npm run preview   # runs the production build locally
```

## Project Structure

```
public/
  products.json          # dummy product data (name, image, price, category, rating...)
  images/                # product images
src/
  main.jsx               # entry point (Router + CartProvider)
  App.jsx                # loads the products and defines the routes
  index.css              # all styles (including responsive media queries)
  context/
    CartContext.jsx      # cart state, cart functions and localStorage
  pages/
    Home.jsx             # product list, search and category filter
    ProductDetails.jsx   # single product page
    Cart.jsx             # cart page
    NotFound.jsx         # unknown URL
  components/
    Navbar.jsx           # top bar with cart item count
    SearchBar.jsx
    CategoryFilter.jsx
    ProductCard.jsx
    CartItem.jsx
    Loader.jsx           # loading state
    ErrorMessage.jsx     # error state
    EmptyState.jsx       # empty state (no results, empty cart, not found)
```

## How It Works

- **Product data:** `App.jsx` reads `public/products.json` with `fetch` inside `useEffect` and keeps the result in state, along with `loading` and `error` states.
- **Search and filter:** `Home.jsx` keeps the search text and selected category in state, then uses `filter()` to build the list that is shown.
- **Routing:** React Router has three main routes: `/` (home), `/product/:id` (details) and `/cart`. `useParams` reads the product id from the URL.
- **Cart:** `CartContext.jsx` uses `useState` for the cart items and shares them with all components using Context. Total items and total price are calculated from the cart items.
- **Persistence:** a `useEffect` saves the cart to `localStorage` whenever it changes, and the cart is read back when the app starts.

## Testing the States

- **Error state:** rename `public/products.json` and refresh the page.
- **Empty state:** search for a word that does not exist, like "xyz".
- **Product not found:** open `/product/999`.
- **Persistence:** add items to the cart and refresh the page.

## Notes

- Product images are simple local SVG files so the app works without internet. You can replace the `image` values in `products.json` with any image URL.
- Prices are shown in dollars (`$`).
