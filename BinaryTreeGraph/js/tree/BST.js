/**
 * Created by MJ Lee on 2019/4/16.
 */
Ext.define('MJ.BST', {
    extend: 'MJ.BinaryTree',
    config: {
        // MJ.Comparator
        comparator: null
    },
    constructor: function (cfg) {
        this.callParent(arguments);
        this.initConfig(cfg);
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

            // 添加之后
            this.afterAdd_(this.root);
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
        this.afterAdd_(newNode);
    },
    afterAdd_: function (node) {

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

/*-----------------------------------------------------------------*/