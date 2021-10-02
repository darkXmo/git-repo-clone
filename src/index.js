import exec from "./exec.js";

/**
 * clone
 * @param {string} gitHref git地址
 * @param {string | undefined} branch 分支，建议填上
 * @param {string | undefined} dir 下载到本地的地址，默认为git仓库名
 */
const clone = async (gitHref, branch, dir) => {
  if (!branch && !dir) {
    exec("git", ["clone", gitHref]);
  } else if (!branch) {
    exec("git", ["clone", gitHref, dir]);
  } else if (!dir) {
    exec("git", ["clone", "-b", branch, gitHref]);
  } else {
    exec("git", ["clone", "-b", branch, gitHref, dir]);
  }
};

export default clone;
