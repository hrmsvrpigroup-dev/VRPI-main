import { EmbeddedCourseContent } from "./CourseContent";
import { EmbeddedSyllabus } from "./Syllabus";
import { EmbeddedToolsAndTechnologyUsed } from "./ToolsAndTechnologyUsed";

export const Embedded = {
  id: "4",
  type: "offline",
  courseCode: "vprico004",

  name: "Embedded & IoT",
  courseLink: "/",
  active: true,

  content: [
    " Scholarship on course fee",
    "Virtual Classes",
    "Live Practical Training ",
  ],
  actualPrice: "75000",

  discountedPrice: "75000",
  image: "embeddedCourse2.webp",
  duration: {
    durationMetric: "months",
    training: 6,
    internship: 4,
    total: 12,
  },
  buttonContent: "Enroll Now",
  language: "English",
  instructor: {
    name: "Ravikanth Varigonda",
    image: "dummyImage.png",
    description: [
      "Having 23 years experience on Windows, Linux and Android, FreeRTOS, Zephyr OS Design , Development and Architecting BSP, HAL, Device Drivers,Middleware, Stack Development, MQTT, CoaP, IoT , STM32,ESP32, Silicon Labs, Nordic controllers",
    ],
  },
  rating: "4.5",
  reviewsCount: "10k",
  studentsEnrolled: "50",
  updatedDate: "Feb 2014",
  toolsAndTechnologyUsed: EmbeddedToolsAndTechnologyUsed,
  courseContent: EmbeddedCourseContent,

  syllabus: EmbeddedSyllabus,
};
