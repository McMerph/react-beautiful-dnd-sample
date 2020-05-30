import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Text = styled.p`
  margin: 0 0 8px 0;
  padding: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;

const Task = ({ task }) => <Text>{task.content}</Text>;

Task.propTypes = {
  task: PropTypes.exact({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default Task;
