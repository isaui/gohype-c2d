import Image from 'next/image'
const RefundPolicySection = () => {
    return <div className="px-4 mt-4">
        <h1 className=" text-2xl font-bold text-primary mb-4">Refund Policy</h1>
        <div className="flex items-center space-x-2">
            <div className="rounded-full w-16 h-16 bg-gray-1 flex flex-col items-center justify-center">
                <Image
                width={1}
                height={1}
                className='w-8 h-auto'
                alt="Not refundable"
                src="/non-refundable-icon.svg"
                />
            </div>
            <div className='flex flex-col  justify-start'>
                <h1 className=" text-base font-bold text-primary">Non Refundable</h1>
                <p className=' text-secondary'>You cannot request a refund for this voucher.</p>
            </div>
        </div>
    </div>
}

export default RefundPolicySection