import { config } from "utils";

const configOptions = () => {
  if (typeof window === "undefined") return {};

  if (!window.localStorage.getItem(config.key.token)) return {};

  const accessToken = window.localStorage.getItem(config.key.token);

  if (!!accessToken) {
    return {
      "x-access-token": accessToken,
    };
  }
};

export const getUserID = () => {
  if (typeof window === "undefined") return {};

  if (!window.localStorage.getItem(config.key.userID)) return {};

  const userID = window.localStorage.getItem(config.key.userID);

  if (!!userID) {
    return userID;
  }
};

export const getHeaders = (accessToken) => {
  return {
    "x-access-token": accessToken,
  };
};

export default configOptions;
