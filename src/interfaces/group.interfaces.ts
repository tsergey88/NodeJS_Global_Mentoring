export type Permissions = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES'; 

export interface GroupDTO {
  id: number,
  name: string,
  permissions: Array<Permissions> | Array<string>
}