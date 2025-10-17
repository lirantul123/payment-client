interface SuccessProps {
    amount: number;
  }
  
  const SuccessPage = ({ amount }: SuccessProps) => {
    return (
      <div className="bg-white shadow-xl rounded-2xl p-8 w-[400px] text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-2">
          ✅ Payment Successful!
        </h1>
        <p className="text-gray-700 mb-4">
          You paid ${(amount / 100).toFixed(2)} successfully.
        </p>
        <p className="text-gray-500 text-sm">
          The transaction has been securely processed via Stripe.
        </p>
      </div>
    );
  };
  
  export default SuccessPage;
  