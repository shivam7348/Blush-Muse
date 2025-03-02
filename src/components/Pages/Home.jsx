import { useState } from "react";
import VideoSlider from "../Slider/VideoSlider";
import {  videoSlides } from "../../utils/data/data";
import AnimatedBanner from "./AnimatedBanner";
import Card from "../Pages/Card"

export default function Home() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div>
  
        
        <section className="w-full">
          <VideoSlider slides={videoSlides} />
        </section>

        <div className="min-h-screen bg-gray-100 py-12 px-4">
  <div className="max-w-8xl mx-auto">
    <div className="flex justify-center">
      <Card title="My Single Card" description="This is a single card." />
    </div>
  </div>
</div>


    <AnimatedBanner/>

      
  
    </div>
  );
}