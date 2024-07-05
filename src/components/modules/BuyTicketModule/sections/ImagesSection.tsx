const ImagesSection = () => {
    return <div className="flex flex-col w-full mx-auto mb-4 min-h-28 px-4">
        <div className="grid grid-cols-2 w-full gap-1">
            <div>
                <img src="/perosotan-pink.svg" className="w-full h-auto bg-cover" alt="" />
            </div>
            <div className=" grid grid-cols-2 gap-1">
            <img src="/perosotan-abu-abu.svg" className="w-full h-auto bg-cover" alt="" />
            <img src="/jaring-pink.svg" className="w-full h-auto bg-cover" alt="" />
            <img src="/perosotan-biru.svg" className="w-full h-auto bg-cover" alt="" />
            <img src="/terowongan-lihat-semua.svg" className="w-full h-auto bg-cover" alt="" />
            </div>
        </div>
    </div>
}

export default ImagesSection