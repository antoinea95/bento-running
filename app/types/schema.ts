import { z } from "zod"

// athlete profile
export const StravaProfileSchema = z.object({
    username: z.string().nullable(),
    firstname: z.string(),
    lastname: z.string(),
    bio: z.string().nullable(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    country: z.string().nullable(),
    profile_medium: z.string(),
})

export type StravaProfileType = z.infer<typeof StravaProfileSchema >;


// stats schema
const statSchema = z.object({
    count: z.number(),
    distance: z.number(),
    moving_time: z.number(),
    elevation_gain: z.number()
})

export const StravaStatSchema = z.object({
    all_run_totals: statSchema,
})

export type StatType = z.infer<typeof statSchema >
export type StravaStatType = z.infer<typeof StravaStatSchema>;


// activities
export const StravaActivitieSchema = z.object({
    id: z.number(),
    name: z.string(),
    distance: z.number(),
    moving_time: z.number(), 
    total_elevation_gain: z.number(),
    sport_type: z.string(),
    start_date_local: z.string(),
    map: z.object({
        id: z.string(),
        summary_polyline: z.string()
    }),
    average_cadence: z.number().optional(),
    average_speed: z.number(),
    has_heartrate: z.boolean(),
    average_heartrate: z.number().optional(),
})

export const StravaActivitiesSchema = z.array(StravaActivitieSchema);
export type StravaActivitieType = z.infer<typeof StravaActivitieSchema >;
export type StravaActivitiesType = StravaActivitieType[];

export type StravaTotal = {
    date: string,
    kilometers: number
}