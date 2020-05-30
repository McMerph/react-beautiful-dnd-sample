import React from 'react';
import PropTypes from 'prop-types';
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
`;

const Column = ({ column, tasks }) => (
  <Wrapper>
    <Title>{column.title}</Title>
    <TaskList>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </TaskList>
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
