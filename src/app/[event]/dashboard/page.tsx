import DashboardModule from "@/components/modules/DashboardModule"

const page = ({ params, searchParams }:
     { params: { event: string },  
     searchParams: { section?: string; page?: string, search?: string } }) => {
    return <DashboardModule
    eventPath={params.event}
    section={searchParams.section}
    page={searchParams.page}
    search={searchParams.search}
    />
}

export default page