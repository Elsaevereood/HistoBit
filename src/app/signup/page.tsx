"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

export default function SignupPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current || !formRef.current) return;

    const ctx = gsap.context(() => {
      // Image reveal animation
      gsap.fromTo(
        ".img-reveal-overlay",
        { scaleY: 1 },
        {
          scaleY: 0,
          duration: 1.5,
          ease: "power4.inOut",
          transformOrigin: "top center",
        }
      );

      gsap.fromTo(
        imageRef.current,
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 2,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      // Form elements stagger animation
      const formElements = formRef.current?.querySelectorAll(".form-element");
      if (formElements) {
        gsap.fromTo(
          formElements,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.5,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen w-full flex flex-col-reverse md:flex-row bg-[#faf5ee]">
      {/* Left Panel - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-[#faf5ee] relative z-10">
        <div ref={formRef} className="w-full max-w-md">
          <div className="form-element mb-10">
            <Link href="/" className="inline-block mb-8">
              <span className="text-[#8a7a6e] hover:text-[#c2652a] transition-colors font-body text-sm flex items-center gap-2">
                &larr; Back to Home
              </span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-heading text-[#3a302a] mb-3">Join Histobit</h1>
            <p className="text-[#8a7a6e] font-body text-base">Create an account to explore history deeply.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="form-element space-y-2">
              <label htmlFor="name" className="block font-body text-sm font-medium text-[#3a302a]">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full bg-transparent border-b border-[#d8d0c8] py-3 px-2 text-[#3a302a] font-body focus:outline-none focus:border-[#c2652a] transition-colors placeholder:text-[#d8d0c8]"
                placeholder="Herodotus"
                required
              />
            </div>

            <div className="form-element space-y-2">
              <label htmlFor="email" className="block font-body text-sm font-medium text-[#3a302a]">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full bg-transparent border-b border-[#d8d0c8] py-3 px-2 text-[#3a302a] font-body focus:outline-none focus:border-[#c2652a] transition-colors placeholder:text-[#d8d0c8]"
                placeholder="historian@example.com"
                required
              />
            </div>

            <div className="form-element space-y-2">
              <label htmlFor="password" className="block font-body text-sm font-medium text-[#3a302a]">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full bg-transparent border-b border-[#d8d0c8] py-3 px-2 text-[#3a302a] font-body focus:outline-none focus:border-[#c2652a] transition-colors placeholder:text-[#d8d0c8]"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="form-element pt-4">
              <button
                type="submit"
                className="w-full bg-[#3a302a] hover:bg-[#c2652a] text-[#faf5ee] font-body py-4 rounded-xl transition-all duration-300 font-medium tracking-wide flex justify-center items-center group shadow-md hover:shadow-lg text-lg"
              >
                Create Account
                <span className="inline-block ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all">&rarr;</span>
              </button>
            </div>
          </form>

          <div className="form-element mt-10 text-center">
            <p className="font-body text-sm text-[#8a7a6e]">
              Already have an account?{" "}
              <Link href="/login" className="text-[#c2652a] font-medium hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Image */}
      <div className="w-full md:w-1/2 h-[40vh] md:h-screen relative overflow-hidden img-reveal-wrapper">
        <div className="img-reveal-overlay absolute inset-0 bg-[#c2652a] z-20 origin-top"></div>
        <div ref={imageRef} className="absolute inset-0 z-0">
          <Image
            src="/images/historian_portrait.png"
            alt="Historian portrait"
            fill
            className="object-cover object-top"
            priority
          />
          {/* Subtle gradient overlay for mood */}
          <div className="absolute inset-0 bg-gradient-to-l from-[#3a302a]/40 to-transparent"></div>
          <div className="grain-overlay"></div>
        </div>
      </div>
    </div>
  );
}
