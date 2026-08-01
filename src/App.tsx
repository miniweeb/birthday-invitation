import { Link, Route, Routes } from 'react-router-dom'
import { Button } from '@/components/ui/button'

function App() {
  return (
    <div className="bg-background text-foreground min-h-screen p-8">
      <nav className="mb-8 flex items-center gap-4">
        <Link className="hover:underline" to="/">
          Home
        </Link>
        <Link className="hover:underline" to="/login">
          Login
        </Link>
        <Button>Test Button</Button>
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
