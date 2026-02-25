function OrderSummary() {
  return (
    <div className="mt-4">
      {/* Promo code */}
      <div className="h-px bg-[#E3E4E5]" />
      <div className="px-4 py-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-walmart-text leading-5">Have a promo code?</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12.5652 17.001L21 7.78762L19.8695 6.75L12 15.346L4.13049 6.75L3 7.78762L11.4348 17.001C11.58 17.1597 11.7851 17.25 12 17.25C12.2149 17.25 12.42 17.1597 12.5652 17.001Z" fill="#2E2F32"/>
          </svg>
        </div>
      </div>

      <div className="h-px bg-[#E3E4E5]" />

      {/* Subtotal */}
      <div className="px-4 py-4">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-base font-bold text-walmart-text leading-6">Subtotal</span>
            <span className="text-base text-walmart-text leading-6"> (8 items)</span>
          </div>
          <span className="text-base font-bold text-walmart-text leading-6">$55.39</span>
        </div>
      </div>

      {/* Fees section */}
      <div className="px-4">
        <div className="h-px bg-[#E3E4E5] mb-4" />

        {/* Delivery - W+ free */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-1 flex-1">
            {/* W+ logo */}
            <svg width="19" height="16" viewBox="0 0 19 16" fill="none" className="flex-shrink-0">
              <path d="M0.822266 11.7646C1.10391 11.7646 1.35087 11.9059 1.36719 12.0957L1.64648 15.2051C1.67207 15.5117 1.28198 15.7646 0.823242 15.7646C0.365288 15.7646 -0.0188536 15.4982 0.000976562 15.2051L0.279297 12.0957C0.297034 11.9107 0.542357 11.7659 0.822266 11.7646ZM4.66309 9.42969L7.53223 10.7549C7.81166 10.89 7.84107 11.352 7.6123 11.7471C7.38175 12.1411 6.9694 12.3463 6.70898 12.1729L4.11816 10.3691C3.97045 10.2464 3.95893 9.97381 4.09863 9.73145C4.24016 9.48807 4.4839 9.36223 4.66309 9.42969ZM6.70898 3.35645C6.97017 3.18336 7.3812 3.38712 7.61133 3.78125C7.8388 4.17553 7.81521 4.63303 7.53027 4.76953L4.66699 6.09375C4.49845 6.17602 4.24482 6.03378 4.10449 5.79199C3.964 5.5493 3.96235 5.27291 4.12305 5.1582L6.70898 3.35645ZM0.823242 0C1.28172 0 1.67397 0.254563 1.64648 0.55957L1.36719 3.66895C1.35603 3.86589 1.10383 4 0.822266 4C0.542582 3.99984 0.297182 3.85114 0.280273 3.66895L0.00195312 0.55957C-0.0269993 0.245669 0.36565 0.000156606 0.823242 0Z" fill="#FFC220"/>
              <path d="M2.1123 2.79004C2.28537 3.64318 2.44528 4.53778 2.56543 5.24512H2.58691C2.70421 4.49408 2.88805 3.78192 3.08496 2.90039L3.78027 0H5.31836L5.96875 2.97559C6.13945 3.80368 6.27503 4.44174 6.38184 5.21191H6.40332C6.52085 4.43429 6.67298 3.76988 6.84082 2.91992L7.46484 0H8.94141L7.1123 6.75391C5.94764 7.00297 5.5013 6.5454 5.34082 5.81934C5.18156 5.09637 4.87093 3.72221 4.86816 3.70996C4.70798 2.95293 4.58309 2.41855 4.49512 1.6416H4.47363C4.34872 2.41113 4.21771 2.95046 4.02344 3.70703L3.25586 6.75391C2.06669 6.98489 1.65391 6.64185 1.4248 5.71094C1.22899 4.91396 0.00662717 0.0264979 0 0H1.55469C1.69907 0.712249 2.10897 2.77329 2.1123 2.79004ZM11.8818 0.941406C12.2377 0.941406 12.5191 1.18402 12.5273 1.43359L12.5859 2.94531L14.0967 3.00195C14.3451 3.01096 14.5879 3.29131 14.5879 3.64648C14.5878 4.00245 14.3452 4.28355 14.0957 4.29199L12.5811 4.34766L12.5273 5.86133C12.5183 6.10967 12.2382 6.35249 11.8828 6.35254C11.5271 6.35254 11.2458 6.10983 11.2373 5.86035L11.1797 4.34766L9.66797 4.29199C9.41946 4.28296 9.17694 4.00266 9.17676 3.64746C9.17676 3.29159 9.41939 3.01027 9.66895 3.00195L11.1846 2.94141L11.2373 1.43262C11.2465 1.18427 11.5265 0.94148 11.8818 0.941406Z" fill="#0071DC"/>
            </svg>
            <span className="text-sm font-bold text-[#0053E2] leading-5">Free delivery from store</span>
          </div>
          <div className="text-sm text-walmart-text leading-5">
            <span className="line-through">$9.95</span>
            <span> $0</span>
          </div>
        </div>

        {/* Express Delivery */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-walmart-text leading-5">Express Delivery</span>
          <span className="text-sm text-walmart-text leading-5">$10.00</span>
        </div>

        {/* Estimated taxes */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-walmart-text leading-5">Estimated taxes</span>
          <span className="text-sm text-walmart-text leading-5">$7.54</span>
        </div>
      </div>

      {/* Divider */}
      <div className="px-4 py-4">
        <div className="h-px bg-[#E3E4E5]" />
      </div>

      {/* Driver tip */}
      <div className="px-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-base font-bold text-walmart-text leading-6">Driver tip</span>
          <span className="text-base font-bold text-walmart-text leading-6">$5.39</span>
        </div>
        <p className="text-xs text-walmart-subtle leading-4 mb-4">(charged separately after delivery)</p>
      </div>

      {/* Adjustment charge */}
      <div className="px-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold text-walmart-text leading-5">Estimated total</span>
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
              <path d="M7.40039 7H8.60039V11.5H7.40039V7Z" fill="#2E2F32"/>
              <path d="M7.99961 6.3C8.49667 6.3 8.89961 5.89706 8.89961 5.4C8.89961 4.90294 8.49667 4.5 7.99961 4.5C7.50255 4.5 7.09961 4.90294 7.09961 5.4C7.09961 5.89706 7.50255 6.3 7.99961 6.3Z" fill="#2E2F32"/>
              <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14Z" fill="#2E2F32"/>
            </svg>
          </div>
          <span className="text-sm font-bold text-walmart-text leading-5">$79.00</span>
        </div>

        <p className="text-xs text-[#515357] leading-4">
          <span>This covers adjustments to your final order total for items that are priced by weight or potentially substituted, and state bag fees where applicable. After your final order total is confirmed,</span>
          <span className="font-bold"> we'll refund any amount that's left over.{'\n'}</span>
          <span>If needed, your credit or debit card will be used to cover any cost differences that may exceed the adjustment charge amount.</span>
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#E3E4E5]" />

      {/* Feedback */}
      <div className="px-4 py-4 flex items-center justify-center gap-2">
        <span className="text-sm text-walmart-text leading-5">We'd love to hear what you think!</span>
        <button className="text-sm text-walmart-text underline leading-5">Give feedback</button>
      </div>
    </div>
  )
}

export default OrderSummary
