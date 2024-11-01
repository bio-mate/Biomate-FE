import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
  const [amount, setAmount] = useState(500); // Initial amount in INR
  const [referralCode, setReferralCode] = useState('');
  const [finalAmount, setFinalAmount] = useState(amount);

  const applyReferralCode = () => {
    // Simple logic for referral code
    if (referralCode === 'DISCOUNT10') {
      const discount = amount * 0.1; // 10% discount
      setFinalAmount(amount - discount);
    }
  };

  const handlePayment = async () => {
    const order = await axios.post('http://localhost:5000/api/payment/order', { amount: finalAmount });
    
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: order.data.amount,
      currency: "INR",
      name: "Your Company Name",
      description: "Payment Description",
      order_id: order.data.id,
      handler: async (response) => {
        // Store payment data in database
        await axios.post('http://localhost:5000/api/payment/store', {
          amount: finalAmount,
          referralCode,
          paymentId: response.razorpay_payment_id,
        });
        alert('Payment successful');
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div>
      <h2>Payment Page</h2>
      <input
        type="text"
        placeholder="Referral Code"
        value={referralCode}
        onChange={(e) => setReferralCode(e.target.value)}
      />
      <button onClick={applyReferralCode}>Apply</button>
      <h3>Amount: ₹{finalAmount}</h3>
      <button onClick={handlePayment}>Pay</button>
    </div>
  );
};

export default Payment;
