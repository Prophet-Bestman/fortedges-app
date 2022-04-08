import { config } from "utils";

const configOptions = () => {
  if (typeof window === "undefined") return {};

  if (!window.localStorage.getItem(config.key.token)) return {};

  const accessToken = window.localStorage.getItem(config.key.token);

  if (!!accessToken) {
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  }
};

export default configOptions;
