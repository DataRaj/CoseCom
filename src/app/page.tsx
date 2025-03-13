"use client"

import About from "@/components/store/store-about";
import BestSeller from "@/components/store/store-best-seller";
import Footer from "@/components/store/store-footer";
import Header from "@/components/store/store-header";
import HeroSection from "@/components/store/store-hero";
import InfiniteScroll from "@/components/store/store-infinite-scroll";
import Products from "@/components/store/store-products";
import ReviewSection from "@/components/store/store-reviews";
import StoryModal from "@/components/story-teller";
import { useEffect, useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);

  // Story content
  const storyPages = [
    {
      page: 1,
      title: "Welcome to Our Platform",
      description: "We've designed this experience with you in mind. Let us walk you through what makes our platform special and how it can transform the way you work."
    },
    {
      page: 2,
      title: "Powerful Features",
      description: "Discover our suite of innovative tools that streamline your workflow. From automated processes to intuitive interfaces, we've thought of everything."
    },
    {
      page: 3,
      title: "Seamless Integration",
      description: "Connect with your favorite services and platforms without hassle. Our system works harmoniously with the tools you already use and love."
    },
    {
      page: 4,
      title: "Privacy & Security",
      description: "Your data is sacred. We implement bank-level encryption and strict access controls to ensure your information remains private and secure."
    },
    {
      page: 5,
      title: "Get Started Now",
      description: "You're all set to begin your journey. Explore our platform and don't hesitate to reach out if you need any assistance along the way."
    }
  ];

  useEffect(() => {
     // Only run on client-side
     if (typeof window === 'undefined') return;

     // Check if current path is homepage
     const isHomepage = window.location.pathname === '/';

     if (isHomepage) {
       // Check if user has seen the modal before
       const hasSeenModal = localStorage.getItem('hasSeenStoryModal');

       if (!hasSeenModal) {
         // If not seen before, show the modal
         setOpen(true);

         // Mark as seen in localStorage
         localStorage.setItem('hasSeenStoryModal', 'true');
       }
     }
   }, []);

  // const resetModal = () => {
  //   localStorage.removeItem('hasSeenStoryModal');
  //   setOpen(true);
  // };

   return (
    <>

      <Header />
      <HeroSection />
      <Products />
      <BestSeller />
      <InfiniteScroll />
      <ReviewSection />
      <About />
      <Footer />
      <StoryModal
        open={open}
        onOpenChange={setOpen}
        pages={storyPages}
      />

    </>
  );
}
