/**
 * Created by MJ Lee on 2019/4/6.
 */
$(function () {
    initHtml();
});

Ext.define('MJ.Demo', {
    statics: {
        randomMaxCount: 20,
        randomMaxValue: 100,
        graph: null,
        getTree: function () {
            if (MJ.Demo.graph) {
                return MJ.Demo.graph.tree;
            } else {
                var bst = new MJ.BinarySearchTree();
                MJ.Demo.graph = new MJ.Graph({tree: bst});
                return bst;
            }
        }
    }
});

function initHtml() {
    var $textarea = $('#controls textarea');
    var left = $textarea.offset().left + $textarea.width() + 20;
    $('#paper')
        .css('left', left + 'px')
        .css('top', '10px');

    $('#show').click(function () {
        var eles = $('#data').val().split(/\D+/i);
        var bst = MJ.Demo.getTree();
        bst.clear();
        for (var i in eles) {
            bst.add(parseInt(eles[i].trim()));
        }
        MJ.Demo.graph.display();
    });

    $('#random').click(function () {
        var count = $('#max-count').val();
        if (Ext.isNumeric(count)) {
            count = parseInt(count);
        } else {
            count = MJ.Demo.randomMaxCount;
        }
        var value = $('#max-value').val();
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
        MJ.log(count, value, text);
        $textarea.val(text);
    });

    $('#add').click(function () {
        var eles = $('#data').val().split(/\D+/i);
        var bst = MJ.Demo.getTree();
        for (var i in eles) {
            bst.add(parseInt(eles[i].trim()));
        }
        MJ.Demo.graph.display();
    });

    $('#remove').click(function () {
        var eles = $('#data').val().split(/\D+/i);
        var bst = MJ.Demo.getTree();
        for (var i in eles) {
            bst.remove(parseInt(eles[i].trim()));
        }
        MJ.Demo.graph.display();
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

    paper = graph.paper;
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
