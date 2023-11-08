import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { NavBar } from "../nav/NavBar"

export const ArticleEdit = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [article, update] = useState({
        userId: 0,
        url: "",
        title: "",
        synopsis: "",
        timetamp: Date.now(),
        tags: "",
        bullshit: false
    })

    const { articleId } = useParams()
    const navigate = useNavigate()
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */

        useEffect(
            () => {
                fetch(`http://localhost:8088/articles/${articleId}`)
                    .then(response => response.json())
                    .then((data) => {
                        update(data)
                    })
            }, [articleId]
        )

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/articles/${articleId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(article)
        })

            .then(response => response.json())
            .then(() => {
                navigate("/")
            })
    }

    return (
        <>
        <NavBar />
        <Link to={"/"} ><button className="btn btn-primary">Back</button></Link>
        <form className="articleEditForm">
            <h2 className="articleForm__title">Edit Article</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">URL:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="URL of the article"
                        value={article.url}
                        onChange={
                            (event) => {
                                const copy = {...article}
                                copy.url = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Title:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Title of the article"
                        value={article.title}
                        onChange={
                            (event) => {
                                const copy = {...article}
                                copy.title = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="synopsis">Synopsis:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Synopsis of the article"
                        value={article.synopsis}
                        onChange={
                            (event) => {
                                const copy = {...article}
                                copy.synopsis = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        checked={article.bullshit}
                        onChange={
                            (event) => {
                                const copy = {...article}
                                copy.bullshit = event.target.checked
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <div className="btn">
            <button className="btn btn-primary" onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>
                Save Edits
            </button>
            </div>
        </form>
        </>
    )
}