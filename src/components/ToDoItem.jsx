import React from 'react';
import { Button, Checkbox } from 'antd';
import { FaTrash } from 'react-icons/fa';

export const ToDoItem = (props) => {
    const { item, onCheck, onRemove } = props;
    const check = () => {
        onCheck(item.id);
    }
    const remove = () => {
        onRemove(item.id);
    }

    return (
        <li className="todo-item" key={item.id}>
            <div className="todo-item-body">
            <Checkbox style={ item.checked ? {'color': 'grey', 'text-decoration': 'line-through'} : {}} className="title" checked={item.checked} onChange={check}>
                {item.name} 
            </Checkbox>
            <p style={ item.checked ? {'color': 'grey', 'text-decoration': 'line-through'} : {}}>{item.date}</p>
            <p style={ item.checked ? {'color': 'grey', 'text-decoration': 'line-through'} : {}} className="description">{item.description}</p>
            </div>
            <Button className="remove-button" onClick={remove}><FaTrash/></Button>
        </li>
    )
}