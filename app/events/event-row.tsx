'use client'

import { TableCell, TableRow } from "@/components/ui/table"
import { EventSummaryType } from "@/lib/types"
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export function EventRow({ event }: { event: EventSummaryType }) {
  const router = useRouter()

  const handleRowClick = () => {
    router.push(`/event/${event.id}`)
  }

  return (
    <TableRow onClick={handleRowClick} className="cursor-pointer">
      <TableCell className="font-medium">
        <Image src={event.image} alt={event.name} width={80} height={80} className="rounded-md" />
      </TableCell>
      <TableCell>
        <div className="font-semibold">{event.name}</div>
        <div className="text-sm text-gray-500 md:hidden">{event.venue}</div>
        <div className="text-sm text-gray-500 md:hidden">
          {event.category} • {event.date}
        </div>
        {/* TODO: make this 3 rows with date pushed to right */}
      </TableCell>
      <TableCell className="hidden md:table-cell">{event.category}</TableCell>
      <TableCell className="hidden md:table-cell">{event.venue}</TableCell>
      <TableCell className="hidden md:table-cell">{event.date}</TableCell>
    </TableRow>
  )
}

