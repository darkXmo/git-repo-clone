import { exec } from "child_process";
import fs from "fs-extra";
import path from "path";
import clone from "../src/index.js";

jest.setTimeout(10000);

describe("clone", () => {
  beforeAll(() => {
    return Promise.all([
      fs.remove("git-repo-clone"),
      fs.remove("xmo-cli"),
      fs.remove("testDir"),
      fs.remove("testDirBranch"),
    ]);
  });
  afterAll(() => {
    return Promise.all([
      fs.remove("git-repo-clone"),
      fs.remove("xmo-cli"),
      fs.remove("testDir"),
      fs.remove("testDirBranch"),
    ]);
  });
  // 只传入git地址
  test("deafult clone", async () => {
    await clone("https://github.com/darkXmo/git-repo-clone.git");
    expect(fs.existsSync(path.join(process.cwd(), "git-repo-clone"))).toBe(
      true
    );
  });
  // 传入git地址和分支
  test("clone with branch", async () => {
    await clone("https://github.com/darkXmo/xmo-cli.git", "primary");
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
  });
  // 传入git地址和dir
  test("clone with dir", async () => {
    await clone("https://github.com/darkXmo/xmo-cli.git", undefined, "testDir");
    expect(fs.existsSync(path.join(process.cwd(), "testDir"))).toBe(true);
  });
  // 传入git地址和dir和分支
  test("clone with dir and branch", async () => {
    await clone(
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
  });
});
