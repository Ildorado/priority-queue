const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.sizeOfHeap = 0;
	}

	push(data, priority) {
		let newNode = new Node(data, priority);
		this.insertNode(newNode);
		this.shiftNodeUp(newNode);
	}

	pop() {
		if (this.isEmpty() == false) {
			let result = this.root.data;
			let detached = this.detachRoot();
			if (this.parentNodes.length != 0) {
				this.restoreRootFromLastInsertedNode(detached);
				this.shiftNodeDown(this.root);
			}
			return result;
		}
	}

	detachRoot() {
		let result = this.root;
		if (this.parentNodes.indexOf(this.root) != -1) {
			this.parentNodes.splice(0, 1);
		}
		this.root = null;
		this.sizeOfHeap --;
		return result;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.root == null) {
			let lastInsertedNode = this.parentNodes.pop();
			let parent = null;
			if (lastInsertedNode.parent != detached) {
				parent = lastInsertedNode.parent;
			}
			let detached_left;
			let detached_right;
			if (detached.left != lastInsertedNode) {
				detached_left = detached.left;
			}
			else {
				detached_left = null;
			}
			if (detached.right != lastInsertedNode) {
				detached_right = detached.right;
			}
			else {
				detached_right = null;
			}
			if (detached_left != null) {
				detached_left.remove();
			}
			if (detached_right != null) {
				detached_right.remove();
			}
			lastInsertedNode.remove();
			this.root = lastInsertedNode;
			lastInsertedNode.appendChild(detached_left);
			lastInsertedNode.appendChild(detached_right);
			if (lastInsertedNode.left == null || lastInsertedNode.right == null) {
				this.parentNodes.unshift(lastInsertedNode);
			}
			if (parent != null && this.parentNodes.indexOf(parent) == -1) {
				let arrOfIndexes = [];
				let index = parent.knowIndex();
				this.parentNodes.forEach(element => {
					arrOfIndexes.push(element.knowIndex());
				});

				for (let i = 0; i < arrOfIndexes.length; i++) {
					if (arrOfIndexes[i] > index) {
						this.parentNodes.splice(i, 0, parent);
						break;
					}
				}
			}
		}
	}

	size() {
		return this.sizeOfHeap;
	}

	isEmpty() {
		if (this.root == null && this.parentNodes.length == 0) {
			return true;
		}
		else {
			return false;
		}
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.sizeOfHeap = 0;
	}

	insertNode(node) {
		this.sizeOfHeap ++;
		if (this.root == null) {
			this.root = node;
			this.parentNodes.push(node);
		}
		else {
			this.parentNodes[0].appendChild(node);
			if (this.parentNodes[0].left != null && this.parentNodes[0].right != null) {
				this.parentNodes.shift();
			}
			this.parentNodes.push(node);
		}
	}

	shiftNodeUp(node) {
		if (node.parent != null && node.priority > node.parent.priority) {
			let indexOfNode = this.parentNodes.indexOf(node);
			let indexOfParentNode = this.parentNodes.indexOf(node.parent);
			let node_child = node;
			let node_parent = node.parent;
			node.swapWithParent();
			if (indexOfNode != -1 || indexOfParentNode != -1) {
				if (indexOfNode != -1) {
					this.parentNodes.splice(indexOfNode, 1, node_parent);
				}
				if (indexOfParentNode != -1) {
					this.parentNodes.splice(indexOfParentNode, 1, node_child);
				}
			}
			this.shiftNodeUp(node);
		}
		else if (node.parent == null) {
			this.root = node;
		}
	}

	shiftNodeDown(node) {
		if ((node.left != null || node.right != null)) {
			if ((node.left != null && node.left.priority > node.priority) || (node.right != null && node.right.priority > node.priority)) {
				//if either left or right is larger than this node then largest of left and right will be
				//the largest possible choice
				let indexOfNode = this.parentNodes.indexOf(node);
				let largestChild;
				let indexOfChildNode;
				let node_parent = node;
				// if (node.left != null && node.left.priority >= node.right.priority) {
				// 	largestChild = node.left;
				// }
				if (node.left == null) {
					largestChild = node.right;
				}
				else if (node.right == null) {
					largestChild = node.left;
				}
				else if (node.left.priority >= node.right.priority) {
					largestChild = node.left;
				}
				else {
					largestChild = node.right;
				}
				indexOfChildNode = this.parentNodes.indexOf(largestChild);

				largestChild.swapWithParent();
				if (indexOfNode != -1 || indexOfChildNode != -1) {
					if (indexOfNode != -1) {
						this.parentNodes.splice(indexOfNode, 1, largestChild);
					}
					if (indexOfChildNode != -1) {
						this.parentNodes.splice(indexOfChildNode, 1, node_parent);
					}
				}
				if (node_parent == this.root) {
					this.root = largestChild;
				}
				this.shiftNodeDown(node);
			}
		}
	}
}
module.exports = MaxHeap;
