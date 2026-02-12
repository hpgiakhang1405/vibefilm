'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ErrorDisplayProps {
  code?: string | number
  title: string
  description: string
  icon?: React.ReactNode
  action?: React.ReactNode
  className?: string
}

export function ErrorDisplay({ code, title, description, icon, action, className }: ErrorDisplayProps) {
  return (
    <div
      className={cn(
        'relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden py-20 px-4',
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto"
      >
        {/* Large Code (404, 500) - Optional Background Effect */}
        {code && (
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] md:text-[14rem] font-black leading-none tracking-tighter text-white/3 select-none pointer-events-none"
          >
            {code}
          </motion.h1>
        )}

        {/* Icon with Glow */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 relative"
        >
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150" />
          <div className="relative z-10">{icon}</div>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-3xl md:text-5xl font-bold bg-linear-to-b from-white via-white/90 to-white/60 bg-clip-text text-transparent mb-4 leading-tight"
        >
          {title}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-gray-400 text-base md:text-lg max-w-lg mx-auto leading-relaxed mb-8"
        >
          {description}
        </motion.p>

        {/* Action */}
        {action && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {action}
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
