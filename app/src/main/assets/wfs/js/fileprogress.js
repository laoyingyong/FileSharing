
function FileProgress(a) {
	var c, d, e, f;
	this.fileProgressID = a.id, this.opacity = 100, this.height = 0, this.fileProgressWrapper = document.getElementById(this.fileProgressID), this.fileProgressWrapper ? (this.fileProgressElement = this.fileProgressWrapper.firstChild, this.reset()) : (this.fileProgressWrapper = document.createElement("div"), this.fileProgressWrapper.className = "progressWrapper", this.fileProgressWrapper.id = this.fileProgressID, this.fileProgressElement = document.createElement("div"), this.fileProgressElement.className = "progressContainer", c = document.createElement("a"), c.className = "progressCancel", c.href = "#", c.style.visibility = "hidden", c.appendChild(document.createTextNode(" ")), d = document.createElement("div"), d.className = "progressName", d.appendChild(document.createTextNode(a.name)), e = document.createElement("div"), e.className = "progressBarInProgress", f = document.createElement("div"), f.className = "progressBarStatus", f.innerHTML = "&nbsp;", this.fileProgressElement.appendChild(c), this.fileProgressElement.appendChild(d), this.fileProgressElement.appendChild(f), this.fileProgressElement.appendChild(e), this.fileProgressWrapper.appendChild(this.fileProgressElement)), this.height = this.fileProgressWrapper.offsetHeight, this.setTimer(null);
}
FileProgress.prototype.setTimer = function (a) {
	this.fileProgressElement.FP_TIMER = a;
}, FileProgress.prototype.getTimer = function () {
	return this.fileProgressElement.FP_TIMER || null;
}, FileProgress.prototype.reset = function () {
	this.fileProgressElement.className = "progressContainer", this.fileProgressElement.childNodes[2].innerHTML = "&nbsp;", this.fileProgressElement.childNodes[2].className = "progressBarStatus", this.fileProgressElement.childNodes[3].className = "progressBarInProgress", this.fileProgressElement.childNodes[3].style.width = "0%", this.appear();
}, FileProgress.prototype.setProgress = function (a) {
	this.fileProgressElement.className = "progressContainer green", this.fileProgressElement.childNodes[3].className = "progressBarInProgress", this.fileProgressElement.childNodes[3].style.width = a + "%", this.appear();
}, FileProgress.prototype.setComplete = function () {
	this.fileProgressElement.className = "progressContainer blue", this.fileProgressElement.childNodes[3].className = "progressBarComplete", this.fileProgressElement.childNodes[3].style.width = "";
	var a = this;
	this.setTimer(setTimeout(function () {
		a.disappear();
	}, 10000));
}, FileProgress.prototype.setError = function () {
	this.fileProgressElement.className = "progressContainer red", this.fileProgressElement.childNodes[3].className = "progressBarError", this.fileProgressElement.childNodes[3].style.width = "";
	var a = this;
	this.setTimer(setTimeout(function () {
		a.disappear();
	}, 5000));
}, FileProgress.prototype.setCancelled = function () {
	this.fileProgressElement.className = "progressContainer", this.fileProgressElement.childNodes[3].className = "progressBarError", this.fileProgressElement.childNodes[3].style.width = "";
	var a = this;
	this.setTimer(setTimeout(function () {
		a.disappear();
	}, 2000));
}, FileProgress.prototype.setStatus = function (a) {
	this.fileProgressElement.childNodes[2].innerHTML = a;
}, FileProgress.prototype.toggleCancel = function (a, b) {
	if (this.fileProgressElement.childNodes[0].style.visibility = a ? "visible" : "hidden", b) {
		var c = this.fileProgressID;
		this.fileProgressElement.childNodes[0].onclick = function () {
			return b.cancelUpload(c), !1;
		};
	}
}, FileProgress.prototype.appear = function () {
	if (null !== this.getTimer() && (clearTimeout(this.getTimer()), this.setTimer(null)), this.fileProgressWrapper.filters) {
		try {
			this.fileProgressWrapper.filters.item("DXImageTransform.Microsoft.Alpha").opacity = 100;
		}
		catch (a) {
			this.fileProgressWrapper.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=100)";
		}
	} else {
		this.fileProgressWrapper.style.opacity = 1;
	}
	this.fileProgressWrapper.style.height = "", this.height = this.fileProgressWrapper.offsetHeight, this.opacity = 100, this.fileProgressWrapper.style.display = "";
}, FileProgress.prototype.disappear = function () {
	var e, a = 15, b = 4, c = 30;
	if (this.opacity > 0) {
		if (this.opacity -= a, this.opacity < 0 && (this.opacity = 0), this.fileProgressWrapper.filters) {
			try {
				this.fileProgressWrapper.filters.item("DXImageTransform.Microsoft.Alpha").opacity = this.opacity;
			}
			catch (d) {
				this.fileProgressWrapper.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + this.opacity + ")";
			}
		} else {
			this.fileProgressWrapper.style.opacity = this.opacity / 100;
		}
	}
	this.height > 0 && (this.height -= b, this.height < 0 && (this.height = 0), this.fileProgressWrapper.style.height = this.height + "px"), this.height > 0 || this.opacity > 0 ? (e = this, this.setTimer(setTimeout(function () {
		e.disappear();
	}, c))) : (this.fileProgressWrapper.style.display = "none", this.setTimer(null));
};

