import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch } from "react-redux";
import { setTurfLists } from "../app/features/turf/turfSlice";

export const useFetch = (url, refreshState) => {
  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: url,
      });
      console.log("Fetch Data Response ==== ", response.data);
      // setTimeout(() => {
      //   setData(response?.data?.data);
      //   setIsloading(false);
      // }, 1000);
      setData(response?.data?.data);
      setIsloading(false);
      dispatch(setTurfLists(response?.data?.data));
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshState]);

  return [data, isLoading, error];
};