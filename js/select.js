/**
 * 初始化下拉框
 * @param $select   下拉框div元素jquery对象
 * @param isFixed   可选项是否固定数据
 * @param valuesArr 动态可选项数据json数组，格式：[{"value":"1","text":"可选值1"},{"value":"2","text":"可选值2"}]
 * @param func      修改选中值的回调函数
 */
function initSelect($select, isFixed, valuesArr, func) {
    if (typeof isFixed === 'boolean' && isFixed) {//可选项固定数据
        var width = $select.width();
        $select.find('ul').width(width + 20);
        setSelectOptionsLocation($select);
        selectBindData($select);
    } else {
        generateSelectOption($select, valuesArr);
    }

    //初始化次数，多次绑定事件会有异常情况
    var times = $select.attr('data-times') || 0;
    if (times === 0) {
        bindEvents($select, func);
    }
    $select.attr('data-times', ++times);
}

//绑定事件
function bindEvents($select, func) {
    $select.on('click', '.checkspan', function() {
        var ul = $(this).siblings('ul');
        if (ul.is(':hidden')) {
            ul.slideDown(400, function () {
                ul.mouseleave(function () {
                    ul.slideUp();
                });
            });
        } else {
            ul.slideUp(400);
        }
    });

    $select.mouseleave(function () {
        var ul = $(this).children('ul');
        ul.slideUp();
    });

    $select.on('click', 'li', function () {
        var $this = $(this);
        var selectText = $this.text();
        var selectValue = $this.attr('data-value');

        var isSetSuccess = setSelectedValue($select, selectValue);

        if (func != null && isSetSuccess) {
            func();
        }

        $this.parent().slideUp(400);
    });

    //右侧倒三角点击事件
    $select.on('click', 'i', function() {
        $(this).next().trigger('click');
    });
}

//加载可选项
function generateSelectOption($select, valuesArr) {
    var defaultText = $select.attr('data-fault');
    var width = $select.width();
    var selectChidren = '<i></i><span class="checkspan" data-value="">' + (defaultText || '') + '</span><ul style="width:' + (width + 20) + 'px;">';
    var dataObj = {};
    if (defaultText != undefined && defaultText != null) {
        selectChidren += '<li data-value="">' + defaultText + '</li>';
        dataObj[""] = defaultText;
    }

    if (valuesArr && valuesArr.length > 0) {
        for (var i = 0; i < valuesArr.length; i++) {
            var value = valuesArr[i].value;
            var text = valuesArr[i].text;
            selectChidren += '<li data-value="' + value + '">' + text + '</li>';
            dataObj[value] = text;
        }
    }
    selectChidren += '</ul>';
    $select.html(selectChidren);
    $select.data(dataObj);

    setSelectOptionsLocation($select);
}

//可选项固定数据，给下拉框绑定可选项值
function selectBindData($select) {
    var dataObj = {};
    var $li = $select.find('li');
    if ($li.length > 0) {
        for (var i = 0; i < $li.length; i++) {
            var value = $li.eq(i).attr('data-value');
            var text = $li.eq(i).text();
            dataObj[value] = text;
        }
    }
    $select.data(dataObj);
}

//设置可选项显示在选择框上面或下面
function setSelectOptionsLocation($select) {
    var windowH = $(window).height();
    var selectH = $select.height();
    var ulH = $select.find('ul').height();
    if ($select.offset().top + selectH + ulH > windowH) {
        $select.addClass('select-upon');
    } else {
        $select.addClass('select-down');
    }
}

function setSelectedValueAndText($select, valueObj) {
    var $checkspan = $select.find('.checkspan');
    $checkspan.attr('data-value', valueObj.value);
    $checkspan.text(valueObj.text);
}

function getSelectedValueAndText($select) {
    var $checkspan = $select.find('.checkspan');
    var valueObj = {
      "value" : $checkspan.attr('data-value'),
      "text" : $checkspan.text()
    };
    return valueObj;
}

/**
 * 获取选中的value值
 * @param $select
 * @returns {*}
 */
function getSelectedValue($select) {
    return getSelectedValueAndText($select).value;
}

/**
 * 获取选中的text
 * @param $select
 * @returns {*}
 */
function getSelectedText($select) {
    return getSelectedValueAndText($select).text;
}

/**
 * 设置select的value值
 * @param $select
 * @param value
 * @returns {boolean} 当value为undefined、null，可选项不存在该value，或选中值和原值一样时返回false，设置成功返回true
 */
function setSelectedValue($select, value) {
    if (value == undefined || value == null) {
        return false;
    }

    var data = $select.data();
    var text = data[value];
    if (text == undefined || text == null) {
        return false;
    }

    var valueObjOld = getSelectedValueAndText($select);//原值
    if (valueObjOld.value == value) {
        return false;
    }

    var valueObj = {
        "value" : value,
        "text" : text
    };
    setSelectedValueAndText($select, valueObj);
    return true;
}



