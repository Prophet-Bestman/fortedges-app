import axios from "axios";
import { useQuery } from "react-query";
import configOptions, { getUserID } from "./config";

const request = axios.create({
  baseURL: "https://fortedges-api.herokuapp.com/users",
});

const useGetUser = () => {
  const headers = configOptions();
  const user_id = getUserID();
  return useQuery(["user", user_id], () =>
    request
      .get(`/${user_id}`, {
        headers: headers,
      })
      .then((res) => res.data)
  );
};

export { useGetUser };
