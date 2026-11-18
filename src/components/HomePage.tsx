"use client";

import { useState } from "react";
import { Preloader } from "@/components/Preloader";
import { Nav } from "@/components/Nav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ElevatorNav } from "@/components/ElevatorNav";
import { CrosshairCursor } from "@/components/CrosshairCursor";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Hero } from "@/components/sections/Hero";
import { Rewired } from "@/components/sections/Rewired";
import { Services } from "@/components/sections/Services";
import { Agents } from "@/components/sections/Agents";
import { Journal } from "@/components/sections/Journal";
import { Finale } from "@/components/sections/Finale";
import { Footer } from "@/components/sections/Footer";

export function HomePage() {
  const [ready, setReady] = useState(false);

  return (
    <SmoothScroll>
      {!ready && <Preloader onDone={() => setReady(true)} />}
      <ScrollProgress />
      <ElevatorNav />
      <CrosshairCursor />
      <Nav />
      <main>
        <Hero />
        <Rewired />
        <Services />
        <Agents />
        <Journal />
        <Finale />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
