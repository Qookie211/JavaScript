/**
 *设置单击响应函数
 * @param  {[String]} objStr [ 要设置单击响应事件的元素的id ]
 * @param  {[function]} fun  [ 单击后响应的行为 ]
 * @return {[none]}
 */
function myClick(objStr, fun) {
    var obj = document.getElementById(objStr);
    obj.onclick = fun;
}// 获取全选/全不选选项
var checkOrCancelAll = document.getElementById("checkOrCancelAll");

// 全选/全不选
myClick("checkOrCancelAll", function() {
        if(this.checked){
        for (var i = 0; i < hobbies.length; i++) {
            hobbies[i].checked = true;
        }
        }else{
        for (var i = 0; i < hobbies.length; i++) {
            hobbies[i].checked = false;
        }
        }
});// 全选
myClick("checkAll", function() {
    for (var i = 0; i < hobbies.length; i++) {
        hobbies[i].checked = true;
    }
    checkOrCancelAll.checked = true;
});

// 复位
myClick("reset", function() {
    for (var i = 0; i < hobbies.length; i++) {
        hobbies[i].checked = false;
    }
    checkOrCancelAll.checked = false;
});// 反选
myClick("invert", function() {
    checkOrCancelAll.checked = true;
    for (var i = 0; i < hobbies.length; i++) {

        if (hobbies[i].checked) {
            hobbies[i].checked = false;
            checkOrCancelAll.checked = false;
        } else {
            hobbies[i].checked = true;
        }
    }
});