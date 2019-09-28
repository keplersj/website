const regex = /gbi-?[\w-]*/g;
const replacement = "gbi-00000000000-0000000000000000000000";
const replacementCheck = new RegExp(replacement);

module.exports = {
  test(val) {
    return Boolean(regex.test(val) && !replacementCheck.test(val));
  },

  print(val, serialize) {
    return serialize(val.replace(regex, replacement));
  }
};
