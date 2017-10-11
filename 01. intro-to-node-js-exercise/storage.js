const fs = require('fs')
let storageModule = (() => {
  let storage = {}
  let keyValidator = (key, isInsert) => {
    if (typeof key !== 'string') {
      throw new TypeError('Key should be a string!')
    }

    if (isInsert) {
      if (storage.hasOwnProperty(key)) {
        throw new Error(`${key} already exists in storage!`)
      }
    } else {
      if (!storage.hasOwnProperty(key)) {
        throw new Error(`${key} does not exist in storage!`)
      }
    }
  }

  let put = (key, value) => {
    keyValidator(key, true)
    storage[key] = value
  }

  let get = (key) => {
    keyValidator(key, false)
    return storage[key]
  }

  let getAll = () => {
    let keys = Object.keys(storage)
    if (keys.length === 0) {
      console.log('Storage is empty!')
      return
    }

    let kvp = []
    for (let key of keys) {
      kvp.push({ [key]: storage[key] })
    }

    return kvp
  }

  let update = (key, newValue) => {
    keyValidator(key, false)
    storage[key] = newValue
  }

  let deleteKvp = (key) => {
    keyValidator(key, false)
    delete storage[key]
  }

  let clear = () => {
    for (let key in storage) {
      delete storage[key]
    }
  }

  let saveSync = () => {
    fs.writeFileSync('./storage.json', JSON.stringify(storage), 'utf8')
  }

  let loadSync = () => {
    clear() // Clear the previous data
    let data = JSON.parse(fs.readFileSync('./storage.json'), 'utf8')
    for (let key in data) {
      storage[key] = data[key]
    }
  }

  let save = (callback) => {
    fs.writeFile('./storage.json', JSON.stringify(storage), (err, data) => {
      if (err) {
        console.warn(err)
        return
      }

      callback()
    })
  }

  let load = (callback) => {
    fs.readFile('./storage.json', (err, data) => {
      if (err) {
        console.warn(err)
        return
      }

      let dataObj = JSON.parse(data)
      for (let key in dataObj) {
        storage[key] = dataObj[key]
      }
      callback()
    })
  }

  return {
    put,
    get,
    getAll,
    update,
    deleteKvp,
    clear,
    saveSync,
    loadSync,
    save,
    load
  }
})()

module.exports = storageModule
