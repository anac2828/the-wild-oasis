import supabase from './supabase';
import { supabaseUrl } from './supabase';

// * SIGN UP
export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    // to add aditional data to created user
    options: { data: { fullName, avatar: '' } },
  });

  if (error) throw new Error(error.message);
  return data;
}

// * LOGIN
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

// * GET CURRENT USER
export async function getCurrentUser() {
  // * 1 Will get session from local storage
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  //* 2 If there is a session it will fetch the user from supabase
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

// * LOGOUT
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

// * UPDATE CURRENT USER
export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password or fullname
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Upload the avatar image to storage bucket
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar with avatar uploaded
  const { data: updateUserWithAvatar, error: error2 } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (error2) throw new Error(error2.message);
  return updateUserWithAvatar;
}
