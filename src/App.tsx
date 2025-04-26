import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [radius, setRadius] = useState(20);

  useEffect(() => {
    setRadius((prev) => prev + count);
  }, [count]);

  return (
    <div onClick={() => { setCount((prev) => prev + 1); }} style={{ cursor: 'pointer', borderRadius: radius, width: radius, height: radius, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}><div style={{ color: 'black' }}>{count}</div></div>
  )
}

export default App;
