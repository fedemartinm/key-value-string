%lex

%%

\s+                         /* skip whitespace */
\"[^\"]*\"                  return 'QUOTED_STRING'
[^=,;"\s]+                  return 'UNQUOTED_STRING'
"="                         return '='
","                         return ','
";"                         return ';'
<<EOF>>                     return 'EOF'

/lex

%%

document
    : pairs EOF         { return $1; }
    | EOF               { return {}; }
    ;

pairs
    : pairs pair        { Object.assign($1, $2); $$ = $1; }
    | pair              { $$ = $1; }
    ;

pair
    : UNQUOTED_STRING '=' value_list ';'    { $$ = {}; $$[$1] = $3.length === 1 ? $3[0] : $3; }
    | UNQUOTED_STRING '=' ';'               { $$ = {}; $$[$1] = null; }
    ;

value_list
    : value_list ',' simple_value   { $1.push($3); $$ = $1; }
    | simple_value                  { $$ = [$1]; }
    | value_list ','                { $1.push(null); $$ = $1; }
    ;

simple_value
    : QUOTED_STRING     { $$ = $1.slice(1, -1); }
    | UNQUOTED_STRING   { 
        const num = parseFloat($1);
        if (!isNaN(num) && isFinite(num) && (String(num) === $1 || ($1 === '-0' && num === 0))) {
          $$ = num;
        } else {
          $$ = $1;
        }
      }
    ; 