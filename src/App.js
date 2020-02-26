import React, { Component } from 'react';
import Subject from './Components/Subject';
import TOC from './Components/TOC';
import Content from './Components/Content';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: 'read',
			selected_content_id: 2,
			subject: {title:'WEB', sub:'World Wide Web!'},
			welcome: {title:'Welcome', desc:'Hello, React!!!'},
			contents: [
				{id:1, title:'HTML', desc:'HTML is HyperText ...'},
				{id:2, title:'CSS', desc:'CSS is Cascading ...'},
				{id:3, title:'JavaScript', desc:'JS is JavaScript ...'}
			]
		}
	}
	render() {
		var _title, _desc;
		if (this.state.mode === 'welcome') {
			_title = this.state.welcome.title;
			_desc = this.state.welcome.desc;
		} else {
			for (let i=0; i<this.state.contents.length; i++) {
				var data = this.state.contents[i];
				if (data.id === this.state.selected_content_id) {
					_title = data.title;
					_desc = data.desc;
					break;
				}
			}
		}
		return (
			<div className="App">
				<Subject 
					title={this.state.subject.title} 
					sub={this.state.subject.sub}
					onChangePage={function() {
						this.setState({mode: 'welcome'});
					}.bind(this)}
				></Subject>
				<br></br>
				<TOC
					onChangePage={function(id) {
						this.setState({
							mode: 'read',
							selected_content_id: parseInt(id)
						});
					}.bind(this)} 
					data={this.state.contents}
				></TOC>
				<br></br>
				<Content title={_title} desc={_desc}></Content>
			</div>
		);
	}
}

export default App;
