/* eslint-disable react/jsx-no-undef */
// @ts-nocheck
/* eslint-disable no-unused-vars */
import React from 'react'

import styled from 'styled-components'

import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCabin } from '../../services/apiCabins'

// const FormRow = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 24rem 1fr 1.2fr;
//   gap: 2.4rem;

//   padding: 1.2rem 0;

//   &:first-child {
//     padding-top: 0;
//   }

//   &:last-child {
//     padding-bottom: 0;
//   }

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }

//   &:has(button) {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `

// const Label = styled.label`
//   font-weight: 500;
// `

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `

function CreateCabinForm() {
  const queryClient = useQueryClient()

  const { register, handleSubmit, reset, getValues, formState } = useForm()

  const { errors } = formState
  console.log(errors)

  const { mutate, isLoading: isCreating } = useMutation({
    // mutationFn: newCabin => createCabin,
    mutationFn: createCabin,
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
    // console.log(data)
    // console.log('Successfully created')
    mutate(data)
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
        {/* <Label htmlFor='name'>Cabin name</Label> */}
        <Input
          type='text'
          id='name'
          disabled={isCreating}
          {...register('name', {
            required: 'This cabin field is required'
          })}
        />
        {/* {errors?.name?.message && <Error>{errors.name.message}</Error>} */}
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        {/* <Label htmlFor='maxCapacity'>Maximum capacity</Label> */}
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
        {/* {errors.maxCapacity?.message && (
          <Error>{errors.maxCapacity.message}</Error>
        )} */}
      </FormRow>

      <FormRow label='Regular Price' error={errors?.regularPrice?.message}>
        {/* <Label htmlFor='regularPrice'>Regular price</Label> */}
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
        {/* {errors?.regularPrice?.message && (
          <Error>{errors.regularPrice.message}</Error>
        )} */}
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        {/* <Label htmlFor='discount'>Discount</Label> */}
        <Input
          type='number'
          id='discount'
          disabled={isCreating}
          defaultValue={0}
          {...register('discount', {
            required: 'This filed is required',
            validate: (value) =>
              value <= getValues().regularPrice ||
              'Discount should be less than the regular price'
            // value > 100 || 'Discount should be less than the regular amount'
          })}
        />
        {/* {errors?.discount?.message && <Error>{errors.discount.message}</Error>} */}
      </FormRow>

      <FormRow
        label='Description for website'
        disabled={isCreating}
        error={errors?.description?.message}
      >
        {/* <Label htmlFor='description'>Description for website</Label> */}
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          disabled={isCreating}
          {...register('description', {
            required: 'This filed is required'
          })}
        />
        {/* {errors?.description?.message && (
          <Error>{errors.description.message}</Error>
        )} */}
      </FormRow>

      <FormRow label='Cabin photo'>
        {/* <Label htmlFor='image'>Cabin photo</Label> */}
        <FileInput id='image' accept='image/*' />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isCreating}>Add Cabin</Button>
      </FormRow>
    </Form>
  )
}

export default CreateCabinForm
