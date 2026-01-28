import { useState } from 'react'
import './App.css'

function App() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedCount, setSelectedCount] = useState(0)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [selectedFulfillment, setSelectedFulfillment] = useState('shipping')

  const productImages = [
    'https://api.builder.io/api/v1/image/assets/TEMP/0e9f56acb4b73d49d9c719e344e2749b06734156',
    'https://api.builder.io/api/v1/image/assets/TEMP/11e860e6c6d8cb29f2c7cc4c3b7569bd4c39f86b',
    'https://api.builder.io/api/v1/image/assets/TEMP/92e514fa0ca000c7235a389a674694144f8e041e',
    'https://api.builder.io/api/v1/image/assets/TEMP/519a8d2d29fd296e0edc97282b274fdbb00d8741',
    'https://api.builder.io/api/v1/image/assets/TEMP/e061b0ea48e798957a59498389ab9985a3230058',
    'https://api.builder.io/api/v1/image/assets/TEMP/ca15fc05e4cb08a17a8522123afa711cfad2384a'
  ]

  const countOptions = [
    { count: 1, price: '$3.68', subscribedPrice: '$3.50', available: true },
    { count: 4, price: '$14.72', subscribedPrice: '$13.99', available: true },
    { count: 6, price: '$22.08', subscribedPrice: '$20.98', available: true },
    { count: 10, price: '$36.80', subscribedPrice: '$34.96', available: false },
    { count: 12, price: '$44.16', subscribedPrice: '$41.95', available: true }
  ]

  const currentPrice = countOptions[selectedCount].price
  const subscribedPrice = countOptions[selectedCount].subscribedPrice

  return (
    <div className="min-h-screen bg-white font-everyday-sans">
      {/* Header */}
      <header className="bg-walmart-blue text-white shadow-walmart">
        {/* Status Bar */}
        <div className="h-8 bg-walmart-blue flex items-center justify-between px-8">
          <span className="text-[15px] font-bold">9:41</span>
          <div className="flex items-center gap-1">
            {/* Signal icons */}
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 7.83368H2C2.27614 7.83368 2.5 8.05754 2.5 8.33368V10.3337C2.49982 10.6097 2.27603 10.8337 2 10.8337H1C0.723966 10.8337 0.500176 10.6097 0.5 10.3337V8.33368C0.5 8.05754 0.723857 7.83368 1 7.83368ZM5.66699 5.83368H6.66699C6.94298 5.83386 7.16699 6.05765 7.16699 6.33368V10.3337C7.16682 10.6096 6.94287 10.8335 6.66699 10.8337H5.66699C5.39096 10.8337 5.16717 10.6097 5.16699 10.3337V6.33368C5.16699 6.05754 5.39085 5.83368 5.66699 5.83368ZM10.333 3.49969H11.333C11.609 3.49969 11.8328 3.7237 11.833 3.99969V10.3337C11.8328 10.6097 11.609 10.8337 11.333 10.8337H10.333C10.0571 10.8335 9.83318 10.6096 9.83301 10.3337V3.99969C9.83318 3.72381 10.0571 3.49988 10.333 3.49969ZM15 1.16669H16C16.2761 1.16669 16.5 1.39054 16.5 1.66669V10.3337C16.4998 10.6097 16.276 10.8337 16 10.8337H15C14.724 10.8337 14.5002 10.6097 14.5 10.3337V1.66669C14.5 1.39054 14.7239 1.16669 15 1.16669Z" fill="white" stroke="white"/>
            </svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.578125 3.60608C4.57715 -0.0922415 10.7546 -0.0917604 14.7539 3.60608L13.8516 4.51526C12.1627 2.97419 9.95842 2.11497 7.66699 2.11487C5.37501 2.11489 3.1696 2.97365 1.48047 4.51526L0.578125 3.60608Z" fill="white" stroke="white"/>
            </svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.0423 2.83331H18.6243C19.1779 2.83333 19.3002 2.89086 19.4153 2.95245C19.5455 3.02206 19.6446 3.12114 19.7142 3.25128C19.7758 3.36644 19.8333 3.48869 19.8333 4.0423V7.95734C19.8333 8.51078 19.7757 8.63324 19.7142 8.74835C19.6446 8.87845 19.5454 8.97758 19.4153 9.04718C19.3002 9.10877 19.1779 9.1663 18.6243 9.16632H4.0423C3.4887 9.1663 3.36645 9.10877 3.25128 9.04718C3.1212 8.97758 3.02203 8.87845 2.95245 8.74835C2.8909 8.63324 2.83331 8.51078 2.83331 7.95734V4.0423L2.84308 3.70148C2.86211 3.42801 2.90625 3.33767 2.95245 3.25128C3.02206 3.12114 3.12114 3.02206 3.25128 2.95245C3.33767 2.90625 3.42801 2.86211 3.70148 2.84308L4.0423 2.83331Z" fill="white" stroke="white"/>
            </svg>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-4 px-4 py-2">
          <button className="text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="flex-1 bg-white rounded-walmart-round h-10 flex items-center px-3 gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M6.5 1C9.53757 1 12 3.46243 12 6.5C12 7.83875 11.5217 9.06578 10.7266 10.0195L14.8536 14.1464C15.0488 14.3417 15.0488 14.6583 14.8536 14.8536C14.68 15.0271 14.4106 15.0464 14.2157 14.9114L14.1464 14.8536L10.0195 10.7266C9.06578 11.5217 7.83875 12 6.5 12C3.46243 12 1 9.53757 1 6.5C1 3.46243 3.46243 1 6.5 1ZM6.5 2C4.01472 2 2 4.01472 2 6.5C2 8.98528 4.01472 11 6.5 11C8.98528 11 11 8.98528 11 6.5C11 4.01472 8.98528 2 6.5 2Z" fill="#2E2F32"/>
            </svg>
            <input 
              type="text" 
              placeholder="Search Walmart"
              className="flex-1 outline-none text-sm text-walmart-text"
            />
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 0H14C15.1046 0 16 0.89543 16 2V14C16 15.1046 15.1046 16 14 16H2C0.89543 16 0 15.1046 0 14V2C0 0.89543 0.89543 0 2 0Z" fill="#2E2F32"/>
              <path d="M4 4H12V6H4V4ZM4 7H12V9H4V7ZM4 10H9V12H4V10Z" fill="white"/>
            </svg>
          </div>
          <div className="relative">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 18C5.89543 18 5 18.8954 5 20C5 21.1046 5.89543 22 7 22C8.10457 22 9 21.1046 9 20C9 18.8954 8.10457 18 7 18Z" fill="white"/>
              <path d="M17 18C15.8954 18 15 18.8954 15 20C15 21.1046 15.8954 22 17 22C18.1046 22 19 21.1046 19 20C19 18.8954 18.1046 18 17 18Z" fill="white"/>
              <path d="M7.2 14.8L5.6 4H2V2H7L8.6 12.8H18.2L20 6H8.8L9.2 8H17.6L16.4 12H8.4L7.2 14.8Z" fill="white"/>
            </svg>
            <div className="absolute -top-1 -right-1 bg-walmart-warning rounded-walmart-round w-4 h-4 flex items-center justify-center">
              <span className="text-walmart-text text-[12px] font-bold leading-none">5</span>
            </div>
          </div>
        </div>

        {/* Cart Total */}
        <div className="absolute top-8 right-4 text-white text-xs">
          $61.13
        </div>

        {/* Location Bar */}
        <div className="bg-walmart-blue px-4 py-2 flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#D2EFF9"/>
            <path d="M12 8C10.34 8 9 9.34 9 11C9 13.25 12 16 12 16C12 16 15 13.25 15 11C15 9.34 13.66 8 12 8Z" fill="white"/>
          </svg>
          <div className="flex-1 text-sm">
            <span className="font-bold">How do you want your items?</span>
            <span className="mx-1">|</span>
            <span>95630</span>
          </div>
          <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L6 6L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </header>

      {/* Product Image Gallery */}
      <div className="relative">
        <div className="w-full overflow-x-auto">
          <img 
            src={productImages[selectedImage]}
            alt="Kellogg's Frosted Flakes"
            className="w-full h-[343px] object-contain"
          />
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {[
            { icon: 'share', label: 'Share' },
            { icon: 'heart', label: 'Favorite' },
            { icon: 'zoom', label: 'Zoom' },
            { icon: 'play', label: 'Play' },
            { icon: '3d', label: '3D View' }
          ].map((action) => (
            <button 
              key={action.icon}
              className="w-8 h-8 rounded-full bg-white shadow-walmart-button flex items-center justify-center"
              aria-label={action.label}
            >
              <div className="w-4 h-4 bg-walmart-text rounded-sm"></div>
            </button>
          ))}
        </div>
      </div>

      {/* Image Thumbnails */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto">
        {productImages.map((img, idx) => (
          <div key={idx} className="relative flex-shrink-0">
            <img
              src={img}
              alt={`Product view ${idx + 1}`}
              className={`w-[50.5px] h-[50px] rounded object-cover cursor-pointer ${
                selectedImage === idx ? 'border-2 border-walmart-blue' : ''
              }`}
              onClick={() => setSelectedImage(idx)}
            />
            {idx === productImages.length - 1 && (
              <div className="absolute inset-0 bg-black/70 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">+4</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-walmart-divider"></div>

      {/* Count Selection */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-1 mb-2">
          <span className="font-bold text-body-small">Count:</span>
          <span className="text-body-small">{countOptions[selectedCount].count}</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {countOptions.map((option, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCount(idx)}
              disabled={!option.available}
              className={`flex-shrink-0 w-[120px] p-2 rounded flex flex-col items-center gap-1 ${
                selectedCount === idx
                  ? 'border-2 border-walmart-text bg-white'
                  : option.available
                  ? 'border border-walmart-border bg-white'
                  : 'border border-walmart-border bg-white opacity-50 relative'
              } ${!option.available ? 'pointer-events-none' : 'cursor-pointer'}`}
            >
              <span className={`text-body-small ${selectedCount === idx ? 'font-bold' : ''}`}>
                {option.count}
              </span>
              <span className={`text-body-medium ${selectedCount === idx ? 'font-bold' : ''}`}>
                {option.price}
              </span>
              {!option.available && (
                <>
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 64" preserveAspectRatio="none">
                    <line x1="0" y1="64" x2="120" y2="0" stroke="#BABBBE" strokeWidth="2"/>
                  </svg>
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-walmart-divider"></div>

      {/* Pricing */}
      <div className="px-4 py-4">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-2xl font-bold">{currentPrice}</span>
          <span className="text-walmart-text-subtle text-body-small">Price when purchased online</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-walmart-text-subtle">
            <circle cx="7" cy="7" r="6.5" stroke="currentColor"/>
            <path d="M7 4V7L9 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="text-walmart-green font-bold text-body-small mb-4">
          {subscribedPrice} when subscribed
        </div>

        {/* Subscribe Option */}
        <div className="border border-walmart-border rounded-lg p-4 mb-3">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-3">
              <div 
                onClick={() => setIsSubscribed(true)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                  isSubscribed ? 'border-walmart-text' : 'border-walmart-text'
                }`}
              >
                {isSubscribed && <div className="w-3 h-3 rounded-full bg-walmart-text"></div>}
              </div>
              <div>
                <p className="text-body-small">Subscribe to save 5%</p>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-walmart-green font-bold text-body-small">{subscribedPrice}</span>
              <span className="text-walmart-text line-through text-body-small">{currentPrice}</span>
            </div>
          </div>
          
          {/* Promo Banner */}
          <div className="bg-[#D2EFF9] rounded p-3 flex items-start gap-3">
            <div className="w-12 h-12 flex-shrink-0">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="20" fill="#0071CE" opacity="0.3"/>
                <path d="M24 16L26 26L34 24L26 32L24 22L16 24L24 16Z" fill="#0071CE"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-bold text-walmart-text text-body-small mb-1">Get 5% off eligible items</p>
              <a href="#" className="text-walmart-blue underline text-body-small">See details and terms</a>
            </div>
          </div>
        </div>

        {/* One-time Purchase */}
        <div className="border-2 border-walmart-text rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                onClick={() => setIsSubscribed(false)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                  !isSubscribed ? 'border-walmart-text bg-walmart-text' : 'border-walmart-text'
                }`}
              >
                {!isSubscribed && <div className="w-2 h-2 rounded-full bg-white"></div>}
              </div>
              <span className="font-bold text-body-small">One-time purchase</span>
            </div>
            <span className="font-bold text-body-small">{currentPrice}</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-walmart-divider"></div>

      {/* Fulfillment Options */}
      <div className="px-4 py-4">
        <h3 className="font-bold text-body-small mb-3">How do you want your item?</h3>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { id: 'shipping', label: 'Shipping', sublabel: 'Arrives Dec 27', price: 'Free', icon: '🚚' },
            { id: 'pickup', label: 'Pickup', sublabel: 'Today', price: 'Free', icon: '🚗' },
            { id: 'delivery', label: 'Delivery', sublabel: 'Today', price: 'Free', icon: '🚛' }
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedFulfillment(option.id)}
              className={`p-3 rounded-walmart-lg flex flex-col items-center gap-1 ${
                selectedFulfillment === option.id
                  ? 'border-2 border-walmart-blue bg-white'
                  : 'border border-walmart-border bg-white'
              }`}
            >
              <div className="w-8 h-8 flex items-center justify-center text-2xl">
                {option.icon}
              </div>
              <span className="text-caption text-walmart-text">{option.label}</span>
              <span className="text-caption text-walmart-text">{option.sublabel}</span>
              <span className="text-caption text-walmart-text">{option.price}</span>
            </button>
          ))}
        </div>

        {/* Store Info */}
        <div className="text-body-small text-walmart-text mb-2 flex items-center gap-1">
          <span>Pickup from Bentonville Supercenter</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2C5.79 2 4 3.79 4 6C4 8.5 8 14 8 14C8 14 12 8.5 12 6C12 3.79 10.21 2 8 2Z" fill="#2E2F32"/>
            <circle cx="8" cy="6" r="1.5" fill="white"/>
          </svg>
          <span className="font-bold">Aisle E24</span>
        </div>
        <div className="text-body-small text-walmart-text mb-3">
          Delivery to Bentonville, 72712
        </div>

        {/* Returns */}
        <div className="flex items-center gap-2 mb-4">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="9" stroke="#0053E2" strokeWidth="2"/>
            <path d="M7 10L9 12L13 8" stroke="#0053E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-body-small text-walmart-text">
            <span className="font-bold">Free 90-day returns</span>
            <a href="#" className="text-walmart-blue underline ml-2">Details</a>
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-walmart-divider p-4 flex gap-3">
        <button className="flex-1 bg-white border-2 border-walmart-text text-walmart-text font-bold py-3 px-6 rounded-walmart-round text-body-small hover:bg-walmart-bg-subtle transition-colors">
          Buy now
        </button>
        <button className="flex-1 bg-walmart-blue text-white font-bold py-3 px-6 rounded-walmart-round text-body-small hover:opacity-90 transition-opacity">
          Add to cart
        </button>
      </div>
      
      {/* Bottom padding to prevent content from being hidden behind fixed buttons */}
      <div className="h-20"></div>
    </div>
  )
}

export default App
