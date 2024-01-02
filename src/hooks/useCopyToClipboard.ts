import { useEffect, useState } from 'react';

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>; // Return success

interface Options {
  clearAfter: number;
}

function useCopyToClipboard({ clearAfter = 1000 } = {} as Options) {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const copy: CopyFn = async text => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      console.warn('Copy failed', error);
      setCopiedText(null);
      return false;
    }
  };

  useEffect(() => {
    if (copiedText && clearAfter !== 0) {
      const id = setTimeout(() => {
        setCopiedText(null);
      }, clearAfter);

      return () => clearTimeout(id);
    }
  }, [copiedText, clearAfter]);

  return { copiedText, copy };
}

export { useCopyToClipboard };
