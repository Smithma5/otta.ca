window.reset = function (e)
{
    e.wrap('<form>').closest('form').get(0).reset();
    e.unwrap();
}

function removeFileFromForm(fileFieldID)
{
	reset($("#attachment_" + fileFieldID));
	$("#attachment_size_label_" + fileFieldID).html("");
	$("#attachment_status_label_" + fileFieldID).html("");
	$("#attachment_remove_label_" + fileFieldID).html("");
	$("#attachment_client_side_file_name_" + fileFieldID).val("");
}

function validateFileParameters(safeFormID, fileFieldID, allowedExtensions, byteLimit)
{
	$("#attachment_" + fileFieldID).each(function(key, value)
	{
		if ($(this).val().length > 0)
		{
			var ext = $(this).val().substr($(this).val().lastIndexOf('.') + 1);
			var client_side_file_name = $(this).val();
			var extension_array = allowedExtensions.split(",");
			var size_accepted = 0;
			var ext_accepted = 0;

			// Validate the file extension
			for (var i = 0; i < extension_array.length; i++)
			{
				if(extension_array[i].toLowerCase() == ext.toLowerCase())
				{
					$("#attachment_size_label_" + fileFieldID).html(parseInt(this.files[0].size / 1024) + " KB");
					$("#attachment_remove_label_" + fileFieldID).html("<a href='javascript:void(0)' onclick='removeFileFromForm(\"" + fileFieldID + "\");\'>remove</a>");

					ext_accepted = 1;
					break;
				}
			}

			// Validate the individual file size against the maximum form submit file size limit
			if(this.files[0].size <= byteLimit)
			{
				size_accepted = 1;
			}

			if (!ext_accepted)
			{
				removeFileFromForm(fileFieldID);
				$("#attachment_size_label_" + fileFieldID).html("");
				$("#attachment_status_label_" + fileFieldID).addClass("error");
				$("#attachment_status_label_" + fileFieldID).html("That file type is not allowed for this field.<br>The file has been removed.<br>You may select a new file or <a href='javascript:void(0)' onclick='removeFileFromForm(\"" + fileFieldID + "\");\'>remove this error.</a>");
			}
			else if (!size_accepted)
			{
				removeFileFromForm(fileFieldID);
				$("#attachment_size_label_" + fileFieldID).html("");
				$("#attachment_status_label_" + fileFieldID).addClass("error");
				$("#attachment_status_label_" + fileFieldID).html("That file size exceeds the limit for this form.<br>The file has been removed.<br>Please select a new file to continue.");
			}
			else
			{
				$("#attachment_client_side_file_name_" + fileFieldID).val(client_side_file_name);
				$("#attachment_status_label_" + fileFieldID).removeClass("error");
				$("#attachment_status_label_" + fileFieldID).html("File is ready for upload.");
			}

			// Display status row
			$("#attachment_status_row_" + fileFieldID).show();

		}
	});
}