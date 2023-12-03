// Fix: Return only YYYY-MM-DD
exports.getDateNoTime = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

exports.titleCase = (str) => {
  return str.toLowerCase().split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}