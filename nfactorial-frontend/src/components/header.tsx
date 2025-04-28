"use client"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex md:pl-10">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Rick & Morty Website</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/characters" className={`${isActive("/characters") && "underline"}`}>Characters</Link>
            <Link href="/episodes" className={`${isActive("/episodes") && "underline"}`}>Episodes</Link>
            <Link href="/locations" className={`${isActive("/locations") && "underline"}`}>Location</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}