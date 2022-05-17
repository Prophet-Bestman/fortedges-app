import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import configOptions from "./config";

const request = axios.create({
  baseURL: "https://fortedges-api.herokuapp.com",
});

const useGetAllPlans = () => {
  return useQuery("plans", () =>
    request
      .get("/plans")
      .then((res) => res.data)
      .catch((err) => {
        if (err.response.status === 403) {
          localStorage.clear();
        } else return err;
      })
  );
};

const useGetCustomPlans = () => {
  const headers = configOptions();
  return useQuery(`custom-plans?limit=1000`, () =>
    request
      .get("/custom-plans", { headers: headers })
      .then((res) => res.data)
      .catch((err) => {
        if (err.response.status === 403) {
          localStorage.clear();
        } else return err;
      })
  );
};

const useGetSingleCustomPlan = (plan_id) => {
  const headers = configOptions();
  return useQuery(["custom-plan", plan_id], () =>
    request
      .get(`/custom-plans/${plan_id}`, { headers: headers })
      .then((res) => res.data)
      .catch((err) => {
        if (err.response.status === 403) {
          localStorage.clear();
        } else return err;
      })
  );
};

export const useEditCustomPlan = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .put(`/custom-plans/${values?.plan_id}`, values.data, {
          headers: headers,
        })
        .then((res) => res)
        .catch((err) => {
          if (err.response.status === 403) {
            localStorage.clear();
          } else return err;
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("custom-plans");
        queryClient.invalidateQueries("custom-plan");
        queryClient.invalidateQueries("admin-user");
        queryClient.invalidateQueries("admin-custom-plans");
      },
    }
  );
};

const useCreateCustomPlan = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .post(
          `/custom-plans${
            values.user_id !== undefined ? `?owner=${values.user_id}` : ""
          }`,
          values.data,
          {
            headers: headers,
          }
        )
        .then((res) => res)
        .catch((err) => {
          if (err.response.status === 403) {
            localStorage.clear();
          } else return err;
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("custom-plans");
        queryClient.invalidateQueries("admin-user");
        queryClient.invalidateQueries("admin-custom-plans");
      },
    }
  );
};

const useAdminGetCustomPlans = (user_id) => {
  const headers = configOptions();
  return useQuery(["admin-custom-plans", user_id], () =>
    request
      .get(`/custom-plans?owner=${user_id}&limit=1000`, { headers: headers })
      .then((res) => res.data)
      .catch((err) => {
        if (err.response.status === 403) {
          localStorage.clear();
        } else return err;
      })
  );
};

const useDeletPlan = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (plan_id) =>
      request
        .delete(`/custom-plans/${plan_id}`, { headers: headers })
        .then((res) => res)
        .catch((err) => {
          if (err.response.status === 403) {
            localStorage.clear();
          } else return err;
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("custom-plans");
        queryClient.invalidateQueries("admin-user");
        queryClient.invalidateQueries("admin-custom-plans");
      },
    }
  );
};

const useRequestStatement = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .post(`/account-statement`, values, {
          headers: headers,
        })
        .then((res) => res)
        .catch((err) => {
          if (err.response.status === 403) {
            localStorage.clear();
          } else return err;
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("custom-plans");
        queryClient.invalidateQueries("admin-user");
        queryClient.invalidateQueries("admin-custom-plans");
      },
    }
  );
};

export {
  useGetAllPlans,
  useCreateCustomPlan,
  useGetCustomPlans,
  useGetSingleCustomPlan,
  useAdminGetCustomPlans,
  useDeletPlan,
  useRequestStatement,
};
