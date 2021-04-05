const getDays = (year, month)=>{
    return new Date(year, month, 0).getDate()
}

const subDate = (date, sub) => {
    return new Date(date.setDate(date.getDate() - sub))
}

const addDate = (date, add) => {
    return new Date(date.setDate(date.getDate() + add))
}

module.exports = {
    getDays,
    subDate,
    addDate,
}