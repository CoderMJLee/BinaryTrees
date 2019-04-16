/**
 * Created by MJ Lee on 2019/4/16.
 */
Ext.define('MJ.RBTree', {
    extend: 'MJ.BBST',
    statics: {
        RED: false,
        BLACK: true
    },
    config: {
        showNull: false
    },
    constructor: function (cfg) {
        this.initConfig(cfg);
        this.callParent(arguments);

    },
    createNode: function (element, parent) {
        return new MJ.RBTree.Node({
            element: element,
            parent: parent
        });
    },
    afterAdd_: function (node) {
        var parent = node.parent;

        // 添加的是一个根节点、或者上溢到了根节点
        if (parent == null) {
            this._black(node);
            return;
        }

        // 父节点是黑色
        if (this._isBlack(parent)) return;

        // 祖父节点
        var grand = this._red(parent.parent);
        // 叔父节点
        var uncle = parent.sibling();

        // 节点上溢
        if (this._isRed(uncle)) {
            this._black(parent);
            this._black(uncle);
            this.afterAdd_(grand);
            return;
        }

        // 节点不上溢
        if (parent.isLeftChild()) {
            if (node.isLeftChild()) { // LL
                this._black(parent);
            } else { // LR
                this._black(node);
                this.rotateLeft_(parent);
            }
            this.rotateRight_(grand);
        } else {
            if (node.isLeftChild()) { // RL
                this._black(node);
                this.rotateRight_(parent);
            } else { // RR
                this._black(parent);
            }
            this.rotateLeft_(grand);
        }
    },
    afterRemove_: function (node, isLeft, replacement) {
        // 如果被删除的是红色节点
        if (this._isRed(node)) return;

        // 如果替代节点是红色
        if (this._isRed(replacement)) {
            this._black(replacement);
            return;
        }

        // 父节点
        var parent = node.parent;
        if (!parent) return;

        // 如果替代节点是黑色
        // 兄弟节点
        var sibling = isLeft ? parent.right : parent.left;
        if (isLeft) { // 兄弟节点在右边
            if (this._isRed(sibling)) {
                this._black(sibling);
                this._red(parent);

                this.rotateLeft_(parent);
                sibling = parent.right;
            }

            if (this._isBlack(sibling.left) && this._isBlack(sibling.right)) {
                var parentBlack = this._isBlack(parent);
                this._black(parent);
                this._red(sibling);
                if (parentBlack) {
                    this.afterRemove_(parent, parent.isLeftChild(), null);
                }
            } else { // 兄弟节点至少有一个红色节点
                if (this._isBlack(sibling.right)) {
                    this.rotateRight_(sibling);
                    sibling = parent.right;
                }

                this._color(sibling, this._colorOf(parent));
                this._black(parent);
                this._black(sibling.right);
                this.rotateLeft_(parent);
            }
        } else { // 兄弟节点在左边
            if (this._isRed(sibling)) {
                this._black(sibling);
                this._red(parent);

                this.rotateRight_(parent);
                sibling = parent.left;
            }

            if (this._isBlack(sibling.left) && this._isBlack(sibling.right)) {
                var parentBlack = this._isBlack(parent);
                this._black(parent);
                this._red(sibling);
                if (parentBlack) {
                    this.afterRemove_(parent, parent.isLeftChild(), null);
                }
            } else { // 兄弟节点至少有一个红色节点
                if (this._isBlack(sibling.left)) {
                    this.rotateLeft_(sibling);
                    sibling = parent.left;
                }

                this._color(sibling, this._colorOf(parent));
                this._black(parent);
                this._black(sibling.left);
                this.rotateRight_(parent);
            }
        }
    },
    _isBlack: function (node) {
        // 空节点是黑色的
        return !node || node.color === MJ.RBTree.BLACK;
    },
    _isRed: function (node) {
        return node && node.color === MJ.RBTree.RED;
    },
    _colorOf: function (node) {
        return !node ? MJ.RBTree.BLACK : node.color;
    },
    _color: function (node, color) {
        if (node) node.color = color;
        return node;
    },
    _black: function (node) {
        if (node) node.color = MJ.RBTree.BLACK;
        return node;
    },
    _red: function (node) {
        if (node) node.color = MJ.RBTree.RED;
        return node;
    }
});

/*-----------------------------------------------------------------*/

Ext.define('MJ.RBTree.Node', {
    config: {
        color: MJ.RBTree.RED
    },
    extend: 'MJ.BinaryTree.Node',
    constructor: function (cfg) {
        this.callParent(arguments);
        this.initConfig(cfg);
    }
});

/*-----------------------------------------------------------------*/