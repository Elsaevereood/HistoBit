import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ===== SPLIT TEXT INTO WORDS ===== */
export function splitTextIntoWords(element: HTMLElement): HTMLSpanElement[] {
  const text = element.textContent || "";
  const words = text.split(/\s+/).filter(Boolean);
  element.innerHTML = "";
  const spans: HTMLSpanElement[] = [];

  words.forEach((word, i) => {
    const wrapper = document.createElement("span");
    wrapper.className = "split-word";
    wrapper.style.display = "inline-block";
    wrapper.style.overflow = "hidden";

    const inner = document.createElement("span");
    inner.className = "split-word-inner";
    inner.textContent = word;
    inner.style.display = "inline-block";
    inner.style.transform = "translateY(30px)";
    inner.style.opacity = "0";

    wrapper.appendChild(inner);
    element.appendChild(wrapper);

    if (i < words.length - 1) {
      element.appendChild(document.createTextNode(" "));
    }

    spans.push(inner);
  });

  return spans;
}

/* ===== ANIMATE SPLIT WORDS ===== */
export function animateSplitWords(
  spans: HTMLSpanElement[],
  options?: { delay?: number; scrollTrigger?: ScrollTrigger.Vars }
) {
  return gsap.to(spans, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.055,
    ease: "power3.out",
    delay: options?.delay || 0,
    scrollTrigger: options?.scrollTrigger,
  });
}

/* ===== IMAGE REVEAL ===== */
export function setupImageReveal(wrapper: HTMLElement) {
  const overlay = wrapper.querySelector(".img-reveal-overlay") as HTMLElement;
  const img = wrapper.querySelector("img") as HTMLElement;

  if (!overlay || !img) return;

  const revealNow = () => {
    gsap.to(overlay, {
      scaleY: 0,
      transformOrigin: "top center",
      duration: 0.85,
      ease: "power3.inOut",
      onComplete: () => {
        overlay.style.display = "none";
      },
    });
    gsap.to(img, {
      scale: 1.0,
      duration: 1.0,
      delay: 0.1,
      ease: "power2.out",
    });
  };

  // Start: overlay fully covers image, image slightly scaled up
  gsap.set(overlay, { scaleY: 1, transformOrigin: "top center" });
  gsap.set(img, { scale: 1.08 });

  // Check if already in viewport — fire immediately with a small delay
  const rect = wrapper.getBoundingClientRect();
  const inViewport = rect.top < window.innerHeight && rect.bottom > 0;

  if (inViewport) {
    gsap.delayedCall(0.3, revealNow);
  } else {
    ScrollTrigger.create({
      trigger: wrapper,
      start: "top bottom",
      once: true,
      onEnter: revealNow,
    });
  }
}

/* ===== DEFAULT SCROLL REVEAL ===== */
export function setupScrollReveal(
  element: HTMLElement,
  options?: { delay?: number }
) {
  gsap.set(element, { y: 20, opacity: 0 });

  ScrollTrigger.create({
    trigger: element,
    start: "top bottom-=100px",
    once: true,
    onEnter: () => {
      gsap.to(element, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        delay: options?.delay || 0,
      });
    },
  });
}

/* ===== COUNT UP ANIMATION ===== */
export function countUpAnimation(
  element: HTMLElement,
  target: number,
  suffix: string,
  duration: number = 1.8
) {
  const obj = { value: 0 };
  return gsap.to(obj, {
    value: target,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      element.textContent = Math.round(obj.value).toLocaleString() + suffix;
    },
  });
}

/* ===== FIVE-LAYER CARD HOVER ===== */
export function setupCardHover(card: HTMLElement) {
  const image = card.querySelector(".card-hover-img") as HTMLElement;
  // Glow lives in the parent wrapper, outside overflow:hidden card
  const glow = card.parentElement?.querySelector(".card-glow") as HTMLElement;
  const sheen = card.querySelector(".card-sheen") as HTMLElement;

  function handleMouseMove(e: MouseEvent) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 8;
    const rotateX = ((centerY - y) / centerY) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;

    if (sheen) {
      sheen.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 235, 200, 0.15), transparent 60%)`;
      sheen.style.opacity = "1";
    }
  }

  function handleMouseEnter() {
    card.style.transition = "transform 300ms ease-out";
    card.style.transform = "perspective(1000px) scale(1.04)";

    if (image) {
      image.style.transition = "filter 600ms ease";
      image.style.filter = "grayscale(0%)";
    }

    if (glow) {
      glow.style.opacity = "1";
      glow.style.transform = "scale(1.0)";
    }

    setTimeout(() => {
      card.style.transition = "none";
    }, 300);
  }

  function handleMouseLeave() {
    card.style.transition = "transform 450ms ease";
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.0)";

    if (image) {
      image.style.transition = "filter 450ms ease";
      image.style.filter = "grayscale(100%)";
    }

    if (glow) {
      glow.style.opacity = "0";
      glow.style.transform = "scale(0.85)";
    }

    if (sheen) {
      sheen.style.opacity = "0";
    }
  }

  card.addEventListener("mousemove", handleMouseMove);
  card.addEventListener("mouseenter", handleMouseEnter);
  card.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    card.removeEventListener("mousemove", handleMouseMove);
    card.removeEventListener("mouseenter", handleMouseEnter);
    card.removeEventListener("mouseleave", handleMouseLeave);
  };
}

/* ===== HEADING SCROLL ANIMATION HOOK ===== */
export function setupHeadingAnimation(heading: HTMLElement, scrollBased: boolean = true) {
  const spans = splitTextIntoWords(heading);
  if (scrollBased) {
    animateSplitWords(spans, {
      scrollTrigger: {
        trigger: heading,
        start: "top 85%",
        once: true,
      },
    });
  }
  return spans;
}
