/*
 * @Date: 2024-08-06 10:04:50
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-08-06 10:58:28
 * @Description:
 */
function mockRequest(number) {
	let tasks = [];
	for (let i = 0; i < number; i++) {
		tasks.push(
			new Promise((resolve, reject) => {
				console.time('start')
				setTimeout(() => {
					resolve();
                    console.timeEnd('start')
				}, i * 200);
			}).then((response) => {
				// console.log(`${i}: completed`);
				return 1;
			})
		);
	}
	return tasks;
}

const tasks = mockRequest(100);

// Promise.all(tasks).then((res) => {
//     console.log(res)
//     console.log('All tasks completed')
// })
const bfRequest = (tasks, macCount = 4) => {
	return new Promise((resolve, reject) => {
		if (!tasks.length) {
			resolve();
			return;
		}
		let currentIdx = 0;
		let resolveCount = 0;
		function _run() {
            const task = tasks[currentIdx]
            currentIdx++
			task
				.then(() => {
                    resolveCount++;
					if (currentIdx < tasks.length) {
						_run();
					} else {
                        
                        if (resolveCount === tasks.length) {
                            console.log('All tasks completed');
                            resolve();
                            return
                        }
                    }
				})
		}
		for (let i = 0; i < Math.min(tasks.length, macCount); i++) {
			_run();
		}
	});
};
bfRequest(tasks, 4)
