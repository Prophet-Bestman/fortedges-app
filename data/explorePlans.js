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
  fixedIncome: {
    img: "/img/icons/fixed-income-1.png",
    color: "app.green",
    history: [
      { year: "2022", profit: "55.77%" },
      { year: "2021", profit: "53.12%" },
      { year: "2020", profit: "52.03%" },
      { year: "2019", profit: "57.19%" },
      { year: "2018", profit: "51.31%" },
      { year: "2017", profit: "50.97%" },
      { year: "2016", profit: "51.01%" },
    ],
  },
  realEstate: {
    img: "/img/icons/Real-estate-1.png",
    color: "app.blue",
    history: [
      { year: "2022", profit: "26.02%" },
      { year: "2022", profit: "25.19%" },
      { year: "2021", profit: "25.10%%" },
      { year: "2020", profit: "25.03%" },
      { year: "2019", profit: "25.11%" },
      { year: "2018", profit: "24.94%" },
      { year: "2017", profit: "24.71%" },
      { year: "2016", profit: "24.69%" },
    ],
  },
  premiumStock: {
    img: "/img/emojis/star.png",
    color: "text.brown",
    history: [
      { year: "2022", profit: "55.77%" },
      { year: "2021", profit: "53.12%" },
      { year: "2020", profit: "52.03%" },
      { year: "2019", profit: "57.11%" },
      { year: "2018", profit: "51.11%" },
      { year: "2017", profit: "40.77%" },
      { year: "2016", profit: "51.11%" },
    ],
  },
  cryptoPremium: {
    img: "/img/icons/bitcoin.png",
    color: "text.brown",
    history: [
      { year: "2022", profit: "55.77%" },
      { year: "2021", profit: "53.12%" },
      { year: "2020", profit: "52.03%" },
      { year: "2019", profit: "57.15%" },
      { year: "2018", profit: "51.93%" },
      { year: "2017", profit: "51.77%" },
      { year: "2016", profit: "51.86%" },
    ],
  },
  cryptoIntermediate: {
    img: "/img/icons/bitcoin.png",
    color: "text.brown",
    history: [
      { year: "2022", profit: "36.19%" },
      { year: "2021", profit: "36.12%%" },
      { year: "2020", profit: "38.29%" },
      { year: "2019", profit: "35.93%" },
      { year: "2018", profit: "34.11%" },
      { year: "2017", profit: "35.77%" },
      { year: "2016", profit: "34.92%" },
    ],
  },
  cryptoBasic: {
    img: "/img/icons/bitcoin.png",
    color: "text.brown",
    history: [
      { year: "2022", profit: "18.80%" },
      { year: "2021", profit: "19.92%" },
      { year: "2020", profit: "18.01%" },
      { year: "2019", profit: "18.15%" },
      { year: "2018", profit: "18.19%" },
      { year: "2017", profit: "18.27%" },
      { year: "2016", profit: "18.11%" },
    ],
  },
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
