/**
 * Desat Info Tech - Main JavaScript Engine
 * Interactive Product Suites & Agile Engineering Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initHeroProductExplorer();
  initUseCasesAccordion();
  initWorkflowProcess();
  initFaqAccordion();
  initContactForm();
  initScrollAnimations();
  initAnimatedGrids();
});

/* ==========================================================================
   Toast Notification System
   ========================================================================== */
function showToast(message, duration = 3000) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span style="color: #30c48b; font-weight: bold;">✓</span> <span>${message}</span>`;
  toast.classList.add('show');

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

/* ==========================================================================
   Navbar & Sticky Blur
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Active anchor link highlighting
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = Array.from(navLinks).map(link => {
    const target = document.querySelector(link.getAttribute('href'));
    return { link, target };
  }).filter(item => item.target !== null);

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 140;
    sections.forEach(({ link, target }) => {
      const top = target.offsetTop;
      const height = target.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   Mobile Navigation Drawer
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      toggleBtn.classList.remove('open');
      document.body.style.overflow = '';
    } else {
      drawer.classList.add('open');
      toggleBtn.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });

  const drawerLinks = drawer.querySelectorAll('a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ==========================================================================
   Hero Interactive Product Explorer
   ========================================================================== */
function initHeroProductExplorer() {
  const promptTags = document.querySelectorAll('.prompt-tag');
  const promptDisplay = document.getElementById('hero-prompt-display');
  const productItems = document.querySelectorAll('.console-product-item');
  const tabBtns = document.querySelectorAll('.console-tab-btn');

  const titleEl = document.getElementById('console-prod-title');
  const badgeEl = document.getElementById('console-prod-badge');
  const descEl = document.getElementById('console-prod-desc');
  const featuresEl = document.getElementById('console-prod-features');
  const techEl = document.getElementById('console-prod-tech');

  const productData = {
    custom: {
      tag: 'software',
      prompt: "Custom software development: Enterprise CRM, ERP platforms, and automated workflow backends",
      title: "Custom Software Development Platform",
      badge: "Enterprise Ready",
      badgeClass: "blue",
      desc: "Tailor-made software platforms, automated business workflows, scalable backend APIs, and ERP systems engineered specifically for your company's operational needs.",
      features: [
        "High-concurrency relational and NoSQL database architecture",
        "Microservices or clean modular monolith with REST/GraphQL APIs",
        "100% intellectual property and complete source code ownership"
      ],
      tech: [
        { name: "Node.js", class: "blue" },
        { name: "Python", class: "green" },
        { name: "PostgreSQL", class: "purple" },
        { name: "Docker", class: "amber" },
        { name: "AWS Cloud", class: "" }
      ]
    },
    webapps: {
      tag: 'webmobile',
      prompt: "Web applications & SaaS: Fast React/Next.js client portals with real-time dashboards",
      title: "Web Applications & SaaS Platforms",
      badge: "Sub-Second TTFB",
      badgeClass: "green",
      desc: "Lightning-fast, responsive web applications, customer portals, interactive dashboards, and SaaS platforms built using modern React, Next.js, and TypeScript.",
      features: [
        "Server-Side Rendering (SSR) and edge-cached static distribution",
        "Secure user authentication, role-based permissions, and payment gateways",
        "Responsive, mobile-optimized UI with high conversion rates"
      ],
      tech: [
        { name: "React 19", class: "blue" },
        { name: "Next.js", class: "green" },
        { name: "TypeScript", class: "blue" },
        { name: "Tailwind / Vanilla CSS", class: "purple" },
        { name: "Supabase / Redis", class: "amber" }
      ]
    },
    mobile: {
      tag: 'webmobile',
      prompt: "Mobile app suite: High-performance iOS and Android apps with offline synchronization",
      title: "Mobile Applications (iOS & Android)",
      badge: "Cross-Platform & Native",
      badgeClass: "amber",
      desc: "Intuitive, high-performance mobile apps built with Flutter, React Native, Swift, or Kotlin. Seamless offline sync, push notifications, and payment processing.",
      features: [
        "Native 60fps / 120fps smooth animations and gestures",
        "Secure biometric authentication (FaceID / Fingerprint) & Apple/Google Pay",
        "Automated App Store and Google Play deployment pipelines"
      ],
      tech: [
        { name: "Flutter", class: "blue" },
        { name: "React Native", class: "green" },
        { name: "Swift / Kotlin", class: "purple" },
        { name: "Firebase", class: "amber" },
        { name: "GraphQL", class: "" }
      ]
    },
    ai: {
      tag: 'aicloud',
      prompt: "AI solutions & cloud: Custom LLM integrations, document automation, and multi-cloud DevOps",
      title: "AI Solutions & Cloud Infrastructure",
      badge: "AI Powered & Automated",
      badgeClass: "purple",
      desc: "Integrate Generative AI, custom LLMs, intelligent chatbots, document processing, and automated workflow agents directly into your software products.",
      features: [
        "Custom LLM fine-tuning, prompt engineering, and hybrid RAG search",
        "Intelligent document OCR, data extraction, and workflow automations",
        "Multi-cloud deployment across AWS, GCP, and Azure with 99.9% uptime"
      ],
      tech: [
        { name: "OpenAI / Claude", class: "purple" },
        { name: "LangChain / LlamaIndex", class: "green" },
        { name: "FastAPI / Python", class: "blue" },
        { name: "Kubernetes", class: "amber" },
        { name: "Terraform", class: "" }
      ]
    }
  };

  const setProduct = (key) => {
    const data = productData[key];
    if (!data) return;

    productItems.forEach(item => {
      if (item.getAttribute('data-product') === key) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    promptTags.forEach(tag => {
      if (tag.getAttribute('data-flow') === data.tag) {
        tag.classList.add('active');
      } else {
        tag.classList.remove('active');
      }
    });

    if (promptDisplay) promptDisplay.textContent = data.prompt;
    if (titleEl) titleEl.textContent = data.title;
    if (badgeEl) {
      badgeEl.textContent = data.badge;
      badgeEl.className = `tech-tag ${data.badgeClass}`;
    }
    if (descEl) descEl.textContent = data.desc;

    if (featuresEl) {
      featuresEl.innerHTML = data.features.map(f =>
        `<li class="product-feature-item"><span class="icon">✓</span> ${f}</li>`
      ).join('');
    }

    if (techEl) {
      techEl.innerHTML = data.tech.map(t =>
        `<span class="tech-tag ${t.class}">${t.name}</span>`
      ).join('');
    }
  };

  productItems.forEach(item => {
    item.addEventListener('click', () => {
      const prod = item.getAttribute('data-product');
      setProduct(prod);
    });
  });

  promptTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const flow = tag.getAttribute('data-flow');
      if (flow === 'software') setProduct('custom');
      else if (flow === 'webmobile') setProduct('webapps');
      else if (flow === 'aicloud') setProduct('ai');
      else if (flow === 'uiux') setProduct('custom');
    });
  });

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.getAttribute('data-tab');
      if (tab === 'tech') {
        showToast("Switched to Tech Architecture view");
      } else if (tab === 'deliverables') {
        showToast("Deliverables & SLA guarantee active");
      }
    });
  });
}

/* ==========================================================================
   Use Cases / Solutions Accordion
   ========================================================================== */
function initUseCasesAccordion() {
  const items = document.querySelectorAll('.use-case-item');
  if (!items.length) return;

  items.forEach(item => {
    const header = item.querySelector('.use-case-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      items.forEach(otherItem => {
        otherItem.classList.remove('active');
        const icon = otherItem.querySelector('.use-case-toggle-icon');
        if (icon) icon.textContent = '+';
      });

      if (!isActive) {
        item.classList.add('active');
        const icon = item.querySelector('.use-case-toggle-icon');
        if (icon) icon.textContent = '−';
      }
    });
  });
}

/* ==========================================================================
   Workflow Steps Selector
   ========================================================================== */
function initWorkflowProcess() {
  const stepCards = document.querySelectorAll('.workflow-step-card');
  const subjectLine = document.getElementById('editor-preview-subject');
  const bodyPreview = document.getElementById('editor-preview-body');

  if (!stepCards.length) return;

  const stagePreviews = {
    1: {
      title: "Product Blueprint: Discovery & UI/UX Architecture",
      body: `&bull; <span style="color: #7ee787;">Deliverable</span>: Clickable Figma Prototypes &amp; User Flow<br>
