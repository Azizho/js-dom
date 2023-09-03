import { getLevel2, generateArray, x, Socadd, Socremove } from "./script.js";

//1



console.log(getLevel2(5));

// 2



console.log(generateArray(5, 2, 3));


//3

let arr = [7, 2, 9, 100, 1, 6]


console.log(x(arr, 9));


//4

let obj = {
    add: Socadd,
    remove: Socremove
}

let array = [1, 2, 3];

obj.remove(array)


console.log(array);


