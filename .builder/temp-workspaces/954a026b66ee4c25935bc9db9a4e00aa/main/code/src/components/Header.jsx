function Header() {
  return (
    <header className="bg-walmart-blue px-4 pt-[3px] pb-3 flex items-center gap-3">
      {/* Back button */}
      <button className="w-8 h-8 flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M10.332 16.7537L22.6165 28L24 26.4927L12.5387 16L24 5.50732L22.6165 4L10.332 15.2463C10.1204 15.44 10 15.7134 10 16C10 16.2866 10.1204 16.56 10.332 16.7537Z" fill="white"/>
        </svg>
      </button>

      {/* Title */}
      <h1 className="flex-1 text-center text-white text-lg font-bold">Review Order</h1>

      {/* Cart icon with badge */}
      <div className="w-[34px] h-10 relative flex flex-col items-center">
        <div className="relative">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20.6 5.2L19.4 14.8C19.3 15.6 18.6 16.2 17.8 16.2H6.2C5.4 16.2 4.7 15.6 4.6 14.8L3.4 5.2C3.3 4.8 3.6 4.4 4 4.4H20C20.4 4.4 20.7 4.8 20.6 5.2Z" fill="white"/>
            <path d="M9 2C8.4 2 8 2.4 8 3V4.4H16V3C16 2.4 15.6 2 15 2H9Z" fill="white"/>
          </svg>
          {/* Badge */}
          <div className="absolute -top-1 -right-1.5 w-4 h-4 bg-walmart-yellow rounded-full border border-[#662B0D] flex items-center justify-center">
            <span className="text-walmart-text text-xs font-bold leading-none">0</span>
          </div>
        </div>
        <span className="text-white text-xs leading-4 mt-0.5">$0.00</span>
      </div>
    </header>
  )
}

export default Header
