import LocationHeader from './components/locationHeader'
import './App.css'
import { FiveDaySummary } from './components/fiveDaySummary'
import { TodayWeather } from './components/todayWeather'
import TempToggle from './components/TempToggle/TempToggle'
import type { TempUnit } from './components/TempToggle/TempToggle'
import { useState } from 'react'

function App() {
  const [unit, setUnit] = useState<TempUnit>('F')
  return (
    <>
      <div className="homepage bg-gradient-to-r from-[#115DA3] to-[#4ECFED] h-screen w-full">
        <LocationHeader />
        <div className="site-container bg-white mt-4 mx-auto rounded-xl shadow-lg">
          <div className="inner-header flex justify-between items-start p-4">
            <TodayWeather unit={unit} />
            <TempToggle unit={unit} onChange={setUnit} />
          </div>
          <FiveDaySummary unit={unit} />
        </div>
      </div>
    </>
  )
}

export default App
