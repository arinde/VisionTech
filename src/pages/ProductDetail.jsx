import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { db } from '../services/firebase';
// import { doc, getDoc } from 'firebase/firestore';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Replace with real Firestore fetch
    // const fetchProduct = async () => {
    //   const docRef = doc(db, 'products', id);
    //   const docSnap = await getDoc(docRef);
    //   if (docSnap.exists()) {
    //     setProduct({ id: docSnap.id, ...docSnap.data() });
    //   }
    // };
    // fetchProduct();

    // Dummy data for scaffold
    setProduct({
      name: 'Smartphone X100',
      price: 500,
      imageUrl: '/images/sample-phone.jpg',
      description: 'Flagship phone with awesome camera and performance.',
    });
  }, [id]);

  if (!product) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover rounded mb-4" />
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-lg text-gray-700 mb-4">${product.price}</p>
      <p className="text-gray-600">{product.description}</p>
      <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Add to Cart</button>
    </div>
  );
};

export default ProductDetail;