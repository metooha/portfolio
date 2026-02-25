function ItemDetails({ title, itemCount, showSubstitution, isRestaurant }) {
  return (
    <div className="px-4 pt-4">
      <div className="h-px bg-[#E3E4E5] mb-4" />

      <div className="flex justify-between items-start mb-1">
        <h3 className="text-base font-bold text-walmart-text leading-6">{title}</h3>
        <button className="text-sm text-walmart-text underline leading-5">View</button>
      </div>

      <p className="text-sm text-walmart-subtle leading-5 mb-4">{itemCount} items</p>

      {/* Product thumbnails */}
      <div className="flex items-center gap-4 mb-4">
        {!isRestaurant ? (
          <>
            <div className="w-10 h-10 bg-gray-200 rounded" />
            <div className="w-10 h-10 bg-gray-200 rounded" />
            <div className="w-10 h-10 bg-gray-200 rounded relative">
              {/* Badge showing quantity 2 */}
              <div className="absolute -top-2.5 -right-0 w-4 h-4 bg-white rounded-full border border-[#E3E4E5] flex items-center justify-center">
                <span className="text-walmart-text text-xs font-bold leading-4">2</span>
              </div>
            </div>
            <div className="w-10 h-10 bg-gray-200 rounded" />
            <span className="text-base font-bold text-walmart-text">+2</span>
          </>
        ) : (
          <div className="w-10 h-10 bg-gray-200 rounded" />
        )}
      </div>

      {/* Substitution preferences - Walmart items only */}
      {showSubstitution && (
        <div className="mx-0 mb-4">
          <div className="bg-[#E9F1FE] h-10 px-4 flex items-center gap-4">
            <div className="w-6 h-6 flex-shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="12" fill="#0071DC"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M17.284 6.589L17.354 6.646L18.854 8.146C19.027 8.32 19.046 8.589 18.911 8.784L18.854 8.854L17.354 10.354C17.158 10.549 16.842 10.549 16.646 10.354C16.473 10.18 16.454 9.911 16.589 9.716L16.646 9.646L17.293 9H15.478C14.145 9 12.934 9.757 12.345 10.941L12.261 11.121L11.543 12.001L12.18 13.487C12.551 14.352 13.374 14.931 14.303 14.996L14.478 15.002L17.293 15.002L16.646 14.356L16.589 14.286C16.454 14.091 16.473 13.822 16.646 13.649C16.82 13.475 17.089 13.456 17.284 13.591L17.354 13.649L18.854 15.149L18.911 15.218C19.03 15.388 19.03 15.616 18.911 15.786L18.854 15.856L17.354 17.356L17.284 17.414C17.114 17.532 16.886 17.532 16.716 17.414L16.646 17.356L16.589 17.286C16.471 17.116 16.471 16.888 16.589 16.718L16.646 16.649L17.293 16.002L15.478 16.002C14.145 16.002 12.934 15.245 12.345 14.062L12.261 13.881L11.999 13.269L11.739 13.879L11.655 14.059C11.097 15.181 9.981 15.919 8.731 15.994L8.522 16H5.5L5.41 15.992C5.177 15.95 5 15.746 5 15.5C5 15.255 5.177 15.05 5.41 15.008L5.5 15H8.522L8.697 14.994C9.565 14.933 10.339 14.425 10.74 13.654L10.82 13.485L11.455 12.001L10.82 10.517C10.449 9.652 9.626 9.073 8.697 9.008L8.522 9.002H5.5C5.224 9.002 5 8.778 5 8.502C5 8.257 5.177 8.052 5.41 8.01L5.5 8.002H8.522C9.855 8.002 11.066 8.759 11.655 9.943L11.739 10.123L11.999 10.732L12.261 10.121L12.345 9.941C12.903 8.819 14.019 8.081 15.269 8.006L15.478 8H17.293L16.646 7.354C16.473 7.18 16.454 6.911 16.589 6.716L16.646 6.646C16.82 6.473 17.089 6.454 17.284 6.589Z" fill="white"/>
              </svg>
            </div>
            <p className="text-sm text-walmart-text leading-5">
              Choose your <span className="underline text-black">substitution preferences</span>.
            </p>
          </div>
        </div>
      )}

      {/* Utensils checkbox - Restaurant items only */}
      {isRestaurant && (
        <div className="pb-2">
          <label className="flex items-start gap-3">
            <div className="w-5 h-5 mt-1 rounded border border-walmart-border flex-shrink-0" />
            <span className="text-sm text-walmart-text leading-5">Request utensils</span>
          </label>
        </div>
      )}
    </div>
  )
}

export default ItemDetails
