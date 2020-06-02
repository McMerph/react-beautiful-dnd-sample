import React from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Task from './task';

const Wrapper = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: #fff;
  flex: 0 0 220px;

  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  margin: 0;
  padding: 8px;
`;
const TaskList = styled.div`
  margin: 0;
  padding: 8px;
  transition: background-color 200ms ease;
  background-color: ${(props) =>
    props.isDraggingOver ? 'skyblue' : 'inherit'};
  flex-grow: 1;
  min-height: 100px;
`;

const Column = ({ column, tasks, index }) => (
  <Draggable draggableId={column.id} index={index}>
    {(providedDraggable) => (
      <Wrapper
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...providedDraggable.draggableProps}
        ref={providedDraggable.innerRef}
      >
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Title {...providedDraggable.dragHandleProps}>{column.title}</Title>
        <Droppable droppableId={column.id} type="task">
          {(providedDroppable, snapshot) => (
            <TaskList
              ref={providedDroppable.innerRef}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...providedDroppable.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {tasks.map((task, taskIndex) => (
                <Task key={task.id} task={task} index={taskIndex} />
              ))}
              {providedDroppable.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Wrapper>
    )}
  </Draggable>
);

Column.propTypes = {
  column: PropTypes.exact({
    id: PropTypes.string.isRequired,
    taskIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  index: PropTypes.number.isRequired,
};

export default Column;
