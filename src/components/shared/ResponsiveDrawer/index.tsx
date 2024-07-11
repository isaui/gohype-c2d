"use client"

import { useMediaQuery } from "@/components/hooks/useMediaQuery"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { cn } from "@/lib/utils"
import { useState } from "react"

type ResponsiveDrawerProps = {
    trigger: React.ReactNode
    children: React.ReactNode
    className?: string
}

type ResponsiveDrawerFooterProps = {
    children?: React.ReactNode
    className?: string
}

export const ResponsiveDrawerFooter: React.FC<ResponsiveDrawerFooterProps> = ({children, className}) => {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    if(isDesktop){
        return <DialogFooter className={className}>
            {children}
        </DialogFooter>
    }

    return <DrawerFooter className={className}>
        {children}
    </DrawerFooter>
}

type ResponsiveDrawerHeaderProps = {
    children?: React.ReactNode
    className?: string
}

export const ResponsiveDrawerHeader: React.FC<ResponsiveDrawerHeaderProps> = ({ children, className }) => {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    
    if (isDesktop) {
        return <DialogHeader className={className}>{children}</DialogHeader>
    }
    
    return <DrawerHeader className={className}>{children}</DrawerHeader>
}

type ResponsiveDrawerTitleProps = {
    children?: React.ReactNode
    className?: string
}

export const ResponsiveDrawerTitle: React.FC<ResponsiveDrawerTitleProps> = ({ children, className }) => {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    
    if (isDesktop) {
        return <DialogTitle className={className}>{children}</DialogTitle>
    }
    
    return <DrawerTitle className={className}>{children}</DrawerTitle>
}

type ResponsiveDrawerCloseProps = {
    children?: React.ReactNode
    className?: string
}

export const ResponsiveDrawerClose: React.FC<ResponsiveDrawerCloseProps> = ({children, className}) => {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    if(isDesktop){
        return <DialogClose className={className} asChild>{children}</DialogClose>
    }
    return <DrawerClose className={className} asChild>{children}</DrawerClose>
}

const ResponsiveDrawer: React.FC<ResponsiveDrawerProps> = ({children, trigger, className}) => {
    const [open, setOpen] = useState<boolean>(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              {trigger}
            </DialogTrigger>
            <DialogContent className={cn("sm:max-w-[425px]", className)}>
              {children}
            </DialogContent>
          </Dialog>
        )
      }
     
      return (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            {trigger}
          </DrawerTrigger>
          <DrawerContent className={className}>
            {children}
          </DrawerContent>
        </Drawer>
      )
}

export default ResponsiveDrawer