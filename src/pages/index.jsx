import React from 'react';
import data from '../initial-data.json';
import Column from '../components/column';

const IndexPage = () =>
  data['column-order'].map((columnId) => {
    const column = data.columns[columnId];
    const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

    return <Column key={column.id} column={column} tasks={tasks} />;
  });

export default IndexPage;
