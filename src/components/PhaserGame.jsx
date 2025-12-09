// import { useEffect, useRef, useState, useCallback } from 'react';
// import { initGame, destroyGame } from '../game';
// import ProjectModal from './ProjectModal';
// import InfoModal from './InfoModal';
// import HobbyModal from './HobbyModal';
// import CourseworkModal from './CourseworkModal';
// import EducationModal from './EducationModal';
// import LeadershipModal from './LeadershipModal';
// import IITBombayModal from './IITBombayModal';
// import AchievementsModal from './AchievementsModal';
// import WelcomeModal from './WelcomeModal';
// import SkillsModal from './SkillsModal';  // ✅ NEW SKILLS MODAL

// import educationData from '../data/education.json';
// import positionsData from '../data/positions.json';
// import iitbData from '../data/iitb-info.json';
// import achievementsData from '../data/achievements.json';


// import QuizModal from './QuizModal';

// const PhaserGame = () => {
//   const containerRef = useRef(null);
//   const gameRef = useRef(null);
  
//   // All existing states
//   const [project, setProject] = useState(null);
//   const [infoModal, setInfoModal] = useState(null);
//   const [hobby, setHobby] = useState(null);
//   const [coursework, setCoursework] = useState(null);
//   const [showEducation, setShowEducation] = useState(false);
//   const [showLeadership, setShowLeadership] = useState(false);
//   const [showIITB, setShowIITB] = useState(false);
//   const [showAchievements, setShowAchievements] = useState(false);
//   const [showWelcome, setShowWelcome] = useState(false);
  
//   // ✅ NEW SKILLS STATE
//   const [skillCategory, setSkillCategory] = useState(null);

//   // 🎮 MOVEMENT CALLBACKS (unchanged - perfect!)
//   const moveForward = useCallback(() => {
//     const game = gameRef.current || window.game;
//     if (game?.registry?.events) game.registry.events.emit('moveForward');
//   }, []);

//   const moveBackward = useCallback(() => {
//     const game = gameRef.current || window.game;
//     if (game?.registry?.events) game.registry.events.emit('moveBackward');
//   }, []);

//   const moveLeft = useCallback(() => {
//     const game = gameRef.current || window.game;
//     if (game?.registry?.events) game.registry.events.emit('moveLeft');
//   }, []);

//   const moveRight = useCallback(() => {
//     const game = gameRef.current || window.game;
//     if (game?.registry?.events) game.registry.events.emit('moveRight');
//   }, []);

//   const jump = useCallback(() => {
//     const game = gameRef.current || window.game;
//     if (game?.registry?.events) game.registry.events.emit('jump');
//   }, []);

//   // All existing modal callbacks
//   const openProjectModal = useCallback((proj) => setProject(proj), []);
//   const openInfoModal = useCallback((data) => setInfoModal(data), []);
//   const openHobbyModal = useCallback((hobbyData) => setHobby(hobbyData), []);
//   const openCourseworkModal = useCallback((courseData) => setCoursework(courseData), []);
//   const openEducationModal = useCallback(() => setShowEducation(true), []);
//   const openLeadershipModal = useCallback(() => setShowLeadership(true), []);
//   const openIITBModal = useCallback(() => setShowIITB(true), []);
//   const openAchievementsModal = useCallback(() => setShowAchievements(true), []);
//   const openWelcomeModal = useCallback(() => setShowWelcome(true), []);
  
//   // ✅ NEW SKILLS CALLBACK
//   const openSkillsModal = useCallback((data) => setSkillCategory(data), []);

//   // Initialize Phaser Game
//   useEffect(() => {
//     const containerId = 'phaser-container';
//     if (containerRef.current) containerRef.current.id = containerId;

//     destroyGame();

//     const gameInstance = initGame(containerId);
//     gameRef.current = gameInstance;
//     window.game = gameInstance;

//     // ✅ ADD SKILLS CALLBACK TO REGISTRY
//     gameInstance.registry.set('reactCallbacks', {
//       openProjectModal, openInfoModal, openHobbyModal, openCourseworkModal,
//       openEducationModal, openLeadershipModal, openIITBModal, openAchievementsModal, 
//       openWelcomeModal, openSkillsModal  // ✅ NEW!
//     });

