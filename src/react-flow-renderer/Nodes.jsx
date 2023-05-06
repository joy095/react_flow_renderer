import React from "react";
import { Handle } from "react-flow-renderer";

const RectangleNode = ({ data }) => {
  return (
    <div
      style={{
        background: "#8a94fc",
        padding: "14px",
        borderRadius: "5px",
      }}
    >
      <Handle
        type="target"
        position="top"
        id={`${data.id}.top`}
        style={{ borderRadius: 0 }}
      />
      <div id={data.id}>{data.label}</div>
      <Handle
        type="source"
        position="bottom"
        id={`${data.id}.bottom`}
        style={{ borderRadius: 0 }}
      />
    </div>
  );
};

const CircleNode = ({ data }) => {
  return (
    <div
      style={{
        backgroundColor: "#8a94fc",
        padding: "14px",
        borderRadius: "50px",
      }}
    >
      <Handle
        type="target"
        position="top"
        id={`${data.id}.top`}
        style={{ borderRadius: 0 }}
      />
      <div id={data.id}>{data.label}</div>
      <Handle
        type="source"
        position="bottom"
        id={`${data.id}.bottom`}
        style={{ borderRadius: 0 }}
      />
    </div>
  );
};

export const nodeTypes = {
  rectangle: RectangleNode,
  circle: CircleNode,
};
