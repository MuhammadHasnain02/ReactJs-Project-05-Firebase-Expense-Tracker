import React, { useState, useEffect } from 'react';

function Notification({ icon, title, description, bgColorClass, onClose }) {
    // 1. State for controlling the CSS transition (slide-in/slide-out)
    const [isVisible, setIsVisible] = useState(false);
    // 2. State to manage the press/touch feedback
    const [isPressed, setIsPressed] = useState(false);

    // Effect for the open animation (component mount)
    useEffect(() => {
        // Use a small delay to ensure the component is mounted before starting the transition
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 10); 
        return () => clearTimeout(timer);
    }, []);

    // Function to start the close animation
    const startCloseAnimation = () => {
        setIsVisible(false); // Start slide-out animation
        // Wait for the CSS transition duration (300ms) before calling the parent's onClose
        const timer = setTimeout(onClose, 300); 
        return timer;
    };

    // Handle touch/click start (for press feedback)
    const handlePointerDown = () => {
        setIsPressed(true);
    };

    // Handle touch/click end (removes press feedback)
    const handlePointerUp = () => {
        setIsPressed(false);
    };

    // Handle clicking the notification itself (will trigger close animation)
    const handleNotificationClick = () => {
        // Prevent accidental rapid clicks on the close button
        const timer = startCloseAnimation();
        clearTimeout(window._notificationTimer); // Clear any auto-close timer from the hook
        return () => clearTimeout(timer);
    };

    // --- Tailwind Classes for Animation ---
    
    // Open/Close Animation: 
    // If visible, transform-x-0 (in position). If not visible, translate-x-full (off screen).
    const animationClass = isVisible 
        ? 'translate-x-0 opacity-100' 
        : 'translate-x-full opacity-0';

    // Click/Touch Animation:
    // If pressed, scale down slightly for feedback.
    const pressedClass = isPressed 
        ? 'scale-[0.98] shadow-lg' 
        : 'scale-100 shadow-2xl';

    return (
        <div 
            // Base Container
            className={`
                fixed top-5 right-5 max-w-sm w-full 
                ${bgColorClass} text-white 
                p-4 rounded-lg
                flex items-start z-50 
                cursor-pointer 
                // ANIMATION CLASSES:
                transform transition-all duration-300 ease-in-out
                ${animationClass} ${pressedClass}
            `}
            style={{ minWidth: '300px' }}
            
            // Events for the click/touch animation
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp} // Safety to remove press state if pointer leaves
            onClick={handleNotificationClick} // Close on click/tap anywhere on the toast
        >
            
            {/* Icon Area - Using the 'icon' prop directly */}
            <div className="text-xl mr-4 mt-0.5 flex-shrink-0">
                {/* Assuming 'icon' is an emoji or a Font Awesome class string */}
                {typeof icon === 'string' && icon.startsWith('fa-') ? (
                    <i className={`fa-solid ${icon}`}></i>
                ) : (
                    <span>{icon}</span>
                )}
            </div>

            {/* Text Content */}
            <div className="flex-grow overflow-hidden">
                <p className="font-bold text-base leading-snug truncate">
                    {title}
                </p>
                <p className="text-sm opacity-90 leading-tight mt-0.5">
                    {description}
                </p>
            </div>

            {/* Explicit Close Button (Doesn't rely on the component's onClick) */}
            <button 
                // Stop propagation so clicking the button doesn't trigger the notification's own click handler
                onClick={(e) => { e.stopPropagation(); startCloseAnimation(); }} 
                aria-label="Close notification"
                className="ml-4 -mt-0.5 p-1 text-white opacity-70 hover:opacity-100 transition rounded-full focus:outline-none focus:ring-2 focus:ring-white flex-shrink-0"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    );
}

export default Notification;