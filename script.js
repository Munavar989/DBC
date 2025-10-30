const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links li a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: "smooth",
      });
    }
  });
});

// Form Validation and Submission
// Include this only if you're not already loading email.min.js in your HTML
document.addEventListener('DOMContentLoaded', function () {
  emailjs.init("EXVDcCkBElp40aR_E"); // Your EmailJS public key

  const form = document.getElementById('contact-form');
  console.log("Form found:", form);

  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = form.elements["name"].value.trim();
    const phone = form.elements["phone"].value.trim();
    const email = form.elements["email"].value.trim();
    const subject = form.elements["subject"].value.trim();
    const message = form.elements["message"].value.trim();

    if (!name || !email || !subject || !message || !phone) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Details',
        text: 'Please fill in all the required fields before submitting.',
        background: '#ffffff',
        color: '#004aad',
        timer: 2200,
        showConfirmButton: false,
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
        background: '#ffffff',
        color: '#004aad',
        timer: 2200,
        showConfirmButton: false,
      });
      return;
    }

    const templateParams = { from_name: name, email, phone, subject, message };

    // Fixed loading box
    Swal.fire({
      title: 'Sending Message...',
      html: '<div class="custom-spinner"></div>',
      allowOutsideClick: false,
      showConfirmButton: false,
      background: '#ffffff',
      color: '#004aad',
      didOpen: () => {
        const loader = Swal.getLoader();
        if (loader) loader.style.display = 'none';
      }
    });

    try {
      await emailjs.send("service_lliqosb", "template_kbqluem", templateParams);

      Swal.fire({
        icon: 'success',
        title: 'Message Sent Successfully!',
        text: 'Thank you for contacting us. We’ll get back to you soon.',
        background: 'linear-gradient(145deg, #f4f9ff, #e7f1ff)',
        color: '#004aad',
        showConfirmButton: false,
        timer: 2500
      });

      form.reset();
    } catch (error) {
      console.error('❌ EmailJS error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Message Failed',
        text: 'Something went wrong while sending your message. Please try again later.',
        background: 'linear-gradient(145deg, #fdf1f1, #ffecec)',
        color: '#004aad',
        timer: 2500,
        showConfirmButton: false
      });
    }
  });
});









// Animation on Scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".service-card, .feature");

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (elementPosition < screenPosition) {
      element.style.opacity = 1;
      element.style.transform = "translateY(0)";
    }
  });
};

// Set initial state for animated elements
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".service-card, .feature");
  animatedElements.forEach((element) => {
    element.style.opacity = 0;
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  // Trigger animation on scroll
  window.addEventListener("scroll", animateOnScroll);

  // Initial check in case elements are already in view
  animateOnScroll();
});

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.1)";
    header.style.background = "rgba(255, 255, 255, 0.95)";
  } else {
    header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    header.style.background = "#fff";
  }
});

// logo and navbar color change on scroll

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  const logo = document.getElementById("main-logo");
  const servicesSection = document.querySelector("#services");
  const productsSection = document.querySelector("#products");
  const contactSection = document.querySelector("#contact");

  if (
    !navbar ||
    !logo ||
    !servicesSection ||
    !productsSection ||
    !contactSection
  )
    return;

  const servicesTop = servicesSection.offsetTop;
  const productsTop = productsSection.offsetTop;
  const contactTop = contactSection.offsetTop;
  const scrollY = window.scrollY;
  const offset = 70;

  // Reset class and logo
  navbar.classList.remove("scrolled");
  logo.src = "Media/assetwhite.png";

  // Add 'scrolled' and swap logo in Services and Contact sections
  if (
    (scrollY >= servicesTop - offset && scrollY < productsTop - offset) ||
    scrollY >= contactTop - offset
  ) {
    navbar.classList.add("scrolled");
    logo.src = "Media/asset.png";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const logo = document.getElementById("main-logo");
  const overview = document.getElementById("overview");
  const offset = 70;

  if (!navbar || !logo || !overview) return;

  function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const overviewTop = overview.getBoundingClientRect().top + scrollY;

    if (scrollY + offset >= overviewTop) {
      navbar.classList.add("scrolled");
      logo.src = "Media/asset.png";
    } else {
      navbar.classList.remove("scrolled");
      logo.src = "Media/assetwhite.png";
    }
  }

  handleScroll(); // Run once on load
  window.addEventListener("scroll", handleScroll);
});

const cards = document.querySelectorAll(".service-card");
let hasAnimated = false;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.classList.add("animate-in");
          }, i * 300); // 300ms stagger
        });
        observer.disconnect(); // stop observing once triggered
      }
    });
  },
  { threshold: 0.3 }
);

if (cards.length) {
  observer.observe(cards[0]); // observe first card only
}

document.addEventListener("DOMContentLoaded", () => {
  const serviceCards = document.querySelectorAll(".service-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          entry.target.style.transitionDelay = `${index * 0.2}s`;
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  serviceCards.forEach((card) => observer.observe(card));
});

document.addEventListener("DOMContentLoaded", () => {
  const serviceCards = document.querySelectorAll(".service-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        } else {
          entry.target.classList.remove("animate-in");
        }
      });
    },
    {
      threshold: 0.4,
    }
  );

  serviceCards.forEach((card) => observer.observe(card));
});
