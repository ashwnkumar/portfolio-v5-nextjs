export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
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
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
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
      about_content: {
        Row: {
          background_content: string
          background_title: string
          hero_intro: string
          hero_title: string
          id: number
          life_outside_work_content: string
          life_outside_work_title: string
          updated_at: string
        }
        Insert: {
          background_content: string
          background_title: string
          hero_intro: string
          hero_title: string
          id?: number
          life_outside_work_content: string
          life_outside_work_title: string
          updated_at?: string
        }
        Update: {
          background_content?: string
          background_title?: string
          hero_intro?: string
          hero_title?: string
          id?: number
          life_outside_work_content?: string
          life_outside_work_title?: string
          updated_at?: string
        }
        Relationships: []
      }
      admin_emails: {
        Row: {
          created_at: string
          email: string
        }
        Insert: {
          created_at?: string
          email: string
        }
        Update: {
          created_at?: string
          email?: string
        }
        Relationships: []
      }
      education: {
        Row: {
          created_at: string
          degree: string
          id: string
          institution: string
          score: string | null
          sort_order: number
          updated_at: string
          year: string | null
        }
        Insert: {
          created_at?: string
          degree: string
          id?: string
          institution: string
          score?: string | null
          sort_order?: number
          updated_at?: string
          year?: string | null
        }
        Update: {
          created_at?: string
          degree?: string
          id?: string
          institution?: string
          score?: string | null
          sort_order?: number
          updated_at?: string
          year?: string | null
        }
        Relationships: []
      }
      experience: {
        Row: {
          achievements: string[]
          company: string
          created_at: string
          description: string
          end_date_text: string | null
          end_month: number | null
          end_year: number | null
          id: string
          is_current: boolean
          location: string
          role: string
          sort_order: number
          start_date_text: string | null
          start_month: number | null
          start_year: number | null
          technologies: string[]
          updated_at: string
        }
        Insert: {
          achievements?: string[]
          company: string
          created_at?: string
          description?: string
          end_date_text?: string | null
          end_month?: number | null
          end_year?: number | null
          id?: string
          is_current?: boolean
          location?: string
          role: string
          sort_order?: number
          start_date_text?: string | null
          start_month?: number | null
          start_year?: number | null
          technologies?: string[]
          updated_at?: string
        }
        Update: {
          achievements?: string[]
          company?: string
          created_at?: string
          description?: string
          end_date_text?: string | null
          end_month?: number | null
          end_year?: number | null
          id?: string
          is_current?: boolean
          location?: string
          role?: string
          sort_order?: number
          start_date_text?: string | null
          start_month?: number | null
          start_year?: number | null
          technologies?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      footer_links: {
        Row: {
          created_at: string
          href: string
          id: string
          is_visible: boolean
          label: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          href: string
          id?: string
          is_visible?: boolean
          label: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          href?: string
          id?: string
          is_visible?: boolean
          label?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      home_content: {
        Row: {
          hero_cta_primary_href: string
          hero_cta_primary_text: string
          hero_cta_secondary_href: string
          hero_cta_secondary_text: string
          hero_greeting: string
          hero_tagline: string
          id: number
          philosophy_author: string
          philosophy_cta_href: string
          philosophy_cta_text: string
          philosophy_note: string
          philosophy_quote: string
          philosophy_title: string
          updated_at: string
        }
        Insert: {
          hero_cta_primary_href: string
          hero_cta_primary_text: string
          hero_cta_secondary_href: string
          hero_cta_secondary_text: string
          hero_greeting: string
          hero_tagline: string
          id?: number
          philosophy_author: string
          philosophy_cta_href: string
          philosophy_cta_text: string
          philosophy_note: string
          philosophy_quote: string
          philosophy_title: string
          updated_at?: string
        }
        Update: {
          hero_cta_primary_href?: string
          hero_cta_primary_text?: string
          hero_cta_secondary_href?: string
          hero_cta_secondary_text?: string
          hero_greeting?: string
          hero_tagline?: string
          id?: number
          philosophy_author?: string
          philosophy_cta_href?: string
          philosophy_cta_text?: string
          philosophy_note?: string
          philosophy_quote?: string
          philosophy_title?: string
          updated_at?: string
        }
        Relationships: []
      }
      nav_links: {
        Row: {
          created_at: string
          href: string
          id: string
          is_visible: boolean
          label: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          href: string
          id?: string
          is_visible?: boolean
          label: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          href?: string
          id?: string
          is_visible?: boolean
          label?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      profile: {
        Row: {
          id: number
          image_about_path: string | null
          image_alt: string
          image_home_path: string | null
          name: string
          tagline: string
          updated_at: string
        }
        Insert: {
          id?: number
          image_about_path?: string | null
          image_alt?: string
          image_home_path?: string | null
          name: string
          tagline: string
          updated_at?: string
        }
        Update: {
          id?: number
          image_about_path?: string | null
          image_alt?: string
          image_home_path?: string | null
          name?: string
          tagline?: string
          updated_at?: string
        }
        Relationships: []
      }
      project_images: {
        Row: {
          alt: string | null
          created_at: string
          id: string
          image_path: string
          project_id: string
          sort_order: number
        }
        Insert: {
          alt?: string | null
          created_at?: string
          id?: string
          image_path: string
          project_id: string
          sort_order?: number
        }
        Update: {
          alt?: string | null
          created_at?: string
          id?: string
          image_path?: string
          project_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "project_images_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          category: string
          content: string | null
          created_at: string
          description: string
          github_url: string | null
          id: string
          is_featured: boolean
          is_published: boolean
          live_url: string | null
          preview_image_path: string | null
          slug: string
          sort_order: number
          tech: string[]
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          content?: string | null
          created_at?: string
          description?: string
          github_url?: string | null
          id?: string
          is_featured?: boolean
          is_published?: boolean
          live_url?: string | null
          preview_image_path?: string | null
          slug: string
          sort_order?: number
          tech?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          content?: string | null
          created_at?: string
          description?: string
          github_url?: string | null
          id?: string
          is_featured?: boolean
          is_published?: boolean
          live_url?: string | null
          preview_image_path?: string | null
          slug?: string
          sort_order?: number
          tech?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          footer_brand_name: string
          footer_brand_tagline: string
          id: number
          nav_brand_href: string
          nav_brand_name: string
          updated_at: string
        }
        Insert: {
          footer_brand_name: string
          footer_brand_tagline: string
          id?: number
          nav_brand_href?: string
          nav_brand_name: string
          updated_at?: string
        }
        Update: {
          footer_brand_name?: string
          footer_brand_tagline?: string
          id?: number
          nav_brand_href?: string
          nav_brand_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      skill_categories: {
        Row: {
          created_at: string
          id: string
          name: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          category_id: string
          created_at: string
          icon_id: string | null
          icon_id_legacy: string | null
          icon_variant: string
          id: string
          invert_dark: boolean
          name: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          category_id: string
          created_at?: string
          icon_id?: string | null
          icon_id_legacy?: string | null
          icon_variant?: string
          id?: string
          invert_dark?: boolean
          name: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          category_id?: string
          created_at?: string
          icon_id?: string | null
          icon_id_legacy?: string | null
          icon_variant?: string
          id?: string
          invert_dark?: boolean
          name?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "skills_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "skill_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      social_links: {
        Row: {
          created_at: string
          display_name: string
          id: string
          is_visible: boolean
          label: string
          platform: string
          sort_order: number
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          display_name: string
          id?: string
          is_visible?: boolean
          label: string
          platform: string
          sort_order?: number
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          display_name?: string
          id?: string
          is_visible?: boolean
          label?: string
          platform?: string
          sort_order?: number
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      studio_images: {
        Row: {
          alt: string | null
          category: string
          created_at: string
          id: string
          image_path: string
          is_published: boolean
          sort_order: number
          title: string | null
          updated_at: string
        }
        Insert: {
          alt?: string | null
          category: string
          created_at?: string
          id?: string
          image_path: string
          is_published?: boolean
          sort_order?: number
          title?: string | null
          updated_at?: string
        }
        Update: {
          alt?: string | null
          category?: string
          created_at?: string
          id?: string
          image_path?: string
          is_published?: boolean
          sort_order?: number
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
