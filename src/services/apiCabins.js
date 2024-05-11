// @ts-nocheck
/* eslint-disable no-unused-vars */
import supabase, { supabaseUrl } from './supabase'

/**
 *  GET Cabins API
 */
export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*')

  if (error) {
    console.log(error)
    throw Error('Cabins could not be loaded')
  }

  return data
}


/**
 * REPOSITORY resource
 * https://github.com/jonasschmedtmann/ultimate-react-course/tree/main/17-the-wild-oasis
 * 
 * https://github.com/jonasschmedtmann/ultimate-react-course/blob/main/17-the-wild-oasis/final-3-after-react-query/src/services/apiCabins.js
 */
/**
 *  createEditCabin API
 */

export async function createEditCabin(newCabin, id) {
  // console.log(newCabin, id)

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  )

  // https://nprjwrlyinrzjlobymld.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  const imagePath = hasImagePath 
    ? newCabin.image 
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  // 1.  create / edit cabin

  let query = supabase.from('cabins')

  // A) CREATE
  if(!id) query = query.insert([{ ...newCabin, image: imagePath }])
  
  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id)

  const { data, error } = await query.select().single()

  if (error) {
    console.log(error)

    throw Error('Cabin could not be created.')
  }

  // 2. Upload image
  if(hasImagePath) return data; // if image is already uploaded 

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image)

  // 3. Delete the cabin IF there was an error uploading the image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id)

    console.log(storageError)

    throw Error(
      'Cabin image could not be uploaded and the cabin was not created.'
    )
  }

  return data
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id)

  if (error) {
    console.log(error)
    throw Error('Cabin could not be deleted')
  }

  return data
}

/**
 *  CREATE A NEW CABIN : IGNORE THIS BELOW CODE
 */
export async function createCabin(newCabin){
  const { data, error } = await supabase
  .from('cabins')
  .insert([
    newCabin
  ])
  // .select()

  if (error) {
    console.log(error)
    throw Error('Cabins could not be deleted')
  }

  return data

}