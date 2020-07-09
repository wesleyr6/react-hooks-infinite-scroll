import React from "react";
import ReactDOM from "react-dom";
import Routers from "./routers";
import * as serviceWorker from "./serviceWorker";
import "./assets/styles/index.sass";

// EXTERNAL CSS
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-datepicker/dist/react-datepicker.css";

ReactDOM.render(<Routers />, document.getElementById("root"));
serviceWorker.register();
