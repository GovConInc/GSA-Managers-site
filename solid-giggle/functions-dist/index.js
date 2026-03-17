var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// api/contact.ts
async function onRequestPost(context) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  };
  try {
    const body = await context.request.json();
    const { name, email, company, phone, cage, interest, bestTime } = body;
    if (!name || !email) {
      return new Response(JSON.stringify({ error: "Name and email are required" }), {
        status: 400,
        headers: corsHeaders
      });
    }
    const resendApiKey = context.env.RESEND_API_KEY;
    const toEmail = context.env.CONTACT_TO_EMAIL || "Info@GSAManagers.com";
    if (!resendApiKey) {
      console.warn("RESEND_API_KEY not set; contact submission not emailed.");
      return new Response(JSON.stringify({ ok: true }), { headers: corsHeaders });
    }
    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      phone ? `Phone: ${phone}` : null,
      cage ? `CAGE Code: ${cage}` : null,
      interest ? `Interest: ${interest}` : null,
      bestTime ? `Best Time to Contact: ${bestTime}` : null
    ].filter(Boolean).join("\n");
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: context.env.RESEND_FROM_EMAIL || "GSA Managers Contact <onboarding@resend.dev>",
        to: [toEmail],
        reply_to: email,
        subject: `New Inquiry from ${name}${interest ? ` \u2014 ${interest}` : ""}`,
        text: lines
      })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.message || `Resend error ${res.status}`);
    }
    return new Response(JSON.stringify({ ok: true, id: data.id }), {
      headers: corsHeaders
    });
  } catch (err) {
    console.error("Contact API error:", err);
    return new Response(JSON.stringify({ error: err?.message ?? "Internal server error" }), {
      status: 500,
      headers: corsHeaders
    });
  }
}
__name(onRequestPost, "onRequestPost");
async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
__name(onRequestOptions, "onRequestOptions");

