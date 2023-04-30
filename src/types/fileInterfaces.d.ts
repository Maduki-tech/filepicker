export interface SyncFiles {
    itemID?: number
    name: string
    parentID: number | null
    size: number | null
    isFile: boolean | null
    mimeType: string | null
    content: Buffer | null
    dateModified: Date | null
    dateCreated: Date | null
    hasChild: boolean | null
    isRoot: boolean | null
    type: string | null
    filterPath: string | null
}

export interface FileManagerResponse {
    cwd: SyncFiles
    files: SyncFiles[]
}
export interface ReadAction {
    action: 'read'
    path?: string
}

export interface CreateAction {
    action: 'create'
    path: string
    name: string
    data: Files
}
export interface SaveAction {
    action: 'Save'
    path: string
    name: string
    data: Files
}

export interface MoveAction {
    action: 'move'
    path: string
    targetPath: string
    name: string
    data: Files
}

export interface FileSyncArray {
    files: SyncFiles[]
}

export type FileManagerRequestBody =
    | ReadAction
    | CreateAction
    | SaveAction
    | MoveAction