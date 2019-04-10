/**
 * Created by MJ Lee on 2019/4/6.
 */
Ext.define('MJ.Graph', {
    statics: {
        BG_FILL: 'white',
        NODE_FILL: '#f92672',
        NODE_STROKE: '#424242',
        TEXT_FILL: 'white',
        LINK_STROKE: '#424242',
        ARROW_FILL: 'yellow',
        FONT_SIZE: 20,
        FONT_FAMILY: 'Consolas',
        X_SPACE: 10,
        Y_SPACE: 30,
        LINE_WIDTH: 30,
        LINK_TYPE_ELBOW: 'elbow',
        LINK_TYPE_LINE: 'line'
    },
    config: {
        // MJ.BinaryTreeInfo
        tree: null,
        // MJ.Graph.Node
        root: null,
        // [[MJ.Graph.Node]]
        nodes: null,
        maxWidth: 0,
        minX: 0,
        paperWidth: 0,
        paperHeight: 0,
        paper: null,
        // elbow\line
        linkType: null
    },
    constructor: function (cfg) {
        this.initConfig(cfg);
    },
    display: function () {
        var btRoot = this.tree ? this.tree.getRoot() : null;
        if (!btRoot) {
            $('#paper').find('svg').empty();
            return this;
        }

        this.root = new MJ.Graph.Node({
            string: this.tree.getString(btRoot),
            btNode: btRoot
        });

        this.nodes = [];
        this._fillNodes();
        this._placeNodes();
        this._compressNodes();
        this._measureNodes();
        this._displayNodes();
        return this;
    },
    _addNode: function (nodes, btNode) {
        var node = null;
        if (btNode) {
            node = new MJ.Graph.Node({
                string: this.tree.getString(btNode),
                btNode: btNode
            });
            nodes.push(node);

            this.maxWidth = Math.max(this.maxWidth, node.width);
        } else {
            nodes.push(null);
        }
        return node;
    },
    _fillNodes: function () {
        // 第一行
        var firstRow = [];
        firstRow.push(this.root);
        this.nodes.push(firstRow);

        // 其他行
        while (true) {
            var preRow = this.nodes[this.nodes.length - 1];
            var row = [];

            var notNull = false;
            for (var index in preRow) {
                var node = preRow[index];
                if (node) {
                    var left = this._addNode(row, this.tree.getLeft(node.btNode));
                    if (left) {
                        node.left = left;
                        left.parent = node;
                        left.level = node.level + 1;
                        notNull = true;
                    }

                    var right = this._addNode(row, this.tree.getRight(node.btNode));
                    if (right) {
                        node.right = right;
                        right.parent = node;
                        right.level = node.level + 1;
                        notNull = true;
                    }
                } else {
                    row.push(null);
                    row.push(null);
                }
            }

            // 全是null，就退出
            if (!notNull) break;
            this.nodes.push(row);
        }
    },
    _placeNodes: function () {
        var rowCount = this.nodes.length;
        var newNodes = [];

        // 每个节点的高度
        var height = MJ.textSize(MJ.Graph.FONT_SIZE + 'px',
            MJ.Graph.FONT_FAMILY, '6哈j]】').height;

        // 最后一行的节点数量
        var lastRowNodeCount = this.nodes[rowCount - 1].length;

        // 每个节点之间的间距
        var nodeSpace = this.maxWidth;

        // 最后一行的长度
        var lastRowLength = lastRowNodeCount * this.maxWidth
            + nodeSpace * (lastRowNodeCount - 1);
        for (var i = 0; i < rowCount; i++) {
            var rowNodes = this.nodes[i];
            var newRowNodes = [];
            newNodes.push(newRowNodes);

            var rowNodeCount = rowNodes.length;
            // 节点左右两边的间距
            var allSpace = lastRowLength - (rowNodeCount - 1) * nodeSpace;
            var cornerSpace = allSpace / rowNodeCount - this.maxWidth;
            cornerSpace >>= 1;

            var rowLength = 0;
            for (var j = 0; j < rowNodeCount; j++) {
                if (j !== 0) {
                    // 每个节点之间的间距
                    rowLength += nodeSpace;
                }
                rowLength += cornerSpace;
                var node = rowNodes[j];
                if (node) {
                    node.x = rowLength;
                    // node.width = this.maxWidth;
                    node.height = height;
                    node.y = i * (height + MJ.Graph.Y_SPACE);
                    newRowNodes.push(node);
                }
                rowLength += this.maxWidth;
                rowLength += cornerSpace;
            }
        }

        this.nodes = newNodes;
    },
    _compressNodes: function () {
        var rowCount = this.nodes.length;
        if (rowCount < 2) return;

        for (var i = rowCount - 2; i >= 0; i--) {
            var rowNodes = this.nodes[i];
            for (var index in rowNodes) {
                var node = rowNodes[index];
                var left = node.left;
                var right = node.right;
                if (!left && !right) continue;
                if (left && right) {
                    // 让左右节点对称
                    node.balance(left, right);

                    // left和right之间可以挪动的最小间距
                    var leftEmpty = node.leftBoundEmptyLength();
                    var rightEmpty = node.rightBoundEmptyLength();
                    var empty = Math.min(leftEmpty, rightEmpty);
                    empty = Math.min(empty, (right.x - left.rightX()) >> 1);

                    // left、right的子节点之间可以挪动的最小间距
                    var space = left.minLevelSpaceToRight(right) - MJ.Graph.X_SPACE;
                    space = Math.min(space >> 1, empty);

                    // left、right往中间挪动
                    if (space > 0) {
                        left.translateX(space);
                        right.translateX(-space);
                    }

                    // 继续挪动
                    space = left.minLevelSpaceToRight(right) - MJ.Graph.X_SPACE;
                    if (space < 1) continue;

                    // 可以继续挪动的间距
                    leftEmpty = node.leftBoundEmptyLength();
                    rightEmpty = node.rightBoundEmptyLength();
                    if (leftEmpty < 1 && rightEmpty < 1) continue;

                    if (leftEmpty > rightEmpty) {
                        left.translateX(Math.min(leftEmpty, space));
                    } else {
                        right.translateX(-Math.min(rightEmpty, space));
                    }
                } else if (left) {
                    left.translateX(node.leftBoundEmptyLength());
                } else { // right != null
                    right.translateX(-node.rightBoundEmptyLength());
                }
            }
        }
    },
    _measureNodes: function () {
        this.minX = this.root.x;
        var maxRightX = 0;
        var maxBottomY = 0;
        for (var row in this.nodes) {
            var rowNodes = this.nodes[row];
            for (var index in rowNodes) {
                var node = rowNodes[index];
                this.minX = Math.min(this.minX, node.x);
                maxRightX = Math.max(maxRightX, node.rightX());
                maxBottomY = Math.max(maxBottomY, node.y + node.height);
            }
        }

        this.paperWidth = maxRightX - this.minX;
        this.paperHeight = maxBottomY;
    },
    _displayNode: function (cells, node) {
        var rect = new joint.shapes.standard.Rectangle();
        rect.position(node.x - this.minX, node.y);

        rect.resize(node.width, node.height);
        rect.attr({
            body: {
                fill: MJ.Graph.NODE_FILL,
                stroke: MJ.Graph.NODE_STROKE
            },
            label: {
                text: node.string,
                fill: MJ.Graph.TEXT_FILL,
                fontSize: MJ.Graph.FONT_SIZE,
                fontFamily: MJ.Graph.FONT_FAMILY
            }
        });
        cells.push(rect);
        node.cell = rect;


        if (!node.parent) return;

        var link = new joint.shapes.standard.Link();
        link.attr({
            line: {
                stroke: MJ.Graph.LINK_STROKE,
                targetMarker: {
                    fill: MJ.Graph.ARROW_FILL
                }
            }
        });
        var parentAnchor = 'left';
        if (node === node.parent.right) {
            parentAnchor = 'right';
        }
        link.source(node.parent.cell, {
            anchor: { name: parentAnchor }
        });
        if (!this.linkType ||
            this.linkType === MJ.Graph.LINK_TYPE_ELBOW) {
            link.router('orthogonal', {
                padding: 10
            });
            link.connector('jumpover');
        }
        link.target(rect, {
            anchor: { name: 'top' }
        });
        cells.push(link);
    },
    _displayNodes: function () {
        var $paper = $('#paper');
        $paper.empty();
        $paper.css('display', 'block');

        var graph = new joint.dia.Graph;
        var paperPadding = 20;

        var bothPadding = paperPadding << 1;
        var minWidth = 500;
        var minHeight = 500;
        var pWidth = Math.max(minWidth, this.paperWidth) + bothPadding;
        var pHeight = Math.max(minHeight, this.paperHeight) + bothPadding;

        this.paper = new joint.dia.Paper({
            el: $paper,
            width: pWidth,
            height: pHeight,
            model: graph,
            drawGrid: true,
            gridSize: 10,
            background: {
                color: MJ.Graph.BG_FILL
            }
        });
        var tx = paperPadding;
        var ty = paperPadding;
        if (minWidth > this.paperWidth) {
            tx += (minWidth - this.paperWidth) >> 1;
        }
        if (minHeight > this.paperHeight) {
            ty += (minHeight - this.paperHeight) >> 1;
        }
        this.paper.translate(tx, ty);

        var cells = [];

        for (var row in this.nodes) {
            var rowNodes = this.nodes[row];
            for (var index in rowNodes) {
                this._displayNode(cells, rowNodes[index]);
            }
        }

        graph.addCells(cells);
    }
});

