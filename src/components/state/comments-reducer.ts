import {CommentsStateType} from "../../App"
import {v1} from "uuid";
import {AddCardActionType, RemoveCardActionType} from "./card-reducer";


export type CommentsReducerActionType = RemoveCommentsActionType |
    AddCommentsActionType |
    CommentChangeLikesActionType |
    AddCardActionType |
    RemoveCardActionType |
    ChangeCommentsTextActionType

let initialState: CommentsStateType = {}
export const commentsReducer = (state = initialState, action: CommentsReducerActionType): CommentsStateType => {
    switch (action.type) {
        case "REMOVE-COMMENTS":{
            return {...state, [action.cardId]:state[action.cardId].filter(el=>el.id!==action.comId)}
        }
        case "ADD-COMMENTS":{
            return{...state, [action.cardId]: [...state[action.cardId],{id: v1(), sms: action.smsText, likes: false}]}
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
export type RemoveCommentsActionType = ReturnType<typeof removeCommentsAC>
export type AddCommentsActionType = ReturnType<typeof addCommentsAC>
export type CommentChangeLikesActionType = ReturnType<typeof commentChangeLikesAC>
export type ChangeCommentsTextActionType = ReturnType<typeof changeCommentsTextAC>
export const removeCommentsAC = (comId: string, cardId: string) => {
    return {type: 'REMOVE-COMMENTS', comId, cardId}as const
}
export const addCommentsAC = (cardId: string,smsText: string) => {
    return {type: 'ADD-COMMENTS', smsText, cardId}as const
}
export const commentChangeLikesAC = (comId: string, check: boolean, cardId: string) => {
    return {type: 'CHANGE-LIKE-COMMENTS', comId, check, cardId}as const
}
export const changeCommentsTextAC = (cardId:string,comId:string,text:string)=>{
    return {type:'CHANGE-COMMENTS-TITLE',cardId,comId,text }as const
}

