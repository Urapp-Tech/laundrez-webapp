import React from "react";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';


export default function CircularProgress({ color, img, value, width = "2.2rem" }) {

    return (<div style={{ width: width }} >
        <CircularProgressbarWithChildren
            value={value}
            background={true}
            styles={buildStyles({
                pathColor: color,
                backgroundColor: "#fff"
            })}

        >
            <img alt={"img"}
                src={require(`../../../_metronic/layout/assets/layout-svg-icons/${img}`)}
            />
        </CircularProgressbarWithChildren>
    </div>)
}