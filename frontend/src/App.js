import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/MainPages/Home/Home";
import ErrorPage from "./pages/Error";
import AboutUs from "./pages/MainPages/AboutUs/AboutUs";
import Companies from "./pages/MainPages/Companies/Companies";
import Services from "./pages/MainPages/Services/Services";
import Careers from "./pages/MainPages/Carrers/Careers";
import Construction from "./pages/MainPages/Construction/Contruction";
import ConstructionAboutUsPage from "./pages/MainPages/Construction/ConstructionAboutUsPage";
import ConstructionServicesPage from "./pages/MainPages/Construction/ConstructionServicesPage";
import ConstructionContactUsPage from "./pages/MainPages/Construction/ConstructionContactUsPage";
import TechSolutionsPage from "./pages/MainPages/TechSolutions/TechSolutionsPage";
import TechSolutionsAboutUsPage from "./pages/MainPages/TechSolutions/TechSolutionsAboutUsPage";
import TechSolutionsServicesPage from "./pages/MainPages/TechSolutions/TechSolutionsServicesPage";
import TechSolutionsContactUsPage from "./pages/MainPages/TechSolutions/TechSolutionsContactUsPage";
import ImportExportPage from "./pages/MainPages/ImportExport/ImportExportPage";
import ImportExportAboutUsPage from "./pages/MainPages/ImportExport/ImportExportAboutUsPage";
import ImportExportServicesPage from "./pages/MainPages/ImportExport/ImportExportServicesPage";
import ImportExportContactUsPage from "./pages/MainPages/ImportExport/ImportExportContactUsPage";
import ManagementConsultingPage from "./pages/MainPages/ManagementConsulting/ManagementConsultingPage";
import ManagementConsultingAboutUsPage from "./pages/MainPages/ManagementConsulting/ManagementConsultingAboutUsPage";
import ManagementConsultingServicesPage from "./pages/MainPages/ManagementConsulting/ManagementConsultingServicesPage";
import ManagementConsultingContactUsPage from "./pages/MainPages/ManagementConsulting/ManagementConsultingContactUsPage";
import FoodProcessingPage from "./pages/MainPages/FoodProcessing/FoodProcessingPage";
import FoodProcessingAboutUsPage from "./pages/MainPages/FoodProcessing/FoodProcessingAboutUsPage";
import FoodProcessingServicesPage from "./pages/MainPages/FoodProcessing/FoodProcessingServicesPage";
import FoodProcessingContactUsPage from "./pages/MainPages/FoodProcessing/FoodProcessingContactUsPage";
import FinancialServices from "./pages/MainPages/FinancialServices/FinancialServices";
import FinancialAboutUsPage from "./pages/MainPages/FinancialServices/FinancialAboutUsPage";
import FinancialServicesSubPageWrapper from "./pages/MainPages/FinancialServices/FinancialServicesSubPageWrapper";
import FinancialContactUsSubPageWrapper from "./pages/MainPages/FinancialServices/FinancialContactUsSubPageWrapper";
import Internships from "./pages/KnowledgeHub/Internships";
import EduTech from "./pages/KnowledgeHub/EduTech";
import ContactUs from "./pages/MainPages/ContactUs/ContactUs";
import Gallery from "./pages/MainPages/Gallery/Gallery";
import CourseDetails from "./pages/KnowledgeHub/CourseDetails/CourseDetails";
import SignUp from "./pages/Login&Signup/SignUp/SignUp";

import Login from "./pages/Login&Signup/Login/Login";
import VerificationPage from "./pages/MainPages/VerificationPage/VerificationPage";
import CompanyDetails from "./pages/Login&Signup/CompanyDetails/CompanyDetails";
import EducationalDetails from "./pages/Login&Signup/EducationalDetails/EducationalDetails";
import DashboardRoot from "./pages/Dashboard/DashboardRoot";
import MyDashboard from "./pages/Dashboard/MyDashboard/MyDashboard";

import HelpAndSupport from "./pages/Dashboard/HelpAndSupport/HelpAndSupport";
import DashboardCourses from "./pages/Dashboard/DashboardCourses/DashboardCourses";
import DashboardInternships from "./pages/Dashboard/DashboardInternships/DashboardInternships";
import ForgetPassword from "./pages/Login&Signup/Login/ForgetPassword/ForgetPassword";
import CreateNewPassword from "./pages/Login&Signup/Login/CreateNewPassword/CreateNewPassword";
import MandatoryCertificates from "./pages/Login&Signup/MandatoryCertificates/MandatoryCertificates";
import PurchaseHistory from "./pages/Dashboard/PurchaseHistory/PurchaseHistory";
import { useSelector } from "react-redux";
import ProfilePage from "./pages/Dashboard/ProfilePage/ProfilePage";
import UpdateUserDetails from "./pages/MainPages/UpdateUserDetails/UpdateUserDetails";

