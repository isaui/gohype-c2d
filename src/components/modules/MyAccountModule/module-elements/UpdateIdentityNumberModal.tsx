"use client"
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const identitySchema = z.object({
  idType: z.enum(["KTP", "Passport", "SIM"]),
  idNumber: z.string().min(5, {
    message: "ID Number must be at least 5 characters.",
  }),
});

type IdentityData = z.infer<typeof identitySchema>;

type UpdateIdentityNumberModalProps = {
  children: React.ReactNode
}

const UpdateIdentityNumberModal: React.FC<UpdateIdentityNumberModalProps> = ({children}) => {
  const [open, setOpen] = useState(false);
  const form = useForm<IdentityData>({
    resolver: zodResolver(identitySchema),
    defaultValues: {
      idType: "KTP",
      idNumber: "12123490291",
    },
  });
  const { control, handleSubmit } = form;
  
  const onSubmit: SubmitHandler<IdentityData> = (data) => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-md">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle className="text-left">Update Identity Number</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <FormField
                control={control}
                name="idNumber"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Identity Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Identity Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="idType"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Identity Type</FormLabel>
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
  );
};

export default UpdateIdentityNumberModal;