/********************************************************************************
 *
 *      文件名： basic.js
 *
 *      作  用： 前台基本函数调用
 *
 ********************************************************************************/
var wssenutype = "wsspathtype";
//字符串加码
function encode(strIn)
{
	if(typeof(strIn) =="undefined")
		return "";
	
	strIn = strIn + ""; 
	
	var intLen  = strIn.length;
	var strOut  = "";	
	var strFlag = "";
	var strTemp;

	for(var i=0;i<intLen;i++)
	{
		strTemp=strIn.charCodeAt(i);

		if (strTemp>255 || strTemp<0){
			if (strFlag==""){
				strFlag="#";
				strOut=strOut+"[#"+fillLeftWithZero(strTemp.toString(16),4);
			}
			else if (strFlag=="~"){
				strFlag="#";
				strOut=strOut+"#"+fillLeftWithZero(strTemp.toString(16),4);
			}
			else if (strFlag=="#"){
				strOut=strOut+fillLeftWithZero(strTemp.toString(16),4);
			}
		}
		else{
			if (strTemp < 48 || (strTemp > 57 && strTemp < 65) || (strTemp > 90 && strTemp < 97) || strTemp > 122){
				if (strFlag==""){
					strFlag="~";
					strOut=strOut+"[~"+fillLeftWithZero(strTemp.toString(16),2);
				}
				else if (strFlag=="#"){
					strFlag="~";
					strOut=strOut+"~"+fillLeftWithZero(strTemp.toString(16),2);
				}
				else if (strFlag=="~"){
					strOut=strOut+fillLeftWithZero(strTemp.toString(16),2);
				}
			}
			else{
				if (strFlag=="#" || strFlag=="~"){
					strFlag="";
					strOut=strOut+"]"+strIn.charAt(i);
				}
				else{
					strOut=strOut+strIn.charAt(i);
				}
			}
		}
	}
	
	return (strOut);
}

//字符串解码
function decode(strIn)
{
	if(typeof(strIn) =="undefined")
		return "";

	var intLen  = strIn.length;
	var strOut  = "";	
	var strFlag = "";
	var strTemp;

	for(var i=0;i<intLen;i++)
	{
		strTemp=strIn.charAt(i);

		if (strTemp=="["){
			i++;
			strTemp=strIn.charAt(i);
		}
		if (strTemp=="]"){
			strFlag="";
			continue;
		}
		if (strTemp=="~"){
			i++;
			strFlag="~";
		}
		if (strTemp=="#"){
			i++;
			strFlag="#";
		}
		switch (strFlag){
			case "~":{
				strTemp=strIn.substring(i,i+2);
				strTemp=parseInt(strTemp,16);
				strTemp=String.fromCharCode(strTemp);
				strOut=strOut+strTemp;
				i++;
				break;
			}
			case "#":{
				strTemp=strIn.substring(i,i+4);
				if (strTemp.toUpperCase()=="FFFF"){
					i+=4;
					strTemp=strIn.substring(i,i+4);
				}
				strTemp=parseInt(strTemp,16);
				strTemp=String.fromCharCode(strTemp);
				strOut=strOut+strTemp;
				i+=3;
				break;
			}
			case "":{
				strOut=strOut+strTemp;
				break;
			}
		}
	}
	return (strOut);
}

//根据长度右边添加0
function fillLeftWithZero(strIn, outLen){
	if (typeof(strIn)!="string") return strIn;

	for (var i=strIn.length;i<outLen;i++)
		strIn="0"+strIn;

	return strIn;
}

//去掉左边控格
function LTrim(str){
	if ((typeof(str) != "string") || !str) return "";
	for(var i=0; i<str.length; i++){if (str.charCodeAt(i, 10)!=32) break;}
	return str.substring(i, str.length);
}

//去掉右边控格
function RTrim(str){ 
	if ((typeof(str) != "string") || !str) return "";
	for(var i=str.length-1; i>=0; i--){if (str.charCodeAt(i, 10)!=32) break;}
	return str.substr(0, i+1);
}

//去掉控格
function trimStr(str){
	if ((typeof(str) != "string") || !str) return "";
	return LTrim(RTrim(str));
}

//弹出提示
function $alert(mes,title,type)
{   
	if(title==undefined || title=="")
	{
		title = "提示";
	}
	if(type==undefined || type=="")
	{
		type ="warning";
	}
	$.messager.alert(title,mes,type);
}

//如果某个输入域为整数，那么过滤掉所有非数字字符
function onKeyPressInputInteger(evt)
{   
    if(typeof(evt)=="undefined")
    {
       var  evt  = getEvent(); 
        
    }else
    {
       var  evt  = evt?evt:window.event;
    }
    
 	var e   = evt.srcElement || evt.target; 	
 	var re  = new RegExp("^[1-9]*[1-9][0-9]*$");
 	var str = e.value;
 	if (str != "0" && !re.test(str)) {
        e.value = str.substr(0,str.length-1);
        e.focus();
    }
}

//如果某个输入域为实数，那么过滤掉所有非数字字符（包含小数点）
function onKeyPressInputFloat(evt)
{     
	 if(typeof(evt)=="undefined")
     {
       var  evt  = getEvent(); 
        
     }else
     {  
       var  evt  = evt?evt:window.event;
     }
	 
  	 var e   = evt.srcElement || evt.target;
  	 var str = e.value;
  	 if(trimStr(str) == "" || isNaN(str)){
  		e.value = str.substr(0,str.length-1);
	    e.focus();
	 }             
}


///输入正确的日期
function onKeyPressCalendar(evt)
{
	 if(typeof(evt)=="undefined")
     {
       var  evt  = getEvent(); 
        
     }else
     {
       var  evt  = evt?evt:window.event;
     }
  	
      var nKey = (evt.charCode) ? evt.charCode :((evt.which) ? evt.which : evt.keyCode); 

	if (nKey > 57 || (nKey != 45 && nKey < 48))
		return false;    
}

//比较两个时间段
function comparDate(Date1,Date2){

	var DateArr1= Date1.split("-");

	var DateArr2= Date2.split("-");

	if (DateArr1[0]/1 > DateArr2[0]/1)
		return true;
	else if (DateArr1[0]/1  < DateArr2[0]/1)
		return false;
	else {
		if (DateArr1[1]/1 > DateArr2[1]/1)
			return true;
		else if (DateArr1[1]/1 < DateArr2[1]/1)
			return false;
		else {
			if (DateArr1[2]/1 <= DateArr2[2]/1)
				return false;
			else
				return true;
		}
	}
}

//获取对象的TD
function getOwnerTD(element)
{
	while (element.tagName.toUpperCase() != "TD" && element.tagName.toUpperCase() != "TH")
	{
		element = element.parentNode;
		if (element == null)
			break;
	}

	return(element);
}


//获取对象TR
function getOwnerTR(element)
{
	try{
		while (element.tagName.toUpperCase() != "TR")//行 TD单元格 TH表头
		{
			element = element.parentNode;

			if (element == null)
				break;
		}

		return(element);
	}
	catch(e){
		return(element);
	}
}

//获取对象Table
function getOwnerTable(element)
{   
	while (element.tagName.toUpperCase() != "TABLE")//行 TD单元格 TH表头
	{    
		element = element.parentNode;

		if (element == null)
			break;
	}

	return(element);
}

//检查Input的内容不能为空
function checkInputNull(element)
{
	if (element.tagName.toUpperCase()=="SELECT")
	{
		if ($(element).val() =='')
		{
			if ($(element).attr("isNullTitle")!=undefined)
				alert($(element).attr("isNullTitle"));
			else if ($('label[for='+$(element).attr('id')+']').text()!=undefined)
				alert($('label[for='+$(element).attr('id')+']').text()+":选择值不能为空");
			else
			{   
			    if ($(element).attr("alertTitle")!=undefined)
				alert($(element).attr("alertTitle")+":选择值不能为空");
				else
				alert("在该项选择值不能为空");
            }
			return "false";

		}
		return "true";
	}

	var value = RTrim($(element).val());

	if (value.length == 0){
		element.focus();

		if ($(element).attr("isNullTitle")!=undefined)
			alert($(element).attr("isNullTitle"));
		else if ($('label[for='+$(element).attr('id')+']').text()!=undefined)
			alert($('label[for='+$(element).attr('id')+']').text()+":输入值不能为空");
		else
		{   
			if ($(element).attr("alertTitle")!=undefined)
		    alert($(element).attr("alertTitle")+":输入值不能为空");
			else
			alert("在该项输入值不能为空");
        }

		return "false";
	}
	return "true";
}

//检查Input的内容长度
function checkInputStrLength(element,StrLength){
	var value = RTrim($(element).val());

	if (value.length >StrLength*1 ){
		element.focus();
		if ($(element).attr("textLengthTitle")!=undefined)
			$alert($(element).attr("textLengthTitle"));
		else if ($('label[for='+$(element).attr('id')+']').text()!=undefined)
			$alert($('label[for='+$(element).attr('id')+']').text()+"：输入值的长度不能大于" + StrLength);
		else			
		{   
			if ($(element).attr("alertTitle")!=undefined)
		    $alert($(element).attr("alertTitle")+"：输入值的长度不能大于" + StrLength);
			else
			$alert("在该项输入值的长度不能大于" + StrLength);
        }

		return "false";
	}
	return "true";

}
//检查Input的内容Min长度
function checkInputStrMinLength(element,StrLength){
	var value = RTrim($(element).val());

	if (value.length < StrLength*1 ){
		element.focus();

		if ($(element).attr("minLengthTitle")!=undefined)
			$alert($(element).attr("minLengthTitle"));
		else if ($('label[for='+$(element).attr('id')+']').text()!=undefined)
			$alert($('label[for='+$(element).attr('id')+']').text()+"：输入值的长度不能小于" + StrLength);
		else
			$alert("在该项输入值的长度不能小于" + StrLength);

		return "false";
	}
	return "true";

}

//检查Input的int的长度
function checkInputIntLength(element,IntLength){

	var value = RTrim($(element).val());

	for (var j = 0; j<  value.length; j++){

		var ch = value.substr(j, 1);

		if (ch < "0" || ch > "9" ){
			element.focus();
			if ($('label[for='+$(element).attr('id')+']').text()!=undefined)
				$alert($('label[for='+$(element).attr('id')+']').text()+"：输入合法数字");
			else
				$alert("在该项输入合法数字");

			return "false";

		}

	}

	if (value.length > IntLength*1)
	{
		element.focus();
		if ($('label[for='+$(element).attr('id')+']').text()!=undefined)
			$alert($('label[for='+$(element).attr('id')+']').text()+"：输入的整数位数不能超过" + IntLength + "位");
		else
			$alert("在该项输入的整数位数不能超过" + IntLength + "位");

		return "false";

	}

	return "true";
}

//检查Input的Number的数值范围
function checkInputNumRange(element)
{
    var alertMess = "";
    if($('label[for='+$(element).attr('id')+']').text())
    {
		alertMess = $('label[for='+$(element).attr('id')+']').text();  
    }else
    {
      if($(element).attr("alertTitle"))
      {
        alertMess = $(element).attr("alertTitle");  
      }
    }
    if(alertMess!="")
    {
       alertMess = "【"+alertMess+"】 ";
    }
    
    if (element)
    {   
      if($(element).attr("numrange"))
      {
        var curnum   = $(element).val();
        var numrange = $(element).attr("numrange");
        
        if(trimStr(curnum)!="")
	    {
	      if (!numrange || numrange<=0 || numrange=="" || typeof(numrange)=="undefined" )
          {
            alert(alertMess+"请输入起始数值!");
		    return false;
          }
          
		  if(Number(curnum)<Number(numrange.split(",")[0]) || Number(curnum)>Number(numrange.split(",")[1]))
		  {
			alert(alertMess+"请输入"+numrange.split(",")[0]+"-"+numrange.split(",")[1]+"之间的数字！");
			$(element).focus();
			$(element).select();
			return false;
		  }
	    }
	  }
            
    }else
    {
     
         var event   = getEvent();
	     var el      = event.srcElement || event.target;
	     if(trimStr($(el).val())!="")
	     {
	       if($(el).attr("numrange"))
	       { 
	         if(Number($(el).val())<Number($(el).attr("numrange").split(",")[0]) || Number($(el).val()) >Number($(el).attr("numrange").split(",")[1]))
		     {
			   alert(alertMess+"请输入"+$(el).attr("numrange").split(",")[0]+"-"+$(el).attr("numrange").split(",")[1]+"之间的数字！");
			   $(el).val("");
	           return false;
		     }  
	       }else
	       {
	         alert(alertMess+"请输入起始数值!");
		     return false;
	       }
	     }
    }
   
	return true;
}

//检查Input的float型的整数和小数部分的长度
function checkInputfloatLength(element,IntLength,floatLength)
{
	var nPointIndex = -1;

	var value = RTrim($(element).val());

	for (var j = 0; j <  value.length; j++){

		var ch = value.substr(j, 1);

		if (ch < "0" || ch > "9" ){
			if (ch == "."){
				if (nPointIndex != -1){

					element.focus();
					if ($('label[for='+$(element).attr('id')+']').text()!=undefined)
						alert($('label[for='+$(element).attr('id')+']').text()+":输入的数字只能有一个小数点");
					else
						alert("在该项输入的数字只能有一个小数点");

					return "false";

				}else
					nPointIndex = j;
			}

		}

	}

	if (nPointIndex == -1)
		nPointIndex = value.length;

	if ((value.substring(0, nPointIndex) * 1).toString().length > IntLength*1)
	{
			element.focus();

			if ($('label[for='+$(element).attr('id')+']').text()!=undefined)
				alert($('label[for='+$(element).attr('id')+']').text()+":输入的整数位数不能超过" + IntLength + "位");
			else
				alert("在该项输入的整数位数不能超过" + IntLength + "位");

			return "false";


	}

	var strFrac = value.substring(nPointIndex + 1, value.length);

	if (strFrac.length > 0){

		if ( strFrac.length >floatLength*1 )
		{
			element.focus();

			if ($('label[for='+$(element).attr('id')+']').text()!=undefined)
				alert($('label[for='+$(element).attr('id')+']').text()+":输入的小数位数不能超过" + floatLength + "位");
			else
				alert("在该项输入的小数位数不能超过" + floatLength + "位");
			return "false";

		}

	}
	return "true";
}

//检查email输入信息
function  checkInputemail(element){
	var nPointIndex = -1;

	var value = RTrim($(element).val());

	if(value=="")
		return "true";

	for (var j = 0; j <  value.length; j++){

		var ch = value.substr(j, 1);

		if (ch == "@"){
			if (nPointIndex != -1){

				element.focus();
				if ($('label[for='+$(element).attr('id')+']').text()!=undefined)
					alert($('label[for='+$(element).attr('id')+']').text()+":输入的值只能有一个@");
				else
					alert("在该项输入的值只能有一个@");

				return "false";

			}else
				nPointIndex = j;
		}

	}

	if (nPointIndex == -1){

		element.focus();
		if ($('label[for='+$(element).attr('id')+']').text()!=undefined)
			alert($('label[for='+$(element).attr('id')+']').text()+":输入的值不存在@");
		else
			alert("在该项输入的值不存在@");

		return "false";
	}

	return "true";

}

//检查Input的输入内容
function checkInputValue(element)
{

	if ($(element).attr("isNull") !=undefined && $(element).attr("isNull").toLowerCase() =="false")
	{
		if (checkInputNull(element) =="false")
		{
			return "false";
		}
	}

	if($(element).attr("fieldType") !=undefined && $(element).attr("fieldType").toLowerCase()=="number"){

		if (($(element).attr("intLength") != undefined) && ($(element).attr("floatLength") != undefined))
			if (checkInputfloatLength(element,$(element).attr("intLength"),$(element).attr("floatLength"))=="false")
				return "false";

		if (($(element).attr("intLength") != undefined)&&($(element).attr("floatLength")== undefined))
			if (checkInputIntLength(element,$(element).attr("intLength"))=="false")
				return "false";
	 }
	
	if($(element).attr("fieldType") !=undefined && $(element).attr("fieldType").toLowerCase()=="int"){
		if ($(element).attr("intLength") != undefined)
			if (checkInputIntLength(element,$(element).attr("intLength"))=="false")
				return "false";
	}

	if($(element).attr("fieldType") !=undefined && $(element).attr("fieldType").toLowerCase()=="text"){

		if ( $(element).attr("textLength") != undefined )
			if (checkInputStrLength(element,$(element).attr("textLength"))=="false")
				return "false";

		if ($(element).attr("minLength") != undefined )
			if (checkInputStrMinLength(element,$(element).attr("minLength"))=="false")
				return "false";
		if ($(element).attr("eMail")!=undefined && $(element).attr("eMail").toLowerCase()=="true")
			if (checkInputemail(element)=="false")
				return "false";

	}
	return "true";
}

