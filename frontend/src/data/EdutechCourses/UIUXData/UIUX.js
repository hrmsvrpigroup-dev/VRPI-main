import { UIUXCourseContent } from "./CourseContent";
import { UIUXSyllabus } from "./Syllabus";
import { UIUXToolsAndTechnologyUsed } from "./ToolsAndTechnologyUsed";

export const UIUX = {
  id: "3",
  courseCode: "vprico003",
  type: "upcoming",

  name: "UI/UX Designing",
  courseLink: "/",
  active: false,

  content: [" Scholarship on course fee", "Virtual Classes"],
  actualPrice: "60000",
  discountedPrice: "1770",
  duration: {
    durationMetric: "months",
    training: 6,
    internship: 3,
    total: 12,
  },
  buttonContent: "Enroll Now",
  image: "UIUXCourse2.webp",
  language: "English",
  instructor: {
    name: "Gayathri Prasad",
    image: "Instructor1.png",
    description: [
      // "I’m Gayatri. Your Instructor for this Course",
      "Lorem ipsum dolor sit amet consectetur. Sodales eget convallis sem iaculis. Lorem ipsum dolor sit amet consectetur. Sodales eget convallis sem iaculis.",
      "Lorem ipsum dolor sit amet consectetur. Sodales eget convallis sem iaculis. Lorem ipsum dolor sit amet consectetur. Sodales eget convallis sem iaculis.",
    ],
  },
  rating: "4.5",
  reviewsCount: "10k",
  studentsEnrolled: "50",
  updatedDate: "Feb 2014",
  toolsAndTechnologyUsed: UIUXToolsAndTechnologyUsed,
  courseContent: UIUXCourseContent,

  syllabus: UIUXSyllabus,
};
