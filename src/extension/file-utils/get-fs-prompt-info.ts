import { exec } from 'child_process'
import path from 'path'
import { promisify } from 'util'
import { repomixFileName } from '@extension/constants'
import { t } from '@extension/i18n'
import * as vscode from 'vscode'

import { FileInfo, traverseFileOrFolders } from './traverse-fs'

const execAsync = promisify(exec)

/**
 * Represents the information required for a file system prompt.
 */
export interface FsPromptInfo {
  /**
   * The full content of the prompt.
   */
  promptFullContent: string

  /**
   * An array of file information.
   */
  filesInfo: FileInfo[]
}

/**
 * Retrieves the prompt information for a given array of files or folders.
 * @param fileOrFolders - The array of file or folder paths.
 * @param workspacePath - The path of the workspace.
 * @returns A promise that resolves to the `FsPromptInfo` object containing the prompt information.
 */
export const getFileOrFoldersPromptInfo = async (
  fileOrFolders: string[],
  workspacePath: string
): Promise<FsPromptInfo> => {
  const result: FsPromptInfo = {
    promptFullContent: '',
    filesInfo: []
  }

  const processFile = async (fileInfo: FileInfo) => {
    const { fullPath, relativePath, content } = fileInfo
    const language = path.extname(fullPath).slice(1)

    const promptFullContent = t(
      'file.content',
      relativePath,
      language,
      content.toString()
    )

    result.filesInfo.push(fileInfo)
    result.promptFullContent += promptFullContent
  }

  await traverseFileOrFolders(fileOrFolders, workspacePath, processFile)

  return result
}

/**
 * Retrieves theprompt information for a given array of files or folders using repomix.
 * @param fileOrFolders - The array of file or folder paths.
 * @param workspacePath - The path of the workspace.
 * @returns A promise that resolves to the `FsPromptInfo` object containing the prompt information.
 */
export const getFileOrFoldersPromptInfoByRepomix = async (
  fileOrFolders: string[],
  workspacePath: string
): Promise<FsPromptInfo> => {
  const result: FsPromptInfo = {
    promptFullContent: '',
    filesInfo: []
  }

  const absoluteFileOrFolders = fileOrFolders.map(fileOrFolder => {
    const absolutePath = path.isAbsolute(fileOrFolder)
      ? fileOrFolder
      : path.join(workspacePath, fileOrFolder)
    return absolutePath
  })

  // Convert fileOrFolders array to string format for the repomix command
  const filesOrFoldersString = absoluteFileOrFolders.join(',')

  // Start building the repomix command
  const repomixCommand = `npx repomix --include "${filesOrFoldersString}" --output ${repomixFileName} --style markdown`

  try {
    // Execute the repomix command to get the prompt data
    // await executeCommand(repomixCommand, workspacePath)
    const { stderr } = await execAsync(repomixCommand, {
      cwd: workspacePath // 在工作区根目录执行
    })
    // 显示执行结果
    if (stderr) {
      vscode.window.showWarningMessage(
        `Command repomixCommand stderr: ${stderr}`
      )
    }

    // Read the prompt data from the repomix file
    const repomixFilePath = path.join(workspacePath, repomixFileName)
    // 读取文件内容
    const promptData = await vscode.workspace.fs.readFile(
      vscode.Uri.file(repomixFilePath)
    )

    // Parse the prompt data and update the result object
    const promptDataString = promptData.toString()
    result.promptFullContent = promptDataString
  } catch (error: any) {
    vscode.window.showWarningMessage(
      `Failed to get prompt information: ${error.message}`
    )
    throw error
  }

  return result
}
