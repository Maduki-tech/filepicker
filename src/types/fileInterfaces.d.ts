import { Files } from '@prisma/client';

export interface SyncFiles {
    itemID?: number;
    name: string;
    parentID: number | null;
    size: number | null;
    isFile: boolean | null;
    mimeType: string | null;
    content: Buffer | null;
    dateModified: Date | null;
    dateCreated: Date | null;
    hasChild: boolean | null;
    isRoot: boolean | null;
    type: string | null;
    filterPath: string | null;
}

export interface FileManagerResponse {
    cwd: SyncFiles;
    files: SyncFiles[];
}

export interface ReadAction {
    action: 'read';
    path?: string;
}

export interface CreateAction {
    action: 'create';
    path: string;
    name: string;
    data: Buffer; // Change type to Buffer
}

export interface DownloadAction {
    action: 'download';
    path: string;
    name: string;
    data: Buffer; // Change type to Buffer
}

export interface SaveAction {
    action: 'Save';
    path: string;
    name: string;
    data: Buffer; // Change type to Buffer
}

export interface MoveAction {
    action: 'move';
    path: string;
    targetPath: string;
    name: string;
    data: Buffer; // Change type to Buffer
}

export interface CopyAction {
    action: 'copy';
    path: string;
    targetPath: string;
    name: string;
    data: Buffer; // Change type to Buffer
}

export interface DeleteAction {
    action: 'delete';
    path: string;
    name: string;
    data: Buffer; // Change type to Buffer
}

export interface RenameAction {
    action: 'rename';
    path: string;
    name: string;
    newName: string;
    data: Buffer; // Change type to Buffer
}

export interface LoadAction {
    action: 'Load';
    document: string;
    zoomFactor: number;
}

export interface UploadAction {
    action: 'upload';
    path: string;
    name: string;
    data: Buffer; // Change type to Buffer
}

export interface FileSyncArray {
    files: SyncFiles[];
}

export type FileManagerRequestBody =
    | ReadAction
    | CreateAction
    | SaveAction
    | MoveAction
    | CopyAction
    | DeleteAction
    | RenameAction
    | UploadAction
    | DownloadAction
    | LoadAction;
