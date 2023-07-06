import React, {useReducer, useState} from 'react';
import './App.css';
import {CardStudents} from './components/cardStudents/cardStudents';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {EditableMode} from "./components/EditableMode/EditableMode";
import {addCardAC, cardReducer, changeCardTitleAC, removeCardAC} from './components/state/card-reducer';
import {
    addCommentsAC, changeCommentsTextAC,
    commentChangeLikesAC,
    commentsReducer,
    removeCommentsAC
} from './components/state/comments-reducer';


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
const Card1 = v1()
const Card2 = v1()
const Card3 = v1()

function App() {

    const [cardStudents, dispatchCardStudents] = useReducer(cardReducer,[
        {id: Card1, avatar: avatar1, name: 'Danil Fedorkin'},
        {id: Card2, avatar: avatar1, name: 'Denis Motorkin'},
        {id: Card3, avatar: avatar1, name: 'Evgeniy Kotorkin'},

    ])
    const [comments, dispatchComments] = useReducer(commentsReducer,{
        [Card1]: [
            {id: v1(), sms: '20 лет', likes: true},
            {id: v1(), sms: 'Не женат', likes: false},
            {id: v1(), sms: 'Работаю в IT', likes: true},
        ],
        [Card2]: [
            {id: v1(), sms: '30 лет', likes: true},
            {id: v1(), sms: 'Не женат', likes: false},
            {id: v1(), sms: 'Работаю в IT', likes: true},
            {id: v1(), sms: 'Люблю рисовать', likes: false},
        ],
        [Card3]: [
            {id: v1(), sms: '40 лет', likes: true},
            {id: v1(), sms: 'Женат и 3 детей', likes: false},
            {id: v1(), sms: 'ищу работу в IT', likes: true},
            {id: v1(), sms: 'Люблю рыбалку', likes: false},
            {id: v1(), sms: 'Езжу в отпус', likes: true},
        ],

    })
    const removeComments = (comId: string, cardId: string) => {
        // setComments({...comments, [cardId]: comments[cardId].filter(el => el.id !== comId)})
        dispatchComments(removeCommentsAC(comId,cardId))
    }
    const addComments = (smsText: string, cardId: string) => {
        dispatchComments(addCommentsAC(smsText,cardId))
    }
    const commentChangeLikes = (comId: string, check: boolean, cardId: string) => {
        dispatchComments(commentChangeLikesAC(comId, check, cardId))
    }
    const changeCommentsText=(cardId:string,comId:string,text:string)=>{
        dispatchComments(changeCommentsTextAC(cardId,comId,text))
    }
    const addCard = (name: string) => {
        const action = addCardAC(name)
        dispatchCardStudents(action)
        dispatchComments(action)
    }
    const removeCard = (cardId: string) => {
        const action = removeCardAC(cardId)
        dispatchCardStudents(action)
        dispatchComments(action)
    }
    const changeCardTitle = (cardId: string, nameStudents: string) => {
        return dispatchCardStudents(changeCardTitleAC(cardId,nameStudents))
    }
    const mapTodolist = cardStudents.map(el => {
        return <CardStudents
            key={el.id}
            cardStudents={cardStudents}
            comments={comments}
            cardId={el.id}
            name={el.name}
            avatar={el.avatar}
            removeComments={removeComments}
            addComments={addComments}
            commentChangeLikes={commentChangeLikes}
            changeCardTitle={changeCardTitle}
            removeCard={removeCard}
            changeCommentsText={changeCommentsText}
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
