const getDays = (year, month)=>{
    return new Date(year, month, 0).getDate()
}

const subDate = (date, sub) => {
    return new Date(date.setDate(date.getDate() - sub))
}

const addDate = (date, add) => {
    return new Date(date.setDate(date.getDate() + add))
}

const dateFormat = (dateInput) => {
    const year= dateInput.getFullYear()
    const month= dateInput.getMonth() + 1
    const date= dateInput.getDate()

    return `${year}/${month}/${date}`
}

module.exports = {
    getDays,
    subDate,
    addDate,
    dateFormat,
}