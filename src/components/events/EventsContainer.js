import { EventsList } from "./EventsList"
import { EventsSearch } from "./EventsSearch"

export const EventsContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    return <>
    <EventsSearch setterFunction = {setSearchTerms} example1 = {100} example2 = {"foobar"} /> 
    <EventsList searchTermState = {searchTerms} />
    </> 
}