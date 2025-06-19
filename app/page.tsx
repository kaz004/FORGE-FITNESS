"use client"

import React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion"
import {
  ChevronDown,
  Play,
  Star,
  ArrowRight,
  Dumbbell,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Activity,
  Zap,
  Menu,
  X,
  Sun,
  Moon,
  Home,
  Info,
  CreditCard,
  MessageSquare,
  Target,
  Award,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Theme Context
const ThemeContext = React.createContext<{
  theme: "light" | "dark"
  toggleTheme: () => void
}>({
  theme: "dark",
  toggleTheme: () => {},
})

// Interactive 3D Dumbbell Model Component (Fixed)
const Interactive3DModel = ({ theme }: { theme: "light" | "dark" }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const modelRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!modelRef.current) return
    const rect = modelRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const rotateX = (e.clientY - centerY) / 10
    const rotateY = (e.clientX - centerX) / 10
    setRotation({ x: rotateX, y: rotateY })
  }

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-8 sm:left-8 z-30">
      <motion.div
        ref={modelRef}
        className={`relative w-16 h-16 sm:w-20 sm:h-20 cursor-pointer ${
          theme === "dark"
            ? "bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-md border border-purple-500/30"
            : "bg-gradient-to-br from-purple-100 to-blue-100 backdrop-blur-md border border-purple-300 shadow-lg"
        } rounded-2xl flex items-center justify-center`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          setRotation({ x: 0, y: 0 })
        }}
        whileHover={{ scale: 1.1 }}
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        {/* 3D Dumbbell Model */}
        <div className="relative">
          {/* Left weight */}
          <motion.div
            className={`absolute -left-3 top-1/2 transform -translate-y-1/2 w-5 h-7 sm:w-6 sm:h-8 rounded-full ${
              theme === "dark"
                ? "bg-gradient-to-b from-gray-600 to-gray-800"
                : "bg-gradient-to-b from-gray-400 to-gray-600"
            } shadow-lg`}
            animate={isHovered ? { rotateZ: [0, 360] } : {}}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />

          {/* Handle */}
          <motion.div
            className={`w-6 h-2 sm:w-8 sm:h-2 rounded-full ${
              theme === "dark"
                ? "bg-gradient-to-r from-gray-500 to-gray-700"
                : "bg-gradient-to-r from-gray-300 to-gray-500"
            } shadow-md`}
            animate={isHovered ? { scaleX: [1, 1.2, 1] } : {}}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          />

          {/* Right weight */}
          <motion.div
            className={`absolute -right-3 top-1/2 transform -translate-y-1/2 w-5 h-7 sm:w-6 sm:h-8 rounded-full ${
              theme === "dark"
                ? "bg-gradient-to-b from-gray-600 to-gray-800"
                : "bg-gradient-to-b from-gray-400 to-gray-600"
            } shadow-lg`}
            animate={isHovered ? { rotateZ: [0, -360] } : {}}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>

        {/* Floating particles */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-1 h-1 sm:w-2 sm:h-2 rounded-full ${
                    theme === "dark" ? "bg-purple-400" : "bg-purple-600"
                  }`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    y: [-20, -60],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Model label */}
        <motion.div
          className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-bold whitespace-nowrap ${
            theme === "dark" ? "bg-purple-500 text-white" : "bg-purple-600 text-white"
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
        >
          3D Model
        </motion.div>
      </motion.div>
    </div>
  )
}

// Super Interactive Dumbbell Component (Enhanced)
const InteractiveDumbbell = ({ theme }: { theme: "light" | "dark" }) => {
  const [isLifted, setIsLifted] = useState(false)
  const [clicks, setClicks] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isSpinning, setIsSpinning] = useState(false)
  const [powerLevel, setPowerLevel] = useState(0)
  const [combo, setCombo] = useState(0)
  const [lastClickTime, setLastClickTime] = useState(0)

  const dumbbellRef = useRef<HTMLDivElement>(null)

  // Handle click interactions
  const handleClick = () => {
    const now = Date.now()
    const timeDiff = now - lastClickTime

    setIsLifted(true)
    setClicks((prev) => prev + 1)
    setPowerLevel((prev) => Math.min(prev + 10, 100))

    // Combo system for rapid clicks
    if (timeDiff < 1000) {
      setCombo((prev) => prev + 1)
    } else {
      setCombo(1)
    }

    setLastClickTime(now)

    // Special effects for high combos
    if (combo > 5) {
      setIsSpinning(true)
      setTimeout(() => setIsSpinning(false), 1000)
    }

    setTimeout(() => setIsLifted(false), 500)
  }

  // Handle mouse movement for rotation
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dumbbellRef.current) return

    const rect = dumbbellRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    const angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI)
    setRotation(angle)

    // Dynamic scaling based on distance from center
    const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY)
    const newScale = 1 + Math.min(distance / 200, 0.3)
    setScale(newScale)
  }

  // Handle drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const handleMouseMoveGlobal = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    // Snap back to original position with animation
    setTimeout(() => {
      setPosition({ x: 0, y: 0 })
    }, 100)
  }

  // Double click for special effect
  const handleDoubleClick = () => {
    setIsSpinning(true)
    setPowerLevel(100)
    setCombo((prev) => prev + 5)
    setTimeout(() => setIsSpinning(false), 2000)
  }

  // Power level decay
  useEffect(() => {
    const interval = setInterval(() => {
      setPowerLevel((prev) => Math.max(prev - 1, 0))
    }, 100)
    return () => clearInterval(interval)
  }, [])

  // Global mouse events for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMoveGlobal)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMoveGlobal)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, dragStart])

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-30">
      <motion.div
        ref={dumbbellRef}
        className={`relative p-3 sm:p-4 rounded-full cursor-pointer select-none ${
          theme === "dark"
            ? "bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-md border border-red-500/30"
            : "bg-gradient-to-r from-red-100 to-orange-100 backdrop-blur-md border border-red-300 shadow-lg"
        } ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          setRotation(0)
          setScale(1)
        }}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: isLifted ? -20 : 0,
          rotate: isSpinning ? [0, 360, 720, 1080] : rotation,
          scale: scale,
          boxShadow: powerLevel > 50 ? "0 0 30px rgba(239, 68, 68, 0.8)" : "0 0 10px rgba(239, 68, 68, 0.3)",
        }}
        transition={{
          duration: isSpinning ? 2 : 0.3,
          type: "spring",
          stiffness: isSpinning ? 100 : 300,
        }}
      >
        {/* Power Level Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent"
          style={{
            background: `conic-gradient(from 0deg, ${theme === "dark" ? "#ef4444" : "#dc2626"} ${powerLevel * 3.6}deg, transparent ${powerLevel * 3.6}deg)`,
            borderRadius: "50%",
          }}
          animate={{ rotate: powerLevel > 0 ? 360 : 0 }}
          transition={{ duration: 2, repeat: powerLevel > 0 ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
        />

        {/* Main Dumbbell Icon */}
        <motion.div
          animate={{
            scale: isLifted ? 1.3 : isHovered ? 1.1 : 1,
            rotateY: isHovered ? [0, 180, 360] : 0,
          }}
          transition={{
            duration: isHovered ? 2 : 0.3,
            repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
          }}
        >
          <Dumbbell
            className={`w-6 h-6 sm:w-8 sm:h-8 relative z-10 ${
              theme === "dark" ? "text-red-400" : "text-red-600"
            } ${powerLevel > 80 ? "drop-shadow-lg" : ""}`}
          />
        </motion.div>

        {/* Click Counter with Combo Multiplier */}
        <motion.div
          className={`absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold ${
            combo > 3
              ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
              : theme === "dark"
                ? "bg-red-500 text-white"
                : "bg-red-600 text-white"
          } shadow-lg`}
          key={clicks}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 500 }}
        >
          {clicks}
          {combo > 3 && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
            />
          )}
        </motion.div>

        {/* Combo Counter */}
        <AnimatePresence>
          {combo > 1 && (
            <motion.div
              className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-full text-xs font-bold ${
                combo > 5
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
              } shadow-lg`}
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              {combo}x COMBO!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Power Level Indicator */}
        <AnimatePresence>
          {powerLevel > 30 && (
            <motion.div
              className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold ${
                powerLevel > 80
                  ? "bg-gradient-to-r from-red-500 to-orange-500 text-white"
                  : "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
              } shadow-lg`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              POWER: {powerLevel}%
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating text on click */}
        <AnimatePresence>
          {isLifted && (
            <motion.div
              className={`absolute -top-12 left-1/2 transform -translate-x-1/2 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap ${
                combo > 5
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : theme === "dark"
                    ? "bg-red-500 text-white"
                    : "bg-red-600 text-white"
              } shadow-lg`}
              initial={{ opacity: 0, y: 0, scale: 0.8 }}
              animate={{ opacity: 1, y: -10, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              {combo > 10 ? "LEGENDARY! 🔥" : combo > 5 ? "AMAZING! ⚡" : combo > 3 ? "GREAT! 💪" : "Nice Rep! 💪"}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Particle Effects */}
        <AnimatePresence>
          {(isLifted || powerLevel > 70) && (
            <>
              {[...Array(powerLevel > 70 ? 8 : 4)].map((_, i) => (
                <motion.div
                  key={`particle-${i}-${clicks}`}
                  className={`absolute w-2 h-2 rounded-full ${
                    powerLevel > 70
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                      : "bg-gradient-to-r from-red-400 to-orange-400"
                  }`}
                  style={{
                    left: `${50 + Math.cos((i * 45 * Math.PI) / 180) * 20}%`,
                    top: `${50 + Math.sin((i * 45 * Math.PI) / 180) * 20}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    x: [0, Math.cos((i * 45 * Math.PI) / 180) * 40],
                    y: [0, Math.sin((i * 45 * Math.PI) / 180) * 40],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1,
                    ease: "easeOut",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Hover Glow Effect */}
        <motion.div
          className={`absolute inset-0 rounded-full ${
            theme === "dark"
              ? "bg-gradient-to-r from-red-500/20 to-orange-500/20"
              : "bg-gradient-to-r from-red-300/30 to-orange-300/30"
          }`}
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
            opacity: isHovered ? [0.5, 0.8, 0.5] : 0,
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
          }}
        />

        {/* Drag Indicator */}
        <AnimatePresence>
          {isDragging && (
            <motion.div
              className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500 text-white shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              Dragging! 🎯
            </motion.div>
          )}
        </AnimatePresence>

        {/* Special Effects for High Power */}
        <AnimatePresence>
          {powerLevel > 90 && (
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-yellow-400"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 360],
                borderColor: ["#facc15", "#f97316", "#ef4444", "#facc15"],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
          )}
        </AnimatePresence>

        {/* Instructions on first hover */}
        <AnimatePresence>
          {isHovered && clicks === 0 && (
            <motion.div
              className={`absolute -left-32 top-1/2 transform -translate-y-1/2 px-3 py-2 rounded-lg text-xs font-medium ${
                theme === "dark"
                  ? "bg-gray-800 text-gray-300 border border-gray-700"
                  : "bg-white text-gray-700 border border-gray-300"
              } shadow-lg whitespace-nowrap`}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
            >
              Click, drag, double-click me! 🎮
              <div
                className={`absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 w-0 h-0 border-l-4 border-y-4 border-transparent ${
                  theme === "dark" ? "border-l-gray-800" : "border-l-white"
                }`}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

// Enhanced Loader Component with Percentage Counting
const CustomLoader = () => {
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 60)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="relative">
        {/* Outer rotating ring */}
        <motion.div
          className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-red-500/30 border-t-red-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Inner pulsing circle */}
        <motion.div
          className="absolute inset-4 sm:inset-6 bg-red-500/20 rounded-full"
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />

        {/* Center logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Dumbbell className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
        </div>

        {/* Percentage Counter */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-white text-xl sm:text-2xl font-bold mt-12 sm:mt-16"
            key={percentage}
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.1 }}
          >
            {percentage}%
          </motion.span>
        </div>
      </div>

      {/* Loading text */}
      <motion.div
        className="absolute bottom-1/3 text-white text-lg sm:text-xl font-bold"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
      >
        FORGE FITNESS
      </motion.div>

      {/* Progress bar */}
      <div className="absolute bottom-1/4 w-48 sm:w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </div>
  )
}

// Enhanced Navbar Component
const Navbar = ({ theme, toggleTheme }: { theme: "light" | "dark"; toggleTheme: () => void }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "#home", icon: <Home className="w-4 h-4" /> },
    { name: "About", href: "#about", icon: <Info className="w-4 h-4" /> },
    { name: "Plans", href: "#plans", icon: <CreditCard className="w-4 h-4" /> },
    { name: "Features", href: "#features", icon: <Target className="w-4 h-4" /> },
    { name: "Stats", href: "#stats", icon: <TrendingUp className="w-4 h-4" /> },
    { name: "Testimonials", href: "#testimonials", icon: <Award className="w-4 h-4" /> },
    { name: "Contact", href: "#contact", icon: <MessageSquare className="w-4 h-4" /> },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? `backdrop-blur-xl ${
              theme === "dark"
                ? "bg-black/90 border-b border-gray-800/50 shadow-2xl shadow-red-500/10"
                : "bg-white/95 border-b border-gray-200/50 shadow-2xl shadow-gray-900/10"
            }`
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Enhanced Logo */}
          <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <motion.div className="relative" whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Dumbbell className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-lg opacity-30 animate-pulse" />
            </motion.div>
            <div className="flex flex-col">
              <span className={`text-lg lg:text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                FORGE FITNESS
              </span>
              <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"} hidden sm:block`}>
                Transform Your Life
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  theme === "dark"
                    ? "text-gray-300 hover:text-white hover:bg-red-500/10"
                    : "text-gray-700 hover:text-gray-900 hover:bg-red-500/10"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">{item.icon}</span>
                <span className="relative z-10 font-medium">{item.name}</span>
              </motion.button>
            ))}

            {/* Enhanced Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className={`p-3 rounded-xl transition-all duration-300 ml-4 relative overflow-hidden ${
                theme === "dark"
                  ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 hover:from-yellow-500/30 hover:to-orange-500/30"
                  : "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 hover:from-blue-500/30 hover:to-purple-500/30"
              }`}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${
                theme === "dark" ? "bg-gray-800 text-yellow-400" : "bg-gray-100 text-gray-600"
              }`}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={`lg:hidden ${
                theme === "dark" ? "bg-black/95" : "bg-white/95"
              } backdrop-blur-xl border-t ${theme === "dark" ? "border-gray-800" : "border-gray-200"} rounded-b-2xl`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 pt-4 pb-6 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-200 ${
                      theme === "dark"
                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

// Scroll Pop-up Component
const ScrollPopup = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
            }
          : { opacity: 0, y: 100, scale: 0.8 }
      }
      transition={{
        duration: 0.8,
        delay,
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}
    >
      {children}
    </motion.div>
  )
}

// Enhanced Water Ocean Effect Component
const WaterOceanEffect = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-xl">
      {/* Ocean waves - Multiple layers for realistic effect */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-full h-8"
          style={{
            background: `linear-gradient(90deg, transparent, rgba(59, 130, 246, ${0.1 + i * 0.03}), rgba(34, 197, 94, ${0.05 + i * 0.02}), transparent)`,
            top: `${10 + i * 10}%`,
            borderRadius: "50%",
          }}
          animate={
            isHovered
              ? {
                  x: [-200, 200, -200],
                  scaleY: [1, 1.5, 1],
                  rotate: [0, 5, -5, 0],
                }
              : {
                  x: [-50, 50, -50],
                  scaleY: [1, 1.1, 1],
                }
          }
          transition={{
            duration: 4 + i * 0.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Floating bubbles */}
      {isHovered &&
        [...Array(12)].map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              background: `rgba(59, 130, 246, ${0.3 + Math.random() * 0.4})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -150],
              x: [0, Math.random() * 40 - 20],
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: i * 0.1,
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        ))}

      {/* Ripple effects */}
      {isHovered &&
        [...Array(5)].map((_, i) => (
          <motion.div
            key={`ripple-${i}`}
            className="absolute border-2 border-blue-400/20 rounded-full"
            style={{
              width: "100px",
              height: "100px",
              left: "50%",
              top: "50%",
              marginLeft: "-50px",
              marginTop: "-50px",
            }}
            animate={{
              scale: [0, 3],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.4,
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        ))}
    </div>
  )
}

// Perfect Horizontal Scroll Features Component (Fixed Design)
const HorizontalScrollFeatures = ({ theme }: { theme: "light" | "dark" }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"])

  const features = [
    {
      icon: <Dumbbell className="w-8 h-8 sm:w-10 sm:h-10" />,
      title: "State-of-the-Art Equipment",
      description:
        "Latest fitness equipment from top brands, regularly maintained and updated for optimal performance.",
      color: "from-red-500 to-orange-500",
      stats: "200+ Machines",
      bgPattern: "equipment",
    },
    {
      icon: <Users className="w-8 h-8 sm:w-10 sm:h-10" />,
      title: "Expert Trainers",
      description: "Certified personal trainers with years of experience to help you achieve your fitness goals.",
      color: "from-blue-500 to-purple-500",
      stats: "50+ Trainers",
      bgPattern: "trainers",
    },
    {
      icon: <Calendar className="w-8 h-8 sm:w-10 sm:h-10" />,
      title: "Flexible Scheduling",
      description: "Wide variety of classes and training sessions to fit your busy lifestyle and preferences.",
      color: "from-green-500 to-teal-500",
      stats: "24/7 Access",
      bgPattern: "schedule",
    },
    {
      icon: <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10" />,
      title: "Progress Tracking",
      description: "Advanced fitness tracking and analytics to monitor your progress and optimize your workouts.",
      color: "from-purple-500 to-pink-500",
      stats: "AI Powered",
      bgPattern: "tracking",
    },
    {
      icon: <Activity className="w-8 h-8 sm:w-10 sm:h-10" />,
      title: "Group Classes",
      description: "Energizing group fitness classes including yoga, HIIT, spin, and strength training.",
      color: "from-yellow-500 to-orange-500",
      stats: "100+ Classes",
      bgPattern: "classes",
    },
    {
      icon: <Zap className="w-8 h-8 sm:w-10 sm:h-10" />,
      title: "Recovery Suite",
      description: "Dedicated recovery area with massage chairs, stretching zones, and relaxation facilities.",
      color: "from-cyan-500 to-blue-500",
      stats: "Premium Spa",
      bgPattern: "recovery",
    },
  ]

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      <div className="sticky top-0 flex items-center h-screen">
        <motion.div className="flex space-x-4 sm:space-x-6 px-4 sm:px-8" style={{ x }}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`min-w-[280px] sm:min-w-[350px] lg:min-w-[400px] h-[450px] sm:h-[500px] lg:h-[550px] rounded-2xl p-6 sm:p-8 backdrop-blur-sm border relative overflow-hidden group ${
                theme === "dark"
                  ? "bg-gray-900/50 border-gray-700 hover:border-gray-600"
                  : "bg-white/90 border-gray-200 hover:border-gray-300 shadow-xl hover:shadow-2xl"
              }`}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Background Pattern */}
              <div className={`absolute inset-0 opacity-5 ${feature.bgPattern}-pattern`} />

              {/* Icon Container */}
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-4 sm:mb-6 shadow-lg relative z-10`}
              >
                {feature.icon}
              </div>

              {/* Stats Badge */}
              <div
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 sm:mb-4 relative z-10 ${
                  theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
                }`}
              >
                {feature.stats}
              </div>

              {/* Title */}
              <h3
                className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 relative z-10 leading-tight ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p
                className={`text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 relative z-10 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {feature.description}
              </p>

              {/* CTA Button */}
              <motion.button
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 relative z-10 w-full sm:w-auto ${
                  theme === "dark"
                    ? "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                    : "bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>

              {/* Hover Gradient Overlay */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.05 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

// Enhanced Gym Performance Section
const GymPerformanceSection = ({ theme }: { theme: "light" | "dark" }) => {
  const [activeChart, setActiveChart] = useState("overview")

  const performanceData = {
    overview: [
      { month: "Jan", members: 1200, classes: 45, revenue: 89000 },
      { month: "Feb", members: 1350, classes: 52, revenue: 95000 },
      { month: "Mar", members: 1580, classes: 48, revenue: 102000 },
      { month: "Apr", members: 1720, classes: 65, revenue: 115000 },
      { month: "May", members: 1950, classes: 58, revenue: 125000 },
      { month: "Jun", members: 2100, classes: 72, revenue: 135000 },
    ],
    equipment: [
      { name: "Cardio", usage: 85, satisfaction: 92 },
      { name: "Weights", usage: 78, satisfaction: 88 },
      { name: "Functional", usage: 65, satisfaction: 95 },
      { name: "Recovery", usage: 45, satisfaction: 90 },
    ],
    classes: [
      { type: "HIIT", attendance: 95, rating: 4.8 },
      { type: "Yoga", attendance: 87, rating: 4.9 },
      { type: "Spin", attendance: 92, rating: 4.7 },
      { type: "Strength", attendance: 78, rating: 4.6 },
    ],
  }

  const chartTabs = [
    { id: "overview", label: "Overview", icon: <BarChart3 className="w-4 h-4" /> },
    { id: "equipment", label: "Equipment", icon: <PieChart className="w-4 h-4" /> },
    { id: "classes", label: "Classes", icon: <LineChart className="w-4 h-4" /> },
  ]

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Chart Navigation */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
        {chartTabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveChart(tab.id)}
            className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base ${
              activeChart === tab.id
                ? theme === "dark"
                  ? "bg-red-500 text-white shadow-lg"
                  : "bg-red-500 text-white shadow-lg"
                : theme === "dark"
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Chart Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeChart}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`rounded-2xl p-4 sm:p-6 border-2 ${
            theme === "dark"
              ? "bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border-gray-700/50"
              : "bg-gradient-to-br from-white to-gray-50/80 border-gray-200/50 shadow-2xl"
          }`}
        >
          {activeChart === "overview" && <OverviewChart data={performanceData.overview} theme={theme} />}
          {activeChart === "equipment" && <EquipmentChart data={performanceData.equipment} theme={theme} />}
          {activeChart === "classes" && <ClassesChart data={performanceData.classes} theme={theme} />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// Overview Chart Component
const OverviewChart = ({ data, theme }: { data: any[]; theme: "light" | "dark" }) => {
  const maxMembers = Math.max(...data.map((d) => d.members))
  const maxClasses = Math.max(...data.map((d) => d.classes))

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8">
        <div>
          <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Growth Analytics
          </h3>
          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Monthly performance metrics & trends
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 mt-4 sm:mt-0">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-sm"></div>
            <span className={`text-xs sm:text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              Members
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-sm"></div>
            <span className={`text-xs sm:text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              Classes
            </span>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex flex-col justify-between opacity-20">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`h-px ${theme === "dark" ? "bg-gray-600" : "bg-gray-300"}`} />
          ))}
        </div>

        <div className="h-48 sm:h-64 lg:h-80 flex items-end justify-between space-x-1 sm:space-x-2 lg:space-x-4 relative z-10">
          {data.map((item, index) => (
            <div key={item.month} className="flex flex-col items-center flex-1 space-y-2 sm:space-y-3">
              <div className="w-full flex space-x-1 items-end">
                <div className="flex-1 relative group">
                  <motion.div
                    className="bg-gradient-to-t from-red-500 to-orange-400 rounded-t-lg shadow-lg relative overflow-hidden"
                    initial={{ height: 0 }}
                    animate={{ height: `${(item.members / maxMembers) * 160}px` }}
                    transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, delay: index * 0.3, ease: "easeInOut" }}
                    />
                  </motion.div>

                  <div
                    className={`absolute -top-10 sm:-top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs font-bold shadow-lg whitespace-nowrap ${
                      theme === "dark"
                        ? "bg-gray-800 text-white border border-gray-700"
                        : "bg-white text-gray-900 border border-gray-200"
                    }`}
                  >
                    {item.members.toLocaleString()}
                    <div
                      className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${theme === "dark" ? "border-t-gray-800" : "border-t-white"}`}
                    />
                  </div>
                </div>

                <div className="flex-1 relative group">
                  <motion.div
                    className="bg-gradient-to-t from-blue-500 to-purple-400 rounded-t-lg shadow-lg relative overflow-hidden"
                    initial={{ height: 0 }}
                    animate={{ height: `${(item.classes / maxClasses) * 120}px` }}
                    transition={{ duration: 1.5, delay: index * 0.2 + 0.3, ease: "easeOut" }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, delay: index * 0.3 + 0.5, ease: "easeInOut" }}
                    />
                  </motion.div>

                  <div
                    className={`absolute -top-10 sm:-top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs font-bold shadow-lg whitespace-nowrap ${
                      theme === "dark"
                        ? "bg-gray-800 text-white border border-gray-700"
                        : "bg-white text-gray-900 border border-gray-200"
                    }`}
                  >
                    {item.classes}
                    <div
                      className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${theme === "dark" ? "border-t-gray-800" : "border-t-white"}`}
                    />
                  </div>
                </div>
              </div>

              <span
                className={`text-xs sm:text-sm font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
              >
                {item.month}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <motion.div
          className={`text-center p-3 sm:p-4 rounded-xl ${theme === "dark" ? "bg-gradient-to-br from-gray-800/80 to-gray-700/80" : "bg-gradient-to-br from-green-50 to-green-100"}`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className={`text-xl sm:text-2xl font-bold mb-1 ${theme === "dark" ? "text-green-400" : "text-green-600"}`}
          >
            +75%
          </div>
          <div className={`text-xs font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Member Growth
          </div>
        </motion.div>
        <motion.div
          className={`text-center p-3 sm:p-4 rounded-xl ${theme === "dark" ? "bg-gradient-to-br from-gray-800/80 to-gray-700/80" : "bg-gradient-to-br from-blue-50 to-blue-100"}`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className={`text-xl sm:text-2xl font-bold mb-1 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>
            +60%
          </div>
          <div className={`text-xs font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Class Increase
          </div>
        </motion.div>
        <motion.div
          className={`text-center p-3 sm:p-4 rounded-xl ${theme === "dark" ? "bg-gradient-to-br from-gray-800/80 to-gray-700/80" : "bg-gradient-to-br from-purple-50 to-purple-100"}`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className={`text-xl sm:text-2xl font-bold mb-1 ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`}
          >
            +52%
          </div>
          <div className={`text-xs font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Revenue Up
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Equipment Chart Component
const EquipmentChart = ({ data, theme }: { data: any[]; theme: "light" | "dark" }) => {
  return (
    <div>
      <h3 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
        Equipment Performance
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {data.map((item, index) => (
          <motion.div
            key={item.name}
            className={`p-4 sm:p-6 rounded-xl ${theme === "dark" ? "bg-gray-800/50" : "bg-gray-50"}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <h4
              className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              {item.name}
            </h4>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Usage</span>
                  <span className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {item.usage}%
                  </span>
                </div>
                <div className={`w-full ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"} rounded-full h-2`}>
                  <motion.div
                    className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.usage}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    Satisfaction
                  </span>
                  <span className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {item.satisfaction}%
                  </span>
                </div>
                <div className={`w-full ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"} rounded-full h-2`}>
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.satisfaction}%` }}
                    transition={{ duration: 1, delay: index * 0.2 + 0.3 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Classes Chart Component
const ClassesChart = ({ data, theme }: { data: any[]; theme: "light" | "dark" }) => {
  return (
    <div>
      <h3 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
        Class Performance
      </h3>
      <div className="space-y-3 sm:space-y-4">
        {data.map((item, index) => (
          <motion.div
            key={item.type}
            className={`p-3 sm:p-4 rounded-lg ${theme === "dark" ? "bg-gray-800/50" : "bg-gray-50"}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 sm:mb-3">
              <h4 className={`text-base sm:text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                {item.type}
              </h4>
              <div className="flex items-center space-x-3 sm:space-x-4 mt-2 sm:mt-0">
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                  <span className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    {item.attendance}%
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                  <span className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    {item.rating}
                  </span>
                </div>
              </div>
            </div>
            <div className={`w-full ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"} rounded-full h-2 sm:h-3`}>
              <motion.div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 sm:h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${item.attendance}%` }}
                transition={{ duration: 1, delay: index * 0.2 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Stats Card Component
const GymStatsCard = ({
  title,
  value,
  unit,
  change,
  data,
  theme,
}: {
  title: string
  value: string
  unit: string
  change: string
  data: Array<{ period: string; value: number }>
  theme: "light" | "dark"
}) => {
  return (
    <Card className={`${theme === "dark" ? "bg-gray-900/50 border-gray-700" : "bg-white border-gray-200 shadow-lg"}`}>
      <CardHeader className="pb-2">
        <CardTitle className={`text-sm font-normal ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          {title}
        </CardTitle>
        <div className="flex items-baseline space-x-2">
          <span className={`text-2xl sm:text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            {value}
          </span>
          <span className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>{unit}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <span className={`${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>vs last month</span>
          <span className={`${change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>{change}</span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2 sm:space-y-3">
          {data.map((item, index) => (
            <div key={item.period} className="flex items-center justify-between">
              <span className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                {item.period}
              </span>
              <div className="flex items-center space-x-2 flex-1 mx-2 sm:mx-4">
                <div className={`flex-1 ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"} rounded-full h-2`}>
                  <motion.div
                    className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.value / Math.max(...data.map((d) => d.value))) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </div>
              <span className={`text-xs sm:text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                {item.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Enhanced Mission Section with CSS-Generated Images
const MissionSection = ({ theme }: { theme: "light" | "dark" }) => {
  const [hoveredWord, setHoveredWord] = useState<string | null>(null)

  const MissionWord = ({ word, color, imageType }: { word: string; color: string; imageType: string }) => (
    <span
      className={`font-bold ${color} cursor-pointer relative transition-all duration-300 hover:scale-110 inline-block`}
      onMouseEnter={() => setHoveredWord(word)}
      onMouseLeave={() => setHoveredWord(null)}
    >
      {word}
      <AnimatePresence>
        {hoveredWord === word && (
          <motion.div
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-20"
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={`relative rounded-lg overflow-hidden shadow-2xl border-2 w-48 sm:w-64 h-32 sm:h-40 ${
                theme === "dark" ? "border-gray-600" : "border-gray-300"
              } ${imageType}-image`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-t ${
                  theme === "dark" ? "from-black/60 to-transparent" : "from-white/60 to-transparent"
                }`}
              />
              <div className="absolute bottom-2 left-2 right-2">
                <div className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  {word.charAt(0).toUpperCase() + word.slice(1)}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )

  return (
    <div>
      <h3 className={`text-xl sm:text-2xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
        Our Mission
      </h3>
      <div
        className={`text-base sm:text-lg mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-600"} leading-relaxed`}
      >
        To provide a <MissionWord word="supportive" color="text-red-500" imageType="supportive" />,{" "}
        <MissionWord word="inclusive" color="text-orange-500" imageType="inclusive" /> environment where{" "}
        <MissionWord word="everyone" color="text-yellow-500" imageType="everyone" /> can pursue their{" "}
        <MissionWord word="fitness journey" color="text-green-500" imageType="fitness" /> with{" "}
        <MissionWord word="confidence" color="text-blue-500" imageType="confidence" /> and achieve{" "}
        <MissionWord word="lasting results" color="text-purple-500" imageType="results" />.
      </div>
      <div className="space-y-4">
        {["10,000+ Happy Members", "50+ Expert Trainers", "24/7 Access Available"].map((stat, index) => (
          <motion.div
            key={index}
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>{stat}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Enhanced Button Components
const PrimaryButton = ({ children, onClick, className = "", ...props }: any) => {
  return (
    <motion.button
      className={`relative px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-lg overflow-hidden group shadow-lg hover:shadow-xl ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500"
        initial={{ x: "-100%" }}
        whileHover={{ x: 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
}

const SecondaryButton = ({ children, onClick, className = "", ...props }: any) => {
  return (
    <motion.button
      className={`relative px-4 sm:px-6 py-2 sm:py-3 border-2 border-red-500 text-red-500 font-semibold rounded-lg overflow-hidden group hover:text-white transition-colors duration-300 shadow-lg hover:shadow-xl ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      <motion.div
        className="absolute inset-0 bg-red-500"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
}

const GlassButton = ({ children, onClick, className = "", ...props }: any) => {
  return (
    <motion.button
      className={`relative px-4 sm:px-6 py-2 sm:py-3 backdrop-blur-md bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <span className="flex items-center justify-center gap-2">{children}</span>
    </motion.button>
  )
}

// Custom Button Component (for homepage only)
const CustomButton = ({ children, onClick, className = "", ...props }: any) => {
  return (
    <button className={`button ${className}`} onClick={onClick} {...props}>
      <div className="blob1"></div>
      <div className="inner">{children}</div>
    </button>
  )
}

// Main Component
export default function GymHomePage() {
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [selectedPlan, setSelectedPlan] = useState("Premium")
  const [activeTab, setActiveTab] = useState("classes")
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isWaterHovered, setIsWaterHovered] = useState(false)

  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  const membershipPlans = [
    {
      name: "Basic",
      icon: "B",
      color: "bg-gray-600",
      price: "$29",
      features: ["Access to gym equipment", "Locker room access", "Basic fitness assessment", "Mobile app access"],
    },
    {
      name: "Premium",
      icon: "P",
      color: "bg-red-500",
      price: "$59",
      features: [
        "All Basic features",
        "Unlimited group classes",
        "Personal trainer consultation",
        "Nutrition guidance",
        "Guest passes (2/month)",
      ],
      isPopular: true,
    },
    {
      name: "Elite",
      icon: "E",
      color: "bg-orange-500",
      price: "$99",
      features: [
        "All Premium features",
        "Unlimited personal training",
        "Meal planning service",
        "Recovery suite access",
        "Priority class booking",
      ],
    },
  ]

  const gymStats = [
    {
      title: "Active Members",
      value: "2,847",
      unit: "members",
      change: "+ 12%",
      data: [
        { period: "This Week", value: 2847 },
        { period: "Last Week", value: 2654 },
        { period: "2 Weeks Ago", value: 2543 },
        { period: "3 Weeks Ago", value: 2398 },
      ],
    },
    {
      title: "Classes This Month",
      value: "486",
      unit: "classes",
      change: "+ 8%",
      data: [
        { period: "Week 4", value: 486 },
        { period: "Week 3", value: 445 },
        { period: "Week 2", value: 423 },
        { period: "Week 1", value: 398 },
      ],
    },
    {
      title: "Equipment Usage",
      value: "94%",
      unit: "utilization",
      change: "+ 5%",
      data: [
        { period: "Peak Hours", value: 94 },
        { period: "Evening", value: 78 },
        { period: "Afternoon", value: 65 },
        { period: "Morning", value: 82 },
      ],
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fitness Enthusiast",
      content:
        "This gym has completely transformed my fitness journey. The trainers are incredible and the community is so supportive!",
      avatar: "SJ",
      beforeAfter: "Lost 25 lbs in 4 months",
    },
    {
      name: "Mike Rodriguez",
      role: "Competitive Athlete",
      content:
        "The equipment is top-notch and the training programs are perfectly designed. I've never felt stronger or more confident.",
      avatar: "MR",
      beforeAfter: "Increased bench press by 40 lbs",
    },
    {
      name: "Emily Chen",
      role: "Busy Professional",
      content:
        "The flexible class schedule and amazing instructors make it easy to stay consistent with my workouts despite my busy schedule.",
      avatar: "EC",
      beforeAfter: "Gained 8 lbs of muscle mass",
    },
  ]

  const todaysClasses = [
    {
      name: "HIIT Bootcamp",
      instructor: "Jake Martinez",
      time: "6:00 AM",
      duration: "45 min",
      difficulty: "Advanced",
      spots: 3,
    },
    {
      name: "Yoga Flow",
      instructor: "Lisa Thompson",
      time: "9:00 AM",
      duration: "60 min",
      difficulty: "Beginner",
      spots: 8,
    },
    {
      name: "Strength Training",
      instructor: "Marcus Johnson",
      time: "12:00 PM",
      duration: "50 min",
      difficulty: "Intermediate",
      spots: 5,
    },
    {
      name: "Spin Class",
      instructor: "Amanda Davis",
      time: "6:30 PM",
      duration: "45 min",
      difficulty: "Intermediate",
      spots: 2,
    },
  ]

  if (loading) {
    return <CustomLoader />
  }

  const themeClasses = theme === "dark" ? "bg-black text-white" : "bg-gray-50 text-gray-900"

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`min-h-screen transition-colors duration-300 ${themeClasses}`}>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <InteractiveDumbbell theme={theme} />
        <Interactive3DModel theme={theme} />

        {/* Hero Section */}
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
          <motion.div
            className={`absolute inset-0 ${
              theme === "dark"
                ? "bg-gradient-to-br from-red-900/20 via-black to-orange-900/20"
                : "bg-gradient-to-br from-red-50 via-white to-orange-50"
            }`}
            style={{ y }}
          />

          <motion.div className="relative z-10 text-center max-w-6xl mx-auto px-4" style={{ opacity }}>
            {/* Enhanced Logo Design */}
            <motion.div
              className="mb-6 sm:mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-xl opacity-30 animate-pulse" />
                <div className="relative bg-gradient-to-r from-red-500 to-orange-500 p-4 sm:p-6 rounded-full shadow-2xl">
                  <Dumbbell className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.h1
              className={`text-4xl sm:text-6xl md:text-8xl font-bold mb-4 sm:mb-6 leading-tight ${
                theme === "dark"
                  ? "bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent"
              }`}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <span className="block text-3xl sm:text-5xl md:text-6xl mb-2">FORGE</span>
              <span className="block">FITNESS</span>
            </motion.h1>

            <motion.p
              className={`text-base sm:text-xl md:text-2xl mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Transform your body, elevate your mind, and unleash your potential with our world-class fitness facility
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <CustomButton>
                Start Your Journey
                <ArrowRight className="w-4 h-4 ml-2" />
              </CustomButton>
              <CustomButton>
                <Play className="w-4 h-4 mr-2" />
                Virtual Tour
              </CustomButton>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <ChevronDown className={`w-6 h-6 ${theme === "dark" ? "text-white/60" : "text-gray-600/60"}`} />
          </motion.div>
        </section>

        {/* About Section with Enhanced Mission */}
        <ScrollPopup>
          <section
            id="about"
            className={`py-12 sm:py-16 lg:py-20 px-4 ${theme === "dark" ? "bg-gray-900/50" : "bg-white"}`}
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                <h2
                  className={`text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  About Forge Fitness
                </h2>
                <p
                  className={`text-base sm:text-lg lg:text-xl max-w-3xl mx-auto ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  We're more than just a gym - we're a community dedicated to helping you achieve your fitness goals and
                  live your best life.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                <MissionSection theme={theme} />
                <div className="relative">
                  <motion.div
                    className="aspect-square bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl p-6 sm:p-8 flex items-center justify-center shadow-2xl"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Dumbbell className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 text-white" />
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </ScrollPopup>

        {/* Membership Plans */}
        <ScrollPopup>
          <section
            id="plans"
            className={`py-12 sm:py-16 lg:py-20 px-4 ${theme === "dark" ? "bg-black" : "bg-gray-50"}`}
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                <h2
                  className={`text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  Choose Your Plan
                </h2>
                <p
                  className={`text-base sm:text-lg lg:text-xl max-w-3xl mx-auto ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Find the perfect membership that fits your fitness goals and lifestyle
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {membershipPlans.map((plan, index) => (
                  <ScrollPopup key={plan.name} delay={index * 0.2}>
                    <motion.div
                      className={`relative overflow-hidden rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-300 ${
                        selectedPlan === plan.name ? "ring-2 ring-red-500 scale-105" : ""
                      } ${
                        theme === "dark"
                          ? "bg-gray-900 border border-gray-700 hover:border-gray-600"
                          : "bg-white border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl"
                      }`}
                      onClick={() => setSelectedPlan(plan.name)}
                      whileHover={{ y: -5 }}
                    >
                      {plan.isPopular && (
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <span className="bg-red-500 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                            MOST POPULAR
                          </span>
                        </div>
                      )}

                      <div className="text-center">
                        <div
                          className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full ${plan.color} flex items-center justify-center text-white font-bold text-lg sm:text-2xl mb-4 sm:mb-6 shadow-lg`}
                        >
                          {plan.icon}
                        </div>
                        <h3
                          className={`text-xl sm:text-2xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                        >
                          {plan.name}
                        </h3>
                        <div
                          className={`text-3xl sm:text-4xl font-bold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                        >
                          {plan.price}
                        </div>
                        <p className={`text-sm mb-6 sm:mb-8 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                          per month
                        </p>

                        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                          {plan.features.map((feature, index) => (
                            <div
                              key={index}
                              className={`flex items-center text-left ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                            >
                              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-3 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <PrimaryButton className="w-full">
                          {selectedPlan === plan.name ? "Selected" : "Choose Plan"}
                        </PrimaryButton>
                      </div>
                    </motion.div>
                  </ScrollPopup>
                ))}
              </div>
            </div>
          </section>
        </ScrollPopup>

        {/* Horizontal Scroll Features Section */}
        <ScrollPopup>
          <section id="features" className={`${theme === "dark" ? "bg-gray-900/50" : "bg-white"}`}>
            <div className="py-12 sm:py-16 lg:py-20 px-4 text-center">
              <h2
                className={`text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                Why Choose Forge Fitness?
              </h2>
              <p
                className={`text-base sm:text-lg lg:text-xl mb-8 sm:mb-12 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
              >
                Scroll horizontally to discover our amazing features
              </p>
            </div>
            <HorizontalScrollFeatures theme={theme} />
          </section>
        </ScrollPopup>

        {/* Enhanced Stats and Graph Section */}
        <ScrollPopup>
          <section
            id="stats"
            className={`py-12 sm:py-16 lg:py-20 px-4 ${theme === "dark" ? "bg-black" : "bg-gray-50"}`}
          >
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                <h2
                  className={`text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  Gym Performance Analytics
                </h2>
                <p
                  className={`text-base sm:text-lg lg:text-xl ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                >
                  Track our growth and success metrics with interactive charts
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
                {gymStats.map((stat, index) => (
                  <ScrollPopup key={stat.title} delay={index * 0.2}>
                    <GymStatsCard {...stat} theme={theme} />
                  </ScrollPopup>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
                <ScrollPopup delay={0.1}>
                  <GymPerformanceSection theme={theme} />
                </ScrollPopup>
                <ScrollPopup delay={0.2}>
                  <Card
                    className={`${
                      theme === "dark"
                        ? "bg-gray-900/50 backdrop-blur-sm border-gray-700"
                        : "bg-white border-gray-200 shadow-lg"
                    }`}
                  >
                    <CardHeader>
                      <CardTitle className={theme === "dark" ? "text-white" : "text-gray-900"}>
                        Monthly Revenue
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div
                          className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                        >
                          $127,500
                        </div>
                        <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                          +15% from last month
                        </p>
                        <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                          {["Memberships: $89,200", "Personal Training: $28,400", "Merchandise: $9,900"].map(
                            (item, index) => (
                              <div
                                key={index}
                                className={`flex justify-between text-sm sm:text-base ${
                                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                                }`}
                              >
                                <span>{item.split(":")[0]}</span>
                                <span className="font-semibold">{item.split(":")[1]}</span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollPopup>
              </div>
            </div>
          </section>
        </ScrollPopup>

        {/* Classes & Services */}
        <ScrollPopup>
          <section className={`py-12 sm:py-16 lg:py-20 px-4 ${theme === "dark" ? "bg-gray-900/50" : "bg-white"}`}>
            <div className="max-w-6xl mx-auto">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="text-center mb-8 sm:mb-12">
                  <h2
                    className={`text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Classes & Services
                  </h2>
                  <TabsList
                    className={`grid w-full max-w-md mx-auto grid-cols-2 ${
                      theme === "dark"
                        ? "bg-gray-900/80 backdrop-blur-sm border border-gray-700"
                        : "bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <TabsTrigger
                      value="classes"
                      className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
                    >
                      Today's Classes
                    </TabsTrigger>
                    <TabsTrigger
                      value="trainers"
                      className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
                    >
                      Personal Trainers
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="classes" className="mt-8">
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    {todaysClasses.map((classItem, index) => (
                      <ScrollPopup key={index} delay={index * 0.1}>
                        <Card
                          className={`transition-all duration-300 hover:scale-105 ${
                            theme === "dark"
                              ? "bg-gray-900/50 border-gray-700 hover:border-red-500/50 backdrop-blur-sm"
                              : "bg-white border-gray-200 hover:border-red-500/50 shadow-lg hover:shadow-xl"
                          }`}
                        >
                          <CardContent className="p-4 sm:p-6">
                            <div className="flex justify-between items-start mb-4">
                              <h3
                                className={`font-semibold text-base sm:text-lg ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                              >
                                {classItem.name}
                              </h3>
                              <span
                                className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                                  classItem.difficulty === "Beginner"
                                    ? "bg-green-500/20 text-green-400"
                                    : classItem.difficulty === "Intermediate"
                                      ? "bg-yellow-500/20 text-yellow-400"
                                      : "bg-red-500/20 text-red-400"
                                }`}
                              >
                                {classItem.difficulty}
                              </span>
                            </div>
                            <p className={`text-sm mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                              with {classItem.instructor}
                            </p>
                            <div
                              className={`flex items-center justify-between text-sm mb-4 sm:mb-6 ${
                                theme === "dark" ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {classItem.time}
                                </div>
                                <span>{classItem.duration}</span>
                              </div>
                              <div className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {classItem.spots} spots left
                              </div>
                            </div>
                            <SecondaryButton className="w-full">Book Class</SecondaryButton>
                          </CardContent>
                        </Card>
                      </ScrollPopup>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="trainers" className="mt-8">
                  <div className="text-center mb-8">
                    <h3
                      className={`text-xl sm:text-2xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      Expert Personal Trainers
                    </h3>
                    <p className={`max-w-2xl mx-auto mb-8 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                      Our certified trainers are here to guide you every step of the way
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {["Jake Martinez", "Lisa Thompson", "Marcus Johnson"].map((trainer, index) => (
                      <ScrollPopup key={trainer} delay={index * 0.2}>
                        <Card
                          className={`text-center transition-all duration-300 hover:scale-105 ${
                            theme === "dark"
                              ? "bg-gray-900/50 border-gray-700 backdrop-blur-sm"
                              : "bg-white border-gray-200 shadow-lg hover:shadow-xl"
                          }`}
                        >
                          <CardContent className="p-4 sm:p-6">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg">
                              {trainer
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <h4 className={`font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                              {trainer}
                            </h4>
                            <p className={`text-sm mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                              Certified Personal Trainer
                            </p>
                            <GlassButton className="w-full">Book Session</GlassButton>
                          </CardContent>
                        </Card>
                      </ScrollPopup>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
        </ScrollPopup>

        {/* Enhanced Water Ocean Effect Section */}
        <ScrollPopup>
          <section className={`py-12 sm:py-16 lg:py-20 px-4 relative ${theme === "dark" ? "bg-black" : "bg-gray-50"}`}>
            <div className="max-w-6xl mx-auto text-center">
              <h2
                className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                Interactive Ocean Zone
              </h2>
              <p className={`mb-6 sm:mb-8 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                <strong>Interact with the ocean below!</strong> Hover over the water to experience enhanced wave
                effects, floating bubbles, and ripple animations. Watch as the ocean comes alive with your touch.
              </p>
              <div
                className={`relative h-48 sm:h-60 lg:h-80 rounded-xl cursor-pointer overflow-hidden transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gradient-to-b from-blue-900/30 to-blue-600/30 border border-blue-500/30"
                    : "bg-gradient-to-b from-blue-100/70 to-blue-300/70 border border-blue-300/50 shadow-lg"
                } backdrop-blur-sm group`}
                onMouseEnter={() => setIsWaterHovered(true)}
                onMouseLeave={() => setIsWaterHovered(false)}
              >
                <WaterOceanEffect isHovered={isWaterHovered} />
                <div className="relative z-10 flex items-center justify-center h-full">
                  <motion.span
                    className={`text-2xl sm:text-3xl lg:text-6xl font-bold ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
                        : "bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
                    }`}
                    animate={isWaterHovered ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    OCEAN ZONE
                  </motion.span>
                </div>

                {/* Interaction hint */}
                <motion.div
                  className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 px-3 sm:px-4 py-2 rounded-full text-sm font-medium ${
                    theme === "dark" ? "bg-blue-500/20 text-blue-300" : "bg-blue-500/20 text-blue-700"
                  } backdrop-blur-sm`}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  {isWaterHovered ? "🌊 Amazing! Keep exploring!" : "👆 Hover to interact"}
                </motion.div>
              </div>
            </div>
          </section>
        </ScrollPopup>

        {/* Testimonials */}
        <ScrollPopup>
          <section
            id="testimonials"
            className={`py-12 sm:py-16 lg:py-20 px-4 ${theme === "dark" ? "bg-gray-900/50" : "bg-white"}`}
          >
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                <h2
                  className={`text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  Success Stories
                </h2>
                <p
                  className={`text-base sm:text-lg lg:text-xl ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                >
                  Hear from our amazing community members
                </p>
              </div>

              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card
                      className={`${
                        theme === "dark"
                          ? "bg-white/5 border-white/10 backdrop-blur-sm"
                          : "bg-white border-gray-200 shadow-lg"
                      }`}
                    >
                      <CardContent className="p-6 sm:p-8">
                        <div className="flex items-center space-x-1 mb-6">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p
                          className={`text-base sm:text-lg mb-6 leading-relaxed ${
                            theme === "dark" ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          "{testimonials[currentTestimonial].content}"
                        </p>
                        <div className="bg-red-500/20 rounded-lg p-4 mb-6 backdrop-blur-sm">
                          <p className="text-red-400 font-medium">{testimonials[currentTestimonial].beforeAfter}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                            {testimonials[currentTestimonial].avatar}
                          </div>
                          <div>
                            <p className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                              {testimonials[currentTestimonial].name}
                            </p>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                              {testimonials[currentTestimonial].role}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </AnimatePresence>

                <div className="flex justify-center mt-8 space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentTestimonial ? "bg-red-500 w-8" : "bg-gray-400"
                      }`}
                      onClick={() => setCurrentTestimonial(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </ScrollPopup>

        {/* Contact Section */}
        <ScrollPopup>
          <section
            id="contact"
            className={`py-12 sm:py-16 lg:py-20 px-4 ${theme === "dark" ? "bg-black" : "bg-gray-50"}`}
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                <h2
                  className={`text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  Visit Us Today
                </h2>
                <p
                  className={`text-base sm:text-lg lg:text-xl ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                >
                  Ready to start your fitness journey? Get in touch with us
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {[
                  {
                    icon: <MapPin className="w-6 h-6 sm:w-8 sm:h-8" />,
                    title: "Location",
                    content: "123 Fitness Street\nDowntown, NY 10001",
                  },
                  { icon: <Phone className="w-6 h-6 sm:w-8 sm:h-8" />, title: "Phone", content: "(555) 123-4567" },
                  {
                    icon: <Mail className="w-6 h-6 sm:w-8 sm:h-8" />,
                    title: "Email",
                    content: "info@forgefitness.com",
                  },
                ].map((contact, index) => (
                  <ScrollPopup key={contact.title} delay={index * 0.1}>
                    <div
                      className={`text-center p-6 sm:p-8 rounded-2xl transition-all duration-300 hover:scale-105 ${
                        theme === "dark"
                          ? "backdrop-blur-sm bg-white/5 border border-white/10"
                          : "bg-white border border-gray-200 shadow-lg hover:shadow-xl"
                      }`}
                    >
                      <div className="text-red-500 mb-4 sm:mb-6 flex justify-center">{contact.icon}</div>
                      <h3
                        className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                      >
                        {contact.title}
                      </h3>
                      <p className={`whitespace-pre-line ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                        {contact.content}
                      </p>
                    </div>
                  </ScrollPopup>
                ))}
              </div>
            </div>
          </section>
        </ScrollPopup>

        {/* CTA Section */}
        <ScrollPopup>
          <section
            className={`py-12 sm:py-16 lg:py-20 px-4 ${
              theme === "dark"
                ? "bg-gradient-to-r from-red-900/20 to-orange-900/20 backdrop-blur-sm"
                : "bg-gradient-to-r from-red-50 to-orange-50"
            }`}
          >
            <div className="max-w-4xl mx-auto text-center">
              <h2
                className={`text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                Ready to Transform Your Life?
              </h2>
              <p
                className={`text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
              >
                Join thousands of members who have already started their fitness journey with us
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <PrimaryButton>
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </PrimaryButton>
                <SecondaryButton>Schedule Tour</SecondaryButton>
              </div>
            </div>
          </section>
        </ScrollPopup>

        {/* Footer */}
        <footer
          className={`py-8 sm:py-12 px-4 border-t ${
            theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
          }`}
        >
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className={`text-lg sm:text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                FORGE FITNESS
              </span>
            </div>
            <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              © 2024 Forge Fitness. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </ThemeContext.Provider>
  )
}
