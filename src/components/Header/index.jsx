import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'
import './index.css'

export default class Header extends Component {
	//对接受的Props进行类型，必要性的限制
	static propTypes = {
		addTodo: PropTypes.func.isRequired
	}

	//键盘事件的回调
	handleKeyUp = (event) => {
		const { keyCode, target } = event
		if (keyCode !== 13) return      //13代表按下了回车（检测的是回车弹起）
		if (target.value.trim() === '') {
			alert('输入内容不能为空')
			return
		}
		const todoObj = { id: nanoid(), name: target.value, done: false }
		this.props.addTodo(todoObj)
		target.value = ''
	}

	render() {
		return (
			<div className="todo-header">
				<input onKeyUp={this.handleKeyUp} type="text" placeholder="请输入你的Todo项，敲击回车键确认" />
			</div>
		)
	}
}