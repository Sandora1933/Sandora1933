import React, {useEffect, useState} from 'react';
import { Card, Checkbox, Button, Divider } from 'antd';
import { ToDoItem } from './ToDoItem';
import { ToDoForm } from './ToDoForm';
import axios from 'axios';

//Declaring token from todoist.com/prefs/integrations
const myToken = 'a38ac3087226eeb2fc515288f1311ca0f74672c6';
const config = {
    headers: { Authorization: `Bearer ${myToken}` }
  };

export const ToDo = () => {
    const [todos, setTodos] = useState([
        {id: 1, name: 'Todo 1', description: 'Here is Todo 1\'s description',
         date: new Date().toLocaleString().slice(0,17).replace(/\//g,'.').replace(/,/g, ' -'), checked: false},
        {id: 2, name: 'Todo 2', description: 'Here is Todo 2\'s description',
         date: new Date().toLocaleString().slice(0,17).replace(/\//g,'.').replace(/,/g, ' -'),  checked: false}
    ]);

    //Using side-effect hook from React to perform asynchronious receive of todoist state 
    useEffect(async () => {
        const res = await axios.get(`https://api.todoist.com/rest/v1/tasks`, config);
    });

    const [ids, setIds] = useState(10);

    const onCheck = (id) => {
        const index = todos.findIndex(todo => todo.id === id);
        const todo = todos[index];

        todo.checked = !todo.checked;

        //Using AxiousJs library we are performing http request [POST] for task close 
        axios.post(`https://api.todoist.com/rest/v1/tasks/${id}/close`, todo, config);

        setTodos([...todos]);
    }

    const countUnchecked = () => {
        let index = todos.length - 1;
        let count = 0;
        while (index != -1) {
            if (!todos[index].checked) {
                count++;
            }
            index--;
        }
        return count;
    }

    //Function of deleting task by id
    const onDelete = (id) => {
        const index = todos.findIndex(todo => todo.id === id);

        //If not out of bounds -> make axiuos [DELETE] http request
        if (index !== -1){
            axios.delete(`https://api/todoist.com/rest/v1/tasks/${id}`, config);
        }

        alert(`Task : ${id} was deleted`);
    }

    const onRemove = (id) => {
        const index = todos.findIndex(todo => todo.id === id);
        
        //Calling function for delete
        onDelete(id);

        todos.splice(index, 1);
        setTodos([...todos]);
    }

    const onRemoveAll = () => {
        while(todos.length != 0) {
            onRemove(0);
        }
    }
    
    const onSubmit = (name, description) => {
        if (name == null || description == null){
            alert("Fill both Name and Description fields");
        }
        else if (name.length < 3 || description.length < 3){
            alert("Length of Name and Description should be more than 2");
        }
        else if (name[0] != name[0].toUpperCase()){
            alert("Title should begin with Capital letter");
        }
        else{
            const todo = {
                id: ids,
                name,
                description,
                checked: false,
                date: new Date().toLocaleString().slice(0,17).replace(/\//g,'.').replace(/,/g, ' -')
            };

            setTodos([...todos, todo]);
            setIds(ids + 1);
        }

    }

    const renderItems = (todos) => {
        return (
            <ul className={'todo-list'}>
                { todos.map(todo => {
                    return <ToDoItem item={todo} onCheck={onCheck} onRemove={onRemove}/>
                })}
            </ul>
        )
    }

    return (
        <Card title={'Items unchecked: ' + countUnchecked()}>
            <ToDoForm onSubmit={onSubmit} onRemoveAll={onRemoveAll}/>
            {
               renderItems(todos)
            }
        </Card>
    )
}