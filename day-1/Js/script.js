export function getLevel2(n) {
    let arr = [];
    for (let i = 1; i <= n; i++) {
        arr.push(Math.pow(2, i));
    }
    return arr;
}

export function generateArray(n, A, B) {
    let array = [A, B];
    for (let i = 2; i < n; i++) {
        array[i] = array[i - 1] + array[i - 2];
    }
    let sum = array.reduce((a, b) => a + b);
    array.push(sum);
    array.push(sum * 2);
    return array;
}

export function x(arr, target) {
    let result = [];

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === target) {
                result.push([i, j]);
            }
        }
    }

    return result;
}


export function Socadd(arg1, arg2) {
    if (arg1.__patern__ == [].__patern__) {
        arg1[arg1.length] = arg2;
    }

    else {
        console.log(false);
    }
}

export function Socremove(arg1, arg2) {
    if (arg1.__patern__ == [].__patern__) {
        let indexToRemove = -1;
        for (let i = 0; i < arg1.length; i++) {
            if (arg1[i] === arg2) {
                indexToRemove = i;
                break;
            }
        }
        if (indexToRemove > -1) {
            for (let i = indexToRemove; i < arg1.length - 1; i++) {
                arg1[i] = arg1[i + 1];
            }
            arg1.length--;
        }
    }
    else {
        console.log(false);
    }
}