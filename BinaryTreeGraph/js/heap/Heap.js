/**
 * Created by MJ Lee on 2019/4/26.
 */
Ext.define('MJ.Heap', {
    config: {
        comparator: null,
        maxHeap: true
    },
    clear: function () {
        this.size = 0;
    },
    add: function (element) {

    },
    get: function () {

    },
    remove: function () {

    },
    _compare: function (element1, element2) {
        // Comparator
        if (this.comparator) {
            if (this.maxHeap) {
                return this.comparator.compare(element1, element2);
            } else {
                return this.comparator.compare(element2, element1);
            }
        }

        // Comparable
        if (this.maxHeap) {
            return MJ.Comparator.compare(element1, element2);
        } else {
            return MJ.Comparator.compare(element2, element1);
        }
    }
});