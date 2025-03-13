"use client";
import {
    BadgeCheck,
    ChevronLeft,
    ChevronRight,
    Heart,
    Quote,
    Star,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const ReviewSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "Adam Anderson",
      title: "Professional Model",
      image: "/adam.jpg",
      rating: 5,
      review:
        "As someone who needs to maintain perfect skin for work, I trust CoseCom completely. The results are consistent and the experience is pure indulgence.",
      product: "Eternal Youth Serum",
      verified: true,
    },
    {
      id: 2,
      name: "Aicha Ben Malek",
      title: "Beauty Industry Expert",
      image: "/aicha.jpg",
      rating: 5,
      review:
        "The Velvet Serum has completely transformed my skincare routine. The texture is unlike anything I've experienced before - it's pure luxury in a bottle.",
      product: "Velvet Serum",
      verified: true,
    },
    {
      id: 3,
      name: "Sahar Martinez",
      title: "Skincare Enthusiast",
      image: "/sahar.jpg",
      rating: 5,
      review:
        "After trying countless luxury skincare brands, CoseCom stands out with its incredible attention to detail and remarkable results. My skin has never looked better.",
      product: "Night Restoration Cream",
      verified: true,
    },
  ];

  const nextReview = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section
      id="why-CoseCom"
      className="py-12 sm:py-24 max-w-screen-lg mx-auto px-4"
    >
      <div className="text-center mb-10 sm:mb-16">
        <h2 className="text-3xl sm:text-5xl font-light text-foreground mb-3">
          Why CoseCom
        </h2>
        <p className="sm:text-lg text-foreground/60">
          Discover why leading beauty experts and enthusiasts choose CoseCom
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 max-w-4xl mx-auto">
        <div className="text-center px-8 py-4 bg-muted dark:bg-white rounded-xl">
          <h3 className="text-4xl font-light text-neutral-800 flex gap-2 items-center justify-center">
            <Star className="size-8 fill-yellow-400 text-yellow-400" /> 4.7
          </h3>
          <p className="text-neutral-600">Average Rating</p>
        </div>
        <div className="text-center px-8 py-4 bg-muted dark:bg-white rounded-xl">
          <h3 className="text-4xl font-light text-neutral-800 flex gap-2 items-center justify-center">
            <BadgeCheck
              className="size-9 fill-blue-400 text-foreground"
              strokeWidth={1}
            />
            3,218+
          </h3>
          <p className="text-neutral-600">Trusted Customers</p>
        </div>
        <div className="text-center px-8 py-4 bg-muted dark:bg-white rounded-xl">
          <h3 className="text-4xl font-light text-neutral-800 flex gap-2 items-center justify-center">
            <Heart className="size-8 fill-red-400 text-red-400" /> 97%
          </h3>
          <p className="text-neutral-600">Would Recommend</p>
        </div>
      </div>

      <div className="text-center mt-20 mb-12">
        <h2 className="text-2xl sm:text-4xl font-light text-foreground mb-3">
          Experts Love CoseCom
        </h2>
        <p className="sm:text-lg text-foreground/60">
          Trusted reviews from the foremost names in the domain.
        </p>
      </div>

      <div className="relative">
        <div className="max-w-4xl mx-auto">
          <div className="bg-muted dark:bg-white rounded-2xl p-12 shadow-sm">
            <div className="flex justify-center mb-8">
              <Quote className="w-12 h-12 text-neutral-200" />
            </div>

            <div className="space-y-6 text-center">
              <div className="flex justify-center gap-1">
                {[...Array(reviews[activeIndex].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="md:text-xl text-neutral-700 leading-relaxed italic">
                &quot;{reviews[activeIndex].review}&quot;
              </p>

              <div className="inline-block px-4 py-1 bg-neutral-100 rounded-full text-sm text-neutral-600">
                {reviews[activeIndex].product}
              </div>

              <div className="pt-6">
                <div className="flex items-center justify-center gap-4">
                  <Image
                    width={550}
                    height={550}
                    src={reviews[activeIndex].image}
                    alt={reviews[activeIndex].name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p className="font-medium text-neutral-800">
                      {reviews[activeIndex].name}
                    </p>
                    <p className="text-sm text-neutral-600">
                      {reviews[activeIndex].title}
                    </p>
                    {reviews[activeIndex].verified && (
                      <p className="text-xs text-emerald-600 mt-1">
                        Verified Purchase
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={prevReview}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 bg-muted dark:bg-white w-12 h-12 rounded-full border border-muted-foreground flex items-center justify-center hover:bg-neutral-50 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-neutral-600" />
        </button>
        <button
          onClick={nextReview}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 bg-muted dark:bg-white w-12 h-12 rounded-full border border-muted-foreground flex items-center justify-center hover:bg-neutral-50 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-neutral-600" />
        </button>
      </div>
    </section>
  );
};

export default ReviewSection;
