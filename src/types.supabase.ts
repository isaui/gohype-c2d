
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
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
      booking_ticket: {
        Row: {
          afternoon_weekdays_discount_type:
            | Database["public"]["Enums"]["discount_type"]
            | null
          afternoon_weekdays_discount_unit: number | null
          afternoon_weekdays_price: number | null
          afternoon_weekend_discount_type:
            | Database["public"]["Enums"]["discount_type"]
            | null
          afternoon_weekend_discount_unit: number | null
          afternoon_weekend_price: number | null
          created_at: string
          evening_weekdays_discount_type:
            | Database["public"]["Enums"]["discount_type"]
            | null
          evening_weekdays_discount_unit: number | null
          evening_weekdays_price: number | null
          evening_weekend_discount_type:
            | Database["public"]["Enums"]["discount_type"]
            | null
          evening_weekend_discount_unit: number | null
          evening_weekend_price: number | null
          extra_price_child: number | null
          extra_price_companion: number | null
          free_children: number | null
          free_companions: number | null
          id: number
          morning_weekdays_discount_type:
            | Database["public"]["Enums"]["discount_type"]
            | null
          morning_weekdays_discount_unit: number | null
          morning_weekdays_price: number | null
          morning_weekend_discount_type:
            | Database["public"]["Enums"]["discount_type"]
            | null
          morning_weekend_discount_unit: number | null
          morning_weekend_price: number | null
        }
        Insert: {
          afternoon_weekdays_discount_type?:
            | Database["public"]["Enums"]["discount_type"]
            | null
          afternoon_weekdays_discount_unit?: number | null
          afternoon_weekdays_price?: number | null
          afternoon_weekend_discount_type?:
            | Database["public"]["Enums"]["discount_type"]
            | null
          afternoon_weekend_discount_unit?: number | null
          afternoon_weekend_price?: number | null
          created_at?: string
          evening_weekdays_discount_type?:
            | Database["public"]["Enums"]["discount_type"]
            | null
          evening_weekdays_discount_unit?: number | null
          evening_weekdays_price?: number | null
          evening_weekend_discount_type?:
            | Database["public"]["Enums"]["discount_type"]
            | null
          evening_weekend_discount_unit?: number | null
          evening_weekend_price?: number | null
          extra_price_child?: number | null
          extra_price_companion?: number | null
          free_children?: number | null
          free_companions?: number | null
          id?: number
          morning_weekdays_discount_type?:
            | Database["public"]["Enums"]["discount_type"]
            | null
          morning_weekdays_discount_unit?: number | null
          morning_weekdays_price?: number | null
          morning_weekend_discount_type?:
            | Database["public"]["Enums"]["discount_type"]
            | null
          morning_weekend_discount_unit?: number | null
          morning_weekend_price?: number | null
        }
        Update: {
          afternoon_weekdays_discount_type?:
            | Database["public"]["Enums"]["discount_type"]
            | null
          afternoon_weekdays_discount_unit?: number | null
          afternoon_weekdays_price?: number | null
          afternoon_weekend_discount_type?:
            | Database["public"]["Enums"]["discount_type"]
            | null
          afternoon_weekend_discount_unit?: number | null
          afternoon_weekend_price?: number | null
          created_at?: string
          evening_weekdays_discount_type?:
            | Database["public"]["Enums"]["discount_type"]
            | null
          evening_weekdays_discount_unit?: number | null
          evening_weekdays_price?: number | null
          evening_weekend_discount_type?:
            | Database["public"]["Enums"]["discount_type"]
            | null
          evening_weekend_discount_unit?: number | null
          evening_weekend_price?: number | null
          extra_price_child?: number | null
          extra_price_companion?: number | null
          free_children?: number | null
          free_companions?: number | null
          id?: number
          morning_weekdays_discount_type?:
            | Database["public"]["Enums"]["discount_type"]
            | null
          morning_weekdays_discount_unit?: number | null
          morning_weekdays_price?: number | null
          morning_weekend_discount_type?:
            | Database["public"]["Enums"]["discount_type"]
            | null
          morning_weekend_discount_unit?: number | null
          morning_weekend_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_ticket_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "ticket"
            referencedColumns: ["id"]
          },
        ]
      }
      branch: {
        Row: {
          address: string
          branch_description: string | null
          branch_images: string[] | null
          branch_name: string
          created_at: string
          id: string
          map_url: string | null
          refund_policy_content: string
          refund_policy_title: string
          weekday_open_time_label: string | null
          weekend_open_time_label: string | null
        }
        Insert: {
          address?: string
          branch_description?: string | null
          branch_images?: string[] | null
          branch_name?: string
          created_at?: string
          id?: string
          map_url?: string | null
          refund_policy_content?: string
          refund_policy_title?: string
          weekday_open_time_label?: string | null
          weekend_open_time_label?: string | null
        }
        Update: {
          address?: string
          branch_description?: string | null
          branch_images?: string[] | null
          branch_name?: string
          created_at?: string
          id?: string
          map_url?: string | null
          refund_policy_content?: string
          refund_policy_title?: string
          weekday_open_time_label?: string | null
          weekend_open_time_label?: string | null
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
          checkin_status: Database["public"]["Enums"]["checkin_status"] | null
          created_at: string
          gender: Database["public"]["Enums"]["gender"]
          id: string
          name: string | null
          order_id: string | null
        }
        Insert: {
          age?: number | null
          checkin_status?: Database["public"]["Enums"]["checkin_status"] | null
          created_at?: string
          gender?: Database["public"]["Enums"]["gender"]
          id?: string
          name?: string | null
          order_id?: string | null
        }
        Update: {
          age?: number | null
          checkin_status?: Database["public"]["Enums"]["checkin_status"] | null
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
          checkin_status: Database["public"]["Enums"]["checkin_status"] | null
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
          checkin_status?: Database["public"]["Enums"]["checkin_status"] | null
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
          checkin_status?: Database["public"]["Enums"]["checkin_status"] | null
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
      current_active_branch: {
        Row: {
          branch_id: string
          user_id: string
        }
        Insert: {
          branch_id?: string
          user_id?: string
        }
        Update: {
          branch_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "current_active_branch_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "current_active_branch_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      customer: {
        Row: {
          created_at: string
          email: string | null
          fullname: string | null
          id: string
          identity_number: string | null
          identity_number_type:
            | Database["public"]["Enums"]["identity_number_type"]
            | null
          phone_num: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          fullname?: string | null
          id?: string
          identity_number?: string | null
          identity_number_type?:
            | Database["public"]["Enums"]["identity_number_type"]
            | null
          phone_num?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          fullname?: string | null
          id?: string
          identity_number?: string | null
          identity_number_type?:
            | Database["public"]["Enums"]["identity_number_type"]
            | null
          phone_num?: string
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
      faqs: {
        Row: {
          branch_id: string | null
          faq_description: string | null
          faq_title: string | null
          id: number
        }
        Insert: {
          branch_id?: string | null
          faq_description?: string | null
          faq_title?: string | null
          id?: number
        }
        Update: {
          branch_id?: string | null
          faq_description?: string | null
          faq_title?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "faqs_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
        ]
      }
      holidays: {
        Row: {
          branch_id: string
          created_at: string
          created_by: string | null
          end_date: string
          id: number
          name: string
          start_date: string
        }
        Insert: {
          branch_id: string
          created_at?: string
          created_by?: string | null
          end_date: string
          id?: number
          name: string
          start_date: string
        }
        Update: {
          branch_id?: string
          created_at?: string
          created_by?: string | null
          end_date?: string
          id?: number
          name?: string
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "holidays_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "holidays_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      order_session: {
        Row: {
          booking_time: Database["public"]["Enums"]["ticket_time_slot"] | null
          id: string
          is_booking: boolean | null
          order_date: string | null
        }
        Insert: {
          booking_time?: Database["public"]["Enums"]["ticket_time_slot"] | null
          id?: string
          is_booking?: boolean | null
          order_date?: string | null
        }
        Update: {
          booking_time?: Database["public"]["Enums"]["ticket_time_slot"] | null
          id?: string
          is_booking?: boolean | null
          order_date?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          branch_id: string | null
          created_at: string
          customer: string | null
          id: string
          order_number: number
          order_session: string | null
          price: number
          status: Database["public"]["Enums"]["order_status"] | null
          ticket: number | null
        }
        Insert: {
          branch_id?: string | null
          created_at?: string
          customer?: string | null
          id?: string
          order_number?: number
          order_session?: string | null
          price?: number
          status?: Database["public"]["Enums"]["order_status"] | null
          ticket?: number | null
        }
        Update: {
          branch_id?: string | null
          created_at?: string
          customer?: string | null
          id?: string
          order_number?: number
          order_session?: string | null
          price?: number
          status?: Database["public"]["Enums"]["order_status"] | null
          ticket?: number | null
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
          {
            foreignKeyName: "orders_order_session_fkey"
            columns: ["order_session"]
            isOneToOne: false
            referencedRelation: "order_session"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_ticket_fkey"
            columns: ["ticket"]
            isOneToOne: false
            referencedRelation: "ticket"
            referencedColumns: ["id"]
          },
        ]
      }
      promo_codes: {
        Row: {
          amount: number
          amount_type: Database["public"]["Enums"]["discount_type"]
          branch_id: string
          created_at: string
          created_by: string
          id: number
          max_order: number | null
          min_order: number | null
          name: string
          promo_code: string
        }
        Insert: {
          amount: number
          amount_type: Database["public"]["Enums"]["discount_type"]
          branch_id: string
          created_at?: string
          created_by: string
          id?: number
          max_order?: number | null
          min_order?: number | null
          name: string
          promo_code: string
        }
        Update: {
          amount?: number
          amount_type?: Database["public"]["Enums"]["discount_type"]
          branch_id?: string
          created_at?: string
          created_by?: string
          id?: number
          max_order?: number | null
          min_order?: number | null
          name?: string
          promo_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "promo_codes_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promo_codes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      regular_ticket: {
        Row: {
          created_at: string
          extra_price_child: number | null
          extra_price_companion: number | null
          free_children: number | null
          free_companions: number | null
          id: number
          ticket_duration_type: Database["public"]["Enums"]["ticket_duration_type"]
          ticket_duration_unit: number
          weekdays_discount_type:
            | Database["public"]["Enums"]["discount_type"]
            | null
          weekdays_discount_unit: number | null
          weekdays_price: number | null
          weekend_discount_type:
            | Database["public"]["Enums"]["discount_type"]
            | null
          weekend_discount_unit: number | null
          weekend_price: number | null
        }
        Insert: {
          created_at?: string
          extra_price_child?: number | null
          extra_price_companion?: number | null
          free_children?: number | null
          free_companions?: number | null
          id?: number
          ticket_duration_type?: Database["public"]["Enums"]["ticket_duration_type"]
          ticket_duration_unit?: number
          weekdays_discount_type?:
            | Database["public"]["Enums"]["discount_type"]
            | null
          weekdays_discount_unit?: number | null
          weekdays_price?: number | null
          weekend_discount_type?:
            | Database["public"]["Enums"]["discount_type"]
            | null
          weekend_discount_unit?: number | null
          weekend_price?: number | null
        }
        Update: {
          created_at?: string
          extra_price_child?: number | null
          extra_price_companion?: number | null
          free_children?: number | null
          free_companions?: number | null
          id?: number
          ticket_duration_type?: Database["public"]["Enums"]["ticket_duration_type"]
          ticket_duration_unit?: number
          weekdays_discount_type?:
            | Database["public"]["Enums"]["discount_type"]
            | null
          weekdays_discount_unit?: number | null
          weekdays_price?: number | null
          weekend_discount_type?:
            | Database["public"]["Enums"]["discount_type"]
            | null
          weekend_discount_unit?: number | null
          weekend_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "regular_ticket_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "ticket"
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
          cover_image_url: string
          created_at: string
          description: string | null
          id: number
          name: string
          ticket_type: Database["public"]["Enums"]["ticket_type"] | null
        }
        Insert: {
          branch_id?: string | null
          cover_image_url?: string
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          ticket_type?: Database["public"]["Enums"]["ticket_type"] | null
        }
        Update: {
          branch_id?: string | null
          cover_image_url?: string
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          ticket_type?: Database["public"]["Enums"]["ticket_type"] | null
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
      count_orders: {
        Args: {
          branch_id_param: string
          start_date_param?: string
          end_date_param?: string
          order_status_param?: string
          search_param?: string
          ticket_category_param?: string
        }
        Returns: number
      }
      get_order_by_id: {
        Args: {
          order_id_param: string
        }
        Returns: {
          order_id: string
          order_number: number
          price: number
          order_status: Database["public"]["Enums"]["order_status"]
          created_at: string
          customer: Json
          branch_name: string
          tickets_details: Json
          children_details: Json
          companions_details: Json
        }[]
      }
      get_orders: {
        Args: {
          branch_id_param: string
          start_date_param?: string
          end_date_param?: string
          order_status_param?: Database["public"]["Enums"]["order_status"]
          search_param?: string
          ticket_category_param?: string
          page_offset?: number
          page_limit?: number
        }
        Returns: {
          order_id: string
          order_number: number
          price: number
          order_status: Database["public"]["Enums"]["order_status"]
          created_at: string
          customer: Json
          branch_name: string
        }[]
      }
      get_user_data: {
        Args: {
          user_id: string
        }
        Returns: Json
      }
      insert_or_update_current_branch_id: {
        Args: {
          p_user_id: string
          p_branch_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      checkin_status: "CHECKED_IN" | "CHECKED_OUT" | "NOT_CHECKED_IN"
      day:
        | "Monday"
        | "Tuesday"
        | "Wednesday"
        | "Thursday"
        | "Friday"
        | "Saturday"
        | "Sunday"
      discount_type: "PERCENTAGE" | "FIX_NUMBER"
      gender: "Male" | "Female"
      identity_number_type: "NIK" | "Passport" | "SIM"
      order_status: "Pending Payment" | "Completed" | "Failed Payment"
      ticket_duration_type: "HOURLY" | "FULL_DAY"
      ticket_time_slot: "Morning" | "Afternoon" | "Evening"
      ticket_type: "Regular" | "Addons" | "Booking"
      user_role: "ADMIN" | "CUSTOMER" | "SUPER_ADMIN"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      operation: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
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
