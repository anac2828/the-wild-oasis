import supabase from './supabase'

// * GET SETTINGS
export async function getSettings() {
  const { data, error } = await supabase.from('settings').select('*').single()

  // Error will be handled by the useQuery hook in useSettings.js
  if (error) {
    console.error(error)
    throw new Error('Settings could not be loaded')
  }
  return data
}

// * UPDATE SETTINGS
// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  const { data, error } = await supabase
    .from('settings')
    .update(newSetting) // newsSetting = data to updata field {setting: newValue}
    .eq('id', 1) //select row to update
    .single()

  // Error will be handled by the useQuery hook in useUpdateSettings.js
  if (error) {
    console.error(error)
    throw new Error('Settings could not be updated')
  }
  return data
}
