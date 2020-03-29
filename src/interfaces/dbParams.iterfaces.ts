export interface dbParams {
  id?: string | number,
  name?: string,
  attributes?: { exclude: string[] },
  where?: { id?: number, login?: string, password?: string, name?: any },
  limit?: number,
  order?: string[][]
}