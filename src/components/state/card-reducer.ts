import { v1 } from "uuid"
import {avatar1, CardStudentsType} from "../../App"


export type ActionCardType = RemoveCardActionType|AddCardActionType|ChangeCardTitleActionType

let initialState: CardStudentsType[] = [
    {id: '123', avatar: 'hello', name: 'Danil'},
]
export const cardReducer = (state = initialState, action: ActionCardType): CardStudentsType[] => {
    switch (action.type) {
        case "REMOVE-CARD": {
            return state.filter(el=>el.id!==action.cardId)
        }
        case "ADD-CARD":{
            let newCard = {id: action.cardId, avatar: avatar1, name: action.name}
            return [newCard,...state]
        }
        case "CHANGE-CARD-TITLE":{
            return state.map(el => el.id === action.cardId ? {...el, name: action.nameStudents} : el)
        }
        default :
            return state
    }
}

export type RemoveCardActionType = ReturnType<typeof removeCardAC>
export type AddCardActionType = ReturnType<typeof addCardAC>
export type ChangeCardTitleActionType =ReturnType<typeof changeCardTitleAC>
export const addCardAC=(name:string)=>{

    return{type:'ADD-CARD',name,cardId:v1()}as const
}
export const removeCardAC = (cardId: string) => {
    return {type: 'REMOVE-CARD', cardId}as const
}
export const changeCardTitleAC = (cardId: string, nameStudents: string)=>{
    return {type:"CHANGE-CARD-TITLE",cardId,nameStudents}as const
}

