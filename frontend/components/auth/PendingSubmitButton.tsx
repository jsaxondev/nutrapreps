import { useFormStatus } from 'react-dom';

interface PendingSubmitButtonProps {
  text: string;
}

export default function PendingSubmitButton({ text }: PendingSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      className={`w-full bg-blue-600 text-white px-4 py-2 rounded-md disabled:bg-sky-200 disabled:text-gray-400 disabled:cursor-wait`}
      disabled={pending}
      aria-disabled={pending}
    >
      {text}
    </button>
  );
}