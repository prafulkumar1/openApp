import React from 'react';
import {RealmProvider} from '@realm/react';
import { TaskManager, TaskSchema, TaskSchema2 } from './components/TaskManager';


// Main App Component
const App = () => {
  return (
    <RealmProvider schema={[TaskSchema,TaskSchema2]}>
      <TaskManager />
    </RealmProvider>
  );
};

export default App;