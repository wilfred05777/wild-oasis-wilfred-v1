import { getCabins } from '../../services/apiCabins'
import { useQuery } from '@tanstack/react-query'


export function useCabin(){


  const { 
    isLoading, 
    data: cabins, 
    error 
} = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins
  })

  return { isLoading, error, cabins }
}