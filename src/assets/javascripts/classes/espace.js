import React from "react";

class Espace extends React.Component {

    render() {
        return (
            <li style={{
                flex: '0 0 '+(this.props.value*160+(this.props.value-1)*20)+'px',
                maxWidth: (this.props.value*160+(this.props.value-1)*20)+'px',
                border: 0
            }} />
        );
    }
}

export default Espace;
