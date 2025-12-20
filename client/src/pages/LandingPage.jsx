// src/pages/LandingPage.jsx
import { useState, useEffect, useRef } from 'react'
import {
  Cpu,
  Rocket,
  Users,
  Target,
  Sparkles,
  Menu,
  X,
  ChevronRight,
  Star,
  Zap,
  Award,
  Terminal,
  MessageSquare,
  FileCode,
  Brain,
  TrendingUp,
  Clock,
  ArrowRight,
  Globe,
  Shield,
  Activity,
  MonitorSmartphone,
  Github,
  Linkedin,
  Mail,
  Sun,
  Moon
} from 'lucide-react'
import { Link } from 'react-router-dom'

// Mouse Follower Pink Circle
const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const circleRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX
      const y = e.clientY
      setPosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={circleRef}
      className="fixed pointer-events-none z-30 mix-blend-screen"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        transition: 'left 0.1s ease-out, top 0.1s ease-out',
        willChange: 'transform'
      }}
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-sm" />
      <div className="absolute inset-0 w-6 h-6 rounded-full bg-gradient-to-r from-pink-400/40 to-purple-400/40 blur-sm" />
      <div className="absolute inset-0 w-4 h-4 rounded-full bg-pink-400/60 blur-sm" />
    </div>
  )
}

