import React, { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from '../initial-data.json';
import Column from '../components/column';

const Wrapper = styled.div`
  display: flex;
`;

const moveTaskInsideColumn = (column, startIndex, finishIndex, toMove) => {
  const newTaskIds = Array.from(column.taskIds);
  newTaskIds.splice(startIndex, 1);
  newTaskIds.splice(finishIndex, 0, toMove);

  return { ...column, taskIds: newTaskIds };
};

const removeTaskFromColumn = (column, index) => {
  const newTaskIds = Array.from(column.taskIds);
  newTaskIds.splice(index, 1);

  return { ...column, taskIds: newTaskIds };
};

const addTaskToColumn = (column, index, toAdd) => {
  const newTaskIds = Array.from(column.taskIds);
  newTaskIds.splice(index, 0, toAdd);

  return { ...column, taskIds: newTaskIds };
};

const IndexPage = () => {
  const [data, setData] = useState(initialData);
  const [startIndex, setStartIndex] = useState(null);
  const onDragStart = (start) => {
    setStartIndex(data['column-order'].indexOf(start.source.droppableId));
  };
  const onDragEnd = (result) => {
    setStartIndex(null);
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
      const start = prev.columns[source.droppableId];
      const finish = prev.columns[destination.droppableId];
      if (start === finish) {
        const newColumn = moveTaskInsideColumn(
          start,
          source.index,
          destination.index,
          draggableId
        );

        return {
          ...prev,
          columns: { ...prev.columns, [newColumn.id]: newColumn },
        };
      }

      const newStart = removeTaskFromColumn(start, source.index);
      const newFinish = addTaskToColumn(finish, destination.index, draggableId);
      return {
        ...prev,
        columns: {
          ...prev.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };
    });
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Wrapper>
        {data['column-order'].map((columnId, index) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
          const isDropDisabled = index < startIndex;

          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              isDropDisabled={isDropDisabled}
            />
          );
        })}
      </Wrapper>
    </DragDropContext>
  );
};

export default IndexPage;
