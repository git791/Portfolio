export const personalInfo = {
  name: "Mohammed Ayaan Adil Ahmed",
  firstName: "Mohammed Ayaan",
  role: "Student",
  bio: "AWS Cloud Club Captain | HackerRank Campus Ambassador | B. Tech CSE @ Alliance University | Building Agentic AI & Cloud Apps | Python • JavaScript • Swift • C++ • AWS",
  about: `Enthusiastic and highly driven Third-Year B.Tech Computer Science Engineering student at Alliance University. I am an active learner dedicated to building a robust technical foundation and exploring how technology can solve real-world problems.

My core understanding is built upon foundational programming concepts in C, C++, Java, and Python. I actively seek out and participate in workshops and hackathons to apply this knowledge and accelerate my development.

I am currently expanding my skills into specialized domains: learning Kotlin and Swift for modern mobile app development, exploring the Unity engine for game creation, and gaining initial exposure to cloud infrastructure concepts via AWS and Azure. My focus is always on translating theoretical knowledge into tangible, real-world solution projects.

I am eager to secure an internship where I can contribute my energy, foundational skills, and dedication to a supportive and innovative environment.`,
  location: "Bengaluru, India",
  email: "m.ayaan.a.ahmed@gmail.com",
  availability: "Open to opportunities",
  social: {
    github: "https://github.com/git791",
    linkedin: "https://www.linkedin.com/in/mohammed-ayaan-adil-ahmed-540868311/",
    instagram: "https://www.instagram.com/mohammed_ayaan_adil/",
    x: "https://x.com/AdDeLoOp",
  },
};

