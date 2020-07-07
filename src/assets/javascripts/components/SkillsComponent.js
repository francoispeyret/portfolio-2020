import React from "react";
import Skill from "@/assets/javascripts/classes/skill";
import Space from "@/assets/javascripts/classes/space";

class App extends React.Component {

    state = {
        sort: 'grid',
        loading: false
    }

    constructor() {
        super();

        this.timing = 750;

        this.handleClickSortGrid   = this.handleClickSortGrid.bind(this);
        this.handleClickSortList   = this.handleClickSortList.bind(this);
        this.handleLoading         = this.handleLoading.bind(this);
    }

    handleClickSortGrid() {
        if(this.state.sort==='grid')
            return;
        this.setState({
            loading: true
        });
        let _ = this;
        setTimeout(function(){
            _.setState({
                sort: 'grid'
            });
            _.handleLoading();
        },this.timing);
    }

    handleClickSortList() {
        if(this.state.sort==='list')
            return;

        this.setState({
            loading: true
        });
        let _ = this;
        setTimeout(function(){
            _.setState({
                sort: 'list'
            });
            _.handleLoading();
        },this.timing);
    }

    handleLoading() {
        let _ = this;
        setTimeout(function(){
            _.setState({
                loading: false
            });
        },this.timing);
    }

    render() {
        const elements = [
            {el: 'skill', name: 'Sass', color: '#a53364'},
            {el: 'Space', value: 3},
            {el: 'skill', name: 'Svg', color: '#87a533'},
            {el: 'skill', name: 'Html5', color: '#afafaf'},
            {el: 'skill', name: 'Javascript ES6', color: '#807d00'},
            {el: 'Space', value: 1},
            {el: 'skill', name: 'Php', color: '#4F5B93'},
            {el: 'skill', name: 'Webpack', color: '#004280'},
            {el: 'skill', name: 'React', color: '#3997b1'},
            {el: 'skill', name: 'Unreal Engine', color: '#111'},
            {el: 'skill', name: 'Adobe', color: '#c00606'},
            {el: 'skill', name: 'Prestashop', color: '#7c1b4c'},
            {el: 'skill', name: 'Cypress.io', color: '#04c38e'},
            {el: 'skill', name: 'Shopify', color: '#07ad23'},
            {el: 'skill', name: 'Git / Gitflow', color: '#222'},
            {el: 'skill', name: 'Canvas', color: '#b3af00'},
        ];
        let items = [];
        let i = 1;
        for(let [index, el] of elements.entries()) {
            if(el.el === 'skill') {
                items.push(
                    <Skill
                        key={index}
                        i={i}
                        name={el.name}
                        sort={this.state.sort}
                        color={el.color}
                        w={String(i*2+Math.random()).slice(0, 5)}
                    />
                );
                i++;
            }
            if(el.el === 'Space' && this.state.sort === 'grid') {
                items.push(
                    <Space
                        key={index}
                        value={el.value}
                    />
                );
            }
        }
        return (
            <div className={(this.state.loading ? "loading": "")}>
                <div className="sort">
                    <div className={(this.state.sort == 'grid' ? "active" : "") + " grid"}
                         onClick={this.handleClickSortGrid}>
                        <div className="carret"></div>
                        <div className="carret"></div>
                        <div className="carret"></div>
                        <div className="carret"></div>
                    </div>
                    <div className={(this.state.sort == 'list' ? "active" : "") + " list"}
                         onClick={this.handleClickSortList}>
                        <div className="tiret"></div>
                        <div className="tiret"></div>
                        <div className="tiret"></div>
                    </div>
                </div>
                <ul className={this.state.sort}>
                    {items}
                </ul>
            </div>
        );
    }
}

export default App;
