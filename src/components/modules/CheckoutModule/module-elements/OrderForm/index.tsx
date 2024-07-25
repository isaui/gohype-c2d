'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  useWatch,
} from 'react-hook-form';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { z } from 'zod';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useTicketStore } from '@/components/store/ticketStore';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { useNavbarStore } from '@/components/store/navbarStore';
import { useToast } from '@/components/ui/use-toast';
import { TicketType } from '@/types';

const ticketSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters.' }),
  gender: z.enum(['Male', 'Female']),
  yearOfBirth: z
    .string()
    .regex(/^\d{4}$/, { message: 'Year of birth must be a 4-digit number.' }),
  whatsappNumber: z
    .string()
    .min(8, { message: 'WhatsApp number must be at least 8 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
});

const formSchema = z.object({
  tickets: z.array(ticketSchema),
});

type FormData = z.infer<typeof formSchema>;

type OrderFormProps = {
  ticketName?: string;
  ticketId?: string;
  ticketPath?: string;
};

const OrderForm: React.FC<OrderFormProps> = ({
  ticketName = '',
  ticketId = '',
  ticketPath = '',
}) => {
  const {
    ticketData,
    totalPrice,
    setTotalPrice,
    customerData,
    setCustomerData,
    isInitialized,
  } = useTicketStore();
  const { setIsAuthDialogOpen } = useNavbarStore();
  const [isLoading, setIsLoading] = useState(true);
  const isInitialMount = useRef(true);
  const [triggerWidth, setTriggerWidth] = useState<string>('auto');
  const priceRef = useRef<HTMLSpanElement>(null);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tickets: [],
    },
  });
  const router = useRouter();
  const { toast } = useToast();

  const { control, handleSubmit } = form;

  const { fields, replace } = useFieldArray({
    control,
    name: 'tickets',
  });

  const watchedFields = useWatch({
    control,
    name: 'tickets',
  });

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (watchedFields.length > 0) {
      setCustomerData(watchedFields);
    }
  }, [watchedFields]);

  useEffect(() => {
    if (priceRef.current) {
      setTriggerWidth(`${priceRef.current.offsetWidth + 24}px`);
    }
  }, [totalPrice, priceRef.current]);

  const initializeForm = () => {
    let newTickets = [];
    if (ticketData.count > 0) {
      newTickets = Array(ticketData.count).fill({
        fullName: '',
        gender: 'Male',
        yearOfBirth: '',
        whatsappNumber: '',
        email: '',
      });

      if (customerData.length > 0) {
        for (
          let i = 0;
          i < Math.min(ticketData.count, customerData.length);
          i++
        ) {
          newTickets[i] = { ...customerData[i] };
        }
      }
    } else if (customerData.length > 0) {
      newTickets = [...customerData];
    }

    replace(newTickets);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isInitialized) {
      initializeForm();
    }
  }, [isInitialized]);

  useEffect(() => {
    const newTotalPrice = ticketData.count * parseInt(ticketData.price);
    setTotalPrice(newTotalPrice);
  }, [ticketData, setTotalPrice]);

  const sendTicketEmail = async (
    email: string,
    ticketBannerUrl: string,
    tickets: TicketType[],
  ) => {
    try {
      await fetch('/api/send-tickets', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          ticketBannerUrl: ticketBannerUrl,
          tickets: tickets,
        }),
      });
    } catch (err: any) {
      console.log(err);
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (totalPrice <= 0) {
      const supabase = createClient();
      const { data: userRes, error } = await supabase.auth.getUser();
      alert('DATA USER?');
      if (error) {
        console.log(error);
      }
      if (userRes.user) {
        toast({
          description: 'Tunggu sebentar ya, lagi checkout-in order kamu...',
        });
        const { data: order } = await supabase
          .from('order')
          .insert({
            amount: totalPrice,
            ticket_total: ticketData.count,
            ticket: ticketId,
            customer: userRes.user.id,
          })
          .select('*, ticket(*)')
          .single();

        const ticketHolders = data.tickets.map((holder) => ({
          email: holder.email,
          fullname: holder.fullName,
          gender: holder.gender,
          order: order?.id,
          wa_number: holder.whatsappNumber,
          year_of_birth: holder.yearOfBirth,
        }));
        const response = await supabase
          .from('ticket_holder')
          .insert(ticketHolders as any)
          .select('*, order(*, ticket(*))');
        if (userRes.user.email) {
          await sendTicketEmail(
            userRes.user.email,
            order?.ticket?.ticket_banner_url || '',
            response.data?.map((ticket) => ({
              id: ticket.id || '',
              title: ticket.order?.ticket?.ticket_name || '',
              recipient: ticket.fullname || '',
              startDate: ticket.order?.ticket?.ticket_start_date || '',
              endDate: ticket.order?.ticket?.ticket_end_date || '',
            })) || [],
          );
        }
        if (!response.error) {
          toast({ description: 'Berhasil order tiket' });
          router.push('/my-tickets');
          return;
        }
      } else {
        setIsAuthDialogOpen(true);
      }
    } else handleNavigationToPayment();
  };

  const handleNavigationToPayment = () => {
    router.push('/' + ticketPath + '/payment');
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        {[...Array(ticketData.count || 1)].map((_, index) => (
          <div key={index} className="space-y-2 mt-4">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
        <div className="mt-4">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-8 w-[200px] mt-2" />
        </div>
        <Skeleton className="h-10 w-[150px] mt-4" />
      </div>
    );
  }

  const displayPrice =
    totalPrice === 0 ? 'Free' : `Rp ${totalPrice.toLocaleString('id-ID')}`;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-0 space-y-1 w-full">
        <div className="flex flex-col w-full bg-white px-4 md:px-0 py-4 md:py-0 mb-1 md:mb-0 pb-4 md:pb-6">
          <h2 className="text-lg md:text-3xl font-semibold mb-1">
            Your Order:{' '}
          </h2>
          <h2 className="text-lg md:text-3xl font-semibold mb-2">
            Please Fill Out the Following Form
          </h2>
          <p className="text-secondary mb-1">
            The process is quick and easy, less than 30 seconds...
          </p>
          <p>👇👇👇</p>
        </div>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-col w-full bg-white px-4 md:px-0 py-4 md:py-0 mb-4"
          >
            <h3 className="text-primary font-semibold mb-4">
              Ticket {index + 1}
            </h3>

            <FormField
              control={control}
              name={`tickets.${index}.fullName`}
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`tickets.${index}.gender`}
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`tickets.${index}.yearOfBirth`}
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Year of Birth</FormLabel>
                  <FormControl>
                    <Input placeholder="Year of Birth" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`tickets.${index}.whatsappNumber`}
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Whatsapp Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Whatsapp Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`tickets.${index}.email`}
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}

        <div className="flex flex-col w-full px-4 md:px-0 md:flex-row md:justify-between md:items-start bg-white py-4">
          <div className="flex flex-col space-y-1">
            <Label className="text-secondary font-light">Total Price</Label>
            <Accordion
              type="single"
              collapsible
              className="w-full no-underline"
            >
              <AccordionItem
                className="no-underline p-0 hover:no-underline border-0"
                value="item-1"
              >
                <AccordionTrigger
                  className="no-underline hover:no-underline p-0"
                  style={{ maxWidth: triggerWidth }}
                >
                  <Label className="text-2xl text-tertiary font-bold">
                    <span ref={priceRef}>{displayPrice}</span>
                  </Label>
                </AccordionTrigger>
                <AccordionContent className="hover:no-underline">
                  <div className="flex flex-col space-y-1 mt-2">
                    <Label className="text-secondary">
                      {ticketData.count} x {ticketName}
                    </Label>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="grid md:flex mt-1">
            <Button type="submit" className="bg-primary md:ml-2 w-full">
              {totalPrice == 0 ? 'Create Order' : 'Proceed to Payment'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default OrderForm;
