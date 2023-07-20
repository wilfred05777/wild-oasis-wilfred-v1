// @ts-nocheck
/* eslint-disable no-unused-vars */
import supabase from './supabase'

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*')

  if (error) {
    console.log(error)
    throw Error('Cabins could not be loaded')
  }

  return data
}

export async function createCabin(newCabin) {
  const { data, error } = await supabase
    .from('cabins')
    // .insert([{ some_column: 'someValue', other_column: 'otherValue' }])
    .insert([newCabin])
    .select()

  if (error) {
    console.log(error)

    throw Error('Cabin could not be created.')
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
