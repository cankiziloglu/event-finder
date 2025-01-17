
import { Ticket } from 'lucide-react'
import { ModeToggle } from './theme-toggle'
import Link from 'next/link'

export function Header() {

  return (
    <header className="sticky top-0 z-40 w-full bg-background/5 backdrop-blur supports-[backdrop-filter]:bg-background/5">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <Ticket className="h-7 w-7 dark:text-primary text-primary-foreground" />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* You can add a search input here if needed */}
          </div>
          <nav className="flex items-center">
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}

