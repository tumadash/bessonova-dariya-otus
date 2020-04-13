function sum(num) {

    let currentSum = 0;
    if (num === undefined) {
        return currentSum;
    } else if (typeof num === 'number') {
        currentSum = num;
    } else {
        console.error('enter number');
        return;
    }

    function func(a) {
        if (a === undefined) {
            return currentSum;
        }
        if (typeof a === 'number') {
            currentSum += a;
        } else {
            console.error('enter number');
            return;
        }
        return func;
    }

    func.toString = function () {
        return currentSum;
    };

    return func;
}