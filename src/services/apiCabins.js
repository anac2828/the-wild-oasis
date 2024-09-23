import supabase, { supabaseUrl } from './supabase';

// ** GET ALL CABINS ** //
export async function getCabins() {
  // Fetches cabin data from supabase. "*" selects all fields in the table
  let { data: cabins, error } = await supabase.from('cabins').select('*');
  console.log(cabins);
  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded.');
  }

  return cabins;
}

// ** CREATE/EDIT CABIN ** //
export async function createEditCabin(newCabin, id) {
  // Returns true or false if there is or there is not an image URL
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  // Replace any '/' so that supabase doesn't create a folder. The image.name comes from the image uploaded on the form by user.
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );
  // Path of image that will be stored in the cabins table.
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // const { data, error } = await supabase
  //   .from('cabins')
  //   .insert([{ ...newCabin, image: imagePath }])
  // * "select()" will return the created cabin //
  //   .select()
  //   .single();

  // Refactored to check if the cabin is beeing edited

  //** 1 - Create/edit cabin */
  let query = supabase.from('cabins');

  // A - Create cabin query
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B - Edit cabin query
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  // Will return the created or edited cabin
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created.');
  }

  //**  2 - Upload image
  // Will not upload image if there is one already
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    // newCabin.image is the actual image
    .upload(imageName, newCabin.image);

  //** 3 - Delete cabin if there was an error when uploading image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    throw new Error(
      'Cabin image could not be uploaded and the cabin was not created.'
    );
  }

  return data;
}

// ** DELETE CABIN ** //
export async function deleteCabin(id) {
  // .eq('column in table', 'value to match')
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted.');
  }

  return data;
}
