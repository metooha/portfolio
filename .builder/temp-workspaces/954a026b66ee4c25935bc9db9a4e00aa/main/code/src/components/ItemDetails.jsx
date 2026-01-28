function ItemDetails({ title, itemCount, images, isRestaurant }) {
  return (
    <div className="px-4 py-4 border-b border-gray-100">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-bold text-walmart-text">{title}</h3>
        <button className="text-sm text-walmart-text underline">View</button>
      </div>
      
      <p className="text-sm text-walmart-subtle mb-4">{itemCount} items</p>

      {!isRestaurant && (
        <>
          <div className="flex items-center gap-2 mb-4">
            {images && images.slice(0, 4).map((img, idx) => (
              <div key={idx} className="w-12 h-12 bg-gray-100 rounded border border-gray-200 relative overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200"></div>
                {idx === 2 && (
                  <div className="absolute inset-0 bg-walmart-blue rounded-full w-3 h-3 top-0 right-0 flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">2</span>
                  </div>
                )}
              </div>
            ))}
            {itemCount > 4 && (
              <div className="w-12 h-12 flex items-center justify-center text-walmart-text font-bold text-lg">
                +{itemCount - 4}
              </div>
            )}
          </div>

          <div className="bg-walmart-light-blue rounded-lg p-3 flex items-start gap-3">
            <div className="w-6 h-6 bg-walmart-blue rounded-full flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M13.2843 2.58859L13.3536 2.64645L14.8536 4.14645C15.0271 4.32001 15.0464 4.58944 14.9114 4.78431L14.8536 4.85355L13.3536 6.35355C13.1583 6.54882 12.8417 6.54882 12.6464 6.35355C12.4729 6.17999 12.4536 5.91056 12.5886 5.71569L12.6464 5.64645L13.293 5H11.4782C10.1448 5 8.93352 5.75682 8.34476 6.94045L8.26118 7.12079L7.999 7.731L7.73882 7.12128C7.18104 5.99982 6.06459 5.26149 4.73126 5.00622L4.52181 5H1.5C1.22386 5 1 4.77614 1 4.5C1 4.25454 1.17688 4.05039 1.41012 4.00805L1.5 4H4.52181C5.85524 4 7.06648 4.75682 7.65524 5.94045L7.73882 6.12079L7.999 6.731L8.25918 6.12128C8.81696 5.00182 9.93341 4.26349 11.3028 4.00822L11.4782 4H13.293L12.6464 3.35355L12.5886 3.28431C12.4536 3.08944 12.4729 2.82001 12.6464 2.64645C12.8417 2.45118 13.1583 2.45118 13.3536 2.64645L13.2843 2.58859Z" fill="white"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-walmart-text">
                Choose your <span className="underline font-medium">substitution preferences</span>.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ItemDetails
