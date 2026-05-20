/**
 * Tree-sitter grammar for Telegram Type Language (TL).
 *
 * This is a faithful port of the regex-based highlighter in
 * libprisma's prism-tl.js component
 * (https://github.com/desktop-app/libprisma). The structure is kept
 * intentionally thin: leaf tokens mirror the original Prism regex
 * categories so that highlights.scm can map them one-to-one.
 *
 * Prism token mapping:
 *   builtin     -> section_marker, bitmask, bitmask_type, flags_ref
 *   comment     -> comment
 *   function    -> field.type
 *   punctuation -> "{", "}", "[", "]", ";", ",", "<", ">"
 *   operator    -> ":", "="
 *   entity      -> constructor_id
 *   class-name  -> result_type
 */

module.exports = grammar({
  name: 'tl',

  extras: $ => [/[ \t\r\n]+/, $.comment],

  word: $ => $.identifier,

  rules: {
    source_file: $ => repeat(choice(
      $.section_marker,
      $.declaration,
    )),

    comment: $ => token(choice(
      seq('//', /[^\n]*/),
      seq('/*', /[^*]*\*+([^/*][^*]*\*+)*\//),
    )),

    section_marker: $ => /---(?:functions|types)---/,

    declaration: $ => seq(
      field('name', $.qualified_name),
      optional(field('id', $.constructor_id)),
      repeat($._param),
      '=',
      field('result', $.result_type),
      ';',
    ),

    qualified_name: $ => prec.right(seq(
      $.identifier,
      repeat(seq('.', $.identifier)),
    )),

    constructor_id: $ => /#[a-fA-F0-9]+/,

    _param: $ => choice(
      $.type_var_param,
      $.size_param,
      $.array_param,
      $.bitmask_param,
      $.wildcard_param,
      $.field,
    ),

    wildcard_param: $ => '?',

    type_var_param: $ => seq(
      '{',
      field('name', $.identifier),
      ':',
      field('type', $.type_expr),
      '}',
    ),

    size_param: $ => seq(
      $.number,
      '*',
      '[',
      $.type_expr,
      ']',
    ),

    array_param: $ => seq('[', $.type_expr, ']'),

    bitmask_param: $ => '#',

    field: $ => seq(
      field('name', $.identifier),
      ':',
      optional(seq(field('condition', $.flags_ref), '?')),
      field('type', $.type_expr),
    ),

    flags_ref: $ => /flags\d?\.\d+/,

    type_expr: $ => prec.right(choice(
      $.bitmask_type,
      seq($.qualified_name, optional($.type_args)),
    )),

    bitmask_type: $ => '#',

    type_args: $ => seq(
      '<',
      $.type_expr,
      repeat(seq(',', $.type_expr)),
      '>',
    ),

    result_type: $ => prec.right(seq(
      $.qualified_name,
      repeat(choice($.qualified_name, $.type_args)),
    )),

    identifier: $ => /[a-zA-Z_!][a-zA-Z0-9_!]*/,

    number: $ => /\d+/,
  },
});
