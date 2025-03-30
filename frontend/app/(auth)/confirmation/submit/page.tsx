import ConfirmationSubmit from '@/components/auth/confirmation/ConfirmationSubmit';

type Props = {
  searchParams: {
    confirmation?: string;
  };
};

export default async function page({ searchParams }: Props) {
  const confirmationToken = searchParams?.confirmation;
  return <ConfirmationSubmit confirmationToken={confirmationToken} />;
}