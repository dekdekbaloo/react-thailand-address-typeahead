// @flow
const JQL = require('jqljs');

const fieldsEnum = {
  AMPHOE: 'amphoe',
  ZIPCODE: 'zipcode',
  DISTRICT: 'district',
  PROVINCE: 'province',
};

/**
 * From jquery.Thailand.js line 19 - 76
 */
const preprocess = (data) => {
  let lookup = [];
  let words = [];
  const expanded = [];

  if (data.lookup && data.words) {
      // compact with dictionary and lookup
    lookup = data.lookup.split('|');
    words = data.words.split('|');
    data = data.data;
  }

  const t = (text) => {
    function repl(m) {
      const ch = m.charCodeAt(0);
      return words[ch < 97 ? ch - 65 : 26 + ch - 97];
    }

    if (typeof text === 'number') {
      text = lookup[text];
    }
    return text.replace(/[A-Z]/ig, repl);
  };

  // decompacted database in hierarchical form of:
  // [["province",[["amphur",[["district",["zip"...]]...]]...]]...]
  data.map((provinces) => {
    let i = 1;
    if (provinces.length === 3) { // geographic database
      i = 2;
    }

    provinces[i].map((amphoes) => {
      amphoes[i].map((districts) => {
        districts[i] = districts[i] instanceof Array ? districts[i] : [districts[i]];
        districts[i].map((zipcode) => {
          const entry = {
            district: t(districts[0]),
            amphoe: t(amphoes[0]),
            province: t(provinces[0]),
            zipcode,
          };
          if (i === 2) { // geographic database
            entry.district_code = districts[1] || false;
            entry.amphoe_code = amphoes[1] || false;
            entry.province_code = provinces[1] || false;
          }
          expanded.push(entry);
        });
      });
    });
  });
  return expanded;
};

let DB;
const init = (data: object) => {
  DB = new JQL(preprocess(data));
};

const resolveResultbyField = (type: string, searchStr: string) => {
  if (!DB) {
    throw new Error('Address db has not been initialized. Call `init(data)` from your `db.json` file.');
  }
  let possibles = [];
  try {
    possibles = DB.select('*').where(type)
            .match(`^${searchStr}`)
            .orderBy(type)
            .fetch();
  } catch (e) {
    return [];
  }
  return possibles;
};

exports.init = init;
exports.resolveResultbyField = resolveResultbyField;
exports.fieldsEnum = fieldsEnum;
