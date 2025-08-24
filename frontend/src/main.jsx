import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

import "./styles/index.css";
import "./styles/header.css";
import "./styles/top-promotion.css";
import "./styles/hero.css";
import "./styles/title.css";
import "./styles/latestcollection.css";
import "./styles/bestseller.css";
import "./styles/ourpolicy.css";
import "./styles/news-letter.css";
import "./styles/footer.css";
import "./styles/collection.css";
import "./styles/searchbar.css";
import "./styles/product.css";
import "./styles/cart.css";
import "./styles/carttotal.css";
import "./styles/placeorder.css";
import "./styles/order.css";
import "./styles/login.css";
import "./styles/about.css";
import "./styles/contact.css";
import "./styles/sectionintro.css";

import ShopContextProvider from "./context/ShopContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </BrowserRouter>
  // </StrictMode>,
);
