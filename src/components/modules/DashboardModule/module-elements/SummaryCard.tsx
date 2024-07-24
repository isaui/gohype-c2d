interface SummaryCardProps {
    title: string
    count: number
    color: string
  }
  
  const SummaryCard: React.FC<SummaryCardProps> = ({ title, count, color }) => {
    return (
      <div className={`${color} rounded-lg p-4 text-white shadow-md md:w-[12rem]`}>
        <div className="text-3xl font-bold mb-2">{count}</div>
        <div className="text-sm uppercase">{title}</div>
      </div>
    )
  }
  
  export default SummaryCard