import { LogIn } from 'lucide-react'
import { Link } from 'react-router-dom'

function Login() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // No authentication logic - UI only
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-surface rounded-lg shadow-lg p-8 border border-border">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primaryAccent/10 mb-4">
              <LogIn className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-primary mb-2">Login</h2>
            <p className="text-muted text-sm">
              Access your dashboard to continue your placement preparation journey.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-primary mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-primary mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-2.5 px-4 rounded-lg font-medium hover:bg-primaryAccent transition-colors mt-6"
            >
              Login
            </button>
            <p className="mt-6 text-center text-sm text-muted">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-medium text-primary hover:text-primaryAccent transition-colors"
              >
                Sign up
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