// api/contracts.ts
async function getAccessToken(credentials) {
  const now = Math.floor(Date.now() / 1e3);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: credentials.client_email,
    scope: "https://www.googleapis.com/auth/bigquery.readonly",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now
  };
  const base64url = /* @__PURE__ */ __name((obj) => btoa(JSON.stringify(obj)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_"), "base64url");
  const unsignedToken = `${base64url(header)}.${base64url(payload)}`;
  const pemContents = credentials.private_key.replace("-----BEGIN PRIVATE KEY-----", "").replace("-----END PRIVATE KEY-----", "").replace(/\s/g, "");
  const binaryKey = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));
  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(unsignedToken)
  );
  const signatureBase64 = btoa(String.fromCharCode(...new Uint8Array(signature))).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  const jwt = `${unsignedToken}.${signatureBase64}`;
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`
  });
  const tokenData = await tokenResponse.json();
  if (!tokenData.access_token) {
    throw new Error(`Failed to get access token: ${JSON.stringify(tokenData)}`);
  }
  return tokenData.access_token;
}
__name(getAccessToken, "getAccessToken");
async function runQuery(projectId, query, accessToken, queryParameters = []) {
  const response = await fetch(
    `https://bigquery.googleapis.com/bigquery/v2/projects/${projectId}/queries`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query,
        useLegacySql: false,
        timeoutMs: 3e4,
        parameterMode: queryParameters.length ? "NAMED" : void 0,
        queryParameters: queryParameters.length ? queryParameters : void 0
      })
    }
  );
  const data = await response.json();
  if (data.error) {
    throw new Error(`BigQuery error: ${JSON.stringify(data.error)}`);
  }
  if (!data.rows) return [];
  const fields = data.schema.fields.map((f) => f.name);
  return data.rows.map((row) => {
    const obj = {};
    row.f.forEach((cell, i) => {
      obj[fields[i]] = cell.v;
    });
    return obj;
  });
}
__name(runQuery, "runQuery");
async function onRequestGet(context) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  };
  try {
    const credentials = JSON.parse(context.env.BIGQUERY_CREDENTIALS);
    const projectId = credentials.project_id;
    const { searchParams } = new URL(context.request.url);
    const naics = searchParams.get("naics") || "";
    const state = searchParams.get("state") || "";
    const setAside = searchParams.get("setAside") || "";
    const keyword = searchParams.get("keyword") || "";
    const yearRange = parseInt(searchParams.get("yearRange") || "1");
    const accessToken = await getAccessToken(credentials);
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    const startYear = currentYear - yearRange;
    const conditions = ["action_date_fiscal_year >= @startYear"];
    const params = [
      { name: "startYear", parameterType: { type: "INT64" }, parameterValue: { value: String(startYear) } }
    ];
    if (naics) {
      conditions.push(`CAST(naics_code AS STRING) LIKE CONCAT(@naics, '%')`);
      params.push({ name: "naics", parameterType: { type: "STRING" }, parameterValue: { value: naics } });
    }
    if (state) {
      conditions.push("primary_place_of_performance_state_code = @state");
      params.push({ name: "state", parameterType: { type: "STRING" }, parameterValue: { value: state.toUpperCase() } });
    }
    if (keyword) {
      conditions.push(`LOWER(product_or_service_code_description) LIKE CONCAT('%', @keyword, '%')`);
      params.push({ name: "keyword", parameterType: { type: "STRING" }, parameterValue: { value: keyword.toLowerCase() } });
    }
    if (setAside) {
      const setAsideMap = {
        "8a": "c8a_program_participant = TRUE",
        "hubzone": "historically_underutilized_business_zone_hubzone_firm = TRUE",
        "wosb": "woman_owned_business = TRUE",
        "sdvosb": "veteran_owned_business = TRUE"
      };
      if (setAsideMap[setAside]) {
        conditions.push(setAsideMap[setAside]);
      }
    }
    const whereClause = `WHERE ${conditions.join(" AND ")}`;
    const metricsQuery = `
      SELECT
        SUM(federal_action_obligation) as total_contract_value,
        COUNT(DISTINCT CASE WHEN contracting_officers_determination_of_business_size_code = 'S' THEN recipient_uei END) as small_business_count,
        SUM(CASE WHEN contracting_officers_determination_of_business_size_code = 'S' THEN federal_action_obligation ELSE 0 END) as small_business_value
      FROM \`govspend1.cc.cc3\`
      ${whereClause}
    `;
    const monthlyQuery = `
      SELECT
        month,
        SUM(small_business) as small_business,
        SUM(other_than_small) as other_than_small,
        SUM(total) as total
      FROM (
        SELECT
          FORMAT_DATE('%Y-%m', initial_report_date) as month,
          CASE WHEN contracting_officers_determination_of_business_size_code = 'S' THEN federal_action_obligation ELSE 0 END as small_business,
          CASE WHEN contracting_officers_determination_of_business_size_code != 'S' THEN federal_action_obligation ELSE 0 END as other_than_small,
          federal_action_obligation as total
        FROM \`govspend1.cc.cc3\`
        ${whereClause}
      )
      GROUP BY month
      ORDER BY month
    `;
    const vendorsQuery = `
      SELECT
        recipient_name as name,
        SUM(federal_action_obligation) as value,
        COUNT(*) as award_count,
        MAX(contracting_officers_determination_of_business_size_code) as business_size
      FROM \`govspend1.cc.cc3\`
      ${whereClause}
      GROUP BY recipient_name
      ORDER BY value DESC
      LIMIT 10
    `;
    const agenciesQuery = `
      SELECT
        awarding_sub_agency_name as name,
        SUM(federal_action_obligation) as value,
        COUNT(*) as count
      FROM \`govspend1.cc.cc3\`
      ${whereClause}
      GROUP BY awarding_sub_agency_name
      ORDER BY value DESC
      LIMIT 10
    `;
    const businessTypesQuery = `
      SELECT
        SUM(CASE WHEN c8a_program_participant = TRUE THEN federal_action_obligation ELSE 0 END) as eight_a_value,
        SUM(CASE WHEN historically_underutilized_business_zone_hubzone_firm = TRUE THEN federal_action_obligation ELSE 0 END) as hubzone_value,
        SUM(CASE WHEN woman_owned_business = TRUE THEN federal_action_obligation ELSE 0 END) as wosb_value,
        SUM(CASE WHEN veteran_owned_business = TRUE THEN federal_action_obligation ELSE 0 END) as sdvosb_value
      FROM \`govspend1.cc.cc3\`
      ${whereClause}
    `;
    const [metricsResult, monthlyResult, vendorsResult, agenciesResult, businessTypesResult] = await Promise.all([
      runQuery(projectId, metricsQuery, accessToken, params),
      runQuery(projectId, monthlyQuery, accessToken, params),
      runQuery(projectId, vendorsQuery, accessToken, params),
      runQuery(projectId, agenciesQuery, accessToken, params),
      runQuery(projectId, businessTypesQuery, accessToken, params)
    ]);
    const metrics = metricsResult[0] || {};
    const businessTypes = businessTypesResult[0] || {};
    const responseData = {
      metrics: {
        total_contract_value: parseFloat(metrics.total_contract_value) || 0,
        small_business_count: parseInt(metrics.small_business_count) || 0,
        small_business_value: parseFloat(metrics.small_business_value) || 0
      },
      monthlySpendingBySize: monthlyResult.map((row) => ({
        month: row.month,
        small_business: parseFloat(row.small_business) || 0,
        other_than_small: parseFloat(row.other_than_small) || 0,
        total: parseFloat(row.total) || 0
      })),
      topVendors: vendorsResult.map((row) => ({
        name: row.name,
        value: parseFloat(row.value) || 0,
        award_count: parseInt(row.award_count) || 0,
        business_size: row.business_size
      })),
      topAgencies: agenciesResult.map((row) => ({
        name: row.name,
        value: parseFloat(row.value) || 0,
        count: parseInt(row.count) || 0
      })),
      business_types: {
        eight_a: { value: parseFloat(businessTypes.eight_a_value) || 0 },
        hubzone: { value: parseFloat(businessTypes.hubzone_value) || 0 },
        wosb: { value: parseFloat(businessTypes.wosb_value) || 0 },
        sdvosb: { value: parseFloat(businessTypes.sdvosb_value) || 0 }
      }
    };
    return new Response(JSON.stringify({ success: true, data: responseData }), {
      headers: corsHeaders
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: corsHeaders
    });
  }
}
__name(onRequestGet, "onRequestGet");

