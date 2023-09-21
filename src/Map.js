import * as React from "react";
import { WorldMap } from "react-svg-worldmap";

export function Map({ exchangeData }) {
  const data = [
    { country: "cn", value: 1389618778 }, // china
    { country: "in", value: 1311559204 }, // india
    { country: "us", value: 331883986 }, // united states
    { country: "id", value: 264935824 }, // indonesia
    { country: "pk", value: 210797836 }, // pakistan
    { country: "br", value: 210301591 }, // brazil
    { country: "ng", value: 208679114 }, // nigeria
    { country: "bd", value: 161062905 }, // bangladesh
    { country: "ru", value: 141944641 }, // russia
    { country: "mx", value: 127318112 }, // mexico
  ];

  // const mapping = {'USD': 'us'}

  const setLineColour = () => {
    const startValue = data[0].rate
    const endValue = data[data.length - 1].rate
    if(startValue >= endValue) {
      return 'red'
    } else {
      return 'green'
    }
  }

  return (
    <div className="map">
      <WorldMap
        color="green"
        value-suffix="people"
        size="xxl"
        data={data}
      />
    </div>
  );
}
