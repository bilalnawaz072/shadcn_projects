"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export  function SearchInputButton() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2 mt-5">
      <Input type="search" placeholder="Search for Images" />
      <Button type="submit">Search</Button>
    </div>
  )
}
