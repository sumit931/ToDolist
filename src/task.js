import React from 'react';
import './task.css';
class task extends React.Component{
    render(){
        return (
            <div className = "task">
                <div>
                    <button 
                    className = {(this.props.data.complete)?"cbox":"ucbox"} 
                    onClick = {()=>{
                        this.props.onClick(this.props.data._id)
                    }}></button>
                </div>
                <div
                className = {(this.props.data.complete)?"ctext":"uctext"}>
                    {this.props.data.task}
                </div>
                <div>
                    <button  
                    onClick = {()=>{
                        this.props.onDelete(this.props.data._id)
                    }}>X</button>
                </div>
            </div>
        );
    }
}

export default task;