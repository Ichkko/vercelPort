export const profile = {
  name: "Гомбосүрэн Ичинхорлоо",
  email: "ichkoog79@gmail.com",
  phone: "+976 8015 0000",
  github: "https://github.com/Ichkko",
  linkedin: "https://www.linkedin.com/in/ichko",
  instagram: "https://www.instagram.com/iichh.kuu__/",
  avatar: "/assets/images/ichkkkko-1785171948972.jpg",
};

export const techStack = [
  { name: "Java", icon: "Coffee" as const },
  { name: "Spring Boot", icon: "Leaf" as const },
  { name: "MySQL", icon: "Database" as const },
  { name: "Next.js", icon: "Hexagon" as const },
  { name: "React", icon: "Component" as const },
  { name: "TypeScript", icon: "FileCode2" as const },
  { name: "Tailwind CSS", icon: "Wind" as const },
  { name: "Git", icon: "GitBranch" as const },
  { name: "Docker", icon: "Container" as const },
];

export const skillCategories = [
  {
    id: "backend",
    labelKey: "skillCatBackend" as const,
    color: "#d97706",
    colorSoft: "rgba(245,158,11,0.1)",
    icon: "Coffee" as const,
    skills: [
      { name: "Java", level: 85, tag: "Core" },
      { name: "Spring Boot", level: 80, tag: "API" },
      { name: "MySQL", level: 78, tag: "DB" },
      { name: "JPA / Hibernate", level: 70, tag: "ORM" },
      { name: "REST API", level: 82, tag: "Design" },
      { name: "JWT Auth", level: 72, tag: "Security" },
    ],
  },
  {
    id: "frontend",
    labelKey: "skillCatFrontend" as const,
    color: "#0891b2",
    colorSoft: "rgba(8,145,178,0.1)",
    icon: "Component" as const,
    skills: [
      { name: "Next.js", level: 80, tag: "Framework" },
      { name: "React", level: 82, tag: "UI" },
      { name: "TypeScript", level: 75, tag: "Language" },
      { name: "Tailwind CSS", level: 88, tag: "Styling" },
      { name: "HTML / CSS", level: 90, tag: "Core" },
      { name: "Framer Motion", level: 65, tag: "Animation" },
    ],
  },
  {
    id: "mobile",
    labelKey: "skillCatMobile" as const,
    color: "#7c3aed",
    colorSoft: "rgba(124,58,237,0.1)",
    icon: "Hexagon" as const,
    skills: [
      { name: "Flutter", level: 68, tag: "Framework" },
      { name: "Dart", level: 65, tag: "Language" },
      { name: "Firebase", level: 60, tag: "Backend" },
    ],
  },
  {
    id: "tools",
    labelKey: "skillCatTools" as const,
    color: "#dc2626",
    colorSoft: "rgba(239,68,68,0.1)",
    icon: "GitBranch" as const,
    skills: [
      { name: "Git / GitHub", level: 85, tag: "VCS" },
      { name: "Docker", level: 60, tag: "DevOps" },
      { name: "IntelliJ IDEA", level: 82, tag: "IDE" },
      { name: "VS Code", level: 88, tag: "IDE" },
      { name: "Postman", level: 80, tag: "Testing" },
    ],
  },
];

export const projectsMeta = [
  {
    id: "1" as const,
    image: "/assets/images/foodmenu1-1785171287595.png",
    images: [
      "/assets/images/foodmenu1-1785171287595.png",
      "/assets/images/foodmenu2-1785173306419.png",
      "/assets/images/foodmenu3-1785173330944.png",
      "/assets/images/foodmenu4-1785173342054.png",
      "/assets/images/foodmenu5-1785173355844.png",
    ],
    tags: ["Spring Boot", "WebSocket", "MySQL", "Next.js"],
    liveUrl: "https://github.com/Ichkko",
    githubUrl: "https://github.com/Ichkko",
    titleKey: "project1Title" as const,
    descKey: "project1Desc" as const,
  },
  
  {
    id: "2" as const,
    image: "/assets/images/hotel1.png",
    images: [
     "/assets/images/hotel1.png",
     "/assets/images/hotel2.png",
      "/assets/images/hotel3.png",
      "/assets/images/hotel4.png",
      "/assets/images/hotel5.png",
      '/assets/images/hotel6.png',
      '/assets/images/hotel7.png',
    ],
    tags: ["Java", "Spring Boot", "MySQL", "JWT"],
    liveUrl: "https://github.com/Ichkko",
    githubUrl: "https://github.com/Ichkko",
    titleKey: "project2Title" as const,
    descKey: "project2Desc" as const,
  },
  
  {
    id: "3" as const,
    image: "/assets/images/west.png",
    images: [
      "/assets/images/west.png",
       "/assets/images/west1.png",
       "/assets/images/west2.png",
        "/assets/images/west4.png",
    ],
    tags: ["Flutter", "Dart", "Firebase"],
    liveUrl: "https://github.com/Ichkko",
    githubUrl: "https://github.com/Ichkko",
    titleKey: "project3Title" as const,
    descKey: "project3Desc" as const,
  },
   {
    id: "4" as const,
    image: "/assets/images/oyu.png",
    images: [
      "/assets/images/oyu.png",
       "/assets/images/oyu1.png",
       '/assets/images/oyu2.png',
       '/assets/images/oyu3.png',
 
    ],
    tags: ["Flutter", "Dart", "Firebase"],
    liveUrl: "https://github.com/Ichkko",
    githubUrl: "https://github.com/Ichkko",
    titleKey: "project4Title" as const,
    descKey: "project4Desc" as const,
  },
  
];
