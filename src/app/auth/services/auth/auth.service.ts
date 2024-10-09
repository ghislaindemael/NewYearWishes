import {Injectable} from '@angular/core';
import {createClient} from '@supabase/supabase-js';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private supabase = createClient(environment.supabaseUrl!, environment.supabaseKey!);

    async authenticateUser(password: string): Promise<void> {
        const {data, error} = await this.supabase
            .rpc('retrieve_email', {provided_password: password});

        if (error) {
            console.error('Authentication error:', error);
        } else {
            console.log('Password request result:', data);
        }

        if (data.length > 0) {
            const email = data[0].app_email;
            await this.signInWithEmail(email, password);
        }
    }

    async signInWithEmail(email: string, password: string): Promise<void> {

        const {data, error} = await this.supabase.auth.signInWithPassword({email, password});

        if (error) {
            console.error('Sign-in error:', error);
        } else {
            console.log("Logged in as: " + data.user);
        }
    }
}
