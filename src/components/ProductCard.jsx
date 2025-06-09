import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Star } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const ProductCard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
   const { addToCart } = useCart();
  useEffect(() => {
      const fetchProducts = async () =>{
        try{
          const productsCol = collection(db, "products")
          const productSnapshot = await getDocs(productsCol)

          const productList = productSnapshot.docs.map(doc =>({
            id: doc.id,
            ...doc.data(),
          }));

          setProducts(productList);
          setLoading(false)
        }catch (err) {
          console.error("no products to fetch", err)
          setLoading(false)
        }
      }

      fetchProducts();
  }, [])
  
  if (loading) return <p>Loading products...</p>;
  return (
    <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <>
        <div key={product.id} className="border rounded p-4 shadow w-fit">
          <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
          <h2 className="text-lg font-bold mt-2">Name: {product.name}</h2>
          <p className="text-gray-600">Category: {product.category}</p>
          <p className="text-green-600 font-semibold">Price: ₦{product.price}</p>
          <div className="flex items-center mb-2">
              {Array(5).fill().map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`mr-1 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
                  fill={i < 4 ? "#facc15" : "none"}
                />
              ))}
              <span className="text-sm text-gray-500 ml-1">(4.0)</span>
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                View Product
              </button>

              <button
                className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          {/*<Link to={\`/products/\${product.id}\`} className="text-blue-500 hover:underline">View Details</Link>*/}
        </div>
        
            </>
      ))}
    </div>
  );
};

export default ProductCard;