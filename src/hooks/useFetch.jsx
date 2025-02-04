import { useEffect } from "react";
import { axiosInstance } from "../config/axiosInstance";

const useFetch = (url) => {

    const fetchTurfs = async () => {
        try {
          const response = await axiosInstance({
            method: "GET",
            url: url,
          });
          console.log(response.data)
          dispatch(setTurfLists(response?.data?.data));
        } catch (error) {
            console.log(error)
        }
      }
    
      useEffect(() => {
        fetchTurfs()
      }, [])
    
    return [data] 
}