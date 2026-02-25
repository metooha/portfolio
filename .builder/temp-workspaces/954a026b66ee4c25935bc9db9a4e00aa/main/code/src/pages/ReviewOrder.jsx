import { useState } from 'react'
import Header from '../components/Header'
import DeliveryInstructions from '../components/DeliveryInstructions'
import ItemDetails from '../components/ItemDetails'
import TipSection from '../components/TipSection'
import PaymentMethod from '../components/PaymentMethod'
import TextUpdates from '../components/TextUpdates'
import OrderSummary from '../components/OrderSummary'
import PlaceOrderButton from '../components/PlaceOrderButton'

function ReviewOrder() {
  const [deliveryInstruction, setDeliveryInstruction] = useState('leave')
  const [selectedTip, setSelectedTip] = useState('10')
  const [textUpdatesEnabled, setTextUpdatesEnabled] = useState(true)

  return (
    <div className="min-h-screen bg-white max-w-[375px] mx-auto relative">
      {/* iOS Status Bar */}
      <div className="h-[54px] bg-walmart-blue flex items-end justify-between px-5 pb-4">
        <span className="text-white font-semibold text-[17px] tracking-[-0.408px]">9:41</span>
        <div className="flex items-center gap-[5px]">
          <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
            <rect x="0" y="6" width="3" height="5" rx="0.5" fill="white"/>
            <rect x="5" y="4" width="3" height="7" rx="0.5" fill="white"/>
            <rect x="10" y="1" width="3" height="10" rx="0.5" fill="white"/>
            <rect x="15" y="0" width="3" height="11" rx="0.5" fill="white" opacity="0.4"/>
          </svg>
          <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
            <path d="M7.5 2.5C9.4 2.5 11.1 3.3 12.3 4.5L13.9 2.9C12.3 1.1 10 0 7.5 0C5 0 2.7 1.1 1.1 2.9L2.7 4.5C3.9 3.3 5.6 2.5 7.5 2.5Z" fill="white"/>
            <path d="M7.5 6.5C8.6 6.5 9.6 6.9 10.3 7.6L11.9 6C10.7 4.8 9.2 4 7.5 4C5.8 4 4.3 4.8 3.1 6L4.7 7.6C5.4 6.9 6.4 6.5 7.5 6.5Z" fill="white"/>
            <circle cx="7.5" cy="10" r="1.5" fill="white"/>
          </svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
            <rect opacity="0.35" x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="white"/>
            <path opacity="0.4" d="M23 4V8C23.8 7.7 24.4 6.9 24.4 6C24.4 5.1 23.8 4.3 23 4Z" fill="white"/>
            <rect x="2" y="2" width="18" height="8" rx="1.5" fill="white"/>
          </svg>
        </div>
      </div>

      <Header />

      <div className="bg-white overflow-y-auto pb-28">
        {/* ===== CARD 1: Express Delivery ===== */}
        <div className="mx-4 mt-4 rounded-lg bg-white shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)] overflow-hidden">
          {/* Card Header - Express Delivery */}
          <div className="flex items-center gap-2 px-4 py-4 border-b border-[#E3E4E5]">
            <div className="w-10 h-10 rounded-full bg-walmart-dark-blue flex items-center justify-center flex-shrink-0">
              <svg width="19" height="23" viewBox="0 0 19 23" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M14.2172 0H7.52735C7.22726 0 6.95018 0.157905 6.8013 0.413771L0.111415 11.9106L0.0504827 12.0389C-0.1438 12.5588 0.244781 13.1392 0.837471 13.1392H8.78003L5.08297 21.8566C4.71298 22.7286 5.88886 23.4237 6.5004 22.6945L18.2077 8.73405L18.2865 8.6236C18.6038 8.09424 18.2218 7.39081 17.5622 7.39081H11.456L14.9482 1.22001C15.2579 0.672649 14.8548 0 14.2172 0Z" fill="#FFC220"/>
              </svg>
            </div>
            <h2 className="text-lg font-bold text-walmart-text flex-1">Express Delivery</h2>
          </div>

          {/* Card Content */}
          <div className="py-4">
            {/* Delivery ETA */}
            <div className="px-4 mb-4">
              <h3 className="text-[20px] font-bold text-walmart-text leading-[28px] mb-1">Arrives in 37–52 mins</h3>
              <p className="text-sm text-walmart-text leading-5">Emilia Garcia</p>
              <p className="text-sm text-walmart-text leading-5">3743 Park Ln, Dallas, TX 75220</p>
            </div>

            {/* Delivery Instructions */}
            <DeliveryInstructions
              selected={deliveryInstruction}
              onSelect={setDeliveryInstruction}
            />

            {/* Gate codes */}
            <div className="px-4 pt-4">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-bold text-walmart-text">Gate codes or other useful information</h4>
                <button className="text-sm text-walmart-text underline">Edit</button>
              </div>
            </div>

            {/* Walmart Item Details */}
            <ItemDetails
              title="Walmart item details"
              itemCount={7}
              showSubstitution
            />

            {/* Subway Item Details */}
            <ItemDetails
              title="Subway® item details"
              itemCount={1}
              isRestaurant
            />

            {/* Tip Section */}
            <TipSection
              selectedTip={selectedTip}
              onSelectTip={setSelectedTip}
            />
          </div>
        </div>

        {/* ===== CARD 2: Payment Method ===== */}
        <PaymentMethod />

        {/* ===== CARD 3: Text Updates ===== */}
        <TextUpdates
          enabled={textUpdatesEnabled}
          onToggle={setTextUpdatesEnabled}
        />

        {/* ===== Order Summary ===== */}
        <OrderSummary />
      </div>

      <PlaceOrderButton />
    </div>
  )
}

export default ReviewOrder
