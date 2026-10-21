// All text on the site lives here. Rule for this file: only write things
// that are true today and that someone could check. If something is not
// finished, say "in progress". If there is no proof yet, leave it out.

export const PROFILE = {
  name: "Tamerat Gebeyehu",
  town: "Dodola, Oromia, Ethiopia",
  email: "tameratgebeyehu1@gmail.com",
  github: "https://github.com/tameratgebeyehu",
  linkedin: "https://linkedin.com/in/tamerat-gebeyehu-39074a367",
  telegram: "https://t.me/silencewarrenty",
  photo: "/logos/profile.jpg",
};

// Status words used on the site:
//   "On Google Play" – public on the Play Store
//   "Prototype"      – works and can be installed from the APK, but has no real user base
//   "In development" – not finished, no download yet
// "featured: true" projects are shown big at the top of the home page.
export const PROJECTS = [
  {
    slug: "zemen-academy",
    title: "Zemen Academy",
    oneLine: "A quiz app for Ethiopian students in Grades 9–12. It works offline, and it has been on Google Play since October 2026.",
    status: "On Google Play",
    year: "Dec 2025 – now",
    featured: true,
    tech: ["React Native", "Expo", "Google Apps Script", "Google Sheets"],
    what: [
      "Students choose their grade, subject and unit, then take a quiz. In Instant Mode they see the right answer and an explanation after each question. In Exam Mode they get one minute per question and see the score at the end.",
      "A student can download a unit once and then practise without internet. The app is in English and Amharic.",
    ],
    why: "I'm a student. After reading my textbooks, I wanted to test myself before exams, but I had no preparation tool. So I asked myself: why not build a quiz app that helps me study? That is how Zemen Academy started. Internet in my town is slow and expensive, so I made it work offline too.",
    learned: [
      "This is my first app on Google Play, so I learned the whole publishing and review process.",
      "How to save quizzes on the phone and send results to the server later, when the phone is online again.",
      "How to use Google Sheets as a simple back end, so I can add questions without changing the app.",
    ],
    links: {
      play: "https://play.google.com/store/apps/details?id=com.zemenacademy.app",
      website: "https://zemenacademy.com",
      apk: "/apks/zemen-academy.apk",
      github: "https://github.com/tameratgebeyehu/zemen-academy",
    },
    images: 4,
    // Screenshot groups, newest first. When new screenshots arrive, put them in
    // public/projects/zemen-academy/v2/1.jpg, 2.jpg, ... and add a group above this one:
    //   { label: "Today", folder: "v2", count: 5 },
    screenshotGroups: [
      {
        label: "First version",
        note: "These are the first screens of Zemen Academy. I keep them here as a memory of where it started.",
        folder: "",
        count: 4,
      },
    ],
    logo: "logo.png",
  },
  {
    slug: "zemen-scholar",
    title: "Zemen Scholar",
    oneLine: "A step-by-step guide for Ethiopian students who want to study in the U.S.",
    status: "Prototype",
    year: "2026",
    tech: ["React Native", "Expo", "TypeScript", "Supabase"],
    what: [
      "A roadmap from Grade 9 to the visa interview: what to do each year, a glossary of admissions words, a GPA calculator, and tips for essays and recommendation letters.",
    ],
    why: "My dream is to study at a top university in the U.S. In Grade 9, I started searching by myself: what is a scholarship? By Grade 10 I was only halfway. I was still learning about internships, fellowships, research, volunteering, sports, competitions, club leadership, projects, teaching other students, building a portfolio, work experience and hobbies. Then came the application itself: the SAT, the Duolingo English Test, the CSS Profile and interviews. Nobody showed me the path: what comes first, what is important and what is not. It took me a long time. I built Zemen Scholar so the next students can see the whole path clearly, step by step.",
    learned: [
      "How to use Supabase for log-in and a database.",
      "How to organise a lot of text so it is easy to read on a small phone screen.",
    ],
    links: {
      apk: "/apks/zemen-scholar.apk",
      github: "https://github.com/tameratgebeyehu/zemen-scholar",
    },
    images: 5,
    logo: "logo.png",
  },
  {
    slug: "adeveil",
    title: "ADEVeil",
    oneLine: "An offline privacy app: encrypted notes, messages and a locked vault.",
    status: "Prototype",
    year: "2026",
    tech: ["React Native", "Expo", "TypeScript"],
    what: [
      "You can encrypt a message before you send it in any chat app, keep encrypted notes, and store files in a locked vault. The app has no accounts and makes no internet requests.",
      "It also blocks screenshots and hides its content when you switch apps.",
    ],
    why: "Many people in Ethiopia share one phone or hand their phone to others. I wanted a simple way to keep a few things private.",
    learned: [
      "The basics of encryption on a phone, and why you should use well-tested libraries instead of writing your own.",
      "How Android screenshots and the app-switcher preview work, and how to block them.",
    ],
    note: "This is a learning project. Nobody has done a security audit of it, so please do not use it for very important secrets.",
    links: {
      apk: "/apks/adeveil.apk",
      github: "https://github.com/tameratgebeyehu/ADEVEIL",
    },
    images: 5,
    logo: "logo.png",
  },
  {
    slug: "visit-dodola",
    title: "Visit Dodola",
    oneLine: "A travel guide app for my town and the Bale Mountains area.",
    status: "Prototype",
    year: "2026",
    tech: ["React Native", "Expo"],
    what: [
      "Places to visit around Dodola, plus banks, hotels and restaurants, with a map. The app works in English, Amharic and Afaan Oromoo.",
      "I am now adding a new feature: tap a word, and the app says it with a local accent.",
    ],
    why: "This started as a hobby app. Many tourists pass through Dodola on their way to the Bale Mountains. They stop to eat, drink and rest, and they want to know about our town. Some of them decide to stay. I built this app so they can find what Dodola has: places to visit, banks, hotels and restaurants.",
    learned: [
      "How to support three languages in one app.",
      "How to make many photos load fast on a slow connection.",
    ],
    links: {
      apk: "/apks/visit-dodola.apk",
      github: "https://github.com/tameratgebeyehu/visit-dodola",
    },
    images: 5,
    logo: "logo.png",
  },
  {
    slug: "sindetrack",
    title: "SindeTrack",
    oneLine: "An offline record book for local wheat traders, with Bluetooth receipt printing. I pitched it at the Blue Ocean competition in 2026.",
    status: "Prototype",
    year: "2026",
    featured: true,
    tech: ["Kotlin", "Jetpack Compose", "Android"],
    what: [
      "A wheat buyer records each farmer, the amount of grain and the price. The app adds everything up and shows a daily summary. It works offline and can print a receipt on a small Bluetooth printer.",
      "I pitched SindeTrack in the Blue Ocean student entrepreneurship competition in 2026. You can watch the pitch video below.",
    ],
    why: "My brother is a farmer. He buys wheat from other farmers and sells it. He used to write every purchase in a cheap paper notebook, and those records got lost. I kept thinking about an app that would keep his records safe, even if he changes his phone. That is how SindeTrack started.",
    learned: [
      "This was my first native Android app in Kotlin. It felt very different from React Native.",
    ],
    links: {
      apk: "/apks/sindetrack.apk",
      video: "https://youtu.be/Ww-EElGvb68",
    },
    images: 4,
    logo: "logo.jpg",
  },
  {
    slug: "tallpath",
    title: "TallPath",
    oneLine: "A daily routine tracker for sleep, stretching and posture.",
    status: "Prototype",
    year: "2026",
    tech: ["React Native", "Expo", "AsyncStorage"],
    what: [
      "You make your own daily routine (sleep time, stretching, exercise). The app reminds you, counts your streak, and shows a 365-day grid of the days you finished everything. It works fully offline, with no account.",
    ],
    why: "I wanted to build good daily habits myself, and I wanted to practise making an app that keeps all data on the phone.",
    learned: [
      "How to schedule local notifications on Android and iOS.",
      "How to calculate streaks correctly when days are missed.",
    ],
    links: {
      apk: "/apks/tallpath.apk",
      github: "https://github.com/tameratgebeyehu/tallpath-app",
    },
    images: 4,
    logo: "logo.png",
  },
  {
    slug: "abaykey",
    title: "AbayKey",
    oneLine: "An Amharic keyboard I am still building: tap a letter, then swipe to choose its form. It does not work yet.",
    status: "In development",
    year: "2026",
    tech: ["Android", "Kotlin", "Java"],
    what: [
      "Each Ge'ez letter has about seven forms (for example ሀ ሁ ሂ ሃ ሄ ህ ሆ). In AbayKey you tap the base letter and swipe in a direction to pick the form, instead of tapping many times.",
      "It is not working yet. I am starting with Amharic. Later I want to add Tigrinya, Afaan Oromoo, Somali and English.",
      "Next, I want to add real-time Amharic voice typing (speech to text). I am studying open-source speech models that people share on Hugging Face. I could not find an Amharic keyboard that already does real-time voice typing.",
    ],
    why: "Most Amharic keyboards are not comfortable to use. So I started building my own, and I keep improving it. I want our language to be easy to type, and later to speak.",
    learned: [
      "Building a keyboard on Android is much harder than building a normal app. I am still learning how the Android input system works.",
    ],
    links: {},
    images: 4,
    logo: "logo.png",
  },
];

