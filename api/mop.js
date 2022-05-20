import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import configOptions from "./config";

const request = axios.create({
  baseURL: "https://fortedges-api.herokuapp.com/mops",
});

const useGetMops = () => {
  const headers = configOptions();
  return useQuery("mops", () =>
    request
      .get("/", { headers: headers })
      .then((res) => res.data)
      .catch((err) => {
        if (err.response.status === 403) {
          localStorage.clear();
        } else return err;
      })
  );
};

const useEditMop = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) => {
      if (!!values?.mop_id) {
        return request
          .put(`/${values.mop_id}`, values.data, {
            headers: headers,
          })
          .then((res) => res)
          .catch((err) => {
            if (err.response.status === 403) {
              localStorage.clear();
            } else return err;
          });
      } else {
        return request
          .post(`/`, values.data, {
            headers: headers,
          })
          .then((res) => res)
          .catch((err) => {
            if (err.response.status === 403) {
              localStorage.clear();
            } else return err;
          });
      }
    },

    {
      onSuccess: () => queryClient.invalidateQueries("mops"),
    }
  );
};

const useCreateMop = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .post(`/`, values.data, {
          headers: headers,
        })
        .then((res) => res)
        .catch((err) => {
          if (err.response.status === 403) {
            localStorage.clear();
          } else return err;
        }),

    {
      onSuccess: () => queryClient.invalidateQueries("mops"),
    }
  );
};

export { useGetMops, useEditMop, useCreateMop };
