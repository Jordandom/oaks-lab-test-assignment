import { Card } from '@components/card';
import { Heading } from '@components/heading';
import { RandomFact } from '@components/random-fact';
import { Phase } from 'components/phase';
import { usePhases } from 'store';

const App = () => {
  const phases = usePhases();

  return (
    <div className="flex h-screen flex-col items-center bg-white px-40 py-20">
      <RandomFact />
      <Card>
        <Heading title="My startup progress" size="s" />
        <div className="flex flex-col gap-8">
          {phases.map(({ name }) => (
            <Phase key={name} phaseName={name} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default App;
