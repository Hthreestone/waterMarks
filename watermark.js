function waterMark(markElement) {
	var WaterPrint = function(setting, $dom) {
		var DEFAULTS = {
			text : getLoginWaterMsg,
			//			text : '',
			fontsize : '15px', //水印字体大小
			font : 'Times New Roman	', //水印字体
			_rows : 20, //水印行数
			_cols : 20, //水印列数
			_x : 0, //水印起始位置x轴坐标
			_y : 0, //水印起始位置Y轴坐标
			//			_x_space : 2, //水印x轴间隔
			_x_space : 0, //水印x轴间隔
			//			_y_space : 20, //水印y轴间隔
			_y_space : 0, //水印y轴间隔
			_color : '#aaa', //水印字体颜色
			_alpha : 0.4, //水印透明度
			//			_width : 260, //水印宽度
			//			_height : 20, //水印长度
			_width : 370, //水印宽度
			_height : 75, //水印长度
			_angle : 15,
			_datalength : 20,
			_size : 0,
			_waterBgColor : 'rgb(247,248,248)',
			_waterUrls : jq.outWaterMarkersURlS()
		//水印倾斜度数
		}

		//采用配置项替换默认值，作用类似jquery.extend
		if (arguments.length > 1 && typeof arguments[0] === "object") {
			var src = arguments[0] || {};
			//			$.extend(this.DEFAULTS, src);
			for (key in src) {
				if (src[key] && DEFAULTS[key] && src[key] === DEFAULTS[key]) {
					continue;
				} else {
					DEFAULTS[key] = src[key];
				}
			}

		}
		
		if($dom.selector == "#waterPanel" || $dom.selector =="#openPhoto"){
			DEFAULTS._y = 23;
		}
		if($dom.selector == "#imgWater"){
			DEFAULTS._x = -63;
		}
		var oTemp = document.createDocumentFragment();

		//获取页面最大宽度
		var page_width = Math.max($dom[0].scrollWidth, $dom[0].clientWidth);
//		var cutWidth = page_width * 0.0150;
		var cutWidth = page_width * 0.0350;
		var page_width = page_width - cutWidth;

		//获取页面最大高度
		//		var page_height = Math.max($dom[0].scrollHeight, $dom[0].clientHeight)*2-(Math.max($dom[0].scrollHeight, $dom[0].clientHeight)/4);	    //整体高度
		var page_height = Math.max($dom[0].scrollHeight, $dom[0].clientHeight); //整体高度
		//		var page_height = 0;
		//		if(DEFAULTS._size>=DEFAULTS._datalength){
		//			if(DEFAULTS._datalength <=3){
		//				page_height = 25*2;	   							 //整体高度
		//			}else{
		//				page_height = 25*(DEFAULTS._datalength-1);	   					 //整体高度
		//			}
		//		}else if(DEFAULTS._size == 0){
		//			page_height = Math.max($dom[0].scrollHeight, $dom[0].clientHeight)*2;
		////			if(page_height = 0){
		////				page_height = 200;
		////			}
		//		}else{
		//			if(DEFAULTS._size <= 3){
		//				page_height = 25*2;	   					 //整体高度
		//			}else{
		//				page_height = 25*(DEFAULTS._size-1);	    //整体高度
		//			}
		//		}

		//如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
//		if (DEFAULTS._cols == 0
//			|| (parseInt(DEFAULTS._x + DEFAULTS._width * DEFAULTS._cols
//				+ DEFAULTS._x_space * (DEFAULTS._cols - 1)) > page_width)) {
//			DEFAULTS._cols = parseInt((page_width - DEFAULTS._x + DEFAULTS._x_space)
//				/ (DEFAULTS._width + DEFAULTS._x_space));
//			DEFAULTS._x_space = parseInt((page_width - DEFAULTS._x - DEFAULTS._width
//				* DEFAULTS._cols)
//				/ (DEFAULTS._cols));
////			/ (DEFAULTS._cols-1));
//		}
		
			DEFAULTS._cols = parseInt((page_width)
					/ (300));
			DEFAULTS._x_space = parseInt((page_width - DEFAULTS._x - DEFAULTS._width
					* DEFAULTS._cols)
					/ (DEFAULTS._cols));
			if($dom.selector == ".x-grid3-scroller"){
				DEFAULTS._x = -60;
			}
			if($dom.selector == "#auidtHistoryGird .x-grid3-scroller"){
				DEFAULTS._x = -30;
			}
			if($dom.selector == "#auidtHistoryGirdNew .x-grid3-scroller"){
				DEFAULTS._x = -30;
			}
		//如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
		/*		if (DEFAULTS._rows == 0 || (parseInt(DEFAULTS._y + DEFAULTS._height * DEFAULTS._rows
								+ DEFAULTS._y_space * (DEFAULTS._rows - 1)) > page_height)) {
					DEFAULTS._rows = parseInt((DEFAULTS._y_space + page_height - DEFAULTS._y)
							/ (DEFAULTS._height + DEFAULTS._y_space));
		*/
		if (DEFAULTS._rows != 0) {
			DEFAULTS._rows = Math.ceil((DEFAULTS._y_space + page_height - DEFAULTS._y)
				/ (DEFAULTS._height + DEFAULTS._y_space));
			DEFAULTS._y_space = parseInt(((page_height - DEFAULTS._y) - DEFAULTS._height
				* DEFAULTS._rows)
				/ (DEFAULTS._rows));
//			/ (DEFAULTS._rows - 1));
		}

		if (DEFAULTS._rows == 0 || DEFAULTS._cols == 0) {
			DEFAULTS._rows = 2;
			DEFAULTS._cols = 1;
			DEFAULTS._x = -30;
			DEFAULTS._width = 370;
			DEFAULTS._y_space = 15;
			DEFAULTS._x_space = 5;
			DEFAULTS._y = -3;
		}
		if (isNaN(DEFAULTS._y_space) || isNaN(DEFAULTS._x_space)) {
			DEFAULTS._cols = 2;
			DEFAULTS._rows = 1;
			DEFAULTS._width = 370;
			DEFAULTS._y_space = 15;
			DEFAULTS._x = -30;
			DEFAULTS._x_space = 5;
			DEFAULTS._y = -3;
		}

		var x;
		var y;
		var waterRows;
		var waterMUrl = DEFAULTS._waterUrls; //图片地址
		if (DEFAULTS._rows == 1) {
			waterRows = 1;
		} else {
			waterRows = DEFAULTS._rows;
		}
		for (var i = 0; i < waterRows; i++) {
			y = DEFAULTS._y + (DEFAULTS._y_space + DEFAULTS._height) * i;
			for (var j = 0; j < DEFAULTS._cols; j++) {
				x = DEFAULTS._x + (DEFAULTS._width + DEFAULTS._x_space) * j;
//				x = 300*j;						行距问题
				var mask_div = document.createElement('div');
				mask_div.id = 'mask_div' + i + j;
				mask_div.className = 'mask_div';
				mask_div.style.visibility = "";
				mask_div.style.position = "absolute";
				mask_div.style.left = x + 'px';
				mask_div.style.top = y + 'px';
				mask_div.style.overflow = "hidden";
				mask_div.style.zIndex = "9999";
				mask_div.style.onselectstart = "return false";
				mask_div.style.backgroundImage = "url(" + waterMUrl + ")";
				mask_div.style.pointerEvents = 'none'; //pointer-events:none IE 下调整z-index层级就可以，在mainTemp页面
				mask_div.style.opacity = DEFAULTS._alpha;
				//mask_div.style.background = DEFAULTS._waterBgColor;					// **** 解决IE 下字体选择模糊 取背景色
				mask_div.style.fontSize = DEFAULTS.fontsize;
				mask_div.style.cursor = "default";
				mask_div.style.fontFamily = DEFAULTS.font;
				mask_div.style.color = DEFAULTS._color;
				mask_div.style.textAlign = "center";
				mask_div.style.width = DEFAULTS._width + 'px';
				mask_div.style.height = DEFAULTS._height + 'px';
				mask_div.style.display = "block";
				mask_div.style.disable = "disable";
				oTemp.appendChild(mask_div);
			}
			;
		}
		;
		$dom.append(oTemp);
	}

	jq.fn.waterPrint = function(settings) {
		return WaterPrint(settings, jq(this));
	}

}

