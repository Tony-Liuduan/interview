const Linked = require("./Linked");


const linked = new Linked().push(1).push(2).push(3).push(4).push(5).push(6).push(7);
// console.log(linked.size);
// console.log(linked.head);


// linked.delete(0);
// console.log(linked.head);
// console.log(linked.size);
// console.log(linked.rear);


// linked.shift();
// linked.unshift(8);
// console.log(linked.head);
// console.log(linked.size);


// linked.insert(4, 100);
// console.log(linked.toString());
// console.log(linked.size);
// console.log(linked.indexOf(8));



// linked.slice(2, 4);
// console.log(linked.size);
// console.log(linked.toString());
// console.log(linked.head);
// console.log(linked.rear);



// const l = linked.swapPairs(); 
// console.log(l);
// console.log(linked.toString());
// console.log(linked.head);
// console.log(linked.rear);



// const l = linked.reverseKGroup();
// console.log(l);
// console.log(linked.toString());
// console.log(linked.head);
// console.log(linked.rear);



// const l = linked.reverse();
// console.log(l);
// console.log(linked.toString());
// console.log(linked.head);
// console.log(linked.rear);




const l = linked.reverseBetween(1, 7);
console.log(l);
console.log(linked.toString());
console.log(linked.head);
console.log(linked.rear);