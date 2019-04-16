/**
 * Created by MJ Lee on 2019/4/16.
 */
Ext.define('MJ.BBST', {
    extend: 'MJ.BST',
    constructor: function (cfg) {
        this.initConfig(cfg);
        this.callParent(arguments);
    },
    afterRotate_: function (grand, parent, child) {
        // 子树的根节点嫁接到原树中
        if (grand.isLeftChild()) {
            grand.parent.left = parent;
        } else if (grand.isRightChild()) {
            grand.parent.right = parent;
        } else {
            this.root = parent;
        }

        // parent维护
        if (child) {
            child.parent = grand;
        }
        parent.parent = grand.parent;
        grand.parent = parent;
    },
    rotateLeft_: function (grand) {
        // 交换子树
        var parent = grand.right;
        var child = parent.left;
        grand.right = child;
        parent.left = grand;
        // 维护parent和height
        this.afterRotate_(grand, parent, child);
    },
    rotateRight_: function (grand) {
        // 交换子树
        var parent = grand.left;
        var child = parent.right;
        grand.left = child;
        parent.right = grand;
        // 维护parent和height
        this.afterRotate_(grand, parent, child);
    }
});

/*-----------------------------------------------------------------*/