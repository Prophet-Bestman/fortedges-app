import axios from "axios";
import { AuthContext, userActions } from "providers/AuthProvider";
import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import configOptions, { getUserID } from "./config";

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + "/users",
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
      .catch((err) => {
        if (err.response.status === 403) {
          localStorage.clear();
        } else return err;
      })
  );
};

export const useGetLoggedInUser = () => {
  const headers = configOptions();
  const user_id = getUserID();
  const { dispatch: appendProfile } = useContext(AuthContext);

  return useQuery(
    ["logged-in-user", user_id],
    () =>
      request
        .get(`/${user_id}`, {
          headers: headers,
        })
        .then((res) => res)
        .catch((err) => {
          if (err.response.status === 403) {
            localStorage.clear();
          } else return err;
        }),
    {
      onSuccess: (data) => {
        console.log("Fetched User", data);
        appendProfile({
          type: userActions.APPEND_PROFILE,
          payload: data?.data,
        });
      },
    }
  );
};

const useAdminGetUser = (user_id) => {
  const headers = configOptions();
  return useQuery(["admin-user", user_id], () =>
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

const useGetAllUsers = (page) => {
  const headers = configOptions();
  return useQuery(["users", page], () =>
    request
      .get(`?page=${page || 1}`, {
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

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  const user_id = getUserID();
  return useMutation(
    (values) =>
      request
        .put(`/${user_id}`, values, { headers: headers })
        .then((res) => res.data)
        .catch((err) => err.response.status),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user");
      },
    }
  );
};

const useAdminUpdateUser = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .put(`/${values.user_id}`, values.data, { headers: headers })
        .then((res) => res)
        .catch((err) => err.response.status),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("admin-user");
      },
    }
  );
};

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (user_id) =>
      request
        .delete(`/${user_id}`, { headers: headers })
        .then((res) => res)
        .catch((err) => {
          if (err.response.status === 403) {
            localStorage.clear();
          } else return err;
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );
};

export {
  useGetUser,
  useUpdateUser,
  useGetAllUsers,
  useAdminGetUser,
  useAdminUpdateUser,
  useDeleteUser,
};
