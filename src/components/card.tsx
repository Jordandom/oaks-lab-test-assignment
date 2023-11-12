export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex max-w-md flex-col gap-8 rounded-lg border border-gray-200 p-6 shadow">
      {children}
    </div>
  );
};
