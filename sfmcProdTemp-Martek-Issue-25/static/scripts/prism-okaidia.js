/* PrismJS 1.10.0
http://prismjs.com/download.html?themes=prism-okaidia&languages=markup+css+clike+javascript+aspnet+bash+csharp+ruby+go+java+json+php+powershell+properties+python+sql+typescript&plugins=line-highlight+line-numbers+autolinker+wpd+custom-class+file-highlight+toolbar+jsonp-highlight+highlight-keywords+remove-initial-line-feed+previewers+autoloader+unescaped-markup+command-line+normalize-whitespace+keep-markup+data-uri-highlight+show-language+copy-to-clipboard */
var _self =
    "undefined" != typeof window
      ? window
      : "undefined" != typeof WorkerGlobalScope &&
        self instanceof WorkerGlobalScope
      ? self
      : {},
  Prism = (function () {
    var e = /\blang(?:uage)?-(\w+)\b/i,
      t = 0,
      n = (_self.Prism = {
        manual: _self.Prism && _self.Prism.manual,
        disableWorkerMessageHandler:
          _self.Prism && _self.Prism.disableWorkerMessageHandler,
        util: {
          encode: function (e) {
            return e instanceof r
              ? new r(e.type, n.util.encode(e.content), e.alias)
              : "Array" === n.util.type(e)
              ? e.map(n.util.encode)
              : e
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/\u00a0/g, " ");
          },
          type: function (e) {
            return Object.prototype.toString
              .call(e)
              .match(/\[object (\w+)\]/)[1];
          },
          objId: function (e) {
            return (
              e.__id || Object.defineProperty(e, "__id", { value: ++t }), e.__id
            );
          },
          clone: function (e) {
            var t = n.util.type(e);
            switch (t) {
              case "Object":
                var r = {};
                for (var a in e)
                  e.hasOwnProperty(a) && (r[a] = n.util.clone(e[a]));
                return r;
              case "Array":
                return e.map(function (e) {
                  return n.util.clone(e);
                });
            }
            return e;
          },
        },
        languages: {
          extend: function (e, t) {
            var r = n.util.clone(n.languages[e]);
            for (var a in t) r[a] = t[a];
            return r;
          },
          insertBefore: function (e, t, r, a) {
            a = a || n.languages;
            var l = a[e];
            if (2 == arguments.length) {
              r = arguments[1];
              for (var i in r) r.hasOwnProperty(i) && (l[i] = r[i]);
              return l;
            }
            var o = {};
            for (var s in l)
              if (l.hasOwnProperty(s)) {
                if (s == t)
                  for (var i in r) r.hasOwnProperty(i) && (o[i] = r[i]);
                o[s] = l[s];
              }
            return (
              n.languages.DFS(n.languages, function (t, n) {
                n === a[e] && t != e && (this[t] = o);
              }),
              (a[e] = o)
            );
          },
          DFS: function (e, t, r, a) {
            a = a || {};
            for (var l in e)
              e.hasOwnProperty(l) &&
                (t.call(e, l, e[l], r || l),
                "Object" !== n.util.type(e[l]) || a[n.util.objId(e[l])]
                  ? "Array" !== n.util.type(e[l]) ||
                    a[n.util.objId(e[l])] ||
                    ((a[n.util.objId(e[l])] = !0),
                    n.languages.DFS(e[l], t, l, a))
                  : ((a[n.util.objId(e[l])] = !0),
                    n.languages.DFS(e[l], t, null, a)));
          },
        },
        plugins: {},
        highlightAll: function (e, t) {
          n.highlightAllUnder(document, e, t);
        },
        highlightAllUnder: function (e, t, r) {
          var a = {
            callback: r,
            selector:
              'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
          };
          n.hooks.run("before-highlightall", a);
          for (
            var l, i = a.elements || e.querySelectorAll(a.selector), o = 0;
            (l = i[o++]);

          )
            n.highlightElement(l, t === !0, a.callback);
        },
        highlightElement: function (t, r, a) {
          for (var l, i, o = t; o && !e.test(o.className); ) o = o.parentNode;
          o &&
            ((l = (o.className.match(e) || [, ""])[1].toLowerCase()),
            (i = n.languages[l])),
            (t.className =
              t.className.replace(e, "").replace(/\s+/g, " ") +
              " language-" +
              l),
            t.parentNode &&
              ((o = t.parentNode),
              /pre/i.test(o.nodeName) &&
                (o.className =
                  o.className.replace(e, "").replace(/\s+/g, " ") +
                  " language-" +
                  l));
          var s = t.textContent,
            g = { element: t, language: l, grammar: i, code: s };
          if ((n.hooks.run("before-sanity-check", g), !g.code || !g.grammar))
            return (
              g.code &&
                (n.hooks.run("before-highlight", g),
                (g.element.textContent = g.code),
                n.hooks.run("after-highlight", g)),
              n.hooks.run("complete", g),
              void 0
            );
          if ((n.hooks.run("before-highlight", g), r && _self.Worker)) {
            var u = new Worker(n.filename);
            (u.onmessage = function (e) {
              (g.highlightedCode = e.data),
                n.hooks.run("before-insert", g),
                (g.element.innerHTML = g.highlightedCode),
                a && a.call(g.element),
                n.hooks.run("after-highlight", g),
                n.hooks.run("complete", g);
            }),
              u.postMessage(
                JSON.stringify({
                  language: g.language,
                  code: g.code,
                  immediateClose: !0,
                })
              );
          } else
            (g.highlightedCode = n.highlight(g.code, g.grammar, g.language)),
              n.hooks.run("before-insert", g),
              (g.element.innerHTML = g.highlightedCode),
              a && a.call(t),
              n.hooks.run("after-highlight", g),
              n.hooks.run("complete", g);
        },
        highlight: function (e, t, a) {
          var l = n.tokenize(e, t);
          return r.stringify(n.util.encode(l), a);
        },
        matchGrammar: function (e, t, r, a, l, i, o) {
          var s = n.Token;
          for (var g in r)
            if (r.hasOwnProperty(g) && r[g]) {
              if (g == o) return;
              var u = r[g];
              u = "Array" === n.util.type(u) ? u : [u];
              for (var c = 0; c < u.length; ++c) {
                var h = u[c],
                  f = h.inside,
                  d = !!h.lookbehind,
                  m = !!h.greedy,
                  p = 0,
                  y = h.alias;
                if (m && !h.pattern.global) {
                  var v = h.pattern.toString().match(/[imuy]*$/)[0];
                  h.pattern = RegExp(h.pattern.source, v + "g");
                }
                h = h.pattern || h;
                for (var b = a, k = l; b < t.length; k += t[b].length, ++b) {
                  var w = t[b];
                  if (t.length > e.length) return;
                  if (!(w instanceof s)) {
                    h.lastIndex = 0;
                    var _ = h.exec(w),
                      P = 1;
                    if (!_ && m && b != t.length - 1) {
                      if (((h.lastIndex = k), (_ = h.exec(e)), !_)) break;
                      for (
                        var A = _.index + (d ? _[1].length : 0),
                          j = _.index + _[0].length,
                          x = b,
                          O = k,
                          N = t.length;
                        N > x && (j > O || (!t[x].type && !t[x - 1].greedy));
                        ++x
                      )
                        (O += t[x].length), A >= O && (++b, (k = O));
                      if (t[b] instanceof s || t[x - 1].greedy) continue;
                      (P = x - b), (w = e.slice(k, O)), (_.index -= k);
                    }
                    if (_) {
                      d && (p = _[1].length);
                      var A = _.index + p,
                        _ = _[0].slice(p),
                        j = A + _.length,
                        S = w.slice(0, A),
                        C = w.slice(j),
                        M = [b, P];
                      S && (++b, (k += S.length), M.push(S));
                      var E = new s(g, f ? n.tokenize(_, f) : _, y, _, m);
                      if (
                        (M.push(E),
                        C && M.push(C),
                        Array.prototype.splice.apply(t, M),
                        1 != P && n.matchGrammar(e, t, r, b, k, !0, g),
                        i)
                      )
                        break;
                    } else if (i) break;
                  }
                }
              }
            }
        },
        tokenize: function (e, t) {
          var r = [e],
            a = t.rest;
          if (a) {
            for (var l in a) t[l] = a[l];
            delete t.rest;
          }
          return n.matchGrammar(e, r, t, 0, 0, !1), r;
        },
        hooks: {
          all: {},
          add: function (e, t) {
            var r = n.hooks.all;
            (r[e] = r[e] || []), r[e].push(t);
          },
          run: function (e, t) {
            var r = n.hooks.all[e];
            if (r && r.length) for (var a, l = 0; (a = r[l++]); ) a(t);
          },
        },
      }),
      r = (n.Token = function (e, t, n, r, a) {
        (this.type = e),
          (this.content = t),
          (this.alias = n),
          (this.length = 0 | (r || "").length),
          (this.greedy = !!a);
      });
    if (
      ((r.stringify = function (e, t, a) {
        if ("string" == typeof e) return e;
        if ("Array" === n.util.type(e))
          return e
            .map(function (n) {
              return r.stringify(n, t, e);
            })
            .join("");
        var l = {
          type: e.type,
          content: r.stringify(e.content, t, a),
          tag: "span",
          classes: ["token", e.type],
          attributes: {},
          language: t,
          parent: a,
        };
        if (e.alias) {
          var i = "Array" === n.util.type(e.alias) ? e.alias : [e.alias];
          Array.prototype.push.apply(l.classes, i);
        }
        n.hooks.run("wrap", l);
        var o = Object.keys(l.attributes)
          .map(function (e) {
            return (
              e + '="' + (l.attributes[e] || "").replace(/"/g, "&quot;") + '"'
            );
          })
          .join(" ");
        return (
          "<" +
          l.tag +
          ' class="' +
          l.classes.join(" ") +
          '"' +
          (o ? " " + o : "") +
          ">" +
          l.content +
          "</" +
          l.tag +
          ">"
        );
      }),
      !_self.document)
    )
      return _self.addEventListener
        ? (n.disableWorkerMessageHandler ||
            _self.addEventListener(
              "message",
              function (e) {
                var t = JSON.parse(e.data),
                  r = t.language,
                  a = t.code,
                  l = t.immediateClose;
                _self.postMessage(n.highlight(a, n.languages[r], r)),
                  l && _self.close();
              },
              !1
            ),
          _self.Prism)
        : _self.Prism;
    var a =
      document.currentScript ||
      [].slice.call(document.getElementsByTagName("script")).pop();
    return (
      a &&
        ((n.filename = a.src),
        n.manual ||
          a.hasAttribute("data-manual") ||
          ("loading" !== document.readyState
            ? window.requestAnimationFrame
              ? window.requestAnimationFrame(n.highlightAll)
              : window.setTimeout(n.highlightAll, 16)
            : document.addEventListener("DOMContentLoaded", n.highlightAll))),
      _self.Prism
    );
  })();
"undefined" != typeof module && module.exports && (module.exports = Prism),
  "undefined" != typeof global && (global.Prism = Prism);
(Prism.languages.markup = {
  comment: /<!--[\s\S]*?-->/,
  prolog: /<\?[\s\S]+?\?>/,
  doctype: /<!DOCTYPE[\s\S]+?>/i,
  cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
  tag: {
    pattern:
      /<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>\/]+/i,
        inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
      },
      "attr-value": {
        pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
        inside: {
          punctuation: [/^=/, { pattern: /(^|[^\\])["']/, lookbehind: !0 }],
        },
      },
      punctuation: /\/?>/,
      "attr-name": {
        pattern: /[^\s>\/]+/,
        inside: { namespace: /^[^\s>\/:]+:/ },
      },
    },
  },
  entity: /&#?[\da-z]{1,8};/i,
}),
  (Prism.languages.markup.tag.inside["attr-value"].inside.entity =
    Prism.languages.markup.entity),
  Prism.hooks.add("wrap", function (a) {
    "entity" === a.type &&
      (a.attributes.title = a.content.replace(/&amp;/, "&"));
  }),
  (Prism.languages.xml = Prism.languages.markup),
  (Prism.languages.html = Prism.languages.markup),
  (Prism.languages.mathml = Prism.languages.markup),
  (Prism.languages.svg = Prism.languages.markup);
(Prism.languages.css = {
  comment: /\/\*[\s\S]*?\*\//,
  atrule: {
    pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
    inside: { rule: /@[\w-]+/ },
  },
  url: /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
  selector: /[^{}\s][^{};]*?(?=\s*\{)/,
  string: {
    pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
  },
  property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
  important: /\B!important\b/i,
  function: /[-a-z0-9]+(?=\()/i,
  punctuation: /[(){};:]/,
}),
  (Prism.languages.css.atrule.inside.rest = Prism.util.clone(
    Prism.languages.css
  )),
  Prism.languages.markup &&
    (Prism.languages.insertBefore("markup", "tag", {
      style: {
        pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
        lookbehind: !0,
        inside: Prism.languages.css,
        alias: "language-css",
        greedy: !0,
      },
    }),
    Prism.languages.insertBefore(
      "inside",
      "attr-value",
      {
        "style-attr": {
          pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
          inside: {
            "attr-name": {
              pattern: /^\s*style/i,
              inside: Prism.languages.markup.tag.inside,
            },
            punctuation: /^\s*=\s*['"]|['"]\s*$/,
            "attr-value": { pattern: /.+/i, inside: Prism.languages.css },
          },
          alias: "language-css",
        },
      },
      Prism.languages.markup.tag
    ));
Prism.languages.clike = {
  comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0 },
  ],
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
  },
  "class-name": {
    pattern:
      /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
    lookbehind: !0,
    inside: { punctuation: /[.\\]/ },
  },
  keyword:
    /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  boolean: /\b(?:true|false)\b/,
  function: /[a-z0-9_]+(?=\()/i,
  number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
  operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
  punctuation: /[{}[\];(),.:]/,
};
(Prism.languages.javascript = Prism.languages.extend("clike", {
  keyword:
    /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
  number:
    /\b-?(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|\d*\.?\d+(?:[Ee][+-]?\d+)?|NaN|Infinity)\b/,
  function: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,
  operator:
    /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/,
})),
  Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
      pattern:
        /(^|[^\/])\/(?!\/)(\[[^\]\r\n]+]|\\.|[^\/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
      lookbehind: !0,
      greedy: !0,
    },
    "function-variable": {
      pattern:
        /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
      alias: "function",
    },
  }),
  Prism.languages.insertBefore("javascript", "string", {
    "template-string": {
      pattern: /`(?:\\[\s\S]|[^\\`])*`/,
      greedy: !0,
      inside: {
        interpolation: {
          pattern: /\$\{[^}]+\}/,
          inside: {
            "interpolation-punctuation": {
              pattern: /^\$\{|\}$/,
              alias: "punctuation",
            },
            rest: Prism.languages.javascript,
          },
        },
        string: /[\s\S]+/,
      },
    },
  }),
  Prism.languages.markup &&
    Prism.languages.insertBefore("markup", "tag", {
      script: {
        pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
        lookbehind: !0,
        inside: Prism.languages.javascript,
        alias: "language-javascript",
        greedy: !0,
      },
    }),
  (Prism.languages.js = Prism.languages.javascript);
(Prism.languages.aspnet = Prism.languages.extend("markup", {
  "page-directive tag": {
    pattern: /<%\s*@.*%>/i,
    inside: {
      "page-directive tag":
        /<%\s*@\s*(?:Assembly|Control|Implements|Import|Master(?:Type)?|OutputCache|Page|PreviousPageType|Reference|Register)?|%>/i,
      rest: Prism.languages.markup.tag.inside,
    },
  },
  "directive tag": {
    pattern: /<%.*%>/i,
    inside: {
      "directive tag": /<%\s*?[$=%#:]{0,2}|%>/i,
      rest: Prism.languages.csharp,
    },
  },
})),
  (Prism.languages.aspnet.tag.pattern =
    /<(?!%)\/?[^\s>\/]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i),
  Prism.languages.insertBefore(
    "inside",
    "punctuation",
    { "directive tag": Prism.languages.aspnet["directive tag"] },
    Prism.languages.aspnet.tag.inside["attr-value"]
  ),
  Prism.languages.insertBefore("aspnet", "comment", {
    "asp comment": /<%--[\s\S]*?--%>/,
  }),
  Prism.languages.insertBefore(
    "aspnet",
    Prism.languages.javascript ? "script" : "tag",
    {
      "asp script": {
        pattern:
          /(<script(?=.*runat=['"]?server['"]?)[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
        lookbehind: !0,
        inside: Prism.languages.csharp || {},
      },
    }
  );
!(function (e) {
  var t = {
    variable: [
      {
        pattern: /\$?\(\([\s\S]+?\)\)/,
        inside: {
          variable: [
            { pattern: /(^\$\(\([\s\S]+)\)\)/, lookbehind: !0 },
            /^\$\(\(/,
          ],
          number: /\b-?(?:0x[\dA-Fa-f]+|\d*\.?\d+(?:[Ee]-?\d+)?)\b/,
          operator:
            /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
          punctuation: /\(\(?|\)\)?|,|;/,
        },
      },
      {
        pattern: /\$\([^)]+\)|`[^`]+`/,
        inside: { variable: /^\$\(|^`|\)$|`$/ },
      },
      /\$(?:[\w#?*!@]+|\{[^}]+\})/i,
    ],
  };
  e.languages.bash = {
    shebang: {
      pattern: /^#!\s*\/bin\/bash|^#!\s*\/bin\/sh/,
      alias: "important",
    },
    comment: { pattern: /(^|[^"{\\])#.*/, lookbehind: !0 },
    string: [
      {
        pattern: /((?:^|[^<])<<\s*)["']?(\w+?)["']?\s*\r?\n(?:[\s\S])*?\r?\n\2/,
        lookbehind: !0,
        greedy: !0,
        inside: t,
      },
      { pattern: /(["'])(?:\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0, inside: t },
    ],
    variable: t.variable,
    function: {
      pattern:
        /(^|[\s;|&])(?:alias|apropos|apt-get|aptitude|aspell|awk|basename|bash|bc|bg|builtin|bzip2|cal|cat|cd|cfdisk|chgrp|chmod|chown|chroot|chkconfig|cksum|clear|cmp|comm|command|cp|cron|crontab|csplit|cut|date|dc|dd|ddrescue|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|enable|env|ethtool|eval|exec|expand|expect|export|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|getopts|git|grep|groupadd|groupdel|groupmod|groups|gzip|hash|head|help|hg|history|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|jobs|join|kill|killall|less|link|ln|locate|logname|logout|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|make|man|mkdir|mkfifo|mkisofs|mknod|more|most|mount|mtools|mtr|mv|mmv|nano|netstat|nice|nl|nohup|notify-send|npm|nslookup|open|op|passwd|paste|pathchk|ping|pkill|popd|pr|printcap|printenv|printf|ps|pushd|pv|pwd|quota|quotacheck|quotactl|ram|rar|rcp|read|readarray|readonly|reboot|rename|renice|remsync|rev|rm|rmdir|rsync|screen|scp|sdiff|sed|seq|service|sftp|shift|shopt|shutdown|sleep|slocate|sort|source|split|ssh|stat|strace|su|sudo|sum|suspend|sync|tail|tar|tee|test|time|timeout|times|touch|top|traceroute|trap|tr|tsort|tty|type|ulimit|umask|umount|unalias|uname|unexpand|uniq|units|unrar|unshar|uptime|useradd|userdel|usermod|users|uuencode|uudecode|v|vdir|vi|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yes|zip)(?=$|[\s;|&])/,
      lookbehind: !0,
    },
    keyword: {
      pattern:
        /(^|[\s;|&])(?:let|:|\.|if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)(?=$|[\s;|&])/,
      lookbehind: !0,
    },
    boolean: {
      pattern: /(^|[\s;|&])(?:true|false)(?=$|[\s;|&])/,
      lookbehind: !0,
    },
    operator: /&&?|\|\|?|==?|!=?|<<<?|>>|<=?|>=?|=~/,
    punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];]/,
  };
  var a = t.variable[1].inside;
  (a["function"] = e.languages.bash["function"]),
    (a.keyword = e.languages.bash.keyword),
    (a.boolean = e.languages.bash.boolean),
    (a.operator = e.languages.bash.operator),
    (a.punctuation = e.languages.bash.punctuation);
})(Prism);
(Prism.languages.csharp = Prism.languages.extend("clike", {
  keyword:
    /\b(abstract|as|async|await|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|do|double|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|goto|if|implicit|in|int|interface|internal|is|lock|long|namespace|new|null|object|operator|out|override|params|private|protected|public|readonly|ref|return|sbyte|sealed|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|uint|ulong|unchecked|unsafe|ushort|using|virtual|void|volatile|while|add|alias|ascending|async|await|descending|dynamic|from|get|global|group|into|join|let|orderby|partial|remove|select|set|value|var|where|yield)\b/,
  string: [
    { pattern: /@("|')(?:\1\1|\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0 },
    { pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*?\1/, greedy: !0 },
  ],
  number: /\b-?(?:0x[\da-f]+|\d*\.?\d+f?)\b/i,
})),
  Prism.languages.insertBefore("csharp", "keyword", {
    "generic-method": {
      pattern: /[a-z0-9_]+\s*<[^>\r\n]+?>\s*(?=\()/i,
      alias: "function",
      inside: {
        keyword: Prism.languages.csharp.keyword,
        punctuation: /[<>(),.:]/,
      },
    },
    preprocessor: {
      pattern: /(^\s*)#.*/m,
      lookbehind: !0,
      alias: "property",
      inside: {
        directive: {
          pattern:
            /(\s*#)\b(?:define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/,
          lookbehind: !0,
          alias: "keyword",
        },
      },
    },
  });
!(function (e) {
  e.languages.ruby = e.languages.extend("clike", {
    comment: [
      /#(?!\{[^\r\n]*?\}).*/,
      /^=begin(?:\r?\n|\r)(?:.*(?:\r?\n|\r))*?=end/m,
    ],
    keyword:
      /\b(?:alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/,
  });
  var n = {
    pattern: /#\{[^}]+\}/,
    inside: {
      delimiter: { pattern: /^#\{|\}$/, alias: "tag" },
      rest: e.util.clone(e.languages.ruby),
    },
  };
  e.languages.insertBefore("ruby", "keyword", {
    regex: [
      {
        pattern: /%r([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[gim]{0,3}/,
        greedy: !0,
        inside: { interpolation: n },
      },
      {
        pattern: /%r\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/,
        greedy: !0,
        inside: { interpolation: n },
      },
      {
        pattern: /%r\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/,
        greedy: !0,
        inside: { interpolation: n },
      },
      {
        pattern: /%r\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/,
        greedy: !0,
        inside: { interpolation: n },
      },
      {
        pattern: /%r<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/,
        greedy: !0,
        inside: { interpolation: n },
      },
      {
        pattern:
          /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,
        lookbehind: !0,
        greedy: !0,
      },
    ],
    variable: /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
    symbol: /:[a-zA-Z_]\w*(?:[?!]|\b)/,
  }),
    e.languages.insertBefore("ruby", "number", {
      builtin:
        /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|Fixnum|Float|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
      constant: /\b[A-Z]\w*(?:[?!]|\b)/,
    }),
    (e.languages.ruby.string = [
      {
        pattern: /%[qQiIwWxs]?([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
        greedy: !0,
        inside: { interpolation: n },
      },
      {
        pattern: /%[qQiIwWxs]?\((?:[^()\\]|\\[\s\S])*\)/,
        greedy: !0,
        inside: { interpolation: n },
      },
      {
        pattern: /%[qQiIwWxs]?\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/,
        greedy: !0,
        inside: { interpolation: n },
      },
      {
        pattern: /%[qQiIwWxs]?\[(?:[^\[\]\\]|\\[\s\S])*\]/,
        greedy: !0,
        inside: { interpolation: n },
      },
      {
        pattern: /%[qQiIwWxs]?<(?:[^<>\\]|\\[\s\S])*>/,
        greedy: !0,
        inside: { interpolation: n },
      },
      {
        pattern: /("|')(?:#\{[^}]+\}|\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0,
        inside: { interpolation: n },
      },
    ]);
})(Prism);
(Prism.languages.go = Prism.languages.extend("clike", {
  keyword:
    /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
  builtin:
    /\b(?:bool|byte|complex(?:64|128)|error|float(?:32|64)|rune|string|u?int(?:8|16|32|64)?|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(?:ln)?|real|recover)\b/,
  boolean: /\b(?:_|iota|nil|true|false)\b/,
  operator:
    /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
  number: /\b(-?(0x[a-f\d]+|(\d+\.?\d*|\.\d+)(e[-+]?\d+)?)i?)\b/i,
  string: { pattern: /(["'`])(\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0 },
})),
  delete Prism.languages.go["class-name"];
(Prism.languages.java = Prism.languages.extend("clike", {
  keyword:
    /\b(?:abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/,
  number:
    /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp\-]+\b|\b\d*\.?\d+(?:e[+-]?\d+)?[df]?\b/i,
  operator: {
    pattern:
      /(^|[^.])(?:\+[+=]?|-[-=]?|!=?|<<?=?|>>?>?=?|==?|&[&=]?|\|[|=]?|\*=?|\/=?|%=?|\^=?|[?:~])/m,
    lookbehind: !0,
  },
})),
  Prism.languages.insertBefore("java", "function", {
    annotation: {
      alias: "punctuation",
      pattern: /(^|[^.])@\w+/,
      lookbehind: !0,
    },
  });
(Prism.languages.json = {
  property: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/i,
  string: { pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, greedy: !0 },
  number: /\b-?(?:0x[\dA-Fa-f]+|\d*\.?\d+(?:[Ee][+-]?\d+)?)\b/,
  punctuation: /[{}[\]);,]/,
  operator: /:/g,
  boolean: /\b(?:true|false)\b/i,
  null: /\bnull\b/i,
}),
  (Prism.languages.jsonp = Prism.languages.json);
(Prism.languages.php = Prism.languages.extend("clike", {
  string: { pattern: /(["'])(?:\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0 },
  keyword:
    /\b(?:and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,
  constant: /\b[A-Z0-9_]{2,}\b/,
  comment: { pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/, lookbehind: !0 },
})),
  Prism.languages.insertBefore("php", "class-name", {
    "shell-comment": {
      pattern: /(^|[^\\])#.*/,
      lookbehind: !0,
      alias: "comment",
    },
  }),
  Prism.languages.insertBefore("php", "keyword", {
    delimiter: { pattern: /\?>|<\?(?:php|=)?/i, alias: "important" },
    variable: /\$\w+\b/i,
    package: {
      pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
      lookbehind: !0,
      inside: { punctuation: /\\/ },
    },
  }),
  Prism.languages.insertBefore("php", "operator", {
    property: { pattern: /(->)[\w]+/, lookbehind: !0 },
  }),
  Prism.languages.markup &&
    (Prism.hooks.add("before-highlight", function (e) {
      "php" === e.language &&
        /(?:<\?php|<\?)/gi.test(e.code) &&
        ((e.tokenStack = []),
        (e.backupCode = e.code),
        (e.code = e.code.replace(
          /(?:<\?php|<\?)[\s\S]*?(?:\?>|$)/gi,
          function (a) {
            for (
              var n = e.tokenStack.length;
              -1 !== e.backupCode.indexOf("___PHP" + n + "___");

            )
              ++n;
            return (e.tokenStack[n] = a), "___PHP" + n + "___";
          }
        )),
        (e.grammar = Prism.languages.markup));
    }),
    Prism.hooks.add("before-insert", function (e) {
      "php" === e.language &&
        e.backupCode &&
        ((e.code = e.backupCode), delete e.backupCode);
    }),
    Prism.hooks.add("after-highlight", function (e) {
      if ("php" === e.language && e.tokenStack) {
        e.grammar = Prism.languages.php;
        for (var a = 0, n = Object.keys(e.tokenStack); a < n.length; ++a) {
          var t = n[a],
            r = e.tokenStack[t];
          e.highlightedCode = e.highlightedCode.replace(
            "___PHP" + t + "___",
            '<span class="token php language-php">' +
              Prism.highlight(r, e.grammar, "php").replace(/\$/g, "$$$$") +
              "</span>"
          );
        }
        e.element.innerHTML = e.highlightedCode;
      }
    }));
(Prism.languages.powershell = {
  comment: [
    { pattern: /(^|[^`])<#[\s\S]*?#>/, lookbehind: !0 },
    { pattern: /(^|[^`])#.*/, lookbehind: !0 },
  ],
  string: [
    {
      pattern: /"(?:`[\s\S]|[^`"])*"/,
      greedy: !0,
      inside: { function: { pattern: /[^`]\$\(.*?\)/, inside: {} } },
    },
    { pattern: /'(?:[^']|'')*'/, greedy: !0 },
  ],
  namespace: /\[[a-z][\s\S]*?\]/i,
  boolean: /\$(?:true|false)\b/i,
  variable: /\$\w+\b/i,
  function: [
    /\b(?:Add-(?:Computer|Content|History|Member|PSSnapin|Type)|Checkpoint-Computer|Clear-(?:Content|EventLog|History|Item|ItemProperty|Variable)|Compare-Object|Complete-Transaction|Connect-PSSession|ConvertFrom-(?:Csv|Json|StringData)|Convert-Path|ConvertTo-(?:Csv|Html|Json|Xml)|Copy-(?:Item|ItemProperty)|Debug-Process|Disable-(?:ComputerRestore|PSBreakpoint|PSRemoting|PSSessionConfiguration)|Disconnect-PSSession|Enable-(?:ComputerRestore|PSBreakpoint|PSRemoting|PSSessionConfiguration)|Enter-PSSession|Exit-PSSession|Export-(?:Alias|Clixml|Console|Csv|FormatData|ModuleMember|PSSession)|ForEach-Object|Format-(?:Custom|List|Table|Wide)|Get-(?:Alias|ChildItem|Command|ComputerRestorePoint|Content|ControlPanelItem|Culture|Date|Event|EventLog|EventSubscriber|FormatData|Help|History|Host|HotFix|Item|ItemProperty|Job|Location|Member|Module|Process|PSBreakpoint|PSCallStack|PSDrive|PSProvider|PSSession|PSSessionConfiguration|PSSnapin|Random|Service|TraceSource|Transaction|TypeData|UICulture|Unique|Variable|WmiObject)|Group-Object|Import-(?:Alias|Clixml|Csv|LocalizedData|Module|PSSession)|Invoke-(?:Command|Expression|History|Item|RestMethod|WebRequest|WmiMethod)|Join-Path|Limit-EventLog|Measure-(?:Command|Object)|Move-(?:Item|ItemProperty)|New-(?:Alias|Event|EventLog|Item|ItemProperty|Module|ModuleManifest|Object|PSDrive|PSSession|PSSessionConfigurationFile|PSSessionOption|PSTransportOption|Service|TimeSpan|Variable|WebServiceProxy)|Out-(?:Default|File|GridView|Host|Null|Printer|String)|Pop-Location|Push-Location|Read-Host|Receive-(?:Job|PSSession)|Register-(?:EngineEvent|ObjectEvent|PSSessionConfiguration|WmiEvent)|Remove-(?:Computer|Event|EventLog|Item|ItemProperty|Job|Module|PSBreakpoint|PSDrive|PSSession|PSSnapin|TypeData|Variable|WmiObject)|Rename-(?:Computer|Item|ItemProperty)|Reset-ComputerMachinePassword|Resolve-Path|Restart-(?:Computer|Service)|Restore-Computer|Resume-(?:Job|Service)|Save-Help|Select-(?:Object|String|Xml)|Send-MailMessage|Set-(?:Alias|Content|Date|Item|ItemProperty|Location|PSBreakpoint|PSDebug|PSSessionConfiguration|Service|StrictMode|TraceSource|Variable|WmiInstance)|Show-(?:Command|ControlPanelItem|EventLog)|Sort-Object|Split-Path|Start-(?:Job|Process|Service|Sleep|Transaction)|Stop-(?:Computer|Job|Process|Service)|Suspend-(?:Job|Service)|Tee-Object|Test-(?:ComputerSecureChannel|Connection|ModuleManifest|Path|PSSessionConfigurationFile)|Trace-Command|Unblock-File|Undo-Transaction|Unregister-(?:Event|PSSessionConfiguration)|Update-(?:FormatData|Help|List|TypeData)|Use-Transaction|Wait-(?:Event|Job|Process)|Where-Object|Write-(?:Debug|Error|EventLog|Host|Output|Progress|Verbose|Warning))\b/i,
    /\b(?:ac|cat|chdir|clc|cli|clp|clv|compare|copy|cp|cpi|cpp|cvpa|dbp|del|diff|dir|ebp|echo|epal|epcsv|epsn|erase|fc|fl|ft|fw|gal|gbp|gc|gci|gcs|gdr|gi|gl|gm|gp|gps|group|gsv|gu|gv|gwmi|iex|ii|ipal|ipcsv|ipsn|irm|iwmi|iwr|kill|lp|ls|measure|mi|mount|move|mp|mv|nal|ndr|ni|nv|ogv|popd|ps|pushd|pwd|rbp|rd|rdr|ren|ri|rm|rmdir|rni|rnp|rp|rv|rvpa|rwmi|sal|saps|sasv|sbp|sc|select|set|shcm|si|sl|sleep|sls|sort|sp|spps|spsv|start|sv|swmi|tee|trcm|type|write)\b/i,
  ],
  keyword:
    /\b(?:Begin|Break|Catch|Class|Continue|Data|Define|Do|DynamicParam|Else|ElseIf|End|Exit|Filter|Finally|For|ForEach|From|Function|If|InlineScript|Parallel|Param|Process|Return|Sequence|Switch|Throw|Trap|Try|Until|Using|Var|While|Workflow)\b/i,
  operator: {
    pattern:
      /(\W?)(?:!|-(eq|ne|gt|ge|lt|le|sh[lr]|not|b?(?:and|x?or)|(?:Not)?(?:Like|Match|Contains|In)|Replace|Join|is(?:Not)?|as)\b|-[-=]?|\+[+=]?|[*\/%]=?)/i,
    lookbehind: !0,
  },
  punctuation: /[|{}[\];(),.]/,
}),
  (Prism.languages.powershell.string[0].inside.boolean =
    Prism.languages.powershell.boolean),
  (Prism.languages.powershell.string[0].inside.variable =
    Prism.languages.powershell.variable),
  (Prism.languages.powershell.string[0].inside.function.inside =
    Prism.util.clone(Prism.languages.powershell));
Prism.languages.properties = {
  comment: /^[ \t]*[#!].*$/m,
  "attr-value": {
    pattern:
      /(^[ \t]*(?:\\(?:\r\n|[\s\S])|[^\\\s:=])+?(?: *[=:] *| ))(?:\\(?:\r\n|[\s\S])|[^\\\r\n])+/m,
    lookbehind: !0,
  },
  "attr-name": /^[ \t]*(?:\\(?:\r\n|[\s\S])|[^\\\s:=])+?(?= *[=:] *| )/m,
  punctuation: /[=:]/,
};
Prism.languages.python = {
  comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0 },
  "triple-quoted-string": {
    pattern: /("""|''')[\s\S]+?\1/,
    greedy: !0,
    alias: "string",
  },
  string: { pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
  function: {
    pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
    lookbehind: !0,
  },
  "class-name": { pattern: /(\bclass\s+)\w+/i, lookbehind: !0 },
  keyword:
    /\b(?:as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|pass|print|raise|return|try|while|with|yield)\b/,
  builtin:
    /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
  boolean: /\b(?:True|False|None)\b/,
  number:
    /\b-?(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
  operator:
    /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not)\b/,
  punctuation: /[{}[\];(),.:]/,
};
Prism.languages.sql = {
  comment: {
    pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
    lookbehind: !0,
  },
  string: {
    pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\])*\2/,
    greedy: !0,
    lookbehind: !0,
  },
  variable: /@[\w.$]+|@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
  function:
    /\b(?:COUNT|SUM|AVG|MIN|MAX|FIRST|LAST|UCASE|LCASE|MID|LEN|ROUND|NOW|FORMAT)(?=\s*\()/i,
  keyword:
    /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR VARYING|CHARACTER (?:SET|VARYING)|CHARSET|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMN|COLUMNS|COMMENT|COMMIT|COMMITTED|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|DATA(?:BASES?)?|DATE(?:TIME)?|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITER(?:S)?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE(?: PRECISION)?|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE KEY|ELSE|ENABLE|ENCLOSED BY|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPE(?:D BY)?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTO|INVOKER|ISOLATION LEVEL|JOIN|KEYS?|KILL|LANGUAGE SQL|LAST|LEFT|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MODIFIES SQL DATA|MODIFY|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL(?: CHAR VARYING| CHARACTER(?: VARYING)?| VARCHAR)?|NATURAL|NCHAR(?: VARCHAR)?|NEXT|NO(?: SQL|CHECK|CYCLE)?|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READ(?:S SQL DATA|TEXT)?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEATABLE|REPLICATION|REQUIRE|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE MODE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|START(?:ING BY)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED BY|TEXT(?:SIZE)?|THEN|TIMESTAMP|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNPIVOT|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?)\b/i,
  boolean: /\b(?:TRUE|FALSE|NULL)\b/i,
  number: /\b-?(?:0x)?\d*\.?[\da-f]+\b/,
  operator:
    /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
  punctuation: /[;[\]()`,.]/,
};
(Prism.languages.typescript = Prism.languages.extend("javascript", {
  keyword:
    /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield|false|true|module|declare|constructor|string|Function|any|number|boolean|Array|symbol|namespace|abstract|require|type)\b/,
})),
  (Prism.languages.ts = Prism.languages.typescript);
!(function () {
  function e(e, t) {
    return Array.prototype.slice.call((t || document).querySelectorAll(e));
  }
  function t(e, t) {
    return (
      (t = " " + t + " "),
      (" " + e.className + " ").replace(/[\n\t]/g, " ").indexOf(t) > -1
    );
  }
  function n(e, n, i) {
    n = "string" == typeof n ? n : e.getAttribute("data-line");
    for (
      var o,
        l = n.replace(/\s+/g, "").split(","),
        a = +e.getAttribute("data-line-offset") || 0,
        s = r() ? parseInt : parseFloat,
        d = s(getComputedStyle(e).lineHeight),
        u = t(e, "line-numbers"),
        c = 0;
      (o = l[c++]);

    ) {
      var p = o.split("-"),
        m = +p[0],
        f = +p[1] || m,
        h =
          e.querySelector('.line-highlight[data-range="' + o + '"]') ||
          document.createElement("div");
      if (
        (h.setAttribute("aria-hidden", "true"),
        h.setAttribute("data-range", o),
        (h.className = (i || "") + " line-highlight"),
        u && Prism.plugins.lineNumbers)
      ) {
        var g = Prism.plugins.lineNumbers.getLine(e, m),
          y = Prism.plugins.lineNumbers.getLine(e, f);
        g && (h.style.top = g.offsetTop + "px"),
          y &&
            (h.style.height =
              y.offsetTop - g.offsetTop + y.offsetHeight + "px");
      } else
        h.setAttribute("data-start", m),
          f > m && h.setAttribute("data-end", f),
          (h.style.top = (m - a - 1) * d + "px"),
          (h.textContent = new Array(f - m + 2).join(" \n"));
      u ? e.appendChild(h) : (e.querySelector("code") || e).appendChild(h);
    }
  }
  function i() {
    var t = location.hash.slice(1);
    e(".temporary.line-highlight").forEach(function (e) {
      e.parentNode.removeChild(e);
    });
    var i = (t.match(/\.([\d,-]+)$/) || [, ""])[1];
    if (i && !document.getElementById(t)) {
      var r = t.slice(0, t.lastIndexOf(".")),
        o = document.getElementById(r);
      o &&
        (o.hasAttribute("data-line") || o.setAttribute("data-line", ""),
        n(o, i, "temporary "),
        document.querySelector(".temporary.line-highlight").scrollIntoView());
    }
  }
  if (
    "undefined" != typeof self &&
    self.Prism &&
    self.document &&
    document.querySelector
  ) {
    var r = (function () {
        var e;
        return function () {
          if ("undefined" == typeof e) {
            var t = document.createElement("div");
            (t.style.fontSize = "13px"),
              (t.style.lineHeight = "1.5"),
              (t.style.padding = 0),
              (t.style.border = 0),
              (t.innerHTML = "&nbsp;<br />&nbsp;"),
              document.body.appendChild(t),
              (e = 38 === t.offsetHeight),
              document.body.removeChild(t);
          }
          return e;
        };
      })(),
      o = 0;
    Prism.hooks.add("before-sanity-check", function (t) {
      var n = t.element.parentNode,
        i = n && n.getAttribute("data-line");
      if (n && i && /pre/i.test(n.nodeName)) {
        var r = 0;
        e(".line-highlight", n).forEach(function (e) {
          (r += e.textContent.length), e.parentNode.removeChild(e);
        }),
          r &&
            /^( \n)+$/.test(t.code.slice(-r)) &&
            (t.code = t.code.slice(0, -r));
      }
    }),
      Prism.hooks.add("complete", function l(e) {
        var r = e.element.parentNode,
          a = r && r.getAttribute("data-line");
        if (r && a && /pre/i.test(r.nodeName)) {
          clearTimeout(o);
          var s = Prism.plugins.lineNumbers,
            d = e.plugins && e.plugins.lineNumbers;
          t(r, "line-numbers") && s && !d
            ? Prism.hooks.add("line-numbers", l)
            : (n(r, a), (o = setTimeout(i, 1)));
        }
      }),
      window.addEventListener("hashchange", i),
      window.addEventListener("resize", function () {
        var e = document.querySelectorAll("pre[data-line]");
        Array.prototype.forEach.call(e, function (e) {
          n(e);
        });
      });
  }
})();
!(function () {
  if ("undefined" != typeof self && self.Prism && self.document) {
    var e = "line-numbers",
      t = /\n(?!$)/g,
      n = function (e) {
        var n = r(e),
          s = n["white-space"];
        if ("pre-wrap" === s || "pre-line" === s) {
          var l = e.querySelector("code"),
            i = e.querySelector(".line-numbers-rows"),
            a = e.querySelector(".line-numbers-sizer"),
            o = l.textContent.split(t);
          a ||
            ((a = document.createElement("span")),
            (a.className = "line-numbers-sizer"),
            l.appendChild(a)),
            (a.style.display = "block"),
            o.forEach(function (e, t) {
              a.textContent = e || "\n";
              var n = a.getBoundingClientRect().height;
              i.children[t].style.height = n + "px";
            }),
            (a.textContent = ""),
            (a.style.display = "none");
        }
      },
      r = function (e) {
        return e
          ? window.getComputedStyle
            ? getComputedStyle(e)
            : e.currentStyle || null
          : null;
      };
    window.addEventListener("resize", function () {
      Array.prototype.forEach.call(document.querySelectorAll("pre." + e), n);
    }),
      Prism.hooks.add("complete", function (e) {
        if (e.code) {
          var r = e.element.parentNode,
            s = /\s*\bline-numbers\b\s*/;
          if (
            r &&
            /pre/i.test(r.nodeName) &&
            (s.test(r.className) || s.test(e.element.className)) &&
            !e.element.querySelector(".line-numbers-rows")
          ) {
            s.test(e.element.className) &&
              (e.element.className = e.element.className.replace(s, " ")),
              s.test(r.className) || (r.className += " line-numbers");
            var l,
              i = e.code.match(t),
              a = i ? i.length + 1 : 1,
              o = new Array(a + 1);
            (o = o.join("<span></span>")),
              (l = document.createElement("span")),
              l.setAttribute("aria-hidden", "true"),
              (l.className = "line-numbers-rows"),
              (l.innerHTML = o),
              r.hasAttribute("data-start") &&
                (r.style.counterReset =
                  "linenumber " +
                  (parseInt(r.getAttribute("data-start"), 10) - 1)),
              e.element.appendChild(l),
              n(r),
              Prism.hooks.run("line-numbers", e);
          }
        }
      }),
      Prism.hooks.add("line-numbers", function (e) {
        (e.plugins = e.plugins || {}), (e.plugins.lineNumbers = !0);
      }),
      (Prism.plugins.lineNumbers = {
        getLine: function (t, n) {
          if ("PRE" === t.tagName && t.classList.contains(e)) {
            var r = t.querySelector(".line-numbers-rows"),
              s = parseInt(t.getAttribute("data-start"), 10) || 1,
              l = s + (r.children.length - 1);
            s > n && (n = s), n > l && (n = l);
            var i = n - s;
            return r.children[i];
          }
        },
      });
  }
})();
!(function () {
  if (
    ("undefined" == typeof self || self.Prism) &&
    ("undefined" == typeof global || global.Prism)
  ) {
    var i = /\b([a-z]{3,7}:\/\/|tel:)[\w\-+%~\/.:#=?&amp;]+/,
      n = /\b\S+@[\w.]+[a-z]{2}/,
      e = /\[([^\]]+)]\(([^)]+)\)/,
      t = ["comment", "url", "attr-value", "string"];
    (Prism.plugins.autolinker = {
      processGrammar: function (a) {
        a &&
          !a["url-link"] &&
          (Prism.languages.DFS(a, function (a, r, l) {
            t.indexOf(l) > -1 &&
              "Array" !== Prism.util.type(r) &&
              (r.pattern || (r = this[a] = { pattern: r }),
              (r.inside = r.inside || {}),
              "comment" == l && (r.inside["md-link"] = e),
              "attr-value" == l
                ? Prism.languages.insertBefore(
                    "inside",
                    "punctuation",
                    { "url-link": i },
                    r
                  )
                : (r.inside["url-link"] = i),
              (r.inside["email-link"] = n));
          }),
          (a["url-link"] = i),
          (a["email-link"] = n));
      },
    }),
      Prism.hooks.add("before-highlight", function (i) {
        Prism.plugins.autolinker.processGrammar(i.grammar);
      }),
      Prism.hooks.add("wrap", function (i) {
        if (/-link$/.test(i.type)) {
          i.tag = "a";
          var n = i.content;
          if ("email-link" == i.type && 0 != n.indexOf("mailto:"))
            n = "mailto:" + n;
          else if ("md-link" == i.type) {
            var t = i.content.match(e);
            (n = t[2]), (i.content = t[1]);
          }
          i.attributes.href = n;
        }
        try {
          i.content = decodeURIComponent(i.content);
        } catch (a) {}
      });
  }
})();
!(function () {
  function e(e) {
    var a = e.toLowerCase();
    if (t.HTML[a]) return "html";
    if (t.SVG[e]) return "svg";
    if (t.MathML[e]) return "mathml";
    if (0 !== t.HTML[a] && "undefined" != typeof document) {
      var n = (document
        .createElement(e)
        .toString()
        .match(/\[object HTML(.+)Element\]/) || [])[1];
      if (n && "Unknown" != n) return (t.HTML[a] = 1), "html";
    }
    if (((t.HTML[a] = 0), 0 !== t.SVG[e] && "undefined" != typeof document)) {
      var s = (document
        .createElementNS("http://www.w3.org/2000/svg", e)
        .toString()
        .match(/\[object SVG(.+)Element\]/) || [])[1];
      if (s && "Unknown" != s) return (t.SVG[e] = 1), "svg";
    }
    return (
      (t.SVG[e] = 0),
      0 !== t.MathML[e] && 0 === e.indexOf("m")
        ? ((t.MathML[e] = 1), "mathml")
        : ((t.MathML[e] = 0), null)
    );
  }
  if (
    ("undefined" == typeof self || self.Prism) &&
    ("undefined" == typeof global || global.Prism)
  ) {
    if (
      (Prism.languages.css &&
        (Prism.languages.css.selector.pattern
          ? ((Prism.languages.css.selector.inside["pseudo-class"] = /:[\w-]+/),
            (Prism.languages.css.selector.inside["pseudo-element"] =
              /::[\w-]+/))
          : (Prism.languages.css.selector = {
              pattern: Prism.languages.css.selector,
              inside: {
                "pseudo-class": /:[\w-]+/,
                "pseudo-element": /::[\w-]+/,
              },
            })),
      Prism.languages.markup)
    ) {
      Prism.languages.markup.tag.inside.tag.inside["tag-id"] = /[\w-]+/;
      var t = {
        HTML: {
          a: 1,
          abbr: 1,
          acronym: 1,
          b: 1,
          basefont: 1,
          bdo: 1,
          big: 1,
          blink: 1,
          cite: 1,
          code: 1,
          dfn: 1,
          em: 1,
          kbd: 1,
          i: 1,
          rp: 1,
          rt: 1,
          ruby: 1,
          s: 1,
          samp: 1,
          small: 1,
          spacer: 1,
          strike: 1,
          strong: 1,
          sub: 1,
          sup: 1,
          time: 1,
          tt: 1,
          u: 1,
          var: 1,
          wbr: 1,
          noframes: 1,
          summary: 1,
          command: 1,
          dt: 1,
          dd: 1,
          figure: 1,
          figcaption: 1,
          center: 1,
          section: 1,
          nav: 1,
          article: 1,
          aside: 1,
          hgroup: 1,
          header: 1,
          footer: 1,
          address: 1,
          noscript: 1,
          isIndex: 1,
          main: 1,
          mark: 1,
          marquee: 1,
          meter: 1,
          menu: 1,
        },
        SVG: {
          animateColor: 1,
          animateMotion: 1,
          animateTransform: 1,
          glyph: 1,
          feBlend: 1,
          feColorMatrix: 1,
          feComponentTransfer: 1,
          feFuncR: 1,
          feFuncG: 1,
          feFuncB: 1,
          feFuncA: 1,
          feComposite: 1,
          feConvolveMatrix: 1,
          feDiffuseLighting: 1,
          feDisplacementMap: 1,
          feFlood: 1,
          feGaussianBlur: 1,
          feImage: 1,
          feMerge: 1,
          feMergeNode: 1,
          feMorphology: 1,
          feOffset: 1,
          feSpecularLighting: 1,
          feTile: 1,
          feTurbulence: 1,
          feDistantLight: 1,
          fePointLight: 1,
          feSpotLight: 1,
          linearGradient: 1,
          radialGradient: 1,
          altGlyph: 1,
          textPath: 1,
          tref: 1,
          altglyph: 1,
          textpath: 1,
          altglyphdef: 1,
          altglyphitem: 1,
          clipPath: 1,
          "color-profile": 1,
          cursor: 1,
          "font-face": 1,
          "font-face-format": 1,
          "font-face-name": 1,
          "font-face-src": 1,
          "font-face-uri": 1,
          foreignObject: 1,
          glyphRef: 1,
          hkern: 1,
          vkern: 1,
        },
        MathML: {},
      };
    }
    var a;
    Prism.hooks.add("wrap", function (t) {
      if (
        ("tag-id" == t.type ||
          ("property" == t.type && 0 != t.content.indexOf("-")) ||
          ("rule" == t.type && 0 != t.content.indexOf("@-")) ||
          ("pseudo-class" == t.type && 0 != t.content.indexOf(":-")) ||
          ("pseudo-element" == t.type && 0 != t.content.indexOf("::-")) ||
          ("attr-name" == t.type && 0 != t.content.indexOf("data-"))) &&
        -1 === t.content.indexOf("<") &&
        ("css" == t.language || "scss" == t.language || "markup" == t.language)
      ) {
        var n = "w/index.php?fulltext&search=";
        t.tag = "a";
        var s = "http://docs.webplatform.org/";
        "css" == t.language || "scss" == t.language
          ? ((s += "wiki/css/"),
            "property" == t.type
              ? (s += "properties/")
              : "rule" == t.type
              ? (s += "atrules/")
              : "pseudo-class" == t.type
              ? (s += "selectors/pseudo-classes/")
              : "pseudo-element" == t.type &&
                (s += "selectors/pseudo-elements/"))
          : "markup" == t.language &&
            ("tag-id" == t.type
              ? ((a = e(t.content) || a),
                (s += a ? "wiki/" + a + "/elements/" : n))
              : "attr-name" == t.type &&
                (s += a ? "wiki/" + a + "/attributes/" : n)),
          (s += t.content),
          (t.attributes.href = s),
          (t.attributes.target = "_blank");
      }
    });
  }
})();
!(function () {
  if (
    ("undefined" != typeof self && self.Prism) ||
    ("undefined" != typeof global && global.Prism)
  ) {
    var s = { classMap: {} };
    (Prism.plugins.customClass = {
      map: function (i) {
        s.classMap = i;
      },
      prefix: function (i) {
        s.prefixString = i;
      },
    }),
      Prism.hooks.add("wrap", function (i) {
        (s.classMap || s.prefixString) &&
          (i.classes = i.classes.map(function (i) {
            return (s.prefixString || "") + (s.classMap[i] || i);
          }));
      });
  }
})();
!(function () {
  "undefined" != typeof self &&
    self.Prism &&
    self.document &&
    document.querySelector &&
    ((self.Prism.fileHighlight = function () {
      var e = {
        js: "javascript",
        py: "python",
        rb: "ruby",
        ps1: "powershell",
        psm1: "powershell",
        sh: "bash",
        bat: "batch",
        h: "c",
        tex: "latex",
      };
      Array.prototype.slice
        .call(document.querySelectorAll("pre[data-src]"))
        .forEach(function (t) {
          for (
            var s,
              a = t.getAttribute("data-src"),
              n = t,
              r = /\blang(?:uage)?-(?!\*)(\w+)\b/i;
            n && !r.test(n.className);

          )
            n = n.parentNode;
          if ((n && (s = (t.className.match(r) || [, ""])[1]), !s)) {
            var o = (a.match(/\.(\w+)$/) || [, ""])[1];
            s = e[o] || o;
          }
          var l = document.createElement("code");
          (l.className = "language-" + s),
            (t.textContent = ""),
            (l.textContent = "Loading…"),
            t.appendChild(l);
          var i = new XMLHttpRequest();
          i.open("GET", a, !0),
            (i.onreadystatechange = function () {
              4 == i.readyState &&
                (i.status < 400 && i.responseText
                  ? ((l.textContent = i.responseText),
                    Prism.highlightElement(l))
                  : (l.textContent =
                      i.status >= 400
                        ? "✖ Error " +
                          i.status +
                          " while fetching file: " +
                          i.statusText
                        : "✖ Error: File does not exist or is empty"));
            }),
            i.send(null);
        });
    }),
    document.addEventListener("DOMContentLoaded", self.Prism.fileHighlight));
})();
!(function () {
  if ("undefined" != typeof self && self.Prism && self.document) {
    var t = [],
      e = {},
      n = function () {};
    Prism.plugins.toolbar = {};
    var a = (Prism.plugins.toolbar.registerButton = function (n, a) {
        var o;
        (o =
          "function" == typeof a
            ? a
            : function (t) {
                var e;
                return (
                  "function" == typeof a.onClick
                    ? ((e = document.createElement("button")),
                      (e.type = "button"),
                      e.addEventListener("click", function () {
                        a.onClick.call(this, t);
                      }))
                    : "string" == typeof a.url
                    ? ((e = document.createElement("a")), (e.href = a.url))
                    : (e = document.createElement("span")),
                  (e.textContent = a.text),
                  e
                );
              }),
          t.push((e[n] = o));
      }),
      o = (Prism.plugins.toolbar.hook = function (a) {
        var o = a.element.parentNode;
        if (
          o &&
          /pre/i.test(o.nodeName) &&
          !o.classList.contains("code-toolbar")
        ) {
          o.classList.add("code-toolbar");
          var r = document.createElement("div");
          r.classList.add("toolbar"),
            document.body.hasAttribute("data-toolbar-order") &&
              (t = document.body
                .getAttribute("data-toolbar-order")
                .split(",")
                .map(function (t) {
                  return e[t] || n;
                })),
            t.forEach(function (t) {
              var e = t(a);
              if (e) {
                var n = document.createElement("div");
                n.classList.add("toolbar-item"),
                  n.appendChild(e),
                  r.appendChild(n);
              }
            }),
            o.appendChild(r);
        }
      });
    a("label", function (t) {
      var e = t.element.parentNode;
      if (e && /pre/i.test(e.nodeName) && e.hasAttribute("data-label")) {
        var n,
          a,
          o = e.getAttribute("data-label");
        try {
          a = document.querySelector("template#" + o);
        } catch (r) {}
        return (
          a
            ? (n = a.content)
            : (e.hasAttribute("data-url")
                ? ((n = document.createElement("a")),
                  (n.href = e.getAttribute("data-url")))
                : (n = document.createElement("span")),
              (n.textContent = o)),
          n
        );
      }
    }),
      Prism.hooks.add("complete", o);
  }
})();
!(function () {
  function t(t) {
    "function" != typeof t || e(t) || r.push(t);
  }
  function e(t) {
    return "function" == typeof t
      ? r.filter(function (e) {
          return e.valueOf() === t.valueOf();
        })[0]
      : "string" == typeof t && t.length > 0
      ? r.filter(function (e) {
          return e.name === t;
        })[0]
      : null;
  }
  function n(t) {
    if (("string" == typeof t && (t = e(t)), "function" == typeof t)) {
      var n = r.indexOf(t);
      n >= 0 && r.splice(n, 1);
    }
  }
  function a() {
    Array.prototype.slice
      .call(document.querySelectorAll("pre[data-jsonp]"))
      .forEach(function (t) {
        t.textContent = "";
        var e = document.createElement("code");
        (e.textContent = i), t.appendChild(e);
        var n = t.getAttribute("data-adapter"),
          a = null;
        if (n) {
          if ("function" != typeof window[n])
            return (
              (e.textContent =
                "JSONP adapter function '" + n + "' doesn't exist"),
              void 0
            );
          a = window[n];
        }
        var u = "prismjsonp" + o++,
          f = document.createElement("a"),
          l = (f.href = t.getAttribute("data-jsonp"));
        f.href +=
          (f.search ? "&" : "?") +
          (t.getAttribute("data-callback") || "callback") +
          "=" +
          u;
        var s = setTimeout(function () {
            e.textContent === i &&
              (e.textContent = "Timeout loading '" + l + "'");
          }, 5e3),
          d = document.createElement("script");
        (d.src = f.href),
          (window[u] = function (n) {
            document.head.removeChild(d), clearTimeout(s), delete window[u];
            var o = "";
            if (a) o = a(n, t);
            else for (var i in r) if (((o = r[i](n, t)), null !== o)) break;
            null === o
              ? (e.textContent =
                  "Cannot parse response (perhaps you need an adapter function?)")
              : ((e.textContent = o), Prism.highlightElement(e));
          }),
          document.head.appendChild(d);
      });
  }
  if (self.Prism && self.document && document.querySelectorAll && [].filter) {
    var r = [];
    (Prism.plugins.jsonphighlight = {
      registerAdapter: t,
      removeAdapter: n,
      highlight: a,
    }),
      t(function (t) {
        if (t && t.meta && t.data) {
          if (t.meta.status && t.meta.status >= 400)
            return "Error: " + (t.data.message || t.meta.status);
          if ("string" == typeof t.data.content)
            return "function" == typeof atob
              ? atob(t.data.content.replace(/\s/g, ""))
              : "Your browser cannot decode base64";
        }
        return null;
      }),
      t(function (t, e) {
        if (t && t.meta && t.data && t.data.files) {
          if (t.meta.status && t.meta.status >= 400)
            return "Error: " + (t.data.message || t.meta.status);
          var n = e.getAttribute("data-filename");
          if (null == n)
            for (var a in t.data.files)
              if (t.data.files.hasOwnProperty(a)) {
                n = a;
                break;
              }
          return void 0 !== t.data.files[n]
            ? t.data.files[n].content
            : "Error: unknown or missing gist file " + n;
        }
        return null;
      }),
      t(function (t) {
        return t && t.node && "string" == typeof t.data ? t.data : null;
      });
    var o = 0,
      i = "Loading…";
    a();
  }
})();
!(function () {
  ("undefined" != typeof self && !self.Prism) ||
    ("undefined" != typeof global && !global.Prism) ||
    Prism.hooks.add("wrap", function (e) {
      "keyword" === e.type && e.classes.push("keyword-" + e.content);
    });
})();
!(function () {
  "undefined" != typeof self &&
    self.Prism &&
    self.document &&
    Prism.hooks.add("before-sanity-check", function (e) {
      if (e.code) {
        var s = e.element.parentNode,
          n = /\s*\bkeep-initial-line-feed\b\s*/;
        !s ||
          "pre" !== s.nodeName.toLowerCase() ||
          n.test(s.className) ||
          n.test(e.element.className) ||
          (e.code = e.code.replace(/^(?:\r?\n|\r)/, ""));
      }
    });
})();
!(function () {
  if (
    ("undefined" == typeof self || self.Prism) &&
    self.document &&
    Function.prototype.bind
  ) {
    var e = {
        gradient: {
          create: (function () {
            var e = {},
              s = function (e, s, i) {
                var t = "180deg";
                return (
                  /^(?:-?\d*\.?\d+(?:deg|rad)|to\b|top|right|bottom|left)/.test(
                    i[0]
                  ) &&
                    ((t = i.shift()),
                    t.indexOf("to ") < 0 &&
                      (t.indexOf("top") >= 0
                        ? (t =
                            t.indexOf("left") >= 0
                              ? "to bottom right"
                              : t.indexOf("right") >= 0
                              ? "to bottom left"
                              : "to bottom")
                        : t.indexOf("bottom") >= 0
                        ? (t =
                            t.indexOf("left") >= 0
                              ? "to top right"
                              : t.indexOf("right") >= 0
                              ? "to top left"
                              : "to top")
                        : t.indexOf("left") >= 0
                        ? (t = "to right")
                        : t.indexOf("right") >= 0
                        ? (t = "to left")
                        : e &&
                          (t.indexOf("deg") >= 0
                            ? (t = 90 - parseFloat(t) + "deg")
                            : t.indexOf("rad") >= 0 &&
                              (t = Math.PI / 2 - parseFloat(t) + "rad")))),
                  s + "(" + t + "," + i.join(",") + ")"
                );
              },
              i = function (e, s, i) {
                if (i[0].indexOf("at") < 0) {
                  var t = "center",
                    a = "ellipse",
                    r = "farthest-corner";
                  if (
                    (/\bcenter|top|right|bottom|left\b|^\d+/.test(i[0]) &&
                      (t = i.shift().replace(/\s*-?\d+(?:rad|deg)\s*/, "")),
                    /\bcircle|ellipse|closest|farthest|contain|cover\b/.test(
                      i[0]
                    ))
                  ) {
                    var n = i.shift().split(/\s+/);
                    !n[0] ||
                      ("circle" !== n[0] && "ellipse" !== n[0]) ||
                      (a = n.shift()),
                      n[0] && (r = n.shift()),
                      "cover" === r
                        ? (r = "farthest-corner")
                        : "contain" === r && (r = "clothest-side");
                  }
                  return (
                    s + "(" + a + " " + r + " at " + t + "," + i.join(",") + ")"
                  );
                }
                return s + "(" + i.join(",") + ")";
              },
              t = function (t) {
                if (e[t]) return e[t];
                var a = t.match(
                    /^(\b|\B-[a-z]{1,10}-)((?:repeating-)?(?:linear|radial)-gradient)/
                  ),
                  r = a && a[1],
                  n = a && a[2],
                  l = t
                    .replace(
                      /^(?:\b|\B-[a-z]{1,10}-)(?:repeating-)?(?:linear|radial)-gradient\(|\)$/g,
                      ""
                    )
                    .split(/\s*,\s*/);
                return (e[t] =
                  n.indexOf("linear") >= 0
                    ? s(r, n, l)
                    : n.indexOf("radial") >= 0
                    ? i(r, n, l)
                    : n + "(" + l.join(",") + ")");
              };
            return function () {
              new Prism.plugins.Previewer(
                "gradient",
                function (e) {
                  return (
                    (this.firstChild.style.backgroundImage = ""),
                    (this.firstChild.style.backgroundImage = t(e)),
                    !!this.firstChild.style.backgroundImage
                  );
                },
                "*",
                function () {
                  this._elt.innerHTML = "<div></div>";
                }
              );
            };
          })(),
          tokens: {
            gradient: {
              pattern:
                /(?:\b|\B-[a-z]{1,10}-)(?:repeating-)?(?:linear|radial)-gradient\((?:(?:rgb|hsl)a?\(.+?\)|[^\)])+\)/gi,
              inside: { function: /[\w-]+(?=\()/, punctuation: /[(),]/ },
            },
          },
          languages: {
            css: !0,
            less: !0,
            sass: [
              {
                lang: "sass",
                before: "punctuation",
                inside: "inside",
                root:
                  Prism.languages.sass && Prism.languages.sass["variable-line"],
              },
              {
                lang: "sass",
                before: "punctuation",
                inside: "inside",
                root:
                  Prism.languages.sass && Prism.languages.sass["property-line"],
              },
            ],
            scss: !0,
            stylus: [
              {
                lang: "stylus",
                before: "func",
                inside: "rest",
                root:
                  Prism.languages.stylus &&
                  Prism.languages.stylus["property-declaration"].inside,
              },
              {
                lang: "stylus",
                before: "func",
                inside: "rest",
                root:
                  Prism.languages.stylus &&
                  Prism.languages.stylus["variable-declaration"].inside,
              },
            ],
          },
        },
        angle: {
          create: function () {
            new Prism.plugins.Previewer(
              "angle",
              function (e) {
                var s,
                  i,
                  t = parseFloat(e),
                  a = e.match(/[a-z]+$/i);
                if (!t || !a) return !1;
                switch ((a = a[0])) {
                  case "deg":
                    s = 360;
                    break;
                  case "grad":
                    s = 400;
                    break;
                  case "rad":
                    s = 2 * Math.PI;
                    break;
                  case "turn":
                    s = 1;
                }
                return (
                  (i = (100 * t) / s),
                  (i %= 100),
                  this[(0 > t ? "set" : "remove") + "Attribute"](
                    "data-negative",
                    ""
                  ),
                  (this.querySelector("circle").style.strokeDasharray =
                    Math.abs(i) + ",500"),
                  !0
                );
              },
              "*",
              function () {
                this._elt.innerHTML =
                  '<svg viewBox="0 0 64 64"><circle r="16" cy="32" cx="32"></circle></svg>';
              }
            );
          },
          tokens: {
            angle: /(?:\b|\B-|(?=\B\.))\d*\.?\d+(?:deg|g?rad|turn)\b/i,
          },
          languages: {
            css: !0,
            less: !0,
            markup: {
              lang: "markup",
              before: "punctuation",
              inside: "inside",
              root:
                Prism.languages.markup &&
                Prism.languages.markup.tag.inside["attr-value"],
            },
            sass: [
              {
                lang: "sass",
                inside: "inside",
                root:
                  Prism.languages.sass && Prism.languages.sass["property-line"],
              },
              {
                lang: "sass",
                before: "operator",
                inside: "inside",
                root:
                  Prism.languages.sass && Prism.languages.sass["variable-line"],
              },
            ],
            scss: !0,
            stylus: [
              {
                lang: "stylus",
                before: "func",
                inside: "rest",
                root:
                  Prism.languages.stylus &&
                  Prism.languages.stylus["property-declaration"].inside,
              },
              {
                lang: "stylus",
                before: "func",
                inside: "rest",
                root:
                  Prism.languages.stylus &&
                  Prism.languages.stylus["variable-declaration"].inside,
              },
            ],
          },
        },
        color: {
          create: function () {
            new Prism.plugins.Previewer("color", function (e) {
              return (
                (this.style.backgroundColor = ""),
                (this.style.backgroundColor = e),
                !!this.style.backgroundColor
              );
            });
          },
          tokens: {
            color: {
              pattern:
                /\B#(?:[0-9a-f]{3}){1,2}\b|\b(?:rgb|hsl)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:rgb|hsl)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B|\b(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGray|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGray|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGray|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gray|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGray|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGray|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGray|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/i,
              inside: { function: /[\w-]+(?=\()/, punctuation: /[(),]/ },
            },
          },
          languages: {
            css: !0,
            less: !0,
            markup: {
              lang: "markup",
              before: "punctuation",
              inside: "inside",
              root:
                Prism.languages.markup &&
                Prism.languages.markup.tag.inside["attr-value"],
            },
            sass: [
              {
                lang: "sass",
                before: "punctuation",
                inside: "inside",
                root:
                  Prism.languages.sass && Prism.languages.sass["variable-line"],
              },
              {
                lang: "sass",
                inside: "inside",
                root:
                  Prism.languages.sass && Prism.languages.sass["property-line"],
              },
            ],
            scss: !0,
            stylus: [
              {
                lang: "stylus",
                before: "hexcode",
                inside: "rest",
                root:
                  Prism.languages.stylus &&
                  Prism.languages.stylus["property-declaration"].inside,
              },
              {
                lang: "stylus",
                before: "hexcode",
                inside: "rest",
                root:
                  Prism.languages.stylus &&
                  Prism.languages.stylus["variable-declaration"].inside,
              },
            ],
          },
        },
        easing: {
          create: function () {
            new Prism.plugins.Previewer(
              "easing",
              function (e) {
                e =
                  {
                    linear: "0,0,1,1",
                    ease: ".25,.1,.25,1",
                    "ease-in": ".42,0,1,1",
                    "ease-out": "0,0,.58,1",
                    "ease-in-out": ".42,0,.58,1",
                  }[e] || e;
                var s = e.match(/-?\d*\.?\d+/g);
                if (4 === s.length) {
                  (s = s.map(function (e, s) {
                    return 100 * (s % 2 ? 1 - e : e);
                  })),
                    this.querySelector("path").setAttribute(
                      "d",
                      "M0,100 C" +
                        s[0] +
                        "," +
                        s[1] +
                        ", " +
                        s[2] +
                        "," +
                        s[3] +
                        ", 100,0"
                    );
                  var i = this.querySelectorAll("line");
                  return (
                    i[0].setAttribute("x2", s[0]),
                    i[0].setAttribute("y2", s[1]),
                    i[1].setAttribute("x2", s[2]),
                    i[1].setAttribute("y2", s[3]),
                    !0
                  );
                }
                return !1;
              },
              "*",
              function () {
                this._elt.innerHTML =
                  '<svg viewBox="-20 -20 140 140" width="100" height="100"><defs><marker id="prism-previewer-easing-marker" viewBox="0 0 4 4" refX="2" refY="2" markerUnits="strokeWidth"><circle cx="2" cy="2" r="1.5" /></marker></defs><path d="M0,100 C20,50, 40,30, 100,0" /><line x1="0" y1="100" x2="20" y2="50" marker-start="url(' +
                  location.href +
                  '#prism-previewer-easing-marker)" marker-end="url(' +
                  location.href +
                  '#prism-previewer-easing-marker)" /><line x1="100" y1="0" x2="40" y2="30" marker-start="url(' +
                  location.href +
                  '#prism-previewer-easing-marker)" marker-end="url(' +
                  location.href +
                  '#prism-previewer-easing-marker)" /></svg>';
              }
            );
          },
          tokens: {
            easing: {
              pattern:
                /\bcubic-bezier\((?:-?\d*\.?\d+,\s*){3}-?\d*\.?\d+\)\B|\b(?:linear|ease(?:-in)?(?:-out)?)(?=\s|[;}]|$)/i,
              inside: { function: /[\w-]+(?=\()/, punctuation: /[(),]/ },
            },
          },
          languages: {
            css: !0,
            less: !0,
            sass: [
              {
                lang: "sass",
                inside: "inside",
                before: "punctuation",
                root:
                  Prism.languages.sass && Prism.languages.sass["variable-line"],
              },
              {
                lang: "sass",
                inside: "inside",
                root:
                  Prism.languages.sass && Prism.languages.sass["property-line"],
              },
            ],
            scss: !0,
            stylus: [
              {
                lang: "stylus",
                before: "hexcode",
                inside: "rest",
                root:
                  Prism.languages.stylus &&
                  Prism.languages.stylus["property-declaration"].inside,
              },
              {
                lang: "stylus",
                before: "hexcode",
                inside: "rest",
                root:
                  Prism.languages.stylus &&
                  Prism.languages.stylus["variable-declaration"].inside,
              },
            ],
          },
        },
        time: {
          create: function () {
            new Prism.plugins.Previewer(
              "time",
              function (e) {
                var s = parseFloat(e),
                  i = e.match(/[a-z]+$/i);
                return s && i
                  ? ((i = i[0]),
                    (this.querySelector("circle").style.animationDuration =
                      2 * s + i),
                    !0)
                  : !1;
              },
              "*",
              function () {
                this._elt.innerHTML =
                  '<svg viewBox="0 0 64 64"><circle r="16" cy="32" cx="32"></circle></svg>';
              }
            );
          },
          tokens: { time: /(?:\b|\B-|(?=\B\.))\d*\.?\d+m?s\b/i },
          languages: {
            css: !0,
            less: !0,
            markup: {
              lang: "markup",
              before: "punctuation",
              inside: "inside",
              root:
                Prism.languages.markup &&
                Prism.languages.markup.tag.inside["attr-value"],
            },
            sass: [
              {
                lang: "sass",
                inside: "inside",
                root:
                  Prism.languages.sass && Prism.languages.sass["property-line"],
              },
              {
                lang: "sass",
                before: "operator",
                inside: "inside",
                root:
                  Prism.languages.sass && Prism.languages.sass["variable-line"],
              },
            ],
            scss: !0,
            stylus: [
              {
                lang: "stylus",
                before: "hexcode",
                inside: "rest",
                root:
                  Prism.languages.stylus &&
                  Prism.languages.stylus["property-declaration"].inside,
              },
              {
                lang: "stylus",
                before: "hexcode",
                inside: "rest",
                root:
                  Prism.languages.stylus &&
                  Prism.languages.stylus["variable-declaration"].inside,
              },
            ],
          },
        },
      },
      s = function (e) {
        var s = 0,
          i = 0,
          t = e;
        if (t.parentNode) {
          do (s += t.offsetLeft), (i += t.offsetTop);
          while ((t = t.offsetParent) && t.nodeType < 9);
          t = e;
          do (s -= t.scrollLeft), (i -= t.scrollTop);
          while ((t = t.parentNode) && !/body/i.test(t.nodeName));
        }
        return {
          top: i,
          right: innerWidth - s - e.offsetWidth,
          bottom: innerHeight - i - e.offsetHeight,
          left: s,
        };
      },
      i = /(?:^|\s)token(?=$|\s)/,
      t = /(?:^|\s)active(?=$|\s)/g,
      a = /(?:^|\s)flipped(?=$|\s)/g,
      r = function (e, s, i, t) {
        (this._elt = null),
          (this._type = e),
          (this._clsRegexp = RegExp("(?:^|\\s)" + e + "(?=$|\\s)")),
          (this._token = null),
          (this.updater = s),
          (this._mouseout = this.mouseout.bind(this)),
          (this.initializer = t);
        var a = this;
        i || (i = ["*"]),
          "Array" !== Prism.util.type(i) && (i = [i]),
          i.forEach(function (e) {
            "string" != typeof e && (e = e.lang),
              r.byLanguages[e] || (r.byLanguages[e] = []),
              r.byLanguages[e].indexOf(a) < 0 && r.byLanguages[e].push(a);
          }),
          (r.byType[e] = this);
      };
    (r.prototype.init = function () {
      this._elt ||
        ((this._elt = document.createElement("div")),
        (this._elt.className = "prism-previewer prism-previewer-" + this._type),
        document.body.appendChild(this._elt),
        this.initializer && this.initializer());
    }),
      (r.prototype.isDisabled = function (e) {
        do
          if (e.hasAttribute && e.hasAttribute("data-previewers")) {
            var s = e.getAttribute("data-previewers");
            return -1 === (s || "").split(/\s+/).indexOf(this._type);
          }
        while ((e = e.parentNode));
        return !1;
      }),
      (r.prototype.check = function (e) {
        if (!i.test(e.className) || !this.isDisabled(e)) {
          do
            if (i.test(e.className) && this._clsRegexp.test(e.className)) break;
          while ((e = e.parentNode));
          e && e !== this._token && ((this._token = e), this.show());
        }
      }),
      (r.prototype.mouseout = function () {
        this._token.removeEventListener("mouseout", this._mouseout, !1),
          (this._token = null),
          this.hide();
      }),
      (r.prototype.show = function () {
        if ((this._elt || this.init(), this._token))
          if (this.updater.call(this._elt, this._token.textContent)) {
            this._token.addEventListener("mouseout", this._mouseout, !1);
            var e = s(this._token);
            (this._elt.className += " active"),
              e.top - this._elt.offsetHeight > 0
                ? ((this._elt.className = this._elt.className.replace(a, "")),
                  (this._elt.style.top = e.top + "px"),
                  (this._elt.style.bottom = ""))
                : ((this._elt.className += " flipped"),
                  (this._elt.style.bottom = e.bottom + "px"),
                  (this._elt.style.top = "")),
              (this._elt.style.left =
                e.left + Math.min(200, this._token.offsetWidth / 2) + "px");
          } else this.hide();
      }),
      (r.prototype.hide = function () {
        this._elt.className = this._elt.className.replace(t, "");
      }),
      (r.byLanguages = {}),
      (r.byType = {}),
      (r.initEvents = function (e, s) {
        var i = [];
        r.byLanguages[s] && (i = i.concat(r.byLanguages[s])),
          r.byLanguages["*"] && (i = i.concat(r.byLanguages["*"])),
          e.addEventListener(
            "mouseover",
            function (e) {
              var s = e.target;
              i.forEach(function (e) {
                e.check(s);
              });
            },
            !1
          );
      }),
      (Prism.plugins.Previewer = r),
      Prism.hooks.add("before-highlight", function (s) {
        for (var i in e) {
          var t = e[i].languages;
          if (s.language && t[s.language] && !t[s.language].initialized) {
            var a = t[s.language];
            "Array" !== Prism.util.type(a) && (a = [a]),
              a.forEach(function (a) {
                var r, n, l, o;
                a === !0
                  ? ((r = "important"), (n = s.language), (a = s.language))
                  : ((r = a.before || "important"),
                    (n = a.inside || a.lang),
                    (l = a.root || Prism.languages),
                    (o = a.skip),
                    (a = s.language)),
                  !o &&
                    Prism.languages[a] &&
                    (Prism.languages.insertBefore(n, r, e[i].tokens, l),
                    (s.grammar = Prism.languages[a]),
                    (t[s.language] = { initialized: !0 }));
              });
          }
        }
      }),
      Prism.hooks.add("after-highlight", function (e) {
        (r.byLanguages["*"] || r.byLanguages[e.language]) &&
          r.initEvents(e.element, e.language);
      });
    for (var n in e) e[n].create();
  }
})();
!(function () {
  if (
    "undefined" != typeof self &&
    self.Prism &&
    self.document &&
    document.createElement
  ) {
    var e = {
        javascript: "clike",
        actionscript: "javascript",
        arduino: "cpp",
        aspnet: "markup",
        bison: "c",
        c: "clike",
        csharp: "clike",
        cpp: "c",
        coffeescript: "javascript",
        crystal: "ruby",
        "css-extras": "css",
        d: "clike",
        dart: "clike",
        django: "markup",
        fsharp: "clike",
        flow: "javascript",
        glsl: "clike",
        go: "clike",
        groovy: "clike",
        haml: "ruby",
        handlebars: "markup",
        haxe: "clike",
        java: "clike",
        jolie: "clike",
        kotlin: "clike",
        less: "css",
        markdown: "markup",
        n4js: "javascript",
        nginx: "clike",
        objectivec: "c",
        opencl: "cpp",
        parser: "markup",
        php: "clike",
        "php-extras": "php",
        processing: "clike",
        protobuf: "clike",
        pug: "javascript",
        qore: "clike",
        jsx: ["markup", "javascript"],
        reason: "clike",
        ruby: "clike",
        sass: "css",
        scss: "css",
        scala: "java",
        smarty: "markup",
        swift: "clike",
        textile: "markup",
        twig: "markup",
        typescript: "javascript",
        vbnet: "basic",
        wiki: "markup",
        xeora: "markup",
      },
      a = {},
      c = "none",
      s = document.getElementsByTagName("script");
    s = s[s.length - 1];
    var r = "components/";
    if (s.hasAttribute("data-autoloader-path")) {
      var t = s.getAttribute("data-autoloader-path").trim();
      t.length > 0 &&
        !/^[a-z]+:\/\//i.test(s.src) &&
        (r = t.replace(/\/?$/, "/"));
    } else
      /[\w-]+\.js$/.test(s.src) &&
        (r = s.src.replace(/[\w-]+\.js$/, "components/"));
    var n = (Prism.plugins.autoloader = {
        languages_path: r,
        use_minified: !0,
      }),
      s = function (e, a, c) {
        var s = document.createElement("script");
        (s.src = e),
          (s.async = !0),
          (s.onload = function () {
            document.body.removeChild(s), a && a();
          }),
          (s.onerror = function () {
            document.body.removeChild(s), c && c();
          }),
          document.body.appendChild(s);
      },
      i = function (e) {
        return (
          n.languages_path +
          "prism-" +
          e +
          (n.use_minified ? ".min" : "") +
          ".js"
        );
      },
      l = function (e, c) {
        var s = a[e];
        s || (s = a[e] = {});
        var r = c.getAttribute("data-dependencies");
        !r &&
          c.parentNode &&
          "pre" === c.parentNode.tagName.toLowerCase() &&
          (r = c.parentNode.getAttribute("data-dependencies")),
          (r = r ? r.split(/\s*,\s*/g) : []),
          o(r, function () {
            u(e, function () {
              Prism.highlightElement(c);
            });
          });
      },
      o = function (e, a, c) {
        "string" == typeof e && (e = [e]);
        var s = 0,
          r = e.length,
          t = function () {
            r > s
              ? u(
                  e[s],
                  function () {
                    s++, t();
                  },
                  function () {
                    c && c(e[s]);
                  }
                )
              : s === r && a && a(e);
          };
        t();
      },
      u = function (c, r, t) {
        var n = function () {
            var e = !1;
            c.indexOf("!") >= 0 && ((e = !0), (c = c.replace("!", "")));
            var n = a[c];
            if (
              (n || (n = a[c] = {}),
              r &&
                (n.success_callbacks || (n.success_callbacks = []),
                n.success_callbacks.push(r)),
              t &&
                (n.error_callbacks || (n.error_callbacks = []),
                n.error_callbacks.push(t)),
              !e && Prism.languages[c])
            )
              p(c);
            else if (!e && n.error) k(c);
            else if (e || !n.loading) {
              n.loading = !0;
              var l = i(c);
              s(
                l,
                function () {
                  (n.loading = !1), p(c);
                },
                function () {
                  (n.loading = !1), (n.error = !0), k(c);
                }
              );
            }
          },
          l = e[c];
        l && l.length ? o(l, n) : n();
      },
      p = function (e) {
        a[e] &&
          a[e].success_callbacks &&
          a[e].success_callbacks.length &&
          a[e].success_callbacks.forEach(function (a) {
            a(e);
          });
      },
      k = function (e) {
        a[e] &&
          a[e].error_callbacks &&
          a[e].error_callbacks.length &&
          a[e].error_callbacks.forEach(function (a) {
            a(e);
          });
      };
    Prism.hooks.add("complete", function (e) {
      e.element &&
        e.language &&
        !e.grammar &&
        e.language !== c &&
        l(e.language, e.element);
    });
  }
})();
!(function () {
  "undefined" != typeof self &&
    self.Prism &&
    self.document &&
    Prism.languages.markup &&
    ((Prism.plugins.UnescapedMarkup = !0),
    Prism.hooks.add("before-highlightall", function (e) {
      e.selector +=
        ", [class*='lang-'] script[type='text/plain'], [class*='language-'] script[type='text/plain'], script[type='text/plain'][class*='lang-'], script[type='text/plain'][class*='language-']";
    }),
    Prism.hooks.add("before-sanity-check", function (e) {
      if (e.element.matches("script[type='text/plain']")) {
        var t = document.createElement("code"),
          n = document.createElement("pre");
        return (
          (n.className = t.className = e.element.className),
          e.element.dataset &&
            Object.keys(e.element.dataset).forEach(function (t) {
              Object.prototype.hasOwnProperty.call(e.element.dataset, t) &&
                (n.dataset[t] = e.element.dataset[t]);
            }),
          (e.code = e.code.replace(/&lt;\/script(>|&gt;)/gi, "</script>")),
          (t.textContent = e.code),
          n.appendChild(t),
          e.element.parentNode.replaceChild(n, e.element),
          (e.element = t),
          void 0
        );
      }
      var n = e.element.parentNode;
      !e.code &&
        n &&
        "pre" == n.nodeName.toLowerCase() &&
        e.element.childNodes.length &&
        "#comment" == e.element.childNodes[0].nodeName &&
        (e.element.textContent = e.code = e.element.childNodes[0].textContent);
    }));
})();
!(function () {
  "undefined" != typeof self &&
    self.Prism &&
    self.document &&
    Prism.hooks.add("complete", function (e) {
      if (e.code) {
        var t = e.element.parentNode,
          a = /\s*\bcommand-line\b\s*/;
        if (
          t &&
          /pre/i.test(t.nodeName) &&
          (a.test(t.className) || a.test(e.element.className)) &&
          !e.element.querySelector(".command-line-prompt")
        ) {
          a.test(e.element.className) &&
            (e.element.className = e.element.className.replace(a, "")),
            a.test(t.className) || (t.className += " command-line");
          var n = function (e, a) {
              return (t.getAttribute(e) || a).replace(/"/g, "&quot");
            },
            s = new Array(1 + e.code.split("\n").length),
            r = n("data-prompt", "");
          if ("" !== r) s = s.join('<span data-prompt="' + r + '"></span>');
          else {
            var l = n("data-user", "user"),
              m = n("data-host", "localhost");
            s = s.join(
              '<span data-user="' + l + '" data-host="' + m + '"></span>'
            );
          }
          var o = document.createElement("span");
          (o.className = "command-line-prompt"), (o.innerHTML = s);
          var i = t.getAttribute("data-output") || "";
          i = i.split(",");
          for (var c = 0; c < i.length; c++) {
            var p = i[c].split("-"),
              d = parseInt(p[0]),
              u = d;
            if (
              (2 === p.length && (u = parseInt(p[1])), !isNaN(d) && !isNaN(u))
            )
              for (var f = d; u >= f && f <= o.children.length; f++) {
                var N = o.children[f - 1];
                N.removeAttribute("data-user"),
                  N.removeAttribute("data-host"),
                  N.removeAttribute("data-prompt");
              }
          }
          e.element.innerHTML = o.outerHTML + e.element.innerHTML;
        }
      }
    });
})();
!(function () {
  function e(e) {
    this.defaults = r({}, e);
  }
  function n(e) {
    return e.replace(/-(\w)/g, function (e, n) {
      return n.toUpperCase();
    });
  }
  function t(e) {
    for (var n = 0, t = 0; t < e.length; ++t)
      e.charCodeAt(t) == "	".charCodeAt(0) && (n += 3);
    return e.length + n;
  }
  var r =
    Object.assign ||
    function (e, n) {
      for (var t in n) n.hasOwnProperty(t) && (e[t] = n[t]);
      return e;
    };
  (e.prototype = {
    setDefaults: function (e) {
      this.defaults = r(this.defaults, e);
    },
    normalize: function (e, t) {
      t = r(this.defaults, t);
      for (var i in t) {
        var o = n(i);
        "normalize" !== i &&
          "setDefaults" !== o &&
          t[i] &&
          this[o] &&
          (e = this[o].call(this, e, t[i]));
      }
      return e;
    },
    leftTrim: function (e) {
      return e.replace(/^\s+/, "");
    },
    rightTrim: function (e) {
      return e.replace(/\s+$/, "");
    },
    tabsToSpaces: function (e, n) {
      return (n = 0 | n || 4), e.replace(/\t/g, new Array(++n).join(" "));
    },
    spacesToTabs: function (e, n) {
      return (n = 0 | n || 4), e.replace(new RegExp(" {" + n + "}", "g"), "	");
    },
    removeTrailing: function (e) {
      return e.replace(/\s*?$/gm, "");
    },
    removeInitialLineFeed: function (e) {
      return e.replace(/^(?:\r?\n|\r)/, "");
    },
    removeIndent: function (e) {
      var n = e.match(/^[^\S\n\r]*(?=\S)/gm);
      return n && n[0].length
        ? (n.sort(function (e, n) {
            return e.length - n.length;
          }),
          n[0].length ? e.replace(new RegExp("^" + n[0], "gm"), "") : e)
        : e;
    },
    indent: function (e, n) {
      return e.replace(/^[^\S\n\r]*(?=\S)/gm, new Array(++n).join("	") + "$&");
    },
    breakLines: function (e, n) {
      n = n === !0 ? 80 : 0 | n || 80;
      for (var r = e.split("\n"), i = 0; i < r.length; ++i)
        if (!(t(r[i]) <= n)) {
          for (var o = r[i].split(/(\s+)/g), a = 0, s = 0; s < o.length; ++s) {
            var l = t(o[s]);
            (a += l), a > n && ((o[s] = "\n" + o[s]), (a = l));
          }
          r[i] = o.join("");
        }
      return r.join("\n");
    },
  }),
    "undefined" != typeof module && module.exports && (module.exports = e),
    "undefined" != typeof Prism &&
      ((Prism.plugins.NormalizeWhitespace = new e({
        "remove-trailing": !0,
        "remove-indent": !0,
        "left-trim": !0,
        "right-trim": !0,
      })),
      Prism.hooks.add("before-sanity-check", function (e) {
        var n = Prism.plugins.NormalizeWhitespace;
        if (!e.settings || e.settings["whitespace-normalization"] !== !1) {
          if ((!e.element || !e.element.parentNode) && e.code)
            return (e.code = n.normalize(e.code, e.settings)), void 0;
          var t = e.element.parentNode,
            r = /\bno-whitespace-normalization\b/;
          if (
            e.code &&
            t &&
            "pre" === t.nodeName.toLowerCase() &&
            !r.test(t.className) &&
            !r.test(e.element.className)
          ) {
            for (
              var i = t.childNodes, o = "", a = "", s = !1, l = 0;
              l < i.length;
              ++l
            ) {
              var c = i[l];
              c == e.element
                ? (s = !0)
                : "#text" === c.nodeName &&
                  (s ? (a += c.nodeValue) : (o += c.nodeValue),
                  t.removeChild(c),
                  --l);
            }
            if (e.element.children.length && Prism.plugins.KeepMarkup) {
              var u = o + e.element.innerHTML + a;
              (e.element.innerHTML = n.normalize(u, e.settings)),
                (e.code = e.element.textContent);
            } else
              (e.code = o + e.code + a),
                (e.code = n.normalize(e.code, e.settings));
          }
        }
      }));
})();
!(function () {
  "undefined" != typeof self &&
    self.Prism &&
    self.document &&
    document.createRange &&
    ((Prism.plugins.KeepMarkup = !0),
    Prism.hooks.add("before-highlight", function (e) {
      if (e.element.children.length) {
        var n = 0,
          o = [],
          t = function (e, d) {
            var r = {};
            d || ((r.clone = e.cloneNode(!1)), (r.posOpen = n), o.push(r));
            for (var a = 0, s = e.childNodes.length; s > a; a++) {
              var l = e.childNodes[a];
              1 === l.nodeType
                ? t(l)
                : 3 === l.nodeType && (n += l.data.length);
            }
            d || (r.posClose = n);
          };
        t(e.element, !0), o && o.length && (e.keepMarkup = o);
      }
    }),
    Prism.hooks.add("after-highlight", function (e) {
      if (e.keepMarkup && e.keepMarkup.length) {
        var n = function (e, o) {
          for (var t = 0, d = e.childNodes.length; d > t; t++) {
            var r = e.childNodes[t];
            if (1 === r.nodeType) {
              if (!n(r, o)) return !1;
            } else
              3 === r.nodeType &&
                (!o.nodeStart &&
                  o.pos + r.data.length > o.node.posOpen &&
                  ((o.nodeStart = r),
                  (o.nodeStartPos = o.node.posOpen - o.pos)),
                o.nodeStart &&
                  o.pos + r.data.length >= o.node.posClose &&
                  ((o.nodeEnd = r), (o.nodeEndPos = o.node.posClose - o.pos)),
                (o.pos += r.data.length));
            if (o.nodeStart && o.nodeEnd) {
              var a = document.createRange();
              return (
                a.setStart(o.nodeStart, o.nodeStartPos),
                a.setEnd(o.nodeEnd, o.nodeEndPos),
                o.node.clone.appendChild(a.extractContents()),
                a.insertNode(o.node.clone),
                a.detach(),
                !1
              );
            }
          }
          return !0;
        };
        e.keepMarkup.forEach(function (o) {
          n(e.element, { node: o, pos: 0 });
        }),
          (e.highlightedCode = e.element.innerHTML);
      }
    }));
})();
!(function () {
  if (
    ("undefined" == typeof self || self.Prism) &&
    ("undefined" == typeof global || global.Prism)
  ) {
    var i = function (i) {
        return (
          Prism.plugins.autolinker &&
            Prism.plugins.autolinker.processGrammar(i),
          i
        );
      },
      a = {
        pattern: /(.)\bdata:[^\/]+\/[^,]+,(?:(?!\1)[\s\S]|\\\1)+(?=\1)/,
        lookbehind: !0,
        inside: {
          "language-css": {
            pattern: /(data:[^\/]+\/(?:[^+,]+\+)?css,)[\s\S]+/,
            lookbehind: !0,
          },
          "language-javascript": {
            pattern: /(data:[^\/]+\/(?:[^+,]+\+)?javascript,)[\s\S]+/,
            lookbehind: !0,
          },
          "language-json": {
            pattern: /(data:[^\/]+\/(?:[^+,]+\+)?json,)[\s\S]+/,
            lookbehind: !0,
          },
          "language-markup": {
            pattern: /(data:[^\/]+\/(?:[^+,]+\+)?(?:html|xml),)[\s\S]+/,
            lookbehind: !0,
          },
        },
      },
      n = ["url", "attr-value", "string"];
    (Prism.plugins.dataURIHighlight = {
      processGrammar: function (i) {
        i &&
          !i["data-uri"] &&
          (Prism.languages.DFS(i, function (i, e, r) {
            n.indexOf(r) > -1 &&
              "Array" !== Prism.util.type(e) &&
              (e.pattern || (e = this[i] = { pattern: e }),
              (e.inside = e.inside || {}),
              "attr-value" == r
                ? Prism.languages.insertBefore(
                    "inside",
                    e.inside["url-link"] ? "url-link" : "punctuation",
                    { "data-uri": a },
                    e
                  )
                : e.inside["url-link"]
                ? Prism.languages.insertBefore(
                    "inside",
                    "url-link",
                    { "data-uri": a },
                    e
                  )
                : (e.inside["data-uri"] = a));
          }),
          (i["data-uri"] = a));
      },
    }),
      Prism.hooks.add("before-highlight", function (n) {
        if (a.pattern.test(n.code))
          for (var e in a.inside)
            if (
              a.inside.hasOwnProperty(e) &&
              !a.inside[e].inside &&
              a.inside[e].pattern.test(n.code)
            ) {
              var r = e.match(/^language-(.+)/)[1];
              Prism.languages[r] &&
                (a.inside[e].inside = { rest: i(Prism.languages[r]) });
            }
        Prism.plugins.dataURIHighlight.processGrammar(n.grammar);
      });
  }
})();
!(function () {
  if ("undefined" != typeof self && self.Prism && self.document) {
    if (!Prism.plugins.toolbar)
      return (
        console.warn("Show Languages plugin loaded before Toolbar plugin."),
        void 0
      );
    var e = {
      html: "HTML",
      xml: "XML",
      svg: "SVG",
      mathml: "MathML",
      css: "CSS",
      clike: "C-like",
      javascript: "JavaScript",
      abap: "ABAP",
      actionscript: "ActionScript",
      apacheconf: "Apache Configuration",
      apl: "APL",
      applescript: "AppleScript",
      asciidoc: "AsciiDoc",
      asm6502: "6502 Assembly",
      aspnet: "ASP.NET (C#)",
      autohotkey: "AutoHotkey",
      autoit: "AutoIt",
      basic: "BASIC",
      csharp: "C#",
      cpp: "C++",
      coffeescript: "CoffeeScript",
      "css-extras": "CSS Extras",
      django: "Django/Jinja2",
      fsharp: "F#",
      glsl: "GLSL",
      graphql: "GraphQL",
      http: "HTTP",
      ichigojam: "IchigoJam",
      inform7: "Inform 7",
      json: "JSON",
      latex: "LaTeX",
      livescript: "LiveScript",
      lolcode: "LOLCODE",
      matlab: "MATLAB",
      mel: "MEL",
      n4js: "N4JS",
      nasm: "NASM",
      nginx: "nginx",
      nsis: "NSIS",
      objectivec: "Objective-C",
      ocaml: "OCaml",
      opencl: "OpenCL",
      parigp: "PARI/GP",
      php: "PHP",
      "php-extras": "PHP Extras",
      powershell: "PowerShell",
      properties: ".properties",
      protobuf: "Protocol Buffers",
      jsx: "React JSX",
      renpy: "Ren'py",
      rest: "reST (reStructuredText)",
      sas: "SAS",
      sass: "Sass (Sass)",
      scss: "Sass (Scss)",
      sql: "SQL",
      typescript: "TypeScript",
      vbnet: "VB.Net",
      vhdl: "VHDL",
      vim: "vim",
      wiki: "Wiki markup",
      xojo: "Xojo (REALbasic)",
      yaml: "YAML",
    };
    Prism.plugins.toolbar.registerButton("show-language", function (t) {
      var a = t.element.parentNode;
      if (a && /pre/i.test(a.nodeName)) {
        var s =
            a.getAttribute("data-language") ||
            e[t.language] ||
            t.language.substring(0, 1).toUpperCase() + t.language.substring(1),
          i = document.createElement("span");
        return (i.textContent = s), i;
      }
    });
  }
})();
!(function () {
  if ("undefined" != typeof self && self.Prism && self.document) {
    if (!Prism.plugins.toolbar)
      return (
        console.warn("Copy to Clipboard plugin loaded before Toolbar plugin."),
        void 0
      );
    var o = window.Clipboard || void 0;
    o && /(native code)/.test(o.toString()) && (o = void 0),
      o || "function" != typeof require || (o = require("clipboard"));
    var t = [];
    if (!o) {
      var e = document.createElement("script"),
        n = document.querySelector("head");
      (e.onload = function () {
        if ((o = window.Clipboard)) for (; t.length; ) t.pop()();
      }),
        (e.src =
          "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.7.1/clipboard.min.js"),
        n.appendChild(e);
    }
    Prism.plugins.toolbar.registerButton("copy-to-clipboard", function (e) {
      function n() {
        var t = new o(i, {
          text: function () {
            return e.code;
          },
        });
        t.on("success", function () {
          (i.textContent = "Copied!"), r();
        }),
          t.on("error", function () {
            (i.textContent = "Press Ctrl+C to copy"), r();
          });
      }
      function r() {
        setTimeout(function () {
          i.textContent = "Copy";
        }, 5e3);
      }
      var i = document.createElement("a");
      return (i.textContent = "Copy"), o ? n() : t.push(n), i;
    });
  }
})();
