import React, { useState } from "react";
import { AutoComplete, Button, Input, Tag } from "antd";
import debounce from "lodash.debounce";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Row, Alert } from "antd";
import { motion } from "framer-motion";
const Search = ({ onComparePackage }) => {
  const [packageSuggestions, setPackageSuggestions] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const fetchSearchPackages = async (query) => {
    if (query) {
      try {
        const response = await axios.get(
          `https://api.npms.io/v2/search/suggestions?q=${query}`
        );
        const transformedSuggestions = [];

        response.data.forEach((element) => {
          transformedSuggestions.push({ value: element.package.name });
        });

        console.log(transformedSuggestions);

        setPackageSuggestions(transformedSuggestions);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
    setIsShown(true);
  };

  const handleInputChange = (query) => {
    fetchSearchPackages(query);
  };

  const debounceInput = debounce(handleInputChange, 500);

  const onSelect = (value) => {
    if (selectedPackages.length == 2) {
      setShowAlert(true);
      return;
    }
    setShowAlert(false);
    setSelectedPackages((prev) => {
      return [...prev, { name: value, id: uuidv4() }];
    });
  };

  const removeTagHandler = (id) => {
    const newTags = [...selectedPackages].filter((item) => item.id !== id);
    setSelectedPackages(newTags);
  };

  const packageCompareHandler = () => {
    const transformSelectedPkgs = selectedPackages.map((pkg) => pkg.name);
    onComparePackage(transformSelectedPkgs);
  };

  return (
    <Row justify="center" align="middle">
      <AutoComplete
        style={{
          width: 400,
        }}
        options={packageSuggestions}
        onSelect={onSelect}
        onSearch={debounceInput}
        notFoundContent="Not Found!"
        placeholder="Enter Package Name"
        open={isShown}
        onBlur={() => setIsShown(false)}
      ></AutoComplete>
      <motion.div whileHover={{ scale: 1.1 }}>
        <Button type="primary" onClick={packageCompareHandler}>
          Compare
        </Button>
      </motion.div>
      {selectedPackages.map((pkg) => (
        <Tag
          key={pkg.id}
          bordered={false}
          closable
          onClose={removeTagHandler.bind(this, pkg.id)}
        >
          {pkg.name}
        </Tag>
      ))}
      {showAlert && (
        <Alert
          message="Warning"
          description="You can Select only two packages for Comparison"
          type="warning"
          showIcon
          closable
          onClose={() => setShowAlert(false)}
          style={{ position: "absolute", bottom: "50px", right: "50px" }}
        />
      )}
    </Row>
  );
};
export default Search;
