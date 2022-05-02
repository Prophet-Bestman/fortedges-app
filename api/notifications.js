import axios from "axios";
import { useMutation, useQueryClient, useQuery } from "react-query";
import configOptions, { getUserID } from "./config";

const request = axios.create({
  baseURL: "https://fortedges-api.herokuapp.com/notifications",
});

const useGetNotifications = (page, limit) => {
  const headers = configOptions();
  return useQuery(["notifications", page, limit], () =>
    request
      .get(`?page=${page || 1}&limit=${limit || 10}`, {
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

// const useReadNotifications = (page, limit) => {
//   const headers = configOptions();
//   return useQuery(["notifications", page, limit], () =>
//     request
//       .put(
//         `/`,
//         {},
//         {
//           headers: headers,
//         }
//       )
//       .then((res) => res)
//       .catch((err) => {
//         if (err.response.status === 403) {
//           localStorage.clear();
//           return err;
//         } else return err;
//       })
//   );
// };

const useReadNotifications = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    () =>
      request
        .put(
          `/`,
          {},
          {
            headers: headers,
          }
        )
        .then((res) => res),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("notifications");
      },
    }
  );
};

export { useGetNotifications, useReadNotifications };
