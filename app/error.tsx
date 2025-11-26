'use client';

type Props = {
  error: Error;
};

const Error = ({ error }: Props) => {
  return (
    <p>Something gone wrong... {error.message}</p>
  );
}

export default Error;