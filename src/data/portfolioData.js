export const G = {
  green: "#10B981",
  greenGlow: "rgba(16,185,129,0.1)",
  dark: "#060913",
  card: "rgba(255,255,255,0.02)",
  slate: "#94A3B8",
  slateLight: "#CBD5E1",
  white: "#F8FAFC",
  
  // Social & Contact Links
  email: "tameratgebeyehu1@gmail.com",
  github: "https://github.com/tameratgebeyehu",
  linkedin: "https://linkedin.com/in/tamerat-gebeyehu-39074a367",
  telegram: "https://t.me/silencewarrenty",
  phone1: "+251938520306",
  phone2: "+251725520306"
};

export const PROJECTS = [
  {
    id: 1,
    title: "Zemen Scholar",
    category: "EdTech",
    status: "Version 1.0",
    description: "The Digital Gateway for Ethiopian Students to US Higher Education.",
    fullDescription: {
      problem: "In the Ethiopian education system, many students don't realize that US university preparation starts long before Grade 12. As a student in Grade 8 and 9, I found myself lost in a sea of unfamiliar terms like 'Common App,' 'CSS Profile,' and 'Holistic Review.' I didn't know which competitions mattered or how to structure my leadership activities until the deadlines were already approaching.",
      solution: "I built Zemen Scholar to be the mentor I wish I had. It is a comprehensive roadmap that guides students through every milestone from Grade 9 to the day they receive their visa.",
      quote: '"I finally understand the process. This app explains everything I didn\'t even know I needed to ask." — Student Feedback',
      features: [
        { name: "The 'Scholar’s Glossary'", desc: "A curated dictionary of essential admissions terminology. It breaks down complex academic jargon into simple, actionable concepts." },
        { name: "The 4-Year Roadmap", desc: "A strategic timeline that tells students exactly what to do and when—covering volunteering, leadership projects, and competitions early enough to build a world-class profile." },
        { name: "GPA Converter", desc: "A custom-built tool that translates local secondary school marks into the American 4.0 grading system, giving students an immediate view of options." },
        { name: "The Visa Wizard", desc: "A step-by-step guide through the F-1 Visa process, including document checklists for transcripts, bank statements, and interview preparation." }
      ],
      impact: "Currently deployed among a peer group of Ethiopian students, providing a structured path for the 2026 application cycle.",
      why: "I believe that a student's potential should not be limited by where they were born. Zemen Scholar is my contribution to ensuring that every Ethiopian student has a fair shot at a global education."
    },
    tech: ["Flutter", "Supabase", "Dart"],
    type: "Mobile",
    color: "#059669",
    icon: "🎓"
  },
  {
    id: 2,
    title: "Zemen Academy",
    category: "EdTech",
    status: "Active Beta",
    description: "Offline-first mastery for the New Ethiopian Curriculum.",
    fullDescription: {
      problem: "The transition to the 'New Curriculum' in Ethiopia left many students without adequate practice materials. Moreover, reliable internet access is still a luxury in many regions, making most online learning platforms unusable for the students who need them most.",
      solution: "Zemen Academy provides 5,000+ curriculum-aligned practice questions and AI-powered explanations that work entirely offline. It's designed to bring high-quality tutoring to every village.",
      features: [
        { name: "Offline Mastery", desc: "Download once, learn forever. No internet required for daily practice or progress tracking." },
        { name: "New Curriculum Focus", desc: "Every question is mapped strictly to the latest Ethiopian Ministry of Education standards." },
        { name: "AI Feedback", desc: "Local LLM integration that explains why an answer is wrong, even when disconnected from the cloud." }
      ],
      impact: "Testing with students in the West Arsi Zone to refine the offline sync mechanism.",
      why: "Education is a right, not a privilege of the connected."
    },
    tech: ["React Native", "SQLite", "Node.js"],
    type: "Mobile",
    color: "#10B981",
    icon: "⚛️"
  },
  {
    id: 3,
    title: "SindeTrack",
    category: "AgriTech",
    status: "Production",
    description: "Digitizing agricultural logistics for local wheat trade.",
    fullDescription: {
      problem: "Local wheat traders in Ethiopia rely on paper ledgers, which lead to significant data loss, slow bookkeeping, and lack of transparency in the supply chain.",
      solution: "A mobile logistics engine that tracks grain collection, automates bookkeeping, and prints physical receipts using mobile thermal printers directly at the farm gate.",
      features: [
        { name: "Thermal Print Integration", desc: "Instant physical proof of transaction for farmers and traders." },
        { name: "Daily Reporting", desc: "Reduced bookkeeping time by 80% with automated summary generation." },
        { name: "Inventory Tracking", desc: "Real-time visibility into grain stock across multiple collection points." }
      ],
      impact: "Eliminated paper-based data loss for early-adopter traders.",
      why: "To modernize the backbone of our economy—agriculture."
    },
    tech: ["Flutter", "Bluetooth API", "FastAPI"],
    type: "Logistics",
    color: "#D97706",
    icon: "🌾"
  },
  {
    id: 4,
    title: "AbayKey",
    category: "System Tool",
    status: "RC-1",
    description: "Ethiopia's first gesture-family keyboard engine.",
    fullDescription: {
      problem: "Ethiopic scripts are complex. Existing keyboards are either too slow or too cramped, leading to high error rates and frustration for Ge'ez script users.",
      solution: "A 'Gesture-Family' engine where users press a base character and swipe to select variations. It turns a complex script into a fluid, ergonomic experience.",
      features: [
        { name: "Gesture Engine", desc: "Slide to select the correct vowel variation instantly." },
        { name: "Clipboard Manager", desc: "Privacy-first, offline-only clipboard history for productivity." },
        { name: "Themed UI", desc: "Custom-built premium dashboard for settings and shortcuts." }
      ],
      impact: "Aiming to become the standard input method for Ge'ez scripts on Android.",
      why: "Our digital world should speak our language as fluently as we do."
    },
    tech: ["Android SDK", "Kotlin", "Java"],
    type: "OS Tool",
    color: "#DB2777",
    icon: "⌨️"
  },
  {
    id: 5,
    title: "Visit Dodola",
    category: "Tourism",
    status: "Live",
    description: "The official digital guide to the gateway of the Bale Mountains.",
    fullDescription: {
      problem: "Dodola is a hidden gem, but information for international tourists was scattered or outdated, causing many to miss out on local hospitality and scenic routes.",
      solution: "A comprehensive digital portal showcasing the best of Dodola—from trekking routes to local stays.",
      impact: "Professionalizing the digital presence of local tourism.",
      why: "I'm proud of where I come from. I want the world to see it too."
    },
    tech: ["React", "CSS3", "Vite"],
    type: "Web App",
    color: "#2563EB",
    icon: "🏔️"
  },
  {
    id: 6,
    title: "TallPath",
    category: "EdTech",
    status: "Beta",
    description: "Simplifying complex learning journeys for high-achievers.",
    fullDescription: {
      problem: "Advanced learners often get lost in a 'sea of content' without a clear path to mastery.",
      solution: "A path-finding engine that curates resources based on end-goals.",
      impact: "Helping students in my community find their way in the global classroom.",
      why: "The shortest distance between potential and achievement is a clear path."
    },
    tech: ["React", "PostgreSQL", "Tailwind"],
    type: "Platform",
    color: "#7C3AED",
    icon: "🚀"
  }
];

