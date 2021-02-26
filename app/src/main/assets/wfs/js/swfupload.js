
var SWFUpload;
void 0 == SWFUpload && (SWFUpload = function (a) {
	this.initSWFUpload(a);
}), SWFUpload.prototype.initSWFUpload = function (a) {
	try {
		this.customSettings = {}, this.settings = a, this.eventQueue = [], this.movieName = "SWFUpload_" + SWFUpload.movieCount++, this.movieElement = null, SWFUpload.instances[this.movieName] = this, this.initSettings(), this.loadFlash(), this.displayDebugInfo();
	}
	catch (b) {
		throw delete SWFUpload.instances[this.movieName], b;
	}
}, SWFUpload.instances = {}, SWFUpload.movieCount = 0, SWFUpload.version = "2.2.0 2009-03-25", SWFUpload.QUEUE_ERROR = {QUEUE_LIMIT_EXCEEDED:-100, FILE_EXCEEDS_SIZE_LIMIT:-110, ZERO_BYTE_FILE:-120, INVALID_FILETYPE:-130}, SWFUpload.UPLOAD_ERROR = {HTTP_ERROR:-200, MISSING_UPLOAD_URL:-210, IO_ERROR:-220, SECURITY_ERROR:-230, UPLOAD_LIMIT_EXCEEDED:-240, UPLOAD_FAILED:-250, SPECIFIED_FILE_ID_NOT_FOUND:-260, FILE_VALIDATION_FAILED:-270, FILE_CANCELLED:-280, UPLOAD_STOPPED:-290}, SWFUpload.FILE_STATUS = {QUEUED:-1, IN_PROGRESS:-2, ERROR:-3, COMPLETE:-4, CANCELLED:-5}, SWFUpload.BUTTON_ACTION = {SELECT_FILE:-100, SELECT_FILES:-110, START_UPLOAD:-120}, SWFUpload.CURSOR = {ARROW:-1, HAND:-2}, SWFUpload.WINDOW_MODE = {WINDOW:"window", TRANSPARENT:"transparent", OPAQUE:"opaque"}, SWFUpload.completeURL = function (a) {
	if ("string" != typeof a || a.match(/^https?:\/\//i) || a.match(/^\//)) {
		return a;
	}
	window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
	var c = window.location.pathname.lastIndexOf("/");
	return path = 0 >= c ? "/" : window.location.pathname.substr(0, c) + "/", path + a;
}, SWFUpload.prototype.initSettings = function () {
	this.ensureDefault = function (a, b) {
		this.settings[a] = void 0 == this.settings[a] ? b : this.settings[a];
	}, this.ensureDefault("upload_url", ""), this.ensureDefault("preserve_relative_urls", !1), this.ensureDefault("file_post_name", "Filedata"), this.ensureDefault("post_params", {}), this.ensureDefault("use_query_string", !1), this.ensureDefault("requeue_on_error", !1), this.ensureDefault("http_success", []), this.ensureDefault("assume_success_timeout", 0), this.ensureDefault("file_types", "*.*"), this.ensureDefault("file_types_description", "All Files"), this.ensureDefault("file_size_limit", 0), this.ensureDefault("file_upload_limit", 0), this.ensureDefault("file_queue_limit", 0), this.ensureDefault("flash_url", "swfupload.swf"), this.ensureDefault("prevent_swf_caching", !0), this.ensureDefault("button_image_url", ""), this.ensureDefault("button_width", 1), this.ensureDefault("button_height", 1), this.ensureDefault("button_text", ""), this.ensureDefault("button_text_style", "color: #000000; font-size: 16pt;"), this.ensureDefault("button_text_top_padding", 0), this.ensureDefault("button_text_left_padding", 0), this.ensureDefault("button_action", SWFUpload.BUTTON_ACTION.SELECT_FILES), this.ensureDefault("button_disabled", !1), this.ensureDefault("button_placeholder_id", ""), this.ensureDefault("button_placeholder", null), this.ensureDefault("button_cursor", SWFUpload.CURSOR.ARROW), this.ensureDefault("button_window_mode", SWFUpload.WINDOW_MODE.WINDOW), this.ensureDefault("debug", !1), this.settings.debug_enabled = this.settings.debug, this.settings.return_upload_start_handler = this.returnUploadStart, this.ensureDefault("swfupload_loaded_handler", null), this.ensureDefault("file_dialog_start_handler", null), this.ensureDefault("file_queued_handler", null), this.ensureDefault("file_queue_error_handler", null), this.ensureDefault("file_dialog_complete_handler", null), this.ensureDefault("upload_start_handler", null), this.ensureDefault("upload_progress_handler", null), this.ensureDefault("upload_error_handler", null), this.ensureDefault("upload_success_handler", null), this.ensureDefault("upload_complete_handler", null), this.ensureDefault("debug_handler", this.debugMessage), this.ensureDefault("custom_settings", {}), this.customSettings = this.settings.custom_settings, this.settings.prevent_swf_caching && (this.settings.flash_url = this.settings.flash_url + (this.settings.flash_url.indexOf("?") < 0 ? "?" : "&") + "preventswfcaching=" + (new Date).getTime()), this.settings.preserve_relative_urls || (this.settings.upload_url = SWFUpload.completeURL(this.settings.upload_url), this.settings.button_image_url = SWFUpload.completeURL(this.settings.button_image_url)), delete this.ensureDefault;
}, SWFUpload.prototype.loadFlash = function () {
	var a, b;
	if (null !== document.getElementById(this.movieName)) {
		throw "ID " + this.movieName + " is already in use. The Flash Object could not be added";
	}
	if (a = document.getElementById(this.settings.button_placeholder_id) || this.settings.button_placeholder, void 0 == a) {
		throw "Could not find the placeholder element: " + this.settings.button_placeholder_id;
	}
	b = document.createElement("div"), b.innerHTML = this.getFlashHTML(), a.parentNode.replaceChild(b.firstChild, a), void 0 == window[this.movieName] && (window[this.movieName] = this.getMovieElement());
}, SWFUpload.prototype.getFlashHTML = function () {
	return ["<object id=\"", this.movieName, "\" type=\"application/x-shockwave-flash\" data=\"", this.settings.flash_url, "\" width=\"", this.settings.button_width, "\" height=\"", this.settings.button_height, "\" class=\"swfupload\">", "<param name=\"wmode\" value=\"", this.settings.button_window_mode, "\" />", "<param name=\"movie\" value=\"", this.settings.flash_url, "\" />", "<param name=\"quality\" value=\"high\" />", "<param name=\"menu\" value=\"false\" />", "<param name=\"allowScriptAccess\" value=\"always\" />", "<param name=\"flashvars\" value=\"" + this.getFlashVars() + "\" />", "</object>"].join("");
}, SWFUpload.prototype.getFlashVars = function () {
	var a = this.buildParamString(), b = this.settings.http_success.join(",");
	return ["movieName=", encodeURIComponent(this.movieName), "&amp;uploadURL=", encodeURIComponent(this.settings.upload_url), "&amp;useQueryString=", encodeURIComponent(this.settings.use_query_string), "&amp;requeueOnError=", encodeURIComponent(this.settings.requeue_on_error), "&amp;httpSuccess=", encodeURIComponent(b), "&amp;assumeSuccessTimeout=", encodeURIComponent(this.settings.assume_success_timeout), "&amp;params=", encodeURIComponent(a), "&amp;filePostName=", encodeURIComponent(this.settings.file_post_name), "&amp;fileTypes=", encodeURIComponent(this.settings.file_types), "&amp;fileTypesDescription=", encodeURIComponent(this.settings.file_types_description), "&amp;fileSizeLimit=", encodeURIComponent(this.settings.file_size_limit), "&amp;fileUploadLimit=", encodeURIComponent(this.settings.file_upload_limit), "&amp;fileQueueLimit=", encodeURIComponent(this.settings.file_queue_limit), "&amp;debugEnabled=", encodeURIComponent(this.settings.debug_enabled), "&amp;buttonImageURL=", encodeURIComponent(this.settings.button_image_url), "&amp;buttonWidth=", encodeURIComponent(this.settings.button_width), "&amp;buttonHeight=", encodeURIComponent(this.settings.button_height), "&amp;buttonText=", encodeURIComponent(this.settings.button_text), "&amp;buttonTextTopPadding=", encodeURIComponent(this.settings.button_text_top_padding), "&amp;buttonTextLeftPadding=", encodeURIComponent(this.settings.button_text_left_padding), "&amp;buttonTextStyle=", encodeURIComponent(this.settings.button_text_style), "&amp;buttonAction=", encodeURIComponent(this.settings.button_action), "&amp;buttonDisabled=", encodeURIComponent(this.settings.button_disabled), "&amp;buttonCursor=", encodeURIComponent(this.settings.button_cursor)].join("");
}, SWFUpload.prototype.getMovieElement = function () {
	if (void 0 == this.movieElement && (this.movieElement = document.getElementById(this.movieName)), null === this.movieElement) {
		throw "Could not find Flash element";
	}
	return this.movieElement;
}, SWFUpload.prototype.buildParamString = function () {
	var c, a = this.settings.post_params, b = [];
	if ("object" == typeof a) {
		for (c in a) {
			a.hasOwnProperty(c) && b.push(encodeURIComponent(c.toString()) + "=" + encodeURIComponent(a[c].toString()));
		}
	}
	return b.join("&amp;");
}, SWFUpload.prototype.destroy = function () {
	var a, b;
	try {
		if (this.cancelUpload(null, !1), a = null, a = this.getMovieElement(), a && "unknown" == typeof a.CallFunction) {
			for (b in a) {
				try {
					"function" == typeof a[b] && (a[b] = null);
				}
				catch (c) {
				}
			}
			try {
				a.parentNode.removeChild(a);
			}
			catch (d) {
			}
		}
		return window[this.movieName] = null, SWFUpload.instances[this.movieName] = null, delete SWFUpload.instances[this.movieName], this.movieElement = null, this.settings = null, this.customSettings = null, this.eventQueue = null, this.movieName = null, !0;
	}
	catch (e) {
		return !1;
	}
}, SWFUpload.prototype.displayDebugInfo = function () {
	this.debug(["---SWFUpload Instance Info---\n", "Version: ", SWFUpload.version, "\n", "Movie Name: ", this.movieName, "\n", "Settings:\n", "\t", "upload_url:               ", this.settings.upload_url, "\n", "\t", "flash_url:                ", this.settings.flash_url, "\n", "\t", "use_query_string:         ", this.settings.use_query_string.toString(), "\n", "\t", "requeue_on_error:         ", this.settings.requeue_on_error.toString(), "\n", "\t", "http_success:             ", this.settings.http_success.join(", "), "\n", "\t", "assume_success_timeout:   ", this.settings.assume_success_timeout, "\n", "\t", "file_post_name:           ", this.settings.file_post_name, "\n", "\t", "post_params:              ", this.settings.post_params.toString(), "\n", "\t", "file_types:               ", this.settings.file_types, "\n", "\t", "file_types_description:   ", this.settings.file_types_description, "\n", "\t", "file_size_limit:          ", this.settings.file_size_limit, "\n", "\t", "file_upload_limit:        ", this.settings.file_upload_limit, "\n", "\t", "file_queue_limit:         ", this.settings.file_queue_limit, "\n", "\t", "debug:                    ", this.settings.debug.toString(), "\n", "\t", "prevent_swf_caching:      ", this.settings.prevent_swf_caching.toString(), "\n", "\t", "button_placeholder_id:    ", this.settings.button_placeholder_id.toString(), "\n", "\t", "button_placeholder:       ", this.settings.button_placeholder ? "Set" : "Not Set", "\n", "\t", "button_image_url:         ", this.settings.button_image_url.toString(), "\n", "\t", "button_width:             ", this.settings.button_width.toString(), "\n", "\t", "button_height:            ", this.settings.button_height.toString(), "\n", "\t", "button_text:              ", this.settings.button_text.toString(), "\n", "\t", "button_text_style:        ", this.settings.button_text_style.toString(), "\n", "\t", "button_text_top_padding:  ", this.settings.button_text_top_padding.toString(), "\n", "\t", "button_text_left_padding: ", this.settings.button_text_left_padding.toString(), "\n", "\t", "button_action:            ", this.settings.button_action.toString(), "\n", "\t", "button_disabled:          ", this.settings.button_disabled.toString(), "\n", "\t", "custom_settings:          ", this.settings.custom_settings.toString(), "\n", "Event Handlers:\n", "\t", "swfupload_loaded_handler assigned:  ", ("function" == typeof this.settings.swfupload_loaded_handler).toString(), "\n", "\t", "file_dialog_start_handler assigned: ", ("function" == typeof this.settings.file_dialog_start_handler).toString(), "\n", "\t", "file_queued_handler assigned:       ", ("function" == typeof this.settings.file_queued_handler).toString(), "\n", "\t", "file_queue_error_handler assigned:  ", ("function" == typeof this.settings.file_queue_error_handler).toString(), "\n", "\t", "upload_start_handler assigned:      ", ("function" == typeof this.settings.upload_start_handler).toString(), "\n", "\t", "upload_progress_handler assigned:   ", ("function" == typeof this.settings.upload_progress_handler).toString(), "\n", "\t", "upload_error_handler assigned:      ", ("function" == typeof this.settings.upload_error_handler).toString(), "\n", "\t", "upload_success_handler assigned:    ", ("function" == typeof this.settings.upload_success_handler).toString(), "\n", "\t", "upload_complete_handler assigned:   ", ("function" == typeof this.settings.upload_complete_handler).toString(), "\n", "\t", "debug_handler assigned:             ", ("function" == typeof this.settings.debug_handler).toString(), "\n"].join(""));
}, SWFUpload.prototype.addSetting = function (a, b, c) {
	return this.settings[a] = void 0 == b ? c : b;
}, SWFUpload.prototype.getSetting = function (a) {
	return void 0 != this.settings[a] ? this.settings[a] : "";
}, SWFUpload.prototype.callFlash = function (functionName, argumentArray) {
	var movieElement, returnValue, returnString;
	argumentArray = argumentArray || [], movieElement = this.getMovieElement();
	try {
		returnString = movieElement.CallFunction("<invoke name=\"" + functionName + "\" returntype=\"javascript\">" + __flash__argumentsToXML(argumentArray, 0) + "</invoke>"), returnValue = eval(returnString);
	}
	catch (ex) {
		throw "Call to " + functionName + " failed";
	}
	return void 0 != returnValue && "object" == typeof returnValue.post && (returnValue = this.unescapeFilePostParams(returnValue)), returnValue;
}, SWFUpload.prototype.selectFile = function () {
	this.callFlash("SelectFile");
}, SWFUpload.prototype.selectFiles = function () {
	this.callFlash("SelectFiles");
}, SWFUpload.prototype.startUpload = function (a) {
	this.callFlash("StartUpload", [a]);
}, SWFUpload.prototype.cancelUpload = function (a, b) {
	b !== !1 && (b = !0), this.callFlash("CancelUpload", [a, b]);
}, SWFUpload.prototype.stopUpload = function () {
	this.callFlash("StopUpload");
}, SWFUpload.prototype.getStats = function () {
	return this.callFlash("GetStats");
}, SWFUpload.prototype.setStats = function (a) {
	this.callFlash("SetStats", [a]);
}, SWFUpload.prototype.getFile = function (a) {
	return "number" == typeof a ? this.callFlash("GetFileByIndex", [a]) : this.callFlash("GetFile", [a]);
}, SWFUpload.prototype.addFileParam = function (a, b, c) {
	return this.callFlash("AddFileParam", [a, b, c]);
}, SWFUpload.prototype.removeFileParam = function (a, b) {
	this.callFlash("RemoveFileParam", [a, b]);
}, SWFUpload.prototype.setUploadURL = function (a) {
	this.settings.upload_url = a.toString(), this.callFlash("SetUploadURL", [a]);
}, SWFUpload.prototype.setPostParams = function (a) {
	this.settings.post_params = a, this.callFlash("SetPostParams", [a]);
}, SWFUpload.prototype.addPostParam = function (a, b) {
	this.settings.post_params[a] = b, this.callFlash("SetPostParams", [this.settings.post_params]);
}, SWFUpload.prototype.removePostParam = function (a) {
	delete this.settings.post_params[a], this.callFlash("SetPostParams", [this.settings.post_params]);
}, SWFUpload.prototype.setFileTypes = function (a, b) {
	this.settings.file_types = a, this.settings.file_types_description = b, this.callFlash("SetFileTypes", [a, b]);
}, SWFUpload.prototype.setFileSizeLimit = function (a) {
	this.settings.file_size_limit = a, this.callFlash("SetFileSizeLimit", [a]);
}, SWFUpload.prototype.setFileUploadLimit = function (a) {
	this.settings.file_upload_limit = a, this.callFlash("SetFileUploadLimit", [a]);
}, SWFUpload.prototype.setFileQueueLimit = function (a) {
	this.settings.file_queue_limit = a, this.callFlash("SetFileQueueLimit", [a]);
}, SWFUpload.prototype.setFilePostName = function (a) {
	this.settings.file_post_name = a, this.callFlash("SetFilePostName", [a]);
}, SWFUpload.prototype.setUseQueryString = function (a) {
	this.settings.use_query_string = a, this.callFlash("SetUseQueryString", [a]);
}, SWFUpload.prototype.setRequeueOnError = function (a) {
	this.settings.requeue_on_error = a, this.callFlash("SetRequeueOnError", [a]);
}, SWFUpload.prototype.setHTTPSuccess = function (a) {
	"string" == typeof a && (a = a.replace(" ", "").split(",")), this.settings.http_success = a, this.callFlash("SetHTTPSuccess", [a]);
}, SWFUpload.prototype.setAssumeSuccessTimeout = function (a) {
	this.settings.assume_success_timeout = a, this.callFlash("SetAssumeSuccessTimeout", [a]);
}, SWFUpload.prototype.setDebugEnabled = function (a) {
	this.settings.debug_enabled = a, this.callFlash("SetDebugEnabled", [a]);
}, SWFUpload.prototype.setButtonImageURL = function (a) {
	void 0 == a && (a = ""), this.settings.button_image_url = a, this.callFlash("SetButtonImageURL", [a]);
}, SWFUpload.prototype.setButtonDimensions = function (a, b) {
	this.settings.button_width = a, this.settings.button_height = b;
	var c = this.getMovieElement();
	void 0 != c && (c.style.width = a + "px", c.style.height = b + "px"), this.callFlash("SetButtonDimensions", [a, b]);
}, SWFUpload.prototype.setButtonText = function (a) {
	this.settings.button_text = a, this.callFlash("SetButtonText", [a]);
}, SWFUpload.prototype.setButtonTextPadding = function (a, b) {
	this.settings.button_text_top_padding = b, this.settings.button_text_left_padding = a, this.callFlash("SetButtonTextPadding", [a, b]);
}, SWFUpload.prototype.setButtonTextStyle = function (a) {
	this.settings.button_text_style = a, this.callFlash("SetButtonTextStyle", [a]);
}, SWFUpload.prototype.setButtonDisabled = function (a) {
	this.settings.button_disabled = a, this.callFlash("SetButtonDisabled", [a]);
}, SWFUpload.prototype.setButtonAction = function (a) {
	this.settings.button_action = a, this.callFlash("SetButtonAction", [a]);
}, SWFUpload.prototype.setButtonCursor = function (a) {
	this.settings.button_cursor = a, this.callFlash("SetButtonCursor", [a]);
}, SWFUpload.prototype.queueEvent = function (a, b) {
	void 0 == b ? b = [] : b instanceof Array || (b = [b]);
	var c = this;
	if ("function" == typeof this.settings[a]) {
		this.eventQueue.push(function () {
			this.settings[a].apply(this, b);
		}), setTimeout(function () {
			c.executeNextEvent();
		}, 0);
	} else {
		if (null !== this.settings[a]) {
			throw "Event handler " + a + " is unknown or is not a function";
		}
	}
}, SWFUpload.prototype.executeNextEvent = function () {
	var a = this.eventQueue ? this.eventQueue.shift() : null;
	"function" == typeof a && a.apply(this);
}, SWFUpload.prototype.unescapeFilePostParams = function (a) {
	var d, e, f, b = /[$]([0-9a-f]{4})/i, c = {};
	if (void 0 != a) {
		for (e in a.post) {
			if (a.post.hasOwnProperty(e)) {
				for (d = e; null !== (f = b.exec(d)); ) {
					d = d.replace(f[0], String.fromCharCode(parseInt("0x" + f[1], 16)));
				}
				c[d] = a.post[e];
			}
		}
		a.post = c;
	}
	return a;
}, SWFUpload.prototype.testExternalInterface = function () {
	try {
		return this.callFlash("TestExternalInterface");
	}
	catch (a) {
		return !1;
	}
}, SWFUpload.prototype.flashReady = function () {
	var a = this.getMovieElement();
	return a ? (this.cleanUp(a), this.queueEvent("swfupload_loaded_handler"), void 0) : (this.debug("Flash called back ready but the flash movie can't be found."), void 0);
}, SWFUpload.prototype.cleanUp = function (a) {
	try {
		if (this.movieElement && "unknown" == typeof a.CallFunction) {
			this.debug("Removing Flash functions hooks (this should only run in IE and should prevent memory leaks)");
			for (var b in a) {
				try {
					"function" == typeof a[b] && (a[b] = null);
				}
				catch (c) {
				}
			}
		}
	}
	catch (d) {
	}
	window.__flash__removeCallback = function (a, b) {
		try {
			a && (a[b] = null);
		}
		catch (c) {
		}
	};
}, SWFUpload.prototype.fileDialogStart = function () {
	this.queueEvent("file_dialog_start_handler");
}, SWFUpload.prototype.fileQueued = function (a) {
	a = this.unescapeFilePostParams(a), this.queueEvent("file_queued_handler", a);
}, SWFUpload.prototype.fileQueueError = function (a, b, c) {
	a = this.unescapeFilePostParams(a), this.queueEvent("file_queue_error_handler", [a, b, c]);
}, SWFUpload.prototype.fileDialogComplete = function (a, b, c) {
	this.queueEvent("file_dialog_complete_handler", [a, b, c]);
}, SWFUpload.prototype.uploadStart = function (a) {
	a = this.unescapeFilePostParams(a), this.queueEvent("return_upload_start_handler", a);
}, SWFUpload.prototype.returnUploadStart = function (a) {
	var b;
	if ("function" == typeof this.settings.upload_start_handler) {
		a = this.unescapeFilePostParams(a), b = this.settings.upload_start_handler.call(this, a);
	} else {
		if (void 0 != this.settings.upload_start_handler) {
			throw "upload_start_handler must be a function";
		}
	}
	void 0 === b && (b = !0), b = !!b, this.callFlash("ReturnUploadStart", [b]);
}, SWFUpload.prototype.uploadProgress = function (a, b, c) {
	a = this.unescapeFilePostParams(a), this.queueEvent("upload_progress_handler", [a, b, c]);
}, SWFUpload.prototype.uploadError = function (a, b, c) {
	a = this.unescapeFilePostParams(a), this.queueEvent("upload_error_handler", [a, b, c]);
}, SWFUpload.prototype.uploadSuccess = function (a, b, c) {
	a = this.unescapeFilePostParams(a), this.queueEvent("upload_success_handler", [a, b, c]);
}, SWFUpload.prototype.uploadComplete = function (a) {
	a = this.unescapeFilePostParams(a), this.queueEvent("upload_complete_handler", a);
}, SWFUpload.prototype.debug = function (a) {
	this.queueEvent("debug_handler", a);
}, SWFUpload.prototype.debugMessage = function (a) {
	var b, c, d;
	if (this.settings.debug) {
		if (c = [], "object" == typeof a && "string" == typeof a.name && "string" == typeof a.message) {
			for (d in a) {
				a.hasOwnProperty(d) && c.push(d + ": " + a[d]);
			}
			b = c.join("\n") || "", c = b.split("\n"), b = "EXCEPTION: " + c.join("\nEXCEPTION: "), SWFUpload.Console.writeLine(b);
		} else {
			SWFUpload.Console.writeLine(a);
		}
	}
}, SWFUpload.Console = {}, SWFUpload.Console.writeLine = function (a) {
	var b, c;
	try {
		b = document.getElementById("SWFUpload_Console"), b || (c = document.createElement("form"), document.getElementsByTagName("body")[0].appendChild(c), b = document.createElement("textarea"), b.id = "SWFUpload_Console", b.style.fontFamily = "monospace", b.setAttribute("wrap", "off"), b.wrap = "off", b.style.overflow = "auto", b.style.width = "700px", b.style.height = "350px", b.style.margin = "5px", c.appendChild(b)), b.value += a + "\n", b.scrollTop = b.scrollHeight - b.clientHeight;
	}
	catch (d) {
		alert("Exception: " + d.name + " Message: " + d.message);
	}
};

