type ErrorWithMessage = {
  message: string;
};

export function isErrorWithKey<TKey extends string>(
  error: unknown,
  key: TKey
): error is Record<TKey, string> {
  return (
    typeof error === 'object' &&
    error !== null &&
    key in error &&
    typeof (error as Record<string, unknown>)[key] === 'string'
  );
}

function toErrorWithMessage(
  maybeError: unknown,
  fallbackMessage?: string
): ErrorWithMessage {
  if (isErrorWithKey(maybeError, 'message')) return maybeError;

  if (fallbackMessage) {
    throw new Error(fallbackMessage);
  }

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}

export function getErrorMessage(error: unknown, fallbackMessage?: string) {
  if (typeof error === 'string') return error;
  return toErrorWithMessage(error, fallbackMessage).message;
}
