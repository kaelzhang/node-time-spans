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
      [2016, 0],
      // prev
      [2015, 11],
      // next
      [2016, 1],
      // -3
      [-3, [2015, 9]],
      // +3
      [3, [2016, 3]]
    ]
  ],

  Week: [
    [
      // wed
      [2016, 9, 5, 1, 1],
      [2016, 9, 2],
      [2016, 8, 25],
      [2016, 9, 9],
      [-2, [2016, 8, 18]],
      [2, [2016, 9, 16]]
    ]
  ]
}


Object.keys(CASES).forEach((type) => {
  const Constructor = TimeSpans[type]
  const cases = CASES[type]
  cases.forEach((c) => {
    const date = new Constructor(new Date(...c[0]))
    test(`${type}: ${JSON.stringify(c[0])}`, t => {
      t.deepEqual(date.time(),     new Date(...c[1]), 'value')
      t.deepEqual(date.prev(),     new Date(...c[2]), 'prev')
      t.deepEqual(date.next(),     new Date(...c[3]), 'next')
      t.deepEqual(
        date.offset(c[4][0]),
        new Date(...c[4][1]),
        `offset: ${c[4][0]}`
      )
      t.deepEqual(
        date.offset(c[5][0]),
        new Date(...c[5][1]),
        `offset: ${c[5][0]}`
      )
    })
  })
})
