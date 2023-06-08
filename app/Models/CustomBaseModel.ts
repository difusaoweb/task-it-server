import { BaseModel } from '@ioc:Adonis/Lucid/Orm'

export class CustomBaseModel extends BaseModel {
  constructor() {
    super()
  }

  public toJSON() {
    const isArray = function (value: any) {
      return Array.isArray(value)
    }

    const isObject = function (value: any) {
      return value === Object(value) && !isArray(value) && typeof value !== 'function'
    }

    const toCamel = (string: any) => string.replace(/(_\w)/g, (key) => key[1].toUpperCase())

    const keysToCamel = function (value: any) {
      if (isObject(value)) {
        const n = {}

        Object.keys(value).forEach((key) => {
          n[toCamel(key)] = keysToCamel(value[key])
        })

        return n
      } else if (isArray(value)) {
        return value.map((i) => {
          return keysToCamel(i)
        })
      }

      return value
    }

    return keysToCamel(this.serialize())
  }
}
