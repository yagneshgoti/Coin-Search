import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SparklineChart = ({ data ,color}) => {
  // Convert the data array to an array of objects with 'value' and 'index' properties
  const chartData = data.map((value, index) => ({ value: parseFloat(value), index }));

  return (
    <ResponsiveContainer width="70%" height={300}>
      <LineChart data={chartData} margin={{ top: 10, right: 50, left: 50, bottom: 0 }} >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="index" />
        <YAxis />
        <Tooltip content={<CustomTooltip color={color} />} />
        <Line type="monotone" dataKey="value" stroke={color} />
      </LineChart>
    </ResponsiveContainer>
  );
};

const CustomTooltip = ({ active, payload, label,color }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          {/* <p className="tooltip-label">{`Index ${label}`}</p> */}
          <p className="tooltip-value" style={{color:color}}>{`Value: ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

export default SparklineChart;
