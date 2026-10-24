import { AICourseContent } from "./CourseContent";
import { AISyllabus } from "./Syllabus";
import { AIToolsAndTechnologyUsed } from "./ToolsAndTechnologyUsed";

export const AI = {
  id: "5",
  courseCode: "vrpico005",
  type: "online",

  name: "Artificial Intelligence",
  courseLink: "/",
  active: true,

  content: [
    " Scholarship on course fee",
    "Virtual Classes",
    "Live Practical Training ",
  ],
  duration: {
    durationMetric: "months",
    training: 6,
    internship: 4,
    total: 12,
  },
  actualPrice: "65000",
  discountedPrice: "65000",
  image: "aiCourse2.webp",
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
  toolsAndTechnologyUsed: AIToolsAndTechnologyUsed,
  courseContent: AICourseContent,
  syllabus: AISyllabus,
};

export const AIOffline = {
  ...AI,
  id: "10",
  courseCode: "vrpico010",
  type: "offline",
  content: [
    " Scholarship on course fee",
    "Offline Classes",
    "Live Practical Training ",
  ],
  actualPrice: "200000",
  discountedPrice: "200000",
};
