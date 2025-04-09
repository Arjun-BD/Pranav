import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import GameList from './pages/GameList'
import Cart from './pages/Cart'
import StoreInfo from './pages/StoreInfo'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/games" element={<GameList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/store" element={<StoreInfo />} />
        </Routes>
      </div>
    </Router>
  )
}