import PrivacyPolicy from "./pages/MainPages/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./pages/MainPages/TermsAndConditions/TermsAndConditions";
import VerifyPayment from "./pages/MainPages/VerifyPayment/VerifyPayment";
import {
  GeneralErrorData,
  LoginRequestPage,
  PageNotFoundErrorData,
} from "./data/ErrorData";

function App() {
  // const navigate = useNavigate();

  const isVRPIUserLoggedIn = useSelector(
    (state) => state.login.isVRPIUserLoggedIn
  );

  // useEffect(() => {
  //   SaveUserDataInRedux();
  // });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
      children: [
        {
          index: true,
          element: <HomePage />,
          errorElement: <ErrorPage errorData={GeneralErrorData} />,
        },

        {
          path: "/about",
          element: <AboutUs />,
          errorElement: <ErrorPage errorData={GeneralErrorData} />,
        },
        {
          path: "/companies",
          element: <Companies />,
          errorElement: <ErrorPage errorData={GeneralErrorData} />,
        },

        {
          path: "/services",
          element: <Services />,
          errorElement: <ErrorPage errorData={GeneralErrorData} />,
        },
        {
          path: "/careers",
          element: <Careers />,
          errorElement: <ErrorPage errorData={GeneralErrorData} />,
        },
        {
          path: "/contact",
          element: <ContactUs />,
          errorElement: <ErrorPage errorData={GeneralErrorData} />,
        },
        {
          path: "/gallery",
          element: <Gallery />,
          errorElement: <ErrorPage errorData={GeneralErrorData} />,
        },
        // {
        //   path: "/register",
        //   element: <RegisterPage />,
        //   errorElement: <ErrorPage />,
        // },

        {
          path: "/signup",
          element: isVRPIUserLoggedIn ? (
            <ErrorPage errorData={PageNotFoundErrorData} />
          ) : (
            <SignUp />
          ),
          errorElement: <ErrorPage errorData={GeneralErrorData} />,
        },
        {
          path: "/login",
          element: isVRPIUserLoggedIn ? (
            <ErrorPage errorData={PageNotFoundErrorData} />
          ) : (
            <Login />
          ),
          errorElement: <ErrorPage errorData={GeneralErrorData} />,
        },

        {
          path: "/edutech",
          // index: true,
          element: <EduTech />,
          errorElement: <ErrorPage errorData={GeneralErrorData} />,
        },
        {
          path: "/edutech/:courseId",
          element: <CourseDetails />,
          errorElement: <ErrorPage errorData={GeneralErrorData} />,
        },
        {
          path: "/internships",
          element: <Internships />,
          errorElement: <ErrorPage errorData={GeneralErrorData} />,
        },

        // {
        //   path: "/internships/:internshipId",
        //   element: <CIDetails />,
        //   errorElement: <ErrorPage />,
        // },
        {
          path: "/terms-and-conditions",
          element: <TermsAndConditions />,
          errorElement: <ErrorPage errorData={GeneralErrorData} />,
        },
      ],
    },

    {
      path: "/error",
      element: <ErrorPage errorData={GeneralErrorData} />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/financial-services",
      element: <FinancialServices />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/construction",
      element: <Construction />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/companies/construction",
      element: <Construction />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/construction/about",
      element: <ConstructionAboutUsPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/companies/construction/about",
      element: <ConstructionAboutUsPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/construction/services",
      element: <ConstructionServicesPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/companies/construction/services",
      element: <ConstructionServicesPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/construction/contact",
      element: <ConstructionContactUsPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/companies/construction/contact",
      element: <ConstructionContactUsPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/tech-solutions",
      element: <TechSolutionsPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/companies/tech-solutions",
      element: <TechSolutionsPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/tech-solutions/about",
      element: <TechSolutionsAboutUsPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/companies/tech-solutions/about",
      element: <TechSolutionsAboutUsPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/tech-solutions/services",
      element: <TechSolutionsServicesPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/companies/tech-solutions/services",
      element: <TechSolutionsServicesPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/tech-solutions/contact",
      element: <TechSolutionsContactUsPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/companies/tech-solutions/contact",
      element: <TechSolutionsContactUsPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/imports-exports",
      element: <ImportExportPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/companies/imports-exports",
      element: <ImportExportPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/imports-exports/about",
      element: <ImportExportAboutUsPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/companies/imports-exports/about",
      element: <ImportExportAboutUsPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/imports-exports/services",
      element: <ImportExportServicesPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/companies/imports-exports/services",
      element: <ImportExportServicesPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/imports-exports/contact",
      element: <ImportExportContactUsPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/companies/imports-exports/contact",
      element: <ImportExportContactUsPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/management-consulting",
      element: <ManagementConsultingPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/companies/management-consulting",
      element: <ManagementConsultingPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/management-consulting/about",
      element: <ManagementConsultingAboutUsPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/companies/management-consulting/about",
      element: <ManagementConsultingAboutUsPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/management-consulting/services",
      element: <ManagementConsultingServicesPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/companies/management-consulting/services",
      element: <ManagementConsultingServicesPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/management-consulting/contact",
      element: <ManagementConsultingContactUsPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/companies/management-consulting/contact",
      element: <ManagementConsultingContactUsPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/food-processing",
      element: <FoodProcessingPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/companies/food-processing",
      element: <FoodProcessingPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/food-processing/about",
      element: <FoodProcessingAboutUsPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/companies/food-processing/about",
      element: <FoodProcessingAboutUsPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/food-processing/services",
      element: <FoodProcessingServicesPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/companies/food-processing/services",
      element: <FoodProcessingServicesPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/food-processing/contact",
      element: <FoodProcessingContactUsPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/companies/food-processing/contact",
      element: <FoodProcessingContactUsPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/financial-services/about",
      element: <FinancialAboutUsPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/financial-services/services",
      element: <FinancialServicesSubPageWrapper />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/financial-services/contact",
      element: <FinancialContactUsSubPageWrapper />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/editProfileDetails",
      element: isVRPIUserLoggedIn ? (
        <UpdateUserDetails />
      ) : (
        <ErrorPage errorData={LoginRequestPage} />
      ),
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/dashboard",
      element: isVRPIUserLoggedIn ? (
        <DashboardRoot />
      ) : (
        <ErrorPage errorData={LoginRequestPage} />
      ),
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
      children: [
        {
          path: "/dashboard",
          element: <MyDashboard />,
          errorElement: <ErrorPage errorData={PageNotFoundErrorData} />,
        },
        {
          path: "courses",
          element: <DashboardCourses />,
          errorElement: <ErrorPage errorData={GeneralErrorData} />,
        },
        {
          path: "internships",
          element: <DashboardInternships />,
          errorElement: <ErrorPage errorData={GeneralErrorData} />,
        },
        // {
        //   path: "settings",
        //   element: <ProfileSettings />,
        //   errorElement: <ErrorPage />,
        // },
        {
          path: "purchaseHistory",
          element: <PurchaseHistory />,
          errorElement: <ErrorPage errorData={GeneralErrorData} />,
        },
        {
          path: "helpAndSupport",
          element: <HelpAndSupport />,
          errorElement: <ErrorPage errorData={GeneralErrorData} />,
        },
        {
          path: "studentProfile",
          element: isVRPIUserLoggedIn ? (
            <ProfilePage />
          ) : (
            <ErrorPage errorData={LoginRequestPage} />
          ),
          errorElement: <ErrorPage errorData={GeneralErrorData} />,
        },
      ],
    },

    {
      path: "/resetPassword/:email/:otp",
      element: <CreateNewPassword />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/forgetPassword",
      element: !isVRPIUserLoggedIn ? (
        <ForgetPassword />
      ) : (
        <ErrorPage errorData={GeneralErrorData} />
      ),
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/vrpi-user/verify-account/:email/:otp",
      element: <VerificationPage />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/mandatoryCertificates",
      element: isVRPIUserLoggedIn ? (
        <MandatoryCertificates />
      ) : (
        <ErrorPage errorData={LoginRequestPage} />
      ),
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/educationalDetails",
      element: isVRPIUserLoggedIn ? (
        <EducationalDetails />
      ) : (
        <ErrorPage errorData={LoginRequestPage} />
      ),
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/companyDetails",
      element: isVRPIUserLoggedIn ? (
        <CompanyDetails />
      ) : (
        <ErrorPage errorData={LoginRequestPage} />
      ),
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },

    {
      path: "/privacy-policy",
      element: <PrivacyPolicy />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
    {
      path: "/course/verify-payment",
      element: <VerifyPayment />,
      errorElement: <ErrorPage errorData={GeneralErrorData} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
