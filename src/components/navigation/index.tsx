'use client'

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"
import { 
  Menu, 
  ChevronDown, 
  Home, 
  GraduationCap, 
  Code2, 
  BookOpen, 
  Plane, 
  Languages, 
  Music, 
  Briefcase, 
  User,
  Video,
  Book,
  PenTool,
} from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const routes = [
  {
    href: "/",
    label: "Home",
    icon: Home
  }, 
  {
    href: "/",
    label: "About Me",
    icon: GraduationCap,
    subItems: [
      {
        href: "/aboutme/educator",
        label: "Educator",
        icon: GraduationCap
      },
      {
        href: "/aboutme/storyteller",
        label: "Storyteller",
        icon: Book
      },
      {
        href: "/aboutme/social-worker",
        label: "Social Worker",
        icon: GraduationCap
      },
      {
        href: "/aboutme/traveller",
        label: "Traveller",
        icon: Plane
      },
    ]
  },
  {
    href: "/experience/academics",
    label: "Academics",
    icon: Briefcase
  },
  {
    href: "/books",
    label: "Books",
    icon: Book
  },
  {
    href: "/blog",
    label: "Blog",
    icon: PenTool
  },
  {
    href: "/contact",
    label: "Contact Me",
    icon: User
  },
]

function DesktopNav() {
  const pathname = usePathname()

  return (
  
    <NavigationMenu>
      <NavigationMenuList>
        {routes.map((route) => {
          if (route.subItems) {
            return (
              <NavigationMenuItem key={route.label}>
                <NavigationMenuTrigger className="inline-flex h-9 w-max items-center justify-center text-muted-foreground rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  {route.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-1 p-2">
                    {route.subItems.map((item) => (
                      <li key={item.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center gap-2 select-none rounded-sm px-2 py-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                              pathname === item.href
                                ? "bg-accent text-accent-foreground"
                                : "text-muted-foreground"
                            )}
                          >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )
          }
          return (
            <NavigationMenuItem key={route.href}>
              <Link
                href={route.href}
                className={cn(
                  "inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                  pathname === route.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {route.label}
              </Link>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function MobileNav() {
  const pathname = usePathname()
  const [openSubMenus, setOpenSubMenus] = React.useState<string[]>([])

  const toggleSubMenu = (label: string) => {
    setOpenSubMenus(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    )
  }

  return (
    <nav className="flex flex-col space-y-2 mt-4">
      {routes.map((route) => {
        if (route.subItems) {
          const isOpen = openSubMenus.includes(route.label)
          return (
            <div key={route.label} className="space-y-2">
              <button
                onClick={() => toggleSubMenu(route.label)}
                className="flex items-center justify-between w-full px-2 py-2 text-lg text-muted-foreground hover:text-primary"
              >
                <div className="flex items-center gap-2">
                  <route.icon className="h-5 w-5" />
                  {route.label}
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 transition-transform",
                  isOpen && "transform rotate-180"
                )} />
              </button>
              {isOpen && (
                <div className="pl-4 space-y-2">
                  {route.subItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 px-2 py-2 text-lg transition-colors hover:text-primary",
                        pathname === item.href
                          ? "font-medium text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        }
        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-2 px-2 py-2 text-lg transition-colors hover:text-primary",
              pathname === route.href
                ? "font-medium text-primary"
                : "text-muted-foreground"
            )}
          >
            <route.icon className="h-5 w-5" />
            {route.label}
          </Link>
        )
      })}
    </nav>
  )
}

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false)


  React.useEffect(()=>{
    setIsOpen(false);
  },[pathname])

  return (
    <header className="sticky md:z-[1000] bg-white top-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center p-0 md:p-4">
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <div className='relative flex items-center w-screen'>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
                <div className='absolute left-1/2 transform -translate-x-1/2'>
                  <Link href="/" className="text-primary font-bold">PRAGYA</Link>
                </div>
              </div>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] pr-0">
              <SheetHeader>
                <SheetTitle>Pragya Pokharel</SheetTitle>
                <SheetDescription>
                  {""}
                </SheetDescription>
              </SheetHeader>
              <MobileNav />
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden md:flex items-center space-x-4 justify-between w-screen">
          <Link href="/" className="text-primary font-bold">PRAGYA</Link>
          <DesktopNav />
          <div/>
        </div>
      </div>
    </header>
  )
} 