&bull; <span style="color: #7ee787;">Technical Spec</span>: Database Schemas, API Endpoints &amp; Tech Stack<br>
&bull; <span style="color: #7ee787;">Timeline</span>: Week 1-2 Sprint<br>
&bull; <span style="color: #30c48b;">Approval</span>: Scope &amp; Architecture Sign-off ✓`
    },
    2: {
      title: "Product Blueprint: Agile Sprint Execution",
      body: `&bull; <span style="color: #7ee787;">Sprint Cycle</span>: 2-Week Iterative Milestones<br>
&bull; <span style="color: #7ee787;">Code Quality</span>: Type-Safe, Linted, 90%+ Test Coverage<br>
&bull; <span style="color: #7ee787;">Client Reviews</span>: Live Staging Demos every Friday<br>
&bull; <span style="color: #7ee787;">Cloud Deployment</span>: Dockerized AWS / Google Cloud Infrastructure<br>
&bull; <span style="color: #30c48b;">Status</span>: 100% On-Schedule Delivery &bull; Verified ✓`
    },
    3: {
      title: "Product Blueprint: Production Launch & Scale",
      body: `&bull; <span style="color: #7ee787;">Production Rollout</span>: Automated Zero-Downtime Deployment<br>
&bull; <span style="color: #7ee787;">Performance</span>: Sub-second load times &amp; database optimization<br>
&bull; <span style="color: #7ee787;">Monitoring</span>: Real-time telemetry, error tracking &amp; automated backups<br>
&bull; <span style="color: #30c48b;">Warranty</span>: 30-Day Post-Launch SLA Support Included ✓`
    }
  };

  stepCards.forEach(card => {
    card.addEventListener('click', () => {
      stepCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const step = card.getAttribute('data-step') || '2';
      const preview = stagePreviews[step];
      if (preview) {
        if (subjectLine) subjectLine.textContent = preview.title;
        if (bodyPreview) bodyPreview.innerHTML = preview.body;
      }
    });
  });

  const retestBtn = document.getElementById('editor-btn-regenerate');
  if (retestBtn) {
    retestBtn.addEventListener('click', () => {
      showToast("Auditing agile milestone progress...");
      if (bodyPreview) {
        bodyPreview.style.opacity = '0.5';
        setTimeout(() => {
          bodyPreview.style.opacity = '1';
          showToast("Milestone verified: On-track for deployment");
        }, 400);
      }
    });
  }
}

/* ==========================================================================
   FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const icon = otherItem.querySelector('.faq-icon');
        if (icon) icon.textContent = '+';
      });

      if (!isActive) {
        item.classList.add('active');
        const icon = item.querySelector('.faq-icon');
        if (icon) icon.textContent = '−';
      }
    });
  });
}

/* ==========================================================================
   Project Inquiry & Contact Form Submission
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const submitBtn = form.querySelector('.btn-submit');

    if (!nameInput.value.trim() || !emailInput.value.trim()) {
      showToast("Please provide your name and business email.");
      return;
    }

    if (submitBtn) {
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Submitting Proposal Request...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = 'Inquiry Sent ✓';
        submitBtn.style.background = '#30c48b';
        showToast(`Thank you, ${nameInput.value.trim()}! Desat's team will contact you within 24 hours.`);
        form.reset();

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
        }, 4000);
      }, 1000);
    }
  });
}

