import { spawn } from "child_process";
/**
 * @param {string} command
 * @param {string[]} params
 */
export default async (command, params) => {
  await new Promise(function initCommand(resolve) {
    const e = spawn(command, params, {
      stdio: "inherit",
      cwd: process.cwd(),
    });
    e.on("close", () => {
      resolve();
    });
  });
};