// api/rss.ts
var DEFAULT_RSS_URL = "https://sam.gov/content/sam/en/about-sam/newsroom.rss";
async function onRequestGet2(context) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  };
  try {
    const { searchParams } = new URL(context.request.url);
    const feedUrl = searchParams.get("url") || DEFAULT_RSS_URL;
    const res = await fetch(feedUrl, {
      headers: { Accept: "application/xml, text/xml, application/rss+xml" }
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch RSS feed (${res.status})`);
    }
    const xml = await res.text();
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match2;
    while ((match2 = itemRegex.exec(xml)) !== null) {
      const block = match2[1];
      const get = /* @__PURE__ */ __name((tag) => {
        const m = block.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
        return m ? (m[1] ?? m[2] ?? "").trim() : "";
      }, "get");
      items.push({
        title: get("title"),
        link: get("link"),
        description: get("description"),
        pubDate: get("pubDate")
      });
    }
    return new Response(JSON.stringify({ items }), { headers: corsHeaders });
  } catch (err) {
    console.error("RSS API error:", err);
    return new Response(
      JSON.stringify({ error: err?.message ?? "Failed to fetch RSS" }),
      { status: 500, headers: corsHeaders }
    );
  }
}
__name(onRequestGet2, "onRequestGet");
async function onRequestOptions2() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
__name(onRequestOptions2, "onRequestOptions");

// ../.wrangler/tmp/pages-SAqsZu/functionsRoutes-0.7954989372034756.mjs
var routes = [
  {
    routePath: "/api/contact",
    mountPath: "/api",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions]
  },
  {
    routePath: "/api/contact",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost]
  },
  {
    routePath: "/api/contracts",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet]
  },
  {
    routePath: "/api/rss",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet2]
  },
  {
    routePath: "/api/rss",
    mountPath: "/api",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions2]
  }
];

// ../../../../AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// ../../../../AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
export {
  pages_template_worker_default as default
};
