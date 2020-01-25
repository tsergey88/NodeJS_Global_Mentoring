export interface dbParams {
  id?: number,
  attributes?: { exclude: string[] },
  where?: {},
  limit?: number
  order?: string[][]
}