// All screenshot groups of a project. Most projects have one group.
export function screenshotGroups(project) {
  const groups = project.screenshotGroups ?? [{ label: null, folder: "", count: project.images }];
  return groups.map((g) => ({
    ...g,
    files: Array.from({ length: g.count }, (_, i) => `/projects/${project.slug}/${g.folder ? `${g.folder}/` : ""}${i + 1}.jpg`),
  }));
}

// The screenshot used on cards: the first one of the newest group.
export function coverShot(project) {
  return screenshotGroups(project)[0].files[0];
}

export const BOOK = {
  title: "Code Ethiopia: From Zero to Developer",
  cover: "/books/code-ethiopia-cover.webp",
  buy: "https://ye-buna.com/tameratgebeyehu?ref=product_detail&product=6a23f52684b6e_tameratgebeyehu",
  shop: "Ye-Buna",
  oneLine: "A beginner's book about programming, written for Ethiopian students who are starting from zero.",
  topics: [
    "What programming is, and how to set up your computer",
    "Python basics: variables, data types, input and output",
    "Making decisions and loops",
    "Functions and modules",
    "Lists, tuples, dictionaries and sets",
    "Object-oriented programming",
    "JavaScript basics for the browser",
    "Problem solving and debugging",
    "Building small real projects",
    "Next steps: portfolios, freelancing and learning on your own",
  ],
};

