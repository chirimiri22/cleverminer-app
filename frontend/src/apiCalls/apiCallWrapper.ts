import { AxiosError } from "axios";

type AsyncFn<T> = () => Promise<T>;
type SetErrorFn = (error?: string) => void;

const isAxiosErrorWithDetail = (err: unknown): err is AxiosError<{ detail: string }> =>
  typeof err === "object" && err !== null && "isAxiosError" in err && (err as AxiosError).isAxiosError;

export const apiCallWrapper = async <T>(
  fetchFn: AsyncFn<T>,
  onError: SetErrorFn,
  onSuccess?: () => void
): Promise<T | undefined> => {
  try {
    const result = await fetchFn();
    onSuccess?.();
    return result;
  } catch (err: any) {
    let message = "Unknown error";
    console.log("Caught:", err);

    // Handle Axios error with FastAPI-style error payload
    if (isAxiosErrorWithDetail(err)) {
      message = err.response?.data?.detail || message;
    } else if (err instanceof Error) {
      message = err.message;
    }

    onError(message);
    return undefined;
  }
};
