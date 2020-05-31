import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Text = styled.p`
  margin: 0 0 8px 0;
  padding: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
  user-select: none;
`;

const Task = ({ task, index }) => (
  <Draggable draggableId={task.id} index={index}>
    {(provided, snapshot) => (
      <Text
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...provided.draggableProps}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
      >
        {task.content}
      </Text>
    )}
  </Draggable>
);

Task.propTypes = {
  task: PropTypes.exact({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default Task;
