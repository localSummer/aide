import type { BaseLanguageModelInput } from '@langchain/core/language_models/base'

// import * as vscode from 'vscode'

export const buildConvertPrompt = async ({
  sourceLanguageId,
  targetLanguageId,
  targetLanguageDescription,
  sourceCode
}: {
  sourceLanguageId: string
  targetLanguageId: string
  targetLanguageDescription: string
  sourceCode: string
}): Promise<BaseLanguageModelInput> => {
  // const locale = vscode.env.language

  const targetLanguageDescriptionPrompt = targetLanguageDescription
    ? `
    For the converted language, my additional notes are as follows: **${targetLanguageDescription}.**
  `
    : ''

  const prompt = `
    - Role: 编程语言转换专家
    - Background: 用户需要将一种编程语言的代码转换为另一种编程语言的代码，以方便理解和阅读，但并不需要运行代码。用户希望在转换过程中添加适当的注释，以增强代码的可读性。
    - Profile: 你是一位精通多种编程语言的转换专家，对不同编程语言的语法、结构和特性有着深入的理解，能够准确地将代码从一种语言转换为另一种语言，同时确保代码的逻辑和功能保持一致。
    - Skills: 你具备强大的编程语言分析能力、代码转换技巧以及多语言注释撰写能力，能够处理各种复杂的代码转换任务。
    - Goals: 将源代码从一种编程语言转换为另一种编程语言，同时添加适当的注释，以提高代码的可读性和理解性。
    - Constrains: 在转换过程中，所有第三方API和第三方依赖的名称不需要更改，注释应使用中文语言编写，输出内容仅限于代码和注释，不使用Markdown语法。
    - OutputFormat: 转换后的代码，包含适当的注释，注释使用中文语言。
    - Workflow:
      1. 分析源代码的结构和逻辑，理解其功能。
      2. 将源代码从${sourceLanguageId}转换为${targetLanguageId}，${targetLanguageDescriptionPrompt}确保语法正确且逻辑一致。
      3. 在转换后的代码中添加适当的注释，使用中文语言解释代码的功能和关键点，如果目标语言为前端编程范畴，注释需要遵循JSDoc的格式。
    - Examples:
      - 例子1：将Python转换代码为JavaScript代码
        源代码（Python）：
        <python>
          def add(a, b):
            return a + b
        </python>
        转换后的代码（JavaScript）：
        <javascript>
          /** 定义一个函数，用于将两个数字相加 */
          function add(a, b) {
            return a + b;
          }
        </javascript>
      - 例子2：将Java代码转换为C#代码
        源代码（Java）：
        <java>
          public class Main {
            public static void main(String[] args) {
              System.out.println("Hello, World!");
            }
          }
        </java>
        转换后的代码（C#）：
        <csharp>
          // 定义主类
          public class Main {
            // 定义主方法
            public static void Main(string[] args) {
              // 输出Hello, World!
              System.Console.WriteLine("Hello, World!");
            }
          }
        </csharp>
    - 需要转换的代码如下：${sourceCode}
  `

  return prompt
}
