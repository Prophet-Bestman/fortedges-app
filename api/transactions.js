import axios from "axios";
import { baseUrl } from "api/baseUrls";
import { useMutation, useQuery, useQueryClient } from "react-query";
import configOptions from "./config";

const request = axios.create({
  baseURL: baseUrl + "/transactions",
});

const useDeposit = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .post("", values, { headers: headers })
        .then((res) => res.data)
        .catch((err) => {
          if (err.response.status === 403) {
            localStorage.clear();
          } else return err;
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("my-transactions");
        queryClient.invalidateQueries("custom-plans");
      },
    }
  );
};

const useBankRequest = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .post("/bank", values, { headers: headers })
        .then((res) => res.data)
        .catch((err) => {
          if (err.response.status === 403) {
            localStorage.clear();
          } else return err;
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("my-transactions");
        queryClient.invalidateQueries("custom-plans");
      },
    }
  );
};

const useSendPOP = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .put(`/${values.id}`, values.pop, { headers: headers })
        .then((res) => res.data)
        .catch((err) => {
          if (err.response.status === 403) {
            localStorage.clear();
          } else return err;
        }),

    {
      onSuccess: () => {
        queryClient.invalidateQueries("my-transactions");
        queryClient.invalidateQueries("custom-plans");
      },
    }
  );
};

const useWithdraw = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .post(`/withdraw?code=${values.code}`, values.data, {
          headers: headers,
        })
        .then((res) => res.data)
        .catch((err) => {
          if (err.response.status === 403) {
            localStorage.clear();
          } else return err;
        }),

    {
      onSuccess: () => queryClient.invalidateQueries("my-transactions"),
    }
  );
};
const useAdminWithdraw = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .post(`/admin-withdraw`, values, {
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
        queryClient.invalidateQueries("admin-user");
        queryClient.invalidateQueries("admin-custom-plans");
      },
    }
  );
};

const useAdminDeposit = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .post(`/add-deposit`, values, {
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
        queryClient.invalidateQueries("admin-user");
        queryClient.invalidateQueries("admin-custom-plans");
      },
    }
  );
};

const useGetAllMyTransactions = (plan, page, limit, user) => {
  const headers = configOptions();
  return useQuery(["my-transactions", plan, page, limit, user], () =>
    request
      .get(
        `?plan=${plan || ""}&page=${page || 1}&limit=${limit || 10}&user=${
          user || ""
        }`,
        {
          headers: headers,
        }
      )
      .then((res) => res.data)
      .catch((err) => {
        if (err.response.status === 403) {
          localStorage.clear();
        } else return err;
      })
  );
};

const useConfirmTransaction = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .put(
          `/${values}/confirm`,
          {},
          {
            headers: headers,
          }
        )
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("my-transactions");
        queryClient.invalidateQueries("admin-user");
        queryClient.invalidateQueries("admin-custom-plans");
      },
    }
  );
};

const useDeclineTransaction = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .put(
          `/${values}/decline`,
          {},
          {
            headers: headers,
          }
        )
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("my-transactions");
        queryClient.invalidateQueries("admin-user");
        queryClient.invalidateQueries("admin-custom-plans");
      },
    }
  );
};

const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .delete(`/${values}`, {
          headers: headers,
        })
        .then((res) => res),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("my-transactions");
        queryClient.invalidateQueries("admin-user");
        queryClient.invalidateQueries("admin-custom-plans");
      },
    }
  );
};
const useAdminAddBonus = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .post(`/add-promo`, values, {
          headers: headers,
        })
        .then((res) => res),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("admin-user");
        queryClient.invalidateQueries("admin-custom-plans");
      },
    }
  );
};

const useAdminAddBalance = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .post(`/add-balance`, values, {
          headers: headers,
        })
        .then((res) => res),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("admin-user");
        queryClient.invalidateQueries("admin-custom-plans");
      },
    }
  );
};

export {
  useDeposit,
  useBankRequest,
  useSendPOP,
  useGetAllMyTransactions,
  useWithdraw,
  useConfirmTransaction,
  useDeclineTransaction,
  useDeleteTransaction,
  useAdminWithdraw,
  useAdminDeposit,
  useAdminAddBonus,
  useAdminAddBalance,
};
