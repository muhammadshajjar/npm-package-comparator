import React from "react";
import { Col, Row, Divider, Typography } from "antd";

import "./Recommender.css";

const Recommender = ({ recommendation }) => {
  console.log(recommendation);

  const { recommended, timesBetter } = recommendation;
  return (
    <>
      <p className="results">
        {recommended.name} is {timesBetter} times better.
      </p>

      <div className="results-description">
        <Row justify="center" align="middle" gutter={[16, 16]}>
          <Col sm={24} md={12}>
            <h3 className="description-title">
              <span>Recommended: </span>
              {recommended.name}
            </h3>
            <p>{recommended.description}</p>
            <p>
              Visit this link for more information
              <a href={recommended.links.homepage}> Home Page</a>
            </p>
          </Col>
          <Col sm={24} md={12}>
            <Row justify="space-around" gutter={[16, 16]}>
              <Col className="cards" xs={24} sm={7}>
                <h3>Downloads</h3>
                <p>{Math.trunc(recommended.downloadsCount)}+</p>
              </Col>
              <Col className="cards" xs={24} sm={7}>
                <h3>Stars</h3>
                <p>{recommended.starsCount}+</p>
              </Col>
              <Col className="cards" xs={24} sm={7}>
                <h3>Health</h3>
                <p>{recommended.health * 100}%</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider orientation="left">Languages</Divider>
        <Typography.Text keyboard>Javascript</Typography.Text>
        <Typography.Text keyboard>TypeScript</Typography.Text>
        <Divider />
      </div>
    </>
  );
};

export default Recommender;
