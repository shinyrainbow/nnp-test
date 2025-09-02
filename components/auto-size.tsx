/*
AutoSizeInput.jsx
React component (default export) — auto-resizing single-line input that expands horizontally as the text grows.
Built with TailwindCSS utility classes. Drop this file into a React project (Next.js / Vite) using Tailwind.

Props:
- value: string
- onChange: (newValue: string) => void
- placeholder?: string
- minWidth?: number (pixels) default 80
- maxWidth?: number (pixels) default 800
- className?: string (additional Tailwind classes)
- inputProps?: object (spread onto the <input>)

Behavior:
- Uses a hidden <span> to measure rendered width of the text, accounting for font-family, font-size, letter-spacing.
- Updates the input's inline width style on value/placeholder/font changes.
- Accessible: supports aria-label passed via inputProps.
*/

import React, { useRef, useLayoutEffect } from 'react';

export default function AutoSizeInput({
  value,
  onChange,
  placeholder = '',
  minWidth = 80,
  maxWidth = 800,
  className = '',
  inputProps = {},
}) {
  const inputRef = useRef(null);
  const sizerRef = useRef(null);

  // copy relevant font styles from input to sizer so measurement matches
  useLayoutEffect(() => {
    const input = inputRef.current;
    const sizer = sizerRef.current;
    if (!input || !sizer) return;

    const style = window.getComputedStyle(input);
    // Apply font-related properties so the sizer measures exactly like the input
    sizer.style.font = style.font;
    sizer.style.letterSpacing = style.letterSpacing;
    sizer.style.textTransform = style.textTransform;

    const textForMeasure = (value && value.length > 0) ? value : placeholder || '';
    // Use a trailing character to ensure caret space (helps when value is empty)
    sizer.textContent = textForMeasure + '\u200B';

    const newWidth = Math.ceil(sizer.getBoundingClientRect().width) + 2; // small buffer
    const clamped = Math.min(maxWidth, Math.max(minWidth, newWidth));
    input.style.width = clamped + 'px';
  }, [value, placeholder, minWidth, maxWidth, className]);

  return (
    <div className={`inline-block relative`}> 
      {/* visible input */}
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        // Tailwind defaults: make input visually minimal; users can pass additional classes via className
        className={`outline-none border-b border-gray-300 appearance-none bg-transparent outline-none text-sm py-1 px-2 ${className}`}
        style={{ width: `${minWidth}px` }}
        {...inputProps}
      />

      {/* hidden sizer used to measure width */}
      <span
        ref={sizerRef}
        aria-hidden
        className="invisible absolute left-0 top-0 whitespace-pre"
        style={{
          // ensure the span does not affect layout
          position: 'absolute',
          visibility: 'hidden',
          height: 0,
          overflow: 'hidden',
          whiteSpace: 'pre',
        }}
      />
    </div>
  );
}
