import { Label } from '@/components/ui/label'
import Image from 'next/image'

type TransactionHeaderProps = {
    backTitle: string,
    callbackBackUrl: string,
}

const TransactionHeader: React.FC<TransactionHeaderProps> = ({ backTitle, callbackBackUrl }) => {

    return (
        <div className="sticky md:static top-0 z-20 left-0 bg-background w-screen md:w-full md:max-w-7xl flex items-center px-4 md:px-0 py-4 md:py-6 mb-2">
            <a href={callbackBackUrl}>
            <Image
                src={"/arrow-left-black.svg"}
                alt='back button'
                width={1}
                height={1}
                className='w-4 h-auto'
            />
            </a>
            <Label className="text-primary ml-4 md:text-lg">{backTitle}</Label>
        </div>
    )
}

export default TransactionHeader
