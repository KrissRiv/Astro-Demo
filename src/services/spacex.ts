import { type Doc, type APISpaceXResponse } from "../types/api";

const fetchSpaceXService = async (
  id: string = "",
): Promise<Doc | APISpaceXResponse> => {
  if (id.length) {
    const res = await fetch(`https://api.spacexdata.com/v5/launches/${id}`);
    return (await res.json()) as Doc;
  } else {
    const res = await fetch("https://api.spacexdata.com/v5/launches/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: {},
        options: {
          sort: {
            date_unix: "asc",
          },
          limit: 12,
        },
      }),
    });
    return (await res.json()) as APISpaceXResponse;
  }
};

export const getSpaceXLaunchById = async ({ id }: { id: string }): Promise<Doc> => {
  const launch = await fetchSpaceXService(id) as Doc;
  return launch;
};

export const getSpaceXLaunches = async () => {
  const res = await fetch("https://api.spacexdata.com/v5/launches/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: {},
      options: {
        sort: {
          date_unix: "asc",
        },
        limit: 12,
      },
    }),
  });
  const { docs: launches } = await fetchSpaceXService();

  return launches;
};
