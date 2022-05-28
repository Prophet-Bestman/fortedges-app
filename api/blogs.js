import { createClient } from "contentful";
import { useQuery } from "react-query";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_API_ACCESS_TOKEN,
});

export const useGetInvestmentBlogs = () => {
  return useQuery("investment-blogs", () =>
    client
      .getEntries({
        content_type: "fortEdgesBlogs",
        "fields.category": "Investment",
      })
      .then((res) => res)
  );
};

export const useGetMoneyLifeBlogs = () => {
  return useQuery("money-life-blogs", () =>
    client
      .getEntries({
        content_type: "fortEdgesBlogs",
        "fields.category": "Money Life",
      })
      .then((res) => res)
  );
};

export const useGetMarketsBlogs = () => {
  return useQuery("markets-blogs", () =>
    client
      .getEntries({
        content_type: "fortEdgesBlogs",
        "fields.category": "Markets",
      })
      .then((res) => res)
  );
};

export const useGetMostPopularBlogs = () => {
  return useQuery("most-popular-blogs", () =>
    client
      .getEntries({
        content_type: "fortEdgesBlogs",
        "fields.category": "Most Popular",
      })
      .then((res) => res)
  );
};

export const useGetRecentBlogs = () => {
  return useQuery("recent-blogs", () =>
    client
      .getEntries({
        content_type: "fortEdgesBlogs",
        // "fields.category": "Recent",
      })
      .then((res) => res)
  );
};
