import React, {useState} from 'react';
import './App.css';
import {CardStudents} from './components/cardStudents/cardStudents';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";


export type CardStudentsType = {
    id:string
    avatar:string
    name:string
}
export type CommentsType  = {
    id:string
    sms:string
    likes:boolean
}
export type CommentsStateType = {
    [key:string]:CommentsType[]
}
let avatar1 = 'https://pm1.aminoapps.com/6889/74979d4d2744ec6e27995b6e866f091d04c0b40cr1-515-414v2_uhq.jpg'
const Card1 = v1()
const Card2 = v1()
const Card3 = v1()
function App() {

const [cardStudents, setCardStudents]=useState<CardStudentsType[]>([
    {id:Card1,avatar:avatar1, name:'Danil Fedorkin'},
    {id:Card2,avatar:avatar1, name:'Denis Motorkin'},
    {id:Card3,avatar:avatar1, name:'Evgeniy Kotorkin'},

])
    const [comments, setComments]=useState<CommentsStateType>({
        [Card1]: [
            {id: v1(), sms: 'Hello Mr. Teodor',likes:true},
            {id: v1(), sms: 'Hello Mr. Teodor',likes:false},
            {id: v1(), sms: 'Hello Mr. Teodor',likes:true},
        ],
        [Card2]: [
            {id: v1(), sms: 'Hello Mr. Victor',likes:true},
            {id: v1(), sms: 'Hello Mr. Victor',likes:false},
            {id: v1(), sms: 'Hello Mr. Victor',likes:true},
            {id: v1(), sms: 'Hello Mr. Victor',likes:false},
        ],
        [Card3]: [
            {id: v1(), sms: 'Hello Mr. Pavel',likes:true},
            {id: v1(), sms: 'Hello Mr. Pavel',likes:false},
            {id: v1(), sms: 'Hello Mr. Pavel',likes:true},
            {id: v1(), sms: 'Hello Mr. Pavel',likes:false},
            {id: v1(), sms: 'Hello Mr. Pavel',likes:true},
        ],

    })
    const removeComments=(comId:string,cardId:string)=>{
    setComments({...comments,[cardId]:comments[cardId].filter(el=>el.id!==comId)})
    }
    const addComments=(smsText:string,cardId:string)=>{
    let com = {id: v1(), sms: smsText, likes:true}
        setComments({...comments,[cardId]:[...comments[cardId],com]})
    }
    const commentChangeLikes=(comId:string,check:boolean,cardId:string)=>{
    setComments({...comments,[cardId]:[...comments[cardId]].map(el=>el.id===comId?{...el,likes:check}:el)})
    }
    const addCard=(name:string)=>{
    const cardId = v1()
        let newCard = {id:cardId,avatar:avatar1, name:name}
        setCardStudents([newCard,...cardStudents])
        setComments({...comments,[cardId]:[]})
 }
 const changeCardTitle=(cardId:string,nameStudents:string)=>{
    // return [...cardStudents,[cardId]:{...cardStudents[cardId],name:nameStudents}
 }
    const mapTodolist = cardStudents.map(el=>{
        return    <CardStudents
            key={el.id}
            cardStudents={cardStudents}
            comments={comments}
            cardId={el.id}
            name={el.name}
            avatar={el.avatar}
            removeComments={removeComments}
            addComments={addComments}
            commentChangeLikes={commentChangeLikes}
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
