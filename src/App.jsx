import axios from 'axios'
import React, { Component } from 'react'
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'
import './App.css'

export default class App extends Component {

	state = { todos: [] }

	componentDidMount() {
		axios.get("http://localhost:3001/")
			.then(res => {
				if(typeof res.data === "object") this.setState({ todos: res.data })
			})
			.catch(error => {
				console.error(error)
			})
	}

	//addTodo添加todo，接受todo对象
	addTodo = (todoObj) => {
		const { todos } = this.state
		const newTodos = [todoObj, ...todos]
		axios.put("http://localhost:3001/addTodo")
		this.setState({ todos: newTodos })
		
	}

	//用于单选一个todo
	updateTodo = (id, done) => {
		const { todos } = this.state
		//匹配处理数据
		const newTodos = todos.map((todoObj) => {
			if (todoObj.id === id) return { ...todoObj, done }
			else return todoObj
		})
		axios.put("http://localhost:3001/checkboxOfTodoItem", { "done": done })
		this.setState({ todos: newTodos })
		
	}

	//用于删除todo
	deleteTodo = (id) => {
		//获取原来的todos
		const { todos } = this.state
		//删除指定id的todo
		const newTodos = todos.filter((todoObj) => {
			return todoObj.id !== id
		})
		axios.put("http://localhost:3001/deleteTodo", { "id": id })
		this.setState({ todos: newTodos })
		
	}

	//用于全选
	checkAllTodo = (done) => {
		const { todos } = this.state
		const newTodos = todos.map((todoObj) => {
			return { ...todoObj, "done": done } //done:done可简写为done，将每个todo对象的done属性改为全选框传来的参数
		})
		axios.put("http://localhost:3001/checkAll", { "done": done })
		this.setState({ todos: newTodos })
		
	}

	//清除全部已完成的事项
	clearAllDone = () => {
		const { todos } = this.state
		todos.map((todoObj) => {
			if (todoObj.done) axios.put("http://localhost:3001/deleteTodo", { "id": todoObj.id })  //遍历时将每个todo的id传给删除函数作为参数
			return console.log(todoObj.id+ "todo clear")
		})
		const newTodos = todos.filter((todoObj) => {
			return !todoObj.done  //返回那些没做完的
		})
		this.setState({ todos: newTodos })
	}

	render() {
		const { todos } = this.state
		return (
			<div className="todo-container">
				<div className="todo-wrap">
					<Header addTodo={this.addTodo} />
					<List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
					<Footer todos={todos} checkAllTodo={this.checkAllTodo} clearAllDone={this.clearAllDone} />
				</div>
			</div>
		)
	}
}
