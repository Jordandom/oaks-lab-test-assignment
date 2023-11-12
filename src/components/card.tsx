import { Heading } from '@components/heading';

export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow">
      <Heading title="My startup progress" />
      {children}
    </div>
  );
};
