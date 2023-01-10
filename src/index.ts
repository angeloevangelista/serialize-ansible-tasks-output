import fs from "fs";

function serializeTasksOutputs(
  ansibleOutputLog: string,
  safeResults = ["ok", "included", "nothing", "skipping"],
) {
  const tasks = ansibleOutputLog
    .replace(/(\n|\\n)/gi, "")
    .split("TASK")
    .map((p) => p.trim())
    .filter((p) => p.startsWith("["))
    .map((task) => {
      const taskName = task.substring(1, task.indexOf("]"));

      const startIndexOfResult = task.lastIndexOf("*") + 1;

      const endIndexOfResult =
        task.substring(startIndexOfResult).indexOf(": ") + startIndexOfResult;

      const result = task
        .substring(startIndexOfResult, endIndexOfResult)
        .replace("*", "nothing")
        .trim();

      return {
        taskName,
        result,
        isError: !safeResults.some((p) => p === result),
      };
    });

  return tasks;
}

export { serializeTasksOutputs };