// Fixed Circuit Green Particles Animation
const CircuitGreenParticles = ({ theme }) => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const particles = []
    const particleCount = 50 // Optimized for mobile
    
    let width = 0, height = 0
    let devicePixelRatio = 1

    // Responsive circuit path points
    const getCircuitPoints = () => {
      // Ensure we have valid dimensions
      const safeWidth = Math.max(width, 100)
      const safeHeight = Math.max(height, 100)
      
      return [
        { x: safeWidth * 0.1, y: safeHeight * 0.2 }, 
        { x: safeWidth * 0.3, y: safeHeight * 0.1 },
        { x: safeWidth * 0.5, y: safeHeight * 0.3 }, 
        { x: safeWidth * 0.7, y: safeHeight * 0.2 },
        { x: safeWidth * 0.9, y: safeHeight * 0.4 }, 
        { x: safeWidth * 0.8, y: safeHeight * 0.6 },
        { x: safeWidth * 0.6, y: safeHeight * 0.7 }, 
        { x: safeWidth * 0.4, y: safeHeight * 0.6 },
        { x: safeWidth * 0.2, y: safeHeight * 0.8 }, 
        { x: safeWidth * 0.1, y: safeHeight * 0.5 }
      ]
    }

    let circuitPoints = []

    const initParticles = () => {
      particles.length = 0
      
      for (let i = 0; i < particleCount; i++) {
        const pathIndex = Math.floor(Math.random() * (circuitPoints.length - 1))
        particles.push({
          currentPath: pathIndex,
          progress: Math.random(),
          speed: 0.01 + Math.random() * 0.008,
          size: 1.5 + Math.random() * 2,
          baseOpacity: Math.random() * 0.4 + 0.2,
          pulseSpeed: Math.random() * 0.01 + 0.005,
          pulsePhase: Math.random() * Math.PI * 2,
          glow: 0,
          trailLength: Math.floor(Math.random() * 3) + 2,
          trail: []
        })
      }
    }

    const setCanvasSize = () => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      width = rect.width
      height = rect.height
      
      // Set canvas size exactly to container size
      canvas.width = width
      canvas.height = height
      
      // Update circuit points
      circuitPoints = getCircuitPoints()
      initParticles()
    }

    // Initialize
    setCanvasSize()
    const resizeObserver = new ResizeObserver(setCanvasSize)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    const animateParticles = () => {
      if (!width || !height || circuitPoints.length === 0) {
        animationRef.current = requestAnimationFrame(animateParticles)
        return
      }

      // Clear with minimal fade
      ctx.fillStyle = theme === 'dark' 
        ? 'rgba(0, 0, 0, 0.02)'
        : 'rgba(255, 255, 255, 0.01)'
      ctx.fillRect(0, 0, width, height)

      particles.forEach(particle => {
        // Update progress along circuit path
        particle.progress += particle.speed
        if (particle.progress > 1) {
          particle.progress = 0
          particle.currentPath = (particle.currentPath + 1) % (circuitPoints.length - 1)
          particle.trail = []
        }

        // Calculate position along circuit path
        const startPoint = circuitPoints[particle.currentPath]
        const endPoint = circuitPoints[particle.currentPath + 1] || circuitPoints[0]
        
        const t = particle.progress
        const baseX = startPoint.x + (endPoint.x - startPoint.x) * t
        const baseY = startPoint.y + (endPoint.y - startPoint.y) * t
        
        // Add smooth sinusoidal movement
        const maxOffset = Math.min(width, height) * 0.02
        const circuitOffset = Math.sin(particle.progress * Math.PI * 2) * maxOffset
        const finalX = baseX + Math.cos(particle.pulsePhase) * circuitOffset
        const finalY = baseY + Math.sin(particle.pulsePhase) * circuitOffset
        
        // Update pulse for glowing effect
        particle.pulsePhase += particle.pulseSpeed
        particle.glow = Math.sin(particle.pulsePhase) * 0.5 + 0.5

        // Store position for trail
        particle.trail.push({ x: finalX, y: finalY })
        if (particle.trail.length > particle.trailLength) {
          particle.trail.shift()
        }

        // Draw trail (circuit trace)
        if (particle.trail.length > 1) {
          ctx.strokeStyle = theme === 'dark' 
            ? `rgba(34, 197, 94, ${0.15 * particle.glow})`
            : `rgba(21, 128, 61, ${0.1 * particle.glow})`
          ctx.lineWidth = 1.2
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'
          
          ctx.beginPath()
          ctx.moveTo(particle.trail[0].x, particle.trail[0].y)
          for (let i = 1; i < particle.trail.length; i++) {
            ctx.lineTo(particle.trail[i].x, particle.trail[i].y)
          }
          ctx.stroke()
        }

        // Draw particle with glowing effect
        const opacity = particle.baseOpacity * (0.8 + 0.2 * particle.glow)
        const size = particle.size * (0.8 + 0.4 * particle.glow)

        // Glow effect - visible in dark mode
        ctx.fillStyle = theme === 'dark' 
          ? `rgba(34, 197, 94, ${opacity * 0.5})` // Increased opacity for dark mode
          : `rgba(21, 128, 61, ${opacity * 0.3})`
        
        ctx.beginPath()
        ctx.arc(finalX, finalY, size * 2.5, 0, Math.PI * 2)
        ctx.fill()

        // Particle core - brighter in dark mode
        ctx.fillStyle = theme === 'dark' 
          ? `rgba(34, 197, 94, ${0.9 * particle.glow})`
          : `rgba(21, 128, 61, ${0.8 * particle.glow})`
        
        ctx.beginPath()
        ctx.arc(finalX, finalY, size, 0, Math.PI * 2)
        ctx.fill()

        // Particle highlight
        ctx.fillStyle = theme === 'dark' 
          ? `rgba(255, 255, 255, ${0.8 * particle.glow})`
          : `rgba(255, 255, 255, ${0.6 * particle.glow})`
        
        ctx.beginPath()
        ctx.arc(finalX - size * 0.3, finalY - size * 0.3, size * 0.4, 0, Math.PI * 2)
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animateParticles)
    }

    animateParticles()

    return () => {
      cancelAnimationFrame(animationRef.current)
      resizeObserver.disconnect()
    }
  }, [theme])

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ 
          opacity: theme === 'dark' ? 0.7 : 0.5,
          imageRendering: 'crisp-edges'
        }}
      />
    </div>
  )
}

// Fixed Short Circuit Spark Animation (visible in dark mode)
const ShortCircuitSparks = ({ theme }) => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const sparks = []
    let sparkTimer = 0
    let lastSparkTime = 0

    let width = 0, height = 0

    const setCanvasSize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      
      canvas.width = width
      canvas.height = height
    }

    setCanvasSize()
    const resizeObserver = new ResizeObserver(setCanvasSize)
    resizeObserver.observe(canvas)

    const createSpark = (x, y) => {
      const angle = Math.random() * Math.PI * 2
      const speed = 2 + Math.random() * 4
      const life = 25 + Math.random() * 40
      
      sparks.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life,
        maxLife: life,
        size: 1.5 + Math.random() * 2.5,
        color: theme === 'dark' 
          ? `rgba(251, 191, 36, ${0.9})` // Brighter yellow for dark mode
          : `rgba(245, 158, 11, ${0.8})`
      })
    }

    const createSparkBurst = () => {
      const centerX = Math.random() * width
      const centerY = Math.random() * height
      const sparkCount = 10 + Math.floor(Math.random() * 15)
      
      for (let i = 0; i < sparkCount; i++) {
        createSpark(centerX, centerY)
      }
    }

    const animateSparks = () => {
      if (!width || !height) {
        animationRef.current = requestAnimationFrame(animateSparks)
        return
      }

      // Clear with fade
      ctx.fillStyle = theme === 'dark' 
        ? 'rgba(0, 0, 0, 0.03)'
        : 'rgba(255, 255, 255, 0.01)'
      ctx.fillRect(0, 0, width, height)

      // Update spark timer
      sparkTimer++
      if (sparkTimer - lastSparkTime > 90 + Math.random() * 120) { // 1.5-3.5 seconds
        createSparkBurst()
        lastSparkTime = sparkTimer
      }

      // Update and draw sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const spark = sparks[i]
        
        spark.x += spark.vx
        spark.y += spark.vy
        spark.life--
        
        // Fade out
        const opacity = spark.life / spark.maxLife
        
        // Draw spark with glow
        ctx.fillStyle = spark.color.replace(')', `, ${opacity})`).replace('rgb', 'rgba')
        ctx.beginPath()
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2)
        ctx.fill()
        
        // Spark trail - visible in dark mode
        ctx.strokeStyle = theme === 'dark' 
          ? `rgba(251, 191, 36, ${opacity * 0.6})`
          : `rgba(245, 158, 11, ${opacity * 0.4})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(spark.x - spark.vx * 2, spark.y - spark.vy * 2)
        ctx.lineTo(spark.x, spark.y)
        ctx.stroke()
        
        // Remove dead sparks
        if (spark.life <= 0) {
          sparks.splice(i, 1)
        }
      }

      animationRef.current = requestAnimationFrame(animateSparks)
    }

    animateSparks()

    return () => {
      cancelAnimationFrame(animationRef.current)
      resizeObserver.disconnect()
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ 
        opacity: theme === 'dark' ? 0.8 : 0.6,
        mixBlendMode: 'screen'
      }}
    />
  )
}

// Theme Toggle Component
const ThemeToggle = ({ theme, setTheme }) => {
  const [showOptions, setShowOptions] = useState(false)

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
    setShowOptions(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        className={`
          flex items-center space-x-2 px-3 py-1.5 rounded-lg
          transition-all duration-300 ease-out
          ${theme === 'dark' 
            ? 'bg-gray-800/50 hover:bg-gray-700/50 text-white border border-white/10' 
            : 'bg-gray-200/50 hover:bg-gray-300/50 text-gray-800 border border-gray-300/50'
          }
        `}
      >
        {theme === 'dark' ? (
          <Moon className="w-4 h-4" />
        ) : (
          <Sun className="w-4 h-4" />
        )}
        <span className="text-xs font-medium">
          {theme === 'dark' ? 'Dark' : 'Light'}
        </span>
      </button>

      {showOptions && (
        <div className={`absolute top-full left-0 mt-2 w-32 rounded-lg shadow-xl backdrop-blur-xl border ${
          theme === 'dark' 
            ? 'bg-black/80 border-white/20' 
            : 'bg-white/90 border-gray-200'
        }`}>
          <button
            onClick={() => handleThemeChange('light')}
            className={`flex items-center justify-between w-full px-3 py-2 text-sm transition-colors ${
              theme === 'light' 
                ? 'bg-blue-500/20 text-blue-400' 
                : 'hover:bg-white/10'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Sun className="w-4 h-4" />
              <span>Light</span>
            </div>
            {theme === 'light' && <div className="w-2 h-2 rounded-full bg-blue-400" />}
          </button>
          
          <button
            onClick={() => handleThemeChange('dark')}
            className={`flex items-center justify-between w-full px-3 py-2 text-sm transition-colors ${
              theme === 'dark' 
                ? 'bg-blue-500/20 text-blue-400' 
                : 'hover:bg-white/10'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Moon className="w-4 h-4" />
              <span>Dark</span>
            </div>
            {theme === 'dark' && <div className="w-2 h-2 rounded-full bg-blue-400" />}
          </button>
        </div>
      )}
    </div>
  )
}

// Sticky Get Started Button
const StickyGetStartedButton = ({ theme }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      // Always show button, but reduce opacity when scrolled far
      setVisible(window.scrollY < window.innerHeight * 0.8)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Link to="/signup">
      <button
        className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl font-semibold
          transition-all duration-300 ease-out
          bg-gradient-to-r from-blue-500 to-green-500
          hover:from-blue-600 hover:to-green-600
          hover:scale-105 active:scale-95
          shadow-lg shadow-green-500/30
          flex items-center space-x-2
          ${visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
        `}
      >
        <Rocket className="w-4 h-4" />
        <span className="text-sm">Get Started</span>
      </button>
    </Link>
  )
}

