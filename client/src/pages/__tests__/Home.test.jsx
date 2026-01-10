import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import Home from '../Home'
import { AuthProvider } from '../../context/AuthContext'

// Mock the AuthContext
const mockAuthContext = {
  user: { name: 'John Doe', email: 'john@example.com' },
  loading: false
}

vi.mock('../../context/AuthContext', () => ({
  useAuth: () => mockAuthContext,
  AuthProvider: ({ children }) => children
}))

const renderHome = (theme = 'light') => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Home theme={theme} />
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('Home', () => {
  it('displays the user name in welcome message', () => {
    renderHome()
    
    expect(screen.getByText(/Welcome back, John!/)).toBeInTheDocument()
  })

  it('shows loading state when user data is loading', () => {
    // Mock loading state
    mockAuthContext.loading = true
    mockAuthContext.user = null
    
    renderHome()
    
    expect(screen.getByText('Loading your dashboard...')).toBeInTheDocument()
  })

  it('shows fallback name when user name is not available', () => {
    // Mock no user name
    mockAuthContext.loading = false
    mockAuthContext.user = { email: 'test@example.com' }
    
    renderHome()
    
    expect(screen.getByText(/Welcome back, User!/)).toBeInTheDocument()
  })

  it('displays first name only from full name', () => {
    // Mock full name
    mockAuthContext.loading = false
    mockAuthContext.user = { name: 'Jane Smith', email: 'jane@example.com' }
    
    renderHome()
    
    expect(screen.getByText(/Welcome back, Jane!/)).toBeInTheDocument()
  })
})