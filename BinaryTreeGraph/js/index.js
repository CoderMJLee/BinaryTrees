/**
 * Created by MJ Lee on 2019/4/6.
 */

Ext.define('MJ.Demo', {
    statics: {
        randomMaxCount: 20,
        randomMaxValue: 100,
        rbTree: new MJ.RBTree(),
        avlTree: new MJ.AVLTree(),
        bstTree: new MJ.BST(),
        btTree: new MJ.BinaryTree(),
        binaryHeap: new MJ.BinaryHeap(),

        POSTORDER: '3',
        INORDER: '2',
        PREORDER: '1',
        LEVEL_ORDER: '0',

        SHOW_BH: '4',
        SHOW_RB: '3',
        SHOW_AVL: '2',
        SHOW_BST: '1',
        SHOW_BT: '0',

        $bhCtl: $('#bh'),
        $rbCtl: $('#rb'),
        $avlCtl: $('#avl'),
        $bstCtl: $('#bst'),
        $btCtl: $('#bt'),

        LINK_TYPE_ELBOW: MJ.BinaryTree.GraphLayout.LINK_TYPE_ELBOW,
        LINK_TYPE_LINE: MJ.BinaryTree.GraphLayout.LINK_TYPE_LINE,
        linkType : MJ.BinaryTree.GraphLayout.LINK_TYPE_ELBOW,
    }
});

$(function () {
    initCommon();
    initBt();
    initBst(MJ.Demo.$bstCtl, MJ.Demo.bstTree);
    initBst(MJ.Demo.$avlCtl, MJ.Demo.avlTree);
    initBst(MJ.Demo.$rbCtl, MJ.Demo.rbTree);
    initRb();
    initBh();

    $('#modules').remove();
});

function display() {
    var $ctl = showingTreeCtl();
    var $paper = $ctl.find('.paper, .joint-paper');
    $paper.show();

    var layout = new MJ.BinaryTree.GraphLayout({
        tree: showingTree(),
        linkType: MJ.Demo.linkType,
        $paper: $paper
    }).display();

    $ctl.find('.node-count').text(layout.tree.size);
    $ctl.find('.orders select').change();
}

function linkType() {
    var linkType = MJ.Demo.LINK_TYPE_ELBOW;
    if (showingTreeCtl().find('.link-type .line').is(':checked')) {
        linkType = MJ.Demo.LINK_TYPE_LINE;
    }
    return linkType;
}

function initCommon() {
    $('#common').find('.type select').change(function () {
        MJ.Demo.$avlCtl.hide();
        MJ.Demo.$bstCtl.hide();
        MJ.Demo.$btCtl.hide();
        MJ.Demo.$rbCtl.hide();
        MJ.Demo.$bhCtl.hide();
        showingTreeCtl().show();

        MJ.Demo.linkType = linkType();
    });
}

function initBh() {
    var $bh = MJ.Demo.$bhCtl;
    $bh.append(clonePaper());
    var $content = $bh.find('.content');
    // 箭头
    $content.prepend('<hr>').prepend(cloneLinkType($bh.attr('id'))).append('<hr>');
    // 输入
    $content.append(cloneBstInput(MJ.Demo.binaryHeap));
    $content.find('.heap-type input').click(function () {
        var maxHeap = MJ.Demo.binaryHeap.maxHeap;
        MJ.Demo.binaryHeap.maxHeap = $content.find('.max-heap').is(':checked');
        if (maxHeap === MJ.Demo.binaryHeap.maxHeap) return;

        // 判断root放后面
        if (!MJ.Demo.binaryHeap.getRoot()) return;

        MJ.Demo.binaryHeap.heapify();
        display();
    });
}

function initBt() {
    var $bt = MJ.Demo.$btCtl;
    $bt.find('.add').click(function () {
        MJ.Demo.btTree.add(
            $bt.find('.node').val().trim(),
            $bt.find('.left').val().trim(),
            $bt.find('.right').val().trim()
        );
        display();
    });
    $bt.find('.remove').click(function () {
        if (!MJ.Demo.btTree.getRoot()) return;

        MJ.Demo.btTree.remove($bt.find('.node').val());
        display();
    });
    $bt.find('.clear').click(function () {
        if (!MJ.Demo.btTree.getRoot()) return;

        MJ.Demo.btTree.clear();
        display();
    });

    // paper
    $bt.append(clonePaper());
    var $content = $bt.find('.content');
    // 箭头
    $content.prepend('<hr>').prepend(cloneLinkType($bt.attr('id')));
    // 遍历
    $content.append('<hr>').append(cloneOrders());

    // 初始化
    MJ.Demo.btTree.add("Life", "Animal", "Person");
    MJ.Demo.btTree.add("Person", "Man", "Woman");
    MJ.Demo.btTree.add("Animal", "Cat", "Dog");
    MJ.Demo.btTree.add("Dog", "Teddy", "SingleDog");
    display();
}

