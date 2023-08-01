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
