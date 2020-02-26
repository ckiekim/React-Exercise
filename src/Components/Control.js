import React, { Component } from 'react';

class Control extends Component {
	render() {
		return (
			<div>
				<button type="button" onClick={function(e) {
					e.preventDefault();
					this.props.onChangeMode('create');
				}.bind(this)}>create</button>&nbsp;&nbsp;
				<button type="button" onClick={function(e) {
					e.preventDefault();
					this.props.onChangeMode('update');
				}.bind(this)}>update</button>&nbsp;&nbsp;
				<button type="button" value="delete" onClick={function(e) {
					e.preventDefault();
					this.props.onChangeMode('delete');
				}.bind(this)}>delete</button>
			</div>
		);
	}
}

export default Control;