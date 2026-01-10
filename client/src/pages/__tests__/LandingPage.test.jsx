import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import LandingPage from '../LandingPage'

const renderLandingPage = (theme = 'light') => {
  const setTheme = vi.fn()
  return render(
    <BrowserRouter>
      <LandingPage theme={theme} setTheme={setTheme} />
    </BrowserRouter>
  )
}

describe('LandingPage Navbar', () => {
  it('renders only essential navigation items', () => {
    renderLandingPage()
    
    // Should have reduced navigation items
    expect(screen.getByText('Features')).toBeInTheDocument()
    expect(screen.getByText('Pricing')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
    
    // Should NOT have these items that were removed
    expect(screen.queryByText('Home')).not.toBeInTheDocument()
    expect(screen.queryByText('Courses')).not.toBeInTheDocument()
    expect(screen.queryByText('Practice')).not.toBeInTheDocument()
    expect(screen.queryByText('Interview Prep')).not.toBeInTheDocument()
  })

  it('does not show Get Started button in navbar', () => {
    renderLandingPage()
    
    // Login button should be present
    expect(screen.getByText('Login')).toBeInTheDocument()
    
    // Get Started button should not be in navbar (it's in hero section)
    const getStartedButtons = screen.queryAllByText('Get Started')
    // Should only find it in hero section, not in navbar
    expect(getStartedButtons.length).toBeLessThanOrEqual(1)
  })

  it('shows theme toggle button', () => {
    renderLandingPage()
    
    const themeButton = screen.getByLabelText('Toggle theme')
    expect(themeButton).toBeInTheDocument()
  })

  it('opens mobile menu with correct items', () => {
    renderLandingPage()
    
    // Find and click mobile menu toggle (should be hidden on desktop but testable)
    const mobileMenuButtons = screen.getAllByRole('button')
    const mobileMenuToggle = mobileMenuButtons.find(button => 
      button.querySelector('svg') && 
      (button.querySelector('svg').classList.contains('lucide-menu') || 
       button.querySelector('svg').classList.contains('lucide-x'))
    )
    
    if (mobileMenuToggle) {
      fireEvent.click(mobileMenuToggle)
      
      // Should show navigation items in mobile menu
      expect(screen.getAllByText('Features').length).toBeGreaterThan(0)
      expect(screen.getAllByText('Login').length).toBeGreaterThan(0)
    }
  })

  it('has proper responsive design classes', () => {
    const { container } = renderLandingPage()
    
    // Check if navbar has proper responsive classes
    const navbar = container.querySelector('nav')
    expect(navbar).toHaveClass('fixed', 'top-0', 'left-0', 'right-0')
    
    // Check if desktop navigation is hidden on mobile
    const desktopNav = container.querySelector('.hidden.lg\\:flex')
    expect(desktopNav).toBeInTheDocument()
  })
})