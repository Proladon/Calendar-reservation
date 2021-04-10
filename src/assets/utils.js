const year = (date) => {
    return date.getFullYear()
}

const month = (date) => {
    return date.getMonth() + 1
}

const date = (date) => {
    return date.getDate()
}

const dayWeek = (date) => {
    return date.getDay()
}

// 一個月中有幾天
const days = (year, month) => {
    return new Date(year, month, 0).getDate()
}

const listDates = (days)=>{
    const dates = []

    for(let date=1; date <= days; date++){
      dates.push(date)
    }

    return dates
}

module.exports = {
    year,
    month,
    date,
    dayWeek,
    days,
    listDates,
}