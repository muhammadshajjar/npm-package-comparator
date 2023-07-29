import React, { useEffect, useState } from "react";

import { Line } from "@ant-design/charts";

const Downloads = ({ comparators }) => {
  const data = comparators[2]?.downloadsData || [];

  const config = {
    data,
    xField: "from",
    yField: "count",
    seriesField: "name",
    yAxis: {},
    legend: {
      position: "top",
    },
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
  };
  return <Line {...config} />;
};

export default Downloads;