//function getUrlsW(){
//	
//	
//	
//	
//	
//}

/*for (var i = 0; i < waterRows; i++) {
	y = DEFAULTS._y + (DEFAULTS._y_space + DEFAULTS._height) * i;
	for (var j = 0; j < DEFAULTS._cols; j++) {
		x = DEFAULTS._x + (DEFAULTS._width + DEFAULTS._x_space) * j;
		var mask_div = document.createElement('div');
		mask_div.id = 'mask_div' + i + j;
		mask_div.className = 'mask_div';
//		mask_div.innerHTML = DEFAULTS.text;
		//设置水印div倾斜显示
//		mask_div.style["-webkit-Transform"]  = "rotate(-" + DEFAULTS._angle
//				+ "deg)";
//		mask_div.style.MozTransform = "rotate(-" + DEFAULTS._angle
//				+ "deg)";
//		mask_div.style["-ms-transform"] = "rotate(-" + DEFAULTS._angle
//				+ "deg)";
//		mask_div.style.OTransform = "rotate(-" + DEFAULTS._angle
//				+ "deg)";
//		mask_div.style.transform = "rotate(-" + DEFAULTS._angle
//				+ "deg)";
		mask_div.style.visibility = "";
		mask_div.style.position = "absolute";
		mask_div.style.left = x + 'px';
		mask_div.style.top = y + 'px';
		mask_div.style.overflow = "hidden";
		mask_div.style.zIndex = "9999";
//		mask_div.style.visiblePainted = "9999";
		mask_div.style.onselectstart="return false";
//		mask_div.style["background-image"]="url("+dasdsad+")";
		mask_div.style.backgroundImage = "url("+waterMUrl+")";
		mask_div.style.pointerEvents = 'none';	//pointer-events:none IE 下调整z-index层级就可以，在mainTemp页面
//		mask_div.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11=0.9702957262759964, M12=0.24192189559966823, M21=-0.24192189559966823, M22=0.9702957262759964, SizingMethod='auto expand') Alpha(opacity=40) inherit;";
//		mask_div.style["-ms-filter"] = "progid:DXImageTransform.Microsoft.Matrix(M11=0.9702957262759964, M12=0.24192189559966823, M21=-0.24192189559966823, M22=0.9702957262759964, SizingMethod='auto expand') Alpha(opacity=40) inherit;";
		mask_div.style.opacity = DEFAULTS._alpha;
//		mask_div.style.background = DEFAULTS._waterBgColor;					// **** 解决IE 下字体选择模糊 取背景色
		mask_div.style.fontSize = DEFAULTS.fontsize;
		mask_div.style.cursor = "default";
		mask_div.style.fontFamily = DEFAULTS.font;
		mask_div.style.color = DEFAULTS._color;
		mask_div.style.textAlign = "center";
		mask_div.style.width = DEFAULTS._width + 'px';
		mask_div.style.height = DEFAULTS._height + 'px';
		mask_div.style.display = "block";
		mask_div.style.disable = "disable";
		oTemp.appendChild(mask_div);
	};
};*/