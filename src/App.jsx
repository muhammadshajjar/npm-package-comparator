import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import Search from "./components/Search";
import Comparison from "./components/Comparison";
import Recommender from "./components/Recommender";
import { Alert } from "antd";
import { animate, motion } from "framer-motion";

import {
  transformApiResponse,
  extractAllDownloads,
  recommendPackage,
} from "./helper/transformatioAndCalculations";
import Downloads from "./components/Downloads";

const App = () => {
  const [comparators, setComparators] = useState([]);
  const [recommendation, setRecommendation] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const onComparePackagesHandler = async (selectedPackages) => {
    if (selectedPackages.length < 2) {
      setShowAlert(true);
      return;
    }
    setShowAlert(false);
    const url = "https://api.npms.io/v2/package/mget";

    try {
      const response = await axios.post(url, selectedPackages, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      let transformedComaparators = [];

      const firstPkg = selectedPackages[0];
      const secondPkg = selectedPackages[1];

      transformedComaparators.push(
        transformApiResponse(response.data[firstPkg])
      );
      transformedComaparators.push(
        transformApiResponse(response.data[secondPkg])
      );

      transformedComaparators.push({
        downloadsData: extractAllDownloads(transformedComaparators),
      });

      setRecommendation(
        recommendPackage(transformedComaparators[0], transformedComaparators[1])
      );

      setComparators(transformedComaparators);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="container">
      <h1>NPM Package Comparator</h1>
      <Search onComparePackage={onComparePackagesHandler} />
      {comparators.length > 0 && (
        <>
          <Comparison comparators={comparators} />
          <motion.div
            initial={{ opacity: 0, x: -1000 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "tween" }}
          >
            <h2>Downloads</h2>
            <Downloads comparators={comparators} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -1000 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "tween", delay: 5 }}
          >
            <h2>Recommendation</h2>
            <Recommender recommendation={recommendation} />
          </motion.div>
        </>
      )}
      {showAlert && (
        <Alert
          message="You Have to select minimum 2 packages for Comparison"
          type="warning"
          showIcon
          closable
          style={{ position: "absolute", top: "50px", right: "50px" }}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
};

export default App;
