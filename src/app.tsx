import { Card } from '@components/card';
import { RandomFact } from '@components/random-fact';
import { Phase } from 'components/phase';
import { usePhases } from 'store';

const App = () => {
  const phases = usePhases();

  return (
    <div className="flex h-screen flex-col items-center bg-white px-40 py-20">
      <RandomFact />
      <Card>
        {phases.map(({ name }, index) => (
          <div key={name} className={index !== 0 ? 'mt-8' : 'mt-0'}>
            <Phase phaseName={name} />
          </div>
        ))}
      </Card>
    </div>
  );
};

export default App;