//     return () => {
//       destroyGame();
//       gameRef.current = null;
//       window.game = null;
//     };
//   }, [
//     openProjectModal, openInfoModal, openHobbyModal, openCourseworkModal,
//     openEducationModal, openLeadershipModal, openIITBModal, openAchievementsModal, 
//     openWelcomeModal, openSkillsModal  // ✅ NEW DEPENDENCY
//   ]);

//   // ESC closes ALL modals (including skills!)
//   useEffect(() => {
//     const handleEsc = (e) => {
//       if (e.key === 'Escape') {
//         setProject(null); 
//         setInfoModal(null); 
//         setHobby(null); 
//         setCoursework(null);
//         setShowEducation(false); 
//         setShowLeadership(false); 
//         setShowIITB(false); 
//         setShowAchievements(false); 
//         setShowWelcome(false);
//         setSkillCategory(null);  // ✅ NEW!
//       }
//     };
//     window.addEventListener('keydown', handleEsc);
//     return () => window.removeEventListener('keydown', handleEsc);
//   }, []);

//   return (
//     <>
//       {/* PHASER GAME CONTAINER */}
//       <div ref={containerRef} className="w-screen h-screen fixed inset-0 bg-black" />
      
//       {/* FORWARD / BACK BUTTONS */}
//       <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex gap-4">
//         <button
//           onClick={moveBackward}
//           className="w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 active:from-gray-800 active:to-black text-white rounded-full shadow-2xl border-4 border-gray-500 font-bold text-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
//           style={{ pointerEvents: 'auto' }}
//           aria-label="Move Backward"
//         >
//           ←
//         </button>
//         <button
//           onClick={moveForward}
//           className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 active:from-emerald-700 active:to-emerald-800 text-white rounded-full shadow-2xl border-4 border-emerald-500 font-bold text-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
//           style={{ pointerEvents: 'auto' }}
//           aria-label="Move Forward"
//         >
//           →
//         </button>
//       </div>

//       {/* MOBILE TOUCH CONTROLS */}
//       <div className="fixed bottom-8 left-8 z-50 flex flex-col gap-4 md:hidden">
//         <div className="flex gap-4">
//           <button
//             onClick={moveLeft}
//             className="w-14 h-14 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-full shadow-xl font-bold text-lg transition-all active:scale-95 cursor-pointer"
//             style={{ pointerEvents: 'auto' }}
//             aria-label="Move Left"
//           >
//             A
//           </button>
//           <button
//             onClick={moveRight}
//             className="w-14 h-14 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-full shadow-xl font-bold text-lg transition-all active:scale-95 cursor-pointer"
//             style={{ pointerEvents: 'auto' }}
//             aria-label="Move Right"
//           >
//             D
//           </button>
//         </div>
//         <button
//           onClick={jump}
//           className="w-20 h-16 bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white rounded-xl shadow-xl font-bold text-lg transition-all active:scale-95 cursor-pointer"
//           style={{ pointerEvents: 'auto' }}
//           aria-label="Jump"
//         >
//           ↑ Jump
//         </button>
//       </div>

//       {/* MOBILE HINT TEXT */}
//       <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
//         <div className="bg-black/80 backdrop-blur-sm text-white px-6 py-3 rounded-full shadow-xl border-2 border-emerald-500 text-sm font-medium">
//           Use buttons to explore! 🎮
//         </div>
//       </div>

//       {/* DESKTOP HINT TEXT */}
//       <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
//         <div className="bg-black/80 backdrop-blur-sm text-white px-6 py-3 rounded-full shadow-xl border-2 border-emerald-500 text-sm font-medium">
//           Use WASD or Arrow keys to move | Click ← → buttons to jump forward/back
//         </div>
//       </div>

//       {/* ALL MODALS */}
//       {project && <ProjectModal project={project} onClose={() => setProject(null)} />}
//       {infoModal && <InfoModal isOpen={true} onClose={() => setInfoModal(null)} title={infoModal.title} content={infoModal.content} />}
//       {hobby && <HobbyModal isOpen={true} onClose={() => setHobby(null)} hobby={hobby} />}
//       {coursework && <CourseworkModal isOpen={true} onClose={() => setCoursework(null)} course={coursework} />}
//       <EducationModal isOpen={showEducation} onClose={() => setShowEducation(false)} educationData={educationData} />
//       <LeadershipModal isOpen={showLeadership} onClose={() => setShowLeadership(false)} positions={positionsData} />
//       <IITBombayModal isOpen={showIITB} onClose={() => setShowIITB(false)} iitbData={iitbData} />
//       <AchievementsModal isOpen={showAchievements} onClose={() => setShowAchievements(false)} achievementsData={achievementsData} />
//       <WelcomeModal isOpen={showWelcome} onClose={() => setShowWelcome(false)} />
      
