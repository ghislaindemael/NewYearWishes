import {Injectable} from '@angular/core';
import {SupabaseService} from '../../auth/services/supabase/supabase.service';
import {AuthService} from '../../auth/services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class WishesService {

    private supabase;

    constructor(private supabaseService: SupabaseService, private authService: AuthService) {
        this.supabase = supabaseService.client;
    }

    async areWishesReady(): Promise<boolean> {
        const {data, error} = await this.supabase
            .from('wishes')
            .select('ready')
            .single();

        if(error) throw error;
        if (data) {
            return data.ready;
        }

        return false;
    }

}
