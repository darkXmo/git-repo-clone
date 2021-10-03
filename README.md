# git-repo-clone

git clone 仓库，只实现 clone 用于解决 download-git-repo 中出现交互，则命令行无法直接卡死的问题。

## 安装

```bash
# yarn
yarn add git-repo-clone

# npm
npm install git-repo-clone
```

## 使用方法

```javascript
  function clone(
    gitHref: string,
    branch: string | undefined,
    dir: string | undefined
  ): Promise<void>;
```

- `gitHref`: git 地址，例如 `https://github.com/darkXmo/git-repo-clone.git` 或 `https://gitee.com/dXmo/xmo-cli.git` ;

- `branch`: git 分支，建议填写，例如 `master` 、 `development` 、 `production` 。

- `dir`: 本地位置，即将仓库放在本地哪个目录下，默认为 Git 仓库名。

## 为什么不用 download-git-repo

download-git-repo 遇到

```bash
The authenticity of host 'github.com (20.205.243.166)' can't be established.
RSA key fingerprint is SHA256:xxxxxxxxxxxxxxxxxx.
```

无法启动交互，会卡死。
