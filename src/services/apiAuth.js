import supabase from './supabase'
import { supabaseUrl } from './supabase'

const BASE_URL = 'https://the-wild-oasis-ac26.netlify.app'

// * SIGN UP
export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    // options will save the data object under user.user_metadata to add aditional information
    // Once a user is signed up
    options: { data: { fullName, avatar: '' } },
  })

  if (error) throw new Error(error.message)
  return data
}

// * LOGIN
export async function login({ email, password }) {
  // When user logs in. A session will be saved in the local storage that expires in 60 minutes
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw new Error(error.message)

  return data
}

// * RESET PASSWORD

export async function resetPassword(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${BASE_URL}/account`,
  })
}

// * LOGOUT
export async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) throw new Error(error.message)
}

// * GET CURRENT USER - Check if there is a user with a current session
export async function getCurrentUser() {
  //  1 Will get session from local storage saved when the user logged in with login() above.
  const { data: session } = await supabase.auth.getSession()

  // Error handler
  if (!session.session) return null

  // 2 If there is a session it will fetch the user data from supabase and it will include a role: "authenticated"
  const { data, error } = await supabase.auth.getUser()

  // Error handler
  if (error) throw new Error(error.message)

  return data?.user
}

// * UPDATE CURRENT USER
export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password or fullname
  let updateData
  if (password) updateData = { password }
  if (fullName) updateData = { data: { fullName } }

  const { data, error } = await supabase.auth.updateUser(updateData)

  if (error) throw new Error(error.message)
  // End of function if no avatar to upload
  if (!avatar) return data

  // 2. Upload the avatar image to storage bucket
  const fileName = `avatar-${data.user.id}-${Math.random()}`

  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar)

  // Error handler
  if (storageError) throw new Error(storageError.message)

  // 3. Update avatar url
  const { data: updateUserWithAvatar, error: error2 } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    })

  // Error handler
  if (error2) throw new Error(error2.message)

  // Return data
  return updateUserWithAvatar
}
