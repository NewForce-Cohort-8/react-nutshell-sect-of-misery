import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const ArticleForm = ({ state, update }) => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [article, setArticle] = useState({
        userId: 0,
        url: "",
        title: "",
        synopsis: "",
        timetamp: Date.now(),
        tags: "",
        bullshit: false
    })

    const [toggle, setToggle] = useState(false)
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */

    
    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        // TODO: Create the object to be saved to the API
        const articleToSendToAPI = {
            userId: honeyUserObject.id,
            title: article.title,
            url: article.url,
            synopsis: article.synopsis,
            tags: article.tags,
            timestamp: Date.now(),
            bullshit: article.bullshit
        }

        // TODO: Perform the fetch() to POST the object to the API


        return fetch(`http://localhost:8088/articles`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(articleToSendToAPI)
        })

            .then(response => response.json())
            .then(() => {
                setArticle({
                    userId: 0,
                    url: "",
                    title: "",
                    synopsis: "",
                    timetamp: Date.now(),
                    tags: "",
                    bullshit: false
                })
            })
            .then(navigate("/"))
    }

    return (
        <>
            <form className="articleForm">
            <h2 className="articleForm__title">New Article Form</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="url">URL:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="What's the website dude"
                        value={article.url}
                        onChange={
                            (event) => {
                                const copy = {...article}
                                copy.url = event.target.value
                                setArticle(copy)
                            }
                        } 
                        required />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="What's the title bro"
                        value={article.title}
                        onChange={
                            (event) => {
                                const copy = {...article}
                                copy.title = event.target.value
                                setArticle(copy)
                            }
                        } 
                        required />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="synopsis">Synopsis:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="What's the summary dog"
                        value={article.synopsis}
                        onChange={
                            (event) => {
                                const copy = {...article}
                                copy.synopsis = event.target.value
                                setArticle(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="tags">Tags:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Any tags, partner?"
                        value={article.tags}
                        onChange={
                            (event) => {
                                const copy = {...article}
                                copy.tags = event.target.value
                                setArticle(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="bullshit">Bullshit?:</label>
                    <input type="checkbox"
                        value={article.bullshit}
                        onChange={
                            (event) => {
                                const copy = {...article}
                                copy.bullshit = event.target.checked
                                setArticle(copy)
                            }
                        } 
                        required />
                </div>
            </fieldset>
            <button 
            className="btn btn-primary" 
            onClick={
                (clickEvent) => {
                    handleSaveButtonClick(clickEvent)
                }
            }>
                Save Article
            </button>
        </form>
        </>
    )
}