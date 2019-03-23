class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	knowIndex() {
		let index = 0;
		let x = this;
		while(x.parent != null) {
			x = x.parent;
			index +=1;
		}
		return index;
	}

	appendChild(node) {
		if (node != null) {
			if (this.left == null) {
				this.left = node;
				this.left.parent = this;
			}
			else if (this.right == null) {
				this.right = node;
				this.right.parent = this;
			}
		}
	}

	removeChild(node) {
		if (this.left == node) {
			this.left = null;
		}
		else if (this.right == node) {
			this.right = null;
		}
		else {
			throw Error("This is not a child of this node")
		}
		node.parent = null;
	}

	remove() {
		if (this.parent != null) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent != null) {
			let grandparent = this.parent.parent;
			let is_parent_left_child = false;
			if (grandparent != null &&
				this.parent.parent.left == this.parent) {
				is_parent_left_child = true;
			}
			let child_left = this.left;
			let child_right = this.right;
			this.left = null;
			this.right = null;
			this.parent.parent = this;
			if (this.parent.right == this) {
				this.right = this.parent;
				this.appendChild(this.parent.left);
				this.parent.left = null;
				this.parent.right = null;
				// assing childs of this to this.parent
				//as we swapped their positions
				if (child_left != null) {
					this.parent.left = child_left;
					child_left.parent = this.parent;
				}
				if (child_right != null) {
					this.parent.right = child_right;
					child_right.parent = this.parent;
				}
			}
			if (this.parent.left == this) {
				this.left = this.parent;
				this.appendChild(this.parent.right);
				this.parent.left = null;
				this.parent.right = null;
				// assing childs of this to this.parent
				//as we swapped their positions
				if (child_left != null) {
					this.parent.left = child_left;
					child_left.parent = this.parent;
				}
				if (child_right != null) {
					this.parent.right = child_right;
					child_right.parent = this.parent;
				}
			}
			this.parent.parent.parent = grandparent;
			if (grandparent != null) {
				if (is_parent_left_child == true) {
					grandparent.left = this;
				}
				else {
					grandparent.right = this;
				}
			}
		}
	}
}
const root1 = new Node(15, 42);
const left = new Node(42, 15);
const right = new Node(13, 42);
const childOfLeft = new Node(13, 34);
const childOfRight = new Node(0, 1);

root1.appendChild(left);
root1.appendChild(right);
left.appendChild(childOfLeft);
right.appendChild(childOfRight);

childOfLeft.swapWithParent();
childOfRight.swapWithParent();

module.exports = Node;
