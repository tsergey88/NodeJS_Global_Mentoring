export interface dbParams {
  id?: string | number,
  name?: string,
  attributes?: { exclude: string[] },
  where?: {},
  limit?: number,
  order?: string[][]
}