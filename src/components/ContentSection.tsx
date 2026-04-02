import { motion } from "motion/react";
import React, { useState } from "react";
import { X, TrendingUp, PenTool, Cpu, Github, ArrowRight } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { Breadcrumb } from "./Breadcrumb";
import { Footer } from "./Footer";
import ifgstlImage from "../assets/ifgstl-image.png";
import ifgstlBackdrop from "../assets/ifgstl-backdrop.png";
import ifgstlBooklet from "../assets/ifgstl-booklet.png";
import ifgstlBookletSpreads from "../assets/ifgstl-booklet-spreads.png";
import ifgstlFlyer from "../assets/ifgstl-flyer.png";
import websterCollage from "../assets/webster-collage.png";
import websterCasinoNight from "../assets/webster-casino-night.png";
import websterLaserTag from "../assets/webster-laser-tag.png";
import websterMatchDay from "../assets/webster-match-day.png";
import websterFormalDance from "../assets/webster-formal-dance.png";
import websterVideo from "../assets/webster-video.png";
import parentHappiness1 from "../assets/parent-happiness1.png";
import parentHappiness2 from "../assets/parent-happiness2.png";
import parentHappiness3 from "../assets/parent-happiness3.png";
import parentHappiness4 from "../assets/parent-happiness4.png";
import generalDesign2 from "../assets/general-design2.png";
import generalDesign3 from "../assets/general-design3.png";
import generalDesign4 from "../assets/general-design4.png";
import generalDesign5 from "../assets/general-design5.png";
import cscImage1 from "../assets/csc-image1.png";
import cscImage2 from "../assets/csc-image2.png";
import cscImage3 from "../assets/csc-image3.png";
import cscImage4 from "../assets/csc-image4.png";
import cscImage5 from "../assets/csc-image5.png";
import msaImage from "../assets/msa-image.png";
import websterLeadsImage from "../assets/webster-leads-image.png";
import gslsImage1 from "../assets/gsls-image1.png";
import gslsImage2 from "../assets/gsls-image2.png";
import gslsImage3 from "../assets/gsls-image3.png";
import imposterImage1 from "../assets/imposter-image1.png";
import imposterImage2 from "../assets/imposter-image2.png";
import programmingImage from "../assets/programming-image.png";
import syncSpaceLogo from "../assets/sync-space-logo.png";
import syncSpaceMockup from "../assets/sync-space-mockup.png";
import vybezLogo from "../assets/vybez-logo.png";
import vybezMobile from "../assets/vybez-mobile.png";
import vybezOriginal from "../assets/vybez-original.png";
import judgeHackRubric from "../assets/judge-hack-rubric.png";
import judgeHackScoreboard from "../assets/judge-hack-scoreboard.png";
import runtimeDash from "../assets/runtime-dash.png";
import runtimeKanban from "../assets/runtime-kanban.png";
import runtimeMatrix from "../assets/runtime-matrix.png";
import runtimeAssignment from "../assets/runtime-assignment.png";

interface Project {
  title: string;
  description: string | React.ReactNode;
  imageUrl?: string;
  images?: string[];
  fullDescription?: string | React.ReactNode;
  technologies?: string[];
  role?: string;
  year?: string;
  technologiesLabel?: string;
  actionButton?: {
    label: string;
    url: string;
  };
}

interface ContentSectionProps {
  section: "leadership" | "design" | "technology";
  onBack: () => void;
  onNavigate: (section: "hub" | "about" | "work-experience" | "contact" | "leadership" | "design" | "technology" | "websterleads") => void;
}

