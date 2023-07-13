import React, {useCallback} from 'react';
import './App.css';
import {CardStudents} from './components/cardStudents/cardStudents';
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {addCardAC} from './components/state/card-reducer';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./components/state/store";


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
export let avatar1 = 'https://pm1.aminoapps.com/6889/74979d4d2744ec6e27995b6e866f091d04c0b40cr1-515-414v2_uhq.jpg'

const  App=()=> {
    console.log('App')
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
