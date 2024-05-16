/* eslint-disable react/prop-types */
// /* eslint-disable react/jsx-no-undef */
// @ts-nocheck
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'

import { useForm } from 'react-hook-form'

import { useEditCabin } from './useEditCabin'
import { useCreateCabin } from './useCreateCabin'
import { createEditCabin } from '../../services/apiCabins'



function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const [showForm, setShowForm] = useState(false)

  const { id: editId, ...editValues } = cabinToEdit
  const isEditSession = Boolean(editId)

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {}
  })

  /**
   *  CREATE NEW CABIN API INSERT HERE
  */
  const { errors } = formState
  // console.log(errors)

  const { isCreating, createCabin } = useCreateCabin()

  // const queryClient = useQueryClient()

  // const { mutate: createCabin , isLoading: isCreating } = useMutation({
  //   // mutationFn: newCabin => createCabin,
  //   mutationFn: createEditCabin,
  //   onSuccess: () => {
  //     toast.success('New cabin successfully created')
  //     queryClient.invalidateQueries({ queryKey: ['cabins'] })
  //     reset()
  //   },
  //   onError: (err) => {
  //     toast.error(err.message)
  //   }
  // })

  /**
   *  EDIT  CABIN API INSERT HERE
   */

  const { isEditing, editCabin } = useEditCabin()

  // const { mutate: editCabin, isLoading: isEditing } = useMutation({
  //   // mutationFn: newCabin => createCabin,
  //   mutationFn: ({ newCabinData, id }) => createEditCabin( newCabinData, id),
  //   onSuccess: () => {
  //     toast.success('Cabin successfully edited')
  //     queryClient.invalidateQueries({ queryKey: ['cabins'] })
  //     reset()
  //   },
  //   onError: (err) => {
  //     toast.error(err.message)
  //   }
  // })

  const isWorking = isCreating || isEditing;


  function onSubmit(data) {
    // console.log(data)
    // MODIFIED object creation
    // mutate({...data, image: data.image[0]})

    const image = typeof data.image === 'string' ? data.image : data.image[0]

    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset()
          }
        }
      );
    else createCabin(
      { ...data, image: image },
      {
        onSuccess: (data) => {
          // console.log(data);
          reset();
          onCloseModal?.();
        }
      }
    )

  }

  function onError(error) {
    // console.log(errors)

  }

  return (
    /**
     * FORM onSubmit click handler
     */

    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? "modal" : "regular"}
    >

      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isWorking}
          {...register('name', {
            required: 'This cabin field is required'
          })}
        />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This capacity field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1'
            }
          })}
        />
      </FormRow>

      <FormRow label='Regular Price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This regular price field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1'
            }
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          disabled={isWorking}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              value <= getValues().regularPrice ||
              'Discount should be less than the regular price'
            // value > 100 || 'Discount should be less than the regular amount'
          })}
        />
      </FormRow>

      <FormRow
        label='Description for website'
        disabled={isWorking}
      >
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          disabled={isWorking}
          {...register('description', {
            required: 'This field is required'
          })}
        />
      </FormRow>

      <FormRow label='Cabin photo'>
        <FileInput
          id='image'
          accept='image/*'
          type='file'
          {...register('image', {
            required: isEditSession ? false : 'This field is required'
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation='secondary'
          type='reset'
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        {/* <Button variation='secondary'  onClick={() => setShowForm((show) => !show)}>Cancel</Button> */}
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit Cabin' : 'Create New Cabin'}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateCabinForm
