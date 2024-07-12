"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Check, ChevronRight } from "lucide-react"
import * as z from "zod"
import PasswordStrengthIndicator from "./PasswordStrengthIndicator"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import React, { useState } from "react"

const passwordSchema = z.object({
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must not exceed 50 characters")
    .refine(
      (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
      "Password must include at least one special character"
    ),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type PasswordModalProps = {
  children: React.ReactNode
}

export default function PasswordModal({ children }: PasswordModalProps) {
  const [open, setOpen] = useState(false)
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const password = form.watch("password")

  function onSubmit(values: z.infer<typeof passwordSchema>) {
    console.log(values)
    setOpen(false) // Close the dialog after submission
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-md">
        <DialogHeader>
          <DialogTitle className="text-left">
            Update Password
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-2 py-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Create new password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <PasswordStrengthIndicator password={password} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Retype new password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <div className="flex w-full">
                <div className="flex items-center space-x-2 w-fit ml-auto">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary" className="border-none">
                      Close
                    </Button>
                  </DialogClose>
                  <Button type="submit">Save</Button>
                </div>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
