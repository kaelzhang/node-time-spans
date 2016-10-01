const SECOND = 1000
const MINUTE = SECOND * 60
const MINUTE15 = MINUTE * 15
const MINUTE30 = MINUTE * 30
const MINUTE60 = MINUTE * 60
const DAY = MINUTE * 60 * 24
const WEEK = DAY * 7

class TimeSpan {
  constructor (time, type) {
    super()

    this._type = type
    this._date = new Date(time)
    this._closest(this._date)
  }

  // Returns the beginning time of the current time span
  time () : Date {
    return new Date(this._date)
  }

  _addSpan (amount) {
    const timestamp = + this._date + this._type * amount
    return new Date(timestamp)
  }

  offset (amount) {
    return this._addSpan(amount)
  }

  // get the next time span
  next () {
    return this._addSpan(1)
  }

  prev () {
    return this._addSpan(-1)
  }
}


function noSeconds (date) {
  date.setSeconds(0)
}

function noMilliseconds (date) {
  date.setMilliseconds(0)
}

function modMinutes (date, mod) {
  const m = date.getMinutes()
  const left = m / mod
  date.setMinutes(m - left)
}

function noMinutes (date) {
  modMinutes(date, 60)
}

function noHours (date) {
  date.setHours(0)
}

function noDate (date) {
  date.setDate(0)
}


class Minute extends TimeSpan {
  constructor (time) {
    super(time, MINUTE)
  }

  _closest (date) {
    noSeconds(date)
    noMilliseconds(date)
    return date
  }
}


class Minute15 extends TimeSpan {
  constructor (time) {
    super(time, MINUTE15)
  }

  _closest (date) {
    modMinutes(date, 15)
    noSeconds(date)
    noMilliseconds(date)
    return date
  }
}


class Minute30 extends TimeSpan {
  constructor (time) {
    super(time, MINUTE30)
  }

  _closest (date) {
    modMinutes(date, 30)
    noSeconds(date)
    noMilliseconds(date)
    return date
  }
}


class Minute60 extends TimeSpan {
  constructor (time) {
    super(time, MINUTE60)
  }

  _closest (date) {
    noMinutes(date)
    noSeconds(date)
    noMilliseconds(date)
    return date
  }
}


class Day extends TimeSpan {
  constructor (time) {
    super(time, DAY)
  }

  _closest (date) {
    noHours(date)
    noMinutes(date)
    noSeconds(date)
    noMilliseconds(date)
  }
}


class Week extends TimeSpan {
  constructor (time) {
    super(time, WEEK)
  }

  _closest (date) {
    noHours(date)
    noMinutes(date)
    noSeconds(date)
    noMilliseconds(date)

    const days = date.getDay()
    return new Date(+ date - days * DAY)
  }
}


const MONTHS_A_YEAR = 12

class Month extends TimeSpan {
  constructor (time) {
    super(time, MONTH)
    // code ...
  }

  _closest (date) {
    noDate(date)
    noHours(date)
    noMinutes(date)
    noSeconds(date)
    noMilliseconds(date)
  }

  // ## case
  // get_month delta newMonth left set_month set_year
  // 0         -1    -1       -1   11        -1
  // 0         -13   -13      -1   11        -2
  // 0         1     1        1    1         0
  // 0         13    13       1    1         1

  _addSpan (amount) {
    const date = new Date(this._date)
    const newMonth = date.getMonth() + amount

    const left = newMonth % MONTHS_A_YEAR

    date.setMonth(
      left < 0
        ? MONTHS_A_YEAR + left
        : left
    )

    const yearDelta = (newMonth - left) / MONTHS_A_YEAR + (
      newMonth < 0
        // borrow
        ? -1
        : 0
    )

    date.setFullYear(date.getFullYear() + yearDelta)
    return date
  }
}


module.exports = {
  Minute,
  Minute15,
  Minute30,
  Minute60,
  Day,
  Week,
  Month
}
