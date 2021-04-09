import React, { Component } from 'react'
import './index.css'

export default class Item extends Component {
	state = { mouse: false }//表示鼠标移入移出

	//处理鼠标移入移出
	handleMouse = (flag) => {
		return () => {
			this.setState({ mouse: flag })
		}
	}

	//勾选、取消勾选
	handleCheck = (id) => {
		return (event) => {
			this.props.updateTodo(id, event.target.checked)
		}
	}

	//删除的回调
	handleDelete = (id) => {
		if (window.confirm('请确定是否删除')) {    //此处一定要加上window
			this.props.deleteTodo(id)
		}
	}

	render() {
		const { id, name, done } = this.props
		const { mouse } = this.state
		return (
			<li style={{ backgroundColor: mouse ? '#ddd' : 'white' }} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
				<label>
					<input type="checkbox" checked={done} onChange={this.handleCheck(id)} />
					<span>{name}</span>
				</label>
				<div>
					<button onClick={() => this.handleDelete(id)} className="btn btn-danger">删除</button>
				</div>
				<div>
					<button>置顶</button>
				</div>

			</li>
		)
	}
}