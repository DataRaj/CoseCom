import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="py-12 sm:py-24 w-full max-w-screen-lg mx-auto flex justify-center px-4">
      <div className="flex justify-center md:justify-start md:max-w-max mx-auto md:pr-8 w-full items-center border rounded-t-2xl h-32 sm:h-52 relative">
        <Image
          width={335}
          height={666}
          src="/hero-a.png"
          alt="cover"
          className="absolute bottom-0 z-30 left-0 h-[220px] sm:h-[280px] md:h-[380px] w-auto drop-shadow-[1px_0px_0px_white]"
        />
        <p className="ml-20 md:ml-52 z-10 text-3xl text-center md:text-start sm:text-4xl md:text-[2.5rem] lg:text-6xl leading-[40px] lg:leading-[62px] font-extralight italic tracking-tighter">
          <span className="hidden sm:block">Timeless Beauty, Redefined!</span>
          Your Skin Deserves{" "}
          <span className="underline underline-offset-8 font-medium">
            the Best.
          </span>
        </p>
      </div>
    </section>
  );
}
