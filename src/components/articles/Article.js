
export const Article = ({ id, title, synopsis, url }) => {
    return <section className="article">
        <div>
            <a href={url} target="_blank"><h5>{title}</h5></a>
        </div>
        <div className="synopsis">Synopsis: <em>{synopsis}</em></div>
    </section>
}