import React, { Component } from 'react';

class Inputbox extends Component {

    render() {
        return <input className="todo-app__input" placeholder="add a todo" onKeyDown={this.props.onKeyDown} />;
    }
}
 
export default Inputbox;