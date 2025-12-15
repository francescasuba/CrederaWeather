import LocationHeader from './components/locationHeader'
import './App.css'
import { FiveDaySummary } from './components/fiveDaySummary'
import { TodayWeather } from './components/todayWeather'
import TempToggle from './components/TempToggle/TempToggle'
import type { TempUnit } from './components/TempToggle/TempToggle'
import { useState, useEffect } from 'react'
import cloudOne from './assets/cloud-one.png';
import cloudTwo from './assets/cloud-two.png';

function App() {
  const [unit, setUnit] = useState<TempUnit>('F');
  const [loading, setLoading] = useState(true);
  const [cloudsVisible, setCloudsVisible] = useState(false);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => setCloudsVisible(true), 50);
    }
  }, [loading]);

  return (
    <div className="homepage bg-gradient-to-r from-[#115DA3] to-[#4ECFED] h-screen w-full relative overflow-x-hidden">
      <img
          src={cloudOne}
        alt="Cloud left"
        className={`cloud cloud-left${cloudsVisible ? ' cloud-in' : ''}`}
      />
      <img
          src={cloudTwo}
        alt="Cloud right"
        className={`cloud cloud-right${cloudsVisible ? ' cloud-in' : ''}`}
      />
      <LocationHeader loading={loading} setLoading={setLoading} />
      <div className="site-container bg-white mt-4 mx-auto rounded-xl shadow-lg relative z-40">
        <div className="inner-header flex flex-col sm:flex-row justify-between items-start p-2">
          <TodayWeather unit={unit} />
          <TempToggle unit={unit} onChange={setUnit} />
        </div>
        <FiveDaySummary unit={unit} />
      </div>
    </div>
  );
}

export default App
