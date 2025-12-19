// components/SplashScreen.jsx
import { useEffect, useState } from 'react';

function SplashScreen() {
    const [bubbles, setBubbles] = useState([]);
    const [titleVisible, setTitleVisible] = useState(false);
    const [taglineVisible, setTaglineVisible] = useState(false);
    
    // Generate floating bubbles
    useEffect(() => {
        // Create initial bubbles
        const initialBubbles = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            size: 10 + Math.random() * 30,
            x: Math.random() * 100,
            y: 100 + Math.random() * 50,
            speed: 1 + Math.random() * 2,
            delay: Math.random() * 2,
            opacity: 0.1 + Math.random() * 0.2
        }));
        setBubbles(initialBubbles);
        
        // Animation sequence
        const timer1 = setTimeout(() => setTitleVisible(true), 800);
        const timer2 = setTimeout(() => setTaglineVisible(true), 1500);
        
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
            {/* PCB/Microprocessor Background Animation */}
            <div className="absolute inset-0">
                {/* Grid lines */}
                <div className="absolute inset-0 opacity-10">
                    {Array.from({ length: 16 }).map((_, i) => (
                        <div key={`h-${i}`} className="absolute h-px bg-blue-400 w-full" 
                             style={{ top: `${(i / 15) * 100}%` }} />
                    ))}
                    {Array.from({ length: 16 }).map((_, i) => (
                        <div key={`v-${i}`} className="absolute w-px bg-blue-400 h-full" 
                             style={{ left: `${(i / 15) * 100}%` }} />
                    ))}
                </div>
                
                {/* PCB connection dots */}
                <div className="absolute inset-0">
                    {Array.from({ length: 100 }).map((_, i) => (
                        <div
                            key={`dot-${i}`}
                            className="absolute rounded-full bg-blue-500 transform -translate-x-1/2 -translate-y-1/2"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                width: `${2 + Math.random() * 3}px`,
                                height: `${2 + Math.random() * 3}px`,
                                animation: `pcb-pulse ${3 + Math.random() * 3}s ease-in-out infinite`,
                                animationDelay: `${Math.random() * 2}s`,
                                opacity: 0.4
                            }}
                        />
                    ))}
                </div>
                
                {/* Animated connection lines */}
                <svg className="absolute inset-0 w-full h-full">
                    {Array.from({ length: 30 }).map((_, i) => {
                        const startX = Math.random() * 100;
                        const startY = Math.random() * 100;
                        const endX = Math.random() * 100;
                        const endY = Math.random() * 100;
                        
                        return (
                            <line
                                key={`line-${i}`}
                                x1={`${startX}%`}
                                y1={`${startY}%`}
                                x2={`${endX}%`}
                                y2={`${endY}%`}
                                stroke="rgba(96, 165, 250, 0.2)"
                                strokeWidth="1"
                                strokeLinecap="round"
                                strokeDasharray="5,5"
                                style={{
                                    animation: `line-flow ${3 + Math.random() * 2}s linear infinite`,
                                    animationDelay: `${Math.random() * 2}s`
                                }}
                            />
                        );
                    })}
                </svg>
                
                {/* Floating binary numbers */}
                <div className="absolute inset-0 overflow-hidden">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div
                            key={`binary-${i}`}
                            className="absolute text-xs font-mono text-blue-300 opacity-10"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animation: `binary-float ${10 + Math.random() * 10}s linear infinite`,
                                animationDelay: `${Math.random() * 5}s`,
                                transform: `rotate(${Math.random() * 360}deg)`
                            }}
                        >
                            {Math.random() > 0.5 ? '1' : '0'}
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Floating Bubbles Animation */}
            <div className="absolute inset-0 overflow-hidden">
                {bubbles.map(bubble => (
                    <div
                        key={bubble.id}
                        className="absolute rounded-full border border-blue-400/30"
                        style={{
                            left: `${bubble.x}%`,
                            top: `${bubble.y}%`,
                            width: `${bubble.size}px`,
                            height: `${bubble.size}px`,
                            opacity: bubble.opacity,
                            animation: `bubble-rise ${bubble.speed * 10}s linear infinite`,
                            animationDelay: `${bubble.delay}s`,
                            background: `radial-gradient(circle at 30% 30%, rgba(96, 165, 250, 0.3), transparent)`
                        }}
                    />
                ))}
            </div>
            
            {/* Main Content */}
            <div className="relative z-10 text-center px-4">
                {/* Title with gradient and animation */}
                <h1 className={`
                    text-7xl md:text-8xl font-bold mb-6
                    bg-gradient-to-r from-blue-300 via-white to-purple-300 
                    bg-clip-text text-transparent
                    transition-all duration-1000 ease-out
                    ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}>
                    Skill Sync
                </h1>
                
                {/* Tagline */}
                <p className={`
                    text-xl md:text-2xl font-light text-blue-200 mb-12
                    transition-all duration-1000 delay-300 ease-out
                    ${taglineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}>
                    Placement Preparation Platform
                </p>
                
                {/* Bubble Loading Animation */}
                <div className="relative">
                    {/* Central loading circle */}
                    <div className="relative w-20 h-20 mx-auto mb-8">
                        {/* Outer ring */}
                        <div className="absolute inset-0 rounded-full border-4 border-blue-500/30">
                            <div className="absolute inset-0 rounded-full border-2 border-blue-400/50"
                                 style={{ animation: 'ring-spin 2s linear infinite' }} />
                        </div>
                        
                        {/* Inner rotating dots */}
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div
                                key={`dot-${i}`}
                                className="absolute w-3 h-3 bg-blue-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                                style={{
                                    left: '50%',
                                    top: '50%',
                                    transform: `rotate(${i * 45}deg) translateX(40px) rotate(-${i * 45}deg)`,
                                    animation: 'dot-pulse 1.5s ease-in-out infinite',
                                    animationDelay: `${i * 0.2}s`,
                                    boxShadow: '0 0 8px rgba(96, 165, 250, 0.8)'
                                }}
                            />
                        ))}
                        
                        {/* Center dot */}
                        <div className="absolute inset-0 m-auto w-4 h-4 bg-blue-400 rounded-full animate-pulse" />
                    </div>
                    
                    {/* Loading text */}
                    <p className="text-sm font-mono tracking-wider text-blue-300/70 animate-pulse">
                        Preparing your journey...
                    </p>
                </div>
            </div>
            
            {/* CSS Animations */}
            <style jsx>{`
                @keyframes pcb-pulse {
                    0%, 100% { 
                        opacity: 0.3;
                        box-shadow: 0 0 5px rgba(96, 165, 250, 0.3);
                    }
                    50% { 
                        opacity: 0.7;
                        box-shadow: 0 0 15px rgba(96, 165, 250, 0.8);
                    }
                }
                
                @keyframes line-flow {
                    0% { 
                        stroke-dashoffset: 0;
                        opacity: 0.1;
                    }
                    50% { 
                        opacity: 0.4;
                    }
                    100% { 
                        stroke-dashoffset: 20;
                        opacity: 0.1;
                    }
                }
                
                @keyframes binary-float {
                    0% { 
                        transform: translateY(100vh) rotate(0deg); 
                        opacity: 0;
                    }
                    10% { opacity: 0.1; }
                    90% { opacity: 0.1; }
                    100% { 
                        transform: translateY(-100vh) rotate(360deg); 
                        opacity: 0;
                    }
                }
                
                @keyframes bubble-rise {
                    0% { 
                        transform: translateY(0) translateX(0) scale(1);
                        opacity: 0;
                    }
                    10% { 
                        opacity: 0.6;
                    }
                    90% { 
                        opacity: 0.6;
                    }
                    100% { 
                        transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px) scale(1.2);
                        opacity: 0;
                    }
                }
                
                @keyframes ring-spin {
                    0% { 
                        transform: rotate(0deg);
                        border-color: rgba(96, 165, 250, 0.5);
                    }
                    50% { 
                        border-color: rgba(147, 197, 253, 0.8);
                    }
                    100% { 
                        transform: rotate(360deg);
                        border-color: rgba(96, 165, 250, 0.5);
                    }
                }
                
                @keyframes dot-pulse {
                    0%, 100% { 
                        transform: rotate(var(--rotation)) translateX(40px) rotate(calc(-1 * var(--rotation))) scale(1);
                        opacity: 0.7;
                        background-color: rgba(96, 165, 250, 0.8);
                    }
                    50% { 
                        transform: rotate(var(--rotation)) translateX(40px) rotate(calc(-1 * var(--rotation))) scale(1.5);
                        opacity: 1;
                        background-color: rgba(147, 197, 253, 1);
                    }
                }
            `}</style>
        </div>
    );
}

export default SplashScreen;