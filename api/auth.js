import axios from "axios";
import { useMutation } from "react-query";

import configOptions from "./config";

import { config } from "utils";

const request = axios.create({
  baseURL: "https://fortedges-api.herokuapp.com",
});

const useSignUp = () => {
  return useMutation((values) =>
    request.post("/auth/signup", values).then((res) => res.data)
  );
};

const useLogIn = () => {
  return useMutation((values) =>
    request.post("/auth/login", values).then((res) => res.data)
  );
};

export { useSignUp, useLogIn };
