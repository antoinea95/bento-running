import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { StravaActivitieType, StravaActivitiesSchema, StravaActivitiesType, fetchResult } from "../types/schema";
import { redirect } from "next/navigation";
import { ZodSchema } from "zod";


export const getStravaSession = async () => {
  
  const session = await getServerSession(authOptions);

  if(!session) {
    redirect("/")
  }

  return session;

}

export const fetchStravaApi = async <DataType>(url: string, zodSchema: ZodSchema, method: string = "GET") => {

  console.log(url)
  const results:fetchResult<DataType> = {
    data: null,
    error: null
  }

  const session = await getStravaSession();
  const accessToken = session.accessToken;

    try {
        const response = await fetch(url, {
        method: method, 
        headers: {
          Accept: 'application/json, text/plain, */*',
		      'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
      })

      
      const rawData = await response.json();
      results.data = zodSchema.parse(rawData);

    } catch (error) {
      console.log(error);
        if(error instanceof Error) results.error = error.message
        results.error = String(error);
    }
    return results
}

export const useFetchActivities = async (params: number | null ) => {
  try {
    // Appel de la fonction fetchStravaApi pour récupérer les activités Strava
    const activitiesResult = await fetchStravaApi<StravaActivitiesType>(`https://www.strava.com/api/v3/athlete/activities?per_page=200${params ? `&after=${params}` : ""}`, StravaActivitiesSchema);

    if (activitiesResult.error) {
      throw new Error(activitiesResult.error);
    }

    if (!activitiesResult.data) {
      throw new Error("Les données d'activités sont null");
    }
    const runActivities = activitiesResult.data.filter((activity: StravaActivitieType) => activity.type === "Run");

    return runActivities;
  } catch (error) {
    console.error("Une erreur s'est produite lors de la récupération des activités :", error);
    return [];
  }
}