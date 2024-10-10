import {Injectable} from '@angular/core';
import {createClient, SupabaseClient} from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root'
})
export class SupabaseService {

    public client: SupabaseClient;

    constructor() {
        const supabaseUrl = 'https://lswyqfdffexrzjrklldm.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxzd3lxZmRmZmV4cnp' +
            'qcmtsbGRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzMjcyNzIsImV4cCI6MjA0MzkwMzI3Mn0.hWt2dNxoVV74JgTdSBD4YA5UPZ' +
            'yUIoxm-8CzSAs7OYk'
        this.client = createClient(supabaseUrl, supabaseKey);
    }
}
