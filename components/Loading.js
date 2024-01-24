import { AnimatePresence, motion } from 'framer-motion'

const loadingContainer = {
  width: '4rem',
  height: '4rem',
  display: 'flex',
  justifyContent: 'space-around',
}

const loadingCircle = {
  display: 'block',
  width: '1rem',
  height: '1rem',
  backgroundColor: '#03CEA4',
  borderRadius: '0.5rem',
}

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const loadingCircleVariants = {
  start: {
    y: '0%',
  },
  end: {
    y: '60%',
  },
}

const loadingCircleTransition = {
  duration: 0.4,
  yoyo: Infinity,
  ease: 'easeInOut',
}

export default function Loading() {
  return (
    <div className='z-50 h-full w-full'>
      <div className='flex h-full w-full items-center justify-center'>
        <AnimatePresence>
          <motion.div
            style={loadingContainer}
            variants={loadingContainerVariants}
            transition={loadingCircleTransition}
            initial='start'
            animate='end'
          >
            {Array.from({ length: 3 }, (_, i) => (
              <motion.span
                key={i}
                style={loadingCircle}
                variants={loadingCircleVariants}
                transition={loadingCircleTransition}
              ></motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
