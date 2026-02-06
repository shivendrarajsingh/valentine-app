import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [answered, setAnswered] = useState(false);
  const [noClicks, setNoClicks] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const noButtonRef = useRef(null);
  const audioRef = useRef(null);
  
  // Auto play music on first user interaction
  useEffect(() => {
    const playMusic = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(err => {
          console.log('Autoplay blocked');
        });
      }
      // Remove listener after first interaction
      document.removeEventListener('click', playMusic);
      document.removeEventListener('touchstart', playMusic);
    };

    document.addEventListener('click', playMusic);
    document.addEventListener('touchstart', playMusic);

    return () => {
      document.removeEventListener('click', playMusic);
      document.removeEventListener('touchstart', playMusic);
    };
  }, []);
  
  const noMessages = [
    "Are you sure cutie? 🥺",
    "Please reconsider? 💔",
    "Come on, say yes! 😢",
    "Just click yes already! 😭"
  ];

  // Generate floating hearts
  const generateHearts = () => {
    return Array.from({ length: 20 }).map((_, i) => (
      <div key={i} className="heart" style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${2 + Math.random() * 3}s`
      }}>
        ❤️
      </div>
    ));
  };

  const handleYes = () => {
    setAnswered(true);
  };

  const handleNoHover = () => {
    if (noClicks < 2) {
      // Runaway mode for first 2 times
      const randomX = Math.random() * 250 - 125;
      const randomY = Math.random() * 250 - 125;
      setNoPosition({ x: randomX, y: randomY });
    }
  };

  const handleNo = () => {
    if (noClicks < 6) {
      setNoClicks(noClicks + 1);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  return (
    <div className="App">
      {/* Background Music */}
      <audio
        ref={audioRef}
        src="/valentine-app/valentine-music2.mp3"
        loop
        volume="0.3"
      />
      
      {/* Music Toggle Button */}
      <button className="music-toggle" onClick={toggleMusic}>
        {isMusicPlaying ? '🔊' : '🔇'}
      </button>
      
      <div className="hearts-container">
        {generateHearts()}
      </div>

      <div className="content">
        {!answered ? (
          <div className="question-container">
            <h1 className="question">Priyanka, will you be my Valentine? 💕</h1>
            
            <div className="buttons-container">
              <button 
                className="btn btn-yes"
                onClick={handleYes}
                style={{
                  fontSize: `${1.2 + noClicks * 0.4}rem`,
                  padding: `${15 + noClicks * 15}px ${40 + noClicks * 30}px`,
                  zIndex: noClicks >= 3 ? 10 : 1
                }}
              >
                Yes 💚
              </button>
              
              {noClicks < 6 && (
                <button
                  ref={noButtonRef}
                  className="btn btn-no"
                  onClick={handleNo}
                  onMouseEnter={handleNoHover}
                  onTouchStart={handleNoHover}
                  style={{
                    opacity: noClicks >= 4 ? 0.3 : 1,
                    pointerEvents: noClicks >= 4 ? 'none' : 'auto',
                    transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                    transition: noClicks < 2 ? 'transform 0.2s ease-out' : 'none'
                  }}
                >
                  {noClicks < 2 ? 'No 💔' : (noClicks === 2 ? noMessages[0] : noMessages[noClicks - 2])}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="celebration">
            <h1 className="success-message">Yay! 🎉</h1>
            <p className="success-text">You've made me the happiest! 💕</p>
            
            {/* Confetti */}
            <div className="confetti">
              {Array.from({ length: 50 }).map((_, i) => (
                <div key={`confetti-${i}`} className="confetti-piece" style={{
                  left: `${Math.random() * 100}%`,
                  delay: `${Math.random() * 0.5}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}>
                  {['🎊', '🎉', '✨', '💕', '⭐'][Math.floor(Math.random() * 5)]}
                </div>
              ))}
            </div>
            
            {/* Heart Rain */}
            <div className="heart-rain">
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={`heart-${i}`} className="falling-heart" style={{
                  left: `${Math.random() * 100}%`,
                  delay: `${Math.random() * 1}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}>
                  ❤️
                </div>
              ))}
            </div>
            
            {/* Burst Stars */}
            <div className="burst-container">
              {Array.from({ length: 20 }).map((_, i) => {
                const angle = (i / 20) * Math.PI * 2;
                const distance = 200;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;
                return (
                  <div 
                    key={`burst-${i}`} 
                    className="burst-star" 
                    style={{
                      '--delay': `${i * 0.05}s`,
                      '--tx': `${tx}px`,
                      '--ty': `${ty}px`,
                      animationDelay: `${i * 0.05}s`
                    }}
                  >
                    ✨
                  </div>
                );
              })}
            </div>
            
            <p className="love-message">I love you! 💕💕💕</p>
            
            {/* Photo Gallery */}
            <div className="photo-gallery">
              <div className="photo-item">
                <img src="/valentine-app/photo1.jpg" alt="Us 1" className="gallery-photo" />
                <div className="photo-glow"></div>
              </div>
              <div className="photo-item">
                <img src="/valentine-app/photo2.jpg" alt="Us 2" className="gallery-photo" />
                <div className="photo-glow"></div>
              </div>
              <div className="photo-item">
                <img src="/valentine-app/photo3.jpg" alt="Us 3" className="gallery-photo" />
                <div className="photo-glow"></div>
              </div>
              <div className="photo-item">
                <img src="/valentine-app/photo4.jpg" alt="Us 4" className="gallery-photo" />
                <div className="photo-glow"></div>
              </div>
            </div>
            
            {/* Favorites Section */}
            <div className="favorites-section">
              <p className="favorites-title">Have these delicacies from me 🎁</p>
              <div className="favorites-items">
                <div className="favorite-item">🍓 Strawberry</div>
                <div className="favorite-item">🍰 Fudge Cake</div>
                <div className="favorite-item">🍫 Chocolate</div>
              </div>
            </div>
            
            {/* Personalized Message */}
            <div className="personal-message">
              <p className="signature">With all my love,</p>
              <p className="from-name">💚 Mayank 💚</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
