import { motion } from "motion/react";
import { ArrowLeft, Mail, Linkedin, MessageSquare } from "lucide-react";
import { Breadcrumb } from "./Breadcrumb";

interface ContactSectionProps {
  onBack: () => void;
}

export function ContactSection({ onBack }: ContactSectionProps) {
  return (
    <motion.div
      className="min-h-screen bg-[#0a0e1a] relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Back button */}
      <motion.button
        onClick={onBack}
        className="fixed top-8 right-8 z-40 w-14 h-14 rounded-full glass flex items-center justify-center hover:glow-orange transition-all group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-6 h-6 text-white group-hover:text-burnt-orange transition-colors" />
      </motion.button>

      {/* Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 py-16 md:px-8 md:py-24">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Hub", onClick: onBack },
            { label: "Contact" }
          ]}
        />

        {/* Header */}
        <motion.header
          className="flex items-center gap-6 mb-16"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg glass flex items-center justify-center glow-orange">
            <MessageSquare className="w-8 h-8 md:w-10 md:h-10 text-burnt-orange" />
          </div>
          <h1
            className="text-white tracking-widest"
            style={{ letterSpacing: "0.2em" }}
          >
            CONTACT
          </h1>
        </motion.header>

        {/* Main content */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-8"
        >
          {/* Intro text */}
          <div className="glass rounded-lg p-8 text-center">
            <h2 className="text-white mb-4">Let's Connect</h2>
            <p className="text-white/85 max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. 
              Feel free to reach out through any of the channels below.
            </p>
          </div>

          {/* Contact cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Email card */}
            <motion.a
              href="mailto:muazuddin12@gmail.com"
              className="glass rounded-lg p-8 block group cursor-pointer relative"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-lg bg-burnt-orange/10 flex items-center justify-center group-hover:bg-burnt-orange/20 transition-colors">
                  <Mail className="w-7 h-7 text-burnt-orange" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white mb-2 group-hover:text-burnt-orange transition-colors">
                    Email
                  </h3>
                  <p className="text-white/75 mb-3">
                    Drop me a line anytime
                  </p>
                  <div className="text-burnt-orange/80 group-hover:text-burnt-orange transition-colors">
                    muazuddin12@gmail.com
                  </div>
                </div>
              </div>
              
              {/* Hover glow */}
              <motion.div
                className="absolute inset-0 rounded-lg pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{
                  boxShadow: "0 0 30px rgba(227, 107, 61, 0.3)",
                }}
              />
            </motion.a>

            {/* LinkedIn card */}
            <motion.a
              href="https://www.linkedin.com/in/muazuddin-mohammed/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-lg p-8 block group cursor-pointer relative"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-lg bg-burnt-orange/10 flex items-center justify-center group-hover:bg-burnt-orange/20 transition-colors">
                  <Linkedin className="w-7 h-7 text-burnt-orange" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white mb-2 group-hover:text-burnt-orange transition-colors">
                    LinkedIn
                  </h3>
                  <p className="text-white/75 mb-3">
                    Let's connect professionally
                  </p>
                  <div className="text-burnt-orange/80 group-hover:text-burnt-orange transition-colors">
                    linkedin.com/in/muazuddin-mohammed
                  </div>
                </div>
              </div>
              
              {/* Hover glow */}
              <motion.div
                className="absolute inset-0 rounded-lg pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{
                  boxShadow: "0 0 30px rgba(227, 107, 61, 0.3)",
                }}
              />
            </motion.a>
          </div>

          {/* Additional info */}
          <div className="glass rounded-lg p-8">
            <h3 className="text-white mb-4 text-center">Response Time</h3>
            <p className="text-white/75 text-center">
              I typically respond to emails within 24-48 hours. For urgent matters, 
              please mention "URGENT" in the subject line.
            </p>
          </div>

          {/* Decorative elements */}
          <div className="flex justify-center gap-4 pt-8">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-burnt-orange/30"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </motion.section>
      </main>
    </motion.div>
  );
}
