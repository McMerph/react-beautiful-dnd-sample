import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import data from '../initial-data.json';
import Column from '../components/column';

const IndexPage = () =>
  data['column-order'].map((columnId) => {
    const column = data.columns[columnId];
    const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

    return (
      <DragDropContext
        key={column.id}
        onDragEnd={() => {
          // TODO Implement
        }}
      >
        <Column column={column} tasks={tasks} />
      </DragDropContext>
    );
  });

export default IndexPage;
