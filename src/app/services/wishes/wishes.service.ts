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
        let wishes: Wish[] = [];
        const {data, error} = await this.supabase
            .from('wishes')
            .select('*')
            .eq('user_email', await this.authService.getCurrentUserEmail());
        if (error) throw error;
        if (data) {
            wishes = data as Wish[];
            for (const wish of wishes) {
                wish.viewed = false;
                if(wish.image){
                    wish.imageUrl = await this.getImageUrl(wish.image);
                    //console.log(wish)
                }
            }
        }

        return wishes;
    }

    async getImageUrl(slug: string): Promise<string> {
        const {data, error} = await this.supabase.storage.from('images').createSignedUrl(slug, 3600);

        if(error) throw error;
        return data.signedUrl;
    }
}
