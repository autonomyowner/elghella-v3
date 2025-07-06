import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface AuthOnlyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const AuthOnlyButton: React.FC<AuthOnlyButtonProps> = ({
  children,
  onClick,
  className = "",
  disabled = false,
  type = "button"
}) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isAuthenticated) {
      navigate("/Login");
      return;
    }
    
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
};

export default AuthOnlyButton; 