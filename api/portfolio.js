import axios from "axios";
import { useQuery } from "react-query";
import configOptions from "./config";

const request = axios.create({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL + "/portfolio",
});

export const useGetPortfolio = () => {
  const headers = configOptions();
  return useQuery("portfolio", () =>
    request
      .get("/", { headers: headers })
      .then((res) => res)
      .catch((err) => {
        if (err.response.status === 403) {
          localStorage.clear();
        } else return err;
      })
  );
};