export const SCHOOL = {
  name: "Hawiko Academy Secondary School",
  town: "Dodola, Ethiopia",
  detail: "Grade 12, Natural Science stream",
  years: "Sep 2023 – Jun 2027",
};

export const EXPERIENCE = [
  {
    title: "Student Developer – Zemen Academy",
    detail: "Personal project, self-employed",
    years: "Dec 2025 – now",
    text: "I design, build and publish the Zemen Academy app on my own, while I am in school.",
    link: "/projects/zemen-academy",
  },
];

// Finished courses, newest first. Each one with a link has a public page where anyone can check it.
export const CERTIFICATES = [
  { title: "IgniteAI Expo – participation", org: "IgniteAI Expo", date: "Oct 2026", paper: true },
  { title: "Aerospace and Aviation Intensive Training", org: "Admas Aero Nexus", date: "Jun 2026", paper: true },
  { title: "Certificate of Recognition – Blue Ocean student pitch competition", org: "Blue Ocean Strategy", date: "May 2026", link: "https://credsverse.com/credentials/ff1642d5-7519-44e5-9d1c-5919299ab5e6" },
  { title: "Excel Skills for Business: Essentials", org: "Macquarie University (Coursera)", date: "Apr 2026", link: "https://www.coursera.org/account/accomplishments/verify/JKZ23217P292" },
  { title: "AI Fundamentals", org: "Google (Coursera)", date: "Feb 2026", link: "https://coursera.org/share/715a24a86008fc1b9ca8ca0b36fc2970" },
  { title: "Student Entrepreneurship", org: "Blue Ocean Strategy", date: "Feb 2026", link: "https://credsverse.com/credentials/abe66077-feb7-4692-8aeb-f96dd747a525" },
  { title: "AI Fundamentals", org: "Udacity", link: "https://www.udacity.com/certificate/lp/4b49a7b0-6de3-4822-9324-3f27ff503205" },
  { title: "Idea Generation", org: "Nestlé Youth Entrepreneurship Platform", link: "https://mycourse.app/MZMSt0aHLIdb7hedy" },
  { title: "Data Science & Analytics", org: "HP LIFE", link: "https://www.life-global.org/certificate/793e630d-a24d-4b48-ba77-4a59b9a62fa5" },
  { title: "AI for Business Professionals", org: "HP LIFE", link: "https://www.life-global.org/certificate/fcb202f9-af69-4764-80ee-830179eb52a4" },
  { title: "Professional Networking", org: "HP LIFE", link: "https://www.life-global.org/certificate/b374fc87-c911-4f5b-a473-54b8c8d448f9" },
  { title: "6-month basic computer training program", org: "Victory Wisdom (after-school centre, Dodola)", date: "Jun 2024", paper: true },
];

