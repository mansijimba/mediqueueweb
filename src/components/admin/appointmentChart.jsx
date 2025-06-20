"use client"

import { useEffect, useRef, useState } from "react"

export function AppointmentChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [filter, setFilter] = useState("week")

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size to container dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Sample data and labels
    const data = [18, 22, 19, 24, 16, 12, 8]
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const maxValue = Math.max(...data)

    // Clear previous drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const chartWidth = canvas.width - 60
    const chartHeight = canvas.height - 60
    const barWidth = chartWidth / data.length - 10

    // Axes
    ctx.beginPath()
    ctx.moveTo(40, 20)
    ctx.lineTo(40, chartHeight + 30)
    ctx.lineTo(canvas.width - 20, chartHeight + 30)
    ctx.strokeStyle = "#e5e7eb"
    ctx.stroke()

    // Bars
    data.forEach((value, index) => {
      const barHeight = (value / maxValue) * chartHeight
      const x = 50 + index * (barWidth + 10)
      const y = chartHeight + 30 - barHeight

      ctx.fillStyle = "#0d9488"
      ctx.fillRect(x, y, barWidth, barHeight)

      // Labels
      ctx.fillStyle = "#6b7280"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(days[index], x + barWidth / 2, chartHeight + 50)

      ctx.fillStyle = "#111827"
      ctx.fillText(value.toString(), x + barWidth / 2, y - 5)
    })
  }, [filter])

  return (
    <div className="border rounded-lg bg-white shadow-sm">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Appointment Overview</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 text-sm text-gray-700 focus:outline-none"
        >
          <option value="day">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>
      <div className="p-4 h-[300px] w-full">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  )
}
