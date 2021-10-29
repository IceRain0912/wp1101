import React, { Component } from 'react';

class Footer extends Component {

    render() { 
        if(this.props.inputValue.length > 0)
        {
            return <footer class="todo-app__footer" id="todo-footer">
            <div class="todo-app__total">{this.props.counter - this.props.completed} left</div>
            <ul class="todo-app__view-buttons">
                <button id="all">All</button>
                <button id="active">Active</button>
                <button id="completed">Completed</button>
            </ul>
            <div class="todo-app__clean">
                <button>Clear Completed</button>
            </div>
            </footer>
        }
        else
        {
            return null;
        }
    }
}
 
export default Footer;