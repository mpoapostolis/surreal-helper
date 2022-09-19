"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.surreal = exports.ops = exports.Surreal = void 0;
const node_fetch_1 = __importStar(require("node-fetch"));
const toBase64 = (text) => {
    return Buffer.from(text, "binary").toString("base64");
};
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
function objToQuery(obj) {
    return Object.keys(obj)
        .map((key) => `${key}='${obj[key]}'`)
        .join(", ");
}
function f(raw, conf) {
    return __awaiter(this, void 0, void 0, function* () {
        const headers = new node_fetch_1.Headers({
            "Content-Type": "application/json",
            ns: conf.ns,
            db: conf.db,
        });
        headers.append("Content-Type", "application/json");
        headers.append("ns", conf.ns);
        headers.append("db", conf.db);
        headers.append("Authorization", `Basic ${toBase64(conf.auth)}`);
        const res = yield (0, node_fetch_1.default)(conf.url, {
            method: "POST",
            headers: headers,
            body: raw,
        });
        const data = (yield res.json());
        return data;
    });
}
class Surreal {
    constructor(obj) {
        this.conf = obj;
    }
    rawQuery(q) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield f(q, this.conf);
        });
    }
    select(selections) {
        return {
            from: (table) => {
                return {
                    where: (obj = {}) => __awaiter(this, void 0, void 0, function* () {
                        const selected = selections === "*" ? "*" : selections.join(", ");
                        const where = isEmpty(obj) ? "" : `WHERE ${objToQuery(obj)}`;
                        return yield f(`SELECT ${selected}  FROM ${table} ${where}`, this.conf);
                    }),
                };
            },
        };
    }
    create(table) {
        return {
            set: (obj = {}) => __awaiter(this, void 0, void 0, function* () {
                const set = isEmpty(obj) ? "" : "SET " + objToQuery(obj);
                return yield f(`CREATE ${table} ${set}`, this.conf);
            }),
        };
    }
    update(table) {
        let where = "";
        return {
            set: (setObj = {}) => __awaiter(this, void 0, void 0, function* () {
                const set = isEmpty(setObj) ? "" : "SET " + objToQuery(setObj);
                return yield f(`UPDATE ${table} ${set}`, this.conf);
            }),
            where: (whereObj = {}) => {
                where = isEmpty(whereObj) ? "" : `WHERE ${objToQuery(whereObj)}`;
                return {
                    set: (setObj = {}) => __awaiter(this, void 0, void 0, function* () {
                        const set = isEmpty(setObj) ? "" : "SET " + objToQuery(setObj);
                        return yield f(`UPDATE ${table} ${where} ${set}`, this.conf);
                    }),
                };
            },
        };
    }
    delete(table) {
        return {
            where: (whereObj = {}) => __awaiter(this, void 0, void 0, function* () {
                const where = isEmpty(whereObj) ? "" : `WHERE ${objToQuery(whereObj)}`;
                return yield f(`DELETE ${table} ${where}`, this.conf);
            }),
        };
    }
}
exports.Surreal = Surreal;
exports.ops = {
    gt: (key, b) => ({
        key: `${key} > ${b}`,
    }),
    lt: (key, b) => ({
        key: `${key} < ${b}`,
    }),
    eq: (key, b) => ({
        key: `${key} = ${b}`,
    }),
};
exports.surreal = new Surreal({
    url: "http://localhost:8000/sql",
    ns: "default",
    db: "default",
    auth: "root:root",
});
//# sourceMappingURL=index.js.map