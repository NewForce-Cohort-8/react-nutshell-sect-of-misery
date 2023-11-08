export const EventsSearch = ({ setterFunction }) => {
    return (
        <div>
          <input 
          onChange={
            (changeEvent) => {
              setterFunction(changeEvent.target.value)
          }
        }
          type = "text" placeholder = "Enter search event" />
          <button id="searchEvent--${event.id}">Search Event</button>
        </div>
    )
}