Ext.define('MJ.Graph.Node', {
    config: {
        left: null,
        right: null,
        parent: null,
        string: null,

        x: 0,
        y: 0,
        width: 0,
        height: 0,
        level: 0,

        btNode: null,
        cell: null,
        treeHeight: 0
    },
    constructor: function (cfg) {
        this.initConfig(cfg);
        this.callParent(arguments);

    },
    getTreeHeight: function () {
        if (this.treeHeight > 0) return this.treeHeight;
        this.treeHeight = this._getTreeHeight(this);
        return this.treeHeight;
    },
    _getTreeHeight: function (node) {
        if (!node) return 0;
        var leftTreeHeight = this._getTreeHeight(node.left);
        var rightTreeHeight = this._getTreeHeight(node.right);
        var treeHeight = 1 + Math.max(leftTreeHeight, rightTreeHeight);
        return node.treeHeight = treeHeight;
    },
    minLevelSpaceToRight: function (right) {
        var height = Math.min(this.getTreeHeight(), right.getTreeHeight());
        var minSpace = Number.MAX_VALUE;
        for (var i = 0; i < height; i++) {
            var space = right.levelInfo(i).leftX
                - this.levelInfo(i).rightX;
            minSpace = Math.min(minSpace, space);
        }
        return minSpace;
    },
    levelInfo: function (level) {
        if (level < 0) return null;
        if (level >= this.getTreeHeight()) return null;

        var list = [];
        var queue = [];
        queue.push(this);

        var levelY = this.level + level;
        while (queue.length > 0) {
            var node = queue.shift();
            if (levelY === node.level) {
                list.push(node);
            } else if (node.level > levelY) break;

            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }

        var leftX = list[0].leftBound();
        var rightX = list[list.length - 1].rightBound();
        return {
            leftX: leftX,
            rightX: rightX
        };
    },
    topLineX: function () {
        // 宽度的一半
        var delta = this.width;
        if (delta % 2 === 0) {
            delta--;
        }
        delta >>= 1;

        if (this.parent && this === this.parent.left) {
            return this.rightX() - 1 - delta;
        } else {
            return this.x + delta;
        }
    },
    leftBoundLength: function () {
        return this.x - this.leftBound();
    },
    rightBoundLength: function () {
        return this.rightBound() - this.rightX();
    },
    leftBoundEmptyLength: function () {
        return this.leftBoundLength() - 1 - MJ.Graph.LINE_WIDTH;
    },
    rightBoundEmptyLength: function () {
        return this.rightBoundLength() - 1 - MJ.Graph.LINE_WIDTH;
    },
    rightBound: function () {
        if (!this.right) return this.rightX();
        return this.right.topLineX() + 1 + MJ.Graph.X_SPACE;
    },
    leftBound: function () {
        if (!this.left) return this.x;
        return this.left.topLineX() - MJ.Graph.X_SPACE;
    },
    balance: function (left, right) {
        if (!left || !right) return;
        // 【left的尾字符】与【this的首字符】之间的间距
        var deltaLeft = this.x - left.rightX();
        // 【this的尾字符】与【this的首字符】之间的间距
        var deltaRight = right.x - this.rightX();

        var delta = Math.max(deltaLeft, deltaRight);
        var newRightX = this.rightX() + delta;
        right.translateX(newRightX - right.x);

        var newLeftX = this.x - delta - left.width;
        left.translateX(newLeftX - left.x);
    },
    translateX: function (deltaX) {
        if (deltaX === 0) return;
        this.x += deltaX;

        if (this.left) {
            this.left.translateX(deltaX);
        }
        if (this.right) {
            this.right.translateX(deltaX);
        }
    },
    rightX: function() {
        return this.x + this.width;
    },
    setParent: function (parent) {
        this.callParent(arguments);

        this.level = parent.level + 1;
    },
    setString: function (string) {
        this.string = string;
        var result = MJ.textSize(MJ.Graph.FONT_SIZE + 'px', MJ.Graph.FONT_FAMILY, string);
        this.width = result.width + 15;
    }
});