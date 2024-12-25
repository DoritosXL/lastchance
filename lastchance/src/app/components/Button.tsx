"use client";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  buttonDanger?: boolean;
  fullWidth?: boolean;
  className?: string;
};

const Button = ({
  children,
  onClick,
  disabled,
  buttonDanger,
  fullWidth,
  className,
}: ButtonProps) => {
  const buttonClass = `${buttonDanger ? "button-danger" : "button-normal"} ${
    fullWidth ? "button-fullwidth" : ""
  } ${className || ""}`;

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
