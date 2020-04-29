module.exports = {
  success,
  fail,
  repair,
  get,
};

function validate(item) {
  let copy = { ...item };
  if (typeof item === "object") {
    if (
      typeof item.name === "string"
      && typeof item.enhancement === "number"
      && typeof item.durability === "number"
    ) {
      return copy;
    } else {
      throw "Item fields must be, name: 'string', enhancement: 'number', durability: 'number'"
    }
  } else {
    throw "Item must be type 'object"
  }
}

function clamp(item) {
  let copy = { ...item };
  copy.enhancement = Math.min(Math.max(item.enhancement, 0), 20);
  copy.durability = Math.min(Math.max(item.durability, 0), 100);
  return copy
}

function success(item) {
  let copy = validate(item);
  copy.enhancement += 1;
  return clamp(copy);
}

function fail(item) {
  let copy = validate(item);
  if (copy.enhancement < 15) {
    copy.durability -= 5;
  } else {
    copy.durability -= 10;
    if (copy.enhancement >= 16) {
      copy.enhancement -= 1;
    }
  }
  return clamp(copy);
}

function repair(item) {
  let copy = validate(item);
  copy.durability = 100;
  return clamp(copy);
}

function get(item) {
  let changed = clamp(validate(item));
  if (changed.enhancement > 0) {
    changed.display_name = `+[${changed.enhancement}] ${changed.name}`;
    return changed;
  } else {
    changed.display_name = changed.name;
    return changed;
  }
}
