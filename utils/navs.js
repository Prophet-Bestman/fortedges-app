import { AiOutlineDashboard } from "react-icons/ai";
import { BiTrendingUp } from "react-icons/bi";
import { RiRefund2Line } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GrHistory } from "react-icons/gr";

export const authNavs = [
  { name: "Home", link: process.env.NEXT_PUBLIC_LANDING_URL + "/" },
  {
    name: "Plans",
    link: "#",
    dropDown: [
      {
        name: "Premium Stock",
        link: process.env.NEXT_PUBLIC_LANDING_URL + "/plans/premium_stock",
      },
      {
        name: "Real Estate",
        link: process.env.NEXT_PUBLIC_LANDING_URL + "/plans/real_estate",
      },
      {
        name: "Fixed Income",
        link: process.env.NEXT_PUBLIC_LANDING_URL + "/plans/fixed_income",
      },
    ],
  },

  { name: "Security", link: process.env.NEXT_PUBLIC_LANDING_URL + "/security" },
  { name: "Blog", link: process.env.NEXT_PUBLIC_LANDING_URL + "/blogs" },
  {
    name: "Company",
    link: "#",
    dropDown: [
      {
        name: "About Us",
        link: process.env.NEXT_PUBLIC_LANDING_URL + "/about_us",
      },
      {
        name: "Support",
        link: process.env.NEXT_PUBLIC_LANDING_URL + "/support",
      },
      {
        name: "Wealth Calculator",
        link: process.env.NEXT_PUBLIC_LANDING_URL + "/wealth_calculator",
      },
      {
        name: "Why Ubassets",
        link: process.env.NEXT_PUBLIC_LANDING_URL + "/why_ubassets",
      },
    ],
  },
];

export const mainNavs = [
  { name: "Overview", link: "/", icon: <AiOutlineDashboard size="18px" /> },
  // { name: "My Plans", link: "/myplans", icon: <BiTrendingUp size="18px" /> },
  {
    name: "Add Money",
    link: "#",
    icon: <RiRefund2Line size="18px" />,
  },
  {
    name: "Notifications",
    link: "/notifications",
    icon: <IoMdNotificationsOutline size="18px" />,
  },
  {
    name: "Transaction History",
    link: "/transaction_history",
    icon: <GrHistory size="18px" />,
  },
];

export const mobileNavs = [
  { name: "Overview", link: "/", icon: "/img/nav/dashboard.svg" },
  // { name: "My Plans", link: "/myplans", icon: "/img/nav/trend.svg" },
  { name: "Add Money", link: "#", icon: "/img/nav/fund.svg" },
  {
    name: "Notifications",
    link: "/notifications",
    icon: "/img/nav/notification.svg",
  },
  {
    name: "Transaction History",
    link: "/transaction_history",
    icon: "/img/nav/history.svg",
  },
];

export const adminNavs = [
  { name: "Dashboard", link: "/admin", icon: "/img/nav/dashboard.svg" },
  { name: "Deposits", link: "/admin/deposits", icon: "/img/nav/trend.svg" },
  {
    name: "Withdrawals",
    link: "/admin/withdrawals",
    icon: "/img/nav/fund.svg",
  },
  {
    name: "Users",
    link: "/admin/users",
    icon: "/img/nav/notification.svg",
  },
  {
    name: "ID verification",
    link: "/admin/id_verifications",
    icon: "/img/nav/history.svg",
  },
  {
    name: "Mode of payment",
    link: "/admin/mop",
    icon: "/img/nav/history.svg",
  },
];
