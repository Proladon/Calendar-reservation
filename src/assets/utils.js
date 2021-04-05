const getDays = (year, month)=>{
    return new Date(year, month, 0).getDate()
}

module.exports = {
    getDays
}