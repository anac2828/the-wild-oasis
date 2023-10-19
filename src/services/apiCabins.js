import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  // this will fetch the cabins data from supabase. "*" selects all fields
  let { data: cabins, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return cabins;
}

export async function createEditCabin(newCabin, id) {
  // If the image field has a supabaseURL no new image was uploaded
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // replace any '/' so supace base doesn't create a folder if the files name contains a '/'. The image.name comes from the image uploaded on the form by user.
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
  // Image path to the image on supabase storage. We need to link to this path so the image displays on the browser.
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // const { data, error } = await supabase
  //   .from('cabins')
  //   .insert([{ ...newCabin, image: imagePath }])
  //   // will return the created cabin
  //   .select()
  //   .single();

  // refactored to fit if the cabin is beeing edited

  // 1 - create/edit cabin
  let query = supabase.from('cabins');

  // A - create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B - edit cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  // will return the created or edited cabin
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  // 2 - upload image
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    // newCabin.image is the actual image
    .upload(imageName, newCabin.image);

  // 3 - Delete cabin if there was a storage error
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    throw new Error('Cabin image could not be uploaded and the cabin was not created.');
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }

  return data;
}
