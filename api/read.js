'use strict';

module.exports = async (taskId) => {
  //if (taskId === 'all') return JSON.stringify('all tasks');
  //return JSON.stringify(`tasks ${taskId}`);
  return taskId.toString() + ' ' + 'readMethod';
};
