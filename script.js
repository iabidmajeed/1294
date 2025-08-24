// const scroll = new LocomotiveScroll({
//   el: document.querySelector("#main"),
//   smooth: true,
//   // lerp: 0.02,
// });

function headerAnimation() {
  // GSAP Timeline
  const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });
  // Logo animation
  tl.from(".site-logo", {
    y: -50,
    duration: 2,
    opacity: 0,
  })

    // Menu items one-by-one
    .from(
      "#menu-items a",
      {
        y: -30,
        opacity: 0,
        duration: 1.5,
        stagger: 0.15,
      },
      "-=0.9"
    ) // start a little earlier

    // CTA part (icons + button)
    .from(
      "#cta-part",
      {
        x: 50,
        opacity: 0,
      },
      "-=0.5"
    );
}
headerAnimation();

function heroAnimation() {
  document.addEventListener("DOMContentLoaded", () => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

    tl.from("#page1 video", { opacity: 0, scale: 1.1, duration: 1.5 }) // Cinematic fade-in of video
      .from("#page1 .overlay", { opacity: 0 }, "-=1") // Overlay fade-in
      .from(".developer", { y: 30, opacity: 0 }, "-=0.5") // Developer button
      .from("h3", { y: 30, opacity: 0 }, "-=0.8") // Subheading
      .from("p", { y: 30, opacity: 0 }, "-=0.8") // Paragraph
      .from(".hero-btn", { y: 30, opacity: 0, scale: 0.95 }); // CTA button
  });
}
heroAnimation();

function marqueText() {
  window.addEventListener("wheel", function (dets) {
    if (dets.deltaY > 0) {
      gsap.to(".marquee", {
        transform: "translateX(-200%)",
        duration: 4,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".marquee img", {
        rotate: 180,
      });
    } else {
      gsap.to(".marquee", {
        transform: "translateX(0%)",
        duration: 4,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".marquee img", {
        rotate: 0,
      });
    }
  });
}
marqueText();

//Animate Line
function animatedLine() {
  var path = `M 10 100 Q 500 100 990 100`;
  var finalPath = `M 10 100 Q 500 100 990 100`;

  var string = document.querySelector("#string");

  string.addEventListener("mousemove", function (dets) {
    var path = `M 10 100 Q 500 ${dets.y} 990 100`;
    gsap.to("svg path", {
      attr: { d: path },
      duration: 0.2,
      ease: "power3.out",
    });
  });

  string.addEventListener("mouseleave", function () {
    gsap.to("svg path", {
      attr: { d: finalPath },
      duration: 1.5,
      ease: "elastic.out(1,0.2)",
    });
  });
}
animatedLine();

//SHerry JS

Shery.textAnimate("#page1 h1", {
  style: 2,
  y: 10,
  delay: 0.3,
  duration: 2,
  ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  multiplier: 0.1,
});

// Services Section GSAP Code
function servicesAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Services Section Animation
  gsap
    .timeline({
      scrollTrigger: {
        trigger: "#our-services-section",
        start: "top 80%", // start animation when section is 80% in viewport
        end: "bottom 60%",
        toggleActions: "play none none reverse",
      },
    })
    .from("#our-services-section h3", {
      y: 40,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    })
    .from(
      "#our-services-section h2",
      {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4"
    )
    .from(
      "#services-row .border",
      {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.3,
      },
      "-=0.3"
    );
}
servicesAnimation();

// Mobile menu toggle functionality
function mobileToggle() {
  document.addEventListener("DOMContentLoaded", function () {
    const mobileToggle = document.querySelector(".mobile-toggle");
    const menuItems = document.getElementById("menu-items");
    const toggleIcon = mobileToggle.querySelector("i");

    mobileToggle.addEventListener("click", function () {
      menuItems.classList.toggle("active");

      // Toggle icon between menu and close
      if (menuItems.classList.contains("active")) {
        toggleIcon.className = "ri-close-line";
        mobileToggle.setAttribute("aria-label", "Close navigation menu");
      } else {
        toggleIcon.className = "ri-menu-line";
        mobileToggle.setAttribute("aria-label", "Toggle navigation menu");
      }
    });

    // Close menu when clicking on a menu item (mobile)
    const menuLinks = document.querySelectorAll("#menu-items a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", function () {
        if (window.innerWidth <= 768) {
          menuItems.classList.remove("active");
          toggleIcon.className = "ri-menu-line";
          mobileToggle.setAttribute("aria-label", "Toggle navigation menu");
        }
      });
    });

    // Close menu when resizing to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        menuItems.classList.remove("active");
        toggleIcon.className = "ri-menu-line";
        mobileToggle.setAttribute("aria-label", "Toggle navigation menu");
      }
    });

    // Close menu when clicking outside (mobile)
    document.addEventListener("click", function (event) {
      if (window.innerWidth <= 768) {
        const isClickInsideNav = document
          .getElementById("nav")
          .contains(event.target);

        if (!isClickInsideNav && menuItems.classList.contains("active")) {
          menuItems.classList.remove("active");
          toggleIcon.className = "ri-menu-line";
          mobileToggle.setAttribute("aria-label", "Toggle navigation menu");
        }
      }
    });
  });
}
mobileToggle();

//swiper js - portfolio section
function ourWork() {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3, // Desktop
    spaceBetween: 30,
    loop: true,
    speed: 3000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    freeMode: true,
    freeModeMomentum: false,
    breakpoints: {
      1024: { slidesPerView: 3, spaceBetween: 30 },
      768: { slidesPerView: 2, spaceBetween: 20 },
      0: { slidesPerView: 2, spaceBetween: 10 }, // Mobile
    },
  });
}
ourWork();

//Agency Work JS
function workedAgency() {
  // Side Panel Toggle
  const openBtn = document.getElementById("openAgencies");
  const closeBtn = document.getElementById("closeAgencies");
  const panel = document.getElementById("agenciesPanel");

  if (openBtn && closeBtn && panel) {
    openBtn.addEventListener("click", () => {
      panel.classList.add("active");
    });
    closeBtn.addEventListener("click", () => {
      panel.classList.remove("active");
    });
  }

  // Swiper Carousel
  var swiper = new Swiper(".agencySwiper", {
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
  });
}
workedAgency();
