/**
 * Created by MJ Lee on 2019/4/7.
 */
Ext.define('MJ', {
    statics: {
        log: function () {
            var s = "";
            for (var i = 0; i < arguments.length; i++) {
                if (i !== 0) {
                    s += ', '
                }
                s += arguments[i];
            }
            console.log(s);
        },
        textSize: function(fontSize, fontFamily, text){
            var $span = $('<span>');
            $span.css('font-size', fontSize);
            $span.css('font-family', fontFamily);
            $span.css('display', 'inline-block');
            $span.css('visibility', 'hidden');
            $span.text(text);
            $(document.body).append($span);
            var result = {
                width: $span.width(),
                height: $span.height()
            };
            $span.remove();
            return result;
        }
    }
});

/*-----------------------------------------------------------------*/

Ext.define('MJ.Comparable', {
    compareTo: function (other) { }
});

/*-----------------------------------------------------------------*/

Ext.define('MJ.Comparator', {
    compare: function (obj1, obj2) { },
    statics: {
        compare: function (obj1, obj2) {
            if (Ext.isString(obj1) && Ext.isString(obj2)) {
                if (obj1 > obj2) return 1;
                if (obj1 < obj2) return -1;
                return 0;
            }

            if (Ext.isNumeric(obj1) && Ext.isNumeric(obj2)) {
                return parseFloat(obj1) - parseFloat(obj2);
            }

            // Comparable
            return obj1.compareTo(obj2);
        }
    }
});

/*-----------------------------------------------------------------*/