export const LAB_PROJECTS = [
  {
    id: 7,
    title: "TDA Trading Bot",
    status: "Active Testing",
    progress: 75,
    icon: "🤖",
    tech: ["Python", "Mathematical Modeling", "Real-market Data"],
    problem: "High-frequency trading is often driven by human emotion and fatigue, leading to inconsistent results.",
    solution: "An algorithmic engine designed to execute strategies based on cold data, removing the 'human element' from entry and exit points.",
    statusDetail: "Currently in a demo environment to validate the mathematical model before real-market capital deployment."
  },
  {
    id: 8,
    title: "DELALA",
    status: "Prototyping",
    progress: 40,
    icon: "🤝",
    tech: ["React Native", "Trust Architecture", "Verified Listings"],
    problem: "Ethiopia's informal brokerage (Delala) system is unorganized and lacks transparency.",
    solution: "A transparent digital brokerage platform that professionalizes the middleman role with verified listings and clear communication channels.",
    statusDetail: "Focusing on the trust-verification module to prevent fraudulent listings."
  },
  {
    id: 9,
    title: "QOTABI & QOTABI Pay",
    status: "Researching",
    progress: 30,
    icon: "💰",
    tech: ["Fintech", "Micro-savings", "Offline-logic"],
    problem: "Saving small amounts is difficult without disciplined tools or accessible digital banking.",
    solution: "A micro-savings platform following the 'Frugal Living' philosophy. Includes QOTABI Pay for secure, small-scale transactions.",
    statusDetail: "Designing the offline transaction sync mechanism for rural areas."
  },
  {
    id: 10,
    title: "ADE Coffee",
    status: "Concept",
    progress: 20,
    icon: "☕",
    tech: ["Traceability", "Logistics", "Direct-to-Consumer"],
    problem: "Coffee farmers often lack direct access to global markets and consumers miss the true 'story' of the bean.",
    solution: "A traceability-focused logistics engine that connects the origin of the coffee directly to the final consumer.",
    statusDetail: "Mapping the supply chain nodes for transparent tracking."
  },
  {
    id: 11,
    title: "ADDE",
    status: "Alpha",
    progress: 15,
    icon: "📦",
    tech: ["Premium Logistics", "Resell Ecosystem", "UI/UX"],
    problem: "The secondary resell market in Ethiopia lacks a premium, high-trust logistics experience.",
    solution: "A premium resell platform that treats every delivery with 'Apple-level' care and transparency.",
    statusDetail: "Crafting the visual identity and packaging standards."
  }
];

