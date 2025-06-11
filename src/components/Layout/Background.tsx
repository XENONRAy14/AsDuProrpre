import React from 'react';

interface BackgroundProps {
  children: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Texture subtile */}
      <div 
        className="absolute inset-0 opacity-[0.03] bg-cover bg-center pointer-events-none z-0" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?ixlib=rb-4.0.3&auto=format&fit=crop&q=80')" }} 
      />
      
      {/* Dégradés radiaux dorés */}
      <div 
        className="absolute inset-0 pointer-events-none z-0" 
        style={{ backgroundImage: `radial-gradient(circle at 20% 35%, rgba(251, 191, 36, 0.05) 0%, transparent 50%), radial-gradient(circle at 75% 44%, rgba(251, 191, 36, 0.04) 0%, transparent 40%), radial-gradient(circle at 46% 82%, rgba(251, 191, 36, 0.03) 0%, transparent 30%)` }} 
      />
      
      {/* As de pique en filigrane */}
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
        {/* As de pique en haut à gauche */}
        <div className="absolute top-[5%] left-[5%] w-[300px] h-[300px]" style={{ transform: 'rotate(-15deg)' }}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <linearGradient id="goldGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#B8860B" stopOpacity="0.1" />
              </linearGradient>
              <filter id="glow1" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path 
              d="M50,2 L36,36 C25,50 30,70 50,65 C70,70 75,50 64,36 L50,2 Z M50,65 L50,90 L42,78 L58,78 L50,90 Z" 
              fill="url(#goldGradient1)"
              stroke="#FFD700"
              strokeWidth="1.5"
              opacity="0.5"
              filter="url(#glow1)"
            />
          </svg>
        </div>
        
        {/* As de pique en bas à droite */}
        <div className="absolute bottom-[5%] right-[5%] w-[400px] h-[400px]" style={{ transform: 'rotate(15deg)' }}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <linearGradient id="goldGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#B8860B" stopOpacity="0.1" />
              </linearGradient>
              <filter id="glow2" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path 
              d="M50,2 L36,36 C25,50 30,70 50,65 C70,70 75,50 64,36 L50,2 Z M50,65 L50,90 L42,78 L58,78 L50,90 Z" 
              fill="url(#goldGradient2)"
              stroke="#FFD700"
              strokeWidth="1.5"
              opacity="0.5"
              filter="url(#glow2)"
            />
          </svg>
        </div>
        
        {/* As de pique central très grand */}
        <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <linearGradient id="goldGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#B8860B" stopOpacity="0.05" />
              </linearGradient>
              <filter id="glow3" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path 
              d="M50,2 L36,36 C25,50 30,70 50,65 C70,70 75,50 64,36 L50,2 Z M50,65 L50,90 L42,78 L58,78 L50,90 Z" 
              fill="url(#goldGradient3)"
              stroke="#FFD700"
              strokeWidth="1"
              opacity="0.4"
              filter="url(#glow3)"
            />
          </svg>
        </div>
        
        {/* Quelques as de pique plus petits et plus subtils */}
        <div className="absolute top-[25%] right-[15%] w-[200px] h-[200px]" style={{ transform: 'rotate(30deg)' }}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <linearGradient id="goldGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#B8860B" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <path 
              d="M50,2 L36,36 C25,50 30,70 50,65 C70,70 75,50 64,36 L50,2 Z M50,65 L50,90 L42,78 L58,78 L50,90 Z" 
              fill="url(#goldGradient4)"
              stroke="#FFD700"
              strokeWidth="1"
              opacity="0.4"
            />
          </svg>
        </div>
        
        <div className="absolute bottom-[30%] left-[20%] w-[150px] h-[150px]" style={{ transform: 'rotate(-20deg)' }}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <linearGradient id="goldGradient5" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#B8860B" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <path 
              d="M50,2 L36,36 C25,50 30,70 50,65 C70,70 75,50 64,36 L50,2 Z M50,65 L50,90 L42,78 L58,78 L50,90 Z" 
              fill="url(#goldGradient5)"
              stroke="#FFD700"
              strokeWidth="1"
              opacity="0.4"
            />
          </svg>
        </div>
      </div>
      
      <div className="relative z-[5]">
        {children}
      </div>
    </div>
  );
};

export default Background;
