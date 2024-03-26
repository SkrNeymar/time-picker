import React, { useEffect, useState } from "react"
import { TimePickerType, setDateByType } from "./time-picker-utils"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { min } from "date-fns"

export interface TimePickerSelectProps {
  picker: TimePickerType
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  setEndDate?: (date: Date | undefined) => void
  minTime?: Date | undefined
}

const TimePickerSelect: React.FC<TimePickerSelectProps> = ({
  picker,
  date = new Date(new Date().setHours(0, 0, 0, 0)),
  setDate,
  setEndDate,
  minTime,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>("")

  useEffect(() => {
    const currentHour = date.getHours()
    const currentMinute = date.getMinutes()
    const minHour = minTime ? minTime.getHours() : 0
    const minMinute = minTime ? minTime.getMinutes() : 0

    if (picker === "hours" && currentHour < minHour) {
      setSelectedValue(minHour.toString())
    } else if (
      picker === "minutes" &&
      currentHour === minHour &&
      currentMinute < minMinute
    ) {
      setSelectedValue(minMinute.toString())
    } else {
      setSelectedValue(
        picker === "hours" ? currentHour.toString() : currentMinute.toString()
      )
    }
  }, [date, minTime, picker])

  const handleSelectChange = (value: string) => {
    setSelectedValue(value)
    const tempDate = new Date(date)
    setDate(setDateByType(tempDate, value, picker))
    if (setEndDate) {
      setEndDate(setDateByType(tempDate, value, picker))
    }
  }

  const generateOptions = () => {
    let options = []
    let minLimit = 0
    let maxLimit = picker === "hours" ? 23 : 59

    if (minTime) {
      if (picker === "hours") {
        minLimit = minTime.getHours()
      } else {
        minLimit =
          date.getHours() === minTime.getHours() ? minTime.getMinutes() : 0
      }
    }

    for (let i = minLimit; i <= maxLimit; i++) {
      options.push(
        <SelectItem key={i} value={i.toString()}>
          {i.toString().padStart(2, "0")}
        </SelectItem>
      )
    }

    return options
  }

  return (
    <Select onValueChange={handleSelectChange} value={selectedValue}>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder={`${picker}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>{generateOptions()}</SelectGroup>
      </SelectContent>
    </Select>
  )
}

export { TimePickerSelect }
