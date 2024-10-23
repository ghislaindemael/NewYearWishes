import {Injectable} from '@angular/core';
import {SupabaseService} from '../../auth/services/supabase/supabase.service';
import {from, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    private supabase;

    constructor(private supabaseService: SupabaseService) {
        this.supabase = supabaseService.client;
    }

    sendComplaint(complaintData: { name: string; contact: string; complaint: string }): Observable<boolean> {
        return from(
            this.supabase
                .from('complaints')
                .insert([{ name: complaintData.name, contact: complaintData.contact, complaint: complaintData.complaint }])
                .then(response => {
                    if (response.error) {
                        console.error('Supabase error:', response.error);
                        return false;
                    }
                    return true;
                })
        );
    }
}
