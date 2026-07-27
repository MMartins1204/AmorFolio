interface IconProps {
  className?: string;
  size?: number;
}

export function Heart({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export function HeartDouble({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 24" fill="none" className={className}>
      <path
        d="M22.84 4.61a4.5 4.5 0 0 0-6.36 0L16 5.09l-.48-.48a4.5 4.5 0 0 0-6.36 6.36l.48.48L16 17.81l6.36-6.36.48-.48a4.5 4.5 0 0 0 0-6.36z"
        fill="currentColor"
      />
      <path
        d="M12.84 2.61a3.5 3.5 0 0 0-4.95 0L6.85 3.65l-.47-.47a3.5 3.5 0 0 0-4.95 4.95l.47.47L7.89 13.89l4.95-4.95.47-.47a3.5 3.5 0 0 0 0-4.95z"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  );
}

export function HeartBroken({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" opacity="0.5" />
      <path d="M16 6 L12.5 10 L12 5.67 l-1.06-1.06 a5.5 5.5 0 0 0-7.78 7.78 l1.06 1.06 L12 21.23 l4-4" fill="white" opacity="0.6" />
    </svg>
  );
}

export function Calendar({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function Ring({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <ellipse cx="12" cy="14" rx="7" ry="6" />
      <ellipse cx="12" cy="14" rx="5" ry="4" />
      <path d="M9.5 8.5 L12 3 L14.5 8.5" />
      <circle cx="12" cy="3" r="1" fill="currentColor" />
    </svg>
  );
}

export function Flower({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <circle cx="12" cy="12" r="3" opacity="0.9" />
      <ellipse cx="12" cy="6" rx="2.5" ry="3.5" opacity="0.7" />
      <ellipse cx="12" cy="18" rx="2.5" ry="3.5" opacity="0.7" />
      <ellipse cx="6" cy="12" rx="3.5" ry="2.5" opacity="0.7" />
      <ellipse cx="18" cy="12" rx="3.5" ry="2.5" opacity="0.7" />
      <ellipse cx="7.8" cy="7.8" rx="2.5" ry="3" transform="rotate(45 7.8 7.8)" opacity="0.6" />
      <ellipse cx="16.2" cy="7.8" rx="2.5" ry="3" transform="rotate(-45 16.2 7.8)" opacity="0.6" />
      <ellipse cx="7.8" cy="16.2" rx="2.5" ry="3" transform="rotate(-45 7.8 16.2)" opacity="0.6" />
      <ellipse cx="16.2" cy="16.2" rx="2.5" ry="3" transform="rotate(45 16.2 16.2)" opacity="0.6" />
    </svg>
  );
}

export function Sun({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.3" />
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="6.76" y2="6.76" />
      <line x1="17.24" y1="17.24" x2="19.07" y2="19.07" />
      <line x1="4.93" y1="19.07" x2="6.76" y2="17.24" />
      <line x1="17.24" y1="6.76" x2="19.07" y2="4.93" />
    </svg>
  );
}

export function Butterfly({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 12 C12 12 8 6 4 6 C2 6 1 8 2 10 C3 12 6 12 8 11 L12 14" opacity="0.8" />
      <path d="M12 12 C12 12 16 6 20 6 C22 6 23 8 22 10 C21 12 18 12 16 11 L12 14" opacity="0.8" />
      <path d="M12 14 C12 14 9 18 8 20 C7 21 8 22 9 21 C10 20 11 18 12 16" opacity="0.6" />
      <path d="M12 14 C12 14 15 18 16 20 C17 21 16 22 15 21 C14 20 13 18 12 16" opacity="0.6" />
      <line x1="12" y1="8" x2="12" y2="22" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="11" cy="7" r="0.8" />
      <circle cx="13" cy="7" r="0.8" />
    </svg>
  );
}

export function ChristmasTree({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2 L6 10 H9 L5 16 H8 L4 22 H20 L16 16 H19 L15 10 H18 Z" opacity="0.85" />
      <rect x="10.5" y="22" width="3" height="2" rx="0.5" opacity="0.6" />
      <circle cx="12" cy="8" r="1" fill="#fbbf24" opacity="0.9" />
    </svg>
  );
}

export function Cake({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 14h18v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6z" fill="currentColor" opacity="0.15" />
      <path d="M3 14h18v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6z" />
      <path d="M3 14c0-2 2-4 4-4s4 2 4 4" />
      <path d="M13 14c0-2 2-4 4-4s4 2 4 4" />
      <line x1="12" y1="6" x2="12" y2="10" />
      <path d="M10 6 c0.5-2 2-2 2-3.5 C12 2 12 2 12 2.5 C12 2 12 2 12 2.5 C12 2 12 2 12 2.5 C12 1 11.5 1 12 2.5 C12 2 13.5 2 12 6" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export function Star({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

export function Envelope({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 5 L12 13 L22 5" />
      <path d="M2 19 L9 12" opacity="0.3" />
      <path d="M22 19 L15 12" opacity="0.3" />
    </svg>
  );
}

export function Lock({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="11" width="18" height="11" rx="2" fill="currentColor" opacity="0.1" />
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function Wrench({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

export function Music({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" fill="currentColor" opacity="0.2" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" fill="currentColor" opacity="0.2" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

export function Play({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <polygon points="6,3 20,12 6,21" />
    </svg>
  );
}

export function Pause({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="5" y="3" width="4" height="18" rx="1" />
      <rect x="15" y="3" width="4" height="18" rx="1" />
    </svg>
  );
}

export function ChevronDown({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function Close({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function ChevronLeft({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

export function ChevronRight({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export function Book({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" fill="currentColor" opacity="0.1" />
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

export function Lightning({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10" />
    </svg>
  );
}

export function Drama({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.1" />
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14 C8 14 9.5 16 12 16 C14.5 16 16 14 16 14" />
      <circle cx="8" cy="9" r="1" fill="currentColor" />
      <circle cx="16" cy="9" r="1" fill="currentColor" />
      <line x1="8" y1="9" x2="6" y2="8" />
      <line x1="16" y1="9" x2="18" y2="8" />
    </svg>
  );
}

export function HeartFire({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      <path d="M12 16 C12 16 10 13 10 11.5 C10 10 11 9 12 10 C13 9 14 10 14 11.5 C14 13 12 16 12 16z" fill="white" opacity="0.6" />
    </svg>
  );
}

export function Rose({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 3 C12 3 14 6 14 8 C14 10 13 11 12 11 C11 11 10 10 10 8 C10 6 12 3 12 3z" opacity="0.7" />
      <path d="M12 7 C12 7 15 9 15 12 C15 14 13.5 15 12 14.5 C10.5 15 9 14 9 12 C9 9 12 7 12 7z" opacity="0.5" />
      <path d="M12 11 C12 11 16 13 16 16 C16 18 14 19 12 18 C10 19 8 18 8 16 C8 13 12 11 12 11z" opacity="0.4" />
      <line x1="12" y1="14" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <path d="M12 17 C12 17 14 16 15 17" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

export function Sparkle({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2 L14 9 L21 9 L15.5 13.5 L17.5 21 L12 16.5 L6.5 21 L8.5 13.5 L3 9 L10 9 Z" opacity="0.8" />
      <circle cx="18" cy="5" r="1.5" opacity="0.5" />
      <circle cx="5" cy="18" r="1" opacity="0.3" />
    </svg>
  );
}
