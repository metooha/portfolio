function PlaceOrderButton() {
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-[375px] mx-auto bg-white pb-4">
      <div className="h-px bg-[#E3E4E5]" />
      <div className="px-4 pt-2">
        <button className="w-full h-10 bg-[#0071DC] text-white font-bold text-base rounded-full hover:bg-blue-700 transition-colors">
          Place order for $78.32
        </button>
        <p className="text-xs text-center text-[#515357] leading-4 mt-2 px-4">
          By placing this order, you agree to our{' '}
          <span className="underline">Privacy Policy</span> and{' '}
          <span className="underline">Terms of Use</span>.
        </p>
      </div>
    </div>
  )
}

export default PlaceOrderButton
