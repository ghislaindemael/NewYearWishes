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
        }

        //The Spanish Inquisition
        const {data: inquisition, error: inquisitionError} = await this.supabase
            .from('users')
            .select('inquisition')
            .limit(1);

        if (!inquisitionError && inquisition && inquisition.length > 0 && !inquisition[0].inquisition) {
            wishes.push({
                id: -1,
                liked: false,
                title_slug: 'custom_title',
                title: "The Spanish Inquisition",
                subtitle: "You didn't expect it, right?",
                image: "spanish_inquisition.webp",
                viewed: false,
            });
        }

        //The Golden Crocodile Inquisition
        const {data: crocodile, error: crocodileError} = await this.supabase
            .from('users')
            .select('crocodile')
            .limit(1);

        if (!crocodileError && crocodile && crocodile.length > 0 && !crocodile[0].crocodile) {
            wishes.push({
                id: -2,
                liked: false,
                title_slug: 'custom_title',
                title: "Le crocodile doré",
                subtitle: "Tu as sa bénédiction",
                image: "crocodile.jpg",
                viewed: false,
            });
        }

        for (const wish of wishes) {
            wish.viewed = false;
            if (wish.image) {
                wish.imageUrl = await this.getImageUrl(wish.image);
                //console.log(wish)
            }
        }

        return wishes;
    }

    async getImageUrl(slug: string): Promise<string> {
        const {data, error} = await this.supabase.storage.from('images').createSignedUrl(slug, 3600);

        if (error) throw error;
        return data.signedUrl;
    }

    async likeWish(wish: Wish): Promise<boolean> {
        if (wish.id > 0) {
            const {error} = await this.supabase.from('wishes').update({liked: true}).eq('id', wish.id);
            if (error) throw error;
            return true;
        } else if (wish.id === -1 || wish.id === -2) {
            const email = await this.authService.getCurrentUserEmail();
            const updateField = wish.id === -1 ? {inquisition: true} : {crocodile: true};

            const {error} = await this.supabase.from('users').update(updateField).eq('app_email', email);
            if (error) throw error;
            return true;
        }
        return false;
    }
}
