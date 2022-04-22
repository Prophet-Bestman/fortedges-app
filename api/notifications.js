import axios from "axios";
import { useMutation, useQueryClient, useQuery } from "react-query";
import configOptions, { getUserID } from "./config";

const request = axios.create({
  baseURL: "https://fortedges-api.herokuapp.com/notifications ",
});

const useGetNotifications = () => {
  const headers = configOptions();
  const user_id = getUserID();
  return useQuery("notifications", () =>
    request
      .get(``, {
        headers: headers,
      })
      .then((res) => res.data)
      .catch((err) => {
        if (err.response.status === 403) {
          localStorage.clear();
          return err;
        } else return err;
      })
  );
};

export { useGetNotifications };
