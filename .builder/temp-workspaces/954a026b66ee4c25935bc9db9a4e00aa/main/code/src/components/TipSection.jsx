function TipSection({ selectedTip, onSelectTip }) {
  const tips = [
    { id: '5', label: '5%', amount: '$3.00' },
    { id: '10', label: '10%', amount: '$5.39' },
    { id: '15', label: '15%', amount: '$15.00' },
    { id: 'none', label: 'No tip', amount: null },
  ]

  return (
    <div className="px-4 pt-4">
      <div className="h-px bg-[#E3E4E5] mb-4" />

      {/* Header */}
      <div className="flex items-center gap-1 mb-1">
        <span className="text-sm font-bold text-walmart-text leading-5">Driver tip (optional): $8.96</span>
        <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
          <path d="M7.40039 7H8.60039V11.5H7.40039V7Z" fill="#2E2F32"/>
          <path d="M7.99961 6.3C8.49667 6.3 8.89961 5.89706 8.89961 5.4C8.89961 4.90294 8.49667 4.5 7.99961 4.5C7.50255 4.5 7.09961 4.90294 7.09961 5.4C7.09961 5.89706 7.50255 6.3 7.99961 6.3Z" fill="#2E2F32"/>
          <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14Z" fill="#2E2F32"/>
        </svg>
      </div>
      <p className="text-xs text-walmart-subtle leading-4 mb-4">100% of tips go to the driver</p>

      {/* Tip chips - 4 column grid */}
      <div className="grid grid-cols-4 gap-2 mb-2">
        {tips.map((tip) => (
          <button
            key={tip.id}
            onClick={() => onSelectTip(tip.id)}
            className={`py-3 px-4 rounded flex flex-col items-center justify-center transition-all ${
              selectedTip === tip.id
                ? 'border-2 border-[#0053E2] bg-white'
                : 'border border-[#909196] bg-white'
            }`}
          >
            <span className={`text-sm text-walmart-text leading-5 ${selectedTip === tip.id ? 'font-bold' : ''}`}>
              {tip.label}
            </span>
            {tip.amount && (
              <span className={`text-xs text-walmart-subtle leading-4 ${selectedTip === tip.id ? 'font-bold' : ''}`}>
                {tip.amount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Custom tip button */}
      <button className="w-[153px] h-[57px] rounded border border-[#909196] bg-white text-sm text-walmart-text mb-4">
        Custom
      </button>

      {/* View tip details link */}
      <div className="mb-2">
        <button className="text-sm text-walmart-text underline leading-5">View tip details</button>
      </div>

      {/* Tip disclaimer */}
      <p className="text-xs text-walmart-subtle leading-4">
        You can change your tip amount up to 3 hours after delivery. You won't be charged until 24 hours after delivery.
      </p>
    </div>
  )
}

export default TipSection
