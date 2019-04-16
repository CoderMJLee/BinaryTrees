/**
 * Created by MJ Lee on 2019/4/16.
 */
Ext.define('MJ.AVLTree', {
    extend: 'MJ.BBST',
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
    afterAdd_: function (node) {
        while (node = node.parent) {
            if (node.isBalanced()) {
                // 更新高度
                node.updateHeight();
            } else {
                // 恢复平衡
                this._rebalance(node);
                break;
            }
        }
    },
    afterRemove_: function (node, isLeft, replacement) {
        while (node = node.parent) {
            if (node.isBalanced()) {
                node.updateHeight();
            } else {
                this._rebalance(node);
            }
        }
    },
    afterRotate_: function (g, p, c) {
        this.callParent(arguments);

        // 更新高度（先更新比较矮的g，再更新比较高的p）
        g.updateHeight();
        p.updateHeight();
    },
    _rebalance: function (g) {
        p = g.tallerChild();
        n = p.tallerChild();
        if (p.isLeftChild()) { // L
            if (n.isLeftChild()) { // LL
                this.rotateRight_(g);
            } else { // LR
                this.rotateLeft_(p);
                this.rotateRight_(g);
            }
        } else { // R
            if (n.isLeftChild()) { // RL
                this.rotateRight_(p);
                this.rotateLeft_(g);
            } else { // RR
                this.rotateLeft_(g);
            }
        }
    }
});

/*-----------------------------------------------------------------*/

Ext.define('MJ.AVLTree.Node', {
    extend: 'MJ.BinaryTree.Node',
    constructor: function (cfg) {
        this.callParent(arguments);
        this.initConfig(cfg);

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

/*-----------------------------------------------------------------*/