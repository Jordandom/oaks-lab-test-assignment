import React, { useEffect, useState } from 'react';

export const RandomFact: React.FC = () => {
  const [fact, setFact] = useState<string>('');

  useEffect(() => {
    fetch('https://uselessfacts.jsph.pl/random.json')
      .then((response) => response.json())
      .then((data) => setFact(data.text))
      .catch(console.error);
  }, []);

  return <div>{fact && <p>Random Fact: {fact}</p>}</div>;
};
