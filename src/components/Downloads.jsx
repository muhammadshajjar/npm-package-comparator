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
  };
  return <Line {...config} />;
};

export default Downloads;
