function TextUpdates({ enabled, onToggle }) {
  return (
    <div className="mx-4 mt-4 rounded-lg bg-white shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)] overflow-hidden">
      {/* Card Header */}
      <div className="flex items-center gap-2 px-4 py-4 border-b border-[#E3E4E5]">
        {/* Phone icon */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M14.25 19.5H9.75V18H14.25V19.5Z" fill="#2E2F32"/>
          <path d="M7.5 1.5C5.84315 1.5 4.5 2.84315 4.5 4.5V19.5C4.5 21.1569 5.84315 22.5 7.5 22.5H16.5C18.1569 22.5 19.5 21.1569 19.5 19.5V4.5C19.5 2.84315 18.1569 1.5 16.5 1.5H7.5ZM16.5 3C17.3284 3 18 3.67157 18 4.5V19.5C18 20.3284 17.3284 21 16.5 21H7.5C6.67157 21 6 20.3284 6 19.5V4.5C6 3.67157 6.67157 3 7.5 3H16.5Z" fill="#2E2F32"/>
        </svg>
        <h3 className="flex-1 text-lg font-bold text-walmart-text min-h-[40px] flex items-center">Text updates for this order</h3>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Checkbox row */}
        <div className="flex items-start gap-3 pb-4">
          <button
            onClick={() => onToggle(!enabled)}
            className="mt-1 flex-shrink-0"
          >
            {enabled ? (
              <div className="w-[18px] h-[18px] bg-walmart-text rounded-sm flex items-center justify-center">
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.251 0.237245C10.5802 -0.084374 11.1078 -0.0782193 11.4294 0.250992C11.6711 0.498322 11.7309 0.863165 11.5805 1.19082L11.5142 1.31164L11.4157 1.42942L3.66552 9.00085C3.40548 9.2549 3.01752 9.30672 2.6864 9.13236L2.56525 9.05633L2.46375 8.96221L0.213909 6.46221C-0.0939615 6.12011 -0.0662107 5.5932 0.275892 5.28533C0.538656 5.04886 0.915729 5.00768 1.23677 5.18057L1.3542 5.25548L1.45275 5.34729L3.12134 7.20171L10.251 0.237245Z" fill="white"/>
                </svg>
              </div>
            ) : (
              <div className="w-[18px] h-[18px] border border-walmart-border rounded-sm" />
            )}
          </button>
          <span className="text-sm font-bold text-walmart-text leading-5">Send to (xxx) xxx-5678</span>
        </div>

        {/* Change phone number link */}
        <div className="pl-8 mb-4">
          <button className="text-sm text-walmart-text underline leading-5">Send to a different phone number</button>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-walmart-subtle leading-4">
          If you uncheck the box above, you acknowledge that you're only opting out of text updates for this order, unless you save the preference.
          {'\n'}Number and frequency of automated texts may vary based on your order. Consent not required for purchase. Message and data rates may apply. By continuing, you agree to our{' '}
          <span className="underline text-black">Mobile Alert Terms</span>.{' '}
        </p>
      </div>
    </div>
  )
}

export default TextUpdates
