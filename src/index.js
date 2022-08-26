import React from "react";
import ReactDOM from "react-dom";
import MaxEditor from "./maxEditor"

import EditablePage from "./editablePage";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <h1 className="Logo">demo-notion</h1>
    <p className="Intro">
      <span role="img" aria-label="greetings" className="Emoji">
        👋
      </span>{" "}
      请输入<span className="Code">/</span> 看看效果
    </p>
    <EditablePage />
    <MaxEditor></MaxEditor>
  </React.StrictMode>,
  rootElement
);
