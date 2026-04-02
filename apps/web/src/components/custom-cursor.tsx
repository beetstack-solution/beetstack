"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsPointer(!!isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);

    // Hide default cursor globally
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      document.body.style.cursor = "auto";
    };
  }, [mouseX, mouseY, isVisible]);

  // Beetroot colors
  const liteRed = "#e33765";
  const brandRed = "#a21c3c";

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            style={{
              translateX: cursorX,
              translateY: cursorY,
              left: -12,
              top: -12,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="relative flex items-center justify-center w-6 h-6"
          >
            {/* Outer Beetroot Ring */}
            <motion.div
              animate={{
                scale: isPointer ? 0.6 : 1,
                opacity: isPointer ? 0.5 : 1,
                borderWidth: isPointer ? 1 : 1.5,
              }}
              className="absolute w-full h-full rounded-full border-[1.5px] bg-brand-lite-red"
              style={{ borderColor: liteRed }}
            />

            {/* Middle Beetroot Layer */}
            <motion.div
              animate={{
                scale: isPointer ? 0.4 : 0.7,
                opacity: isPointer ? 0.8 : 1,
              }}
              className="absolute w-full h-full rounded-full border-[3px]"
              style={{ borderColor: brandRed }}
            />

            {/* Core Beetroot Dot */}
            <motion.div
              animate={{
                scale: isPointer ? 0.15 : 0.25,
              }}
              className="absolute w-full h-full rounded-full"
              style={{ backgroundColor: brandRed }}
            />

            {/* High-visibility blink (pulse) only on clickable elements */}
            {isPointer && (
              <motion.div
                initial={{ scale: 0.6, opacity: 0.8 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeOut" }}
                className="absolute w-full h-full rounded-full border-[2px]"
                style={{ borderColor: "#ffffff" }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
