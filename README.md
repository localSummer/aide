## 简介
在 VSCode 中征服任何代码：一键注释、转换、UI 图生成代码、AI 批量处理文件！💪

## 功能 ✨

- 🔄 **代码转换**: 一键在任何编程语言之间转换代码。
- 📖 **代码查看器助手**: 添加详细注释以提高代码可读性。
- 🔧 **让专家帮你改代码**: 把你的代码给 AI 优化，看看大师是怎么写代码的。
- 🗂️ **AI 批量处理文件**: 根据自定义要求使用 AI 处理多个文件。
- 🏷 **重命名变量**: 获取 AI 建议的变量名及解释。
- 💬 **问 AI**: 对选定的文件或文件夹执行自定义 AI 命令。
- 📝 **复制为 AI 提示词**: 轻松复制文件/文件夹内容作为 AI 提示。

## 安装 📦

1. 打开 Visual Studio Code
2. 打开命令窗口 (Command+Shift+P)
3. 搜索 “扩展：从 VSIX 安装”
4. 点击安装

## 配置 ⚙
```json
"aide.openaiKey": {
  "type": "string",
  "default": "",
  "markdownDescription": "API_KEY"
},
"aide.openaiModel": {
  "type": "string",
  "default": "deepseek-coder",
  "markdownDescription": "Model_NAME"
},
"aide.openaiBaseUrl": {
  "type": "string",
  "default": "https://api.deepseek.com/v1",
  "markdownDescription": "BASE_URL"
},
```

## 更新日志 📅

查看最新的更新和功能：[更新日志](https://github.com/localSummer/aide/blob/lp/CHANGELOG.md)

## 许可证 📄

此项目根据 MIT 许可证授权
