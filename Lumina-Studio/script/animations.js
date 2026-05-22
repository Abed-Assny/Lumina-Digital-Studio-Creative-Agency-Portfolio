document.addEventListener("DOMContentLoaded", (event) => {
  document.fonts.ready.then(() => {
    // Global GSAP Config
    // Smooth out frame rate jumps
    gsap.ticker.lagSmoothing(1000, 16);
    gsap.config({
      nullTargetWarn: false,
    });

    // Global ScrollTrigger Config
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });

    let largeScreen = gsap.matchMedia();

    largeScreen.add("(min-width:768px)", () => {
      gsap.registerPlugin(
        DrawSVGPlugin,
        MotionPathPlugin,
        ScrollTrigger,
        ScrollSmoother,
        SplitText,
      );
      // gsap code here!

      // pointer canvas

      function pointerCanvas() {
        const canvas = document.querySelector("#canvasCursor");

        if (!canvas) return;

        gsap.set(canvas, { xPercent: -50, yPercent: -50 });

        const canvasY = gsap.quickSetter(canvas, "y", "px");
        const canvasX = gsap.quickSetter(canvas, "x", "px");

        window.addEventListener("pointermove", (e) => {
          if (canvas.style.opacity === "0" || canvas.style.opacity === "") {
            canvas.style.opacity = "1";
          }

          const mouseY = e.clientY;
          const mouseX = e.clientX;

          canvasY(mouseY);
          canvasX(mouseX);
        });
      }

      pointerCanvas();

      //Titles Reveal
      
      function titlesReveal(target, value, type = "words", scrollSettings = null) {

        if(!target) return;

        const titlesSplit = new SplitText(target, {type:"chars, words, lines",});

        gsap.set(target, {autoAlpha:1,})

      return gsap.from(titlesSplit[type], {
          opacity: 0,
            y: 50,
            stagger: { each: 0.1, from: "random" },
            ease: "power4.out",
            duration: value,
            scrollTrigger: scrollSettings,
        })
      };

      // text reveal

      function textReveal(target, value, type = "words", scrollSettings = null) {
        if(!target) return;

        const TextReveal = new SplitText(target, {type:"chars, words, lines",});

        gsap.set(target, {autoAlpha:1,});

        return gsap.from(TextReveal[type], {
          opacity: 0,
                y: 50,
                ease: "power4.out",
                stagger: { each: 0.1, from: "random" },
                duration: 0.5,
        });
      };

      // hero

      // left part

      const textContant = {
        h4: document.querySelector(".textContant h4"),
        h1: document.querySelector(".textContant h1"),
        p: document.querySelector(".textContant p"),
      };

      function heroLeft() {
        if (!textContant.h4 || !textContant.h1 || !textContant.p) return;

        const left = gsap.timeline();

          left.add(titlesReveal(textContant.h4, 0.6,"words"))
              .add(titlesReveal(textContant.h1, 0.5,"words"))
              .add(textReveal(textContant.p, 0.5, "words"))

        return left;
      }

      // right

      const heroImage = document.querySelector("#heroImage");

      function heroRight() {
        if (!heroImage) return;

        const right = gsap.timeline();

        right.fromTo(
          heroImage,
          {
            scale: 1.5,
          },
          {
            scale: 1,
            clipPath: "inset(0% 0 0 0)",
            ease: "power2.inOut",
            duration: 1.5,
          },
        );

        return right;
      }

      // louderPage

      const louderElement = {
        louderPage: document.querySelector(".louderPage"),
        louder_part1: document.querySelector(".louder_part1"),
        louder_part2: document.querySelector(".louder_part2"),
        percentage: document.querySelector(".percentage"),
        louderPage_SVG: document.querySelector("#louderPage_SVG"),
        louderPage_Path: document.querySelector("#louderPage_Path"),
      };

      function louderPage() {
        if (
          !louderElement.louderPage ||
          !louderElement.louder_part1 ||
          !louderElement.louder_part2 ||
          !louderElement.percentage ||
          !louderElement.louderPage_Path ||
          !louderElement.louderPage_SVG
        )
          return;

        const value = { val: 0 };

        const mainTl = gsap.timeline({
          onComplete: () => {
            console.log("louder page complete");
            louderElement.louderPage.remove();

            gsap.set("body", { overflow: "auto", height: "auto" });

            ScrollSmoother.create({
              wrapper: "#smooth-wrapper",
              content: "#smooth-content",
              smooth: 1,
              effects: true,
              smoothTouch: 0.1,
            });
            ScrollTrigger.refresh();
          },
        });

        mainTl
          .to(value, {
            val: 100,
            duration: 2.5,
            ease: "power1.in",

            onUpdate: () => {
              louderElement.percentage.innerHTML = Math.floor(value.val);
            },
          })
          .to(louderElement.percentage, {
            opacity: 0,
          })

          .set(louderElement.louderPage_SVG, { autoAlpha: 1 })

          .fromTo(
            louderElement.louderPage_Path,
            {
              drawSVG: "0%",
            },
            {
              drawSVG: "100%",
              duration: 1,
              ease: "power4.in",
            },
          )

          .to(
            louderElement.louderPage_SVG,
            {
              opacity: 0,
              duration: 0.2,
            },
            "+=0.3",
          );

        //

        mainTl.add("startOpening");

        mainTl
          .to(
            louderElement.louder_part1,
            {
              xPercent: -100,
              duration: 1.2,
              ease: "power4.inOut",
            },
            "startOpening",
          )

          .to(
            louderElement.louder_part2,
            {
              yPercent: -100,
              duration: 1.2,
              ease: "power4.inOut",
            },
            "startOpening",
          )
          .set(["main", "header"], {autoAlpha:1}, "startOpening+=0.3")
          .add(heroLeft(), "startOpening+=0.3")
          .add(heroRight(), "startOpening+=1");
      }

      louderPage();

      // header navbar

      const navbarElement = {
        Hamburger: document.querySelector(".Hamburger"),
        navbar: document.querySelector(".navbar"),
        links: document.querySelectorAll(".navbar li"),
      };

      const navbarTl = gsap.timeline({ paused: true });

      navbarTl
        .set(navbarElement.navbar, {
          display: "flex",
          xPercent: 100,
        })

        .to(navbarElement.navbar, {
          xPercent: 0,
          duration: 0.8,
          ease: "expo.out",
        })

        .from(navbarElement.links, {
          opacity: 0,
          y: 50,
          stagger: { each: 0.2, from: "random" },
          ease: "back.out(1.7)",
        });

      function hamburgerMenu() {
        if (
          !navbarElement.Hamburger ||
          !navbarElement.links ||
          !navbarElement.navbar
        )
          return;

        navbarElement.Hamburger.classList.toggle("active");

        if (navbarElement.Hamburger.classList.contains("active")) {
          navbarTl.play();
        } else {
          navbarTl.reverse();
        }
      }
      navbarElement.Hamburger.addEventListener("click", hamburgerMenu);

      // ticker

      const ticker = {
        divTicker: document.querySelector(".div-ticker"),
        tickerContent: document.querySelector(".tickerContent"),
      };

      let Animation;

      function tickerftn() {
        if (!ticker.divTicker || !ticker.tickerContent) return;

        Animation = gsap.to(ticker.tickerContent, {
          xPercent: -50,
          ease: "none",
          duration: 15,
          repeat: -1,
        });

        ticker.divTicker.addEventListener("pointerenter", () => {
          Animation.pause();
        });
        ticker.divTicker.addEventListener("pointerleave", () => {
          Animation.play();
        });
      }

      tickerftn();

      // hamburger magnet

      const Elements = {
        hamburgerMenu: navbarElement.Hamburger,
        header: document.querySelector("header"),
      };
      // // hero image magnet

      // function heroImagemagnet() {
      const rightPart = document.querySelector(".rightPart");

      // Effect Magnet

      function createMagnetEffect(target, trigger, movementStrength = 0.5) {
        if (!target || !trigger) return;

        const setY = gsap.quickSetter(target, "y", "px");
        const setX = gsap.quickSetter(target, "x", "px");

        trigger.addEventListener("pointermove", (e) => {
          const rect = target.getBoundingClientRect();

          rectYCenter = rect.top + rect.height / 2;
          rectXCenter = rect.left + rect.width / 2;

          const mouseY = (e.clientY - rectYCenter) * movementStrength;
          const mouseX = (e.clientX - rectXCenter) * movementStrength;

          setY(mouseY);
          setX(mouseX);
        });

        trigger.addEventListener("pointerleave", () => {
          gsap.to(target, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: "power1.inOut",
          });
        });
      }

createMagnetEffect(heroImage, document.querySelector(".rightPart"), 0.1);
createMagnetEffect(navbarElement.Hamburger, document.querySelector("header nav"), 0.5);

      //  portfolioGallery
      function portfolioGallery() {
        const elementsGallery = {
          portfolioGallery: document.querySelector(".portfolioGallery"),
          images: gsap.utils.toArray("main .portfolioGallery .projectsContent .projects img",),
          titlePorjectsh2: document.querySelector(".titlePorjects h2"),
        };

        if (
          !elementsGallery.portfolioGallery ||
          !elementsGallery.titlePorjectsh2
        )
          return;

        titlesReveal(elementsGallery.titlePorjectsh2, 0.5, "chars", {
          trigger:".portfolioGallery",
          start:"top 95%",
        });

        elementsGallery.images.forEach((img) => {
          gsap.fromTo(
            img,
            {
              clipPath: "inset(0 0 100% 0)",
              scale: 1.5,
            },
            {
              clipPath: "inset(0 0 0% 0)",
              scale: 1,
              duration: 1.2,
              ease: "power4.out",
              scrollTrigger: {
                trigger: img,
                start: "top 90%",
              },
            },
          );

          elementsGallery.portfolioGallery.addEventListener(
            "pointerleave",
            () => {
              gsap.to(img, {
                x: 0,
                y: 0,
                duration: 0.3,
                ease: "power4.out",
              });
            },
          );
        });

        const setters = elementsGallery.images.map((img) => ({
          x: gsap.quickSetter(img, "x", "px"),
          y: gsap.quickSetter(img, "y", "px"),
        }));

        elementsGallery.portfolioGallery.addEventListener(
          "pointermove",
          (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            const moveX = (clientX - centerX) * 0.03;
            const moveY = (clientY - centerY) * 0.03;

            setters.forEach((set) => {
              set.x(moveX);
              set.y(moveY);
            });
          },
        );
      }

      portfolioGallery();

      // vision-section

      function visionSection() {
        const textVision = document.querySelector(".textVision");
        const titleVision = document.querySelector(".titleVision h2");

        const splitVision = new SplitText(textVision, {
          type: "chars, words, lines",
        });

        if (!textVision || !titleVision || !splitVision)
          return;

        titlesReveal(titleVision, 0.5, "chars", {trigger:".vision-section", start:"top 95%",});

        gsap.set(textVision, { autoAlpha: 1 });
        gsap.from(splitVision.chars, {
          duration: 1.5,
          opacity: 0,
          ease: "expo.out",
          stagger: { each: 0.1, from: "start" },

          motionPath: {
            path: () => [
              {
                x: gsap.utils.random(-500, 500),
                y: gsap.utils.random(-300, 300),
              },
              {
                x: gsap.utils.random(-200, 200),
                y: gsap.utils.random(-150, 150),
              },
              { x: 0, y: 0 },
            ],

            curviness: 2,
          },

          scrollTrigger: {
            trigger: ".vision-section",
            start: "top 60%",
          },
        });
      }

      visionSection();

      // scroll-section

      function scrollSection() {
        let AnimationHorizontal;

        const ElementsSection = {
          scrollSection: document.querySelector(".scroll-section"),
          horizontalWrapper: document.querySelector(".horizontal-wrapper"),
        };

        if (
          !ElementsSection.scrollSection ||
          !ElementsSection.horizontalWrapper
        )
          return;

        //
        AnimationHorizontal = gsap.to(ElementsSection.horizontalWrapper, {
          x: () =>
            -(ElementsSection.horizontalWrapper.scrollWidth - window.innerWidth
            ),
          scrollTrigger: {
            trigger: ElementsSection.scrollSection,
            start: "top top",
            end: () => "+=" + ElementsSection.horizontalWrapper.scrollWidth,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Horizontal Scroll Gallery
        const ElementsGallery = {
          imageBg: document.querySelectorAll(".imageBg"),
          numberStep: document.querySelectorAll(".numberStep span"),
          h3: document.querySelectorAll(".textContentHorizontal h3"),
          p: document.querySelectorAll(".textContentHorizontal p"),
        };

        if (
          !ElementsGallery.imageBg ||
          !ElementsGallery.numberStep ||
          !ElementsGallery.h3 ||
          !ElementsGallery.p
        )
          return;

        // timeline
        ElementsGallery.imageBg.forEach((img, i) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: img,
              containerAnimation: AnimationHorizontal,
              start: "left 95%",
              toggleActions: "play none none reverse",
            },
          });

          // image
          tl.fromTo(
            img,
            {
              clipPath: "inset(0 0 100% 0)",
            },
            {
              clipPath: "inset(0 0 0% 0)",
              ease: "power4.inOut",
              duration: 0.8,
            },
          );

          //  numberStep
          if (ElementsGallery.numberStep[i]) {
            tl.from(
              ElementsGallery.numberStep[i],
              {
                opacity: 0,
                y: 50,
                ease: "power4.out",
                duration: 1,
              },
              "-=0.4",
            );
          }

          //textContentHorizontal h3
          if (ElementsGallery.h3[i]) {

            tl.add(titlesReveal(ElementsGallery.h3[i], 0.8, "words"),"-=0.7");
          }

          // textContentHorizontal p
          if (ElementsGallery.p[i]) {

            tl.add(textReveal(ElementsGallery.p[i], 0.5, "words"),"-=0.8")
          }
        });
      }

      scrollSection();

      // Our Expertise
      function ourExpertise() {
        const Expertiseh2 = document.querySelector(".ourExpertise h2");

        if (!Expertiseh2) return;

        titlesReveal(Expertiseh2, 0.5, "chars", {trigger:".ourExpertise", start:"top 95%",})

        const items = document.querySelectorAll(".ourExpertise ul li");

        function hideAllImages(exceptImage = null) {
          if (!items) return;

          items.forEach((item) => {
            const img = item.querySelector(".imageExpertise");
            if (img && img !== exceptImage) {
              gsap.to(img, {
                autoAlpha: 0,
                duration: 0.3,
                ease: "power2.inOut",
              });
            }
          });
        }

        items.forEach((item) => {
          const btn = item.querySelector(".btnExpertise");
          const image = item.querySelector(".imageExpertise");

          if (!btn || !image) return;

          gsap.set(image, { autoAlpha: 0 });

          btn.addEventListener("pointerenter", (e) => {
            e.stopPropagation();

            const isVisible = gsap.getProperty(image, "autoAlpha") === 1;

            if (!isVisible) {
              hideAllImages(image);
            }

            gsap.to(image, {
              autoAlpha: isVisible ? 0 : 1,
              duration: 0.4,
              ease: "power2.inOut",
            });
          });

          document.addEventListener("click", (e) => {
            if (!item.contains(e.target)) {
              gsap.to(image, {
                autoAlpha: 0,
                duration: 0.3,
                ease: "power2.inOut",
              });
            }
          });

          const setX = gsap.quickSetter(image, "x", "px");
          const setY = gsap.quickSetter(image, "y", "px");

          item.addEventListener("pointermove", (e) => {
            const rect = item.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            setX((e.clientX - centerX) * 0.15);
            setY((e.clientY - centerY) * 0.15);
          });

          item.addEventListener("pointerleave", () => {
            gsap.to(image, {
              x: 0,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
            });
          });
        });
      }

      ourExpertise();

      // The Atmosphere

      function theAtmosphere() {
        const section = document.querySelector(".theAtmosphere");
        const Atmosphereh3 = document.querySelector(".atmosphereContent h2");
        const icons = document.querySelectorAll(".icones");
        const bgImage = document.querySelector(".atmosphereContent img");

        if (!section || !Atmosphereh3 || !icons || !bgImage) return;
        // h2
        titlesReveal(Atmosphereh3, 0.5, "chars", {trigger:section, start:"top 80%",});

        //Parallax
        gsap.fromTo(
          bgImage,
          {
            yPercent: -15,
          },
          {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );

        // icones
        icons.forEach((icon) => {
          const speed = parseFloat(icon.getAttribute("data-speed"));

          gsap.to(icon, {
            yPercent: -150 * speed,
            rotate: 20 * speed,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        });
      }

      theAtmosphere();
    });

    // smallScreen

    let smallScreen = gsap.matchMedia();

    smallScreen.add("(max-width:768px)", () => {
      // function i went

      gsap.registerPlugin(
        DrawSVGPlugin,
        MotionPathPlugin,
        ScrollTrigger,
        ScrollSmoother,
        SplitText,
      );
      // gsap code here!

      // pointer canvas

      function pointerCanvas() {
        const canvas = document.querySelector("#canvasCursor");

        if (!canvas) return;

        gsap.set(canvas, { xPercent: -50, yPercent: -50 });

        const canvasY = gsap.quickSetter(canvas, "y", "px");
        const canvasX = gsap.quickSetter(canvas, "x", "px");

        window.addEventListener("pointermove", (e) => {
          if (canvas.style.opacity === "0" || canvas.style.opacity === "") {
            canvas.style.opacity = "1";
          }

          const mouseY = e.clientY;
          const mouseX = e.clientX;

          canvasY(mouseY);
          canvasX(mouseX);
        });
      }

      pointerCanvas();

      //Titles Reveal
      
      function titlesReveal(target, value, type = "words", scrollSettings = null) {

        if(!target) return;

        const titlesSplit = new SplitText(target, {type:"chars, words, lines",});

        gsap.set(target, {autoAlpha:1,})

      return gsap.from(titlesSplit[type], {
          opacity: 0,
            y: 50,
            stagger: { each: 0.1, from: "random" },
            ease: "power4.out",
            duration: value,
            scrollTrigger: scrollSettings,
        })
      };

      // text reveal

      function textReveal(target, value, type = "words", scrollSettings = null) {
        if(!target) return;

        const TextReveal = new SplitText(target, {type:"chars, words, lines",});

        gsap.set(target, {autoAlpha:1,});

        return gsap.from(TextReveal[type], {
          opacity: 0,
                y: 50,
                ease: "power4.out",
                stagger: { each: 0.1, from: "random" },
                duration: 0.5,
        });
      };

      // hero

      // left part

      const textContant = {
        h4: document.querySelector(".textContant h4"),
        h1: document.querySelector(".textContant h1"),
        p: document.querySelector(".textContant p"),
      };

      function heroLeft() {
        if (!textContant.h4 || !textContant.h1 || !textContant.p) return;

        const left = gsap.timeline();
        left
          .set(["main", "header"], { autoAlpha: 1 })

          left.add(titlesReveal(textContant.h4, 0.6,"words"))
              .add(titlesReveal(textContant.h1, 0.5,"words"))
              .add(textReveal(textContant.p, 0.5, "words"))

        return left;
      }

      // right

      const heroImage = document.querySelector("#heroImage");

      function heroRight() {
        if (!heroImage) return;

        const right = gsap.timeline();

        right.fromTo(
          heroImage,
          {
            scale: 1.5,
          },
          {
            scale: 1,
            clipPath: "inset(0% 0 0 0)",
            ease: "power2.inOut",
            duration: 1.5,
          },
        );

        return right;
      }

      // louderPage

      const louderElement = {
        louderPage: document.querySelector(".louderPage"),
        louder_part1: document.querySelector(".louder_part1"),
        louder_part2: document.querySelector(".louder_part2"),
        percentage: document.querySelector(".percentage"),
        louderPage_SVG: document.querySelector("#louderPage_SVG"),
        louderPage_Path: document.querySelector("#louderPage_Path"),
      };

      function louderPage() {
        if (
          !louderElement.louderPage ||
          !louderElement.louder_part1 ||
          !louderElement.louder_part2 ||
          !louderElement.percentage ||
          !louderElement.louderPage_Path ||
          !louderElement.louderPage_SVG
        )
          return;

        const value = { val: 0 };

        const mainTl = gsap.timeline({
          onComplete: () => {
            console.log("louder page complete");
            louderElement.louderPage.remove();

            gsap.set("body", { overflow: "auto", height: "auto" });

            ScrollSmoother.create({
              wrapper: "#smooth-wrapper",
              content: "#smooth-content",
              smooth: 1,
              effects: true,
              smoothTouch: 0.1,
            });
            ScrollTrigger.refresh();
          },
        });

        mainTl
          .to(value, {
            val: 100,
            duration: 2.5,
            ease: "power1.in",

            onUpdate: () => {
              louderElement.percentage.innerHTML = Math.floor(value.val);
            },
          })
          .to(louderElement.percentage, {
            opacity: 0,
          })

          .set(louderElement.louderPage_SVG, { autoAlpha: 1 })

          .fromTo(
            louderElement.louderPage_Path,
            {
              drawSVG: "0%",
            },
            {
              drawSVG: "100%",
              duration: 1,
              ease: "power4.in",
            },
          )

          .to(
            louderElement.louderPage_SVG,
            {
              opacity: 0,
              duration: 0.2,
            },
            "+=0.3",
          );

        //

        mainTl.add("startOpening");

        mainTl
          .to(
            louderElement.louder_part1,
            {
              xPercent: -100,
              duration: 1.2,
              ease: "power4.inOut",
            },
            "startOpening",
          )

          .to(
            louderElement.louder_part2,
            {
              yPercent: -100,
              duration: 1.2,
              ease: "power4.inOut",
            },
            "startOpening",
          )

          .add(heroLeft(), "startOpening+=0.3")
          .add(heroRight(), "startOpening+=1");
      }

      louderPage();

      // header navbar

      const navbarElement = {
        Hamburger: document.querySelector(".Hamburger"),
        navbar: document.querySelector(".navbar"),
        links: document.querySelectorAll(".navbar li"),
      };

      const navbarTl = gsap.timeline({ paused: true });

      navbarTl
        .set(navbarElement.navbar, {
          display: "flex",
          xPercent: 100,
        })

        .to(navbarElement.navbar, {
          xPercent: 0,
          duration: 0.8,
          ease: "expo.out",
        })

        .from(navbarElement.links, {
          opacity: 0,
          y: 50,
          stagger: { each: 0.2, from: "random" },
          ease: "back.out(1.7)",
        });

      function hamburgerMenu() {
        if (
          !navbarElement.Hamburger ||
          !navbarElement.links ||
          !navbarElement.navbar
        )
          return;

        navbarElement.Hamburger.classList.toggle("active");

        if (navbarElement.Hamburger.classList.contains("active")) {
          navbarTl.play();
        } else {
          navbarTl.reverse();
        }
      }
      navbarElement.Hamburger.addEventListener("click", hamburgerMenu);

      // ticker

      const ticker = {
        divTicker: document.querySelector(".div-ticker"),
        tickerContent: document.querySelector(".tickerContent"),
      };

      let Animation;

      function tickerftn() {
        if (!ticker.divTicker || !ticker.tickerContent) return;

        Animation = gsap.to(ticker.tickerContent, {
          xPercent: -50,
          ease: "none",
          duration: 15,
          repeat: -1,
        });

        ticker.divTicker.addEventListener("pointerenter", () => {
          Animation.pause();
        });
        ticker.divTicker.addEventListener("pointerleave", () => {
          Animation.play();
        });
      }

      tickerftn();

      // hamburger magnet

      const Elements = {
        hamburgerMenu: navbarElement.Hamburger,
        header: document.querySelector("header"),
      };
      // // hero image magnet

      // function heroImagemagnet() {
      const rightPart = document.querySelector(".rightPart");

      // Effect Magnet

      function createMagnetEffect(target, trigger, movementStrength = 0.5) {
        if (!target || !trigger) return;

        const setY = gsap.quickSetter(target, "y", "px");
        const setX = gsap.quickSetter(target, "x", "px");

        trigger.addEventListener("pointermove", (e) => {
          const rect = target.getBoundingClientRect();

          rectYCenter = rect.top + rect.height / 2;
          rectXCenter = rect.left + rect.width / 2;

          const mouseY = (e.clientY - rectYCenter) * movementStrength;
          const mouseX = (e.clientX - rectXCenter) * movementStrength;

          setY(mouseY);
          setX(mouseX);
        });

        trigger.addEventListener("pointerleave", () => {
          gsap.to(target, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: "power1.inOut",
          });
        });
      }

createMagnetEffect(heroImage, document.querySelector(".rightPart"), 0.1);
createMagnetEffect(navbarElement.Hamburger, document.querySelector("header nav"), 0.5);

      //  portfolioGallery
      function portfolioGallery() {
        const elementsGallery = {
          portfolioGallery: document.querySelector(".portfolioGallery"),
          images: gsap.utils.toArray("main .portfolioGallery .projectsContent .projects img",),
          titlePorjectsh2: document.querySelector(".titlePorjects h2"),
        };

        if (
          !elementsGallery.portfolioGallery ||
          !elementsGallery.titlePorjectsh2
        )
          return;

        titlesReveal(elementsGallery.titlePorjectsh2, 0.5, "chars", {
          trigger:".portfolioGallery",
          start:"top 95%",
        });

        elementsGallery.images.forEach((img) => {
          gsap.fromTo(
            img,
            {
              clipPath: "inset(0 0 100% 0)",
              scale: 1.5,
            },
            {
              clipPath: "inset(0 0 0% 0)",
              scale: 1,
              duration: 1.2,
              ease: "power4.out",
              scrollTrigger: {
                trigger: img,
                start: "top 90%",
              },
            },
          );

          elementsGallery.portfolioGallery.addEventListener(
            "pointerleave",
            () => {
              gsap.to(img, {
                x: 0,
                y: 0,
                duration: 0.3,
                ease: "power4.out",
              });
            },
          );
        });

        const setters = elementsGallery.images.map((img) => ({
          x: gsap.quickSetter(img, "x", "px"),
          y: gsap.quickSetter(img, "y", "px"),
        }));

        elementsGallery.portfolioGallery.addEventListener(
          "pointermove",
          (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            const moveX = (clientX - centerX) * 0.03;
            const moveY = (clientY - centerY) * 0.03;

            setters.forEach((set) => {
              set.x(moveX);
              set.y(moveY);
            });
          },
        );
      }

      portfolioGallery();

      // vision-section

      function visionSection() {
        const textVision = document.querySelector(".textVision");
        const titleVision = document.querySelector(".titleVision h2");

        const splitVision = new SplitText(textVision, {
          type: "chars, words, lines",
        });

        if (!textVision || !titleVision || !splitVision)
          return;

        titlesReveal(titleVision, 0.5, "chars", {trigger:".vision-section", start:"top 95%",});

        gsap.set(textVision, { autoAlpha: 1 });
        gsap.from(splitVision.chars, {
          duration: 1.5,
          opacity: 0,
          ease: "expo.out",
          stagger: { each: 0.1, from: "start" },

          motionPath: {
            path: () => [
              {
                x: gsap.utils.random(-500, 500),
                y: gsap.utils.random(-300, 300),
              },
              {
                x: gsap.utils.random(-200, 200),
                y: gsap.utils.random(-150, 150),
              },
              { x: 0, y: 0 },
            ],

            curviness: 2,
          },

          scrollTrigger: {
            trigger: ".vision-section",
            start: "top 60%",
          },
        });
      }

      visionSection();

      // scroll-section

      function scrollSection() {
        let AnimationHorizontal;

        const ElementsSection = {
          scrollSection: document.querySelector(".scroll-section"),
          horizontalWrapper: document.querySelector(".horizontal-wrapper"),
        };

        if (
          !ElementsSection.scrollSection ||
          !ElementsSection.horizontalWrapper
        )
          return;

        //
        AnimationHorizontal = gsap.to(ElementsSection.horizontalWrapper, {
          x: () =>
            -(ElementsSection.horizontalWrapper.scrollWidth - window.innerWidth
            ),
          scrollTrigger: {
            trigger: ElementsSection.scrollSection,
            start: "top top",
            end: () => "+=" + ElementsSection.horizontalWrapper.scrollWidth,
            pin: true,
            scrub: 3,
            invalidateOnRefresh: true,
          },
        });

        // Horizontal Scroll Gallery
        const ElementsGallery = {
          imageBg: document.querySelectorAll(".imageBg"),
          numberStep: document.querySelectorAll(".numberStep span"),
          h3: document.querySelectorAll(".textContentHorizontal h3"),
          p: document.querySelectorAll(".textContentHorizontal p"),
        };

        if (
          !ElementsGallery.imageBg ||
          !ElementsGallery.numberStep ||
          !ElementsGallery.h3 ||
          !ElementsGallery.p
        )
          return;

        // timeline
        ElementsGallery.imageBg.forEach((img, i) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: img,
              containerAnimation: AnimationHorizontal,
              start: "left 95%",
              toggleActions: "play none none reverse",
            },
          });

          // image
          tl.fromTo(
            img,
            {
              clipPath: "inset(0 0 100% 0)",
            },
            {
              clipPath: "inset(0 0 0% 0)",
              ease: "power4.inOut",
              duration: 0.8,
            },
          );

          //  numberStep
          if (ElementsGallery.numberStep[i]) {
            tl.from(
              ElementsGallery.numberStep[i],
              {
                opacity: 0,
                y: 50,
                ease: "power4.out",
                duration: 1,
              },
              "-=0.4",
            );
          }

          //textContentHorizontal h3
          if (ElementsGallery.h3[i]) {

            tl.add(titlesReveal(ElementsGallery.h3[i], 0.8, "words"),"-=0.7");
          }

          // textContentHorizontal p
          if (ElementsGallery.p[i]) {

            tl.add(textReveal(ElementsGallery.p[i], 0.5, "words"),"-=0.8")
          }
        });
      }

      scrollSection();

      // Our Expertise
      function ourExpertise() {
        const Expertiseh2 = document.querySelector(".ourExpertise h2");

        if (!Expertiseh2) return;

        titlesReveal(Expertiseh2, 0.5, "chars", {trigger:".ourExpertise", start:"top 95%",})

        const items = document.querySelectorAll(".ourExpertise ul li");

        function hideAllImages(exceptImage = null) {
          if (!items) return;

          items.forEach((item) => {
            const img = item.querySelector(".imageExpertise");
            if (img && img !== exceptImage) {
              gsap.to(img, {
                autoAlpha: 0,
                duration: 0.3,
                ease: "power2.inOut",
              });
            }
          });
        }

        items.forEach((item) => {
          const btn = item.querySelector(".btnExpertise");
          const image = item.querySelector(".imageExpertise");

          if (!btn || !image) return;

          gsap.set(image, { autoAlpha: 0 });

          btn.addEventListener("pointerenter", (e) => {
            e.stopPropagation();

            const isVisible = gsap.getProperty(image, "autoAlpha") === 1;

            if (!isVisible) {
              hideAllImages(image);
            }

            gsap.to(image, {
              autoAlpha: isVisible ? 0 : 1,
              duration: 0.4,
              ease: "power2.inOut",
            });
          });

          document.addEventListener("click", (e) => {
            if (!item.contains(e.target)) {
              gsap.to(image, {
                autoAlpha: 0,
                duration: 0.3,
                ease: "power2.inOut",
              });
            }
          });

          const setX = gsap.quickSetter(image, "x", "px");
          const setY = gsap.quickSetter(image, "y", "px");

          item.addEventListener("pointermove", (e) => {
            const rect = item.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            setX((e.clientX - centerX) * 0.15);
            setY((e.clientY - centerY) * 0.15);
          });

          item.addEventListener("pointerleave", () => {
            gsap.to(image, {
              x: 0,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
            });
          });
        });
      }

      ourExpertise();

      // The Atmosphere

      function theAtmosphere() {
        const section = document.querySelector(".theAtmosphere");
        const Atmosphereh3 = document.querySelector(".atmosphereContent h2");
        const icons = document.querySelectorAll(".icones");
        const bgImage = document.querySelector(".atmosphereContent img");

        if (!section || !Atmosphereh3 || !icons || !bgImage) return;
        // h2
        titlesReveal(Atmosphereh3, 0.5, "chars", {trigger:section, start:"top 80%",});

        //Parallax
        gsap.fromTo(
          bgImage,
          {
            yPercent: -15,
          },
          {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );

        // icones
        icons.forEach((icon) => {
          const speed = parseFloat(icon.getAttribute("data-speed"));

          gsap.to(icon, {
            yPercent: -150 * speed,
            rotate: 20 * speed,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        });
      }

      theAtmosphere();
    });


    })

    });

