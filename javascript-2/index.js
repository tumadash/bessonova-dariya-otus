function promiseReduce(asyncFunctions, reduce, initialValue) {
    return new Promise(function(resolve, reject) {
        this.memo = initialValue;
        
        function recursion(i){
            asyncFunctions[i]().then(
                x => {
                    this.memo = reduce(this.memo, x);
                    if(typeof asyncFunctions[++i] === 'function'){
                        recursion(i);
                    } else {
                        resolve(this.memo);
                    }
                })        
               };
	      recursion(0);
    })
}
