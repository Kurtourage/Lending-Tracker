// app/components/SummaryCard.tsx
type SummaryCardProps = {
    title: string
    value: string
    icon?: React.ReactNode
    color?: string
  }
  
  export default function SummaryCard({ title, value, icon }: SummaryCardProps) {
    return (
      <div className={`rounded-2xl shadow-md p-4 text-white bg-[#1E3A8A] hover:bg-[#3B82F6] transition-colors duration-300`}>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm">{title}</h3>
            <p className="text-2xl font-semibold">{value}</p>
          </div>
          <div className="text-3xl">{icon}</div>
        </div>
      </div>
    )
  }
  