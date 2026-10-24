export const MainHeaderLinks = [
  { name: "Home", address: "/", active: true },

  { name: "About Us", address: "/about", active: true },
  // { name: "Services", address: "/services" },
  // { name: "Campanies", address: "/companies" },
  // { name: "Careers", address: "/careers", active: true },
  // { name: "KnowledgeHub", address: "/knowledgeHub" },
  { name: "Contact Us", address: "/contact", active: true },
  { name: "Gallery", address: "/gallery", active: true },
];

export const KnowledgeHubHeaderLinks = [
  { name: "Edu-tech", address: "/edutech", active: true },
  { name: "Interships", address: "/internships", active: true },
  { name: "Terms & Conditions", address: "/terms-and-conditions", active: true },
  { name: "Contact Us", address: "/contact", active: true },
];

export const buttonsLinks = [
  { name: "Login / Sign-up", link: "/login", active: true },
];

export const MainDropdownLinks = [
  {
    name: "Knowledge Hub",
    address: "/edutech",
    active: true,
    content: [
      {
        label: "Edu-Tech",
        description: {
          descriptionHead: "What is Edutech?",
          descriptionContent:
            "EduTech integrates education and technology, employing digital tools such as online platforms, educational apps, and virtual reality to enrich learning. Its objectives include personalized education, enhanced teaching efficacy, and broader access to quality learning. EduTech's ultimate goal is to equip learners with vital skills for thriving in the digital era.",
          link: "edutech",
          active: true,
        },
      },
      {
        label: "Internship",
        description: {
          descriptionHead: "Why an Internship?",
          descriptionContent:
            "Internships offer hands-on experience, linking classroom knowledge with practical skills. They allow for networking, skill development, and personal growth. Interns gain insights into their desired fields, enhancing their resumes and paving the way for future career success.",
          link: "internships",
          active: true,
        },
      },
    ],
  },
  {
    name: "Companies and Services",
    // address: "/",
    active: true,
    content: [
      {
        label: "Construction and Infra",
        description: {
          descriptionHead: "Construction and Infra",
          descriptionContent:
            "Construction and infrastructure: Building the foundation for modern society with expertise, innovation, and sustainable practices. From towering skyscrapers to vital transportation networks, we shape the landscape, enhance connectivity, and drive economic growth for future generations.",
          link: "/construction",
          active: true,
        },
      },
      {
        label: "Financial Services",
        description: {
          descriptionHead: "Financial Services",
          descriptionContent:
            "Our comprehensive financial services encompass wealth management, investment advisory, and risk mitigation strategies. With a client-centric approach and expert guidance, we optimize financial portfolios, ensuring stability, growth, and long-term prosperity. From planning to execution, we prioritize your financial well-being and goals.",
          link: "/financial-services",
          active: true,
        },
      },
      {
        label: "Food Processing",
        description: {
          descriptionHead: "Food Processing",
          descriptionContent:
            "Our food processing solutions harness cutting-edge technology and industry expertise to optimize production, ensure quality, and meet market demands. From sourcing to packaging and distribution, we deliver innovative solutions that enhance efficiency, safety, and profitability in the food industry.",
          link: "/food-processing",
          active: true,
        },
      },
      {
        label: "Imports & Exports",
        description: {
          descriptionHead: "Imports & Exports",
          descriptionContent:
            "Our global trade solutions seamlessly connect markets, facilitating the flow of goods and services worldwide. With expertise in international commerce, we optimize supply chains, minimize trade barriers, and drive economic growth through efficient imports and exports management.",
          link: "/imports-exports",
          active: true,
        },
      },
      {
        label: "Management & Consulting",
        description: {
          descriptionHead: "Management & Consulting",
          descriptionContent:
            "Our management and consulting services offer strategic guidance and operational expertise across diverse industries. From organizational optimization to market analysis and implementation, we provide tailored solutions that drive efficiency, growth, and sustainable success for our clients.",
          link: "/management-consulting",
          active: true,
        },
      },
      {
        label: "Tech Solutions",
        description: {
          descriptionHead: "Tech Solutions",
          descriptionContent:
            "Our technology solutions leverage advanced innovations and specialized expertise to address diverse challenges across industries. From software development to system integration and cybersecurity, we deliver customized strategies that optimize operations, enhance security, and drive digital transformation for businesses worldwide.",
          link: "/tech-solutions",
          active: true,
        },
      },
    ],
  },


  // { name: "Careers", address: "/careers", active: false },

  // {
  //   name: "Trust and Welfare",
  //   address: "trust",
  //   active: false,
  //   content: [
  //     {
  //       label: "Women Welfare Organization",
  //       description: {
  //         descriptionHead:
  //           "Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. 1",
  //         descriptionContent:
  //           "Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. ",
  //         link: "trust",
  //         active: false,
  //       },
  //     },
  //     {
  //       label: "Farmer Welfare Organization",
  //       description: {
  //         descriptionHead:
  //           "Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. 2",
  //         descriptionContent:
  //           "Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. ",
  //         link: "trust",
  //         active: false,
  //       },
  //     },
  //   ],
  // },
];

