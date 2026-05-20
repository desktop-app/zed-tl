; Tree-sitter style highlight names for editors that consume the
; grammar directly (Neovim, Helix, etc.). The Zed extension carries
; its own highlights.scm with Zed's @-prefixed scopes.

(comment) @comment

(section_marker) @keyword

(constructor_id) @constant.numeric

(flags_ref) @keyword

(bitmask_type) @type.builtin
(bitmask_param) @type.builtin

(field name: (identifier) @property)
(field type: (type_expr (qualified_name) @type))
(field type: (type_expr (type_args) @type))

(type_var_param name: (identifier) @variable.parameter)
(type_var_param type: (type_expr (qualified_name) @type))

(size_param (type_expr (qualified_name) @type))
(array_param (type_expr (qualified_name) @type))

(result_type) @type
(result_type (qualified_name) @type)
(result_type (type_args) @type)

[":" "=" "?" "*"] @operator

[";" "," "."] @punctuation.delimiter
["{" "}" "[" "]" "<" ">"] @punctuation.bracket

(number) @number
