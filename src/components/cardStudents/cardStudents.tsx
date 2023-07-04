import React, {useState} from 'react';
import s from './CardStudents.module.css'
import {CardStudentsType, CommentsStateType} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableMode} from "../EditableMode/EditableMode";

type TaskType = {}

type PropsType = {
    cardStudents: CardStudentsType[]
    comments: CommentsStateType
    cardId: string
    name: string
    avatar: string
    removeComments: (comId: string, cardId: string) => void
    addComments: (smsText: string, cardId: string) => void
    commentChangeLikes:(comId:string,check:boolean,cardId:string)=>void
    changeCardTitle:(cardId:string,nameStudents:string)=>void
    removeCard:(cardId:string)=>void
    changeCommentsText:(cardId:string,comId:string,text:string)=>void
}

export function CardStudents(props: PropsType) {
    const {
        comments,
        cardId,
        name,
        avatar,
        removeComments,
        addComments,
        commentChangeLikes,
        changeCardTitle,
        removeCard,
        changeCommentsText
    } = props
    const [comment, setComment]=useState('')
    const removeCommentsHandler = (id: string) => {
        removeComments(id, cardId)
    }
    const addCommentsHandler=(comment:string)=>{
        addComments(comment,cardId)
        setComment('')
    }
    const changeCommentHandler=(commentId:string)=>{
        changeCommentsText(cardId,commentId,comment)
    }
    const commentChangeLikesHandler=(check:boolean,id:string)=>{
        commentChangeLikes(id,check,cardId)
    }
    const changeTitleHandler=(title:string)=>{
        changeCardTitle(cardId,title)
    }
    const removeCardHandler=()=>{
        console.log(cardId)
        removeCard(cardId)
    }
    const mapSms = comments[cardId].map((el, key) =>
        <div className={s.container_2} key={key}>
            <input onChange={(e)=>commentChangeLikesHandler(e.currentTarget.checked,el.id)}  checked={el.likes} type="checkbox"/>
            <div>
                <button className={s.crossDellete} onClick={() => removeCommentsHandler(el.id)}>x</button>
            </div>
            <EditableMode className={s.sms} text={el.sms} onChange={()=>changeCommentHandler(el.id)}/>
            {/*<span className={s.sms}>{el.sms}</span>*/}
        </div>
    )
    return (
        <div className={s.wrapp}>
                        <button onClick={removeCardHandler}>x</button>
            <div className={s.wrapp_size}>
                <div className={s.container_1}>
                    <div>
                        <img src={avatar} alt="photo"/>
                    </div>
                    <div>
                        <h2>
                            <EditableMode text={name} onChange={changeTitleHandler} className=''/>
                        </h2>
                        <div>
                            <AddItemForm addText={addCommentsHandler} name={'add'} textPlaceholder={'Write your message'}/>
                        </div>
                    </div>
                </div>
                <div>
                    <ol>
                        {mapSms}
                    </ol>
                </div>
            </div>
        </div>
    )
}
