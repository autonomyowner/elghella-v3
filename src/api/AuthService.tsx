import { supabase } from "../lib/supabaseClient";

class AuthService {
  async login(data: { email: string; password: string }) {
    // Supabase sign in
    const { error, data: sessionData } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) throw new Error(error.message);
    return sessionData;
  }

  async register(data: {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    telephone?: string;
  }) {
    if (data.password !== data.confirmPassword) {
      throw new Error("Passwords do not match");
    }
    const { error, data: sessionData } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { name: data.name, telephone: data.telephone },
      },
    });
    if (error) throw new Error(error.message);
    return sessionData;
  }

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }

  async getCurrentUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw new Error(error.message);
    return data.user;
  }
}

export default new AuthService();
