import { useState, useCallback } from "react";

const useHttps = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusCode, setStatusCode] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const sendRequest = useCallback(async (requestConfig) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: JSON.stringify(requestConfig.body) || null,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const responseData = await response.json();
      // applyData(data);
      setStatusCode(await responseData.status);
      setResponseData(await responseData.data);
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

export default useHttps;