export const projects = [
  {
    id: 1,
    title: "BizBoost AI",
    category: "Agentic AI / Cloud",
    year: "2026",
    description:
      "Voice-to-catalog AI platform for Indian small businesses. Speak in Hindi, get a professional bilingual WhatsApp catalog post instantly, powered by Amazon Bedrock Nova. Built with AWS Lambda, DynamoDB, API Gateway, and Amplify.",
    tags: ["AWS", "Amazon Bedrock", "Lambda", "DynamoDB", "Amplify", "Python", "Next.js", "Voice AI", "Generative AI", "API Gateway"],
    image: "/images/projects/BizBoost.png",
    liveUrl: "",
    caseStudyUrl: "",
    githubUrl: "https://github.com/git791/BizBoost-AI",
    featured: true,
  },
  {
    id: 2,
    title: "Calm Aid",
    category: "Multimodal AI / Cloud",
    year: "2026",
    description:
      "Multimodal AI first-aid agent built with Gemini 2.5 Flash and deployed on Google Cloud Run. Speak the emergency, show the injury via camera, and receive calm step-by-step instructions streaming back in real time with live voice output.",
    tags: ["Gemini 2.5", "FastAPI", "Google Cloud Run", "Server-Sent Events"],
    image: "/images/projects/calmaid.png",
    liveUrl: "",
    caseStudyUrl: "",
    githubUrl: "https://github.com/git791/Calm-Aid",
    featured: true,
  },
  {
    id: 3,
    title: "Brain Dump",
    category: "AI Study Tool",
    year: "2026",
    description:
      "AI study companion that learns alongside you, automatically extracts concepts from chat into a personal knowledge file, detects when you're stuck and serves a targeted learning pathway, and exports notes to Anki and Notion.",
    tags: ["Python", "Streamlit", "Gemini API", "AMD ROCm"],
    image: "/images/projects/braindump.png",
    liveUrl: "",
    caseStudyUrl: "",
    githubUrl: "https://github.com/git791/Brain-Dump",
    featured: true,
  },
  {
    id: 4,
    title: "Green AI Orchestrator",
    category: "AI Agent",
    year: "2026",
    description:
      "Agentic AI MVP built during Kaggle & Google's 5-day Agentic AI Course. Calculates carbon emissions and suggests event proposals using a human-in-the-loop approval system.",
    tags: ["Python", "Kaggle", "Google AI", "Agentic AI", "Gemini", "Google ADK", "Multi-Agent"],
    image: "/images/projects/greenai.png",
    liveUrl: "",
    caseStudyUrl: "",
    githubUrl: "https://github.com/git791/GreenAI-Agent",
    featured: false,
  },
  {
    id: 5,
    title: "AI Dropout Prediction System",
    category: "Machine Learning",
    year: "2025",
    description:
      "Smart India Hackathon prototype that predicts student dropout risk using AI and pairs at-risk students with a counselling system to intervene early.",
    tags: ["Python", "ML", "Education", "SIH"],
    image: "/images/projects/dropout.png",
    liveUrl: "",
    caseStudyUrl: "",
    githubUrl: "https://github.com/git791/AI-based-drop-out-prediction-and-counselling-system",
    featured: false,
    status: "prototype",
  },
  {
    id: 6,
    title: "EvolJewels Kiosk",
    category: "Hackathon Project",
    year: "2025",
    description:
      "Interactive jewelry kiosk experience built for the FuelEd Hackathon. A full kiosk-style frontend interface for browsing and selecting jewelry products.",
    tags: ["JavaScript", "HTML", "CSS"],
    image: "/images/projects/EvolJewels.png",
    liveUrl: "",
    caseStudyUrl: "",
    githubUrl: "https://github.com/git791/EvoJewels-Kiosk",
    figmaUrl: "https://www.figma.com/make/JkhTeYt5OGU7OJb1DIpPdY/Interactive-Jewelry-Recommendation-Kiosk?t=Y0ay9ST4zxSt6t7s-20&fullscreen=1",
    featured: false,
    status: "prototype",
  },
  {
  id: 7,
  title: "T-Rex Runner",
  category: "Game Development",
  year: "2024",
  description:
    "A browser-based recreation of the Google Chrome offline T-Rex game built with p5.js. Features a persistent score system where restarting continues from your last score rather than resetting.. a deliberate twist on the original. Obstacles and core physics implemented; bird enemies are a planned addition.",
  tags: ["JavaScript", "p5.js", "Game Dev"],
  image: "/images/projects/Trex.png",
  liveUrl: "https://git791.github.io/trex_runner_actual/",
  caseStudyUrl: "",
  githubUrl: "https://github.com/git791/trex_runner_actual",
  featured: false,
  status: "working",
 },
 {
  id: 8,
  title: "Plinko",
  category: "Game Development",
  year: "2024",
  description:
    "A browser-based Plinko game — balls drop through a field of pegs and land in scored slots at the bottom. Built with JavaScript, recreating the satisfying physics and randomness of the classic Plinko board.",
  tags: ["JavaScript", "Game Dev"],
  image: "/images/projects/plinko.png",
  liveUrl: "https://git791.github.io/plinko_1234567/",
  caseStudyUrl: "",
  githubUrl: "https://github.com/git791/plinko_1234567",
  featured: false,
  status: "working",
 },
];

export const skills = [
  {
    category: "Languages",
    items: ["Python", "JavaScript", "C", "C++", "Java", "Swift", "Kotlin", "HTML & CSS"],
  },
  {
    category: "Frontend",
    items: ["Next.js", "React", "Tailwind CSS", "Three.js", "GSAP", "Framer Motion"],
  },
  {
    category: "Cloud & AI",
    items: ["AWS", "Azure", "Google Cloud", "Amazon Bedrock", "Gemini API", "Agentic AI", "FastAPI", "Streamlit", "boto3"],
  },
  {
    category: "Tools & Platforms",
    items: ["Git & GitHub", "Unity", "Figma", "VS Code", "Kiro", "Vercel", "p5.js"],
  },
  {
  category: "Data & ML",
  items: ["Pandas", "NumPy", "Scikit-learn", "Seaborn", "Matplotlib", "SQL"],
 },
];

