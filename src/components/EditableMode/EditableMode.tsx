import React, {ChangeEvent, useState} from "react";
import s from './Editable.module.css'


type EditableModePropsType = {
    text: string
    onChange:(newTextValue:string)=>void
    className:string
}
export const EditableMode = (props: EditableModePropsType) => {
    const {text,onChange,className} = props
    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState(text)

    const addText=(e:ChangeEvent<HTMLInputElement>)=>{
        setName(e.currentTarget.value)
    }
    const openEditMode=()=>{
        setEditMode(!editMode)
    }
    const Blur=()=>{
        onChange(name)
        setEditMode(!editMode)
    }
    const pressEnter=(e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.charCode===13){
            onChange(name)
            setEditMode(!editMode)
        }
    }

    return (
        !editMode
            ?
            <>
                <button className='Editablebutton' onClick={openEditMode}>-</button>
                <span>{name}</span>
            </>
:
            <>
                <input className={s.input} onKeyPress={pressEnter} onBlur={Blur} value={name} autoFocus onChange={addText} type="text"/>
            </>

    )
}
