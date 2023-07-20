export function camelCase(object: any) {
  const isArray = function (value: any) {
    return Array.isArray(value)
  }

  const isObject = function (value: any) {
    return value === Object(value) && !isArray(value) && typeof value !== 'function'
  }

  const toCamel = (string: string) => string.replace(/(_\w)/g, (key) => key[1].toUpperCase())

  const keysToCamel = function (value: any) {
    if (isObject(value)) {
      if (Object.prototype.toString.call(value) === '[object Date]') {
        return value
      }
      const n: any = {}

      Object.keys(value).forEach((key) => {
        n[toCamel(key)] = keysToCamel(value[key])
      })

      return n
    } else if (isArray(value)) {
      return value.map((i: any) => {
        return keysToCamel(i)
      })
    }

    return value
  }

  return keysToCamel(object)
}
