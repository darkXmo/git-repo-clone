import exec from "./exec";

export async function clone(gitHref: string, branch?: string, dir?: string) {
  if (!branch && !dir) {
    await exec("git", ["clone", gitHref]);
  } else if (!branch) {
    await exec("git", ["clone", gitHref, dir]);
  } else if (!dir) {
    await exec("git", ["clone", "-b", branch, gitHref]);
  } else {
    await exec("git", ["clone", "-b", branch, gitHref, dir]);
  }
}

export default clone;
