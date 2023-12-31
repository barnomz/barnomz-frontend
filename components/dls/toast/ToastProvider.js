import ToastContext from '@/components/dls/toast/ToastService'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const open = (component) => {
    const id = Date.now()
    setToasts([...toasts, { id, component }])
  }

  const close = (id) => {
    setToasts(toasts.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ open, close }}>
      {children}
      <div className='absolute bottom-4 right-4 space-y-2'>
        <AnimatePresence>
          {toasts.map(({ id, component }) => (
            <motion.div
              key={id}
              layout
              initial={{ opacity: 0, x: 50, scale: 0.3 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.5 }}
            >
              <div className='relative' onClick={() => close(id)}>
                {component}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
