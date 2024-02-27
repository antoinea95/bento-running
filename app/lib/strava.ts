"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";
import { redirect } from "next/navigation";
import { StravaActivitiesSchema, StravaActivitiesType, StravaProfileSchema, StravaStatSchema } from "../types/schema";
import { getEpochTime } from "../utils/helpers";
import { resolve } from "path";
import { mockedActivities } from "../utils/mock";

const BASE_URL = "https://www.strava.com/api/v3";

const getStravaSession = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return session;
};

const fetchStravaData = async (endpoint: string, params?: any) => {
  const session = await getStravaSession();
  const accessToken = session.accessToken;

  try {
    let url = `${BASE_URL}/${endpoint}`;
    if (params) {
      const queryString = Object.keys(params)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
        )
        .join("&");
      url += `?${queryString}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    
    const rawData = await response.json();
    return rawData;
  } catch (error) {
    console.error("Error fetching Strava data:", error);
    throw error;
  }
};

export const fetchStravaProfile = async () => {
  try {
    const rawData = await fetchStravaData("athlete");
    const profile = StravaProfileSchema.parse(rawData);
    return profile;
  } catch (error) {
    throw error;
  }
};

export const fetchStravaStat = async () => {
  const session = await getStravaSession();
  const id = session.id;

  try {
    const rawData = await fetchStravaData(`athletes/${id}/stats`);
    const stats = StravaStatSchema.parse(rawData);
    return stats;
  } catch (error) {
    throw error;
  }
};

export const fetchStravaActivities = async (endpoint: string, params?: any) => {
  try {
    const rawData = await fetchStravaData(endpoint, params);
    const activities = StravaActivitiesSchema.parse(rawData);
    const runs = activities.filter((activity) => activity.sport_type === "Run" || activity.sport_type === "TrailRun");
    return runs;
  } catch (error) {
    throw error;
  }
};

export const fetchAllActivities = async () => {
  let page = 1;
  let allActivities: StravaActivitiesType = [];
  const { januaryFirstEpoch } = getEpochTime(new Date());

  try {
    while (true) {
      const data = await fetchStravaActivities("athlete/activities", {
        page: page,
        per_page: 200,
        after: januaryFirstEpoch,
      });

      if (data.length === 0 || !data) {
        break;
      }
      allActivities = [...allActivities, ...data];
      page++;
    }
    return allActivities;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des activités :",
      error
    );
    return [];
  }
};
