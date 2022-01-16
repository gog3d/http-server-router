'use strict';

module.exports = (taskId) => {
  if (taskId === 'all') return JSON.stringify('all tasks');
  return JSON.stringify(`tasks ${taskId}`);
};
