import { v1 } from "uuid"
import {avatar1, CardStudentsType} from "../../App"


export type ActionCardType = RemoveCardActionType|AddCardActiomType|ChangeCardTitleActionType

let initialState: CardStudentsType[] = []
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

type RemoveCardActionType = {
    type: 'REMOVE-CARD'
    cardId: string
}
type AddCardActiomType = {
    type:'ADD-CARD'
    name:string
    cardId:string
}
type ChangeCardTitleActionType ={
    type: 'CHANGE-CARD-TITLE'
    cardId:string
    nameStudents: string
}
export const addCardAC=(name:string):AddCardActiomType=>{

    return{type:'ADD-CARD',name,cardId:v1()}
}
export const removeCardAC = (cardId: string):RemoveCardActionType => {
    return {type: 'REMOVE-CARD', cardId}
}
export const changeCardTitleAC = (cardId: string, nameStudents: string):ChangeCardTitleActionType=>{
    return {type:"CHANGE-CARD-TITLE",cardId,nameStudents}
}
