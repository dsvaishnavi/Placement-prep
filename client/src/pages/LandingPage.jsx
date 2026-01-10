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
  Moon,
  BookOpen,
  Code,
  Briefcase,
  CheckCircle,
  DollarSign,
  Calendar,
  Video,
  FileText,
  Search,
  TrendingUp as TrendingUpIcon,
  UserCheck,
  Laptop,
  Smartphone,
  Server,
  Database,
  Cloud,
  Lock,
  Headphones,
  HelpCircle,
  BarChart,
  Target as TargetIcon,
  Clock as ClockIcon,
  Award as AwardIcon
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Snowfall from 'react-snowfall'

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
    const particleCount = 50

    let width = 0, height = 0
    let devicePixelRatio = 1

    const getCircuitPoints = () => {
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

      canvas.width = width
      canvas.height = height

      circuitPoints = getCircuitPoints()
      initParticles()
    }

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

      ctx.fillStyle = theme === 'dark'
        ? 'rgba(0, 0, 0, 0.02)'
        : 'rgba(255, 255, 255, 0.01)'
      ctx.fillRect(0, 0, width, height)

      particles.forEach(particle => {
        particle.progress += particle.speed
        if (particle.progress > 1) {
          particle.progress = 0
          particle.currentPath = (particle.currentPath + 1) % (circuitPoints.length - 1)
          particle.trail = []
        }

        const startPoint = circuitPoints[particle.currentPath]
        const endPoint = circuitPoints[particle.currentPath + 1] || circuitPoints[0]

        const t = particle.progress
        const baseX = startPoint.x + (endPoint.x - startPoint.x) * t
        const baseY = startPoint.y + (endPoint.y - startPoint.y) * t

        const maxOffset = Math.min(width, height) * 0.02
        const circuitOffset = Math.sin(particle.progress * Math.PI * 2) * maxOffset
        const finalX = baseX + Math.cos(particle.pulsePhase) * circuitOffset
        const finalY = baseY + Math.sin(particle.pulsePhase) * circuitOffset

        particle.pulsePhase += particle.pulseSpeed
        particle.glow = Math.sin(particle.pulsePhase) * 0.5 + 0.5

        particle.trail.push({ x: finalX, y: finalY })
        if (particle.trail.length > particle.trailLength) {
          particle.trail.shift()
        }

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

        const opacity = particle.baseOpacity * (0.8 + 0.2 * particle.glow)
        const size = particle.size * (0.8 + 0.4 * particle.glow)

        ctx.fillStyle = theme === 'dark'
          ? `rgba(34, 197, 94, ${opacity * 0.5})`
          : `rgba(21, 128, 61, ${opacity * 0.3})`

        ctx.beginPath()
        ctx.arc(finalX, finalY, size * 2.5, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = theme === 'dark'
          ? `rgba(34, 197, 94, ${0.9 * particle.glow})`
          : `rgba(21, 128, 61, ${0.8 * particle.glow})`

        ctx.beginPath()
        ctx.arc(finalX, finalY, size, 0, Math.PI * 2)
        ctx.fill()

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

// Fixed Short Circuit Spark Animation
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
          ? `rgba(251, 191, 36, ${0.9})`
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

      ctx.fillStyle = theme === 'dark'
        ? 'rgba(0, 0, 0, 0.03)'
        : 'rgba(255, 255, 255, 0.01)'
      ctx.fillRect(0, 0, width, height)

      sparkTimer++
      if (sparkTimer - lastSparkTime > 90 + Math.random() * 120) {
        createSparkBurst()
        lastSparkTime = sparkTimer
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const spark = sparks[i]

        spark.x += spark.vx
        spark.y += spark.vy
        spark.life--

        const opacity = spark.life / spark.maxLife

        ctx.fillStyle = spark.color.replace(')', `, ${opacity})`).replace('rgb', 'rgba')
        ctx.beginPath()
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2)
        ctx.fill()

        ctx.strokeStyle = theme === 'dark'
          ? `rgba(251, 191, 36, ${opacity * 0.6})`
          : `rgba(245, 158, 11, ${opacity * 0.4})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(spark.x - spark.vx * 2, spark.y - spark.vy * 2)
        ctx.lineTo(spark.x, spark.y)
        ctx.stroke()

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

  const getThemeLabel = () => {
    if (theme === 'system') return 'System'
    return theme === 'dark' ? 'Dark' : 'Light'
  }

  const getThemeIcon = () => {
    if (theme === 'system') return <MonitorSmartphone className="w-4 h-4 sm:w-5 sm:h-5" />
    return theme === 'dark' ? <Moon className="w-4 h-4 sm:w-5 sm:h-5" /> : <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        className={`
          flex items-center justify-center space-x-1 sm:space-x-2
          min-h-[2.75rem] sm:min-h-[2.5rem] px-2 sm:px-3 py-2 sm:py-1.5
          rounded-lg transition-all duration-300 ease-out
          touch-manipulation select-none
          ${theme === 'dark'
            ? 'bg-gray-800/50 hover:bg-gray-700/50 active:bg-gray-600/50 text-white border border-white/10'
            : 'bg-gray-200/50 hover:bg-gray-300/50 active:bg-gray-400/50 text-gray-800 border border-gray-300/50'
          }
        `}
        aria-label={`Current theme: ${getThemeLabel()}. Click to change theme.`}
      >
        {getThemeIcon()}
        <span className="text-xs sm:text-sm font-medium hidden sm:inline">
          {getThemeLabel()}
        </span>
      </button>

      {showOptions && (
        <div className={`absolute top-full left-0 mt-2 w-36 sm:w-40 rounded-lg shadow-xl backdrop-blur-xl border z-50 ${theme === 'dark'
          ? 'bg-gray-800/95 border-white/20'
          : 'bg-white/95 border-gray-200'
          }`}>
          <button
            onClick={() => handleThemeChange('light')}
            className={`flex items-center justify-between w-full px-3 py-3 sm:py-2.5 text-sm sm:text-base transition-colors touch-manipulation ${theme === 'light'
              ? 'bg-blue-500/20 text-blue-400'
              : theme === 'dark' ? 'hover:bg-gray-700/50 active:bg-gray-600/50 text-gray-200' : 'hover:bg-gray-100/50 active:bg-gray-200/50 text-gray-700'
              }`}
          >
            <div className="flex items-center space-x-2">
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="font-medium">Light</span>
            </div>
            {theme === 'light' && <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />}
          </button>

          <button
            onClick={() => handleThemeChange('dark')}
            className={`flex items-center justify-between w-full px-3 py-3 sm:py-2.5 text-sm sm:text-base transition-colors touch-manipulation ${theme === 'dark'
              ? 'bg-blue-500/20 text-blue-400'
              : theme === 'dark' ? 'hover:bg-gray-700/50 active:bg-gray-600/50 text-gray-200' : 'hover:bg-gray-100/50 active:bg-gray-200/50 text-gray-700'
              }`}
          >
            <div className="flex items-center space-x-2">
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="font-medium">Dark</span>
            </div>
            {theme === 'dark' && <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />}
          </button>

          <button
            onClick={() => handleThemeChange('system')}
            className={`flex items-center justify-between w-full px-3 py-3 sm:py-2.5 text-sm sm:text-base transition-colors touch-manipulation ${theme === 'system'
              ? 'bg-blue-500/20 text-blue-400'
              : theme === 'dark' ? 'hover:bg-gray-700/50 active:bg-gray-600/50 text-gray-200' : 'hover:bg-gray-100/50 active:bg-gray-200/50 text-gray-700'
              }`}
          >
            <div className="flex items-center space-x-2">
              <MonitorSmartphone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="font-medium">System</span>
            </div>
            {theme === 'system' && <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />}
          </button>
        </div>
      )}
    </div>
  )
}

// Main Component
function LandingPage({ theme, setTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
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
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'Courses', href: '#courses' },
    { label: 'Practice', href: '#practice' },
    { label: 'Interview Prep', href: '#interview' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
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
      icon: Activity,
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
      link: "/interview"
    },
    {
      icon: Brain,
      title: "Smart Analytics",
      description: "Identify strengths and areas for improvement.",
      link: "/progress"
    },
    {
      icon: Code,
      title: "Coding Challenges",
      description: "500+ coding problems with detailed solutions.",
      link: "/coding"
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Learn from industry experts with video courses.",
      link: "/tutorials"
    },
    {
      icon: BookOpen,
      title: "Study Material",
      description: "Comprehensive notes and reference materials.",
      link: "/study"
    }
  ]

  const courses = [
    {
      title: "Data Structures & Algorithms",
      level: "Beginner to Advanced",
      duration: "8 weeks",
      students: "10K+",
      icon: Database,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "System Design",
      level: "Intermediate",
      duration: "6 weeks",
      students: "5K+",
      icon: Server,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Frontend Development",
      level: "Beginner",
      duration: "4 weeks",
      students: "15K+",
      icon: Laptop,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Backend Development",
      level: "Intermediate",
      duration: "6 weeks",
      students: "8K+",
      icon: Cloud,
      color: "from-orange-500 to-red-500"
    }
  ]

  const stats = [
    { icon: Users, value: "50K+", label: "Active Students" },
    { icon: Award, value: "95%", label: "Placement Rate" },
    { icon: Target, value: "1000+", label: "Company Partners" },
    { icon: Star, value: "4.9", label: "Rating" },
    { icon: Briefcase, value: "85%", label: "Job Offers" },
    { icon: CheckCircle, value: "10K+", label: "Problems Solved" }
  ]

  const successMetrics = [
    { value: "2.5x", label: "Faster Skill Acquisition", icon: TrendingUp },
    { value: "40%", label: "Higher Interview Success", icon: Target },
    { value: "85%", label: "Satisfaction Rate", icon: Star },
    { value: "24/7", label: "Learning Support", icon: Clock }
  ]

  const interviewPrep = [
    {
      title: "Technical Interviews",
      description: "Practice coding questions from FAANG companies",
      icon: Terminal
    },
    {
      title: "Behavioral Questions",
      description: "Master STAR method and situational questions",
      icon: MessageSquare
    },
    {
      title: "Resume Review",
      description: "Get expert feedback on your resume",
      icon: FileText
    },
    {
      title: "Mock Interviews",
      description: "Live mock interviews with industry professionals",
      icon: Video
    }
  ]

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "Basic Coding Problems",
        "Limited Aptitude Tests",
        "Community Support",
        "Basic Progress Tracking"
      ],
      highlighted: false
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      features: [
        "All Coding Problems",
        "Unlimited Aptitude Tests",
        "Mock Interviews",
        "Resume Builder",
        "Priority Support",
        "Advanced Analytics"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      features: [
        "Everything in Pro",
        "Custom Learning Paths",
        "Team Management",
        "API Access",
        "Dedicated Support",
        "White-labeling"
      ],
      highlighted: false
    }
  ]

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Software Engineer @ Google",
      content: "Skill Sync helped me crack 5 FAANG interviews. The mock interviews were incredibly realistic!",
      avatar: "AJ"
    },
    {
      name: "Sarah Chen",
      role: "Product Manager @ Microsoft",
      content: "The aptitude training was exactly what I needed. Landed my dream job in 3 months!",
      avatar: "SC"
    },
    {
      name: "David Park",
      role: "Data Scientist @ Amazon",
      content: "The coding challenges are top-notch. They match real interview difficulty perfectly.",
      avatar: "DP"
    }
  ]

  return (
    <div className={`min-h-screen transition-all duration-300 relative hide-scrollbar ${theme === 'dark'
      ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black'
      : 'bg-gradient-to-b from-gray-50 via-blue-50/30 to-white'
      }`}>
      <Snowfall 
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 1
        }}
        snowflakeCount={100}
        color={theme === 'dark' ? '#ffffff' : '#cbd5e1'}
        speed={[0.5, 1.5]}
        wind={[-0.5, 0.5]}
        radius={[0.5, 3]}
      />

      <CircuitGreenParticles theme={theme} />
      <ShortCircuitSparks theme={theme} />

      <div className={`fixed inset-0 pointer-events-none ${theme === 'dark'
        ? 'bg-gradient-to-b from-transparent via-transparent to-black/10'
        : 'bg-gradient-to-b from-transparent via-transparent to-white/10'
        }`} />

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
            <Link to="/" className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 flex-shrink-0">
              <div className={`p-1 sm:p-1.5 rounded-md ${theme === 'dark'
                ? 'bg-gradient-to-br from-blue-500/15 to-green-500/15'
                : 'bg-gradient-to-br from-blue-100 to-green-100'
                }`}>
                <Rocket className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
              </div>
              <div>
                <span className="text-sm sm:text-base md:text-lg font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                  Skill Sync
                </span>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Placement Platform
                </div>
              </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-2 xl:space-x-6 absolute left-1/2 transform -translate-x-1/2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-xs lg:text-sm font-medium transition-colors hover:text-blue-400 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0">
              <ThemeToggle theme={theme} setTheme={setTheme} />

              <Link to="/login">
                <div className={`
                  min-h-[2.75rem] sm:min-h-[2.5rem] px-3 sm:px-4 py-2 sm:py-1.5 rounded-lg backdrop-blur-lg border
                  flex items-center justify-center transition-all duration-300 ease-out
                  touch-manipulation select-none
                  ${theme === 'dark'
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 active:bg-white/15'
                    : 'bg-white/70 border-gray-200/60 hover:bg-white/80 active:bg-white/90'
                  }
                `}>
                  <span className={`text-sm sm:text-base font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Login
                  </span>
                </div>
              </Link>

              <Link to="/signup">
                <div className={`
                  min-h-[2.75rem] sm:min-h-[2.5rem] px-3 sm:px-4 py-2 sm:py-1.5 rounded-lg backdrop-blur-lg border
                  flex items-center justify-center transition-all duration-300 ease-out
                  touch-manipulation select-none hidden sm:flex
                  bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600
                `}>
                  <span className="text-sm sm:text-base font-medium text-white">
                    Get Started
                  </span>
                </div>
              </Link>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-1 sm:p-1.5 rounded-md hover:bg-white/10 transition-colors"
              >
                {isMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden mt-3">
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
                      className={`py-1.5 px-3 rounded transition-colors hover:bg-white/10 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                  <Link
                    to="/login"
                    className={`py-1.5 px-3 rounded transition-colors hover:bg-white/10 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className={`py-1.5 px-3 rounded transition-colors bg-gradient-to-r from-blue-500 to-green-500 text-white text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 px-3 sm:px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full mb-4 sm:mb-6 backdrop-blur-sm border border-white/20">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 animate-pulse" />
              <span className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                AI-Powered Placement Platform
              </span>
            </div>

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

            <p className={`text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
              Transform your career with comprehensive placement preparation.
              From aptitude tests to technical interviews, we provide everything you need to land your dream job.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center mb-8 sm:mb-12">
              <Link to="/signup">
                <div className={`
                  px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl backdrop-blur-lg border
                  flex items-center justify-center sm:justify-start space-x-1.5 sm:space-x-2 group min-w-[140px]
                  transition-all duration-300 ease-out
                  bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600
                  hover:scale-[1.02] active:scale-95
                `}>
                  <Rocket className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  <span className="text-xs sm:text-sm font-medium text-white">
                    Start Free Trial
                  </span>
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-white transition-transform group-hover:translate-x-0.5 sm:group-hover:translate-x-1" />
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

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg mb-2 sm:mb-3 ${theme === 'dark'
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
            <p className={`text-sm sm:text-base max-w-xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
              Everything you need for successful placement preparation
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
                  <div className={`inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg mb-3 sm:mb-4 ${theme === 'dark'
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

      {/* Courses Section */}
      <section id="courses" className="py-10 sm:py-12 px-3 sm:px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-400 to-purple-400">
                Popular Courses
              </span>
            </h2>
            <p className={`text-sm sm:text-base max-w-xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
              Structured learning paths for your career goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {courses.map((course, index) => (
              <div key={index} className={`
                p-4 sm:p-5 rounded-xl backdrop-blur-lg border
                transition-all duration-300 ease-out
                ${theme === 'dark'
                  ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  : 'bg-white/70 border-gray-200/60 hover:bg-white/80 hover:border-gray-200'
                }
                hover:scale-[1.02] active:scale-95
              `}>
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3 sm:mb-4 bg-gradient-to-br ${course.color}`}>
                  <course.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className={`font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {course.title}
                </h3>
                <div className="space-y-1 mb-3">
                  <div className="flex items-center text-xs text-gray-400">
                    <BookOpen className="w-3 h-3 mr-1" />
                    {course.level}
                  </div>
                  <div className="flex items-center text-xs text-gray-400">
                    <ClockIcon className="w-3 h-3 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center text-xs text-gray-400">
                    <Users className="w-3 h-3 mr-1" />
                    {course.students} students
                  </div>
                </div>
                <button className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${theme === 'dark'
                  ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400'
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-600'
                  }`}>
                  Enroll Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Section */}
      <section id="practice" className="py-10 sm:py-12 px-3 sm:px-4">
        <div className="container mx-auto max-w-6xl">
          <div className={`
            p-4 sm:p-6 rounded-xl backdrop-blur-lg border
            ${theme === 'dark'
              ? 'bg-white/5 border-white/10'
              : 'bg-white/70 border-gray-200/60'
            }
          `}>
            <div className="text-center mb-4 sm:mb-8">
              <Code className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-4 text-green-400" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1.5 sm:mb-3">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-400 to-purple-400">
                  Practice Coding
                </span>
              </h2>
              <p className={`text-sm sm:text-base max-w-lg mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                5000+ coding problems with company tags and difficulty levels
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-6">
              <div className="text-center p-3 sm:p-4">
                <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">Easy</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>1500+ Problems</div>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>For beginners</div>
              </div>
              <div className="text-center p-3 sm:p-4">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-2">Medium</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>2500+ Problems</div>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>For intermediates</div>
              </div>
              <div className="text-center p-3 sm:p-4">
                <div className="text-2xl sm:text-3xl font-bold text-red-400 mb-2">Hard</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>1000+ Problems</div>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>For experts</div>
              </div>
            </div>

            <div className="text-center">
              <Link to="/practice">
                <button className={`
                  px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl backdrop-blur-lg border
                  flex items-center justify-center space-x-1.5 sm:space-x-2 group mx-auto
                  transition-all duration-300 ease-out
                  bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600
                  hover:scale-[1.02] active:scale-95
                `}>
                  <Code className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  <span className="text-xs sm:text-sm font-medium text-white">
                    Start Practicing
                  </span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-white transition-transform group-hover:translate-x-0.5 sm:group-hover:translate-x-1" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interview Prep Section */}
      <section id="interview" className="py-10 sm:py-12 px-3 sm:px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-400 to-purple-400">
                Interview Preparation
              </span>
            </h2>
            <p className={`text-sm sm:text-base max-w-xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
              Get ready for technical and behavioral interviews
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {interviewPrep.map((item, index) => (
              <div key={index} className={`
                p-4 sm:p-5 rounded-xl backdrop-blur-lg border
                transition-all duration-300 ease-out
                ${theme === 'dark'
                  ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  : 'bg-white/70 border-gray-200/60 hover:bg-white/80 hover:border-gray-200'
                }
                hover:scale-[1.02] active:scale-95
              `}>
                <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mb-3" />
                <h3 className={`font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </h3>
                <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-10 sm:py-12 px-3 sm:px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-400 to-purple-400">
                Choose Your Plan
              </span>
            </h2>
            <p className={`text-sm sm:text-base max-w-xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
              Start for free, upgrade when you're ready
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`
                p-4 sm:p-5 rounded-xl backdrop-blur-lg border
                transition-all duration-300 ease-out
                ${plan.highlighted
                  ? 'border-blue-400 shadow-lg shadow-blue-500/20'
                  : theme === 'dark'
                    ? 'bg-white/5 border-white/10'
                    : 'bg-white/70 border-gray-200/60'
                }
                hover:scale-[1.02] active:scale-95
              `}>
                {plan.highlighted && (
                  <div className="inline-flex items-center px-2 py-1 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white text-xs mb-3">
                    Most Popular
                  </div>
                )}
                <h3 className={`text-lg sm:text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-2xl sm:text-3xl font-bold text-blue-400">{plan.price}</span>
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-xs sm:text-sm">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 mr-2" />
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`
                  w-full py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${plan.highlighted
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white'
                    : theme === 'dark'
                      ? 'bg-white/10 hover:bg-white/20 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }
                `}>
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-10 sm:py-12 px-3 sm:px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-400 to-purple-400">
                Success Stories
              </span>
            </h2>
            <p className={`text-sm sm:text-base max-w-xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
              See what our students have achieved
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`
                p-4 sm:p-5 rounded-xl backdrop-blur-lg border
                transition-all duration-300 ease-out
                ${theme === 'dark'
                  ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  : 'bg-white/70 border-gray-200/60 hover:bg-white/80 hover:border-gray-200'
                }
                hover:scale-[1.02] active:scale-95
              `}>
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-3">
                    <div className={`font-semibold text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {testimonial.name}
                    </div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Skill Sync Section */}
      <section id="about" className="py-10 sm:py-12 px-3 sm:px-4">
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
              <p className={`text-sm sm:text-base max-w-lg mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
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

      {/* CTA Section */}
      <section className="py-10 sm:py-12 px-3 sm:px-4">
        <div className="container mx-auto max-w-4xl">
          <div className={`
            p-6 sm:p-8 rounded-xl backdrop-blur-lg border text-center
            bg-gradient-to-r from-blue-500/10 via-green-500/10 to-purple-500/10
            ${theme === 'dark' ? 'border-white/10' : 'border-gray-200/60'}
          `}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-white">
              Ready to Transform Your Career?
            </h2>
            <p className={`text-sm sm:text-base mb-6 max-w-xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-200'
              }`}>
              Join thousands of students who have successfully landed their dream jobs
            </p>
            <Link to="/signup">
              <button className={`
                px-6 py-3 sm:px-8 sm:py-4 rounded-xl
                flex items-center justify-center space-x-2 group mx-auto
                transition-all duration-300 ease-out
                bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600
                hover:scale-[1.02] active:scale-95
              `}>
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <span className="text-sm sm:text-base font-medium text-white">
                  Start Your Free Trial
                </span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className={`py-6 sm:py-8 px-3 sm:px-4 border-t ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'
        }`}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center space-x-1.5 sm:space-x-2 mb-2 sm:mb-3">
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                <span className="text-base sm:text-lg font-bold text-white">Skill Sync</span>
              </div>
              <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Empowering careers through comprehensive placement preparation.
                Join our community of learners and achievers.
              </p>
            </div>

            <div>
              <h4 className={`font-medium mb-1 sm:mb-2 text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                Platform
              </h4>
              <div className="space-y-0.5 sm:space-y-1">
                <a href="#features" className={`text-xs sm:text-sm block hover:text-green-400 transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Features
                </a>
                <a href="#courses" className={`text-xs sm:text-sm block hover:text-green-400 transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Courses
                </a>
                <a href="#practice" className={`text-xs sm:text-sm block hover:text-green-400 transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Practice
                </a>
                <a href="#pricing" className={`text-xs sm:text-sm block hover:text-green-400 transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Pricing
                </a>
              </div>
            </div>

            <div>
              <h4 className={`font-medium mb-1 sm:mb-2 text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                Company
              </h4>
              <div className="space-y-0.5 sm:space-y-1">
                <a href="#about" className={`text-xs sm:text-sm block hover:text-green-400 transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  About Us
                </a>
                <a href="#contact" className={`text-xs sm:text-sm block hover:text-green-400 transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Careers
                </a>
                <a href="#contact" className={`text-xs sm:text-sm block hover:text-green-400 transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Contact
                </a>
                <a href="#contact" className={`text-xs sm:text-sm block hover:text-green-400 transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Blog
                </a>
              </div>
            </div>

            <div>
              <h4 className={`font-medium mb-1 sm:mb-2 text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                Connect
              </h4>
              <div className="flex space-x-1.5 sm:space-x-2 mb-2">
                <a href="#" className={`p-1.5 rounded-lg hover:bg-white/10 transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
                <a href="#" className={`p-1.5 rounded-lg hover:bg-white/10 transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Linkedin className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
                <a href="#" className={`p-1.5 rounded-lg hover:bg-white/10 transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <div className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  support@skillsync.com
                </div>
                <div className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  +1 (555) 123-4567
                </div>
              </div>
            </div>
          </div>

          <div className={`border-t pt-3 sm:pt-4 text-center ${theme === 'dark'
            ? 'border-white/10 text-gray-400'
            : 'border-gray-200 text-gray-500'
            }`}>
            <p className="text-xs">© 2024 Skill Sync. All rights reserved. | 
              <a href="#" className="hover:text-green-400 transition-colors ml-1">Privacy Policy</a> | 
              <a href="#" className="hover:text-green-400 transition-colors ml-1">Terms of Service</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage