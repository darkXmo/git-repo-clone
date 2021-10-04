import { spawn } from "child_process";

export default async (
  command: string,
  params: readonly string[],
  cwd = process.cwd()
) => {
  await new Promise(function initCommand(resolve) {
    const e = spawn(command, params, {
      stdio: "inherit",
      cwd,
    });
    e.on("close", (code) => {
      resolve(code);
    });
  });
};
