import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import configOptions from "./config";

const request = axios.create({
  baseURL: "https://fortedges-api.herokuapp.com",
});

const useSignUp = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (values) => request.post("/auth/signup", values).then((res) => res.data),
    {
      onSuccess: () => queryClient.invalidateQueries("user"),
    }
  );
};

const useLogIn = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (values) => request.post("/auth/login", values).then((res) => res.data),
    {
      onSuccess: () => queryClient.invalidateQueries("user"),
    }
  );
};

const useSendEmailVerification = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .post(`/auth/verify-email`, values, { headers: headers })
        .then((res) => res.data)
        .catch((err) => {
          if (err.response.status === 403) {
            localStorage.clear();
          } else return err;
        }),

    {
      onSuccess: () => queryClient.invalidateQueries("user"),
    }
  );
};

const useVerifyEmail = (code) => {
  const headers = configOptions();
  return useQuery(["user", code], () =>
    request
      .get(`/auth/verify-email?code=${code}`, { headers: headers })
      .then((res) => res.data)
      .catch((err) => {
        if (err.response.status === 403) {
          localStorage.clear();
        } else return err;
      })
  );
};
const useSendChangeEmailCode = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .post(`/auth/change-email`, values, { headers: headers })
        .then((res) => res.data)
        .catch((err) => {
          if (err.response.status === 403) {
            localStorage.clear();
          } else return err;
        }),

    {
      onSuccess: () => queryClient.invalidateQueries("user"),
    }
  );
};
const useChangeEmail = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .put(`/auth/change-email`, values, { headers: headers })
        .then((res) => res.data)
        .catch((err) => {
          if (err.response.status === 403) {
            localStorage.clear();
          } else return err;
        }),

    {
      onSuccess: () => queryClient.invalidateQueries("user"),
    }
  );
};

export {
  useSignUp,
  useLogIn,
  useSendEmailVerification,
  useVerifyEmail,
  useChangeEmail,
  useSendChangeEmailCode,
};
