import DashboardModule from "@/components/modules/DashboardModule"

const page = ({ params, searchParams }:
     { params: { event: string },  
     searchParams: { section?: string; page?: string } }) => {
    return <DashboardModule
    eventPath={params.event}
    section={searchParams.section}
    page={searchParams.page}
    />
}

export default page