function initBst($bstCtl, bstTree) {
    // paper
    $bstCtl.append(clonePaper());

    var $content = $bstCtl.find('.content');
    // 箭头
    $content.append(cloneLinkType($bstCtl.attr('id'))).append('<hr>');
    // 输入
    $content.append(cloneBstInput(bstTree));
    // 遍历
    $content.append('<hr>').append(cloneOrders());
}

function initRb() {
    MJ.Demo.$rbCtl.find('.show-null input').click(function () {
        MJ.Demo.rbTree.showNull = $(this).is(':checked');
        display();
    });
}

function showingTreeCtl() {
    var val = $('#common').find('.type select').val();
    if (val === MJ.Demo.SHOW_BT) {
        return MJ.Demo.$btCtl;
    } else if (val === MJ.Demo.SHOW_BST) {
        return MJ.Demo.$bstCtl;
    } else if (val === MJ.Demo.SHOW_AVL) {
        return MJ.Demo.$avlCtl;
    } else if (val === MJ.Demo.SHOW_RB) {
        return MJ.Demo.$rbCtl;
    } else if (val === MJ.Demo.SHOW_BH) {
        return MJ.Demo.$bhCtl;
    }
}

function showingTree() {
    var val = $('#common').find('.type select').val();
    if (val === MJ.Demo.SHOW_BT) {
        return MJ.Demo.btTree;
    } else if (val === MJ.Demo.SHOW_BST) {
        return MJ.Demo.bstTree;
    } else if (val === MJ.Demo.SHOW_AVL) {
        return MJ.Demo.avlTree;
    } else if (val === MJ.Demo.SHOW_RB) {
        return MJ.Demo.rbTree;
    } else if (val === MJ.Demo.SHOW_BH) {
        return MJ.Demo.binaryHeap;
    }
}

function cloneOrders() {
    var $orders = clone('.orders');
    $orders.find('select').change(function () {
        var $this = $(this);
        var orderTexts = null;
        var order = $this.val();
        var tree = showingTree();
        if (order === MJ.Demo.LEVEL_ORDER) {
            orderTexts = tree.levelOrderElements();
        } else if (order === MJ.Demo.PREORDER) {
            orderTexts = tree.preorderElements();
        } else if (order === MJ.Demo.INORDER) {
            orderTexts = tree.inorderElements();
        } else if (order === MJ.Demo.POSTORDER) {
            orderTexts = tree.postorderElements();
        }
        $this.parents('.orders').find('.show-order').text(orderTexts? orderTexts.join(', ') : '');
    });

    return $orders;
}

function clonePaper() {
    return clone('.paper').css('left', '390px').css('top', '15px');
}

function cloneLinkType(id) {
    var $linkType = clone('.link-type');
    var name = id + '-link-type';

    var linkFn = function () {
        var oldLinkType = MJ.Demo.linkType;
        MJ.Demo.linkType = linkType();
        if (MJ.Demo.linkType === oldLinkType) return;

        // 判断root放后面
        if (!showingTree().getRoot()) return;

        display();
    };

    var $elbow = $linkType.find('.elbow');
    var elbowId = id + '-elbow';
    $elbow.parents('label').attr('for', elbowId);
    $elbow.attr('id', elbowId);
    $elbow.attr('name', name);
    $elbow.click(linkFn);

    var $line = $linkType.find('.line');
    var lineId = id + '-line';
    $line.parents('label').attr('for', lineId);
    $line.attr('id', lineId);
    $line.attr('name', name);
    $line.click(linkFn);
    return $linkType;
}

function cloneBstInput(bstTree) {
    var $bstInput = clone('.bst-input');
    var $textarea = $bstInput.find('.data');

    $bstInput.find('.random').click(function () {
        var count = $bstInput.find('.max-count').val();
        if (Ext.isNumeric(count)) {
            count = parseInt(count);
        } else {
            count = MJ.Demo.randomMaxCount;
        }
        var value = $bstInput.find('.max-value').val();
        if (Ext.isNumeric(value)) {
            value = parseInt(value);
        } else {
            value = MJ.Demo.randomMaxValue;
        }

        count = 1 + Math.floor(Math.random()*count);
        var nums = [];
        for (var i = 0; i < count; i++) {
            var num = null;
            while (num === null || $.inArray(num, nums) !== -1) {
                num = 1 + Math.floor(Math.random()*value)
            }
            nums.push(num);
        }
        $textarea.val(nums.join(', '));
    });

    $bstInput.find('.add').click(function () {
        var eles = $textarea.val().split(/\D+/i);
        for (var i in eles) {
            bstTree.add(parseInt(eles[i].trim()));
        }
        display();
    });

    $bstInput.find('.remove').click(function () {
        if (!bstTree.getRoot()) return;

        if (bstTree === MJ.Demo.binaryHeap) {
            bstTree.remove();
        } else {
            var eles = $textarea.val().split(/\D+/i);
            for (var i in eles) {
                bstTree.remove(parseInt(eles[i].trim()));
            }
        }
        display();
    });

    $bstInput.find('.clear').click(function () {
        if (!bstTree.getRoot()) return;

        bstTree.clear();
        display();
    });

    return $bstInput;
}

function clone(sel) {
    return $('#modules').find(sel).clone(true);
}