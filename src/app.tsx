// import { Card } from '@components/card';

// const App = () => (
//   <div className="flex h-screen flex-col items-center bg-white bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] px-40 py-20 dark:bg-gray-900 dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
//     <Card />
//   </div>
// );

// export default App;

// import { RandomFact } from '@components/random-fact'; // Adjust the path as necessary
// import React, { useState } from 'react';
// import { usePhaseActions, usePhases } from 'store'; // Adjust the path as necessary

// const App: React.FC = () => {
//   const phases = usePhases();

//   const { addTaskToPhase, toggleTaskCompletion } = usePhaseActions();

//   const [inputVisibility, setInputVisibility] = useState<{
//     [key: string]: boolean;
//   }>({});

//   const [newTaskNames, setNewTaskNames] = useState<{ [key: string]: string }>(
//     {}
//   );

//   const allPhasesCompleted = phases.every((phase) => phase.isCompleted);

//   const toggleInputVisibility = (phaseId: string) => {
//     setInputVisibility({
//       ...inputVisibility,
//       [phaseId]: !inputVisibility[phaseId],
//     });

//     if (!newTaskNames[phaseId]) {
//       setNewTaskNames({ ...newTaskNames, [phaseId]: '' });
//     }
//   };

//   const handleAddTask = (phaseId: string) => {
//     addTaskToPhase(phaseId, newTaskNames[phaseId]);
//     setNewTaskNames({ ...newTaskNames, [phaseId]: '' });
//   };

//   return (
//     <div>
//       {phases.map((phase) => (
//         <div key={phase.id}>
//           <h2>{phase.id}</h2>
//           <ul>
//             {phase.tasks.map((task) => (
//               <li key={task.id}>
//                 <label>
//                   <input
//                     type="checkbox"
//                     checked={task.isCompleted}
//                     onChange={() => toggleTaskCompletion(phase.id, task.id)}
//                     disabled={phase.isCompleted}
//                   />
//                   {task.name}
//                 </label>
//               </li>
//             ))}
//           </ul>
//           {!phase.isCompleted && (
//             <div>
//               {inputVisibility[phase.id] ? (
//                 <>
//                   <input
//                     type="text"
//                     value={newTaskNames[phase.id]}
//                     onChange={(e) =>
//                       setNewTaskNames({
//                         ...newTaskNames,
//                         [phase.id]: e.target.value,
//                       })
//                     }
//                     placeholder="New Task Name"
//                   />
//                   <button onClick={() => handleAddTask(phase.id)}>
//                     Add Task
//                   </button>
//                 </>
//               ) : (
//                 <button onClick={() => toggleInputVisibility(phase.id)}>
//                   Add Task
//                 </button>
//               )}
//             </div>
//           )}
//         </div>
//       ))}
//       {allPhasesCompleted && <RandomFact />}
//     </div>
//   );
// };

// export default App;

import { Phase } from '@components/phase';
import { RandomFact } from '@components/random-fact'; // Adjust the path as necessary
import React from 'react';
import { usePhaseActions, usePhases } from 'store'; // Adjust the path as necessary

const App: React.FC = () => {
  const phases = usePhases();
  const { resetPhases } = usePhaseActions();

  const allPhasesCompleted = phases.every((phase) => phase.isCompleted);

  return (
    <div className="flex h-screen flex-col items-center bg-white bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] px-40 py-20 dark:bg-gray-900 dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
      {phases.map((phase) => (
        <Phase key={phase.id} phaseId={phase.id} />
      ))}
      {allPhasesCompleted && (
        <>
          <RandomFact />
          <button onClick={resetPhases}>Reset Phases</button>
        </>
      )}
    </div>
  );
};

export default App;
