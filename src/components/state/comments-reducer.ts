import { CommentsStateType } from "../../App"




type CommentsReducerActionType = any
let initialState : CommentsStateType={}
export const commentsReducer=(state=initialState,action:CommentsReducerActionType):CommentsStateType=>{
    switch (action.type){
        
        default:   return state
    }
    
}
export const removeCommentsAC=(comId: string, cardId: string)=>{
    return {type:'REMOVE-COMMENTS'}
}
export const addCommentsAC=(smsText: string, cardId: string)=>{
    return {type:'ADD-COMMENTS'}
}
export const commentChangeLikesAC=(comId: string, check: boolean, cardId: string)=>{
    return {type:'CHANGE-LIKE-COMMENTS'}
}
