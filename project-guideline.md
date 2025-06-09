
# 🛒 Tech Gadget Store – MVP Project Guideline

## 📌 Overview
This is a 1–2 week e-commerce MVP for a Tech Gadget Store built with React, Tailwind CSS, and Firebase. It includes user-facing features like product listings, checkout, and admin product management.

---

## 🚀 Tech Stack
- **Frontend**: React + Tailwind CSS
- **Backend**: Firebase (Firestore, Auth, Storage)
- **Auth**: Firebase Email/Password
- **Payments**: Flutterwave or Stripe
- **Deployment**: Vercel or Netlify

---

## 📂 Folder Structure

```
tech-gadget-store/
├── public/
│   └── images/                  # Static images
├── src/
│   ├── assets/                  # Logos, icons, etc.
│   ├── components/              # Reusable UI components
│   ├── contexts/                # React Context providers
│   ├── pages/                   # Home, Product, Cart, etc.
│   ├── services/                # Firebase configs & APIs
│   ├── utils/                   # Helpers (formatting, etc.)
│   └── App.jsx                  # Main App component
├── .gitignore
├── package.json
└── README.md
```

---

## 🎨 UI Ideas

### ✅ Homepage
- Hero section with featured gadgets
- Categories (Phones, Laptops, Accessories)
- Featured product grid (with price, name, short desc)

### ✅ Product Listing Page
- Grid layout
- Search bar + filters (optional)
- Product cards with image, price, and "View" button

### ✅ Product Details Page
- Large image
- Full description/specs
- Price + Add to Cart button

### ✅ Cart Page
- List of items
- Total price
- Checkout button

### ✅ Checkout Page
- Payment form (via Flutterwave or Stripe)
- Summary of order
- Success/failure message

### ✅ Admin Page
- Form to Add/Edit/Delete products
- Product management table (optional)
- Admin protected route

---

## 🔐 Firebase Setup

1. Create Firebase project
2. Enable:
   - Firestore
   - Firebase Auth (email/password)
   - Firebase Storage
3. Create `.env`:
```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. `src/services/firebase.js`:
```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

---

## 🛠️ Suggested Components

- `Navbar.jsx`
- `Footer.jsx`
- `ProductCard.jsx`
- `CartItem.jsx`
- `ProductForm.jsx` (for Admin)

---

## 🔐 Route Structure

| Path            | Page           |
|------------------|----------------|
| `/`              | Home           |
| `/products`      | Product List   |
| `/products/:id`  | Product Detail |
| `/cart`          | Cart           |
| `/checkout`      | Checkout       |
| `/admin`         | Admin Page     |
| `/login`         | Login          |
| `/signup`        | Signup         |

---

## 🔄 Firestore Data Models

### `products`
```json
{
  "name": "Smartphone X100",
  "price": 500,
  "description": "Flagship phone with awesome camera",
  "imageUrl": "https://...",
  "stock": 12,
  "category": "Phones"
}
```

### `orders`
```json
{
  "userId": "abc123",
  "products": [{ "productId": "123", "quantity": 2 }],
  "total": 1000,
  "status": "paid"
}
```

### `users`
```json
{
  "uid": "abc123",
  "email": "user@example.com",
  "displayName": "Victor"
}
```

---

## ✅ MVP Feature Checklist

### User
- [x] View products
- [x] Add to cart
- [x] Checkout and payment
- [x] View order history

### Admin
- [x] Add/edit/delete products
- [x] View orders

---

## 🧠 Extras (if time permits)
- Search/filter
- Responsive layout
- Order email confirmation
- Product reviews

---

## 🧪 Deployment
- Use Vercel or Netlify
- Set environment variables in dashboard
- Test all flows

---

## 💬 Need help?
Glef’s got your back! Ping me anytime.
