import React from "react";
import ReactDOM from "react-dom";

import Skill from './classes/skill';
import Espace from './classes/espace';

class App extends React.Component {
    state = {

    }


    render() {
        return (
            <div>
                <ul>
                    <Skill i={1} name={"Sass"} color={"#a53364"} />
                    <Espace value={3} />
                    <Skill i={2} name={"Svg"} color={"#87a533"} />
                    <Skill i={3} name={"Html5"} color={"#afafaf"} />
                    <Skill i={4} name={"Javascript ES6"} color={"#807d00"} />
                    <Espace value={1} />
                    <Skill i={5} name={"Php"} color={"#4F5B93"} />
                    <Skill i={6} name={"Webpack"} color={"#004280"} />
                    <Skill i={7} name={"React"} color={"#3997b1"} />
                    <Skill i={8} name={"Unreal Engine"} color={"#111"} />
                    <Skill i={9} name={"Adobe"} color={"#c00606"} />
                    <Skill i={10} name={"Prestashop"} color={"#7c1b4c"} />
                    <Skill i={11} name={"Cypress.io"} color={"#04c38e"} />
                    <Skill i={12} name={"Shopify"} color={"#07ad23"} />
                    <Skill i={13} name={"Git / Gitflow"} color={"#222"} />
                    <Skill i={14} name={"Canvas"} color={"#b3af00"} />
                </ul>
            </div>
        );
    }
}

const rootElement = document.getElementById("skill-root");
ReactDOM.render(
    <React.StrictMode>
    <App />
    </React.StrictMode>,
    rootElement
);
