import { exec } from "child_process";
import fs from "fs-extra";
import path from "path";
import clone from "../src/index";

jest.setTimeout(10000);

describe("clone", () => {
  beforeAll(() => {
    return Promise.all([
      fs.remove("git-repo-clone"),
      fs.remove("xmo-cli"),
      fs.remove("testDir"),
      fs.remove("testDirBranch"),
      fs.remove("removeGit"),
    ]);
  });
  afterAll(() => {
    return Promise.all([
      fs.remove("git-repo-clone"),
      fs.remove("xmo-cli"),
      fs.remove("testDir"),
      fs.remove("testDirBranch"),
      fs.remove("removeGit"),
    ]);
  });
  // 只传入git地址
  test("deafult clone", async () => {
    const dir = await clone("https://github.com/darkXmo/git-repo-clone.git");
    expect(fs.existsSync(path.join(process.cwd(), "git-repo-clone"))).toBe(
      true
    );
    expect(dir).toEqual(path.join(process.cwd(), "git-repo-clone"));
  });
  // 传入git地址和分支
  test("clone with branch", async () => {
    const dir = await clone(
      "https://github.com/darkXmo/xmo-cli.git",
      "primary"
    );
    expect(fs.existsSync(path.join(process.cwd(), "xmo-cli"))).toBe(true);
    const e = exec(
      "git rev-parse --abbrev-ref HEAD",
      {
        cwd: path.join(process.cwd(), "xmo-cli"),
      },
      (_, stdout) => {
        expect(stdout).toEqual("primary\n");
      }
    );
    expect(dir).toEqual(path.join(process.cwd(), "xmo-cli"));
  });
  // 传入git地址和dir
  test("clone with dir", async () => {
    const dir = await clone(
      "https://github.com/darkXmo/xmo-cli.git",
      undefined,
      "testDir"
    );
    expect(fs.existsSync(path.join(process.cwd(), "testDir"))).toBe(true);
    expect(dir).toEqual(path.join(process.cwd(), "testDir"));
  });
  // 传入git地址和dir和分支
  test("clone with dir and branch", async () => {
    const dir = await clone(
      "https://github.com/darkXmo/xmo-cli.git",
      "full",
      "testDirBranch"
    );
    expect(fs.existsSync(path.join(process.cwd(), "testDirBranch"))).toBe(true);
    const e = exec(
      "git rev-parse --abbrev-ref HEAD",
      {
        cwd: path.join(process.cwd(), "testDirBranch"),
      },
      (_, stdout) => {
        expect(stdout).toEqual("full\n");
      }
    );
    expect(dir).toEqual(path.join(process.cwd(), "testDirBranch"));
  });

  // 清空git仓库
  test("clone and empty git", async () => {
    const dir = await clone(
      "https://github.com/darkXmo/xmo-cli.git",
      "mini",
      "removeGit",
      true
    );
    expect(fs.existsSync(path.join(process.cwd(), "removeGit"))).toBe(true);
    expect(fs.existsSync(path.join(process.cwd(), "removeGit/.git"))).toBe(
      false
    );
  });
});
