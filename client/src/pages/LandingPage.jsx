// src/pages/LandingPage.jsx
import { useState, useEffect, useRef } from 'react'
import {
  Cpu,
  Database,
  Code2,
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
  Briefcase,
  BarChart3,
  Sun,
  Moon,
  Github,
  Linkedin,
  Mail,
  Terminal,
  MessageSquare,
  FileCode,
  Brain,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
  Globe,
  Shield,
  Activity,
  CpuIcon,
  Monitor,
  Server
} from 'lucide-react'
import { Link } from 'react-router-dom'

// Data Transfer Animation Component (Database to PC)
const DataTransferAnimation = ({ theme }) => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let time = 0
    
    // Set canvas size
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      
      ctx.scale(dpr, dpr)
    }

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Data points for animation
    const dataPoints = []
    const dataStreamCount = 4

    // Initialize data points for each stream
    for (let i = 0; i < dataStreamCount; i++) {
      dataPoints.push({
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.001,
        size: 2 + Math.random() * 2,
        color: theme === 'dark' 
          ? `rgba(34, 197, 94, ${0.6 + Math.random() * 0.3})`
          : `rgba(21, 128, 61, ${0.6 + Math.random() * 0.3})`
      })
    }

    const drawDataTransfer = () => {
      const width = canvas.width / (window.devicePixelRatio || 1)
      const height = canvas.height / (window.devicePixelRatio || 1)
      
      // Clear with fade effect for trailing
      ctx.fillStyle = theme === 'dark' 
        ? 'rgba(0, 0, 0, 0.05)'
        : 'rgba(255, 255, 255, 0.05)'
      ctx.fillRect(0, 0, width, height)

      // Draw database icon on left
      const dbX = width * 0.2
      const dbY = height * 0.5
      
      // Database 3D cylinder
      ctx.fillStyle = theme === 'dark' 
        ? 'rgba(59, 130, 246, 0.3)'
        : 'rgba(37, 99, 235, 0.2)'
      ctx.fillRect(dbX - 20, dbY - 15, 40, 30)
      
      // Database top
      ctx.fillStyle = theme === 'dark' 
        ? 'rgba(14, 165, 233, 0.4)'
        : 'rgba(2, 132, 199, 0.3)'
      ctx.beginPath()
      ctx.ellipse(dbX, dbY - 15, 20, 5, 0, 0, Math.PI * 2)
      ctx.fill()
      
      // Database layers
      for (let i = 0; i < 3; i++) {
        ctx.fillStyle = theme === 'dark' 
          ? `rgba(14, 165, 233, ${0.2 + i * 0.1})`
          : `rgba(2, 132, 199, ${0.15 + i * 0.08})`
        ctx.fillRect(dbX - 18, dbY - 10 + i * 8, 36, 4)
      }

      // Draw PC icon on right
      const pcX = width * 0.8
      const pcY = height * 0.5
      
      // PC monitor
      ctx.fillStyle = theme === 'dark' 
        ? 'rgba(139, 92, 246, 0.3)'
        : 'rgba(124, 58, 237, 0.2)'
      ctx.fillRect(pcX - 25, pcY - 20, 50, 30)
      
      // PC screen
      ctx.fillStyle = theme === 'dark' 
        ? 'rgba(99, 102, 241, 0.4)'
        : 'rgba(67, 56, 202, 0.3)'
      ctx.fillRect(pcX - 20, pcY - 15, 40, 20)
      
      // PC base
      ctx.fillStyle = theme === 'dark' 
        ? 'rgba(107, 114, 128, 0.4)'
        : 'rgba(75, 85, 99, 0.3)'
      ctx.fillRect(pcX - 10, pcY + 10, 20, 5)

      // Draw data transfer lines
      dataPoints.forEach((point, index) => {
        // Update progress
        point.progress += point.speed
        if (point.progress > 1) {
          point.progress = 0
        }

        // Calculate position along the curve
        const t = point.progress
        const x = dbX + (pcX - dbX) * t
        const y = dbY + Math.sin(t * Math.PI) * 20 - Math.sin(index * 0.5 + time * 0.001) * 10

        // Draw data packet
        ctx.fillStyle = point.color
        ctx.beginPath()
        ctx.arc(x, y, point.size, 0, Math.PI * 2)
        ctx.fill()

        // Draw trail
        for (let i = 1; i <= 3; i++) {
          const trailT = t - i * 0.05
          if (trailT < 0) continue
          
          const trailX = dbX + (pcX - dbX) * trailT
          const trailY = dbY + Math.sin(trailT * Math.PI) * 20 - Math.sin(index * 0.5 + (time - i * 50) * 0.001) * 10
          
          ctx.fillStyle = theme === 'dark' 
            ? `rgba(34, 197, 94, ${0.3 / i})`
            : `rgba(21, 128, 61, ${0.3 / i})`
          ctx.beginPath()
          ctx.arc(trailX, trailY, point.size / i, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Draw connection wire
      ctx.strokeStyle = theme === 'dark' 
        ? 'rgba(34, 197, 94, 0.2)'
        : 'rgba(21, 128, 61, 0.15)'
      ctx.lineWidth = 2
      ctx.setLineDash([5, 5])
      ctx.lineDashOffset = -time * 0.01

      ctx.beginPath()
      ctx.moveTo(dbX + 20, dbY)
      for (let t = 0; t <= 1; t += 0.01) {
        const x = dbX + (pcX - dbX) * t
        const y = dbY + Math.sin(t * Math.PI) * 20
        ctx.lineTo(x, y)
      }
      ctx.stroke()

      time += 16
      animationRef.current = requestAnimationFrame(drawDataTransfer)
    }

    drawDataTransfer()

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
    />
  )
}

// Green Particles Animation
const GreenParticles = ({ theme }) => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const particles = []
    const particleCount = 40

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        color: theme === 'dark' 
          ? `rgba(34, 197, 94, ${Math.random() * 0.3 + 0.1})`
          : `rgba(21, 128, 61, ${Math.random() * 0.2 + 0.05})`,
        wobble: Math.random() * Math.PI * 2
      })
    }

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      
      ctx.scale(dpr, dpr)
    }

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    const animateParticles = () => {
      const width = canvas.width / (window.devicePixelRatio || 1)
      const height = canvas.height / (window.devicePixelRatio || 1)
      
      // Clear with fade for trailing effect
      ctx.fillStyle = theme === 'dark' 
        ? 'rgba(0, 0, 0, 0.03)'
        : 'rgba(255, 255, 255, 0.02)'
      ctx.fillRect(0, 0, width, height)

      particles.forEach(particle => {
        // Update position with wobble
        particle.x += particle.speedX + Math.sin(particle.wobble) * 0.2
        particle.y += particle.speedY + Math.cos(particle.wobble) * 0.2
        particle.wobble += 0.02

        // Wrap around edges
        if (particle.x < -10) particle.x = width + 10
        if (particle.x > width + 10) particle.x = -10
        if (particle.y < -10) particle.y = height + 10
        if (particle.y > height + 10) particle.y = -10

        // Draw particle
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        
        // Draw glow
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.globalAlpha = 1
      animationRef.current = requestAnimationFrame(animateParticles)
    }

    animateParticles()

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

// Liquid Glass Effect Component - Responsive
const LiquidGlass = ({ children, className = "", theme = 'dark', hover = false, size = 'default' }) => {
  const sizeClasses = {
    small: 'p-3 sm:p-4 rounded-lg',
    default: 'p-4 sm:p-5 rounded-xl',
    large: 'p-5 sm:p-6 rounded-2xl'
  }

  return (
    <div className={`
      backdrop-blur-lg sm:backdrop-blur-xl
      transition-all duration-300 ease-out
      ${sizeClasses[size]}
      ${theme === 'dark' 
        ? 'bg-white/5 border border-white/10 sm:border-white/15 shadow-lg shadow-black/10' 
        : 'bg-white/70 sm:bg-white/80 border border-gray-200/60 sm:border-gray-200/70 shadow-lg shadow-gray-200/30'
      }
      ${hover ? 'hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-95' : ''}
      ${className}
    `}>
      {children}
    </div>
  )
}

// Glass Text Component - Responsive
const GlassText = ({ children, className = "", theme = 'dark', type = 'default', size = 'default' }) => {
  const textColors = {
    dark: {
      default: 'text-white',
      muted: 'text-gray-300',
      strong: 'text-gray-100',
      gradient: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'
    },
    light: {
      default: 'text-gray-900',
      muted: 'text-gray-700',
      strong: 'text-gray-800',
      gradient: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'
    }
  }

  const sizeClasses = {
    'xs': 'text-xs sm:text-xs',
    'sm': 'text-sm sm:text-base',
    'md': 'text-base sm:text-lg',
    'lg': 'text-lg sm:text-xl',
    'xl': 'text-xl sm:text-2xl',
    '2xl': 'text-2xl sm:text-3xl',
    '3xl': 'text-3xl sm:text-4xl',
    '4xl': 'text-4xl sm:text-5xl',
    '5xl': 'text-5xl sm:text-6xl',
    '6xl': 'text-6xl sm:text-7xl'
  }

  return (
    <div className={`${textColors[theme][type]} ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  )
}

// Stat Component - Responsive
const StatItem = ({ icon: Icon, value, label, theme }) => (
  <div className="text-center">
    <div className={`inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg mb-2 sm:mb-3 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10' 
        : 'bg-gradient-to-br from-blue-100 to-purple-100'
    }`}>
      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
    </div>
    <div className="text-lg sm:text-xl font-bold text-blue-400 mb-0.5 sm:mb-1">{value}</div>
    <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
      {label}
    </div>
  </div>
)

// Feature Card - Responsive
const FeatureCard = ({ icon: Icon, title, description, link, theme }) => (
  <Link to={link} className="block h-full">
    <LiquidGlass theme={theme} hover size="default" className="h-full">
      <div className={`inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg mb-3 sm:mb-4 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10' 
          : 'bg-gradient-to-br from-blue-100 to-purple-100'
      }`}>
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
      </div>
      <h3 className={`font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h3>
      <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
        {description}
      </p>
    </LiquidGlass>
  </Link>
)

// Main Component
function LandingPage({ theme, setTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

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
      icon: BarChart3,
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
    <div className={`min-h-screen transition-all duration-300 relative overflow-x-hidden hide-scrollbar ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black' 
        : 'bg-gradient-to-b from-gray-50 via-blue-50/30 to-white'
    }`}>

      {/* Background Animations */}
      <GreenParticles theme={theme} />
      <DataTransferAnimation theme={theme} />

      {/* Glass Overlay */}
      <div className={`fixed inset-0 pointer-events-none ${
        theme === 'dark' 
          ? 'bg-gradient-to-b from-transparent via-transparent to-black/10' 
          : 'bg-gradient-to-b from-transparent via-transparent to-white/10'
      }`} />

      {/* Navigation - Responsive */}
      <nav className={`
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-300 ease-out
        ${scrolled ? 'py-2 sm:py-3' : 'py-3 sm:py-4'}
        ${theme === 'dark' 
          ? 'backdrop-blur-lg sm:backdrop-blur-xl bg-black/20 sm:bg-black/30 border-b border-white/10' 
          : 'backdrop-blur-lg sm:backdrop-blur-xl bg-white/30 sm:bg-white/40 border-b border-gray-200/50'
        }
      `}>
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between">
            {/* Logo - Responsive */}
            <Link to="/" className="flex items-center space-x-1.5 sm:space-x-2">
              <div className={`p-1 sm:p-1.5 rounded-md ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-blue-500/15 to-purple-500/15' 
                  : 'bg-gradient-to-br from-blue-100 to-purple-100'
              }`}>
                <Rocket className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Skill Sync
                </span>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Placement Platform
                </div>
              </div>
            </Link>

            {/* Desktop Navigation - Responsive */}
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

            {/* Right Section - Responsive */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={toggleTheme}
                className={`
                  p-1 sm:p-1.5 rounded-md transition-all duration-300 ease-out
                  ${theme === 'dark' 
                    ? 'bg-gray-800/50 hover:bg-gray-700/50 text-yellow-300' 
                    : 'bg-gray-200/50 hover:bg-gray-300/50 text-gray-800'
                  }
                `}
              >
                {theme === 'dark' ? <Sun className="w-3 h-3 sm:w-4 sm:h-4" /> : <Moon className="w-3 h-3 sm:w-4 sm:h-4" />}
              </button>

              <Link to="/login">
                <LiquidGlass theme={theme} size="small" hover className="px-2.5 py-1.5 sm:px-3 sm:py-1.5">
                  <span className={`text-xs font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Login
                  </span>
                </LiquidGlass>
              </Link>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-1 sm:p-1.5 rounded-md hover:bg-white/10 transition-colors"
              >
                {isMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu - Responsive */}
          {isMenuOpen && (
            <div className="md:hidden mt-3">
              <LiquidGlass theme={theme} size="small" className="p-3">
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
              </LiquidGlass>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - Responsive */}
      <section className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 px-3 sm:px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            {/* Badge - Responsive */}
            <div className="inline-flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full mb-4 sm:mb-6 backdrop-blur-sm border border-white/20">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
              <span className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                AI-Powered Platform
              </span>
            </div>

            {/* Main Heading - Responsive */}
            <h1 className="mb-3 sm:mb-4">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-1 sm:mb-2">
                <GlassText theme={theme} type="gradient" size="6xl">
                  Master Your Skills
                </GlassText>
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                <GlassText theme={theme} type="strong" size="5xl">
                  Ace Your Placements
                </GlassText>
              </div>
            </h1>

            {/* Description - Responsive */}
            <p className={`text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Transform your career with comprehensive placement preparation. 
              From aptitude tests to technical interviews.
            </p>

            {/* CTA Buttons - Responsive */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center mb-8 sm:mb-12">
              <Link to="/signup">
                <LiquidGlass theme={theme} hover size="default" className="px-4 py-2.5 sm:px-5 sm:py-3 flex items-center justify-center sm:justify-start space-x-1.5 sm:space-x-2 group min-w-[140px]">
                  <Rocket className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                  <span className={`text-xs sm:text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Start Free Trial
                  </span>
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5 sm:group-hover:translate-x-1" />
                </LiquidGlass>
              </Link>
              <Link to="/aptitude">
                <LiquidGlass theme={theme} hover size="default" className="px-4 py-2.5 sm:px-5 sm:py-3 min-w-[140px]">
                  <span className={`text-xs sm:text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Try Live Demo
                  </span>
                </LiquidGlass>
              </Link>
            </div>

            {/* Stats Grid - Responsive */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-md mx-auto">
              {stats.map((stat, index) => (
                <StatItem key={index} {...stat} theme={theme} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Responsive */}
      <section id="features" className="py-10 sm:py-12 px-3 sm:px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
              <GlassText theme={theme} type="gradient" size="4xl">
                Comprehensive Platform
              </GlassText>
            </h2>
            <p className={`text-sm sm:text-base max-w-xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Everything for successful placement preparation
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} theme={theme} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Skill Sync Section - Responsive */}
      <section id="why" className="py-10 sm:py-12 px-3 sm:px-4">
        <div className="container mx-auto max-w-4xl">
          <LiquidGlass theme={theme} size="default" className="p-4 sm:p-6">
            <div className="text-center mb-4 sm:mb-8">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-4 text-yellow-400" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1.5 sm:mb-3">
                <GlassText theme={theme} type="gradient" size="3xl">
                  Why Choose Skill Sync?
                </GlassText>
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
                  <metric.icon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 sm:mb-3 text-blue-400" />
                  <div className="text-base sm:text-lg font-bold text-blue-400 mb-0.5 sm:mb-1">{metric.value}</div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </LiquidGlass>
        </div>
      </section>

      {/* Reach Section - Responsive */}
      <section id="reach" className="py-10 sm:py-12 px-3 sm:px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-4 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1.5 sm:mb-3">
              <GlassText theme={theme} type="gradient" size="3xl">
                Our Reach & Impact
              </GlassText>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <LiquidGlass theme={theme} size="default" className="p-4 sm:p-6">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className={`p-1.5 sm:p-2 rounded-md ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10' 
                    : 'bg-gradient-to-br from-blue-100 to-purple-100'
                }`}>
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className={`font-semibold mb-1 sm:mb-2 text-sm sm:text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Global Community
                  </h3>
                  <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                    Students from 50+ countries trust Skill Sync for their placement preparation.
                  </p>
                </div>
              </div>
            </LiquidGlass>

            <LiquidGlass theme={theme} size="default" className="p-4 sm:p-6">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className={`p-1.5 sm:p-2 rounded-md ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10' 
                    : 'bg-gradient-to-br from-blue-100 to-purple-100'
                }`}>
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className={`font-semibold mb-1 sm:mb-2 text-sm sm:text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Continuous Growth
                  </h3>
                  <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                    Monthly active users growing by 25% as we expand our learning resources.
                  </p>
                </div>
              </div>
            </LiquidGlass>
          </div>
        </div>
      </section>

      {/* Company Section - Responsive */}
      <section id="company" className="py-10 sm:py-12 px-3 sm:px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-4 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1.5 sm:mb-3">
              <GlassText theme={theme} type="gradient" size="3xl">
                About Our Company
              </GlassText>
            </h2>
          </div>

          <LiquidGlass theme={theme} size="default" className="p-4 sm:p-6">
            <div className="flex items-start space-x-2 sm:space-x-3">
              <div className={`p-1.5 sm:p-2 rounded-md ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10' 
                  : 'bg-gradient-to-br from-blue-100 to-purple-100'
              }`}>
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              </div>
              <div>
                <h3 className={`font-semibold mb-1 sm:mb-2 text-sm sm:text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Our Mission
                </h3>
                <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                  To democratize access to quality placement preparation and help every student achieve their career goals through innovative technology and personalized learning.
                </p>
              </div>
            </div>
          </LiquidGlass>
        </div>
      </section>

      {/* Final CTA - Responsive */}
      <section className="py-10 sm:py-12 px-3 sm:px-4">
        <div className="container mx-auto max-w-3xl">
          <LiquidGlass theme={theme} size="default" className="p-4 sm:p-6 text-center">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1.5 sm:mb-3">
                <GlassText theme={theme} type="strong" size="3xl">
                  Ready to Launch Your Career?
                </GlassText>
              </h2>
              <p className={`text-sm sm:text-base mb-4 sm:mb-6 max-w-md mx-auto ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Join thousands who started their journey with Skill Sync
              </p>
              <Link to="/signup">
                <LiquidGlass theme={theme} hover size="default" className="inline-flex items-center space-x-1.5 sm:space-x-2 px-4 py-2.5 sm:px-5 sm:py-3 group">
                  <span className={`text-xs sm:text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Create Free Account
                  </span>
                  <Rocket className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5 sm:group-hover:translate-x-1" />
                </LiquidGlass>
              </Link>
            </div>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              14-day free trial • No credit card required
            </p>
          </LiquidGlass>
        </div>
      </section>

      {/* Footer - Responsive */}
      <footer id="contact" className={`py-6 sm:py-8 px-3 sm:px-4 border-t ${
        theme === 'dark' ? 'border-white/10' : 'border-gray-200'
      }`}>
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center space-x-1.5 sm:space-x-2 mb-2 sm:mb-3">
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
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
                <Github className={`w-3 h-3 sm:w-4 sm:h-4 cursor-pointer hover:text-blue-400 transition-colors ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <Linkedin className={`w-3 h-3 sm:w-4 sm:h-4 cursor-pointer hover:text-blue-400 transition-colors ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <Mail className={`w-3 h-3 sm:w-4 sm:h-4 cursor-pointer hover:text-blue-400 transition-colors ${
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