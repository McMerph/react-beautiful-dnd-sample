import React, { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import initialData from '../initial-data.json';
import Column from '../components/column';

const Wrapper = styled.div`
  display: flex;
`;

const move = (prev, key, startIndex, finishIndex, toMove) => {
  const updated = Array.from(prev[key]);
  updated.splice(startIndex, 1);
  updated.splice(finishIndex, 0, toMove);

  return { ...prev, [key]: updated };
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
  const onDragStart = (start, provided) => {
    provided.announce(
      `You have lifted the task in position ${start.source.index + 1}`
    );
  };
  const onDragUpdate = (update, provided) => {
    const message = update.destination
      ? `You have moved the task to position ${update.destination.index + 1}`
      : `You are currently not over a droppable area`;
    provided.announce(message);
  };
  const onDragEnd = (result, provided) => {
    const { source, destination, draggableId, type } = result;
    const fromPosition = source.index + 1;
    if (!destination) {
      const message = `The task has been returned to its starting position of ${fromPosition}`;
      provided.announce(message);
      return;
    }

    const toPosition = destination.index + 1;
    const message = `You have moved the task from position ${fromPosition} to ${toPosition}`;
    provided.announce(message);
    const noChange =
      destination.droppableId === source.droppableId &&
      destination.index === source.index;
    if (noChange) {
      return;
    }

    if (type === 'column') {
      setData((prev) =>
        move(prev, 'column-order', source.index, destination.index, draggableId)
      );
      return;
    }

    setData((prev) => {
      const start = prev.columns[source.droppableId];
      const finish = prev.columns[destination.droppableId];
      if (start === finish) {
        const newColumn = move(
          start,
          'taskIds',
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
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Wrapper {...provided.droppableProps} ref={provided.innerRef}>
            {data['column-order'].map((columnId, index) => (
              <Column
                key={columnId}
                column={data.columns[columnId]}
                allTasks={data.tasks}
                index={index}
              />
            ))}
            {provided.placeholder}
          </Wrapper>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default IndexPage;
