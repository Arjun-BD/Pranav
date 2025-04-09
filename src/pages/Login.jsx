import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  function handleLogin(e) {
    e.preventDefault()
    // Mock login
    navigate('/games')
  }

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold text-center">Login</h1>
      <div className="bg-blue-500 text-white p-4 rounded-xl">
  Tailwind is working 🎉
</div>

      <input type="text" placeholder="Username" className="w-full p-2 border rounded" />
      <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
      <button className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      <p className="text-center">
        Don't have an account? <a className="text-blue-500" href="/signup">Sign Up</a>
      </p>
      

    </form>
  )
}
