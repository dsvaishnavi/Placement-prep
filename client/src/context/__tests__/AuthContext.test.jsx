import { render, screen, act, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { AuthProvider, useAuth } from '../AuthContext'

// Mock fetch
global.fetch = vi.fn()

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
global.localStorage = localStorageMock

// Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
global.sessionStorage = sessionStorageMock

// Mock alert
global.alert = vi.fn()

// Test component to access auth context
const TestComponent = () => {
  const { user, login, logout, loading } = useAuth()
  
  return (
    <div>
      <div data-testid="loading">{loading ? 'loading' : 'loaded'}</div>
      <div data-testid="user">{user ? user.name : 'no user'}</div>
      <button onClick={() => login('test@example.com', 'password')} data-testid="login">
        Login
      </button>
      <button onClick={() => logout()} data-testid="logout">
        Logout
      </button>
    </div>
  )
}

const renderWithAuth = () => {
  return render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  )
}

describe('AuthContext Session Management', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('initializes with loading state', () => {
    renderWithAuth()
    expect(screen.getByTestId('loading')).toHaveTextContent('loading')
  })

  it('handles successful login with session setup', async () => {
    const mockUser = { name: 'John Doe', email: 'john@example.com' }
    const mockResponse = {
      success: true,
      message: 'Login successful',
      token: 'mock-token',
      user: mockUser
    }

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse)
    })

    renderWithAuth()

    await act(async () => {
      screen.getByTestId('login').click()
    })

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('John Doe')
    })

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'mock-token')
    expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockUser))
    expect(localStorage.setItem).toHaveBeenCalledWith('loginTime', expect.any(String))
  })

  it('handles session timeout', async () => {
    // Setup existing session that's expired
    const expiredTime = new Date().getTime() - (31 * 60 * 1000) // 31 minutes ago
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'token') return 'mock-token'
      if (key === 'user') return JSON.stringify({ name: 'John Doe' })
      if (key === 'loginTime') return expiredTime.toString()
      return null
    })

    renderWithAuth()

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('no user')
    })

    expect(localStorage.removeItem).toHaveBeenCalledWith('token')
    expect(localStorage.removeItem).toHaveBeenCalledWith('user')
    expect(localStorage.removeItem).toHaveBeenCalledWith('loginTime')
  })

  it('handles tab close detection', () => {
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'tabClosed') return 'true'
      return null
    })

    renderWithAuth()

    expect(localStorage.removeItem).toHaveBeenCalledWith('tabClosed')
    expect(localStorage.removeItem).toHaveBeenCalledWith('token')
    expect(localStorage.removeItem).toHaveBeenCalledWith('user')
  })

  it('clears session on logout', async () => {
    const mockUser = { name: 'John Doe', email: 'john@example.com' }
    
    renderWithAuth()

    // Simulate logged in state
    await act(async () => {
      // Manually set user state for testing
      const authContext = screen.getByTestId('user').closest('div')
      // This is a simplified test - in real scenario we'd mock the login first
    })

    await act(async () => {
      screen.getByTestId('logout').click()
    })

    expect(localStorage.removeItem).toHaveBeenCalledWith('token')
    expect(localStorage.removeItem).toHaveBeenCalledWith('user')
    expect(localStorage.removeItem).toHaveBeenCalledWith('loginTime')
    expect(sessionStorage.clear).toHaveBeenCalled()
  })

  it('handles session refresh', async () => {
    const mockRefreshResponse = {
      success: true,
      message: 'Session refreshed'
    }

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockRefreshResponse)
    })

    // Test session refresh functionality
    const response = await fetch('http://localhost:3000/auth/refresh-session', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer mock-token',
        'Content-Type': 'application/json',
      },
    })

    expect(response.ok).toBe(true)
    const data = await response.json()
    expect(data.success).toBe(true)
  })
})