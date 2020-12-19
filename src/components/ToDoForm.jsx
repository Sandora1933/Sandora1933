import React from 'react';
import { Form, Input, Button } from 'antd';

const { Item } = Form;

export const ToDoForm = (props) => {
    const {onSubmit, onRemoveAll} = props;
    const finish = (values) => {
        onSubmit(values.title, values.description);
    }
    const removeAll = () => {
        onRemoveAll();
    }

    return (
        <Form className={'todo-form'} layout = {'inline'} onFinish={finish}>
            <Item name={'title'}>
                <Input placeholder="Title"/>
            </Item>
            <Item name={'description'}>
                <Input placeholder="Description"/>
            </Item>
            <Item>
                <Button htmlType={'submit'}>Add</Button>
            </Item>
            <Item>
                <Button onClick={removeAll}>Remove all</Button>
            </Item>
        </Form>
    )
}