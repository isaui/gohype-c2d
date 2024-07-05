const DescriptionSection = () => {
    return <div className="flex flex-col w-full mx-auto mb-4 px-4">
        <h1 className=" text-2xl font-bold text-primary mb-4">Twist n Turn Playground</h1>
        <p className="text-secondary">
            {`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries`}</p>
        <div className="flex items-start mt-4 ">
            <img src="/map-point.svg" className="w-6 h-auto  mt-1"/>
            <div className="ml-4 flex flex-col">
            <p>Finns Recreation Club, Tibubeneng, Badung Regency, Bali, Indonesia, Kuta Utara, Badung, Bali, Indonesia</p>
            <p className=" mt-2 font-bold bg-clip-text text-transparent bg-primary">View on Map</p>
            </div>
        </div>
        <div className="flex items-start mt-4 ">
            <img src="/time.svg" className="w-4 h-auto  mt-1 "/>
            <div className="ml-4 flex flex-col">
            <p>Open on Weekend: 09.00 - 22.00 WIB</p>
            <p>Open on Weekday: 09.00 - 21.00 WIB</p>
            </div>
        </div>
    </div>
}
export default DescriptionSection