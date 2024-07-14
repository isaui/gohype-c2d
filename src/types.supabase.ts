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
      admin: {
        Row: {
          admin_name: string | null
          created_at: string
          id: string
        }
        Insert: {
          admin_name?: string | null
          created_at?: string
          id?: string
        }
        Update: {
          admin_name?: string | null
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      branch: {
        Row: {
          address: string
          branch_name: string
          created_at: string
          id: string
        }
        Insert: {
          address?: string
          branch_name?: string
          created_at?: string
          id?: string
        }
        Update: {
          address?: string
          branch_name?: string
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      branch_admin: {
        Row: {
          admin_id: string
          branch_id: string
          created_at: string
        }
        Insert: {
          admin_id?: string
          branch_id?: string
          created_at?: string
        }
        Update: {
          admin_id?: string
          branch_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "branch_admin_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "admin"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "branch_admin_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
        ]
      }
      children: {
        Row: {
          age: number | null
          created_at: string
          gender: Database["public"]["Enums"]["gender"]
          id: string
          name: string | null
          order_id: string | null
        }
        Insert: {
          age?: number | null
          created_at?: string
          gender?: Database["public"]["Enums"]["gender"]
          id?: string
          name?: string | null
          order_id?: string | null
        }
        Update: {
          age?: number | null
          created_at?: string
          gender?: Database["public"]["Enums"]["gender"]
          id?: string
          name?: string | null
          order_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "children_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      companions: {
        Row: {
          companion_identification: string | null
          companion_identification_type:
            | Database["public"]["Enums"]["identity_number_type"]
            | null
          created_at: string
          gender: Database["public"]["Enums"]["gender"] | null
          id: string
          name: string | null
          order_id: string | null
          phone_num: string | null
        }
        Insert: {
          companion_identification?: string | null
          companion_identification_type?:
            | Database["public"]["Enums"]["identity_number_type"]
            | null
          created_at?: string
          gender?: Database["public"]["Enums"]["gender"] | null
          id?: string
          name?: string | null
          order_id?: string | null
          phone_num?: string | null
        }
        Update: {
          companion_identification?: string | null
          companion_identification_type?:
            | Database["public"]["Enums"]["identity_number_type"]
            | null
          created_at?: string
          gender?: Database["public"]["Enums"]["gender"] | null
          id?: string
          name?: string | null
          order_id?: string | null
          phone_num?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      customer: {
        Row: {
          created_at: string
          fullname: string | null
          id: string
          identity_number: string | null
          identity_number_type:
            | Database["public"]["Enums"]["identity_number_type"]
            | null
        }
        Insert: {
          created_at?: string
          fullname?: string | null
          id?: string
          identity_number?: string | null
          identity_number_type?:
            | Database["public"]["Enums"]["identity_number_type"]
            | null
        }
        Update: {
          created_at?: string
          fullname?: string | null
          id?: string
          identity_number?: string | null
          identity_number_type?:
            | Database["public"]["Enums"]["identity_number_type"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          branch_id: string | null
          created_at: string
          customer: string | null
          id: string
          status: Database["public"]["Enums"]["order_status"] | null
        }
        Insert: {
          branch_id?: string | null
          created_at?: string
          customer?: string | null
          id?: string
          status?: Database["public"]["Enums"]["order_status"] | null
        }
        Update: {
          branch_id?: string | null
          created_at?: string
          customer?: string | null
          id?: string
          status?: Database["public"]["Enums"]["order_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_customer_fkey"
            columns: ["customer"]
            isOneToOne: false
            referencedRelation: "customer"
            referencedColumns: ["id"]
          },
        ]
      }
      super_admin: {
        Row: {
          admin_name: string | null
          created_at: string
          id: string
        }
        Insert: {
          admin_name?: string | null
          created_at?: string
          id: string
        }
        Update: {
          admin_name?: string | null
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "super_admin_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket: {
        Row: {
          branch_id: string | null
          category: Database["public"]["Enums"]["ticket_category"]
          cover_image_url: string
          created_at: string
          description: string
          discount: number | null
          discount_type: Database["public"]["Enums"]["discount_type"] | null
          id: number
          name: string
          price: number
          ticket_duration: number | null
          ticket_duration_type: Database["public"]["Enums"]["ticket_duration_type"]
          ticket_validity: number
        }
        Insert: {
          branch_id?: string | null
          category: Database["public"]["Enums"]["ticket_category"]
          cover_image_url: string
          created_at?: string
          description: string
          discount?: number | null
          discount_type?: Database["public"]["Enums"]["discount_type"] | null
          id?: number
          name: string
          price: number
          ticket_duration?: number | null
          ticket_duration_type: Database["public"]["Enums"]["ticket_duration_type"]
          ticket_validity: number
        }
        Update: {
          branch_id?: string | null
          category?: Database["public"]["Enums"]["ticket_category"]
          cover_image_url?: string
          created_at?: string
          description?: string
          discount?: number | null
          discount_type?: Database["public"]["Enums"]["discount_type"] | null
          id?: number
          name?: string
          price?: number
          ticket_duration?: number | null
          ticket_duration_type?: Database["public"]["Enums"]["ticket_duration_type"]
          ticket_validity?: number
        }
        Relationships: [
          {
            foreignKeyName: "ticket_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_order: {
        Row: {
          created_at: string
          id: string
          order_id: string | null
          ticket_id: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          order_id?: string | null
          ticket_id?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string | null
          ticket_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ticket_order_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_order_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "ticket"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          created_at: string
          email: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"] | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"] | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"] | null
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
      [_ in never]: never
    }
    Enums: {
      discount_type: "PERCENTAGE" | "FIX_NUMBER"
      gender: "Male" | "Female"
      identity_number_type: "NIK" | "Passport" | "SIM"
      order_status: "Pending Payment" | "Completed" | "Failed Payment"
      ticket_category: "WEEKDAYS" | "WEEKENDS" | "BOOKING"
      ticket_duration_type: "HOURLY" | "FULL_DAY"
      user_role: "ADMIN" | "CUSTOMER" | "SUPER_ADMIN"
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
