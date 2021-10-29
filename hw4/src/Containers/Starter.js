import React, { Component } from 'react';
import Inputbox from '../Components/inputbox';
import Todolists from '../Components/todolists';
import Footer from '../Components/footer';
import '../styles.css';

class Starter extends Component {
  constructor(props){
    super(props);
    this.state = {
      inputValue : [],
      random_id: 0,
      counter : 0,
      completed: 0
    }
  }

  handleKeyDown = (e) => {
      if(e.key === "Enter" && e.target.value !== ""){
          this.setState({inputValue: [...this.state.inputValue, e.target.value]});
          this.setState({random_id: this.state.random_id + 1});
          this.setState({counter: this.state.counter + 1});
          e.target.value = "";
      }
  }

  handleDelete = (listId) => {
      if(this.state.counter > 0)
      {
        const inputValue = this.state.inputValue.filter(c => {return c.id !== listId})
        this.setState({counter: this.state.counter - 1});
      }
  }

  handleIncrement = () => {
    this.setState({completed: this.state.completed + 1});
  }

  handleMinus = () => {
    this.setState({completed: this.state.completed - 1});
  }



  render(){
    return (
      <div id="root" class="todo-app__root">
        <header class="todo-app__header">
          <h1 class="todo-app__title">todos</h1>
        </header>
        <section class="todo-app__main">
          <Inputbox onKeyDown={this.handleKeyDown}/>    
          <Todolists inputValue = {this.state.inputValue} random_id = {this.state.random_id} counter = {this.state.counter} onDelete = {this.handleDelete} completed = {this.state.completed} onPlus = {this.handleIncrement} onMinus = {this.handleMinus}/>
        </section>
        <Footer inputValue = {this.state.inputValue} counter = {this.state.counter} completed = {this.state.completed}/>
      </div>
    );
  }
}

export default Starter;
