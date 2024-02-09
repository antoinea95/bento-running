import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { StravaActivitieType, StravaActivitiesSchema, StravaActivitiesType, fetchResult } from "../types/schema";
import { redirect } from "next/navigation";
import { ZodSchema } from "zod";
import { getEpochTime } from "../utils/helpers";
import { unstable_noStore } from "next/cache";


export const getStravaSession = async () => {
  
  const session = await getServerSession(authOptions);

  if(!session) {
    redirect("/")
  }

  return session;

}

export const fetchStravaApi = async <DataType>(url: string, zodSchema: ZodSchema, method: string = "GET") => {

  unstable_noStore();

  const results:fetchResult<DataType> = {
    data: null,
    error: null
  }

  const session = await getStravaSession();
  const accessToken = session.accessToken;

    try {

        await new Promise((resolve) => setTimeout(resolve, 3000))
        const response = await fetch(url, {
        method: method, 
        headers: {
          Accept: 'application/json, text/plain, */*',
		      'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
      })
      console.log('Data fetch completed after 3 seconds.')

      
      const rawData = await response.json();
      results.data = zodSchema.parse(rawData);

    } catch (error) {
        if(error instanceof Error) results.error = error.message
        results.error = String(error);
    }
    return results
}

export const fetchActivities = async (params: number | null ) => {
  try {

    const activitiesResult = await fetchStravaApi<StravaActivitiesType>(`https://www.strava.com/api/v3/athlete/activities?per_page=200${params ? `&after=${params}` : ""}`, StravaActivitiesSchema);

    if (activitiesResult.error) {
      throw new Error(activitiesResult.error);
    }

    if (!activitiesResult.data) {
      throw new Error("No activities found");
    }

    const runActivities = activitiesResult.data.filter((activity: StravaActivitieType) => activity.type === "Run");

    return runActivities;
  } catch (error) {
    console.error("Une erreur s'est produite lors de la récupération des activités :", error);
    return [];
  }
}

export const fetchAllActivities = async () => {
  unstable_noStore();

  let allActivities: StravaActivitieType[] = [];
  let page = 1;
  let perPage = 30;
  const {januaryFirstEpoch} = getEpochTime(new Date());

  try {
    while (true) {
      const activitiesResult = await fetchStravaApi<StravaActivitiesType>(
        `https://www.strava.com/api/v3/athlete/activities?after=${januaryFirstEpoch}&per_page=${perPage}&page=${page}`,
        StravaActivitiesSchema
      );

      if (activitiesResult.error) {
        throw new Error(activitiesResult.error);
      }

      if (!activitiesResult.data || activitiesResult.data.length === 0) {
        break;
      }

      allActivities = allActivities.concat(
        activitiesResult.data.filter((activity: StravaActivitieType) => activity.type === "Run")
      );

      // Passer à la page suivante
      page++;
    }

    return allActivities;
  } catch (error) {
    console.error("Une erreur s'est produite lors de la récupération des activités :", error);
    return [];
  }
};