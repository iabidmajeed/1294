// const scroll = new LocomotiveScroll({
//   el: document.querySelector("#main"),
//   smooth: true,
//   // lerp: 0.02,
// });
function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locomotiveAnimation();

//Header animation
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

//Hero section animation
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

//Marquee Text animation
function marqueText() {
  function animateForward() {
    gsap.to(".marquee", {
      x: "-200%",
      duration: 4,
      repeat: -1,
      ease: "none",
    });
    gsap.to(".marquee img", { rotate: 180 });
  }

  function animateBackward() {
    gsap.to(".marquee", {
      x: "0%",
      duration: 4,
      repeat: -1,
      ease: "none",
    });
    gsap.to(".marquee img", { rotate: 0 });
  }

  // Desktop (wheel)
  window.addEventListener("wheel", function (dets) {
    if (dets.deltaY > 0) animateForward();
    else animateBackward();
  });

  // Mobile (touch scroll)
  window.addEventListener("touchmove", function () {
    animateForward();
  });

  window.addEventListener("touchend", function () {
    animateBackward();
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
        scroller: "#main",
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
}
workedAgency();

//Website Open in External Browsers
//Website Open in External Browsers
function detectInAppBrowser() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;

  // More comprehensive in-app browser detection
  const inAppPatterns = [
    "LinkedIn",
    "FBAN", // Facebook App
    "FBAV", // Facebook App
    "Instagram",
    "Twitter",
    "WhatsApp",
    "Snapchat",
    "TikTok",
    "Line/",
    "WeChat",
    "Telegram",
    "Viber",
    "GSA/", // Google Search App
    "Pinterest",
  ];

  const isInApp = inAppPatterns.some((pattern) => ua.includes(pattern));

  // Additional check for iOS in-app browsers
  const isIOSInApp =
    /iPhone|iPad/.test(ua) && !ua.includes("Safari/") && ua.includes("Mobile/");

  // Additional check for Android WebView
  const isAndroidWebView = ua.includes("wv") && ua.includes("Android");

  if (isInApp || isIOSInApp || isAndroidWebView) {
    // Create overlay instead of replacing entire content
    const overlay = document.createElement("div");
    overlay.id = "browser-redirect-overlay";
    overlay.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 20px;
        color: #fff;
        font-family: Arial, sans-serif;
        z-index: 9999;
        box-sizing: border-box;
      ">
        <div style="
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 30px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          max-width: 400px;
          width: 100%;
        ">
          <h2 style="margin: 0 0 20px 0; font-size: 24px; font-weight: bold;">
            🌐 Browser Mein Kholiye
          </h2>
          <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.5;">
            Behtar experience ke liye is website ko apne browser mein kholiye.
          </p>
          <div style="margin: 20px 0; padding: 15px; background: rgba(255, 255, 255, 0.1); border-radius: 10px;">
            <p style="margin: 0; font-size: 14px;">
              📱 <strong>Kaise karein:</strong><br>
              Menu (⋯) ya Share button pe tap karke<br>
              "Open in Browser" select kariye
            </p>
          </div>
          <button onclick="hideOverlay()" 
                  style="
                    background: #fff;
                    color: #667eea;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 25px;
                    font-size: 14px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                  ">
            Continue Anyway
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Auto-hide after 10 seconds
    setTimeout(hideOverlay, 10000);
  }
}

// Function to hide the overlay
function hideOverlay() {
  const overlay = document.getElementById("browser-redirect-overlay");
  if (overlay) {
    overlay.style.display = "none";
  }
}

// Run detection when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", detectInAppBrowser);
} else {
  detectInAppBrowser();
}
