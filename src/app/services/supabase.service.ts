import { Injectable } from '@angular/core';
import { SupabaseEnv } from '../env/environment';
import { SupabaseClient, createClient } from '@supabase/supabase-js'

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(SupabaseEnv.API_URL, SupabaseEnv.API_KEY);
  }

  async testDbConn() {
    const resp = await this.supabase.from('test').select('*');
    return resp;
  }
}
