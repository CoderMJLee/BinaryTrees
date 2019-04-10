/**
 * Created by MJ Lee on 2019/4/6.
 */
Ext.define('MJ.BinaryTreeInfo', {
    getRoot: function () { },
    getLeft: function (node) { },
    getRight: function (node) { },
    getString: function (node) { }
});

Ext.define('MJ.BinaryTree', {
    config: {
        size: 0,
        // MJ.BinaryTree.Node
        root: null,
        elements: null
    },
    constructor: function (cfg) {
        this.initConfig(cfg);
    },
    add: function (element, leftElement, rightElement) {
        if (!element) return;

        var node = null;
        if (!this.root) {
            node = this.root = new MJ.BinaryTree.Node({
                element: element
            });
            this.size = 1;
        } else {
            node = this._node(element);
        }
        if (!node) return;

        if (leftElement) {
            var left = node.left;
            node.left = new MJ.BinaryTree.Node({
                element: leftElement,
                parent: node
            });
            if (!left) {
                this.size++;
            } else {
                node.left.left = left.left;
                node.left.right = left.right;
            }
        }

        if (rightElement) {
            var right = node.right;
            node.right = new MJ.BinaryTree.Node({
                element: rightElement,
                parent: node
            });
            if (!right) {
                this.size++;
            } else {
                node.right.left = right.left;
                node.right.right = right.right;
            }
        }
    },
    _node: function (element) {
        if (!element || !this.root) return null;

        var queue = [];
        queue.push(this.root);

        while (queue.length > 0) {
            var node = queue.shift();
            if (MJ.Comparator.compare(node.element, element) === 0) return node;

            if (node.left) {
                queue.push(node.left);
            }

            if (node.right) {
                queue.push(node.right);
            }
        }
    },
    remove: function(element) {
        var node = this._node(element);
        if (!node) return;

        // 数量减1
        this.size--;

        // 如果度为2
        if (node.left && node.right) {
            // 用后继节点的内容覆盖当前节点
            var s = this.successor(node);
            node.element = s.element;
            // 将后继节点删掉（这里的后继节点的度要么是1，要么是0）
            node = s;
        }

        // 用来替代的元素
        var replacement = node.left ? node.left : node.right;
        if (replacement) { // node是度为1的节点
            replacement.parent = node.parent;
            if (!node.parent) {
                this.root = replacement;
            } else if (node.parent.left === node) { // node是父节点的左子树
                node.parent.left = replacement;
            } else { // node是父节点的右子树
                node.parent.right = replacement;
            }
            this.afterRemove(node, replacement);
            node.left = node.right = node.parent = null;
        } else if (!node.parent) { // node是根节点
            this.root = null;
            this.afterRemove(node);
        } else { // node是叶子节点
            if (node === node.parent.left) {
                node.parent.left = null;
            } else {
                node.parent.right = null;
            }
            this.afterRemove(node);
            node.parent = null;
        }
    },
    afterRemove: function (node, replacement) {

    },
    createNode: function (element, parent) {
        return new MJ.BinaryTree.Node({
            element: element,
            parent: parent
        });
    },
    inorderTraversal: function () {
        var eles = [];
        this._inorderTraversal(this.root, eles);
        console.log(eles.join(','));
    },
    _inorderTraversal: function (node, eles) {
        if (!node) return;

        this._inorderTraversal(node.left, eles);
        eles.push(node.toString());
        this._inorderTraversal(node.right, eles);
    },
    getLeft: function (node) {
        return node.left;
    },
    getRight: function (node) {
        return node.right;
    },
    getString: function (node) {
        return node.toString();
    },
    clear: function () {
        this.size = 0;
        this.elements = null;
        this.root = null;
    },
    predecessor: function (node) {
        if (!node) return null;

        // 左子树的最大节点就是前驱
        if (node.left) {
            var p = node.left;
            while (p.right) {
                p = p.right;
            }
            return p;
        }

        // 往上找，如果是parent的右子树，那么parent就是前驱
        while (node.parent && node === node.parent.left) {
            node = node.parent;
        }
        return node.parent;
    },
    successor: function (node) {
        if (!node) return null;

        // 右子树的最小节点就是后继
        if (node.right) {
            var s = node.right;
            while (s.left) {
                s = s.left;
            }
            return s;
        }

        // 往上找，如果是parent的左子树，那么parent就是后继
        while (node.parent && node === node.parent.right) {
            node = node.parent;
        }
        return node.parent;
    }
});

Ext.define('MJ.BinaryTree.Node', {
    config: {
        left: null,
        right: null,
        parent: null,
        element: null,
        height: 1
    },
    constructor: function (cfg) {
        this.initConfig(cfg);
    },
    toString: function () {
        return this.element.toString();
    },
    isLeaf: function () {
        return !this.left && !this.right;
    },
    hasTwoChildren: function () {
        return this.left && this.right;
    },
    isLeftChild: function () {
        return this.parent && this === this.parent.left;
    },
    isRightChild: function () {
        return this.parent && this === this.parent.right;
    },
    tallerChild: function () {
        var leftHeight = this.left ? this.left.height : 0;
        var rightHeight = this.right ? this.right.height : 0;
        if (leftHeight > rightHeight) return this.left;
        if (rightHeight > leftHeight) return this.right;
        return this.isLeftChild() ? this.left : this.right;
    }
});

