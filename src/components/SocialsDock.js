import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const DEFAULT_SIZE = 40;
const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const Dock = React.forwardRef(function Dock(
  {
    className = "",
    children,
    iconSize = DEFAULT_SIZE,
    iconMagnification = DEFAULT_MAGNIFICATION,
    iconDistance = DEFAULT_DISTANCE,
    direction = "middle",
  },
  ref
) {
  const mouseX = useMotionValue(Infinity);

  const items = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === DockIcon
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={`dock ${className}`.trim()}
      data-direction={direction}
    >
      {items.map((child, index) =>
        React.cloneElement(child, {
          key: index,
          mouseX,
          size: iconSize,
          magnification: iconMagnification,
          distance: iconDistance,
        })
      )}
    </motion.div>
  );
});

function DockIcon({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className = "",
  children,
  onClick,
  href,
  download,
  label,
  ...props
}) {
  const ref = useRef(null);
  const fallbackX = useMotionValue(Infinity);
  const sourceX = mouseX ?? fallbackX;
  const padding = Math.max(6, size * 0.2);

  const distanceCalc = useTransform(sourceX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, magnification, size]
  );

  const scaleSize = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const inner = (
    <motion.div
      ref={ref}
      style={{ width: scaleSize, height: scaleSize, padding }}
      className={`dock-icon ${className}`.trim()}
      whileTap={{ scale: 0.92 }}
      {...props}
    >
      <div className="dock-icon-inner">{children}</div>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        download={download}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        aria-label={label}
        className="dock-link"
      >
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} aria-label={label} className="dock-link dock-link-btn">
      {inner}
    </button>
  );
}

const GitHubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.06 11.06 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.13v3.16c0 .31.21.67.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
  </svg>
);

const LinkedInIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
  </svg>
);

const MailIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="m3 6 9 7 9-7" />
  </svg>
);

export const SocialsDock = () => {
  const [hovered, setHovered] = useState(null);
  const items = [
    {
      key: "github",
      label: "GitHub",
      href: "https://github.com/Mo-Awadalla/",
      icon: <GitHubIcon className="dock-svg" />,
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mohamed-r-awadalla",
      icon: <LinkedInIcon className="dock-svg" />,
    },
    {
      key: "email",
      label: "Email",
      href: "mailto:Mohamedawadalla75@gmail.com",
      icon: <MailIcon className="dock-svg" />,
    },
  ];

  return (
    <div className="dock-wrapper" onMouseLeave={() => setHovered(null)}>
      <span className="dock-tooltip" data-visible={hovered ? "true" : "false"}>
        {hovered ? items.find((i) => i.key === hovered)?.label : ""}
      </span>
      <Dock className="dock-bar" iconSize={44} iconMagnification={64} iconDistance={140}>
        {items.map((item) => (
          <DockIcon
            key={item.key}
            label={item.label}
            href={item.href}
            download={item.download}
            onMouseEnter={() => setHovered(item.key)}
          >
            {item.icon}
          </DockIcon>
        ))}
      </Dock>
    </div>
  );
};

export { Dock, DockIcon };
