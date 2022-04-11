import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { config } from "utils";
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
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user");
      },
    }
  );
};

export { useGetUser, useUpdateUser };
