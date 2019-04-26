/**
 * Created by MJ Lee on 2019/4/26.
 */
Ext.define('MJ.BinaryHeap', {
    extend: 'MJ.Heap',
    config: {
        elements: []
    },
    constructor: function (cfg) {
        this.initConfig(cfg);
        this.callParent(arguments);
    },
    heapify: function () {
        var oldElements = this.elements;
        this.clear();

        for (var index in oldElements) {
            this.add(oldElements[index]);
        }
    },
    clear: function () {
        this.callParent(arguments);
        this.elements = [];
    },
    get: function () {
        return this.elements[0];
    },
    add: function (element) {
        this.elements.push(element);
        if (this.elements.length > 1) {
            this._siftUp(this.elements.length - 1);
        }
    },
    remove: function () {
        if (this.elements.length === 0) return;

        var first = this.elements[0];
        // 最后一个覆盖0位置
        this.elements[0] = this.elements[this.elements.length - 1];
        // 删除最后一个元素
        this.elements.pop();

        if (this.elements.length > 1) {
            this._siftDown(0);
        }

        return first;
    },
    _siftUp: function (index) {
        var element = this.elements[index];
        while (index > 0) {
            var parentIndex = (index - 1) >> 1;
            var parent = this.elements[parentIndex];
            // 不大于父节点
            if (this._compare(parent, element) >= 0) break;
            // 将父元素安排到index位置
            this.elements[index] = parent;
            index = parentIndex;
        }
        this.elements[index] = element;
    },
    _siftDown: function (index) {
        var element = this.elements[index];

        var half = this.elements.length >> 1;
        while (index < half) { // index必须是非叶子节点
            // 默认是左边跟父节点比
            var childIndex = (index << 1) + 1;
            var child = this.elements[childIndex];

            var rightIndex = childIndex + 1;
            // 右子节点比左子节点大
            if (rightIndex < this.elements.length &&
                this._compare(this.elements[rightIndex], child) > 0) {
                child = this.elements[childIndex = rightIndex];
            }

            // 不比子节点小
            if (this._compare(element, child) >= 0) break;

            this.elements[index] = child;
            index = childIndex;
        }
        this.elements[index] = element;
    },
    getRoot: function () {
        return this.elements.length === 0 ? null : '0';
    },
    getLeft: function (node) {
        var leftIndex = (node << 1) + 1;
        if (leftIndex >= this.elements.length) return null;
        return leftIndex;
    },
    getRight: function (node) {
        var rightIndex = (node << 1) + 2;
        if (rightIndex >= this.elements.length) return null;
        return rightIndex;
    },
    getString: function (node) {
        return this.elements[node];
    }
});