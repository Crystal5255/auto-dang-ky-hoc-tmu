  /**
	*************************************************************
	*	Tool Auto Đăng Nhập TMU  								*
	*	Author: Nguyen Linh UET									*
	*	Facebook: https://www.facebook.com/kenny.nguyen.153		*
	*************************************************************
   */

var loginButton;
var userLbl;
var passLbl;
function getVarLogin(){
	loginButton = document.getElementById("cphmp_01_LoginButton");
	userLbl = 	document.getElementById("cphmp_01_UserName");
	passLbl = document.getElementById("cphmp_01_Password");
	showSaveUser();
}

function showSaveUser(){
	if(localStorage.getItem("userKey")==null){
		alert("Bạn chưa lưu tài khoản để thực hiện auto đăng nhập, nhấn nút lưu tài khoản cạnh nút đăng nhập!");
		if(loginButton!=null){
			var luuTaiKhoan = document.createElement("input");
			luuTaiKhoan.value = "Lưu tài khoản";
			luuTaiKhoan.setAttribute("style","color:#1C5E55;background-color:White;border-color:#C5BBAF;border-width:1px;border-style:Solid;font-family:Verdana;font-size:0.8em;");
			luuTaiKhoan.setAttribute("onclick","saveUser();");
			luuTaiKhoan.setAttribute("type","submit");
			
			//Add button before checkbox
			loginButton.parentNode.prepend(luuTaiKhoan);
			setLoginAction();
		}
	}
	else{
		autoLogin();
	}
}

function saveUser(){
	if(userLbl.value.trim()!=""&&passLbl.value.trim()!=""){
		localStorage.setItem("userKey",userLbl.value);
		localStorage.setItem("passKey",passLbl.value);
		alert("Đã lưu tài khoản và mật khẩu! Chỉ sử dụng được ở cửa sổ này!");
		autoLogin();
	}else{
		alert("Không được để trống tài khoản và mật khẩu");
	}
}


function autoLogin(){		
	try{
		setTimeout(function(){
			userLbl.value = localStorage.getItem("userKey");
			passLbl.value = localStorage.getItem("passKey");
			loginButton.click();
		},200);
	}
	catch(err){
	}
}

function setLoginAction(){
	try{
		loginButton.addEventListener("click", function(){
			 saveUser();
		});
	}
	catch(err){
	}
}

function setLogoutAction(logoutBtn){
	try{
		logoutBtn.addEventListener("click", function(){
			localStorage.removeItem("userKey");
			localStorage.removeItem("passKey");
			localStorage.removeItem("sentDK");
		});
	}
	catch(err){
	}
}
if(window.location.href.includes("delete")){
	localStorage.removeItem("userKey");
	localStorage.removeItem("passKey");
	localStorage.removeItem("sentDK");
}
else if(localStorage.getItem("sentDK")==null){
	if(document.getElementsByTagName("body")[0].outerText.includes("unavailable"))
		setTimeout(function(){location.reload();}, 1500); // reload nếu server quá tải
	else if(window.location.href.includes("DangNhap")){
		getVarLogin();
	}
	else if (document.getElementById("lbLogOut")!=null){
		//Đang ở trang có nút đăng xuất -> trang sinh viên,... -> chuyển sang trang đăng kí
			window.open("http://dangky.tmu.edu.vn/dangkyhoc.aspx","_blank"); // mở trang đăng ký
			setLogoutAction(document.getElementById("lbLogOut"));
	}
	else if(!window.location.href.includes("dangkyhoc")&&document.getElementById("lblHoTen")==null)
		window.location.href = 'http://dangky.tmu.edu.vn/DangNhap.aspx';
	else if(window.location.href.includes("dangkyhoc"))
		document.getElementById("ctl03_btnDangKy").setAttribute("onclick","localStorage.setItem(\"sentDK\",true);");
}
else if (document.getElementById("lbLogOut")!=null){
	//Đang ở trang có nút đăng xuất -> trang sinh viên,... -> chuyển sang trang đăng kí
	setLogoutAction(document.getElementById("lbLogOut"));
}
