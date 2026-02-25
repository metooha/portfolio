function PaymentMethod() {
  return (
    <div className="mx-4 mt-4 rounded-lg bg-white shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)] overflow-hidden">
      {/* Card Header */}
      <div className="flex items-center gap-2 px-4 py-4 border-b border-[#E3E4E5]">
        {/* Wallet icon */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M19.5 3.0161C19.5 2.07488 18.6432 1.36621 17.7187 1.54271L3.44337 4.268C2.31568 4.48328 1.5 5.46941 1.5 6.61747C1.5 7.93848 2.57089 9.00937 3.8919 9.00937H21V11.2594H15C14.1716 11.2594 13.5 11.931 13.5 12.7594V17.2594C13.5 18.0878 14.1716 18.7594 15 18.7594H21V21.0094H3V11.2594H1.5V21.0094C1.5 21.8378 2.17157 22.5094 3 22.5094H21C21.8284 22.5094 22.5 21.8378 22.5 21.0094V9.00937C22.5 8.18094 21.8284 7.50937 21 7.50937H3.8919C3.39932 7.50937 3 7.11005 3 6.61747C3 6.18938 3.30415 5.82167 3.72465 5.74139L18 3.0161V5.25933H19.5V3.0161ZM21 17.2594V12.7594H15L15 17.2594H21Z" fill="#2E2F32"/>
        </svg>
        <h3 className="flex-1 text-lg font-bold text-walmart-text min-h-[40px] flex items-center">Payment method</h3>
        <button className="text-base text-walmart-text underline leading-6">Add new payment</button>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Visa Card Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/ad33659c33381eac40061641b81f19d65a13ad9f?width=96"
              alt="Visa"
              className="w-12 h-8 object-contain"
            />
            <span className="text-sm text-walmart-text leading-5">Ending in 5981</span>
          </div>
          <div className="flex items-center gap-1 py-1.5">
            <span className="text-sm text-walmart-text text-right leading-5">$78.32</span>
          </div>
        </div>

        {/* OnePay Wallet Promo Card */}
        <div className="rounded-lg overflow-hidden">
          {/* Dark header */}
          <div className="bg-gradient-to-r from-[#1E1E1E] to-[#3C3C3C] p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                {/* OnePay Logo + Wallet */}
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="text-white text-sm font-bold tracking-wide">OnePay</span>
                  <span className="text-white text-sm font-bold">Wallet</span>
                </div>
                <p className="text-white text-sm font-bold leading-[16.8px]">
                  Welcome bonus: $10{'\n'}when you spend $10+{' '}
                </p>
              </div>
              <button className="bg-white text-walmart-text text-sm font-bold py-1.5 px-4 rounded-full border border-walmart-text whitespace-nowrap ml-4">
                Learn more
              </button>
            </div>
          </div>

          {/* Light blue footer */}
          <div className="bg-[#E6F1FC] p-4 flex items-center gap-2 border-b border-[#E3E4E5] rounded-b-lg">
            {/* OnePay card preview */}
            <div className="w-9 h-[23px] bg-gradient-to-br from-[#5DC9FF] to-[#64CBFF] rounded-sm flex-shrink-0" />
            <p className="text-xs text-walmart-text leading-4 flex-1">
              Rack up rewards when you shop with any credit or debit card. Redeem with a OnePay Cash account.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentMethod
