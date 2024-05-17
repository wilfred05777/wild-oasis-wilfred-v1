import { useEffect, useRef } from "react";

//  refactor output
export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}


/**
   * this below code is refactor in hooks/useOutsideClick.js
   * soon to remove next push
  /
  // const ref = useRef();
  // useEffect(
  //     function () {
  //       function handleClick(e) {
  //       //                       modal in DOM
  //         if(ref.current && !ref.current.contains(e.target)) 
  //         {
  //           console.log("click outside")
  //           close();
  //         }
  //       }

  //     // document.addEventListener("click", handleClick) fundamental knowledge of javascript in 2nd section.
  //     document.addEventListener("click", handleClick, true)

  //     /*
  //     *  
  //     */
  //     return () => document.removeEventListener("click", handleClick, true)
  //   }, 
  //   [close] 
  // )
 