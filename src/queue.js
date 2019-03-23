const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize = 30) {
		this.maxSize = maxSize;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if (this.size() == this.maxSize) {
			throw Error("queue has max size");
		}
		else {
			this.heap.push(data, priority);
		}
	}

	shift() {
		if (this.heap.isEmpty() == false) {
			let result = this.heap.pop();
			return result;
		}
		else {
			throw Error('heap is empty');
		}
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}
let q = new PriorityQueue(3);
q.push(0, 1);
module.exports = PriorityQueue;
