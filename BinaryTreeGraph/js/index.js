/**
 * Created by MJ Lee on 2019/4/6.
 */

Ext.define('MJ.Demo', {
    statics: {
        randomMaxCount: 20,
        randomMaxValue: 100,
        bstTree: new MJ.BinarySearchTree(),
        btTree: new MJ.BinaryTree(),
        SHOW_BST: '1',
        SHOW_BT: '0'
    }
});

$(function () {
    $('#paper')
        .css('left', '390px')
        .css('top', '10px');

    $('#elbow').click(display);
    
    $('#line').click(display);

    $('#common .type select').change(function () {
        if ($(this).val() === MJ.Demo.SHOW_BT) {
            $('#bt').show();
            $('#bst').hide();
        } else {
            $('#bst').show();
            $('#bt').hide();
        }

        display();
    });

    initBst();
    initBt();
});

function display() {
    var showBst = $('#common .type select').val() === MJ.Demo.SHOW_BST;

    var linkType = MJ.Graph.LINK_TYPE_ELBOW;
    if ($('#line').is(':checked')) {
        linkType = MJ.Graph.LINK_TYPE_LINE;
    }
    new MJ.Graph({
        tree: showBst ? MJ.Demo.bstTree : MJ.Demo.btTree,
        linkType: linkType
    }).display();

    if (showBst) {
        $('#bst h2').text('二叉搜索树（节点数：' + MJ.Demo.bstTree.size + '）');
    } else {
        $('#bt h2').text('二叉树（节点数：' + MJ.Demo.btTree.size + '）');
    }
}

function initBst() {
    var $bst = $('#bst');
    var $textarea = $bst.find('.data');

    $bst.find('.show').click(function () {
        var eles = $textarea.val().split(/\D+/i);
        MJ.Demo.bstTree.clear();
        for (var i in eles) {
            MJ.Demo.bstTree.add(parseInt(eles[i].trim()));
        }
        display();
    });

    $bst.find('.random').click(function () {
        var count = $bst.find('.max-count').val();
        if (Ext.isNumeric(count)) {
            count = parseInt(count);
        } else {
            count = MJ.Demo.randomMaxCount;
        }
        var value = $bst.find('.max-value').val();
        if (Ext.isNumeric(value)) {
            value = parseInt(value);
        } else {
            value = MJ.Demo.randomMaxValue;
        }

        count = 1 + Math.floor(Math.random()*count);
        var text = '';
        for (var i = 0; i < count; i++) {
            if (i !== 0) {
                text += ',';
            }
            text += 1 + Math.floor(Math.random()*value);
        }
        $textarea.val(text);
    });

    $bst.find('.add').click(function () {
        var eles = $textarea.val().split(/\D+/i);
        for (var i in eles) {
            MJ.Demo.bstTree.add(parseInt(eles[i].trim()));
        }
        display();
    });

    $bst.find('.remove').click(function () {
        var eles = $textarea.val().split(/\D+/i);
        for (var i in eles) {
            MJ.Demo.bstTree.remove(parseInt(eles[i].trim()));
        }
        display();
    });
}

function initBt() {
    var $bt = $('#bt');
    $bt.find('.add').click(function () {
        MJ.Demo.btTree.add(
            $bt.find('.node').val().trim(),
            $bt.find('.left').val().trim(),
            $bt.find('.right').val().trim()
        );
        display();
    });
    $bt.find('.remove').click(function () {
        MJ.Demo.btTree.remove($bt.find('.node').val());
        display();
    });
}

/**
 * example1
 */
function example1() {
    var bst = new MJ.BinarySearchTree();
    var count = Math.floor(1 + Math.random()*50);
    for (var i = 0; i < count; i++) {
        bst.add(Math.floor(Math.random()*1000))
    }
    var graph = new MJ.Graph({tree: bst});
    graph.display();
}

/**
 * example2
 */
function example2() {
    var graph = new MJ.Graph();
    graph.tree = {
        getRoot: function () {
            return "Life";
        },
        getLeft: function (node) {
            if (node === "Life") return "Animal";
            if (node === "Person") return "Man";
            if (node === "Animal") return "Cat";
            if (node === "Dog") return "Teddy";
            return null;
        },
        getRight: function (node) {
            if (node === "Life") return "Person";
            if (node === "Person") return "Woman";
            if (node === "Animal") return "Dog";
            if (node === "Dog") return "SingleDog";
            return null;
        },
        getString: function (node) {
            return node;
        }
    };
    graph.display();
}

Ext.define('MJ.Person', {
    config: {
        age: 0,
        name: null
    },
    constructor: function (cfg) {
        this.initConfig(cfg);
    },
    compareTo: function (other) {
        var result =  this.age - other.age;
        if (result === 0) {
            result = (this.name > other.name) ? 1 : (this.name < other.name ? -1 : 0);
        }
        return result;
    },
    toString: function () {
        return this.age + "_" + this.name;
    }
});

function _addPersons(bst) {
    bst.add(new MJ.Person({age: 14, name: 'Jake'}));
    bst.add(new MJ.Person({age: 10, name: 'Michael'}));
    bst.add(new MJ.Person({age: 17, name: 'Jim'}));
    bst.add(new MJ.Person({age: 24, name: 'Kate'}));
    bst.add(new MJ.Person({age: 25, name: 'Larry'}));
    bst.add(new MJ.Person({age: 28, name: 'Michael'}));
    bst.add(new MJ.Person({age: 16, name: 'Jackson'}));
    bst.add(new MJ.Person({age: 24, name: 'Angela'}));
    bst.add(new MJ.Person({age: 17, name: 'Rona'}));
    bst.add(new MJ.Person({age: 30, name: 'Jim'}));
}

/**
 * example3
 */
function example3() {
    var bst = new MJ.BinarySearchTree();
    _addPersons(bst);
    new MJ.Graph({tree: bst}).display();
}

/**
 * example4
 */
function example4() {
    var bst = new MJ.BinarySearchTree({
        comparator: {
            compare: function (obj1, obj2) {
                var result = (obj1.name > obj2.name) ? 1 : (obj1.name < obj2.name ? -1 : 0);
                if (result === 0) {
                    result =  obj1.age - obj2.age;
                }
                return result;
            }
        }
    });
    _addPersons(bst);

    var graph = new MJ.Graph();
    graph.tree = bst;
    graph.display();
}
