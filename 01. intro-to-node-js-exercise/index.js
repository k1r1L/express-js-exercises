const storage = require('./storage')
storage.put('first', 'firsVal')
storage.put('second', 2)
storage.put('third', {3: 'thirdVal'})
storage.put('fourth', [4])
storage.save(() => {
  storage.load(() => console.log(storage.getAll()))
})