export const ACADEMIC_FOUNDATION = [
  { org: "Hawiko Academy Secondary School", location: "Dodola, Oromia, Ethiopia", role: "Grade 11 Student (Current)", desc: "Focusing on Natural Sciences and advanced mathematics, maintaining a high academic standing while pursuing international certifications." },
  { org: "Victory Wisdom School", location: "General Secondary Education", role: "2022 – 2024", desc: "Core foundation in secondary education." }
];

export const TECHNICAL_SPECIALIZATIONS = [
  { org: "WorldQuant University", title: "Applied Data Science Lab", date: "Jan 2025 – Present", desc: "Developing skills in large-scale data analysis and statistical modeling.", color: "#1E3A5F", logo: "WQ" },
  { org: "University of Chicago", title: "Machine Learning: Concepts & Applications", date: "Current", desc: "Studying the mathematical foundations and practical deployment of ML models.", color: "#8B0000", logo: "UC" },
  { org: "Princeton University", title: "Computer Science: Programming with a Purpose", date: "Current", desc: "Focusing on scientific computing, algorithm design, and fundamental CS principles.", color: "#F97316", logo: "P" },
  { org: "Evangadi Tech", title: "Full-Stack Software Engineering", date: "2024 – Present", desc: "The core foundation for building mobile and web applications (React, Node.js).", color: "#059669", logo: "ET" },
  { org: "Google", title: "IT Support Professional Certificate", date: "Current", desc: "Mastering troubleshooting, networking, operating systems, and security.", color: "#4285F4", logo: "G" },
  { org: "Admas Aero Nexus", title: "Aerospace Engineering & Aircraft Design", date: "March 2026 – Present", desc: "Exploring aerodynamics, structural design, and flight mechanics.", color: "#64748B", logo: "AN" },
  { org: "Macquarie University", title: "Excel Skills for Business", date: "Feb 2026 – March 2026", desc: "Advanced spreadsheet modeling and business intelligence techniques.", color: "#C41E3A", logo: "MQ" }
];

export const CERTIFICATIONS = [
  { id: 8, title: "Student Entrepreneurship", org: "Blue Ocean Strategy", link: "https://credsverse.com/credentials/abe66077-feb7-4692-8aeb-f96dd747a525", desc: "Strategic innovation and market-creation principles." },
  { id: 5, title: "Excel Skills for Business: Essentials", org: "Macquarie University", link: "https://www.coursera.org/account/accomplishments/verify/JKZ23217P292", desc: "Professional spreadsheet management and data logic." },
  { id: 9, title: "Red Cross Volunteer", org: "ERCS", link: "#", desc: "Certified in community service and emergency response." },
  { id: 1, title: "AI Fundamentals", org: "Google", link: "https://coursera.org/share/715a24a86008fc1b9ca8ca0b36fc2970", desc: "Core concepts of neural networks and generative AI models." },
  { id: 3, title: "AI for Business Professionals", org: "HP Life", link: "https://www.life-global.org/certificate/fcb202f9-af69-4764-80ee-830179eb52a4", desc: "Strategic implementation of AI in business workflows." },
  { id: 4, title: "Data Science & Analytics", org: "HP Life", link: "https://www.life-global.org/certificate/793e630d-a24d-4b48-ba77-4a59b9a62fa5", desc: "Techniques for data processing and predictive analysis." },
  { id: 6, title: "Professional Networking", org: "HP Life", link: "https://www.life-global.org/certificate/b374fc87-c911-4f5b-a473-54b8c8d448f9", desc: "Strategies for global career growth and collaboration." },
  { id: 2, title: "AI Fundamentals", org: "Udacity", link: "https://www.udacity.com/certificate/lp/4b49a7b0-6de3-4822-9324-3f27ff503205", desc: "Practical applications of artificial intelligence in software." },
  { id: 7, title: "Idea Generation", org: "Nestlé", link: "https://mycourse.app/MZMSt0aHLIdb7hedy", desc: "Creative problem-solving and conceptual thinking for enterprise." }
];

export const SKILLS_DETAILED = [
  { category: "AI-Driven Development", items: ["AI-Assisted Architecture: Expert in 'Vibe Coding'", "Advanced Prompt Engineering", "Infrastructure Engineering (Flutter, React, Supabase)"] },
  { category: "Data & Strategic Analysis", items: ["Excel Data Analyst (Certified)", "Applied Data Science (WorldQuant)", "Systems Thinking for Digital Workflows"] },
  { category: "Digital Communication", items: ["Video Production & Editing", "Presentation & Pitch Design", "Multilingual Localization (Amharic, Afaan Oromoo)"] },
  { category: "Humanitarian Leadership", items: ["Emergency Response (ERCS Training)", "Civic Responsibility & Community Projects"] }
];

export const HONORS = [
  {
    title: "Bronze Medal: Computer Skills Competition",
    org: "Victory Wisdom School",
    year: "January 2024",
    desc: "Awarded for exceptional aptitude in fundamental computing. This served as the primary catalyst for my pursuit of advanced certifications from institutions like Princeton and Google.",
    significance: "It proves that my growth is consistent and earned—telling recruiters I've been honing these skills for years."
  }
];

export const BLOG_POSTS = [
  {
    title: "Vibe Coding: How I Build 13+ Projects in Grade 11",
    date: "Apr 2026",
    tag: "#VibeCoding",
    excerpt: "How AI-assisted architecture changed everything about how I ship software.",
    time: "7 min read",
    content: "Building software in 2026 is no longer about fighting syntax. It's about 'Vibe Coding'—the art of using AI as an architectural partner. In this post, I break down how I managed to ship over 13 complex projects (from AgriTech to Fintech) while maintaining a high academic standing in Grade 11. The secret? Focusing on the 'Why' and the 'Architecture' while letting the AI handle the 'How' of the code."
  },
  {
    title: "The Offline-First Reality: Designing for Dodola",
    date: "Mar 2026",
    tag: "#LocalTech",
    excerpt: "Building Visit Dodola taught me that empathy for user constraints is the key.",
    time: "5 min read",
    content: "When I built 'Visit Dodola' and 'Zemen Academy', I realized that 5G speeds are a luxury. In my community, reliable internet is not guaranteed. Designing 'Offline-First' isn't just a technical choice—it's a choice to be inclusive. This post explores the technical stack behind Zemen Academy's offline sync and why local SQLite is my favorite database tool."
  },
  {
    title: "From Bronze Medals to Aerospace Engineering",
    date: "Feb 2026",
    tag: "#MyStory",
    excerpt: "How a single competition in January 2024 set a chain reaction in motion.",
    time: "8 min read",
    content: "In January 2024, I won a Bronze Medal in a computer skills competition. To most, it was just a medal. To me, it was the proof that I could compete globally. Since then, I've moved from basic computing to Aerospace Engineering and Machine Learning. This post is a roadmap for other students starting from zero."
  },
  {
    title: "Why I'm Building AbayKey",
    date: "Jan 2026",
    tag: "#Language",
    excerpt: "Language is the foundation of culture. The digital world should speak ours.",
    time: "6 min read",
    content: "Existing Amharic keyboards are frustrating. They slow us down. I wanted to build something that feels like 'Gesture Writing'. AbayKey is more than a tool—it's a digital home for our language. Here is the engineering story of the 'Gesture-Family' system."
  }
];
