import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { FaSun, FaMoon } from "react-icons/fa";

function DarkMode() {
    const storedTheme = localStorage.getItem("theme") || "light"; // Persist theme
    const [theme, setTheme] = useState(storedTheme);

    useEffect(() => {
      document.getElementById("root").className = theme;
      localStorage.setItem("theme", theme); // Store in localStorage
    }, [theme]);

    const toggleTheme = () => {
      setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

  return (
    <Button
      variant="outline-success"
      className="d-flex align-items-center ms-2 btn-sm"
      onClick={toggleTheme} >
      {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
    </Button>
  );
}

export default DarkMode