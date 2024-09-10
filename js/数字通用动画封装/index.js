function animate(duration, from, to, callback) {
	
	let speed = (to - from) / duration;
	let startTime = new Date();
    let value = from;
	function run() {
		const endTime = new Date();
		let time = endTime - startTime;
		if (time >= duration) {
			value = to;
			callback(value);
			return;
		}
		value = from + time * speed;
		callback(value);
		requestAnimationFrame(run);
	}
	run();
}
