import React, { useState } from "react";

interface DarkModeToggleProps {
  isDark: boolean
  toggleTheme:() => void
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ isDark, toggleTheme }) => {
  return (
    <button
      className="toggleButton"
      onClick={toggleTheme}
      aria-label="Switch the Theme"
      style={{
        fontSize: '1.2rem',
        padding: '0.5rem',
        background: 'none',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      {isDark ? '🌄 Switch to light mode' : '🌌 Switch to dark mode'}

    </button>

  )
}

export default DarkModeToggle
