import React, {ChangeEvent, useState} from "react";
import s from './Editable.module.css'


type EditableModePropsType = {
    text: string
    onChange:(newTextValue:string)=>void
    className:string
}
export const EditableMode = React.memo((props: EditableModePropsType) => {
    console.log('EditableMode')
    const {text,onChange,className} = props
    const [editMode, setEditMode] = useState(false)
    const [textEdit, setTextEdit] = useState(text)

    const addText=(e:ChangeEvent<HTMLInputElement>)=>{
        setTextEdit(e.currentTarget.value)
    }
    const openEditMode=()=>{
        setTextEdit(text)
        setEditMode(!editMode)
    }
    const Blur=()=>{
        onChange(textEdit)
        setEditMode(!editMode)
    }
    const pressEnter=(e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.charCode===13){
            onChange(textEdit)
            setEditMode(!editMode)
        }
    }

    return (
        !editMode
            ?
            <>
                <button className='Editablebutton' onClick={openEditMode}>-</button>
                <span>{text}</span>
            </>
:
            <>
                <input className={s.input} onKeyPress={pressEnter} onBlur={Blur} value={textEdit} autoFocus onChange={addText} type="text"/>
            </>

    )
})