// Main Component
function LandingPage({ theme, setTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Force hide scrollbar on all elements
  useEffect(() => {
    // Add hide-scrollbar class to all scrollable elements
    const style = document.createElement('style')
    style.innerHTML = `
      .hide-scrollbar::-webkit-scrollbar {
        display: none !important;
      }
      .hide-scrollbar {
        -ms-overflow-style: none !important;
        scrollbar-width: none !important;
      }
      * {
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
      }
      *::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'Why Skill Sync', href: '#why' },
    { label: 'Reach', href: '#reach' },
    { label: 'Company', href: '#company' },
    { label: 'Contact', href: '#contact' },
  ]

  const features = [
    {
      icon: Cpu,
      title: "Aptitude Training",
      description: "Master quantitative aptitude, logical reasoning with interactive exercises.",
      link: "/aptitude"
    },
    {
      icon: Terminal,
      title: "Core Concepts",
      description: "Programming fundamentals, data structures, and algorithms practice.",
      link: "/core-concepts"
    },
    {
      icon: Activity, // Replaced BarChart3 with Activity
      title: "Progress Tracking",
      description: "Detailed analytics and performance insights dashboard.",
      link: "/progress"
    },
    {
      icon: FileCode,
      title: "Resume Analyzer",
      description: "AI-powered feedback to optimize your resume.",
      link: "/resumeanalyzer"
    },
    {
      icon: MessageSquare,
      title: "Mock Interviews",
      description: "Realistic interview simulations with feedback.",
      link: "/aptitude"
    },
    {
      icon: Brain,
      title: "Smart Analytics",
      description: "Identify strengths and areas for improvement.",
      link: "/progress"
    }
  ]

  const stats = [
    { icon: Users, value: "10K+", label: "Students Trained" },
    { icon: Award, value: "95%", label: "Placement Rate" },
    { icon: Target, value: "500+", label: "Companies" },
    { icon: Star, value: "4.8", label: "Rating" }
  ]

  const successMetrics = [
    { value: "2.5x", label: "Faster Skill Acquisition", icon: TrendingUp },
    { value: "40%", label: "Higher Interview Success", icon: Target },
    { value: "85%", label: "Satisfaction Rate", icon: Star },
    { value: "24/7", label: "Learning Support", icon: Clock }
  ]

  return (
    <div className={`min-h-screen transition-all duration-300 relative hide-scrollbar ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black' 
        : 'bg-gradient-to-b from-gray-50 via-blue-50/30 to-white'
    }`}>

      {/* Mouse Follower Pink Circle */}
      <MouseFollower />

      {/* Background Animations */}
      <CircuitGreenParticles theme={theme} />
      <ShortCircuitSparks theme={theme} />

      {/* Glass Overlay */}
      <div className={`fixed inset-0 pointer-events-none ${
        theme === 'dark' 
          ? 'bg-gradient-to-b from-transparent via-transparent to-black/10' 
          : 'bg-gradient-to-b from-transparent via-transparent to-white/10'
      }`} />

      {/* Sticky Get Started Button */}
      <StickyGetStartedButton theme={theme} />

      {/* Navigation */}
      <nav className={`
        fixed top-0 left-0 right-0 z-40 
        transition-all duration-300 ease-out
        py-3 sm:py-4
        ${theme === 'dark' 
          ? 'backdrop-blur-lg sm:backdrop-blur-xl bg-black/30 border-b border-white/10' 
          : 'backdrop-blur-lg sm:backdrop-blur-xl bg-white/40 border-b border-gray-200/50'
        }
      `}>
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-1.5 sm:space-x-2">
              <div className={`p-1 sm:p-1.5 rounded-md ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-blue-500/15 to-green-500/15' 
                  : 'bg-gradient-to-br from-blue-100 to-green-100'
              }`}>
                <Rocket className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                  Skill Sync
                </span>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Placement Platform
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6 absolute left-1/2 transform -translate-x-1/2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-xs lg:text-sm font-medium transition-colors hover:text-blue-400 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <ThemeToggle theme={theme} setTheme={setTheme} />

              <Link to="/login">
                <div className={`
                  px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg backdrop-blur-lg
                  transition-all duration-300 ease-out
                  ${theme === 'dark' 
                    ? 'bg-white/5 border border-white/10 hover:bg-white/10' 
                    : 'bg-white/70 border border-gray-200/60 hover:bg-white/80'
                  }
                `}>
                  <span className={`text-xs font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Login
                  </span>
                </div>
              </Link>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-1 sm:p-1.5 rounded-md hover:bg-white/10 transition-colors"
              >
                {isMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-3">
              <div className={`
                p-3 rounded-lg backdrop-blur-xl border
                ${theme === 'dark' 
                  ? 'bg-black/70 border-white/10' 
                  : 'bg-white/80 border-gray-200'
                }
              `}>
                <div className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className={`py-1.5 px-3 rounded transition-colors hover:bg-white/10 text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                  <Link 
                    to="/login" 
                    className={`py-1.5 px-3 rounded transition-colors hover:bg-white/10 text-sm ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 px-3 sm:px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full mb-4 sm:mb-6 backdrop-blur-sm border border-white/20">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 animate-pulse" />
              <span className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                AI-Powered Platform
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="mb-3 sm:mb-4">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-1 sm:mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-400 to-purple-400">
                  Master Your Skills
                </span>
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                  Ace Your Placements
                </span>
              </div>
            </h1>

            {/* Description */}
            <p className={`text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Transform your career with comprehensive placement preparation. 
              From aptitude tests to technical interviews.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center mb-8 sm:mb-12">
              <Link to="/signup">
                <div className={`
                  px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl backdrop-blur-lg border
                  flex items-center justify-center sm:justify-start space-x-1.5 sm:space-x-2 group min-w-[140px]
                  transition-all duration-300 ease-out
                  ${theme === 'dark' 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' 
                    : 'bg-white/70 border-gray-200/60 hover:bg-white/80 hover:border-gray-200'
                  }
                  hover:scale-[1.02] active:scale-95
                `}>
                  <Rocket className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                  <span className={`text-xs sm:text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Start Free Trial
                  </span>
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5 sm:group-hover:translate-x-1" />
                </div>
              </Link>
              <Link to="/aptitude">
                <div className={`
                  px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl backdrop-blur-lg border min-w-[140px]
                  transition-all duration-300 ease-out text-center
                  ${theme === 'dark' 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' 
                    : 'bg-white/70 border-gray-200/60 hover:bg-white/80 hover:border-gray-200'
                  }
                  hover:scale-[1.02] active:scale-95
                `}>
                  <span className={`text-xs sm:text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Try Live Demo
                  </span>
                </div>
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-md mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg mb-2 sm:mb-3 ${
                    theme === 'dark' 
                      ? 'bg-gradient-to-br from-blue-500/10 to-green-500/10' 
                      : 'bg-gradient-to-br from-blue-100 to-green-100'
                  }`}>
                    <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-blue-400 mb-0.5 sm:mb-1">{stat.value}</div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-10 sm:py-12 px-3 sm:px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-400 to-purple-400">
                Comprehensive Platform
              </span>
            </h2>
            <p className={`text-sm sm:text-base max-w-xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Everything for successful placement preparation
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {features.map((feature, index) => (
              <Link key={index} to={feature.link} className="block h-full">
                <div className={`
                  p-4 sm:p-5 rounded-xl backdrop-blur-lg border h-full
                  transition-all duration-300 ease-out
                  ${theme === 'dark' 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' 
                    : 'bg-white/70 border-gray-200/60 hover:bg-white/80 hover:border-gray-200'
                  }
                  hover:scale-[1.02] active:scale-95
                `}>
                  <div className={`inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg mb-3 sm:mb-4 ${
                    theme === 'dark' 
                      ? 'bg-gradient-to-br from-blue-500/10 to-green-500/10' 
                      : 'bg-gradient-to-br from-blue-100 to-green-100'
                  }`}>
                    <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  </div>
                  <h3 className={`font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {feature.title}
                  </h3>
                  <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                    {feature.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Skill Sync Section */}
      <section id="why" className="py-10 sm:py-12 px-3 sm:px-4">
        <div className="container mx-auto max-w-4xl">
          <div className={`
            p-4 sm:p-6 rounded-xl backdrop-blur-lg border
            ${theme === 'dark' 
              ? 'bg-white/5 border-white/10' 
              : 'bg-white/70 border-gray-200/60'
            }
          `}>
            <div className="text-center mb-4 sm:mb-8">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-4 text-green-400 animate-pulse" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1.5 sm:mb-3">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-400 to-purple-400">
                  Why Choose Skill Sync?
                </span>
              </h2>
              <p className={`text-sm sm:text-base max-w-lg mx-auto ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Accelerate your placement journey with proven results
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {successMetrics.map((metric, index) => (
                <div key={index} className="text-center p-2 sm:p-4">
                  <metric.icon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 sm:mb-3 text-green-400" />
                  <div className="text-base sm:text-lg font-bold text-green-400 mb-0.5 sm:mb-1">{metric.value}</div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className={`py-6 sm:py-8 px-3 sm:px-4 border-t ${
        theme === 'dark' ? 'border-white/10' : 'border-gray-200'
      }`}>
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center space-x-1.5 sm:space-x-2 mb-2 sm:mb-3">
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                <span className="text-base sm:text-lg font-bold">Skill Sync</span>
              </div>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Empowering careers through placement preparation.
              </p>
            </div>

            <div>
              <h4 className={`font-medium mb-1 sm:mb-2 text-sm ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Company
              </h4>
              <div className="space-y-0.5 sm:space-y-1">
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  About Us
                </div>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Careers
                </div>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Contact
                </div>
              </div>
            </div>

            <div>
              <h4 className={`font-medium mb-1 sm:mb-2 text-sm ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Connect
              </h4>
              <div className="flex space-x-1.5 sm:space-x-2">
                <Github className={`w-3 h-3 sm:w-4 sm:h-4 cursor-pointer hover:text-green-400 transition-colors ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <Linkedin className={`w-3 h-3 sm:w-4 sm:h-4 cursor-pointer hover:text-green-400 transition-colors ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <Mail className={`w-3 h-3 sm:w-4 sm:h-4 cursor-pointer hover:text-green-400 transition-colors ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
              </div>
            </div>

            <div>
              <h4 className={`font-medium mb-1 sm:mb-2 text-sm ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Legal
              </h4>
              <div className="space-y-0.5 sm:space-y-1">
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Privacy Policy
                </div>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Terms of Service
                </div>
              </div>
            </div>
          </div>

          <div className={`border-t pt-3 sm:pt-4 text-center ${
            theme === 'dark' 
              ? 'border-white/10 text-gray-400' 
              : 'border-gray-200 text-gray-500'
          }`}>
            <p className="text-xs">© 2024 Skill Sync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage