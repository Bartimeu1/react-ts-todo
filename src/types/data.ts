export interface IFolder {
  id: number;
  name: string;
  color: string;
}

export interface ITask {
  id: number;
  folderId: number;
  text: string;
  completed: boolean;
}