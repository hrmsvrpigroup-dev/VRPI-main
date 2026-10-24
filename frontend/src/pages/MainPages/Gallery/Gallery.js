import React, { useEffect } from "react";
import InteractiveBentoGallery from "../../../components/ui/interactive-bento-gallery";

const mediaItems = [
  {
    id: 1,
    type: "image",
    title: "Office Team",
    desc: "Our dedicated team working together to build amazing products.",
    url: "https://i.ibb.co/hxjJ8wjr/IMG-20260722-WA0018.jpg",
    span: "md:col-span-1 md:row-span-1 sm:col-span-1 sm:row-span-1 col-span-1 row-span-1",
  },
  {
    id: 2,
    type: "image",
    title: "Team Meeting",
    desc: "Collaborative sessions where we brainstorm and innovate.",
    url: "https://i.ibb.co/VWZFwPFF/IMG-20260722-WA0011.jpg",
    span: "md:col-span-1 md:row-span-1 sm:col-span-1 sm:row-span-1 col-span-1 row-span-1",
  },
  {
    id: 3,
    type: "image",
    title: "Forest Path",
    desc: "Finding new paths and exploring innovative solutions.",
    url: "https://i.ibb.co/SwDTKhFK/IMG-20260722-WA0012.jpg",
    span: "md:col-span-1 md:row-span-1 sm:col-span-1 sm:row-span-1 col-span-1 row-span-1",
  },
  {
    id: 4,
    type: "image",
    title: "Landscape",
    desc: "Broadening our horizons with wide-scale impact.",
    url: "https://i.ibb.co/mrcBpZdT/IMG-20260722-WA0013.jpg",
    span: "md:col-span-1 md:row-span-1 sm:col-span-1 sm:row-span-1 col-span-1 row-span-1",
  },
  {
    id: 6,
    type: "image",
    title: "Anniversary",
    desc: "Celebrating our milestones and successes together.",
    url: "https://i.ibb.co/1tyP53KB/IMG-20260722-WA0015.jpg",
    span: "md:col-span-1 md:row-span-1 sm:col-span-2 sm:row-span-1 col-span-1 row-span-1",
  }
];

export default function Gallery() {
  useEffect(() => {
    document.title = "VRPI Group Of Companies - Gallery";
  }, []);

  return (
    <div className="min-h-screen overflow-y-auto pb-12">
      <InteractiveBentoGallery
        mediaItems={mediaItems}
        title="Gallery Shots Collection"
        description="Drag and explore our curated collection of shots"
      />
    </div>
  );
}
