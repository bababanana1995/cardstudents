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
        changeCardTitle
    } = props
    const [comment, setComment]=useState('')
    const removeCommentsHandler = (id: string) => {
        removeComments(id, cardId)
    }
    const addCommentsHandler=(comment:string)=>{
        addComments(comment,cardId)
        setComment('')
    }
    const changeCommentHandler=(sms:string)=>{
        setComment(sms)
    }
    const commentChangeLikesHandler=(check:boolean,id:string)=>{
        commentChangeLikes(id,check,cardId)
    }
    const changeTitleHandler=(title:string)=>{
        changeCardTitle(cardId,title)
    }
    const mapSms = comments[cardId].map((el, key) =>
        <div className={s.container_2} key={key}>
            <input onChange={(e)=>commentChangeLikesHandler(e.currentTarget.checked,el.id)}  checked={el.likes} type="checkbox"/>
            <div>
                <button className={s.crossDellete} onClick={() => removeCommentsHandler(el.id)}>x</button>
            </div>
            <EditableMode className={s.sms} text={el.sms} onChange={changeCommentHandler}/>
            {/*<span className={s.sms}>{el.sms}</span>*/}
        </div>
    )
    return (
        <div className={s.wrapp}>
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
