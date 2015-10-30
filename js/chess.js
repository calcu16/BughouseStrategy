CHESS_OFFSET = 9812;
COLOR_OFFSET = { "W" : 0, "B" : 6 };
COLOR_OPP = { "W" : "B", "B" : "W" };
PIECE_OFFSET = { "K" : 0, "Q" : 1, "R" : 2, "B" : 3, "N" : 4, "P" : 5 };

LINE = [];
LINE_INDEX = 0;

function set(color, piece, row, col) {
  document.getElementById("loc_" + row + "_" + col).innerHTML = String.fromCodePoint(COLOR_OFFSET[color] + PIECE_OFFSET[piece] + CHESS_OFFSET);
}

function clr(row, col) {
  document.getElementById("loc_" + row + "_" + col).innerHTML = "";
}

function setup() {
  for (var i = 0; i < 8; ++i) {
    for (var j = 0; j < 8; ++j) {
      clr(i, j);
    }
  }
  for (var i = 0; i < 8; ++i) {
    set("W", "P", 6, i);
    set("B", "P", 1, i);
  }
  set("W", "K", 7, 4);
  set("B", "K", 0, 4);
  set("W", "Q", 7, 3);
  set("B", "Q", 0, 3);
  set("W", "B", 7, 5);
  set("W", "B", 7, 2);
  set("B", "B", 0, 5);
  set("B", "B", 0, 2);
  set("W", "N", 7, 6);
  set("W", "N", 7, 1);
  set("B", "N", 0, 6);
  set("B", "N", 0, 1);
  set("W", "R", 7, 7);
  set("W", "R", 7, 0);
  set("B", "R", 0, 7);
  set("B", "R", 0, 0);
}

/**
 *
 * moves are of the textual format
 *  turn piece column row - column row captured piece
 * if no piece is caputed then captured piece is omitted
 * if a piece is dropped then the starting spaces are omitted
 */
function play_move(m) {
  var se = m.split("-");
  var s = se[0];
  var e = se[1];
  if (s.length == 4) {
    var c = s.charCodeAt(2) - "a".charCodeAt(0);
    var r = "8".charCodeAt(0) - s.charCodeAt(3);
    clr(r, c);
  }
  var c = e.charCodeAt(0) - "a".charCodeAt(0);
  var r = "8".charCodeAt(0) - e.charCodeAt(1);
  set(s[0], s[1], r, c);
}

function rewind_move(m) {
  var se = m.split("-");
  var s = se[0];
  var e = se[1];
  if (s.length == 4) {
    var c = s.charCodeAt(2) - "a".charCodeAt(0);
    var r = "8".charCodeAt(0) - s.charCodeAt(3);
    set(s[0], s[1], r, c);
  }
  var c = e.charCodeAt(0) - "a".charCodeAt(0);
  var r = "8".charCodeAt(0) - e.charCodeAt(1);
  if (e.length == 3) {
    set(COLOR_OPP[s[0]], e[2], r, c);
  } else {
    clr(r, c);
  }
}

function set_line(line) {
  setup();
  LINE = line.split(" ");
  LINE_INDEX = 0;
}

function prev() {
  if (LINE_INDEX > 0) {
    LINE_INDEX -= 1;
    rewind_move(LINE[LINE_INDEX]);
    return true;
  }
  return false;
}

function next() {
  if (LINE_INDEX < LINE.length) {
    play_move(LINE[LINE_INDEX]);
    LINE_INDEX += 1;
    return true;
  }
  return false;
}

function begin() {
  while (prev()) { }
}

function end() {
  while (next()) { }
}

function goto(i) {
  while (LINE_INDEX < i && next) { }
  while (LINE_INDEX > i && prev) { }
}

document.addEventListener("DOMContentLoaded", setup)

