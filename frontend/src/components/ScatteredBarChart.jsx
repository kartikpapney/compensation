'use client';

import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import Stack from '@mui/material/Stack';

export default function CustomScatteredBarChart({ dataset }) {
  return (
    <Stack direction="column" spacing={1} sx={{ width: '100%', maxWidth: 600 }}>
      <BarChart
        series={[
          {
            dataKey: 'high',
            label: 'Highest',
            layout: 'vertical',
            stack: 'stack',
          },
          {
            dataKey: 'low',
            label: 'Lowest',
            layout: 'vertical',
            stack: 'stack',
          },
        ]}
        dataset={dataset}
        height={300}
        sx={{
          [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
            transform: 'translateX(-10px)',
          },
        }}
        slotProps={{
          legend: {
            direction: 'row',
            position: { vertical: 'bottom', horizontal: 'middle' },
            padding: -5,
          },
        }}
        xAxis={[{ scaleType: 'band', dataKey: 'order' }]}
      />
    </Stack>
  );
}
