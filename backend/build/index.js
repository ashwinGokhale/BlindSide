/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _bodyParser = __webpack_require__(2);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _mongoose = __webpack_require__(3);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _expressSession = __webpack_require__(4);

	var _expressSession2 = _interopRequireDefault(_expressSession);

	var _jsonwebtoken = __webpack_require__(5);

	var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

	var _controllersUserController = __webpack_require__(6);

	var _controllersDeviceController = __webpack_require__(9);

	var app = (0, _express2['default'])();
	__webpack_require__(12).config();
	_mongoose2['default'].Promise = global.Promise;

	var port = process.env.PORT || 8080;
	var url = process.env.MONGO_URL;
	var db = _mongoose2['default'].connect(url, { user: process.env.MONGO_USER, pass: process.env.MONGO_PASS, useMongoClient: true });

	app.use(_bodyParser2['default'].json());
	app.use(_bodyParser2['default'].urlencoded({ extended: true }));
	app.use(function (req, res, next) {
		if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
			_jsonwebtoken2['default'].verify(req.headers.authorization.split(' ')[1], 'BlindSide', function (err, decode) {
				if (err) req.user = undefined;
				req.user = decode;
				next();
			});
		} else {
			req.user = undefined;
			next();
		}
	});

	app.route('/auth/register').post(_controllersUserController.register);

	app.route('/auth/login').post(_controllersUserController.login);

	app.route('/device/register').post(_controllersDeviceController.registerDevice);

	app.route('/device/proxy').post(_controllersUserController.loginRequired, _controllersDeviceController.proxy);

	app.listen(port, function () {
		return console.log('Listening on port ' + port);
	});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = require("body-parser");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = require("mongoose");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = require("express-session");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mongoose = __webpack_require__(3);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _jsonwebtoken = __webpack_require__(5);

	var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

	var _bcrypt = __webpack_require__(7);

	var _bcrypt2 = _interopRequireDefault(_bcrypt);

	var _modelsUser = __webpack_require__(8);

	var _modelsUser2 = _interopRequireDefault(_modelsUser);

	var register = function register(req, res) {
		if (!req.body.email || !req.body.password) res.status(400).send('All fields are required');else {
			// If user is already registered
			_modelsUser2['default'].findOne({ email: req.body.email }).exec(function (err, user) {
				if (err) {
					console.error(err);
					res.send(err);
				} else if (user) {
					res.send('Theres is already a user with an email of: ' + req.body.email);
				} else {
					var newUser = new _modelsUser2['default'](req.body);
					newUser.hash_password = _bcrypt2['default'].hashSync(req.body.password, 10);
					newUser.save(function (err, user) {
						if (err) {
							return res.status(400).send({
								message: err
							});
						} else {
							user.hash_password = undefined;
							return res.json(user);
						}
					});
				}
			});
		}
	};

	exports.register = register;
	var login = function login(req, res) {
		_modelsUser2['default'].findOne({ email: req.body.email }, function (err, user) {
			if (err) throw err;
			if (!user || !user.comparePassword(req.body.password)) return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });

			return res.json({ token: _jsonwebtoken2['default'].sign({ email: user.email, _id: user._id }, 'BlindSide') });
		});
	};

	exports.login = login;
	var loginRequired = function loginRequired(req, res, next) {
		if (req.user) next();else return res.status(401).json({ message: 'Unauthorized user!' });
	};
	exports.loginRequired = loginRequired;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = require("bcrypt");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mongoose = __webpack_require__(3);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _bcrypt = __webpack_require__(7);

	var _bcrypt2 = _interopRequireDefault(_bcrypt);

	var UserSchema = new _mongoose2['default'].Schema({
		email: {
			type: String,
			unique: true,
			lowercase: true,
			trim: true,
			required: true
		},
		hash_password: {
			type: String,
			required: true
		},
		devices: {
			type: Array
		}
	});

	UserSchema.methods.comparePassword = function (password) {
		return _bcrypt2['default'].compareSync(password, this.hash_password);
	};

	exports['default'] = _mongoose2['default'].model('User', UserSchema);
	module.exports = exports['default'];

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mongoose = __webpack_require__(3);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _jsonwebtoken = __webpack_require__(5);

	var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

	var _bcrypt = __webpack_require__(7);

	var _bcrypt2 = _interopRequireDefault(_bcrypt);

	var _axios = __webpack_require__(10);

	var _axios2 = _interopRequireDefault(_axios);

	var _modelsDevice = __webpack_require__(11);

	var _modelsDevice2 = _interopRequireDefault(_modelsDevice);

	var registerDevice = function registerDevice(req, res) {
		if (!req.body.link || !req.body.id) res.status(400).send('All fields are required');else {
			// If user is already registered
			_modelsDevice2['default'].find().exec(function (err, device) {
				if (err) {
					console.error(err);
					res.send(err);
				} else if (!device) {
					res.send('Theres is already a device running on: ' + req.body.link);
				} else {
					var newDevice = new _modelsDevice2['default'](req.body);
					newDevice.save(function (err, dev) {
						if (err) return res.status(400).send({ message: err });else return res.json(dev);
					});
				}
			});
		}
	};

	exports.registerDevice = registerDevice;
	var proxy = function proxy(req, res) {
		_modelsDevice2['default'].find().exec(function (err, device) {
			if (err) {
				console.error(err);
				res.send(err);
			} else if (device) _axios2['default'].post(device.link, req.body).then(function () {
				return res.json(req.body);
			});else res.send('No devices registered');
		});
	};
	exports.proxy = proxy;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports = require("axios");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mongoose = __webpack_require__(3);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var DeviceSchema = new _mongoose2['default'].Schema({
		link: {
			type: String,
			unique: true,
			trim: true,
			required: true
		},
		id: {
			type: String,
			required: true,
			trim: true,
			required: true
		}
	});

	exports['default'] = _mongoose2['default'].model('Device', DeviceSchema);
	module.exports = exports['default'];

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	module.exports = require("dotenv");

/***/ })
/******/ ]);