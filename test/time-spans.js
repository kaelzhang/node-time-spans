const test = require('ava')
const TimeSpans = require('..')
// const {
//   Second,
//   Minute,
//   Minute15,
//   Minute30,
//   Minute60,
//   Day,
//   Week,
//   Month
// }

const CASES = {
  Month: [
    [
      // time
      [2016, 0],
      // prev
      [2015, 11],
      // next
      [2016, 1],
      // -3
      [2015, 9],
      // +3
      [2016, 3]
    ]
  ]
}


Object.keys(CASES).forEach((type) => {
  const Constructor = TimeSpans[type]
  const cases = CASES[type]
  cases.forEach((c) => {
    const date = new Constructor(new Date(...c[0]))
    test(JSON.stringify(c[0]), t => {
      t.deepEqual(date.prev(),     new Date(...c[1]))
      t.deepEqual(date.next(),     new Date(...c[2]))
      t.deepEqual(date.offset(-3), new Date(...c[3]))
      t.deepEqual(date.offset(3),  new Date(...c[4]))
    })
  })
})
