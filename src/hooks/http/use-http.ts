import { useState, useCallback } from "react";
import { RequestConfig } from "./http";

type useHttpReturnType = {
  isLoading: boolean;
  error: any; // TODO: Define Error; remove any type
  sendHttpRequest: (
    requestConfig: RequestConfig,
    successCallback: (data: any) => void
  ) => Promise<any>;
};

export const useHttp = (): useHttpReturnType => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendHttpRequest = useCallback(
    async (
      requestConfig: RequestConfig,
      successCallback: (data: any) => void
    ): Promise<any> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(requestConfig.url, requestConfig.config);

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const data = await response.json();

        successCallback(data);
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    },
    []
  );

  return { isLoading, error, sendHttpRequest };
};
