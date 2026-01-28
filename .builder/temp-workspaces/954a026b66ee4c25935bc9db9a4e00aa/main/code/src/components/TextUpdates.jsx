function TextUpdates({ enabled, onToggle }) {
  return (
    <div className="mx-4 my-6 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-3">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d="M7.5 1.5C5.84315 1.5 4.5 2.84315 4.5 4.5V19.5C4.5 21.1569 5.84315 22.5 7.5 22.5H16.5C18.1569 22.5 19.5 21.1569 19.5 19.5V4.5C19.5 2.84315 18.1569 1.5 16.5 1.5H7.5Z" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
        <h3 className="flex-1 text-lg font-bold text-walmart-text">Text updates for this order</h3>
      </div>

      <div className="px-4 py-4">
        <div className="flex items-start gap-3 mb-4">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => onToggle(e.target.checked)}
            className="w-5 h-5 mt-0.5 rounded border-2 border-walmart-border accent-walmart-blue"
          />
          <label className="text-sm font-bold text-walmart-text">Send to (xxx) xxx-5678</label>
        </div>

        <div className="pl-8">
          <button className="text-sm text-walmart-text underline mb-3">Send to a different phone number</button>
          <p className="text-xs text-walmart-subtle">
            Number and frequency of automated texts may vary based on your order. Consent not required for purchase. Message and data rates may apply. By continuing, you agree to our{' '}
            <span className="underline">Mobile Alert Terms</span>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default TextUpdates
