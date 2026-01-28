function ExpressDelivery() {
  return (
    <div className="px-4 py-6 bg-white border-b border-gray-200 shadow-sm rounded-lg mx-4 mt-4">
      <div className="flex items-center gap-4">
        {/* Lightning icon */}
        <div className="w-10 h-10 rounded-full bg-walmart-dark-blue flex items-center justify-center flex-shrink-0">
          <svg width="19" height="23" viewBox="0 0 19 23" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M14.2172 0H7.52735C7.22726 0 6.95018 0.157905 6.8013 0.413771L0.111415 11.9106L0.0504827 12.0389C-0.1438 12.5588 0.244781 13.1392 0.837471 13.1392H8.78003L5.08297 21.8566C4.71298 22.7286 5.88886 23.4237 6.5004 22.6945L18.2077 8.73405L18.2865 8.6236C18.6038 8.09424 18.2218 7.39081 17.5622 7.39081H11.456L14.9482 1.22001C15.2579 0.672649 14.8548 0 14.2172 0Z" fill="#FFC220"/>
          </svg>
        </div>
        
        <h2 className="text-lg font-bold text-walmart-text">Express Delivery</h2>
      </div>
    </div>
  )
}

export default ExpressDelivery
