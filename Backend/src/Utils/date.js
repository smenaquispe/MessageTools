function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}
  
function formatDate(d) {

    let d_string = d.toString();
  
    if(d_string.length < 13){
      const len = 13 - d_string.length 
      for(let it = 0; it < len; it++){
        d_string += '0'
      }
    }

    let date = new Date(parseInt(d_string));

    return (
      [
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
        date.getFullYear(),
      ].join('/') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':')
    );
}


exports.formatDate = formatDate;