Ext.define('MJ.BinarySearchTree', {
    extend: 'MJ.BinaryTree',
    config: {
        // MJ.Comparator
        comparator: null
    },
    constructor: function (cfg) {
        this.initConfig(cfg);
        this.callParent(arguments);
    },
    setElements: function (elements) {
        if (!Ext.isArray(elements)) return;
        for (var index in elements) {
            this.add(elements[index]);
        }
        this.elements = elements;
    },
    _compare: function (element1, element2) {
        // Comparator
        if (this.comparator) {
            return this.comparator.compare(element1, element2);
        }

        // Comparable
        return MJ.Comparator.compare(element1, element2);
    },
    add: function (element) {
        if (!element) return;

        if (!this.root) {
            this.root = this.createNode(element);
            this.size++;
            return;
        }

        // 找出父节点
        var parent = this.root;
        var node = this.root;
        var cmp = 0;
        while (node !== null) {
            cmp = this._compare(element, node.element);
            parent = node;
            if (cmp > 0) {
                node = node.right;
            } else if (cmp < 0) {
                node = node.left;
            } else {
                node.element = element;
                return;
            }
        }

        var newNode = this.createNode(element, parent);
        if (cmp > 0) {
            parent.right = newNode;
        } else {
            parent.left = newNode;
        }
        this.size++;

        // 添加之后
        this.afterAdd(newNode);
    },
    afterAdd: function (node) {

    },
    _node: function(element) {
        if(!element) return null;
        var node = this.root;
        while (node) {
            var cmp = this._compare(element, node.element);
            if (cmp === 0) return node;
            if (cmp > 0) {
                node = node.right;
            } else {
                node = node.left;
            }
        }
        return node;
    }
});

Ext.define('MJ.AVLTree', {
    extend: 'MJ.BinarySearchTree',
    constructor: function (cfg) {
        this.initConfig(cfg);
        this.callParent(arguments);

    },
    createNode: function (element, parent) {
        return new MJ.AVLTree.Node({
            element: element,
            parent: parent
        });
    },
    afterAdd: function (node) {
        this.callParent(arguments);

        node = node.parent;
        while (node) {
            if (node.isBalanced()) {
                // 更新高度
                node.updateHeight();
            } else {
                // 恢复平衡
                this.rebalance(node);
                break;
            }
            node = node.parent;
        }
    },
    afterRemove: function (node, replacement) {
        this.callParent(arguments);

        node = node.parent;
        while (node) {
            if (node.isBalanced()) {
                node.updateHeight();
            } else {
                this.rebalance(node);
            }
            node = node.parent;
        }
    },
    afterRotate: function (g, p, c) {
        // 子树的根节点嫁接到原树中
        if (g.isLeftChild()) {
            g.parent.left = p;
        } else if (g.isRightChild()) {
            g.parent.right = p;
        } else {
            this.root = p;
        }

        // parent维护
        if (c) {
            c.parent = g;
        }
        p.parent = g.parent;
        g.parent = p;

        // 更新高度（先更新比较矮的g，再更新比较高的p）
        g.updateHeight();
        p.updateHeight();
    },
    leftRotate: function (g) {
        // 交换子树
        var p = g.right;
        var c = p.left;
        g.right = c;
        p.left = g;
        // 维护parent和height
        this.afterRotate(g, p, c);
    },
    rightRotate: function (g) {
        // 交换子树
        var p = g.left;
        var c = p.right;
        g.left = c;
        p.right = g;
        // 维护parent和height
        this.afterRotate(g, p, c);
    },
    rebalance: function (g) {
        p = g.tallerChild();
        n = p.tallerChild();
        if (p.isLeftChild()) { // L
            if (n.isLeftChild()) { // LL
                this.rightRotate(g);
            } else { // LR
                this.leftRotate(p);
                this.rightRotate(g);
            }
        } else { // R
            if (n.isLeftChild()) { // RL
                this.rightRotate(p);
                this.leftRotate(g);
            } else { // RR
                this.leftRotate(g);
            }
        }
    }
});

Ext.define('MJ.AVLTree.Node', {
    extend: 'MJ.BinaryTree.Node',
    constructor: function (cfg) {
        this.initConfig(cfg);
        this.callParent(arguments);

    },
    isBalanced: function () {
        return Math.abs(this.balanceFactor()) <= 1;
    },
    balanceFactor: function () {
        var leftHeight = this.left ? this.left.height : 0;
        var rightHeight = this.right ? this.right.height : 0;
        return leftHeight - rightHeight;
    },
    updateHeight: function () {
        var leftHeight = this.left ? this.left.height : 0;
        var rightHeight = this.right ? this.right.height : 0;
        this.height = 1 + Math.max(leftHeight, rightHeight);
    }
});