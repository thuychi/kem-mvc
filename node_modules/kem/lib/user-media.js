module.exports = function getUserMedia(constraints) {
	var user_media = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia;
	if (user_media) {
		return new Promise(function (resolve, reject) {
			user_media.call(navigator, constraints, resolve, reject);
		})
	} else {
		return navigator.mediaDevices.getUserMedia(constraints);
	}
}