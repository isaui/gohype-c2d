import { Database } from "@/types.supabase";

type TicketType = 'Booking' | 'Regular' | 'Addons' | 'Package';
interface TicketState {
  Booking: any[];
  Regular: any[];
  Addons: any[];
  Package: any[];
}
type TicketAction = {
  type: 'GROUP_TICKETS';
  payload: any[];
};
const initialState: TicketState = {
  Booking: [],
  Regular: [],
  Addons: [],
  Package: [],
};

interface BookingData {
    booking_ticket: Database['public']['Tables']['booking_ticket']['Row'];
  }
interface RegularData {
    regular_ticket: Database['public']['Tables']['regular_ticket']['Row']
}
  
export function applyDiscount(price: number, discountType: string, discountUnit: number): number {
    if (discountType === 'PERCENTAGE') {
      return price * (1 - discountUnit / 100);
    } else if (discountType === 'FIXED') {
      return Math.max(0, price - discountUnit);
    }
    return price;
}

export interface PriceResult {
    lowestPrice: number;
    discountType: string;
    discountUnit: number;
  }

const defaultResult: PriceResult = {
    lowestPrice: 0,
    discountType: 'PERCENTAGE',
    discountUnit: 0
  };

  export function getLowestPriceAndDiscountTicketBooking(data?: BookingData): PriceResult {
    if (!data || !data.booking_ticket) {
      return defaultResult;
    }
  
    const ticket = data.booking_ticket;
    const prices = [
      { price: ticket.evening_weekend_price ?? 0, discountType: ticket.evening_weekend_discount_type, discountUnit: ticket.evening_weekend_discount_unit },
      { price: ticket.morning_weekend_price ?? 0, discountType: ticket.morning_weekend_discount_type, discountUnit: ticket.morning_weekend_discount_unit },
      { price: ticket.evening_weekdays_price ?? 0, discountType: ticket.evening_weekdays_discount_type, discountUnit: ticket.evening_weekdays_discount_unit },
      { price: ticket.morning_weekdays_price ?? 0, discountType: ticket.morning_weekdays_discount_type, discountUnit: ticket.morning_weekdays_discount_unit },
      { price: ticket.afternoon_weekend_price ?? 0, discountType: ticket.afternoon_weekend_discount_type, discountUnit: ticket.afternoon_weekend_discount_unit },
      { price: ticket.afternoon_weekdays_price ?? 0, discountType: ticket.afternoon_weekdays_discount_type, discountUnit: ticket.afternoon_weekdays_discount_unit },
    ].map(item => ({
      ...item,
      discountedPrice: applyDiscount(item.price, item.discountType ?? 'PERCENTAGE', item.discountUnit ?? 0)
    }));
  
    const lowestPriceData = prices.reduce((lowest, current) => 
      current.discountedPrice < lowest.discountedPrice ? current : lowest
    );
  
    return {
      lowestPrice: lowestPriceData.discountedPrice,
      discountType: lowestPriceData.discountType ?? 'PERCENTAGE',
      discountUnit: lowestPriceData.discountUnit ?? 0,
    };
  }
  
  export function getLowestPriceAndDiscountRegularTicket(data?: RegularData): PriceResult {
    if (!data || !data.regular_ticket) {
      return defaultResult;
    }
  
    const ticket = data.regular_ticket;
    const prices = [
      { price: ticket.weekend_price ?? 0, discountType: ticket.weekend_discount_type, discountUnit: ticket.weekend_discount_unit },
      { price: ticket.weekdays_price ?? 0, discountType: ticket.weekdays_discount_type, discountUnit: ticket.weekdays_discount_unit },
    ].map(item => ({
      ...item,
      discountedPrice: applyDiscount(item.price, item.discountType ?? 'PERCENTAGE', item.discountUnit ?? 0)
    }));
  
    const lowestPriceData = prices.reduce((lowest, current) => 
      current.discountedPrice < lowest.discountedPrice ? current : lowest
    );
  
    return {
      lowestPrice: lowestPriceData.discountedPrice,
      discountType: lowestPriceData.discountType ?? 'PERCENTAGE',
      discountUnit: lowestPriceData.discountUnit ?? 0,
    };
  }

  export function getLowestPriceFromAllTickets(
    bookingTickets?: BookingData[],
    regularTickets?: RegularData[]
  ): PriceResult {
    const defaultResult: PriceResult = {
      lowestPrice: 0,
      discountType: 'PERCENTAGE',
      discountUnit: 0
    };
  
    if (!bookingTickets?.length && !regularTickets?.length) {
      return defaultResult;
    }
  
    const bookingPrices = bookingTickets?.map(getLowestPriceAndDiscountTicketBooking) ?? [];
    const regularPrices = regularTickets?.map(getLowestPriceAndDiscountRegularTicket) ?? [];
  
    const allPrices = [...bookingPrices, ...regularPrices];
  
    if (allPrices.length === 0) {
      return defaultResult;
    }
  
    return allPrices.reduce((lowest, current) => 
      current.lowestPrice < lowest.lowestPrice ? current : lowest
    );
  }

export function ticketReducer(state: TicketState = initialState, action: TicketAction): TicketState {
  switch (action.type) {
    case 'GROUP_TICKETS':
      return action.payload.reduce((acc, ticket) => {
        if (ticket.ticket_type in acc) {
          return {
            ...acc,
            [ticket.ticket_type]: [...acc[ticket.ticket_type as TicketType], ticket]
          };
        }
        return acc;
      }, { ...state });
    default:
      return state;
  }
}
