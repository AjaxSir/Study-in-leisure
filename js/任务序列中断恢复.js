/*
 * @Date: 2024-09-25 11:22:01
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-09-25 11:36:42
 * @Description:
 */
async function task(idx) {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
            console.log(`Task ${idx} completed`);
			resolve();
		}, 1000);
	});
}

const tasks = new Array(10).fill(task);

function taskUtils(taskList) {
	if (!Array.isArray(taskList)) {
		throw new Error('taskList must be an array');
	}
	let isRunning = false;
	let current = 0;
	async function start() {
        isRunning = true;
        console.log('start', isRunning, current < taskList.length)
        while (current < taskList.length && isRunning) {
            await taskList[current](current);
            current += 1;
        }
        
	}
	function pause() {
		isRunning = false;
	}
	return {
		start,
		pause,
	};
}
const { start, pause } = taskUtils(tasks)
start()
setTimeout(() => {
    pause()
}, 3000);