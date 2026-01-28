function PaymentMethod() {
  return (
    <div className="px-4 py-6 bg-white border-b border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-walmart-text">Payment method</h3>
        <button className="text-base text-walmart-text underline">Add new payment</button>
      </div>

      {/* OnePay Wallet Card */}
      <div className="rounded-lg overflow-hidden shadow-md">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-[#3C3C3C] to-[#1E1E1E] p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              {/* OnePay Logo */}
              <svg width="50" height="20" viewBox="0 0 50 20" fill="white">
                <text x="0" y="15" fill="white" fontSize="14" fontWeight="bold">OnePay</text>
              </svg>
              <span className="text-white text-sm font-bold">Wallet</span>
            </div>
            <button className="bg-white text-walmart-text text-sm font-bold py-1.5 px-4 rounded-full">
              Learn more
            </button>
          </div>
          <p className="text-white text-sm font-bold">Welcome bonus: $10 when you spend $10+</p>
        </div>

        {/* Footer */}
        <div className="bg-walmart-light-bg p-4 flex items-center gap-3">
          <div className="w-9 h-6 bg-onepay-blue rounded flex-shrink-0"></div>
          <p className="text-xs text-walmart-text flex-1">
            Rack up rewards when you shop with any credit or debit card. Redeem with a OnePay Cash account.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PaymentMethod
