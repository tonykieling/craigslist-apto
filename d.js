
// const today = new Date("2021-10-24T03:28:39.828Z");
const today = new Date(new Date().toLocaleString("en-US", { timeZone: "Canada/Pacific"}));
// const today = new Date(utcTime);
// console.log("today", today);
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const date = (monthNames[today.getMonth()]) + '-' + today.getDate();
// console.log("date", date);

const hour = today.getHours();
const min = today.getMinutes();
// console.log("hour", hour, "min", min);
const time = (hour < 10 ? `0${hour}` : hour) + ":" + (min < 10 ? `0${min}` : min);
const dateTime = date + ', ' + time;
console.log("dateTime", dateTime);


// const setVancouverTime = new Date(today.toLocaleString("en-US", { timeZone: "Canada/Pacific"}));
// console.log("setVancouverTime", setVancouverTime);