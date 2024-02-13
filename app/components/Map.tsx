"use client"

import React, { useEffect, useState } from "react";
import polyline from "@mapbox/polyline";
import { LatLngExpression, LatLngTuple } from "leaflet";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { StravaActivitiesType } from "../types/schema";


export default function Map({ sumPolyline}: { sumPolyline: string}) {
    const [center, setCenter] = useState<LatLngExpression | undefined>(undefined);


    useEffect(() => {
        const polylinePoints = polyline.decode(sumPolyline);

        // Calculate bounds to get center
        const bounds = polylinePoints.reduce(
            (acc: { minLat: number, maxLat: number, minLng: number, maxLng: number }, point: LatLngTuple) => {
                return {
                    minLat: Math.min(acc.minLat, point[0]),
                    maxLat: Math.max(acc.maxLat, point[0]),
                    minLng: Math.min(acc.minLng, point[1]),
                    maxLng: Math.max(acc.maxLng, point[1])
                };
            },
            {
                minLat: Number.MAX_VALUE,
                maxLat: Number.MIN_VALUE,
                minLng: Number.MAX_VALUE,
                maxLng: Number.MIN_VALUE
            }
        );

        const calculatedCenter: LatLngExpression = [
            (bounds.minLat + bounds.maxLat) / 2,
            (bounds.minLng + bounds.maxLng) / 2
        ];

        setCenter(calculatedCenter);
    }, [sumPolyline]);

    const options = { color: '#fc4c01' };

    if (!center) {
        return <div>Loading...</div>;
    }

    return (
        <MapContainer center={center} zoom={12} className="map" style={{width:"150px", height:"150px"}} zoomControl={false}>
            <TileLayer
                attribution="Google Maps"
                url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
            />
            <Polyline positions={polyline.decode(sumPolyline)} pathOptions={options} />
        </MapContainer>
    );
}
