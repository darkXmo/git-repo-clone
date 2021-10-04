import exec from "./exec";
import path from "path";

export async function clone(
  gitHref: string,
  branch?: string,
  dir?: string,
  empty?: boolean
) {
  if (!branch && !dir) {
    await exec("git", ["clone", gitHref]);
  } else if (!branch) {
    await exec("git", ["clone", gitHref, dir]);
  } else if (!dir) {
    await exec("git", ["clone", "-b", branch, gitHref]);
  } else {
    await exec("git", ["clone", "-b", branch, gitHref, dir]);
  }
  let ans: string;
  if (!dir) {
    ans = path.resolve(
      process.cwd(),
      gitHref.split("/").pop().replace(".git", "")
    );
  } else {
    ans = path.resolve(process.cwd(), dir);
  }
  if (empty) {
    await exec("rm", ["-rf", ".git"], ans);
  }
  return ans;
}

export default clone;