/* ==========================================================================
   Intersection Observer Animations
   ========================================================================== */
function initScrollAnimations() {
  const animElements = document.querySelectorAll(
    '.service-card, .comparison-card, .bento-card, .showcase-card, .testimonial-card, .pricing-card'
  );

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   Animated Canvas Grid (Matching http://localhost:8080)
   ========================================================================== */
function initAnimatedGrids() {
  const canvases = document.querySelectorAll('.grid-canvas');
  canvases.forEach(canvas => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    let width = 0;
    let height = 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);
      const spacing = width > 800 ? 100 : 73;
      const left = (width % spacing) / 2;
      const line = 'rgba(255, 255, 255, 0.42)';
      const color = '#ffffff';

      ctx.strokeStyle = line;
      ctx.lineWidth = 1;

      for (let x = left; x < width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 60; y < height; y += spacing * 0.85) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
        for (let x = left; x < width; x += spacing) {
          ctx.fillStyle = color;
          ctx.globalAlpha = 0.2 + (Math.sin(time / 1700 + x * 0.01 + y * 0.02) + 1) * 0.16;
          ctx.fillRect(x - 2, y - 2, 4, 4);
        }
      }

      for (let i = 0; i < 12; i++) {
        const x = (i * 173 + 81) % width;
        const y = (i * 127 + 40) % height;
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.1 + (Math.sin(time / 1900 + i) + 1) * 0.1;
        for (let j = 0; j < 9; j++) {
          if ([1, 3, 4, 5, 7].includes(j)) {
            ctx.fillRect(x + (j % 3) * 10, y + Math.floor(j / 3) * 10, 7, 7);
          }
        }
      }

      ctx.globalAlpha = 1;
      if (!reduced) frame = requestAnimationFrame(draw);
    };

    draw(0);
  });
}
