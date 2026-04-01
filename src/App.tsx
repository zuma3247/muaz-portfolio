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

  const handleSkipLoading = () => {
    setIsLoading(false);
    localStorage.setItem('hasVisitedNexus', 'true');
  };

  const handleCoreSelect = (section: "leadership" | "design" | "technology") => {
    setCurrentSection(section);
  };

  const handleAboutClick = () => {
    setCurrentSection("about");
  };

  const handleWorkExperienceClick = () => {
    setCurrentSection("work-experience");
  };

  const handleContactClick = () => {
    setCurrentSection("contact");
  };

  const handleWebsterLEADSClick = () => {
    setCurrentSection("websterleads");
  };

  const handleBack = () => {
    setCurrentSection(null);
  };

  const handleGlobalNavigation = (section: "hub" | "about" | "work-experience" | "contact" | "leadership" | "design" | "technology" | "websterleads") => {
    if (section === "hub") {
      setCurrentSection(null);
    } else {
      setCurrentSection(section);
    }
  };

  return (
    <div className="w-full" role="application">
      {/* Global Navigation - Show everywhere except loading and hub */}
      {!isLoading && currentSection && (
        <GlobalNav 
          currentSection={currentSection}
          onNavigate={handleGlobalNavigation}
        />
      )}

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" onSkip={handleSkipLoading} />
        ) : currentSection === "about" ? (
          <AboutSection key="about" onBack={handleBack} />
        ) : currentSection === "work-experience" ? (
          <WorkExperienceSection key="work-experience" onBack={handleBack} />
        ) : currentSection === "contact" ? (
          <ContactSection key="contact" onBack={handleBack} />
        ) : currentSection === "websterleads" ? (
          <WebsterLEADSSection key="websterleads" onBack={handleBack} />
        ) : currentSection ? (
          <ContentSection
            key={currentSection}
            section={currentSection as "leadership" | "design" | "technology"}
            onBack={handleBack}
          />
        ) : (
          <NexusHub 
            key="hub" 
            onCoreSelect={handleCoreSelect}
            onAboutClick={handleAboutClick}
            onWorkExperienceClick={handleWorkExperienceClick}
            onContactClick={handleContactClick}
            onWebsterLEADSClick={handleWebsterLEADSClick}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
