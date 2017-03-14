const SECOND = 1000
const MINUTE = SECOND * 60
const DAY = MINUTE * 60 * 24
const WEEK = DAY * 7
const MONTH = Symbol('month')


class TimeSpan {
  constructor (time, type, is_closest) {
    this._type = type
    this._date = new Date(time)

    if (!is_closest) {
      this._closest(this._date)
    }
  }

  // Returns the beginning time of the current time span
  timestamp () {
    return + this._date
  }

  _addSpan (amount) {
    const result = + this._date + this._type * amount
    if (result > + new Date) {
      return
    }

    return result
  }

  offset (amount) {
    return amount === 0
      ? + this._date
      : this._addSpan(amount)
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
  const left = m % mod
  date.setMinutes(m - left)
}

function noMinutes (date) {
  modMinutes(date, 60)
}

function noHours (date) {
  date.setHours(0)
}

function noDate (date) {
  date.setDate(1)
}


class Second extends TimeSpan {
  constructor (time) {
    super(time, SECOND)
  }

  _closest (date) {
    noMilliseconds(date)
  }
}


function minuteFactory (minuteSpan) {
  return class Minute extends TimeSpan {
    constructor (time) {
      super(time, MINUTE * minuteSpan)
    }

    _closest (date) {
      modMinutes(date, minuteSpan)
      noSeconds(date)
      noMilliseconds(date)
    }
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
    date.setDate(date.getDate() - days + TimeSpans.WEEK_ORIGIN)
  }
}


class Month extends TimeSpan {
  constructor (time) {
    super(time, MONTH)
  }

  _closest (date) {
    noDate(date)
    noHours(date)
    noMinutes(date)
    noSeconds(date)
    noMilliseconds(date)
  }

  _addSpan (amount) {
    return + new Date(this._date.getFullYear(), this._date.getMonth() + amount)
  }
}


// Mark Friday as the key of a week
const WEEK_ORIGIN = 5

const TimeSpans = module.exports = {
  Second,
  Minute: minuteFactory(1),
  Minute5: minuteFactory(5),
  Minute15: minuteFactory(15),
  Minute30: minuteFactory(30),
  Minute60: minuteFactory(60),
  Day,
  Week,
  Month,
  WEEK_ORIGIN
}
