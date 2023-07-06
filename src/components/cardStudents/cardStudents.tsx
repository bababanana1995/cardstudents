import React, {useState} from 'react';
import s from './CardStudents.module.css'
import {CardStudentsType, CommentsStateType} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableMode} from "../EditableMode/EditableMode";

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
    // const [comment, setComment]=useState('')

    const addCommentsHandler=(comment:string)=>{
        addComments(comment,cardId)
    }


    const changeCardTitleHandler=(name:string)=>{
        changeCardTitle(cardId,name)
    }
    const removeCardHandler=()=>{
        removeCard(cardId)
    }
    const mapSms = comments[cardId].map((el, key) => {
        const changeCommentHandler=(comment:string)=>{
            changeCommentsText(cardId,el.id,comment)
        }
        const commentChangeLikesHandler=(check:boolean)=>{
            commentChangeLikes(el.id,check,cardId)
        }
        const removeCommentsHandler = () => {
            removeComments(el.id, cardId)
        }
           return <div className={s.container_2} key={key}>
                <input onChange={(e) => commentChangeLikesHandler(e.currentTarget.checked)} checked={el.likes}
                       type="checkbox"/>
                <div>
                    <button className={s.crossDellete} onClick={removeCommentsHandler}>x</button>
                </div>
                <EditableMode className={s.sms} text={el.sms} onChange={changeCommentHandler}/>
                {/*<span className={s.sms}>{el.sms}</span>*/}
            </div>
        }
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
                            <EditableMode text={name} onChange={changeCardTitleHandler} className=''/>
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
