import { DevopsCourseContent } from "./CourseContent";
import { DevopsSyllabus } from "./Syllabus";
import { DevopsToolsAndTechnologyUsed } from "./ToolsAndTechnologyUsed";

export const Devops = {
  id: "2",
  courseCode: "vprico002",

  type: "online",
  duration: {
    durationMetric: "months",
    training: 6,
    internship: 3,
    total: 12,
  },
  name: "DevOps with Cloud",
  courseLink: "/",
  active: true,

  content: [" Scholarship on course fee", "Virtual Classes"],
  live: {
    onLive: false,
    meetingLink: "",
  },
  recordedVideos: [
    {
      videoTitle: "Introduction to Java Programming",
      videoDescription: "",
      videoLink: "",
    },
    { videoTitle: "Setting up the JDE", videoDescription: "", videoLink: "" },
    {
      videoTitle: "Introduction to Java Programming",
      videoDescription: "",
      videoLink: "",
    },
    {
      videoTitle: "Introduction to Java Programming",
      videoDescription: "",
      videoLink: "",
    },
  ],

  actualPrice: "55000",

  discountedPrice: "1770",
  buttonContent: "Enroll Now",
  image: "devopsCourse2.jpg",
  language: "English",
  instructor: {
    name: "Y Santhosh Kumar",
    image: "devopsInstructor.jpg",
    description: [
      "I have over 9 years of experience, From last 3+ Years Working in VRPI Groups of company as DevOps Engineer.",
      "My previous assignment was as Python Developer.",
      "Expertise on Build and Release Process. Certified Open AI and ChatGPT_4 Prompt Engineer .",
    ],
  },
  rating: "4.5",
  reviewsCount: "10k",
  studentsEnrolled: "50",
  updatedDate: "Feb 2014",
  toolsAndTechnologyUsed: DevopsToolsAndTechnologyUsed,
  courseContent: DevopsCourseContent,

  syllabus: DevopsSyllabus,
};

export const DevopsOffline = {
  ...Devops,
  id: "8",
  courseCode: "vprico008",
  type: "offline",
  content: [
    " Scholarship on course fee",
    "Offline Classes",
    "Live Practical Training ",
  ],
  actualPrice: "150000",
  discountedPrice: "150000",
};
