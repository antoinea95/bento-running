import { z } from "zod"

export type fetchResult<DataType> = {
    data: DataType | null,
    error: string | null
}

// athlete profile
export const StravaProfileSchema = z.object({
    username: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    bio: z.string().nullable(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    country: z.string().nullable(),
    profile_medium: z.string()
})

export type StravaProfileType = z.infer<typeof StravaProfileSchema >;

const statSchema = z.object({
    count: z.number(),
    distance: z.number(),
    moving_time: z.number(),
    elevation_gain: z.number()
})

// athlete stats
export const StravaStatSchema = z.object({
    recent_run_totals: statSchema,
    all_run_totals: statSchema,
    ytd_run_totals: statSchema
})

export type StatType = z.infer<typeof statSchema >
export type StravaStatType = z.infer<typeof StravaStatSchema>;


// activities
export const StravaActivitieSchema = z.object({
    id: z.number(),
    name: z.string(),
    distance: z.number(),
    moving_time: z.number(), 
    elapsed_time: z.number(),
    total_elevation_gain: z.number(),
    type: z.string(),
    sport_type: z.string(),
    start_date: z.string(),
    start_date_local: z.string(),
    timezone: z.string(),
    location_city: z.string().nullable(),
    location_state: z.string().nullable(),
    location_country: z.string().nullable(),
    map: z.object({
        id: z.string(),
        summary_polyline: z.string()
    }),
    average_speed: z.number(),
    max_speed: z.number(),
    has_heartrate: z.boolean(),
    average_heartrate: z.number().optional(),
    max_heartrate: z.number().optional(),
    elev_high: z.number().optional(),
    elev_low: z.number().optional()
})

export const StravaActivitiesSchema = z.array(StravaActivitieSchema);
export type StravaActivitieType = z.infer<typeof StravaActivitieSchema >;
export type StravaActivitiesType = StravaActivitieType[];

export type StravaTotal = {
    date: string,
    kilometers: number
}