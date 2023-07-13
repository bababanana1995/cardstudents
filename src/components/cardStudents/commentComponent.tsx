import React, {useCallback} from "react";
import {useDispatch} from "react-redux";
import {changeCommentsTextAC, commentChangeLikesAC, removeCommentsAC} from "../state/comments-reducer";
import s from "./CardStudents.module.css";
import {EditableMode} from "../EditableMode/EditableMode";

type CommentComponentType = {
    cardId: string
    commentId: string
    key: number
    likes: boolean
    sms: string
}
export const CommentComponent = React.memo((props: CommentComponentType) => {
    const {cardId, commentId, key, likes, sms} = props
    let dispatch = useDispatch()
    const changeComment = useCallback((comment: string) => {
        dispatch(changeCommentsTextAC(cardId, commentId, comment))
    },[cardId, commentId])
    const commentChangeLikes = useCallback((check: boolean) => {
        dispatch(commentChangeLikesAC(commentId, check, cardId))
    },[cardId, commentId])
    const removeComments = useCallback(() => {
        dispatch(removeCommentsAC(commentId, cardId))
    },[cardId, commentId])

    return <div className={s.container_2} key={key}>
        <input onChange={(e) => commentChangeLikes(e.currentTarget.checked)} checked={likes}
               type="checkbox"/>
        <div>
            <button className={s.crossDellete} onClick={removeComments}>x</button>
        </div>
        <EditableMode className={s.sms} text={sms} onChange={changeComment}/>
    </div>
})
