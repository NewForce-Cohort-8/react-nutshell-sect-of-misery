import { Link } from "react-router-dom"

export const Article = ({ id, title, synopsis, url, getAllArticles }) => {
    return <section className="article">
        <div>
            <a href={url} target="_blank"><h5>{title}</h5></a>
        </div>
        <div className="synopsis">Synopsis: <em>{synopsis}</em></div>
        <button
            onClick={() => {
                fetch(`http://localhost:8088/articles/${id}`, {
                    method: "DELETE"
                })
                .then(() => {
                    getAllArticles()
                })
            }}
        >Delete</button>
        <Link to={`/articles/${id}`}><button>Edit</button></Link>
    </section>
}