import React, { useState, useEffect } from "react";
import "./styles.css";
import ReactFlow, {
  removeElements,
  updateEdge,
  addEdge,
  Background,
  Controls,
} from "react-flow-renderer";

import { nodeTypes } from "./Nodes";

const ReactFlowRenderer = () => {
  const [toggle, setToggle] = useState(false);

  const [elements, setElements] = useState([]);

  const [name, setName] = useState("");
  const [activeNode, setActiveNode] = useState();
  const [newName, setNewName] = useState("");
  const [instance, setInstance] = useState();

  useEffect(() => {
    if (activeNode) setNewName(activeNode.data.label);
  }, [activeNode]);

  const elementRemoveHandler = (elementTobeRemoved) => {
    setElements((prev) => removeElements(elementTobeRemoved, prev));
  };

  const connectHandler = (params) => {
    setElements((prev) => addEdge(params, prev));
  };

  const addCircleHandler = () => {
    const newNode = {
      id: `${Date.now()}`,
      data: { label: `${name}` },
      type: "circle",
      position: {
        x: 0,
        y: 0,
      },
    };
    newNode.data = { ...newNode.data, id: `${newNode.id}` };

    setElements((prev) => {
      return [...prev, newNode];
    });
    setName("");
  };

  const addRectangleHandler = () => {
    const newNode = {
      id: `${Date.now()}`,
      data: { label: `${name}` },
      type: "rectangle",
      position: {
        x: 0,
        y: 0,
      },
    };
    newNode.data = { ...newNode.data, id: `${newNode.id}` };

    setElements((prev) => {
      return [...prev, newNode];
    });
    setName("");
  };

  const edgeUpdateHandler = (oldEdge, newConnection) =>
    setElements((els) => updateEdge(oldEdge, newConnection, els));

  const clickHandler = (e) => {
    var htmlString = e.target.outerHTML.toString();
    var index = htmlString.indexOf(` id="`);
    index += 5;
    const currentId = htmlString.substr(index, 13);

    elements.forEach((_current) => {
      if (_current.id === currentId) {
        setActiveNode(_current);
      }
    });
    // setNewName(activeNode.data.label)
  };

  const updateNodeHandler = () => {
    if (!activeNode) return;
    setElements(
      elements.map((_current) => {
        if (_current.id === activeNode.id) {
          return {
            ..._current,
            data: { label: newName, id: _current.data.id },
          };
        }

        return _current;
      })
    );
  };

  const deleteNodeHandler = () => {
    if (!activeNode) return;
    setElements(
      elements.map((_current) => {
        if (_current.id === activeNode.id) {
          return {
            ..._current,
            data: { label: newName, id: _current.data.id },
          };
        }

        return _current;
      })
    );
  };

  const onLoad = (reactFlowInstance) => {
    setInstance(reactFlowInstance);
    reactFlowInstance.fitView();
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <ReactFlow
        elements={elements}
        onElementsRemove={elementRemoveHandler}
        onConnect={connectHandler}
        deleteKeyCode={"Backspace"}
        onEdgeUpdate={edgeUpdateHandler}
        nodeTypes={nodeTypes}
        snapToGrid={true}
        snapGrid={[16, 16]}
        connectionLineStyle={{ stroke: "black", strokeWidth: 2 }}
        onDoubleClick={clickHandler}
        onLoad={onLoad}
        onNodeMouseEnter={(event, node) =>
          console.log({ name: "onNodeMouseEnter", event, node })
        }
        onNodeMouseLeave={(event, node) =>
          console.log({ name: "onNodeMouseLeave", event, node })
        }
      >
        <Background gap={15} size={2} color="#f6f9fe" />

        <Controls />
      </ReactFlow>

      <div
        style={{
          display: "flex",
          position: "absolute",
          top: "50px",
          left: "30px",
          zIndex: "100",
        }}
      >
        <div>
          <button
            type="button"
            style={{
              background: "#4a86e8",
              color: "white",
              border: "none",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "5px",
              width: "100%",
            }}
            onClick={() => setToggle(!toggle)}
          >
            Create Node
          </button>
          {toggle && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter new node"
                style={{ padding: "5px" }}
              />
              <button
                type="button"
                style={{
                  background: "#4a86e8",
                  color: "white",
                  border: "none",
                  padding: "10px",
                  borderRadius: "5px",
                }}
                onClick={addRectangleHandler}
              >
                Create Rectangle
              </button>

              <button
                type="button"
                style={{
                  background: "#4a86e8",
                  color: "white",
                  border: "none",
                  padding: "10px",
                  borderRadius: "5px",
                }}
                onClick={addCircleHandler}
              >
                Create Circle
              </button>

              <div>
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  type="text"
                  placeholder="Update your node"
                  style={{ padding: "5px" }}
                />
              </div>
              <button
                type="button"
                style={{
                  background: "#4a86e8",
                  color: "white",
                  border: "none",
                  padding: "10px",
                  borderRadius: "5px",
                }}
                onClick={updateNodeHandler}
              >
                Update
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReactFlowRenderer;
