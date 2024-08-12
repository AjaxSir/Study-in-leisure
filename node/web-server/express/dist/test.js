"use strict";
const nature = () => {
    console.log('...');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('resolve');
            resolve('🦖');
        }, 2000);
    });
};
nature().then(res => {
    console.log(res);
});
console.log('🌋');
//# sourceMappingURL=test.js.map