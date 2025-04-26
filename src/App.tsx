import { useEffect, useState } from 'react'
import './App.css'

const getBeautifulColor = (): string => {
  const redMin = 0;
  const redMax = 255;
  const greenMin = 0;
  const greenMax = 255;
  const blueMin = 0;
  const blueMax = 255;

  const red = Math.floor(Math.random() * (redMax - redMin + 1)) + redMin;
  const green = Math.floor(Math.random() * (greenMax - greenMin + 1)) + greenMin;
  const blue = Math.floor(Math.random() * (blueMax - blueMin + 1)) + blueMin;

  const redHex = red.toString(16).padStart(2, '0');
  const greenHex = green.toString(16).padStart(2, '0');
  const blueHex = blue.toString(16).padStart(2, '0');

  return `#${redHex}${greenHex}${blueHex}`;
}

function getCurrentTime(): string {
  const now = new Date();
  const hours = ((now.getHours() % 12).toString());
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
  return `${hours}:${minutes}:${seconds} ${ampm}`;
}

function App() {
  const [count, setCount] = useState(0);
  const [radius, setRadius] = useState(128);
  const [color, setColor] = useState(getBeautifulColor())

  useEffect(() => {
    setRadius((prev) => prev + count);
  }, [count]);

  useEffect(() => {
    setTimeout(() => { setColor(getBeautifulColor()) }, 1000)
  }, [color])

  return (
    <div className="App" onClick={() => { setCount((prev) => prev + 1); }} style={{ cursor: 'pointer', borderRadius: radius, width: radius, height: radius, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: getBeautifulColor() }}><div style={{ color: 'black', fontSize: `${count + 16}px` }}>{getCurrentTime()}</div></div>
  )
}

export default App;
