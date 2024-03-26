"use client"

import * as React from "react"
import { TimeRangeDemo } from "./time-range-demo"

export function TimeRangeWrapper() {
  const [date, setDate] = React.useState<Date>()
  return <TimeRangeDemo />
}
