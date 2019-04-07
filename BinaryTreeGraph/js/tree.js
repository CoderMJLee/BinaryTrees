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
        height: 0,
        depth: 0
    },
    getHeight: function () {
        if (this.height > 0) return this.height;
        this.height = this._getHeight(this);
        return this.height;
    },
    _getHeight: function (node) {
        if (!node) return 0;
        var leftHeight = this._getHeight(node.left);
        var rightHeight = this._getHeight(node.right);
        var height = 1 + Math.max(leftHeight, rightHeight);
        return node.height = height;
    },
    constructor: function (cfg) {
        this.initConfig(cfg);
    },
    toString: function () {
        return this.element.toString();
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
            this.root = new MJ.BinaryTree.Node({
                element: element
            });
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

        var newNode = new MJ.BinaryTree.Node({
            element: element,
            parent: parent
        });
        if (cmp > 0) {
            parent.right = newNode;
        } else {
            parent.left = newNode;
        }
        this.size++;
    },
    node: function(element) {
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
    },
    remove: function(element) {
        var node = this.node(element);
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
            node.left = node.right = node.parent = null;
        } else if (!node.parent) { // node是根节点
            this.root = null;
        } else { // node是叶子节点
            if (node === node.parent.left) {
                node.parent.left = null;
            } else {
                node.parent.right = null;
            }
            node.parent = null;
        }
    }
});