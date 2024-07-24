import { createClient } from "@/utils/supabase/server"
import SearchSection from "./SearchSection"

type SearchServerSectionProps = {
    ticketPath: string
    searchText: string
}

const SearchServerSection: React.FC<SearchServerSectionProps> = async ({ticketPath, searchText}) => {
    let ticketName = ''
    const supabase = createClient()
    const response = await supabase.from("ticket").select("*").eq("ticket_path", ticketPath).single()
    if(response.data){
        ticketName = response.data.ticket_name
    }
    return <>
    <SearchSection
    ticketName={ticketName}
    searchText={searchText}
    ticketPath={ticketPath}
    />
    </>
}

export default SearchServerSection