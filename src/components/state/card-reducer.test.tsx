import {avatar1, CardStudentsType} from "../../App";
import {addCardAC, cardReducer, changeCardTitleAC, removeCardAC} from "./card-reducer";

let cardStart: CardStudentsType[] = []
beforeEach(() => {
    cardStart = [
        {id: '1', avatar: avatar1, name: 'Danil Fedorkin'},
        {id: '2', avatar: avatar1, name: 'Denis Motorkin'},
        {id: '3', avatar: avatar1, name: 'Evgeniy Kotorkin'},

    ]
})
test('test expected add new card', () => {
    const action = addCardAC('Danil Danilovich')
    const cardEnd = cardReducer(cardStart,action)
    expect(cardEnd.length).toBe(4)
})
test('test expected remove card', () => {
    const action = removeCardAC('2')
    const cardEnd = cardReducer(cardStart,action)
    expect(cardEnd.length).toBe(2)
})
test('test expected change title to card', () => {
    const action = changeCardTitleAC('2','Danil Danilovich')
    const cardEnd = cardReducer(cardStart,action)
    expect(cardEnd[1].name).toBe('Danil Danilovich')
})
