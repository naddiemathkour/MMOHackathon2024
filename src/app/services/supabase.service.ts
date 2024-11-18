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

  async getSprintStoryData() {
    //const resp = await this.supabase.from('sprinttestplans').select('*');
    const { data, error } = await this.supabase .from('sprinttestplans').select('*, storytestplans(*)');
    console.log('data from db is: ', data);
    if (error) { 
      console.error("Error executing query:", error); 
    } else { 
      return data; 
    }
    return data;
  }

  async getStoryTestData() {
    //const resp = await this.supabase.from('sprinttestplans').select('*');
    const { data, error } = await this.supabase .from('storytestplans').select('*, storytestplans(*)');
    console.log('data from db is: ', data);
    if (error) { 
      console.error("Error executing query:", error); 
    } else { 
      return data; 
    }
    return data;
  }
}
