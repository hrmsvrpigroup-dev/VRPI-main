import { useState, useCallback } from "react";
import axios from "axios";

const useHttpsAxios = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusCode, setStatusCode] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const sendRequest = useCallback(async (requestConfig) => {
    setIsLoading(true);
    setError(null);
    setStatusCode(null);
    setResponseData(null);
    // for (const entry of requestConfig.body.entries()) {
    //   console.log(entry);
    // }
    try {
      const response = await axios({
        method: requestConfig.method ? requestConfig.method : "GET",
        url: requestConfig.url,
        headers: requestConfig.headers ? requestConfig.headers : {},
        data: requestConfig.body || null,
      });

      setStatusCode(await response.status);
      setResponseData(await response.data);

      if (!response.status.toString().startsWith("2")) {
        setError(`Request failed with status ${response.status}`);
      }
    } catch (err) {
      setStatusCode(err.response?.status);
      setError(err);
      setResponseData(err);
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    sendRequest,
    error,
    statusCode,
    responseData,
  };
};

export default useHttpsAxios;
