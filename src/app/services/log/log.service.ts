import { Injectable } from '@angular/core';
import {AuthService} from '../../auth/services/auth/auth.service';
import {SupabaseService} from '../../auth/services/supabase/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class LogService {

    private supabase;

  constructor(
      private authService: AuthService,
      private supabaseService: SupabaseService,
  ) {
      this.supabase = supabaseService.client;
  }

  async logPasswordAttempt(attempt: string): Promise<void> {
      const { data, error } = await this.supabase.from('attempts').insert({attempt: attempt});
      if (error) throw error;
  }

}
