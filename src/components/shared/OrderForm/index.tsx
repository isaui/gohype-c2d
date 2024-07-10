"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"


// Definisikan skema validasi menggunakan zod
const formSchema = z.object({
  companions: z.array(
    z.object({
      name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
      }),
      idType: z.enum(["KTP", "Passport", "SIM"]),
      idNumber: z.string().min(5, {
        message: "ID Number must be at least 5 characters.",
      }),
      gender: z.enum(["Male", "Female"]),
      whatsapp: z.string().min(10, {
        message: "WhatsApp number must be at least 10 characters.",
      }),
    })
  ),
  children: z.array(
    z.object({
      name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
      }),
      age: z.preprocess((val) => Number(val), z.number().min(1, {
        message: "Age must be at least 1 year.",
      })),
      gender: z.enum(["Male", "Female"]),
    })
  ),
})

type FormData = z.infer<typeof formSchema>

export default function OrderForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companions: [{ name: "", idType: "KTP", idNumber: "", gender: "Male", whatsapp: "" }],
      children: [{ name: "", age: 1, gender: "Male" }],
    },
  })

  const { control, handleSubmit } = form

  const { fields: companionFields, append: appendCompanion } = useFieldArray({
    control,
    name: "companions",
  })

  const { fields: childrenFields, append: appendChild } = useFieldArray({
    control,
    name: "children",
  })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data); // Lakukan sesuatu dengan data jika diperlukan
    // Buat elemen <a> baru
    const newLink = document.createElement('a');
    newLink.href = '/payment';
    newLink.textContent = '';
    newLink.style.display = 'none';

    // Tambahkan elemen <a> ke dalam DOM
    document.body.appendChild(newLink);

    // Klik elemen <a> secara otomatis
    if (newLink) {
      newLink.click();
    }
    document.body.removeChild(newLink);

  };
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-0 space-y-1  w-full">
        <div className="flex flex-col w-full bg-white px-4 md:px-0 py-4 md:py-0 mb-1 md:mb-0 pb-4 md:pb-6">
        <h2 className=" text-lg md:text-3xl font-semibold mb-1">Your Order: </h2>
        <h2 className=" text-lg md:text-3xl font-semibold mb-2">Please Fill Out the Following Form</h2>
        <p className=" text-secondary mb-1">The process is quick and easy, less than 30 seconds...</p>
        <p>👇👇👇</p>
        </div>
        <div className="flex flex-col w-full">
        <div className="flex flex-col space-y-1 md:space-y-0 w-full">
        {companionFields.map((item, index) => (
          <div className={`w-full bg-white px-4 md:px-0 md:py-0 py-4 flex flex-col gap-4`} key={item.id}>
            <h3 className=" text-primary font-semibold">Companion {index + 1}</h3>
            <FormField
              control={control}
              name={`companions.${index}.name`}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Companion Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Companion Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2">
            <FormLabel className="">Companions Identification Number</FormLabel>
            <div className="flex gap-4">
            <FormField
                control={control}
                name={`companions.${index}.idType`}
                render={({ field }) => (
                <FormItem style={{ width: '30%' }}>
                    <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                        <SelectValue placeholder="Select ID Type" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="KTP">KTP</SelectItem>
                        <SelectItem value="Passport">Passport</SelectItem>
                        <SelectItem value="SIM">SIM</SelectItem>
                        </SelectContent>
                    </Select>
                    </FormControl>
                </FormItem>
                )}
             />
        <FormField
        control={control}
    name={`companions.${index}.idNumber`}
    render={({ field }) => (
      <FormItem style={{ width: '70%' }}>
        <FormControl>
          <Input placeholder="ID Number" {...field} />
        </FormControl>
      </FormItem>
    )}
  />
            </div>
            <FormMessage />
            </div>
            
            <FormField
              control={control}
              name={`companions.${index}.gender`}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`companions.${index}.whatsapp`}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>WhatsApp Number</FormLabel>
                  <FormControl>
                    <Input placeholder="WhatsApp Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
        
        </div>
        <div className="flex w-full px-4 md:px-0 py-4 md:py-5 bg-white">
        <p className="text-sm bg-clip-text font-semibold bg-primary text-transparent" onClick={() => appendCompanion({ name: "", idType: "KTP", idNumber: "", gender: "Male", whatsapp: "" })}>
          + Add Companion
        </p>
        </div>
        </div>
        <div className="flex flex-col w-full">
        <div className="flex flex-col space-y-1 md:space-y-0 w-full">
        {childrenFields.map((item, index) => (
          <div className="w-full bg-white px-4 md:px-0 py-4 flex flex-col gap-4 md:py-0" key={item.id}>
            <h3 className=" text-primary font-semibold">Child {index + 1}</h3>
            <FormField
              control={control}
              name={`children.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Childs Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Child's Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`children.${index}.age`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Childs Age</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Child's Age" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`children.${index}.gender`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
        </div>
        <div className="flex w-full px-4 md:px-0 md:py-5 py-4 bg-white">
        <p className="text-sm bg-clip-text font-semibold bg-primary text-transparent" 
        onClick={() => appendChild({ name: "", age: 1, gender: "Male" })}>
          + Add Child
        </p>
        </div>
       
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-start px-4 bg-white py-4">
        <div className="flex flex-col space-y-1">
                        <Label className=" text-secondary font-light">Harga Total</Label>
                        <div className="">
                        <Accordion type="single" collapsible className=" w-full no-underline">
                        <AccordionItem className=" no-underline p-0 hover:no-underline border-0" value="item-1">
                            <AccordionTrigger className=" no-underline hover:no-underline max-w-44  p-0">
                                <Label className=" text-2xl text-tertiary font-bold">IDR 180.000</Label>
                                </AccordionTrigger>
                            <AccordionContent className="hover:no-underline">
                            <div className="flex flex-col space-y-1 mt-2">
                            <Label className="text-secondary">2 x Tickets for 1 Hour of Play</Label>
                            </div>
                            </AccordionContent>
                        </AccordionItem>
                        </Accordion>
                        </div>
                    </div>
          <div className="grid md:flex mt-1">
          <Button className="bg-primary ml-2">Proceed to Payment</Button>
        </div>
        </div>
        
        
      </form>
    </Form>
  )
}
