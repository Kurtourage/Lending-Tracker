// app/components/SummaryCard.tsx
type SummaryCardProps = {
    title: string
    value: string
    icon?: React.ReactNode
    color?: string
  }
  
  export default function SummaryCard({ title, value, icon, color = "bg-blue-500" }: SummaryCardProps) {
    return (
      <div className={`rounded-2xl shadow-md p-4 text-white ${color}`}>
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
  