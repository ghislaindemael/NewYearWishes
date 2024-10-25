import {Injectable} from '@angular/core';
import {SupabaseService} from '../../auth/services/supabase/supabase.service';
import {AuthService} from '../../auth/services/auth/auth.service';
import {User} from '@supabase/supabase-js';
import {UserLabel} from '../../types/UserLabel.type';
import {Wish} from '../../types/Wish.type';

@Injectable({
    providedIn: 'root'
})
export class WishesService {

    private supabase;

    constructor(private supabaseService: SupabaseService, private authService: AuthService) {
        this.supabase = supabaseService.client;
    }

    async getUserLabelList(): Promise<UserLabel[]> {
        const {data, error} = await this.supabase
            .from('name_list')
            .select('*');
        if (error) throw error;
        return data as UserLabel[];
    }

    async getWishes() {
        const {data, error} = await this.supabase
            .from('wishes')
            .select('*')
            .eq('user_email', await this.authService.getCurrentUserEmail());
        if (error) throw error;
        if (data) {
            data.forEach(wish => {
                wish.viewed = false;
            });
        }

        return data as Wish[];
    }
}
