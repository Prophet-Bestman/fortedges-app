export const authNavs = [
  { name: "Home", link: "/" },
  {
    name: "Plans",
    link: "#",
    dropDown: [
      { name: "Premium Stock", link: "/plans/premium_stock" },
      { name: "Real Estate", link: "/plans/real_estate" },
      { name: "Fixed Income", link: "/plans/fixed_income" },
    ],
  },

  { name: "Security", link: "/security" },
  { name: "Blog", link: "/blogs" },
  {
    name: "Company",
    link: "#",
    dropDown: [
      { name: "About Us", link: "/about_us" },
      { name: "FAQs", link: "/faq" },
      { name: "Wealth Calculator", link: "/wealth_calculator" },
      { name: "Why Fortedges", link: "/why_fortedges" },
    ],
  },
];

export const mainNavs = [
  { name: "Overview", link: "/", icon: "/img/nav/dashboard.svg" },
  { name: "My Plans", link: "/myplans", icon: "/img/nav/trend.svg" },
  { name: "Fund A Plan", link: "/fund_a_plan", icon: "/img/nav/fund.svg" },
  {
    name: "Notifications",
    link: "/notifications",
    icon: "/img/nav/notification.svg",
  },
  {
    name: "Transaction History",
    link: "transactionHistory",
    icon: "/img/nav/history.svg",
  },
];

export const mobileNavs = [
  { name: "Overview", link: "/", icon: "/img/nav/dashboard.svg" },
  { name: "My Plans", link: "/myplans", icon: "/img/nav/trend.svg" },
  { name: "Fund A Plan", link: "/fund_a_plan", icon: "/img/nav/fund.svg" },
  {
    name: "Notifications",
    link: "/notifications",
    icon: "/img/nav/notification.svg",
  },
  {
    name: "Transaction History",
    link: "transactionHistory",
    icon: "/img/nav/history.svg",
  },
];
