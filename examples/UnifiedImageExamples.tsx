"use client"

import { UnifiedImage } from "@/components/ui/UnifiedImage"

export default function UnifiedImageExamples() {
  // Example gallery images
  const galleryImages = [
    {
      src: "/images/projects/coral-springs-1.png",
      alt: "Coral Springs Project 1",
      width: 800,
      height: 600,
    },
    {
      src: "/images/projects/coral-springs-2.png",
      alt: "Coral Springs Project 2",
      width: 800,
      height: 600,
    },
    {
      src: "/images/projects/coral-springs-3.png",
      alt: "Coral Springs Project 3",
      width: 800,
      height: 600,
    },
    {
      src: "/images/projects/coral-springs-4.png",
      alt: "Coral Springs Project 4",
      width: 800,
      height: 600,
    },
    {
      src: "/images/projects/coral-springs-5.png",
      alt: "Coral Springs Project 5",
      width: 800,
      height: 600,
    },
    {
      src: "/images/projects/coral-springs-6.png",
      alt: "Coral Springs Project 6",
      width: 800,
      height: 600,
    },
  ]

  return (
    <div className="space-y-16 py-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Standard Image</h2>
        <UnifiedImage
          src="/images/services/door-repair-new.webp"
          alt="Door repair service"
          width={800}
          height={600}
          className="rounded-lg"
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Hero Image</h2>
        <div className="h-[500px] relative">
          <UnifiedImage
            variant="hero"
            src="/images/service-truck.png"
            alt="Service truck"
            overlayClassName="bg-gradient-to-r from-black to-transparent"
            overlayOpacity={0.6}
            objectPosition="center 40%"
            containerClassName="h-full"
          />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white max-w-2xl">Professional Garage Door Services</h1>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Responsive Image</h2>
        <UnifiedImage
          variant="responsive"
          src="/images/services/door-repair-new.webp"
          mobileSrc="/images/services/opener-repair-new.webp"
          alt="Responsive image example"
          width={800}
          height={600}
          className="rounded-lg"
          containerClassName="max-w-2xl mx-auto"
        />
        <p className="text-center mt-2 text-gray-500">
          This image changes based on screen size. Resize your browser to see the effect.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Lazy-Loaded Image</h2>
        <UnifiedImage
          variant="lazy"
          src="/images/services/door-repair-technician.jpg"
          alt="Technician repairing a garage door"
          width={800}
          height={600}
          className="rounded-lg"
          containerClassName="max-w-2xl mx-auto"
          threshold={0.2}
        />
        <p className="text-center mt-2 text-gray-500">This image only loads when scrolled into view.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Gallery with Lightbox</h2>
        <UnifiedImage
          variant="gallery"
          images={galleryImages}
          lightbox={true}
          containerClassName="max-w-4xl mx-auto"
          thumbnailClassName="hover:scale-105 transition-transform duration-300"
        />
      </section>
    </div>
  )
}