const sectionData = {
  leadership: {
    title: "LEADERSHIP",
    icon: TrendingUp,
    projects: [
      {
        title: "Global Student Leadership Summit (GSLS)",
        description:
          "Selected as one of four student leaders to represent the St. Louis campus at the GSLS in Geneva, Switzerland. The summit focused on leading organizations with positive social impact, tackling global campus issues, and personal leadership development.",
        images: [
          gslsImage1,
          gslsImage2,
          gslsImage3,
        ],
        fullDescription:
          "Selected as one of four student leaders to represent the St. Louis campus at the Global Student Leadership Summit in Geneva, Switzerland.\n\nThe summit brought together student leaders from around the world to focus on leading organizations with positive social impact, tackling global campus issues, and developing personal leadership capabilities through interactive workshops and cross-cultural collaboration.",
        role: "St. Louis Delegate",
        year: "Spring 2025",
        technologies: ["Global Leadership", "Social Impact", "Team Building", "Cross-Cultural Communication"],
        technologiesLabel: "Skills",
      },
      {
        title: "WebsterLEADS Certification",
        description:
          "A four-semester certificate program involving academic coursework, practical leadership experiences, and mentorship. A highlight initiative I coordinated was the 'Empathy Exchange Initiative' to boost mental health awareness and support on campus.",
        imageUrl: websterLeadsImage,
        fullDescription:
          "Participating in a comprehensive four-semester certificate program that combines academic coursework, practical leadership experiences, and mentorship opportunities. The program focuses on developing leadership competencies through experiential learning.\n\nAs part of this program, I coordinated the 'Empathy Exchange Initiative,' a campus-wide project designed to boost mental health awareness and create support systems for students.",
        role: "Participant (International Distinction)",
        year: "Ongoing",
        technologies: ["Project Coordination", "Mentorship", "Community Health", "Portfolio Development"],
        technologiesLabel: "Skills",
      },
      {
        title: "Computer Science Club",
        description:
          "Organizing events that grant opportunities for personal development, competitions, networking, and entertainment. Key achievements include launching the first-ever coding competition, hackathon, and student tech expo at Webster.",
        images: [
          cscImage1,
          cscImage2,
          cscImage3,
          cscImage4,
          cscImage5,
        ],
        fullDescription:
          "Leading the Computer Science Club as President, organizing events that provide opportunities for personal development, competitive programming, networking, and community building.\n\nMajor accomplishments include launching Webster's first-ever coding competition, organizing the inaugural student-led hackathon, creating the first student tech expo to showcase student projects, and coordinating an AI Crossroads Panel featuring faculty experts to discuss the future of artificial intelligence.",
        role: "President (Current) / Vice President (Past)",
        year: "2024-2026",
        technologies: ["Event Management", "Community Building", "Networking", "Tech Outreach"],
        technologiesLabel: "Skills",
      },
      {
        title: "Muslim Student Association",
        description:
          "Coordinated with board members to host over 10 large-scale religious and cultural events, raising awareness about Islam and facilitating faith-related discussions during monthly meetings.",
        imageUrl: msaImage,
        fullDescription:
          "Served in multiple leadership roles within the Muslim Student Association, coordinating with board members to organize and execute over 10 large-scale religious and cultural events throughout the academic year.\n\nThese events focused on raising awareness about Islam, fostering interfaith dialogue, and creating a welcoming community for Muslim students. Also facilitated regular monthly meetings featuring faith-related discussions, guest speakers, and community engagement activities.",
        role: "Treasurer (Current) / President (Past)",
        year: "2023-Present",
        technologies: ["Board Management", "Event Planning", "Budgeting", "Public Speaking"],
        technologiesLabel: "Skills",
      },
    ],
  },
  design: {
    title: "DESIGN",
    icon: PenTool,
    projects: [
      {
        title: "IFGSTL 50th Anniversary Gala",
        description:
          "Created comprehensive event branding for the Islamic Foundation of Greater St. Louis's 50th Anniversary Gala under tight deadlines. Designed all marketing materials including the event flyer, presentation slides, photo backdrop for attendee pictures, and a professionally-formatted 68-page event booklet. The booklet featured the organization's history, mission, and achievements over five decades.",
        images: [
          ifgstlImage,
          ifgstlBackdrop,
          ifgstlBooklet,
          ifgstlBookletSpreads,
          ifgstlFlyer,
        ],
        fullDescription:
          "Created comprehensive event branding for the Islamic Foundation of Greater St. Louis's 50th Anniversary Gala under tight deadlines. Designed all marketing materials including the event flyer, presentation slides, photo backdrop for attendee pictures, and a professionally-formatted 68-page event booklet.\n\nThe booklet featured the organization's history, mission, and achievements over five decades.",
        role: "Event Branding Designer",
        year: "2025",
        technologies: ["Event Branding", "Graphic Design", "Adobe CC", "Canva"],
        technologiesLabel: "Tools & Skills",
        actionButton: {
          label: "View Booklet",
          url: "https://heyzine.com/flip-book/61dca6e9e3.html",
        },
      },
      {
        title: "WebsterU Campus Activities",
        description:
          "Responsible for designing engaging and informative social media content to promote events and activities for the Campus Activities board, reaching thousands of students.",
        images: [
          websterCollage,
          websterCasinoNight,
          websterLaserTag,
          websterMatchDay,
          websterFormalDance,
        ],
        fullDescription:
          "Serving as the Social Media Content Designer for Webster University's Campus Activities board, creating visually compelling designs that promote campus events and activities to the student body.\n\nResponsible for developing consistent branding across all social media platforms, designing event posters, Instagram stories, promotional graphics, and digital signage. Content reaches thousands of students and has significantly increased event attendance and student engagement.",
        role: "Social Media Content Designer",
        year: "2023-Present",
        technologies: ["Social Media", "Digital Marketing", "Content Creation", "Canva"],
        technologiesLabel: "Tools & Skills",
        actionButton: {
          label: "View Instagram",
          url: "https://www.instagram.com/gorlokcampusact/",
        },
      },
      {
        title: "Webster University Video Features",
        description:
          "Editing dynamic and engaging video content for Webster University's official social media channels, showcasing student life, campus facilities, and available resources to prospective and current students.",
        imageUrl: websterVideo,
        fullDescription:
          "Producing and editing professional video content for Webster University's official social media presence. Creating dynamic videos that showcase student life, highlight campus facilities, feature student success stories, and promote available resources and opportunities.\n\nWork includes filming, editing, color grading, sound design, and optimizing content for various social media platforms to engage both prospective and current students.",
        role: "Video Editor",
        year: "2023-2025",
        technologies: ["Video Editing", "Adobe Premiere Pro", "Storytelling", "Social Media"],
        technologiesLabel: "Tools & Skills",
        actionButton: {
          label: "View Instagram",
          url: "https://www.instagram.com/p/DM_Ge5Niv28/",
        },
      },
      {
        title: "Parent Happiness Center Wallpaper",
        description:
          "My first major design project. The task was to create a welcoming and relaxing environment for parent-admin meetings. The solution was a complete wallpaper design that showcased the school's values and mission.",
        images: [
          parentHappiness1,
          parentHappiness2,
          parentHappiness3,
          parentHappiness4,
        ],
        fullDescription:
          "Completed my first major design project for Al Ansar International School, creating an environmental design for the Parent Happiness Center. The objective was to transform the space into a welcoming and calming environment for parent-administrator meetings.\n\nDesigned a comprehensive wall graphic that incorporated the school's core values, mission statement, and visual identity. The large-format design was professionally printed and installed, creating an inspiring atmosphere that reinforced the school's commitment to parent engagement.",
        role: "Graphic Designer",
        year: "2021",
        technologies: ["Environmental Design", "Graphic Design", "Large Format Printing", "Adobe Illustrator"],
        technologiesLabel: "Tools & Skills",
      },
      {
        title: "General Graphic Design",
        description:
          "A variety of freelance and project-based graphic design work, including logos, infographics, social media assets, and print materials for various clients and organizations.",
        images: [
          generalDesign2,
          generalDesign3,
          generalDesign4,
          generalDesign5,
        ],
        fullDescription:
          "Engaged in diverse freelance and project-based graphic design work across multiple industries and clients. Portfolio includes logo design and brand identity development, infographic creation for presentations and reports, social media assets and digital marketing materials, print designs including flyers, brochures, and posters, and presentation design for corporate and educational settings.\n\nDeveloped strong client relations skills through managing multiple projects simultaneously and adapting to various brand guidelines and design requirements.",
        role: "Graphic Designer",
        year: "2021-Present",
        technologies: ["Adobe Creative Suite", "Canva", "Figma", "Client Relations"],
        technologiesLabel: "Tools & Skills",
      },
    ],
  },
  technology: {
    title: "TECHNOLOGY",
    icon: Cpu,
    projects: [
      {
        title: "JudgeHack: Real-Time Hackathon Judging Platform",
        description:
          "A mobile-first, real-time judging platform developed for Hackfest 26 to eliminate manual tallying errors and instantly aggregate complex rubric scores from dozens of judges.",
        images: [
          judgeHackScoreboard,
          judgeHackRubric,
        ],
        fullDescription: (
          <>
            <p><strong>The Problem:</strong> Traditional hackathon judging often relies on paper scoresheets or static spreadsheets, leading to lost data, manual tallying errors, and significant delays in announcing winners. For <a href="https://csclub-webster-university.github.io/hackfest/" target="_blank" rel="noopener noreferrer" className="text-burnt-orange hover:underline decoration-white underline-offset-4">Hackfest 26</a>, a multi-discipline event (CS, Game Design, Business), the challenge was to aggregate complex rubric scores and "diversifier" bonuses from dozens of judges in real-time without the friction of account creation.</p>
            <p className="mt-4"><strong>The Solution:</strong> I developed a mobile-first, real-time judging platform tailored for <a href="https://csclub-webster-university.github.io/hackfest/" target="_blank" rel="noopener noreferrer" className="text-burnt-orange hover:underline decoration-white underline-offset-4">Hackfest 26</a>.</p>
            <p className="mt-4">The system features a password-less, link-based authentication system, allowing judges to simply click a personalized link to access their assigned projects. The intuitive interface provides a dynamic rubric tied instantly to the backend, enabling immediate score calculation and instant leaderboard updates for organizers. The platform successfully processed all team evaluations, eliminating tallying errors and significantly reduced the time to announce winners.</p>
          </>
        ),
        role: "Full-Stack Developer",
        year: "Spring 2026",
        technologies: ["React", "Firebase", "Mobile-First Design", "Hackathon"],
        technologiesLabel: "Technologies",
      },
      {
        title: "RunTime: Hackathon Management Pipeline",
        description:
          "A comprehensive dashboard that streamlined Hackfest 26 operations by centralizing participant data, team formation, and logistical tracking into a unified pipeline.",
        images: [
          runtimeDash,
          runtimeKanban,
          runtimeMatrix,
          runtimeAssignment,
        ],
        fullDescription: (
          <>
            <p><strong>The Problem:</strong> Organizing a 50+ person hackathon like <a href="https://csclub-webster-university.github.io/hackfest/" target="_blank" rel="noopener noreferrer" className="text-burnt-orange hover:underline decoration-white underline-offset-4">Hackfest 26</a> involves tracking participant registration, dietary restrictions, team formation, and project submissions across disparate tools. This fragmentation creates data silos, miscommunication, and logistical nightmares for the organizing team.</p>
            <p className="mt-4"><strong>The Solution:</strong> To streamline <a href="https://csclub-webster-university.github.io/hackfest/" target="_blank" rel="noopener noreferrer" className="text-burnt-orange hover:underline decoration-white underline-offset-4">Hackfest 26</a> operations, I built RunTime, a comprehensive dashboard integrating multiple data streams into a single unified pipeline.</p>
            <p className="mt-4">RunTime centralizes participant data, providing organizers with real-time analytics on attendance, demographics, and dietary needs. The platform features a dynamic Kanban board for task management, a matrix for team formation and room allocation, and automated communication tools for announcements. This unified system improved organizer efficiency by 40% and ensured a seamless experience for participants and sponsors.</p>
          </>
        ),
        role: "Full-Stack Developer",
        year: "Spring 2026",
        technologies: ["React", "Dashboard Design", "Data Visualization", "Management"],
        technologiesLabel: "Technologies",
      },
      {
        title: "Imposter Hackathon Project @ PICKHACKS 2025",
        description:
          "Developed a comprehensive UI in Figma for a mixed-reality 'Among Us' style game. This project was honored with the Community Vote Award for best project at the hackathon.",
        images: [
          imposterImage1,
          imposterImage2,
        ],
        fullDescription:
          "Participated in PICKHACKS 2025 and created a complete user interface design for a mixed-reality game inspired by 'Among Us.' The project combined traditional gaming mechanics with augmented reality elements, creating an innovative social deduction experience.\n\nDesigned all UI screens, interactive elements, and user flows in Figma, focusing on intuitive navigation and immersive gameplay. The project received the Community Vote Award, recognizing it as the most popular project among hackathon attendees.",
        role: "UI/UX Designer",
        year: "Spring 2025",
        technologies: ["Figma", "UI/UX Design", "Mixed Reality", "Hackathon"],
        technologiesLabel: "Technologies",
      },
      {
        title: "Applied Programming Concepts Repository",
        description:
          "A personal code repository of all practice programs and solutions developed throughout my computer science degree.",
        imageUrl: programmingImage,
        fullDescription:
          "Maintaining a comprehensive GitHub repository containing practice programs, coding exercises, and project solutions developed throughout my computer science degree at Webster University. The repository covers fundamental programming concepts, data structures, algorithms, object-oriented programming, database design, and software engineering principles.\n\nOrganized by language and topic area for easy reference. View the repository at: github.com/zuma3247/Practice-Programs",
        role: "Student Developer",
        year: "2023-Present",
        technologies: ["C++", "Python", "Java", "SQL", "Git"],
        technologiesLabel: "Technologies",
      },
      {
        title: "Blender 3D Modeling Workshop",
        description:
          "Received a Commendation Award for leading a 10-day workshop teaching 3D modeling fundamentals in Blender to young students in Dubai, UAE.",
        imageUrl:
          "https://images.unsplash.com/photo-1667855766927-9d0c8fa1965a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGVuZGVyJTIwM2R8ZW58MXx8fHwxNzYwMzA1NzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        fullDescription:
          "Designed and delivered a 10-day intensive workshop teaching 3D modeling fundamentals using Blender to young students in Dubai, UAE. The curriculum covered basic modeling techniques, materials and textures, lighting setups, and rendering workflows.\n\nCreated hands-on exercises and projects that progressively built students' skills and confidence. Received a Commendation Award recognizing outstanding instruction and positive student impact. Successfully introduced creative technology concepts to students with no prior 3D modeling experience.",
        role: "Workshop Lead",
        year: "Fall 2020",
        technologies: ["Blender", "3D Modeling", "Teaching", "Leadership"],
        technologiesLabel: "Technologies",
      },
    ],
  },
};

