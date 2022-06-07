import axios from "axios";
import { baseUrl } from "api/baseUrls";
import { useMutation, useQueryClient, useQuery } from "react-query";
import configOptions, { getUserID } from "./config";

const request = axios.create({
  baseURL: baseUrl + "/verifications",
});

const useVerifyID = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .post(``, values, { headers: headers })
        .then((res) => res.data)
        .catch((err) => {
          if (err.response.status === 403) {
            localStorage.clear();
          } else return err;
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user");
      },
    }
  );
};

const useGetVerifications = () => {
  const headers = configOptions();
  const user_id = getUserID();
  return useQuery(["verification", user_id], () =>
    request
      .get(`/${user_id}`, {
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

const useAdminGetAllVerifications = () => {
  const headers = configOptions();
  return useQuery("verifications", () =>
    request
      .get(`/?limit=1000`, {
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

const useAdminGetUserVerifications = (user_id) => {
  const headers = configOptions();
  return useQuery(["verifications", user_id], () =>
    request
      .get(`/${user_id}`, {
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

const useAdminVerifyID = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .put(`/${values.user_id}`, values.payload, { headers: headers })
        .then((res) => res.data)
        .catch((err) => {
          if (err.response.status === 403) {
            localStorage.clear();
          } else return err;
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        queryClient.invalidateQueries("verifications");
      },
    }
  );
};

export {
  useVerifyID,
  useGetVerifications,
  useAdminGetUserVerifications,
  useAdminVerifyID,
  useAdminGetAllVerifications,
};
