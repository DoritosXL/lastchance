"use client";

import React, { useEffect, useRef } from "react";

type PopoverProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  anchorOrigin?: {
    vertical: "top" | "bottom" | "center";
    horizontal: "left" | "right" | "center";
  };
  transformOrigin?: {
    vertical: "top" | "bottom" | "center";
    horizontal: "left" | "right" | "center";
  };
  className?: string; // Added className property
};

const Popover: React.FC<PopoverProps> = ({
  anchorEl,
  open,
  onClose,
  children,
  anchorOrigin = { vertical: "bottom", horizontal: "center" },
  transformOrigin = { vertical: "top", horizontal: "center" },
  className, // Accepting className
}) => {
  const popoverRef = useRef<HTMLDivElement | null>(null);

  // Close popover if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        anchorEl &&
        !anchorEl.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose, anchorEl]);

  if (!open || !anchorEl) return null;

  const { top, left, width, height } = anchorEl.getBoundingClientRect();

  // Calculate the position
  const styles: React.CSSProperties = {
    position: "absolute",
    top:
      anchorOrigin.vertical === "top"
        ? top
        : anchorOrigin.vertical === "bottom"
        ? top + height
        : top + height / 2,
    left:
      anchorOrigin.horizontal === "left"
        ? left
        : anchorOrigin.horizontal === "right"
        ? left + width
        : left + width / 2,
    transform: `translate(
      ${transformOrigin.horizontal === "left" ? "0" : transformOrigin.horizontal === "right" ? "-100%" : "-50%"},
      ${transformOrigin.vertical === "top" ? "0" : transformOrigin.vertical === "bottom" ? "-100%" : "-50%"}
    )`,
    zIndex: 1000,
    background: "white",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
    borderRadius: "8px",
    padding: "16px",
    transition: "opacity 0.3s",
  };

  return (
    <div ref={popoverRef} style={styles} className={className}>
      {children}
    </div>
  );
};

export default Popover;
