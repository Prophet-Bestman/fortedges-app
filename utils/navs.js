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
  { name: "Overview", link: "/", icon: "/img/nav/dashboard.png" },
  { name: "My Plans", links: "/myplans", icon: "/img/nav/trend.png" },
  { name: "Feeds", links: "/feeds", icon: "/img/nav/feeds.png" },
  { name: "Account", links: "/account", icon: "/img/nav/account.png" },
];
