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
        return (
            <li
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                style={{
                cursor:'help',
                backgroundColor: this.state.hover ? this.props.color : 'transparent'
            }}>
                <div className="id">
                    {this.props.i}
                </div>
                <div className="ref">
                    {this.props.name.slice(0, 2)}
                </div>
                <div className="name">
                    <div className="left">
                        {this.props.name}
                    </div>
                    <div className="right">
                        {String(this.props.i*2+Math.random()).slice(0, 5)}
                    </div>
                </div>
            </li>
        );
    }
}

export default Skill;
