import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Task from './task';

const Wrapper = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
`;
const Title = styled.h3`
  margin: 0;
  padding: 8px;
`;
const TaskList = styled.div`
  margin: 0;
  padding: 8px;
  transition: background-color 200ms ease;
  background-color: ${(props) => (props.isDraggingOver ? 'skyblue' : '#fff')};
`;

const Column = ({ column, tasks }) => (
  <Wrapper>
    <Title>{column.title}</Title>
    <Droppable droppableId={column.id}>
      {(provided, snapshot) => (
        <TaskList
          ref={provided.innerRef}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...provided.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}
        >
          {tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </TaskList>
      )}
    </Droppable>
  </Wrapper>
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
};

export default Column;
