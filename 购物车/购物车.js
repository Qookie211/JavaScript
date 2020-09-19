   window.onload = function() {
    	var tB = document.getElementById("tb");
    	//从localstroage中取出保存的购物车信息
    	if(window.localStorage) {
    		var shoppingInfoText = localStorage.getItem("shoppingInfo");
    		if(shoppingInfoText != null) {
    			//将本地存储加入购物车列表。
    			var shoppingInfoObject = JSON.parse(shoppingInfoText);
    			for(var i = 0; i < shoppingInfoObject.length; i++) {
    				var tr = tB.insertRow(1); //向表格添加一行，位置在第一行
    				tr.align = "center";
    				var td1 = tr.insertCell(tr.cells.length);
    				td1.innerHTML = "<input type='checkbox' οnclick='total()' name='isCheckbox' />";
    				var td2 = tr.insertCell(tr.cells.length);
    				td2.innerHTML = "<img src='" + shoppingInfoObject[i].imgPath + "' height='30px' />";
    				var td3 = tr.insertCell(tr.cells.length);
    				td3.innerHTML = shoppingInfoObject[i].goodName;
    				var td4 = tr.insertCell(tr.cells.length);
    				td4.innerHTML = shoppingInfoObject[i].goodPrice;
    				var td5 = tr.insertCell(tr.cells.length);
    				var td5HTML = "<input class='number-bt' type='button' value='-'οnclick='subtractA(this.parentNode),total()'>";
    				td5HTML += "<span class='number'>" + shoppingInfoObject[i].num + "</span>";
    				td5HTML += "<input class='number-bt' type='button' value='+' id='addNum' οnclick='addA(this.parentNode),total()'/>";
    				td5.innerHTML = "<span class='goodNumber'>" + td5HTML + "</span>";
    				var td6 = tr.insertCell(tr.cells.length);
    				td6.innerHTML = "<button οnclick='deleteAShop(this.parentNode.parentNode)'>删除</button>"
    				tb.rows[0].cells[0].children[0].checked = false; //新增后‘全选’为false
    			}
    			total();
    		}
    	}
    	tb.rows[0].cells[0].children[0].checked = false; //‘全选’默认为false
    	//加载事件中获取列表的所有li标签
    	var getLi = document.querySelectorAll("#ul li");
    	for(var i = 0; i < getLi.length; i++) {
    		getLi[i].onclick = function() {
    			var imgPath = this.children[0].getAttribute("src");
    			var goodName = this.children[1].innerHTML;
    			var goodPrice = this.children[2].innerHTML;
    			var isExist = false;
    			for(var i = 1; i < tb.rows.length - 1; i++) {
    				if(tb.rows[i].cells[2].innerHTML == goodName) {
    					//检查商品是否已在购物车，存在则叠加
    					var carExistNum = parseInt(tb.rows[i].cells[4].children[0].children[1].innerHTML);
    					tb.rows[i].cells[4].children[0].children[1].innerHTML = carExistNum + 1;
    					isExist = true;
    					if(window.localStorage) {
    						var shoppingInfoText = localStorage.getItem("shoppingInfo");
    						var shoppingInfoObject = JSON.parse(shoppingInfoText);
    						shoppingInfoObject[tb.rows.length - i - 2].num++;
    						localStorage.setItem("shoppingInfo", JSON.stringify(shoppingInfoObject));
    					}
    					break;
    				}
    				//				//自定选择，当全部选取
    				//				var isSelect1 = tb.rows[i].cells[0].children[0];
    				//					console.log(isSelect1[i]);
    				//				if(isSelect1.checked){
    				//					tb.rows[0].cells[0].children[0].checked = true;//全部‘全选’为true
    				//				}
    			}
    			if(isExist == false) {
    				var tr = tB.insertRow(1); //向表格添加一行，位置在第一行
    				tr.align = "center";
    				var td1 = tr.insertCell(tr.cells.length);
    				td1.innerHTML = "<input type='checkbox' οnclick='total()' name='isCheckbox' />";
    				var td2 = tr.insertCell(tr.cells.length);
    				td2.innerHTML = "<img src='" + imgPath + "' height='30px' />";
    				var td3 = tr.insertCell(tr.cells.length);
    				td3.innerHTML = goodName;
    				var td4 = tr.insertCell(tr.cells.length);
    				td4.innerHTML = goodPrice;
    				var td5 = tr.insertCell(tr.cells.length);
    				var td5HTML = "<input class='number-bt' type='button' value='-'οnclick='subtractA(this.parentNode),total()'>";
    				td5HTML += "<span class='number'>1</span>";
    				td5HTML += "<input class='number-bt' type='button' value='+' id='addNum' οnclick='addA(this.parentNode),total()'/>";
    				td5.innerHTML = "<span class='goodNumber'>" + td5HTML + "</span>";
    				var td6 = tr.insertCell(tr.cells.length);
    				td6.innerHTML = "<button οnclick='deleteAShop(this.parentNode.parentNode)'>删除</button>"
    				tb.rows[0].cells[0].children[0].checked = false; //新增后‘全选’为false

    				if(window.localStorage) {
    					var shoppingInfoText = localStorage.getItem("shoppingInfo");
    					var shoppingInfoObject = null;
    					if(shoppingInfoText == null) {
    						shoppingInfoObject = [];
    					} else {
    						shoppingInfoObject = JSON.parse(shoppingInfoText); //转数组
    					}
    					var goods = new Object();
    					goods.imgPath = imgPath;
    					goods.goodName = goodName;
    					goods.goodPrice = goodPrice;
    					goods.num = 1;
    					shoppingInfoObject.push(goods);
    					localStorage.setItem("shoppingInfo", JSON.stringify(shoppingInfoObject));
    				}
    			}
    			total(); //总计
    		}
    	}
    }
    //计算合计函数
    function total() {
    	var totalMoney = 0;
    	var totalNum = 0;
    	for(var i = 1; i < tb.rows.length - 1; i++) {
    		var box = tb.rows[i].cells[0].children[0];
    		if(box.checked) {
    			//获取出单价 转为浮点型
    			var price = parseFloat(tb.rows[i].cells[3].innerHTML.substring(1, ));
    			var num = parseFloat(tb.rows[i].cells[4].children[0].children[1].innerHTML);
    			totalMoney += price * num;
    			totalNum += num;
    		}
    	}
    	document.getElementById("pay").value = "结算(" + totalNum + ")";
    	document.getElementById("totalSpan").innerHTML = totalMoney;
    }
    //全选功能函数
    function allSelect(isSelect) {
    	for(var i = 1; i < tb.rows.length - 1; i++) {
    		if(isSelect) {
    			tb.rows[i].cells[0].children[0].checked = true;
    		} else {
    			tb.rows[i].cells[0].children[0].checked = false;
    		}
    	}
    }
    //删除全选功能函数
    function deletAllSelect() {
    	var boxes = document.getElementsByName("isCheckbox");
    	for(i = 0; i < boxes.length; i++) {
    		if(boxes[i].checked) {
    			tr = boxes[i].parentNode.parentNode;
    			tr.parentNode.removeChild(tr);
    			if(window.localStorage) {
    				var shoppingInfoText = localStorage.getItem("shoppingInfo");
    				var shoppingInfoObject = JSON.parse(shoppingInfoText);
    				shoppingInfoObject.splice(i - 1, 1);
    				//删除完存储
    				localStorage.setItem("shoppingInfo", JSON.stringify(shoppingInfoObject));
    			}
    			i--;
    		}
    	}
    	document.getElementById("pay").value = "结算(0)";
    	document.getElementById("totalSpan").innerHTML = 0;
    	tb.rows[0].cells[0].children[0].checked = false;
    }
    //删除一个功能函数
    function deleteAShop(isShop) {
    	var indexTr = isShop.rowIndex;
    	isShop.parentNode.removeChild(isShop);
    	if(window.localStorage) {
    		var shoppingInfoText = localStorage.getItem("shoppingInfo");
    		var shoppingInfoObject = JSON.parse(shoppingInfoText);
    		shoppingInfoObject.splice(tb.rows.length - indexTr-1, 1);
    		localStorage.setItem("shoppingInfo", JSON.stringify(shoppingInfoObject));
    	}
    	total();
    }
    //加一操作
    function addA(a) {
    	var num = parseInt(a.children[1].innerHTML);
    	a.children[1].innerHTML = num + 1;
    	var index = a.parentNode.parentNode.rowIndex;
    		if(window.localStorage) {
    			var shoppingInfoText = localStorage.getItem("shoppingInfo");
    			var shoppingInfoObject = JSON.parse(shoppingInfoText);
    			shoppingInfoObject[tb.rows.length - index - 2].num++;
    			localStorage.setItem("shoppingInfo", JSON.stringify(shoppingInfoObject));
    		}
    }
    //减一操作
    function subtractA(a) {
    	var num = parseInt(a.children[1].innerHTML);
    	if(num > 1) {
    		a.children[1].innerHTML = num - 1;
    		var index = a.parentNode.parentNode.rowIndex;
    		if(window.localStorage) {
    			var shoppingInfoText = localStorage.getItem("shoppingInfo");
    			var shoppingInfoObject = JSON.parse(shoppingInfoText);
    			shoppingInfoObject[tb.rows.length - index - 2].num--;
    			localStorage.setItem("shoppingInfo", JSON.stringify(shoppingInfoObject));
    		}
    	}
    }