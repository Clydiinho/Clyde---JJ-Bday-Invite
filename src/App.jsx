import { useState, useCallback } from 'react'
import FrescoScene from './sections/FrescoScene.jsx'
import Loader from './components/Loader.jsx'

function App() {
  const [loaded, setLoaded] = useState(false)

  const handleComplete = useCallback(() => setLoaded(true), [])

  return (
    <>
      {!loaded && <Loader onComplete={handleComplete} />}
      <FrescoScene />
    </>
  )
}

export default App
