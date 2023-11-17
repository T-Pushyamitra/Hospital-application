
exports.getDateNoTime = (date) => {
  console.log(date.getDate())
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }