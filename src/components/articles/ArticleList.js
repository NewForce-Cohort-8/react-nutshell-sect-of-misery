import { useEffect, useState } from "react"
import { Article } from "./Article"

export const ArticleList = () => {
    const [articles, setArticles] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/articles`)
                .then(response => response.json())
                .then((articleArray) => {
                    setArticles(articleArray)
                })
        },
        []
    )


    return <article className="articles">
        <h3>News Articles</h3>
        <button>Add Article</button>
        {
            articles.map(article => <Article key={`article--${article.id}`} id={article.id} url={article.url} title={article.title} synopsis={article.synopsis}/>  )
        }
    </article>
}