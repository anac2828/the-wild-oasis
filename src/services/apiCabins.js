import supabase, { supabaseUrl } from './supabase'

// ** GET ALL CABINS ** //
export async function getCabins() {
  // Fetches cabin data from supabase. "*" selects all fields in the table
  let { data: cabins, error } = await supabase.from('cabins').select('*')

  if (error) {
    console.error(error)
    throw new Error('Cabins could not be loaded.')
  }

  return cabins
}

// ** CREATE/EDIT CABIN API FUNCTION ** //
export async function createEditCabin(newCabin, id) {
  // ** IMAGE SETUP

  // 1 - Create image name to be saved in supabase. Replace any '/' so that supabase doesn't create a folder. The image.name comes from the image uploaded on the form.
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    '',
  )

  // 2 - Check if newCabin.image name already contains a supabaseUrl (it will have one when a cabin is being edited)
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)

  // 3 - Create an image path that will be stored in the cabins table to link to the supabase storage.
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  // const { data, error } = await supabase
  //   .from('cabins')
  //   .insert([{ ...newCabin, image: imagePath }])
  // * "select()" will return the created cabin //
  //   .select()
  //   .single();

  // Refactored to check if the cabin is beeing edited

  //** SAVE CABIN TO SUPABASE */
  // Select cabins table on supabase
  let query = supabase.from('cabins')

  // A - Query if creating a new cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }])

  // B - Query if updating a cabin. eq() selects the cabin to be updated based on the id field
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id)

  // Return the created or edited cabin data using .select().single()
  const { data, error } = await query.select().single()

  // Cabin error handler
  if (error) {
    console.error(error)
    throw new Error('Cabin could not be created.')
  }

  //**  UPLOAD IMAGE TO SUPABASE STORAGE
  // If there is an image path in the newCabin object return the updated cabin data. Code below this line will not be executed
  if (hasImagePath) return data

  // Storage error handler
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    // imageName = link to image - newCabin.image is the actual image
    .upload(imageName, newCabin.image)

  //  Delete cabin if there was an error when uploading image to prevent a cabin from being created without an image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id)
    throw new Error(
      'Cabin image could not be uploaded and the cabin was not created.',
    )
  }
  // Return data after image has been uploaded
  return data
}

// ** DELETE CABIN ** //
export async function deleteCabin(id) {
  // .eq('column in table', 'value to match')
  const { data, error } = await supabase.from('cabins').delete().eq('id', id)

  if (error) {
    console.error(error)
    throw new Error('Cabin could not be deleted.')
  }

  return data
}
