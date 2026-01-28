function PlaceOrderButton() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 max-w-mobile mx-auto">
      <button className="w-full bg-walmart-blue text-white font-bold text-base py-4 rounded-full hover:bg-blue-700 transition-colors">
        Place order for $78.32
      </button>
      
      <p className="text-xs text-center text-walmart-subtle mt-3">
        By placing this order, you agree to our{' '}
        <a href="#" className="underline">Privacy Policy</a> and{' '}
        <a href="#" className="underline">Terms of Use</a>.
      </p>
    </div>
  )
}

export default PlaceOrderButton
