  import { db } from './firebase.js';
  import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db, storage } from './firebase.js';

  const productsContainer = document.getElementById("products");

  // تحميل المنتجات من Firestore
  async function loadProducts() {
    const snapshot = await getDocs(collection(db, "products"));
    snapshot.forEach(doc => {
      const product = doc.data();
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.desc || ""}</p>
        <span>${product.price} جنيه</span>
        <button onclick="addToCart('${product.name}', '${product.price}', '${product.image}')">🛒 أضف إلى السلة</button>
      `;
      productsContainer.appendChild(productCard);
    });
  }

  loadProducts();

  // ✅ دالة إضافة منتج للسلة بشكل منظم
  window.addToCart = function (name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // شوف لو المنتج موجود بالفعل
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name, price, image, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("✅ تم إضافة المنتج إلى السلة بنجاح!");
  };
