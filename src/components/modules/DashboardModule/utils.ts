import { createClient } from "@/utils/supabase/server";
import { Section } from "./interface";

export function convertToSection(input: string | undefined): Section {
    if (typeof input === "string") {
      const lowercaseInput = input.toLowerCase();
      if (lowercaseInput === "ticket" || lowercaseInput === "order") {
        return lowercaseInput as Section;
      }
    }
    return "order";
  }

export  function convertToPage(input: string | undefined): number {
    if (input === undefined) {
      return 1;
    }
  
    const parsedNumber = parseInt(input, 10);
  
    if (isNaN(parsedNumber)) {
      return 1;
    }
  
    return parsedNumber;
  }

  export async function fetchSummaryData(ticketPath: string) {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('order')
      .select(`
        id,
        ticket_total,
        ticket!inner(
          ticket_path
        ),
        ticket_holder(
          gender
        )
      `)
      .eq('ticket.ticket_path', ticketPath)
  
    if (error) {
      console.error('Error fetching summary data:', error)
      return {
        orders_count: 0,
        tickets_count: 0,
        male_count: 0,
        female_count: 0
      }
    }
  
    const orders_count = data.length
    const tickets_count = data.reduce((sum, order) => sum + (order.ticket_total || 0), 0)
  
    const gender_counts = data.flatMap(order => order.ticket_holder)
      .reduce((acc, curr) => {
        if (curr && curr.gender) {
          acc[curr.gender] = (acc[curr.gender] || 0) + 1
        }
        return acc
      }, {} as Record<string, number>)
  
    return {
      orders_count,
      tickets_count,
      male_count: gender_counts['Male'] || 0,
      female_count: gender_counts['Female'] || 0
    }
  }
  