import { StatType } from "@/app/types/schema";

export default function DataCard({data, title} : {data: StatType, title: string}) {

    const handleConversion = (numberToConvert:number, division:number) => {
        const conversion = numberToConvert / division;
        return conversion.toFixed(2);
    }

    return (
        <section className="data-card">
            <h3 className="data-card_title">{title}</h3>
            <div className="data-card_category">
                <h4 className="data-card_category_title">Activities</h4>
                <p className="data-card_category_content">{data.count} runs</p>
            </div>
            <div className="data-card_category">
                <h4 className="data-card_category_title">Distance</h4>
                <p className="data-card_category_content">{handleConversion(data.distance, 1000)} km</p>
            </div>
            <div className="data-card_category">
                <h4 className="data-card_category_title">Time</h4>
                <p className="data-card_category_content">{handleConversion(data.moving_time, 3600)} hours</p>
            </div>
            <div className="data-card_category">
                <h4 className="data-card_category_title">Elevation</h4>
                <p className="data-card_category_content">{Math.round(data.elevation_gain)} m</p>
            </div>
        </section>
    )
}