import {addCommentsAC, commentChangeLikesAC, commentsReducer, removeCommentsAC} from "./comments-reducer";
import {CommentsStateType} from "../../App";

let startState:CommentsStateType = {}
beforeEach(()=>{
    startState = {
    ['cardId1']: [
        {id: '1', sms: '20 лет', likes: false},
        {id: '2', sms: 'Не женат', likes: false},
        {id: '3', sms: 'Работаю в IT', likes: true},
    ],
    ['cardId2']: [
        {id: '1', sms: '30 лет', likes: true},
        {id: '2', sms: 'Не женат', likes: false},
        {id: '3', sms: 'Работаю в IT', likes: true},
    ],
}
})
test('correct comment should be deleted from correct array', () => {

const action = removeCommentsAC('2','cardId1')
const endState = commentsReducer(startState, action)
    expect(endState['cardId1'].length).toBe(2)
    expect(endState['cardId2'].length).toBe(3)
    }
)
test('correct comment should be added from correct array', () => {

const action = addCommentsAC('Hello my friends','cardId1')
const endState = commentsReducer(startState, action)
    expect(endState['cardId1'].length).toBe(4)
    expect(endState['cardId2'].length).toBe(3)
    }
)
test('correct comment should be changed likes from correct array', () => {

const action = commentChangeLikesAC('2',true,'cardId1')
const endState = commentsReducer(startState, action)
    expect(endState['cardId1'][1].likes).toBe(true)
    expect(endState['cardId2'][0].likes).toBe(true)
    }
)
test('correct comment should be changed comments from correct array', () => {

const action = addCommentsAC('Hello my friends','cardId1')
const endState = commentsReducer(startState, action)
    expect(endState['cardId1'][3].sms).toBe('Hello my friends')
    }
)
