import { useEffect, useState } from "react";
import { useLocation } from "react-router";

interface LayoutTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const LayoutTransition: React.FC<LayoutTransitionProps> = ({
  children,
  className = "",
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const location = useLocation();

  useEffect(() => {
    setIsTransitioning(true);

    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsTransitioning(false);
    }, 150); // Mitad de la duración de la transición

    return () => clearTimeout(timer);
  }, [location.pathname, children]);

  return (
    <div
      className={`transition-all duration-500 ease-in-out ${
        isTransitioning ? "opacity-90" : "opacity-100"
      } ${className}`}
    >
      {displayChildren}
    </div>
  );
};

export default LayoutTransition;
