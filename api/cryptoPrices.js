import axios from "axios";
import { useQuery } from "react-query";

const request = axios.create({
  baseURL:
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false",
});

// console.log(request);

export const useGetCryptoCurrencies = () => {
  return useQuery("crypto-currencies", () =>
    request
      .get("/")
      .then((res) => res.data)
      .catch((err) => {
        if (err.response.status === 403) {
          localStorage.clear();
        } else return err;
      })
  );
};
