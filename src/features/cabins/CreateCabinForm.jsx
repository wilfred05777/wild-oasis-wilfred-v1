/* eslint-disable react/prop-types */
// /* eslint-disable react/jsx-no-undef */
// @ts-nocheck
/* eslint-disable no-unused-vars */
import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEditCabin } from '../../services/apiCabins'

import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'

import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit
  const isEditSession = Boolean(editId)

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {}
  })

  const { errors } = formState
  console.log(errors)

  const queryClient = useQueryClient()

  const { mutate, isLoading: isCreating } = useMutation({
    // mutationFn: newCabin => createCabin,
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created')
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
      reset()
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })

  function onSubmit(data) {
    console.log(data)

    // MODIFIED object creation
  }

  function onError(error) {
    console.log(error)
  }

  return (
    /**
     * FORM onSubmit click handler
     */

    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isCreating}
          {...register('name', {
            required: 'This cabin field is required'
          })}
        />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
        disabled={isCreating}
        error={errors?.description?.message}
      >
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          disabled={isCreating}
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
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isCreating}>
          {isEditSession ? 'Edit Cabin' : 'Create New Cabin'}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateCabinForm
