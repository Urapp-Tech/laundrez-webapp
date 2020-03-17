import React from "react";
import { CircularProgressbarWithChildren,buildStyles } from 'react-circular-progressbar';


export default function CircularProgress({ color, img, value }) {

    return (<div style={{ width: "2.2rem" }} >
        <CircularProgressbarWithChildren
            value={value}
            background={true}
            styles={buildStyles({
                pathColor: color,
                backgroundColor:"#fff"
              })}

        >
            <img alt={"img"}
                src={require(`../../../_metronic/layout/assets/layout-svg-icons/${img}`)}
            />
        </CircularProgressbarWithChildren>
    </div>)
}