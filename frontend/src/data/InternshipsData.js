const mainContent = {
  head: '"The best way to predict the future is to create it."',
  description:
    '"Internships offer a unique opportunity to step out of your comfort zone, challenge yourself, and discover what you are truly capable of achieving."',
  // button: { name: "Check now", link: "register", active: false },
};

const WhatIsSection = {
  title: "Why an Internship?",
  highlightWord: "Internships",
  image: "Internship1.png",
  description:
    "Internships offer hands-on experience, linking classroom knowledge with practical skills. They allow for networking, skill development, and personal growth. Interns gain insights into their desired fields, enhancing their resumes and paving the way for future career success.",
};

const Internships = [
  {
    id: "1",
    type: "live",
    name: "Software Development",
    courseLink: "#",
    active: false,
    content:
      "Skills Required: Machine Learning, Linux, Python, Java, Amazon Web Services, Back End and SQL.",
    buttonContent: "Apply",
  },
  {
    id: "2",
    type: "live",

    name: "UI/UX Designing",
    courseLink: "#",
    active: false,

    content:
      "Skills Required: User Research, Wireframing, Prototyping, Visual Design, IA, Interaction design, Usability Testing",
    buttonContent: "Apply",
  },
  {
    id: "3",
    type: "live",

    name: "Digital Marketing",
    courseLink: "#",
    active: false,

    content:
      "Skills Required: Video Marketing, SEO & SEM, Content Marketing, Data & Analytics, Design Thinking and Planning, Social Media, Email Marketing",
    // price: "$99.99",
    buttonContent: "Apply",
  },
  {
    id: "4",
    type: "live",

    name: "Chartered Accountant",
    courseLink: "#",
    active: false,

    content:
      "Skills Required: Problem Solving, Financial analysis, Business Communication, Analytical skills",
    // price: "$99.99",
    buttonContent: "Apply",
  },
  {
    id: "5",
    type: "live",

    name: "Civil Engineering",
    courseLink: "/javascript-course",
    active: false,

    content:
      "Skills Required: Maths & Physics Proficiency, Basic knowledge on foundation",
    buttonContent: "Apply",
  },

  {
    id: "6",
    type: "upcoming",

    name: "Hotel Management",
    courseLink: "",
    active: false,

    content:
      "Skills Required: Empathy, Multi tasking and Management, Leadership, Customer Service",
    buttonContent: "Apply",
  },
  {
    id: "7",
    type: "upcoming",

    name: "Graphic Designing",
    courseLink: "",
    active: false,

    content:
      "Skills Required: Adobe Creative Suite, including Photoshop, InDesign, and Illustrator, Creativity, Color theory, Typography, Communication, Drawing, Problem-solving.",
    buttonContent: "Apply",
  },
];

const benefitsData = {
  title: "Internships Benefits",
  highlightWord: "Internships",
  head: "We believe “An Internship can be an excellent way to try out your dream career.",
  benefits: [
    "Internship Certificate",
    "Live Projects",
    "Industrial Trainers",
    "Full-Time Job Role",
  ],
  image: "Internship2.png",
};

// const InstructorSection = {
//   title: "Edu-Tech Instructors",
//   highlightWord: "Edu-Tech",
//   Instructors: [
//     {
//       name: "Neil",
//       address: "Instructor1.png",
//       technologies: "Python Full Stack",
//     },
//     {
//       name: "Aryan",
//       address: "Instructor2.png",
//       technologies: "Java Full Stack",
//     },
//     { name: "Chritee", address: "Instructor3.png", technologies: "Devops" },
//     {
//       name: "Lucy",
//       address: "Instructor4.png",
//       technologies: "Embedded & Iot",
//     },
//   ],
// };

const partnersWith = {
  title: "Partners With",
  partners: [
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
  ],
};

const FAQs = [
  {
    question:
      "Are there any specific software/tools I need to familiarize myself with?",
    answer:
      "Certainly! Familiarize yourself with Microsoft Office Suite, collaboration platforms, project management tools, industry-specific software, data analysis tools, coding languages, and design tools.",
  },
  {
    question: "Who should I report to for daily tasks?",
    answer:
      "Your supervisor oversees your tasks, guides you, assigns projects, and provides feedback. Clarify any uncertainties about your supervisor with HR or colleagues.",
  },
  {
    question: "Is there a performance evaluation process for interns?",
    answer:
      "Yes,Interns receive regular feedback and a final evaluation from supervisors. Criteria may include work quality, meeting deadlines, teamwork, and communication.",
  },
  {
    question:
      "How do I provide feedback or suggestions for improvement during my internship?",
    answer:
      "Schedule a meeting with your supervisor to offer constructive feedback. Provide specific examples and actionable suggestions, focusing on solutions. Participate in formal feedback processes.",
  },
];

export const InternshipsData = {
  mainContent,
  WhatIsSection,
  Internships,
  benefitsData,
  partnersWith,
  FAQs,
};
