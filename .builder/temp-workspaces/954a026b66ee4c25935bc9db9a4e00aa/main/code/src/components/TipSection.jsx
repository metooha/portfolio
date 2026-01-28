function TipSection({ selectedTip, onSelectTip }) {
  const tips = [
    { id: '5', label: '5%', amount: '$3.00' },
    { id: '10', label: '10%', amount: '$5.39' },
    { id: '15', label: '15%', amount: '$15.00' },
    { id: 'none', label: 'No tip', amount: null },
  ]

  return (
    <div className="px-4 py-6 bg-white border-b border-gray-100">
      <h3 className="text-lg font-bold text-walmart-text mb-1">Driver tip</h3>
      <p className="text-xs text-walmart-subtle mb-4">100% of tips go to the driver</p>

      <div className="grid grid-cols-4 gap-2 mb-2">
        {tips.map((tip) => (
          <button
            key={tip.id}
            onClick={() => onSelectTip(tip.id)}
            className={`py-3 px-2 rounded border-2 text-center transition-all ${
              selectedTip === tip.id
                ? 'border-walmart-blue bg-white'
                : 'border-walmart-border bg-white'
            }`}
          >
            <div className={`text-sm ${selectedTip === tip.id ? 'font-bold' : 'font-normal'}`}>
              {tip.label}
            </div>
            {tip.amount && (
              <div className={`text-xs text-walmart-subtle ${selectedTip === tip.id ? 'font-bold' : ''}`}>
                {tip.amount}
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <button className="w-[153px] py-3 px-4 rounded border-2 border-walmart-border bg-white text-sm text-walmart-text">
          Custom
        </button>
      </div>

      <button className="text-sm text-walmart-text underline mb-2">View tip details</button>
      
      <p className="text-xs text-walmart-subtle">
        You can change your tip amount up to 3 hours after delivery. You won't be charged until 24 hours after delivery.
      </p>
    </div>
  )
}

export default TipSection
