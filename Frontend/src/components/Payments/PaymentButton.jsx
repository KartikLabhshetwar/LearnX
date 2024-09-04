import { useState } from 'react';
import api from '../../api/api';

const PaymentButton = ({ courseId, amount, user, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const initPayment = (data) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "LearnX",
      description: "Course Purchase",
      order_id: data.id,
      handler: async function (response) {
        try {
          setIsLoading(true);
          const { data } = await api.post('/payments/verify', response, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            }
          });
          console.log(data);
          alert(data.message);
          // Call onSuccess immediately without setTimeout
          onSuccess(courseId);
        } catch (error) {
          console.error('Payment verification failed:', error);
          setError("Payment verification failed. Please try again or refresh the page.");
        } finally {
          setIsLoading(false);
        }
      },
      prefill: {
        name: user.firstName,
        email: user.username,
      },
      theme: {
        color: "#3399cc"
      }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    if (!user || !user._id) {
      setError('Please sign in to make a purchase');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/payments/orders', { 
        amount, 
        userId: user._id, 
        courseId 
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });
      console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.error('Error initiating payment:', error);
      setError("Error creating order. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button 
        onClick={handlePayment} 
        className={`px-4 py-2 rounded text-white ${
          isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Buy Now"}
      </button>
      {isLoading && <div className="mt-2 text-sm text-gray-600">Please wait...</div>}
      {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
    </div>
  );
};

export default PaymentButton;