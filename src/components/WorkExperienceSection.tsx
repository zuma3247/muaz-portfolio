import { motion } from "motion/react";
import { X, Briefcase, Calendar, MapPin } from "lucide-react";
import { Breadcrumb } from "./Breadcrumb";
import { useState } from "react";
import { Footer } from "./Footer";

interface WorkExperienceProps {
  onBack: () => void;
  onNavigate: (section: "hub" | "about" | "work-experience" | "contact" | "leadership" | "design" | "technology" | "websterleads") => void;
}

interface Experience {
  company: string;
  position: string;
  location: string;
  duration: string;
  description: string;
  achievements: string[];
  current?: boolean;
}

const experiences: Experience[] = [
  {
    company: "Islamic Foundation of Greater St. Louis",
    position: "Database & IT Intern",
    location: "St. Louis, MO",
    duration: "Fall 2025 – December 2025",
    description:
      "Developed a full-stack web app for Sunday Madrassa using Next.js, Firebase, and Genkit AI. Automated class roster generation with SQL and built a Notion-based IT ticketing system.\n\nLed Chromebook setup for MAP testing (70+ devices) and analyzed network performance via Cisco Meraki.",
    achievements: [
      "Built full-stack Sunday Madrassa web app with Next.js, Firebase, and AI integration",
      "Automated class roster generation using SQL, reducing manual work by 80%",
      "Designed and implemented Notion-based IT ticketing system for staff",
      "Managed Chromebook deployment for 70+ devices for standardized testing",
      "Analyzed and optimized network performance using Cisco Meraki dashboard",
    ],
  },
  {
    company: "Campus Activities, Webster University",
    position: "Graphic Designer & Social Media Manager",
    location: "St. Louis, MO",
    duration: "Jan 2023 - Present",
    description:
      "Collaborated with team members to create marketing materials for over 200 campus events across print and digital platforms.\n\nRedesigned and upgraded the internal SharePoint website to enhance user experience and functionality.",
    achievements: [
      "Designed marketing materials for 200+ campus events reaching thousands of students",
      "Created cohesive visual branding across print and digital platforms",
      "Redesigned internal SharePoint website improving team collaboration",
      "Increased event attendance through strategic social media campaigns",
      "Managed multiple concurrent projects under tight deadlines",
    ],
    current: true,
  },
  {
    company: "Webster University (Global Marketing)",
    position: "Marketing and Communications Intern",
    location: "St. Louis, MO",
    duration: "Jul 2023 - Sep 2025",
    description:
      "Developing creative designs for Webster's global brand to be used across multiple campuses.\n\nCreating visually appealing content for prospective students and producing videos showcasing student life, buildings, and facilities.",
    achievements: [
      "Developed creative designs for Webster's global brand identity",
      "Created marketing content distributed across international campuses",
      "Produced engaging videos showcasing campus life and facilities",
      "Designed materials targeting prospective students for recruitment",
      "Collaborated with global marketing team on brand consistency",
    ],
  },
  {
    company: "Al Ansar International School",
    position: "Graphic Designer (Internship)",
    location: "Dubai, UAE",
    duration: "Aug 2021 - Aug 2022",
    description:
      "Executed the wallpaper design for the Parent Happiness Center and created social media content for the entire academic year.\n\nProduced professional photography and infographics for promoting Sustainable Development Goals.",
    achievements: [
      "Designed and executed large-format environmental graphics for Parent Happiness Center",
      "Created comprehensive social media content strategy for full academic year",
      "Produced professional photography for school events and promotional materials",
      "Designed infographics promoting UN Sustainable Development Goals",
      "Managed multiple design projects simultaneously for various school departments",
    ],
  },
];

