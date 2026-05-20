; Comments — line and block.
(comment) @comment

; Section markers like ---functions--- / ---types---.
(section_marker) @keyword

; Constructor id (the #abcd1234 hex hash after a combinator name).
(constructor_id) @constant.numeric

; Reference to a flag bit in a conditional field, e.g. flags.5
(flags_ref) @keyword.modifier

; Bare # used as a built-in nat / bitmask type marker.
(bitmask_type) @type.builtin
(bitmask_param) @type.builtin

; Field names (left of ":").
(field name: (identifier) @property)

; Field type (right of ":"), the equivalent of Prism's "function" token.
(field type: (type_expr (qualified_name) @type))
(field type: (type_expr (type_args) @type))

; Type variable parameters: {t:Type}
(type_var_param name: (identifier) @variable.parameter)
(type_var_param type: (type_expr (qualified_name) @type))

; Size and array parameters: 4*[ int ], [ t ]
(size_param (type_expr (qualified_name) @type))
(array_param (type_expr (qualified_name) @type))

; Result type, between "=" and ";". Equivalent to Prism's "class-name".
(result_type) @type
(result_type (qualified_name) @type)
(result_type (type_args) @type)

; Operators.
[
  ":"
  "="
  "?"
  "*"
] @operator

; Punctuation.
[
  ";"
  ","
  "."
] @punctuation.delimiter

[
  "{"
  "}"
  "["
  "]"
  "<"
  ">"
] @punctuation.bracket

; Numeric literals (sizes like the 4 in "4*[ int ]").
(number) @number
