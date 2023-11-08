import { useState } from "react"
import { ArticleList } from "./ArticleList"
import { ArticleForm } from "./ArticleForm"

export const ArticleContainer = () => {
    const [state, update] = useState("")
    
    return (
        <>
            <ArticleList /> 
        </>
    )
}