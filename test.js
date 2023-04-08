const now = new Date();
const date = new Date("2023-05-08");

const diffTime = Math.abs(now.getTime() - date.getTime());
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

console.log(diffDays);
