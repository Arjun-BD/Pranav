import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const navigate = useNavigate()

  function handleSignup(e) {
    e.preventDefault()
    // Mock signup
    navigate('/')
  }

  return (
    <form onSubmit={handleSignup} className="max-w-sm mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold text-center">Sign Up</h1>
      <input type="text" placeholder="Username" className="w-full p-2 border rounded" />
      <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
      <button className="w-full bg-green-500 text-white p-2 rounded">Create Account</button>
    </form>
  )
}
