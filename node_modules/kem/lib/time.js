var Timer = module.exports = {
	fixtime: function (time) {
		return time < 10 ? '0' + time : time;
	},
	timestring: function (date) {
		var array = date.toString().split(' ');
		return [array[0], date.getDate() + '/' + (date.getMonth() + 1) + '/' + array[3], 'on', this.fixtime(date.getHours()) + ':' + this.fixtime(date.getMinutes())].join(' ');
	},
	timeupdate: function (current) {
		var curmins = Math.floor(current / 60),
		    cursecs = Math.floor(current - curmins * 60),
		    text = [this.fixtime(curmins), this.fixtime(cursecs)].join(':');

		return current === 0 ? text : current === 0 ? '00:00' : '- ' + text;
	},
	timeago: function (date) {
		var time = Date.now() - date.getTime(),
		    sec = parseInt(time / 1000),
		    min = parseInt(sec / 60),
		    hour = parseInt(min / 60);

		if (hour > 23) return { text: this.timestring(date) };
		if (hour > 1) return { text: hour + ' ' + lang.timeago_hours, timeout: 300000 };
		if (hour > 0) return { text: '1 ' + lang.timeago_hour, timeout: 300000 };
		if (min > 1) return { text: min + ' ' + lang.timeago_mins, timeout: 7000 };
		if (min > 0) return { text: '1 ' + lang.timeago_min, timeout: 7000 };
		return { text: lang.timeago_now, timeout: 2000 };
	}
}