import { useEffect, useState } from "react"
import { Article } from "./Article"
import { Link, useNavigate } from "react-router-dom"

export const ArticleList = () => {
    const [articles, setArticles] = useState([])
    const navigate = useNavigate
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    const filteredArticles = articles.filter((article) => article.userId === honeyUserObject.id)

    const getAllArticles = () => {
        fetch('http://localhost:8088/articles/')
        .then(response => response.json())
        .then((articleArray) => {
            articleArray.sort((a,b) => {
                return b.timestamp - a.timestamp
            })
            setArticles(articleArray)
        })
    }

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

    return (<>
            <div className="btn">
            <Link to={`/articles/create`}><button>New Article</button></Link>
            </div>
    <article className="articles">
        <h3>News Articles</h3>
            {
                filteredArticles.map(article => <Article key={`article--${article.id}`} id={article.id} url={article.url} title={article.title} synopsis={article.synopsis} articleObject={article} getAllArticles={getAllArticles} />  )
            }
    </article>
    </>)
}