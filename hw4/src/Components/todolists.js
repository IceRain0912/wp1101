import React, { Component } from 'react';
import Inputbox from './inputbox';
import Todolist from './todolist';

class Todolists extends Component {

    render() { 
        console.log(this.props.random_id)
        if(this.props.inputValue.length > 0)
        {
            let listID = 0;
            return <ul class="todo-app__list" id="todo-list">
            {this.props.inputValue.map((p) => <Todolist detail = {p} listID = {listID++} onDelete = {this.props.onDelete} onPlus = {this.props.onPlus} onMinus = {this.props.onMinus}/>)}

            </ul>
        }
        else
            return null;
    }
}
 
export default Todolists;