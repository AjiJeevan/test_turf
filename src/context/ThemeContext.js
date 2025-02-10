import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvide = ({ children }) => {

    const storedTheme = localStorage.getItem("theme") || "light";
    const [theme, setTheme] = useState(storedTheme);

    useEffect(() => {
        document.body.className = theme
        localStorage.setItem("them",theme)
    }, [theme])
    
    const toggleTheme = () => {
      setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

     return (
       <ThemeContext.Provider value={{ theme, toggleTheme }}>
         {children}
       </ThemeContext.Provider>
     );
}

export const useTheme = () => useContext(ThemeContext);