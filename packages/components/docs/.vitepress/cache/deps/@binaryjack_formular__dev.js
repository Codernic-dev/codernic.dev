import "./chunk-7D4SUZUM.js";

// ../../node_modules/.pnpm/@binaryjack+formular.dev@2.3.9/node_modules/@binaryjack/formular.dev/dist/formular-dev.mjs
var wi = Object.defineProperty;
var Oi = (e, t, n) => t in e ? wi(e, t, { enumerable: true, configurable: true, writable: true, value: n }) : e[t] = n;
var F = (e, t, n) => Oi(e, typeof t != "symbol" ? t + "" : t, n);
function Ai(e) {
  const t = Object.create(Object.getPrototypeOf(this));
  return t._parse = this._parse, t._refinements = [...this._refinements], t._isOptional = this._isOptional, t._isNullable = this._isNullable, t._defaultValue = e, t._transforms = [...this._transforms], this._debounce !== void 0 && (t._debounce = this._debounce), t;
}
function Di() {
  const e = Object.create(Object.getPrototypeOf(this));
  return e._parse = this._parse, e._refinements = [...this._refinements], e._isOptional = this._isOptional, e._isNullable = true, e._defaultValue = this._defaultValue, e._transforms = [...this._transforms], this._debounce !== void 0 && (e._debounce = this._debounce), e;
}
function $i() {
  const e = Object.create(Object.getPrototypeOf(this));
  return e._parse = this._parse, e._refinements = [...this._refinements], e._isOptional = true, e._isNullable = this._isNullable, e._defaultValue = this._defaultValue, e._transforms = [...this._transforms], this._debounce !== void 0 && (e._debounce = this._debounce), e;
}
var J = function(e) {
  this.name = "SchemaValidationError", this.message = e.message, this.code = e.code, this.path = e.path, this.errors = [e], Error.captureStackTrace && Error.captureStackTrace(this, J);
};
J.prototype = Object.create(Error.prototype);
J.prototype.constructor = J;
J.prototype.name = "SchemaValidationError";
var y = ((e) => (e.InvalidType = "invalid_type", e.Required = "required", e.TooSmall = "too_small", e.TooBig = "too_big", e.InvalidString = "invalid_string", e.InvalidNumber = "invalid_number", e.InvalidDate = "invalid_date", e.InvalidEnum = "invalid_enum", e.InvalidLiteral = "invalid_literal", e.InvalidUnion = "invalid_union", e.Custom = "custom", e))(y || {});
var Ti = ((e) => (e.Email = "email", e.Url = "url", e.Regex = "regex", e.Phone = "phone", e.PostalCode = "postal_code", e.AHV = "ahv", e))(Ti || {});
var Ri = ((e) => (e.Integer = "integer", e.Positive = "positive", e.Negative = "negative", e.MultipleOf = "multiple_of", e.Finite = "finite", e.Safe = "safe", e))(Ri || {});
var I = {
  requiredField: "This field is required",
  invalidType: (e) => `Expected ${e}`,
  tooSmall: (e, t) => t === "string" ? `String must contain at least ${e} character(s)` : t === "array" ? `Array must contain at least ${e} element(s)` : `Number must be greater than or equal to ${e}`,
  tooBig: (e, t) => t === "string" ? `String must contain at most ${e} character(s)` : t === "array" ? `Array must contain at most ${e} element(s)` : `Number must be less than or equal to ${e}`,
  invalidEmail: "Invalid email address",
  invalidUrl: "Invalid URL",
  invalidPattern: "Invalid format",
  invalidEnum: (e) => `Value must be one of: ${e.join(", ")}`,
  invalidLiteral: (e) => `Value must be ${e}`,
  invalidInteger: "Must be an integer",
  invalidPositive: "Must be positive",
  invalidNegative: "Must be negative",
  invalidPhone: "Invalid phone number",
  invalidPostalCode: "Invalid postal code",
  invalidAHV: "Invalid AHV number"
};
function Y(e, t = y.Custom, n = []) {
  return {
    message: e,
    code: t,
    path: n
  };
}
function U(e, t = []) {
  return Y(`Expected ${e}`, y.InvalidType, t);
}
function Li(e) {
  const t = this.safeParse(e);
  if (!t.success)
    throw new J(t.error);
  return t.data;
}
function xi(e, t = {}) {
  const n = Object.create(Object.getPrototypeOf(this));
  return n._parse = this._parse, n._refinements = [
    ...this._refinements,
    {
      check: e,
      message: t.message ?? "Validation failed",
      code: t.code ?? y.Custom
    }
  ], n._isOptional = this._isOptional, n._isNullable = this._isNullable, n._defaultValue = this._defaultValue, n._transforms = [...this._transforms], this._debounce !== void 0 && (n._debounce = this._debounce), n;
}
function Gi(e) {
  try {
    if (e === void 0)
      return this._isOptional ? { success: true, data: void 0 } : this._defaultValue !== void 0 ? { success: true, data: this._defaultValue } : {
        success: false,
        error: Y("Value is required", y.Required, [])
      };
    if (e === null)
      return this._isNullable ? { success: true, data: null } : {
        success: false,
        error: Y(
          "Value cannot be null",
          y.InvalidType,
          []
        )
      };
    let t = this._parse(e, []);
    for (const n of this._transforms)
      t = n(t);
    for (const n of this._refinements)
      if (!n.check(t))
        return {
          success: false,
          error: Y(n.message, n.code, [])
        };
    return { success: true, data: t };
  } catch (t) {
    if (t && typeof t == "object" && "name" in t && t.name === "SchemaValidationError") {
      const i = t;
      return i.errors && i.errors.length > 0 ? {
        success: false,
        error: i.errors[0]
      } : {
        success: false,
        error: Y(i.message, i.code || y.Custom, i.path || [])
      };
    }
    return {
      success: false,
      error: Y(t.message, y.Custom, [])
    };
  }
}
function ki() {
  const e = {}, t = this.constructor.name;
  switch (this._isOptional && (e.optional = true), this._isNullable && (e.nullable = true), this._defaultValue !== void 0 && (e.default = this._defaultValue), t) {
    case "StringSchema":
      e.type = "string";
      break;
    case "NumberSchema":
      e.type = "number";
      break;
    case "BooleanSchema":
      e.type = "boolean";
      break;
    case "DateSchema":
      e.type = "string", e.format = "date-time";
      break;
    case "ArraySchema": {
      e.type = "array";
      const n = this;
      n.element && typeof n.element.toJSONSchema == "function" && (e.items = n.element.toJSONSchema());
      break;
    }
    case "ObjectSchema": {
      e.type = "object", e.properties = {}, e.required = [];
      const n = this;
      if (n.shape)
        for (const i in n.shape) {
          const s = n.shape[i];
          typeof s.toJSONSchema == "function" && (e.properties[i] = s.toJSONSchema(), s._isOptional || e.required.push(i));
        }
      e.required.length === 0 && delete e.required;
      break;
    }
    case "EnumSchema": {
      e.type = "string";
      const n = this;
      n.values && (e.enum = [...n.values]);
      break;
    }
    case "LiteralSchema": {
      const n = this;
      e.type = typeof n.value, e.const = n.value;
      break;
    }
    case "UnionSchema": {
      const n = this;
      n.options && Array.isArray(n.options) && (e.anyOf = n.options.map(
        (i) => typeof i.toJSONSchema == "function" ? i.toJSONSchema() : {}
      ));
      break;
    }
    case "RecordSchema": {
      e.type = "object";
      const n = this;
      n.valueSchema && typeof n.valueSchema.toJSONSchema == "function" && (e.additionalProperties = n.valueSchema.toJSONSchema());
      break;
    }
    default:
      e.type = "unknown";
  }
  return e;
}
function Pi(e) {
  const t = Object.create(Object.getPrototypeOf(this));
  return t._parse = this._parse, t._refinements = [], t._isOptional = this._isOptional, t._isNullable = this._isNullable, t._defaultValue = void 0, t._transforms = [...this._transforms, e], this._debounce !== void 0 && (t._debounce = this._debounce), t;
}
var E = function(e) {
  this._parse = e, this._refinements = [], this._isOptional = false, this._isNullable = false, this._defaultValue = void 0, this._transforms = [];
};
Object.assign(E.prototype, {
  default: Ai,
  nullable: Di,
  optional: $i,
  parse: Li,
  refine: xi,
  safeParse: Gi,
  toJSONSchema: ki,
  transform: Pi
});
function Ph(e) {
  return { success: true, data: e };
}
function Vh(e) {
  return { success: false, error: e };
}
function Vi(e, t) {
  return this.refine((n) => n.length === e, {
    message: t ?? `Array must contain exactly ${e} element(s)`,
    code: y.InvalidType
  });
}
function _i(e, t) {
  return this.refine((n) => n.length <= e, {
    message: t ?? I.tooBig(e, "array"),
    code: y.TooBig
  });
}
function Fi(e, t) {
  return this.refine((n) => n.length >= e, {
    message: t ?? I.tooSmall(e, "array"),
    code: y.TooSmall
  });
}
function Bi(e) {
  return this.refine((t) => t.length > 0, {
    message: e ?? "Array cannot be empty",
    code: y.Required
  });
}
var he = function(e) {
  this.element = e, E.call(this, (t, n) => {
    if (!Array.isArray(t))
      throw new Error(U("array", n).message);
    return t.map((i, s) => {
      try {
        return e.parse(i);
      } catch (r) {
        const o = r;
        throw new Error(`At index ${s}: ${o.message}`);
      }
    });
  });
};
he.prototype = Object.create(E.prototype);
he.prototype.constructor = he;
Object.assign(he.prototype, {
  min: Fi,
  max: _i,
  length: Vi,
  nonempty: Bi
});
function ji(e) {
  return this.refine((t) => t === false, {
    message: e ?? "Value must be false",
    code: y.Custom
  });
}
function Ui(e) {
  return this.refine((t) => t === true, {
    message: e ?? "Value must be true",
    code: y.Custom
  });
}
var ge = function() {
  E.call(this, (e, t) => {
    if (typeof e != "boolean")
      throw new Error(U("boolean", t).message);
    return e;
  });
};
ge.prototype = Object.create(E.prototype);
ge.prototype.constructor = ge;
Object.assign(ge.prototype, {
  true: Ui,
  false: ji
});
function zi(e, t) {
  return this.refine((n) => n.getTime() <= e.getTime(), {
    message: t ?? `Date must be before ${e.toISOString()}`,
    code: y.TooBig
  });
}
function qi(e, t) {
  return this.refine((n) => n.getTime() >= e.getTime(), {
    message: t ?? `Date must be after ${e.toISOString()}`,
    code: y.TooSmall
  });
}
var pe = function() {
  E.call(this, (e, t) => {
    if (e instanceof Date) {
      if (isNaN(e.getTime()))
        throw new Error(U("valid date", t).message);
      return e;
    }
    if (typeof e == "string" || typeof e == "number") {
      const n = new Date(e);
      if (isNaN(n.getTime()))
        throw new Error(U("valid date", t).message);
      return n;
    }
    throw new Error(U("date", t).message);
  });
};
pe.prototype = Object.create(E.prototype);
pe.prototype.constructor = pe;
Object.assign(pe.prototype, {
  min: qi,
  max: zi
});
var we = function(e) {
  this.values = e, E.call(this, (t, n) => {
    if (typeof t != "string" || !e.includes(t))
      throw new Error(
        Y(
          `Expected one of: ${e.join(", ")}`,
          y.InvalidEnum,
          n
        ).message
      );
    return t;
  });
};
we.prototype = Object.create(E.prototype);
we.prototype.constructor = we;
var Oe = function(e) {
  this.value = e, E.call(this, (t, n) => {
    if (t !== e)
      throw new Error(
        Y(
          `Expected literal ${e}`,
          y.InvalidLiteral,
          n
        ).message
      );
    return e;
  });
};
Oe.prototype = Object.create(E.prototype);
Oe.prototype.constructor = Oe;
function Hi(e) {
  return this._debounce = e, this;
}
function Wi(e) {
  return this.refine((t) => Number.isFinite(t), {
    message: e ?? "Number must be finite",
    code: y.InvalidNumber
  });
}
function Yi(e) {
  return this.refine((t) => Number.isInteger(t), {
    message: e ?? I.invalidInteger,
    code: y.InvalidNumber
  });
}
function Zi(e, t) {
  return this.refine((n) => n <= e, {
    message: t ?? I.tooBig(e, "number"),
    code: y.TooBig
  });
}
function Ji(e, t) {
  return this.refine((n) => n >= e, {
    message: t ?? I.tooSmall(e, "number"),
    code: y.TooSmall
  });
}
function Ki(e, t) {
  return this.refine((n) => n % e === 0, {
    message: t ?? `Number must be a multiple of ${e}`,
    code: y.InvalidNumber
  });
}
function Qi(e) {
  return this.refine((t) => t < 0, {
    message: e ?? I.invalidNegative,
    code: y.InvalidNumber
  });
}
function Xi(e) {
  return this.refine((t) => t >= 0, {
    message: e ?? "Number must be non-negative",
    code: y.InvalidNumber
  });
}
function es(e) {
  return this.refine((t) => t <= 0, {
    message: e ?? "Number must be non-positive",
    code: y.InvalidNumber
  });
}
function ts(e) {
  return this.refine((t) => t > 0, {
    message: e ?? I.invalidPositive,
    code: y.InvalidNumber
  });
}
function ns(e) {
  return this.refine((t) => Number.isSafeInteger(t), {
    message: e ?? "Number must be a safe integer",
    code: y.InvalidNumber
  });
}
var me = function() {
  E.call(this, (e, t) => {
    if (typeof e == "string" && !isNaN(Number(e)))
      return Number(e);
    if (typeof e != "number")
      throw new Error(U("number", t).message);
    if (isNaN(e))
      throw new Error("Value is NaN");
    return e;
  });
};
me.prototype = Object.create(E.prototype);
me.prototype.constructor = me;
Object.assign(me.prototype, {
  min: Ji,
  max: Zi,
  int: Yi,
  positive: ts,
  negative: Qi,
  nonpositive: es,
  nonnegative: Xi,
  multipleOf: Ki,
  finite: Wi,
  safe: ns,
  debounce: Hi
});
function is(e) {
  const t = { ...this.shape, ...e };
  return new G(t);
}
function ss(e) {
  const t = { ...this.shape, ...e.shape };
  return new G(t);
}
function rs(e) {
  const t = {}, n = new Set(e);
  for (const i in this.shape)
    Object.prototype.hasOwnProperty.call(this.shape, i) && !n.has(i) && (t[i] = this.shape[i]);
  return new G(t);
}
function as() {
  const e = {};
  for (const t in this.shape)
    Object.prototype.hasOwnProperty.call(this.shape, t) && (e[t] = this.shape[t].optional());
  return new G(
    e
  );
}
function os(e) {
  const t = {};
  for (const n of e)
    Object.prototype.hasOwnProperty.call(this.shape, n) && (t[n] = this.shape[n]);
  return new G(t);
}
function us() {
  return new G(this.shape);
}
var G = function(e) {
  E.call(this, (t, n) => {
    if (typeof t != "object" || t === null || Array.isArray(t))
      throw new J(U("object", n));
    const i = t, s = {}, r = [];
    for (const o in this.shape) {
      const u = this.shape[o], c = [...n, o];
      try {
        s[o] = u.parse(i[o]);
      } catch (d) {
        if (d.name === "SchemaValidationError")
          if (d.errors)
            for (const g of d.errors)
              r.push({
                ...g,
                path: [...c, ...g.path]
              });
          else
            r.push({
              ...d,
              path: c
            });
        else
          r.push({
            message: d.message,
            code: "custom",
            path: c
          });
      }
    }
    if (r.length > 0) {
      const o = new J(r[0]);
      throw o.errors = r, o;
    }
    return s;
  }), this.shape = e, E.call(this, (t, n = []) => {
    if (typeof t != "object" || t === null || Array.isArray(t))
      throw new Error(`Expected object, received ${t === null ? "null" : typeof t}`);
    const i = {}, s = [];
    for (const r in e) {
      const o = e[r], u = t[r], c = o.safeParse(u);
      c.success ? c.data !== void 0 && (i[r] = c.data) : s.push(`${r}: ${c.error.message}`);
    }
    if (s.length > 0)
      throw new Error(`Object validation failed: ${s.join("; ")}`);
    return i;
  });
};
G.prototype = Object.create(E.prototype);
G.prototype.constructor = G;
Object.assign(G.prototype, {
  partial: as,
  required: us,
  pick: os,
  omit: rs,
  extend: is,
  merge: ss
});
var cs = function(e, t) {
  this.keySchema = e, this.valueSchema = t, E.call(this, (n, i) => {
    if (typeof n != "object" || n === null || Array.isArray(n))
      throw new Error(U("record", i).message);
    const s = {}, r = n;
    for (const o in r)
      if (Object.prototype.hasOwnProperty.call(r, o))
        try {
          const u = e.parse(o), c = t.parse(
            r[o]
          );
          s[u] = c;
        } catch (u) {
          const c = u;
          throw new Error(`At key "${o}": ${c.message}`);
        }
    return s;
  });
};
function ls(e) {
  return this.refine((t) => As(t), {
    message: e ?? I.invalidAHV,
    code: y.InvalidString
  });
}
function ds(e) {
  return this._debounce = e, this;
}
function hs(e) {
  const t = this.refine((n) => kt.test(n), {
    message: e ?? I.invalidEmail,
    code: y.InvalidString
  });
  return t._email = { value: kt, message: e ?? I.invalidEmail }, t;
}
function gs(e, t) {
  return this.refine((n) => n.length === e, {
    message: t ?? `String must be exactly ${e} character(s)`,
    code: y.InvalidString
  });
}
function ps(e, t) {
  const n = this.refine((i) => i.length <= e, {
    message: t ?? I.tooBig(e, "string"),
    code: y.TooBig
  });
  return n._max = {
    value: e,
    message: t ?? I.tooBig(e, "string")
  }, n;
}
function ms(e, t) {
  const n = this.refine((i) => i.length >= e, {
    message: t ?? I.tooSmall(e, "string"),
    code: y.TooSmall
  });
  return n._min = {
    value: e,
    message: t ?? I.tooSmall(e, "string")
  }, n;
}
function fs(e) {
  const t = this.refine((n) => n.length > 0, {
    message: e ?? I.requiredField,
    code: y.Required
  });
  return t._required = { value: true, message: e ?? I.requiredField }, t;
}
function ys(e, t) {
  return this.refine((n) => e.test(n), {
    message: t ?? I.invalidPattern,
    code: y.InvalidString
  });
}
function vs(e, t) {
  const n = Ns[e.toUpperCase()];
  if (!n)
    throw new Error(`Unsupported country code for phone validation: ${e}`);
  return this.refine((i) => n.test(i), {
    message: t ?? I.invalidPhone,
    code: y.InvalidString
  });
}
function bs(e, t) {
  const n = ws[e.toUpperCase()];
  if (!n)
    throw new Error(`Unsupported country code for postal code validation: ${e}`);
  return this.refine((i) => n.test(i), {
    message: t ?? I.invalidPostalCode,
    code: y.InvalidString
  });
}
function Ms() {
  return this.transform((e) => e.toLowerCase());
}
function Es() {
  return this.transform((e) => e.toUpperCase());
}
function Ss() {
  return this.transform((e) => e.trim());
}
function Cs(e) {
  return this.refine((t) => Is.test(t), {
    message: e ?? I.invalidUrl,
    code: y.InvalidString
  });
}
var kt = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var Is = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)$/;
var Ns = {
  CH: /^(\+41|0041|0)[1-9]\d{8}$/,
  US: /^(\+1|001|1)?[2-9]\d{9}$/,
  UK: /^(\+44|0044|0)[1-9]\d{9,10}$/,
  FR: /^(\+33|0033|0)[1-9]\d{8}$/,
  DE: /^(\+49|0049|0)[1-9]\d{9,11}$/,
  IT: /^(\+39|0039|0)?[0-9]{9,10}$/,
  ES: /^(\+34|0034)?[6-9]\d{8}$/,
  CA: /^(\+1|001|1)?[2-9]\d{9}$/,
  AU: /^(\+61|0061|0)[2-478]\d{8}$/,
  JP: /^(\+81|0081|0)[1-9]\d{9}$/
};
var ws = {
  CH: /^[1-9]\d{3}$/,
  US: /^\d{5}(-\d{4})?$/,
  UK: /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i,
  FR: /^\d{5}$/,
  DE: /^\d{5}$/,
  IT: /^\d{5}$/,
  ES: /^\d{5}$/,
  CA: /^[A-Z]\d[A-Z] ?\d[A-Z]\d$/i,
  AU: /^\d{4}$/,
  JP: /^\d{3}-?\d{4}$/
};
var Os = /^756\.\d{4}\.\d{4}\.\d{2}$/;
function As(e) {
  if (!Os.test(e))
    return false;
  const t = e.replace(/\./g, "").split("").map(Number);
  let n = 0;
  for (let s = 0; s < t.length - 1; s++)
    n += t[s] * (s % 2 === 0 ? 1 : 3);
  return (10 - n % 10) % 10 === t[t.length - 1];
}
var fe = function() {
  E.call(this, (e, t) => {
    if (typeof e != "string")
      throw new Error(U("string", t).message);
    return e;
  });
};
fe.prototype = Object.create(E.prototype);
fe.prototype.constructor = fe;
Object.assign(fe.prototype, {
  email: hs,
  url: Cs,
  min: ms,
  max: ps,
  length: gs,
  pattern: ys,
  trim: Ss,
  toLowerCase: Ms,
  toUpperCase: Es,
  nonempty: fs,
  phone: vs,
  postalCode: bs,
  ahv: ls,
  debounce: ds
});
var Ae = function(e) {
  this.options = e, E.call(this, (t, n) => {
    const i = [];
    for (const s of e) {
      const r = s.safeParse(t);
      if (r.success)
        return r.data;
      i.push(r.error.message);
    }
    throw new Error(`No union variant matched. Errors: ${i.join("; ")}`);
  });
};
Ae.prototype = Object.create(E.prototype);
Ae.prototype.constructor = Ae;
var m = {
  /**
   * Create a string schema
   */
  string() {
    return new fe();
  },
  /**
   * Create a number schema
   */
  number() {
    return new me();
  },
  /**
   * Create a boolean schema
   */
  boolean() {
    return new ge();
  },
  /**
   * Create a date schema
   */
  date() {
    return new pe();
  },
  /**
   * Create a literal schema
   */
  literal(e) {
    return new Oe(e);
  },
  /**
   * Create an enum schema
   */
  enum(e) {
    return new we(e);
  },
  /**
   * Create an array schema
   */
  array(e) {
    return new he(e);
  },
  /**
   * Create an object schema
   */
  object(e) {
    return new G(e);
  },
  /**
   * Create a union schema
   */
  union(...e) {
    return new Ae(e);
  },
  /**
   * Create a record schema
   */
  record(e, t) {
    return new cs(e, t);
  },
  /**
   * Type inference helper
   * Extract TypeScript type from schema
   */
  infer: (e) => {
  },
  /**
   * Helper to validate data against a schema and return formatted results
   */
  validateSchema: (e, t) => {
    var i;
    const n = e.safeParse(t);
    return n.success ? { success: true, data: n.data } : { success: false, errors: ((i = n.error) == null ? void 0 : i.errors) || [n.error] };
  }
};
var Me = function() {
  this._presets = /* @__PURE__ */ new Map();
};
Me.prototype.register = function(e) {
  this._presets.set(e.name, e);
};
Me.prototype.get = function(e) {
  return this._presets.get(e);
};
Me.prototype.list = function() {
  return Array.from(this._presets.values());
};
Me.prototype.has = function(e) {
  return this._presets.has(e);
};
var j = new Me();
j.register({
  name: "login",
  description: "Standard login form with email and password",
  schema: m.object({
    email: m.string().email().nonempty(),
    password: m.string().min(8).nonempty(),
    rememberMe: m.boolean().optional()
  }),
  fields: {}
});
j.register({
  name: "signup",
  description: "User registration form",
  schema: m.object({
    name: m.string().min(2).max(100).nonempty(),
    email: m.string().email().nonempty(),
    password: m.string().min(8).max(128).nonempty(),
    confirmPassword: m.string().nonempty(),
    acceptTerms: m.boolean().refine((e) => e === true, { message: "You must accept terms" })
  }),
  fields: {}
});
j.register({
  name: "contact",
  description: "Contact form with name, email, and message",
  schema: m.object({
    name: m.string().min(2).max(100).nonempty(),
    email: m.string().email().nonempty(),
    subject: m.string().min(3).max(200).optional(),
    message: m.string().min(10).max(2e3).nonempty()
  }),
  fields: {}
});
j.register({
  name: "profile",
  description: "User profile form",
  schema: m.object({
    firstName: m.string().min(2).max(50).nonempty(),
    lastName: m.string().min(2).max(50).nonempty(),
    email: m.string().email().nonempty(),
    phone: m.string().optional(),
    bio: m.string().max(500).optional(),
    avatar: m.string().url().optional()
  }),
  fields: {}
});
j.register({
  name: "address",
  description: "Address form with international support",
  schema: m.object({
    street: m.string().min(3).max(200).nonempty(),
    city: m.string().min(2).max(100).nonempty(),
    postalCode: m.string().nonempty(),
    country: m.enum(["US", "UK", "FR", "DE", "CH", "IT", "ES", "CA", "AU", "JP"])
  }),
  fields: {}
});
j.register({
  name: "payment",
  description: "Payment information form",
  schema: m.object({
    cardNumber: m.string().pattern(/^\d{16}$/, "Invalid card number").nonempty(),
    cardHolder: m.string().min(3).max(100).nonempty(),
    expiryMonth: m.number().int().min(1).max(12),
    expiryYear: m.number().int().min((/* @__PURE__ */ new Date()).getFullYear()),
    cvv: m.string().pattern(/^\d{3,4}$/, "Invalid CVV").nonempty()
  }),
  fields: {}
});
j.register({
  name: "swiss-user",
  description: "Swiss user form with AHV and phone validation",
  schema: m.object({
    firstName: m.string().min(2).max(50).nonempty(),
    lastName: m.string().min(2).max(50).nonempty(),
    email: m.string().email().nonempty(),
    phone: m.string().phone("CH"),
    postalCode: m.string().postalCode("CH"),
    ahv: m.string().ahv()
  }),
  fields: {}
});
j.register({
  name: "newsletter",
  description: "Newsletter subscription form",
  schema: m.object({
    email: m.string().email().nonempty(),
    preferences: m.array(m.enum(["weekly", "monthly", "announcements"])).optional()
  }),
  fields: {}
});
j.register({
  name: "search",
  description: "Search form with filters",
  schema: m.object({
    query: m.string().min(2).max(200).nonempty(),
    category: m.string().optional(),
    sortBy: m.enum(["relevance", "date", "popular"]).optional(),
    dateFrom: m.date().optional(),
    dateTo: m.date().optional()
  }),
  fields: {}
});
var ht = Symbol.for("IFormularManager");
var Ds = function() {
  return this.throwIfDisposed(), new De(this);
};
var p = function(e, t, n, i) {
  try {
    if (!e) {
      $s(t, n, i);
      return;
    }
    Ts(e, t, n, i);
  } catch (s) {
    console.error(`${p.name}: unexpected error. ${s == null ? void 0 : s.message}`);
  }
};
var $s = (e, t, n) => {
  switch (e) {
    case "critical":
      throw console.error(`CRITICAL - ${t}: ${n}`), Error(`${t}: ${n}`);
    case "warning":
      console.warn(`${t}: ${n}`);
      break;
    case "error":
      console.error(`${t}: ${n}`);
      break;
    case "info":
      console.info(`${t}: ${n}`);
      break;
    default:
      Wt(e);
  }
};
function Wt(e) {
  throw new Error(`Unhandled TrackingType: ${e}`);
}
var Ts = (e, t, n, i) => {
  switch (t) {
    case "critical":
      e.internalCritical(n, i);
      break;
    case "error":
      e.internalError(n, i);
      break;
    case "warning":
      e.internalWarning(n, i);
      break;
    case "info":
      e.internalInfo(n, i);
      break;
    default:
      Wt(t);
  }
};
var Rs = function() {
  if (!this.isDisposed) {
    for (const [e, t] of this.singletonInstances)
      if (t && typeof t.dispose == "function")
        try {
          t.dispose(), p(
            void 0,
            "info",
            "IServiceManager",
            `Disposed service: ${this.getServiceName(e)}`
          );
        } catch (n) {
          p(
            void 0,
            "error",
            "IServiceManager",
            `Error disposing service: ${this.getServiceName(e)} - ${n.message}`
          );
        }
    for (const [e, t] of this.scopedInstances)
      if (t && typeof t.dispose == "function")
        try {
          t.dispose(), p(
            void 0,
            "info",
            "IServiceManager",
            `Disposed service: ${this.getServiceName(e)}`
          );
        } catch (n) {
          p(
            void 0,
            "error",
            "IServiceManager",
            `Error disposing service: ${this.getServiceName(e)} - ${n.message}`
          );
        }
    this.services.clear(), this.singletonInstances.clear(), this.scopedInstances.clear(), this.isDisposed = true;
  }
};
var Ls = function(e) {
  var t;
  return this.services.has(e) ? this.services.get(e) : (t = this.parent) == null ? void 0 : t.findServiceDescriptor(e);
};
var xs = function(e) {
  if (this.throwIfDisposed(), typeof e == "string")
    return e;
  if (typeof e == "symbol")
    return e.toString();
  if (typeof e == "function")
    return e.name ?? "AnonymousClass";
  throw new Error("IServiceManager: Invalid service identifier type");
};
var Gs = function(e) {
  return this.findServiceDescriptor(e) !== void 0;
};
var ks = function(e, ...t) {
  this.throwIfDisposed();
  let n = false, i;
  return () => (n || (i = this.resolve(e, ...t), n = true), i);
};
var Ps = function(e, t, n) {
  this.throwIfDisposed();
  const i = {
    identifier: e,
    factory: t,
    lifetime: (n == null ? void 0 : n.lifetime) ?? "transient",
    dependencies: (n == null ? void 0 : n.dependencies) ?? []
  };
  return this.services.set(e, i), this;
};
var Vs = function(e, t, n) {
  this.resolvedDependency = null, this.isResolved = false, this.identifier = e, this.dependency = n, this.container = t, this.proxy = () => new Proxy(this, {
    get: this.get,
    set: this.set,
    has: this.has,
    ownKeys: this.ownKeys,
    getOwnPropertyDescriptor: this.getOwnPropertyDescriptor
  }), this.get = (i, s, r) => {
    if (!this.isResolved)
      try {
        this.resolvedDependency = t.resolve(this.dependency), this.isResolved = true;
      } catch (u) {
        throw new Error(
          `IServiceManager: Failed to resolve dependency ${t.getServiceName(n)} 
                    for service ${t.getServiceName(this.identifier)} - ${u.message}`
        );
      }
    const o = this.resolvedDependency[s];
    return typeof o == "function" ? o.bind(this.resolvedDependency) : o;
  }, this.set = (i, s, r) => {
    if (!this.isResolved)
      try {
        this.resolvedDependency = t.resolve(n), this.isResolved = true;
      } catch (o) {
        throw new Error(
          `IServiceManager: Failed to resolve dependency ${t.getServiceName(n)} 
                    for service ${t.getServiceName(this.identifier)} - ${o.message}`
        );
      }
    return this.resolvedDependency[s] = r, true;
  }, this.has = (i, s) => {
    if (!this.isResolved)
      try {
        this.resolvedDependency = t.resolve(n), this.isResolved = true;
      } catch (r) {
        throw new Error(
          `IServiceManager: Failed to resolve dependency ${t.getServiceName(n)} 
                    for service ${t.getServiceName(this.identifier)} - ${r.message}`
        );
      }
    return s in this.resolvedDependency;
  }, this.ownKeys = (i) => {
    if (!this.isResolved)
      try {
        this.resolvedDependency = t.resolve(n), this.isResolved = true;
      } catch (s) {
        throw new Error(
          `IServiceManager: Failed to resolve dependency ${t.getServiceName(n)}                     
                    for service ${t.getServiceName(this.identifier)} - ${s.message}`
        );
      }
    return Reflect.ownKeys(this.resolvedDependency);
  }, this.getOwnPropertyDescriptor = (i, s) => {
    if (!this.isResolved)
      try {
        this.resolvedDependency = t.resolve(n), this.isResolved = true;
      } catch (r) {
        throw new Error(
          `IServiceManager: Failed to resolve dependency ${t.getServiceName(n)} 
                    for service ${t.getServiceName(this.identifier)} - ${r.message}`
        );
      }
    return Reflect.getOwnPropertyDescriptor(this.resolvedDependency, s);
  };
};
var _s = function(e, t, n = {}) {
  this.throwIfDisposed();
  const i = (s, ...r) => {
    const u = (n.dependencies ?? []).map((c) => {
      if (c == null) return null;
      const d = new Vs(
        e,
        s,
        c
      );
      try {
        return d.proxy();
      } catch (g) {
        throw new Error(
          `IServiceManager: Failed to resolve dependency ${s.getServiceName(c)} for service ${s.getServiceName(e)} - ${g.message}`
        );
      }
    });
    return new t(...u, ...r);
  };
  this.register(e, i, n);
};
var Fs = function(e, t) {
  return this.throwIfDisposed(), this.singletonInstances.set(e, t), this.services.set(e, {
    identifier: e,
    factory: () => t,
    lifetime: "singleton"
  }), p(
    void 0,
    "info",
    "IServiceManager",
    `Registered instance: ${this.getServiceName(e)}`
  ), this;
};
var Bs = function(e, ...t) {
  this.throwIfDisposed();
  const n = this.tryResolve(e, ...t);
  if (n === void 0)
    throw new Error(
      `IServiceManager - resolve: Service not found: ${this.getServiceName(
        e
      )} parameters: ${JSON.stringify(t)}`
    );
  return n;
};
var js = function() {
  if (this.isDisposed)
    throw new Error("IServiceManager: Cannot use disposed service manager");
};
var Us = function(e, ...t) {
  if (this.throwIfDisposed(), this.resolutionStack.has(e)) {
    const n = Array.from(this.resolutionStack).map((i) => this.getServiceName(i)).join(" -> ");
    throw new Error(
      `Circular dependency detected: ${n} -> ${this.getServiceName(e)}`
    );
  }
  this.resolutionStack.add(e);
  try {
    if (this.singletonInstances.has(e))
      return this.singletonInstances.get(e);
    if (this.scopedInstances.has(e))
      return this.scopedInstances.get(e);
    const n = this.findServiceDescriptor(e);
    if (!n)
      return;
    n.lifetime === "singleton" && this.singletonInstances.set(e, Symbol("resolving"));
    const i = n.factory(this, ...t);
    switch (n.lifetime) {
      case "singleton":
        return this.singletonInstances.set(e, i), i;
      case "scoped":
        return this.scopedInstances.set(e, i), i;
      case "transient":
        break;
      default:
        throw new Error(
          `IServiceManager - tryResolve: Invalid lifetime ${n.lifetime}`
        );
    }
    return i;
  } catch (n) {
    throw p(
      void 0,
      "critical",
      "IServiceManager",
      `Failed to resolve service: ${this.getServiceName(e)} - ${n.message}`
    ), n;
  } finally {
    this.resolutionStack.delete(e);
  }
};
var zs = function() {
  const e = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Set(), n = (i, s = []) => {
    if (t.has(i)) {
      const o = [...s, i].map((u) => this.getServiceName(u)).join(" -> ");
      throw new Error(`Circular dependency detected: ${o}`);
    }
    if (e.has(i)) return;
    t.add(i);
    const r = this.findServiceDescriptor(i);
    if (r && "dependencies" in r && r.dependencies)
      for (const o of r.dependencies)
        o !== null && n(o, [...s, i]);
    t.delete(i), e.add(i);
  };
  for (const [i] of this.services)
    e.has(i) || n(i);
};
var De = function(e) {
  Object.defineProperty(this, "services", {
    value: /* @__PURE__ */ new Map(),
    writable: false,
    // Prevent modification
    configurable: false,
    // Prevent deletion or redefinition
    enumerable: true
    // Make it enumerable for introspection
  }), Object.defineProperty(this, "singletonInstances", {
    value: /* @__PURE__ */ new Map(),
    writable: false,
    // Prevent modification
    configurable: false,
    // Prevent deletion or redefinition
    enumerable: true
    // Make it enumerable for introspection
  }), Object.defineProperty(this, "scopedInstances", {
    value: /* @__PURE__ */ new Map(),
    writable: false,
    // Prevent modification
    configurable: false,
    // Prevent deletion or redefinition
    enumerable: true
    // Make it enumerable for introspection
  }), Object.defineProperty(this, "parent", {
    value: e,
    writable: false,
    // Prevent modification
    configurable: false,
    // Prevent deletion or redefinition
    enumerable: true
    // Make it enumerable for introspection
  }), Object.defineProperty(this, "resolutionStack", {
    value: /* @__PURE__ */ new Set(),
    writable: false,
    // Prevent modification
    configurable: false,
    // Prevent deletion or redefinition
    enumerable: true
    // Make it enumerable for introspection
  }), this.isDisposed = false;
};
Object.assign(De.prototype, {
  validateNoCycles: zs,
  register: Ps,
  registerClass: _s,
  registerInstance: Fs,
  resolve: Bs,
  tryResolve: Us,
  lazy: ks,
  isRegistered: Gs,
  createScope: Ds,
  dispose: Rs,
  findServiceDescriptor: Ls,
  throwIfDisposed: js,
  getServiceName: xs
});
var Yt = function(e, t, n, i, s) {
  return `${e}.${t}:[${n.join(",")}].[${i}]${s ? " => [" + s + "]" : ""}`;
};
var C = (e, t, n, i, s, r) => ({
  fieldName: e,
  emitterName: t,
  action: i,
  types: [n],
  target: s,
  toFlags: () => Yt(e, t, [n], i, s),
  fieldRef: r
});
var ye = Symbol.for("IConfigurationManager");
var Le = Symbol.for("IDomManager");
var _h = {
  getElementById: (e) => document.getElementById(e),
  focusElement: (e) => {
    e && e.focus();
  },
  clearElement: (e) => {
    e && (e.value = "");
  }
};
var Zt = function(e) {
  try {
    if (e !== null)
      this.domManager = e;
    else {
      let t = null;
      Object.defineProperty(this, "domManager", {
        get: function() {
          var n;
          return !t && this.serviceManager && (t = (n = this.serviceManager.lazy(Le)) == null ? void 0 : n()), t;
        },
        set: function(n) {
          t = n;
        },
        configurable: true,
        enumerable: true
      });
    }
    return this;
  } catch (t) {
    return p(
      void 0,
      "critical",
      Zt.name,
      `an error has occured when initializing initializeDomManager ${this.name} class: ${t.message}`
    ), this;
  }
};
var Jt = function(e) {
  try {
    return this.notificationManager = e, this;
  } catch (t) {
    return p(
      void 0,
      "critical",
      Jt.name,
      `an error has occured when initializing initializeNotifier ${this.name} class: ${t.message}`
    ), this;
  }
};
var gt = Symbol.for("IStyleManager");
var Fh = "f-input";
var Bh = {
  dirty: false,
  errors: false,
  focus: false,
  open: false,
  pristine: true,
  valid: true,
  required: false,
  busy: false
};
var Kt = function(e) {
  try {
    if (e)
      this.styleManager = e, this.styleManager.input = this;
    else {
      let t = null;
      Object.defineProperty(this, "styleManager", {
        get: function() {
          var n;
          return !t && this.serviceManager && (t = (n = this.serviceManager.lazy(gt)) == null ? void 0 : n(), t && (t.input = this)), t;
        },
        set: function(n) {
          t = n, t && (t.input = this);
        },
        configurable: true,
        enumerable: true
      });
    }
    return this;
  } catch (t) {
    return p(
      void 0,
      "critical",
      Kt.name,
      `an error has occured when initializing initializeStyle ${this.name} class: ${t.message}`
    ), this;
  }
};
var Qt = function(e) {
  try {
    return this.trackingManager = e, this;
  } catch (t) {
    return p(
      void 0,
      "critical",
      Qt.name,
      `an error has occured when initializing initializeTracking ${this.name} class: ${t.message}`
    ), this;
  }
};
var xe = Symbol.for("IValidationManager");
var O = {
  /** Numeric value is below minimum threshold */
  min: "MIN_ERROR",
  /** Numeric value exceeds maximum threshold */
  max: "MAX_ERROR",
  /** Text length is below minimum requirement */
  minLength: "MIN_LENGTH_ERROR",
  /** Text length exceeds maximum limit */
  maxLength: "MAX_LENGTH_ERROR",
  /** Required field is empty or missing */
  required: "REQUIRED",
  /** Input doesn't match required pattern/format */
  pattern: "PATTERN",
  /** Custom validation rule failed */
  custom: "CUSTOM"
};
var A = function(e, t, n, i, s, r) {
  return { state: e, fieldName: t, code: n, error: s, guide: r, triggerEventTypes: i };
};
var jh = function(e, t, n) {
  return { isValid: e, results: t ?? [], formId: n };
};
var Xt = function(e) {
  try {
    if (e !== null)
      this.validationManager = e;
    else {
      let t = null;
      Object.defineProperty(this, "validationManager", {
        get: function() {
          var n;
          return !t && this.serviceManager && (t = (n = this.serviceManager.lazy(xe)) == null ? void 0 : n()), t;
        },
        set: function(n) {
          t = n;
        },
        configurable: true,
        enumerable: true
      });
    }
    return this;
  } catch (t) {
    return p(
      void 0,
      "critical",
      Xt.name,
      `an error has occured when initializing initializeValidationStrategy ${this.name} class: ${t.message}`
    ), this;
  }
};
var Ge = Symbol.for("IValueManager");
var oe = (e, t, n, i, s) => ({
  id: e,
  concernedTypes: t,
  fieldValueProperty: n,
  setter: i,
  getter: s
});
var en = function(e) {
  try {
    if (e !== null)
      this.valueManager = e;
    else {
      let t = null;
      Object.defineProperty(this, "valueManager", {
        get: function() {
          var n;
          return !t && this.serviceManager && (t = (n = this.serviceManager.lazy(Ge)) == null ? void 0 : n()), t;
        },
        set: function(n) {
          t = n;
        },
        configurable: true,
        enumerable: true
      });
    }
    return this;
  } catch (t) {
    return p(
      void 0,
      "critical",
      en.name,
      `an error has occured when initializing initializeValueStrategy ${this.name} class: ${t.message}`
    ), this;
  }
};
var tn = function() {
  var t, n, i, s;
  const e = [];
  try {
    return this || e.push("_baseInput must be initialized"), this.trackingManager || e.push("tracker must be initialized"), this.notificationManager || e.push("notifier must be initialized"), this.domManager || e.push("dom must be initialized"), this.styleManager || e.push("style must be initialized"), this.validationManager || e.push("validation strategy must be initialized"), this.valueManager || e.push("value strategy must be initialized"), ((n = (t = this.validationManager) == null ? void 0 : t.validationStrategies) == null ? void 0 : n.length) === 0 && e.push(
      `validation strategy needs at least one strategy in order to make it's work.
                Solution:
                - add a validation stategy
                `
    ), ((s = (i = this.valueManager) == null ? void 0 : i.valueStrategies) == null ? void 0 : s.length) === 0 && e.push(
      `value strategy needs at least one strategy in order to persist and get data back.
                Solution:
                - add a value stategy
                `
    ), { success: e.length === 0, errors: e };
  } catch (r) {
    return p(
      void 0,
      "critical",
      tn.name,
      `A Criticla error has occured when initializing ${this.name} class: ${r.message}`
    ), { success: e.length === 0, errors: e };
  }
};
var qs = function() {
  var e;
  (e = this.styleManager) == null || e.update("clear", true), this.valueManager.clear(this), this.domManager.dmClear(), this.focus();
};
var Hs = function(e) {
  var t;
  this.enabled = e, (t = this.domManager) == null || t.dmSetEnabled(this.id.toString(), e);
};
var Ws = function() {
  var e;
  (e = this.domManager) == null || e.dmSetFocus(this.id.toString());
};
var $e = (e) => {
  var t, n;
  (t = e.input.validationManager) != null && t.triggerKeyWordType.includes("onBlur") && ((n = e.input.notificationManager) == null || n.debounceNotify(
    "onValidate",
    e.input.onValidateDelay,
    C(e.input.name, $e.name, "onValidate", $e.name, e.input.name, e),
    String(e.input.id)
  ));
};
var Ys = function(e) {
  $e(e == null ? void 0 : e.fieldRef);
};
var ae = (e) => {
  var t, n;
  (t = e.input.validationManager) != null && t.triggerKeyWordType.includes("onClear") && ((n = e.input.notificationManager) == null || n.debounceNotify(
    "onValidate",
    e.input.onValidateDelay,
    C(
      e.input.name,
      ae.name,
      "onValidate",
      `field.state.${ae.name}`,
      e.input.name,
      e
    ),
    String(e.input.id)
  ));
};
var Zs = function(e) {
  ae(e == null ? void 0 : e.fieldRef);
};
var ee = (e) => {
  var t, n;
  (t = e.input.validationManager) != null && t.triggerKeyWordType.includes("onFocus") && ((n = e.input.notificationManager) == null || n.debounceNotify(
    "onValidate",
    e.input.onValidateDelay,
    C(
      e.input.name,
      ee.name,
      "onValidate",
      `field.state.${ee.name}`,
      e.input.name,
      e
    ),
    String(e.input.id)
  ));
};
var Js = function(e) {
  ee(e == null ? void 0 : e.fieldRef);
};
var Ks = function(e) {
  var t, n;
  (t = e.input.validationManager) != null && t.triggerKeyWordType.includes("onKeyPress") && ((n = e.input.notificationManager) == null || n.debounceNotify(
    "onValidate",
    e.input.onValidateDelay,
    C(
      e.input.name,
      ee.name,
      "onValidate",
      `field.state.${ee.name}`,
      e.input.name,
      e
    ),
    String(e.input.id)
  ));
};
var Qs = function(e) {
  Ks(e == null ? void 0 : e.fieldRef);
};
var Xs = function(e) {
  var t, n;
  (t = e.input.validationManager) != null && t.triggerKeyWordType.includes("onKeyUp") && ((n = e.input.notificationManager) == null || n.debounceNotify(
    "onValidate",
    e.input.onValidateDelay,
    C(
      e.input.name,
      ee.name,
      "onValidate",
      `field.state.${ee.name}`,
      e.input.name,
      e
    ),
    String(e.input.id)
  ));
};
var er = function(e) {
  Xs(e == null ? void 0 : e.fieldRef);
};
var tr = (e, t) => {
  var n, i, s, r, o, u;
  return (i = (n = e == null ? void 0 : e.fieldRef) == null ? void 0 : n.input) != null && i.onBeforeValidation && !((o = (r = (s = e == null ? void 0 : e.fieldRef) == null ? void 0 : s.input) == null ? void 0 : r.onBeforeValidation) != null && o.call(r)) ? ((u = e == null ? void 0 : e.fieldRef) == null || u.input.message(
    "info",
    t,
    `${t} validation was interrupted by custom onBeforeValidation`
  ), true) : false;
};
var nr = (e, t) => {
  var n, i, s, r;
  return (s = (i = (n = e == null ? void 0 : e.fieldRef) == null ? void 0 : n.input) == null ? void 0 : i.formular) != null && s.validateOnFirstSubmit ? ((r = e == null ? void 0 : e.fieldRef) == null || r.input.message(
    "info",
    t,
    `${t} validation was interrupted by the formular validationOnFirstSubmit property`
  ), true) : false;
};
var ir = (e) => {
  var t, n, i, s;
  return ((n = (t = e == null ? void 0 : e.fieldRef) == null ? void 0 : t.input) == null ? void 0 : n.name) === void 0 || ((s = (i = e == null ? void 0 : e.fieldRef) == null ? void 0 : i.input) == null ? void 0 : s.value) === void 0;
};
var sr = (e, t, n) => {
  var i, s, r, o;
  return (s = (i = e == null ? void 0 : e.fieldRef) == null ? void 0 : i.input) != null && s.validationManager ? (r = e == null ? void 0 : e.fieldRef) != null && r.input.validationManager ? true : ((o = e == null ? void 0 : e.fieldRef) == null || o.input.message(
    "critical",
    t.name,
    `${n} has no validationOptions in order to proceed to any validation please provide valid ValidationStrategy at the initialization of the field. process ended`
  ), false) : (console.warn("handleValidation", t), false);
};
var rr = (e) => {
  var t, n, i;
  (i = (n = (t = e == null ? void 0 : e.fieldRef) == null ? void 0 : t.input) == null ? void 0 : n.onAfterValidation) == null || i.call(n);
};
var ar = (e, t, n, i) => {
  var s;
  (s = e == null ? void 0 : e.fieldRef) == null || s.input.message("critical", t.name, `${n} ${i}`);
};
var or = (e, t) => {
  var i, s, r;
  if (!((s = (i = e == null ? void 0 : e.fieldRef) == null ? void 0 : i.input) != null && s.notificationManager))
    return;
  const n = e.fieldRef.input;
  (r = n == null ? void 0 : n.notificationManager) == null || r.debounceNotify(
    "onUiUpdate",
    n.onUiUpdateDelay,
    C(
      n.name,
      t,
      "onUiUpdate",
      "field",
      n.name,
      e.fieldRef
    ),
    String(n.id)
  );
};
var ur = (e, t) => {
  var i, s, r;
  if (!((s = (i = e == null ? void 0 : e.fieldRef) == null ? void 0 : i.input) != null && s.notificationManager))
    return;
  const n = e.fieldRef.input;
  (r = n == null ? void 0 : n.notificationManager) == null || r.debounceNotify(
    "onValidationChange",
    n.onUiUpdateDelay,
    C(
      n.name,
      t,
      "onValidationChange",
      "field",
      n.name,
      e.fieldRef
    ),
    String(n.id)
  );
};
var cr = (e, t) => {
  var n, i;
  (i = (n = e == null ? void 0 : e.fieldRef) == null ? void 0 : n.input) == null || i.setInputBusy(t);
};
var lr = (e, t) => {
  var n;
  (n = e == null ? void 0 : e.fieldRef) != null && n.input && (e.fieldRef.input.validationResults = t, e.fieldRef.input.isValid = t.every((i) => i.state));
};
var dr = (e) => {
  var t, n, i;
  console.log(
    "----handleValidation",
    (t = e == null ? void 0 : e.fieldRef) == null ? void 0 : t.dependencyName,
    (i = (n = e == null ? void 0 : e.fieldRef) == null ? void 0 : n.input) == null ? void 0 : i.value
  );
};
var h = (e, t) => ({ name: e, value: t });
var Uh = function() {
  this.arias = [], this.addMany = function(...e) {
    for (const t of e)
      this.arias.find((n) => n.name === t.name) || this.arias.push(t);
  }, this.add = function(e, t) {
    this.arias.find((n) => n.name === e) || this.arias.push(h(e, t));
  }, this.apply = function(e) {
    var t;
    (t = e.domManager) == null || t.dmAddArias(e.id.toString(), this.arias);
  };
};
var hr = (e, t) => {
  var s, r;
  if (!((r = (s = e == null ? void 0 : e.fieldRef) == null ? void 0 : s.input) != null && r.styleManager)) return;
  const n = t.every((o) => o.state), i = t.some((o) => !o.state);
  e.fieldRef.input.styleManager.update("valid", n), e.fieldRef.input.styleManager.update("errors", i);
};
var gr = (e, t) => {
  var n, i, s, r;
  !((i = (n = e == null ? void 0 : e.fieldRef) == null ? void 0 : n.input) != null && i.domManager) || !((r = (s = e == null ? void 0 : e.fieldRef) == null ? void 0 : s.input) != null && r.id) || e.fieldRef.input.domManager.dmUpdateAria(
    e.fieldRef.input.id.toString(),
    h("invalid", t ? "false" : "true")
  );
};
var pt = function(e, t) {
  this.context = e, this.functionName = t;
};
Object.assign(pt.prototype, {
  /**
   * Performs pre-validation checks and returns false if validation should be skipped
   */
  performPreValidationChecks: function(e) {
    return !(tr(e, this.functionName) || nr(e, this.functionName) || ir(e) || (dr(e), !sr(e, this.context, this.functionName)));
  },
  /**
   * Processes validation results and updates UI state
   */
  processValidationResults: function(e, t) {
    var n, i;
    lr(e, t), hr(e, t), gr(e, ((i = (n = e.fieldRef) == null ? void 0 : n.input) == null ? void 0 : i.isValid) ?? false), or(e, this.functionName), ur(e, this.functionName), rr(e);
  },
  /**
   * Sets the field busy state
   */
  setBusyState: function(e, t) {
    cr(e, t);
  },
  /**
   * Handles validation errors
   */
  handleError: function(e, t) {
    ar(e, this.context, this.functionName, t);
  }
});
var nn = function(e) {
  var n;
  const t = new pt(this, nn.name);
  try {
    if (!t.performPreValidationChecks(e))
      return [];
    let i = [];
    return t.setBusyState(e, true), i = (n = e == null ? void 0 : e.fieldRef) == null ? void 0 : n.input.validationManager.validate(e == null ? void 0 : e.fieldRef), t.setBusyState(e, false), t.processValidationResults(e, i), i;
  } catch (i) {
    t.handleError(e, i);
  } finally {
    t.setBusyState(e, false);
  }
  return [];
};
var sn = async function(e) {
  return new Promise(async (t, n) => {
    var s;
    const i = new pt(this, sn.name);
    try {
      if (!i.performPreValidationChecks(e)) {
        t([]);
        return;
      }
      let r = [];
      i.setBusyState(e, true), r = await ((s = e == null ? void 0 : e.fieldRef) == null ? void 0 : s.input.validationManager.validateAsync(e == null ? void 0 : e.fieldRef)), i.setBusyState(e, false), i.processValidationResults(e, r), t(r);
    } catch (r) {
      i.handleError(e, r), n(new Error(r));
    } finally {
      i.setBusyState(e, false);
    }
  });
};
var pr = function(e) {
  var t;
  (t = this == null ? void 0 : this.notificationManager) == null || t.observers.subscribe(String(this.id), e, false);
};
var S = (e, t) => ({
  isTrue: e,
  message: t
});
var mr = function(e) {
  this.assertors.push(e);
};
var fr = function() {
  return this.errors.length > 0;
};
var yr = function() {
  return this.errors.join(`
`);
};
var vr = function() {
  for (const e of this.assertors)
    e.isTrue || this.errors.push(e.message);
};
var K = function(...e) {
  this.assertors = e ?? [], this.errors = [], this.accept = mr, this.process = vr, this.toString = yr, this.hasErrors = fr;
};
var br = (e, t) => ({ event: e, method: t });
var R = (e, t, n, i, s) => {
  var o;
  let r = "";
  return "dependencyName" in e ? r = (e == null ? void 0 : e.dependencyName) === "InputBase" ? e == null ? void 0 : e.name : (o = e.input) == null ? void 0 : o.name : "name" in e ? r = e == null ? void 0 : e.name : "label" in e ? r = e == null ? void 0 : e.label : (p(void 0, "warning", s, "Notification object has no name!"), r = "unknown-object"), br(
    C(r, t.name, n, i, s),
    t.bind(e)
  );
};
var k = (e, t, n) => {
  var i;
  try {
    if (t == null || t(e), n)
      for (const s of n)
        (i = e.notificationManager) == null || i.accept(s);
    return Promise.resolve(true);
  } catch (s) {
    return Promise.reject(s instanceof Error ? s : new Error(String(s)));
  }
};
var Mr = async function() {
  try {
    if (await k(
      this,
      (t) => {
      },
      [
        R(this, this.handleValidation, "onValidate", "onValidate", this.name),
        R(this, this.handleOnBlur, "onBlur", "onBlur", this.name),
        R(this, this.handleOnFocus, "onFocus", "onFocus", this.name),
        R(this, this.handleOnKeyPress, "onKeyPress", "onKeyPress", this.name),
        R(this, this.handleOnKeyUp, "onKeyUp", "onKeyUp", this.name),
        R(this, this.handleOnClear, "onClear", "onClear", this.name)
      ]
    )) {
      const t = new K();
      t.process(), t.hasErrors() ? p(void 0, "critical", "initialize", t.toString()) : this.isInitialized = true;
    }
  } catch (e) {
    p(this.trackingManager, "critical", this.dependencyName, e);
  }
};
var Er = function(e) {
  this.id = e.id, this.name = e.name, this.label = e.label, this.value = e.value ?? e.defaultValue, this.originalValue = e.value ?? e.defaultValue, this.defaultValue = e.defaultValue, this.objectValue = e.objectValue, this.type = e.type, this.target = e.target, this.isValid = e.isValid ?? true, this.isDirty = e.isDirty ?? false, this.isPristine = e.isPristine ?? true, this.isFocus = e.isFocus ?? false, this.expectedValue = e.expectedValue, this.loaded = e.loaded ?? false, this.changed = e.changed ?? false, e.validationOptions && Object.keys(e.validationOptions).length > 0 && (this.validationOptions = e.validationOptions), e.debounceDelay !== void 0 && (this.inputDelay = e.debounceDelay, this.onValidateDelay = e.debounceDelay, this.onUiUpdateDelay = e.debounceDelay, this.observablesDelay = e.debounceDelay);
};
var Sr = function(e, t, n) {
  p(this.trackingManager, e, t, n);
};
var rn = function(e) {
  var t, n, i, s, r;
  (r = (t = e == null ? void 0 : e.input) == null ? void 0 : t.notificationManager) == null || r.debounceNotify(
    "onUiUpdate",
    e == null ? void 0 : e.input.onUiUpdateDelay,
    C((n = e == null ? void 0 : e.input) == null ? void 0 : n.name, rn.name, "onUiUpdate", "field", (i = e == null ? void 0 : e.input) == null ? void 0 : i.name, e),
    String((s = e == null ? void 0 : e.input) == null ? void 0 : s.id)
  );
};
var Cr = function() {
  var t, n, i;
  const e = (t = this.domManager) == null ? void 0 : t.dmGet(this.id.toString());
  !e || e.disabled || (this.isFocus = true, (n = this.styleManager) == null || n.update("focus", this.isFocus), (i = this.domManager) == null || i.dmSetFocus(this.id.toString()));
};
var Ye = function(e) {
  var t;
  this.isBusy !== e && (this.isBusy = e, (t = this.styleManager) == null || t.update("busy", this.isBusy));
};
var le = function(e, t, n, i, s, r, o, u) {
  var Rt, Lt, xt, Gt;
  t !== null && this.initializeProperties(t), n !== null && this.useDomManager(n), i !== null && this.useNotificationManager(i), s !== null && this.useTrackingManager(s), r !== null && this.useValidationManager(r), o !== null && this.useValueManager(o), u !== null && this.useStyleManager(u), this.isInitialized = false, this.serviceManager = e, Object.defineProperty(this, "dependencyName", {
    value: le.name && le.name.length > 0 ? le.name : "InputBase",
    writable: false,
    // Prevent modification
    configurable: false
    // Prevent deletion or redefinition
  });
  const c = (Lt = (Rt = this.serviceManager) == null ? void 0 : Rt.lazy(ye)) == null ? void 0 : Lt(), d = ($, V) => {
    if (typeof $ == "number") return $;
    if ($ && typeof $ == "object") {
      if (typeof $.triggerDelay == "number") return $.triggerDelay;
      if (typeof $.delay == "number") return $.delay;
    }
    return V;
  }, g = c == null ? void 0 : c.getConfigByName("behavior", "events", "onChange"), v = d(g, 100);
  this.inputDelay === void 0 && (this.inputDelay = (t == null ? void 0 : t.debounceDelay) ?? v);
  const b = c == null ? void 0 : c.getConfigByName("behavior", "events", "onValidate"), w = d(b, 100);
  this.onValidateDelay === void 0 && (this.onValidateDelay = (t == null ? void 0 : t.debounceDelay) ?? w);
  const x = c == null ? void 0 : c.getConfigByName("behavior", "events", "onUiUpdate"), D = d(x, 100);
  this.onUiUpdateDelay === void 0 && (this.onUiUpdateDelay = (t == null ? void 0 : t.debounceDelay) ?? D), this.observablesDelay === void 0 && (this.observablesDelay = this.onUiUpdateDelay ?? this.inputDelay ?? 100), this.labelId = ((xt = this.domManager) == null ? void 0 : xt.labelId) ?? "-label", this.describedById = ((Gt = this.domManager) == null ? void 0 : Gt.describedById) ?? "-described-by";
  const Ni = c == null ? void 0 : c.getConfigByName("behavior", "events", "onClick");
  this.onClickDelay = d(Ni, 100), this.culture = (c == null ? void 0 : c.getConfigByName("cultures", "defaultCulture")) ?? {}, this.validationResults = [];
  const Se = ($) => {
    var V, _, Ce;
    ((V = this.notificationManager) == null ? void 0 : V.debounceNotify) !== void 0 && ((Ce = (_ = this.notificationManager) == null ? void 0 : _.debounceNotify) == null || Ce.call(
      _,
      $,
      this.inputDelay,
      C == null ? void 0 : C(
        this.name,
        Ye.name,
        $,
        `field.${Ye.name}.isFocus`,
        this.name
      ),
      String(this.id)
    ));
  };
  let ze = typeof this.value < "u" ? this.value : null;
  Object.defineProperty(this, "value", {
    get() {
      return ze;
    },
    set($) {
      var V, _;
      ze !== $ && (ze = $, (((_ = (V = this.validationManager) == null ? void 0 : V.triggerKeyWordType) == null ? void 0 : _.map(
        (He) => He.toLowerCase()
      )) ?? []).includes("onchange") && Se("onValidate"), Se("onUiUpdate"));
    },
    configurable: true,
    enumerable: true
  });
  let qe = typeof this.isFocus < "u" ? this.isFocus : false;
  Object.defineProperty(this, "isFocus", {
    get() {
      return qe;
    },
    set($) {
      var V, _;
      qe !== $ && (qe = $, (((_ = (V = this.validationManager) == null ? void 0 : V.triggerKeyWordType) == null ? void 0 : _.map(
        (He) => He.toLowerCase()
      )) ?? []).includes("onchange") && Se("onValidate"), Se("onUiUpdate"));
    }
  });
};
Object.assign(le.prototype, {
  useNotificationManager: Jt,
  handleValidationAsync: sn,
  useValidationManager: Xt,
  initializeProperties: Er,
  useTrackingManager: Qt,
  checkInitialized: tn,
  handleValidation: nn,
  handleOnKeyPress: Qs,
  handleOnKeyUp: er,
  useValueManager: en,
  useStyleManager: Kt,
  useDomManager: Zt,
  handleOnFocus: Js,
  setInputBusy: Ye,
  handleOnClear: Zs,
  handleOnBlur: Ys,
  initialize: Mr,
  hasChanges: pr,
  refreshUi: rn,
  setFocus: Cr,
  message: Sr,
  enable: Hs,
  clear: qs,
  focus: Ws
});
var an = Symbol.for("IInputBase");
var zh = (e) => e.dependencyName === "InputBase" ? e : e.input;
var Ir = async function() {
  try {
    await k(
      this.input,
      (t) => {
        p(void 0, "info", "initialize", t.name), this.checked = false;
      },
      []
    ) && (this.isInitialized = true);
  } catch (e) {
    p(this.input.trackingManager, "critical", this.dependencyName, e);
  }
};
var ue = function(e, t) {
  var n;
  (n = e.domManager) == null || n.dmRegister(t);
};
var Nr = function(e, t) {
  var n, i;
  if (!t) return null;
  (n = e.input.domManager) == null || n.dmRegister(t), !e.optionBase.optionsInitialized && e.optionBase.checkOptionsInitialized() && ((i = e.input.valueManager) == null || i.setValue(
    e,
    e.input.defaultValue
  ), e.optionBase.optionsInitialized = true);
};
var wr = function(e) {
  ue(this.input, e);
};
var Or = function() {
  const e = {};
  for (const [t, n] of Object.entries(this.eventsHandlers))
    e[t] = (i) => {
      n.forEach((s) => {
        s(i);
      });
    };
  return e;
};
var Ar = function() {
  var i;
  let e = false;
  this.context.dependencyName === "MaskedBaseInput" && (e = !!((i = this.context) != null && i.mask));
  const t = this.assembleEventsHandlers(), n = {};
  if (this.arias && this.arias.length > 0)
    for (const s of this.arias)
      n[`aria-${s.name}`] = s.value;
  return {
    id: `${this.context.input.id}`,
    /** I need hack date input */
    type: e ? "text" : this.context.input.type,
    className: "base-input",
    title: this.context.input.label ?? "",
    ...n,
    ...t
  };
};
var Dr = function(e) {
  const t = this.assembleEventsHandlers();
  return {
    id: `label-${e.id}`,
    type: "label",
    title: e.text ?? "",
    ...t
  };
};
var $r = function(e) {
  const t = this.assembleEventsHandlers();
  return {
    id: `option-${e.id}`,
    type: this.context.input.type,
    title: e.text ?? "",
    ...t
  };
};
var Tr = function(...e) {
  return this.arias || (this.arias = []), this.arias.push(...e ?? []), this;
};
var Pt = (e, t) => {
  var n;
  t.target, e.input.isFocus = false, (n = e.input.styleManager) == null || n.update("focus", e.input.isFocus), e.input.cursorPosition = null, $e(e), t.stopPropagation();
};
var Rr = function(e) {
  return e && this.registerEvent("onBlur", (t) => e(t)), Pt && this.registerEvent("onBlur", (t) => Pt(this.context, t)), this;
};
var z = (e) => {
  var t, n;
  (t = e.input.validationManager) != null && t.triggerKeyWordType.includes("onChange") && ((n = e.input.notificationManager) == null || n.debounceNotify(
    "onValidate",
    e.input.onValidateDelay,
    C(
      e.input.name,
      z.name,
      "onValidate",
      z.name,
      e.input.name,
      e
    ),
    String(e.input.id)
  ));
};
var Vt = (e, t) => {
  const n = t.target;
  e.input.valueManager.setValueFromHtmlElement(e, n), e.input.cursorPosition = n.selectionStart ?? 0, z(e), t.stopPropagation();
};
var Lr = function(e) {
  return e && this.registerEvent("onChange", (t) => e(t)), Vt && this.registerEvent("onChange", (t) => {
    Vt(this.context, t);
  }), this;
};
var Te = (e, t) => {
  var i;
  const n = t.target;
  e.input.valueManager.setValueFromHtmlElement(e, n), (i = e.input.notificationManager) == null || i.debounceNotify(
    "onClick",
    e.input.onUiUpdateDelay,
    C(e.input.name, Te.name, "onClick", `field.${Te.name}`, e.input.name, e),
    String(e.input.id)
  ), t.stopPropagation();
};
var xr = function(e) {
  return e && this.registerEvent("onClick", (t) => e(t)), Te && this.registerEvent("onClick", (t) => Te(this.context, t)), this;
};
var Ze = (e, t, n) => {
  var i, s;
  e.input.valueManager.setValue(e, t), (s = (i = e.input) == null ? void 0 : i.notificationManager) == null || s.debounceNotify(
    "onClick",
    e.input.onClickDelay,
    C(
      e.input.name,
      Ze.name,
      "onClick",
      `field.option.label.${Ze.name}`,
      e.input.name,
      e
    ),
    String(e.input.id)
  ), n.stopPropagation();
};
var Gr = function(e) {
  return this.onClickOption = (t) => Ze(this.context, e, t), this;
};
var kr = function(e, t) {
  var i;
  const n = e;
  return (i = this.eventsHandlers)[n] ?? (i[n] = []), t && this.eventsHandlers[n].push(t), this;
};
var Pr = function(...e) {
  return e.forEach((t) => {
    this.registerEvent(t.eventType, t.handler);
  }), this;
};
var _t = (e, t) => {
  var i;
  console.log("-----onFocus", e.input.name, e.input.id, t.target);
  const n = t.target;
  e.input.isFocus = true, (i = e.input.styleManager) == null || i.update("focus", e.input.isFocus), e.input.cursorPosition && e.input.cursorPosition !== null && n.setSelectionRange(e.input.cursorPosition, e.input.cursorPosition), t.stopPropagation();
};
var Vr = function(e) {
  return e && this.registerEvent("onFocus", (t) => e(t)), _t && this.registerEvent("onFocus", (t) => _t(this.context, t)), this;
};
var Ft = function(e, t) {
  const n = t.target;
  t.key, e.input.cursorPosition && e.input.cursorPosition !== null && n.setSelectionRange(e.input.cursorPosition, e.input.cursorPosition), t.stopPropagation();
};
var _r = function(e) {
  return e && this.registerEvent("onKeyPress", (t) => e(t)), Ft && this.registerEvent("onKeyPress", (t) => Ft(this.context, t)), this;
};
var Bt = function(e, t) {
  const n = t.target;
  t.key, e.input.cursorPosition && e.input.cursorPosition !== null && n.setSelectionRange(e.input.cursorPosition, e.input.cursorPosition), t.stopPropagation();
};
var Fr = function(e) {
  return e && this.registerEvent("onKeyUp", (t) => e(t)), Bt && this.registerEvent("onKeyUp", (t) => Bt(this.context, t)), this;
};
var qh = (e, t) => {
  if (!e)
    throw new TypeError("customEvent: eventType is required");
  if (typeof t != "function")
    throw new TypeError("customEvent: handler must be a function");
  return {
    eventType: e,
    handler: t
  };
};
var q = function(e) {
  if (!e || typeof e != "object")
    throw new TypeError("DomRegisterBuilder: context must be a valid object");
  this.eventsHandlers = {}, this.element = {}, this.context = e;
};
Object.assign(q.prototype, {
  assembleEventsHandlers: Or,
  buildLabel: Dr,
  buildOption: $r,
  build: Ar,
  registerAria: Tr,
  registerBlur: Rr,
  registerChange: Lr,
  registerClick: xr,
  registerClickOption: Gr,
  registerEvent: kr,
  registerEvents: Pr,
  registerFocus: Vr,
  registerKeyPress: _r,
  registerKeyUp: Fr
});
var Br = function() {
  var i, s;
  const e = `${this.input.id}${this.input.labelId}`, t = `${this.input.id}${this.input.describedById}`, n = [
    h("labelledby", e),
    h("describedby", t),
    h("name", this.input.name),
    h("label", this.input.name),
    h("required", (s = (i = this.input.validationOptions) == null ? void 0 : i.required) != null && s.value ? "true" : "false"),
    h("invalid", this.input.isValid ? "false" : "true"),
    h("disabled", this.input.enabled ? "false" : "true"),
    h("readonly", "false"),
    h("autocomplete", "none"),
    h("haspopup", "false"),
    h("expanded", "false"),
    h("activedescendant", "false")
  ];
  return new q(this).registerChange().registerBlur().registerFocus().registerClick().registerAria(...n).build();
};
var mt = function() {
  this.isInitialized = false, Object.defineProperty(this, "dependencyName", {
    value: mt.name,
    writable: false,
    // Prevent modification
    configurable: false
    // Prevent deletion or redefinition
  }), this.checked = false;
};
Object.assign(mt.prototype, {
  initialize: Ir,
  register: Br,
  ref: wr
});
var on = Symbol.for("ICheckBoxBaseInput");
var jr = async function() {
  try {
    await k(this.input, () => {
    }, [
      R(this, this.onClickHandle, "onClick", "onClick", this.name)
    ]) && (this.isInitialized = true);
  } catch (e) {
    p(this.input.trackingManager, "critical", this.dependencyName, e);
  }
};
var Je = function(e) {
  var t, n, i, s, r, o, u, c;
  (n = (t = e == null ? void 0 : e.fieldRef) == null ? void 0 : t.input.validationManager) != null && n.triggerKeyWordType.includes("onClick") && ((c = (i = e == null ? void 0 : e.fieldRef) == null ? void 0 : i.input.notificationManager) == null || c.debounceNotify(
    "onValidate",
    (s = e == null ? void 0 : e.fieldRef) == null ? void 0 : s.input.onValidateDelay,
    C(
      (r = e == null ? void 0 : e.fieldRef) == null ? void 0 : r.input.name,
      Je.name,
      "onValidate",
      `field.state.${Je.name}`,
      (o = e == null ? void 0 : e.fieldRef) == null ? void 0 : o.input.name,
      e == null ? void 0 : e.fieldRef
    ),
    String((u = e == null ? void 0 : e.fieldRef) == null ? void 0 : u.input.id)
  ));
};
var ft = function() {
  this.isInitialized = false, Object.defineProperty(this, "dependencyName", {
    value: ft.name,
    writable: false,
    // Prevent modification
    configurable: false
    // Prevent deletion or redefinition
  });
};
Object.assign(ft.prototype, {
  initialize: jr,
  onClickHandle: Je
});
var Ee = Symbol.for("IClickBaseInput");
var Ur = async function() {
  try {
    await k(this.input, (t) => {
    }) && (this.isInitialized = true);
  } catch (e) {
    p(this.input.trackingManager, "critical", this.dependencyName, e);
  }
};
var Ke = function(e) {
  var t;
  this.openState = e, (t = this.input.notificationManager) == null || t.notify(
    "onOpen",
    C(
      this.input.name,
      Ke.name,
      "onOpen",
      `field.state.${Ke.name}`,
      this.input.name,
      this
    )
  );
};
var yt = function() {
  this.isInitialized = false, Object.defineProperty(this, "dependencyName", {
    value: yt.name,
    writable: false,
    // Prevent modification
    configurable: false
    // Prevent deletion or redefinition
  });
};
Object.assign(yt.prototype, {
  initialize: Ur,
  setOpenState: Ke
});
var zr = Symbol.for("IDrawerBaseInput");
var qr = async function() {
  try {
    if (await k(
      this.input,
      (t) => {
        t.maskInitialized = this.mask && this.mask.length > 0, p(void 0, "info", "initialize", t.name);
      },
      [
        // notification(this, this.handleOnChanged, 'onChange', 'onChange', this.name),
        // notification(this, this.handleOnClear, 'onClear', 'onClear', this.name)
      ]
    )) {
      const t = new K(
        S(this.input !== void 0, "The dependency field is not instanciated"),
        S(
          this.input.isInitialized,
          `${this.dependencyName}: The dependency field is not properly initialized`
        )
      );
      t.process(), t.hasErrors() ? p(void 0, "critical", "initialize", t.toString()) : this.isInitialized = true;
    }
  } catch (e) {
    p(this.input.trackingManager, "critical", this.dependencyName, e);
  }
};
var Hr = function(e, t) {
  if (!t)
    return "";
  let n = "", i = 0;
  for (let s = 0; s < t.length && !(i >= e.length); s++)
    e[i] === "#" ? /\d/.test(t[s]) && (n += t[s], i++) : (n += e[i], i++, s--);
  return n;
};
var un = function(e) {
  console.log("🔥 Masked onChange called", { event: e, mask: this.mask });
  const t = e.target, n = this.input.valueManager.getValue(this) || "", i = t.selectionStart ?? 0, s = t.value;
  console.log("📍 Before processing", { oldValue: n, oldCursorPos: i, inputValue: s });
  const r = s.slice(0, i).replace(/\D/g, "").length, o = s.replace(/\D/g, ""), u = Hr(this.mask, o);
  if (console.log("🔄 After processing", { rawValue: o, formattedValue: u, digitsBeforeCursor: r }), u === void 0 || u === "")
    console.log("🚫 Setting value to null - empty formatted value"), this.input.valueManager.setValue(this, null), t.value = "";
  else {
    t.value = u, this._maskedValue = u, console.log("✅ Setting formatted value", { formattedValue: u });
    const c = Wr(u, r);
    console.log("🎯 Cursor positioning", {
      digitsBeforeCursor: r,
      newCursorPos: c,
      formattedValue: u
    }), requestAnimationFrame(() => {
      t.setSelectionRange(c, c);
    });
  }
  z && z(this);
};
function Wr(e, t) {
  if (t === 0) return 0;
  let n = 0;
  for (let i = 0; i < e.length; i++)
    if (/\d/.test(e[i]) && (n++, n === t))
      return i + 1;
  return e.length;
}
var cn = function(e) {
  const t = e.target, n = e.key, i = t.value, s = t.selectionStart ?? 0;
  if (console.log("🔑 onKeyPress", { key: n, cursorPos: s, currentValue: i, mask: this.mask }), this.input.cursorPosition = s, !(e.ctrlKey || e.metaKey || e.altKey || [
    "Backspace",
    "Delete",
    "Tab",
    "Enter",
    "Escape",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Home",
    "End"
  ].includes(n))) {
    if (!/\d/.test(n)) {
      e.preventDefault();
      return;
    }
    Yr(s, i, this.mask) || e.preventDefault();
  }
};
function Yr(e, t, n) {
  const i = t.replace(/\D/g, ""), s = n.split("").filter((u) => u === "#").length;
  if (i.length >= s)
    return false;
  let r = 0, o = 0;
  for (; o < e && r < n.length; )
    n[r] === "#" ? (o < t.length && /\d/.test(t[o]) && o++, r++) : (o < t.length && t[o] === n[r] && o++, r++);
  for (; r < n.length; ) {
    if (n[r] === "#")
      return true;
    r++;
  }
  return false;
}
var ln = function(e) {
  e.target, e.key;
};
var Zr = function(e) {
  this.input ? ue(this.input, e) : console.log("---ISSUE");
};
function dn(e) {
  const t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new Map();
  return function(...i) {
    const [s, ...r] = i, o = JSON.stringify(r);
    if (typeof s == "object" && s !== null) {
      t.has(s) || t.set(s, /* @__PURE__ */ new Map());
      const u = t.get(s);
      if (u.has(o))
        return u.get(o);
      const c = e(...i);
      return u.set(o, c), c;
    } else {
      const u = JSON.stringify([s, ...r]);
      if (n.has(u))
        return n.get(u);
      const c = e(...i);
      return n.set(u, c), c;
    }
  };
}
var Jr = dn((e) => {
  var i, s;
  const t = `${e == null ? void 0 : e.input.id}${e == null ? void 0 : e.input.labelId}`, n = `${e == null ? void 0 : e.input.id}${e == null ? void 0 : e.input.describedById}`;
  return [
    h("labelledby", t),
    h("describedby", n),
    h("name", e == null ? void 0 : e.input.name),
    h("label", e == null ? void 0 : e.input.name),
    h("required", (s = (i = e == null ? void 0 : e.input.validationOptions) == null ? void 0 : i.required) != null && s.value ? "true" : "false"),
    h("invalid", e != null && e.input.isValid ? "false" : "true"),
    h("disabled", e != null && e.input.enabled ? "false" : "true"),
    h("readonly", "false"),
    h("autocomplete", "none"),
    h("haspopup", "false"),
    h("expanded", "false"),
    h("activedescendant", "false")
  ];
});
var Kr = function(...e) {
  const t = Jr(this);
  return new q(this).registerChange(un.bind(this)).registerKeyPress(cn.bind(this)).registerKeyUp(ln.bind(this)).registerEvents(...e).registerBlur().registerFocus().registerAria(...t).build();
};
var vt = function(e) {
  this.isInitialized = false, console.error("🔍 MaskedBaseInput constructor called - ERROR LOG"), console.warn("🔍 MaskedBaseInput constructor called - WARN LOG"), console.log("🔍 MaskedBaseInput constructor called - REGULAR LOG"), console.log("mask:", e), console.log("typeof mask:", typeof e), console.log("Array.isArray(mask):", Array.isArray(e)), console.log("arguments:", arguments), console.log("arguments length:", arguments.length), console.log("🔍 MaskedBaseInput constructor called with:", {
    mask: e,
    type: typeof e,
    isArray: Array.isArray(e),
    arguments: Array.from(arguments)
  });
  const t = Array.isArray(e) ? e[0] : e;
  Object.defineProperty(this, "mask", {
    value: t,
    writable: false,
    // Prevent modification
    configurable: false
    // Prevent deletion or redefinition
  }), Object.defineProperty(this, "dependencyName", {
    value: vt.name,
    writable: false,
    // Prevent modification
    configurable: false
    // Prevent deletion or redefinition
  });
};
Object.assign(vt.prototype, {
  initialize: qr,
  onChange: un,
  ref: Zr,
  onKeyPress: cn,
  onKeyUp: ln,
  register: Kr
});
var hn = Symbol.for("IMaskedBaseInput");
var Qr = function(e) {
  z(this);
};
var Xr = function(e) {
  ae(this);
};
var ea = async function() {
  try {
    if (await k(this.input, () => {
    }, [
      R(this, this.handleOnChanged, "onChange", "onChange", this.name),
      R(this, this.handleOnClear, "onClear", "onClear", this.name)
    ])) {
      const t = new K(
        S(this.input !== void 0, "The dependency field is not instanciated"),
        S(
          this.input.isInitialized,
          `${this.dependencyName}: The dependency field is not properly initialized`
        )
      );
      t.process(), t.hasErrors() ? p(void 0, "critical", "initialize", t.toString()) : this.isInitialized = true;
    }
  } catch (e) {
    p(this.input.trackingManager, "critical", this.dependencyName, e);
  }
};
var ta = function(e) {
  this.input ? ue(this.input, e) : console.log("---ISSUE");
};
var na = function() {
  var i, s;
  const e = `${this.input.id}${this.input.labelId}`, t = `${this.input.id}${this.input.describedById}`, n = [
    h("labelledby", e),
    h("describedby", t),
    h("name", this.input.name),
    h("label", this.input.name),
    h("required", (s = (i = this.input.validationOptions) == null ? void 0 : i.required) != null && s.value ? "true" : "false"),
    h("invalid", this.input.isValid ? "false" : "true"),
    h("disabled", this.input.enabled ? "false" : "true"),
    h("readonly", "false"),
    h("autocomplete", "none"),
    h("haspopup", "false"),
    h("expanded", "false"),
    h("activedescendant", "false")
  ];
  return new q(this).registerChange().registerBlur().registerFocus().registerAria(...n).build();
};
var bt = function() {
  this.isInitialized = false, Object.defineProperty(this, "dependencyName", {
    value: bt.name,
    writable: false,
    // Prevent modification
    configurable: false
    // Prevent deletion or redefinition
  });
};
Object.assign(bt.prototype, {
  initialize: ea,
  handleOnChanged: Qr,
  handleOnClear: Xr,
  ref: ta,
  register: na
});
var ia = Symbol.for("INumericBaseInput");
var sa = function() {
  const e = [];
  return this.options.forEach((t) => {
    var n;
    (n = this.input.domManager) != null && n.dmExists(String(t.id)) && e.push(true);
  }), e.filter((t) => t).length === this.options.length;
};
var ra = function(e) {
  var t;
  return ((t = this.options) == null ? void 0 : t.length) === 0 ? (this.input.message(
    "warning",
    "IFieldInput.getOptionById",
    `there is no options related to the field of type: ${this.input.type}, name: ${this.name} `
  ), null) : this.options.find((n) => n.id === e);
};
var aa = function(e) {
  var t;
  return ((t = this.options) == null ? void 0 : t.length) === 0 ? (this.input.message(
    "warning",
    "IFieldInput.getOptionById",
    `there is no options related to the field of type: ${this.input.type}, name: ${this.name} SequenceId: ${e}`
  ), null) : this.options.find((n) => n.sequenceId === e);
};
var oa = function(e) {
  var t;
  return ((t = this.options) == null ? void 0 : t.length) === 0 ? (this.input.message(
    "warning",
    "IFieldInput.getOptionByValue",
    `there is no options related to the field of type: ${this.input.type}, name: ${this.name} `
  ), null) : this.options.find((n) => n.value === e);
};
var ua = function() {
  var t;
  return this != null && this.selectedOptionId ? (t = this == null ? void 0 : this.getOptionBySequenceId(this == null ? void 0 : this.selectedOptionId)) == null ? void 0 : t.text : "";
};
var ca = async function() {
  var e;
  try {
    if (await k(this.input, (n) => {
      n.optionsInitialized = this.options && this.options.length > 0, n.selectedOptionId = null;
    })) {
      const n = new K(
        S(this.input !== void 0, "The dependency field is not instanciated"),
        S(
          this.input.isInitialized,
          `${this.dependencyName}: The dependency field is not properly initialized`
        ),
        S(
          ((e = this == null ? void 0 : this.options) == null ? void 0 : e.length) > 0,
          `${this.dependencyName}: None options were provided. this feature will not work properly`
        )
      );
      n.process(), n.hasErrors() ? p(void 0, "critical", "initialize", n.toString()) : this.isInitialized = true;
    }
  } catch (t) {
    p(this.input.trackingManager, "critical", this.dependencyName, t);
  }
};
var la = function(e, t) {
  var n, i;
  return ((n = this.options) == null ? void 0 : n.length) === 0 ? (this.input.message(
    "warning",
    "IFieldInput.tryGetOptionByIdOrValue",
    `there is no options related to the field of type: ${this.input.type}, name: ${this.name}`
  ), null) : ((i = this.options) == null ? void 0 : i.find((s) => s.id === `${e}` || s.value === t)) ?? null;
};
var da = function(e, t, n) {
  var i, s;
  return ((i = this.options) == null ? void 0 : i.length) === 0 ? (this.input.message(
    "warning",
    "IFieldInput.tryGetOptionBySequenceIdThenIdOrValue",
    `there is no options related to the field of type:  type: ${this.input.type}, name: ${this.name}, sequenceId: ${e}`
  ), null) : ((s = this.options) == null ? void 0 : s.find(
    (r) => r.sequenceId === e || r.id === `${t}` || r.value === n
  )) ?? null;
};
var Mt = function(e) {
  this.isInitialized = false, Object.defineProperty(this, "dependencyName", {
    value: Mt.name,
    writable: false,
    // Prevent modification
    configurable: false
    // Prevent deletion or redefinition
  }), this.options = e ?? [], this.optionsInitialized = false, this.selectedOptionId = null;
};
Object.assign(Mt.prototype, {
  initialize: ca,
  checkOptionsInitialized: sa,
  getSelectedValue: ua,
  getOptionByValue: oa,
  getOptionById: ra,
  getOptionBySequenceId: aa,
  tryGetOptionByIdOrValue: la,
  tryGetOptionBySequenceIdThenIdOrValue: da
});
var ke = Symbol.for("IOptionBaseInput");
var ha = function(e) {
  z(this);
};
var ga = async function() {
  var e, t, n, i;
  try {
    if (await k(this.input, () => {
    }, [
      R(this, this.handleOnChanged, "onChange", "onChange", this.name)
    ])) {
      const r = new K(
        S(this.input !== void 0, "The dependency field is not instanciated"),
        S(
          this.input.isInitialized,
          `${this.dependencyName}: The dependency field is not properly initialized`
        ),
        S(
          ((t = (e = this.optionBase) == null ? void 0 : e.options) == null ? void 0 : t.length) > 0,
          `${this.dependencyName}: The needed dependency on OptionBase is not properly initialized or none options were provided.`
        ),
        S(
          (n = this.optionBase) == null ? void 0 : n.isInitialized,
          `${this.dependencyName}: The this.optionBase is not properly initialized`
        ),
        S(
          (i = this.clickBase) == null ? void 0 : i.isInitialized,
          `${this.dependencyName}: The this.clickBase is not properly initialized`
        )
      );
      r.process(), r.hasErrors() ? p(void 0, "critical", "initialize", r.toString()) : this.isInitialized = true;
    }
  } catch (s) {
    p(this.input.trackingManager, "critical", this.dependencyName, s);
  }
};
var pa = function(e) {
  ue(this.input, e);
};
var ma = function(e) {
  Nr(this, e);
};
var fa = function() {
  var i, s;
  const e = `${this.input.id}${this.input.labelId}`, t = `${this.input.id}${this.input.describedById}`, n = [
    h("labelledby", e),
    h("describedby", t),
    h("name", this.input.name),
    h("label", this.input.name),
    h("required", (s = (i = this.input.validationOptions) == null ? void 0 : i.required) != null && s.value ? "true" : "false"),
    h("invalid", this.input.isValid ? "false" : "true"),
    h("disabled", this.input.enabled ? "false" : "true"),
    h("readonly", "false"),
    h("autocomplete", "none"),
    h("haspopup", "false"),
    h("expanded", "false"),
    h("activedescendant", "false")
  ];
  return new q(this).registerAria(...n).build();
};
var ya = function(e) {
  return new q(this).registerClickOption(String(e.id)).registerAria().buildLabel(e);
};
var va = function(e) {
  return new q(this).registerBlur().registerFocus().registerClickOption(String(e.id)).registerAria().buildOption(e);
};
var Et = function() {
  this.isInitialized = false, Object.defineProperty(this, "dependencyName", {
    value: Et.name,
    writable: false,
    // Prevent modification
    configurable: false
    // Prevent deletion or redefinition
  });
};
Object.assign(Et.prototype, {
  initialize: ga,
  handleOnChanged: ha,
  ref: pa,
  register: fa,
  refOption: ma,
  registerOption: va,
  registerLabel: ya
});
var gn = Symbol.for("IRadioBaseInput");
var ba = function() {
  this.input.valueManager.setValue(this, null), this.input.clear();
};
var Ma = function(e) {
  z(this);
};
var Ea = function(e) {
  ae(this);
};
var Qe = (e) => {
  var t, n;
  (t = e.input.validationManager) != null && t.triggerKeyWordType.includes("onSelect") && ((n = e.input.notificationManager) == null || n.debounceNotify(
    "onValidate",
    e.input.onValidateDelay,
    C(
      e.input.name,
      Qe.name,
      "onValidate",
      `field.state.${Qe.name}`,
      e.input.name,
      e
    ),
    String(e.input.id)
  ));
};
var Sa = function(e) {
  Qe(this);
};
var Ca = async function() {
  var e, t, n, i;
  try {
    if (await k(this.input, () => {
    }, [
      R(this, this.handleOnChanged, "onChange", "onChange", this.name),
      R(this, this.handleOnSelected, "onSelect", "onSelect", this.name),
      R(this, this.handleOnClear, "onClear", "onClear", this.name)
    ])) {
      const r = new K(
        S(this.input !== void 0, "The dependency field is not instanciated"),
        S(
          this.input.isInitialized,
          `${this.dependencyName}:  The dependency field is not properly initialized`
        ),
        S(
          ((t = (e = this.optionBase) == null ? void 0 : e.options) == null ? void 0 : t.length) > 0,
          `${this.dependencyName}: The needed dependency on OptionBase is not properly initialized or none options were provided.`
        ),
        S(
          (n = this.optionBase) == null ? void 0 : n.isInitialized,
          `${this.dependencyName}: The this.optionBase is not properly initialized`
        ),
        S(
          (i = this.clickBase) == null ? void 0 : i.isInitialized,
          `${this.dependencyName}: The this.clickBase is not properly initialized`
        )
      );
      r.process(), r.hasErrors() ? p(void 0, "critical", "initialize", r.toString()) : this.isInitialized = true;
    }
  } catch (s) {
    p(this.input.trackingManager, "critical", this.dependencyName, s);
  }
};
var Ia = function(e) {
  var t, n;
  (t = this.input.domManager) != null && t.dmExists(this.input.id.toString()) && (this.input.valueManager.setValue(this, e.value), (n = this.input) != null && n.drawer && (this.input.drawer.openState = "closed"));
};
var Na = function(e) {
  ue(this.input, e);
};
var wa = function() {
  var i, s;
  const e = `${this.input.id}${this.input.labelId}`, t = `${this.input.id}${this.input.describedById}`, n = [
    h("labelledby", e),
    h("describedby", t),
    h("name", this.input.name),
    h("label", this.input.name),
    h("required", (s = (i = this.input.validationOptions) == null ? void 0 : i.required) != null && s.value ? "true" : "false"),
    h("invalid", this.input.isValid ? "false" : "true"),
    h("disabled", this.input.enabled ? "false" : "true"),
    h("readonly", "false"),
    h("autocomplete", "none"),
    h("haspopup", "false"),
    h("expanded", "false"),
    h("activedescendant", "false")
  ];
  return new q(this).registerChange().registerBlur().registerFocus().registerAria(...n).build();
};
var St = function() {
  this.isInitialized = false, Object.defineProperty(this, "dependencyName", {
    value: St.name,
    writable: false,
    // Prevent modification
    configurable: false
    // Prevent deletion or redefinition
  });
};
Object.assign(St.prototype, {
  initialize: Ca,
  handleOnChanged: Ma,
  handleOnSelected: Sa,
  handleOnClear: Ea,
  clear: ba,
  ref: Na,
  register: wa,
  onSelectItem: Ia
});
var pn = Symbol.for("ISelectBaseInput");
var Oa = function(e) {
  z(this);
};
var Aa = function(e) {
  ae(this);
};
var Da = async function() {
  try {
    if (await k(this.input, () => {
    }, [
      R(this, this.handleOnChanged, "onChange", "onChange", this.name),
      R(this, this.handleOnClear, "onClear", "onClear", this.name)
    ])) {
      const t = new K(
        S(this.input !== void 0, "The dependency field is not instanciated"),
        S(
          this.input.isInitialized,
          `${this.dependencyName}: The dependency field is not properly initialized`
        )
      );
      t.process(), t.hasErrors() ? p(void 0, "critical", "initialize", t.toString()) : this.isInitialized = true;
    }
  } catch (e) {
    p(this.input.trackingManager, "critical", this.dependencyName, e);
  }
};
var $a = function(e) {
  this.input ? ue(this.input, e) : console.log("---ISSUE");
};
var Ta = function() {
  var i, s;
  const e = `${this.input.id}`, t = `${this.input.id}`, n = [
    h("labelledby", e),
    h("describedby", t),
    h("name", this.input.name),
    h("label", this.input.name),
    h("required", (s = (i = this.input.validationOptions) == null ? void 0 : i.required) != null && s.value ? "true" : "false"),
    h("invalid", this.input.isValid ? "false" : "true"),
    h("disabled", this.input.enabled ? "false" : "true"),
    h("readonly", "false"),
    h("autocomplete", "off"),
    h("haspopup", "false"),
    h("expanded", "false"),
    h("activedescendant", "false")
  ];
  return new q(this).registerChange().registerBlur().registerFocus().registerAria(...n).build();
};
var Ct = function() {
  this.isInitialized = false, Object.defineProperty(this, "dependencyName", {
    value: Ct.name,
    writable: false,
    // Prevent modification
    configurable: false
    // Prevent deletion or redefinition
  });
};
Object.assign(Ct.prototype, {
  initialize: Da,
  handleOnChanged: Oa,
  handleOnClear: Aa,
  ref: $a,
  register: Ta
});
var mn = Symbol.for("ITextBaseInput");
var fn = ((e) => (e[e.LOW = 0] = "LOW", e[e.NORMAL = 1] = "NORMAL", e[e.HIGH = 2] = "HIGH", e[e.CRITICAL = 3] = "CRITICAL", e))(fn || {});
var Z = fn;
var Pe = Symbol.for("INotificationManager");
var jt = Symbol.for("SAutoTrackerNotificationManager");
var N = Symbol.for("IServiceManager");
var Ve = Symbol.for("ITrackingManager");
var Hh = Symbol.for("ITrackingOutputProvider");
var _e = (e) => (e.length + 1).toString().padStart(10, "0");
var Fe = (e, t, n, i) => {
  const s = (/* @__PURE__ */ new Date()).toISOString();
  return {
    id: e,
    ts: s,
    type: t,
    source: n,
    message: i
  };
};
var yn = function(e) {
  if (!e)
    throw new Error(
      "ServiceManager is not provided. Please provide a valid ServiceManager instance."
    );
  e.registerClass(mn, Ct, {
    lifetime: "transient",
    dependencies: []
  }), e.registerClass(ke, Mt, {
    lifetime: "transient",
    dependencies: []
  }), e.registerClass(Ee, ft, {
    lifetime: "transient",
    dependencies: []
  }), e.registerClass(hn, vt, {
    lifetime: "transient",
    dependencies: []
  }), e.registerClass(gn, Et, {
    lifetime: "transient",
    dependencies: []
  }), e.registerClass(pn, St, {
    lifetime: "transient",
    dependencies: []
  }), e.registerClass(ia, bt, {
    lifetime: "transient",
    dependencies: []
  }), e.registerClass(zr, yt, {
    lifetime: "transient",
    dependencies: []
  }), e.registerClass(on, mt, {
    lifetime: "transient",
    dependencies: []
  }), e.registerClass(an, le, {
    lifetime: "transient",
    dependencies: [
      N,
      Le,
      Pe,
      Ve,
      xe,
      Ge,
      gt
    ]
  });
};
var vn = function() {
  this.id = "Console.provider", this.func = function(e) {
    switch (e.type) {
      case "critical":
        throw new Error(
          `Critical: ${e.source} has thrown a critical exception
${e.message} `
        );
      case "error":
        console.error(`Error: ${e.source}
${e.message} `);
        break;
      case "warning":
        console.warn(`Warning: ${e.source}
${e.message} `);
        break;
      case "info":
      default:
        e.message.includes("unexpected error. p.func is not a function") && console.log("p.func"), console.info(`info:${e.source}
${e.message} `);
        break;
    }
  }, this.funcAll = function(e) {
    e == null || e.forEach((t) => {
      this.func(t);
    });
  };
};
var Ra = new vn();
var ce = (e) => e == null;
var bn = function() {
  this.name = bn.name, this.validateAsync = async function(e) {
    return Promise.resolve(this.validate(e));
  }, this.validate = function(e) {
    var s, r, o, u, c, d;
    const t = e.input.name, n = e.input.valueManager.getValue(e);
    return (s = e == null ? void 0 : e.input.validationOptions) != null && s.maxLength && !ce(n) && String(n).length > ((o = (r = e == null ? void 0 : e.input.validationOptions) == null ? void 0 : r.maxLength) == null ? void 0 : o.value) ? A(
      false,
      t,
      O.maxLength,
      e.input.validationManager.triggerKeyWordType,
      ((u = e == null ? void 0 : e.input.validationOptions.maxLength.error) == null ? void 0 : u.message) ?? void 0,
      ((d = (c = e == null ? void 0 : e.input.validationOptions.maxLength) == null ? void 0 : c.guide) == null ? void 0 : d.message) ?? void 0
    ) : A(
      true,
      t,
      O.maxLength,
      e.input.validationManager.triggerKeyWordType
    );
  };
};
var La = new bn();
var Mn = function() {
  this.name = Mn.name, this.validateAsync = async function(e) {
    return Promise.resolve(this.validate(e));
  }, this.validate = function(e) {
    var s, r, o, u;
    const t = e.input.name, n = e.input.valueManager.getValue(e, "validation");
    return (s = e == null ? void 0 : e.input.validationOptions) != null && s.max && !ce(n) && (isNaN(Number(n)) || Number(n) > e.input.validationOptions.max.value) ? A(
      false,
      t,
      O.max,
      e.input.validationManager.triggerKeyWordType,
      ((r = e.input.validationOptions.max.error) == null ? void 0 : r.message) ?? void 0,
      ((u = (o = e.input.validationOptions.max) == null ? void 0 : o.guide) == null ? void 0 : u.message) ?? void 0
    ) : A(
      true,
      t,
      O.max,
      e.input.validationManager.triggerKeyWordType
    );
  };
};
var xa = new Mn();
var En = function() {
  this.name = En.name, this.validateAsync = async function(e) {
    return Promise.resolve(this.validate(e));
  }, this.validate = function(e) {
    var s, r, o, u;
    const t = e.input.name, n = e.input.valueManager.getValue(e);
    return (s = e == null ? void 0 : e.input.validationOptions) != null && s.minLength && !ce(n) && String(n).length < e.input.validationOptions.minLength.value ? A(
      false,
      t,
      O.minLength,
      e.input.validationManager.triggerKeyWordType,
      ((r = e.input.validationOptions.minLength.error) == null ? void 0 : r.message) ?? void 0,
      ((u = (o = e.input.validationOptions.minLength) == null ? void 0 : o.guide) == null ? void 0 : u.message) ?? void 0
    ) : A(
      true,
      t,
      O.minLength,
      e.input.validationManager.triggerKeyWordType
    );
  };
};
var Ga = new En();
var Sn = function() {
  this.name = Sn.name, this.validateAsync = async function(e) {
    return Promise.resolve(this.validate(e));
  }, this.validate = function(e) {
    var s, r, o, u;
    const t = e.input.name, n = e.input.valueManager.getValue(e, "validation");
    return (s = e == null ? void 0 : e.input.validationOptions) != null && s.min && !ce(n) && (isNaN(Number(n)) || Number(n) < e.input.validationOptions.min.value) ? A(
      false,
      t,
      O.min,
      e.input.validationManager.triggerKeyWordType,
      ((r = e.input.validationOptions.min.error) == null ? void 0 : r.message) ?? void 0,
      ((u = (o = e.input.validationOptions.min) == null ? void 0 : o.guide) == null ? void 0 : u.message) ?? void 0
    ) : A(
      true,
      t,
      O.min,
      e.input.validationManager.triggerKeyWordType
    );
  };
};
var ka = new Sn();
var Cn = function() {
  this.name = Cn.name, this.validateAsync = async function(e) {
    return Promise.resolve(this.validate(e));
  }, this.validate = function(e) {
    var s, r, o, u, c, d;
    const t = e.input.name, n = e.input.valueManager.getValue(e);
    return (r = (s = e == null ? void 0 : e.input.validationOptions) == null ? void 0 : s.required) != null && r.value && ce(n) ? A(
      false,
      t,
      O.required,
      e.input.validationManager.triggerKeyWordType,
      ((u = (o = e.input.validationOptions.required) == null ? void 0 : o.error) == null ? void 0 : u.message) ?? void 0,
      ((d = (c = e.input.validationOptions.required) == null ? void 0 : c.guide) == null ? void 0 : d.message) ?? void 0
    ) : A(
      true,
      t,
      O.required,
      e.input.validationManager.triggerKeyWordType
    );
  };
};
var Pa = new Cn();
var In = function() {
  this.name = In.name, this.validateAsync = async function(e) {
    return Promise.resolve(this.validate(e));
  }, this.validate = function(e) {
    var o, u, c, d, g;
    const t = e.input.name, n = e.input.valueManager.getValue(e);
    if (!((u = (o = e == null ? void 0 : e.input.validationOptions) == null ? void 0 : o.pattern) != null && u.value))
      return A(
        true,
        t,
        O.custom,
        e.input.validationManager.triggerKeyWordType
      );
    const i = !ce(n), s = new RegExp(e.input.validationOptions.pattern.value), r = String(n);
    return i && !s.test(r) ? A(
      false,
      t,
      O.custom,
      e.input.validationManager.triggerKeyWordType,
      ((c = e.input.validationOptions.pattern.error) == null ? void 0 : c.message) ?? void 0,
      ((g = (d = e.input.validationOptions.pattern) == null ? void 0 : d.guide) == null ? void 0 : g.message) ?? void 0
    ) : A(
      true,
      t,
      O.custom,
      e.input.validationManager.triggerKeyWordType
    );
  };
};
var Va = new In();
var _a = ((e) => (e.checkbox = "checkbox", e.toggle = "toggle", e.text = "text", e.richtext = "richtext", e.radio = "radio", e.select = "select", e.number = "number", e.range = "range", e.date = "date", e.time = "time", e.tel = "tel", e.email = "email", e.url = "url", e.password = "password", e))(_a || {});
var Fa = [
  "checkbox",
  "toggle"
  /* toggle */
];
var Ba = [
  "text",
  "richtext",
  "radio",
  "tel",
  "email",
  "password",
  "url"
  /* url */
];
var ja = [
  "number",
  "range"
  /* range */
];
var Nn = [
  "select"
  /* select */
];
var Ua = [
  "date",
  "time"
  /* time */
];
var wn = (e) => typeof e == "boolean";
var On = (e) => {
  var t;
  if (e.input.value !== null && !wn(e.input.value))
    throw new Error(
      `${On.name}: cannot get he value as boolea, is not boolean compatible value: ${JSON.stringify(e.input.value)}, field: ${(t = e.input) == null ? void 0 : t.id}`
    );
  return e.input.value;
};
var An = function(e, t) {
  var n, i;
  if (t !== null && !wn(t))
    throw new Error(
      `${An.name}: cannot set he value as boolea, is not boolean compatible value: ${JSON.stringify((n = e.input) == null ? void 0 : n.value)}, field: ${(i = e.input) == null ? void 0 : i.id}`
    );
  e.checked = t ?? false, e.input.domManager.dmSetChecked(e.input.id.toString(), t ?? false), e.input.value = t;
};
var za = oe(
  "BooleanParserStrategy",
  Fa,
  "checked",
  An,
  On
);
var qa = ((e) => (e.string = "string", e.number = "number", e.bigint = "bigint", e.float = "float", e.date = "date", e.boolean = "boolean", e.symbol = "symbol", e.undefined = "undefined", e.null = "null", e.object = "object", e.function = "function", e))(qa || {});
var B = ((e) => (e.errors = "errors", e.no_errors = "no-errors", e.focus = "focus", e.no_focus = "no-focus", e.open = "open", e.no_open = "no-open", e.enabled = "enabled", e.no_enabled = "no-enabled", e.dirty = "dirty", e.no_dirty = "no-dirty", e.pristine = "pristine", e.no_pristine = "no-pristine", e.valid = "valid", e.no_valid = "no-valid", e.required = "required", e.no_required = "no-required", e.busy = "busy", e.no_busy = "no-busy", e.clear = "clear", e))(B || {});
var Dn = ((e) => (e.errors = "errors", e.focus = "focus", e.open = "open", e.enabled = "enabled", e.dirty = "dirty", e.pristine = "pristine", e.valid = "valid", e.required = "required", e.busy = "busy", e.clear = "clear", e))(Dn || {});
var Wh = Object.values(B);
var Yh = Object.values(Dn);
var Ie = ((e) => (e.ID = "id", e.NAME = "name", e.LABEL = "label", e))(Ie || {});
var Ha = /^([0-2][0-9]|3[0-1])([-/])([0][1-9]|1[0-2])\2(\d{4})$/;
var Wa = /^([0][1-9]|1[0-2])([-/])([0-2][0-9]|3[0-1])\2(\d{4})$/;
var Ya = /^(\d{4})([-/])([0][1-9]|1[0-2])\2([0-2][0-9]|3[0-1])$/;
var L = ((e) => (e.DD_MM_YYYY = "dd/MM/yyyy", e.MM_DD_YYYY = "MM/dd/yyyy", e.YYYY_MM_DD = "yyyy/MM/dd", e))(L || {});
function Za(e) {
  return Ha.test(e) ? L.DD_MM_YYYY : Wa.test(e) ? L.MM_DD_YYYY : Ya.test(e) ? L.YYYY_MM_DD : null;
}
var ie = (e, t) => e.toString().padStart(t, "0");
var H = function(e, t = "", n = "/") {
  this.name = t, this.separator = n, this.dateObject = e ? { day: e.getDate(), month: e.getMonth(), year: e.getFullYear() } : {
    day: (/* @__PURE__ */ new Date()).getDate(),
    month: (/* @__PURE__ */ new Date()).getMonth(),
    year: (/* @__PURE__ */ new Date()).getFullYear()
  }, this.dayOfWeek = e ? e.getDay() : (/* @__PURE__ */ new Date()).getDay();
};
H.prototype = {
  day: function() {
    return this.dateObject.day;
  },
  month: function() {
    return this.dateObject.month;
  },
  year: function() {
    return this.dateObject.year;
  },
  isDefined: function() {
    return this.dateObject.day !== 0 && this.dateObject.month !== 0 && this.dateObject.year !== 0;
  },
  setFromStrings: function(e = "", t = "", n = "") {
    this.dateObject.day = parseInt(e), this.dateObject.month = parseInt(t) - 1, this.dateObject.year = parseInt(n), this.dayOfWeek = new Date(
      this.dateObject.year,
      this.dateObject.month,
      this.dateObject.day
    ).getDay();
  },
  setFromNumbers: function(e = 0, t = 0, n = 0) {
    this.dateObject.day = e, this.dateObject.month = t, this.dateObject.year = n, this.dayOfWeek = new Date(n, t, e).getDay();
  },
  setFromDate: function(e) {
    this.dateObject.day = e.getDate(), this.dateObject.month = e.getMonth(), this.dateObject.year = e.getFullYear(), this.dayOfWeek = e.getDay();
  },
  setFromNumber: function(e) {
    var n;
    const t = new Date(e);
    (n = this.setFromDate) == null || n.call(this, t);
  },
  /** here we store the date object with the month shifted - 1 */
  setFromObject: function(e) {
    this.dateObject = { ...e, month: e.month - 1 };
  },
  setFromString: function(e, t) {
    var n;
    if (e.length === 10) {
      let i = "", s = "", r = "";
      return t === L.MM_DD_YYYY && (s = e.substring(0, 2), r = e.substring(3, 5), i = e.substring(6)), t === L.DD_MM_YYYY && (r = e.substring(0, 2), s = e.substring(3, 5), i = e.substring(6)), t === L.YYYY_MM_DD && (i = e.substring(0, 4), s = e.substring(5, 7), r = e.substring(8)), (n = this.setFromStrings) == null || n.call(this, r, s, i), true;
    }
    return false;
  },
  isNullEmptyOrUndefined: function(e) {
    return e == null;
  },
  setCurrentDate: function(e, t, n = 1) {
    var i;
    (i = this.setFromNumbers) == null || i.call(this, n, t, e);
  },
  /** Note that  */
  toString: function(e) {
    const t = this.dateObject.day, n = this.dateObject.month + 1, i = this.dateObject.year;
    return e === L.MM_DD_YYYY ? `${ie(n, 2)}${this.separator}${ie(t, 2)}${this.separator}${i}` : e === L.DD_MM_YYYY ? `${ie(t, 2)}${this.separator}${ie(n, 2)}${this.separator}${i}` : e === L.YYYY_MM_DD ? `${i}${this.separator}${ie(n, 2)}${this.separator}${ie(t, 2)}` : "";
  },
  toDate: function() {
    return new Date(this.dateObject.year, this.dateObject.month, this.dateObject.day);
  },
  /** here we return the date object with the month shifted + 1 */
  toINDate: function() {
    return {
      year: this.dateObject.year,
      month: this.dateObject.month + 1,
      day: this.dateObject.day
    };
  },
  parse: function(e) {
    var t, n, i, s, r;
    if (typeof e == "string") {
      const o = Za(e);
      if (!o) {
        (t = this.setFromString) == null || t.call(this, e, L.YYYY_MM_DD);
        return;
      }
      (n = this.setFromString) == null || n.call(this, e, o);
    }
    if (typeof e == "number") {
      (i = this.setFromNumber) == null || i.call(this, e);
      return;
    }
    if (e instanceof Date) {
      (s = this.setFromDate) == null || s.call(this, e);
      return;
    }
    if (typeof e == "object" && e !== null && "year" in e && "month" in e && "day" in e) {
      (r = this.setFromObject) == null || r.call(this, e);
      return;
    }
    throw Error(`Cannot parse DATE ${JSON.stringify(e)} `);
  }
};
var Zh = (e, t, n) => {
  const i = [...e], s = [];
  return t && Object.entries(t).forEach((r) => {
    var d;
    const o = r[0], u = r[1], c = i.find((g) => g.name === o);
    if (c) {
      if (c.objectValue = null, c.value = null, c.isDirty = false, (c == null ? void 0 : c.type) === "date") {
        const g = new H(void 0, "display");
        (d = g == null ? void 0 : g.parse) == null || d.call(g, u), c.objectValue = g.dateObject;
      }
      c.validationOptions !== void 0 && n && (c.shouldValidate = n), c.value = u, c.loaded = true, c.isValid = true, c && s.push({ ...c });
    }
  }), s.sort((r, o) => r.id - o.id);
};
var Jh = (e) => {
  let t = {};
  return [...e].sort((i, s) => i.id - s.id).forEach((i) => {
    i.name === "id" ? t = {
      ...t,
      [i.name]: !(i != null && i.value) || Number(i == null ? void 0 : i.value) < 0 ? -1 : Number(i == null ? void 0 : i.value)
    } : t = { ...t, [i.name]: "" };
  }), t;
};
var We = function(e, t) {
  throw new Error(
    `MISSING ${e}! ${t} component requires an ${e}. 
            This is probably due to the instance of the field 
            which has not the right name has it has being declared 
            in the model!`
  );
};
var Ne = (e) => {
  const t = [];
  return e.properties.forEach((i) => {
    const s = {
      id: i.id ?? We(Ie.ID, Ne.name),
      isDirty: false,
      isFocus: false,
      isPristine: true,
      isValid: false,
      loaded: false,
      label: i.name ?? We(Ie.LABEL, Ne.name),
      name: i.name ?? We(Ie.NAME, Ne.name),
      type: i.type,
      value: null,
      target: i.target === null || i.target === "" ? void 0 : i.target,
      options: i == null ? void 0 : i.options.map((r, o) => ({ ...r, sequenceId: o })),
      errors: [],
      guides: [],
      shouldValidate: i.shouldValidate,
      expectedValue: i.expectedValue === null || i.expectedValue === "" ? void 0 : i.expectedValue,
      validationOptions: {
        required: i.required,
        max: i.max,
        min: i.min,
        maxLength: i.maxLength,
        minLength: i.minLength,
        pattern: i.pattern
      },
      objectValue: null,
      defaultValue: i.defaultValue,
      mask: i.mask ?? void 0
    };
    t.push(s);
  }), t.sort((i, s) => i.id - s.id);
};
var $n = function(e) {
  var t;
  try {
    const n = new H();
    return n.setFromString && ((t = n == null ? void 0 : n.setFromObject) == null || t.call(n, e)), n;
  } catch {
    return e;
  }
};
var Kh = (e, t) => {
  if (!e || !t) return "";
  switch (t) {
    case L.YYYY_MM_DD:
      return `${e == null ? void 0 : e.year}-${e == null ? void 0 : e.month.toString().padStart(2, "0")}-${e == null ? void 0 : e.day.toString().padStart(2, "0")}`;
    case L.MM_DD_YYYY:
      return `${e == null ? void 0 : e.month.toString().padStart(2, "0")}-${e == null ? void 0 : e.day.toString().padStart(2, "0")}-${e == null ? void 0 : e.year}`;
    case L.DD_MM_YYYY:
    default:
      return `${e == null ? void 0 : e.day.toString().padStart(2, "0")}-${e == null ? void 0 : e.month.toString().padStart(2, "0")}-${e == null ? void 0 : e.year}`;
  }
};
var Qh = (e) => e < 0 ? 11 : e > 11 ? 0 : e;
var Be = () => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var Xh = (e) => Be().indexOf(e);
var eg = (e) => Be().indexOf(e);
var tg = (e) => Be()[e];
var ng = (e) => Be()[e];
var ig = (e) => new Date(e).getDay();
var sg = () => new Intl.DateTimeFormat("default").format(/* @__PURE__ */ new Date()).replace(/\d/g, "").trim()[0];
var rg = (e, t) => Array.from({ length: new Date(t, e, 0).getDate() }, (n, i) => i + 1);
var je = () => [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
var ag = (e) => je().indexOf(e);
var og = (e) => je().indexOf(e);
var ug = (e) => je()[e];
var cg = (e) => je()[e];
var lg = (e) => `${e.getFullYear().toString()}${e.getMonth().toString().padStart(2, "0")}${e.getDate().toString().padStart(2, "0")}`;
var dg = () => Array.from({ length: 12 }, (e, t) => t + 1);
var hg = (e, t) => Array.from({ length: t - e + 1 }, (n, i) => i + e);
var Ja = function(e, t) {
  try {
    const n = new H();
    return n.setFromString && n.setFromString(e, t), n;
  } catch {
    return e;
  }
};
var gg = {
  action: "",
  emitterName: "",
  fieldName: "",
  types: ["intitial"],
  toFlags: () => Yt("", "", ["intitial"], "")
};
var pg = () => {
};
var Ka = ((e) => (e.intitial = "intitial", e.onBlur = "onBlur", e.onChange = "onChange", e.onSubmit = "onSubmit", e.onFocus = "onFocus", e.onLoad = "onLoad", e.onClick = "onClick", e.onClear = "onClear", e.onResetValidation = "onResetValidation", e.onGet = "onGet", e.onValidate = "onValidate", e.onSelect = "onSelect", e.onKeyPress = "onKeyPress", e.onKeyDown = "onKeyDown", e.onKeyUp = "onKeyUp", e.onFormat = "onFormat", e.onOpen = "onOpen", e.onClose = "onClose", e.onUiUpdate = "onUiUpdate", e.onAutoTrackNotified = "onAutoTrackNotified", e.validateOnFormFirstSubmit = "validateOnFormFirstSubmit", e.onEngineStateChanger = "onEngineStateChanger", e.onDispose = "onDispose", e.onValueChange = "onValueChange", e.onValidationChange = "onValidationChange", e.onBusyStateChange = "onBusyStateChange", e.onObserve = "onObserve", e))(Ka || {});
var mg = ["onChange", "onBlur", "onFocus"];
var Qa = "en";
var Xa = [{ key: "VALIDATION.NAME.ERROR", value: "Name format is not correct" }, { key: "VALIDATION.NAME.GUIDE", value: "Name format is |data|." }, { key: "VALIDATION.AGE.ERROR", value: "Age format is not correct" }, { key: "VALIDATION.AGE.GUIDE", value: "Age format is |data|." }, { key: "VALIDATION.EMAIL.ERROR", value: "Email format is not correct" }, { key: "VALIDATION.EMAIL.GUIDE", value: "Email format is |data|." }, { key: "VALIDATION.PHONE.ERROR", value: "Phone format is not correct" }, { key: "VALIDATION.PHONE.GUIDE", value: "Phone format is |data|." }, { key: "VALIDATION.ADDRESS.ERROR", value: "Address format is not correct" }, { key: "VALIDATION.ADDRESS.GUIDE", value: "Address format is |data|." }, { key: "VALIDATION.CITY.ERROR", value: "City format is not correct" }, { key: "VALIDATION.CITY.GUIDE", value: "City format is |data|." }, { key: "VALIDATION.COUNTRY.ERROR", value: "Country format is not correct" }, { key: "VALIDATION.COUNTRY.GUIDE", value: "Country format is |data|." }, { key: "VALIDATION.ZIPCODE.ERROR", value: "Zipcode format is not correct" }, { key: "VALIDATION.ZIPCODE.GUIDE", value: "Zipcode format is |data|." }, { key: "VALIDATION.PASSWORD.ERROR", value: "Password format is not correct" }, { key: "VALIDATION.PASSWORD.GUIDE", value: "Password format is |data|." }, { key: "VALIDATION.CONFIRM_PASSWORD.ERROR", value: "Confirm password format is not correct" }, { key: "VALIDATION.CONFIRM_PASSWORD.GUIDE", value: "Confirm password format is |data|." }, { key: "VALIDATION.OLD_PASSWORD.ERROR", value: "Old password format is not correct" }, { key: "VALIDATION.OLD_PASSWORD.GUIDE", value: "Old password format is |data|." }, { key: "VALIDATION.NEW_PASSWORD.ERROR", value: "New password format is not correct" }, { key: "VALIDATION.NEW_PASSWORD.GUIDE", value: "New password format is |data|." }, { key: "VALIDATION.CONFIRM_NEW_PASSWORD.ERROR", value: "Confirm new password format is not correct" }, { key: "VALIDATION.CONFIRM_NEW_PASSWORD.GUIDE", value: "Confirm new password format is |data|." }, { key: "VALIDATION.DATE.ERROR", value: "Date format is not correct" }, { key: "VALIDATION.DATE.GUIDE", value: "Date format is |data|." }, { key: "VALIDATION.TIME.ERROR", value: "Time format is not correct" }, { key: "VALIDATION.TIME.GUIDE", value: "Time format is |data|." }, { key: "VALIDATION.DATETIME.ERROR", value: "Datetime format is not correct" }, { key: "VALIDATION.DATETIME.GUIDE", value: "Datetime format is |data|." }, { key: "VALIDATION.URL.ERROR", value: "URL format is not correct" }, { key: "VALIDATION.URL.GUIDE", value: "URL format is |data|." }, { key: "VALIDATION.MAX.ERROR", value: "The value should be lower than |data|" }, { key: "VALIDATION.MAX.GUIDE", value: "The value can be max of |data|" }, { key: "VALIDATION.MIN.ERROR", value: "The value should be higher than |data|" }, { key: "VALIDATION.MIN.GUIDE", value: "The value can be min of |data|" }, { key: "VALIDATION.REQUIRED.ERROR", value: "This field is required" }, { key: "VALIDATION.REQUIRED.GUIDE", value: "This field is required" }, { key: "VALIDATION.EQUALS.ERROR", value: "The value should be equal to |data|" }, { key: "VALIDATION.EQUALS.GUIDE", value: "The value should be equal to |data|" }, { key: "VALIDATION.NOT_EQUALS.ERROR", value: "The value should not be equal to |data|" }, { key: "VALIDATION.NOT_EQUALS.GUIDE", value: "The value should not be equal to |data|" }, { key: "VALIDATION.CONTAINS.ERROR", value: "The value should contain |data|" }, { key: "VALIDATION.CONTAINS.GUIDE", value: "The value should contain |data|" }, { key: "VALIDATION.NOT_CONTAINS.ERROR", value: "The value should not contain |data|" }, { key: "VALIDATION.NOT_CONTAINS.GUIDE", value: "The value should not contain |data|" }, { key: "VALIDATION.STARTS_WITH.ERROR", value: "The value should start with |data|" }, { key: "VALIDATION.STARTS_WITH.GUIDE", value: "The value should start with |data|" }, { key: "VALIDATION.ENDS_WITH.ERROR", value: "The value should end with |data|" }, { key: "VALIDATION.ENDS_WITH.GUIDE", value: "The value should end with |data|" }, { key: "VALIDATION.LENGTH.ERROR", value: "The value should be |data| characters" }, { key: "VALIDATION.LENGTH.GUIDE", value: "The value should be |data| characters" }, { key: "VALIDATION.MIN_LENGTH.ERROR", value: "The value should be at least |data|" }, { key: "VALIDATION.MIN_LENGTH.GUIDE", value: "The value should be at least |data|" }, { key: "VALIDATION.MAX_LENGTH.ERROR", value: "The value should be at most |data|" }, { key: "VALIDATION.MAX_LENGTH.GUIDE", value: "The value should be at most |data|" }, { key: "VALIDATION.BETWEEN_LENGTH.ERROR", value: "The value should be between |data| and |data2| characters" }, { key: "VALIDATION.BETWEEN_LENGTH.GUIDE", value: "The value should be between |data| and |data2| characters" }];
var eo = {
  locale: Qa,
  validations: Xa
};
var fg = (e, t, n) => (i) => (s, r) => {
  const o = e.validations.find((u) => u.key === i);
  return o ? o.value.replace(t, s ?? "").replace(n, r ?? "").replace(t, "").replace(n, "") : "";
};
var yg = () => eo;
var vg = class extends Error {
  constructor(n) {
    var t = (...Pp) => (super(...Pp), F(this, "name", "ApiError"), F(this, "apiError"), this);
    if (!n) {
      t("unexpected Error");
      return;
    }
    t(n.message), this.apiError = n, this.name = "ApiError";
  }
  set data(n) {
    this.apiError = n;
  }
  get data() {
    return this.apiError;
  }
};
var to = (e) => (n) => (e = e + n, e);
var bg = class extends Error {
  constructor(n) {
    var t = (...Vp) => (super(...Vp), F(this, "name", "FieldError"), F(this, "fieldError"), this);
    if (!n) {
      t("unexpected Error");
      return;
    }
    t(n.message), this.fieldError = n, this.name = "FieldError";
  }
  set data(n) {
    this.fieldError = n;
  }
  get data() {
    return this.fieldError;
  }
};
var no = to(0);
var Mg = class extends Error {
  constructor(n, i, s, r) {
    var t = (..._p) => (super(..._p), F(this, "id", 0), F(this, "name", "GeneralError"), F(this, "origin", ""), F(this, "innerError"), this);
    if (!i) {
      t("unexpected Error");
      return;
    }
    t(i), this.id = no(1), this.origin = n, this.name = "GeneralError", this.innerError = s;
  }
  set data(n) {
    this.innerError = n;
  }
  get data() {
    return this.innerError;
  }
  get toGI() {
    return {
      id: this.id,
      data: this.innerError,
      message: this.message,
      origin: this.origin
    };
  }
};
var Eg = (e, t, n) => ({
  name: e,
  code: t,
  message: n
});
var Sg = (e, t, n) => ({
  name: e,
  code: t,
  message: n
});
var Cg = dn((e, t) => e.bind(t));
var Ig = Symbol.for("IFieldDescriptor");
function io() {
  return {
    ...this
  };
}
function so() {
  const e = { ...this };
  return Object.assign(Object.create(Object.getPrototypeOf(this)), e);
}
function ro(e) {
  return this.defaultValue = e, this;
}
function ao(e) {
  return this.expectedValue = e, this;
}
function oo(e) {
  return Object.defineProperty(this, "id", {
    value: e,
    writable: false,
    // Prevent modification
    configurable: false,
    // Prevent deletion or redefinition
    enumerable: true
    // Make the property visible in enumerations
  }), this;
}
function uo(e) {
  return this.mask = e, this;
}
function co(e) {
  return Object.defineProperty(this, "name", {
    value: e,
    writable: false,
    // Prevent modification
    configurable: false,
    // Prevent deletion or redefinition
    enumerable: true
    // Make the property visible in enumerations
  }), this;
}
function lo(e, t) {
  return this.target = e, this.options = t, this;
}
function ho(e) {
  return this.triggerKeyWord = e, this;
}
function go(e) {
  return Object.defineProperty(this, "type", {
    value: e,
    writable: false,
    // Prevent modification
    configurable: false,
    // Prevent deletion or redefinition
    enumerable: true
    // Make the property visible in enumerations
  }), this;
}
function po(e, t) {
  return Object.assign(this, {
    shouldValidate: e,
    ...t
  }), this;
}
var mo = function() {
  this.target = null, this.options = [], this.expectedValue = null, this.shouldValidate = false, this.triggerKeyWord = [], this.mask = null;
};
Object.assign(mo.prototype, {
  setId: oo,
  setName: co,
  setTypeInput: go,
  setValidationData: po,
  setMask: uo,
  setOptionData: lo,
  setExpectedValue: ao,
  setDefaultValue: ro,
  setTriggerKeyWord: ho,
  build: io,
  clone: so
});
function fo(...e) {
  return this.builders = [...e], this;
}
function yo(e, t, n, i, s) {
  const r = this.builders.find((o) => o.name === e);
  if (!r) {
    p(
      void 0,
      "error",
      "FieldSchemaFactory",
      `unable to find the builder for ${e}`
    );
    return;
  }
  return r.setOptionData(t, n).setValidationData(i, s).build();
}
var vo = function(e) {
  this.name = e, this.builders = [];
};
Object.assign(vo.prototype, {
  addBuilders: fo,
  create: yo
});
var Ng = (e) => e.replace(/\w+/g, function(t) {
  return t[0].toUpperCase() + t.slice(1);
});
var wg = (e) => {
  const t = [];
  for (const n of e)
    n != null && n && t.push(n);
  return t.join(" ");
};
var Og = (e, t) => ({ classN: e, addIf: t });
var Ag = (e) => {
  const t = [];
  for (const n of e)
    n != null && n && n.addIf && t.push(n.classN);
  return t.join(" ");
};
var Dg = (e) => typeof e == "bigint";
var $g = (e) => e instanceof Date && Object.prototype.toString.call(e) === "[object Date]";
var Tg = (e) => e instanceof H;
var Rg = (e) => typeof e == "function";
var Tn = (e) => {
  try {
    return !(e instanceof H) && "day" in e && "month" in e && "year" in e;
  } catch {
    return false;
  }
};
var bo = (e) => e === null || e === "" || e === void 0;
var Lg = (e) => e === null || e === "";
var Rn = (e) => typeof e == "number" && !Number.isNaN(e);
var Ln = (e) => typeof e == "string";
var xg = (e) => e.toFlags();
var Gg = (e) => e;
var xn = ((e) => (e.portrait = "portrait", e.landscape = "landscape", e.undefined = "undefined", e))(xn || {});
var kg = Object.values(xn);
var Mo = (e) => {
  if (e == null || typeof e != "object" && typeof e != "function")
    return e;
  if (Array.isArray(e))
    return [...e];
  if (e instanceof Date)
    return new Date(e.getTime());
  if (e instanceof RegExp)
    return new RegExp(e.source, e.flags);
  if (typeof e == "function") {
    const s = e, r = function(...o) {
      return s.apply(this, o);
    };
    return Object.assign(r, s), r;
  }
  const t = Object.getPrototypeOf(e), n = Object.create(t), i = Object.getOwnPropertyDescriptors(e);
  return Object.defineProperties(n, i), n;
};
var Pg = (e) => {
  if (e == null || /^-?\d+$/.test(e.trim()))
    return false;
  const t = new Date(e);
  return t ? !isNaN(t.getTime()) : false;
};
var Vg = (e) => e.replace(/\w+/g, function(t) {
  return t[0].toUpperCase() + t.slice(1).toLowerCase();
});
var Eo = (e) => {
  var t;
  if (!bo(e.input.objectValue) && Tn(e.input.objectValue)) {
    const n = $n(e.input.objectValue);
    if (n instanceof H)
      return ((t = n.toString) == null ? void 0 : t.call(n, e.input.culture.dateFormat)) ?? null;
  }
  return e.input.value;
};
var So = (e, t) => {
  if (e.length !== 10) return false;
  const n = e.split(/[/\-.]/);
  if (n.length !== 3) return false;
  const [i, s, r] = n, o = parseInt(i, 10), u = parseInt(s, 10), c = parseInt(r, 10);
  return isNaN(o) || isNaN(u) || isNaN(c) ? false : t.toLowerCase().includes("dd") ? o >= 1 && o <= 31 && u >= 1 && u <= 12 && c >= 1900 && c <= 2100 : t.toLowerCase().includes("mm") ? o >= 1 && o <= 12 && u >= 1 && u <= 31 && c >= 1900 && c <= 2100 : true;
};
var Co = function(e, t) {
  var n, i;
  try {
    if (typeof t == "string" && t.length === 10 && (!(e.dependencyName === "MaskedBaseInput" || e.mask != null || e.input.mask != null || e.input.type === "date") || So(t, e.input.culture.dateFormat)) && (t = Ja(t, e.input.culture.dateFormat)), Tn(t) && (t = $n(t)), t instanceof H) {
      const s = ((n = t.toString) == null ? void 0 : n.call(t, e.input.culture.dateFormat)) ?? null;
      e.input.domManager.dmSetValue(e.input.id.toString(), s), e.input.value = s, e.input.objectValue = ((i = t == null ? void 0 : t.toINDate) == null ? void 0 : i.call(t)) ?? null;
    } else
      e.input.domManager.dmSetValue(e.input.id.toString(), t), e.input.value = t, e.input.objectValue = null;
  } catch (s) {
    p(
      void 0,
      "error",
      `Error setting date value for field ${e.input.name}: ${s.message}`,
      "dateSetter"
    ), (e.dependencyName === "MaskedBaseInput" || e.mask != null || e.input.mask != null || e.input.type === "date") && typeof t == "string" && t.length < 10 ? (e.input.domManager.dmSetValue(e.input.id.toString(), t), e.input.value = t, e.input.objectValue = null) : (e.input.value = null, e.input.objectValue = null);
  }
};
var Io = oe(
  "DateParserStrategy",
  Ua,
  "objectValue",
  Co,
  Eo
);
var No = (e) => {
  var n;
  const t = e == null ? void 0 : e.optionBase.tryGetOptionByIdOrValue(
    ((n = e.optionBase.selectedOptionId) == null ? void 0 : n.toString()) ?? "",
    e.input.value
  );
  return t || (e.input.message(
    "info",
    "IFieldInput.setValue",
    `Unable to find the option for this field:  type: ${e.input.type}, name: ${e.input.name} option Id ${e.optionBase.selectedOptionId} or Value: ${e.input.value}`
  ), null);
};
var wo = (e, t) => {
  if (t == null) {
    e.optionBase.selectedOptionId = null, e.input.value = null, e.input.domManager.dmSetValue(e.input.id.toString(), null);
    return;
  }
  const n = e == null ? void 0 : e.optionBase.tryGetOptionByIdOrValue(
    (t == null ? void 0 : t.toString()) ?? "",
    t
  );
  if (!n) {
    e.input.message(
      "info",
      "IFieldInput.setValue",
      `Unable to find the option for this field:  type: ${e.input.type}, name: ${e.input.name} option Id or Value: ${t}`
    );
    return;
  }
  e.optionBase.selectedOptionId = Number(n.id), e.input.value = n.value, e.input.domManager.dmSetValue(e.input.id.toString(), n.value ?? ""), e.input.domManager.dmSetSelected(e.input.id.toString(), n.text ?? null), e.input.domManager.dmSetFocus(e.input.id.toString());
};
var Oo = oe(
  "NumericOptionParserStrategy",
  Nn,
  "selectedOptionId",
  wo,
  No
);
var It = (e) => {
  var t;
  if (e.input.value !== null && !Rn(e.input.value))
    throw new Error(
      `${It.name}: cannot get the value as number, is not number compatible value: ${JSON.stringify(e.input.value)}, field: ${(t = e.input) == null ? void 0 : t.id}`
    );
  return e.input.value;
};
var Ao = function(e, t) {
  var n;
  if ((t !== null || t !== void 0) && !Rn(t))
    throw new Error(
      `${It.name}: cannot set the value as number, is not number compatible value: ${JSON.stringify(e.input.value)}, field: ${(n = e.input) == null ? void 0 : n.id}`
    );
  e.input.domManager.dmSetValue(e.input.id.toString(), t), e.input.value = t;
};
var Do = oe(
  "NumericParserStrategy",
  ja,
  "value",
  Ao,
  It
);
var $o = (e) => {
  var n;
  const t = e == null ? void 0 : e.optionBase.tryGetOptionBySequenceIdThenIdOrValue(
    e.optionBase.selectedOptionId ?? -1,
    ((n = e.optionBase.selectedOptionId) == null ? void 0 : n.toString()) ?? "",
    e.input.value
  );
  return t || (e.input.message(
    "error",
    "IFieldInput.setValue",
    `Unable to find the option for this field:  type: ${e.input.type}, name: ${e.input.name} option Id ${e.optionBase.selectedOptionId} or Value: ${e.input.value}`
  ), null);
};
var To = (e, t) => {
  if (t == null) {
    e.optionBase.selectedOptionId = null, e.input.value = null, e.input.domManager.dmSetValue(e.input.id.toString(), null);
    return;
  }
  const n = e == null ? void 0 : e.optionBase.tryGetOptionBySequenceIdThenIdOrValue(
    Number(t),
    t,
    t
  );
  if (!n) {
    e.input.message(
      "error",
      "IFieldInput.setValue",
      `Unable to find the option for this field:  type: ${e.input.type}, name: ${e.input.name} option Id or Value: ${t}`
    );
    return;
  }
  e.optionBase.selectedOptionId = Number(n.id), e.input.value = n.value, e.input.domManager.dmSetValue(e.input.id.toString(), n.value ?? "");
};
var Ro = oe(
  "SelectOptionParserStrategy",
  Nn,
  "selectedOptionId",
  To,
  $o
);
var Gn = (e) => {
  var t;
  if (e.input.value !== null && !Ln(e.input.value))
    throw new Error(
      `${Gn.name}: cannot get he value as string, is not string compatible value: ${JSON.stringify(e.input.value)}, field: ${(t = e.input) == null ? void 0 : t.id}`
    );
  return e.input.value;
};
var kn = function(e, t) {
  var n, i;
  if (e.input.value !== null && !Ln(t))
    throw new Error(
      `${kn.name}: cannot set he value as string, is not boolean string value: ${JSON.stringify((n = e.input) == null ? void 0 : n.value)}, field: ${(i = e.input) == null ? void 0 : i.id}`
    );
  e.input.domManager.dmSetValue(e.input.id.toString(), t), e.input.value = t;
};
var Lo = oe(
  "StringParserStrategy",
  Ba,
  "value",
  kn,
  Gn
);
var Xe = Symbol.for("ITrackingStrategyService");
var Pn = function(e) {
  if (!e)
    throw new Error(
      "ServiceManager is not provided. Please provide a valid ServiceManager instance."
    );
  this.sm = e;
  let t = [];
  Object.defineProperties(this, {
    strategies: {
      get: function() {
        return t;
      },
      set: function(...n) {
        for (const i of n)
          t.includes(i) || t.push(i);
        this.sync();
      },
      enumerable: true,
      configurable: false
    }
  }), this.sync = function() {
    var i;
    const n = (i = this.sm.lazy(Ve)) == null ? void 0 : i();
    n && n.addProviders(this.strategies);
  };
};
Object.assign(Pn.prototype, {
  add: function(...e) {
    for (const t of e)
      this.strategies.includes(t) || this.strategies.push(t);
    this.sync();
  },
  remove: function(...e) {
    for (const t of e) {
      const n = this.strategies.indexOf(t);
      n !== -1 && this.strategies.splice(n, 1);
    }
    this.sync();
  },
  reset: function() {
    this.strategies = [], this.sync();
  }
});
var et = Symbol.for("IValidationStrategyService");
var Vn = function(e) {
  if (!e)
    throw new Error(
      "ServiceManager is not provided. Please provide a valid ServiceManager instance."
    );
  this.sm = e;
  let t = [];
  Object.defineProperties(this, {
    strategies: {
      get: function() {
        return t;
      },
      set: function(...n) {
        for (const i of n)
          t.includes(i) || t.push(i);
        this.sync();
      },
      enumerable: true,
      configurable: false
    }
  }), this.sync = function() {
    var i;
    const n = (i = this.sm.lazy(xe)) == null ? void 0 : i();
    n && n.addValidationStrategies(...this.strategies);
  };
};
Object.assign(Vn.prototype, {
  add: function(...e) {
    for (const t of e)
      this.strategies.includes(t) || this.strategies.push(t);
    this.sync();
  },
  remove: function(...e) {
    for (const t of e) {
      const n = this.strategies.indexOf(t);
      n !== -1 && this.strategies.splice(n, 1);
    }
    this.sync();
  },
  reset: function() {
    this.strategies = [], this.sync();
  }
});
var Re = Symbol.for("IValidationTriggerService");
var _n = function(e) {
  if (!e)
    throw new Error(
      "ServiceManager is not provided. Please provide a valid ServiceManager instance."
    );
  let t = [];
  Object.defineProperties(this, {
    triggers: {
      get: function() {
        return t;
      },
      set: function(n) {
        t = n || [];
      },
      enumerable: true,
      configurable: false
    }
  }), this.sm = e, this.sync = function() {
    const n = this.sm.tryResolve(ht);
    if (n && n.forms && n.forms.size > 0)
      for (const i of n.forms.values())
        i.setTriggerKeyWord(this.triggers);
  };
};
Object.assign(_n.prototype, {
  canTrigger: function(...e) {
    for (const t of e)
      if (this.triggers.includes(t))
        return true;
    return false;
  },
  add: function(...e) {
    const t = [...this.triggers];
    for (const n of e)
      t.includes(n) || t.push(n);
    this.triggers = t, this.sync();
  },
  remove: function(...e) {
    let t = [...this.triggers];
    for (const n of e)
      t = t.filter((i) => i !== n);
    this.triggers = t, this.sync();
  },
  reset: function() {
    this.triggers = [], this.sync();
  }
});
var tt = Symbol.for("IValueStrategyService");
var Fn = function(e) {
  if (!e)
    throw new Error(
      "ServiceManager is not provided. Please provide a valid ServiceManager instance."
    );
  let t = [];
  Object.defineProperties(this, {
    strategies: {
      get: function() {
        return t;
      },
      set: function(...n) {
        for (const i of n)
          t.includes(i) || t.push(i);
        this.sync();
      },
      enumerable: true,
      configurable: false
    }
  }), this.sm = e, this.sync = function() {
    var i;
    const n = (i = this.sm.lazy(Ge)) == null ? void 0 : i();
    n && n.acceptValueStrategies(...this.strategies);
  };
};
Object.assign(Fn.prototype, {
  add: function(...e) {
    for (const t of e)
      this.strategies.includes(t) || this.strategies.push(t);
    this.sync();
  },
  remove: function(...e) {
    for (const t of e) {
      const n = this.strategies.indexOf(t);
      n !== -1 && this.strategies.splice(n, 1);
    }
    this.sync();
  },
  reset: function() {
    this.strategies = [], this.sync();
  }
});
var Bn = function(e) {
  var r, o, u, c;
  if (!e)
    throw new Error(
      "ServiceManager is not provided. Please provide a valid ServiceManager instance."
    );
  const t = (r = e.lazy(Re)) == null ? void 0 : r(), n = (o = e.lazy(et)) == null ? void 0 : o(), i = (u = e.lazy(tt)) == null ? void 0 : u(), s = (c = e.lazy(Xe)) == null ? void 0 : c();
  n.add(
    La,
    xa,
    Ga,
    ka,
    Pa,
    Va
  ), i.add(
    za,
    Lo,
    Do,
    Io,
    Oo,
    Ro
  ), s.add(Ra), t.add("onBlur", "onChange", "onKeyUp", "onKeyDown", "onFocus");
};
var xo = function(...e) {
  if (e.length === 0)
    return;
  let t = this.activeConfiguration;
  for (let i = 0; i < e.length - 1; i++) {
    const s = e[i];
    if (!t || typeof t != "object")
      return;
    t = t[s];
  }
  const n = e[e.length - 1];
  if (!t) {
    console.warn(`Default Configuration not found! Searched Path: ${e.join(".")}`);
    return;
  }
  if (Array.isArray(t))
    return t.find((i) => i && i.name === n);
  if (typeof t == "object") {
    if (t.hasOwnProperty(n))
      return t[n];
    const i = Object.keys(t).find((s) => {
      const r = t[s];
      return r && typeof r == "object" && r[n] === true;
    });
    if (i)
      return t[i];
  }
};
var T = {
  name: "default-formular-configuration",
  targetEnvironment: "development",
  cultures: {
    defaultCulture: {
      name: "fr-CH",
      dateFormat: "dd/MM/yyyy",
      timeFormat: "HH:mm:ss",
      currencySymbol: "CHF",
      separator: "."
    },
    supportedCultures: [
      {
        name: "en-US",
        dateFormat: "MM/dd/yyyy",
        timeFormat: "hh:mm:ss tt",
        currencySymbol: "$",
        separator: "/"
      },
      {
        name: "fr-FR",
        dateFormat: "dd/MM/yyyy",
        timeFormat: "HH:mm:ss",
        currencySymbol: "€",
        separator: "/"
      },
      {
        name: "de-DE",
        dateFormat: "dd/MM/yyyy",
        timeFormat: "HH:mm:ss",
        currencySymbol: "€",
        separator: "/"
      }
    ],
    lokalizeTokensReplacement: [
      {
        name: "validationDataToken1",
        token: "|data|"
      },
      {
        name: "validationDataToken2",
        token: "|data2|"
      }
    ]
  },
  rendering: {
    components: [
      {
        name: "drawer",
        height: "350px",
        width: "250px"
      }
    ],
    commands: [
      {
        name: "primary",
        rounded: true,
        size: "sm",
        width: "1.8em",
        height: "1.8em",
        className: "ml-0"
      },
      {
        name: "submit",
        rounded: true,
        size: "lg",
        width: "5em",
        height: "5em",
        className: "ml-0"
      }
    ],
    suffixes: [
      {
        name: "labelId",
        value: "-label"
      },
      {
        name: "describedById",
        value: "-describedby"
      }
    ]
  },
  behavior: {
    form: {
      name: "default-form-behavior",
      enforceConfigurationCheck: true,
      validationTriggers: ["onBlur", "onSubmit"],
      enableIntrospection: true,
      debugStreamSize: 100
    },
    validations: {
      patterns: [
        {
          name: "email-pattern",
          cultureName: "en-US",
          regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        {
          name: "phone-pattern-us",
          cultureName: "en-US",
          regex: /^\+?1?[-\s.]?\(?\d{3}\)?[-\s.]?\d{3}[-\s.]?\d{4}$/
        },
        {
          name: "postal-code-us",
          cultureName: "en-US",
          regex: /^\d{5}(-\d{4})?$/
        },
        {
          name: "postal-code-fr",
          cultureName: "fr-FR",
          regex: /^\d{5}$/
        }
      ]
    },
    customValidations: [],
    events: [
      {
        name: "onValidate",
        triggerDelay: 500
      },
      {
        name: "onChange",
        triggerDelay: 500
      },
      {
        name: "onClick",
        triggerDelay: 500
      },
      {
        name: "onSelect",
        triggerDelay: 500
      },
      {
        name: "onFocus",
        triggerDelay: 500
      },
      {
        name: "onBlur",
        triggerDelay: 500
      },
      {
        name: "onKeyDown",
        triggerDelay: 500
      },
      {
        name: "onKeyUp",
        triggerDelay: 500
      },
      {
        name: "onUiUpdate",
        triggerDelay: 500
      },
      {
        name: "onObserve",
        triggerDelay: 500
      }
    ]
  }
};
function Go() {
  return { ...T };
}
var ko = async function(e) {
  var t, n;
  try {
    let i;
    if (typeof globalThis < "u" && ((n = (t = globalThis.process) == null ? void 0 : t.versions) == null ? void 0 : n.node)) {
      const { readFile: o } = await import("./__vite-browser-external-DYxpcVy9-ZOYXHRPY.js");
      i = await o(e, "utf-8");
    } else {
      const o = await fetch(e);
      if (!o.ok)
        throw new Error(`HTTP error! status: ${o.status}`);
      i = await o.text();
    }
    const r = JSON.parse(i);
    if (!r.name || !r.targetEnvironment)
      throw new Error(
        "Invalid configuration: missing required properties (name, targetEnvironment)"
      );
    this.setConfiguration(r.name, r);
  } catch (i) {
    throw console.error(`Failed to load JSON configuration from ${e}:`, i), i;
  }
};
function Po(e) {
  var n, i, s, r, o, u, c, d, g, v, b;
  return {
    ...T,
    ...e,
    cultures: {
      ...T.cultures,
      ...e.cultures,
      supportedCultures: ((n = e.cultures) == null ? void 0 : n.supportedCultures) || T.cultures.supportedCultures,
      lokalizeTokensReplacement: ((i = e.cultures) == null ? void 0 : i.lokalizeTokensReplacement) || T.cultures.lokalizeTokensReplacement
    },
    rendering: {
      ...T.rendering,
      ...e.rendering,
      components: ((s = e.rendering) == null ? void 0 : s.components) || T.rendering.components,
      commands: ((r = e.rendering) == null ? void 0 : r.commands) || T.rendering.commands,
      suffixes: ((o = e.rendering) == null ? void 0 : o.suffixes) || T.rendering.suffixes
    },
    behavior: {
      ...T.behavior,
      ...e.behavior,
      form: {
        ...T.behavior.form,
        ...(u = e.behavior) == null ? void 0 : u.form
      },
      validations: {
        ...T.behavior.validations,
        ...(c = e.behavior) == null ? void 0 : c.validations,
        patterns: ((g = (d = e.behavior) == null ? void 0 : d.validations) == null ? void 0 : g.patterns) || T.behavior.validations.patterns
      },
      customValidations: ((v = e.behavior) == null ? void 0 : v.customValidations) || T.behavior.customValidations,
      events: ((b = e.behavior) == null ? void 0 : b.events) || T.behavior.events
    }
  };
}
var Vo = function() {
  if (this.configurations.length === 0) {
    console.log("No configurations available");
    return;
  }
  const e = this.configurations.map((t) => ({
    name: t.name,
    "target environment": t.targetEnvironment,
    "is Active": t === this.activeConfiguration ? "✓" : "",
    "JSON configuration": JSON.stringify(t, null, 2).substring(0, 100) + "..."
  }));
  console.table(e);
};
var _o = function(e, t) {
  t.name = e;
  const n = this.configurations.findIndex((i) => i.name === e);
  n >= 0 ? this.configurations[n] = t : this.configurations.push(t);
};
var Fo = function(e) {
  const t = this.configurations.find((n) => n.name === e);
  if (t)
    return this.activeConfiguration = t, t;
};
function Bo(e) {
  const t = [];
  return e ? (e.name && typeof e.name != "string" && t.push("Configuration name must be a string"), e.targetEnvironment && typeof e.targetEnvironment != "string" && t.push("Target environment must be a string"), e.cultures && (e.cultures.supportedCultures && !Array.isArray(e.cultures.supportedCultures) && t.push("Supported cultures must be an array"), e.cultures.lokalizeTokensReplacement && !Array.isArray(e.cultures.lokalizeTokensReplacement) && t.push("Lokalize tokens replacement must be an array")), e.rendering && (e.rendering.components && !Array.isArray(e.rendering.components) && t.push("Rendering components must be an array"), e.rendering.commands && !Array.isArray(e.rendering.commands) && t.push("Rendering commands must be an array"), e.rendering.suffixes && !Array.isArray(e.rendering.suffixes) && t.push("Rendering suffixes must be an array")), e.behavior && (e.behavior.customValidations && !Array.isArray(e.behavior.customValidations) && t.push("Custom validations must be an array"), e.behavior.events && !Array.isArray(e.behavior.events) && t.push("Events must be an array")), t.length > 0 && console.warn("Configuration validation warnings:", t), this.mergeConfigurationWithDefaults(e)) : (console.warn("Configuration is required, using default configuration"), T);
}
var P = function(e) {
  this.sm = e, this.configurations = [], this.activeConfiguration = {};
};
Object.assign(P.prototype, {
  getConfigByName: xo,
  setConfiguration: _o,
  useConfiguration: Fo,
  loadJson: ko,
  printConfiguration: Vo,
  validateConfiguration: Bo,
  mergeConfigurationWithDefaults: Po,
  getDefaultConfiguration: Go
});
var jo = "default-formular-configuration";
var Uo = "development";
var zo = { defaultCulture: { name: "fr-CH", dateFormat: "dd/MM/yyyy", timeFormat: "HH:mm:ss", currencySymbol: "CHF", separator: "." }, supportedCultures: [{ name: "en-US", dateFormat: "MM/dd/yyyy", timeFormat: "hh:mm:ss tt", currencySymbol: "$", separator: "/" }, { name: "fr-FR", dateFormat: "dd/MM/yyyy", timeFormat: "HH:mm:ss", currencySymbol: "€", separator: "/" }, { name: "de-DE", dateFormat: "dd/MM/yyyy", timeFormat: "HH:mm:ss", currencySymbol: "€", separator: "/" }], lokalizeTokensReplacement: [{ name: "validationDataToken1", token: "|data|" }, { name: "validationDataToken2", token: "|data2|" }] };
var qo = { components: [{ name: "drawer", height: "350px", width: "250px" }], commands: [{ name: "primary", rounded: true, size: "sm", width: "1.8em", height: "1.8em", className: "ml-0" }, { name: "submit", rounded: true, size: "lg", width: "5em", height: "5em", className: "ml-0" }], suffixes: [{ name: "labelId", value: "-label" }, { name: "describedById", value: "-describedby" }] };
var Ho = { form: { name: "default-form-behavior", enforceConfigurationCheck: true, validationTriggers: ["onBlur", "onSubmit"] }, validations: { patterns: [{ name: "email-pattern", cultureName: "en-US", regex: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$" }, { name: "phone-pattern-us", cultureName: "en-US", regex: "^\\+?1?[-\\s.]?\\(?[0-9]{3}\\)?[-\\s.]?[0-9]{3}[-\\s.]?[0-9]{4}$" }, { name: "postal-code-us", cultureName: "en-US", regex: "^[0-9]{5}(-[0-9]{4})?$" }, { name: "postal-code-fr", cultureName: "fr-FR", regex: "^[0-9]{5}$" }] }, customValidations: [], events: [{ name: "onValidate", triggerDelay: 500 }, { name: "onChange", triggerDelay: 500 }, { name: "onClick", triggerDelay: 500 }, { name: "onSelect", triggerDelay: 500 }, { name: "onFocus", triggerDelay: 500 }, { name: "onBlur", triggerDelay: 500 }, { name: "onFocus", triggerDelay: 500 }, { name: "onKeyDown", triggerDelay: 500 }, { name: "onKeyUp", triggerDelay: 500 }, { name: "onUiUpdate", triggerDelay: 500 }, { name: "observables", triggerDelay: 500 }] };
var jn = {
  name: jo,
  targetEnvironment: Uo,
  cultures: zo,
  rendering: qo,
  behavior: Ho
};
var _g = jn;
var Fg = JSON.stringify(jn, null, 2);
var W = {};
function Un() {
  console.log("=== Basic Usage Example ===");
  const e = new P(W), t = e.getDefaultConfiguration();
  return console.log("Default configuration name:", t.name), e.setConfiguration("default", t), e.useConfiguration("default"), e.printConfiguration(), e;
}
function zn() {
  console.log("=== Custom Configuration Example ===");
  const e = new P(W), t = {
    name: "production-config",
    targetEnvironment: "production",
    cultures: {
      defaultCulture: {
        name: "en-US",
        dateFormat: "MM/dd/yyyy",
        timeFormat: "hh:mm:ss tt",
        currencySymbol: "$",
        separator: "/"
      },
      supportedCultures: [],
      lokalizeTokensReplacement: []
    },
    behavior: {
      form: {
        name: "production-form-behavior",
        enforceConfigurationCheck: true,
        validationTriggers: ["onBlur", "onSubmit", "onChange"]
      },
      validations: {
        patterns: []
      },
      customValidations: [],
      events: []
    }
  }, n = e.validateConfiguration(t);
  e.setConfiguration("production", n);
  const i = e.useConfiguration("production");
  return console.log("Active configuration:", i == null ? void 0 : i.name), e;
}
async function Wo() {
  console.log("=== Load JSON Configuration Example ===");
  const e = new P(W);
  try {
    await e.loadJson("./default/default-configuration.json"), e.useConfiguration("default-formular-configuration"), console.log("Configuration loaded successfully from JSON"), e.printConfiguration();
  } catch (t) {
    console.error("Failed to load configuration:", t);
  }
  return e;
}
function qn() {
  console.log("=== Get Configuration Values Example ===");
  const e = new P(W), t = e.getDefaultConfiguration();
  e.setConfiguration("default", t), e.useConfiguration("default");
  const n = e.getConfigByName(
    "behavior",
    "validations",
    "patterns",
    "email-pattern"
  );
  console.log("Email pattern:", n);
  const i = e.getConfigByName("rendering", "components", "drawer");
  console.log("Drawer component config:", i);
  const s = e.getConfigByName("rendering", "commands", "primary");
  console.log("Primary command config:", s);
  const r = e.getConfigByName("behavior", "form");
  return console.log("Form behavior:", r), e;
}
function Hn() {
  console.log("=== Multi-Environment Configuration Example ===");
  const e = new P(W), t = {
    name: "development-config",
    targetEnvironment: "development",
    behavior: {
      form: {
        name: "dev-form-behavior",
        enforceConfigurationCheck: true,
        validationTriggers: ["onChange", "onBlur"]
        // More relaxed validation
      },
      validations: { patterns: [] },
      customValidations: [],
      events: []
    }
  }, n = {
    name: "staging-config",
    targetEnvironment: "staging",
    behavior: {
      form: {
        name: "staging-form-behavior",
        enforceConfigurationCheck: true,
        validationTriggers: ["onBlur", "onSubmit"]
      },
      validations: { patterns: [] },
      customValidations: [],
      events: []
    }
  }, i = {
    name: "production-config",
    targetEnvironment: "production",
    behavior: {
      form: {
        name: "prod-form-behavior",
        enforceConfigurationCheck: true,
        validationTriggers: ["onSubmit"]
        // Strict validation only on submit
      },
      validations: { patterns: [] },
      customValidations: [],
      events: []
    }
  }, s = e.validateConfiguration(t), r = e.validateConfiguration(n), o = e.validateConfiguration(i);
  return e.setConfiguration("development", s), e.setConfiguration("staging", r), e.setConfiguration("production", o), console.log("Setting up development environment..."), e.useConfiguration("development"), console.log("Active config:", e.activeConfiguration.name), console.log("Switching to production environment..."), e.useConfiguration("production"), console.log("Active config:", e.activeConfiguration.name), e.printConfiguration(), e;
}
function Wn() {
  console.log("=== Localization Configuration Example ===");
  const e = new P(W), t = {
    name: "multi-culture-config",
    targetEnvironment: "production",
    cultures: {
      defaultCulture: {
        name: "en-US",
        dateFormat: "MM/dd/yyyy",
        timeFormat: "hh:mm:ss tt",
        currencySymbol: "$",
        separator: "/"
      },
      supportedCultures: [
        {
          name: "fr-FR",
          dateFormat: "dd/MM/yyyy",
          timeFormat: "HH:mm:ss",
          currencySymbol: "€",
          separator: "/"
        },
        {
          name: "de-DE",
          dateFormat: "dd/MM/yyyy",
          timeFormat: "HH:mm:ss",
          currencySymbol: "€",
          separator: "."
        }
      ],
      lokalizeTokensReplacement: [
        {
          name: "errorMessage",
          token: "{{error}}"
        },
        {
          name: "fieldName",
          token: "{{field}}"
        }
      ]
    }
  }, n = e.validateConfiguration(t);
  e.setConfiguration("multi-culture", n), e.useConfiguration("multi-culture");
  const i = e.getConfigByName("cultures", "defaultCulture");
  console.log("Default culture:", i);
  const s = e.getConfigByName(
    "cultures",
    "lokalizeTokensReplacement"
  );
  return console.log("Token replacements:", s), e;
}
function Yn() {
  console.log("=== Validation Patterns Configuration Example ===");
  const e = new P(W), t = {
    name: "validation-config",
    targetEnvironment: "development",
    behavior: {
      form: {
        name: "validation-form-behavior",
        enforceConfigurationCheck: true,
        validationTriggers: ["onChange", "onBlur", "onSubmit"]
      },
      validations: {
        patterns: [
          {
            name: "strong-password",
            cultureName: "en-US",
            regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          },
          {
            name: "credit-card",
            cultureName: "en-US",
            regex: /^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$/
          }
        ]
      },
      customValidations: [],
      events: [
        {
          name: "onValidate",
          triggerDelay: 300
        }
      ]
    }
  }, n = e.validateConfiguration(t);
  e.setConfiguration("validation", n), e.useConfiguration("validation");
  const i = e.getConfigByName(
    "behavior",
    "validations",
    "patterns",
    "strong-password"
  );
  console.log("Strong password pattern:", i);
  const s = e.getConfigByName(
    "behavior",
    "validations",
    "patterns",
    "credit-card"
  );
  return console.log("Credit card pattern:", s), e;
}
function Zn() {
  console.log("=== Runtime Configuration Updates Example ===");
  const e = new P(W), t = e.getDefaultConfiguration();
  e.setConfiguration("runtime", t), e.useConfiguration("runtime"), console.log("Initial configuration:", e.activeConfiguration.name);
  const n = {
    ...e.activeConfiguration,
    targetEnvironment: "production",
    behavior: {
      ...e.activeConfiguration.behavior,
      form: {
        ...e.activeConfiguration.behavior.form,
        validationTriggers: ["onSubmit"]
        // Changed from default
      }
    }
  };
  return e.setConfiguration("runtime", n), e.useConfiguration("runtime"), console.log(
    "Updated configuration environment:",
    e.activeConfiguration.targetEnvironment
  ), console.log(
    "Updated validation triggers:",
    e.activeConfiguration.behavior.form.validationTriggers
  ), e;
}
function Jn() {
  console.log("=== Error Handling Example ===");
  const e = new P(W), t = {
    name: 123,
    // Invalid type
    targetEnvironment: null,
    // Invalid value
    cultures: "not-an-object"
    // Invalid type
  };
  try {
    const i = e.validateConfiguration(t);
    console.log("Validation completed, using defaults where necessary"), console.log("Final config name:", i.name);
  } catch (i) {
    console.error("Validation error:", i);
  }
  const n = e.validateConfiguration(null);
  return console.log("Null config handled, using default:", n.name), e;
}
function Yo() {
  console.log(`🚀 Running Configuration Manager Examples
`);
  try {
    Un(), console.log(`
` + "=".repeat(50) + `
`), zn(), console.log(`
` + "=".repeat(50) + `
`), qn(), console.log(`
` + "=".repeat(50) + `
`), Hn(), console.log(`
` + "=".repeat(50) + `
`), Wn(), console.log(`
` + "=".repeat(50) + `
`), Yn(), console.log(`
` + "=".repeat(50) + `
`), Zn(), console.log(`
` + "=".repeat(50) + `
`), Jn(), console.log(`
` + "=".repeat(50) + `
`), console.log("✅ All examples completed successfully!");
  } catch (e) {
    console.error("❌ Error running examples:", e);
  }
}
var Bg = {
  basic: Un,
  custom: zn,
  loadJson: Wo,
  getValues: qn,
  multiEnvironment: Hn,
  localization: Wn,
  validationPatterns: Yn,
  runtime: Zn,
  errorHandling: Jn,
  runAll: Yo
};
var Zo = "http://json-schema.org/draft-07/schema#";
var Jo = "https://formular.dev/schemas/command.json";
var Ko = "Command Configuration";
var Qo = "Command rendering configuration";
var Xo = "object";
var eu = { name: { type: "string", description: "The command name identifier" }, rounded: { type: "boolean", description: "Whether the command should have rounded corners" }, size: { type: "string", description: "Size of the command (e.g., 'small', 'medium', 'large')" }, width: { type: "string", description: "Width of the command element" }, height: { type: "string", description: "Height of the command element" }, className: { type: "string", description: "CSS class name to apply to the command" } };
var tu = ["name", "rounded", "size", "width", "height", "className"];
var nu = false;
var jg = {
  $schema: Zo,
  $id: Jo,
  title: Ko,
  description: Qo,
  type: Xo,
  properties: eu,
  required: tu,
  additionalProperties: nu
};
var iu = "http://json-schema.org/draft-07/schema#";
var su = "https://formular.dev/schemas/configuration.json";
var ru = "Formular Configuration";
var au = "Complete configuration schema for Formular form library";
var ou = "object";
var uu = { name: { type: "string", description: "Configuration name identifier" }, targetEnvironment: { type: "string", description: "Target environment (e.g., 'development', 'production')", enum: ["development", "staging", "production"] }, cultures: { type: "object", description: "Culture and localization settings", properties: { defaultCulture: { $ref: "culture.schema.json", description: "Default culture configuration" }, supportedCultures: { type: "array", description: "Array of supported cultures", items: { $ref: "culture.schema.json" } }, lokalizeTokensReplacement: { type: "array", description: "Token replacement configurations for localization", items: { $ref: "replacement-token.schema.json" } } }, required: ["defaultCulture", "supportedCultures", "lokalizeTokensReplacement"], additionalProperties: false }, rendering: { type: "object", description: "Rendering configuration settings", properties: { components: { type: "array", description: "Component rendering configurations", items: { $ref: "rendering.schema.json" } }, commands: { type: "array", description: "Command configurations", items: { $ref: "command.schema.json" } }, suffixes: { type: "array", description: "Suffix configurations", items: { $ref: "suffix.schema.json" } } }, required: ["components", "commands", "suffixes"], additionalProperties: false }, behavior: { type: "object", description: "Form behavior and validation settings", properties: { form: { $ref: "form-behavior.schema.json", description: "Form behavior configuration" }, validations: { type: "object", description: "Validation configuration settings", properties: { patterns: { type: "array", description: "Validation pattern configurations", items: { $ref: "validation-pattern.schema.json" } } }, required: ["triggers", "patterns"], additionalProperties: false }, customValidations: { type: "array", description: "Custom validation strategy configurations", items: { $ref: "validation-method-strategy.schema.json" } }, events: { type: "array", description: "Event trigger configurations", items: { $ref: "event-trigger.schema.json" } } }, required: ["form", "validations", "customValidations", "events"], additionalProperties: false } };
var cu = ["name", "targetEnvironment", "cultures", "rendering", "behavior"];
var lu = false;
var Ug = {
  $schema: iu,
  $id: su,
  title: ru,
  description: au,
  type: ou,
  properties: uu,
  required: cu,
  additionalProperties: lu
};
var du = "http://json-schema.org/draft-07/schema#";
var hu = "https://formular.dev/schemas/culture.json";
var gu = "Culture Configuration";
var pu = "Culture settings for localization and formatting";
var mu = "object";
var fu = { name: { type: "string", description: "The culture name (e.g., 'en-US', 'fr-FR')" }, dateFormat: { type: "string", description: "Date format pattern (e.g., 'MM/dd/yyyy', 'dd/MM/yyyy')" }, timeFormat: { type: "string", description: "Time format pattern (e.g., 'HH:mm:ss', 'hh:mm:ss tt')" }, currencySymbol: { type: "string", description: "Currency symbol for this culture" }, separator: { type: "string", description: "Decimal separator character" } };
var yu = ["name", "dateFormat", "timeFormat", "currencySymbol", "separator"];
var vu = false;
var zg = {
  $schema: du,
  $id: hu,
  title: gu,
  description: pu,
  type: mu,
  properties: fu,
  required: yu,
  additionalProperties: vu
};
var bu = "http://json-schema.org/draft-07/schema#";
var Mu = "https://formular.dev/schemas/event-trigger.json";
var Eu = "Event Trigger Configuration";
var Su = "Event trigger settings for form behavior";
var Cu = "object";
var Iu = { name: { type: "string", description: "The event trigger name identifier" }, triggerDelay: { type: "number", description: "Delay in milliseconds before the trigger is activated", minimum: 0 } };
var Nu = ["name", "triggerDelay"];
var wu = false;
var qg = {
  $schema: bu,
  $id: Mu,
  title: Eu,
  description: Su,
  type: Cu,
  properties: Iu,
  required: Nu,
  additionalProperties: wu
};
var Ou = "http://json-schema.org/draft-07/schema#";
var Au = "https://formular.dev/schemas/form-behavior.json";
var Du = "Form Behavior Configuration";
var $u = "Form behavior settings and validation triggers";
var Tu = "object";
var Ru = { name: { type: "string", description: "The form behavior name identifier" }, enforceConfigurationCheck: { type: "boolean", description: "Whether to enforce configuration validation checks", const: true }, validationTriggers: { type: "array", description: "Array of event types that trigger validation", items: { type: "string", enum: ["intitial", "onBlur", "onChange", "onSubmit", "onFocus", "onLoad", "onClick", "onClear", "onResetValidation", "onGet", "onValidate", "onSelect", "onKeyPress", "onKeyDown", "onKeyUp", "onFormat", "onOpen", "onClose", "onUiUpdate", "onAutoTrackNotified", "validateOnFormFirstSubmit", "onEngineStateChanger", "onDispose", "onValueChange", "onValidationChange", "onBusyStateChange", "onObserve"] } }, enableIntrospection: { type: "boolean", description: "Enable introspection helpers (observe API, debugStream). Only for development/debug builds.", default: false }, debugStreamSize: { type: "number", description: "Ring buffer size for debug event stream", default: 100, minimum: 1, maximum: 1e3 } };
var Lu = ["name", "enforceConfigurationCheck", "validationTriggers"];
var xu = false;
var Hg = {
  $schema: Ou,
  $id: Au,
  title: Du,
  description: $u,
  type: Tu,
  properties: Ru,
  required: Lu,
  additionalProperties: xu
};
var Gu = "http://json-schema.org/draft-07/schema#";
var ku = "https://formular.dev/schemas/rendering.json";
var Pu = "Rendering Configuration";
var Vu = "Rendering settings for components";
var _u = "object";
var Fu = { name: { type: "string", description: "The rendering configuration name identifier" }, height: { type: "string", description: "Height of the rendered component" }, width: { type: "string", description: "Width of the rendered component" } };
var Bu = ["name", "height", "width"];
var ju = false;
var Wg = {
  $schema: Gu,
  $id: ku,
  title: Pu,
  description: Vu,
  type: _u,
  properties: Fu,
  required: Bu,
  additionalProperties: ju
};
var Uu = "http://json-schema.org/draft-07/schema#";
var zu = "https://formular.dev/schemas/replacement-token.json";
var qu = "Replacement Token Configuration";
var Hu = "Token replacement settings for localization";
var Wu = "object";
var Yu = { name: { type: "string", description: "The replacement token name identifier" }, token: { type: "string", description: "The token value to replace" } };
var Zu = ["name", "token"];
var Ju = false;
var Yg = {
  $schema: Uu,
  $id: zu,
  title: qu,
  description: Hu,
  type: Wu,
  properties: Yu,
  required: Zu,
  additionalProperties: Ju
};
var Ku = "http://json-schema.org/draft-07/schema#";
var Qu = "https://formular.dev/schemas/suffix.json";
var Xu = "Suffix Configuration";
var ec = "Suffix settings for form elements";
var tc = "object";
var nc = { name: { type: "string", description: "The suffix name identifier" }, value: { type: "string", description: "The suffix value to append" } };
var ic = ["name", "value"];
var sc = false;
var Zg = {
  $schema: Ku,
  $id: Qu,
  title: Xu,
  description: ec,
  type: tc,
  properties: nc,
  required: ic,
  additionalProperties: sc
};
var rc = "http://json-schema.org/draft-07/schema#";
var ac = "https://formular.dev/schemas/validation-method-strategy.json";
var oc = "Validation Method Strategy Configuration";
var uc = "Custom validation strategy configuration";
var cc = "object";
var lc = { name: { type: "string", description: "Unique name identifier for this validation strategy" }, validate: { type: "object", description: "Function name or reference for synchronous validation" }, validateAsync: { type: "object", description: "Function name or reference for asynchronous validation" } };
var dc = ["name", "validate", "validateAsync"];
var hc = false;
var Jg = {
  $schema: rc,
  $id: ac,
  title: oc,
  description: uc,
  type: cc,
  properties: lc,
  required: dc,
  additionalProperties: hc
};
var gc = "http://json-schema.org/draft-07/schema#";
var pc = "https://formular.dev/schemas/validation-pattern.json";
var mc = "Validation Pattern Configuration";
var fc = "Validation pattern settings for form validation";
var yc = "object";
var vc = { name: { type: "string", description: "The validation pattern name identifier" }, cultureName: { type: "string", description: "The culture this pattern applies to" }, regex: { type: "string", description: "Regular expression pattern for validation (as string)", format: "regex" } };
var bc = ["name", "cultureName", "regex"];
var Mc = false;
var Kg = {
  $schema: gc,
  $id: pc,
  title: mc,
  description: fc,
  type: yc,
  properties: vc,
  required: bc,
  additionalProperties: Mc
};
function Ec(e, t) {
  var i;
  const n = this.dmGet(e);
  if (!n) {
    (i = this.tracker) == null || i.internalWarning(
      "DomManager.dmAddArias",
      `The element does not exist in references: ${e}`
    );
    return;
  }
  for (const s of t)
    n.setAttribute(`aria-${s.name}`, s.value);
}
function Sc(e, t) {
  var i;
  const n = this.dmGet(e);
  if (!n) {
    (i = this.tracker) == null || i.internalWarning(
      "DomManager.dmAriaSet",
      `The element does not exist in references: ${e}`
    );
    return;
  }
  n.setAttribute("aria-labelledby", `${e}${this.labelId}`), n.setAttribute("name", t);
}
function Cc() {
  for (const e of this.elements)
    e.ariaChecked = "false", e.value = "", e.checked = false;
}
function Ic(e) {
  return !!this.elements.find((t) => t.id === e);
}
function Nc(e) {
  return this.elements.find((t) => t.id === e) ?? null;
}
function wc(e) {
  var t;
  if (e) {
    if (this.dmExists(e.id)) {
      (t = this.tracker) == null || t.internalWarning(
        "DomManager.register",
        `The element you try to add already exists: ${e.id}`
      );
      return;
    }
    e.className && e.setAttribute("data-class", e.className), this.elements.push(e);
  }
}
function Oc(e) {
  var n;
  if (!e || this.dmExists(e))
    return;
  const t = document.getElementById(e);
  if (!t) {
    (n = this.tracker) == null || n.internalError(
      "DomManager.registerById",
      `The element you try to reference doesn't exist in the DOM: ${e}`
    );
    return;
  }
  this.elements.push(t);
}
function Ac(e, t) {
  var i;
  const n = this.dmGet(e);
  if (!n) {
    (i = this.tracker) == null || i.internalError(
      "DomManager.dmSetChecked",
      `The element does not exist in references: ${e}`
    );
    return;
  }
  n.checked = t;
}
function Dc(e, t) {
  var i;
  const n = this.dmGet(e);
  if (!n) {
    (i = this.tracker) == null || i.internalError(
      "DomManager.dmSetClass",
      `The element does not exist in references: ${e}`
    );
    return;
  }
  n.className = t;
}
function $c(e, t) {
  var i;
  const n = this.dmGet(e);
  n && (t || (i = n == null ? void 0 : n.blur) == null || i.call(n), n.ariaDisabled = t ? "false" : "true", n.disabled = !t);
}
function Tc(e) {
  var n, i;
  const t = this.dmGet(e);
  t ? t.focus() : (i = (n = this.elements) == null ? void 0 : n[0]) == null || i.focus();
}
function Rc(e, t) {
  var i;
  const n = this.dmGet(e);
  if (!n) {
    (i = this.tracker) == null || i.internalError(
      "DomManager.dmSetSelected",
      `The element does not exist in references: ${e}`
    );
    return;
  }
  n.value = t ?? "";
}
function Lc(e, t) {
  var i;
  const n = this.dmGet(e);
  if (!n) {
    (i = this.tracker) == null || i.internalError(
      "DomManager.dmSetValue",
      `The element does not exist in references: ${e}`
    );
    return;
  }
  n.value !== t && (n.value = t);
}
function xc(e, t) {
  var r;
  const n = this.dmGet(e);
  if (!n) {
    (r = this.tracker) == null || r.internalWarning(
      "DomManager.dmUpdateAria",
      `The element does not exist in references: ${e}`
    );
    return;
  }
  const i = `aria-${t.name}`, s = t.value;
  n.setAttribute(i, s);
}
var Gc = function(e, t) {
  this.extensions = this.extensions ?? /* @__PURE__ */ new Map(), this.extensions.set(e, t), Object.assign(this, t);
};
var kc = function(e) {
  var t;
  return ((t = this.extensions) == null ? void 0 : t.has(e)) ?? false;
};
var Pc = function() {
  this.isInitialized = true;
};
var ve = function(e) {
  var s, r;
  this.serviceManager = e || null, this.elements = [], this.tracker = null, this.isInitialized = false;
  const t = (r = (s = this.serviceManager) == null ? void 0 : s.lazy(ye)) == null ? void 0 : r(), n = (t == null ? void 0 : t.getConfigByName("rendering", "suffixes", "labelId")) ?? null, i = (t == null ? void 0 : t.getConfigByName("rendering", "suffixes", "describedById")) ?? null;
  Object.defineProperty(this, "describedById", {
    value: (i == null ? void 0 : i.value) ?? "-described-by",
    writable: false,
    // Prevent modification
    configurable: false,
    // Prevent deletion or redefinition,
    enumerable: true
    // Make it enumerable for iteration
  }), Object.defineProperty(this, "labelId", {
    value: (n == null ? void 0 : n.value) ?? "-label",
    writable: false,
    // Prevent modification
    configurable: false,
    // Prevent deletion or redefinition,
    enumerable: true
  }), Object.defineProperty(this, "dependencyName", {
    value: ve.name,
    writable: false,
    // Prevent modification
    configurable: false,
    // Prevent deletion or redefinition,
    enumerable: true
  });
};
Object.assign(ve.prototype, {
  initialize: Pc,
  dmGet: Nc,
  dmExists: Ic,
  dmRegister: wc,
  dmRegisterById: Oc,
  dmSetFocus: Tc,
  dmSetEnabled: $c,
  dmSetValue: Lc,
  dmClear: Cc,
  dmSetChecked: Ac,
  dmSetClass: Dc,
  dmSetSelected: Rc,
  dmAddArias: Ec,
  dmAriaSet: Sc,
  dmUpdateAria: xc,
  extend: Gc,
  hasExtension: kc
});
var be = /* @__PURE__ */ new Map();
var Kn = function(e) {
  if (be.has(e)) {
    const t = be.get(e);
    t != null && t.timeoutId && clearTimeout(t.timeoutId);
  }
};
var Qn = function(e) {
  be.delete(e);
};
var Xn = function(e, t, n) {
  be.set(e, { data: n, timeoutId: t });
};
var Ut = "onObserve";
function Vc(e, t = 0) {
  const n = typeof e == "string", i = n ? e : void 0, s = n ? t : e || 0, r = n && i ? `${Ut}:${i}` : Ut;
  Kn(r);
  const o = setTimeout(() => {
    if (n && i) {
      const u = this.channels.get(i);
      u && (u.strong.forEach((c) => {
        c && (c == null || c.call(this));
      }), u.weak.forEach((c) => {
        const d = c.deref();
        d && (d == null || d.call(this));
      }));
    } else
      this.observersStrong.forEach((u) => {
        u && (u == null || u.call(this));
      }), this.observersWeak.forEach((u) => {
        const c = u.deref();
        c && (c == null || c.call(this));
      });
    Qn(r);
  }, s);
  Xn(r, o);
}
function _c(e, t, n = false) {
  const i = typeof e == "string", s = i ? e : void 0, r = i ? t : e, o = i ? n : t || false;
  if (i && s) {
    this.channels.has(s) || this.channels.set(s, { weak: [], strong: [] });
    const u = this.channels.get(s);
    if (o) {
      if (u.weak.find((d) => d.deref() === r)) return;
      const c = new WeakRef(r);
      u.weak.push(c), this.cleanupRegistry.register(r, c);
    } else {
      if (u.strong.find((c) => c === r)) return;
      u.strong.push(r);
    }
  } else if (o) {
    if (this.observersWeak.find(
      (c) => r.name.toString() === r.name
    ))
      return;
    const u = new WeakRef(r);
    this.observersWeak.push(u), this.cleanupRegistry.register(r, u);
  } else {
    if (this.observersStrong.find(
      (u) => r.name.toString() === r.name
    ))
      return;
    this.observersStrong.push(r);
  }
}
function Fc(e) {
  if (e) {
    const t = this.channels.get(e);
    if (!t) return;
    t.strong.forEach((n) => {
      n && (n == null || n.call(this));
    }), t.weak.forEach((n) => {
      const i = n.deref();
      i && (i == null || i.call(this));
    });
  } else
    this.observersStrong.forEach((t) => {
      t && (t == null || t.call(this));
    }), this.observersWeak.forEach((t) => {
      const n = t.deref();
      n && (n == null || n.call(this));
    });
}
function Bc(e, t, n) {
  const i = typeof e == "string", s = i ? e : void 0, r = i ? t : e, o = i ? n || false : t;
  if (i && s) {
    const u = this.channels.get(s);
    if (!u) return;
    o ? (u.weak = u.weak.filter((c) => c.deref() !== r), this.cleanupRegistry.unregister(r)) : u.strong = u.strong.filter((c) => c !== r), u.weak.length === 0 && u.strong.length === 0 && this.channels.delete(s);
  } else
    o ? (this.observersWeak = [
      ...this.observersWeak.filter((u) => u.deref() !== r)
    ], this.cleanupRegistry.unregister(r)) : this.observersStrong = [
      ...this.observersStrong.filter((u) => u !== r)
    ];
}
function jc() {
  for (const e of this.observersStrong)
    ;
  for (const e of this.observersWeak)
    this.cleanupRegistry.unregister(e);
  this.observersWeak = [], this.observersStrong = [];
}
var Nt = function() {
  this.observersWeak = [], this.observersStrong = [], this.channels = /* @__PURE__ */ new Map(), this.cleanupRegistry = new FinalizationRegistry((e) => {
    var t, n;
    this.observersWeak = (n = (t = this.observersWeak) == null ? void 0 : t.filter) == null ? void 0 : n.call(t, (i) => i !== e);
  });
};
Object.assign(Nt.prototype, {
  subscribe: _c,
  unSubscribe: Bc,
  unSubscribeAll: jc,
  trigger: Fc,
  debounceTrigger: Vc
});
var ei = (e) => {
  var t, n, i;
  return `${((t = e == null ? void 0 : e.event) == null ? void 0 : t.target) ?? ((n = e == null ? void 0 : e.event) == null ? void 0 : n.emitterName)}.${(i = e == null ? void 0 : e.event) == null ? void 0 : i.action}`;
};
function Uc(e) {
  const t = ei(e), n = this.notifiers.get(t);
  if (n)
    for (const i of e.event.types)
      n.event.types.includes(i) || n.event.types.push(i);
  else
    this.notifiers.set(t, e);
}
function zc(e) {
  const t = e.map((n) => ({
    type: n.type,
    data: n.data,
    priority: Z.NORMAL
  }));
  this.batchConfig.enablePriority ? t.forEach((n) => {
    const i = this.priorityQueues.get(n.priority) ?? [];
    i.push(n), this.priorityQueues.set(n.priority, i);
  }) : this.batchQueue.push(...t), this.scheduleBatch();
}
var qc = function(e) {
  var t;
  return (t = be.get(e)) == null ? void 0 : t.data;
};
var Hc = function(e, t, n, i) {
  const s = i ? `${e}:${i}` : e;
  Kn(s);
  const r = setTimeout(() => {
    this.notifiers.forEach((o) => {
      var u;
      if (o != null && o.event.types.includes(e)) {
        const c = qc(s);
        o.method(c), this.autoTracker && ((u = this.autoTracker) == null || u.notify("onAutoTrackNotified", {
          ...c,
          target: o.event.action
        }));
      }
    }), Qn(s);
  }, t);
  Xn(s, r, n);
};
function Wc(e) {
  const t = ei(e);
  this.notifiers.delete(t);
}
function Yc() {
  this.batchTimeout !== null && (clearTimeout(this.batchTimeout), this.batchTimeout = null), this.batchQueue = [], this.priorityQueues.clear(), this.isBatchScheduled = false, this.observers.unSubscribeAll(false), this.notifiers.clear(), this.isInitialized = false;
}
var Zc = function(e, t) {
  this.extensions = this.extensions ?? /* @__PURE__ */ new Map(), this.extensions.set(e, t), Object.assign(this, t);
};
function ti() {
  this.batchTimeout !== null && (clearTimeout(this.batchTimeout), this.batchTimeout = null), this.isBatchScheduled = false, this.batchConfig.enablePriority ? this.processPriorityBatches() : this.processSimpleBatch();
}
function ni() {
  const e = [
    Z.CRITICAL,
    Z.HIGH,
    Z.NORMAL,
    Z.LOW
  ];
  for (const t of e) {
    const n = this.priorityQueues.get(t) ?? [];
    n.length > 0 && (this.processNotificationBatch(n), this.priorityQueues.set(t, []));
  }
}
function ii() {
  if (this.batchQueue.length === 0) return;
  const e = [...this.batchQueue];
  this.batchQueue = [], this.processNotificationBatch(e);
}
function si(e) {
  if (e.length === 0) return;
  const t = this.groupEventsByType(e);
  for (const [n, i] of t)
    this.processEventGroup(n, i);
}
function ri(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    t.has(n.type) || t.set(n.type, []), t.get(n.type).push(n);
  return t;
}
function ai(e, t) {
  var n, i;
  if (this.observers) {
    this.observers.lastBatch = { eventType: e, events: t };
    const s = (n = this.input) == null ? void 0 : n.id;
    this.observers.trigger(s ? String(s) : void 0);
  }
  this.notifiers.forEach((s) => {
    s != null && s.event.types.includes(e) && (s.handleBatch ? s.handleBatch(t.map((r) => ({ type: r.type, data: r.data }))) : s.handle ? t.forEach((r) => s.handle(r.type, r.data)) : t.forEach((r) => s.method(r.data)), this.autoTracker && t.length > 0 && t.forEach((r) => {
      var o;
      (o = this.autoTracker) == null || o.notify("onAutoTrackNotified", {
        ...r.data,
        target: s.event.action
      });
    }));
  }), (i = this.observers) == null || i.trigger();
}
Object.assign(ti, {
  processPriorityBatches: ni,
  processSimpleBatch: ii,
  processNotificationBatch: si,
  groupEventsByType: ri,
  processEventGroup: ai
});
var Jc = function() {
  return [...this.notifiers.keys()];
};
var Kc = function(e) {
  var t;
  return ((t = this.extensions) == null ? void 0 : t.has(e)) ?? false;
};
var Qc = function() {
  this.batchConfig.enablePriority && Object.values(Z).filter((e) => typeof e == "number").forEach((e) => {
    this.priorityQueues.set(e, []);
  }), this.isInitialized = true;
};
function Xc(e, t) {
  const n = {
    type: e,
    data: t,
    priority: Z.NORMAL
  };
  if (this.batchConfig.enablePriority) {
    const s = this.priorityQueues.get(n.priority) || [];
    s.push(n), this.priorityQueues.set(n.priority, s);
  } else
    this.batchQueue.push(n);
  (this.batchConfig.enablePriority ? Array.from(this.priorityQueues.values()).reduce(
    (s, r) => s + r.length,
    0
  ) : this.batchQueue.length) >= (this.batchConfig.maxBatchSize ?? 50) ? this.flushPendingNotifications() : this.scheduleBatch();
}
function oi() {
  if (!this.isBatchScheduled)
    switch (this.isBatchScheduled = true, this.batchConfig.strategy) {
      case "microtask":
        queueMicrotask(() => this.processBatch());
        break;
      case "timeout":
        this.batchTimeout = setTimeout(
          () => this.processBatch(),
          this.batchConfig.batchDelay ?? 16
        );
        break;
      case "requestAnimationFrame":
        requestAnimationFrame(() => this.processBatch());
        break;
    }
}
function ui() {
  this.batchTimeout !== null && (clearTimeout(this.batchTimeout), this.batchTimeout = null), this.isBatchScheduled = false, this.batchConfig.enablePriority ? this.processPriorityBatches() : this.processSimpleBatch();
}
Object.assign(oi, { processBatch: ui });
function el(e) {
  e && (this.batchConfig = { ...this.batchConfig, ...e }, e.enablePriority && !this.priorityQueues.size && Object.values(Z).filter((t) => typeof t == "number").forEach((t) => {
    this.priorityQueues.set(t, []);
  }));
}
function tl() {
  var t;
  const e = (t = this.input) == null ? void 0 : t.id;
  this.observers.trigger(e ? String(e) : void 0);
}
var nt = function(e) {
  this.autoTracker = e, this.notifiers = /* @__PURE__ */ new Map(), this.observers = new Nt(), this.batchQueue = [], this.priorityQueues = /* @__PURE__ */ new Map(), this.isBatchScheduled = false, this.batchTimeout = null, this.batchConfig = {
    maxBatchSize: 50,
    batchDelay: 16,
    enablePriority: true,
    strategy: "microtask"
  }, Object.defineProperty(this, "dependencyName", {
    value: "NotificationManager",
    writable: true,
    // Allow initialization to set proper name
    configurable: false
    // Prevent deletion or redefinition
  }), this.isInitialized = false;
};
Object.assign(nt.prototype, {
  debounceNotify: Hc,
  getRegisteredNotifierNames: Jc,
  accept: Uc,
  initialize: Qc,
  dismiss: Wc,
  notify: Xc,
  dispose: Yc,
  trigger: tl,
  batchNotify: zc,
  flushPendingNotifications: ti,
  setBatchConfig: el,
  scheduleBatch: oi,
  processBatch: ui,
  processPriorityBatches: ni,
  processSimpleBatch: ii,
  processNotificationBatch: si,
  groupEventsByType: ri,
  processEventGroup: ai,
  extend: Zc,
  hasExtension: Kc
});
var nl = function() {
  var g, v, b;
  const e = (v = (g = this.input) == null ? void 0 : g.domManager) == null ? void 0 : v.dmGet(this.input.id.toString());
  if (!e)
    return;
  const t = (b = e == null ? void 0 : e.attributes.getNamedItem("data-class")) == null ? void 0 : b.value, n = [], i = this.classesList.get("pristine") ?? "", s = this.classesList.get("dirty") ?? "", r = this.classesList.get("focus") ?? "", o = this.classesList.get("valid") ?? "", u = this.classesList.get("enabled") ?? "", c = this.classesList.get("busy") ?? "";
  n.push(i), n.push(s), n.push(r), n.push(o), n.push(u), n.push(c);
  const d = `${t} ${this.className} ${n.join(" ")}`.trim();
  e.setAttribute("class", d);
};
var il = function(e, t) {
  this.extensions = this.extensions ?? /* @__PURE__ */ new Map(), this.extensions.set(e, t), Object.assign(this, t);
};
function sl(e) {
  return this.classesList.get(e) ?? "";
}
function rl() {
  return Array.from(this.classesList.keys());
}
function al() {
  const e = {};
  return this.classesList.forEach((t, n) => {
    e[n] = !t.startsWith("no-");
  }), e;
}
var ol = function(e) {
  var t;
  return ((t = this.extensions) == null ? void 0 : t.has(e)) ?? false;
};
var ul = async function() {
  try {
    if (await k(this.input, (t) => {
      var n, i, s, r, o;
      (n = t == null ? void 0 : t.notificationManager) == null || n.observers.subscribe(
        String(t.id),
        this.classNames.bind(this),
        false
      ), (i = t == null ? void 0 : t.notificationManager) == null || i.observers.subscribe(
        String(t.id),
        this.getFlagsObject.bind(this),
        false
      ), t.styleManager.className = "", t.styleManager.classesList = /* @__PURE__ */ new Map([
        ["dirty", B.no_dirty],
        ["errors", B.no_errors],
        ["focus", B.no_focus],
        ["open", B.no_open],
        ["pristine", B.pristine],
        ["valid", B.valid],
        ["required", B.required],
        ["busy", B.no_busy]
      ]), t == null || t.styleManager.update(
        "required",
        ((o = (r = (s = this.input) == null ? void 0 : s.validationOptions) == null ? void 0 : r.required) == null ? void 0 : o.value) ?? false
      );
    })) {
      const t = new K(
        S(this.input !== void 0, "The dependency field is not instanciated")
      );
      t.process(), t.hasErrors() ? p(void 0, "critical", "initialize", t.toString()) : (p(this.input.trackingManager, "info", this.dependencyName, "Initialized"), this.isInitialized = true);
    }
  } catch (e) {
    p(this.input.trackingManager, "critical", this.dependencyName, e);
  }
};
var cl = (e) => `${e}`;
var ll = (e) => `no-${e}`;
var dl = (e, t) => t ? cl(e) : ll(e);
function hl(e, t) {
  var i, s, r, o, u, c, d, g, v, b;
  const n = dl(e, t);
  if (this.classesList.set(e, n), !((i = this.input) != null && i.isInitialized) || !((r = (s = this.input) == null ? void 0 : s.notificationManager) != null && r.isInitialized)) {
    console.log("-----update SKIPPED: not initialized", {
      isInitialized: (o = this.input) == null ? void 0 : o.isInitialized,
      notificationManagerInitialized: (c = (u = this.input) == null ? void 0 : u.notificationManager) == null ? void 0 : c.isInitialized
    });
    return;
  }
  console.log("-----update triggering notifications for channel:", String(this.input.id)), (b = (g = (d = this.input) == null ? void 0 : d.notificationManager) == null ? void 0 : g.observers) == null || b.debounceTrigger(
    String(this.input.id),
    (v = this.input) == null ? void 0 : v.observablesDelay
  );
}
var ci = function() {
  this.isInitialized = false, Object.defineProperty(this, "dependencyName", {
    value: "StyleManager",
    writable: false,
    // Prevent modification
    configurable: false
    // Prevent deletion or redefinition
  });
};
Object.assign(ci.prototype, {
  initialize: ul,
  classNames: nl,
  update: hl,
  get: sl,
  getFlagsList: rl,
  getFlagsObject: al,
  extend: il,
  hasExtension: ol
});
function gl(e) {
  this._outputProviders = e ? [...this._outputProviders, ...e] : [];
}
function pl() {
  if (this._trackingIsActive)
    return this._trackingData;
}
var ml = function() {
  this.addProviders([vn]), this.isInitialized = true;
};
function fl(e, t) {
  if (!this._trackingIsActive) return;
  const n = Fe(_e(this._trackingData), "critical", e, t);
  this._trackingData.push(n), this.print(n);
}
function yl(e, t) {
  if (!this._trackingIsActive) return;
  const n = Fe(_e(this._trackingData), "error", e, t);
  this._trackingData.push(n), this.print(n);
}
function vl(e, t) {
  if (!this._trackingIsActive) return;
  const n = Fe(_e(this._trackingData), "info", e, t);
  this._trackingData.push(n), this.print(n);
}
function bl(e, t) {
  if (!this._trackingIsActive) return;
  const n = Fe(_e(this._trackingData), "warning", e, t);
  this._trackingData.push(n), this.print(n);
}
function Ml(e) {
  var t;
  this._trackingIsActive && ((t = this._outputProviders) == null ? void 0 : t.length) !== 0 && this._outputProviders.forEach((n) => {
    const i = typeof n == "function" ? new n() : n;
    typeof (i == null ? void 0 : i.func) != "function" ? console.warn(
      `Output provider ${(i == null ? void 0 : i.id) || "unknown"} does not have a valid func method.`
    ) : i.func(e);
  });
}
function El() {
  var e;
  this._trackingIsActive && ((e = this._outputProviders) == null ? void 0 : e.length) !== 0 && this._outputProviders.forEach((t) => {
    t.funcAll(this._trackingData);
  });
}
function Sl(e) {
  this._trackingIsActive = e;
}
var wt = function(e) {
  (e == null ? void 0 : e.length) === 0 && console.warn("Tracker was defined using default output provider"), this._trackingData = [], this._outputProviders = e ?? [], this._trackingIsActive = true, Object.defineProperty(this, "dependencyName", {
    value: wt.name,
    writable: false,
    // Prevent modification
    configurable: false
    // Prevent deletion or redefinition
  });
};
Object.assign(wt.prototype, {
  setTrackingActive: Sl,
  getTrackingDate: pl,
  addProviders: gl,
  initialize: ml,
  internalCritical: fl,
  internalError: yl,
  internalWarning: bl,
  internalInfo: vl,
  print: Ml,
  printAll: El
});
function Cl(...e) {
  this.validationStrategies = e;
}
var Il = function(e) {
  this.triggerKeyWordType = e;
};
function Nl(e) {
  this.validationStrategies = [...this.validationStrategies, e];
}
var wl = function(e) {
  var t, n;
  (t = e == null ? void 0 : e.validationStrategies) != null && t.length && this.addValidationStrategies(...e.validationStrategies), (n = e == null ? void 0 : e.triggerKeyWordType) != null && n.length && this.setTriggerKeyWord(e.triggerKeyWordType), this.isInitialized = true;
};
function Ol(e, t) {
  var s, r, o;
  const n = [];
  if (t === true)
    return (s = this.validationCache) == null || s.invalidate(e.name), n;
  const i = (r = this.validationCache) == null ? void 0 : r.get(e.name, e.value, this.validationStrategies);
  if (i)
    return i;
  for (const u of this.validationStrategies)
    n.push(u.validate(e));
  return (o = this.validationCache) == null || o.set(e.name, e.value, this.validationStrategies, n), n;
}
var Al = async function(e, t) {
  var s, r, o;
  const n = [];
  if (t === true)
    return (s = this.validationCache) == null || s.invalidate(e.name), n;
  const i = (r = this.validationCache) == null ? void 0 : r.get(e.name, e.value, this.validationStrategies);
  if (i)
    return i;
  for (const u of this.validationStrategies)
    n.push(await u.validateAsync(e));
  return (o = this.validationCache) == null || o.set(e.name, e.value, this.validationStrategies, n), n;
};
function Dl(e, t) {
  const n = [];
  return e.forEach((i) => {
    n.push(...this.validate(i, t));
  }), n;
}
var $l = async function(e, t) {
  return new Promise((n) => {
    const i = [];
    t === true && n(i), e.forEach(async (s) => {
      var o;
      const r = await ((o = this == null ? void 0 : this.validateAsync) == null ? void 0 : o.call(this, s, t)) ?? [];
      i.push(...r);
    }), n(i);
  });
};
var Ot = function() {
  this.isInitialized = false, this.isValidating = false, this.validationStrategies = [], this.triggerKeyWordType = [], Object.defineProperty(this, "dependencyName", {
    value: "ValidationManager",
    writable: false,
    // Prevent modification
    configurable: false
    // Prevent deletion or redefinition
  });
};
Object.assign(Ot.prototype, {
  initialize: wl,
  addValidationStrategies: Cl,
  addValidationStrategy: Nl,
  setTriggerKeyWord: Il,
  validate: Ol,
  validateAsync: Al,
  validateMany: Dl,
  validateManyAsync: $l
});
var Tl = function(...e) {
  this.valueStrategies = [...e];
};
function Rl(...e) {
  for (const t of e)
    this.valueStrategies.find((n) => n.id === t.id) || this.valueStrategies.push(t);
}
var Ll = function(e) {
  var t, n, i, s, r, o;
  try {
    const u = e.dependencyName === "InputBase" ? e : e.input;
    if (u.value = null, u.originalValue = null, u.objectValue = null, u.isPristine = u.originalValue === u.value, u.isDirty = u.originalValue !== u.value, (t = u.styleManager) == null || t.update("pristine", u.isPristine), (n = u.styleManager) == null || n.update("dirty", u.isDirty), u.validationManager && u.shouldValidate) {
      const c = u.validationManager.validate(
        e
      );
      u.isValid = c.every(
        (d) => d.state
      ), u.validationResults = c, (i = u.styleManager) == null || i.update("valid", u.isValid), (s = u.styleManager) == null || s.update("errors", !u.isValid);
    }
  } catch (u) {
    console.error(
      `CLEARING TYPE ${((r = e == null ? void 0 : e.input) == null ? void 0 : r.type) ?? "no type found"} in field: ${((o = e == null ? void 0 : e.input) == null ? void 0 : o.name) ?? (e == null ? void 0 : e.name)} `,
      u
    );
  }
};
var xl = function(e) {
  if (!this.valueStrategies.find((i) => i.concernedTypes.includes(e.input.type)))
    return console.error(`NO PARSER STRATEGY FOUND FOR THIS TYPE ${e.input.type} `), null;
  const n = this.getValue(e);
  try {
    switch (e.input.type) {
      case "number":
        return String(n);
      case "checkbox":
        return n === true ? "1" : n === false ? "0" : "null";
      case "date":
      case "time":
        return JSON.stringify(n);
      case "select":
      case "radio":
      default:
        return n;
    }
  } catch (i) {
    return console.error(
      `PARSING ERROR FOR TYPE ${e.input.type} in field: ${e.input.name} `,
      i
    ), null;
  }
};
function Gl(e, t) {
  var s, r;
  const n = t ?? "all", i = this.valueStrategies.find((o) => o.concernedTypes.includes(e.input.type));
  if (!i) {
    console.error(`NO PARSER STRATEGY FOUND FOR THIS TYPE ${e.input.type} `);
    return;
  }
  try {
    const o = i.getter(e);
    switch (e.input.type) {
      case "select":
        return o == null ? void 0 : o.value;
      case "date":
        if (n === "validation") {
          const u = new H();
          return !u || o === null || o === void 0 ? null : ((s = u == null ? void 0 : u.setFromString) == null || s.call(u, o, e.input.culture.dateFormat), (r = u == null ? void 0 : u.toDate) == null ? void 0 : r.call(u).getTime());
        }
        return o;
      case "radio":
      default:
        return o;
    }
  } catch (o) {
    console.error(
      `PARSING ERROR FOR TYPE ${e.input.type} in field: ${e.input.name} `,
      o
    );
  }
}
var kl = async function(e) {
  try {
    e != null && e.valueStrategies && e.valueStrategies.length > 0 && this.acceptValueStrategies(...e.valueStrategies), this.isInitialized = true;
  } catch (t) {
    p(void 0, "critical", this.dependencyName, (t == null ? void 0 : t.message) ?? t.toString());
  }
};
var Pl = function(e, t) {
  var i, s;
  const n = this.valueStrategies.find((r) => r.concernedTypes.includes(e.input.type));
  if (!n) {
    console.error(`NO PARSER STRATEGY FOUND FOR THIS TYPE ${e.input.type} `);
    return;
  }
  try {
    n.setter(e, t), e.input.isPristine = e.input.originalValue === e.input.value, e.input.isDirty = e.input.originalValue !== e.input.value, (i = e.input.styleManager) == null || i.update("pristine", e.input.isPristine), (s = e.input.styleManager) == null || s.update("dirty", e.input.isDirty);
  } catch (r) {
    console.error(
      `PARSING ERROR FOR TYPE ${e.input.type} in field: ${e.input.name} `,
      r
    );
  }
};
var Vl = function(e, t) {
  try {
    switch (e.input.type) {
      case "checkbox":
        this.setValue(e, (t == null ? void 0 : t.checked) ?? false);
        break;
      default:
        return this.setValue(e, (t == null ? void 0 : t.value) ?? null);
    }
  } catch (n) {
    console.error(
      `setValueFromHtmlElement ERROR IN PARSING ${e.input.type} in field: ${e.input.name} `,
      n
    );
  }
};
var Ue = function() {
  this.isInitialized = false, this.valueStrategies = [], Object.defineProperty(this, "dependencyName", {
    value: Ue.name,
    writable: false,
    // Prevent modification
    configurable: false
    // Prevent deletion or redefinition
  });
};
Object.assign(Ue.prototype, {
  initialize: kl,
  acceptValueStrategies: Tl,
  setValueFromHtmlElement: Vl,
  addValueStrategies: Rl,
  getValue: Gl,
  setValue: Pl,
  getAsString: xl,
  clear: Ll
});
var Q = Symbol.for("IInputConfigProvider");
var _l = function(e, t, n, i) {
  return this.getConfig = () => {
    if (!e || !t || !n || !i)
      throw new Error(
        "One or more services are not provided. Please ensure all required services are available."
      );
    return {
      validationStrategies: t == null ? void 0 : t.strategies,
      trackingStrategies: i == null ? void 0 : i.strategies,
      valueStrategies: n == null ? void 0 : n.strategies,
      triggerKeyWordType: e == null ? void 0 : e.triggers
    };
  }, this;
};
var Fl = Symbol.for("IFieldDescriptorService");
var li = function(e) {
  if (!e)
    throw new Error(
      "ServiceManager is not provided. Please provide a valid ServiceManager instance."
    );
  this.descriptors = [];
};
Object.assign(li.prototype, {
  getDescriptorByName: function(e) {
    return this.descriptors.find((t) => t.name === e);
  },
  getDescriptorById: function(e) {
    return this.descriptors.find((t) => t.id === e);
  },
  setFieldDescriptor: function(e) {
    const t = this.descriptors.findIndex((n) => n.id === e.id);
    t !== -1 ? this.descriptors[t] = e : this.descriptors.push(e);
  },
  reset: function() {
    this.descriptors = [];
  }
});
var Bl = function(e) {
  if (!e)
    throw new Error(
      "ServiceManager is not provided. Please provide a valid ServiceManager instance."
    );
  e.register(N, () => e, { lifetime: "singleton" }), e.registerClass(ye, P, {
    lifetime: "singleton",
    dependencies: [N]
  });
  const t = e.resolve(ye), n = t.getDefaultConfiguration();
  t.setConfiguration("default", n), t.useConfiguration("default"), e.registerClass(Le, ve, {
    lifetime: "singleton",
    dependencies: [N]
  }), e.register(gt, () => new ci(), {
    lifetime: "transient"
    // Each field needs its own StyleManager (holds className, classesList state)
  }), e.register(xe, () => new Ot(), {
    lifetime: "transient"
    // Each field needs its own ValidationManager (holds validation state)
  }), e.register(Ge, () => new Ue(), {
    lifetime: "transient"
    // Each field needs its own ValueManager (holds field value state)
  }), e.register(Ve, () => new wt(), {
    lifetime: "transient"
    // Each field needs its own TrackingManager (holds tracking state)
  }), e.register(jt, () => new nt(), {
    lifetime: "singleton"
    // Single instance with channel-based routing per field
  }), e.registerClass(Pe, nt, {
    lifetime: "singleton",
    // Single instance with channel-based routing per field
    dependencies: [jt]
  }), e.registerClass(Fl, li, {
    lifetime: "singleton",
    dependencies: [N]
  }), e.registerClass(Re, _n, {
    lifetime: "singleton",
    dependencies: [N]
  }), e.registerClass(et, Vn, {
    lifetime: "singleton",
    dependencies: [N]
  }), e.registerClass(tt, Fn, {
    lifetime: "singleton",
    dependencies: [N]
  }), e.registerClass(Xe, Pn, {
    lifetime: "singleton",
    dependencies: [N]
  }), e.registerClass(Q, _l, {
    lifetime: "singleton",
    dependencies: [
      Re,
      et,
      tt,
      Xe
    ]
  });
  try {
    yn(e);
  } catch (i) {
    console.warn("Failed to setup base input classes:", i);
  }
  try {
    Bn(e);
  } catch (i) {
    console.warn("Failed to setup base field configurations:", i);
  }
};
var jl = async function() {
  var e, t, n;
  try {
    p(void 0, "info", di.name, `${this.name} executing...`), await ((e = this == null ? void 0 : this.intitializer) == null ? void 0 : e.call(this, this.manager.params)), await ((n = (t = this.next) == null ? void 0 : t.execute) == null ? void 0 : n.call(t));
  } catch (i) {
    p(
      void 0,
      "info",
      this.name,
      `execution of initialization ${this.name} failed: ${i.message}`
    );
  }
};
var Ul = function(e) {
  var t, n;
  this.next ? (n = (t = this.next) == null ? void 0 : t.setNextSequence) == null || n.call(t, e) : this.next = e;
};
var di = function(e, t, n) {
  this.name = e, this.manager = t, this.next = void 0, this.intitializer = n, this.execute = jl, this.setNextSequence = Ul;
};
var zl = function(e, t) {
  var i, s;
  const n = new di(e, this, t);
  this.initializer ? (s = (i = this.initializer) == null ? void 0 : i.setNextSequence) == null || s.call(i, n) : this.initializer = n;
};
var ql = async function() {
  var e, t;
  await ((t = (e = this.initializer) == null ? void 0 : e.execute) == null ? void 0 : t.call(e));
};
var hi = function(e) {
  this.params = e, this.initializer = void 0;
};
Object.assign(hi.prototype, {
  addInitializer: zl,
  executeSequences: ql
});
async function te(e, t) {
  const n = new hi(e);
  t.forEach((i) => {
    i && n.addInitializer(i == null ? void 0 : i.dependencyName, i == null ? void 0 : i.initialize.bind(i));
  }), await n.executeSequences();
}
var ne = (e, ...t) => [
  /** these are the basic dependencies that all base field inputs needs in
   * order to work properly
   */
  e.domManager,
  e.trackingManager,
  e.drawer,
  e.styleManager,
  e.notificationManager,
  e.validationManager,
  e.valueManager,
  e,
  ...t
];
var X = Symbol.for("IBaseInputService");
var it = function(e) {
  if (!e)
    throw new Error(
      "ServiceManager is not provided. Please provide a valid ServiceManager instance."
    );
  this.sm = e;
  try {
    this.build = function(t) {
      var o, u, c, d;
      const n = (o = this.sm.lazy(an)) == null ? void 0 : o(), i = (u = this.sm.lazy(Le)) == null ? void 0 : u(), s = (c = this.sm.lazy(Pe)) == null ? void 0 : c(), r = (d = this.sm.lazy(Ve)) == null ? void 0 : d();
      return n.initializeProperties(t), n.useDomManager(i), n.useTrackingManager(r), n.useNotificationManager(s), n.useValidationManager(null), n.useValueManager(null), n.useStyleManager(null), n;
    };
  } catch (t) {
    p(
      void 0,
      "critical",
      it.name,
      `an error has occured when initializing ${it.name} class: ${t.message}`
    );
    return;
  }
};
var gi = Symbol.for("ICheckInputService");
var st = function(e) {
  if (!e)
    throw new Error(
      "ServiceManager is not provided. Please provide a valid ServiceManager instance."
    );
  this.sm = e;
  try {
    this.build = async function(t) {
      var d, g, v, b;
      const i = ((d = this.sm.lazy(Q)) == null ? void 0 : d()).getConfig(), r = ((g = this.sm.lazy(X)) == null ? void 0 : g()).build(t), o = (v = this.sm.lazy(Ee)) == null ? void 0 : v(), u = (b = this.sm.lazy(on)) == null ? void 0 : b();
      o.input = r, u.input = r, u.clickBase = o;
      const c = ne(r, o, u);
      return await te(i, c), u;
    };
  } catch (t) {
    p(
      void 0,
      "critical",
      st.name,
      `an error has occured when initializing ${st.name} class: ${t.message}`
    );
    return;
  }
};
var pi = Symbol.for("IRadioInputService");
var rt = function(e) {
  if (!e)
    throw new Error(
      "ServiceManager is not provided. Please provide a valid ServiceManager instance."
    );
  this.sm = e;
  try {
    this.build = async function(t) {
      var g, v, b, w, x;
      const i = ((g = this.sm.lazy(X)) == null ? void 0 : g()).build(t), s = (v = this.sm.lazy(Ee)) == null ? void 0 : v(), r = (b = this.sm.lazy(
        ke,
        t.options
      )) == null ? void 0 : b(), o = (w = this.sm.lazy(gn)) == null ? void 0 : w();
      s.input = i, r.input = i, o.input = i, o.clickBase = s, o.optionBase = r;
      const u = ne(
        i,
        s,
        r,
        o
      ), d = ((x = this.sm.lazy(Q)) == null ? void 0 : x()).getConfig();
      return await te(d, u), o;
    };
  } catch (t) {
    p(
      void 0,
      "critical",
      rt.name,
      `an error has occured when initializing ${rt.name} class: ${t.message}`
    );
    return;
  }
};
var mi = Symbol.for("ISelectInputService");
var at = function(e) {
  if (!e)
    throw new Error(
      "ServiceManager is not provided. Please provide a valid ServiceManager instance."
    );
  this.sm = e;
  try {
    this.build = async function(t) {
      var g, v, b, w, x;
      const i = ((g = this.sm.lazy(X)) == null ? void 0 : g()).build(t), s = (v = this.sm.lazy(Ee)) == null ? void 0 : v(), r = (b = this.sm.lazy(ke)) == null ? void 0 : b(), o = (w = this.sm.lazy(pn)) == null ? void 0 : w();
      r.options = t.options, s.input = i, r.input = i, o.input = i, o.clickBase = s, o.optionBase = r;
      const u = ne(
        i,
        s,
        r,
        o
      ), d = ((x = this.sm.lazy(Q)) == null ? void 0 : x()).getConfig();
      return await te(d, u), o;
    };
  } catch (t) {
    p(
      void 0,
      "critical",
      at.name,
      `an error has occured when initializing ${at.name} class: ${t.message}`
    );
    return;
  }
};
var fi = Symbol.for("ITextInputService");
var ot = function(e) {
  if (!e)
    throw new Error(
      "ServiceManager is not provided. Please provide a valid ServiceManager instance."
    );
  this.sm = e;
  try {
    this.build = async function(t) {
      var c, d, g;
      const i = ((c = this.sm.lazy(X)) == null ? void 0 : c()).build(t), s = (d = this.sm.lazy(mn)) == null ? void 0 : d();
      s.input = i;
      const r = ne(i, s), u = ((g = this.sm.lazy(Q)) == null ? void 0 : g()).getConfig();
      return await te(u, r), s;
    };
  } catch (t) {
    p(
      void 0,
      "critical",
      ot.name,
      `an error has occured when initializing ${ot.name} class: ${t.message}`
    );
    return;
  }
};
var Hl = Symbol.for("IClickInputService");
var ut = function(e) {
  if (!e)
    throw new Error(
      "ServiceManager is not provided. Please provide a valid ServiceManager instance."
    );
  this.sm = e;
  try {
    this.build = async function(t) {
      var c, d, g;
      const i = ((c = this.sm.lazy(Q)) == null ? void 0 : c()).getConfig(), r = ((d = this.sm.lazy(X)) == null ? void 0 : d()).build(t), o = (g = this.sm.lazy(Ee)) == null ? void 0 : g();
      o.input = r;
      const u = ne(r, o);
      return await te(i, u), o;
    };
  } catch (t) {
    p(
      void 0,
      "critical",
      ut.name,
      `an error has occured when initializing ${ut.name} class: ${t.message}`
    );
    return;
  }
};
var yi = Symbol.for("IMaskedInputService");
var ct = function(e) {
  if (!e)
    throw new Error(
      "ServiceManager is not provided. Please provide a valid ServiceManager instance."
    );
  this.sm = e;
  try {
    this.build = async function(t) {
      var c, d, g;
      console.log("🔍 descriptor.mask:", {
        mask: t.mask,
        type: typeof t.mask,
        isArray: Array.isArray(t.mask)
      });
      const i = ((c = this.sm.lazy(Q)) == null ? void 0 : c()).getConfig(), r = ((d = this.sm.lazy(X)) == null ? void 0 : d()).build(t), o = (g = this.sm.lazy(
        hn,
        t.mask
      )) == null ? void 0 : g();
      o.input = r;
      const u = ne(r, o);
      return await te(i, u), o;
    };
  } catch (t) {
    p(
      void 0,
      "critical",
      ct.name,
      `an error has occured when initializing ${ct.name} class: ${t.message}`
    );
    return;
  }
};
var Wl = Symbol.for("IOptionInputService");
var lt = function(e) {
  if (!e)
    throw new Error(
      "ServiceManager is not provided. Please provide a valid ServiceManager instance."
    );
  this.sm = e;
  try {
    this.build = async function(t) {
      var c, d, g;
      const i = ((c = this.sm.lazy(X)) == null ? void 0 : c()).build(t), s = (d = this.sm.lazy(
        ke,
        t.options
      )) == null ? void 0 : d();
      s.input = i;
      const r = ne(i, s), u = ((g = this.sm.lazy(Q)) == null ? void 0 : g()).getConfig();
      return await te(u, r), s;
    };
  } catch (t) {
    p(
      void 0,
      "critical",
      lt.name,
      `an error has occured when initializing ${lt.name} class: ${t.message}`
    );
    return;
  }
};
var vi = Symbol.for("IInputFactory");
var Yl = function(e) {
  this.sm = e;
  const t = /* @__PURE__ */ new Map();
  this.InputsRegistry = function(n) {
    var s, r, o, u, c;
    if (t.has(n))
      return t.get(n);
    let i;
    switch (n) {
      case "toggle":
      case "checkbox":
        const d = (s = this.sm.lazy(gi)) == null ? void 0 : s();
        i = d.build.bind(d);
        break;
      case "select":
        const g = (r = this.sm.lazy(mi)) == null ? void 0 : r();
        i = g.build.bind(g);
        break;
      case "radio":
        const v = (o = this.sm.lazy(pi)) == null ? void 0 : o();
        i = v.build.bind(v);
        break;
      case "date":
        const b = (u = this.sm.lazy(yi)) == null ? void 0 : u();
        i = b.build.bind(b);
        break;
      case "text":
      default:
        const w = (c = this.sm.lazy(fi)) == null ? void 0 : c();
        i = w.build.bind(w);
        break;
    }
    return i && t.set(n, i), i;
  }, this.create = function(n) {
    return this.InputsRegistry(n);
  };
};
var Zl = function(e) {
  if (!e)
    throw new Error(
      "ServiceManager is not provided. Please provide a valid ServiceManager instance."
    );
  e.registerClass(vi, Yl, {
    lifetime: "singleton",
    dependencies: [N]
  });
};
var Jl = function(e) {
  if (!e)
    throw new Error(
      "ServiceManager is not provided. Please provide a valid ServiceManager instance."
    );
  e.registerClass(X, it, {
    lifetime: "transient",
    dependencies: [N]
  }), e.registerClass(gi, st, {
    lifetime: "transient",
    dependencies: [N]
  }), e.registerClass(Hl, ut, {
    lifetime: "transient",
    dependencies: [N]
  }), e.registerClass(yi, ct, {
    lifetime: "transient",
    dependencies: [N]
  }), e.registerClass(Wl, lt, {
    lifetime: "transient",
    dependencies: [N]
  }), e.registerClass(pi, rt, {
    lifetime: "transient",
    dependencies: [N]
  }), e.registerClass(mi, at, {
    lifetime: "transient",
    dependencies: [N]
  }), e.registerClass(fi, ot, {
    lifetime: "transient",
    dependencies: [N]
  });
};
var Kl = function(e) {
  this.forms.delete(e.id);
};
var re = ((e) => (e.Loaded = "Loaded", e.InProgress = "InProgress", e.Reload = "Reload", e.Error = "Error", e))(re || {});
function Ql(...e) {
  this.originFields = [];
  for (const t of e)
    this.fields.find(
      (i) => i.input.id === t.input.id
    ) || (this.triggerKeyWordType.length > 1, t.input.validationManager.setTriggerKeyWord(this.triggerKeyWordType), this.autoTracker && (t.input.notificationManager.autoTracker = this.autoTracker), t.input.formular = this, this.fields.push(t), this.originFields.push(Mo(t)));
}
async function Xl() {
  return await new Promise((t) => {
    const n = [];
    for (const i of this.fields)
      n.push(i.input.isValid);
    this.isValid = n.length > 0 ? n.every((i) => i) : false, t(this.isValid);
  });
}
function ed() {
  const e = [];
  for (const t of this.fields) {
    const n = this.originFields.find(
      (r) => r.input.id === t.input.id
    ), i = n == null ? void 0 : n.input.valueManager.getValue(n), s = t.input.valueManager.getValue(t);
    if (i !== s) {
      e.push({ name: t.input.name, hasChanges: true });
      break;
    }
  }
  this.isDirty = e.some((t) => t.hasChanges), this.isValid = this.fields.every((t) => t.input.isValid);
}
function td() {
  this.fields.forEach((e) => {
    e.input.value = null, e.input.objectValue = null, e.input.errors = [], e.input.isDirty = false, e.input.isPristine = true;
  }), this.isDirty = false, this.isValid = true;
}
function nd(e) {
  const t = this.getField(e);
  t && (t.value = null, t.input.objectValue = null, t.errors = [], t.input.isDirty = false, t.input.isPristine = true);
}
function id() {
  this.fields.forEach((e) => {
    e.input.value = null, e.input.objectValue = null, e.input.errors = [], e.input.guides = [];
  }), this.fields = [], this.originFields = [], this.isValid = false, this.isDirty = false;
}
function sd() {
  const e = {};
  for (const t of this.fields) {
    const n = t.input.valueManager.getValue(t);
    e[t.input.name] = n;
  }
  return e;
}
function rd() {
  const e = {};
  return this.fields.forEach((t) => {
    t.input.errors && t.input.errors.length > 0 && (e[t.input.name] = t.input.errors);
  }), e;
}
function ad(e) {
  return this.fields.find((t) => t.input.name === e);
}
var od = function() {
  if (!this.fields) return {};
  const e = this.fields.some((n) => n.input.isDirty), t = this.fields.every((n) => n.input.isValid);
  return {
    isBusy: this.isBusy,
    isDirty: e,
    isValid: t
  };
};
var ud = function(e) {
  this.observers.subscribe(e.bind(this), false);
};
var cd = function(e, t, n) {
  var c, d;
  const i = this._introspectionEnabled, s = (c = this.manager) == null ? void 0 : c.notificationManager;
  if (!i || !s)
    return () => {
    };
  const r = this._debugStreamMaxSize || 100;
  (n == null ? void 0 : n.debounceDelay) ?? this.observablesDelay ?? this.inputDelay;
  const o = () => {
    const g = this.debugStream || [];
    g.push({
      type: "observer_fired",
      channel: e || "form-wide",
      timestamp: Date.now()
    }), g.length > r && g.shift(), t();
  };
  e ? s.observers.subscribe(e, o, false) : s.observers.subscribe(o, false);
  const u = this._observerSubscriptions;
  return u && (u.has(e) || u.set(e, []), (d = u.get(e)) == null || d.push(o)), () => {
    if (e ? s.observers.unSubscribe(e, o, false) : s.observers.unSubscribe(o, false), u) {
      const g = u.get(e);
      if (g) {
        const v = g.indexOf(o);
        v > -1 && g.splice(v, 1);
      }
    }
  };
};
function ld(e) {
  !e || typeof e != "object" || Object.entries(e).forEach(([t, n]) => {
    const i = this.getField(t);
    i && (i.input.value = n);
  });
}
function dd(e) {
  const t = this.getField(e);
  return t ? t.input.isValid : false;
}
function hd() {
  this.fields.forEach((e) => {
    e.input.value = e.input.defaultValue, e.input.objectValue = null, e.input.errors = [], e.input.isDirty = false, e.input.isPristine = true;
  }), this.isDirty = false, this.isValid = true;
}
var gd = function(e) {
  this._loadingStatus = e;
};
var pd = function(e) {
  if (!e || !Array.isArray(e)) {
    console.warn("setTriggerKeyWord: Invalid mode provided, using empty array"), this.triggerKeyWordType = [];
    return;
  }
  this.triggerKeyWordType = e, this.validateOnFirstSubmit = e.includes("validateOnFormFirstSubmit"), this.fields.forEach((t) => {
    t.input.validationManager.setTriggerKeyWord(e);
  });
};
var dt = (e) => e ? e.validationOptions ? Object.keys(e.validationOptions).length === 0 ? (e.message(
  "info",
  dt.name,
  `${e.name} has defined validationOptions but no validation strategies found`
), false) : true : (e.message(
  "info",
  dt.name,
  `${e.name} has no validationOptions defined`
), false) : false;
var bi = async function() {
  return this.setIsBusy(re.InProgress), await new Promise(async (e, t) => {
    this.validateOnFirstSubmit && (this.validateOnFirstSubmit = false);
    const n = [];
    for (const s of this.fields) {
      if (!dt(s.input)) {
        s.input.message(
          "info",
          s.input.name,
          `No validation options found for field ${s.input.name}, skipping validation`
        );
        continue;
      }
      n.push(
        ...await s.input.handleValidationAsync(
          C(s.input.name, bi.name, "onValidate", "submit", s.input.name, s)
        )
      );
    }
    const i = [];
    n.forEach((s) => {
      i.push(s.state);
    }), i.every((s) => s) ? (this.setIsBusy(re.Loaded), e(this.getData())) : (this.setIsBusy(re.Error), t(new Error("Form is not valid")));
  });
};
var md = function(e, t) {
  var s;
  const i = (s = this.manager) == null ? void 0 : s.notificationManager;
  return i ? {
    /**
     * Attach callback to the subscribed event
     * @param callback - Function to call when event fires
     * @returns Unsubscribe function
     */
    on: (r) => {
      const o = t || `subscription-${Date.now()}`, u = {
        event: C("form", o, e, o),
        method: (c) => {
          r(c);
        }
      };
      return i.accept(u), () => {
        i.dismiss(u);
      };
    }
  } : (console.warn("[Form.subscribe] NotificationManager not available"), {
    on: () => (console.warn(
      "[Form.subscribe] Cannot subscribe - NotificationManager not initialized"
    ), () => {
    })
  });
};
var fd = function() {
  var n;
  const e = this._observerSubscriptions, t = (n = this.manager) == null ? void 0 : n.notificationManager;
  !t || !e || (e.forEach((i, s) => {
    i.forEach((r) => {
      s ? t.observers.unSubscribe(s, r, false) : t.observers.unSubscribe(r, false);
    });
  }), e.clear(), this.debugStream = []);
};
function yd(e, t) {
  const n = this.getField(e);
  n && (n.input.value = t, n.input.isDirty = true, n.input.isPristine = false, this.isDirty = true);
}
function vd(e) {
  const t = this.getField(e);
  t && (t.input.isValid = t.input.errors.length === 0);
}
async function bd() {
  return await this.checkAllFieldsAreValid();
}
var At = function(e, t) {
  Object.defineProperty(this, "id", {
    value: e,
    writable: false,
    // Prevent modification
    configurable: false
    // Prevent deletion or redefinition
  }), this.fields = [], this.originFields = [], this.isValid = true, this._loadingStatus = re.Loaded, this.triggerKeyWordType = [], this.isDirty = false, this._observerSubscriptions = /* @__PURE__ */ new Map(), this._introspectionEnabled = false, this._debugStreamMaxSize = 100, this.debugStream = [], Object.defineProperty(this, "isBusy", {
    get: function() {
      return this._loadingStatus !== re.Loaded;
    },
    enumerable: true,
    configurable: false
  }), Object.defineProperty(this, "manager", {
    value: t,
    writable: false,
    // Prevent modification
    configurable: false
    // Prevent deletion or redefinition
  }), Object.defineProperty(this, "notificationManager", {
    value: t.notificationManager,
    writable: false,
    // Prevent modification
    configurable: false
    // Prevent deletion or redefinition
  });
};
Object.assign(At.prototype, {
  addFields: Ql,
  checkAllFieldsAreValid: Xl,
  checkChanges: ed,
  clear: td,
  clearField: nd,
  dispose: id,
  getData: sd,
  getErrors: rd,
  getField: ad,
  getFormFlags: od,
  hasChanges: ud,
  observe: cd,
  parse: ld,
  preValidateField: dd,
  reset: hd,
  setIsBusy: gd,
  setTriggerKeyWord: pd,
  submit: bi,
  subscribe: md,
  unobserveAll: fd,
  updateField: yd,
  validateField: vd,
  validateForm: bd
});
var Md = function(e) {
  const t = new At(e, this);
  return this.forms.set(t.id, t), t;
};
var Ed = async function(e, t) {
  var d, g, v, b;
  if (this.forms.has(e))
    return this.forms.get(e);
  const n = new At(e, this), i = (d = this.sm.lazy(ye)) == null ? void 0 : d(), s = (i == null ? void 0 : i.getConfigByName("behavior", "form", "enableIntrospection")) ?? false, r = (i == null ? void 0 : i.getConfigByName("behavior", "form", "debugStreamSize")) ?? 100;
  n._introspectionEnabled = s, n._debugStreamMaxSize = r;
  const o = (g = this.sm.lazy(vi)) == null ? void 0 : g(), u = [];
  for (const w of t) {
    if (!w)
      continue;
    const D = await o.create(w.type)(w);
    u.push(D);
  }
  n.addFields(...u);
  const c = (v = this.sm.lazy(Re)) == null ? void 0 : v();
  return (b = c == null ? void 0 : c.triggers) != null && b.length && n.setTriggerKeyWord(c.triggers), this.forms.set(e, n), n;
};
var Sd = function(e) {
  if (this.forms.has(e.name))
    return this.forms.get(e.name);
  const t = Ne(e);
  this.createFromDescriptors(e.name, t);
};
var Cd = function(e) {
  const t = this.forms.get(e);
  return t ? t.getData() : void 0;
};
var Id = function(e) {
  return this.forms.get(e);
};
var Nd = async function(e) {
  const t = this.forms.get(e);
  return t ? await t.checkAllFieldsAreValid() : false;
};
var Mi = function(e, t) {
  this.sm = e, Object.defineProperty(this, "notificationManager", {
    value: t,
    writable: false,
    // Prevent modification
    configurable: false
    // Prevent deletion or redefinition
  }), this.forms = /* @__PURE__ */ new Map();
};
Object.assign(Mi.prototype, {
  clear: Kl,
  createFromDescriptors: Ed,
  createFromSchema: Sd,
  createEmpty: Md,
  getData: Cd,
  getForm: Id,
  validate: Nd
});
var wd = function(e) {
  if (!e)
    throw new Error(
      "ServiceManager is not provided. Please provide a valid ServiceManager instance."
    );
  e.registerClass(ht, Mi, {
    lifetime: "singleton",
    dependencies: [N, Pe]
  });
};
var Od = {};
var se = {
  /**
   * Creates a new service manager instance with specified features
   */
  create(e = {}) {
    const t = e || {}, {
      includeCoreManagers: n = true,
      includeFormularManager: i = true,
      includeInputEngine: s = true,
      includeBaseConfigurations: r = true,
      customSetup: o = [],
      parent: u,
      skipValidation: c = false
    } = t, d = new De(u);
    if (n && Bl(d), i && wd(d), s && (yn(d), Jl(d), Zl(d)), r && Bn(d), o.forEach((g) => g(d)), Od.NODE_ENV === "development" && !c)
      try {
        d.validateNoCycles(), console.log("🔍 Service Manager Factory: Dependency validation passed");
      } catch (g) {
        throw console.error(
          "🚨 Service Manager Factory: Circular dependency detected:",
          g.message
        ), g;
      }
    return d;
  },
  /**
   * Creates a minimal service manager (just the container)
   */
  createMinimal(e) {
    return new De(e);
  },
  /**
   * Creates a fully configured service manager with all features
   */
  createFull(e) {
    return this.create({
      includeCoreManagers: true,
      includeFormularManager: true,
      includeInputEngine: true,
      includeBaseConfigurations: true,
      parent: e
    });
  },
  /**
   * Creates a scoped service manager from an existing one
   */
  createScope(e) {
    return e.createScope();
  }
};
var Ad = {
  /**
   * Creates a service manager for form applications with all features enabled.
   * This is the most common setup for applications using FORMULAR.
   *
   * @param options - Optional additional configuration options
   * @returns A fully configured service manager for form applications
   */
  forFormApplication(e) {
    return se.create({
      includeCoreManagers: true,
      includeFormularManager: true,
      includeInputEngine: true,
      includeBaseConfigurations: true,
      ...e
    });
  },
  /**
   * Creates a minimal service manager for custom implementations.
   * Only includes core managers, allowing consumers to build their own setup.
   *
   * @param options - Optional additional configuration options
   * @returns A minimal service manager with only core features
   */
  forCustomImplementation(e) {
    return se.create({
      includeCoreManagers: true,
      includeFormularManager: false,
      includeInputEngine: false,
      includeBaseConfigurations: false,
      ...e
    });
  },
  /**
   * Creates a service manager optimized for testing environments.
   * Includes all features but may have different validation settings.
   *
   * @param options - Optional additional configuration options
   * @returns A service manager configured for testing
   */
  forTesting(e) {
    return se.create({
      includeCoreManagers: true,
      includeFormularManager: true,
      includeInputEngine: true,
      includeBaseConfigurations: true,
      skipValidation: false,
      // Keep validation in tests to catch issues
      ...e
    });
  },
  /**
   * Creates a service manager with only core managers.
   * Useful for lightweight applications or when building custom solutions.
   *
   * @param options - Optional additional configuration options
   * @returns A service manager with only core managers
   */
  coreOnly(e) {
    return se.create({
      includeCoreManagers: true,
      includeFormularManager: false,
      includeInputEngine: false,
      includeBaseConfigurations: false,
      ...e
    });
  },
  /**
   * Creates a service manager for input-focused applications.
   * Includes core managers and input engine but excludes formular manager.
   *
   * @param options - Optional additional configuration options
   * @returns A service manager optimized for input handling
   */
  forInputEngine(e) {
    return se.create({
      includeCoreManagers: true,
      includeFormularManager: false,
      includeInputEngine: true,
      includeBaseConfigurations: true,
      ...e
    });
  },
  /**
   * Creates a service manager for configuration-only scenarios.
   * Includes core managers and configurations but excludes complex features.
   *
   * @param options - Optional additional configuration options
   * @returns A service manager for configuration-focused applications
   */
  forConfiguration(e) {
    return se.create({
      includeCoreManagers: true,
      includeFormularManager: false,
      includeInputEngine: false,
      includeBaseConfigurations: true,
      ...e
    });
  }
};
var Ei = function(e) {
  this._submitFn = e;
};
Ei.prototype.submit = async function(e, t) {
  return this._submitFn(e);
};
var Dd = function(e, t) {
  this._submitFn = e, this._contextChecks = t ?? {};
};
Dd.prototype.submit = async function(e, t) {
  this._contextChecks.onValidationStart && this._contextChecks.onValidationStart();
  const n = await t.validateForm();
  if (this._contextChecks.onValidationComplete && this._contextChecks.onValidationComplete(n), !n)
    throw new Error("Form validation failed");
  if (this._contextChecks.isDismissed && this._contextChecks.isDismissed())
    throw new Error("Form submission dismissed by user");
  return this._submitFn(e);
};
var $d = class extends Error {
  constructor(t, n) {
    super(t), this.code = n, this.name = "FormSubmissionError";
  }
};
var Qg = class extends $d {
  constructor() {
    super("Form submission was dismissed by the user", "FORM_DISMISSED"), this.name = "FormDismissedError";
  }
};
function Td(e) {
  const t = e;
  return t ? t._type === "number" || typeof t.int == "function" || typeof t.finite == "function" ? "number" : t._type === "boolean" || typeof t.true == "function" || typeof t.false == "function" ? "checkbox" : t._type === "date" || typeof t.toLowerCase != "function" && typeof t.int != "function" && typeof t.true != "function" && typeof t.min == "function" ? "date" : "text" : "text";
}
function Rd(e, t) {
  const n = e, i = {};
  if (!n) return i;
  const s = (r) => ({ message: r, code: "schema", name: String(t) });
  return n._required && (i.required = { value: n._required.value, error: s(n._required.message) }), n._min && (i.minLength = { value: n._min.value, error: s(n._min.message) }), n._max && (i.maxLength = { value: n._max.value, error: s(n._max.message) }), n._email && (i.pattern = { value: n._email.value, error: s(n._email.message) }), i;
}
function Ld(e, t) {
  const n = [];
  let i = 1;
  for (const s in e.shape)
    if (Object.prototype.hasOwnProperty.call(e.shape, s)) {
      const r = e.shape[s], o = t == null ? void 0 : t[s], u = Td(r), c = Rd(r, s), d = r._debounce;
      n.push({
        id: i,
        name: s,
        label: s.charAt(0).toUpperCase() + s.slice(1),
        type: u,
        value: o ?? "",
        objectValue: null,
        defaultValue: o ?? "",
        errors: [],
        guides: [],
        validationOptions: c,
        options: [],
        isValid: false,
        isDirty: false,
        isPristine: true,
        isFocus: false,
        shouldValidate: true,
        debounceDelay: d
      }), i++;
    }
  return n;
}
async function xd(e) {
  const t = Ad.forFormApplication(), n = t.resolve(ht);
  if (!n)
    throw new Error("Failed to initialize form manager");
  const i = e.id ?? `form-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, s = Ld(e.schema, e.defaultValues), r = await n.createFromDescriptors(i, s);
  if (!r)
    throw new Error("Failed to create form");
  if (r.destroy = () => {
    var o;
    console.log(`[FORMULAR] Destroying form ${i} and cleaning up ServiceManager`);
    try {
      (o = t.dispose) == null || o.call(t);
    } catch (u) {
      console.warn("[FORMULAR] Error during form cleanup:", u);
    }
  }, e.onSubmit) {
    const o = async (d) => {
      await e.onSubmit(d);
    }, u = e.submissionStrategy ?? new Ei(o), c = r.submit.bind(r);
    r.submit = async () => {
      try {
        const d = await c();
        if (!d)
          return null;
        const g = await u.submit(d, r);
        return e.onSuccess && e.onSuccess(g, d), d;
      } catch (d) {
        throw e.onError && e.onError(d), d;
      }
    };
  }
  return r;
}
async function Xg(e, t) {
  const n = j.get(e);
  if (!n)
    throw new Error(`Preset "${e}" not found`);
  return xd({
    ...t,
    schema: n.schema
  });
}
function ep(e = {}, t) {
  const n = Object.create(ve.prototype);
  return ve.call(n), typeof n.initialize == "function" && n.initialize(t), Object.assign(n, e), n;
}
function tp(e = {}) {
  return {
    params: {
      validationStrategies: [],
      trackingStrategies: [],
      valueStrategies: [],
      triggerKeyWordType: []
    },
    initializer: void 0,
    addInitializer: jest.fn(),
    executeSequences: jest.fn(),
    ...e
  };
}
var np = function(e) {
  if (!e)
    throw new Error(
      "ServiceManager is not provided. Please provide a valid ServiceManager instance."
    );
  Object.defineProperties(this, {
    serviceManager: {
      get: function() {
        return e;
      },
      enumerable: true,
      configurable: false
    },
    serviceLocator: {
      get: function() {
        return e;
      },
      enumerable: true,
      configurable: false
    }
  });
};
var ip = function(e) {
  const t = /* @__PURE__ */ new Map();
  this.get = function(n) {
    if (t.has(n))
      return t.get(n);
    const i = e.resolve(n);
    return t.set(n, i), i;
  }, this.tryGet = function(n) {
    try {
      return this.get(n);
    } catch {
      return;
    }
  }, this.lazy = function(n) {
    let i = false, s;
    return () => (i || (s = this.get(n), i = true), s);
  };
};
var Gd = ((e) => (e.required = "required", e.min = "min", e.max = "max", e.minLength = "minLength", e.maxLength = "maxLength", e.pattern = "pattern", e.custom = "custom", e))(Gd || {});
var kd = class {
  constructor() {
    F(this, "constraints", []);
  }
  /**
   * Add a required validation constraint
   */
  required(t = true, n, i, s) {
    return this.constraints.push(
      new l("required").setConstraint(t).setName(s || "required").setErrorMessage(n || null).setGuideMessage(i || null)
    ), this;
  }
  /**
   * Add a min value validation constraint
   */
  min(t, n, i, s) {
    return this.constraints.push(
      new l("min").setConstraint(t).setName(s || "min").setErrorMessage(n || null).setGuideMessage(i || null)
    ), this;
  }
  /**
   * Add a max value validation constraint
   */
  max(t, n, i, s) {
    return this.constraints.push(
      new l("max").setConstraint(t).setName(s || "max").setErrorMessage(n || null).setGuideMessage(i || null)
    ), this;
  }
  /**
   * Add a minLength validation constraint
   */
  minLength(t, n, i, s) {
    return this.constraints.push(
      new l("minLength").setConstraint(t).setName(s || "minLength").setErrorMessage(n || null).setGuideMessage(i || null)
    ), this;
  }
  /**
   * Add a maxLength validation constraint
   */
  maxLength(t, n, i, s) {
    return this.constraints.push(
      new l("maxLength").setConstraint(t).setName(s || "maxLength").setErrorMessage(n || null).setGuideMessage(i || null)
    ), this;
  }
  /**
   * Add a pattern validation constraint
   */
  pattern(t, n, i, s) {
    return this.constraints.push(
      new l("pattern").setConstraint(t).setName(s || "pattern").setErrorMessage(n || null).setGuideMessage(i || null)
    ), this;
  }
  /**
   * Add a custom validation constraint
   */
  custom(t, n, i, s) {
    return this.constraints.push(
      new l("custom").setConstraint(t).setName(s || "custom").setErrorMessage(n || null).setGuideMessage(i || null)
    ), this;
  }
  /**
   * Add a raw constraint builder
   */
  addConstraint(t) {
    return this.constraints.push(t), this;
  }
  /**
   * Build all constraints
   */
  build() {
    return this.constraints.map((t) => t.build());
  }
  /**
   * Get the raw constraint builders
   */
  getConstraints() {
    return this.constraints;
  }
  /**
   * Reset the factory
   */
  reset() {
    return this.constraints = [], this;
  }
};
function sp(e, t) {
  const n = new kd();
  return e.required !== void 0 && (typeof e.required == "boolean" ? n.required(e.required, void 0, void 0, t) : n.required(
    e.required.value,
    e.required.errorMessage || void 0,
    e.required.guideMessage || void 0,
    e.required.name || t
  )), e.min !== void 0 && (typeof e.min == "number" ? n.min(e.min, void 0, void 0, t) : n.min(
    e.min.value,
    e.min.errorMessage || void 0,
    e.min.guideMessage || void 0,
    e.min.name || t
  )), e.max !== void 0 && (typeof e.max == "number" ? n.max(e.max, void 0, void 0, t) : n.max(
    e.max.value,
    e.max.errorMessage || void 0,
    e.max.guideMessage || void 0,
    e.max.name || t
  )), e.minLength !== void 0 && (typeof e.minLength == "number" ? n.minLength(e.minLength, void 0, void 0, t) : n.minLength(
    e.minLength.value,
    e.minLength.errorMessage || void 0,
    e.minLength.guideMessage || void 0,
    e.minLength.name || t
  )), e.maxLength !== void 0 && (typeof e.maxLength == "number" ? n.maxLength(e.maxLength, void 0, void 0, t) : n.maxLength(
    e.maxLength.value,
    e.maxLength.errorMessage || void 0,
    e.maxLength.guideMessage || void 0,
    e.maxLength.name || t
  )), e.pattern !== void 0 && (e.pattern instanceof RegExp ? n.pattern(e.pattern, void 0, void 0, t) : n.pattern(
    e.pattern.value,
    e.pattern.errorMessage || void 0,
    e.pattern.guideMessage || void 0,
    e.pattern.name || t
  )), e.custom !== void 0 && n.custom(
    e.custom.value,
    e.custom.errorMessage || void 0,
    e.custom.guideMessage || void 0,
    e.custom.name || t
  ), n.getConstraints();
}
var rp = {
  /**
   * Email validation preset
   */
  email: (e = true) => ({
    ...e && { required: true },
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    maxLength: 150
  }),
  /**
   * Password validation preset
   */
  password: (e = true) => ({
    ...e && { required: true },
    minLength: 8,
    maxLength: 128,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
  }),
  /**
   * Username validation preset
   */
  username: (e = true) => ({
    ...e && { required: true },
    minLength: 3,
    maxLength: 50,
    pattern: /^[a-zA-Z0-9_-]+$/
  }),
  /**
   * Phone validation preset
   */
  phone: (e = true) => ({
    ...e && { required: true },
    pattern: /^[\d\s\-+()]+$/,
    minLength: 10,
    maxLength: 20
  }),
  /**
   * URL validation preset
   */
  url: (e = true) => ({
    ...e && { required: true },
    pattern: /^https?:\/\/.+/,
    maxLength: 2048
  }),
  /**
   * Numeric range validation preset
   */
  numericRange: (e, t, n = true) => ({
    ...n && { required: true },
    min: e,
    max: t
  }),
  /**
   * Text length validation preset
   */
  textLength: (e, t, n = true) => ({
    ...n && { required: true },
    minLength: e,
    maxLength: t
  })
};
var l = function(e) {
  this.type = e, this.errorMessage = null, this.guideMessage = null, this.setConstraint = function(t) {
    return this.constraint = t, this;
  }, this.setName = function(t) {
    return this.name = t, this;
  }, this.setErrorMessage = function(t) {
    return this.errorMessage = t, this;
  }, this.setGuideMessage = function(t) {
    return this.guideMessage = t, this;
  }, this.build = function() {
    return {
      type: this.type,
      value: this.constraint,
      error: {
        message: this.errorMessage,
        code: this.type,
        name: this.name ?? this.type
      },
      guide: {
        message: this.guideMessage,
        code: this.type,
        name: this.name ?? this.type
      }
    };
  }, this.clone = function() {
    const t = new l(this.type);
    return t.type = this.type, t.constraint = this.constraint, t.errorMessage = this.errorMessage, t.guideMessage = this.guideMessage, t;
  };
};
var f = function() {
  return this.constraints = [], this.setConstraints = function(e) {
    return this.constraints = e, this;
  }, this.build = function() {
    var c, d, g, v, b, w, x;
    if (this.constraints.length === 0)
      return {};
    const e = ((c = this.constraints.find((D) => D.type === "max")) == null ? void 0 : c.build()) ?? void 0, t = ((d = this.constraints.find((D) => D.type === "min")) == null ? void 0 : d.build()) ?? void 0, n = ((g = this.constraints.find((D) => D.type === "minLength")) == null ? void 0 : g.build()) ?? void 0, i = ((v = this.constraints.find((D) => D.type === "maxLength")) == null ? void 0 : v.build()) ?? void 0, s = ((b = this.constraints.find((D) => D.type === "pattern")) == null ? void 0 : b.build()) ?? void 0, r = ((w = this.constraints.find((D) => D.type === "custom")) == null ? void 0 : w.build()) ?? void 0, o = ((x = this.constraints.find((D) => D.type === "required")) == null ? void 0 : x.build()) ?? void 0;
    return {
      max: e ? { ...e } : void 0,
      min: t ? { ...t } : void 0,
      minLength: n ? { ...n } : void 0,
      maxLength: i ? { ...i } : void 0,
      pattern: s ? { ...s } : void 0,
      custom: r ? { ...r } : void 0,
      required: o ? { ...o } : void 0
    };
  }, this.clone = function() {
    const e = new f();
    return e.setConstraints(this.constraints.map((t) => t.clone())), e;
  }, this;
};
function ap(e = {}) {
  const t = new Ot();
  return Object.assign(t, e);
}
var a = ((e) => (e.nameError = "VALIDATION.NAME.ERROR", e.nameGuide = "VALIDATION.NAME.GUIDE", e.emailError = "VALIDATION.EMAIL.ERROR", e.emailGuide = "VALIDATION.EMAIL.GUIDE", e.phoneError = "VALIDATION.PHONE.ERROR", e.phoneGuide = "VALIDATION.PHONE.GUIDE", e.passwordError = "VALIDATION.PASSWORD.ERROR", e.passwordGuide = "VALIDATION.PASSWORD.GUIDE", e.confirmPasswordError = "VALIDATION.CONFIRM_PASSWORD.ERROR", e.confirmPasswordGuide = "VALIDATION.CONFIRM_PASSWORD.GUIDE", e.dateError = "VALIDATION.DATE.ERROR", e.dateGuide = "VALIDATION.DATE.GUIDE", e.timeError = "VALIDATION.TIME.ERROR", e.timeGuide = "VALIDATION.TIME.GUIDE", e.dateTimeError = "VALIDATION.DATE_TIME.ERROR", e.dateTimeGuide = "VALIDATION.DATE_TIME.GUIDE", e.numberError = "VALIDATION.NUMBER.ERROR", e.numberGuide = "VALIDATION.NUMBER.GUIDE", e.integerError = "VALIDATION.INTEGER.ERROR", e.integerGuide = "VALIDATION.INTEGER.GUIDE", e.decimalError = "VALIDATION.DECIMAL.ERROR", e.decimalGuide = "VALIDATION.DECIMAL.GUIDE", e.urlError = "VALIDATION.URL.ERROR", e.urlGuide = "VALIDATION.URL.GUIDE", e.requiredError = "VALIDATION.REQUIRED.ERROR", e.requiredGuide = "VALIDATION.REQUIRED.GUIDE", e.minLengthError = "VALIDATION.MIN_LENGTH.ERROR", e.minLengthGuide = "VALIDATION.MIN_LENGTH.GUIDE", e.maxLengthError = "VALIDATION.MAX_LENGTH.ERROR", e.maxLengthGuide = "VALIDATION.MAX_LENGTH.GUIDE", e.minError = "VALIDATION.MIN.ERROR", e.minGuide = "VALIDATION.MIN.GUIDE", e.maxError = "VALIDATION.MAX.ERROR", e.maxGuide = "VALIDATION.MAX.GUIDE", e.patternError = "VALIDATION.PATTERN.ERROR", e.patternGuide = "VALIDATION.PATTERN.GUIDE", e.matchError = "VALIDATION.MATCH.ERROR", e.matchGuide = "VALIDATION.MATCH.GUIDE", e.uniqueError = "VALIDATION.UNIQUE.ERROR", e.uniqueGuide = "VALIDATION.UNIQUE.GUIDE", e.customError = "VALIDATION.CUSTOM.ERROR", e.customGuide = "VALIDATION.CUSTOM.GUIDE", e.betweenMaxMinError = "VALIDATION.BETWEEN.MAX.MIN.ERROR", e.betweenMaxMinGuide = "VALIDATION.BETWEEN.MAX.MIN.GUIDE", e.betweenMaxLengthMinLengthError = "VALIDATION.BETWEEN.MAX.MIN.LENGTH.ERROR", e.betweenMaxLengthMinLengthGuide = "VALIDATION.BETWEEN.MAX.MIN.LENGTH.GUIDE", e.phonePatternError = "VALIDATION.PHONE.PATTERN.ERROR", e.phonePatternGuide = "VALIDATION.PHONE.PATTERN.GUIDE", e.firstNameError = "VALIDATION.FIRST_NAME.ERROR", e.firstNameGuide = "VALIDATION.FIRST_NAME.GUIDE", e.lastNameError = "VALIDATION.LAST_NAME.ERROR", e.lastNameGuide = "VALIDATION.LAST_NAME.GUIDE", e.fullNameError = "VALIDATION.FULL_NAME.ERROR", e.fullNameGuide = "VALIDATION.FULL_NAME.GUIDE", e.passwordStrongError = "VALIDATION.PASSWORD.STRONG.ERROR", e.passwordStrongGuide = "VALIDATION.PASSWORD.STRONG.GUIDE", e.passwordMediumError = "VALIDATION.PASSWORD.MEDIUM.ERROR", e.passwordMediumGuide = "VALIDATION.PASSWORD.MEDIUM.GUIDE", e.urlPatternError = "VALIDATION.URL.PATTERN.ERROR", e.urlPatternGuide = "VALIDATION.URL.PATTERN.GUIDE", e.creditCardError = "VALIDATION.CREDIT_CARD.ERROR", e.creditCardGuide = "VALIDATION.CREDIT_CARD.GUIDE", e.postalCodeError = "VALIDATION.POSTAL_CODE.ERROR", e.postalCodeGuide = "VALIDATION.POSTAL_CODE.GUIDE", e.ssnError = "VALIDATION.SSN.ERROR", e.ssnGuide = "VALIDATION.SSN.GUIDE", e.currencyError = "VALIDATION.CURRENCY.ERROR", e.currencyGuide = "VALIDATION.CURRENCY.GUIDE", e.ageError = "VALIDATION.AGE.ERROR", e.ageGuide = "VALIDATION.AGE.GUIDE", e.usernameError = "VALIDATION.USERNAME.ERROR", e.usernameGuide = "VALIDATION.USERNAME.GUIDE", e.phoneCountryError = "VALIDATION.PHONE.COUNTRY.ERROR", e.phoneCountryGuide = "VALIDATION.PHONE.COUNTRY.GUIDE", e.postalCodeCountryError = "VALIDATION.POSTAL_CODE.COUNTRY.ERROR", e.postalCodeCountryGuide = "VALIDATION.POSTAL_CODE.COUNTRY.GUIDE", e.ssnCountryError = "VALIDATION.SSN.COUNTRY.ERROR", e.ssnCountryGuide = "VALIDATION.SSN.COUNTRY.GUIDE", e.phoneMultiCountryError = "VALIDATION.PHONE.MULTI_COUNTRY.ERROR", e.phoneMultiCountryGuide = "VALIDATION.PHONE.MULTI_COUNTRY.GUIDE", e.postalCodeMultiCountryError = "VALIDATION.POSTAL_CODE.MULTI_COUNTRY.ERROR", e.postalCodeMultiCountryGuide = "VALIDATION.POSTAL_CODE.MULTI_COUNTRY.GUIDE", e.ssnMultiCountryError = "VALIDATION.SSN.MULTI_COUNTRY.ERROR", e.ssnMultiCountryGuide = "VALIDATION.SSN.MULTI_COUNTRY.GUIDE", e.phoneSwitzerlandError = "VALIDATION.PHONE.SWITZERLAND.ERROR", e.phoneSwitzerlandGuide = "VALIDATION.PHONE.SWITZERLAND.GUIDE", e.postalCodeSwitzerlandError = "VALIDATION.POSTAL_CODE.SWITZERLAND.ERROR", e.postalCodeSwitzerlandGuide = "VALIDATION.POSTAL_CODE.SWITZERLAND.GUIDE", e.ssnSwitzerlandError = "VALIDATION.SSN.SWITZERLAND.ERROR", e.ssnSwitzerlandGuide = "VALIDATION.SSN.SWITZERLAND.GUIDE", e))(a || {});
var op = (e, t) => new l("max").setConstraint(t).setName(e).setErrorMessage(a.maxError).setGuideMessage(a.maxGuide);
var up = (e, t) => new l("maxLength").setConstraint(t).setName(e).setErrorMessage(a.maxLengthError).setGuideMessage(a.maxLengthGuide);
var cp = (e, t) => new l("min").setConstraint(t).setName(e).setErrorMessage(a.minError).setGuideMessage(a.minGuide);
var lp = (e, t) => new l("minLength").setConstraint(t).setName(e).setErrorMessage(a.minLengthError).setGuideMessage(a.minLengthGuide);
var dp = (e, t) => new l("pattern").setConstraint(t).setName(e).setErrorMessage(a.patternError).setGuideMessage(a.patternGuide);
var hp = (e, t) => new l("required").setConstraint(t).setName(e).setErrorMessage(a.requiredError).setGuideMessage(a.requiredGuide);
var gp = (e, t, n) => new f().setConstraints([
  new l("max").setConstraint(t).setName(e).setErrorMessage(a.maxError).setGuideMessage(a.maxGuide),
  new l("maxLength").setConstraint(n).setName(e).setErrorMessage(a.maxLengthError).setGuideMessage(a.maxLengthGuide)
]);
var pp = (e, t, n) => new f().setConstraints([
  new l("max").setConstraint(t).setName(e).setErrorMessage(a.maxError).setGuideMessage(a.maxGuide),
  new l("minLength").setConstraint(n).setName(e).setErrorMessage(a.minLengthError).setGuideMessage(a.minLengthGuide)
]);
var mp = (e, t, n) => new f().setConstraints([
  new l("min").setConstraint(t).setName(e).setErrorMessage(a.minError).setGuideMessage(a.minGuide),
  new l("maxLength").setConstraint(n).setName(e).setErrorMessage(a.maxLengthError).setGuideMessage(a.maxLengthGuide)
]);
var fp = (e, t, n) => new f().setConstraints([
  new l("min").setConstraint(t).setName(e).setErrorMessage(a.minError).setGuideMessage(a.minGuide),
  new l("minLength").setConstraint(n).setName(e).setErrorMessage(a.minLengthError).setGuideMessage(a.minLengthGuide)
]);
var yp = (e, t, n) => new f().setConstraints([
  new l("minLength").setConstraint(t).setName(e).setErrorMessage(a.minLengthError).setGuideMessage(a.minLengthGuide),
  new l("maxLength").setConstraint(n).setName(e).setErrorMessage(a.maxLengthError).setGuideMessage(a.maxLengthGuide)
]);
var vp = (e, t, n) => new f().setConstraints([
  new l("min").setConstraint(t).setName(e).setErrorMessage(a.minError).setGuideMessage(a.minGuide),
  new l("max").setConstraint(n).setName(e).setErrorMessage(a.maxError).setGuideMessage(a.maxGuide)
]);
var bp = (e, t, n, i) => new f().setConstraints([
  new l("max").setConstraint(t).setName(e).setErrorMessage(a.maxError).setGuideMessage(a.maxGuide),
  new l("minLength").setConstraint(n).setName(e).setErrorMessage(a.minLengthError).setGuideMessage(a.minLengthGuide),
  new l("maxLength").setConstraint(i).setName(e).setErrorMessage(a.maxLengthError).setGuideMessage(a.maxLengthGuide)
]);
var Mp = (e, t, n, i) => new f().setConstraints([
  new l("min").setConstraint(t).setName(e).setErrorMessage(a.minError).setGuideMessage(a.minGuide),
  new l("max").setConstraint(n).setName(e).setErrorMessage(a.maxError).setGuideMessage(a.maxGuide),
  new l("maxLength").setConstraint(i).setName(e).setErrorMessage(a.maxLengthError).setGuideMessage(a.maxLengthGuide)
]);
var Ep = (e, t, n, i) => new f().setConstraints([
  new l("min").setConstraint(t).setName(e).setErrorMessage(a.minError).setGuideMessage(a.minGuide),
  new l("max").setConstraint(n).setName(e).setErrorMessage(a.maxError).setGuideMessage(a.maxGuide),
  new l("minLength").setConstraint(i).setName(e).setErrorMessage(a.minLengthError).setGuideMessage(a.minLengthGuide)
]);
var Sp = (e, t, n, i) => new f().setConstraints([
  new l("min").setConstraint(t).setName(e).setErrorMessage(a.minError).setGuideMessage(a.minGuide),
  new l("minLength").setConstraint(n).setName(e).setErrorMessage(a.minLengthError).setGuideMessage(a.minLengthGuide),
  new l("maxLength").setConstraint(i).setName(e).setErrorMessage(a.maxLengthError).setGuideMessage(a.maxLengthGuide)
]);
var Cp = (e, t, n, i, s) => new f().setConstraints([
  new l("min").setConstraint(t).setName(e).setErrorMessage(a.minError).setGuideMessage(a.minGuide),
  new l("max").setConstraint(n).setName(e).setErrorMessage(a.maxError).setGuideMessage(a.maxGuide),
  new l("minLength").setConstraint(i).setName(e).setErrorMessage(a.minLengthError).setGuideMessage(a.minLengthGuide),
  new l("maxLength").setConstraint(s).setName(e).setErrorMessage(a.maxLengthError).setGuideMessage(a.maxLengthGuide)
]);
var Ip = (e, t, n) => new f().setConstraints([
  new l("min").setConstraint(t).setName(e).setErrorMessage(a.dateError).setGuideMessage(a.dateGuide),
  new l("max").setConstraint(n).setName(e).setErrorMessage(a.dateError).setGuideMessage(a.dateGuide)
]);
var Np = (e) => new f().setConstraints([
  new l("minLength").setConstraint(3).setName(e).setErrorMessage(a.nameError).setGuideMessage(a.nameGuide),
  new l("maxLength").setConstraint(50).setName(e).setErrorMessage(a.nameError).setGuideMessage(a.nameGuide)
]);
var Pd = /^\d*$/;
var wp = /^[a-zA-Z\-_\s]*$/;
var Op = /^(0[1-9]|[12]\d|3[01])\/?-?\.?(0[1-9]|1[01,2])\/?-?\.?(19|20)\d{2}$/;
var Vd = /^(19|20)\d{2}\/?-?\.?(0[1-9]|1[01,2])\/?-?\.?(0[1-9]|[12]\d|3[01])$/;
var Ap = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
var Dt = /^(\+\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
var Dp = /^[\d+\-().\s]{7,20}$/;
var zt = {
  US: /^(\+1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
  CA: /^(\+1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
  UK: /^(\+44[-.\s]?)?(0\d{4}[-.\s]?\d{6}|\d{5}[-.\s]?\d{6})$/,
  DE: /^(\+49[-.\s]?)?\(?\d{3,5}\)?[-.\s]?\d{6,8}$/,
  FR: /^(\+33[-.\s]?)?\(?\d{1,2}\)?[-.\s]?\d{2}[-.\s]?\d{2}[-.\s]?\d{2}[-.\s]?\d{2}$/,
  CH: /^(\+41[-.\s]?)?\(?\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{2}[-.\s]?\d{2}$/,
  IT: /^(\+39[-.\s]?)?\(?\d{2,3}\)?[-.\s]?\d{6,8}$/,
  ES: /^(\+34[-.\s]?)?\d{3}[-.\s]?\d{3}[-.\s]?\d{3}$/,
  AT: /^(\+43[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{6,7}$/,
  NL: /^(\+31[-.\s]?)?\(?\d{2,3}\)?[-.\s]?\d{7,8}$/,
  BE: /^(\+32[-.\s]?)?\(?\d{1,2}\)?[-.\s]?\d{3}[-.\s]?\d{2}[-.\s]?\d{2}$/,
  LU: /^(\+352[-.\s]?)?\d{3}[-.\s]?\d{3}[-.\s]?\d{3}$/
};
var _d = /^[a-zA-Z]+([',. -][a-zA-Z]+)*$/;
var Fd = /^[a-zA-Z]+([',. -][a-zA-Z]+)*$/;
var Bd = /^[a-zA-Z]+([',. -][a-zA-Z]+)*\s+[a-zA-Z]+([',. -][a-zA-Z]+)*$/;
var jd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
var Ud = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/;
var zd = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w .-]*)*\/?$/;
var qd = /^(?:4\d{15}|5[1-5]\d{14}|3[47]\d{13})$/;
var $t = /^\d{5}(-\d{4})?$/;
var Hd = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
var Wd = /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s?\d[A-Za-z]{2}$/;
var qt = {
  US: /^\d{5}(-\d{4})?$/,
  CA: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
  UK: /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s?\d[A-Za-z]{2}$/,
  DE: /^\d{5}$/,
  FR: /^\d{5}$/,
  CH: /^\d{4}$/,
  // Switzerland postal codes (NPA)
  IT: /^\d{5}$/,
  ES: /^\d{5}$/,
  AT: /^\d{4}$/,
  NL: /^\d{4}\s?[A-Za-z]{2}$/,
  BE: /^\d{4}$/,
  LU: /^L?-?\d{4}$/
};
var Tt = /^\d{3}-?\d{2}-?\d{4}$/;
var Ht = {
  US: /^\d{3}-?\d{2}-?\d{4}$/,
  CA: /^\d{3}[-.\s]?\d{3}[-.\s]?\d{3}$/,
  // Canadian SIN
  UK: /^[A-Za-z]{2}\d{6}[A-Za-z]$/,
  // UK National Insurance Number
  DE: /^\d{2}\s?\d{6}\s?[A-Za-z]\s?\d{3}$/,
  // German ID
  FR: /^[12]\d{2}(0[1-9]|1[0-2])\d{2}\d{3}\d{3}\d{2}$/,
  // French INSEE
  CH: /^756\.\d{4}\.\d{4}\.\d{2}$/,
  // Swiss AHV number
  IT: /^[A-Za-z]{6}\d{2}[A-Za-z]\d{2}[A-Za-z]\d{3}[A-ZaZ]$/,
  // Italian Codice Fiscale
  ES: /^\d{8}[A-Za-z]$/,
  // Spanish DNI
  AT: /^\d{4}\s?\d{6}$/,
  // Austrian Social Security
  NL: /^\d{9}$/,
  // Dutch BSN
  BE: /^\d{2}\.\d{2}\.\d{2}-\d{3}\.\d{2}$/,
  // Belgian National Number
  LU: /^\d{13}$/
  // Luxembourg ID
};
var Yd = /^\$?[\d,]+(\.\d{2})?$/;
var Zd = /^([01]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/;
var $p = /^(0?[1-9]|1[0-2]):[0-5]\d\s?(AM|PM|am|pm)$/;
var Jd = /^(?:[1-9]|[1-9]\d|1[01]\d|120)$/;
var Kd = /^[a-zA-Z0-9_-]{3,20}$/;
var de = {
  US: { name: "United States", code: "US", phonePrefix: "+1" },
  CA: { name: "Canada", code: "CA", phonePrefix: "+1" },
  UK: { name: "United Kingdom", code: "UK", phonePrefix: "+44" },
  DE: { name: "Germany", code: "DE", phonePrefix: "+49" },
  FR: { name: "France", code: "FR", phonePrefix: "+33" },
  CH: { name: "Switzerland", code: "CH", phonePrefix: "+41" },
  IT: { name: "Italy", code: "IT", phonePrefix: "+39" },
  ES: { name: "Spain", code: "ES", phonePrefix: "+34" },
  AT: { name: "Austria", code: "AT", phonePrefix: "+43" },
  NL: { name: "Netherlands", code: "NL", phonePrefix: "+31" },
  BE: { name: "Belgium", code: "BE", phonePrefix: "+32" },
  LU: { name: "Luxembourg", code: "LU", phonePrefix: "+352" }
};
var M = {
  getPattern(e, t) {
    switch (e) {
      case "phone":
        return zt[t];
      case "postal":
        return qt[t];
      case "ssn":
        return Ht[t];
      default:
        return;
    }
  },
  getAvailableCountries(e) {
    if (!e)
      return Object.keys(de);
    switch (e) {
      case "phone":
        return Object.keys(zt);
      case "postal":
        return Object.keys(qt);
      case "ssn":
        return Object.keys(Ht);
      default:
        return [];
    }
  },
  getCountryName(e) {
    var t;
    return ((t = de[e]) == null ? void 0 : t.name) || e;
  },
  getPhonePrefix(e) {
    var t;
    return ((t = de[e]) == null ? void 0 : t.phonePrefix) || "";
  },
  createMultiCountryPattern(e, t) {
    const n = t.map((i) => this.getPattern(e, i)).filter(Boolean).map((i) => i.source);
    if (n.length !== 0)
      return n.length === 1 ? new RegExp(n[0]) : new RegExp(`(${n.join("|")})`);
  }
};
var Qd = (e, t = true) => {
  const n = [];
  return t && n.push(
    new l("required").setConstraint(true).setName(e).setErrorMessage(a.ageError).setGuideMessage(a.ageGuide)
  ), n.push(
    new l("pattern").setConstraint(Jd).setName(e).setErrorMessage(a.ageError).setGuideMessage(a.ageGuide)
  ), n.push(
    new l("min").setConstraint(1).setName(e).setErrorMessage(a.ageError).setGuideMessage(a.ageGuide)
  ), n.push(
    new l("max").setConstraint(120).setName(e).setErrorMessage(a.ageError).setGuideMessage(a.ageGuide)
  ), new f().setConstraints(n);
};
var Xd = (e, t = true) => {
  const n = [];
  return t && n.push(
    new l("required").setConstraint(true).setName(e).setErrorMessage(a.creditCardError).setGuideMessage(a.creditCardGuide)
  ), n.push(
    new l("pattern").setConstraint(qd).setName(e).setErrorMessage(a.creditCardError).setGuideMessage(a.creditCardGuide)
  ), n.push(
    new l("minLength").setConstraint(13).setName(e).setErrorMessage(a.creditCardError).setGuideMessage(a.creditCardGuide)
  ), n.push(
    new l("maxLength").setConstraint(19).setName(e).setErrorMessage(a.creditCardError).setGuideMessage(a.creditCardGuide)
  ), new f().setConstraints(n);
};
var eh = (e, t = true) => {
  const n = [];
  return t && n.push(
    new l("required").setConstraint(true).setName(e).setErrorMessage(a.currencyError).setGuideMessage(a.currencyGuide)
  ), n.push(
    new l("pattern").setConstraint(Yd).setName(e).setErrorMessage(a.currencyError).setGuideMessage(a.currencyGuide)
  ), n.push(
    new l("maxLength").setConstraint(20).setName(e).setErrorMessage(a.currencyError).setGuideMessage(a.currencyGuide)
  ), new f().setConstraints(n);
};
var th = (e, t = true, n, i) => {
  const s = [];
  return t && s.push(
    new l("required").setConstraint(true).setName(e).setErrorMessage(a.dateError).setGuideMessage(a.dateGuide)
  ), s.push(
    new l("pattern").setConstraint(Vd).setName(e).setErrorMessage(a.dateError).setGuideMessage(a.dateGuide)
  ), n && s.push(
    new l("min").setConstraint(n.getTime()).setName(e).setErrorMessage(a.dateError).setGuideMessage(a.dateGuide)
  ), i && s.push(
    new l("max").setConstraint(i.getTime()).setName(e).setErrorMessage(a.dateError).setGuideMessage(a.dateGuide)
  ), new f().setConstraints(s);
};
var nh = (e, t = true) => {
  const n = [];
  return t && n.push(
    new l("required").setConstraint(true).setName(e).setErrorMessage(a.firstNameError).setGuideMessage(a.firstNameGuide)
  ), n.push(
    new l("pattern").setConstraint(_d).setName(e).setErrorMessage(a.firstNameError).setGuideMessage(a.firstNameGuide)
  ), n.push(
    new l("minLength").setConstraint(2).setName(e).setErrorMessage(a.firstNameError).setGuideMessage(a.firstNameGuide)
  ), n.push(
    new l("maxLength").setConstraint(50).setName(e).setErrorMessage(a.firstNameError).setGuideMessage(a.firstNameGuide)
  ), new f().setConstraints(n);
};
var ih = (e, t = true) => {
  const n = [];
  return t && n.push(
    new l("required").setConstraint(true).setName(e).setErrorMessage(a.fullNameError).setGuideMessage(a.fullNameGuide)
  ), n.push(
    new l("pattern").setConstraint(Bd).setName(e).setErrorMessage(a.fullNameError).setGuideMessage(a.fullNameGuide)
  ), n.push(
    new l("minLength").setConstraint(3).setName(e).setErrorMessage(a.fullNameError).setGuideMessage(a.fullNameGuide)
  ), n.push(
    new l("maxLength").setConstraint(100).setName(e).setErrorMessage(a.fullNameError).setGuideMessage(a.fullNameGuide)
  ), new f().setConstraints(n);
};
var sh = (e, t = true) => {
  const n = [];
  return t && n.push(
    new l("required").setConstraint(true).setName(e).setErrorMessage(a.lastNameError).setGuideMessage(a.lastNameGuide)
  ), n.push(
    new l("pattern").setConstraint(Fd).setName(e).setErrorMessage(a.lastNameError).setGuideMessage(a.lastNameGuide)
  ), n.push(
    new l("minLength").setConstraint(2).setName(e).setErrorMessage(a.lastNameError).setGuideMessage(a.lastNameGuide)
  ), n.push(
    new l("maxLength").setConstraint(50).setName(e).setErrorMessage(a.lastNameError).setGuideMessage(a.lastNameGuide)
  ), new f().setConstraints(n);
};
var rh = (e, t = true, n, i) => {
  const s = [];
  return t && s.push(
    new l("required").setConstraint(true).setName(e).setErrorMessage(a.numberError).setGuideMessage(a.numberGuide)
  ), s.push(
    new l("pattern").setConstraint(Pd).setName(e).setErrorMessage(a.numberError).setGuideMessage(a.numberGuide)
  ), n !== void 0 && s.push(
    new l("min").setConstraint(n).setName(e).setErrorMessage(a.minError).setGuideMessage(a.minGuide)
  ), i !== void 0 && s.push(
    new l("max").setConstraint(i).setName(e).setErrorMessage(a.maxError).setGuideMessage(a.maxGuide)
  ), new f().setConstraints(s);
};
var ah = (e, t = true) => {
  const n = [];
  return t && n.push(
    new l("required").setConstraint(true).setName(e).setErrorMessage(a.passwordError).setGuideMessage(a.passwordGuide)
  ), n.push(
    new l("pattern").setConstraint(Ud).setName(e).setErrorMessage(a.passwordMediumError).setGuideMessage(a.passwordMediumGuide)
  ), n.push(
    new l("minLength").setConstraint(6).setName(e).setErrorMessage(a.passwordError).setGuideMessage(a.passwordGuide)
  ), n.push(
    new l("maxLength").setConstraint(128).setName(e).setErrorMessage(a.passwordError).setGuideMessage(a.passwordGuide)
  ), new f().setConstraints(n);
};
var oh = (e, t = true) => {
  const n = [];
  return t && n.push(
    new l("required").setConstraint(true).setName(e).setErrorMessage(a.passwordError).setGuideMessage(a.passwordGuide)
  ), n.push(
    new l("pattern").setConstraint(jd).setName(e).setErrorMessage(a.passwordStrongError).setGuideMessage(a.passwordStrongGuide)
  ), n.push(
    new l("minLength").setConstraint(8).setName(e).setErrorMessage(a.passwordError).setGuideMessage(a.passwordGuide)
  ), n.push(
    new l("maxLength").setConstraint(128).setName(e).setErrorMessage(a.passwordError).setGuideMessage(a.passwordGuide)
  ), new f().setConstraints(n);
};
var uh = (e, t = true) => {
  const n = [];
  return t && n.push(
    new l("required").setConstraint(true).setName(e).setErrorMessage(a.phoneError).setGuideMessage(a.phoneGuide)
  ), n.push(
    new l("pattern").setConstraint(Dt).setName(e).setErrorMessage(a.phonePatternError).setGuideMessage(a.phonePatternGuide)
  ), n.push(
    new l("minLength").setConstraint(7).setName(e).setErrorMessage(a.phoneError).setGuideMessage(a.phoneGuide)
  ), n.push(
    new l("maxLength").setConstraint(20).setName(e).setErrorMessage(a.phoneError).setGuideMessage(a.phoneGuide)
  ), new f().setConstraints(n);
};
var ch = (e, t = "US", n = true) => {
  const i = [];
  n && i.push(
    new l("required").setConstraint(true).setName(e).setErrorMessage(a.postalCodeError).setGuideMessage(a.postalCodeGuide)
  );
  let s;
  switch (t) {
    case "CA":
      s = Hd;
      break;
    case "UK":
      s = Wd;
      break;
    default:
      s = $t;
      break;
  }
  return i.push(
    new l("pattern").setConstraint(s).setName(e).setErrorMessage(a.postalCodeError).setGuideMessage(a.postalCodeGuide)
  ), new f().setConstraints(i);
};
var lh = (e, t = true) => {
  const n = [];
  return t && n.push(
    new l("required").setConstraint(true).setName(e).setErrorMessage(a.ssnError).setGuideMessage(a.ssnGuide)
  ), n.push(
    new l("pattern").setConstraint(Tt).setName(e).setErrorMessage(a.ssnError).setGuideMessage(a.ssnGuide)
  ), n.push(
    new l("minLength").setConstraint(9).setName(e).setErrorMessage(a.ssnError).setGuideMessage(a.ssnGuide)
  ), n.push(
    new l("maxLength").setConstraint(11).setName(e).setErrorMessage(a.ssnError).setGuideMessage(a.ssnGuide)
  ), new f().setConstraints(n);
};
var dh = (e, t = true) => {
  const n = [];
  return t && n.push(
    new l("required").setConstraint(true).setName(e).setErrorMessage(a.timeError).setGuideMessage(a.timeGuide)
  ), n.push(
    new l("pattern").setConstraint(Zd).setName(e).setErrorMessage(a.timeError).setGuideMessage(a.timeGuide)
  ), n.push(
    new l("minLength").setConstraint(5).setName(e).setErrorMessage(a.timeError).setGuideMessage(a.timeGuide)
  ), n.push(
    new l("maxLength").setConstraint(8).setName(e).setErrorMessage(a.timeError).setGuideMessage(a.timeGuide)
  ), new f().setConstraints(n);
};
var hh = (e, t = true) => {
  const n = [];
  return t && n.push(
    new l("required").setConstraint(true).setName(e).setErrorMessage(a.urlError).setGuideMessage(a.urlGuide)
  ), n.push(
    new l("pattern").setConstraint(zd).setName(e).setErrorMessage(a.urlPatternError).setGuideMessage(a.urlPatternGuide)
  ), n.push(
    new l("maxLength").setConstraint(2048).setName(e).setErrorMessage(a.urlError).setGuideMessage(a.urlGuide)
  ), new f().setConstraints(n);
};
var gh = (e, t = true) => {
  const n = [];
  return t && n.push(
    new l("required").setConstraint(true).setName(e).setErrorMessage(a.usernameError).setGuideMessage(a.usernameGuide)
  ), n.push(
    new l("pattern").setConstraint(Kd).setName(e).setErrorMessage(a.usernameError).setGuideMessage(a.usernameGuide)
  ), n.push(
    new l("minLength").setConstraint(3).setName(e).setErrorMessage(a.usernameError).setGuideMessage(a.usernameGuide)
  ), n.push(
    new l("maxLength").setConstraint(20).setName(e).setErrorMessage(a.usernameError).setGuideMessage(a.usernameGuide)
  ), new f().setConstraints(n);
};
var ph = (e, t = ["phone", "postal", "ssn"], n = true) => {
  const i = [];
  n && i.push(
    new l("required").setConstraint(true).setName(e).setErrorMessage(a.requiredError).setGuideMessage("Please select a country")
  );
  const s = yh(t), r = new RegExp(`^(${s.join("|")})$`);
  return i.push(
    new l("pattern").setConstraint(r).setName(e).setErrorMessage("Invalid country selection").setGuideMessage(
      `Select from: ${s.map((o) => M.getCountryName(o)).join(", ")}`
    )
  ), new f().setConstraints(i);
};
var mh = (e, t = ["phone", "postal", "ssn"], n = true, i = 1, s = 5) => {
  const r = [];
  return n && r.push(
    new l("required").setConstraint(true).setName(e).setErrorMessage(a.requiredError).setGuideMessage("Please select at least one country")
  ), r.push(
    new l("min").setConstraint(i).setName(e).setErrorMessage(
      `Select at least ${i} ${i === 1 ? "country" : "countries"}`
    ).setGuideMessage(
      `Minimum ${i} ${i === 1 ? "country" : "countries"} required`
    )
  ), r.push(
    new l("max").setConstraint(s).setName(e).setErrorMessage(`Select at most ${s} countries`).setGuideMessage(`Maximum ${s} countries allowed`)
  ), new f().setConstraints(r);
};
var fh = (e, t = true) => {
  const n = [];
  return t && n.push(
    new l("required").setConstraint(true).setName(e).setErrorMessage(a.requiredError).setGuideMessage("Country selection is required")
  ), n.push(
    new l("custom").setConstraint((i) => typeof i == "string" ? i === "CH" : Array.isArray(i) && i.includes("CH")).setName(e).setErrorMessage("Switzerland must be included in the selection").setGuideMessage("Please include Switzerland (CH) in your country selection")
  ), new f().setConstraints(n);
};
function yh(e) {
  return Object.keys(de).filter((n) => e.every((i) => M.getAvailableCountries(i).includes(n)));
}
function Tp() {
  return Object.keys(de).map((e) => {
    const t = e;
    return {
      code: t,
      name: M.getCountryName(t),
      phonePrefix: M.getPhonePrefix(t),
      supports: {
        phone: M.getAvailableCountries("phone").includes(t),
        postal: M.getAvailableCountries("postal").includes(t),
        ssn: M.getAvailableCountries("ssn").includes(t)
      }
    };
  });
}
function Rp(e) {
  return {
    country: M.getCountryName(e),
    patterns: {
      phone: M.getPattern("phone", e),
      postal: M.getPattern("postal", e),
      ssn: M.getPattern("ssn", e)
    },
    examples: vh(e)
  };
}
function vh(e) {
  return {
    US: { phone: "+1 (555) 123-4567", postal: "12345-6789", ssn: "123-45-6789" },
    CA: { phone: "+1 (416) 555-0123", postal: "K1A 0A6", ssn: "123 456 789" },
    UK: { phone: "+44 20 7946 0958", postal: "SW1A 1AA", ssn: "AB123456C" },
    DE: { phone: "+49 30 12345678", postal: "10115", ssn: "12 345678 A 123" },
    FR: { phone: "+33 1 23 45 67 89", postal: "75001", ssn: "1234567890123" },
    CH: { phone: "+41 44 123 45 67", postal: "8001", ssn: "756.1234.5678.90" },
    IT: { phone: "+39 06 1234 5678", postal: "00118", ssn: "RSSMRA85T10A562S" },
    ES: { phone: "+34 91 123 4567", postal: "28001", ssn: "12345678Z" },
    AT: { phone: "+43 1 1234567", postal: "1010", ssn: "1234 567890" },
    NL: { phone: "+31 20 123 4567", postal: "1012 JS", ssn: "123456789" },
    BE: { phone: "+32 2 123 45 67", postal: "1000", ssn: "12.34.56-789.01" },
    LU: { phone: "+352 123 456 789", postal: "L-1111", ssn: "1234567890123" }
  }[e] || {};
}
var Si = (e, t, n = true) => {
  const i = [], s = M.getCountryName(t), r = M.getPhonePrefix(t), o = M.getPattern("phone", t) || Dt;
  n && i.push(
    new l("required").setConstraint(true).setName(e).setErrorMessage(a.phoneCountryError).setGuideMessage(a.phoneCountryGuide)
  ), i.push(
    new l("pattern").setConstraint(o).setName(e).setErrorMessage(a.phoneCountryError).setGuideMessage(
      `Enter a valid ${s} phone number (e.g., ${r} format)`
    )
  );
  const u = Eh(t);
  i.push(
    new l("minLength").setConstraint(u).setName(e).setErrorMessage(a.phoneCountryError).setGuideMessage(a.phoneCountryGuide)
  );
  const c = Sh(t);
  return i.push(
    new l("maxLength").setConstraint(c).setName(e).setErrorMessage(a.phoneCountryError).setGuideMessage(a.phoneCountryGuide)
  ), new f().setConstraints(i);
};
var bh = (e, t, n = true) => {
  const i = [], s = t.map((o) => M.getCountryName(o)).join(", "), r = M.createMultiCountryPattern("phone", t) || Dt;
  return n && i.push(
    new l("required").setConstraint(true).setName(e).setErrorMessage(a.phoneMultiCountryError).setGuideMessage(a.phoneMultiCountryGuide)
  ), i.push(
    new l("pattern").setConstraint(r).setName(e).setErrorMessage(a.phoneMultiCountryError).setGuideMessage(`Enter a valid phone number for: ${s}`)
  ), i.push(
    new l("minLength").setConstraint(7).setName(e).setErrorMessage(a.phoneMultiCountryError).setGuideMessage(a.phoneMultiCountryGuide)
  ), i.push(
    new l("maxLength").setConstraint(25).setName(e).setErrorMessage(a.phoneMultiCountryError).setGuideMessage(a.phoneMultiCountryGuide)
  ), new f().setConstraints(i);
};
var Mh = (e, t = true) => Si(e, "CH", t);
function Eh(e) {
  return {
    US: 10,
    CA: 10,
    UK: 10,
    DE: 11,
    FR: 10,
    CH: 9,
    IT: 9,
    ES: 9,
    AT: 10,
    NL: 9,
    BE: 9,
    LU: 8
  }[e] || 7;
}
function Sh(e) {
  return {
    US: 15,
    CA: 15,
    UK: 15,
    DE: 16,
    FR: 16,
    CH: 13,
    IT: 15,
    ES: 13,
    AT: 15,
    NL: 13,
    BE: 13,
    LU: 12
  }[e] || 20;
}
var Ci = (e, t, n = true) => {
  const i = [], s = M.getCountryName(t), r = M.getPattern("postal", t) || $t;
  n && i.push(
    new l("required").setConstraint(true).setName(e).setErrorMessage(a.postalCodeCountryError).setGuideMessage(a.postalCodeCountryGuide)
  ), i.push(
    new l("pattern").setConstraint(r).setName(e).setErrorMessage(a.postalCodeCountryError).setGuideMessage(
      `Enter a valid ${s} postal code ${Oh(t)}`
    )
  );
  const { minLength: o, maxLength: u } = wh(t);
  return i.push(
    new l("minLength").setConstraint(o).setName(e).setErrorMessage(a.postalCodeCountryError).setGuideMessage(a.postalCodeCountryGuide)
  ), i.push(
    new l("maxLength").setConstraint(u).setName(e).setErrorMessage(a.postalCodeCountryError).setGuideMessage(a.postalCodeCountryGuide)
  ), new f().setConstraints(i);
};
var Ch = (e, t, n = true) => {
  const i = [], s = t.map((o) => M.getCountryName(o)).join(", "), r = M.createMultiCountryPattern("postal", t) || $t;
  return n && i.push(
    new l("required").setConstraint(true).setName(e).setErrorMessage(a.postalCodeMultiCountryError).setGuideMessage(a.postalCodeMultiCountryGuide)
  ), i.push(
    new l("pattern").setConstraint(r).setName(e).setErrorMessage(a.postalCodeMultiCountryError).setGuideMessage(`Enter a valid postal code for: ${s}`)
  ), i.push(
    new l("minLength").setConstraint(3).setName(e).setErrorMessage(a.postalCodeMultiCountryError).setGuideMessage(a.postalCodeMultiCountryGuide)
  ), i.push(
    new l("maxLength").setConstraint(10).setName(e).setErrorMessage(a.postalCodeMultiCountryError).setGuideMessage(a.postalCodeMultiCountryGuide)
  ), new f().setConstraints(i);
};
var Ih = (e, t = true) => Ci(e, "CH", t);
var Nh = (e, t = true) => {
  const n = [];
  return t && n.push(
    new l("required").setConstraint(true).setName(e).setErrorMessage(a.postalCodeSwitzerlandError).setGuideMessage(a.postalCodeSwitzerlandGuide)
  ), n.push(
    new l("pattern").setConstraint(/^\d{4}$/).setName(e).setErrorMessage(a.postalCodeSwitzerlandError).setGuideMessage("Enter a valid Swiss NPA (4-digit postal code, e.g., 8001 for Zurich)")
  ), n.push(
    new l("minLength").setConstraint(4).setName(e).setErrorMessage(a.postalCodeSwitzerlandError).setGuideMessage(a.postalCodeSwitzerlandGuide)
  ), n.push(
    new l("maxLength").setConstraint(4).setName(e).setErrorMessage(a.postalCodeSwitzerlandError).setGuideMessage(a.postalCodeSwitzerlandGuide)
  ), new f().setConstraints(n);
};
function wh(e) {
  return {
    US: { minLength: 5, maxLength: 10 },
    CA: { minLength: 6, maxLength: 7 },
    UK: { minLength: 6, maxLength: 8 },
    DE: { minLength: 5, maxLength: 5 },
    FR: { minLength: 5, maxLength: 5 },
    CH: { minLength: 4, maxLength: 4 },
    IT: { minLength: 5, maxLength: 5 },
    ES: { minLength: 5, maxLength: 5 },
    AT: { minLength: 4, maxLength: 4 },
    NL: { minLength: 6, maxLength: 7 },
    BE: { minLength: 4, maxLength: 4 },
    LU: { minLength: 4, maxLength: 6 }
  }[e] || { minLength: 3, maxLength: 10 };
}
function Oh(e) {
  return {
    US: "(e.g., 12345 or 12345-6789)",
    CA: "(e.g., K1A 0A6)",
    UK: "(e.g., SW1A 1AA)",
    DE: "(e.g., 10115)",
    FR: "(e.g., 75001)",
    CH: "(e.g., 8001)",
    IT: "(e.g., 00118)",
    ES: "(e.g., 28001)",
    AT: "(e.g., 1010)",
    NL: "(e.g., 1012 JS)",
    BE: "(e.g., 1000)",
    LU: "(e.g., L-1111)"
  }[e] || "";
}
var Ii = (e, t, n = true) => {
  const i = [], s = M.getCountryName(t), r = M.getPattern("ssn", t) || Tt, o = Th(t);
  n && i.push(
    new l("required").setConstraint(true).setName(e).setErrorMessage(a.ssnCountryError).setGuideMessage(a.ssnCountryGuide)
  ), i.push(
    new l("pattern").setConstraint(r).setName(e).setErrorMessage(a.ssnCountryError).setGuideMessage(
      `Enter a valid ${s} ${o} ${Lh(t)}`
    )
  );
  const { minLength: u, maxLength: c } = Rh(t);
  return i.push(
    new l("minLength").setConstraint(u).setName(e).setErrorMessage(a.ssnCountryError).setGuideMessage(a.ssnCountryGuide)
  ), i.push(
    new l("maxLength").setConstraint(c).setName(e).setErrorMessage(a.ssnCountryError).setGuideMessage(a.ssnCountryGuide)
  ), new f().setConstraints(i);
};
var Ah = (e, t, n = true) => {
  const i = [], s = t.map((o) => M.getCountryName(o)).join(", "), r = M.createMultiCountryPattern("ssn", t) || Tt;
  return n && i.push(
    new l("required").setConstraint(true).setName(e).setErrorMessage(a.ssnMultiCountryError).setGuideMessage(a.ssnMultiCountryGuide)
  ), i.push(
    new l("pattern").setConstraint(r).setName(e).setErrorMessage(a.ssnMultiCountryError).setGuideMessage(`Enter a valid ID number for: ${s}`)
  ), i.push(
    new l("minLength").setConstraint(8).setName(e).setErrorMessage(a.ssnMultiCountryError).setGuideMessage(a.ssnMultiCountryGuide)
  ), i.push(
    new l("maxLength").setConstraint(25).setName(e).setErrorMessage(a.ssnMultiCountryError).setGuideMessage(a.ssnMultiCountryGuide)
  ), new f().setConstraints(i);
};
var Dh = (e, t = true) => {
  const n = [];
  return t && n.push(
    new l("required").setConstraint(true).setName(e).setErrorMessage(a.ssnSwitzerlandError).setGuideMessage(a.ssnSwitzerlandGuide)
  ), n.push(
    new l("pattern").setConstraint(/^756\.\d{4}\.\d{4}\.\d{2}$/).setName(e).setErrorMessage(a.ssnSwitzerlandError).setGuideMessage("Enter a valid Swiss AHV number (e.g., 756.1234.5678.90)")
  ), n.push(
    new l("minLength").setConstraint(16).setName(e).setErrorMessage(a.ssnSwitzerlandError).setGuideMessage(a.ssnSwitzerlandGuide)
  ), n.push(
    new l("maxLength").setConstraint(16).setName(e).setErrorMessage(a.ssnSwitzerlandError).setGuideMessage(a.ssnSwitzerlandGuide)
  ), new f().setConstraints(n);
};
var $h = (e, t = true) => Ii(e, "CH", t);
function Th(e) {
  return {
    US: "Social Security Number",
    CA: "Social Insurance Number",
    UK: "National Insurance Number",
    DE: "Identity Number",
    FR: "INSEE Number",
    CH: "AHV Number",
    IT: "Codice Fiscale",
    ES: "DNI",
    AT: "Social Security Number",
    NL: "BSN",
    BE: "National Number",
    LU: "Identity Number"
  }[e] || "ID Number";
}
function Rh(e) {
  return {
    US: { minLength: 9, maxLength: 11 },
    CA: { minLength: 9, maxLength: 11 },
    UK: { minLength: 9, maxLength: 9 },
    DE: { minLength: 12, maxLength: 15 },
    FR: { minLength: 13, maxLength: 15 },
    CH: { minLength: 16, maxLength: 16 },
    IT: { minLength: 16, maxLength: 16 },
    ES: { minLength: 9, maxLength: 9 },
    AT: { minLength: 10, maxLength: 12 },
    NL: { minLength: 9, maxLength: 9 },
    BE: { minLength: 15, maxLength: 17 },
    LU: { minLength: 13, maxLength: 13 }
  }[e] || { minLength: 8, maxLength: 20 };
}
function Lh(e) {
  return {
    US: "(e.g., 123-45-6789)",
    CA: "(e.g., 123 456 789)",
    UK: "(e.g., AB123456C)",
    DE: "(e.g., 12 345678 A 123)",
    FR: "(e.g., 1234567890123)",
    CH: "(e.g., 756.1234.5678.90)",
    IT: "(e.g., RSSMRA85T10A562S)",
    ES: "(e.g., 12345678Z)",
    AT: "(e.g., 1234 567890)",
    NL: "(e.g., 123456789)",
    BE: "(e.g., 12.34.56-789.01)",
    LU: "(e.g., 1234567890123)"
  }[e] || "";
}
var xh = (e, t = true) => {
  const n = [];
  return t && n.push(
    new l("required").setConstraint(true).setName(e).setErrorMessage(a.emailError).setGuideMessage(a.emailGuide)
  ), n.push(
    new l("pattern").setConstraint(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).setName(e).setErrorMessage(a.emailError).setGuideMessage(a.emailGuide)
  ), n.push(
    new l("maxLength").setConstraint(150).setName(e).setErrorMessage(a.emailError).setGuideMessage(a.emailGuide)
  ), new f().setConstraints(n);
};
var Lp = {
  phone: uh,
  firstName: nh,
  lastName: sh,
  fullName: ih,
  passwordStrong: oh,
  passwordMedium: ah,
  url: hh,
  creditCard: Xd,
  postalCode: ch,
  ssn: lh,
  currency: eh,
  age: Qd,
  username: gh,
  time: dh,
  numeric: rh,
  date: th,
  email: xh,
  // Country-specific validators
  phoneCountry: Si,
  phoneMultiCountry: bh,
  phoneSwitzerland: Mh,
  postalCodeCountry: Ci,
  postalCodeMultiCountry: Ch,
  postalCodeSwitzerland: Ih,
  npa: Nh,
  ssnCountry: Ii,
  ssnMultiCountry: Ah,
  ahv: Dh,
  ssnSwitzerland: $h,
  countryCode: ph,
  multiCountry: mh,
  switzerlandIncluded: fh
};
var Gh = ((e) => (e.BaseEmptyBuilder = "BaseEmptyBuilder", e.RequiredBuilder = "RequiredBuilder", e.MinBuilder = "MinBuilder", e.MaxBuilder = "MaxBuilder", e.MinMaxBuilder = "MinMaxBuilder", e.MinAndMinLengthBuilder = "MinAndMinLengthBuilder", e.MaxAndMinLengthBuilder = "MaxAndMinLengthBuilder", e.MinMaxAndMinLengthBuilder = "MinMaxAndMinLengthBuilder", e.MinAndMaxLengthBuilder = "MinAndMaxLengthBuilder", e.MinMaxAndMaxLengthBuilder = "MinMaxAndMaxLengthBuilder", e.MaxAndMaxLengthBuilder = "MaxAndMaxLengthBuilder", e.MinMinLengthAndMaxLengthBuilder = "MinMinLengthAndMaxLengthBuilder", e.MaxMinLengthAndMaxLengthBuilder = "MaxMinLengthAndMaxLengthBuilder", e.MinMaxMinLengthAndMaxLengthBuilder = "MinMaxMinLengthAndMaxLengthBuilder", e.MinLengthBuilder = "MinLengthBuilder", e.MaxLengthBuilder = "MaxLengthBuilder", e.MinLengthAndMaxLengthBuilder = "MinLengthAndMaxLengthBuilder", e))(Gh || {});
function xp(e = {}) {
  const t = new Ue();
  return Object.assign(t, e);
}
function Gp({
  strongObservers: e = [],
  weakObservers: t = []
} = {}) {
  const n = new Nt();
  return e.forEach((i) => n.subscribe(i, false)), t.forEach((i) => n.subscribe(i, true)), n;
}
export {
  np as AbstractServiceBase,
  vg as ApiError,
  Uh as AriaHelper,
  he as ArraySchema,
  it as BaseInputService,
  ge as BooleanSchema,
  mt as CheckBoxInput,
  st as CheckInputService,
  ft as ClickBaseInput,
  ut as ClickInputService,
  P as ConfigurationManager,
  Dd as ContextSubmissionStrategy,
  L as DateFormatsEnum,
  H as DateObject,
  pe as DateSchema,
  I as DefaultErrorMessages,
  Ei as DirectSubmissionStrategy,
  ve as DomManager,
  q as DomRegisterBuilder,
  _h as DomUtils,
  yt as DrawerBaseInput,
  we as EnumSchema,
  to as ErrorIndex,
  Ka as EventsEnum,
  K as ExceptionManager,
  bg as FieldError,
  mo as FieldSchemaBuilder,
  vo as FieldSchemaFactory,
  Qg as FormDismissedError,
  $d as FormSubmissionError,
  At as Formular,
  Mi as FormularManager,
  no as GenErrorIds,
  Mg as GeneralError,
  f as GenericValidationBuilder,
  hi as InitializationManager,
  le as InputBase,
  Yh as InputClassStatesNamesArray,
  Dn as InputClassStatesNamesEnum,
  Wh as InputClassStatesValuesArray,
  B as InputClassStatesValuesEnum,
  Yl as InputFactory,
  zh as InputResolver,
  _a as InputTypesNamesEnum,
  Oe as LiteralSchema,
  Wa as MMddYYYYRegex,
  vt as MaskedBaseInput,
  ct as MaskedInputService,
  gp as MaxAndMaxLengthBuilder,
  pp as MaxAndMinLengthBuilder,
  op as MaxBuilder,
  up as MaxLengthBuilder,
  bp as MaxMinLengthAndMaxLengthBuilder,
  mp as MinAndMaxLengthBuilder,
  fp as MinAndMinLengthBuilder,
  cp as MinBuilder,
  yp as MinLengthAndMaxLengthBuilder,
  lp as MinLengthBuilder,
  Mp as MinMaxAndMaxLengthBuilder,
  Ep as MinMaxAndMinLengthBuilder,
  vp as MinMaxBuilder,
  Cp as MinMaxMinLengthAndMaxLengthBuilder,
  Sp as MinMinLengthAndMaxLengthBuilder,
  Ie as MissingPropEnum,
  nt as NotificationManager,
  Z as NotificationPriority,
  fn as NotificationPriorityEnum,
  me as NumberSchema,
  Ri as NumberValidationType,
  bt as NumericBaseInput,
  G as ObjectSchema,
  Nt as ObservableSubject,
  Mt as OptionBaseInput,
  lt as OptionInputService,
  dp as PatternBuilder,
  M as PatternManager,
  qa as PrimitiveDataTypes,
  Et as RadioBaseInput,
  rt as RadioInputService,
  cs as RecordSchema,
  hp as RequiredBuilder,
  jt as SAutoTrackerNotificationManager,
  X as SBaseInputService,
  on as SCheckBoxBaseInput,
  gi as SCheckInputService,
  Ee as SClickBaseInput,
  Hl as SClickInputService,
  ye as SConfigurationManager,
  Le as SDomManager,
  zr as SDrawerBaseInput,
  Ig as SFieldDescriptor,
  Fl as SFieldDescriptorService,
  ht as SFormularManager,
  an as SInputBase,
  Q as SInputConfigProvider,
  vi as SInputFactory,
  hn as SMaskedBaseInput,
  yi as SMaskedInputService,
  Pe as SNotificationManager,
  ia as SNumericBaseInput,
  ke as SOptionBaseInput,
  Wl as SOptionInputService,
  gn as SRadioBaseInput,
  pi as SRadioInputService,
  pn as SSelectBaseInput,
  mi as SSelectInputService,
  N as SServiceManager,
  gt as SStyleManager,
  mn as STextBaseInput,
  fi as STextInputService,
  Ve as STrackingManager,
  Hh as STrackingOutputProvider,
  Xe as STrackingStrategyService,
  xe as SValidationManager,
  et as SValidationStrategyService,
  Re as SValidationTriggerService,
  Ge as SValueManager,
  tt as SValueStrategyService,
  E as SchemaBase,
  y as SchemaErrorCode,
  J as SchemaValidationError,
  kg as ScreenOrientationArray,
  xn as ScreenOrientationEnum,
  St as SelectBaseInput,
  at as SelectInputService,
  ip as ServiceLocator,
  De as ServiceManager,
  se as ServiceManagerFactory,
  Ad as SetupHelpers,
  fe as StringSchema,
  Ti as StringValidationType,
  ci as StyleManager,
  Ct as TextBaseInput,
  ot as TextInputService,
  wt as TrackingManager,
  Ae as UnionSchema,
  l as ValidationConstraintBuilder,
  kd as ValidationConstraintFactory,
  Gd as ValidationConstraintTypeEnum,
  O as ValidationErrorsCodes,
  a as ValidationLocalizeKeys,
  Ot as ValidationManager,
  rp as ValidationPresets,
  Gh as ValidationSchemaBuildersEnum,
  Me as ValidatorPresetRegistry,
  Lp as Validators,
  Ue as ValueManager,
  k as abstractInitializer,
  mr as accept,
  Jd as agePattern,
  Qd as ageValidator,
  Dh as ahvValidator,
  h as aria,
  Un as basicUsageExample,
  On as booleanGetter,
  za as booleanParserStrategy,
  An as booleanSetter,
  Fa as booleanTypes,
  Ng as capitalizeFirstLetter,
  jg as commandSchema,
  Jr as computeAriaAttributes,
  wg as conditionalClass,
  Ug as configurationSchema,
  Ra as consoleTrackingProvider,
  ph as countryCodeValidator,
  de as countryMetadata,
  xd as createForm,
  Xg as createFormFromPreset,
  tp as createInitializationManagerMock,
  ep as createMockDomManager,
  Gp as createObservableSubjectMock,
  U as createTypeError,
  sp as createValidationConstraints,
  Y as createValidationError,
  ap as createValidationManagerMock,
  xp as createValueManagerMock,
  qd as creditCardPattern,
  Xd as creditCardValidator,
  zg as cultureSchema,
  Yd as currencyPattern,
  eh as currencyValidator,
  zn as customConfigurationExample,
  qh as customEvent,
  Op as dateEuPattern,
  Eo as dateGetter,
  Vd as dateIso8601Pattern,
  Io as dateParserStrategy,
  Co as dateSetter,
  Ua as dateTypes,
  th as dateValidator,
  Ha as ddMMYYYYRegex,
  jn as defaultConfigJson,
  T as defaultConfiguration,
  _g as defaultConfigurationJson,
  Fg as defaultConfigurationJsonString,
  gg as defaultExtendsEventObject,
  Fh as defaultFieldInputCSSClassName,
  Bh as defaultFieldStateFlags,
  vn as defaultOutputTrackingProvider,
  mg as defaultTriggers,
  Ap as eMailPattern,
  pg as emptyInitializeMethod,
  Jn as errorHandlingExample,
  qg as eventTriggerSchema,
  Bg as examples,
  m as f,
  Vh as failure,
  _d as firstNamePattern,
  nh as firstNameValidator,
  Hg as formBehaviorSchema,
  Kh as formatDate,
  Bd as fullNamePattern,
  ih as fullNameValidator,
  qn as getConfigurationValuesExample,
  Qh as getCorrectMonthNumber,
  yh as getCountriesWithSupport,
  Rp as getCountryPatternSummary,
  Tp as getCountryValidationInfo,
  Xh as getDayIndex,
  eg as getDayIndexByName,
  tg as getDayName,
  ng as getDayNameByIndex,
  Be as getDayNames,
  ig as getDayNumber,
  ei as getKey,
  rg as getMonthDays,
  ag as getMonthIndex,
  og as getMonthIndexByName,
  ug as getMonthName,
  cg as getMonthNameByIndex,
  je as getMonthNames,
  ie as getPaddedNumber,
  Gg as getScreenOrientationTypeName,
  sg as getSystemDateSeparator,
  fg as getTranslationBuilder,
  yg as getTranslations,
  lg as getTs,
  dg as getYearMonths,
  hg as getYears,
  fr as hasErrors,
  Ag as ifClass,
  Dg as isBigInt,
  wn as isBoolean,
  $g as isDate,
  Tg as isDateObject,
  Rg as isFunction,
  We as isMissing,
  Tn as isNDate,
  bo as isNullEmptyOrUndefined,
  Lg as isNullOrEmpty,
  Rn as isNumber,
  Ln as isString,
  Fd as lastNamePattern,
  sh as lastNameValidator,
  Wo as loadJsonConfigurationExample,
  Wn as localizationExample,
  p as logManager,
  Jh as mapFieldsToObject,
  Zh as mapObjectToFields,
  Ne as mapSchemaToFieldDescriptor,
  dn as memoize,
  Cg as memoizeHandler,
  Ip as minMaxDatesBuilder,
  Np as minMaxNameBuilder,
  mh as multiCountryValidator,
  Hn as multiEnvironmentExample,
  wp as namesPattern,
  S as newAssert,
  _e as newDtId,
  C as newEvent,
  Eg as newFieldError,
  Sg as newFieldGuide,
  Og as newIFClass,
  br as newNotificationVisitor,
  xg as newNotificationVisitorName,
  Fe as newTrackingData,
  A as newValidationResult,
  jh as newValidationResults,
  R as notification,
  Nh as npaValidator,
  ja as numberTypes,
  It as numericGetter,
  Pd as numericOnly,
  Oo as numericOptionParserStrategy,
  Do as numericParserStrategy,
  Ao as numericSetter,
  rh as numericValidator,
  Nn as optionBaseedNumericTypes,
  No as optionGetter,
  Nr as optionReferencer,
  wo as optionSetter,
  Ud as passwordMediumPattern,
  ah as passwordMediumValidator,
  jd as passwordStrongPattern,
  oh as passwordStrongValidator,
  Si as phoneCountryValidator,
  bh as phoneMultiCountryValidator,
  Dt as phonePattern,
  zt as phonePatterns,
  Dp as phoneSimplePattern,
  Mh as phoneSwitzerlandValidator,
  uh as phoneValidator,
  Hd as postalCodeCanadaPattern,
  Ci as postalCodeCountryValidator,
  Ch as postalCodeMultiCountryValidator,
  qt as postalCodePatterns,
  Ih as postalCodeSwitzerlandValidator,
  Wd as postalCodeUKPattern,
  $t as postalCodeUSPattern,
  ch as postalCodeValidator,
  j as presetRegistry,
  vr as process,
  jn as rawDefaultConfiguration,
  ue as referencer,
  Wg as renderingSchema,
  Yg as replacementTokenSchema,
  Yo as runAllExamples,
  Zn as runtimeConfigurationExample,
  $o as selectGetter,
  Ro as selectOptionParserStrategy,
  To as selectSetter,
  te as sequenceInitializer,
  oe as setParserStrategy,
  wd as setupFormularManager,
  Zl as setupInputsFactory,
  Jl as setupInputsRegistry,
  Mo as shallowCopy,
  Ii as ssnCountryValidator,
  Ah as ssnMultiCountryValidator,
  Tt as ssnPattern,
  Ht as ssnPatterns,
  $h as ssnSwitzerlandValidator,
  lh as ssnValidator,
  Gn as stringGetter,
  Pg as stringIsDate,
  Lo as stringParserStrategy,
  kn as stringSetter,
  Ba as stringTypes,
  Ph as success,
  Zg as suffixSchema,
  fh as switzerlandIncludedValidator,
  $p as time12HourPattern,
  Zd as timePattern,
  dh as timeValidator,
  Vg as toPascal,
  yr as toString,
  $n as tryConvertINDateToDateObject,
  Ja as tryConvertStringToDateObject,
  zd as urlPattern,
  hh as urlValidator,
  Kd as usernamePattern,
  gh as usernameValidator,
  Za as validateDateFormat,
  Jg as validationMethodStrategySchema,
  Kg as validationPatternSchema,
  Yn as validationPatternsExample,
  La as validatorMaxLengthStrategy,
  xa as validatorMaxStrategy,
  Ga as validatorMinLengthStrategy,
  ka as validatorMinStrategy,
  Va as validatorPatternStrategy,
  Pa as validatorRequiredStrategy,
  ce as valueIsNullOrUndefined,
  Ya as yyyyMMDDRegex
};
//# sourceMappingURL=@binaryjack_formular__dev.js.map
