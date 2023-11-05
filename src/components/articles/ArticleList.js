import { useEffect, useState } from "react"
import { Article } from "./Article"
import { Link, useNavigate } from "react-router-dom"

export const ArticleList = () => {
    const [articles, setArticles] = useState([])
    const navigate = useNavigate

    useEffect(
        () => {
            fetch(`http://localhost:8088/articles`)
                .then(response => response.json())
                .then((articleArray) => {
                    articleArray.sort((a,b) => {
                        return b.timestamp - a.timestamp
                    })
                    setArticles(articleArray)
                })
        },
        []
    )

    const getAllArticles = () => {
        fetch('http://localhost:8088/articles/')
        .then(response => response.json())
        .then((articleArray) => {
            setArticles(articleArray)
        })
    }

    return (<>
            <Link to={`/add-article`}><button>New Article</button></Link>
    <article className="articles">
        <h3>News Articles</h3>
            {
                articles.map(article => <Article key={`article--${article.id}`} id={article.id} url={article.url} title={article.title} synopsis={article.synopsis} getAllArticles={getAllArticles} />  )
            }
    </article>
    </>)
}