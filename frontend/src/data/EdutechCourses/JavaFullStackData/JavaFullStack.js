import { JFSCCourseContent } from "./CourseContent";
import { JFSCSyllabus } from "./Syllabus";
import { JFSCtoolsAndTechnologyUsed } from "./ToolsAndTechnologyUsed";

const JFSCIntructorDetails = {
  name: "Amol Jangid",
  description: [
    "I have total 12 years of IT experience. From last 9 years I am delivering the training in various technologies like MEAN Stack, MERN Stack, Java Full Stack, Python Full Stack.",
  ],
  image: "javaInstructor.jpeg",
};

export const JavaFullStackCourse = {
  id: "1",
  courseCode: "vprico001",
  name: "Java Full-Stack",
  courseLink: "/",
  active: true,
  type: "online",
  content: [" Scholarship on course fee", "Virtual Classes"],
  duration: {
    durationMetric: "months",
    training: 6,
    internship: 3,
    total: 12,
  },
  actualPrice: "55000",
  discountedPrice: "1770",
  buttonContent: "Enroll Now",
  image: "javaCourse2.jpg",
  language: "English",
  live: {
    onLive: true,
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
  instructor: JFSCIntructorDetails,
  rating: "4.5",
  reviewsCount: "10k",
  studentsEnrolled: "50",
  updatedDate: "Feb 2014",
  toolsAndTechnologyUsed: JFSCtoolsAndTechnologyUsed,
  courseContent: JFSCCourseContent,

  syllabus: JFSCSyllabus,
};

export const JavaFullStackCourseOffline = {
  ...JavaFullStackCourse,
  id: "7",
  courseCode: "vprico007",
  type: "offline",
  content: [
    " Scholarship on course fee",
    "Offline Classes",
    "Live Practical Training ",
  ],
  actualPrice: "150000",
  discountedPrice: "150000",
};
