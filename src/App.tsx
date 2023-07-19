import React, {useCallback} from 'react';
import './App.css';
import {CardStudents} from './components/cardStudents/cardStudents';
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {addCardAC} from './components/state/card-reducer';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./components/state/store";
import avatarka from './components/3-2e7445062f6dbcbde00cb3deee691548.jpg'


export type CardStudentsType = {
    id: string
    avatar: string
    name: string
}
export type CommentsType = {
    id: string
    sms: string
    likes: boolean
}
export type CommentsStateType = {
    [key: string]: CommentsType[]
}
export let avatar1 = avatarka

const  App=()=> {
    let cardStudents = useSelector<AppRootStateType, CardStudentsType[]>(state => state.card)
    let dispatch = useDispatch()
    const addCard = useCallback((name: string) => {
        const action = addCardAC(name)
        dispatch(action)
    },[dispatch]);

    const mapTodolist = cardStudents.map(el => {
        return <CardStudents
            key={el.id}
            cardId={el.id}
            name={el.name}
            avatar={el.avatar}
        />
    })
    return (
        <div className='all_wrapp'>
            <AddItemForm addText={addCard} name={'+'} textPlaceholder={'Add card'}/>
            <div className='todolist'>{mapTodolist}</div>
        </div>
    )
}

export default App;
