import Image from "next/image";

export default function InfiniteScroll() {
  const items = [
    <div
      key="1"
      className="relative flex justify-center items-center group px-10"
    >
      <Image
        src="/olive.jpg"
        alt="Olive tree"
        width={1000}
        height={600}
        className="animate-scroll-card"
      />
      <h3 className="text-6xl font-bold text-black absolute">Olive</h3>
    </div>,
    <div
      key="2"
      className="relative flex justify-center items-center group px-10"
    >
      <Image
        src="/argan.jpg"
        alt="Argan tree"
        width={1000}
        height={600}
        className="animate-scroll-card"
      />
      <h3 className="text-6xl font-bold text-black absolute">Argan</h3>
    </div>,
    ,
    <div
      key="3"
      className="relative flex justify-center items-center group px-10"
    >
      <Image
        src="/avocado.jpg"
        alt="Avocado tree"
        width={1000}
        height={600}
        className="animate-scroll-card"
      />
      <h3 className="text-6xl font-bold text-black absolute">Avocado</h3>
    </div>,
    <div
      key="4"
      className="relative flex justify-center items-center group px-10"
    >
      <Image
        src="/coconut.jpg"
        alt="Coconut tree"
        width={1000}
        height={600}
        className="animate-scroll-card"
      />
      <h3 className="text-6xl font-bold text-black absolute">Coconut</h3>
    </div>,
    <div
      key="5"
      className="relative flex justify-center items-center group px-10"
    >
      <Image
        src="/rosehip.jpg"
        alt="Rosehip tree"
        width={1000}
        height={600}
        className="animate-scroll-card"
      />
      <h3 className="text-6xl font-bold text-black absolute">Rosehip</h3>
    </div>,
    <div
      key="6"
      className="relative flex justify-center items-center group px-10"
    >
      <Image
        src="/almond.jpg"
        alt="Almond tree"
        width={1000}
        height={600}
        className="animate-scroll-card"
      />
      <h3 className="text-6xl font-bold text-black absolute">Almond</h3>
    </div>,
  ];
  return (
    <section className="py-12 sm:py-24 px-4 w-full">
      <div className="text-center mb-10 sm:mb-16">
        <h2 className="text-3xl sm:text-5xl font-light text-foreground mb-3">
          Pure & Precious Oils
        </h2>
        <p className="sm:text-lg text-foreground/60">
          Ethically sourced rare oils, carefully selected for their
          extraordinary benefits
        </p>
      </div>
      <div className="bg-muted dark:bg-[#F8F8F8] h-52 w-full flex items-center overflow-hidden relative">
        <div className="animate-scroll flex items-center absolute whitespace-nowrap">
          {items}
          {items}
          {items}
        </div>
      </div>
    </section>
  );
}
