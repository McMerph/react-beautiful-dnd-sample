import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from '../initial-data.json';
import Column from '../components/column';

const IndexPage = () => {
  const [data, setData] = useState(initialData);
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }
    const noChange =
      destination.droppableId === source.droppableId &&
      destination.index === source.index;
    if (noChange) {
      return;
    }

    setData((prev) => {
      const sourceColumn = prev.columns[source.droppableId];
      const newTaskIds = Array.from(sourceColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = { ...sourceColumn, taskIds: newTaskIds };

      return {
        ...prev,
        columns: { ...prev.columns, [newColumn.id]: newColumn },
      };
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {data['column-order'].map((columnId) => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
};

export default IndexPage;
