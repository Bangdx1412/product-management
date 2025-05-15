const showAlert = document.querySelector("[show-alert]");
// console.log(showAlert);
if(showAlert){
  // Lấy ra thời gian ẩn vì thời gian ẩn ở trang index.pug đang là string cần chuyển về int để setTimeOut
const timeData = parseInt(showAlert.getAttribute('time-data'));
const closeAlert = showAlert.querySelector("[close-alert]")
// console.log(timeData);
setTimeout(()=>{
  showAlert.classList.add("alert-hidden")
},timeData)
;}