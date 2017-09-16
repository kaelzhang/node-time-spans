const test = require('ava')
const TimeSpans = require('..')
// const {
//   Second,
//   Minute,
//   Minute5
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
      [3, [2016, 3]],
      // only
      false
    ]
  ],

  Week: [
    [
      // wed
      [2016, 9, 5, 1, 1],
      [2016, 9, 7],
      [2016, 8, 30],
      [2016, 9, 14],
      [-2, [2016, 8, 23]],
      [2, [2016, 9, 21]]
    ]
  ],

  Day: [
    [
      [2016, 9, 5, 7, 50, 5, 100],
      [2016, 9, 5],
      [2016, 9, 4],
      [2016, 9, 6],
      [-2, [2016, 9, 3]],
      [2, [2016, 9, 7]]
    ]
  ],

  Minute60: [
    [
      [2016, 9, 5, 7, 50, 5, 100],
      [2016, 9, 5, 7],
      [2016, 9, 5, 6],
      [2016, 9, 5, 8],
      [-2, [2016, 9, 5, 5]],
      [2, [2016, 9, 5, 9]]
    ]
  ],

  Minute30: [
    [
      [2016, 9, 5, 7, 50, 5, 100],
      [2016, 9, 5, 7, 30],
      [2016, 9, 5, 7],
      [2016, 9, 5, 8],
      [-2, [2016, 9, 5, 6, 30]],
      [2, [2016, 9, 5, 8, 30]]
    ]
  ],

  Minute15: [
    [
      [2016, 9, 5, 7, 50, 5, 100],
      [2016, 9, 5, 7, 45],
      [2016, 9, 5, 7, 30],
      [2016, 9, 5, 8],
      [-2, [2016, 9, 5, 7, 15]],
      [2, [2016, 9, 5, 8, 15]]
    ]
  ],

  Minute5: [
    [
      [2016, 9, 5, 7, 50, 5, 100],
      [2016, 9, 5, 7, 50],
      [2016, 9, 5, 7, 45],
      [2016, 9, 5, 7, 55],
      [-2, [2016, 9, 5, 7, 40]],
      [2, [2016, 9, 5, 8]]
    ]
  ],

  Minute: [
    [
      [2016, 9, 5, 7, 50, 5, 100],
      [2016, 9, 5, 7, 50],
      [2016, 9, 5, 7, 49],
      [2016, 9, 5, 7, 51],
      [-2, [2016, 9, 5, 7, 48]],
      [2, [2016, 9, 5, 7, 52]]
    ]
  ],

  Second: [
    [
      [2016, 9, 5, 7, 50, 5, 100],
      [2016, 9, 5, 7, 50, 5],
      [2016, 9, 5, 7, 50, 4],
      [2016, 9, 5, 7, 50, 6],
      [-2, [2016, 9, 5, 7, 50, 3]],
      [2, [2016, 9, 5, 7, 50, 7]]
    ]
  ],
}


Object.keys(CASES).forEach((type) => {
  const Constructor = TimeSpans[type]
  const cases = CASES[type]
  cases.forEach((c) => {
    const date = new Constructor(new Date(...c[0]))

    const _test = c[6]
      ? test.only
      : test

    _test(`${type}: ${JSON.stringify(c[0])}`, t => {
      t.is(date.timestamp(),  + new Date(...c[1]), 'value')
      t.is(date.prev(),       + new Date(...c[2]), 'prev')
      t.is(date.next(),       + new Date(...c[3]), 'next')
      t.is(
        date.offset(c[4][0]),
        + new Date(...c[4][1]),
        `offset: ${c[4][0]}`
      )
      t.is(
        date.offset(c[5][0]),
        + new Date(...c[5][1]),
        `offset: ${c[5][0]}`
      )
    })
  })
})


test('inPeriod', t => {
  const {
    Day,
    Month
  } = TimeSpans

  t.is(new Day('2017-01-29').inSamePeriod('2017-01-29 11:00'), true)
  t.is(new Month('2017-01-29').inSamePeriod('2017-01-10'), true)
})
