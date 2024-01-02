import { FormEvent, useState } from 'react';
import {
  CheckBadgeIcon,
  PaperAirplaneIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { useMutation } from '@tanstack/react-query';

import { getAPIRoute } from '@/lib';
import { ButtonAlt, ButtonIcon, InputHelperText, Spinner } from '../Shared';
import { validateEmail } from '@/utils/validation';

async function sendEmail(payload: { email: string; code: string }) {
  if (!payload.email) {
    throw new Error('Email is required.');
  }

  if (!payload.code) {
    throw new Error('Voucher code is required.');
  }

  const response = await fetch(`${getAPIRoute()}/email/send`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as {
    success: boolean;
    message: string;
    data: null | Record<string, unknown>;
  };

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Could not send email.');
  }

  return data;
}

interface Props {
  code: string;
  disabled?: boolean;
}

function SendByEmail({ disabled = false, code }: Props) {
  const [errorMessageEmail, setErrorMessageEmail] = useState<string | null>(
    null
  );

  const mutation = useMutation({
    mutationFn: sendEmail,
    onSuccess() {
      setErrorMessageEmail(null);
    },
    onError(err) {
      if (err instanceof Error) {
        setErrorMessageEmail(err.message);
      } else {
        setErrorMessageEmail('Could not send email.');
      }
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { elements } = e.currentTarget;
    const emailEl = elements.namedItem(
      'voucher-email-redeem'
    ) as HTMLInputElement | null;
    const emailValue = emailEl?.value;
    if (emailValue && validateEmail(emailValue)) {
      setErrorMessageEmail(null);
      mutation.mutate({ email: emailValue || '', code });
      return;
    }

    setErrorMessageEmail('Please provide a valid email address');
    return false;
  };

  return (
    <form className="space-y-2" onSubmit={onSubmit}>
      <div className="space-y-2">
        <label
          className="text-sm font-display font-semibold text-smooth md:text-base"
          htmlFor="voucher-email-redeem"
        >
          Send to my email (optional)
        </label>
        <div className="flex space-x-2 md:space-x-2">
          <input
            type="email"
            id="voucher-email-redeem"
            placeholder="Email Address"
            className="border-3 disabled:bg-[#F1F7FC] border-peaceful focus:ring-peaceful w-full h-14 rounded-2xl focus:outline-none focus:ring-2 md:text-lg md:h-16 md:p-6"
            disabled={mutation.isSuccess}
          />

          <ButtonAlt
            type="submit"
            size="md"
            className="px-5 text-brand md:hidden justify-center disabled:cursor-not-allowed"
            disabled={disabled || mutation.isLoading || mutation.isSuccess}
          >
            {mutation.isLoading ? (
              <Spinner className="w-5 h-5 text-brand animate-spin fill-brand" />
            ) : (
              'Send'
            )}
          </ButtonAlt>

          <ButtonIcon
            type="submit"
            variant="alt"
            className="hidden md:flex disabled:cursor-not-allowed"
            icon={
              mutation.isLoading ? (
                <Spinner className="w-4 h-4 md:w-6 md:h-6 text-white animate-spin fill-brand" />
              ) : (
                <PaperAirplaneIcon className="w-6 h-6" aria-hidden="true" />
              )
            }
            disabled={disabled || mutation.isLoading || mutation.isSuccess}
          >
            Send
          </ButtonIcon>
        </div>
      </div>

      <div className="inline-block">
        {mutation.isSuccess && !errorMessageEmail ? (
          <InputHelperText
            show={mutation.isSuccess}
            variant="success"
            text="Email sent succesfully"
            icon={
              <CheckBadgeIcon
                className="w-4 h-4 md:w-5 md:h-5"
                aria-hidden="true"
                strokeWidth={2}
              />
            }
          />
        ) : (
          <InputHelperText
            show={errorMessageEmail !== null}
            variant="error"
            text={errorMessageEmail || ''}
            icon={
              <XCircleIcon
                className="w-4 h-4 md:w-5 md:h-5"
                aria-hidden="true"
                strokeWidth={2}
              />
            }
          />
        )}
      </div>
    </form>
  );
}

export default SendByEmail;
