"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { MenuIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"

const menuOptions = [
    {
        name: "Home",
        link: '/'
    },
    {
        name: "About Me",
        link: '/',
        subcategories: [
          {
            name: 'Educator',
            link: '/aboutme/educator',
          },
          {
            name: 'Storyteller',
            link: '/aboutme/storyteller',
          },
          {
            name: 'Social Worker',
            link: '/aboutme/social-worker',
          },
          {
            name: 'Traveller',
            link: '/aboutme/traveller',
          },
        ]
    },
    {
      name: "Books",
      link: '/books'
    },
    {
        name: "Portfolio",
        link: '/'
    },
    {
        name: "Blog",
        link: '/'
    },
    {
        name: "Contact",
        link: '/'
    },
]

export function NavigationMenuDemo() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  const handleLinkClick = () => {
    setOpen(false)
  }

  return (
    <div className='my-20 md:my-2'>
      <div className='hidden sticky top-0 md:flex justify-between items-center w-screen bg-white shadow-sm py-4 z-[50]'>
        <Link href="/">
          <div className='border rounded-lg flex text-center ml-6 bg-primary w-12 h-12 items-center justify-center'>
            <p className='text-2xl text-white font-bold px-2'>P</p>
          </div>
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            {menuOptions.map((menuOption, i) => (
              !menuOption.subcategories ? (
                <NavigationMenuItem key={i}>
                  <Link href={menuOption.link} legacyBehavior passHref>
                    <NavigationMenuLink 
                      className={cn(
                        navigationMenuTriggerStyle(),
                        pathname === menuOption.link && "text-primary"
                      )}
                    >
                      {menuOption.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={i}>
                  <NavigationMenuTrigger>{menuOption.name}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {menuOption.subcategories.map((subcategory, idx) => (
                      <ListItem 
                        key={idx} 
                        href={subcategory.link}
                        className={pathname === subcategory.link ? "text-primary" : ""}
                      >
                        {subcategory.name}
                      </ListItem>
                    ))}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div/>
      </div>
    
      <div className='block md:hidden absolute left-4 top-4'>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button className='w-12 h-12 p-0' variant="ghost">
              <MenuIcon/>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className='px-0'>
            <SheetHeader className='text-xl mb-10'>Menu</SheetHeader>
            {menuOptions.map((menuOption, i) => (
              menuOption.subcategories ? (
                <div key={i} className="flex flex-col">
                  <p className='py-4 px-8 rounded font-semibold'>{menuOption.name}</p>
                  <div className="pl-8">
                    {menuOption.subcategories.map((subcategory, idx) => (
                      <Link 
                        href={subcategory.link} 
                        key={idx} 
                        onClick={handleLinkClick}
                        className={cn(
                          'block py-2 px-4 rounded text-muted-foreground',
                          pathname === subcategory.link && "text-primary"
                        )}
                      >
                        {subcategory.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link 
                  href={menuOption.link} 
                  key={i} 
                  onClick={handleLinkClick}
                  className={cn(
                    'block py-4 px-8 rounded',
                    pathname === menuOption.link && "text-primary"
                  )}
                >
                  {menuOption.name}
                </Link>
              )
            ))}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { href: string }
>(({ className, children, href, ...props }, ref) => {
  return (
    <NavigationMenuLink asChild>
      <Link
        ref={ref}
        href={href}
        className={cn(
          "block select-none space-y-1 p-3 leading-none no-underline outline-none transition-colors hover:bg-primary-light-faded hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{children}</div>
      </Link>
    </NavigationMenuLink>
  )
})
ListItem.displayName = "ListItem"

export default ListItem