//检查所有类型小写Input的输入内容
function checkLowerCaseInputValue(element)
{
	if (($(element).attr("isNull") != undefined)&&($(element).attr("isNull").toLowerCase() =="false"))
	{
		if (checkInputNull(element) =="false")
		{
			return "false";
		}
	}

	if($(element).attr("isNull") != undefined && $(element).attr("fieldType").toLowerCase()=="number"){

		if (($(element).attr("intLength") != undefined)&&($(element).attr("floatLength") != undefined))
			if (checkInputfloatLength(element,$(element).attr("intLength"),$(element).attr("floatLength"))=="false")
				return "false";

		if (($(element).attr("intLength") != undefined)&&($(element).attr("floatLength") != undefined))
			if (checkInputIntLength(element,$(element).attr("intLength"))=="false")
				return "false";
	}

	if($(element).attr("isNull") != undefined && $(element).attr("fieldType").toLowerCase()=="text"){

		if ($(element).attr("textLength")!=undefined)
			if (checkInputStrLength(element,$(element).attr("textLength"))=="false")
				return "false";

		if ($(element).attr("minLength")!=undefined)
			if (checkInputStrMinLength(element,$(element).attr("minLength"))=="false")
				return "false";

		if (($(element).attr("eMail")!=undefined) && ($(element).attr("eMail").toLowerCase()=="true"))
			if (checkInputemail(element)=="false")
				return "false";

	}

	if($(element).attr("eMail")!=undefined && $(element).attr("fieldType")=="attr"){

		if (($(element).attr("isNull")!=undefined)&&($(element).attr("isNull").toLowerCase() =="false"))
		{
			if ($(element).attr("attr")!=undefined && $(element).attr("attr")=="")
			{
				element.focus();
				if ($('label[for='+$(element).attr('id')+']').text() != undefined)
					alert($('label[for='+$(element).attr('id')+']').text() +":选入正确的值");
				else
					alert("在该项选入正确的值");
				return "false";

			}
		}

	}

	return "true";
}

//检查FORM的输入内容
function checkForm(formEle){
    
    var formelement;
	if (typeof (formEle) == "string") {
		formelement = document.all[formEle];
	} else if (typeof (formEle) == "object") {
		formelement = formEle;
	}
	if (!formelement) {
		return;
	}
	
	for (var i=0; i< formelement.length; i++)
	{

		var element= formelement[i];
        
	    if (checkInputValue(element)=="false")
		   return "false";
	     
	    if(!checkInputNumRange(element))
	    {
	       return "false";
	    }
	}

	return "true";
}

//检查所有类型小写FORM的输入内容
function checkLowerCaseForm(formelement){

	for (var i=0; i< formelement.length; i++)
	{

		var element= formelement.item[i];

		if($(element).attr("fieldType") != undefined)
			if (checkLowerCaseInputValue(element)=="false")
				return "false";
	}

	return "true";
}

//获取绝对位置
function getAbsPosition(obj, offsetObj){
	var _offsetObj=(offsetObj)?offsetObj:document.body;
	var x=obj.offsetLeft;
	var y=obj.offsetTop;

	var tmpObj=obj.offsetParent;

	while ((tmpObj!=_offsetObj) && tmpObj){
		x+=tmpObj.offsetLeft+tmpObj.clientLeft-tmpObj.scrollLeft;
		y+=tmpObj.offsetTop+tmpObj.clientTop-tmpObj.scrollTop;
		if(isIE() )
		{
			tmpObj=tmpObj.offsetParent;
		}else{
			tmpObj=$(tmpObj).parent()[0];
		}	
	}
	return ([x, y]);
}

function getValidStr(str)
{
  str +="";
  if (typeof(str)=="undefined" || str=="null")
  {
    return "";
  }
  else
  {
    return str;
  }
}

function compareText(str1, str2)
{
  str1=getValidStr(str1);
  str2=getValidStr(str2);
  if (str1==str2)
  {
    return true;
  }
  if (str1=="" || str2=="")
  {
    return false;
  }
  return (str1.toLowerCase()==str2.toLowerCase());
}

function isTrue(value)
{
  return (value==true || (typeof(value)=="number" && value!=0) ||compareText(value, "true") || compareText(value, "T") ||compareText(value, "yes") || compareText(value, "on"));
}

function getInt(value)
{
	var result=parseInt(value);
	if (isNaN(result))
	{
		result=0;
	}
	return result;
}

function getFloat(value)
{
	var result=parseFloat(value);
	if (isNaN(result))
	{
		result=0;
	}
	return result;
}

//下拉级联
function  selectRefresh(selectId,refSql)
{
     if (document.getElementById(selectId)== null)
     	return;
 	 var cacheKey = $("#"+selectId).attr("cacheKey");
	 var xmlDoc   = createDomDocument("<reqStr/>");
     
	 var rootNode = xmlDoc.documentElement;

	 if(isIE())
	 {
		 $(rootNode).attr("type", "selChange");     
		 $(rootNode).attr("cacheKey", cacheKey);
		 $(rootNode).text(refSql);
	 }else{
		 $(xmlDoc).attr("type", "selChange");   
		 $(xmlDoc).attr("cacheKey", cacheKey);
		 $(xmlDoc).text(refSql);
	 }
	 
	 dataset = new DataSet();
     dataset.setactionName("st.platform.db.DropDown");
     dataset.setmethodName("doBusiness");
     dataset.addFieldValue("xx",encode(xmlToString(xmlDoc)));
     dataset.refreshByAction();
     
     var tmpHTML=window.retXML;
   
     var xmlDoc = createDomDocument(tmpHTML);

     var rootNode  = xmlDoc.documentElement;
     
     var obj = document.getElementById(selectId);

     for ( i= obj.options.length -1;i >-1; i--)
     {
          obj.options.remove(i);
     }
          
     if (window.postResult)
     {
		 var opt   = document.createElement("OPTION"); 
         opt.text  = "";
		 opt.value = "";
         obj.add(opt);
         
          for (var i=0; i< rootNode.childNodes.length; i++)
          {
             	var opt = document.createElement("OPTION");
             	var node =rootNode.childNodes[i];
				opt.text = node.getAttribute("text");
				opt.value = node.getAttribute("value");
                obj.add(opt);
          }
     }
}

//获取触发事件
function getEvent()
{
	if(document.all)	
	{
	
	 return window.event;//如果是ie
	
	}
	
	func=getEvent.caller;
	
	while(func!=null)
	
	{
	
	var arg0=func.arguments[0];
	
	if(arg0)
	
	{
	
	if((arg0.constructor==Event || arg0.constructor ==MouseEvent)
	
	||(typeof(arg0)=="object" && arg0.preventDefault && arg0.stopPropagation))
	
	{
	
	return arg0;
	
	}
	
	}
	
	func=func.caller;
	
	}
	
	return null;

}

//设置是否可以选择
function setSelectable(obj, enabled) 
{      
       if(enabled)
       {
         obj.removeAttr("unselectable");
         obj.removeAttr("onselectstart");
         obj.css("-moz-user-select", "");
         obj.css("-webkit-user-select", "");
	   }else
	   {	   
	     obj.attr("unselectable", "on");
         obj.attr("onselectstart", "return false;");
         obj.css("-moz-user-select", "none");
	     obj.css("-webkit-user-select", "none"); 
	   }
	    
}

//是否显示右键菜单
function setContextMenuable(enabled) 
{      
  try{
       $(document).bind("contextmenu",function(){return enabled;});
       if(!enabled)
       {
         $("body").attr("oncontextmenu","event.returnValue=false");
       }
	 }catch(e)
	 {       
	    document.oncontextmenu=new Function("event.returnValue=false;");
	 } 
}

//获取汉语简拼
function getSpell(words)
 {  
    var xmlDoc   = createDomDocument("<reqStr/>");
	
	if(isIE())
	{   	
		var rootNode = xmlDoc.documentElement;
		appendAttri(xmlDoc, rootNode, "type", "spell");		
	    $(rootNode).html(words);
		 
    }else{
    	 
    	appendAttri(xmlDoc, xmlDoc, "type", "spell");
    	appendAttri(xmlDoc, xmlDoc, "cityCode", window.cityCode);
    	$(xmlDoc).html(words);
    		
    }
 	
    var dataset = new DataSet();
    dataset.setactionName("st.platform.db.DropDown");
    dataset.setmethodName("doBusiness");
    dataset.addFieldValue("xx",encode(xmlToString(xmlDoc)));
    dataset.refreshByAction();
        
    var retStr   = window.retXML;
    var xmlDoc   = createDomDocument(retStr);
	var rootNode = xmlDoc.documentElement;
	
	if (rootNode == null)
	{
		return;
	}

	if(rootNode.getAttribute("exspell")=="1")
	alert("出现特殊字符请手写拼音!");
	if(rootNode.getAttribute("polych")=="1")
	alert("出现重音字请确认拼音!");
	return rootNode.getAttribute("spells");
 }

 //获取星期
 function getWeek(datestr)
 {  
    if(datestr=="") return;
    var weekstr = "";
    var dataset = new DataSet();
    dataset.setactionName("st.platform.db.DropDown");
    dataset.setmethodName("getWeekstr");
    dataset.addFieldValue("datestr",datestr);
    dataset.refreshByAction();
    weekstr = dataset.getFieldValue("weekstr");   
	return weekstr;
 }

//设置滚动条
function setScollbar()   
{ 
    if(isIE())
    {
      if(!window.ActiveXObject)
     {
       if($("body").height()<=window.dialogArguments.selfHeight)
       {
        $("body").css("overflow-y","hidden");    
       }else
       {
        $("body").css("overflow-y","auto");   
       }
    
       if($("body").width()<=window.dialogArguments.selfWidth)
       {
        $("body").css("overflow-x","hidden");     
       }else
       {
        $("body").css("overflow-x","auto");
       }
         
     }
        
   }
   
}

//打开模式窗口
function openModalDialog(url,width,height,arg,ext,retfunc) 
{      
    var returnValue;

    if (!width || width<=0 || width=="" || typeof(width)=="undefined" )
    {
        alert("请重新定义窗口宽度!");
		return;
    }
		
	if (!height || height<=0 || height=="" || typeof(height)=="undefined")
	{
	    alert("请重新定义窗口高度!");
		return;
	}
	
	 width = width.toString();
	 
	 if(width.toLowerCase().indexOf("px")<0)
     {
          width  = width+"px";
          
     }else
     {
          width = width.toLowerCase();
     }
     
     height = height.toString();
     
     if(height.toLowerCase().indexOf("px")<0)
     {
          height  = height+"px";
          
     }else
     {
          height = height.toLowerCase();
     }
    	
	var iTop  = (window.screen.availHeight - height.replace("px","")) / 2;
	var iLeft = (window.screen.availWidth - width.replace("px","")) / 2;
	
	if(iTop < 0)
	{
		iTop = 0;
	}
	if(iLeft < 0)
	{
		iLeft = 0;
	}
	if (!arg || arg=="")
	arg =  new Object();
	arg.selfHeight = height.replace("px","");
	arg.selfWidth  = width.replace("px","");
	
	if(typeof(ext)=="undefined" ||  ext=="")
	{ 
	   ext = "help:no;resizable:yes;status:no;center:yes;scroll:no";
	}
	
	var sFeatures = "dialogHeight:" + height + ";dialogWidth:" + width
			        + ";dialogLeft:"+iLeft+";dialogTop:"+iTop+";" + ext;
			        
	window.sid=window.parent.ssid;		        
    if(typeof(window.sid)!="undefined" && window.sid!="")
	{
	      if(url.indexOf("?")<0)
		  {
		    url +="?sid="+window.sid;
		  }else
		  {
		    url +="&sid="+window.sid;		    
		  }
	     
	}

    try 
    { 
	     returnValue = window.showModalDialog(url, arg, sFeatures);   
	     
    }catch(e)
    {     
         if(typeof(ext)=="undefined" || ext==undefined || typeof(ext)==undefined || ext=="")
	     { 
	       ext = "toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=no,status=no";
	     }
	     
	     window.params   = arg;
	     
         sFeatures = "height=" + height + ",width=" + width
			        + ",left="+iLeft+",top="+iTop+"," + ext;
	 		        	     
          window.open(url, 'newwindow', sFeatures); 
          returnValue = "";
    }
    
    if (typeof(returnValue) == undefined || returnValue == undefined) 
    {  
        returnValue = window.returnValue;  
    }
    
    if(returnValue!="" && returnValue!=undefined && typeof(returnValue)!="undefined" && returnValue)
    {
      if (retfunc && retfunc!=undefined && retfunc!="" && typeof(retfunc)!="undefined" )
      {   
        if (isfireuserEvent(retfunc)) 
	    {	     
		  fireUserEvent(retfunc,[returnValue]);
	    }
      }else
      {  
        if(isfireuserEvent("retDialogVal")) 
	    {
		  fireUserEvent("retDialogVal",[returnValue]);
	    }
      }
     
    }  
     		        
	return returnValue;

}

//子窗口获取父窗口传来的参数
function getParams()
{
   var params;
   
   try{
     
    params = window.dialogArguments;

    if (params == undefined || typeof(params) == undefined) 
    {   
        params = this.opener.params;  
    }  
     
   }catch(e)
   {
    params = this.opener.params;
     
   }
   
   return params;

}

//设置窗口返回值
function setDialogRetVal(retVal,isClose,retfunc) 
{     
      if(retVal==undefined || typeof(retVal)==undefined)
      {
         alert("返回值没有定义!");
         return false;     
      }
      
      if(typeof(window.dialogArguments)!=undefined && window.dialogArguments!=undefined)
      {  
         window.returnValue = retVal; 
 
      }else
      {  
         if(retfunc!=undefined && typeof(retfunc)!=undefined && retfunc!=null && retfunc!="")
         {    
             if(isfireuserEvent("window.opener."+retfunc))
             {
                fireUserEvent("window.opener."+retfunc,[retVal]);           
             }  

         }else
         {   
             if(isfireuserEvent("window.opener.retDialogVal"))
             {
                fireUserEvent("window.opener.retDialogVal",[retVal]);           
             } 
         }
         
      }
      
      if(isClose)
      {
        window.close();
      }

}

//打开图表
function showChart(charttype,classpath,winowwidth,windowheight,chartwidth,chartheight)
{   
    if(charttype==undefined ||  typeof(charttype)==undefined)
    {
      alert("图表类型未定义!");
      return;
    }
    
    if(classpath==undefined ||  typeof(classpath)==undefined || classpath=="")
    {
      alert("类路径为空或未定义!");
      return;
    }
    
     if(winowwidth==undefined ||  typeof(winowwidth)==undefined || winowwidth=="")
    {
      alert("窗口宽度为空或未定义!");
      return;
    }
    
     if(windowheight==undefined ||  typeof(windowheight)==undefined || windowheight=="")
    {
      alert("窗口高度为空或未定义!");
      return;
    }
    
    var spath  = "/system/manage/chart/chart.jsp?charttype="+charttype+"&chartclass="+classpath+"&chartwidth="+chartwidth+"&chartheight="+chartheight;
    var params = new Params(); 
    openModalDialog(spath,winowwidth,windowheight,params);    
}
//文件上传
function showUpload(fileclass,width,height,seqno,type,filelist,filedir)
{    
    if(fileclass==undefined ||  typeof(fileclass)==undefined || fileclass=="")
    {
       alert("类路径为空或未定义!");
       return;
    } 
    
    if(width==undefined ||  typeof(width)==undefined || width=="")
    {
        alert("窗口宽度为空或未定义!");
        return;
    } 
    
    if(height==undefined ||  typeof(height)==undefined || height=="")
    {
        alert("窗口高度为空或未定义!");
        return;
    } 
    
    if(seqno==undefined ||  typeof(seqno)==undefined || seqno=="")
    {
      seqno = "p";
    } 
    var spath   = "/system/manage/upload/uploadnew.jsp?fileclass="+fileclass+"&seqno="+seqno+"&type="+type+"&filelist="+filelist+"&filedir="+filedir;      
    parent.window.workFrame.showDialog(spath,width,height,"帮助","",true);
   
}

//左侧菜单隐藏
function expandSideBar()
{  
   if(layoutType=="1" && parent.window.menuFrame)
   {  
      parent.window.menuFrame.hideMenu(); 
   }
   
   if(layoutType=="2" && parent.parent.menuFrame)
   {  
      parent.parent.expandSideBar1(); 
   }
      
   if(layoutType=="3")
   {
     if(!$("#sidebar",window.parent.document).is(":hidden"))
     $("#sidebar .toggleCollapse div",window.parent.document).trigger("click");  
   }
}

//打开帮助
function openHelp()
{ 
  showUpload("st.system.manage.upload.UploadFileAction",790,350,"h","query","1",""); 
}

//修改密码
function editPwd()
{
 parent.window.workFrame.showDialog("/system/manage/user/passwordedit.jsp",450,230,"修改密码","",true);
}

//退出
function relogin() 
{
  parent.window.location.replace("/pages/security/loginControl.jsp?sid="+window.parent.ssid);
}

//关闭系统
function unloadHandle()
{
   window.open("/pages/security/logout.jsp?isclose=1", "subWindow", "height=10,width=10");
}

//判断是否IE浏览器
function isIE() 
{ 
    if (!!window.ActiveXObject || "ActiveXObject" in window)
         return true;
    else
         return false;
}

//是否存在函数
function isfireuserEvent(function_name) {
	var result = (typeof function_name==="function");
	if(!result)
	{
		try{
			eval("result=(typeof " + function_name + " !=\"undefined\");");
		}catch(e){
			alert(e);
		}
	}
	return result;
}

//执行函数
function fireUserEvent(function_name, param) {
	var paramStr = "";
	if (arguments.length == 2) {
		for (var i = 0; i < param.length; i++) {
			if (i == 0) {
				paramStr = "param[" + i + "]";
			} else {
				paramStr = paramStr + ",param[" + i + "]";
			}
		}
	}
	if(typeof function_name==="function")
	{
		function_name(param);

	}else{
		if (isfireuserEvent(function_name)) {
			eval("result=" + function_name + "(" + paramStr + ");");
		}
	}
}

