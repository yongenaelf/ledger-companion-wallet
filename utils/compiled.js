/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.aelf = (function() {

    /**
     * Namespace aelf.
     * @exports aelf
     * @namespace
     */
    var aelf = {};

    aelf.Transaction = (function() {

        /**
         * Properties of a Transaction.
         * @memberof aelf
         * @interface ITransaction
         * @property {aelf.IAddress|null} [from] Transaction from
         * @property {aelf.IAddress|null} [to] Transaction to
         * @property {number|Long|null} [refBlockNumber] Transaction refBlockNumber
         * @property {Uint8Array|null} [refBlockPrefix] Transaction refBlockPrefix
         * @property {string|null} [methodName] Transaction methodName
         * @property {Uint8Array|null} [params] Transaction params
         * @property {Uint8Array|null} [signature] Transaction signature
         */

        /**
         * Constructs a new Transaction.
         * @memberof aelf
         * @classdesc Represents a Transaction.
         * @implements ITransaction
         * @constructor
         * @param {aelf.ITransaction=} [properties] Properties to set
         */
        function Transaction(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Transaction from.
         * @member {aelf.IAddress|null|undefined} from
         * @memberof aelf.Transaction
         * @instance
         */
        Transaction.prototype.from = null;

        /**
         * Transaction to.
         * @member {aelf.IAddress|null|undefined} to
         * @memberof aelf.Transaction
         * @instance
         */
        Transaction.prototype.to = null;

        /**
         * Transaction refBlockNumber.
         * @member {number|Long} refBlockNumber
         * @memberof aelf.Transaction
         * @instance
         */
        Transaction.prototype.refBlockNumber = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Transaction refBlockPrefix.
         * @member {Uint8Array} refBlockPrefix
         * @memberof aelf.Transaction
         * @instance
         */
        Transaction.prototype.refBlockPrefix = $util.newBuffer([]);

        /**
         * Transaction methodName.
         * @member {string} methodName
         * @memberof aelf.Transaction
         * @instance
         */
        Transaction.prototype.methodName = "";

        /**
         * Transaction params.
         * @member {Uint8Array} params
         * @memberof aelf.Transaction
         * @instance
         */
        Transaction.prototype.params = $util.newBuffer([]);

        /**
         * Transaction signature.
         * @member {Uint8Array} signature
         * @memberof aelf.Transaction
         * @instance
         */
        Transaction.prototype.signature = $util.newBuffer([]);

        /**
         * Creates a new Transaction instance using the specified properties.
         * @function create
         * @memberof aelf.Transaction
         * @static
         * @param {aelf.ITransaction=} [properties] Properties to set
         * @returns {aelf.Transaction} Transaction instance
         */
        Transaction.create = function create(properties) {
            return new Transaction(properties);
        };

        /**
         * Encodes the specified Transaction message. Does not implicitly {@link aelf.Transaction.verify|verify} messages.
         * @function encode
         * @memberof aelf.Transaction
         * @static
         * @param {aelf.ITransaction} message Transaction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Transaction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.from != null && Object.hasOwnProperty.call(message, "from"))
                $root.aelf.Address.encode(message.from, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.to != null && Object.hasOwnProperty.call(message, "to"))
                $root.aelf.Address.encode(message.to, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.refBlockNumber != null && Object.hasOwnProperty.call(message, "refBlockNumber"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.refBlockNumber);
            if (message.refBlockPrefix != null && Object.hasOwnProperty.call(message, "refBlockPrefix"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.refBlockPrefix);
            if (message.methodName != null && Object.hasOwnProperty.call(message, "methodName"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.methodName);
            if (message.params != null && Object.hasOwnProperty.call(message, "params"))
                writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.params);
            if (message.signature != null && Object.hasOwnProperty.call(message, "signature"))
                writer.uint32(/* id 10000, wireType 2 =*/80002).bytes(message.signature);
            return writer;
        };

        /**
         * Encodes the specified Transaction message, length delimited. Does not implicitly {@link aelf.Transaction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof aelf.Transaction
         * @static
         * @param {aelf.ITransaction} message Transaction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Transaction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Transaction message from the specified reader or buffer.
         * @function decode
         * @memberof aelf.Transaction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {aelf.Transaction} Transaction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Transaction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.aelf.Transaction();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.from = $root.aelf.Address.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        message.to = $root.aelf.Address.decode(reader, reader.uint32());
                        break;
                    }
                case 3: {
                        message.refBlockNumber = reader.int64();
                        break;
                    }
                case 4: {
                        message.refBlockPrefix = reader.bytes();
                        break;
                    }
                case 5: {
                        message.methodName = reader.string();
                        break;
                    }
                case 6: {
                        message.params = reader.bytes();
                        break;
                    }
                case 10000: {
                        message.signature = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Transaction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof aelf.Transaction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {aelf.Transaction} Transaction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Transaction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Transaction message.
         * @function verify
         * @memberof aelf.Transaction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Transaction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.from != null && message.hasOwnProperty("from")) {
                var error = $root.aelf.Address.verify(message.from);
                if (error)
                    return "from." + error;
            }
            if (message.to != null && message.hasOwnProperty("to")) {
                var error = $root.aelf.Address.verify(message.to);
                if (error)
                    return "to." + error;
            }
            if (message.refBlockNumber != null && message.hasOwnProperty("refBlockNumber"))
                if (!$util.isInteger(message.refBlockNumber) && !(message.refBlockNumber && $util.isInteger(message.refBlockNumber.low) && $util.isInteger(message.refBlockNumber.high)))
                    return "refBlockNumber: integer|Long expected";
            if (message.refBlockPrefix != null && message.hasOwnProperty("refBlockPrefix"))
                if (!(message.refBlockPrefix && typeof message.refBlockPrefix.length === "number" || $util.isString(message.refBlockPrefix)))
                    return "refBlockPrefix: buffer expected";
            if (message.methodName != null && message.hasOwnProperty("methodName"))
                if (!$util.isString(message.methodName))
                    return "methodName: string expected";
            if (message.params != null && message.hasOwnProperty("params"))
                if (!(message.params && typeof message.params.length === "number" || $util.isString(message.params)))
                    return "params: buffer expected";
            if (message.signature != null && message.hasOwnProperty("signature"))
                if (!(message.signature && typeof message.signature.length === "number" || $util.isString(message.signature)))
                    return "signature: buffer expected";
            return null;
        };

        /**
         * Creates a Transaction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof aelf.Transaction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {aelf.Transaction} Transaction
         */
        Transaction.fromObject = function fromObject(object) {
            if (object instanceof $root.aelf.Transaction)
                return object;
            var message = new $root.aelf.Transaction();
            if (object.from != null) {
                if (typeof object.from !== "object")
                    throw TypeError(".aelf.Transaction.from: object expected");
                message.from = $root.aelf.Address.fromObject(object.from);
            }
            if (object.to != null) {
                if (typeof object.to !== "object")
                    throw TypeError(".aelf.Transaction.to: object expected");
                message.to = $root.aelf.Address.fromObject(object.to);
            }
            if (object.refBlockNumber != null)
                if ($util.Long)
                    (message.refBlockNumber = $util.Long.fromValue(object.refBlockNumber)).unsigned = false;
                else if (typeof object.refBlockNumber === "string")
                    message.refBlockNumber = parseInt(object.refBlockNumber, 10);
                else if (typeof object.refBlockNumber === "number")
                    message.refBlockNumber = object.refBlockNumber;
                else if (typeof object.refBlockNumber === "object")
                    message.refBlockNumber = new $util.LongBits(object.refBlockNumber.low >>> 0, object.refBlockNumber.high >>> 0).toNumber();
            if (object.refBlockPrefix != null)
                if (typeof object.refBlockPrefix === "string")
                    $util.base64.decode(object.refBlockPrefix, message.refBlockPrefix = $util.newBuffer($util.base64.length(object.refBlockPrefix)), 0);
                else if (object.refBlockPrefix.length >= 0)
                    message.refBlockPrefix = object.refBlockPrefix;
            if (object.methodName != null)
                message.methodName = String(object.methodName);
            if (object.params != null)
                if (typeof object.params === "string")
                    $util.base64.decode(object.params, message.params = $util.newBuffer($util.base64.length(object.params)), 0);
                else if (object.params.length >= 0)
                    message.params = object.params;
            if (object.signature != null)
                if (typeof object.signature === "string")
                    $util.base64.decode(object.signature, message.signature = $util.newBuffer($util.base64.length(object.signature)), 0);
                else if (object.signature.length >= 0)
                    message.signature = object.signature;
            return message;
        };

        /**
         * Creates a plain object from a Transaction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof aelf.Transaction
         * @static
         * @param {aelf.Transaction} message Transaction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Transaction.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.from = null;
                object.to = null;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.refBlockNumber = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.refBlockNumber = options.longs === String ? "0" : 0;
                if (options.bytes === String)
                    object.refBlockPrefix = "";
                else {
                    object.refBlockPrefix = [];
                    if (options.bytes !== Array)
                        object.refBlockPrefix = $util.newBuffer(object.refBlockPrefix);
                }
                object.methodName = "";
                if (options.bytes === String)
                    object.params = "";
                else {
                    object.params = [];
                    if (options.bytes !== Array)
                        object.params = $util.newBuffer(object.params);
                }
                if (options.bytes === String)
                    object.signature = "";
                else {
                    object.signature = [];
                    if (options.bytes !== Array)
                        object.signature = $util.newBuffer(object.signature);
                }
            }
            if (message.from != null && message.hasOwnProperty("from"))
                object.from = $root.aelf.Address.toObject(message.from, options);
            if (message.to != null && message.hasOwnProperty("to"))
                object.to = $root.aelf.Address.toObject(message.to, options);
            if (message.refBlockNumber != null && message.hasOwnProperty("refBlockNumber"))
                if (typeof message.refBlockNumber === "number")
                    object.refBlockNumber = options.longs === String ? String(message.refBlockNumber) : message.refBlockNumber;
                else
                    object.refBlockNumber = options.longs === String ? $util.Long.prototype.toString.call(message.refBlockNumber) : options.longs === Number ? new $util.LongBits(message.refBlockNumber.low >>> 0, message.refBlockNumber.high >>> 0).toNumber() : message.refBlockNumber;
            if (message.refBlockPrefix != null && message.hasOwnProperty("refBlockPrefix"))
                object.refBlockPrefix = options.bytes === String ? $util.base64.encode(message.refBlockPrefix, 0, message.refBlockPrefix.length) : options.bytes === Array ? Array.prototype.slice.call(message.refBlockPrefix) : message.refBlockPrefix;
            if (message.methodName != null && message.hasOwnProperty("methodName"))
                object.methodName = message.methodName;
            if (message.params != null && message.hasOwnProperty("params"))
                object.params = options.bytes === String ? $util.base64.encode(message.params, 0, message.params.length) : options.bytes === Array ? Array.prototype.slice.call(message.params) : message.params;
            if (message.signature != null && message.hasOwnProperty("signature"))
                object.signature = options.bytes === String ? $util.base64.encode(message.signature, 0, message.signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.signature) : message.signature;
            return object;
        };

        /**
         * Converts this Transaction to JSON.
         * @function toJSON
         * @memberof aelf.Transaction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Transaction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Transaction
         * @function getTypeUrl
         * @memberof aelf.Transaction
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Transaction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/aelf.Transaction";
        };

        return Transaction;
    })();

    aelf.Address = (function() {

        /**
         * Properties of an Address.
         * @memberof aelf
         * @interface IAddress
         * @property {Uint8Array|null} [value] Address value
         */

        /**
         * Constructs a new Address.
         * @memberof aelf
         * @classdesc Represents an Address.
         * @implements IAddress
         * @constructor
         * @param {aelf.IAddress=} [properties] Properties to set
         */
        function Address(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Address value.
         * @member {Uint8Array} value
         * @memberof aelf.Address
         * @instance
         */
        Address.prototype.value = $util.newBuffer([]);

        /**
         * Creates a new Address instance using the specified properties.
         * @function create
         * @memberof aelf.Address
         * @static
         * @param {aelf.IAddress=} [properties] Properties to set
         * @returns {aelf.Address} Address instance
         */
        Address.create = function create(properties) {
            return new Address(properties);
        };

        /**
         * Encodes the specified Address message. Does not implicitly {@link aelf.Address.verify|verify} messages.
         * @function encode
         * @memberof aelf.Address
         * @static
         * @param {aelf.IAddress} message Address message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Address.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.value);
            return writer;
        };

        /**
         * Encodes the specified Address message, length delimited. Does not implicitly {@link aelf.Address.verify|verify} messages.
         * @function encodeDelimited
         * @memberof aelf.Address
         * @static
         * @param {aelf.IAddress} message Address message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Address.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Address message from the specified reader or buffer.
         * @function decode
         * @memberof aelf.Address
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {aelf.Address} Address
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Address.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.aelf.Address();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.value = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Address message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof aelf.Address
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {aelf.Address} Address
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Address.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Address message.
         * @function verify
         * @memberof aelf.Address
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Address.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.value != null && message.hasOwnProperty("value"))
                if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                    return "value: buffer expected";
            return null;
        };

        /**
         * Creates an Address message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof aelf.Address
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {aelf.Address} Address
         */
        Address.fromObject = function fromObject(object) {
            if (object instanceof $root.aelf.Address)
                return object;
            var message = new $root.aelf.Address();
            if (object.value != null)
                if (typeof object.value === "string")
                    $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                else if (object.value.length >= 0)
                    message.value = object.value;
            return message;
        };

        /**
         * Creates a plain object from an Address message. Also converts values to other types if specified.
         * @function toObject
         * @memberof aelf.Address
         * @static
         * @param {aelf.Address} message Address
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Address.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if (options.bytes === String)
                    object.value = "";
                else {
                    object.value = [];
                    if (options.bytes !== Array)
                        object.value = $util.newBuffer(object.value);
                }
            if (message.value != null && message.hasOwnProperty("value"))
                object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
            return object;
        };

        /**
         * Converts this Address to JSON.
         * @function toJSON
         * @memberof aelf.Address
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Address.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Address
         * @function getTypeUrl
         * @memberof aelf.Address
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Address.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/aelf.Address";
        };

        return Address;
    })();

    aelf.TransferInput = (function() {

        /**
         * Properties of a TransferInput.
         * @memberof aelf
         * @interface ITransferInput
         * @property {aelf.IAddress|null} [to] TransferInput to
         * @property {string|null} [symbol] TransferInput symbol
         * @property {number|Long|null} [amount] TransferInput amount
         * @property {string|null} [memo] TransferInput memo
         */

        /**
         * Constructs a new TransferInput.
         * @memberof aelf
         * @classdesc Represents a TransferInput.
         * @implements ITransferInput
         * @constructor
         * @param {aelf.ITransferInput=} [properties] Properties to set
         */
        function TransferInput(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TransferInput to.
         * @member {aelf.IAddress|null|undefined} to
         * @memberof aelf.TransferInput
         * @instance
         */
        TransferInput.prototype.to = null;

        /**
         * TransferInput symbol.
         * @member {string} symbol
         * @memberof aelf.TransferInput
         * @instance
         */
        TransferInput.prototype.symbol = "";

        /**
         * TransferInput amount.
         * @member {number|Long} amount
         * @memberof aelf.TransferInput
         * @instance
         */
        TransferInput.prototype.amount = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * TransferInput memo.
         * @member {string} memo
         * @memberof aelf.TransferInput
         * @instance
         */
        TransferInput.prototype.memo = "";

        /**
         * Creates a new TransferInput instance using the specified properties.
         * @function create
         * @memberof aelf.TransferInput
         * @static
         * @param {aelf.ITransferInput=} [properties] Properties to set
         * @returns {aelf.TransferInput} TransferInput instance
         */
        TransferInput.create = function create(properties) {
            return new TransferInput(properties);
        };

        /**
         * Encodes the specified TransferInput message. Does not implicitly {@link aelf.TransferInput.verify|verify} messages.
         * @function encode
         * @memberof aelf.TransferInput
         * @static
         * @param {aelf.ITransferInput} message TransferInput message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TransferInput.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.to != null && Object.hasOwnProperty.call(message, "to"))
                $root.aelf.Address.encode(message.to, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.symbol != null && Object.hasOwnProperty.call(message, "symbol"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.symbol);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.amount);
            if (message.memo != null && Object.hasOwnProperty.call(message, "memo"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.memo);
            return writer;
        };

        /**
         * Encodes the specified TransferInput message, length delimited. Does not implicitly {@link aelf.TransferInput.verify|verify} messages.
         * @function encodeDelimited
         * @memberof aelf.TransferInput
         * @static
         * @param {aelf.ITransferInput} message TransferInput message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TransferInput.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TransferInput message from the specified reader or buffer.
         * @function decode
         * @memberof aelf.TransferInput
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {aelf.TransferInput} TransferInput
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TransferInput.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.aelf.TransferInput();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.to = $root.aelf.Address.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        message.symbol = reader.string();
                        break;
                    }
                case 3: {
                        message.amount = reader.int64();
                        break;
                    }
                case 4: {
                        message.memo = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TransferInput message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof aelf.TransferInput
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {aelf.TransferInput} TransferInput
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TransferInput.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TransferInput message.
         * @function verify
         * @memberof aelf.TransferInput
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TransferInput.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.to != null && message.hasOwnProperty("to")) {
                var error = $root.aelf.Address.verify(message.to);
                if (error)
                    return "to." + error;
            }
            if (message.symbol != null && message.hasOwnProperty("symbol"))
                if (!$util.isString(message.symbol))
                    return "symbol: string expected";
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (!$util.isInteger(message.amount) && !(message.amount && $util.isInteger(message.amount.low) && $util.isInteger(message.amount.high)))
                    return "amount: integer|Long expected";
            if (message.memo != null && message.hasOwnProperty("memo"))
                if (!$util.isString(message.memo))
                    return "memo: string expected";
            return null;
        };

        /**
         * Creates a TransferInput message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof aelf.TransferInput
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {aelf.TransferInput} TransferInput
         */
        TransferInput.fromObject = function fromObject(object) {
            if (object instanceof $root.aelf.TransferInput)
                return object;
            var message = new $root.aelf.TransferInput();
            if (object.to != null) {
                if (typeof object.to !== "object")
                    throw TypeError(".aelf.TransferInput.to: object expected");
                message.to = $root.aelf.Address.fromObject(object.to);
            }
            if (object.symbol != null)
                message.symbol = String(object.symbol);
            if (object.amount != null)
                if ($util.Long)
                    (message.amount = $util.Long.fromValue(object.amount)).unsigned = false;
                else if (typeof object.amount === "string")
                    message.amount = parseInt(object.amount, 10);
                else if (typeof object.amount === "number")
                    message.amount = object.amount;
                else if (typeof object.amount === "object")
                    message.amount = new $util.LongBits(object.amount.low >>> 0, object.amount.high >>> 0).toNumber();
            if (object.memo != null)
                message.memo = String(object.memo);
            return message;
        };

        /**
         * Creates a plain object from a TransferInput message. Also converts values to other types if specified.
         * @function toObject
         * @memberof aelf.TransferInput
         * @static
         * @param {aelf.TransferInput} message TransferInput
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TransferInput.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.to = null;
                object.symbol = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.amount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.amount = options.longs === String ? "0" : 0;
                object.memo = "";
            }
            if (message.to != null && message.hasOwnProperty("to"))
                object.to = $root.aelf.Address.toObject(message.to, options);
            if (message.symbol != null && message.hasOwnProperty("symbol"))
                object.symbol = message.symbol;
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (typeof message.amount === "number")
                    object.amount = options.longs === String ? String(message.amount) : message.amount;
                else
                    object.amount = options.longs === String ? $util.Long.prototype.toString.call(message.amount) : options.longs === Number ? new $util.LongBits(message.amount.low >>> 0, message.amount.high >>> 0).toNumber() : message.amount;
            if (message.memo != null && message.hasOwnProperty("memo"))
                object.memo = message.memo;
            return object;
        };

        /**
         * Converts this TransferInput to JSON.
         * @function toJSON
         * @memberof aelf.TransferInput
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TransferInput.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for TransferInput
         * @function getTypeUrl
         * @memberof aelf.TransferInput
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        TransferInput.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/aelf.TransferInput";
        };

        return TransferInput;
    })();

    return aelf;
})();

module.exports = $root;
