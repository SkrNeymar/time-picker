"use client"

import React, { useEffect } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { TimeRangePicker } from "./time-range-picker"

export function TimeRangeDemo() {
  const [date, setDate] = React.useState<Date>()
  const [startTime, setStartTime] = React.useState<Date>()
  const [endTime, setEndTime] = React.useState<Date>()

  useEffect(() => {
    // if endTime is earlier than startTime, set endTime to startTime
    if (startTime && endTime && endTime < startTime) {
      setEndTime(startTime)
    }
  }, [endTime])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !startTime && "text-muted-foreground"
          )}
        >
          <Clock className="w-4 h-4 mr-2" />
          {startTime && endTime ? (
            format(startTime, "HH:mm") + "-" + format(endTime, "HH:mm")
          ) : (
            <span>Pick a time range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="p-3 border-t border-border">
          <TimeRangePicker
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
