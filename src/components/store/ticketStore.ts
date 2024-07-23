import { TicketData } from '@/types'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface CustomerData {
  fullName: string
  gender: 'Male' | 'Female'
  yearOfBirth: string
  whatsappNumber: string
  email: string
}

interface TicketStore {
  ticketData: TicketData
  setTicketData: (data: TicketData) => void
  totalPrice: number
  setTotalPrice: (price: number) => void
  customerData: CustomerData[]
  setCustomerData: (data: CustomerData[]) => void
  isInitialized: boolean
  setIsInitialized: (initialized: boolean) => void
}

const useTicketStore = create<TicketStore>()(
  persist(
    (set) => ({
      ticketData: { label: 'Pax', price: '0', count: 0 },
      setTicketData: (data) => set({ ticketData: data }),
      totalPrice: 0,
      setTotalPrice: (price) => set({ totalPrice: price }),
      customerData: [],
      setCustomerData: (data) => set({ customerData: data }),
      isInitialized: false,
      setIsInitialized: (initialized) => set({ isInitialized: initialized }),
    }),
    {
      name: 'ticket-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setIsInitialized(true);
      },
    }
  )
)

export { useTicketStore }
