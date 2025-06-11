import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useAuth } from '../contexts/AuthContext'; // adjust based on your auth context
import Spinner from '../components/Spinner'; // optional spinner component

const OrderHistoryPage = () => {
  const { currentUser } = useAuth(); // must return user object with .uid
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) return;

      try {
        const q = query(
          collection(db, 'orders'),
          where('userId', '==', currentUser.uid),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const fetchedOrders = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  if (loading) return <Spinner message="Loading your orders..." />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Order History</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600 text-center">You haven’t placed any orders yet.</p>
      ) : (
        orders.map(order => (
          <div
            key={order.id}
            className="border p-4 mb-4 rounded shadow-sm bg-white"
          >
            <p className="font-semibold">Order ID: {order.orderId}</p>
            <p>Date: {order.createdAt?.toDate().toLocaleString()}</p>
            <p>Total: ₦{order.totalAmount?.toLocaleString()}</p>
            <div className="mt-4">
              <p className="font-semibold mb-2">Items:</p>
              <ul className="space-y-2">
                {order.cart?.map((item, i) => (
                  <li key={i} className="flex items-center space-x-4">
                    <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div>
                      <p>{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm">₦{item.price?.toLocaleString()}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistoryPage;
