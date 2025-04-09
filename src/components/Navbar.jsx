import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <div className="text-xl font-bold">GAMETRON</div>
      <div className="space-x-4">
        <Link to="/games">Buy Games</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/store">Store Info</Link>
        <Link to="/">Login</Link>
      </div>
    </nav>
  )
}
