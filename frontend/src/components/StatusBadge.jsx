import { motion } from 'framer-motion';

export const StatusBadge = ({ status }) => {
  const statusConfig = {
    winning: {
      gradient: 'from-emerald-500 via-green-500 to-emerald-600',
      text: 'text-white',
      border: 'border-emerald-400/50',
      label: 'Winning',
      ring: 'ring-emerald-500/30',
      glow: 'shadow-emerald-500/50',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
      pulse: true,
    },
    outbid: {
      gradient: 'from-red-500 via-rose-500 to-red-600',
      text: 'text-white',
      border: 'border-red-400/50',
      label: 'Outbid',
      ring: 'ring-red-500/30',
      glow: 'shadow-red-500/50',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
      ),
      shake: true,
    },
    bidding: {
      gradient: 'from-amber-500 via-yellow-500 to-amber-600',
      text: 'text-white',
      border: 'border-amber-400/50',
      label: 'Bidding',
      ring: 'ring-amber-500/30',
      glow: 'shadow-amber-500/50',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      pulse: true,
      animate: true,
    },
    active: {
      gradient: 'from-blue-500 via-cyan-500 to-blue-600',
      text: 'text-white',
      border: 'border-blue-400/50',
      label: 'Active',
      ring: 'ring-blue-500/30',
      glow: 'shadow-blue-500/50',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    idle: {
      gradient: 'from-slate-600 via-slate-500 to-slate-600',
      text: 'text-slate-200',
      border: 'border-slate-500/50',
      label: 'Open',
      ring: 'ring-slate-500/20',
      glow: 'shadow-slate-500/30',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    ended: {
      gradient: 'from-slate-700 via-slate-600 to-slate-700',
      text: 'text-slate-300',
      border: 'border-slate-600/50',
      label: 'Ended',
      ring: 'ring-slate-600/20',
      glow: 'shadow-slate-600/30',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
  };

  const config = statusConfig[status] || statusConfig.idle;

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    opacity: [1, 0.9, 1],
  };

  const shakeAnimation = {
    x: [0, -3, 3, -3, 3, 0],
    rotate: [0, -2, 2, -2, 2, 0],
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={
        config.pulse
          ? pulseAnimation
          : config.shake
          ? shakeAnimation
          : { scale: 1, opacity: 1 }
      }
      transition={
        config.pulse
          ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
          : config.shake
          ? { duration: 0.5, repeat: Infinity, repeatDelay: 3 }
          : { duration: 0.3 }
      }
      className="relative inline-flex"
    >
      {/* Glow effect */}
      {(config.pulse || config.animate) && (
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`absolute inset-0 rounded-full bg-gradient-to-r ${config.gradient} blur-md ${config.glow}`}
        />
      )}

      {/* Badge */}
      <span
        className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${config.text} bg-gradient-to-r ${config.gradient} border ${config.border} ring-2 ${config.ring} shadow-lg ${config.glow} backdrop-blur-sm transition-all duration-300`}
      >
        {/* Icon with animation */}
        <motion.span
          animate={
            config.animate
              ? {
                  rotate: [0, -10, 10, -10, 10, 0],
                }
              : {}
          }
          transition={
            config.animate
              ? {
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 1,
                }
              : {}
          }
          className="flex items-center justify-center"
        >
          {config.icon}
        </motion.span>

        {/* Label */}
        <span className="font-extrabold">{config.label}</span>

        {/* Shine effect */}
        <motion.div
          animate={{
            x: ['-200%', '200%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
        />
      </span>
    </motion.div>
  );
};