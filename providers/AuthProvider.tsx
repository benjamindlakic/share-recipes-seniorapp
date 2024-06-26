import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

type AuthData = {
    session: Session | null;
    profile: any;
    loading: boolean;
    setSession: (session: Session | null) => void;
    refetchProfile: () => void;
};

const AuthContext = createContext<AuthData>({
    session: null,
    profile: null,
    loading: true,
    setSession: () => {},
    refetchProfile: () => {},
});

export default function AuthProvider({ children }: PropsWithChildren) {
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async (session: Session) => {
        const [{ data: profileData }, { data: recipeCountData, error: recipeCountError }] = await Promise.all([
            supabase.from('profiles').select('*').eq('id', session.user.id).single(),
            supabase.from('recipes').select('id', { count: 'exact' }).eq('userID', session.user.id)
        ]);

        if (recipeCountError) {
            console.error('Error fetching recipe count:', recipeCountError);
        }

        setProfile({
            ...profileData,
            recipeCount: recipeCountData?.length || 0
        });
    };

    const refetchProfile = async () => {
        if (session) {
            await fetchProfile(session);
        }
    };

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            setLoading(false);

            if (session) {
                await fetchProfile(session);
            }
        };

        fetchSession();
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ session, profile, loading, setSession, refetchProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
