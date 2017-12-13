# create-react-web

搭建网站前端的一个很好用的脚手架，集合了很多强大的功能，方便使用。

视图层使用`React @16.x`，数据使用`Redux`管理（拥抱`chunk`），路由使用`React Router @4.x`控制，页面脚本使用`webpack`按需打包加载，自动化任务（静态资源自动化管理，`svg`图标自动化组件，`postcss`，代码压缩等等）采用`Gulp`，使用`standard-version`等自管理项目日志，`HOC` + `decorator`助攻服务器渲染（SSR），`Helmet`独立管理分页`TDK(title, description, keywords)`，`meta`，`link`等。

使用最新语法开发，`async/await`随便用，两端（服务端、前端）同构，`babel`解析，飞一般的开发速度。

> For web site developer who wants to use React. 

## Run Env.

> node version >= 8.x

## Todolist

- [x] React 16.x & React-Router 4.x
- [x] Server Side Render (SSR)
- [x] Code Splitting (use React-Router 4.X)
- [x] smart title,keywords,description (TDK) for SEO
- [x] auto asset manager
- [x] auto svg icon
- [x] auto changelog
- [x] fetch data (ajax)
- [x] ajax, connect, etc. HOC
- [x] gulp tasks & webpack code
- [x] webpack bundles analyzer
- [ ] mock server
- [x] use less for css
- [x] postcss & autoprefixer
- [ ] <del>cache init state (redis)</del>
- [x] eslint (server & frontend)
- [x] async await

## Install

* (_writing_)

## Usage

* (_writing_)

## Server:

* express
* ejs

## Frontend

* React 16.x
* React-Router 4.x
* Redux
* Less

## CLI

* (_developing_)

## Eslint Version

```bash
├─┬ babel-eslint@8.0.3
├─┬ eslint@3.18.0
├─┬ eslint-config-airbnb@14.0.0
│ └── eslint-config-airbnb-base@11.0.1
├── eslint-plugin-babel@4.1.2
├─┬ eslint-plugin-import@2.2.0
│ ├─┬ eslint-import-resolver-node@0.2.3
│ ├─┬ eslint-module-utils@2.0.0
├─┬ eslint-plugin-jsx-a11y@3.0.2
├─┬ eslint-plugin-react@6.10.3
```

## Changelog & Commit Message

### Install

```bash
npm run commit-release:install
```

### Usage

```bash
// 脚本辅助提交代码，书写提交信息，也可以使用自己喜欢的提交方式，但是需要注意提交文档的格式
npm run git:commit

// 推送服务器
npm run git:push

// `release`需要在`master`分支上操作
// 预查看发布信息
npm run release -- --dry-run

// 确认无误后发布
npm run release
```

为了方便使用，有以下脚本糖可以使用：
#### 使用脚本糖

```bash
// 一键提交代码，并推送到服务端
npm run fly

// 切换`master`分支并更新，发布新版本，推送服务端，一键搞定
npm run fly:release
```

### 提交信息的编写

git提交信息需遵循Angular.js提出的规范（[AngularJS Git Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit)）

下面简单说明一下：

提交信息应由如下部分组成：

```
<type>(<scope>): <subject>

<body>

<footer>
```

- `type` - *必填*，描述本次提交做了什么类型的变更，有如下几种类型：
    - `feat` (feature): 提交新的功能
    - `fix` (bug fix): 提交错误修复
    - `docs` (documentation): 仅修改文档
    - `style` (code style): 纠正代码风格
    - `refactor`: 重构，既不是新功能或错误修复，也不是纠正代码风格
    - `test`: 添加测试代码
    - `chore` (maintain): 修改项目运作方式（构建流程、辅助开发工具等）
- `scope` - *选填*，描述本次提交修改的地方（比如：service, funcs, models等）
- `subject` - *必填*，简短描述本次的变更
    - 应当使用现在时的祈使句，例如：“增加分组课程列表”，而不是“增加了分组课程列表接口”或“分组课程列表接口”
    - 不需要首字母大写
    - 不需要在最后加句号
- `body` - *选填*，描述变更的动机、变更前后对比等。
    - 前面必须有一个空行隔开
    - 和`subject`一样，使用祈使句
- `footer` - *选填*，一些额外信息，如“BREAKING CHANGE”、“Close #XXX”等信息，这块请详细阅读文档。
    - 前面必须有一个空行隔开

一些OK的例子：

```
chore: add git commit hook - commitlint
```

```
feat(service): add api - grouped course list

Close #88
```

```
refactor: change generator functions to async functions

Because Node.js v8.9 is released as LTS version, async function is already steady to use.
```

[CHANGELOG](/CHANGELOG.md)
