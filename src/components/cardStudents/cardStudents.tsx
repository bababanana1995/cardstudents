import React, {useCallback, useState} from 'react';
import s from './CardStudents.module.css'
import {CommentsType} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableMode} from "../EditableMode/EditableMode";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {addCommentsAC, changeCommentsTextAC, commentChangeLikesAC, removeCommentsAC} from "../state/comments-reducer";
import {changeCardTitleAC, removeCardAC} from "../state/card-reducer";
import {Simulate} from "react-dom/test-utils";
import compositionEnd = Simulate.compositionEnd;

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
    }, [dispatch])
    const changeCardTitle = (name: string) => {
        dispatch(changeCardTitleAC(cardId, name))
    }
    const removeCard = () => {
        dispatch(removeCardAC(cardId))
    }

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
            const changeComment = (comment: string) => {
                dispatch(changeCommentsTextAC(cardId, el.id, comment))
            }
            const commentChangeLikes = (check: boolean) => {
                dispatch(commentChangeLikesAC(el.id, check, cardId))
            }
            const removeComments = () => {
                dispatch(removeCommentsAC(el.id, cardId))
            }

            return <div className={s.container_2} key={key}>
                <input onChange={(e) => commentChangeLikes(e.currentTarget.checked)} checked={el.likes}
                       type="checkbox"/>
                <div>
                    <button className={s.crossDellete} onClick={removeComments}>x</button>
                </div>
                <EditableMode className={s.sms} text={el.sms} onChange={changeComment}/>
            </div>
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
