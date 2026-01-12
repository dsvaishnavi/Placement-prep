import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import Navbar from '../Navbar'
import { AuthProvider } from '../../context/AuthContext'

// Mock the AuthContext
const mockAuthContext = {
  user: { name: 'Test User', email: 'test@example.com', role: 'admin' },
  logout: vi.fn(),
  isAuthenticated: true
}

vi.mock('../../context/AuthContext', () => ({
  useAuth: () => mockAuthContext,
  AuthProvider: ({ children }) => children
}))

const renderNavbar = (theme = 'light') => {
  const setTheme = vi.fn()
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Navbar theme={theme} setTheme={setTheme} />
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('Navbar', () => {
  it('renders navigation items correctly', () => {
    renderNavbar()
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Aptitude')).toBeInTheDocument()
    expect(screen.getByText('Core Concepts')).toBeInTheDocument()
    expect(screen.getByText('Progress')).toBeInTheDocument()
    expect(screen.getByText('Resume Analyzer')).toBeInTheDocument()
  })

  it('shows user menu when authenticated', () => {
    renderNavbar()
    
    expect(screen.getByText('Test User')).toBeInTheDocument()
  })

  it('opens user dropdown and shows theme options', () => {
    renderNavbar()
    
    // Click on user menu
    fireEvent.click(screen.getByText('Test User'))
    
    // Check if theme options are visible
    expect(screen.getByText('Theme')).toBeInTheDocument()
    expect(screen.getByText('Light')).toBeInTheDocument()
    expect(screen.getByText('Dark')).toBeInTheDocument()
    expect(screen.getByText('System')).toBeInTheDocument()
  })

  it('shows admin panel link for admin users', () => {
    renderNavbar()
    
    // Click on user menu
    fireEvent.click(screen.getByText('Test User'))
    
    // Check if admin panel link is visible
    expect(screen.getByText('Admin Panel')).toBeInTheDocument()
  })

  it('opens mobile menu on small screens', () => {
    renderNavbar()
    
    // Find and click mobile menu toggle
    const mobileMenuButton = screen.getByLabelText('Toggle menu')
    fireEvent.click(mobileMenuButton)
    
    // Mobile menu should show navigation items
    const mobileNavItems = screen.getAllByText('Home')
    expect(mobileNavItems.length).toBeGreaterThan(1) // Desktop + Mobile
  })
})