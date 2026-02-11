export interface Client {
  id: number
  name: string
  email: string
  phone?: string | null
  fiscal_code: string
  created_at?: string
  updated_at?: string
  // Opzionale: conteggio polizze
  policies_count?: number
}

export interface Policy {
  id: number
  client_id: number
  policy_number: string
  type: 'auto' | 'home' | 'life' | 'health'
  premium: number
  coverage_amount: number
  status: 'active' | 'expired' | 'pending' | 'cancelled'
  start_date: string
  end_date: string
  details?: Record<string, unknown>
  client?: Client
}

export interface Stats {
  total_clients: number
  total_policies: number
  active_policies: number
  total_premium: number
}
