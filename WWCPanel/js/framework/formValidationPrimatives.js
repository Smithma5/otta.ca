//
// NOTES: (ToDo: to be removed once code verified)
// wwValidWindowsFolderNameRegEx adopted from following URL: http://stackoverflow.com/questions/3881297/regexp-for-clean-file-and-folder-names
// wwValidateEmailAddressRegEx adopted from following URL: http://stackoverflow.com/questions/2855865/jquery-validate-e-mail-address-wwRegEx
// ToDo: implement multi-language character support: http://www.hanselman.com/blog/InternationalizedRegularExpressions.aspx
// var wwValidWindowsFolderNameRegEx = /^[ ,ÀÈÌÒÙàèìòùÁÉÍÓÚİáéíóúıÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜŸäëïöüŸ¡¿çÇŒœßØøÅåÆæŞşĞğ\'!;\$@~`\[\]{}\(\)\w.-]+$/;
// var wwValidWindowsFileNameRegEx = /^[ ,ÀÈÌÒÙàèìòùÁÉÍÓÚİáéíóúıÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜŸäëïöüŸ¡¿çÇŒœßØøÅåÆæŞşĞğ\'!;\$@~`\[\]{}\(\)\w.-]+$/;
//
// ToDo: Determine if we want to support the # (pound/hash) symbol and % (percent) symbol. They are valid windows folder/file names, but will cause issues with CF URLs, forcing us to URL encode all /userContent/ paths.

// REGULAR EXPRESSIONS COLLECTION
var wwPositiveIntegerRegEx = "^[0-9]*$";
var wwPositiveFloatingPointRegEx = "[0-9]*\.?[0-9]+$";
var wwValidDollarAmountRegEx = /^\-?\(?\$?\s*\-?\s*\(?(((\d{1,3}((\,\d{3})*|\d*))?(\.\d{0,2})?)|((\d{1,3}((\,\d{3})*|\d*))(\.\d{0,2})?))\)?$/;
var wwValidWindowsFolderNameRegEx = /^[ ,\'&!;\$@~\[\]{}\(\)\w.-]+$/;
var wwValidWindowsFileNameRegEx = /^[ ,\'&!;\$@~\[\]{}\(\)\w.-]+$/;
var wwSplitEmailAddressesRegEx = ",\s*";
//var wwValidateEmailAddressRegEx = /^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i;
//var wwValidateEmailAddressRegEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum|realtor)\b/; // '
var wwValidateEmailAddressRegEx = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,14})?$/;
var wwValidSitePreferenceKeyRegEx = /^[a-z0-9 _]+$/i;
var wwValidPhoneNumberRegEx = /^[0-9 \-\(\)x]+$/i;
var wwValidAlphaNumericCommaSpaceRegEx = /^[\w, ]*$/i;
var wwValidDateDDMMYYYY = /^\d\d?\/\d\d?\/\d\d\d\d$/;

function wwDoRegExComparison(wwValue, wwRegEx)
{
	var wwRegExTester = new RegExp(wwRegEx);
	return wwRegExTester.test(wwValue);
}

function wwValidateEmailAddress(wwEmailAddress)
{
	return wwDoRegExComparison(wwEmailAddress, wwValidateEmailAddressRegEx);
}


function wwElementExists(wwElement)
{
	return wwElement.length != 0;
}

function wwGetUrlParameterByName(wwParamName)
{
	wwParamName = wwParamName.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var wwRegExS = "[\\?&]" + wwParamName + "=([^&#]*)";
	var wwRegEx = new RegExp(wwRegExS);
	var wwResult = wwRegEx.exec(window.location.href);
	if (wwResult == null)
		return "";
	else
		return decodeURIComponent(wwResult[1].replace(/\+/g, " "));
}

function wwStringEndsWith(wwStr, wwSuffix)
{
	var wwLowerStr = wwStr.toLowerCase();
	var wwLowerSuffix = wwSuffix.toLowerCase();

    return wwLowerStr.indexOf(wwLowerSuffix, wwLowerStr.length - wwLowerSuffix.length) !== -1;
}