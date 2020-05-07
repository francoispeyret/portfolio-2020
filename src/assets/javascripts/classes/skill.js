import React from "react";

class Skill extends React.Component {
    state = {
        hover: false
    }

    constructor() {
        super();
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleMouseEnter() {
        this.setState({
            hover: true
        })
    }
    handleMouseLeave() {
        this.setState({
            hover: false
        })
    }

    render() {
        const name =
            this.props.sort === 'grid' ?
                this.props.name.slice(0, 2) :
                this.props.name;
        return (
            <li
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                style={{
                backgroundColor: this.state.hover ? this.props.color : 'transparent'
            }}>
                <div className="id">
                    {this.props.i}
                </div>
                <div className="ref">
                    {name}
                </div>
                <div className="name">
                    <div className="left">
                        {this.props.name}
                    </div>
                    <div className="right">
                        {this.props.w}
                    </div>
                </div>
            </li>
        );
    }
}

export default Skill;
