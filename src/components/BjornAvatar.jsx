import React from 'react';

/**
 * Componente reutilizable BjornAvatar para la plataforma BambooBjörn.
 * @param {string} pose - 'admin' | 'pathfinder' | 'hacker' | 'laptop' | ruta directa
 * @param {string} altText - Texto alternativo descriptivo
 * @param {string} className - Clases de Tailwind para ajustar tamaño/márgenes
 * @param {string} animationType - 'float' | 'zoom' | 'pulse' (tipo de micro-animación)
 */
export default function BjornAvatar({ 
  pose = 'admin', 
  altText = 'Bjørn KI-Assistent', 
  className = 'w-40 h-40 sm:w-52 sm:h-52',
  animationType = 'float'
}) {
  const poseMap = {
    admin: 'assets/AdminPanda_transparent.png',
    pathfinder: 'assets/PathfinderAdmin_transparent.png',
    hacker: 'assets/HackerPanda_transparent.png',
    laptop: 'assets/LaptopPanda_transparent.png',
  };

  const imageSrc = poseMap[pose] || pose;

  const animationClasses = {
    float: 'panda-avatar hover:scale-110 hover:-translate-y-2 transition-all duration-300 drop-shadow-lg cursor-pointer',
    zoom: 'panda-avatar hover:scale-110 hover:-rotate-2 transition-all duration-300 drop-shadow-lg cursor-pointer',
    pulse: 'panda-avatar animate-pulse hover:scale-108 transition-all duration-300 drop-shadow-lg cursor-pointer'
  };

  return (
    <div className="relative inline-flex items-center justify-center group flex-shrink-0">
      <img
        src={imageSrc}
        alt={altText}
        className={`${className} object-contain ${animationClasses[animationType] || animationClasses.float}`}
      />
    </div>
  );
}
