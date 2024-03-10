
import Navbar from "./Navbar"
import Popular from "./Popular"
import Story from "./Story"
import {BrowserRouter, Routes, Route, createBrowserRouter, createRoutesFromElements} from'react-router-dom'
function DummyApp () {
  return (
    <div className="header">
    <Navbar/>
    {/* <Popular /> */}
    <Story />
  </div>
  )
}

function App(){

  

  return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<DummyApp />}>
            </Route>
            <Route path="/:name" element={<DummyApp />}>
            </Route>
         </Routes>
      </BrowserRouter>
  )
}

export default App



