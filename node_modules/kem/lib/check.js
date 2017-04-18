var trim = require('./trim'),
	method = ['get', 'put', 'post', 'delete', 'patch'],
	ShareWith = ['people', 'friend', 'me'],
	LikeName = ['haha', 'like', 'love', 'sad', 'ungry', 'wow'],
	ListUserNameFound = ['setting', 'account', 'post', 'message'];

module.exports = class Check {
	constructor() {
		this._error = {};
		this.error = 0;
	}
	set(key, value) {
		this.error++;
		this._error[key] = value;
		return false;
	}
	get(key) {
		return this._error[key];
	}
	getError() {
		return this._error;
	}
	like(name) {
		return !(LikeName.indexOf(name) < 0);
	}
	md5(value) {
		return 'string' === typeof value && value.length === 32;
	}
	sha1(value) {
		return 'string' === typeof value && value.length === 40;
	}
	id(value) {
		return 'number' === typeof value && value > 0;
	}
	number(value) {
		return 'number' === typeof value && value >= 0;
	}
	string(value) {
		return 'string' === typeof value;
	}
	empty(value) {
		return !value;
	}
	boolean(value) {
		return 'boolean' === typeof value;
	}
	object(value) {
		return '[object Object]' === value.toString();
	}
	array(value) {
		return Array.isArray(value);
	}
	method(name) {
		return -1 !== method[name];
	}
	share_with(role) {
		return ShareWith.indexOf(role) > -1;
	}
	date(date) {
		return !(date == 'Invalid Date');
	}
	name(n) {
		var type,
		    name = trim(n || ''),
		    count = name.length;
		/* check length */
		if (count < 2) type = 'name_short';else if (count > 30) type = 'name_long';else {
			/* word count */
			if (name.split(' ').length > 2) type = 'name_many_word';else {
				/* ki tu dac biet */
				var reg = /[~`!@#\$%\^&\*\(\)_\+\-=\{\}\[\]\\:\';\'<>\?\,\.\/\|\d]+/g;
				if (reg.test(name)) type = 'error_name';else {
					/* ki tu in hoa */
					var locale_upper_case = name.match(/[QWERTYUIOPASDFGHJKLZXCVBNMƯỨỮỬỰAĂÂÁÀẢÃẠĂẮẰẶẴẲẤẦẨẪẬĐÊẾỀỂỄỆÍÌỈĨỊÝỲỶỸỴ]/g);
					if (locale_upper_case && locale_upper_case.length > 2) type = 'name_many_upper';else return true;
				}
			}
		};
		return this.set('name', type);
	}
	gender(gender) {
		return gender === 'male' || gender === 'female' || this.set('gender', 'error_gender');
	}
	day(day) {
		return this.int(day) && day > 0 && day < 32;
	}
	month(month) {
		return this.int(month) && month > 0 && month < 13;
	}
	year(year) {
		return this.int(year) && year > 1900 && year < 2017;
	}
	birthday(d, m, y) {
		if (this.day(d) && this.month(m) && this.year(y)) return (d === 30 || d === 31) && m === 2 ? this.set('birthday', 'birthday_leap_year') : true;else return this.set('birthday', message);
	}
	code(a) {
		return (/^[0-9]{6}$/g.test(a) || this.set('code', 'error_code')
		);
	}
	pass(a) {
		return (/(.){8,100}/g.test(a) || this.set('pass', 'invalid_pass')
		);
	}
	email(a) {
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/g;
		return filter.test(a) || this.set('email', 'error_email');
	}
	phone(phone) {
		return (/^[0-9]{9,15}$/g.test(phone) && /^(0|\+)/.test(phone[0]) || this.set('phone', 'error_phone')
		);
	}
	username(a) {
		return ListUserNameFound.indexOf(a) > -1 || /^[0-9]/g.test(a) || !/[a-zA-Z0-9\.]/g.test(a) || a.length < 3 ? this.set('username', 'error_username') : true;
	}
	url(a) {
		var urlRegex = /(http|https|ftp)\:\/\/([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(\/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*/g;
		var url = urlRegex.exec(a);
		return url ? url[0] : false;
	}
	int(number) {
		return number === parseFloat(number);
	}
}