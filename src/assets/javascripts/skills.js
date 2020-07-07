import React from "react";
import ReactDOM from "react-dom";
import loadable from '@loadable/component'

const App = loadable(() => import('./components/SkillsComponent'));

const rootElement = document.getElementById("skill-root");
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    rootElement
);
