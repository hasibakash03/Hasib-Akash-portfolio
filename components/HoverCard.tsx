"use client";
import { ReactNode, useRef } from "react";
interface Props { children: ReactNode; style?: React.CSSProperties; hoverStyle?: React.CSSProperties; }
export default function HoverCard({ children, style = {}, hoverStyle = {} }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} style={{ ...style, transition: "all 0.3s ease" }}
      onMouseEnter={() => { if (ref.current) Object.assign(ref.current.style, { transition: "all 0.3s ease", ...hoverStyle }); }}
      onMouseLeave={() => { if (ref.current) Object.assign(ref.current.style, { transition: "all 0.3s ease", ...style }); }}>
      {children}
    </div>
  );
}