//获取文件上传路径
function getUploadUrl(filedir,execaction,extrapara,execfunc)
{
  if(execfunc==undefined || typeof(execfunc)==undefined)
  {
      execfunc = "";
  }
  
  if(execaction==undefined || typeof(execaction)==undefined)
  {
      execaction = "";
  }
  
  if(extrapara==undefined || typeof(extrapara)==undefined)
  {
      extrapara = "";
      
  }else
  {
      if(extrapara!="")
      {
         extrapara = "&"+extrapara;
      }
  }
  
  return  sendfileurl+"?&bussurl="+retfileurl+"/HttpService&"+wssenutype+"="+execaction+"&methodname="+execfunc+"&filedir="+filedir+"&handletype=1&retuploadpage="+retuploadpage+extrapara;
  
}

//字符串转换为JSON对象
function strToJson(str)
{ 
  var json;
  try{
  json = eval('(' + decode(str) + ')'); 
  }catch(e)
  {
   json = eval('(' + str + ')'); 
  }
  return json; 
}

//JSON对象转换为字符串
function JsonToStr(jsonobj)
{ 
  var str = JSON.stringify(jsonobj); 
  return str; 
}

//判断字符串是否为JSON
function isJSON(str) {
	if (typeof str == 'string') {
		try {
			var obj=JSON.parse(str);
			if(str.indexOf('{')>-1){
				return true;
			}else{
				return false;
			}

		} catch(e) {
			console.log(e);
			return false;
		}
	}
	return false;
}
//表单转换JSON字符串
function formToJson(formId)
{
	return JSON.stringify($('#'+formId).serializeJson());
}
//表单转换JSON对象
$.fn.serializeJson = function()
{
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

//发送AJAX请求数据
function sendAjax(params,execaction,execfunc,datagridid,refreshfunc,requrl,isasync)
{ 
   var dataobj;    
   var jsonstr = "{\"";
   var isCode  = true;
   
   if(params==undefined || typeof(params)==undefined || params=="")
   {
     alert("参数不能为空!");
     return;
   }
   
   if(execaction==undefined || typeof(execaction)==undefined || execaction=="")
   {  
     alert("会话不能为空!");
     return;
   }
   
   if(isasync==undefined ||  typeof(isasync)==undefined || isasync=="")
   {
     isasync = false;
   }
    
   if(execfunc==undefined || typeof(execfunc)==undefined)
   {
     execfunc = "";
   }
   
   if(requrl==undefined || typeof(requrl)==undefined || requrl=="")
   {
	   requrl = execaction+execfunc;
	   isCode = false;
   }
   params.addFieldValue(wssenutype,execaction);
   params.addFieldValue("methodname",execfunc);
   requrl+="?isAjax=1";
     
   for ( var i = 0 ; i < params.getCount();i++) 
   {
        var p = params.getIndexedParam(i);
        if(p.getName()!="")
        {   
        	var fieldValue;
        	if(isCode)
        	{
        		fieldValue = encode(p.getValue());
        	}else
        	{
        		fieldValue = p.getValue();;
        	}
        	if(i==0)
            {   
              jsonstr = jsonstr+p.getName()+"\":\""+fieldValue+"\"";
              
            }else
            {
              jsonstr = jsonstr+",\""+p.getName()+"\":\""+fieldValue+"\"";
            }
        }
        
   }
   
   params.clear();
   
   jsonstr += "}";
   
   if (window.isDataSetBug)
   {
     requrl+="&isDebug=1";
     alert(requrl+":::"+jsonstr);
     
   }else
   {
     requrl+="&isDebug=0";
   }
   
   dataobj=callAjax(requrl,jsonstr,isasync);
    
   if(dataobj!="")
   {
	   if (window.isDataSetBug)
	   {
	      alert(JsonToStr(dataobj));
	   }
	   if(dataobj["fieldlist"]!=undefined)
	   {
		   var fieldarray = dataobj["fieldlist"].split(";");
		   for(var i=0;i<fieldarray.length;i++)
		   { 
		     if(typeof(dataobj[fieldarray[i]])=="string")
		     {   
		     	if(isCode)
		     	{
		     		params.addFieldValue(fieldarray[i],decode(dataobj[fieldarray[i]]));
		     	}else
		     	{
		     		params.addFieldValue(fieldarray[i],dataobj[fieldarray[i]]);
		     	}
		          
		     }else
		     {
		         params.addFieldValue(fieldarray[i],JsonToStr(dataobj[fieldarray[i]])); 
		     }	    
		   }
	   }else{
		   for(var p in dataobj){//遍历json对象的每个key/value对,p为key
			   if(isCode)
			   {
				   params.addFieldValue(p,decode(dataobj[p]));
			   }else
			   {
				   params.addFieldValue(p,dataobj[p]);
			   }
		   }
	   }
   }

	var result = params.getFieldValue("result");
	var code   = params.getFieldValue("code");
	if(code!=null && result==null){
		if(code=="0"){
			result ="1";
		}else{
			result ="0";
		}
	}
	var desc   = params.getFieldValue("desc");
	var msg    = params.getFieldValue("msg");
	if(msg!=null && desc==null){
		desc = msg;
	}

   if(result!=null && result=="1")
   {
	   window.postResult = true;
   }else
   {
	   window.postResult = false;
   }
   if(desc!=null && desc!="")
   { 
	  var mestype = "info";
	  if(result!=null && result!="1")
	  {
		  mestype = "error";		 
	  }
      $.messager.alert('提示', desc,mestype,function(){
	  if(result!=null && result=="1")
      {
       if(refreshfunc!=undefined && typeof(refreshfunc)!=undefined && refreshfunc!=null && refreshfunc!="")
       {    
         if(isfireuserEvent(refreshfunc))
         {
             fireUserEvent(refreshfunc);           
         }  

        }else
        {
         if(datagridid!=undefined && typeof(datagridid)!=undefined && datagridid!="")
         {
            refreshDataGrid(datagridid); 
         }
        }
      }      
     });   
   }  
   return dataobj; 
}

//发送AJAX请求地址
function getAjaxUrl(execaction,execfunc,extrapara,urlstr)
{  
  if(execaction==undefined || typeof(execaction)==undefined || execaction=="")
  {  
     execaction = "";
  }
  
  if(execfunc==undefined || typeof(execfunc)==undefined)
  {
     execfunc = "";
  }
  
  if(urlstr==undefined || typeof(urlstr)==undefined || urlstr=="")
  {
	  urlstr = execaction+execfunc;
  }
 
  urlstr = urlstr+"?"+wssenutype+"="+execaction;
  
  if(execfunc!="")
  {
     urlstr = urlstr+"&methodname="+execfunc;
  }
      
  if(extrapara!=undefined && typeof(extrapara)!=undefined && extrapara!="")
  {
    urlstr = urlstr+extrapara;
  }
  urlstr = urlstr+"&isAjax=1";
  
  //urlstr = urlstr+"&isAsync=1"; 
  
  if (window.isDataSetBug)
  {
    urlstr = urlstr+"&isDebug=1";
    alert(urlstr);
  }else
  {
    urlstr = urlstr+"&isDebug=0";
  }
  return urlstr;
}

//发送AJAX请求数据
function sendAjaxExt(execaction,execfunc,datastr,params,datagridid,refreshfunc,requrl,isasync)
{ 
  var dataobj; 
  var isCode  = true;
  if(execaction==undefined || typeof(execaction)==undefined || execaction=="")
  {  
     alert("会话不能为空!");
     return;
  }
  
  if(datastr==undefined || typeof(datastr)==undefined || datastr=="")
  {  
     alert("数据不能为空!");
     return;
  }
  
  if(isasync==undefined ||  typeof(isasync)==undefined || isasync=="")
  {
     isasync = false;
  }
  
  if(execfunc==undefined || typeof(execfunc)==undefined)
  {
    execfunc = "";
  }
  
  if(requrl==undefined || typeof(requrl)==undefined || requrl=="")
  {
	  requrl = execaction+execfunc;
	  isCode = false;
  }

  var jsonstr = "{\""+wssenutype+"\":\""+execaction+"\",\"methodname\":\""+execfunc+"\"";
    
  for ( var i = 0 ; i < params.getCount();i++) 
  {
        var p = params.getIndexedParam(i);
        if(p.getName()!="")
        {   
        	var fieldValue;
        	if(isCode)
        	{
        		fieldValue = encode(p.getValue());
        	}else
        	{
        		fieldValue = p.getValue();;
        	}
        	jsonstr = jsonstr+",\""+p.getName()+"\":\""+fieldValue+"\"";
        }
        
   }
   
   if(datastr!=undefined && typeof(datastr)!=undefined && datastr!="")
   {  
	   if(isCode)
	   {
	      jsonstr = jsonstr+","+"\"recordset\":{\"default\":"+datastr+"}";
	   }else
	   {
	      jsonstr = jsonstr+","+"\"rows\":"+datastr;
	   }   
   }  
   
   jsonstr = jsonstr+"}";
   
   requrl+="?isAjax=1"; 
   
   if (window.isDataSetBug)
   {
     requrl+="&isDebug=1";
     alert(requrl+":::"+jsonstr);
   }else
   { 
     requrl+="&isDebug=0";
   }
   
   dataobj=callAjax(requrl,jsonstr,isasync);
   
   if(dataobj!="")
   {
       if (window.isDataSetBug)
       {
          alert(JsonToStr(dataobj));
       }
       for(var p in dataobj){//遍历json对象的每个key/value对,p为key
        if(isCode)
        {
    	   params.addFieldValue(p,decode(dataobj[p]));
        }else
        {
           params.addFieldValue(p,dataobj[p]);
        }           
      }           
   }

   var result = params.getFieldValue("result");
   var code   = params.getFieldValue("code");
   if(code!=null && result==null){
   	 if(code=="0"){
		 result ="1";
	 }else{
		 result ="0";
	 }
   }
   var desc   = params.getFieldValue("desc");
   var msg    = params.getFieldValue("msg");
	if(msg!=null && desc==null){
		desc = msg;
	}

   if(result!=null && result=="1")
   {
	   window.postResult = true;
   }else
   {
	   window.postResult = false;
   }
   if(desc!=null && desc!="")
   {  
	  var mestype = "info";
	  if(result!=null && result!="1")
	  {
	      mestype = "error";
	  }
      $.messager.alert('提示', desc,mestype,function(){
	  if(result!=null && result=="1")
      {
       if(refreshfunc!=undefined && typeof(refreshfunc)!=undefined && refreshfunc!=null && refreshfunc!="")
       {    
         if(isfireuserEvent(refreshfunc))
         {
             fireUserEvent(refreshfunc);           
         }  

       }else
       {
         if(datagridid!=undefined && typeof(datagridid)!=undefined && datagridid!="")
         {
            refreshDataGrid(datagridid); 
         }
       }
      }
      
      });
   }
   
   return dataobj;
} 

//获取json字符串
function getAjaxJson(params)
{  
   var jsonstr = "{\"";
   
   for ( var i = 0 ; i < params.getCount();i++) 
   {
        var p = params.getIndexedParam(i);
        
        if(i==0)
        {   
          jsonstr = jsonstr+p.getName()+"\":\""+p.getValue()+"\"";
          
        }else
        {
          jsonstr = jsonstr+",\""+p.getName()+"\":\""+p.getValue()+"\"";
        }
   }
   
   jsonstr += "}";
   return jsonstr;
} 

//获取数据列表选择行JSON
function getDataGridRowJson(datagridid,checkedfield,issave)
{ 
  var rows;
  if(issave==undefined ||  typeof(issave)==undefined || issave=="")
  { 
    rows = $("#"+datagridid).datagrid('getChecked');
    
    if(rows.length<1)
    {
      rows = $("#"+datagridid).datagrid('getSelected');
      if(rows==null)
      {
        $.messager.alert('提示','请选择数据!','warning'); 
        return "";
      }
    }
    
    if(checkedfield==undefined ||  typeof(checkedfield)==undefined || checkedfield=="")
    {       
       return JsonToStr(rows);
     }
   }else
   {
        rows = $("#"+datagridid).datagrid('getChanges');
        if(rows.length>0)
        {
          return JsonToStr(rows);
          
        }else
        {
          return "";
        }
        
   }
  
   return getRowJson(rows,checkedfield);
}
//获取RowJson
function getRowJson(rows,checkedfield)
{
	   var jsonstrrow = "";
	   var jsonstrrows = "";
	   if(rows.length>0)
	   {   
	    for(var i=0;i<rows.length;i++)
	    {  
	      for(var p in rows[i])//遍历json对象的每个key/value对,p为key
	      {      
	           if(p==checkedfield)
	           {
	             jsonstrrow = "{\""+p+"\":"+"\""+rows[i][p]+"\"}";	             
	           }	          
	      }  
	       
	      if(jsonstrrows=="")
	      {
	          jsonstrrows = jsonstrrows+jsonstrrow;
	          
	      }else
	      {
	          jsonstrrows = jsonstrrows+","+jsonstrrow;
	      } 	      
	    }
	  }
	  jsonstrrows = "["+jsonstrrows+"]";
	  return jsonstrrows;
}
//刷新数据列表
function refreshDataGrid(datagridid,whstr,orderstr)
{  
   if(whstr==undefined ||  typeof(whstr)==undefined )
   {
      whstr = "";
   }
   
   if(orderstr==undefined ||  typeof(orderstr)==undefined)
   {
      orderstr = "";
   }
    if ($("#"+datagridid+"_tb"))
    {
        $("#"+datagridid+"_tb").attr("editRow","undefined");
    }
   $("#"+datagridid).datagrid('rejectChanges');
   $("#"+datagridid).datagrid('clearChecked');
   $("#"+datagridid).datagrid('clearSelections');
   $("#"+datagridid).datagrid("load", {whstr:whstr,orderstr:orderstr});
   
}

//获取JSON数组
function getJsonArray(execaction,execfunc,selectname,params1)
{
    var params = new Params(); 
    if(params1!=undefined && typeof(params1)!=undefined &&  params1!=null && params1!="")
    {
      params = params1;
    }
    
    if(selectname==undefined || typeof(selectname)==undefined ||  selectname=="")
    {
      selectname = "default";
    }
    params.sendAjax(params,execaction,execfunc);       
    var selectlist = params.getFieldValue(selectname);
    return strToJson(selectlist);

}

//jeasyui datagrid 打印
function createFormPage(datagridid,strPrintName) 
{   
    if($("#"+datagridid).datagrid("getRows").length<1)
    { 
	   $.messager.alert('提示','无数据!','warning'); 
       return;
    }
    var tableString   = '<table cellspacing="0" class="pb">';
    var frozenColumns = $("#"+datagridid).datagrid("options").frozenColumns;  // 得到frozenColumns对象
    var columns       = $("#"+datagridid).datagrid("options").columns;    // 得到columns对象
    var nameList      = '';

    // 载入title
    if (typeof(columns) != 'undefined' && columns != '') {
        $(columns).each(function (index) {
            tableString += '\n<tr>';
            if (typeof(frozenColumns) != 'undefined' && typeof(frozenColumns[index]) != 'undefined') {
                for (var i = 0; i < frozenColumns[index].length; i++) {
                    if (!frozenColumns[index][i].hidden && typeof(frozenColumns[index][i].width) != 'undefined') {
                        tableString += '\n<th width="' + frozenColumns[index][i].width + '"';
                        if (typeof(frozenColumns[index][i].rowspan) != 'undefined' && frozenColumns[index][i].rowspan > 1) {
                            tableString += ' rowspan="' + frozenColumns[index][i].rowspan + '"';
                        }
                        if (typeof(frozenColumns[index][i].colspan) != 'undefined' && frozenColumns[index][i].colspan > 1) {
                            tableString += ' colspan="' + frozenColumns[index][i].colspan + '"';
                        }
                        if (typeof(frozenColumns[index][i].field) != 'undefined' && frozenColumns[index][i].field != '') {
                            nameList += ',{"f":"' + frozenColumns[index][i].field + '", "a":"' + frozenColumns[index][i].align + '"}';
                        }
                        tableString += '>' + frozenColumns[0][i].title + '</th>';
                    }
                }
            }
            for (var i = 0; i < columns[index].length; i++) {
                if (!columns[index][i].hidden && typeof(columns[index][i].width)!='undefined') {
                    tableString += '\n<th width="' + columns[index][i].width + '"';
                    if (typeof(columns[index][i].rowspan) != 'undefined' && columns[index][i].rowspan > 1) {
                        tableString += ' rowspan="' + columns[index][i].rowspan + '"';
                    }
                    if (typeof(columns[index][i].colspan)!= 'undefined' && columns[index][i].colspan > 1) {
                        tableString += ' colspan="' + columns[index][i].colspan + '"';
                    }
                    if (typeof(columns[index][i].field) != 'undefined' && columns[index][i].field != '') {
                        nameList += ',{"f":"' + columns[index][i].field + '", "a":"' + columns[index][i].align + '"}';
                    }
                    tableString += '>' + columns[index][i].title + '</th>';
                }
            }
            tableString += '\n</tr>';
        });
    }
    // 载入内容
    var rows   = $("#"+datagridid).datagrid("getRows"); // 这段代码是获取当前页的所有行
    var row_checked = $("#"+datagridid).datagrid('getChecked');
    if(row_checked.length>0)
    {
       rows = row_checked;
    }
    var nl = eval('([' + nameList.substring(1) + '])');
    for (var i = 0; i < rows.length; i++) {
        tableString += '\n<tr>';
        $(nl).each(function (j) {
            var e = nl[j].f.lastIndexOf('_0');

            tableString += '\n<td';
            if (nl[j].a != 'undefined' && nl[j].a != '') {
                tableString += ' style="text-align:' + nl[j].a + ';"';
            }
            tableString += '>';
            if (e + 2 == nl[j].f.length) {
                if(typeof(rows[i][nl[j].f.substring(0, e)])!='undefined')
                tableString += rows[i][nl[j].f.substring(0, e)];
            }
            else
            {   
                if(typeof(rows[i][nl[j].f])!='undefined')
                {
                	if(rows[i][nl[j].f+"name"]!=undefined)
                	{
                		tableString += rows[i][nl[j].f+"name"];
                	}else
                	{   
                		if(rows[i][nl[j].f+"NAME"]!=undefined)
                		{
                			tableString += rows[i][nl[j].f+"NAME"];
                		}else
                		{
                			tableString += rows[i][nl[j].f];
                		}               		
                	}
                }  
            }               
            tableString += '</td>';
        });
        tableString += '\n</tr>';
    }
    tableString += '\n</table>';
    
    if(typeof(strPrintName)=='undefined') strPrintName="数据打印";
    var spath = "/jsp/print.jsp?printtitle="+encode(encode(strPrintName));
	var params = new Params();
    params.addFieldValue("tablestr",tableString);
	params.openWindow(spath,800,600,"help:no;resizable:yes;status:no;center:yes;scroll:yes");
   
}

//绑定右键菜单
function bindRightMenu(id,e)
{
  e.preventDefault();
  $("#"+id).menu('show', {
	left: e.pageX,
	top: e.pageY
  });
}

//Tabs刷新
function refreshTabs(tabid)
{           
    var tab    = $("#"+tabid).tabs('getSelected');
    if(!tab.panel('options').closable)
	{
	  return;
	}
    var iframe = $(tab.panel('options').content);
    var url    = iframe.attr('src');
	$("#"+tabid).tabs('update', {
        tab: tab,
        options: {
             content: '<iframe  scrolling="no" frameborder="0"  src="'+url+'" style="width:100%;height:99%"></iframe>'
        }
     });
}

//遍历表单的所有字段进行打包到params
function packParaForm(formEle,params)
{        
    var formName;
    var checkstr   = "";//纪录所有的多选框的名字
      
	if (typeof (formEle) == "string") {
		formName = document.all[formEle];
	} else if (typeof (formEle) == "object") {
		formName = formEle;
	}
	if (!formName) {
		return false;
	}
    
	if(!$(formName).form('validate'))
	{
		return false;
	}
	
    if(!checkFormElement(formName) || checkForm(formName)=="false")
    {
       return false;
    }
    
    var fieldlabels = "";
    
    for (var i = 0 ; i < formName.length ; i++ ) {
        
        var formElement = formName.elements[i];
             
        if(formElement.id==undefined || formElement.id=="" || formElement.id==null)
        {  
           formElement.id = $(formElement).attr("fieldName");
        }
        if(formElement.type==undefined || formElement.type=="" || formElement.type==null)
        {  
           formElement.type = $(formElement).attr("fieldType");
        }
        
        if($(formElement).attr("isPack")=="false")
        {
           continue;                  
        }
        
        if($('label[for='+$(formElement).attr('id')+']').text()!="")
        {
        	  if(fieldlabels!="")
              {
              	fieldlabels = fieldlabels +";"+formElement.id+","+ $('label[for='+$(formElement).attr('id')+']').text()+","+formElement.type;
              }else
              {
              	fieldlabels = formElement.id+","+$('label[for='+$(formElement).attr('id')+']').text()+","+formElement.type;
              }
        }
        //文本框数据
        if ( formElement.type == "text")
        		if ($(formElement).attr("fieldType")=="road")
                  	params.addFieldValue(formElement.id,$(formElement).attr("fieldValue"));
               else
	            	params.addFieldValue(formElement.id,formElement.value);
        //隐藏字段
        else if ( formElement.type == "hidden") {
	            params.addFieldValue(formElement.id,formElement.value);
       
        } //多行文本框数据
        else if ( formElement.type == "textarea") {
	            params.addFieldValue(formElement.id,formElement.value);
        //多选框数据
        } else if ( formElement.type == "checkbox" ) {
            
            if (checkstr.indexOf(formElement.id)==-1)
            {
               checkstr+=formElement.id+",";
            }
				
        //单选框数据
        } else if ( formElement.type == "radio" ) {
            if ( formElement.checked ) {
                params.addFieldValue(formElement.id,formElement.value);
            }
        //下拉菜单数据
        } else if ( formElement.type == "select-one" ) {
            if ( formElement.selectedIndex >= 0 ) {
			params.addFieldValue(formElement.id,formElement.item(formElement.selectedIndex).value);
            } else {
			params.addFieldValue(formElement.id,"");
            }
        }
        //列表菜单数据
        else if ( formElement.type == "select-multiple" ) {
            var listvalue = "";
            for ( var j = 0 ; j < formElement.length ; j++ ) {
                var optionNode = formElement.item(j);
                listvalue+=","+optionNode.value;
            }
            params.addFieldValue(formElement.id,listvalue);
        }else
        {   
        	if(formElement.id!=undefined && formElement.id!='undefined')
        	{
        		params.addFieldValue(formElement.id,formElement.value);
        	}
        }   
    }
    
    //根据多选框的名字,形成打包数据
	checks = checkstr.split(",");

	for (var i=0; i<checks.length;i++ )
	{
        params.addFieldValue(checks[i],checkField(formName,checks[i]));
	}
	
	params.addFieldValue("fieldlabels",fieldlabels);
	return true;
}

//根据表单名，字段名获得复选框的值
function checkField(formName,fieldname)
{
	var fieldvalue = "";
	for (var i = 0 ; i < formName.length ; i++ ) 
	{
		  var formElement = formName.elements[i];
          if ((formElement.id==fieldname)&&(formElement.checked))
		  {
			if (fieldvalue=="")
				fieldvalue =formElement.value;
			else
				fieldvalue +=","+formElement.value;
          }
	}
	return fieldvalue;
}

//Json转换Params
function jsonToParam(params,rsname,isCode)
{
  var dataobj = params.dataobj;
  
  if(rsname==undefined || typeof(rsname)==undefined || rsname=="")
  {
      rsname = "default";
  }
  
  if(isCode==undefined || typeof(isCode)==undefined || isCode=="")
  {
	  isCode = false;
  }
 
  if(dataobj[rsname]!=undefined)
  {
	  for(var i=0;i<dataobj[rsname].length;i++)
	  {
	     var data = dataobj[rsname][i];
	     for(var p in data)
	     {
	    	if(isCode)
	    	{
	    		params.addFieldValue(p,decode(data[p]));
	    	}else
	    	{
	    		params.addFieldValue(p,data[p]);
	    	}
	        
	     } 
	  }
  }  
}

//获取js数组
function getDataArray(params,rsname,fieldName,isCode)
{
  var dataobj  = params.dataobj;
  var fieldVal = []; 
  
  if(rsname==undefined || typeof(rsname)==undefined || rsname=="")
  {
      rsname = "default";
  }
  
  if(isCode==undefined || typeof(isCode)==undefined || isCode=="")
  {
	  isCode = true;
  }
 
  if(dataobj[rsname]!=undefined)
  {   
	  for(var i=0;i<dataobj[rsname].length;i++)
	  {
	     var data = dataobj[rsname][i];
	    
	     if(isCode)
	     {   
	    	 fieldVal.push(decode(data[fieldName]));
	     }else
	     {   
	    	 fieldVal.push(data[fieldName]);
	     }	     
	  }
   }     
   return fieldVal;
}

//填充表单
function fillParaForm(formEle,params)
{
	var formelement;
    
	if (typeof (formEle) == "string") {
		formelement = document.all[formEle];
	} else if (typeof (formEle) == "object") {
		formelement = formEle;
	}
	
	if(formelement)
	{
	 var obj,field;
	
	 for ( var i = 0 ; i < params.getCount() ; i++ )
	 {
		field = params.getIndexedParam(i);
		
		for (var j=0; j< formelement.length; j++)
		{
			obj = formelement.elements[j];

			if (trimStr(field.getName()).toUpperCase()== trimStr(obj.id).toUpperCase())
			{
				if( obj.tagName.toUpperCase() == "INPUT")
				{
					if (obj.type == "text" || obj.type == "hidden" || obj.type == "password")
					{
						$(obj).attr("oldvalue",field.getValue());
						$(obj).attr("fieldValue",field.getValue());
						obj.value = field.getValue();
					}
					if(obj.type == "checkbox"||obj.type == "radio")
					{
						$(obj).attr("oldvalue",field.getValue());
						
						if (field.getValue() =="1") 
						{
							obj.checked = true;
						}else 
						{
							obj.checked = false;
						}
					}
				}
				if (obj.tagName.toUpperCase() == "TEXTAREA")
				{
					if (field.getValue() != "null")
					{
						$(obj).attr("oldvalue",field.getValue());
						obj.value  = field.getValue();
					}
				}
				if(obj.tagName.toUpperCase() == "SELECT")
				{
					if (field.getValue() !="null")
					{
						$(obj).attr("oldvalue",field.getValue());
						obj.value    = field.getValue();
						if(obj.value == "")
						obj.selectedIndex = -1;
					}
				}
			}
		}
	  }
	}
}

//打开窗口
function showDialog(url,width1,height1,title1,isroll,ismax)
{   
	if(isroll==undefined || typeof(isroll)==undefined || isroll=="")
	{
		isroll = "no";
	}
	
	if(title1==undefined || typeof(title1)==undefined)
	{
	    title1 = "<font color=blue>对话框</font>";
	}else
	{
		title1 = "<font color=blue>"+title1+"</font>";
	}
	
	if(ismax==undefined || typeof(ismax)==undefined)
	{
		ismax = false;
	}
	
	var content1 = '<iframe  scrolling="'+isroll+'"  frameborder="0"  src="'+url+'" style="width:100%;height:99%"></iframe>'; 
  
  $('#dd').dialog({ 
    title:title1,  
    content:content1, 
    width:width1,    
    height:height1,    
    modal:true,
    maximizable:true,
    collapsible:true,
    resizable:true,
    maximized:ismax
});  

}

//关闭窗口
function closeDialog()
{
   $('#dd').dialog('close');
}

//展示消息
function showMessage(msg,title,timeout,showtype)
{   
	if(msg==undefined)
	{
		msg = "";
	}
	
	if(title==undefined || title=="")
	{
		title = "我的消息";
	}
	
	if(timeout==undefined || timeout=="")
	{
		timeout = 0;
	}
	
	if(showtype==undefined || showtype=="")
	{
		showtype = "slide";
	}
	$.messager.show({
		title:title,
		msg:msg,
		timeout:timeout,
		showType:showtype
	});
}

/********************************************************************************
 *
 *      文件名： Calendar.js
 *
 *      作  用： 日期控件
 *
 ********************************************************************************/
function Calendar(beginYear, endYear, language, patternDelimiter, date2StringPattern, string2DatePattern) {
	this.beginYear = beginYear || 2004;
	this.endYear   = endYear   || 2030;
	this.language  = language  || 0;
	this.patternDelimiter = patternDelimiter     || "-";
	this.date2StringPattern = date2StringPattern || Calendar.language["date2StringPattern"][this.language].replace(/\-/g, this.patternDelimiter);
	this.string2DatePattern = string2DatePattern || Calendar.language["string2DatePattern"][this.language];

	this.dateControl = null;
	this.panel  = this.getElementById("__calendarPanel");
	this.iframe = window.frames["__calendarIframe"];
	this.form   = null;

	this.date = new Date();
	this.year = this.date.getFullYear();
	this.month = this.date.getMonth();

	this.colors = {"bg_cur_day":"#7d99ff","bg_over":"#EFEFEF","bg_out":"#FFCC00"};
};

Calendar.language = {
	"year"   : ["\u5e74", "", "", "\u5e74"],
	"months" : [
		["\u4e00\u6708","\u4e8c\u6708","\u4e09\u6708","\u56db\u6708","\u4e94\u6708","\u516d\u6708","\u4e03\u6708","\u516b\u6708","\u4e5d\u6708","\u5341\u6708","\u5341\u4e00\u6708","\u5341\u4e8c\u6708"],
		["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],
		["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],
		["\u4e00\u6708","\u4e8c\u6708","\u4e09\u6708","\u56db\u6708","\u4e94\u6708","\u516d\u6708","\u4e03\u6708","\u516b\u6708","\u4e5d\u6708","\u5341\u6708","\u5341\u4e00\u6708","\u5341\u4e8c\u6708"]
	],
	"weeks"  : [["\u65e5","\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d"],
		["Sun","Mon","Tur","Wed","Thu","Fri","Sat"],
		["Sun","Mon","Tur","Wed","Thu","Fri","Sat"],
		["\u65e5","\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d"]
	],
	"clear"  : ["\u6e05\u7a7a", "Clear", "Clear", "\u6e05\u7a7a"],
	"today"  : ["\u4eca\u5929", "Today", "Today", "\u4eca\u5929"],
	"close"  : ["\u5173\u95ed", "Close", "Close", "\u95dc\u9589"],
	"date2StringPattern" : ["yyyy-MM-dd", "yyyy-MM-dd", "yyyy-MM-dd", "yyyy-MM-dd"],
	"string2DatePattern" : ["ymd","ymd", "ymd", "ymd"]
};

Calendar.prototype.draw = function() {
	calendar = this;

	var _cs = [];
	_cs[_cs.length] = '<form id="__calendarForm" name="__calendarForm" method="post">';
	_cs[_cs.length] = '<table id="__calendarTable" width="100%" border="0" cellpadding="3" cellspacing="1" align="center">';
	_cs[_cs.length] = ' <tr>';
	_cs[_cs.length] = '  <th><input class="l" name="goPrevMonthButton" type="button" id="goPrevMonthButton" value="&lt;" \/><\/th>';
	_cs[_cs.length] = '  <th colspan="5"><select class="year" name="yearSelect" id="yearSelect"><\/select><select class="month" name="monthSelect" id="monthSelect"><\/select><\/th>';
	_cs[_cs.length] = '  <th><input class="r" name="goNextMonthButton" type="button" id="goNextMonthButton" value="&gt;" \/><\/th>';
	_cs[_cs.length] = ' <\/tr>';
	_cs[_cs.length] = ' <tr>';
	for(var i = 0; i < 7; i++) {
		_cs[_cs.length] = '<th class="theader">';
		_cs[_cs.length] = Calendar.language["weeks"][this.language][i];
		_cs[_cs.length] = '<\/th>';
	}
	_cs[_cs.length] = '<\/tr>';
	for(var i = 0; i < 6; i++){
		_cs[_cs.length] = '<tr align="center">';
		for(var j = 0; j < 7; j++) {
			switch (j) {
				case 0: _cs[_cs.length] = '<td class="sun">&nbsp;<\/td>'; break;
				case 6: _cs[_cs.length] = '<td class="sat">&nbsp;<\/td>'; break;
				default:_cs[_cs.length] = '<td class="normal">&nbsp;<\/td>'; break;
			}
		}
		_cs[_cs.length] = '<\/tr>';
	}
	_cs[_cs.length] = ' <tr>';
	_cs[_cs.length] = '  <th colspan="2"><input type="button" class="b" name="clearButton" id="clearButton" \/><\/th>';
	_cs[_cs.length] = '  <th colspan="3"><input type="button" class="b" name="selectTodayButton" id="selectTodayButton" \/><\/th>';
	_cs[_cs.length] = '  <th colspan="2"><input type="button" class="b" name="closeButton" id="closeButton" \/><\/th>';
	_cs[_cs.length] = ' <\/tr>';
	_cs[_cs.length] = '<\/table>';
	_cs[_cs.length] = '<\/form>';

	this.iframe.document.body.innerHTML = _cs.join("");
	this.form = this.iframe.document.forms["__calendarForm"];

	this.form.clearButton.value = Calendar.language["clear"][this.language];
	this.form.selectTodayButton.value = Calendar.language["today"][this.language];
	this.form.closeButton.value = Calendar.language["close"][this.language];

	this.form.goPrevMonthButton.onclick = function () {calendar.goPrevMonth(this);};
	this.form.goNextMonthButton.onclick = function () {calendar.goNextMonth(this);};
	this.form.yearSelect.onchange = function () {calendar.update(this);};
	this.form.monthSelect.onchange = function () {calendar.update(this);};

	this.form.clearButton.onclick = function () {calendar.dateControl.value = "";calendar.hide();};
	this.form.closeButton.onclick = function () {calendar.hide();};
	this.form.selectTodayButton.onclick = function () {
		var today = new Date();
		calendar.date = today;
		calendar.year = today.getFullYear();
		calendar.month = today.getMonth();
		calendar.dateControl.value = today.format(calendar.date2StringPattern);
		calendar.hide();
	};
};

Calendar.prototype.bindYear = function() {
	var ys = this.form.yearSelect;
	ys.length = 0;
	for (var i = this.beginYear; i <= this.endYear; i++){
		ys.options[ys.length] = new Option(i + Calendar.language["year"][this.language], i);
	}
};

Calendar.prototype.bindMonth = function() {
	var ms = this.form.monthSelect;
	ms.length = 0;
	for (var i = 0; i < 12; i++){
		ms.options[ms.length] = new Option(Calendar.language["months"][this.language][i], i);
	}
};

Calendar.prototype.goPrevMonth = function(e){
	if (this.year == this.beginYear && this.month == 0){return;}
	this.month--;
	if (this.month == -1) {
		this.year--;
		this.month = 11;
	}
	this.date = new Date(this.year, this.month, 1);
	this.changeSelect();
	this.bindData();
};

Calendar.prototype.goNextMonth = function(e){
	if (this.year == this.endYear && this.month == 11){return;}
	this.month++;
	if (this.month == 12) {
		this.year++;
		this.month = 0;
	}
	this.date = new Date(this.year, this.month, 1);
	this.changeSelect();
	this.bindData();
};

Calendar.prototype.changeSelect = function() {
	var ys = this.form.yearSelect;
	var ms = this.form.monthSelect;
	for (var i= 0; i < ys.length; i++){
		if (ys.options[i].value == this.date.getFullYear()){
			ys[i].selected = true;
			break;
		}
	}
	for (var i= 0; i < ms.length; i++){
		if (ms.options[i].value == this.date.getMonth()){
			ms[i].selected = true;
			break;
		}
	}
};

Calendar.prototype.update = function (e){
	this.year  = e.form.yearSelect.options[e.form.yearSelect.selectedIndex].value;
	this.month = e.form.monthSelect.options[e.form.monthSelect.selectedIndex].value;
	this.date = new Date(this.year, this.month, 1);
	this.changeSelect();
	this.bindData();
};

Calendar.prototype.bindData = function () {
	var calendar = this;
	var dateArray = this.getMonthViewDateArray(this.date.getFullYear(), this.date.getMonth());
	var tds = this.getElementsByTagName("td", this.getElementById("__calendarTable", this.iframe.document));

	for(var i = 0; i < tds.length; i++) {
		tds[i].style.backgroundColor = calendar.colors["bg_over"];
		tds[i].onclick = null;
		tds[i].onmouseover = null;
		tds[i].onmouseout = null;
		tds[i].innerHTML = dateArray[i] || "&nbsp;";
		if (i > dateArray.length - 1) continue;
		if (dateArray[i]){
			tds[i].onclick = function () {
				if (calendar.dateControl){
					calendar.dateControl.value = new Date(calendar.date.getFullYear(),
						calendar.date.getMonth(),
						this.innerHTML).format(calendar.date2StringPattern);
				}
				calendar.hide();
			};
			tds[i].onmouseover = function () {this.style.backgroundColor = calendar.colors["bg_out"];};
			tds[i].onmouseout  = function () {this.style.backgroundColor = calendar.colors["bg_over"];};
			if(calendar.dateControl.value.length>0){
				if(calendar.date.getDate()==dateArray[i]){
					tds[i].style.backgroundColor = calendar.colors["bg_cur_day"];
					tds[i].onmouseover = function () {this.style.backgroundColor = calendar.colors["bg_out"];};
					tds[i].onmouseout  = function () {this.style.backgroundColor = calendar.colors["bg_cur_day"];};
				}
			}else {
				var today = new Date();
				if (today.getFullYear() == calendar.date.getFullYear()) {
					if (today.getMonth() == calendar.date.getMonth()) {
						if (today.getDate() == dateArray[i]) {
							tds[i].style.backgroundColor = calendar.colors["bg_cur_day"];
							tds[i].onmouseover = function () {this.style.backgroundColor = calendar.colors["bg_out"];};
							tds[i].onmouseout  = function () {this.style.backgroundColor = calendar.colors["bg_cur_day"];};
						}
					}
				}
			}

		}//end if
	}//end for
};

Calendar.prototype.getMonthViewDateArray = function (y, m) {
	var dateArray = new Array(42);
	var dayOfFirstDate = new Date(y, m, 1).getDay();
	var dateCountOfMonth = new Date(y, m + 1, 0).getDate();
	for (var i = 0; i < dateCountOfMonth; i++) {
		dateArray[i + dayOfFirstDate] = i + 1;
	}
	return dateArray;
};

Calendar.prototype.show = function (dateControl, popuControl) {

	if (this.panel.style.visibility == "visible") {
		this.panel.style.visibility = "hidden";
	}
	if (!dateControl){
		throw new Error("arguments[0] is necessary!");
	}
	this.dateControl = dateControl;

	popuControl = popuControl || dateControl;

	this.draw();
	this.bindYear();
	this.bindMonth();

	if (dateControl.value.length > 0){
		this.date  = new Date(dateControl.value.toDate(this.patternDelimiter, this.string2DatePattern));
		this.year  = this.date.getFullYear();
		this.month = this.date.getMonth();

	}
	this.changeSelect();
	this.bindData();

	var xy = this.getAbsPoint(popuControl);
	//var winw=$(window).width();
	//var winh=$(window).height();
	//if((xy.x+200)>winw) xy.x=winw-200;
	//if((xy.y+216)>winh) xy.y=winh-216;
	this.panel.style.left = xy.x + "px";
	this.panel.style.top = (xy.y + dateControl.offsetHeight) + "px";
	this.panel.style.visibility = "visible";
};

Calendar.prototype.hide = function() {
	this.panel.style.visibility = "hidden";
	if(this.dateControl!=undefined&&undefined!=this.dateControl.cell){
		dbGridTextDate_onblur(this.dateControl,this.dateControl.cell);
	}
};

Calendar.prototype.getElementById = function(id, object){
	object = object || document;
	return document.getElementById ? object.getElementById(id) : document.all(id);
};

Calendar.prototype.getElementsByTagName = function(tagName, object){
	object = object || document;
	return document.getElementsByTagName ? object.getElementsByTagName(tagName) : document.all.tags(tagName);
};

Calendar.prototype.getAbsPoint = function (e){
	var x = e.offsetLeft;
	var y = e.offsetTop;
	while(e = e.offsetParent){
		x += e.offsetLeft;
		y += e.offsetTop;
	}
	return {"x": x, "y": y};
};

/**
 * @param   d the delimiter
 * @param   p the pattern of your date
 * @author  meizz
 * @author  kimsoft add w+ pattern
 */
Date.prototype.format = function(style) {
	var o = {
		"M+" : this.getMonth() + 1, //month
		"d+" : this.getDate(),      //day
		"h+" : this.getHours(),     //hour
		"m+" : this.getMinutes(),   //minute
		"s+" : this.getSeconds(),   //second
		"w+" : "\u65e5\u4e00\u4e8c\u4e09\u56db\u4e94\u516d".charAt(this.getDay()),   //week
		"q+" : Math.floor((this.getMonth() + 3) / 3),  //quarter
		"S"  : this.getMilliseconds() //millisecond
	};
	if (/(y+)/.test(style)) {
		style = style.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for(var k in o){
		if (new RegExp("("+ k +")").test(style)){
			style = style.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return style;
};

/**
 * @param d the delimiter
 * @param p the pattern of your date
 * @rebuilder kimsoft
 * @version build 2006.12.15
 */
String.prototype.toDate = function(delimiter, pattern) {
	delimiter = delimiter || "-";
	pattern = pattern || "ymd";
	var a = this.split(delimiter);
	var y = parseInt(a[pattern.indexOf("y")], 10);
	//remember to change this next century ;)
	if(y.toString().length <= 2) y += 2000;
	if(isNaN(y)) y = new Date().getFullYear();
	var m = parseInt(a[pattern.indexOf("m")], 10) - 1;
	var d = parseInt(a[pattern.indexOf("d")], 10);
	if(isNaN(d)) d = 1;
	return new Date(y, m, d);
};

document.writeln('<div id="__calendarPanel" style="position:absolute;visibility:hidden;z-index:9999;background-color:#FFFFFF;border:1px solid #666666;width:200px;height:216px;">');
document.writeln('<iframe name="__calendarIframe" id="__calendarIframe" width="100%" height="100%" scrolling="no" frameborder="0" style="margin:0px;"><\/iframe>');
var __ci = window.frames['__calendarIframe'];
__ci.document.writeln('<!DOCTYPE html PUBLIC "-\/\/W3C\/\/DTD XHTML 1.0 Transitional\/\/EN" "http:\/\/www.w3.org\/TR\/xhtml1\/DTD\/xhtml1-transitional.dtd">');
__ci.document.writeln('<html xmlns="http:\/\/www.w3.org\/1999\/xhtml">');
__ci.document.writeln('<head>');
__ci.document.writeln('<meta http-equiv="Content-Type" content="text\/html; charset=utf-8" \/>');
__ci.document.writeln('<title>Web Calendar(UTF-8) Written By KimSoft<\/title>');
__ci.document.writeln('<style type="text\/css">');
__ci.document.writeln('<!--');
__ci.document.writeln('body {font-size:12px;margin:0px;text-align:center;}');
__ci.document.writeln('form {margin:0px;}');
__ci.document.writeln('select {font-size:12px;background-color:#EFEFEF;}');
__ci.document.writeln('table {border:0px solid #CCCCCC;background-color:#FFFFFF}');
__ci.document.writeln('th {font-size:12px;font-weight:normal;background-color:#FFFFFF;}');
__ci.document.writeln('th.theader {font-weight:normal;background-color:#666666;color:#FFFFFF;width:24px;}');
__ci.document.writeln('select.year {width:64px;}');
__ci.document.writeln('select.month {width:60px;}');
__ci.document.writeln('td {font-size:12px;text-align:center;}');
__ci.document.writeln('td.sat {color:#0000FF;background-color:#EFEFEF;}');
__ci.document.writeln('td.sun {color:#FF0000;background-color:#EFEFEF;}');
__ci.document.writeln('td.normal {background-color:#EFEFEF;}');
__ci.document.writeln('input.l {border: 1px solid #CCCCCC;background-color:#EFEFEF;width:20px;height:20px;}');
__ci.document.writeln('input.r {border: 1px solid #CCCCCC;background-color:#EFEFEF;width:20px;height:20px;}');
__ci.document.writeln('input.b {border: 1px solid #CCCCCC;background-color:#EFEFEF;width:100%;height:20px;}');
__ci.document.writeln('-->');
__ci.document.writeln('<\/style>');
__ci.document.writeln('<\/head>');
__ci.document.writeln('<body>');
__ci.document.writeln('<\/body>');
__ci.document.writeln('<\/html>');
__ci.document.close();
document.writeln('<\/div>');
var calendar = new Calendar();
//-->
function dropdownDate(obj){
	calendar=new Calendar();
	calendar.show(obj);
}
/********************************************************************************
 *
 *      文件名： control.js
 *
 *      作  用： 容器对象初始化
 *
 ********************************************************************************/ 
window.fGridContainer    = new Array();
window.fDataSetContainer = new Array();
/* body单击事件 隐藏控健的 初始化信息 */
function body_Click() {

	/*隐藏路控健信息*/
	if (document.getElementById("_load_box")!=null) 
	   droploadInit();

	/*隐藏日期控件信息*/
    var evt = getEvent();
	var src = evt.srcElement || evt.target;
	if($(src)==null|| $(src)==undefined || $(src).attr("fieldType")==null || $(src).attr("fieldType")==undefined || ($(src).attr("fieldType").toUpperCase() !="DATE" && $(src).attr("fieldType").toUpperCase()!="DROPDATE"))
	{
		calendar.hide();		 
	} 
     
	/*隐藏下拉菜单信息*/
	if (document.getElementById("dropdownText_button")!=null)
		dropInit();
   
	/* 隐藏右健菜单信息 */
	if (document.getElementById("MenuContainer")!=null)
		hide();

	/* 隐藏月控件信息 */
	if (document.getElementById("_dropMonth_frame")!=null)
		MonthInit();
		
	if (isfireuserEvent("body_onAfterClick")){
		fireUserEvent("body_onAfterClick", []);
	}
}

function body_Beforeunload() {
	if (isfireuserEvent("body_onBeforeunload")){
		fireUserEvent("body_onBeforeunload", []);
	}
}

function body_Resize() {
	if (isfireuserEvent("body_onResize")){
		fireUserEvent("body_onResize", []);
	}
}

/*控件按钮鼠标移进*/
function text_onblur() 
{	 
	try {
		var evt=getEvent();
		var src=evt.srcElement || evt.target;
		
		if ($(src).attr("fieldType") =="date" && src.value.length > 0)
		{
		    var numArray = src.value.split("-");		
			if (numArray.length != 3 )
			{			
				alert($(src).attr("fieldLabel") + ":输入日期值有误! \n输入格式：yyyy-mm-dd");
				src.focus();
			}else
			{
				if (isNaN(parseInt(numArray[0]))||isNaN(parseInt(numArray[1]))||isNaN(parseInt(numArray[2])))
				{
					alert($(src).attr("fieldLabel") + ":输入日期有! \n输入格式：yyyy-mm-dd");
					src.focus();
				}else
				{
					if (numArray[0]/1 < 1900 ||numArray[0]/1 > 3000 || numArray[1]/1 > 12 || numArray[1]/1 < 1 || numArray[2].length > 2 || numArray[2]/1 > 31 || numArray[2]/1 < 1)
					{
						alert($(src).attr("fieldLabel")+ ":输入日期值有误! \n输入格式：yyyy-mm-dd");
						src.focus();
					}				
				}			
			}		
		}
		
		/*列表赋值*/
		if (src.dbGrid) {
			src.dbGrid.setFieldValue(src.id,
					src.value);

			if (src.tagName.toUpperCase() == "SELECT"
					&& src.selectedIndex > -1) {
				src.dbGrid
						.setFieldText(src.id, src
								.elements[src.selectedIndex].text);
			}
		}

	} catch (e) {

	}
}

function addcalender() {
    var evt = getEvent();
	var src = evt.srcElement || evt.target;
	CalendarMaker(src);
}

function date_onfocus(element) {
	element.onkeypress = addcalender;
	$(element).css("imeMode", "disabled");
}

function number_onfocus(element) {    
	element.onkeyup = onKeyPressInputFloat;
	$(element).css("imeMode", "disabled");
}

function int_onfocus(element) {
	element.onkeyup = onKeyPressInputInteger;
	$(element).css("imeMode", "disabled");
}
   
function email_onfocus(element) {
	element.onkeypress = onKeyPressInputeMail;
	$(element).css("imeMode", "disabled");
}

function road_onfocus(element) {
	element.onkeyup = getload;
	element.onclick = getload;
	element.onchange= checkRoad;
	$(element).css("imeMode", "disabled");
} 
function checkRoad()
{  
   var evt = getEvent();
   var el  = evt.srcElement || evt.target;
   if(el.value=="")
   {
      $(el).attr("fieldValue","");
   }
}
function dropdept_onfocus(element) {
	element.onkeyup  = dropdownDept;
	element.onclick  = dropdownDept;
	element.readOnly = true;
	$(element).css("imeMode", "disabled");
}  
function dropoper_onfocus(element) {
	
	element.onkeyup  = dropdownUser;
	element.onclick  = dropdownDept;
	$(element).css("imeMode", "disabled");
}
function submitViaEnter(clickfunc) {
    var evt     = getEvent();        
	var nKey    = (evt.charCode) ? evt.charCode :((evt.which) ? evt.which : evt.keyCode);
    
    if (nKey == 13 || nKey == 3) {
    
    if (isfireuserEvent(clickfunc))
	    fireUserEvent(clickfunc, []);
    }
    return true;
}
/*初始化界面信息*/
function bodyInit(querybutton,formEle1,isNew,querybutton1) {

	var dialogWindow = $("<div id=\"dd\" style=\"overflow:hidden\"></div>");
	$("body").append(dialogWindow);

	/*禁用浏览器右键菜单*/
	setContextMenuable(false);

	window.parValues = getUrlParam();
	
	$(".form-date").datetimepicker({language:"zh-CN",format:"yyyy-mm-dd",autoclose:true,minView:2});	
	$(".form-datetime").datetimepicker({language:"zh-CN",format:"yyyy-mm-dd hh:ii:ss",autoclose:true});
	$('.form-yearmonth').datetimepicker({
		format: 'yyyy/mm',
        autoclose: true,
        startView: 3,
        minView: 3,
        forceParse: false,
        language: 'zh-CN'
    });
	$('.form-year').datetimepicker({
        format: 'yyyy',
        autoclose: true,
        startView: 4,
        minView:4,
        language:  'zh-CN'
    });
	$('.form-month').datetimepicker({
		format: 'mm',
        autoclose: true,
        startView: 3,
        minView: 3,
        forceParse: false,
        language: 'zh-CN'
    });
	$('.form-time').datetimepicker({
		format: 'hh:ii',
        autoclose: true,
        startView: 1,
        minView: 0,
        forceParse: false,
        language: 'zh-CN'
    });
	
	$(".form-date,.form-datetime,.form-yearmonth,.form-year,.form-month,.form-time").attr("readonly","readonly");
	
	if (isfireuserEvent("body_load"))
		fireUserEvent("body_load", ['']);
	
	if (typeof(isNew)!="undefined" && isNew!="undefined" && isNew!=undefined && isNew && isNew!="" && isNew=="true")
	{
	    body_init(querybutton,formEle1,false);
	    
	}else
	{  
	  if(formEle1 &&  formEle1!="" &&  typeof(formEle1)!="undefined" && formEle1!="undefined" && formEle1!=undefined)
	  {  
	     if(formEle1=="1" || formEle1==1)
	     {
	     
	       document.onkeydown = function () {
           if (window.event && window.event.keyCode == 13) {
            window.event.returnValue = false;
           }
          };
          
	     }else
	     {
	        body_init(querybutton1,formEle1,false);
	     	   
	        if(querybutton=="")
	        {
	         querybutton = false;
	        }
	     
	     }
	     	     
	  }
	   
	  for ( var i = 0; i < document.all.length; i++) {
		var element = document.all[i];
		if (querybutton) {
			element.buttonid = querybutton;
		}
		
		if ($(element).attr("isNull")!=undefined && $(element).attr("isNull").toUpperCase() == "FALSE") {
			
			if($(element).attr("class")==undefined)
			{   
				$(element).attr("class","form-control");
			}
			$(element).validatebox({    
			    required: true   
			});
         
		}else
		{
			if ($(element).attr("fieldType")!=undefined && $(element).attr("fieldType")!="")
			{
				if($(element).attr("class")==undefined)
				{
					$(element).attr("class","form-control");
				}
			}
		}
		
		if ($(element).attr("fieldType")==undefined || $(element).attr("fieldType")=="") {
			continue;  
		}
       		
		if (element.tagName.toUpperCase() == "INPUT" && (element.type.toUpperCase() == "TEXT" || element.type.toUpperCase() == "PASSWORD")) 
		{			
			if(element.readOnly)
			{
				
			}else
			{
			   element.onblur    = text_onblur;
			   
			   if(element.onkeyup==null)
			   {
			      element.onkeyup   = enterToTab;
			   }
			   			
			}
			          
			if ($(element).attr("fieldType")!=undefined && $(element).attr("fieldType").toLowerCase() == "date") {
				date_onfocus(element);
			}
			if ($(element).attr("fieldType")!=undefined && $(element).attr("fieldType").toLowerCase() == "dropdate") {
				element.readOnly = true;
				$(element).click(function(){
					//dropdownDate(this);
				});
			}
			if ($(element).attr("fieldType")!=undefined &&  $(element).attr("fieldType").toLowerCase() == "dropdown") {
				element.readOnly = true;
				element.onclick  = dropdown;
			}		
		
			if ($(element).attr("fieldType")!=undefined && ($(element).attr("fieldType").toLowerCase() == "money"
					|| $(element).attr("fieldType").toLowerCase() == "number")) {
				number_onfocus(element);
			}
			if ($(element).attr("fieldType")!=undefined && ($(element).attr("fieldType").toLowerCase() == "int"
					|| $(element).attr("fieldType").toLowerCase() == "card")) {
				int_onfocus(element);
			}
			if ($(element).attr("fieldType")!=undefined && $(element).attr("fieldType").toLowerCase() == "email") {
				email_onfocus(element);
			}
			if ($(element).attr("fieldType")!=undefined && $(element).attr("fieldType").toLowerCase() == "road") {
			 
				road_onfocus(element);				
			}
              
            if ($(element).attr("fieldType")!=undefined && $(element).attr("fieldType").toLowerCase() == "dropdept") {
               
				dropdept_onfocus(element);				
			}
			if ($(element).attr("fieldType")!=undefined && $(element).attr("fieldType").toLowerCase() == "dropoper") {
				dropoper_onfocus(element);				
			}		
		}

		if (element.tagName.toUpperCase() == "TEXTAREA") {
			element.onblur  = text_onblur;

		}
		if (element.tagName.toUpperCase() == "SELECT") {
			element.onkeyup = enterToTab;
		}
		
	}
	document.body.onclick = body_Click;
	document.body.onbeforeunload = body_Beforeunload;
	document.body.onresize = body_Resize;
    }
}
 
function enterToTab() {
    
    var evt     = getEvent();        
	var element = evt.srcElement || evt.target;
	var nKey    = (evt.charCode) ? evt.charCode :((evt.which) ? evt.which : evt.keyCode); 
    
    if($(element).attr("isEnter")=="false")
    {  
        return;
    }
    
	if (nKey == 13) {
		body_Click();
		if (element.buttonid == undefined) {
			nKey = 9;
		} else { 
		    		        
		    if (isfireuserEvent(element.buttonid)){
	    	   submitViaEnter(element.buttonid);
            }else
            {  
               document.getElementById(element.buttonid).focus();
			   document.getElementById(element.buttonid).onclick();
            }
			
		}

	}

}

function enterToClick(){
	
	var evt     = getEvent();        
	var element = evt.srcElement || evt.target;
	var nKey    = (evt.charCode) ? evt.charCode :((evt.which) ? evt.which : evt.keyCode); 

	if (nKey == 13) {
	    try {
		  if ( element.onenterdown == "true" ) {
			 eval(element.onclick());
		  }
	   } catch ( Exception ) {
	   }
	}

}

//初始化界面信息
function body_init(querybutton,formEle,isnew,isone){
    var formelement;
	if (typeof (formEle) == "string") {
		formelement = document.all[formEle];
	} else if (typeof (formEle) == "object") {
		formelement = formEle;
	}
	if (!formelement) {
		return;
	}
	
	if (typeof(isnew)=="undefined" || isnew=="undefined" || isnew==undefined || isnew=="true")
	{
	   if (isfireuserEvent("body_load"))
		fireUserEvent("body_load", ['']);
	}
			
	for (var i=0; i< formelement.length; i++)
	{
	   var element= formelement.elements[i];

	   if ( element.type != "button" && element.type !="submit" && element.type !="reset" ) 
	   {	   
		    if(element.tabIndex != undefined)
		    {
				element.buttonid=querybutton;
                
                if(isone &&  isone!="" &&  typeof(isone)!="undefined" && isone!="undefined" && isone!=undefined)
                {
                  element.onkeydown=enterToTab;
                }else
                {
                  element.onkeyup=enterToTab;
                
                }
		    }
		    
	    } else 
	    {  
	       if(typeof(isone)!="undefined" && isone!="undefined" && isone!=undefined && isone && (isone=="1" || isone==1))
	       {
	         element.onkeyup = enterToClick;
	       }else
	       {
	         element.onkeydown = enterToClick;
	       }
		   
	    }
	}
}
/////检查FORM的输入内容
function checkFormElement(formelement) {
	var formEle;
	if (typeof (formelement) == "string") {
		formEle = document.all[formelement];
	} else if (typeof (formelement) == "object") {
		formEle = formelement;
	}
	if (!formEle) {
		return;
	}
	window.checkInput = new Array();
	window.checkEmailInput = new Array();

	var retvlaue = "true";
    
	for ( var i = 0; i < formEle.length; i++) {
		var element = formEle.elements[i];
		linjCheckIsNull(element);  
		if(!checkInputNumRange(element))
	    {
	           return false;
	    }		
	}

	var alertStr = "";
	// /检查后的结果处理
	for ( var i = 0; i < window.checkInput.length; i++) {

		if (window.checkInput[i].tagName != "SELECT") {
			
			if ($('label[for='+$(window.checkInput[i]).attr('id')+']').text()!=undefined  && $('label[for='+$(window.checkInput[i]).attr('id')+']').text()!="") {
				alertStr = alertStr + $('label[for='+$(window.checkInput[i]).attr('id')+']').text()
						+ ":  不能为空! <br>";
			} else if ($(window.checkInput[i]).attr("alertTitle")!=undefined  && $(window.checkInput[i]).attr("alertTitle")!="") {
				alertStr = alertStr + $(window.checkInput[i]).attr("alertTitle")
				+ ":  不能为空! <br>";
			} else {
				alertStr = alertStr
				+ "提示部分不能为空! <br>";
			}

		} else {
			
			if ($('label[for='+$(window.checkInput[i]).attr('id')+']').text()!=undefined  && $('label[for='+$(window.checkInput[i]).attr('id')+']').text()!="") {
				alertStr = alertStr + $('label[for='+$(window.checkInput[i]).attr('id')+']').text()
						+ ":  请确定选定项!<br>";
			} else if ($(window.checkInput[i]).attr("alertTitle")!=undefined  && $(window.checkInput[i]).attr("alertTitle")!="") {
				alertStr = alertStr + $(window.checkInput[i]).attr("alertTitle")
				+ ":  请确定选定项! <br>";
			} else {
				alertStr = alertStr
				+ "请确定选定项! <br>";
			}
		}
	}

	if (alertStr != "") {
		$.messager.alert('提示',alertStr,'warning');
	}

	if (window.checkInput.length > 0) {
		try {
			window.checkInput[0].focus();
		} catch (e) {
		}
		return false;
	} else {
		return true;
	}

}

///最新检查方法
function linjCheckIsNull(element) {
    
	if ($(element).attr("isNull")!=undefined && $(element).attr("isNull").toUpperCase() == "FALSE") {
		if (element.tagName.toUpperCase() == "SELECT" && element.value == '') {
			window.checkInput[window.checkInput.length] = element;
		} else if (element.tagName.toUpperCase() == "INPUT") {
			if (element.type.toUpperCase() == "TEXT"
					|| element.type.toUpperCase() == "PASSWORD") {
				var value = RTrim(element.value);
				if (value.length == 0) {
					window.checkInput[window.checkInput.length] = element;
				}

			} else if (element.type.toUpperCase() == "CHECKBOX"
					&& !element.checked) {
				window.checkInput[window.checkInput.length] = element;
			}
		} else if (element.tagName.toUpperCase() == "TEXTAREA") {
			var value = RTrim(element.value);
			if (value.length == 0) {
				window.checkInput[window.checkInput.length] = element;
			}
		}
	}

}

/*控件按钮鼠标移进*/
function button_onmouseover() {
	try {
	    var evt = getEvent();
	    var src = evt.srcElement || evt.target;
		if (src.disabled) {
			return;
		}
	} catch (e) {

	}
}

/*控件按钮鼠标移出*/
function button_onmouseout() {
	try {
	    var evt = getEvent();
	    var src = evt.srcElement || evt.target;
		if (src.disabled) {
			return;
		}
	} catch (e) {

	}
}

//级联
function refresh_select(selectId, refSql, defaultValue, defaultTitle) {

	if (document.getElementById(selectId) == undefined || document.getElementById(selectId)==null)
		return;
		
	dateset = new DataSet();
	dateset.refreshBySql(refSql,$("#"+selectId).attr("cacheKey"));
	retStr = dateset.getDocXML();
	var xmlDoc = createDomDocument(retStr);

	var rootNode = xmlDoc.documentElement;
	rootNode = rootNode.firstChild;
	var obj = document.getElementById(selectId);

	for (i = obj.options.length - 1; i > -1; i--) {
		obj.options.remove(i);
	}

	if (rootNode.childNodes.length > 0 && arguments.length == 4 && defaultTitle != undefined) {
		var opt = document.createElement("OPTION");
		opt.value = "";
		opt.text  =  defaultTitle;
		
		obj.add(opt);
	}

	for ( var i = 0; i < rootNode.childNodes.length; i++)
	{
		if( rootNode.childNodes[i].childNodes.length >1)
		{
			var opt = document.createElement("OPTION");
			var text, value;			
			value = decode($(rootNode.childNodes[i].childNodes[0]).attr("value"));
			text  = decode($(rootNode.childNodes[i].childNodes[1]).attr("value"));	
			obj.options.add(new Option(text, value));
		}
	}

	if (arguments.length > 2) {
		for (i = 0; i < obj.options.length; i++) {
			if (arguments.length == 4 && defaultValue == "") {
				if (obj.options[i].value == "")
					obj.selectedIndex = i;
			} else {
				if (obj.options[i].value == defaultValue)
					obj.selectedIndex = i;

			}
		}

	}

}

function CalendarMaker(el){	
	onKeyPressInputInteger();
	var evt     = getEvent();
	var nKey    = (evt.charCode) ? evt.charCode :((evt.which) ? evt.which : evt.keyCode); 
	if (el.value.length>10){
		nKey = 0;
	}
		
	if (el.value.split("-").length ==3)
		return;
		 
	if (el.value.length>1){
		if(el.value.substr(0,2)/1 < 19 || el.value.substr(0,2)/1 > 30)
			nKey = 0;	
	}

	if (el.value.length ==4){
		el.value = el.value+"-";	
	}
	
	if (el.value.length ==6){
		if(el.value.substr(5,1)/1 >1)
			el.value = el.value.substr(0,5)+"0"+el.value.substr(5,1);
	}
	
	if (el.value.length ==7){
		if(el.value.substr(5,2)/1 >12 || el.value.substr(5,2)/1 ==0)
			nKey = 0;
		else
			el.value = el.value+"-";

	}
	
	if (el.value.length ==9){
		if(el.value.substr(8,1)/1 >3)
			nKey = 0;
	}
	
	if (el.value.length ==9){
		if(el.value.substr(8,1)/1 ==3)
			if(nKey !=48 && nKey !=49)
			    nKey =0;
	}
	
}

/********************************************************************************
 *
 *      文件名： compack.js
 *
 *      作  用： 1.处理页面间参数传递 2.AJAX前后台数据交互              
 *
 ********************************************************************************/
Params.prototype.count;
Params.prototype.param;
Params.prototype.paramx;
Params.prototype.ischeckform;
Params.prototype.dataobj;
Params.prototype.add                    = Params_add;
Params.prototype.addNew                 = Params_addNew;
Params.prototype.clear                  = Params_clear;
Params.prototype.getNamedParamValue     = Param_getNamedParamValue;
Params.prototype.getNamedParam          = Param_getNamedParam;
Params.prototype.getCount               = Param_getCount;
Params.prototype.getIndexedParam        = Param_getIndexedParam;
Params.prototype.getIndexedParamValue   = Param_getIndexedParamValue;
Params.prototype.sendAjax               = Param_sendAjax;
Params.prototype.sendAjaxExt            = Param_sendAjaxExt;  
Params.prototype.openWindow             = Param_openWindow;    
Params.prototype.showWindow             = Param_showWindow;  
Params.prototype.setFormName            = Param_setFormName;
Params.prototype.fillForm               = Param_fillForm;
Params.prototype.getDataArray           = Param_getDataArray;
Params.prototype.addFieldValue          = Param_addFieldValue;
Params.prototype.getFieldValue          = Param_getFieldValue;
Params.prototype.init                   = Param_init;

function Params() {
    this.count  = 0;
    this.param  = new Array();
    this.paramx = new Array();
    this.ischeckform = true;
    this.init();
}
//初始化
function Param_init(){
if (window.parValues !=undefined && window.parValues!="" && window.parValues !='undefined')
{
        var parArrs = window.parValues.split("&");
        for (var j=0; j< parArrs.length; j++)
        {
	       var parArr = parArrs[j].split("=");
           this.addFieldValue(parArr[0],parArr[1]);               
        }
 }
}
function Params_add(param) {
    this.param[param.getName()]     = param;
    this.paramx[this.paramx.length] = param;
    this.count++;
}

function Params_addNew(name,value,type) {
    var param = new Param(name,value,type);
    this.param[param.getName()]     = param;
    this.paramx[this.paramx.length] = param;
    this.count++;
}

function Params_clear() {
    this.param  = new Array();
    this.paramx = new Array();
    this.count  = 0;
}
function Param_getNamedParamValue(sName) {
    if(this.param[sName]!=null)
    {
       var tmp = this.param[sName].value;
       if ( tmp == undefined )
        return null;
    }else
    {
      return null;
    }
    return tmp;
}
function Param_getNamedParam(sName) {
    return this.param[sName];
}
function Param_getCount() {
    return this.count;
}
function Param_getIndexedParam(iIndex) {
    return this.paramx[iIndex];
}
function Param_getIndexedParamValue(iIndex) {
    return this.paramx[iIndex].value;
}

function Param_openWindow(url,width,height,ext,retfunc) {
    return openModalDialog(url,width,height,this,ext,retfunc); 
}

function Param_showWindow(url,width,height,title,isroll,ismax) {
    return showDialog(url,width,height,title,isroll,ismax); 
}

function Param_sendAjax(execaction,execfunc,datagridid,refreshfunc) {
    if(!this.ischeckform) return false;
    this.dataobj= sendAjax(this,execaction,execfunc,datagridid,refreshfunc);
    return window.postResult;
}

function Param_sendAjaxExt(execaction,execfunc,datastr,datagridid,refreshfunc) {
    if(!this.ischeckform) return false;
    this.dataobj= sendAjaxExt(execaction,execfunc,datastr,this,datagridid,refreshfunc);
    return window.postResult;
}

function Param_setFormName(formname) {       
    this.ischeckform = packParaForm(formname,this);
}

function Param_fillForm(formname,rsname,isCode) {     
    jsonToParam(this,rsname,isCode);
    fillParaForm(formname,this);
}

function Param_getDataArray(fieldName,rsname,isCode) {     
	return getDataArray(this,rsname,fieldName,isCode);
}

function Param_addFieldValue(fieldname,fieldvalue) {
	if(this.getFieldValue(fieldname)!=null)
	{
		this.param[fieldname].value = fieldvalue;
	}else
	{
		this.addNew(fieldname,fieldvalue);
	}    
}

function Param_getFieldValue(fieldname) {     
    return this.getNamedParamValue(fieldname);
}

Param.prototype.name;
Param.prototype.value;
Param.prototype.type;
Param.prototype.getName  = Param_getName;
Param.prototype.getValue = Param_getValue;
Param.prototype.getType  = Param_getType;

function Param(name,value,type) {
    this.name  = name;
    this.value = value;
    this.type  = type;
}
function Param_getName() {
    return this.name;
}
function Param_getValue() {
    return this.value;
}
function Param_getType() {
    return this.type;
}

/********************************************************************************
 *
 *      文件名： datagrid.js
 *
 *      作  用： 数据列表控件
 *
 ********************************************************************************/

function DataGrid(gridID)
{	
    var dataGrid             = new Object(gridID);
    
    dataGrid.fgridID         = gridID;
    dataGrid.factionName     = "";
    dataGrid.fcompactMethod  = "";
	dataGrid.fsaveMethod     = "";
    dataGrid.fdeleteMethod   = "";
	dataGrid.fdeletefield    = "";	
	dataGrid.floadMethod     = "";
	dataGrid.frefreshMethod  = "";
	dataGrid.fwhereStr       = "";
	dataGrid.forderStr       = "";
	
	dataGrid.fextraPara      = "";
	dataGrid.factionUrl      = "";
	
	dataGrid.fprintActionname = "";
	dataGrid.fprintField      = "";
	
	dataGrid.paramsdg        = new Params();
    
	dataGrid.fcolumns        = [];
	dataGrid.fqueryParams    = {};
	dataGrid.frowdata        = "{}";
	
	dataGrid.fenuobj;
	dataGrid.setEnuType       = DataGrid_setEnuType;
	dataGrid.getEnuName       = DataGrid_getEnuName;

	dataGrid.init             = DataGrid_initDataGrid;
	dataGrid.setActionName    = DataGrid_setActionName;
    dataGrid.addFieldValue    = DataGrid_addFieldValue;
	dataGrid.getFieldValue    = DataGrid_getFieldValue;
	dataGrid.setFormName      = DataGrid_setFormName;
	dataGrid.postCheckedRows  = DataGrid_postCheckedRows;
	
	dataGrid.print            = DataGrid_print;
	dataGrid.excel            = DataGrid_excel;
	dataGrid.excelTemplate    = DataGrid_excelTemplate;
    
	dataGrid.setCompactMethod = DataGrid_CompactMethod;
	dataGrid.setSaveMethod    = DataGrid_setSaveMethod;
	dataGrid.setDeleteMethod  = DataGrid_DeleteMethod;   
	dataGrid.seLoadMethod     = DataGrid_seLoadMethod;
	dataGrid.setRefreshMethod = DataGrid_RefreshMethod;
	dataGrid.setWhereStr      = DataGrid_setWhereStr;
	dataGrid.setOrderStr      = DataGrid_setOrderStr;
	dataGrid.Refresh          = DataGrid_Refresh;
	
	dataGrid.initParams       = DataGrid_initParams;
		
	dataGrid.setExtPara       = DataGrid_setExtPara;
	dataGrid.setActionUrl     = DataGrid_setActionUrl;
	   
	dataGrid.setColumns       = DataGrid_setColumns;
	dataGrid.setRowdata       = DataGrid_setRowdata;
	dataGrid.setQueryParams   = DataGrid_setQueryParams;
	dataGrid.setButtons       = DataGrid_setButtons;
	dataGrid.getDbSelect      = DataGrid_getDbSelect;
	dataGrid.getFieldlabels   = DataGrid_getFieldlabels;
	dataGrid.getSelfButtons   = DataGrid_getSelfButtons;
	dataGrid.setSelfButtons   = DataGrid_setSelfButtons;
	dataGrid.refreshTreeGrid  = DataGrid_refreshTreeGrid;
	/*禁用浏览器右键菜单*/
    setContextMenuable(false);
    
    return dataGrid;
}

//初始化
function DataGrid_initDataGrid()
{  
    for ( var i = 0 ; i < this.paramsdg.getCount();i++) 
	{
	    var p = this.paramsdg.getIndexedParam(i);	     
	    //this.fextraPara += "&"+p.getName()+"="+p.getValue();
	    this.fqueryParams[p.getName()] = p.getValue();
	}
    
	$("#"+this.fgridID+"_tb").attr("editRow","undefined");
	
    $("#" + this.fgridID).datagrid({
      //从后台获取数据
      url: getAjaxUrl(this.factionName,this.floadMethod,this.fextraPara,this.factionUrl),//一个URL从远程站点请求数据
	  //向后台传递参数
      queryParams:this.fqueryParams,
	  //定义按钮
	  toolbar:"#"+this.fgridID+"_tb",//自定义按钮
	  columns:this.fcolumns,
	  onLoadSuccess: function(data){
		  modQueryState(false);
	  }  
    });
    
}

//设置会话
function DataGrid_setActionName(actionname)
{
  this.factionName = actionname;
}

//添加字段
function DataGrid_addFieldValue(name,value)
{
   this.paramsdg.addFieldValue(name,value);   
}

//获取字段值
function DataGrid_getFieldValue(name)
{
   return this.paramsdg.getFieldValue(name);
}
//设置表单
function DataGrid_setFormName(formname)
{
  this.paramsdg.setFormName(formname);   
}

//设置保存方法
function DataGrid_setSaveMethod(savemethod)
{
   this.fsaveMethod = savemethod;
}
//设置删除方法
function DataGrid_DeleteMethod(deletemethod,deletefield)
{
   this.fdeleteMethod = deletemethod;
   if(typeof(deletefield)!="undefined")
   {
     this.fdeletefield  = deletefield;
   } 
}
//设置打包方法
function DataGrid_CompactMethod(compactmethod)
{
   this.fcompactMethod = compactmethod;
}
//设置刷新方法
function DataGrid_RefreshMethod(refreshmethod)
{
   this.frefreshMethod = refreshmethod;
}
//设置加载方法
function DataGrid_seLoadMethod(loadmethod)
{
   this.floadMethod   =  loadmethod;
}
//设置条件语句
function DataGrid_setWhereStr(wherestr)
{
   this.fwhereStr   =  wherestr;
}
//设置排序语句
function DataGrid_setOrderStr(orderstr)
{
   this.forderStr   =  orderstr;
}
//设置附加参数
function DataGrid_setExtPara(extpara)
{
	this.fextraPara = extpara;
}
//设置会话路径
function DataGrid_setActionUrl(actionurl)
{
	this.factionUrl = actionurl;
}

//初始化参数列表
function DataGrid_initParams()
{
	this.paramsdg =new Params();
}

//数据列表刷新
function DataGrid_Refresh()
{  
   var jsonstr = {whstr:this.fwhereStr,orderstr:this.forderStr};
   
   for ( var i = 0 ; i < this.paramsdg.getCount();i++) 
   {
        var p = this.paramsdg.getIndexedParam(i);
        
        jsonstr[p.getName()] =  p.getValue();
   }
  
   if ($("#"+this.fgridID+"_tb"))
   {
        $("#"+this.fgridID+"_tb").attr("editRow","undefined");
   }

   $("#"+this.fgridID).datagrid('rejectChanges');
   $("#"+this.fgridID).datagrid('clearChecked');
   $("#"+this.fgridID).datagrid('clearSelections');
   $("#"+this.fgridID).datagrid("load", jsonstr);
   
   //正在查询时禁用查询按钮
   modQueryState(true);   
}

//设置显示列
function DataGrid_setColumns(columns)
{
   this.fcolumns   =  columns;
}
//设置添加行
function DataGrid_setRowdata(rowdata)
{
  this.frowdata   = rowdata;
}
//设置前台向后台传递参数
function DataGrid_setQueryParams(queryparams)
{
   this.fqueryParams   =  queryparams;
}

//获取下拉列表
function DataGrid_getDbSelect(mustinput,enutype,enusqlstr,limitnums,limitheight,cacheKey)
{       
	    var enunums = 0;
	    if(typeof(limitnums)=="undefined" || limitnums=="")
	    { 
	    	limitnums = 10;
	    }	
	    if(typeof(limitheight)=="undefined" || limitheight=="")
	    { 
	    	limitheight = 200;
	    }   
	    if(typeof(cacheKey)=="undefined" || cacheKey=="")
	    { 
	    	cacheKey = "";
	    }   
	    
	    if(enusqlstr==undefined && this.fenuobj!=undefined)
	    {   
	    	enunums = this.fenuobj[enutype].length;
	    	return {required:mustinput,
                 data:this.fenuobj[enutype],
                 //面板展开时触发
                 onShowPanel: function () {
                     // 动态调整高度  
                     if (enunums < limitnums) {  
                         $(this).combobox('panel').height("auto");  
                     }else{
                         $(this).combobox('panel').height(limitheight); 
                     }
                  },
                 valueField: 'id',
                 textField: 'name',
                 editable:false
                 };
	    }else
	    {
	    	return {required:mustinput,
                 url: getAjaxUrl("/st/controller/system/enu/EnuController","/getDbSelect","",""),
                 queryParams:{enutype:enutype,sqlstr:enusqlstr,cacheKey:cacheKey},
                 loadFilter: function(data){
                  enunums = data.enunums;
                  if(data.enuname)
                  {
                    return data.enuname;

                  }else
                  {
                    return data;
                  }
                 },
                 //面板展开时触发
                 onShowPanel: function () {
                     // 动态调整高度  
                     if (enunums < limitnums) {  
                         $(this).combobox('panel').height("auto");  
                     }else{
                         $(this).combobox('panel').height(limitheight); 
                     }
                  },
                 valueField: 'id',
                 textField: 'name',
                 editable:false
                 };
	    }
        
}

//设置枚举类型
function DataGrid_setEnuType(enuTypeStr,enuTypeSplit)
{  
	if(enuTypeSplit==undefined || enuTypeSplit=="")
    {
		enuTypeSplit = ",";
	}
	var paramEnu  = new Params();
	paramEnu.addFieldValue("enuTypeStr", enuTypeStr);
	paramEnu.addFieldValue("enuTypeSplit", enuTypeSplit);
	paramEnu.sendAjax("/st/controller/system/enu/EnuController", "/getDbSelectExt");
	this.fenuobj = paramEnu.dataobj;
}

//获取枚举名称
function DataGrid_getEnuName(enuType,enuValue)
{    
	if(this.fenuobj==undefined || this.fenuobj[enuType]==undefined)
    {
		return enuValue;
    }
	
	var jsonArr=this.fenuobj[enuType];
	for(var i=0;i<jsonArr.length;i++)
	{   
	     for(var key in jsonArr[i])
	     {  
	    	 if(key=="id" && jsonArr[i][key]==enuValue)
	    	 {
	    		 return jsonArr[i]["name"];
	    	 }
	     }
	}
}

//获取字段标识
function DataGrid_getFieldlabels(datagridid)
{   
	var fieldlabels = "";
	var opts        = $("#" + datagridid).datagrid('getColumnFields');   
    for(var i=0;i<opts.length;i++)
    {   
    	var opt=$("#" + datagridid).datagrid('getColumnOption',opts[i]);
    	
    	if(opt.title!=undefined)
    	{   
    		var fieldtype ="0";
    		if(opt.editor!=undefined)
    		{
    			fieldtype=opt.editor["type"];
    		}
    		if(fieldlabels!="")
    		{
    			fieldlabels = fieldlabels+";"+opt.field+","+opt.title+","+fieldtype;
    		}else
    		{
    			fieldlabels = opt.field+","+opt.title+","+fieldtype;
    		}
    		
    	}
    }
    return fieldlabels;
}

//设置按钮
function DataGrid_setButtons(buttons)
{  
   if(buttons!="")
   {  
	  var divtb = $("<div id=\""+this.fgridID+"_tb\" editRow=\"undefined\"></div>").appendTo($("body"));
      var buttonsArr = buttons.split(",");
      for(var i=0;i<buttonsArr.length;i++)
      {
       if(buttonsArr[i]=="default")
	   {  
	     var parastr = "";	     
	     for ( var m = 0 ; m < this.paramsdg.getCount();m++) 
         {
           var p = this.paramsdg.getIndexedParam(m);
        
           if(m==0)
           {   
            parastr = parastr+p.getName()+","+p.getValue();
          
           }else
           {
            parastr = parastr+";"+p.getName()+","+p.getValue();
           }
         }
   
          var divdtb   = $("<div class=\"btn-group btn-group-sm\"></div>").appendTo(divtb);
          $("<button type=\"button\" class=\"btn btn-primary\" onclick=\"DataGrid_insertRecord('"+this.fgridID+"',"+this.frowdata+")\">添加</button>").appendTo(divdtb);
          $("<button type=\"button\" class=\"btn btn-info\"    onclick=\"DataGrid_editRecord('"+this.fgridID+"')\">修改</button>").appendTo(divdtb);
          $("<button type=\"button\" class=\"btn btn-danger\"  onclick=\"DataGrid_deleteRecord('"+this.fgridID+"','"+this.factionName+"','"+this.fdeleteMethod+"','"+this.fdeletefield+"','"+this.frefreshMethod+"','"+parastr+"')\">删除</button>").appendTo(divdtb);
          $("<button type=\"button\" class=\"btn btn-warning\" onclick=\"DataGrid_cancelRecord('"+this.fgridID+"')\">撤销</button>").appendTo(divdtb);
	      $("<button type=\"button\" class=\"btn btn-success\" onclick=\"DataGrid_saveRecord('"+this.fgridID+"','"+this.factionName+"','"+this.fsaveMethod+"','"+this.frefreshMethod+"','"+parastr+"')\">保存</button>").appendTo(divdtb);
	   }else
	   {  
          var buttonArr  = buttonsArr[i].split("=");
		  var buttoncArr = buttonArr[1].split(";");
          if(buttoncArr.length<2)
		  {  
		     if(buttoncArr[0]=="print")
		     {
		       $("<button type=\"button\" class=\"btn btn-sm btn-info\" onclick=\"DataGrid_"+buttoncArr[0]+"('"+this.fgridID+"')\">"+buttonArr[0]+"</button>").appendTo(divtb);
		     }else
		     {
		       if(buttoncArr[0]=="excel"||buttoncArr[0]=="excelTemplate")
		       {
		          $("<button type=\"button\" class=\"btn btn-sm btn-info\" onclick=\"DataGrid_"+buttoncArr[0]+"('"+this.fgridID+"','"+this.fprintActionname+"','"+this.fwhereStr+"','"+this.forderStr+"','"+this.fprintField+"')\">"+buttonArr[0]+"</button>").appendTo(divtb);
		       }else
		       {
		          $("<button type=\"button\" class=\"btn btn-sm btn-primary\" onclick=\""+this.fgridID+"_"+buttoncArr[0]+"()\">"+buttonArr[0]+"</button>").appendTo(divtb);
		       }
		     }
             
		  }else
		  {  
		     if(buttoncArr[0]=="print")
		     {
		       $("<button type=\"button\" class=\""+buttoncArr[1]+"\" onclick=\"DataGrid_"+buttoncArr[0]+"('"+this.fgridID+"')\">"+buttonArr[0]+"</button>").appendTo(divtb);
		     }else
		     {
		       if(buttoncArr[0]=="excel"||buttoncArr[0]=="excelTemplate")
		       {
		          $("<button type=\"button\" class=\""+buttoncArr[1]+"\" onclick=\"DataGrid_"+buttoncArr[0]+"('"+this.fgridID+"','"+this.fprintActionname+"','"+this.fwhereStr+"','"+this.forderStr+"','"+this.fprintField+"')\">"+buttonArr[0]+"</button>").appendTo(divtb);
		       }else
		       {
		          $("<button type=\"button\" class=\""+buttoncArr[1]+"\" onclick=\""+this.fgridID+"_"+buttoncArr[0]+"()\">"+buttonArr[0]+"</button>").appendTo(divtb);
		       }
		     }
             
		  }
	   }      
      }

   }
   
}

//向后台提交选中的值
function DataGrid_postCheckedRows(fieldname)
{  
   this.paramsdg.addFieldValue("fieldlabels",DataGrid_getFieldlabels(this.fgridID));
   this.paramsdg.sendAjaxExt(this.factionName,this.fcompactMethod,getDataGridRowJson(this.fgridID,fieldname),"",this.frefreshMethod);
}

//添加
function DataGrid_insertRecord(datagridid,rowdata) {
	var params = new Params();
    var row = $("#" + datagridid).datagrid('getSelected');
    var index = 0;
    if (row != null) {
        index = $("#" + datagridid).datagrid('getRowIndex', row);
    }
    
    if ($("#"+datagridid+"_tb").attr("editRow")!='undefined') {
        if (!$("#" + datagridid).datagrid('validateRow', $("#"+datagridid+"_tb").attr("editRow"))) {
        return;
        };
        var index1  = $("#"+datagridid+"_tb").attr("editRow");
        var editors = $("#"+datagridid).datagrid('getEditors', index1); 
        for(var i=0;i<editors.length;i++)
        {              
            if(editors[i].type=="combobox")
            {  
            	if(this.fenuobj==undefined)
            	{               		
            		$("#"+datagridid).datagrid('getRows')[index1][editors[i].field+"name"] = $(editors[i].target).combobox('getText');       
            		$("#"+datagridid).datagrid('getRows')[index1][editors[i].field+"NAME"] = $(editors[i].target).combobox('getText');
            	}              
            }
        }
        $("#" + datagridid).datagrid('endEdit', $("#"+datagridid+"_tb").attr("editRow"));
        $("#"+datagridid+"_tb").attr("editRow","undefined");   
    }
	
    if ($("#"+datagridid+"_tb").attr("editRow")=='undefined') {

        if(isfireuserEvent(datagridid+"_beforeInsert"))
        {
			fireUserEvent(datagridid+"_beforeInsert",[params]);
        }
        params.addFieldValue("insert", "true");
        for ( var i = 0 ; i < params.getCount();i++) 
        {
          var p = params.getIndexedParam(i);        
          rowdata[p.getName()] =  p.getValue();
        }
        
        $("#" + datagridid).datagrid('insertRow', {index: index, row: rowdata});
        $("#" + datagridid).datagrid('beginEdit', index);
		$("#"+datagridid+"_tb").attr("editRow",index);
    }
}

//修改
function DataGrid_editRecord(datagridid) {
    
    var row = $("#" + datagridid).datagrid('getSelected');
    if (row != null) {
        
		if ($("#"+datagridid+"_tb").attr("editRow") != undefined && $("#"+datagridid+"_tb").attr("editRow")!='undefined') {
		    if (!$("#" + datagridid).datagrid('validateRow', $("#"+datagridid+"_tb").attr("editRow"))) {
              return;
            };
            var index1 = $("#"+datagridid+"_tb").attr("editRow");
            var editors = $("#"+datagridid).datagrid('getEditors', index1); 
            for(var i=0;i<editors.length;i++)
            {              
              if(editors[i].type=="combobox")
              {
            	  if(this.fenuobj==undefined)
            	  {
            		  $("#"+datagridid).datagrid('getRows')[index1][editors[i].field+"name"] = $(editors[i].target).combobox('getText');
            		  $("#"+datagridid).datagrid('getRows')[index1][editors[i].field+"NAME"] = $(editors[i].target).combobox('getText');
            	  }               
              }
            }
            $("#" + datagridid).datagrid('endEdit', $("#"+datagridid+"_tb").attr("editRow"));
            $("#"+datagridid+"_tb").attr("editRow","undefined");  

        }

        if ($("#"+datagridid+"_tb").attr("editRow") == undefined || $("#"+datagridid+"_tb").attr("editRow")=='undefined') {
            var index = $("#" + datagridid).datagrid('getRowIndex', row);
            $("#" + datagridid).datagrid('beginEdit', index);
            $("#"+datagridid+"_tb").attr("editRow",index);
            $("#" + datagridid).datagrid('unselectAll');
        }
    }
}
//删除
function DataGrid_deleteRecord(datagridid,actionname,delmethodname,delfieldname,refreshmethodname,parastr) {

    if($("#"+datagridid).datagrid('getChecked').length<1)
    {
        $.messager.alert('提示','请选择记录!','warning');
        return;
    }
    
    $.messager.confirm('提示', '确认删除?', function (r) {
        if (r){
	    var params = new Params();		   
        var parArrs = parastr.split(";");
        for (var i=0; i< parArrs.length; i++)
        {
	      var parArr = parArrs[i].split(",");               
          params.addFieldValue(parArr[0],parArr[1]); 
        }
        if(isfireuserEvent(datagridid+"_beforeDelete"))
        {
			fireUserEvent(datagridid+"_beforeDelete",[params]);
        }
        params.addFieldValue("fieldlabels",DataGrid_getFieldlabels(datagridid));
        params.sendAjaxExt(actionname, delmethodname, getDataGridRowJson(datagridid, delfieldname),"",refreshmethodname);
	   }
    });
}

//撤销
function DataGrid_cancelRecord(datagridid) {
	$("#"+datagridid+"_tb").attr("editRow","undefined");
    $("#" + datagridid).datagrid('rejectChanges');
    $("#" + datagridid).datagrid('unselectAll');

}

//保存
function DataGrid_saveRecord(datagridid,actionname,savemethodname,refreshmethodname,parastr) {
    
    $("#" + datagridid).datagrid('endEdit', $("#"+datagridid+"_tb").attr("editRow")); 
    if (!$("#" + datagridid).datagrid('validateRow', $("#"+datagridid+"_tb").attr("editRow"))) {
        return;
    }      
    var params = new Params();
    var parArrs = parastr.split(";");
    for (var i=0; i< parArrs.length; i++)
    {
	   var parArr = parArrs[i].split(",");               
       params.addFieldValue(parArr[0],parArr[1]); 
    }
    
    if(isfireuserEvent(datagridid+"_beforeSave"))
    {
		fireUserEvent(datagridid+"_beforeSave",[params]);
    }  
    
    params.addFieldValue("fieldlabels",DataGrid_getFieldlabels(datagridid));
    
    params.sendAjaxExt(actionname, savemethodname, getDataGridRowJson(datagridid, "", true),"",refreshmethodname);
	
}

//设置打印
function DataGrid_print(fgridID)
{
  createFormPage(fgridID);
}

//设置打印
function DataGrid_excel(datagridid,actionname,whstr,orderstr,printfield)
{
	if($("#"+datagridid).datagrid("getRows").length<1)
	{ 
	   $.messager.alert('提示','无数据!','warning'); 
	   return;
	}
	var rows = $("#"+datagridid).datagrid('getChecked');
	if(rows.length>1)
	{
		callAjax("/excel","{\"excel\":"+JsonToStr($("#" + datagridid).datagrid('getData').excel)+",\"rows\":"+getDataGridRowJson(datagridid)+"}",true,function(data){
			window.open(data.excel);
		});
	}else
	{
		callAjax("/excel",JsonToStr($("#" + datagridid).datagrid('getData')),true,function(data){
			window.open(data.excel);
		});
	}
}

//设置打印
function DataGrid_excelTemplate(datagridid,actionname,whstr,orderstr,printfield)
{
	if($("#"+datagridid).datagrid("getRows").length<1)
	{
		$.messager.alert('提示','无数据!','warning');
		return;
	}
	var rows = $("#"+datagridid).datagrid('getChecked');
	if(rows.length>1)
	{
		callAjax("/excelTemplate","{\"offerid\":\""+datagridid+"\",\"excel\":"+JsonToStr($("#" + datagridid).datagrid('getData').excel)+",\"rows\":"+getDataGridRowJson(datagridid)+"}",true,function(data){
			window.open(data.excel);
		});
	}else
	{
		callAjax("/excelTemplate","{\"offerid\":\""+datagridid+"\",\"excel\":"+JsonToStr($("#" + datagridid).datagrid('getData').excel)+",\"rows\":"+JsonToStr($("#" + datagridid).datagrid('getData').rows)+"}",true,function(data){
			window.open(data.excel);
		});
	}
}
//获取自定义按钮
function DataGrid_getSelfButtons(fgridID1)
{   
	if(fgridID1==undefined)
	{
		fgridID1 = this.fgridID;
	}
	return "#"+fgridID1+"_tb";
}
//设置自定义按钮
function DataGrid_setSelfButtons(buttons,fgridID1)
{  
   if(buttons!="")
   {  
	  if(fgridID1==undefined)
	  {
		 fgridID1 = this.fgridID;
	  }
	  var divtb      = $("<div id=\""+fgridID1+"_tb\"></div>").appendTo($("body"));      
      var buttonsArr = buttons.split(",");
      for(var i=0;i<buttonsArr.length;i++)
      {
    	  var buttonArr  = buttonsArr[i].split("=");
		  var buttoncArr = buttonArr[1].split(";");
          if(buttoncArr.length<2)
		  {  
        	  $("<button type=\"button\" class=\"btn btn-sm btn-primary\" onclick=\""+fgridID1+"_"+buttoncArr[0]+"()\">"+buttonArr[0]+"</button>").appendTo(divtb);             
		  }else
		  {  
			  $("<button type=\"button\" class=\""+buttoncArr[1]+"\" onclick=\""+fgridID1+"_"+buttoncArr[0]+"()\">"+buttonArr[0]+"</button>").appendTo(divtb);
		  }    
      }
   }   
}

/** 
 * 扩展树表格级联勾选方法： 
 * @param {Object} container 
 * @param {Object} options 
 * @return {TypeName}  
 */  
$.extend($.fn.treegrid.methods,{  
    /** 
     * 级联选择 
     * @param {Object} target 
     * @param {Object} param  
     *      param包括两个参数: 
     *          id:勾选的节点ID 
     *          deepCascade:是否深度级联 
     * @return {TypeName}  
     */  
    cascadeCheck : function(target,param){  
        var opts = $.data(target[0], "treegrid").options;  
        if(opts.singleSelect)  
            return;  
        var idField = opts.idField;//这里的idField其实就是API里方法的id参数  
        var status = false;//用来标记当前节点的状态，true:勾选，false:未勾选  
        var selectNodes = $(target).treegrid('getSelections');//获取当前选中项  
        for(var i=0;i<selectNodes.length;i++){  
            if(selectNodes[i][idField]==param.id)  
                status = true;  
        }  
        //级联选择父节点  
        selectParent(target[0],param.id,idField,status);  
        selectChildren(target[0],param.id,idField,param.deepCascade,status);  
        /** 
         * 级联选择父节点 
         * @param {Object} target 
         * @param {Object} id 节点ID 
         * @param {Object} status 节点状态，true:勾选，false:未勾选 
         * @return {TypeName}  
         */  
        function selectParent(target,id,idField,status){  
            var parent = $(target).treegrid('getParent',id);  
            if(parent){  
                var parentId = parent[idField];  
                if(status)  
                    $(target).treegrid('select',parentId);  
                else  
                    $(target).treegrid('unselect',parentId);  
                selectParent(target,parentId,idField,status);  
            }  
        }  
        /** 
         * 级联选择子节点 
         * @param {Object} target 
         * @param {Object} id 节点ID 
         * @param {Object} deepCascade 是否深度级联 
         * @param {Object} status 节点状态，true:勾选，false:未勾选 
         * @return {TypeName}  
         */  
        function selectChildren(target,id,idField,deepCascade,status){  
            //深度级联时先展开节点  
            if(!status&&deepCascade)  
               $(target).treegrid('expand',id);  
            //根据ID获取下层孩子节点  
            var children = $(target).treegrid('getChildren',id);  
            for(var i=0;i<children.length;i++){  
                var childId = children[i][idField];  
                if(status)  
                    $(target).treegrid('select',childId);  
                else  
                    $(target).treegrid('unselect',childId);  
                selectChildren(target,childId,idField,deepCascade,status);//递归选择子节点  
            }  
        }  
    }  
});  
//刷新treegrid
function DataGrid_refreshTreeGrid(parajson)
{     
	  var jsonstr = parajson;
	
	  if(jsonstr==undefined)
	  { 
		 jsonstr = {whstr:this.fwhereStr,orderstr:this.forderStr};
	  }
	  
	  for ( var i = 0 ; i < this.paramsdg.getCount();i++) 
	  {
	        var p = this.paramsdg.getIndexedParam(i);
	        
	        jsonstr[p.getName()] =  p.getValue();
	  }
	  
	   $("#"+this.fgridID).treegrid('clearChecked');
	   $("#"+this.fgridID).treegrid('clearSelections');
	   $("#"+this.fgridID).treegrid("load", jsonstr);
}
/********************************************************************************
 *
 *      文件名： treeControl.js
 *
 *      作  用： 树控件
 *
 ********************************************************************************/

function TreeControl(treeid)
{	
    var treeControl   = new Object(treeid);
    
    treeControl.treeid          = treeid;
    treeControl.factionName     = "";
    treeControl.fcompactMethod  = "";
	treeControl.floadMethod     = "";
	treeControl.frefreshMethod  = "";
	treeControl.fwhereStr       = "";
	treeControl.forderStr       = "";
	
	treeControl.paramstc        = new Params();
    
	treeControl.fqueryParams;
	treeControl.fcheckbox       = false;

	treeControl.init             = TreeControl_initTree;
	treeControl.setActionName    = TreeControl_setActionName;
    treeControl.addFieldValue    = TreeControl_addFieldValue;
	treeControl.getFieldValue    = TreeControl_getFieldValue;
	treeControl.setFormName      = TreeControl_setFormName;
	treeControl.postData         = TreeControl_postData;
	
	treeControl.setCompactMethod = TreeControl_CompactMethod;
	treeControl.seLoadMethod     = TreeControl_seLoadMethod;
	treeControl.setRefreshMethod = TreeControl_RefreshMethod;
	treeControl.setWhereStr      = TreeControl_setWhereStr;
	treeControl.setOrderStr      = TreeControl_setOrderStr;
	treeControl.Refresh          = TreeControl_Refresh;
	   
	treeControl.setQueryParams     = TreeControl_setQueryParams;
	treeControl.setCheckBox        = TreeControl_setCheckBox;
	treeControl.getCheckedTreeNode = TreeControl_getCheckedTreeNode;
	
	/*禁用浏览器右键菜单*/
    setContextMenuable(false);
    
    return treeControl;

}

//初始化
function TreeControl_initTree()
{  
   $("#"+this.treeid).tree({
      //从后台获取数据
      url: getAjaxUrl(this.factionName,this.floadMethod),//一个URL从远程站点请求数据
      checkbox:this.fcheckbox,
	  //向后台传递参数
      queryParams:this.fqueryParams
    });
    
}

//设置会话
function TreeControl_setActionName(actionname)
{
  this.factionName = actionname;
}

//添加字段
function TreeControl_addFieldValue(name,value)
{
   this.paramstc.addFieldValue(name,value);   
}

//获取字段值
function TreeControl_getFieldValue(name)
{
   return this.paramstc.getFieldValue(name);
}
//设置表单
function TreeControl_setFormName(formname)
{
  this.paramstc.setFormName(formname);   
}

//设置打包方法
function TreeControl_CompactMethod(compactmethod)
{
   this.fcompactMethod = compactmethod;
}
//设置刷新方法
function TreeControl_RefreshMethod(refreshmethod)
{
   this.frefreshMethod = refreshmethod;
}
//设置加载方法
function TreeControl_seLoadMethod(loadmethod)
{
   this.floadMethod   =  loadmethod;
}
//设置条件语句
function TreeControl_setWhereStr(wherestr)
{
   this.fwhereStr   =  wherestr;
}
//设置排序语句
function TreeControl_setOrderStr(orderstr)
{
   this.forderStr   =  orderstr;
}
//刷新
function TreeControl_Refresh()
{  
   this.init();  
}

//设置前台向后台传递参数
function TreeControl_setQueryParams(queryparams)
{
   this.fqueryParams   =  queryparams;
}

//设置是否显示复选框
function TreeControl_setCheckBox(checkbox)
{
   this.fcheckbox   =  checkbox;
}

//向后台提交选中的值
function TreeControl_postData(fieldname)
{  
   this.paramstc.sendAjax(this.factionName,this.fcompactMethod,"",this.frefreshMethod);
}
//获取选中的树节点
function TreeControl_getCheckedTreeNode(splits)
{
  return getCheckedTreeNode(this.treeid,splits);
}

//获取选中的树节点
function getCheckedTreeNode(treeid,splits)
{  
   var nodeids = "";
   var nodes = $("#"+treeid).tree('getChecked');
   
   if(splits==undefined || typeof(splits)==undefined || splits==null || splits=="")
   {
     splits = ";";
   }
   
   for(var i=0;i<nodes.length;i++)
   { 
     
     if(nodeids!="")
     {
       nodeids = nodeids+";"+nodes[i].id;
     }else
     {
       nodeids = nodes[i].id;
     }
  
   }
  
   return nodeids;
}

//禁用查询按钮
function modQueryState(state) {
	for ( var i = 0; i < document.all.length; i++) {
		var element = document.all[i];
		if (element.type == "button") {
			var elevalue = $(element).text();
			var valmod = "";
			for (var j = 0; j < elevalue.length; j++) {
				if (elevalue.charAt(j) != " " && elevalue.charAt(j) != "　")
					valmod += elevalue.charAt(j);
			}
			if (valmod == "查询" || valmod == "查找" || valmod == "重置") {
				element.disabled = state;
			}
		}
	}
}

//调用ajax
function callAjax(reqUrl,jsonStr,isAsync,funcName)
{   
	if(isAsync==undefined ||  typeof(isAsync)==undefined || isAsync=="")
	{
		isAsync = false;
	}
	console.log("请求参数："+jsonStr);
	var dataObj = {};
	$.ajax({
        url: reqUrl,
        type: "POST",
        contentType: "application/json",
        async: isAsync,//改为同步方式       
        data: jsonStr,
        cache: false,
        dataType:"json",
        success: function (data) {      
        dataObj = data;
			if(isAsync)
			{
				fireUserEvent(funcName,data);
			}
        },
        error: function (data) {
        	dataObj["result"] = "0";
        	dataObj["desc"]   = data["responseText"];
        }
  });
	console.log("返回数据："+JsonToStr(dataObj));
	return dataObj;
}

//取得地址栏参数
function getUrlParam(){
	var str=location.href;
	var num=str.indexOf("?");
	if(num>-1){
		return str.substr(num+1);
	}else{
		return "";
	}
}

//地址级联
function linkAddr(name)
{   
	if(name=="country")
    {   
		refresh_select("province", "select id,name from ptaddress where parentid='"+$("#country").val()+"' order by name","","");
		
	}
	if(name=="province")
    {
		refresh_select("city", "select id,name from ptaddress where parentid='"+$("#province").val()+"' order by name","","");
	}
	if(name=="city")
    {
		refresh_select("district", "select id,name from ptaddress where parentid='"+$("#city").val()+"' order by name","","");
	}
}
