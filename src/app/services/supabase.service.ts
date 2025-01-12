import { Injectable, Pipe } from '@angular/core';
import { SupabaseEnv } from '../env/environment';
import { SupabaseClient, createClient } from '@supabase/supabase-js'
import { IStoryTestPlan } from '../interfaces/storytestplan.interface';
import { ITest } from '../interfaces/test.interface';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(SupabaseEnv.API_URL, SupabaseEnv.API_KEY);
  }

  async getSprintStoryData() {
    const { data, error } = await this.supabase .from('sprinttestplans').select('*, storytestplans(*)').order('sprinttestplan_id', { ascending: false });
    if (error) { 
      console.error("Error executing query:", error); 
      return null;
    }
    return data;
  }

  async getStoryTestData(storytestplan_id: number) {
    const { data, error } = await this.supabase .from('tests').select('*').eq('storytestplan_id', storytestplan_id);

    if (error) { 
      console.error("Error executing query:", error); 
    }  
    return data;
  }

  async getStoryTestPlansBySprintTestPlanId(stp_id: number) {
    const { data, error } = await this.supabase
    .from('storytestplans')
    .select('*')
    .eq("sprinttestplan_id", stp_id)

    if (error) {
      console.error(error);
    }

    return data;
  }

  async saveFormData(data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('sprinttestplans')
      .insert([data]);
    if (error) {
      throw new Error(error.message);
    }
    return result;
  }

  async saveTestStatus(data: any, test_id: number): Promise<any> {
    const { data: result, error } = await this.supabase
        .from('tests')
        .update({ test_status : data }) // Replace `column_name` and `new_value` with the actual column and value you want to update
        .eq('test_id', test_id); // Replace `test_id` with the actual test ID you want to match

      if (error) {
        throw new Error(error.message);
      }
      return result;
  }

  async getStoryTestPlanId() {
    const { data, error } = await this.supabase
    .from('storytestplans')
    .select('storytestplan_id')
    .order("storytestplan_id", {ascending: false})
    .limit(1)

    if (error) {
      console.error(error);
      return null;
    } else {
      return data;
    }
  }

  async getStoryTestPlanById(id: number) {
    const { data, error } = await this.supabase
    .from('storytestplans')
    .select('*')
    .eq("storytestplan_id", id)
    .limit(1);

    if (error) {
      console.error(error);
    }
    return data;
  }

  async getSprintTestPlanId() {
    const { data, error } = await this.supabase
    .from('sprinttestplans')
    .select('sprinttestplan_id')
    .order('sprinttestplan_id', {ascending: false})
    .limit(1);

    if (error) {
      console.error(error);
      return null;
    }
    return data;
  }

  async postStoryTestData(data: IStoryTestPlan) {
    const { error } = await this.supabase
    .from('storytestplans')
    .insert(data)

    if (error) {
      console.error(error);
    }
  }

  async postTestData(data: ITest) {
    const payload = {
      ...data
    };
    
    return await this.supabase.from('tests').insert(payload);
  }
}
