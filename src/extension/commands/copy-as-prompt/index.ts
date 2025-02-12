import { getConfigKey } from '@extension/config'
import { getFileOrFoldersPromptInfoByRepomix } from '@extension/file-utils/get-fs-prompt-info'
import { t } from '@extension/i18n'
import * as vscode from 'vscode'

export const handleCopyAsPrompt = async (
  uri: vscode.Uri,
  selectedUris: vscode.Uri[] = []
) => {
  const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri)
  if (!workspaceFolder) throw new Error(t('error.noWorkspace'))

  const selectedItems = selectedUris?.length > 0 ? selectedUris : [uri]
  if (selectedItems.length === 0) throw new Error(t('error.noSelection'))

  const selectedFileOrFolders = selectedItems.map(item => item.fsPath)
  const { promptFullContent } = await getFileOrFoldersPromptInfoByRepomix(
    selectedFileOrFolders,
    workspaceFolder.uri.fsPath
  )
  const aiPrompt = await getConfigKey('aiPrompt')
  const finalPrompt = aiPrompt.replace('#{content}', promptFullContent)

  await vscode.env.clipboard.writeText(finalPrompt)
  vscode.window.showInformationMessage(t('info.copied'))
}
