# serialize-ansible-tasks-output

## Installation

```bash
npm install serialize-ansible-tasks-output
```

## Usage

```javascript
const { serializeTasksOutputs } = require("serialize-ansible-tasks-output");

const tasks = serializeTasksOutputs('YOUR_LOG_OUTPUT');

const failedTasks = tasks.filter(p => p.isError);

console.log({ failedTasks });
```
