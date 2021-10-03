import exec from "./exec.js";

/**
 * clone
 * @param {string} gitHref git地址
 * @param {string | undefined} branch 分支，建议填上
 * @param {string | undefined} dir 下载到本地的地址，默认为git仓库名
 */
async function clone(gitHref, branch, dir) {
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
