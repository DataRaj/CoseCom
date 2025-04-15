import { Star, StarHalf } from "lucide-react";

export default function About() {
  return (
    <section
      id="about-the-brand"
      className="py-12 sm:py-24 max-w-screen-lg mx-auto px-4"
    >
      <div className="text-center mb-10 sm:mb-16">
        <h2 className="text-3xl sm:text-5xl font-light text-foreground mb-3">
          About The Brand
        </h2>
        <p className="sm:text-lg text-foreground/60">
          Redefining Luxury Skincare Since 2021
        </p>
      </div>

      <div className="w-full gap-6 flex flex-col items-center justify-center py-12 px-8 bg-muted dark:bg-[#F8F8F8] rounded-2xl shadow-sm">
        <img src={'/cosecom_logo.jpg'} alt="CoseCom Logo" className="h-10 w-auto mb-2" />
        <p className="text-center text-lg text-neutral-800 max-w-[600px] leading-relaxed">
          Born from the fusion of nature&apos;s finest ingredients and
          cutting-edge science, CoseCom represents the pinnacle of luxury skincare.
          <span className="hidden sm:inline-block">
            Each formula is meticulously crafted to deliver transformative
            results.
          </span>
        </p>

        <div className="flex flex-col md:flex-row md:flex-[1_0_32%] gap-4 md:gap-8 w-full py-6 justify-center">
          <div className="h-[80px] text-neutral-800 justify-center items-center rounded-xl flex gap-3 bg-white p-4 shadow-sm">
            <h3 className="text-5xl font-light tracking-tight">94%</h3>
            <div className="flex flex-col items-start">
              <span className="text-xs font-medium tracking-wider text-neutral-500">
                IN 30 MINUTES
              </span>
              <span className="text-sm font-medium">Enhanced Hydration*</span>
            </div>
          </div>
          <div className="h-[80px] text-neutral-800 justify-center items-center rounded-xl flex gap-3 bg-white p-4 shadow-sm">
            <h3 className="text-5xl font-light tracking-tight">85%</h3>
            <div className="flex flex-col items-start">
              <span className="text-xs font-medium tracking-wider text-neutral-500">
                AFTER 28 DAYS
              </span>
              <span className="text-sm font-medium">Increased Radiance**</span>
            </div>
          </div>
          <div className="h-[80px] text-neutral-800 justify-center items-center rounded-xl flex gap-3 bg-white p-4 shadow-sm">
            <h3 className="text-5xl font-light tracking-tight">88%</h3>
            <div className="flex flex-col items-start">
              <span className="text-xs font-medium tracking-wider text-neutral-500">
                AFTER 1 MONTH
              </span>
              <span className="text-sm font-medium">Visible Results*</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-neutral-600 font-medium flex flex-col md:flex-row justify-center items-center  gap-2">
          <span className="text-center">
            Trusted by over 3,218 customers with an average rating of
          </span>
          <span>
            <span className="inline-flex justify-center gap-1">
              <Star className="size-4 fill-yellow-400 text-yellow-400" />
              <Star className="size-4 fill-yellow-400 text-yellow-400" />
              <Star className="size-4 fill-yellow-400 text-yellow-400" />
              <Star className="size-4 fill-yellow-400 text-yellow-400" />
              <StarHalf className="size-4 fill-yellow-400 text-yellow-400" />
            </span>
          </span>
        </p>
      </div>
      <p className="text-xs text-neutral-500 text-center mt-8">
        *Based on clinical studies conducted over 12 months with 1,000+
        participants
        <br />
        **Results may vary based on skin type and conditions
      </p>
    </section>
  );
}
