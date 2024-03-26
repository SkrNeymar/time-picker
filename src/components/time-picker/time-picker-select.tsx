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
    let minLimit = 0
    let maxLimit = picker === "hours" ? 23 : 59

    if (minTime) {
      minLimit = picker === "hours" ? minTime.getHours() : minTime.getMinutes()
    }

    setSelectedValue(minLimit.toString())
  }, [picker, minTime])

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
      minLimit = picker === "hours" ? minTime.getHours() : minTime.getMinutes()
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
