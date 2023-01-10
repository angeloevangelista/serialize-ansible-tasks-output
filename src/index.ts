function serializeTasksOutputs(
  ansibleOutputLog: string,
  safeResults = ["ok", "included", "changed", "nothing", "skipping"],
) {
  const tasks = ansibleOutputLog
    .replace(/(\n|\\n)/gi, "")
    .split("TASK")
    .map((p) => p.trim())
    .filter((p) => p.startsWith("["))
    .map((task) => {
      const taskName = task.substring(1, task.indexOf("]"));

      let startIndexOfResult = task.indexOf("*");

      while (task.at(startIndexOfResult) === "*") {
        startIndexOfResult++;
      }

      const endIndexOfResult =
        task.substring(startIndexOfResult).indexOf(": ") + startIndexOfResult;

      let result = task
        .substring(startIndexOfResult, endIndexOfResult)
        .replace("*", "nothing")
        .trim();

      const isError = !safeResults.some((p) => p === result);

      if (isError) {
        const playRecapIndex = task.toUpperCase().indexOf("PLAY RECAP");

        result = task
          .substring(
            startIndexOfResult,
            playRecapIndex != -1 ? playRecapIndex : undefined,
          )
          .trim();
      }

      return {
        taskName,
        result,
        isError,
      };
    });

  return tasks;
}

export { serializeTasksOutputs };
