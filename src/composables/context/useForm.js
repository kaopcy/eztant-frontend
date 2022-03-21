import React , { useEffect, useState } from 'react'

export const useForm = ({ initialState })=>{
    const [input , setInput] = useState(initialState)

    const onChange = e=>{
        const { name , value } = e.target
        setInput(e=>{
            
        })
    }
    useEffect(()=>{
        
    },[])

    return {  }
}