import { Link, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-slate-900 p-8 text-slate-100">
      <nav className="mb-8 flex gap-4">
        <Link className="text-pink-400 hover:underline" to="/">
          Home
        </Link>
        <Link className="text-pink-400 hover:underline" to="/login">
          Login
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1 className="text-3xl font-bold">Home</h1>} />
        <Route path="/login" element={<h1 className="text-3xl font-bold">Login</h1>} />
        <Route path="*" element={<h1 className="text-3xl font-bold">404</h1>} />
      </Routes>
    </div>
  )
}

export default App