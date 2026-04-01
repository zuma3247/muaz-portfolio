import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { NexusHub } from "./components/NexusHub";
import { ContentSection } from "./components/ContentSection";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { WorkExperienceSection } from "./components/WorkExperienceSection";
import { WebsterLEADSSection } from "./components/WebsterLEADSSection";
import { LoadingScreen } from "./components/LoadingScreen";
import { GlobalNav } from "./components/GlobalNav";

type Section = "leadership" | "design" | "technology" | "about" | "contact" | "work-experience" | "websterleads" | null;

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState<Section>(null);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('hasVisitedNexus');
    
    if (hasVisited) {
      // Skip loading for returning visitors
      setIsLoading(false);
    } else {
      // Show loading screen for first-time visitors
      const timer = setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem('hasVisitedNexus', 'true');
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, []);

  // Set up history API for back button support
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state as { section?: Section } | null;
      if (state && state.section !== undefined) {
        setCurrentSection(state.section);
      } else {
        // Fallback to URL path
        const path = window.location.pathname.substring(1);
        const validSections = ["leadership", "design", "technology", "about", "contact", "work-experience", "websterleads"];
        if (validSections.includes(path)) {
          setCurrentSection(path as Section);
        } else {
          setCurrentSection(null);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    // Initial load state
    const path = window.location.pathname.substring(1);
    const validSections = ["leadership", "design", "technology", "about", "contact", "work-experience", "websterleads"];
    if (validSections.includes(path)) {
      setCurrentSection(path as Section);
      window.history.replaceState({ section: path }, '', '/' + path);
    } else {
      window.history.replaceState({ section: null }, '', '/');
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (section: Section) => {
    setCurrentSection(section);
    const url = section ? `/${section}` : '/';
    window.history.pushState({ section }, '', url);
  };

  const handleSkipLoading = () => {
    setIsLoading(false);
    localStorage.setItem('hasVisitedNexus', 'true');
  };

  const handleCoreSelect = (section: "leadership" | "design" | "technology") => {
    navigate(section);
  };

  const handleAboutClick = () => {
    navigate("about");
  };

  const handleWorkExperienceClick = () => {
    navigate("work-experience");
  };

  const handleContactClick = () => {
    navigate("contact");
  };

  const handleWebsterLEADSClick = () => {
    navigate("websterleads");
  };

  const handleBack = () => {
    navigate(null);
  };

  const handleGlobalNavigation = (section: "hub" | "about" | "work-experience" | "contact" | "leadership" | "design" | "technology" | "websterleads") => {
    if (section === "hub") {
      navigate(null);
    } else {
      navigate(section);
    }
  };

  return (
    <div className="w-full" role="application">
      {/* Global Navigation - Show everywhere except loading */}
      {!isLoading && (
        <GlobalNav
          currentSection={currentSection}
          onNavigate={handleGlobalNavigation}
        />
      )}

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" onSkip={handleSkipLoading} />
        ) : currentSection === "about" ? (
          <AboutSection key="about" onBack={handleBack} onNavigate={handleGlobalNavigation} />
        ) : currentSection === "work-experience" ? (
          <WorkExperienceSection key="work-experience" onBack={handleBack} onNavigate={handleGlobalNavigation} />
        ) : currentSection === "contact" ? (
          <ContactSection key="contact" onBack={handleBack} onNavigate={handleGlobalNavigation} />
        ) : currentSection === "websterleads" ? (
          <WebsterLEADSSection key="websterleads" onBack={handleBack} onNavigate={handleGlobalNavigation} />
        ) : currentSection ? (
          <ContentSection
            key={currentSection}
            section={currentSection as "leadership" | "design" | "technology"}
            onBack={handleBack}
            onNavigate={handleGlobalNavigation}
          />
        ) : (
          <NexusHub 
            key="hub" 
            onCoreSelect={handleCoreSelect}
            onAboutClick={handleAboutClick}
            onWorkExperienceClick={handleWorkExperienceClick}
            onContactClick={handleContactClick}
            onWebsterLEADSClick={handleWebsterLEADSClick}
            onNavigate={handleGlobalNavigation}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
