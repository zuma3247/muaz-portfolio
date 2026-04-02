import { motion } from "motion/react";
import { X, User } from "lucide-react";
import profileImage from "../assets/profile-image.png";
import { Breadcrumb } from "./Breadcrumb";
import { Footer } from "./Footer";

interface AboutSectionProps {
  onBack: () => void;
  onNavigate: (section: "hub" | "about" | "work-experience" | "contact" | "leadership" | "design" | "technology" | "websterleads") => void;
}

export function AboutSection({ onBack, onNavigate }: AboutSectionProps) {
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
        className="fixed top-8 left-8 z-40 w-14 h-14 rounded-full glass flex items-center justify-center hover:glow-orange transition-all group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Go back to hub"
      >
        <X className="w-6 h-6 text-white group-hover:text-burnt-orange transition-colors" />
      </motion.button>

      {/* Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 pt-24 pb-16 md:py-24">
        {/* Breadcrumb */}
        <Breadcrumb
          onHomeClick={onBack}
          items={[
            { label: "About Me" }
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
            <User className="w-8 h-8 md:w-10 md:h-10 text-burnt-orange" />
          </div>
          <h1
            className="text-white tracking-widest"
            style={{ letterSpacing: "0.2em" }}
          >
            ABOUT ME
          </h1>
        </motion.header>

        {/* Main content */}
        <section className="grid md:grid-cols-2 gap-12 items-start">
          {/* Profile image */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="glass rounded-lg overflow-hidden glow-orange p-2">
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-auto rounded-lg"
              />
            </div>
            
            {/* Decorative elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 border-2 border-burnt-orange/20 rounded-lg"
              animate={{
                rotate: [0, 3, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-burnt-orange/15 rounded-lg"
              animate={{
                rotate: [0, -3, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-6"
          >
            <div className="glass rounded-lg p-8">
              <div className="mb-6">
                <h2 className="text-burnt-orange tracking-wide mb-2">
                  As Salaamu Alaykum!
                </h2>
                <p className="text-white/70 text-sm italic">
                  (Peace be upon you!)
                </p>
              </div>
              
              <div className="space-y-4 text-white/90 leading-relaxed">
                <p>
                  I'm Muaz. As a Computer Science student with a designer's eye and a leader's mindset, 
                  my passion lies in creating technology that feels intuitive and brings people together.
                </p>
                
                <p>
                  My journey as an international student at Webster University has been defined by a drive to 
                  build community and create opportunities. As President of the Computer Science Club, I've had 
                  the privilege of launching our university's first-ever hackathon, coding competition, and 
                  student tech expo. In my leadership roles with the Muslim Student Association, I've focused 
                  on creating inclusive spaces for cultural and faith-based dialogue.
                </p>
                
                <p>
                  Academically, I'm fascinated by the intersection of human-computer interaction and elegant design. 
                  Whether I'm developing a full-stack app, designing a UI in Figma, or managing social media for 
                  campus activities, my goal is always the same: to solve problems with empathy and build solutions 
                  that are both functional and beautiful.
                </p>
              </div>
            </div>

            {/* Skills/Stats */}
            <div className="grid grid-cols-3 gap-4">
              <motion.div
                className="glass rounded-lg p-4 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-burnt-orange mb-2">4 Years</div>
                <div className="text-white/85 text-sm">as a Designer</div>
              </motion.div>
              
              <motion.div
                className="glass rounded-lg p-4 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-burnt-orange mb-2">Emerging</div>
                <div className="text-white/85 text-sm">Leader</div>
              </motion.div>
              
              <motion.div
                className="glass rounded-lg p-4 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-burnt-orange mb-2">Technology</div>
                <div className="text-white/85 text-sm">Enthusiast</div>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>

      <div className="relative z-10">
        <Footer onNavigate={onNavigate} activeSection="about" />
      </div>
    </motion.div>
  );
}
