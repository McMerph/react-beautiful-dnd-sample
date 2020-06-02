import React, { memo } from 'react';
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

export const taskPropType = PropTypes.exact({
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
});

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
        aria-roledescription="Press space bar to lift the task"
      >
        {task.content}
      </Text>
    )}
  </Draggable>
);
Task.propTypes = {
  task: taskPropType.isRequired,
  index: PropTypes.number.isRequired,
};

const Tasks = memo(({ tasks }) =>
  tasks.map((task, index) => <Task key={task.id} task={task} index={index} />)
);
Tasks.propTypes = {
  tasks: PropTypes.arrayOf(taskPropType.isRequired).isRequired,
};

export default Tasks;
