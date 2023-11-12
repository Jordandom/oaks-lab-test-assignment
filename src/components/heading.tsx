export const Heading = ({
  title,
  size,
}: {
  title: string | undefined;
  size: 's' | 'm';
}) => (
  <h1
    className={`${
      size === 's' ? 'text-2xl' : 'text-4xl'
    } text-4xl font-bold leading-none tracking-tight text-gray-900`}
  >
    {title}
  </h1>
);