export const certifications = [
  {
    id: 1,
    title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle",
    date: "Oct 2025",
    credentialUrl: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=7EF0B8C28AA6204B1B93C836BFBCA080D2213A4D77DBF892BC36FC46E9FF6C99",
    image: "",
    category: "Industry",
  },

  {
    id: 16,
    title: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services",
    date: "Jun 2025",
    credentialUrl: "https://coursera.org/share/56b962649a4571db9b64dcbab6575f65",
    image: "",
    category: "Coursera",
  },

  {
    id: 2,
    title: "Probability & Statistics for Machine Learning & Data Science",
    issuer: "DeepLearning.AI",
    date: "Mar 2026",
    credentialUrl: "https://coursera.org/share/c9cacad8f08162a58950547a8010fc1e",
    image: "",
    category: "Coursera",
  },

  {
    id: 3,
    title: "Statistics Onramp",
    issuer: "MATLAB",
    date: "Mar 2026",
    credentialUrl: "https://matlabacademy.mathworks.com/progress/share/certificate.html?id=cb6cbc69-9861-404c-8d46-bbd67bec7767&",
    image: "",
    category: "Courses",
  },

  {
    id: 4,
    title: "Gen AI Academy - AI/ML Track",
    issuer: "Google & Hack2Skill",
    date: "Dec 2025",
    credentialUrl: "https://www.linkedin.com/posts/mohammed-ayaan-adil-ahmed-540868311_googlecloud-machinelearning-genai-activity-7417518008358731776-9jd0?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE9TzwABcCxm0ErkXXLJCuN-snFDv2_3qjs",
    image: "",
    category: "Competition",
  },

  {
    id: 5,
    title: "Logical & Analytical Reasoning — Exam & Recruitment Prep",
    issuer: "Board Infinity",
    date: "Mar 2026",
    credentialUrl: "https://coursera.org/share/3f194cbde027b7bfdd7d52e2c69220f7",
    image: "",
    category: "Coursera",
  },

  {
    id: 6,
    title: "Intro to Operating Systems 2: Memory Management",
    issuer: "Codio",
    date: "Mar 2026",
    credentialUrl: "https://coursera.org/share/64ab49c5958d6315677f5a78ac361e42",
    image: "",
    category: "Coursera",
  },

  {
    id: 7,
    title: "Solving Problems with Creative and Critical Thinkingt",
    issuer: "IBM",
    date: "Feb 2026",
    credentialUrl: "https://coursera.org/share/6a0bb911a3edb45576eb22d448149a07",
    image: "",
    category: "Coursera",
  },

  {
    id: 8,
    title: "Fundamentals of Computer Organization",
    issuer: "International Institute of Information Technology, Hyderabad",
    date: "Jan 2026",
    credentialUrl: "https://coursera.org/share/799cd7e5566d2b76faad8a456387e71d",
    image: "",
    category: "Coursera",
  },

  {
    id: 9,
    title: "FPGA Architecture Based System for Industrial Application",
    issuer: "L&T EduTech",
    date: "Oct 2025",
    credentialUrl: "https://coursera.org/share/740b68b9edd986b96e0833016b40b1c7",
    image: "",
    category: "Coursera",
  },

  {
    id: 10,
    title: "FPGA Architecture Based System for Industrial Application",
    issuer: "L&T EduTech",
    date: "Oct 2025",
    credentialUrl: "https://coursera.org/share/6bf7554ca093f4650294952ac76ace33",
    image: "",
    category: "Coursera",
  },

  {
    id: 11,
    title: "Foundations of User Experience (UX) Design",
    issuer: "Google",
    date: "Oct 2025",
    credentialUrl: "https://coursera.org/share/27031d4f42e7891a8b3d1afae94ab968",
    image: "",
    category: "Coursera",
  },

  {
    id: 12,
    title: "Basic Statistics",
    issuer: "University of Amsterdam",
    date: "Oct 2025",
    credentialUrl: "https://coursera.org/share/73d1bb48b8cefe81cf3a63d2d7b8f488",
    image: "",
    category: "Coursera",
  },

  {
    id: 13,
    title: "Data Structures",
    issuer: "University of California, San Diego",
    date: "Sep 2025",
    credentialUrl: "https://coursera.org/share/23508fd6892aed6064df5293aa3972c4",
    image: "",
    category: "Coursera",
  },

  {
    id: 14,
    title: "Speak English Professionally: In Person, Online & On the Phone",
    issuer: "Georgia Institute of Technology",
    date: "Sep 2025",
    credentialUrl: "https://coursera.org/share/aa1a9d8c6f6cbfa5b1df0d78e4e5d03d",
    image: "",
    category: "Coursera",
  },

  {
    id: 15,
    title: "Fundamentals of Digital Design for VLSI Chip Design",
    issuer: "L&T EduTech",
    date: "Sep 2025",
    credentialUrl: "https://coursera.org/share/84ad45a448a89c8118e9f7d8df5d3786",
    image: "",
    category: "Coursera",
  },

  {
    id: 17,
    title: "Qualitative and Quantitative Analysis of Disaster Risk",
    issuer: "Banco Interamericano de Desarrollo",
    date: "Jun 2025",
    credentialUrl: "https://coursera.org/share/56b962649a4571db9b64dcbab6575f65",
    image: "",
    category: "Coursera",
  },

  {
    id: 18,
    title: "Differential Equations Part I Basic Theory",
    issuer: "Korea Advanced Institute of Science and Technology(KAIST)",
    date: "Mar 2025",
    credentialUrl: "https://coursera.org/share/3ec98849ae267a6c2d28c05c06c7a293",
    image: "",
    category: "Coursera",
  },

  {
    id: 19,
    title: "Disaster, Crisis, and Emergency Preparedness Communication",
    issuer: "The State University of New York",
    date: "Mar 2025",
    credentialUrl: "https://coursera.org/share/975cf60b8b2d721f8cd054904c2cc083",
    image: "",
    category: "Coursera",
  },

  {
    id: 20,
    title: "How to Change the World",
    issuer: "Wesleyan University",
    date: "Mar 2025",
    credentialUrl: "https://coursera.org/share/27ba9ee67b48ff1c73a3cd5b635f318a",
    image: "",
    category: "Coursera",
  },

  {
    id: 21,
    title: "Natural Disaster Risk in Infrastructure Projects",
    issuer: "Banco Interamericano de Desarrollo",
    date: "Mar 2025",
    credentialUrl: "https://coursera.org/share/c8191efd02f7eee0234b5571e5ca50c1",
    image: "",
    category: "Coursera",
  },

  {
    id: 22,
    title: "Critical Thinking Skills for University Success",
    issuer: "The University of Sydney",
    date: "Feb 2025",
    credentialUrl: "https://coursera.org/share/494e63deb4aacfdcc49d57b841adc783",
    image: "",
    category: "Coursera",
  },

  {
    id: 23,
    title: "Providing Social, Emotional, Behavioral, and Special Education Services in School",
    issuer: "University of Colorado System",
    date: "Nov 2024",
    credentialUrl: "https://coursera.org/share/2338ee02de36063cc377aacdb0a5c2c9",
    image: "",
    category: "Coursera",
  },

  {
    id: 24,
    title: "C for Everyone, Part 1: Programming Fundamentals",
    issuer: "University of California, Santa Cruz",
    date: "Nov 2024",
    credentialUrl: "https://coursera.org/share/cd0f87fc0c07ac9879d93b29ef253e2e",
    image: "",
    category: "Coursera",
  },

  {
    id: 25,
    title: "Introduction to Computers and Office Productivity Software",
    issuer: "The Hong Kong University of Science and Technology",
    date: "Nov 2024",
    credentialUrl: "https://coursera.org/share/e6462b92c9d6b144ae0dc76cb5d7c678",
    image: "",
    category: "Coursera",
  },

  {
    id: 26,
    title: "Emotional and Social Intelligence",
    issuer: "University of California, Davis",
    date: "Nov 2024",
    credentialUrl: "https://coursera.org/share/402d7b3ce8d4e28f0a3f29db5a78b7fe",
    image: "",
    category: "Coursera",
  },

  {
    id: 27,
    title: "Career Planning: A Pathway to Employment",
    issuer: "Kennesaw State University",
    date: "Nov 2024",
    credentialUrl: "https://coursera.org/share/826c159b7badb9e68246962d12ad7be0",
    image: "",
    category: "Coursera",
  },

  {
    id: 28,
    title: "Managing Responsibly: Practicing Sustainability, Responsibility and Ethics",
    issuer: "University of Manchester",
    date: "Nov 2024",
    credentialUrl: "https://coursera.org/share/5be0d5c8abe2d9aa1fd165992c14af7a",
    image: "",
    category: "Coursera",
  },

  {
    id: 29,
    title: "Certified Game Developer",
    issuer: "WhiteHat Jr.",
    date: "Aug 2020",
    credentialUrl: "",
    image: "",
    category: "Courses",
  },

  {
    id: 30,
    title: "Time Management Fundamentals",
    issuer: "LinkedIN",
    date: "Nov 2024",
    credentialUrl: "https://www.linkedin.com/learning/certificates/1f78aef4411e67a69dffb2d8970373802b4727a78ccaa7ce08b9900c82ab560b?trk=share_certificate",
    image:"",
    category: "Courses",
  },

  {
    id: 31,
    title: "Java Fundamentals",
    issuer: "Scaler",
    date: "Jul 2024",
    credentialUrl: "",
    image:"",
    category: "Courses",
  },

  {
    id: 32,
    title: "Intro to Programming",
    issuer: "Kaggle",
    date: "May 2025",
    credentialUrl: "https://www.kaggle.com/learn/certification/mohammedayaanadil/intro-to-programming",
    image:"",
    category: "Courses",
  },

  {
    id: 33,
    title: "Intro to Machine Learning",
    issuer: "Kaggle",
    date: "May 2025",
    credentialUrl: "https://www.kaggle.com/learn/certification/mohammedayaanadil/intro-to-programming",
    category: "Courses",
  },

  {
    id: 34,
    title: "AWS Cloud Quest - Cloud Practitioner",
    issuer: "AWS Skill Builder",
    date: "Oct 2025",
    credentialUrl: "https://www.credly.com/badges/4e16569f-941e-4972-9ece-e233039c6b06/public_url",
    category: "Courses",
  },

  {
    id: 35,
    title: "FuelEd Contest 3.0",
    issuer: "Fountane, Student tribe, Evol Jewels",
    date: "Dec 2025",
    credentialUrl: "https://www.linkedin.com/posts/mohammed-ayaan-adil-ahmed-540868311_fueledbyfountane-fueledcontest3-evoljewels-activity-7392890482336518144-eFUD?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE9TzwABcCxm0ErkXXLJCuN-snFDv2_3qjs",
    image: "",
    category: "Competition",
  },

  {
    id: 36,
    title: "Cardano Hackathon Asia — IBW Edition 2025",
    issuer: "Cardano & Hack2Skill",
    date: "Nov 2025",
    credentialUrl: "https://www.linkedin.com/posts/mohammed-ayaan-adil-ahmed-540868311_cardanoasia-ibw2025-web3innovation-activity-7400824411316051968-H71J?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE9TzwABcCxm0ErkXXLJCuN-snFDv2_3qjs",
    image: "",
    category: "Competition",
  },

  {
    id: 37,
    title: "5-Day AI Agents Intensive Course with Google",
    issuer: "Google & Kaggle",
    date: "Nov 2025",
    credentialUrl: "https://www.linkedin.com/posts/mohammed-ayaan-adil-ahmed-540868311_googleai-kaggle-aiagents-activity-7407654990112055296-D708?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE9TzwABcCxm0ErkXXLJCuN-snFDv2_3qjs",
    image: "",
    category: "Competition",
  },

  {
    id: 38,
    title: "AI + Sustainability Virtual Internship",
    issuer: "1M1B & IBM SkillsBuild",
    date: "Jan 2026",
    credentialUrl: "https://www.linkedin.com/posts/mohammed-ayaan-adil-ahmed-540868311_certificate-activity-7408052908820406273-oceD?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE9TzwABcCxm0ErkXXLJCuN-snFDv2_3qjs",
    image: "",
    category: "Competition",
  },
];

