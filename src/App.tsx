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
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <div className="homepage bg-gradient-to-r from-[#115DA3] to-[#4ECFED] h-screen w-full">
        <LocationHeader />
        <div className="site-container bg-white">
          <div className="innerHeader flex justify-between items-center p-6">
            <TodayWeather unit={unit} />
            {/* <div className="tempToggle"> */}
              <TempToggle unit={unit} onChange={setUnit} />
            {/* </div> */}
          </div>
          <div className="locSkyline"></div>
          <FiveDaySummary unit={unit} />
        </div>
      </div>
    </>
  )
}

export default App
