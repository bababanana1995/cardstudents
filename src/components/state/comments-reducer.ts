import {CommentsStateType} from "../../App"
import {v1} from "uuid";
import {AddCardActiomType, RemoveCardActionType} from "./card-reducer";


export type CommentsReducerActionType = RemoveCommentsActionType |
    AddCommentsActionType |
    CommentChangeLikesActionType |
    AddCardActiomType |
    RemoveCardActionType |
    ChangeCommentsTextActionType

let initialState: CommentsStateType = {}
export const commentsReducer = (state = initialState, action: CommentsReducerActionType): CommentsStateType => {
    switch (action.type) {
        case "REMOVE-COMMENTS":{
            return {...state, [action.cardId]:state[action.cardId].filter(el=>el.id!==action.comId)}
        }
        case "ADD-COMMENTS":{
            return{...state, [action.cardId]: [...state[action.cardId],{id: v1(), sms: action.smsText, likes: true}]}
        }
        case "CHANGE-LIKE-COMMENTS":{
            return{...state,[action.cardId]:state[action.cardId].map(el=>el.id===action.comId?{...el,likes:action.check}:el)}
        }
        case "ADD-CARD":{
            return {...state,[action.cardId]:state[action.cardId]=[]}
        }

        case "REMOVE-CARD":{
            const stateCopy = {...state}
            delete stateCopy[action.cardId]
            return stateCopy
        }
        case "CHANGE-COMMENTS-TITLE":{
            return {...state,[action.cardId]:state[action.cardId].map(el=>el.id===action.comId?{...el,sms:action.text}:el)}
        }

        default:
            return state
    }
}
export type RemoveCommentsActionType = {
    type: 'REMOVE-COMMENTS'
    comId: string
    cardId: string
}
export type AddCommentsActionType = {
    type: 'ADD-COMMENTS'
    smsText: string
    cardId: string
}
export type CommentChangeLikesActionType = {
    type: 'CHANGE-LIKE-COMMENTS'
    comId: string
    check: boolean
    cardId: string
}
export type ChangeCommentsTextActionType = {
    type: 'CHANGE-COMMENTS-TITLE'
    cardId:string
    comId:string
    text:string
}
export const removeCommentsAC = (comId: string, cardId: string):RemoveCommentsActionType => {
    return {type: 'REMOVE-COMMENTS', comId, cardId}
}
export const addCommentsAC = (cardId: string,smsText: string):AddCommentsActionType => {
    return {type: 'ADD-COMMENTS', smsText, cardId}
}
export const commentChangeLikesAC = (comId: string, check: boolean, cardId: string):CommentChangeLikesActionType => {
    return {type: 'CHANGE-LIKE-COMMENTS', comId, check, cardId}
}
export const changeCommentsTextAC = (cardId:string,comId:string,text:string):ChangeCommentsTextActionType=>{
    return {type:'CHANGE-COMMENTS-TITLE',cardId,comId,text }
}

