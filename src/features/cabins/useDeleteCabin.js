import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

// eslint-disable-next-line no-unused-vars
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    // mutationFn: (id) => deleteCabin(id)
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      // alert('Cabin successfully deleted')
      toast.success("Cabin successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    // onError: (err) => alert(err.message)
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "react-hot-toast";
// import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

// export function useDeleteCabin() {
//   const queryClient = useQueryClient();

//   const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
//     mutationFn: deleteCabinApi,
//     onSuccess: () => {
//       toast.success("Cabin successfully deleted");

//       queryClient.invalidateQueries({
//         queryKey: ["cabins"],
//       });
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   return { isDeleting, deleteCabin };
// }