export const HONORS = [
  {
    title: "Bronze medal – Computer Skills Competition (beginner level)",
    org: "Victory Wisdom (after-school centre, Dodola)",
    date: "Jan 2024",
  },
];

// Only skills I have used in a real project or have a certificate for.
export const SKILLS = [
  { group: "Building apps", items: ["Mobile app development", "React Native & Expo", "Kotlin (one Android app)", "JavaScript", "TypeScript", "Web development (React)", "Supabase", "Google Apps Script"] },
  { group: "Other", items: ["AI-assisted development", "Excel", "Video editing", "Lean Canvas"] },
];

export const LANGUAGES = [
  { name: "Afaan Oromoo", level: "native" },
  { name: "Amharic", level: "native" },
  { name: "English", level: "limited working · Duolingo English Test score: 85" },
];

export const VOLUNTEERING = [
  {
    title: "Volunteer, Ethiopian Red Cross Society",
    place: "Dodola · past",
    text: "I volunteered with the Ethiopian Red Cross Society in Dodola. I did the volunteer training in first aid and basic disaster response, and I helped with community activities.",
  },
];

// What I am working on right now (home page). Update this when it changes.
export const NOW = [
  { icon: "📱", text: "Improving Zemen Academy, now that it is on Google Play.", link: "/projects/zemen-academy" },
  { icon: "🔊", text: "Adding a feature to Visit Dodola: tap a word and hear it with a local accent.", link: "/projects/visit-dodola" },
  { icon: "🎙️", text: "Studying open-source speech models for Amharic voice typing in AbayKey.", link: "/projects/abaykey" },
];

// Who my apps are for (the rotating line on the home page). Each one matches a real project.
export const BUILDING_FOR = [
  "students preparing for exams",
  "students who dream of studying abroad",
  "visitors to my town, Dodola",
  "wheat traders like my brother",
];

// Key moments, oldest first. Only things with a date I can prove.
export const TIMELINE = [
  { date: "Sep 2023", title: "Started Grade 9 at Hawiko Academy", text: "Natural Science stream, Dodola." },
  { date: "Jan 2024", title: "Bronze medal", text: "Computer Skills Competition (beginner level) at Victory Wisdom." },
  { date: "Jun 2024", title: "Finished a 6-month computer course", text: "Basic computer training at Victory Wisdom, an after-school centre." },
  { date: "Dec 2025", title: "Started building Zemen Academy", text: "A quiz app for Grades 9–12 that works offline." },
  { date: "Feb 2026", title: "Blue Ocean Student Entrepreneurship", text: "Online course and certificate." },
  { date: "May 2026", title: "Pitched SindeTrack", text: "Blue Ocean student pitch competition – certificate of recognition." },
  { date: "Jun 2026", title: "Aerospace and Aviation Intensive Training", text: "Admas Aero Nexus – completed." },
  { date: "Oct 2026", title: "Zemen Academy on Google Play", text: "My first app published on the Play Store." },
  { date: "Jun 2027", title: "Finishing Grade 12", text: "After that, I hope to study software engineering at university.", future: true },
];