export const JoinUsBarData = {
  socialMediaIcons: [
    {
      src: "WhatsApp.png",
      alt: "whatsapp",
      address: "https://wa.link/lj2wfw",
    },
    // {
    //   src: "TwitterX.png",
    //   alt: "twitter x",
    //   address: "",
    // },
    // {
    //   src: "YouTube.png",
    //   alt: "Youtube",
    //   address: "#",
    // },
    // {
    //   src: "Email.png",
    //   alt: "Email",
    //   address: "#",
    // },
    // {
    //   src: "Facebook.png",
    //   alt: "Facebook",
    //   address: "#",
    // },
    {
      src: "LinkedIn.png",
      alt: "Linkedin",
      address:
        "https://www.linkedin.com/company/vr-pi-tech-solutions-llp-in/?viewAsMember=true",
    },
    {
      src: "Instagram.png",
      alt: "Instagram",
      address: "https://www.instagram.com/sandeepkumar.pikili/",
    },
  ],
};

export const footerLinks = [
  { name: "Home", address: "/", active: true },
  { name: "About Us", address: "/about", active: true },
  { name: "Campanies", address: "/companies", active: false },
  { name: "Services", address: "/services", active: false },
  { name: "Careers", address: "/careers", active: false },
];

export const quickLinks = [
  { name: "Home", address: "/", active: true },
  { name: "About Us", address: "/about", active: true },
  { name: "Campanies", address: "/companies", active: false },
  // { name: "Services", address: "/services" , active:false},
  // { name: "Careers", address: "/careers", active: false },
  { name: "Edutech", address: "/edutech", active: true },
  { name: "Internships", address: "/internships", active: true },
  {
    name: "Contact Us",
    address: "/contact",
    active: true,
  },
];

export const ContactUs = {
  address: [
    "2/27/163, GANDHI NAGAR STREET, NEAR JAMMI CHETTU, WANAPARTHY , Wanaparthy, TELANGANA, 509103",

    // "Hyderabad (India)", "New Jersey (USA)"
  ],
  phoneNumber: "+91 8790946714",
  infoEmailId: "info@vrpigroup.co.in",
};
// const MainNavData = {
//   HeaderLinks,
//   dropdownLinks,
//   JoinUsBarData,
// };

// export default MainNavData;

export const navElementsForMobileData = [
  { name: "Home", link: "/", dropdownElement: false, active: true },
  {
    name: "About Us",
    link: "/about",
    dropdownElement: false,
    active: true,
  },
  {
    name: "Knowledge Hub",
    dropdownElement: true,
    links: [
      { name: "Edu-Tech", link: "/edutech", active: true },
      { name: "Internship", link: "/internships", active: true },
      { name: "Terms & Conditions", link: "/terms-and-conditions", active: true },
    ],
  },
  {
    name: "Companies & Services",
    dropdownElement: true,
    links: [
      { name: "Construction & Infra", link: "/construction", active: true },
      { name: "Financial Services", link: "/financial-services", active: true },
      { name: "Food Processing", link: "/food-processing", active: true },
      { name: "Imports & Exports", link: "/imports-exports", active: true },
      { name: "Management & Consulting", link: "/management-consulting", active: true },
      { name: "Tech Solutions", link: "/tech-solutions", active: true },
    ],
  },


  // {
  //   name: "Trust & Welfare",
  //   // link: "/",
  //   dropdownElement: true,
  //   links: [
  //     { name: "Women Welfare Organization", link: "", active: false },
  //     { name: "Farmer Welfare Organization", link: "", active: false },
  //   ],
  //   active: false,
  // },
  // { name: "Careers", link: "/", dropdownElement: false, active: false },
  {
    name: "Contact Us",
    link: "/contact",
    dropdownElement: false,
    active: true,
  },
  {
    name: "Gallery",
    link: "/gallery",
    dropdownElement: false,
    active: true,
  },
];