export function WorkExperienceSection({ onBack, onNavigate }: WorkExperienceProps) {
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const scrollToExperience = (index: number) => {
    const element = document.getElementById(`experience-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setActiveSection(index);
    }
  };

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

      {/* Jump Links - Sticky on desktop */}
      <motion.nav
        className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-30"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="glass rounded-lg p-4">
          <p className="text-white/85 text-xs mb-3 uppercase tracking-wider">Jump to</p>
          <div className="space-y-2">
            {experiences.map((exp, index) => (
              <button
                key={index}
                onClick={() => scrollToExperience(index)}
                className={`block w-full text-left px-3 py-2 rounded text-xs transition-all ${
                  activeSection === index
                    ? "bg-burnt-orange/20 text-burnt-orange font-bold"
                    : "text-white/85 hover:text-burnt-orange hover:bg-white/5"
                }`}
              >
                {exp.company.split(' ').slice(0, 2).join(' ')}
              </button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 pt-24 pb-16 md:py-24">
        {/* Breadcrumb */}
        <Breadcrumb
          onHomeClick={onBack}
          items={[
            { label: "Work Experience" }
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
            <Briefcase className="w-8 h-8 md:w-10 md:h-10 text-burnt-orange" />
          </div>
          <h1
            className="text-white tracking-widest"
            style={{ letterSpacing: "0.2em" }}
          >
            WORK EXPERIENCE
          </h1>
        </motion.header>

        {/* Timeline */}
        <section className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-burnt-orange/30" />

          {/* Experiences */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.article
                key={index}
                id={`experience-${index}`}
                className="relative pl-20 md:pl-28"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                onViewportEnter={() => setActiveSection(index)}
                viewport={{ margin: "-40% 0px -40% 0px" }}
              >
                {/* Timeline dot */}
                <motion.div
                  className={`absolute left-6 md:left-9 top-6 w-5 h-5 rounded-full border-2 ${
                    exp.current
                      ? "bg-burnt-orange border-burnt-orange"
                      : "bg-navy border-burnt-orange/50"
                  }`}
                  animate={
                    exp.current
                      ? {
                          boxShadow: [
                            "0 0 0 0 rgba(227, 107, 61, 0.4)",
                            "0 0 0 8px rgba(227, 107, 61, 0)",
                          ],
                        }
                      : {}
                  }
                  transition={
                    exp.current
                      ? {
                          duration: 2.5,
                          repeat: Infinity,
                        }
                      : {}
                  }
                />

                {/* Experience card */}
                <motion.div
                  className="glass rounded-lg p-6 md:p-8 hover:glow-orange transition-all"
                  whileHover={{ y: -4 }}
                >
                  {/* Header */}
                  <div className="mb-4">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h3 className="text-white">{exp.position}</h3>
                      {exp.current && (
                        <span className="px-3 py-1 bg-burnt-orange/20 border border-burnt-orange/50 rounded text-burnt-orange text-sm">
                          Current
                        </span>
                      )}
                    </div>
                    <h4 className="text-burnt-orange mb-3">{exp.company}</h4>

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-4 text-white/80 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="text-white/85 mb-4 space-y-3">
                    {exp.description.split('\n\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Achievements */}
                  <div>
                    <h5 className="text-white/90 mb-3">Key Achievements:</h5>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-3 text-white/85"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 + i * 0.05 }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange mt-2 flex-shrink-0" />
                          <span>{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Download Resume CTA */}
        <motion.aside
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="glass rounded-lg p-8 inline-block">
            <h3 className="text-white mb-4">Interested in learning more?</h3>
            <p className="text-white/85 mb-6">
              Download my full resume for detailed information about my experience and skills.
            </p>
            <motion.a
              href="https://drive.google.com/uc?export=download&id=1zgcCdHu7EQkmsXhl7MatkqvcMEjI60u6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-burnt-orange hover:bg-burnt-orange/80 text-white rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </motion.a>
          </div>
        </motion.aside>
      </main>

      <div className="relative z-10 mt-16">
        <Footer onNavigate={onNavigate} activeSection="work-experience" />
      </div>
    </motion.div>
  );
}
