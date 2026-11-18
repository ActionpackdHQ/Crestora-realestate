import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./agent.css";

const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Crestora AI agent",
  description:
    "Talk to Crestora’s AI agent about buying, selling, leasing, or joining as an advisor.",
};

export default function AgentLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`agent-root ${instrument.className}`}>{children}</div>
  );
}
