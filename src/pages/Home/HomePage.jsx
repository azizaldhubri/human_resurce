import { useContext, useRef, useState } from "react"; 
import MenuList from "./MenuList";
import './menulist.css';
import './home.css'; 
 
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import FeaturesSection from "./FeaturesSection";
import Footer from "./Footer";
import TestimonialsSection from "./TestimonialsSection";
import CallToActionSection from "./CallToActionSection";
import ScreenshotsSection from "./ScreenshotsSection";
import Topbar_home from "./Topbar_home";
import { WindowSize } from "../../Component/Context/WindowContext";
import Login from "../../modules/Auth/Login";
import Register from "../../modules/Auth/Register";
 

export default function Homepage() { 
  // Context
  const { windowSize } = useContext(WindowSize);
  

  // State
  const [openMenue, setOpenMenu] = useState(false);
  const [openFormRegister, setOpenFormRegister] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Refs
  const aboutRef = useRef(null);
  const heroSectionRef = useRef(null);
  const featuresRef = useRef(null);
  const screenshotsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const callToActionRef = useRef(null);

  // Handlers
  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpen = () => {
    setOpenMenu(prev => !prev);
  };

  const handleOpenFormRegister = () => {
    setOpenFormRegister(prev => !prev);
  };

  const handleOpenModal = (e) => {
    setIsModalOpen(e);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Modal Component
  const Modal = () => (
    <div className="modal_homepage1" onClick={closeModal}>
      <div className="modal_content_home" onClick={(e) => e.stopPropagation()}>
        {
          !openFormRegister 
            ? <Login register={handleOpenFormRegister} />
            : <Register login={handleOpenFormRegister} />
        }
      </div>
    </div>
  );

  // Render
  return (
    <div className="w-100" style={{ position: 'relative' }}>
      
      {/* Topbar */}
      <Topbar_home 
        setIsModalOpen={handleOpenModal}
        setOpenMenu={handleOpen}
        onHeroSectionClick={() => scrollTo(heroSectionRef)}
        ontestimonialsClick={() => scrollTo(testimonialsRef)}
      />

      {/* Sections */}
      <div>
        <div ref={heroSectionRef}><HeroSection /></div>
        <div ref={aboutRef}><AboutSection /></div>
        <div ref={featuresRef}><FeaturesSection /></div>
        <div ref={screenshotsRef}><ScreenshotsSection /></div>
        <div ref={testimonialsRef}><TestimonialsSection /></div>
        <div ref={callToActionRef}><CallToActionSection /></div>
        <Footer />
      </div>

      {/* Side Menu */}
      {
        openMenue && windowSize < 1000 &&
        <div className="child">
          <MenuList
            onHeroSectionClick={() => scrollTo(heroSectionRef)}
            onAboutClick={() => scrollTo(aboutRef)}
            onFeaturesClick={() => scrollTo(featuresRef)}
            onScreenshotsSectionClick={() => scrollTo(screenshotsRef)}
            openMenue={handleOpen}
            setIsModalOpen={handleOpenModal}
          />
        </div>
      }

      {/* Modal */}
      {
        isModalOpen && 
        <div className="w-100" style={{ zIndex: 2 }}>
          <Modal />
        </div>
      }

    </div>
  );
}
