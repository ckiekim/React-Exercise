import React, { Component } from 'react';

class TOC extends Component {
    shouldComponentUpdate(newProps, newState) {
        if (this.props.data === newProps.data) {
            return false;
        }
        return true;
    }
    render() {
        let lists = [];
        for (const data of this.props.data) {
            lists.push(
                <li key={data.id}>
                <a 
                    href={"/content/"+data.id}
                    data-id={data.id}
                    onClick={function(e) {
                        e.preventDefault();
                        this.props.onChangePage(e.target.dataset.id);                            
                    }.bind(this)}
                >{data.title}</a>
                </li>
            );
        }
        return (
            <nav>
                <ul>
                    {lists}
                </ul>
            </nav>
        );
    }
}

export default TOC;