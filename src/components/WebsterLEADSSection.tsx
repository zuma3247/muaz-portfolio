import { motion } from "motion/react";
import { useState } from "react";
import {
  ArrowLeft, Award, Heart, CheckCircle, Star, Shield, Zap,
  Globe, Cpu, PenTool, BookOpen, Users, TrendingUp
} from "lucide-react";
import { Breadcrumb } from "./Breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Footer } from "./Footer";

interface WebsterLEADSSectionProps {
  onBack: () => void;
  onNavigate: (section: "hub" | "about" | "work-experience" | "contact" | "leadership" | "design" | "technology" | "websterleads") => void;
}

type SubSection = "philosophy" | "growth" | "ethics" | "ples" | "international";

const TAB_DEFS: { id: SubSection; label: string; shortLabel: string }[] = [
  { id: "philosophy",    label: "A — Leadership Philosophy", shortLabel: "Philosophy"    },
  { id: "growth",        label: "B — My Growth",             shortLabel: "Growth"        },
  { id: "ethics",        label: "C — Ethics Reflection",     shortLabel: "Ethics"        },
  { id: "ples",          label: "D — Practical Experiences", shortLabel: "PLEs"          },
  { id: "international", label: "E — International",         shortLabel: "International" },
];

// ── Sub-section A: Leadership Philosophy ────────────────────────────────────

const coreValues = [
  { name: "Empathy",        icon: Heart,        desc: "Understand before guiding.", compass: "Start by grasping how decisions affect real people." },
  { name: "Accountability", icon: CheckCircle,  desc: "Own promises and create a culture where others can, too.", compass: "Convert intentions into owned commitments." },
  { name: "Excellence",     icon: Star,         desc: "Chase improvement, not perfection, in every deliverable.", compass: "Nudge every idea one step better than yesterday." },
  { name: "Loyalty",        icon: Shield,       desc: "Protect trust and stand by teammates, especially under pressure.", compass: "Guard relationships so trust holds under pressure." },
  { name: "Innovation",     icon: Zap,          desc: "Shatter expectations by experimenting boldly and learning fast.", compass: "Stay curious enough to redraw the map when needed." },
];

const keyBehaviours = [
  "Listen, then frame the \"why.\"",
  "Co-create clear, doable steps (task orientation).",
  "Hand over the mic — share autonomy and recognition (people orientation).",
  "Celebrate wins and failures as learning fuel.",
];

function PhilosophyTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-10"
    >
      {/* Pull quote */}
      <blockquote className="border-l-4 border-burnt-orange pl-6 py-2">
        <p className="text-white/90 text-lg md:text-xl italic leading-relaxed">
          "No one should follow me. I'm human. I'm prone to error and forgetfulness.
          But I invite everyone to walk with me so we can progress together."
        </p>
      </blockquote>

      <p className="text-white/70 leading-relaxed">
        Leadership is a shared journey that blends relationships and results. Five actionable
        core values anchor how I lead:
      </p>

      {/* Core value cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {coreValues.map(({ name, icon: Icon, desc }, i) => (
          <motion.div
            key={name}
            className="glass rounded-xl p-5 flex gap-4 items-start"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="w-10 h-10 rounded-lg bg-burnt-orange/20 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-burnt-orange" />
            </div>
            <div>
              <h4 className="text-burnt-orange font-semibold tracking-wide mb-1">{name}</h4>
              <p className="text-white/65 text-sm leading-relaxed">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Key behaviours */}
      <div>
        <h3 className="text-white font-semibold tracking-wider mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-burnt-orange" /> Key Behaviours
        </h3>
        <ol className="space-y-3">
          {keyBehaviours.map((b, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-burnt-orange/20 text-burnt-orange text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-white/75 leading-relaxed">{b}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="glass rounded-xl p-5 border border-burnt-orange/30">
        <p className="text-white/80 leading-relaxed">
          <span className="text-burnt-orange font-semibold">Why walk with me?</span>{" "}
          I take calculated risks, share credit, and refuse to pretend that I'm perfect.
          Together, we move farther than any one of us could alone.
        </p>
      </div>
    </motion.div>
  );
}

// ── Sub-section B: Leadership Growth ────────────────────────────────────────

const takeaways = [
  { num: 1, text: "Humility plus evidence — I tend to underrate myself, so I'll seek feedback before judging my impact." },
  { num: 2, text: "Balanced style — Effective leadership means walking with people while clearing the trail." },
  { num: 3, text: "Voice the vision sooner — Since others already hear conviction, I should trust that voice and articulate purpose earlier." },
];

function GrowthTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-10"
    >
      {/* SLPI highlights */}
      <div>
        <h3 className="text-white font-semibold tracking-wider mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-burnt-orange" /> SLPI 360° Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass rounded-xl p-5 border border-green-400/20">
            <h4 className="text-green-400 font-semibold mb-3 tracking-wide">Spot-On Moments ✓</h4>
            <p className="text-white/75 text-sm leading-relaxed">
              On the SLPI 360 my observers rated me a perfect <strong className="text-white">5.0</strong> on{" "}
              <em>"Fosters cooperative relationships"</em> and{" "}
              <em>"Treats people with respect,"</em> confirming my natural people-oriented tendency
              to create safe, collaborative spaces.
            </p>
          </div>
          <div className="glass rounded-xl p-5 border border-amber-400/20">
            <h4 className="text-amber-400 font-semibold mb-3 tracking-wide">Head-Tilt Moments 🤔</h4>
            <p className="text-white/75 text-sm leading-relaxed">
              The same inventory showed me lagging in <em>"Inspire a Shared Vision,"</em> yet my peers
              scored me almost <strong className="text-white">ten points higher</strong> than I scored myself.
              Realising that I already project conviction more strongly than I notice revealed an emerging
              task orientation I've been underestimating.
            </p>
          </div>
        </div>
      </div>

      {/* Key takeaways */}
      <div>
        <h3 className="text-white font-semibold tracking-wider mb-4">Key Takeaways</h3>
        <div className="space-y-3">
          {takeaways.map(({ num, text }) => (
            <div key={num} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-burnt-orange/20 text-burnt-orange text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {num}
              </span>
              <p className="text-white/75 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Guiding compass */}
      <div>
        <h3 className="text-white font-semibold tracking-wider mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-burnt-orange" /> Guiding Compass
        </h3>
        <p className="text-white/60 text-sm mb-4">
          My five core values act less like a rulebook and more like a compass:
        </p>
        <div className="space-y-3">
          {coreValues.map(({ name, icon: Icon, compass }) => (
            <div key={name} className="flex items-start gap-3 glass rounded-lg p-3">
              <Icon className="w-4 h-4 text-burnt-orange mt-0.5 shrink-0" />
              <div>
                <span className="text-burnt-orange font-semibold text-sm">{name}</span>
                <span className="text-white/65 text-sm"> — {compass}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-xl p-5 border border-burnt-orange/30">
        <p className="text-white/75 leading-relaxed italic">
          "When I face an unfamiliar challenge, I'll pause and ask: Does this option honor empathy,
          accountability, excellence, loyalty, and innovation? If the answer is 'yes,' I know I'm
          heading in the right direction."
        </p>
      </div>
    </motion.div>
  );
}

// ── Sub-section C: Ethics Reflection ────────────────────────────────────────

const ethicsQA = [
  {
    question: "How effectively did your organization fulfill its values? How does that contribute to the ethical climate?",
    answer: `The George Herbert Walker School of Business & Technology does a pretty good job fulfilling its values based on what we identified as a group. Their mission is to prepare students for career success in an increasingly globally integrated business and technological economy utilizing a student-centered, real-world approach — with values of Respect, Knowledge, Potential, Diversity and Inclusion, and Global Perspectives.\n\nThe artifacts we documented showcased a lot of the student-centered focus. The ethical climate is affected in a positive way because students feel that they have access to valuable resources, and can rest assured that Walker School has their best interests in mind.`,
    highlight: false,
  },
  {
    question: "Describe your personal ethical dilemma and how you applied the Kitchener principles.",
    answer: `My ethical dilemma took place during the Annual Potluck Iftar. The buffet was supposed to remain closed until the time of Iftar (breaking the fast). The Vice President and a volunteer sneakily opened a tray of food to keep a box for themselves because food was going to run out, and they were hungry after fasting all day. Seeing this, guests thought it was time to eat and lined up at the buffet table. The main organizer — who has run this event for 13 years — got enraged.\n\nOn one hand: respecting the autonomy of volunteers just trying to get food after a long day. On the other: being faithful to the head organizer who needs everything planned precisely.\n\nI ended up having a conversation with the Vice President (her responsibility) and spoke with the organizer to help cool things down. After learning about the Kitchener principles, I would make the same decision — but the principles gave me more clarity: I arranged a tray of food for volunteers in advance, ensuring fairness for all. This move was faithful to both the volunteers and the organizer, benefiting all attendees as the event flowed more smoothly.`,
    highlight: true,
  },
  {
    question: "What situational variable has prevented you from making ethical decisions in the past? How will you combat it?",
    answer: `The pressure of time during decision-making always affects how clearly we think about situations. I plan to combat this in the future by taking a moment to pause and reflect on Kitchener's principles and the different ethical tests — such as "Would my mom be okay with this?" or "Would I be comfortable seeing this on the front page?" — before acting under pressure.`,
    highlight: false,
  },
];

function EthicsTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <p className="text-white/60 text-sm">
        ETHC 1000 Individual Reflection — George Herbert Walker School of Business & Technology
      </p>
      {ethicsQA.map(({ question, answer, highlight }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`glass rounded-xl overflow-hidden ${highlight ? "border-l-4 border-burnt-orange" : ""}`}
        >
          <div className="p-5 md:p-6">
            <p className="text-white/45 text-xs uppercase tracking-widest mb-3">Question {i + 1}</p>
            <p className="text-white/80 text-sm font-medium mb-4 leading-relaxed">{question}</p>
            <div className="border-t border-white/10 pt-4">
              {answer.split("\n\n").map((para, j) => (
                <p key={j} className={`text-white/70 leading-relaxed mb-3 last:mb-0 ${highlight ? "text-base" : "text-sm"}`}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ── Sub-section D: PLEs ──────────────────────────────────────────────────────

const ple1AccordionItems = [
  {
    value: "goals",
    trigger: "Goals & Outcomes",
    content: `In the past, the CS Club had a very serious tone, focusing primarily on professional or educational events. To create a better balance, I introduced "fun" events, such as game nights.\n\nI also aimed to raise awareness about Artificial Intelligence on campus through the AI Crossroads panel, where I invited experts to discuss the advantages and disadvantages of AI. While elections were held, many positions were filled by current committee members stepping up rather than "fresh faces" — student involvement across campus seemed to decline this year.`,
  },
  {
    value: "highlight",
    trigger: "Highlight — Webster Hackfest '26",
    content: `Webster Hackfest '26 was the definitive highlight. It was an interdisciplinary hackathon held in collaboration with the Business Club and the Game Design Guild. Coordinating an entire weekend of competition involved many moving parts and unexpected challenges, such as last-minute judge cancellations and double-booked spaces. Managing 29 organizers and volunteers to keep the event running smoothly was a significant win for my leadership development.`,
  },
  {
    value: "activities",
    trigger: "Major Activities",
    content: `Welcome meetings and study session collaborations with the Academic Resource Center • Hackathon & Capture the Flag (CTF) workshops • Byte Bash (beginner-friendly coding competition) • Field trip to Worldwide Technology • AI Crossroads panel • Among Us Game Night • Game Night Collaboration with Campus Activities • Hackfest '26 • Agentic AI workshop with Christian Johnson`,
  },
  {
    value: "challenge",
    trigger: "Biggest Challenge",
    content: `My officers had very demanding schedules, making task delegation difficult. Initially, I considered being stricter to hold them accountable, but I eventually realized that they are responsible adults managing their own priorities. Once I accepted this, it became easier to move forward by working with whoever was available and distributing tasks accordingly.`,
  },
  {
    value: "benefit",
    trigger: "How This Benefited Webster & My Goals",
    content: `By positioning a student organization at the forefront of industry networking and professional competitions, we send a message that Webster University students are proactive — not waiting for opportunities, but actively creating them.\n\nThis role allowed me to discover who I am as a leader by applying WebsterLEADS theory to practical, real-world scenarios, bridging the gap between academic knowledge and professional execution.`,
  },
];

const ple2AccordionItems = [
  {
    value: "goals",
    trigger: "Goals & Outcomes",
    content: `One of my primary goals was to experience coordinating an event from scratch. I achieved this twice: first during Welcome Week (a large-scale event), and again during a Game Night collaboration between the CS Club and the Video Game Fighting Club.\n\nI also aimed to improve sustainability practices. To reduce paper waste, I implemented a monthly schedule printout consolidating all events onto one page — though this was eventually rolled back due to a dip in student involvement requiring more aggressive individual marketing.`,
  },
  {
    value: "highlight",
    trigger: "Highlight — Mentoring a Colleague",
    content: `A highlight of my experience was mentoring a newer colleague who felt overwhelmed by a social situation at work. I was able to step into a leadership role by guiding them on how to communicate professionally with superiors. By comforting them and explaining that a simple, honest conversation is often more effective than overthinking, I helped them navigate the situation with confidence.`,
  },
  {
    value: "activities",
    trigger: "Major Events",
    content: `Headliner events • Casino Night • The Formal Dance • Quad Fest • Welcome Week • Stress Relief Week`,
  },
  {
    value: "challenge",
    trigger: "Biggest Challenge",
    content: `The biggest challenge was navigating backlash regarding the use of an AI-generated element in Casino Night designs. The online criticism felt personal. I addressed this by maintaining clear communication with my supervisor, Jennifer Stewart, and eventually had a very productive, respectful conversation with the individual who initiated the critique. We were able to explain our perspectives and acknowledge our disagreements professionally — far more fruitful than the social media outrage.`,
  },
  {
    value: "benefit",
    trigger: "How This Benefited Webster & My Goals",
    content: `This position benefits the university by streamlining the design and social media workflow, relieving Graduate Assistants and event coordinators of the marketing burden so they could focus entirely on logistical success.\n\nProfessionally, this role kept my design skills sharp and consistently polished. It also reminded me of the importance of being people-oriented — a core concept of our leadership theory classes.`,
  },
];

function PLECard({
  title, org, icon: Icon, color, items, who, reason,
}: {
  title: string; org: string; icon: React.ComponentType<{className?: string; style?: React.CSSProperties}>; color: string;
  items: typeof ple1AccordionItems; who: string; reason: string;
}) {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}20`, border: `1px solid ${color}40` }}>
            <Icon className="w-6 h-6" style={{ color }} />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">{title}</h3>
            <p className="text-white/50 text-sm">{org}</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
            I served: {who}
          </span>
        </div>
        <p className="mt-3 text-white/60 text-sm leading-relaxed italic">{reason}</p>
      </div>
      {/* Accordion details */}
      <div className="p-4">
        <Accordion type="multiple" className="space-y-1">
          {items.map(({ value, trigger, content }) => (
            <AccordionItem key={value} value={value} className="glass rounded-lg border-0 overflow-hidden">
              <AccordionTrigger className="px-4 py-3 text-white/80 text-sm font-medium hover:text-white hover:no-underline">
                {trigger}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                {content.split("\n\n").map((para, i) => (
                  <p key={i} className="text-white/65 text-sm leading-relaxed mb-2 last:mb-0">{para}</p>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

function PLEsTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <PLECard
        title="CS Club President"
        org="Webster University Computer Science Club"
        icon={Cpu}
        color="#3D8BE3"
        items={ple1AccordionItems}
        who="CS Club members & Walker School community"
        reason="I began my WebsterLEADS journey as VP and was elected President the following year — this role was the ideal PLE as a direct continuation of my leadership journey."
      />
      <PLECard
        title="Graphic Designer & Social Media Manager"
        org="Campus Activities, Webster University"
        icon={PenTool}
        color="#9B3DE3"
        items={ple2AccordionItems}
        who="Campus Activities coordinators and fellow students"
        reason="Having worked for Campus Activities since my first few days at Webster, I chose this role for my PLE because it offered a balance of familiarity and continued professional growth."
      />
    </motion.div>
  );
}

// ── Sub-section E: International Distinction ─────────────────────────────────

function InternationalTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Hero */}
      <div className="glass rounded-2xl p-8 text-center border border-burnt-orange/30">
        <div className="w-20 h-20 rounded-full bg-burnt-orange/20 flex items-center justify-center mx-auto mb-4 glow-orange">
          <Globe className="w-10 h-10 text-burnt-orange" />
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-burnt-orange/20 border border-burnt-orange/50 mb-4">
          <Award className="w-4 h-4 text-burnt-orange" />
          <span className="text-burnt-orange font-semibold text-sm tracking-wider">INTERNATIONAL DISTINCTION</span>
        </div>
        <h3 className="text-white text-2xl font-bold mb-2">Global Student Leadership Summit</h3>
        <p className="text-white/60">Geneva, Switzerland</p>
      </div>

      {/* Description */}
      <div className="space-y-4">
        <div className="glass rounded-xl p-6">
          <h4 className="text-burnt-orange font-semibold mb-3">About the Summit</h4>
          <p className="text-white/75 leading-relaxed">
            The Global Student Leadership Summit (GSLS) is an immersive international leadership program
            held in Geneva, Switzerland. As one of a select group of Webster University students chosen
            to participate, I engaged with student leaders from around the world, exploring global
            perspectives on leadership, governance, and cross-cultural collaboration.
          </p>
        </div>

        <div className="glass rounded-xl p-6">
          <h4 className="text-burnt-orange font-semibold mb-3">International Distinction in WebsterLEADS</h4>
          <p className="text-white/75 leading-relaxed">
            Participation in GSLS qualifies for the <strong className="text-white">International Distinction</strong> within
            the WebsterLEADS certification — awarded to students who demonstrate leadership impact beyond
            campus borders. The experience deepened my understanding of global leadership challenges and
            strengthened my ability to collaborate across cultural and national lines.
          </p>
        </div>

        <div className="glass rounded-xl p-6 border-l-4 border-burnt-orange">
          <p className="text-white/85 leading-relaxed italic text-base">
            "Leadership without borders. The Geneva experience reminded me that the core values
            I've developed — empathy, accountability, excellence, loyalty, and innovation — are
            not just locally applicable. They are universal qualities that transcend culture and
            language."
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

export function WebsterLEADSSection({ onBack, onNavigate }: WebsterLEADSSectionProps) {
  const [activeTab, setActiveTab] = useState<SubSection>("philosophy");

  return (
    <motion.div
      className="min-h-screen bg-[#0a0e1a] relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Back button */}
      <motion.button
        onClick={onBack}
        className="fixed top-8 right-8 z-40 w-14 h-14 rounded-full glass flex items-center justify-center hover:glow-orange transition-all group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Back to Hub"
      >
        <ArrowLeft className="w-6 h-6 text-white group-hover:text-burnt-orange transition-colors" />
      </motion.button>

      <main className="relative z-10 max-w-6xl mx-auto px-4 pt-24 pb-16 md:py-24">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Hub", onClick: onBack },
            { label: "WebsterLEADS Portfolio" },
          ]}
        />

        {/* Header */}
        <motion.header
          className="flex items-center gap-6 mb-10"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg glass flex items-center justify-center glow-orange">
            <Award className="w-8 h-8 md:w-10 md:h-10 text-burnt-orange" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                WebsterLEADS Portfolio
              </h1>
              <span className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-burnt-orange/20 border border-burnt-orange/40 text-burnt-orange text-xs font-semibold tracking-wider">
                <Users className="w-3 h-3" /> CERTIFICATION
              </span>
            </div>
            <p className="text-white/60 text-lg">
              Leadership development through theory, reflection, and practice
            </p>
          </div>
        </motion.header>

        {/* Tab navigation */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {TAB_DEFS.map(({ id, label, shortLabel }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === id
                  ? "bg-burnt-orange/20 border border-burnt-orange/60 text-burnt-orange"
                  : "glass text-white/65 hover:text-white/90 border border-white/10"
              }`}
            >
              <span className="hidden md:inline">{label}</span>
              <span className="md:hidden">{shortLabel}</span>
            </button>
          ))}
        </motion.div>

        {/* Tab content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "philosophy"    && <PhilosophyTab />}
          {activeTab === "growth"        && <GrowthTab />}
          {activeTab === "ethics"        && <EthicsTab />}
          {activeTab === "ples"          && <PLEsTab />}
          {activeTab === "international" && <InternationalTab />}
        </motion.div>
      </main>

      <div className="relative z-10 mt-16">
        <Footer onNavigate={onNavigate} />
      </div>
    </motion.div>
  );
}
