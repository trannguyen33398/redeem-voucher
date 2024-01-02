import { FormEvent, useState } from 'react';
import {
  CheckBadgeIcon,
  PaperAirplaneIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { ButtonIcon, InputHelperText, Spinner } from '../Shared';
import { getAPIRoute } from '@/lib';

const contactSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(1, { message: 'Name is required' }),
  email: z.string({ required_error: 'Email is required' }).email(),
  message: z
    .string({ required_error: 'Message is required' })
    .min(1, { message: 'Message is required' }),
});

type Contact = z.infer<typeof contactSchema>;
type FormErrors = Required<
  z.typeToFlattenedError<Contact>['fieldErrors'] & { termsChecked: string[] }
>;

async function sendContactEmail(payload: Contact) {
  const response = await fetch(`${getAPIRoute()}/contact-us`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as {
    success: boolean;
    message: string;
    data: string;
  };

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Could not send contact email.');
  }

  return data;
}

function ContactForm() {
  const [formValues, setFormValues] = useState<Contact>({
    name: '',
    email: '',
    message: '',
  });
  const [validationErrors, setValidationErrors] = useState<FormErrors>({
    name: [],
    email: [],
    message: [],
    termsChecked: [],
  });
  const [refId, setRefId] = useState('');
  const [checked, setChecked] = useState(false);
  const mutation = useMutation({
    mutationFn: sendContactEmail,
    onSuccess(data) {
      // reset form
      setFormValues({ email: '', message: '', name: '' });
      setRefId(data.data);
      // scroll user up to see notification
      window.scrollTo({
        top: 100,
        behavior: 'smooth',
      });
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setValidationErrors({
      name: [],
      email: [],
      message: [],
      termsChecked: [],
    });

    if (!checked) {
      setValidationErrors(prev => ({
        ...prev,
        termsChecked: ['Please agree to the privacy policy before proceeding.'],
      }));

      return;
    }

    const validation = contactSchema.safeParse(formValues);
    setChecked(false);

    if (!validation.success) {
      const { fieldErrors } = validation.error.flatten();

      setValidationErrors(prev => ({
        ...prev,
        ...fieldErrors,
      }));

      return;
    }

    mutation.mutate(formValues);
  };

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      {mutation.isSuccess && (
        <div className="w-full py-3 px-4 grid items-center grid-cols-12 space-x-1 rounded-xl text-white bg-[#31B237]">
          <CheckBadgeIcon
            className="hidden col-span-1 md:inline-block md:w-6 md:h-6"
            aria-hidden="true"
            strokeWidth={2}
          />
          <p className="text-sm col-span-11 font-display font-semibold md:text-base">
            We have received your inquiry ID {refId} and we&apos;ll contact you
            shortly.
          </p>
        </div>
      )}

      {mutation.isError && (
        <div className="w-full py-3 px-4 flex items-center space-x-1 rounded-xl text-white bg-[#EF4E4E]">
          <XCircleIcon
            className="hidden md:inline-block md:w-6 md:h-6"
            aria-hidden="true"
            strokeWidth={2}
          />
          <p className="text-sm font-display font-semibold md:text-base">
            {mutation.error instanceof Error
              ? mutation.error.message
              : 'Could not send email.'}
          </p>
        </div>
      )}

      <div className="flex flex-col space-y-2">
        <label
          className="text-sm font-display font-semibold text-smooth md:text-base"
          htmlFor="contact-name"
        >
          Name
        </label>
        <input
          type="text"
          id="contact-name"
          placeholder="Name"
          className="border-3 disabled:bg-[#F1F7FC] border-peaceful focus:ring-peaceful w-full h-14 rounded-2xl focus:outline-none focus:ring-2 md:text-lg md:h-16 md:p-6"
          name="name"
          value={formValues.name}
          onChange={({ target }) =>
            setFormValues(prev => ({ ...prev, [target.name]: target.value }))
          }
          onBlur={() =>
            validationErrors.name.length &&
            setValidationErrors(prev => ({ ...prev, name: [] }))
          }
        />
        <div className="w-fit">
          <InputHelperText
            show={validationErrors.name.length > 0}
            variant="error"
            text={validationErrors.name[0] ?? ''}
            icon={
              <XCircleIcon
                className="w-4 h-4 md:w-5 md:h-5"
                aria-hidden="true"
                strokeWidth={2}
              />
            }
          />
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <label
          className="text-sm font-display font-semibold text-smooth md:text-base"
          htmlFor="contact-email"
        >
          Email
        </label>
        <input
          type="text"
          id="contact-email"
          placeholder="Email"
          className="border-3 disabled:bg-[#F1F7FC] border-peaceful focus:ring-peaceful w-full h-14 rounded-2xl focus:outline-none focus:ring-2 md:text-lg md:h-16 md:p-6"
          name="email"
          value={formValues.email}
          onChange={({ target }) =>
            setFormValues(prev => ({ ...prev, [target.name]: target.value }))
          }
          onBlur={() =>
            validationErrors.email.length &&
            setValidationErrors(prev => ({ ...prev, email: [] }))
          }
        />
        <div className="w-fit">
          <InputHelperText
            show={validationErrors.email.length > 0}
            variant="error"
            text={validationErrors.email[0] ?? ''}
            icon={
              <XCircleIcon
                className="w-4 h-4 md:w-5 md:h-5"
                aria-hidden="true"
                strokeWidth={2}
              />
            }
          />
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <label
          className="text-sm font-display font-semibold text-smooth md:text-base"
          htmlFor="contact-message"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          placeholder="Message"
          rows={4}
          className="border-3 min-h-[140px] disabled:bg-[#F1F7FC] border-peaceful focus:ring-peaceful w-full rounded-2xl focus:outline-none focus:ring-2 md:text-lg md:p-6"
          name="message"
          value={formValues.message}
          onChange={({ target }) =>
            setFormValues(prev => ({ ...prev, [target.name]: target.value }))
          }
          onBlur={() =>
            validationErrors.message.length &&
            setValidationErrors(prev => ({ ...prev, message: [] }))
          }
        />
        <div className="w-fit">
          <InputHelperText
            show={validationErrors.message.length > 0}
            variant="error"
            text={validationErrors.message[0] ?? ''}
            icon={
              <XCircleIcon
                className="w-4 h-4 md:w-5 md:h-5"
                aria-hidden="true"
                strokeWidth={2}
              />
            }
          />
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center space-x-3">
          <input
            id="voucher-terms"
            type="checkbox"
            checked={checked}
            onChange={e => {
              setChecked(e.target.checked);
            }}
            required
            className="h-5 w-5 border-2 rounded-[4px] border-brand focus:outline-none focus:ring-2 focus:ring-peaceful"
          />
          <label htmlFor="contract-terms">
            By clicking the Send Message button below, you agree to the
            collection of your information to be used by GetX in accordance with
            its{' '}
            <a
              href="/privacy"
              target="_blank"
              style={{ color: '#5c80b8', fontWeight: 'bold' }}
            >
              Privacy Policy
            </a>
            .
          </label>
        </div>

        <div className="w-fit">
          <InputHelperText
            show={validationErrors.termsChecked.length > 0}
            variant="error"
            text={validationErrors.termsChecked[0] ?? ''}
            icon={
              <XCircleIcon
                className="w-4 h-4 md:w-5 md:h-5"
                aria-hidden="true"
                strokeWidth={2}
              />
            }
          />
        </div>
      </div>
      <ButtonIcon
        type="submit"
        fullWidth
        disabled={mutation.isLoading || !checked}
        icon={
          mutation.isLoading ? (
            <Spinner className="w-4 h-4 md:w-6 md:h-6 text-white animate-spin fill-brand" />
          ) : (
            <PaperAirplaneIcon className="block w-4 h-4 md:w-5 md:h-5 text-white -rotate-45" />
          )
        }
      >
        Send Message
      </ButtonIcon>
    </form>
  );
}

export default ContactForm;
