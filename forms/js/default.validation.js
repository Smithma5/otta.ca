function ww_fb_validateForm(safeFormID)
{
	var returnVal = true;
	var alertMsg = "";

	$("#ww_fb_form_" + safeFormID).find(".text_box, .text_area, .select, .grouped_elements, .file_upload").each(function(index)
	{
		var elementValidationCount = 0;

		// Get the current value of the element or the value of the selected element in grouped elements.
		var theValue = "";
		if ($(this).hasClass("grouped_elements") == true)
		{
			theValue = $(this).find(".group_member:checked").val();

			if (typeof theValue === "undefined")
			{
				theValue = "";
			}
		}
		else
		{
			if ($(this).hasClass("select"))
			{
				// Get the currently selected value from a <select> element.
				theValue = $(this).val();
			}
			else
			{
				// Trim trailing spaces from text box and text area values.
				// NOTE: leading spaces get posted, but trailing do not. Hence the absence of $.trim().
				theValue = $(this).val().replace(/ +$/,'');
			}
		}

		// Validate required controls
		if ($(this).hasClass("required") == true)
		{
			var validationFailureMsg  = $(this).attr("validationFailureMsg");

			if (typeof validationFailureMsg === "undefined")
			{
				var validationFailureMsg = ""
			}

			if (validationFailureMsg == "undefined")
			{
				var validationFailureMsg = ""
			}







			if ($(this).hasClass("file_upload"))
			{
				var requiredNumberOfFiles = $(this).attr("maximumElements");
				var safeFileFieldID = $(this).attr("safeFileFieldID");
				var numberOfFilesSelected = 0;
				$(".attachment_client_side_file_name_" + safeFileFieldID).each(function()
				{
					if ($(this).val() != "")
					{
						numberOfFilesSelected++;
					}
				});

				if (numberOfFilesSelected < requiredNumberOfFiles)
				{
					alertMsg += validationFailureMsg + "\n";
				}
			}
			else
			{
				if (theValue == "")
				{
					elementValidationCount++;

					if ($(this).hasClass("captcha") == true)
					{
						alertMsg += "\n\n";
					}
					alertMsg += validationFailureMsg + "\n";
				}
			}

		}

		// Validate maximum length
		if ($(this).hasClass("validateLength") == true)
		{
			var thisLabel = decodeURIComponent($(this).attr("elementLabel"));
			var thisMaximumCharacters = parseInt($(this).attr("maximumCharacters"));
			var validationFailureMsg = "The length of the \'" + thisLabel + "\' field exceeds the maximum number of allowed characters (" + thisMaximumCharacters + ").";

			if (theValue.length > thisMaximumCharacters)
			{
				elementValidationCount++;
				alertMsg += validationFailureMsg + "\n";
			}
		}

		if ($(this).hasClass("secret") == true && $(this).hasClass("validation") == true)
		{
			var parentID = $(this).attr("parentID");
			var parentValue = $("#" + parentID).val().replace(/ +$/,'');
			var secondaryValidationFailureMsg = decodeURIComponent($(this).attr("validationFailureMsg"));

			if (theValue != parentValue)
			{
				elementValidationCount++;

				alertMsg += secondaryValidationFailureMsg + "\n";
			}
		}

		if ($(this).hasClass("email") == true)
		{
			if (wwValidateEmailAddress($(this).val()) == false && elementValidationCount == 0)
			{
				var validationFailureMsg = decodeURIComponent($(this).attr("validationFailureMsg"));
				if (typeof validationFailureMsg === "undefined")
				{
					var validationFailureMsg = ""
				}

				if (validationFailureMsg == "undefined")
				{
					var validationFailureMsg = ""
				}


				alertMsg += validationFailureMsg + "\n";
			}
		}
	});

	// Validate byte size limit of all file fields combined
	var formMaximumBytes = $("#formByteLimit_" + safeFormID).val();
	var formTotalBytes = 0;

	$("#ww_fb_form_" + safeFormID + ' input:file').each(function(key, value)
	{
		if (this.files[0] !== 'undefined' && this.files.length == 1)
		{
			formTotalBytes += this.files[0].size;
		}
	});

	if (formTotalBytes > formMaximumBytes)
	{
		var humanReadableFormTotalSize = formTotalBytes / 1024;
		if (humanReadableFormTotalSize > 1024)
		{
			humanReadableFormTotalSize = Math.round(humanReadableFormTotalSize / 1024) + " MB";
		}
		else
		{
			humanReadableFormTotalSize = Math.round(humanReadableFormTotalSize) + " KB";
		}

		var humanReadableMaximumSize = formMaximumBytes / 1024;
		if (humanReadableMaximumSize > 1024)
		{
			humanReadableMaximumSize = Math.round(humanReadableMaximumSize / 1024) + " MB";
		}
		else
		{
			humanReadableMaximumSize = Math.round(humanReadableMaximumSize) + " KB";
		}

		alertMsg += "You are attempting to upload " + humanReadableFormTotalSize + " of files which exceeds the limit of " + humanReadableMaximumSize + " for this form. Please remove some files and try again.\n";
	}

	// Validate that all file uploads are not in an error state (max 1 error displayed per file group)
	var fileUploadErrorStates = [];
	$(".attachment_status_cell label.error").each(function()
	{
		var safeFileFieldID = $(this).attr("safeFileFieldID");
		var thisLabel = decodeURIComponent($("input[safeFileFieldID='" + safeFileFieldID + "']").attr("elementLabel"));
		fileUploadErrorStates[safeFileFieldID] = "'" + thisLabel + "' contains at least one file upload that is in an error state. Please correct the error and try again.\n";
	});

	for (var key in fileUploadErrorStates)
	{
		alertMsg += fileUploadErrorStates[key];
	}

	if (alertMsg.trim() != "")
	{
		alertMsg = decodeURIComponent(alertMsg);

		returnVal = false;
		alert(alertMsg);
	}

	return returnVal;
}