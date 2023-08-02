// @ts-nocheck
/* eslint-disable no-unused-vars */
import supabase, { supabaseUrl } from './supabase'

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*')

  if (error) {
    console.log(error)
    throw Error('Cabins could not be loaded')
  }

  return data
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  )

  // https://nprjwrlyinrzjlobymld.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  // 1. create cabin

  const { data, error } = await supabase
    .from('cabins')
    // .insert([{ some_column: 'someValue', other_column: 'otherValue' }])
    // .insert([newCabin])
    .insert([{ ...newCabin, image: imagePath }])
    .select()

  if (error) {
    console.log(error)

    throw Error('Cabin could not be created.')
  }

  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload('imageName', newCabin.image)

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
    throw Error('Cabins could not be deleted')
  }

  return data
}
