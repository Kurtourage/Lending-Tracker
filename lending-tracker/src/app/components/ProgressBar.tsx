type ProgressBarProps = {
    label: string
    value: number
    color?: string

}

export default function ProgressBar({label, value, color = "bg-green-600"}: ProgressBarProps) {
    return(

        <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
                <span>{label}</span>
                <span>{value}%</span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div className={`${color} h-full transition-all duration-300`} style={{width: `${value}%`}}></div>
            </div>
        </div>
    )
}