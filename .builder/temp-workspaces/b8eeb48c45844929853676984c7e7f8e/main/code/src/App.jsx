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
    { count: 8, price: '$44.16', subscribedPrice: '$41.95', available: false },
    { count: 10, price: '$68.49', subscribedPrice: '$65.07', available: false },
    { count: 12, price: '$44.16', subscribedPrice: '$41.95', available: true }
  ]

  const currentPrice = countOptions[selectedCount].price
  const subscribedPrice = countOptions[selectedCount].subscribedPrice

  return (
    <div className="min-h-screen bg-white font-everyday-sans max-w-[375px] mx-auto relative" style={{ boxShadow: '0 -1px 2px 0 rgba(0,0,0,0.10), 0 1px 2px 1px rgba(0,0,0,0.15)' }}>
      {/* Native Header */}
      <header className="bg-walmart-blue w-full" style={{ height: 130 }}>
        {/* Status Bar */}
        <div className="h-8 flex items-center justify-between px-8 relative">
          <span className="text-[15px] font-bold text-white leading-[15px]">9:41</span>
          <div className="flex items-center gap-1 absolute right-[13px] top-[13px]">
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 7.83368H2C2.27614 7.83368 2.5 8.05754 2.5 8.33368V10.3337C2.49982 10.6097 2.27603 10.8337 2 10.8337H1C0.723966 10.8337 0.500176 10.6097 0.5 10.3337V8.33368C0.5 8.05754 0.723857 7.83368 1 7.83368ZM5.66699 5.83368H6.66699C6.94298 5.83386 7.16699 6.05765 7.16699 6.33368V10.3337C7.16682 10.6096 6.94287 10.8335 6.66699 10.8337H5.66699C5.39096 10.8337 5.16717 10.6097 5.16699 10.3337V6.33368C5.16699 6.05754 5.39085 5.83368 5.66699 5.83368ZM10.333 3.49969H11.333C11.609 3.49969 11.8328 3.7237 11.833 3.99969V10.3337C11.8328 10.6097 11.609 10.8337 11.333 10.8337H10.333C10.0571 10.8335 9.83318 10.6096 9.83301 10.3337V3.99969C9.83318 3.72381 10.0571 3.49988 10.333 3.49969ZM15 1.16669H16C16.2761 1.16669 16.5 1.39054 16.5 1.66669V10.3337C16.4998 10.6097 16.276 10.8337 16 10.8337H15C14.724 10.8337 14.5002 10.6097 14.5 10.3337V1.66669C14.5 1.39054 14.7239 1.16669 15 1.16669Z" fill="white" stroke="white"/>
            </svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.93848 9.0094C6.96717 8.25919 8.36566 8.25955 9.39453 9.0094L7.66699 10.7506L5.93848 9.0094ZM3.25391 6.30042C5.77643 4.08347 9.55824 4.08398 12.0811 6.30042L11.1777 7.21155C10.2625 6.43543 9.11656 5.98384 7.91895 5.92834L7.66699 5.92249C6.37925 5.92302 5.13603 6.38198 4.15723 7.21252L3.25391 6.30042ZM0.578125 3.60608C4.57715 -0.0922415 10.7546 -0.0917604 14.7539 3.60608L13.8516 4.51526C12.1627 2.97419 9.95842 2.11497 7.66699 2.11487C5.37501 2.11489 3.1696 2.97365 1.48047 4.51526L0.578125 3.60608Z" fill="white" stroke="white"/>
            </svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.35" fillRule="evenodd" clipRule="evenodd" d="M18.9148 0.833313C19.9619 0.833313 20.3486 0.924664 20.7333 1.1304C21.0795 1.31552 21.3511 1.58717 21.5362 1.93332C21.742 2.31801 21.8333 2.70473 21.8333 3.75183V8.24813C21.8333 9.29523 21.742 9.68195 21.5362 10.0666C21.3511 10.4128 21.0795 10.6844 20.7333 10.8696C20.3486 11.0753 19.9619 11.1666 18.9148 11.1666H3.75183C2.70473 11.1666 2.31801 11.0753 1.93332 10.8696C1.58717 10.6844 1.31552 10.4128 1.1304 10.0666C0.924664 9.68195 0.833313 9.29523 0.833313 8.24813V3.75183C0.833313 2.70473 0.924664 2.31801 1.1304 1.93332C1.31552 1.58717 1.58717 1.31552 1.93332 1.1304C2.31801 0.924664 2.70473 0.833313 3.75183 0.833313H18.9148Z" stroke="white"/>
              <path opacity="0.4" d="M23.8333 5.00781C24.0415 5.28939 24.1614 5.6347 24.1614 6C24.1614 6.36503 24.0412 6.70975 23.8333 6.99121V5.00781Z" fill="white" stroke="white"/>
              <path d="M4.0423 2.83331H18.6243C19.1779 2.83333 19.3002 2.89086 19.4153 2.95245C19.5455 3.02206 19.6446 3.12114 19.7142 3.25128C19.7758 3.36644 19.8333 3.48869 19.8333 4.0423V7.95734C19.8333 8.51078 19.7757 8.63324 19.7142 8.74835C19.6446 8.87845 19.5454 8.97758 19.4153 9.04718C19.3002 9.10877 19.1779 9.1663 18.6243 9.16632H4.0423C3.4887 9.1663 3.36645 9.10877 3.25128 9.04718C3.1212 8.97758 3.02203 8.87845 2.95245 8.74835C2.8909 8.63324 2.83331 8.51078 2.83331 7.95734V4.0423L2.84308 3.70148C2.86211 3.42801 2.90625 3.33767 2.95245 3.25128C3.02206 3.12114 3.12114 3.02206 3.25128 2.95245C3.33767 2.90625 3.42801 2.86211 3.70148 2.84308L4.0423 2.83331Z" fill="white" stroke="white"/>
            </svg>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-4 px-4 py-2" style={{ height: 56 }}>
          <div className="flex items-center gap-2 flex-1">
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/894d531cd307ee64ca13f1bfe932ca6a8f597479?width=48" className="w-6 h-6" alt="Back" />
            <div className="relative" style={{ width: 255, height: 40 }}>
              <div className="absolute inset-0 rounded-[100px] bg-white"></div>
              <div className="absolute left-4 top-3">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.5 0C8.53757 0 11 2.46243 11 5.5C11 8.53757 8.53757 11 5.5 11C2.46243 11 0 8.53757 0 5.5C0 2.46243 2.46243 0 5.5 0ZM5.5 1C3.01472 1 1 3.01472 1 5.5C1 7.98528 3.01472 10 5.5 10C7.98528 10 10 7.98528 10 5.5C10 3.01472 7.98528 1 5.5 1Z" fill="black"/>
                  <path d="M0.146447 0.146447C0.320013 -0.0271197 0.589437 -0.0464049 0.784306 0.0885912L0.853553 0.146447L5.23642 4.52931C5.43168 4.72458 5.43168 5.04116 5.23642 5.23642C5.06285 5.40999 4.79343 5.42927 4.59856 5.29428L4.52931 5.23642L0.146447 0.853553C-0.0488155 0.658291 -0.0488155 0.341709 0.146447 0.146447Z" fill="black" transform="translate(9, 9)"/>
                </svg>
              </div>
              <span className="absolute left-10 top-2 text-[16px] leading-6" style={{ color: '#74767C' }}>Search Walmart</span>
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/982922634b3cd73098a7da6a5f08fc5ee7b6810b?width=48" className="absolute w-6 h-6" style={{ left: 215, top: 8 }} alt="Barcode" />
            </div>
          </div>
          {/* Cart */}
          <div className="relative flex-shrink-0" style={{ width: 32, height: 40 }}>
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/a352b0b3cd89df1cfef3ae958a7b9a02315d49a1?width=48" className="absolute w-6 h-6" style={{ left: 0, top: 4 }} alt="Cart" />
            <div className="absolute flex items-center justify-center rounded-[1000px] bg-walmart-warning" style={{ left: 14, top: 0, width: 16, height: 16 }}>
              <span className="text-[12px] font-bold leading-4 text-center" style={{ color: '#2E2F32' }}>5</span>
            </div>
            <span className="absolute text-[12px] leading-4 text-white text-center" style={{ left: -1, top: 28, width: 31 }}>$61.13</span>
          </div>
        </div>

        {/* Location Bar (GIC) */}
        <div className="flex items-center px-4 py-2 bg-walmart-blue gap-2" style={{ height: 40 }}>
          <div className="flex items-center gap-3 flex-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="#D2EFF9"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M13.3024 2.39464L20.0944 5.10335C20.4403 5.24119 20.6736 5.56887 20.6924 5.94165C20.7043 6.18463 20.6235 6.4231 20.466 6.60815L9.98794 18.9288C9.56961 19.4205 8.86169 19.5426 8.30425 19.2194L2.24318 15.7062C2.05395 15.5965 1.90824 15.4247 1.83047 15.2198L1.79692 15.1313C1.67072 14.7981 1.74007 14.4221 1.97702 14.1564L12.2411 2.64565C12.5076 2.34686 12.9312 2.24666 13.3024 2.39464Z" fill="white"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M2.63597 13.9248L12.4333 2.9603C12.6621 2.70421 13.0259 2.61866 13.3438 2.74635L19.4151 5.1822C19.7103 5.30073 19.8012 5.67577 19.5936 5.9172L9.47909 17.6746C9.22514 17.9695 8.80008 18.0443 8.46163 17.8539L2.75403 14.6402C2.4956 14.4946 2.43804 14.1462 2.63597 13.9248Z" fill="#0071CE"/>
            </svg>
            <div className="flex items-center gap-0">
              <span className="text-white text-[14px] font-bold leading-5">How do you want your items?</span>
              <span className="text-white text-[14px] leading-5 mx-1">|</span>
              <span className="text-white text-[14px] leading-5">95630</span>
            </div>
          </div>
          <img src="https://api.builder.io/api/v1/image/assets/TEMP/8cdb913eed9e5443499491ac1089458b2d6972d5?width=24" className="w-3" style={{ height: 6.25 }} alt="Arrow" />
        </div>
      </header>

      {/* Product Image Gallery */}
      <div className="relative bg-white">
        <div className="px-4 overflow-x-auto">
          <img
            src={productImages[selectedImage]}
            alt="Kellogg's Frosted Flakes"
            style={{ width: 343, height: 343 }}
            className="flex-shrink-0"
          />
        </div>

        {/* Right Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2" style={{ paddingRight: 16 }}>
          {/* Share */}
          <button className="w-8 h-8 relative" aria-label="Share">
            <svg className="absolute left-0 top-0" width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="white" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.15)) drop-shadow(0 -1px 2px rgba(0,0,0,0.10))"/></svg>
            <svg className="absolute left-2 top-2" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8.35355 1.14645L8.28431 1.08859C8.08944 0.953595 7.82001 0.97288 7.64645 1.14645L5.64645 3.14645L5.58859 3.21569C5.4536 3.41056 5.47288 3.67999 5.64645 3.85355L5.71569 3.91141C5.91056 4.0464 6.17999 4.02712 6.35355 3.85355L7.5 2.706V9.5L7.50806 9.58988C7.55039 9.82312 7.75454 10 8 10C8.27614 10 8.5 9.77614 8.5 9.5V2.706L9.64645 3.85355L9.71569 3.91141C9.91056 4.0464 10.18 4.02712 10.3536 3.85355C10.5488 3.65829 10.5488 3.34171 10.3536 3.14645L8.35355 1.14645Z" fill="#2E2F32"/><path d="M6 6V5H4C3.44772 5 3 5.44772 3 6V14C3 14.5523 3.44772 15 4 15H12C12.5523 15 13 14.5523 13 14V6C13 5.44772 12.5523 5 12 5H10V6H12V14H4V6H6Z" fill="#2E2F32"/></svg>
          </button>
          {/* Heart */}
          <button className="w-8 h-8 relative" aria-label="Favorite">
            <svg className="absolute left-0 top-0" width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="white" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.15)) drop-shadow(0 -1px 2px rgba(0,0,0,0.10))"/></svg>
            <svg className="absolute left-2 top-2" width="16" height="16" viewBox="0 0 16 16" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M10.75 2C13.0972 2 15 3.90279 15 6.25C15 9.08333 12.6667 11.6667 7.99998 14C3.33333 11.6667 1 9.08333 1 6.25C1 3.90279 2.90279 2 5.25 2C6.29899 2 7.25922 2.38004 8.00052 3.00995C8.74121 2.37987 9.70124 2 10.75 2ZM10.75 3C10.046 3 9.3789 3.22356 8.82777 3.6296L8.64846 3.77164L8.00086 4.32253L7.35298 3.77199C6.7694 3.27609 6.03234 3 5.25 3C3.45507 3 2 4.45507 2 6.25C2 8.48587 3.85783 10.667 7.74089 12.7407L8 12.876L8.25908 12.7407C12.028 10.728 13.889 8.61408 13.9952 6.44714L14 6.25C14 4.45507 12.5449 3 10.75 3Z" fill="#2E2F32"/></svg>
          </button>
          {/* Zoom */}
          <button className="w-8 h-8 relative" aria-label="Zoom">
            <svg className="absolute left-0 top-0" width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="white" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.15)) drop-shadow(0 -1px 2px rgba(0,0,0,0.10))"/></svg>
            <svg className="absolute left-2 top-2" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6.5 4C6.74546 4 6.94961 4.17688 6.99194 4.41012L7 4.5V6H8.5C8.77614 6 9 6.22386 9 6.5C9 6.74546 8.82312 6.94961 8.58988 6.99194L8.5 7H7V8.5C7 8.77614 6.77614 9 6.5 9C6.25454 9 6.05039 8.82312 6.00806 8.58988L6 8.5V7H4.5C4.22386 7 4 6.77614 4 6.5C4 6.25454 4.17688 6.05039 4.41012 6.00806L4.5 6H6V4.5C6 4.22386 6.22386 4 6.5 4Z" fill="#2E2F32"/><path fillRule="evenodd" clipRule="evenodd" d="M6.5 1C9.53757 1 12 3.46243 12 6.5C12 7.83875 11.5217 9.06578 10.7266 10.0195L14.8536 14.1464C15.0488 14.3417 15.0488 14.6583 14.8536 14.8536C14.68 15.0271 14.4106 15.0464 14.2157 14.9114L14.1464 14.8536L10.0195 10.7266C9.06578 11.5217 7.83875 12 6.5 12C3.46243 12 1 9.53757 1 6.5C1 3.46243 3.46243 1 6.5 1ZM6.5 2C4.01472 2 2 4.01472 2 6.5C2 8.98528 4.01472 11 6.5 11C8.98528 11 11 8.98528 11 6.5C11 4.01472 8.98528 2 6.5 2Z" fill="#2E2F32"/></svg>
          </button>
          {/* Play */}
          <button className="w-8 h-8 relative" aria-label="Play">
            <svg className="absolute left-0 top-0" width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="white" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.15)) drop-shadow(0 -1px 2px rgba(0,0,0,0.10))"/></svg>
            <svg className="absolute left-2 top-2" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4.5293 3.63C4.5348 3.63 4.54026 3.63197 4.54492 3.63489L11.4863 7.97278C11.4999 7.98138 11.5036 7.99914 11.4951 8.01282C11.4928 8.01656 11.4901 8.02023 11.4863 8.02258L4.54492 12.3605C4.5313 12.369 4.51356 12.3651 4.50488 12.3517C4.50199 12.3471 4.50003 12.3415 4.5 12.3361V3.6593C4.50002 3.64313 4.51313 3.63002 4.5293 3.63Z" fill="#2E2F32" stroke="#2E2F32"/></svg>
          </button>
          {/* 3D */}
          <button className="w-8 h-8 relative" aria-label="3D View">
            <svg className="absolute left-0 top-0" width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="white" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.15)) drop-shadow(0 -1px 2px rgba(0,0,0,0.10))"/></svg>
            <svg className="absolute" style={{ left: 6, top: 6 }} width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2.60556 2.60478C4.08907 1.12171 6.30245 0.996806 8.35989 1.55776L8.36968 1.56044C8.90704 1.70753 9.45292 1.90506 10 2.14988C10.4919 2.37 10.9848 2.62836 11.4733 2.92266C11.938 3.20259 12.3987 3.51504 12.8509 3.85804C13.455 4.31629 14.044 4.82907 14.6067 5.39168C14.7067 5.49161 14.8051 5.59237 14.9019 5.69389L14.9197 5.50205C14.9517 5.15615 15.2582 4.90172 15.6042 4.93375C15.9502 4.96579 16.2047 5.27217 16.1726 5.61807L16.0085 7.38953C15.9764 7.73543 15.67 7.98986 15.324 7.95782L13.552 7.79374C13.206 7.7617 12.9515 7.45532 12.9835 7.10942C13.0156 6.76352 13.3221 6.50909 13.6681 6.54113L14.0006 6.57192C13.9078 6.47436 13.8132 6.37743 13.717 6.2812C12.9536 5.51803 12.1458 4.86071 11.3272 4.31839C10.8862 4.0262 10.442 3.7674 10 3.54341C9.50372 3.29193 9.01013 3.08433 8.5267 2.92266C8.35941 2.86672 8.19334 2.81627 8.0288 2.77141C7.93992 2.74717 7.85148 2.72456 7.76354 2.7036C7.62131 2.66969 7.48037 2.64008 7.34092 2.61482C7.16428 2.58283 6.99004 2.55782 6.81862 2.5399C6.48087 2.5046 6.15406 2.49685 5.84139 2.51751C4.90336 2.57951 4.09256 2.89726 3.49534 3.4943L3.49346 3.49618C2.89746 4.09304 2.58021 4.90289 2.51826 5.83966C2.49759 6.15224 2.50535 6.47896 2.54066 6.81661L2.54235 6.83262C2.5836 7.21799 2.66067 7.61751 2.77223 8.02643C2.81711 8.19093 2.86757 8.35695 2.92353 8.52419C3.08525 9.00748 3.2929 9.50092 3.54446 9.99706C3.76851 10.4389 4.02739 10.8829 4.31965 11.3238C4.86214 12.1422 5.51966 12.9498 6.28305 13.7129C7.04645 14.4761 7.85426 15.1334 8.67283 15.6758C8.34014 15.8116 8.01396 15.9229 7.69769 16.0091C7.50759 16.0609 7.32474 16.103 7.14912 16.1361C6.54497 15.6778 5.95605 15.1651 5.39328 14.6025C4.83049 14.0398 4.31756 13.4511 3.85917 12.8471C3.51607 12.395 3.20353 11.9345 2.92352 11.4699C2.62914 10.9816 2.37071 10.4888 2.15052 9.99705C1.90563 9.45014 1.70804 8.90442 1.56091 8.36721L1.55823 8.35743C0.997112 6.3006 1.12205 4.08786 2.60556 2.60478Z" fill="black"/><path d="M4.31966 8.67027C4.86214 7.85194 5.51965 7.04437 6.28304 6.2812C7.04642 5.51804 7.85424 4.86071 8.67283 4.31838C8.34014 4.18252 8.01397 4.07128 7.69771 3.98505C7.5076 3.93322 7.32474 3.8911 7.14911 3.85803C6.54496 4.31629 5.95604 4.82907 5.39326 5.39168C4.83049 5.95429 4.31756 6.54304 3.85918 7.147C3.89226 7.32258 3.93438 7.50538 3.98623 7.69544C4.07248 8.01161 4.18376 8.33768 4.31966 8.67027Z" fill="black"/><path d="M8.05616 11.9424C7.36796 11.9424 7.05033 11.6174 6.93386 11.4759C6.9021 11.434 6.90739 11.3763 6.93916 11.3396L7.25679 10.9884C7.29385 10.9517 7.35208 10.9413 7.39443 10.9779C7.52677 11.088 7.71206 11.2243 7.99263 11.2243C8.26262 11.2243 8.46379 11.0618 8.46379 10.7945C8.46379 10.5272 8.22027 10.3542 7.81794 10.3542H7.51089C7.45795 10.3542 7.41031 10.307 7.41031 10.2546V9.80384C7.41031 9.74618 7.45795 9.70425 7.51089 9.70425H7.81794C8.19909 9.70425 8.40026 9.52603 8.40026 9.29541C8.40026 9.05954 8.24144 8.88656 7.96616 8.88656C7.72265 8.88656 7.57442 9.01236 7.48972 9.10147C7.45266 9.14864 7.38913 9.14864 7.34149 9.11195L7.00798 8.78698C6.96563 8.75028 6.97092 8.68214 7.00798 8.64545C7.19856 8.45152 7.52678 8.16847 8.05087 8.16847C8.68613 8.16847 9.23139 8.55111 9.23139 9.15912C9.23139 9.57321 8.91376 9.87722 8.67025 9.98729V10.0083C8.9667 10.1078 9.32668 10.3804 9.32668 10.8784C9.32668 11.4654 8.80789 11.9424 8.05616 11.9424Z" fill="black"/><path fillRule="evenodd" clipRule="evenodd" d="M10.0544 11.89C10.0014 11.89 9.95909 11.8428 9.95909 11.7904V8.32048C9.95909 8.26806 10.0014 8.22089 10.0544 8.22089H11.3461C12.3678 8.22089 13.2042 9.04381 13.2042 10.0502C13.2042 11.067 12.3678 11.89 11.3461 11.89H10.0544ZM10.7849 11.1142V8.9914H11.3408C11.939 8.9914 12.3254 9.45789 12.3254 10.0502C12.3254 10.6477 11.939 11.1142 11.3408 11.1142H10.7849Z" fill="black"/><path d="M17.3945 17.3894C15.9109 18.8724 13.6976 18.9973 11.6401 18.4364L11.6303 18.4337C12.1547 18.1431 12.6734 17.8156 13.1814 17.4542C13.663 17.5046 14.122 17.4989 14.5493 17.4348L14.5564 17.4337C14.6748 17.4158 14.7908 17.3934 14.9041 17.3664C14.9627 17.3525 15.0205 17.3373 15.0776 17.321C15.3667 17.2382 15.6372 17.1242 15.8855 16.9781C15.9803 16.9223 16.0719 16.8618 16.1601 16.7966C16.2816 16.7067 16.3967 16.6078 16.5047 16.4998C17.301 15.7038 17.6006 14.5281 17.4593 13.1775C17.8209 12.6696 18.1484 12.1511 18.4391 11.6269L18.4418 11.6367C19.0029 13.6935 18.878 15.9063 17.3945 17.3894Z" fill="black"/><path d="M2.60555 17.3894C4.08906 18.8724 6.30244 18.9973 8.35987 18.4364L8.36968 18.4337C8.90704 18.2866 9.45292 18.0891 10 17.8443C10.4919 17.6241 10.9848 17.3658 11.4733 17.0715C11.938 16.7915 12.3987 16.4791 12.8509 16.1361C13.455 15.6778 14.044 15.1651 14.6067 14.6025C14.7086 14.5006 14.8089 14.3978 14.9075 14.2943L14.935 14.5909C14.967 14.9368 15.2735 15.1912 15.6195 15.1592C15.9655 15.1272 16.22 14.8208 16.188 14.4749L16.0484 12.9678C16.0794 12.9276 16.1102 12.8874 16.1408 12.8471C16.4839 12.395 16.7965 11.9345 17.0765 11.4699C17.3709 10.9816 17.6293 10.4888 17.8495 9.99706C18.0944 9.45014 18.292 8.90442 18.4391 8.36721L18.4418 8.35743C19.0029 6.3006 18.878 4.08786 17.3944 2.60478C15.9109 1.12171 13.6975 0.996806 11.6401 1.55776L11.6303 1.56044C12.1547 1.85103 12.6734 2.17849 13.1814 2.5399C13.5197 2.50453 13.8469 2.49683 14.1598 2.5176C14.9352 2.56904 15.6228 2.79527 16.1746 3.20835C16.2908 3.29534 16.4009 3.39062 16.5047 3.4943C17.1019 4.09134 17.4197 4.9019 17.4817 5.83964C17.5024 6.15222 17.4946 6.47893 17.4593 6.81658C17.4185 7.20665 17.341 7.61155 17.2278 8.02643C17.1829 8.19093 17.1324 8.35695 17.0765 8.52419C16.9148 9.00748 16.7071 9.50092 16.4555 9.99706C16.2315 10.4389 15.9726 10.883 15.6803 11.3238C15.4947 11.6039 15.2956 11.8827 15.0834 12.1588L13.5674 12.2992C13.2214 12.3312 12.9669 12.6376 12.9989 12.9835C13.031 13.3294 13.3374 13.5838 13.6834 13.5518L13.895 13.5322C13.8363 13.5927 13.7769 13.653 13.7169 13.7129C12.9536 14.4761 12.1458 15.1334 11.3272 15.6757C10.8862 15.9679 10.442 16.2267 10 16.4507C9.50373 16.7022 9.01014 16.9098 8.5267 17.0715C8.35941 17.1274 8.19333 17.1779 8.02878 17.2227C7.91288 17.2543 7.79775 17.2832 7.68351 17.3092C7.63874 17.3194 7.5941 17.3292 7.54961 17.3385C7.48424 17.3522 7.41918 17.365 7.35444 17.3768C7.17312 17.41 6.99435 17.4358 6.8186 17.4542L6.77223 17.4589L6.76732 17.4594L6.70092 17.4654L6.69156 17.4662C6.51642 17.4811 6.34442 17.4883 6.17601 17.4879C6.10634 17.4877 6.03728 17.4862 5.96886 17.4834C5.88081 17.4798 5.79382 17.474 5.70798 17.466C5.65894 17.4614 5.61027 17.4561 5.56198 17.4501C5.52464 17.4454 5.48753 17.4403 5.45065 17.4348L5.42802 17.4314C5.32943 17.4161 5.23255 17.3976 5.13748 17.3761L5.09586 17.3664C4.98153 17.3392 4.86989 17.3074 4.76112 17.2709C4.55659 17.2023 4.36224 17.1172 4.17939 17.0152C4.08603 16.9632 3.99567 16.9067 3.90848 16.8459C3.82342 16.7865 3.74139 16.7229 3.66254 16.655C3.60509 16.6055 3.54933 16.5538 3.49533 16.4998C2.69904 15.7038 2.39943 14.5281 2.54066 13.1775C2.17915 12.6696 1.85159 12.1511 1.5609 11.6269L1.55822 11.6367C0.997098 13.6935 1.12203 15.9063 2.60555 17.3894Z" fill="black"/></svg>
          </button>
        </div>
      </div>

      {/* Image Thumbnails */}
      <div className="flex gap-2 px-4 pt-1 pb-3">
        {productImages.map((img, idx) => (
          <div key={idx} className="relative flex-shrink-0">
            <img
              src={img}
              alt={`Product view ${idx + 1}`}
              className="cursor-pointer object-cover"
              style={{
                width: 50.5,
                height: 50,
                borderRadius: 4,
                border: selectedImage === idx ? '1.15px solid #0053E2' : 'none'
              }}
              onClick={() => setSelectedImage(idx)}
            />
            {idx === productImages.length - 1 && (
              <div className="absolute inset-0 flex items-center justify-center" style={{ borderRadius: 4, background: 'rgba(0,0,0,0.70)' }}>
                <span className="text-white font-bold text-[18px] leading-6">+4</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Count Selection */}
      <div className="pt-4 bg-walmart-bg-subtle">
        <div className="px-4 pb-4">
          <div className="flex items-center gap-1 mb-2">
            <span className="font-bold text-[14px] leading-5 text-walmart-text">Count:</span>
            <span className="text-[14px] leading-5 text-walmart-text">{countOptions[selectedCount].count}</span>
          </div>
          <div className="flex gap-[7px] overflow-x-auto pb-1">
            {countOptions.map((option, idx) => (
              <button
                key={idx}
                onClick={() => option.available && setSelectedCount(idx)}
                className="flex-shrink-0 flex flex-col justify-center items-center bg-white relative"
                style={{
                  width: 120,
                  height: 64,
                  padding: option.available ? (selectedCount === idx ? '8px 6px' : '8px') : '4px 6px',
                  borderRadius: option.available && (selectedCount !== idx) ? 4 : 8,
                  border: selectedCount === idx
                    ? '2px solid #2E2F32'
                    : '1px solid #BABBBE',
                  cursor: option.available ? 'pointer' : 'default',
                }}
              >
                {option.available ? (
                  <div className="flex flex-col items-center gap-1">
                    <span
                      className="text-center text-[14px] leading-5"
                      style={{
                        fontWeight: selectedCount === idx ? 700 : 400,
                        color: '#2E2F32'
                      }}
                    >
                      {option.count}
                    </span>
                    <span
                      className="text-center text-[16px] leading-6"
                      style={{
                        fontWeight: selectedCount === idx ? 700 : 400,
                        color: '#2E2F32'
                      }}
                    >
                      {option.price}
                    </span>
                  </div>
                ) : (
                  <div className="relative" style={{ width: 113.5, height: 57 }}>
                    <div className="absolute flex flex-col items-center gap-1" style={{ left: 10, top: 5, width: 91 }}>
                      <span className="text-center text-[14px] leading-5" style={{ color: '#74767C', width: 91 }}>
                        {option.count}
                      </span>
                      <span className="text-center text-[16px] leading-6" style={{ color: '#74767C', width: 91 }}>
                        {option.price}
                      </span>
                    </div>
                    <svg className="absolute left-0 top-0" width="114" height="57" viewBox="0 0 114 57" fill="none">
                      <path d="M0 57L113.5 0" stroke="#BABBBE" strokeWidth="2" strokeLinecap="square"/>
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="h-px bg-walmart-divider"></div>
      </div>

      {/* Pricing Section */}
      <div className="px-4 py-3 bg-white">
        <div className="flex items-center gap-2">
          <span className="text-[24px] leading-8 text-walmart-text" style={{ fontWeight: 400 }}>{currentPrice}</span>
          <div className="flex items-start gap-2">
            <span className="text-[10px] leading-[14px]" style={{ color: '#74767C' }}>Price when purchased online</span>
          </div>
        </div>
        <div className="text-[18px] leading-6 text-walmart-green" style={{ fontWeight: 400, marginTop: 2 }}>
          {subscribedPrice} when subscribed
        </div>
      </div>
      <div className="h-px bg-walmart-divider"></div>

      {/* Subscription Module */}
      <div className="px-4 py-4">
        {/* Subscribe Option */}
        <div className="p-4 mb-2 rounded-walmart-lg bg-white" style={{ border: '1px solid #BABBBE' }}>
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <div
                onClick={() => setIsSubscribed(true)}
                className="cursor-pointer relative"
                style={{ width: 24, height: 24 }}
              >
                {isSubscribed ? (
                  <>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="11" fill="#2E2F32" stroke="#2E2F32" strokeWidth="2"/></svg>
                    <div className="absolute bg-white rounded-[1000px]" style={{ width: 8, height: 8, left: 8, top: 8 }}></div>
                  </>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="11.5" fill="white" stroke="#2E2F32"/></svg>
                )}
              </div>
              <div className="pl-3">
                <span className="text-[14px] leading-5 text-walmart-text">Subscribe to save 5%</span>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[14px] leading-5 font-bold text-walmart-green">{subscribedPrice}</span>
              <span className="text-[14px] leading-5 text-walmart-text line-through">{currentPrice}</span>
            </div>
          </div>
          {/* Nudge */}
          <div className="flex items-start gap-4 p-4 mt-1 rounded-walmart-lg" style={{ background: '#E9F1FE' }}>
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/33cb5d3574ef2955bf6bbecec2174a3f487fb7c7?width=104" className="flex-shrink-0" style={{ width: 52, height: 52 }} alt="Discount" />
            <div className="flex flex-col flex-1">
              <span className="text-[16px] leading-6 font-bold text-walmart-text">Get 5% off eligible items</span>
              <button className="text-left text-[14px] leading-5 text-walmart-text underline mt-1" style={{ height: 32, display: 'flex', alignItems: 'center' }}>See details and terms</button>
            </div>
          </div>
        </div>

        {/* One-time Purchase */}
        <div className="p-4 rounded-walmart-lg bg-white flex justify-between items-start" style={{ border: '2px solid #2E2F32' }}>
          <div className="flex items-center">
            <div
              onClick={() => setIsSubscribed(false)}
              className="cursor-pointer relative"
              style={{ width: 24, height: 24 }}
            >
              {!isSubscribed ? (
                <>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="11" fill="#2E2F32" stroke="#2E2F32" strokeWidth="2"/></svg>
                  <div className="absolute bg-white rounded-[1000px]" style={{ width: 8, height: 8, left: 8, top: 8 }}></div>
                </>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="11.5" fill="white" stroke="#2E2F32"/></svg>
              )}
            </div>
            <div className="pl-3">
              <span className="text-[14px] leading-5 font-bold text-walmart-text">One-time purchase</span>
            </div>
          </div>
          <span className="text-[14px] leading-5 font-bold text-walmart-text">{currentPrice}</span>
        </div>
      </div>
      <div className="h-px bg-walmart-divider"></div>

      {/* Fulfillment */}
      <div className="px-4 py-4 bg-walmart-bg-subtle">
        <span className="text-[14px] leading-5 font-bold text-walmart-text block mb-3">How do you want your item?</span>
        <div className="flex gap-2 mb-3" style={{ height: 106 }}>
          {[
            { id: 'shipping', label: 'Shipping', sublabel: 'Arrives Dec 27', price: 'Free', img: 'https://api.builder.io/api/v1/image/assets/TEMP/2704709db828828d98fcc16050fa0ae3fa58e52f?width=64' },
            { id: 'pickup', label: 'Pickup', sublabel: 'Today', price: 'Free', img: 'https://api.builder.io/api/v1/image/assets/TEMP/64479d0940705886d3689f923622d638f1a96600?width=64' },
            { id: 'delivery', label: 'Delivery', sublabel: 'Today', price: '', img: 'https://api.builder.io/api/v1/image/assets/TEMP/7696ccfa675e18f22bf1051377f24e4b050012ec?width=64' }
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedFulfillment(option.id)}
              className="flex-1 flex flex-col justify-center items-center gap-1 rounded-walmart-lg bg-white"
              style={{
                border: selectedFulfillment === option.id
                  ? '2px solid #0053E2'
                  : '1px solid #BABBBE',
                alignSelf: 'stretch'
              }}
            >
              <img src={option.img} className="w-8 h-8" alt={option.label} />
              <span className="text-[12px] leading-4 text-walmart-text text-center self-stretch">{option.label}</span>
              <span className="text-[12px] leading-4 text-walmart-text text-center self-stretch">{option.sublabel}</span>
              <span className="text-[12px] leading-4 text-walmart-text text-center self-stretch">{option.price || '\u00A0'}</span>
            </button>
          ))}
        </div>

        {/* Location Info */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[12px] leading-4 text-walmart-text">Pickup from Bentonville Supercenter</span>
          <div className="w-px h-5 bg-walmart-divider"></div>
          <div className="flex items-center gap-1">
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/8aee76ed48daef05b916a1a1c7efeb091d393fd5?width=32" alt="Location" style={{ width: 16, height: 16 }} />
            <span className="text-[12px] leading-4 text-walmart-text font-bold">Aisle E24</span>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 flex gap-3" style={{ borderTop: '1px solid #E3E4E5', maxWidth: 375, margin: '0 auto' }}>
        <button className="flex-1 bg-white font-bold py-3 px-6 rounded-[1000px] text-[14px] leading-5 text-walmart-text" style={{ border: '2px solid #2E2F32' }}>
          Buy now
        </button>
        <button className="flex-1 bg-walmart-blue text-white font-bold py-3 px-6 rounded-[1000px] text-[14px] leading-5">
          Add to cart
        </button>
      </div>

      <div className="h-20"></div>
    </div>
  )
}

export default App
