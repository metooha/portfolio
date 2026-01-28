import { useState } from 'react'
import Header from '../components/Header'
import ExpressDelivery from '../components/ExpressDelivery'
import DeliveryInfo from '../components/DeliveryInfo'
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
    <div className="min-h-screen bg-white max-w-mobile mx-auto relative">
      {/* iOS Status Bar */}
      <div className="h-[54px] bg-walmart-blue flex items-end justify-between px-5 pb-[13px]">
        <span className="text-white font-semibold text-[17px]">9:41</span>
        <div className="flex items-center gap-1.5">
          {/* Signal, WiFi, Battery icons */}
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
            <path d="M0 6C0 5.44772 0.447715 5 1 5H2C2.55228 5 3 5.44772 3 6V10C3 10.5523 2.55228 11 2 11H1C0.447715 11 0 10.5523 0 10V6Z" fill="white"/>
            <path d="M5 3.5C5 2.94772 5.44772 2.5 6 2.5H7C7.55228 2.5 8 2.94772 8 3.5V10C8 10.5523 7.55228 11 7 11H6C5.44772 11 5 10.5523 5 10V3.5Z" fill="white"/>
            <path d="M10 1C10 0.447715 10.4477 0 11 0H12C12.5523 0 13 0.447715 13 1V10C13 10.5523 12.5523 11 12 11H11C10.4477 11 10 10.5523 10 10V1Z" fill="white"/>
            <path d="M15 0C15 -0.552285 15.4477 -1 16 -1H17C17.5523 -1 18 -0.552285 18 0V10C18 10.5523 17.5523 11 17 11H16C15.4477 11 15 10.5523 15 10V0Z" fill="white" opacity="0.4"/>
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path d="M0 3.5C0 2.94772 0.447715 2.5 1 2.5H2C2.55228 2.5 3 2.94772 3 3.5V10C3 10.5523 2.55228 11 2 11H1C0.447715 11 0 10.5523 0 10V3.5Z" fill="white"/>
            <path d="M5 3C5 2.44772 5.44772 2 6 2H7C7.55228 2 8 2.44772 8 3V10C8 10.5523 7.55228 11 7 11H6C5.44772 11 5 10.5523 5 10V3Z" fill="white"/>
            <path d="M10 0.5C10 -0.0522847 10.4477 -0.5 11 -0.5H12C12.5523 -0.5 13 -0.0522847 13 0.5V10C13 10.5523 12.5523 11 12 11H11C10.4477 11 10 10.5523 10 10V0.5Z" fill="white"/>
            <path d="M14.5 1C14.5 0.447715 14.9477 0 15.5 0C16.0523 0 16.5 0.447715 16.5 1V10C16.5 10.5523 16.0523 11 15.5 11C14.9477 11 14.5 10.5523 14.5 10V1Z" fill="white"/>
          </svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
            <rect opacity="0.35" x="0.5" y="0.5" width="18" height="11" rx="2.5" stroke="white"/>
            <path opacity="0.4" d="M21 3V9C22 8.66667 23 7.66667 23 6C23 4.33333 22 3.33333 21 3Z" fill="white"/>
            <rect x="2" y="2" width="15" height="8" rx="1" fill="white"/>
          </svg>
        </div>
      </div>

      <Header />
      
      <div className="bg-white overflow-y-auto pb-24">
        <ExpressDelivery />
        <DeliveryInfo />
        <DeliveryInstructions 
          selected={deliveryInstruction}
          onSelect={setDeliveryInstruction}
        />
        
        {/* Gate codes section */}
        <div className="px-4 py-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-walmart-text">Gate codes or other useful information</h3>
            <button className="text-sm text-walmart-text underline">Edit</button>
          </div>
        </div>

        <ItemDetails
          title="Walmart item details"
          itemCount={7}
          images={[
            'https://i5.walmartimages.com/seo/Lay-s-Classic-Potato-Chips-8-oz-Bag_1c7c...',
            'https://i5.walmartimages.com/seo/Lay-s-Sour-Cream-Onion-Flavored-Potato...',
            'https://i5.walmartimages.com/seo/Fresh-Strawberries-16-oz_0ea...',
            'https://i5.walmartimages.com/seo/Orbit-Wintermint-Sugar-Free-Gum-14-Piece...'
          ]}
        />

        <ItemDetails
          title="Subway® item details"
          itemCount={1}
          isRestaurant
        />

        <TipSection 
          selectedTip={selectedTip}
          onSelectTip={setSelectedTip}
        />

        <PaymentMethod />
        
        <TextUpdates 
          enabled={textUpdatesEnabled}
          onToggle={setTextUpdatesEnabled}
        />

        <OrderSummary />
      </div>

      <PlaceOrderButton />
    </div>
  )
}

export default ReviewOrder
