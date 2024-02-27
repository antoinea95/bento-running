import { StravaActivitiesType, StravaProfileType, StravaStatType } from "../types/schema";

export const mockedActivities: StravaActivitiesType = [

    {
        id: 1,
        name: "Run",
        distance: 10000,
        moving_time: 3000,
        total_elevation_gain: 15,
        sport_type: "Run",
        start_date_local: "2024-01-05T10:30:00Z",
        map: {
            id: "a1",
            summary_polyline: "uxeiHs~~LmGsK_H_YuAeT_B{e@DyY~@kd@~DyRrIec@lJyh@tBiNtGiOyMeMwBfYgDrZqHba@aFfUaFhVgFv[K`e@|Crt@`Fdf@hJtWtFStC{EAyB"
        },
        average_speed: 3.3334,
        has_heartrate: true,
        average_cadence: 93,
        average_heartrate: 154
    },

    {
        id: 2,
        name: "Run",
        distance: 11000,
        moving_time: 3600,
        total_elevation_gain: 15,
        sport_type: "Run",
        start_date_local: "2024-01-10T15:30:00Z",
        map: {
            id: "a2",
            summary_polyline: "kjiiHcjzLrD~\tE`VnA`VzH`VuD~[fIlLfUtPxM|LhP|L|IfJ`S}[vE{ZToj@FsFuCaIgIiCcKsAuJmA{H}HiBbWm@jKxAxJhDlM`@|DuWqNmFcH{BqUeBoN{BqN{HwB{HwPeBqNJqNcGyC"
        },
        average_speed: 3.0555,
        has_heartrate: true,
        average_cadence: 87,
        average_heartrate: 164
    },

    {
        id: 3,
        name: "Run",
        distance: 8000,
        moving_time: 2500,
        total_elevation_gain: 15,
        sport_type: "Run",
        start_date_local: "2024-01-20T18:30:00Z",
        map: {
            id: "a3",
            summary_polyline: "o|fiHwp`MiX|BcQEkGl^}BrE_@s^yAgg@w@a]H}[bAuWrDjSbA`VjAlLtIvXrDzDbGvPxGgQ~G|ErCjK"
        },
        average_speed: 3.2,
        has_heartrate: true,
        average_cadence: 93,
        average_heartrate: 175
    },

    {
        id: 4,
        name: "Run",
        distance: 12500,
        moving_time: 4200,
        total_elevation_gain: 15,
        sport_type: "Run",
        start_date_local: "2024-01-25T15:30:00Z",
        map: {
            id: "a4",
            summary_polyline: "uxeiHs~~LmGsK_H_YuAeT_B{e@DyY~@kd@~DyRrIec@lJyh@tBiNtGiOyMeMwBfYgDrZqHba@aFfUaFhVgFv[K`e@|Crt@`Fdf@hJtWtFStC{EAyB"
        },
        average_speed: 2.9761,
        has_heartrate: true,
        average_cadence: 85,
        average_heartrate: 156
    },

    {
        id: 4,
        name: "Run",
        distance: 5000,
        moving_time: 1200,
        total_elevation_gain: 15,
        sport_type: "Run",
        start_date_local: "2024-02-01T09:23:00Z",
        map: {
            id: "a4",
            summary_polyline: "o|fiHwp`MiX|BcQEkGl^}BrE_@s^yAgg@w@a]H}[bAuWrDjSbA`VjAlLtIvXrDzDbGvPxGgQ~G|ErCjK"
        },
        average_speed: 4.1666,
        has_heartrate: true,
        average_cadence: 95,
        average_heartrate: 185
    },

]

export const mockedStat:StravaStatType = {
    all_run_totals: {
        distance: 47000,
        moving_time: 14500,
        count: 5,
        elevation_gain: 75
    }
}

export const mockedProfile:StravaProfileType = {
    username: null,
    firstname: "John",
    lastname: "Doe",
    bio: null,
    city: null,
    state: null,
    country: null,
    profile_medium: "/images/user-round.jpeg"
  }