export function ContentSection({ section, onBack, onNavigate }: ContentSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const data = sectionData[section];
  const Icon = data.icon;

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
      <main className="relative z-10 max-w-7xl mx-auto px-4 pt-24 pb-16 md:py-24">
        {/* Breadcrumb */}
        <Breadcrumb
          onHomeClick={onBack}
          items={[
            { label: data.title }
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
            <Icon className="w-8 h-8 md:w-10 md:h-10 text-burnt-orange" />
          </div>
          <h1
            className="text-white tracking-widest"
            style={{ letterSpacing: "0.2em" }}
          >
            {data.title}
          </h1>
        </motion.header>

        {section === "technology" && (
          <motion.a
            href="https://github.com/zuma3247"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 mb-8 rounded-xl glass border border-white/10 hover:border-burnt-orange/40 transition-all group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            whileHover={{ scale: 1.01 }}
          >
            <Github className="w-8 h-8 text-white/80 group-hover:text-burnt-orange transition-colors shrink-0" />
            <div className="flex-1">
              <p className="text-white font-semibold">View my work on GitHub</p>
              <p className="text-white/50 text-sm">github.com/zuma3247</p>
            </div>
            <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-burnt-orange transition-all group-hover:translate-x-1 shrink-0" />
          </motion.a>
        )}

        {/* Projects grid */}
        <motion.section
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* First project is large, spans full width */}
          <ProjectCard
            {...data.projects[0]}
            onClick={() => setSelectedProject(data.projects[0])}
            isLarge={true}
          />

          {/* Remaining projects in 2-column grid */}
          {data.projects.slice(1).map((project, index) => (
            <ProjectCard
              key={index}
              {...project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </motion.section>
      </main>

        <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <div className="relative z-10 mt-16 text-left">
        <Footer onNavigate={onNavigate} activeSection={section} />
      </div>
    </motion.div>
  );
}
