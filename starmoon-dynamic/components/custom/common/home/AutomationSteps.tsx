'use client'

import Image from "next/image"
import { motion } from "framer-motion"

const STEPS = [
  {
    id: 1,
    title: "Centralization",
    description: "Manage all your business operations from a single platform.",
    gif: "/Gif/mentorship.gif",
  },
  {
    id: 2,
    title: "Management",
    description: "Effortless management for maximum productivity.",
    gif: "/Gif/management (1).gif",
  },
  {
    id: 3,
    title: "Analytics",
    description: "Make data-driven decisions with real-time insights.",
    gif: "/Gif/analytics.gif",
  },
  {
    id: 4,
    title: "Nurturing",
    description: "Build long-term customer relationships effortlessly.",
    gif: "/Gif/management.gif",
  },
  {
    id: 5,
    title: "Strategic Planning",
    description: "Plan smarter, grow faster!",
    gif: "/Gif/strategic-planning.gif",
  },
]

export default function AutomationSteps() {
  return (
    <section className="w-full py-20 container mx-auto px-4 rounded-md">
      <div className="mx-auto px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-blue-600 dark:text-blue-400 mb-16">
          Let us help <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-sky-400 dark:from-blue-400 dark:to-sky-300">Automate your Business</span>
        </h2>
        <div className="hidden lg:grid grid-cols-2 gap-16 items-center">
          {/* Left column: Steps 1-3 vertical */}
          <div className="flex flex-col items-center gap-12 relative">
            {STEPS.slice(0, 3).map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.7, type: 'spring' }}
                viewport={{ once: true }}
                className="flex items-center gap-8 w-full"
              >
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-white dark:bg-slate-800 shadow-lg dark:shadow-slate-900/50 flex items-center justify-center mb-2 overflow-hidden border dark:border-slate-700">
                    <Image src={step.gif} alt={step.title + ' gif'} width={64} height={64} className="object-contain" />
                  </div>
                  {idx < 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.2 + 0.3, duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                      className="h-12 flex flex-col items-center justify-center"
                    >
                      <span className="w-1 h-8 bg-blue-200 dark:bg-blue-600/60 block rounded-full" />
                      <span className="w-1 h-4 bg-blue-100 dark:bg-blue-700/40 block rounded-full" />
                    </motion.div>
                  )}
                  {idx == 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.2 + 0.3, duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                      className="h-6 flex flex-col items-center justify-center"
                    >
                      <span className="w-1 h-4 bg-blue-200 dark:bg-blue-600/60 block rounded-full" />
                      <span className="w-1 h-2 bg-blue-100 dark:bg-blue-700/40 block rounded-full" />
                    </motion.div>
                  )}
                </div>
                <div className={`rounded-xl shadow-lg dark:shadow-slate-900/50 p-6 border border-gray-100 dark:border-slate-700 hover:shadow-xl dark:hover:shadow-slate-900/70 transition-shadow duration-300 w-full min-h-[150px] ${step.id === 1 ? 'bg-[#FFF1F2] dark:bg-slate-800/80' : step.id === 2 ? 'bg-[#FAF5FF] dark:bg-slate-800/80' : step.id === 3 ? 'bg-[#FFFBEB] dark:bg-slate-800/80' : step.id === 4 ? 'bg-[#EFF6FF] dark:bg-slate-800/80' : 'bg-[#ECFDF5] dark:bg-slate-800/80'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{step.id}.</span>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{step.title}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-lg">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Right column: Steps 4-5 vertical */}
          <div className="flex flex-col items-center gap-12 relative">
            {STEPS.slice(3).map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (idx + 3) * 0.2, duration: 0.7, type: 'spring' }}
                viewport={{ once: true }}
                className="flex items-center gap-8 w-full"
              >
                <div className="flex flex-col items-center">
                  {idx < 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: (idx + 3) * 0.2 + 0.3, duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                      className="h-6 flex flex-col items-center justify-center"
                    >
                      <span className="w-1 h-4 bg-blue-200 dark:bg-blue-600/60 block rounded-full" />
                    </motion.div>
                  )}
                  <div className="w-20 h-20 rounded-full bg-white dark:bg-slate-800 shadow-lg dark:shadow-slate-900/50 flex items-center justify-center mb-2 overflow-hidden border dark:border-slate-700">
                    <Image src={step.gif} alt={step.title + ' gif'} width={64} height={64} className="object-contain" />
                  </div>
                  {idx < 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: (idx + 3) * 0.2 + 0.3, duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                      className="h-12 flex flex-col items-center justify-center"
                    >
                      <span className="w-1 h-8 bg-blue-200 dark:bg-blue-600/60 block rounded-full" />
                    </motion.div>
                  )}
                  {idx == 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: (idx + 3) * 0.2 + 0.3,
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: 'reverse',
                      }}
                      className="w-full flex space-x-1"
                    >
                      <span className="flex-1 h-1 bg-blue-200 dark:bg-blue-600/60 rounded-l-full" />
                      <span className="flex-1 h-1 bg-blue-100 dark:bg-blue-700/40 rounded-r-full" />
                    </motion.div>
                  )}
                </div>
                <div className={`rounded-xl shadow-lg dark:shadow-slate-900/50 p-6 border border-gray-100 dark:border-slate-700 hover:shadow-xl dark:hover:shadow-slate-900/70 transition-shadow duration-300 flex-1 min-h-[150px] ${step.id === 1 ? 'bg-[#FFF1F2] dark:bg-slate-800/80' : step.id === 2 ? 'bg-[#FAF5FF] dark:bg-slate-800/80' : step.id === 3 ? 'bg-[#FFFBEB] dark:bg-slate-800/80' : step.id === 4 ? 'bg-[#EFF6FF] dark:bg-slate-800/80' : 'bg-[#ECFDF5] dark:bg-slate-800/80'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">{step.id}.</span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">{step.title}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-base max-w-xs">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Mobile/Tablet: Stack steps vertically */}
        <div className="lg:hidden flex flex-col items-center gap-12">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.7, type: 'spring' }}
              viewport={{ once: true }}
              className="flex items-center gap-6 w-full max-w-md"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-800 shadow-lg dark:shadow-slate-900/50 flex items-center justify-center mb-2 overflow-hidden border dark:border-slate-700">
                  <Image src={step.gif} alt={step.title + ' gif'} width={48} height={48} className="object-contain" />
                </div>
                {idx < STEPS.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.2 + 0.3, duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                    className="h-8 flex flex-col items-center justify-center"
                  >
                    <span className="w-1 h-6 bg-blue-200 dark:bg-blue-600/60 block rounded-full" />
                    <span className="w-1 h-2 bg-blue-100 dark:bg-blue-700/40 block rounded-full" />
                  </motion.div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{step.id}.</span>
                  <span className="text-xl font-bold text-gray-800 dark:text-white">{step.title}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-base max-w-xs">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 