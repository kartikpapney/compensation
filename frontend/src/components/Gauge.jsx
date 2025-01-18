'use client';

import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

const GaugeLayout = ({ min, max, value }) => {
  return (
    <div className="h-[250px] w-auto">
      <Gauge
        value={value}
        startAngle={-110}
        endAngle={110}
        sx={{
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 40,
            transform: 'translate(0px, 0px)',
          },
        }}
        text={({ value, valueMax }) => `${value} / ${valueMax}`}
      />
    </div>
  );
};

export default GaugeLayout;
