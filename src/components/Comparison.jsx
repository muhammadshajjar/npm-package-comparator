import React from "react";
import "./Comparison.css";

const Comparison = ({ comparators }) => {
  const [firstPkg, secondPkg] = comparators;

  return (
    <div className="table-container">
      <table>
        <tr>
          <th>PackageName</th>
          <td style={{ backgroundColor: "lightgray" }}>
            {firstPkg?.name || "N/A"}
            <br />
            {firstPkg?.version || "N/A"}
          </td>
          <td style={{ backgroundColor: "lightgray" }}>
            {secondPkg?.name || "N/A"}
            <br />
            {secondPkg?.version || "N/A"}
          </td>
        </tr>
        <tr>
          <th>Description</th>
          <td>{firstPkg?.description || "N/A"}</td>
          <td>{secondPkg?.description || "N/A"}</td>
        </tr>
        <tr>
          <th>Keywords</th>
          <td>{firstPkg?.keywords?.join(",") || "N/A"}</td>
          <td>{secondPkg?.keywords?.join(",") || "N/A"}</td>
        </tr>
        <tr>
          <th>Repository</th>
          <td className="links">
            <div>
              <a href={firstPkg?.links?.homepage}>HomePage</a>
              <a href={firstPkg?.links?.bugs}>Bugs</a>
              <a href={firstPkg?.links?.repository}>Github</a>
            </div>
          </td>
          <td className="links">
            <div>
              <a href={secondPkg?.links?.homepage}>HomePage</a>
              <a href={secondPkg?.links?.bugs}>Bugs</a>
              <a href={secondPkg?.links?.repository}>Github</a>
            </div>
          </td>
        </tr>
        <tr>
          <th>License</th>
          <td>{firstPkg?.license || "N/A"}</td>
          <td>{secondPkg?.license || "N/A"}</td>
        </tr>
        <tr>
          <th>Authors/Publishers</th>
          <td>{firstPkg?.name || "N/A"}</td>
          <td>{secondPkg?.name || "N/A"}</td>
        </tr>
        <tr>
          <th>Authors</th>
          <td>{firstPkg?.author?.name || "N/A"}</td>
          <td>{secondPkg?.author?.name || "N/A"}</td>
        </tr>
        <tr>
          <th>Maintainers</th>
          <td>{firstPkg?.maintainers[0].email || "N/A"}</td>
          <td>{secondPkg?.maintainers[0].email || "N/A"}</td>
        </tr>
      </table>
    </div>
  );
};

export default Comparison;
