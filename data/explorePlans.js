const explorePlans = [
  {
    name: "Premium Stocks",
    returnType: "High Return",
    img: "/img/emojis/star.png",
    color: "text.brown",
  },
  {
    name: "Real Estate",
    returnType: "Moderate Return ",
    img: "/img/emojis/home2.png",
    color: "others.green",
  },
  {
    name: "Fixed Income",
    returnType: "Basic Return ",
    img: "/img/emojis/money.png",
    color: "others.blue",
  },
];

export const planProps = {
  fixedIncome: { img: "/img/emojis/money.png", color: "others.blue" },
  realEstate: { img: "/img/emojis/home2.png", color: "others.green" },
  premiumStock: { img: "/img/emojis/star.png", color: "text.brown" },
};

export const goalProps = {
  business: {
    img: "/img/emojis/Briefcase.png",
    color: "others.brown",
  },
  school: {
    img: "/img/emojis/school.png",
    color: "others.blue",
  },
  travel: {
    img: "/img/emojis/plane.png",
    color: "others.cyan",
  },
  home: {
    img: "/img/emojis/home.png",
    color: "text.green",
  },
  rent: {
    img: "/img/emojis/home2.png",
    color: "others.green",
  },
  wedding: {
    img: "/img/emojis/ring.png",
    color: "#C1B9F9",
  },
};

export default explorePlans;
