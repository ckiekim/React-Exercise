import React, { Component } from 'react';
import Subject from './Components/Subject';
import TOC from './Components/TOC';
import Control from './Components/Control';
import ReadContent from './Components/ReadContent';
import CreateContent from './Components/CreateContent';
import UpdateContent from './Components/UpdateContent';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.max_content_id = 3;
		this.state = {
			mode: 'welcome',
			selected_content_id: 1,
			subject: {title:'WEB', sub:'World Wide Web!'},
			welcome: {title:'Welcome', desc:'Hello, React!!!'},
			contents: [
				{id:1, title:'HTML', desc:'HTML is HyperText ...'},
				{id:2, title:'CSS', desc:'CSS is Cascading ...'},
				{id:3, title:'JavaScript', desc:'JS is JavaScript ...'}
			]
		}
	}
	getItem() {
		for (const data of this.state.contents) {
			if (data.id === this.state.selected_content_id) {
				//console.log(data);
				return data;
			}
		}
	}
	getContent() {
		var _data, _title, _desc, _article;
		if (this.state.mode === 'welcome') {
			_title = this.state.welcome.title;
			_desc = this.state.welcome.desc;
			_article = <ReadContent title={_title} desc={_desc}></ReadContent>
		} else if (this.state.mode === 'read') {
			_data = this.getItem();
			_article = <ReadContent 
							title={_data.title} desc={_data.desc}
							onRead={function() {
								this.setState({
									selected_content_id: _data.id
								});
							}.bind(this)}
						></ReadContent>
		} else if (this.state.mode === 'create') {
			_article = <CreateContent onCreateItem={function(title, desc) {
				this.max_content_id++;
				let _contents = this.state.contents.concat(			// 복제해서 실행시켜야 성능 향상 가능
					{id:this.max_content_id, title:title, desc:desc}
				);
				this.setState({
					mode: 'read',
					selected_content_id: this.max_content_id,
					contents: _contents
				});
			}.bind(this)}></CreateContent>
		} else if (this.state.mode === 'update') {
			_data = this.getItem();
			_article = <UpdateContent data={_data} onUpdateItem={function(id, title, desc) {
				let _contents = Array.from(this.state.contents);	// 복제해서 실행시켜야 성능 향상 가능
				for (const item of _contents) {
					if (item.id === id) {
						item.title = title;
						item.desc = desc;
					}
				}
				this.setState({
					mode: 'read',
					selected_content_id: id,
					contents: _contents
				});
			}.bind(this)}></UpdateContent>
		}
		return _article;
	}
	render() {
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
				<Control 
					onChangeMode={function(_mode) {
						if (_mode === 'delete') {
							if (window.confirm('Confirm message')) {
								let _contents = Array.from(this.state.contents);
								let index = 0;
								for (const item of _contents) {
									if (item.id === this.state.selected_content_id) {
										_contents.splice(index, 1);
										break;
									}
									index++;
								}
								this.setState({
									mode: 'welcome',
									contents: _contents
								});
								alert('Deleted.')
							}
						} else {
							this.setState({mode: _mode});
						}
					}.bind(this)}
				></Control>
				<hr></hr>
				{this.getContent()}
			</div>
		);
	}
}

export default App;
