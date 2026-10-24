export const url = {
  // backendBaseUrl: "http://vrpigroup.com",
  // backendBaseUrl: "https://vrpitest.azurewebsites.net",
  backendBaseUrl: process.env.REACT_APP_BACKEND_URL || "http://localhost:8080",
  // backendBaseUrl: "https://vrpi-usermodule.azurewebsites.net",
  termsAndConditions:
    "https://merchant.razorpay.com/policy/NaFsnQOzqL4ESZ/terms",
  refundPolicyLink:
    "https://merchant.razorpay.com/policy/NaFsnQOzqL4ESZ/refund",
  shippingLink: "https://merchant.razorpay.com/policy/NaFsnQOzqL4ESZ/shipping",
  privacyPolicyLink: "/privacy-policy",
};
