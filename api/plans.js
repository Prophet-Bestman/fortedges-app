import axios from "axios";
import { useQuery } from "react-query";
import configOptions from "./config";

const request = axios.create({
  baseURL: "https://fortedges-api.herokuapp.com/custom-plans",
});

const useGetPlans = () => {
  const headers = configOptions();
  return useQuery(
    "plans",
    request
      .get("", { headers: headers })
      .then((res) => res.data)
      .catch((err) => {
        if (err.response.status === 403) {
          localStorage.clear();
        } else return err;
      })
  );
};

export { useGetPlans };
