import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { fetchResult } from "../types/schema";
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
        if(error instanceof Error) results.error = error.message
        results.error = String(error);
    }
    return results
}