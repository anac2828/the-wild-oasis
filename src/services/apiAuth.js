import supabase from './supabase';

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  // will get session from local storage
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  // If there is a session it will fetch the user from supabase
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
