function OrderSummary() {
  return (
    <div className="px-4 py-6 bg-white">
      {/* Promo code */}
      <div className="pb-4 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-sm text-walmart-text">Have a promo code?</span>
          <button>
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path d="M12.5652 17.001L21 7.78762L19.8695 6.75L12 15.346L4.13049 6.75L3 7.78762L11.4348 17.001C11.58 17.1597 11.7851 17.25 12 17.25C12.2149 17.25 12.42 17.1597 12.5652 17.001Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Subtotal */}
      <div className="py-4 border-b border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-walmart-text">Subtotal</span>
            <span className="text-base text-walmart-text">(8 items)</span>
          </div>
          <span className="text-base font-bold text-walmart-text">$53.92</span>
        </div>

        {/* Driver tip */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-walmart-text">Driver tip</span>
          <span className="text-sm font-bold text-walmart-text">$5.39</span>
        </div>

        {/* Delivery */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M0.822266 11.7646C1.35603 11.7646 1.64648 12.0957H1.64648V15.2051C1.64648 15.5117 0.823242 15.7646C0.365288 15.7646 0 15.4982 0.000976562 15.2051V12.0957C0 11.9107 0.542357 11.7659 0.822266 11.7646Z" fill="#FFC220"/>
              </svg>
              <span className="text-sm font-bold text-walmart-blue">Free delivery from store</span>
            </div>
          </div>
          <span className="text-sm text-walmart-text"><s>$9.95</s> $0</span>
        </div>

        {/* Express fee */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-walmart-text">Express</span>
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M7.40039 7H8.60039V11.5H7.40039V7Z" fill="currentColor"/>
              <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </div>
          <span className="text-sm font-bold text-walmart-text">$9.95</span>
        </div>
      </div>

      {/* Est. Tax */}
      <div className="py-4 border-b border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-walmart-text">Est. tax</span>
          <span className="text-sm font-bold text-walmart-text">$5.45</span>
        </div>

        {/* Bag fee */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-walmart-text">Bag fee</span>
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M7.40039 7H8.60039V11.5H7.40039V7Z" fill="currentColor"/>
              <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </div>
          <span className="text-sm font-bold text-walmart-text">$0.29</span>
        </div>
      </div>

      {/* Adjustment charge */}
      <div className="py-4 border-b border-gray-100">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-walmart-text">Adjustment charge</span>
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M7.40039 7H8.60039V11.5H7.40039V7Z" fill="currentColor"/>
              <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </div>
          <span className="text-sm font-bold text-walmart-text">$79.00</span>
        </div>

        <p className="text-xs text-gray-600 leading-tight">
          This covers adjustments to your final order total for items that are priced by weight or potentially substituted, and state bag fees where applicable. After your final order total is confirmed, <span className="font-bold">we'll refund any amount that's left over.</span> If needed, your credit or debit card will be used to cover any cost differences that may exceed the adjustment charge amount.
        </p>
      </div>

      {/* Feedback */}
      <div className="py-4 flex items-center justify-center gap-2">
        <span className="text-sm text-walmart-text">We'd love to hear what you think!</span>
        <button className="text-sm text-walmart-text underline">Share feedback</button>
      </div>
    </div>
  )
}

export default OrderSummary
