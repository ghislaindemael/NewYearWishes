import {Injectable, OnInit, signal, WritableSignal} from '@angular/core';
import {createClient, User} from '@supabase/supabase-js';
import {SupabaseService} from '../supabase/supabase.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnInit {

    private supabase;
    private loggedInUser : WritableSignal<User | null> = signal(null);

    constructor(private supabaseService: SupabaseService) {
        this.supabase = supabaseService.client;
    }


    async ngOnInit() {
        await this.retrieveOrRecreateSession();
    }

    public async isLoggedIn(): Promise<boolean> {
        await this.retrieveOrRecreateSession();
        return !!this.loggedInUser();
    };

    public doesEmailBelongToUser(email: string): boolean{
        return email == this.loggedInUser()?.email;
    }

    private async retrieveOrRecreateSession() {
        const session = await this.supabase.auth.getSession();
        if (session.data.session) {
            this.loggedInUser.set(session.data.session.user || null);
        } else {
            const response = await this.supabase.auth.getUser();
            this.loggedInUser.set(response.data.user || null);
        }
        //console.log("Checked session. Resulting user: ", this.loggedInUser());
    }

    async authenticateUser(password: string): Promise<boolean> {
        const {data, error} = await this.supabase
            .rpc('retrieve_email', {provided_password: password});

        if (error) {
            console.error('Authentication error:', error);
        } else {
            console.log('Password request result:', data);
        }

        if (data.length > 0) {
            const email = data[0].app_email;
            const success = await this.signInWithEmail(email, password);
            if (success) {
                return true;
            }
        }
        return false;
    }

    async signInWithEmail(email: string, password: string): Promise<boolean> {

        const {data, error} = await this.supabase.auth.signInWithPassword({email, password});

        if (error) {
            console.error('Sign-in error:', error);
            return false;
        } else {
            console.log("Logged in as: " + data.user);
            return true;
        }
    }

    async getCurrentUserEmail() {
        return this.loggedInUser()?.email || 'error@lesvoeuxdeghislain.com'
    }
}
