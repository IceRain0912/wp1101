import React, { Component } from 'react';
class Todolist extends React.Component {
    state = {
        check : 1
    }

    handleOnChange = (e) => {
        if(e.target.checked === true)
        {
            this.setState({check : 0}); 
            this.props.onPlus();
        }
        else
        {
            this.setState({check : 1});
            this.props.onMinus();
        }
    }

    render() { 
        const style = [{textDecoration: "line-through", opacity: 0.5}, {textDecoration: "none", opacity: 1}]
        return <li class="todo-app__item">
        <div class="todo-app__checkbox">
        <input type="checkbox" id={this.props.listID} onChange={this.handleOnChange}/>
        <label htmlFor={this.props.listID}></label>
        </div>
    <h1 class="todo-app__item-detail" style = {style[this.state.check]}>{this.props.detail}</h1>
    <img src= "x.png" class="todo-app__item-x" alt="" /*onClick={this.props.onDelete}*/ />
    </li>
    }
}
 
export default Todolist;