import React, {ChangeEvent, useState} from "react";
import s from './AddItemForm.module.css'

type AddItemFormPropsType = {
    addText: (text: string) => void
    name: string
    textPlaceholder: string
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    const {addText, name, textPlaceholder} = props
    const [text, setText] = useState('')
    const[error,setError] = useState(null||'')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setText(e.currentTarget.value)
    }
    const onClickHandler = () => {
        if(text.trim().length!==0) {
            addText(text)
            setText('')
        }else{
            setError("Введите хоть что то")

        }
    }
    const pressEnter=(e:React.KeyboardEvent)=>{
        if(text.trim().length!==0&&e.charCode===13) {
            addText(text)
            setText('')
        }else{
            setError("Введите хоть что то")

        }
    }
    return (
        <div className={s.form}>
            <input
                onKeyPress={pressEnter}
                placeholder={textPlaceholder}
                value={text}
                onChange={onChangeHandler}
                type="text"/>
            <button  onClick={onClickHandler}>{name}</button>
            <div>{error}</div>
        </div>
    )
}
