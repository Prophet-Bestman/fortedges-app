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

export const getUserFromLocalStorage = () => {
  if (typeof window === "undefined") return {};

  if (!window.localStorage.getItem(config.key.user)) return {};

  const user = window.localStorage.getItem(config.key.user);

  if (!!user) {
    return JSON.parse(user);
  }
};
export const getLocalWallet = () => {
  if (typeof window === "undefined") return {};

  if (!window.localStorage.getItem(config.key.wallet)) return {};

  const wallet = window.localStorage.getItem(config.key.wallet);

  if (!!wallet) {
    return JSON.parse(wallet);
  }
};
export const getParentPlanID = () => {
  if (typeof window === "undefined") return {};

  if (!window.localStorage.getItem(config.key.parentID)) return {};

  const parentID = window.localStorage.getItem(config.key.parentID);

  if (!!parentID) {
    return parentID;
  }
};
export const saveParentPlanId = (id) => {
  if (typeof window === "undefined") return {};

  // if (!window.localStorage.setItem(config.key.wallet)) return {};

  window.localStorage.getItem(config.key.parentID, id);

  // if (!!wallet) {
  //   return JSON.parse(wallet);
  // }
};

export const getHeaders = (accessToken) => {
  return {
    "x-access-token": accessToken,
  };
};

export default configOptions;
