import { Link } from "react-router-dom"

export const Article = ({ id, title, synopsis, url, getAllArticles, articleObject }) => {

   const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    const buttonOrNoButton = () => {
        if (honeyUserObject.id === articleObject.userId) {
            return<>
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
        <Link to={`/articles/${id}`}><div className="btn-edit"><button>Edit</button></div></Link>
        </>
        } 
        else {
            return ""
        }
    }


    return <section className="article">
        <div>
            <a href={url} target="_blank" className=""><p>{title}</p></a>
        </div>
        <div className="synopsis">Synopsis: <em>{synopsis}</em></div>
        {buttonOrNoButton()}
    </section>
}