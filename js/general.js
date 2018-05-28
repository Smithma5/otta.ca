function HandleLoad()
{
	oConveyor.InitSlideShow("divSlideShow");
	oConveyor.fillup(oConveyor);

	SwitchPhoneLink();

	HandleLoad2(); //page specific
}

function SwitchPhoneLink()
{
	if (IsSmartPhone())
		document.getElementById("aPhone").style.visibility = "visible";
	else
		document.getElementById("aPhone").style.visibility = "hidden";

}

function IsSmartPhone()
{
	var ua = navigator.userAgent.toLowerCase();

	if (ua.indexOf("android") > -1)
		return true;

	if (ua.indexOf("iphone") > -1)
		return true;

	if (ua.indexOf("blackberry") > -1)
		return true;

	if (ua.indexOf("windows ce") > -1)
		return true;

	return false;
}

function ShowReturn()
{
	var sA;
	sA = "<a href='javascript:history.back()'> ";
	sA = sA + "	<img alt='Back' border=0 ";
	sA = sA + "	src='images/back_off.gif'></a> ";
	document.write(sA);
}

function generateWindowsMediaPlayer(
	holderId,   // String
	height,     // Number
	width,      // Number
	videoUrl    // String
	// you can declare more arguments for more flexibility
	) {
	var holder = document.getElementById(holderId);

	var player = '<object ';
	player += 'height="' + height.toString() + '" ';
	player += 'width="' + width.toString() + '" ';

	if (navigator.userAgent.indexOf("MSIE") < 0) {
		// Chrome, Firefox, Opera, Safari
		player += 'type="application/x-ms-wmp" ';
		//player += 'autoStart="0" ';
		player += 'data="' + videoUrl + '" >';
	}
	else {
		// Internet Explorer
		player += 'classid="clsid:6BF52A52-394A-11d3-B153-00C04F79FAA6" >';
		player += '<param name="url" value="' + videoUrl + '" />';
	}

	//player += '<param name="autoStart" value="false" />';
	player += '<param name="playCount" value="1" />';
	player += '</object>';

	holder.innerHTML = player;
}

function PlayVideo(sVideo)
{
	window.addEventListener('load', generateWindowsMediaPlayer('wmpHolder', 240, 320, sVideo));
}

