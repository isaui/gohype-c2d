export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      order: {
        Row: {
          amount: number
          created_at: string | null
          customer: string | null
          id: string
          order_num: number
          ticket: string | null
          ticket_total: number
        }
        Insert: {
          amount?: number
          created_at?: string | null
          customer?: string | null
          id?: string
          order_num?: number
          ticket?: string | null
          ticket_total?: number
        }
        Update: {
          amount?: number
          created_at?: string | null
          customer?: string | null
          id?: string
          order_num?: number
          ticket?: string | null
          ticket_total?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_customer_fkey"
            columns: ["customer"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_customer_fkey1"
            columns: ["customer"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_ticket_fkey"
            columns: ["ticket"]
            isOneToOne: false
            referencedRelation: "ticket"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket: {
        Row: {
          id: string
          single_pax_price: number
          ticket_banner_url: string | null
          ticket_description: string
          ticket_end_date: string | null
          ticket_name: string
          ticket_num: number
          ticket_path: string | null
          ticket_quota: number | null
          ticket_start_date: string | null
        }
        Insert: {
          id?: string
          single_pax_price?: number
          ticket_banner_url?: string | null
          ticket_description?: string
          ticket_end_date?: string | null
          ticket_name?: string
          ticket_num?: number
          ticket_path?: string | null
          ticket_quota?: number | null
          ticket_start_date?: string | null
        }
        Update: {
          id?: string
          single_pax_price?: number
          ticket_banner_url?: string | null
          ticket_description?: string
          ticket_end_date?: string | null
          ticket_name?: string
          ticket_num?: number
          ticket_path?: string | null
          ticket_quota?: number | null
          ticket_start_date?: string | null
        }
        Relationships: []
      }
      ticket_holder: {
        Row: {
          checked_in_date: string | null
          email: string | null
          fullname: string | null
          gender: Database["public"]["Enums"]["gender"]
          id: string
          order: string | null
          status: Database["public"]["Enums"]["ticket_holder_status"]
          wa_number: string | null
          year_of_birth: number | null
        }
        Insert: {
          checked_in_date?: string | null
          email?: string | null
          fullname?: string | null
          gender?: Database["public"]["Enums"]["gender"]
          id?: string
          order?: string | null
          status?: Database["public"]["Enums"]["ticket_holder_status"]
          wa_number?: string | null
          year_of_birth?: number | null
        }
        Update: {
          checked_in_date?: string | null
          email?: string | null
          fullname?: string | null
          gender?: Database["public"]["Enums"]["gender"]
          id?: string
          order?: string | null
          status?: Database["public"]["Enums"]["ticket_holder_status"]
          wa_number?: string | null
          year_of_birth?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ticket_holder_order_fkey"
            columns: ["order"]
            isOneToOne: false
            referencedRelation: "order"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          display_name: string | null
          email: string | null
          id: string
          phone_num: string | null
          role: Database["public"]["Enums"]["role"] | null
        }
        Insert: {
          display_name?: string | null
          email?: string | null
          id: string
          phone_num?: string | null
          role?: Database["public"]["Enums"]["role"] | null
        }
        Update: {
          display_name?: string | null
          email?: string | null
          id?: string
          phone_num?: string | null
          role?: Database["public"]["Enums"]["role"] | null
        }
        Relationships: [
          {
            foreignKeyName: "user_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_user_exists: {
        Args: {
          check_email: string
        }
        Returns: boolean
      }
      get_orders: {
        Args: {
          p_ticket_path: string
          p_search: string
          p_offset: number
          p_limit: number
        }
        Returns: {
          order_data: Json
          total_count: number
        }[]
      }
    }
    Enums: {
      gender: "Male" | "Female"
      order_status: "Pending" | "Success"
      role: "ADMIN" | "USER"
      ticket_holder_status: "CHECKED_IN" | "NOT_CHECKED_IN" | "CHECKED_OUT"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
