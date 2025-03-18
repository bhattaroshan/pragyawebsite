"use client"

import * as React from "react"
import Link from "next/link"

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
import { DialogTitle } from "@radix-ui/react-dialog"


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
  return (
    <div className=''>
    <div className='hidden sticky top-0 md:flex justify-between items-center w-screen bg-white shadow-sm py-4 z-[50]'>
        <Link href="/">
            <div className='border rounded-lg flex text-center ml-6 bg-primary w-12 h-12 items-center justify-center'>
                <p className='text-2xl text-white font-bold px-2'>P</p>
            </div>
        </Link>
        <NavigationMenu >
            <NavigationMenuList>
            {
                menuOptions.map((menuOption,i)=>(
                    !menuOption.subcategories ?
                    <NavigationMenuItem key={i}>
                        <Link href={menuOption.link} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            {menuOption.name}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    :
                    <NavigationMenuItem className='' key={i}>
                    <NavigationMenuTrigger className=''>{menuOption.name}</NavigationMenuTrigger>
                    <NavigationMenuContent className="">
                      {
                        menuOption.subcategories.map((subcategory,idx)=>{
                          return <ListItem key={idx} href={subcategory.link}>{subcategory.name}</ListItem>
                        })
                      }
                    </NavigationMenuContent>
            </NavigationMenuItem>
                ))
            }
            </NavigationMenuList>
        </NavigationMenu>
        <div/>
    </div>
    
    <div className='block md:hidden absolute left-4 top-4'>
            <Sheet>
                <SheetTrigger asChild>
                    <Button className='w-12 h-12 p-0' variant={"ghost"}>
                        <MenuIcon/>
                    </Button>
                </SheetTrigger>
                <SheetContent side={"left"} className='px-0'>
                    <SheetHeader className='text-xl mb-10'>Menu</SheetHeader>
                    <SheetTitle>{}</SheetTitle>
                    <SheetDescription>{""}</SheetDescription>
                    {
                        menuOptions.map((menuOption,i)=>(
                            // <SheetTrigger asChild key={i} className='hover:bg-gray-200'>
                                <Link href={menuOption.link} key={i}>
                                    <div className='flex flex-col text-xl'>
                                        <p className='py-4 px-8 rounded'>{menuOption.name}</p>
                                    </div>
                                </Link>
                            // </SheetTrigger>
                        ))
                    }
                </SheetContent>
            </Sheet>
        </div>
    </div>
  )
}

const ListItem = (({ className, title, children, href, ...props }:{className?:string,title?:string,children:React.ReactNode, href:string}) => {
  return (
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 p-3 leading-none no-underline outline-none transition-colors hover:bg-primary-light-faded hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </div>
        </Link>
      </NavigationMenuLink>
  )
})

// ListItem.displayName = "ListItem"


export default ListItem;
