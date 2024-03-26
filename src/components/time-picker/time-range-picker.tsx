"use client"

import * as React from "react"
import { Clock } from "lucide-react"
import { Label } from "@/components/ui/label"
import { TimePickerInput } from "./time-picker-input"
import { TimePickerSelect } from "./time-picker-select"

interface TimeRangePickerProps {
  startTime: Date | undefined
  setStartTime: (date: Date | undefined) => void
  endTime: Date | undefined
  setEndTime: (date: Date | undefined) => void
}

export function TimeRangePicker({
  startTime,
  setStartTime,
  endTime,
  setEndTime,
}: TimeRangePickerProps) {
  // TimePicker for Start Time
  const renderStartTimePicker = () => (
    <div className="flex gap-2">
      <TimePickerSelect
        picker="hours"
        date={startTime}
        setDate={setStartTime}
        setEndDate={setEndTime}
        // Additional logic as needed
      />
      <TimePickerSelect
        picker="minutes"
        date={startTime}
        setDate={setStartTime}
        setEndDate={setEndTime}
        // Additional logic as needed
      />
    </div>
  )

  // TimePicker for End Time
  const renderEndTimePicker = () => (
    <div className="flex gap-2">
      <TimePickerSelect
        picker="hours"
        date={endTime}
        setDate={setEndTime}
        minTime={startTime}
        // Additional logic as needed
      />
      <TimePickerSelect
        picker="minutes"
        date={endTime}
        setDate={setEndTime}
        minTime={startTime}

        // Additional logic as needed
      />
    </div>
  )

  return (
    <div className="flex flex-col justify-center gap-3">
      <div className="flex flex-col gap-2 text-center">
        <Label className="text-xs">Start Time</Label>
        {renderStartTimePicker()}
      </div>

      {startTime && (
        <>
          <div className="flex justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <div className="flex flex-col gap-2 text-center">
            <Label className="text-xs">End Time</Label>
            {renderEndTimePicker()}
          </div>
        </>
      )}
    </div>
  )
}
