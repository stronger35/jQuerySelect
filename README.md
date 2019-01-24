# 基于jQuery的轻量级下拉框插件，支持下拉可选项固定或动态，可绑定选中值函数。
# div设置class="select"，需要默认值值添加属性data-default
# 调用initSelect(jQueryObj, isFixed, jsonArray, func)渲染下拉框组件。
# 	第一个参数为下拉框div的jQuery对象
# 	第二个参数为可选项是否固定数据，固定数据传true，动态数据传false
# 	第三个参数为动态可选项数据json数组，固定数据时传null，格式：[{"value":"1","text":"可选值1"},{"value":"2","text":"可选值2"}]
#       第四个参数为修改选中值的回调函数
# 
# 使用setSelectedValue(jQueryObj, value)设置value值
# 使用getSelectedValue(jQueryObj)获取选中的value值
# 使用getSelectedText(jQueryObj)获取选中的text
# 其他可见demo，select.js为源码，使用时引入select.min.js.