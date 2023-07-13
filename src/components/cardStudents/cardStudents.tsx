import React, {useCallback, useState} from 'react';
import s from './CardStudents.module.css'
import {CommentsType} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableMode} from "../EditableMode/EditableMode";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {addCommentsAC} from "../state/comments-reducer";
import {changeCardTitleAC, removeCardAC} from "../state/card-reducer";
import {Simulate} from "react-dom/test-utils";
import {CommentComponent} from "./commentComponent";

type PropsType = {
    cardId: string
    name: string
    avatar: string
}

export const CardStudents = React.memo((props: PropsType) => {
    console.log('CardStudents')
    const {
        cardId,
        name,
        avatar,
    } = props
    let comments = useSelector<AppRootStateType, CommentsType[]>(state => state.comments[cardId])
    let dispatch = useDispatch()
    const [likes, setLikes] = useState('all')

    const addComments = useCallback((comment: string) => {
        dispatch(addCommentsAC(cardId, comment))
    }, [cardId])
    const changeCardTitle = useCallback((name: string) => {
        dispatch(changeCardTitleAC(cardId, name))
    },[cardId])
    const removeCard = useCallback(() => {
        dispatch(removeCardAC(cardId))
    },[cardId])

    const filteredComments = (likes: string) => {
        setLikes(likes)
    }
    let allComments = comments
    if (likes === 'check') {
        allComments = comments.filter(el => el.likes === true)
    }
    if (likes === 'notCheck') {
        allComments = comments.filter(el => el.likes === false)
    }
    const mapSms = allComments.map((el, key) => {
    return <CommentComponent cardId={cardId} commentId={el.id} key={key} likes={el.likes} sms={el.sms}/>
        }
    )


    return (
        <div className={s.wrapp}>
            <button onClick={removeCard}>x</button>
            <div className={s.wrapp_size}>
                <div className={s.container_1}>
                    <div>
                        <img src={avatar} alt="photo"/>
                    </div>
                    <div>
                        <h2>
                            <EditableMode text={name} onChange={changeCardTitle} className=''/>
                        </h2>
                        <div>
                            <AddItemForm addText={addComments} name={'add'} textPlaceholder={'Write your message'}/>
                        </div>
                    </div>
                </div>
                <div>
                    <ol>
                        {mapSms}
                    </ol>
                </div>
            </div>
            <div>
                <button onClick={() => filteredComments('all')}>all</button>
                <button onClick={() => filteredComments('check')}>check</button>
                <button onClick={() => filteredComments('notCheck')}>notCheck</button>
            </div>
        </div>
    )
})