export const education = [
  {
    id: 1,
    degree: "Bachelor of Technology — Computer Science Engineering",
    institution: "Alliance University",
    location: "Bengaluru, India",
    startYear: "2024",
    endYear: "2028",
    description:
      "Actively building across AI, cloud, and mobile development. AWS Cloud Club Captain and HackerRank Campus Ambassador. Participating in multiple competitions.",
  },
  {
    id: 2,
    degree: "Pre-University — Science (11th & 12th)",
    institution: "Presidency Pre University College JP Nagar",
    location: "Bengaluru, India",
    startYear: "2022",
    endYear: "2024",
    description: "Karnataka State Board",
  },
  {
    id: 3,
    degree: "Secondary School (Grades 6–10)",
    institution: "Iqra International School",
    location: "Bengaluru, India",
    startYear: "2016",
    endYear: "2022",
    description: "Pearson EdExcel IGCSE",
  },
];

export const hackathons = [
  {
    id: 1,
    name: "Smart India Hackathon",
    organizer: "Government of India",
    date: "Sep 2025",
    result: "Participant",
    description:
      "Built an AI-based dropout prediction and counselling system that identifies at-risk students early and connects them with targeted intervention pathways. Led a cross-functional team across the full build.",
    tags: ["Python", "ML", "Education"],
    projectUrl: "https://github.com/git791/AI-based-drop-out-prediction-and-counselling-system",
    urlLabel: "View Prototype",
  },
  {
    id: 2,
    name: "FuelEd Hackathon",
    organizer: "FuelEd",
    date: "Oct 2025",
    result: "Semi-Finalist",
    description:
      "Designed and built EvolJewels Kiosk, an interactive jewelry browsing kiosk interface with a full product selection flow.",
    tags: ["JavaScript", "HTML", "CSS"],
    projectUrl: "https://github.com/git791/EvoJewels-Kiosk",
    figmaUrl: "https://www.figma.com/make/JkhTeYt5OGU7OJb1DIpPdY/Interactive-Jewelry-Recommendation-Kiosk?t=Y0ay9ST4zxSt6t7s-20&fullscreen=1",
    urlLabel: "View Prototype",
  },
  {
    id: 3,
    name: "Turbotic AI Hackathon",
    organizer: "Turbotic",
    date: "Jul 2025",
    result: "Participant",
    description:
      "Built an intelligent data migration bot for a post-merger M&A scenario using Node.js in a low-code platform. Handled Julian date conversion, inconsistent customer naming, and legacy ID to UUID mapping. Core feature was a fuzzy-matching algorithm that automatically segregated clean records for direct ERP import from anomalies requiring human review — guaranteeing data integrity without manual processing of the full dataset.",
    tags: ["Turbotic", "Node.js", "Low-Code", "Data Migration", "Fuzzy Matching"],
  },
  {
  id: 4,
  name: "Cardano Hackathon Asia — IBW Edition 2025",
  organizer: "Cardano & Hack2Skill",
  date: "Nov 2025",
  result: "Finalist",
  description:
    "Led team UnderDogs as team leader, proposing a decentralized skill verification platform for remote workers across Asia. Used Masumi DIDs and Cardano blockchain to issue NFT-based skill badges, with smart contract escrow payments and AI-powered job matching. Designed to eliminate credential fraud in gig economies.",
  tags: ["Blockchain", "Cardano", "NFT", "React", "Web3", "IPFS"],
  projectUrl: "https://www.figma.com/make/4gahB7lCISxfAaShPZOiNm/Wireframe-for-Skill-Verification-Platform?node-id=0-4&t=0qW3VqPRJo1w1Sv1-1",
  urlLabel: "View Figma",
  },
  {
  id: 5,
  name: "5-Day Gen AI Intensive — Capstone Project",
  organizer: "Google & Kaggle",
  date: "Dec 2025",
  result: "Participant",
  description:
    "Built GreenEvent AI, an autonomous multi-agent orchestrator for sustainable corporate event planning. Used Google ADK with a parallel agent architecture — VenueScout and TransportAgent running simultaneously — to fetch LEED-certified venues and calculate carbon emissions. Implemented Human-in-the-Loop approval via long-running operations before any booking is finalized, preventing unsupervised AI action.",
  tags: ["Python", "Google ADK", "Multi-Agent", "Streamlit", "Agentic AI", "Gemini"],
  projectUrl: "https://github.com/git791/GreenAI-Agent",
  urlLabel: "View Project"
  },
  {
  id: 6,
  name: "DreamFlow Buildathon 2025",
  organizer: "DreamFlow & Hack2Skill",
  date: "Feb 2025",
  result: "Participant",
  description:
    "Built FridgeFix, an AI-powered culinary assistant for students to reduce food waste. Enter your available ingredients and get unique 15-minute recipes tailored to your pantry instantly. Designed with a bento-box UI inspired by high-conversion patterns from Mobbin, with planned ElevenLabs voice integration for hands-free cooking instructions.",
  tags: ["AI", "Node.js", "Low-Code", "DreamFlow", "Generative AI"],
  projectUrl: "https://6ag3m7wmsxgzekwjhhld.share.dreamflow.app/",
  urlLabel: "View Prototype",
  },
  {
  id: 7,
  name: "Battle of Bytes — GDG on Campus",
  organizer: "GDG on Campus, Alliance University",
  date: "Feb 2025",
  result: "3rd Place",
  description:
    "Built an interactive 3D chemistry lab using Unity, allowing students to perform virtual chemistry experiments in a simulated environment. Designed to make lab experiments accessible without physical lab constraints — mixing reagents, observing reactions, and learning through hands-on 3D interaction.",
  tags: ["Unity", "C#", "3D", "Game Dev", "Education"],
  projectUrl: "",
  urlLabel: "View Level 1"
  },
  {
  id: 8,
  name: "Microsoft Imagine Cup 2025",
  organizer: "Microsoft",
  date: "Jan 2026",
  result: "Participant",
  description:
    "Built NutriVision, an intelligent dietary assistant that makes nutritional tracking as easy as taking a photo. Designed an Azure-powered architecture using Custom Vision for real-time food identification and Azure SQL Database for nutritional profiles. Delivered a deep-dive Figma prototype and technical architecture demonstration within the competition timeline.",
  tags: ["Azure", "Custom Vision", "Azure SQL", "Figma", "AI", "Health Tech"],
  projectUrl: "https://figma.com/make/fGZBmlFd0mQegoZcxEPzm1/AI-Food-Tracker-Prototype?t=dlYNGVQNIfGp5m5w-1",
  urlLabel: "View Prototype",
  },
  {
  id: 9,
  name: "Figma FigBuild 2026",
  organizer: "Figma",
  date: "Mar 2026",
  result: "Participant",
  description:
    "Designed Tide, an emotional intelligence tool for therapists, social workers, and first responders — professionals who absorb emotional residue from others. The app reads a room's emotional state as a living aura, tracks real-time energetic exchange between two people in a session, and builds a personal weekly emotional map. Built with compassion fatigue prevention as the core use case.",
  tags: ["Figma", "UI/UX", "Health Tech", "Product Design", "Prototyping"],
  projectUrl: "https://www.figma.com/deck/xpQNKSjCksKaWf4gdcDQ9I/Tide_FigBuild2026?node-id=0-20&t=5x6ME4yhL1nCn2xn-1",
  urlLabel: "View Prototype Deck",
  },
  {
  id: 10,
  name: "AMD Slingshot Hackathon",
  organizer: "AMD & Hack2Skill",
  date: "Mar 2026",
  result: "Participant",
  description:
    "Led team Ryzen Renegades building Brain Dump — an AI study companion that converts learning conversations into a personal Knowledge File. Core innovation was a distillation engine that converts raw chat into structured bullet points of what the student understood. Included hiccup detection that identifies concept gaps in real time and serves targeted 10-minute learning pathways. Leveraged AMD Ryzen AI NPU for fully offline on-device inference via ROCm.",
  tags: ["Python", "FastAPI", "LangChain", "ChromaDB", "React", "AMD ROCm", "Education AI"],
  projectUrl: "https://github.com/git791/Brain-Dump",
  urlLabel: "View Project",
  },
];

