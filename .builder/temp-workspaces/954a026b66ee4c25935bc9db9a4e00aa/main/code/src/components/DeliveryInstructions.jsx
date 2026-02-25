function DeliveryInstructions({ selected, onSelect }) {
  return (
    <div className="px-4">
      <div className="h-px bg-[#E3E4E5] mb-4" />

      <h3 className="text-base font-bold text-walmart-text leading-6 mb-4">Delivery instructions </h3>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => onSelect('leave')}
          className={`flex-1 h-8 flex items-center justify-center rounded text-sm transition-all ${
            selected === 'leave'
              ? 'border-2 border-black bg-white text-black font-bold'
              : 'border border-walmart-border bg-white text-walmart-text'
          }`}
        >
          Leave at my door
        </button>
        <button
          onClick={() => onSelect('handoff')}
          className={`flex-1 h-8 flex items-center justify-center rounded text-sm transition-all ${
            selected === 'handoff'
              ? 'border-2 border-black bg-white text-black font-bold'
              : 'border border-walmart-border bg-white text-walmart-text'
          }`}
        >
          Require handoff
        </button>
      </div>

      <div className="flex items-start gap-2 text-xs text-walmart-subtle leading-4">
        <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
          <path d="M7.40039 7H8.60039V11.5H7.40039V7Z" fill="#2E2F32"/>
          <path d="M7.99961 6.3C8.49667 6.3 8.89961 5.89706 8.89961 5.4C8.89961 4.90294 8.49667 4.5 7.99961 4.5C7.50255 4.5 7.09961 4.90294 7.09961 5.4C7.09961 5.89706 7.50255 6.3 7.99961 6.3Z" fill="#2E2F32"/>
          <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14Z" fill="#2E2F32"/>
        </svg>
        <p>Make sure you're present for this no contact delivery. You are responsible for your items, including chilled food.</p>
      </div>
    </div>
  )
}

export default DeliveryInstructions
