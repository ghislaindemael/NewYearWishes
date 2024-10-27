import {Injectable} from '@angular/core';
import {SupabaseService} from '../../auth/services/supabase/supabase.service';
import {from, Observable} from 'rxjs';
import {Address} from '../../types/Address.type';

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

    async getTranslationsDictionary(language: string): Promise<{ [key: string]: string }> {
        try {
            const { data, error } = await this.supabase
                .from('translations')
                .select(`slug, ${language}`);

            if(!data) {
                throw new Error();
            }

            return data.reduce((acc: { [key: string]: string }, item: any) => {
                acc[item.slug] = item[language];
                return acc;
            }, {});
        } catch (err) {
            console.error('Error fetching translations:', err);
            return {}; // Return an empty dictionary on error
        }
    }

    sendContact(contactData: { name: string; message: string }) {
        return from(
            this.supabase
                .from('complaints')
                .insert([{ name: contactData.name, message: contactData.message }])
                .then(response => {
                    if (response.error) {
                        console.error('Supabase error:', response.error);
                        return false;
                    }
                    return true;
                })
        );
    }

    async getAdresses() {
        const {data, error} = await this.supabase.from('addresses').select('*');
        if (error) throw error;

        return data as Address[];
    }
}