export const experience = [
  {
    id: 1,
    role: "Campus Ambassador",
    organization: "HackerRank",
    type: "Full-time",
    location: "Remote",
    startDate: "Mar 2026",
    endDate: "Aug 2026",
    description: "Representing HackerRank at Alliance University, promoting coding culture and competitive programming among students.",
  },
  {
    id: 2,
    role: "Industry & Outreach Co-Lead",
    organization: "SIG FutureTech & GenAI — Alliance University",
    type: "Part-time",
    location: "Hybrid",
    startDate: "Feb 2026",
    endDate: "Present",
    description: "Co-leading industry outreach and community building for the Student Interest Group focused on Future Technologies and Generative AI.",
  },
  {
    id: 3,
    role: "IIC Student Co-ordinator",
    organization: "Alliance University",
    type: "Part-time",
    location: "Hybrid",
    startDate: "Aug 2025",
    endDate: "Present",
    description: "Coordinating innovation and entrepreneurship activities under the Institution's Innovation Council at Alliance University.",
  },
  {
    id: 4,
    role: "AWS Student Builder Group Leader",
    organization: "Amazon Web Services (AWS)",
    type: "Full-time",
    location: "Hybrid · Bengaluru",
    startDate: "Feb 2026",
    endDate: "Present",
    description: "Serving as the first-ever AWS Cloud Club Captain at Alliance University. Acting as a bridge between AWS education platforms and the university, organizing cloud upskilling events and hands-on workshops for students.",
  },
  {
    id: 5,
    role: "Intern — Centre of Excellence for Nature-Based Solutions",
    organization: "Alliance University",
    type: "Internship",
    location: "On-site · Bengaluru",
    startDate: "Aug 2025",
    endDate: "Feb 2026",
    description: "Engaged in expert-led workshops and collaborative projects exploring sustainable urban development, biodiversity, and climate adaptation strategies. Contributed to discussions on nature-based solutions including green roofs and ecological principles applied to real-world environmental challenges.",
  },
  {
    id: 6,
    role: "Student Intern",
    organization: "1M1B (1 Million for 1 Billion)",
    type: "Internship",
    location: "Remote · India",
    startDate: "Dec 2025",
    endDate: "Jan 2026",
    description: "Contributed to 1M1B's mission of empowering a billion people through education and opportunity.",
  },
  {
    id: 7,
    role: "Senior Backend Developer",
    organization: "STARDY AI",
    type: "Startup",
    location: "Remote · India",
    startDate: "Feb 2026",
    endDate: "Present",
    description: "Currently building the backend including API's, database, routing etc..",
  },

];

export const profiles = {
  leetcode: "https://leetcode.com/u/AdDeLoOp/",
  hackerrank: "https://www.hackerrank.com/profile/1286_Ayaan",
  hack2skill: "https://vision.hack2skill.com/dashboard/user_public_profile/?userId=689efd7e67f4831cb420b765&utm_source=hack2skill&utm_medium=homepage",
  devpost: "https://devpost.com/AdDeLoOp?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav",
  devto: "https://dev.to/mohammed_ayaanadilahmed",
  medium: "https://medium.com/@m.ayaan.a.ahmed",
  hackerearth: "https://www.hackerearth.com/@m.ayaan.a.ahmed", 
};

export const activities = [
  {
    id: 1,
    name: "Event/Meetup Name",
    organizer: "Organizer",
    date: "Month Year",
    description: "What you did or learned there.",
  },
];