//       {/* ✅ NEW SKILLS MODAL */}
//       {skillCategory && <SkillsModal isOpen={true} onClose={() => setSkillCategory(null)} skillCategory={skillCategory} />}
//     </>
//   );
// };

// export default PhaserGame;




































import { useEffect, useRef, useState, useCallback } from 'react';
import { initGame, destroyGame } from '../game';
import ProjectModal from './ProjectModal';
import InfoModal from './InfoModal';
import HobbyModal from './HobbyModal';
import CourseworkModal from './CourseworkModal';
import EducationModal from './EducationModal';
import LeadershipModal from './LeadershipModal';
import IITBombayModal from './IITBombayModal';
import AchievementsModal from './AchievementsModal';
import WelcomeModal from './WelcomeModal';
import SkillsModal from './SkillsModal';
import QuizModal from './QuizModal';

import educationData from '../data/education.json';
import positionsData from '../data/positions.json';
import iitbData from '../data/iitb-info.json';
import achievementsData from '../data/achievements.json';

const PhaserGame = () => {
  const containerRef = useRef(null);
  const gameRef = useRef(null);

  // Modal states
  const [project, setProject] = useState(null);
  const [infoModal, setInfoModal] = useState(null);
  const [hobby, setHobby] = useState(null);
  const [coursework, setCoursework] = useState(null);
  const [showEducation, setShowEducation] = useState(false);
  const [showLeadership, setShowLeadership] = useState(false);
  const [showIITB, setShowIITB] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [skillCategory, setSkillCategory] = useState(null);
  const [quizOpen, setQuizOpen] = useState(false); // ✅ NEW

  // Movement callbacks
  const moveForward = useCallback(() => {
    const game = gameRef.current || window.game;
    if (game?.registry?.events) game.registry.events.emit('moveForward');
  }, []);

  const moveBackward = useCallback(() => {
    const game = gameRef.current || window.game;
    if (game?.registry?.events) game.registry.events.emit('moveBackward');
  }, []);

  const moveLeft = useCallback(() => {
    const game = gameRef.current || window.game;
    if (game?.registry?.events) game.registry.events.emit('moveLeft');
  }, []);

  const moveRight = useCallback(() => {
    const game = gameRef.current || window.game;
    if (game?.registry?.events) game.registry.events.emit('moveRight');
  }, []);

  const jump = useCallback(() => {
    const game = gameRef.current || window.game;
    if (game?.registry?.events) game.registry.events.emit('jump');
  }, []);

  // Modal callbacks
  const openProjectModal = useCallback((proj) => setProject(proj), []);
  const openInfoModal = useCallback((data) => setInfoModal(data), []);
  const openHobbyModal = useCallback((hobbyData) => setHobby(hobbyData), []);
  const openCourseworkModal = useCallback((courseData) => setCoursework(courseData), []);
  const openEducationModal = useCallback(() => setShowEducation(true), []);
  const openLeadershipModal = useCallback(() => setShowLeadership(true), []);
  const openIITBModal = useCallback(() => setShowIITB(true), []);
  const openAchievementsModal = useCallback(() => setShowAchievements(true), []);
  const openWelcomeModal = useCallback(() => setShowWelcome(true), []);
  const openSkillsModal = useCallback((data) => setSkillCategory(data), []);
  const openQuizModal = useCallback(() => setQuizOpen(true), []); // ✅ NEW

  // Initialize Phaser game
  useEffect(() => {
    const containerId = 'phaser-container';
    if (containerRef.current) containerRef.current.id = containerId;

    destroyGame();

    const gameInstance = initGame(containerId);
    gameRef.current = gameInstance;
    window.game = gameInstance;

    gameInstance.registry.set('reactCallbacks', {
      openProjectModal,
      openInfoModal,
      openHobbyModal,
      openCourseworkModal,
      openEducationModal,
      openLeadershipModal,
      openIITBModal,
      openAchievementsModal,
      openWelcomeModal,
      openSkillsModal,
      openQuizModal // ✅ NEW
    });

    return () => {
      destroyGame();
      gameRef.current = null;
      window.game = null;
    };
  }, [
    openProjectModal,
    openInfoModal,
    openHobbyModal,
    openCourseworkModal,
    openEducationModal,
    openLeadershipModal,
    openIITBModal,
    openAchievementsModal,
    openWelcomeModal,
    openSkillsModal,
    openQuizModal
  ]);

  // ESC closes all modals
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setProject(null);
        setInfoModal(null);
        setHobby(null);
        setCoursework(null);
        setShowEducation(false);
        setShowLeadership(false);
        setShowIITB(false);
        setShowAchievements(false);
        setShowWelcome(false);
        setSkillCategory(null);
        setQuizOpen(false); // ✅ NEW
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      {/* PHASER GAME CONTAINER */}
      <div ref={containerRef} className="w-screen h-screen fixed inset-0 bg-black" />

      {/* FORWARD / BACK BUTTONS */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex gap-4">
        <button
          onClick={moveBackward}
          className="w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 active:from-gray-800 active:to-black text-white rounded-full shadow-2xl border-4 border-gray-500 font-bold text-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
          style={{ pointerEvents: 'auto' }}
          aria-label="Move Backward"
        >
          ←
        </button>
        <button
          onClick={moveForward}
          className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 active:from-emerald-700 active:to-emerald-800 text-white rounded-full shadow-2xl border-4 border-emerald-500 font-bold text-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
          style={{ pointerEvents: 'auto' }}
          aria-label="Move Forward"
        >
          →
        </button>
      </div>

      {/* MOBILE TOUCH CONTROLS */}
      <div className="fixed bottom-8 left-8 z-50 flex flex-col gap-4 md:hidden">
        <div className="flex gap-4">
          <button
            onClick={moveLeft}
            className="w-14 h-14 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-full shadow-xl font-bold text-lg transition-all active:scale-95 cursor-pointer"
            style={{ pointerEvents: 'auto' }}
            aria-label="Move Left"
          >
            A
          </button>
          <button
            onClick={moveRight}
            className="w-14 h-14 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-full shadow-xl font-bold text-lg transition-all active:scale-95 cursor-pointer"
            style={{ pointerEvents: 'auto' }}
            aria-label="Move Right"
          >
            D
          </button>
        </div>
        <button
          onClick={jump}
          className="w-20 h-16 bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white rounded-xl shadow-xl font-bold text-lg transition-all active:scale-95 cursor-pointer"
          style={{ pointerEvents: 'auto' }}
          aria-label="Jump"
        >
          ↑ Jump
        </button>
      </div>

      {/* MOBILE HINT TEXT */}
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
        <div className="bg-black/80 backdrop-blur-sm text-white px-6 py-3 rounded-full shadow-xl border-2 border-emerald-500 text-sm font-medium">
          Use buttons to explore! 🎮
        </div>
      </div>

      {/* DESKTOP HINT TEXT */}
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
        <div className="bg-black/80 backdrop-blur-sm text-white px-6 py-3 rounded-full shadow-xl border-2 border-emerald-500 text-sm font-medium">
          Use WASD or Arrow keys to move | Click ← → buttons to jump forward/back
        </div>
      </div>

      {/* ALL MODALS */}
      {project && <ProjectModal project={project} onClose={() => setProject(null)} />}
      {infoModal && (
        <InfoModal
          isOpen={true}
          onClose={() => setInfoModal(null)}
          title={infoModal.title}
          content={infoModal.content}
        />
      )}
      {hobby && <HobbyModal isOpen={true} onClose={() => setHobby(null)} hobby={hobby} />}
      {coursework && (
        <CourseworkModal isOpen={true} onClose={() => setCoursework(null)} course={coursework} />
      )}
      <EducationModal
        isOpen={showEducation}
        onClose={() => setShowEducation(false)}
        educationData={educationData}
      />
      <LeadershipModal
        isOpen={showLeadership}
        onClose={() => setShowLeadership(false)}
        positions={positionsData}
      />
      <IITBombayModal
        isOpen={showIITB}
        onClose={() => setShowIITB(false)}
        iitbData={iitbData}
      />
      <AchievementsModal
        isOpen={showAchievements}
        onClose={() => setShowAchievements(false)}
        achievementsData={achievementsData}
      />
      <WelcomeModal isOpen={showWelcome} onClose={() => setShowWelcome(false)} />

      {skillCategory && (
        <SkillsModal
          isOpen={true}
          onClose={() => setSkillCategory(null)}
          skillCategory={skillCategory}
        />
      )}

      {/* QUIZ MODAL */}
      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
    </>
  );
};

export default PhaserGame;
