// import data from './data.json';
import React from 'react';
import Task from './task.js';

class TaskList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true, 
            Data: [],
            filteredData: [],
        };
    }
    async componentDidMount() {
    const response = await fetch('http://localhost:3000/api/get')
    if (response.ok) {
        const data = await response.json();
        console.log(data)
        this.setState({Data: data, filteredData: data});
    }
    } 
    async handleClick(i) {
        await fetch('http://localhost:3000/api/complete', {
            method: 'POST', 
            headers: {'Content-type': 'application/json; charset=UTF-8'}, 
            body: JSON.stringify({
                '_id': i
            })
        })
        this.componentDidMount();
    }
    async Add(item) {
        await fetch('http://localhost:3000/api/post', {
            method: 'POST', 
            body: JSON.stringify({
                "id": this.state.Data.length+1,
                "task": item,
                "complete": false
            }), 
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
             }
        })
        this.componentDidMount();
        document.getElementById('add').value = "";
        // var newItem = {
        //     "id": this.state.Data.length+1,
        //     "task": item,
        //     "complete": false
        // }
        // this.setState({Data: this.state.Data.concat(newItem)}, 
        // ()=>{
        //     console.log("data=>", this.state.Data);
        //     this.Search();
        // });
    }
    async handleDelete(i){
        await fetch('http://localhost:3000/api/delete', {
            method: 'POST', 
            headers: {'Content-type': 'application/json; charset=UTF-8'}, 
            body: JSON.stringify({
                '_id': i
            })
        })
        this.componentDidMount()
    }
    SearchCheck(task) {
        return task.task.toLowerCase().includes(document.getElementById('search').value.toLowerCase());
    }
    Search() {
        var newData = this.state.Data.filter(this.SearchCheck);
        this.setState({filteredData: newData});
        console.log("search Data=>", newData);
    }
    render() {
        return (<div>
            <div id = "AddItem">
                <input placeholder='Add Item' type='text' id='add'></input>
                <button onClick={()=>{this.Add(document.getElementById('add').value)}}>Add</button>
            </div>
            <div id = "searchBar">
                <input 
                placeholder='search' 
                type='text' id='search' 
                onInput={()=>{this.Search()}}>
                </input>
            </div>
            <div>
                {this.state.filteredData.map(task => {
                    return(
                        <div><Task 
                        key = {task._id} 
                        data = {task}
                        onClick = {(i)=> this.handleClick(i)}
                        onDelete = {(i)=> this.handleDelete(i)}
                        /><br/>
                        </div>
                    );
                })}
            </div>
        </div>);
    }
}

export default TaskList;