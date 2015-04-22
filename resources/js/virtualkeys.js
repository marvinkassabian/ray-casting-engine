"use strict";
var virtualKeys;
(function (virtualKeys) {
    /** Cancel key. */
    virtualKeys[virtualKeys["VK_CANCEL"] = 3] = "VK_CANCEL";
    /** Help key. */
    virtualKeys[virtualKeys["VK_HELP"] = 6] = "VK_HELP";
    /** Backspace key. */
    virtualKeys[virtualKeys["VK_BACK_SPACE"] = 8] = "VK_BACK_SPACE";
    /** Tab key. */
    virtualKeys[virtualKeys["VK_TAB"] = 9] = "VK_TAB";
    /** 5 key on Numpad when NumLock is unlocked. Or on Mac, clear key which is positioned at NumLock key. */
    virtualKeys[virtualKeys["VK_CLEAR"] = 12] = "VK_CLEAR";
    /** Return/enter key on the main keyboard. */
    virtualKeys[virtualKeys["VK_RETURN"] = 13] = "VK_RETURN";
    /** Reserved, but not used. */
    virtualKeys[virtualKeys["VK_ENTER"] = 14] = "VK_ENTER";
    /** Shift key. */
    virtualKeys[virtualKeys["VK_SHIFT"] = 16] = "VK_SHIFT";
    /** Control key. */
    virtualKeys[virtualKeys["VK_CONTROL"] = 17] = "VK_CONTROL";
    /** Alt (Option on Mac) key. */
    virtualKeys[virtualKeys["VK_ALT"] = 18] = "VK_ALT";
    /** Pause key. */
    virtualKeys[virtualKeys["VK_PAUSE"] = 19] = "VK_PAUSE";
    /** Caps lock. */
    virtualKeys[virtualKeys["VK_CAPS_LOCK"] = 20] = "VK_CAPS_LOCK";
    /** Escape key. */
    virtualKeys[virtualKeys["VK_ESCAPE"] = 27] = "VK_ESCAPE";
    /** Space bar. */
    virtualKeys[virtualKeys["VK_SPACE"] = 32] = "VK_SPACE";
    /** Page Up key. */
    virtualKeys[virtualKeys["VK_PAGE_UP"] = 33] = "VK_PAGE_UP";
    /** Page Down key. */
    virtualKeys[virtualKeys["VK_PAGE_DOWN"] = 34] = "VK_PAGE_DOWN";
    /** End key. */
    virtualKeys[virtualKeys["VK_END"] = 35] = "VK_END";
    /** Home key. */
    virtualKeys[virtualKeys["VK_HOME"] = 36] = "VK_HOME";
    /** Left arrow. */
    virtualKeys[virtualKeys["VK_LEFT"] = 37] = "VK_LEFT";
    /** Up arrow. */
    virtualKeys[virtualKeys["VK_UP"] = 38] = "VK_UP";
    /** Right arrow. */
    virtualKeys[virtualKeys["VK_RIGHT"] = 39] = "VK_RIGHT";
    /** Down arrow. */
    virtualKeys[virtualKeys["VK_DOWN"] = 40] = "VK_DOWN";
    /** Print Screen key. */
    virtualKeys[virtualKeys["VK_PRINTSCREEN"] = 44] = "VK_PRINTSCREEN";
    /** Ins(ert) key. */
    virtualKeys[virtualKeys["VK_INSERT"] = 45] = "VK_INSERT";
    /** Del(ete) key. */
    virtualKeys[virtualKeys["VK_DELETE"] = 46] = "VK_DELETE";
    /***/
    virtualKeys[virtualKeys["VK_0"] = 48] = "VK_0";
    /***/
    virtualKeys[virtualKeys["VK_1"] = 49] = "VK_1";
    /***/
    virtualKeys[virtualKeys["VK_2"] = 50] = "VK_2";
    /***/
    virtualKeys[virtualKeys["VK_3"] = 51] = "VK_3";
    /***/
    virtualKeys[virtualKeys["VK_4"] = 52] = "VK_4";
    /***/
    virtualKeys[virtualKeys["VK_5"] = 53] = "VK_5";
    /***/
    virtualKeys[virtualKeys["VK_6"] = 54] = "VK_6";
    /***/
    virtualKeys[virtualKeys["VK_7"] = 55] = "VK_7";
    /***/
    virtualKeys[virtualKeys["VK_8"] = 56] = "VK_8";
    /***/
    virtualKeys[virtualKeys["VK_9"] = 57] = "VK_9";
    /** Colon (:) key. Requires Gecko 15.0 */
    virtualKeys[virtualKeys["VK_COLON"] = 58] = "VK_COLON";
    /** Semicolon (;) key. */
    virtualKeys[virtualKeys["VK_SEMICOLON"] = 59] = "VK_SEMICOLON";
    /** Less-than (<) key. Requires Gecko 15.0 */
    virtualKeys[virtualKeys["VK_LESS_THAN"] = 60] = "VK_LESS_THAN";
    /** Equals (=) key. */
    virtualKeys[virtualKeys["VK_EQUALS"] = 61] = "VK_EQUALS";
    /** Greater-than (>) key. Requires Gecko 15.0 */
    virtualKeys[virtualKeys["VK_GREATER_THAN"] = 62] = "VK_GREATER_THAN";
    /** Question mark (?) key. Requires Gecko 15.0 */
    virtualKeys[virtualKeys["VK_QUESTION_MARK"] = 63] = "VK_QUESTION_MARK";
    /** Atmark (@) key. Requires Gecko 15.0 */
    virtualKeys[virtualKeys["VK_AT"] = 64] = "VK_AT";
    /***/
    virtualKeys[virtualKeys["VK_A"] = 65] = "VK_A";
    /***/
    virtualKeys[virtualKeys["VK_B"] = 66] = "VK_B";
    /***/
    virtualKeys[virtualKeys["VK_C"] = 67] = "VK_C";
    /***/
    virtualKeys[virtualKeys["VK_D"] = 68] = "VK_D";
    /***/
    virtualKeys[virtualKeys["VK_E"] = 69] = "VK_E";
    /***/
    virtualKeys[virtualKeys["VK_F"] = 70] = "VK_F";
    /***/
    virtualKeys[virtualKeys["VK_G"] = 71] = "VK_G";
    /***/
    virtualKeys[virtualKeys["VK_H"] = 72] = "VK_H";
    /***/
    virtualKeys[virtualKeys["VK_I"] = 73] = "VK_I";
    /***/
    virtualKeys[virtualKeys["VK_J"] = 74] = "VK_J";
    /***/
    virtualKeys[virtualKeys["VK_K"] = 75] = "VK_K";
    /***/
    virtualKeys[virtualKeys["VK_L"] = 76] = "VK_L";
    /***/
    virtualKeys[virtualKeys["VK_M"] = 77] = "VK_M";
    /***/
    virtualKeys[virtualKeys["VK_N"] = 78] = "VK_N";
    /***/
    virtualKeys[virtualKeys["VK_O"] = 79] = "VK_O";
    /***/
    virtualKeys[virtualKeys["VK_P"] = 80] = "VK_P";
    /***/
    virtualKeys[virtualKeys["VK_Q"] = 81] = "VK_Q";
    /***/
    virtualKeys[virtualKeys["VK_R"] = 82] = "VK_R";
    /***/
    virtualKeys[virtualKeys["VK_S"] = 83] = "VK_S";
    /***/
    virtualKeys[virtualKeys["VK_T"] = 84] = "VK_T";
    /***/
    virtualKeys[virtualKeys["VK_U"] = 85] = "VK_U";
    /***/
    virtualKeys[virtualKeys["VK_V"] = 86] = "VK_V";
    /***/
    virtualKeys[virtualKeys["VK_W"] = 87] = "VK_W";
    /***/
    virtualKeys[virtualKeys["VK_X"] = 88] = "VK_X";
    /***/
    virtualKeys[virtualKeys["VK_Y"] = 89] = "VK_Y";
    /***/
    virtualKeys[virtualKeys["VK_Z"] = 90] = "VK_Z";
    /***/
    virtualKeys[virtualKeys["VK_CONTEXT_MENU"] = 93] = "VK_CONTEXT_MENU";
    /** 0 on the numeric keypad. */
    virtualKeys[virtualKeys["VK_NUMPAD0"] = 96] = "VK_NUMPAD0";
    /** 1 on the numeric keypad. */
    virtualKeys[virtualKeys["VK_NUMPAD1"] = 97] = "VK_NUMPAD1";
    /** 2 on the numeric keypad. */
    virtualKeys[virtualKeys["VK_NUMPAD2"] = 98] = "VK_NUMPAD2";
    /** 3 on the numeric keypad. */
    virtualKeys[virtualKeys["VK_NUMPAD3"] = 99] = "VK_NUMPAD3";
    /** 4 on the numeric keypad. */
    virtualKeys[virtualKeys["VK_NUMPAD4"] = 100] = "VK_NUMPAD4";
    /** 5 on the numeric keypad. */
    virtualKeys[virtualKeys["VK_NUMPAD5"] = 101] = "VK_NUMPAD5";
    /** 6 on the numeric keypad. */
    virtualKeys[virtualKeys["VK_NUMPAD6"] = 102] = "VK_NUMPAD6";
    /** 7 on the numeric keypad. */
    virtualKeys[virtualKeys["VK_NUMPAD7"] = 103] = "VK_NUMPAD7";
    /** 8 on the numeric keypad. */
    virtualKeys[virtualKeys["VK_NUMPAD8"] = 104] = "VK_NUMPAD8";
    /** 9 on the numeric keypad. */
    virtualKeys[virtualKeys["VK_NUMPAD9"] = 105] = "VK_NUMPAD9";
    /** * on the numeric keypad. */
    virtualKeys[virtualKeys["VK_MULTIPLY"] = 106] = "VK_MULTIPLY";
    /** + on the numeric keypad. */
    virtualKeys[virtualKeys["VK_ADD"] = 107] = "VK_ADD";
    /***/
    virtualKeys[virtualKeys["VK_SEPARATOR"] = 108] = "VK_SEPARATOR";
    /** - on the numeric keypad. */
    virtualKeys[virtualKeys["VK_SUBTRACT"] = 109] = "VK_SUBTRACT";
    /** Decimal point on the numeric keypad. */
    virtualKeys[virtualKeys["VK_DECIMAL"] = 110] = "VK_DECIMAL";
    /** / on the numeric keypad. */
    virtualKeys[virtualKeys["VK_DIVIDE"] = 111] = "VK_DIVIDE";
    /** F1 key. */
    virtualKeys[virtualKeys["VK_F1"] = 112] = "VK_F1";
    /** F2 key. */
    virtualKeys[virtualKeys["VK_F2"] = 113] = "VK_F2";
    /** F3 key. */
    virtualKeys[virtualKeys["VK_F3"] = 114] = "VK_F3";
    /** F4 key. */
    virtualKeys[virtualKeys["VK_F4"] = 115] = "VK_F4";
    /** F5 key. */
    virtualKeys[virtualKeys["VK_F5"] = 116] = "VK_F5";
    /** F6 key. */
    virtualKeys[virtualKeys["VK_F6"] = 117] = "VK_F6";
    /** F7 key. */
    virtualKeys[virtualKeys["VK_F7"] = 118] = "VK_F7";
    /** F8 key. */
    virtualKeys[virtualKeys["VK_F8"] = 119] = "VK_F8";
    /** F9 key. */
    virtualKeys[virtualKeys["VK_F9"] = 120] = "VK_F9";
    /** F10 key. */
    virtualKeys[virtualKeys["VK_F10"] = 121] = "VK_F10";
    /** F11 key. */
    virtualKeys[virtualKeys["VK_F11"] = 122] = "VK_F11";
    /** F12 key. */
    virtualKeys[virtualKeys["VK_F12"] = 123] = "VK_F12";
    /** F13 key. */
    virtualKeys[virtualKeys["VK_F13"] = 124] = "VK_F13";
    /** F14 key. */
    virtualKeys[virtualKeys["VK_F14"] = 125] = "VK_F14";
    /** F15 key. */
    virtualKeys[virtualKeys["VK_F15"] = 126] = "VK_F15";
    /** F16 key. */
    virtualKeys[virtualKeys["VK_F16"] = 127] = "VK_F16";
    /** F17 key. */
    virtualKeys[virtualKeys["VK_F17"] = 128] = "VK_F17";
    /** F18 key. */
    virtualKeys[virtualKeys["VK_F18"] = 129] = "VK_F18";
    /** F19 key. */
    virtualKeys[virtualKeys["VK_F19"] = 130] = "VK_F19";
    /** F20 key. */
    virtualKeys[virtualKeys["VK_F20"] = 131] = "VK_F20";
    /** F21 key. */
    virtualKeys[virtualKeys["VK_F21"] = 132] = "VK_F21";
    /** F22 key. */
    virtualKeys[virtualKeys["VK_F22"] = 133] = "VK_F22";
    /** F23 key. */
    virtualKeys[virtualKeys["VK_F23"] = 134] = "VK_F23";
    /** F24 key. */
    virtualKeys[virtualKeys["VK_F24"] = 135] = "VK_F24";
    /** Num Lock key. */
    virtualKeys[virtualKeys["VK_NUM_LOCK"] = 144] = "VK_NUM_LOCK";
    /** Scroll Lock key. */
    virtualKeys[virtualKeys["VK_SCROLL_LOCK"] = 145] = "VK_SCROLL_LOCK";
    /** Circumflex (^) key. Requires Gecko 15.0 */
    virtualKeys[virtualKeys["VK_CIRCUMFLEX"] = 160] = "VK_CIRCUMFLEX";
    /** Exclamation (!) key. Requires Gecko 15.0 */
    virtualKeys[virtualKeys["VK_EXCLAMATION"] = 161] = "VK_EXCLAMATION";
    /** Double quote () key. Requires Gecko 15.0 */
    virtualKeys[virtualKeys["VK_DOUBLE_QUOTE"] = 162] = "VK_DOUBLE_QUOTE";
    /** Hash (#) key. Requires Gecko 15.0 */
    virtualKeys[virtualKeys["VK_HASH"] = 163] = "VK_HASH";
    /** Dollar sign ($) key. Requires Gecko 15.0 */
    virtualKeys[virtualKeys["VK_DOLLAR"] = 164] = "VK_DOLLAR";
    /** Percent (%) key. Requires Gecko 15.0 */
    virtualKeys[virtualKeys["VK_PERCENT"] = 165] = "VK_PERCENT";
    /** Ampersand (&) key. Requires Gecko 15.0 */
    virtualKeys[virtualKeys["VK_AMPERSAND"] = 166] = "VK_AMPERSAND";
    /** Underscore (_) key. Requires Gecko 15.0 */
    virtualKeys[virtualKeys["VK_UNDERSCORE"] = 167] = "VK_UNDERSCORE";
    /** Open parenthesis (() key. Requires Gecko 15.0 */
    virtualKeys[virtualKeys["VK_OPEN_PAREN"] = 168] = "VK_OPEN_PAREN";
    /** Close parenthesis ()) key. Requires Gecko 15.0 */
    virtualKeys[virtualKeys["VK_CLOSE_PAREN"] = 169] = "VK_CLOSE_PAREN";
    /* Asterisk (*) key. Requires Gecko 15.0 */
    virtualKeys[virtualKeys["VK_ASTERISK"] = 170] = "VK_ASTERISK";
    /** Plus (+) key. Requires Gecko 15.0 */
    virtualKeys[virtualKeys["VK_PLUS"] = 171] = "VK_PLUS";
    /** Pipe (|) key. Requires Gecko 15.0 */
    virtualKeys[virtualKeys["VK_PIPE"] = 172] = "VK_PIPE";
    /** Hyphen-US/docs/Minus (-) key. Requires Gecko 15.0 */
    virtualKeys[virtualKeys["VK_HYPHEN_MINUS"] = 173] = "VK_HYPHEN_MINUS";
    /** Open curly bracket ({) key. Requires Gecko 15.0 */
    virtualKeys[virtualKeys["VK_OPEN_CURLY_BRACKET"] = 174] = "VK_OPEN_CURLY_BRACKET";
    /** Close curly bracket (}) key. Requires Gecko 15.0 */
    virtualKeys[virtualKeys["VK_CLOSE_CURLY_BRACKET"] = 175] = "VK_CLOSE_CURLY_BRACKET";
    /** Tilde (~) key. Requires Gecko 15.0 */
    virtualKeys[virtualKeys["VK_TILDE"] = 176] = "VK_TILDE";
    /** Comma (,) key. */
    virtualKeys[virtualKeys["VK_COMMA"] = 188] = "VK_COMMA";
    /** Period (.) key. */
    virtualKeys[virtualKeys["VK_PERIOD"] = 190] = "VK_PERIOD";
    /** Slash (/) key. */
    virtualKeys[virtualKeys["VK_SLASH"] = 191] = "VK_SLASH";
    /** Back tick (`) key. */
    virtualKeys[virtualKeys["VK_BACK_QUOTE"] = 192] = "VK_BACK_QUOTE";
    /** Open square bracket ([) key. */
    virtualKeys[virtualKeys["VK_OPEN_BRACKET"] = 219] = "VK_OPEN_BRACKET";
    /** Back slash (\) key. */
    virtualKeys[virtualKeys["VK_BACK_SLASH"] = 220] = "VK_BACK_SLASH";
    /** Close square bracket (]) key. */
    virtualKeys[virtualKeys["VK_CLOSE_BRACKET"] = 221] = "VK_CLOSE_BRACKET";
    /** Quote (''') key. */
    virtualKeys[virtualKeys["VK_QUOTE"] = 222] = "VK_QUOTE";
    /** Meta key on Linux, Command key on Mac. */
    virtualKeys[virtualKeys["VK_META"] = 224] = "VK_META";
    /** AltGr key on Linux. Requires Gecko 15.0 */
    virtualKeys[virtualKeys["VK_ALTGR"] = 225] = "VK_ALTGR";
    /** Windows logo key on Windows. Or Super or Hyper key on Linux.
    Requires Gecko 15.0 */
    virtualKeys[virtualKeys["VK_WIN"] = 91] = "VK_WIN";
    /** Linux support for this keycode was added in Gecko 4.0. */
    virtualKeys[virtualKeys["VK_KANA"] = 21] = "VK_KANA";
    /** Linux support for this keycode was added in Gecko 4.0. */
    virtualKeys[virtualKeys["VK_HANGUL"] = 21] = "VK_HANGUL";
    /** è‹±æ•° key on Japanese Mac keyboard. Requires Gecko 15.0 */
    virtualKeys[virtualKeys["VK_EISU"] = 22] = "VK_EISU";
    /** Linux support for this keycode was added in Gecko 4.0. */
    virtualKeys[virtualKeys["VK_JUNJA"] = 23] = "VK_JUNJA";
    /** Linux support for this keycode was added in Gecko 4.0. */
    virtualKeys[virtualKeys["VK_FINAL"] = 24] = "VK_FINAL";
    /** Linux support for this keycode was added in Gecko 4.0. */
    virtualKeys[virtualKeys["VK_HANJA"] = 25] = "VK_HANJA";
    /** Linux support for this keycode was added in Gecko 4.0. */
    virtualKeys[virtualKeys["VK_KANJI"] = 25] = "VK_KANJI";
    /** Linux support for this keycode was added in Gecko 4.0. */
    virtualKeys[virtualKeys["VK_CONVERT"] = 28] = "VK_CONVERT";
    /** Linux support for this keycode was added in Gecko 4.0. */
    virtualKeys[virtualKeys["VK_NONCONVERT"] = 29] = "VK_NONCONVERT";
    /** Linux support for this keycode was added in Gecko 4.0. */
    virtualKeys[virtualKeys["VK_ACCEPT"] = 30] = "VK_ACCEPT";
    /** Linux support for this keycode was added in Gecko 4.0. */
    virtualKeys[virtualKeys["VK_MODECHANGE"] = 31] = "VK_MODECHANGE";
    /** Linux support for this keycode was added in Gecko 4.0. */
    virtualKeys[virtualKeys["VK_SELECT"] = 41] = "VK_SELECT";
    /** Linux support for this keycode was added in Gecko 4.0. */
    virtualKeys[virtualKeys["VK_PRINT"] = 42] = "VK_PRINT";
    /** Linux support for this keycode was added in Gecko 4.0. */
    virtualKeys[virtualKeys["VK_EXECUTE"] = 43] = "VK_EXECUTE";
    /** Linux support for this keycode was added in Gecko 4.0.	 */
    virtualKeys[virtualKeys["VK_SLEEP"] = 95] = "VK_SLEEP";
})(virtualKeys || (virtualKeys = {}));
