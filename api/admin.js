import axios from "axios";
import { baseUrl } from "api/baseUrls";
import { useMutation, useQueryClient, useQuery } from "react-query";
import configOptions, { getUserID } from "./config";

const request = axios.create({
  baseURL: baseUrl + "/admin",
});

const useAdminGetDashboard = () => {
  const headers = configOptions();
  return useQuery("dashboard", () =>
    request
      .get(`/dashboard`, {
        headers: headers,
      })
      .then((res) => res.data)
      .catch((err) => {
        if (err.response.status === 403) {
          localStorage.clear();
        } else return err;
      })
  );
};

export { useAdminGetDashboard };
