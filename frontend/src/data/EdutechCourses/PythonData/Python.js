import { PythonCourseContent } from "./CourseContent";
import { PythonSyllabus } from "./Syllabus";
import { PythonToolsAndTechnologyUsed } from "./ToolsAndTechnologyUsed";

export const Python = {
  id: "6",
  type: "online",
  courseCode: "vprico006",

  name: "Python",
  courseLink: "/",
  active: true,

  content: [
    " Scholarship on course fee",
    "Virtual Classes",
    "Live Practical Training ",
  ],
  actualPrice: "55000",
  discountedPrice: "1770",
  duration: {
    durationMetric: "months",
    training: 6,
    internship: 3,
    total: 12,
  },
  image: "python2.png",
  buttonContent: "Enroll Now",
  language: "English",
  instructor: {
    name: "Amol Jangid",
    description: [
      "I have total 12 years of IT experience. From last 9 years I am delivering the training in various technologies like MEAN Stack, MERN Stack, Java Full Stack, Python Full Stack.",
    ],
    image: "javaInstructor.jpeg",
  },
  rating: "4.5",
  reviewsCount: "10k",
  studentsEnrolled: "50",
  updatedDate: "Feb 2014",
  toolsAndTechnologyUsed: PythonToolsAndTechnologyUsed,
  courseContent: PythonCourseContent,
  syllabus: PythonSyllabus,
};

export const PythonOffline = {
  ...Python,
  id: "9",
  courseCode: "vprico009",
  type: "offline",
  content: [
    " Scholarship on course fee",
    "Offline Classes",
    "Live Practical Training ",
  ],
  actualPrice: "150000",
  discountedPrice: "150000",
};
