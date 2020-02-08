export type Permissions = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES'; 

export interface GroupDTO {
  id: string,
  name: string,
  permissions: Array<Permissions>
}