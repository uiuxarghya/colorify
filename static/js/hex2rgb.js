/*! url - v1.8.6 - 2013-11-22 */
window.url = function() {
    function a(a) {
        return !isNaN(parseFloat(a)) && isFinite(a)
    }
    return function(b, c) {
        var d = c || window.location.toString();
        if (!b)
            return d;
        b = b.toString(),
        "//" === d.substring(0, 2) ? d = "http:" + d : 1 === d.split("://").length && (d = "http://" + d),
        c = d.split("/");
        var e = {
            auth: ""
        }
          , f = c[2].split("@");
        1 === f.length ? f = f[0].split(":") : (e.auth = f[0],
        f = f[1].split(":")),
        e.protocol = c[0],
        e.hostname = f[0],
        e.port = f[1] || ("https" === e.protocol.split(":")[0].toLowerCase() ? "443" : "80"),
        e.pathname = (c.length > 3 ? "/" : "") + c.slice(3, c.length).join("/").split("?")[0].split("#")[0];
        var g = e.pathname;
        "/" === g.charAt(g.length - 1) && (g = g.substring(0, g.length - 1));
        var h = e.hostname
          , i = h.split(".")
          , j = g.split("/");
        if ("hostname" === b)
            return h;
        if ("domain" === b)
            return /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(h) ? h : i.slice(-2).join(".");
        if ("sub" === b)
            return i.slice(0, i.length - 2).join(".");
        if ("port" === b)
            return e.port;
        if ("protocol" === b)
            return e.protocol.split(":")[0];
        if ("auth" === b)
            return e.auth;
        if ("user" === b)
            return e.auth.split(":")[0];
        if ("pass" === b)
            return e.auth.split(":")[1] || "";
        if ("path" === b)
            return e.pathname;
        if ("." === b.charAt(0)) {
            if (b = b.substring(1),
            a(b))
                return b = parseInt(b, 10),
                i[0 > b ? i.length + b : b - 1] || ""
        } else {
            if (a(b))
                return b = parseInt(b, 10),
                j[0 > b ? j.length + b : b] || "";
            if ("file" === b)
                return j.slice(-1)[0];
            if ("filename" === b)
                return j.slice(-1)[0].split(".")[0];
            if ("fileext" === b)
                return j.slice(-1)[0].split(".")[1] || "";
            if ("?" === b.charAt(0) || "#" === b.charAt(0)) {
                var k = d
                  , l = null;
                if ("?" === b.charAt(0) ? k = (k.split("?")[1] || "").split("#")[0] : "#" === b.charAt(0) && (k = k.split("#")[1] || ""),
                !b.charAt(1))
                    return k;
                b = b.substring(1),
                k = k.split("&");
                for (var m = 0, n = k.length; n > m; m++)
                    if (l = k[m].split("="),
                    l[0] === b)
                        return l[1] || "";
                return null
            }
        }
        return ""
    }
}(),
"undefined" != typeof jQuery && jQuery.extend({
    url: function(a, b) {
        return window.url(a, b)
    }
});
/*! rgbHex - v1.1.2 - 2013-09-27 */
window.rgbHex = function() {
    function a(a) {
        return !isNaN(parseFloat(a)) && isFinite(a)
    }
    function b(a) {
        return a.replace(/^\s+|\s+$/g, "")
    }
    function c(c) {
        return c = b(c),
        a(c) && c >= 0 && 255 >= c
    }
    function d(a) {
        return /^[0-9a-f]{3}$|^[0-9a-f]{6}$/i.test(b(a))
    }
    function e(a) {
        return a = parseInt(a, 10).toString(16),
        1 === a.length ? "0" + a : a
    }
    function f(a) {
        return parseInt(a, 16).toString()
    }
    function g(b) {
        return b = b.split(","),
        (3 === b.length || 4 === b.length) && c(b[0]) && c(b[1]) && c(b[2]) ? 4 !== b.length || a(b[3]) ? "#" + e(b[0]).toUpperCase() + e(b[1]).toUpperCase() + e(b[2]).toUpperCase() : null : null
    }
    function h(a) {
        return d(a) ? (3 === a.length && (a = a.charAt(0) + a.charAt(0) + a.charAt(1) + a.charAt(1) + a.charAt(2) + a.charAt(2)),
        "rgb(" + f(a.substr(0, 2)) + "," + f(a.substr(2, 2)) + "," + f(a.substr(4, 2)) + ")") : void 0
    }
    function i(a) {
        return a.replace(/\s/g, "")
    }
    return function(a) {
        if (!a)
            return null;
        var c = null
          , d = /^rgba?\((.*)\);?$/
          , e = /^#/;
        return a = b(a.toString()),
        "transparent" === a || "rgba(0,0,0,0)" === i(a) ? "transparent" : d.test(a) ? g(a.match(d)[1]) : e.test(a) ? h(a.split("#").reverse()[0]) : (c = a.split(","),
        1 === c.length ? h(a) : 3 === c.length || 4 === c.length ? g(a) : void 0)
    }
}(),
jQuery && jQuery.extend({
    rgbHex: function(a) {
        return window.rgbHex(a)
    }
});
/* colourBrightness.js by @jamiebrittain */
!function(r) {
    r.fn.colourBrightness = function() {
        function r(r) {
            for (var t = ""; "html" != r[0].tagName.toLowerCase() && (t = r.css("background-color"),
            "rgba(0, 0, 0, 0)" == t || "transparent" == t); )
                r = r.parent();
            return t
        }
        var t, a, s, e, n = r(this);
        return n.match(/^rgb/) ? (n = n.match(/rgba?\(([^)]+)\)/)[1],
        n = n.split(/ *, */).map(Number),
        t = n[0],
        a = n[1],
        s = n[2]) : "#" == n[0] && 7 == n.length ? (t = parseInt(n.slice(1, 3), 16),
        a = parseInt(n.slice(3, 5), 16),
        s = parseInt(n.slice(5, 7), 16)) : "#" == n[0] && 4 == n.length && (t = parseInt(n[1] + n[1], 16),
        a = parseInt(n[2] + n[2], 16),
        s = parseInt(n[3] + n[3], 16)),
        e = (299 * t + 587 * a + 114 * s) / 1e3,
        125 > e ? this.removeClass("light").addClass("dark") : this.removeClass("dark").addClass("light"),
        this
    }
}(jQuery);

$(window).load(function() {
    var $hex = $('#hex')
      , $rgb = $('#rgb')
      , $hex_val = $('#hex').val()
      , $rgb_val = $('#rgb').val();

    window.onhashchange = hashColour;
    hashColour();

    function hashColour() {
        var url, urlHash, urlColour;
        url = window.location.href;
        urlHash = window.url('#', url);

        if (window.url('#', url)) {
            urlColour = window.url('#', url);
        } else {
            urlColour = window.url('-1', url);
        }

        if (urlColour) {
            if (urlColour.match('^[0-9A-Fa-f]{3}$') || urlColour.match('^[0-9A-Fa-f]{6}$')) {
                $hex.val('#' + urlColour);

                colour = $.rgbHex($hex.val());

                if (colour) {
                    $rgb.val(colour);
                    $rgb.select();
                } else {
                    $rgb.val('');
                }

                $('body').css('background-color', $rgb.val());
                $('body').colourBrightness();
            } else {
                $hex.focus();
            }
        }
    }

    $hex.bind('blur keyup', function(e) {
        colour = $.rgbHex($('#hex').val());

        if (colour) {
            $('#rgb').val(colour);
        } else {
            $('#rgb').val('');
        }

        $('body').css('background-color', $rgb.val());
        $('body').colourBrightness();

        if (e.keyCode == 13) {
            $rgb.select();
        }
    });

    $rgb.bind('blur keyup', function(e) {
        colour = $.rgbHex($('#rgb').val());

        if (colour) {
            $('#hex').val(colour);
        } else {
            $('#hex').val('');
        }

        $('body').css('background-color', $hex.val());
        $('body').colourBrightness();

        if (e.keyCode == 13) {
            $hex.select();
        }
    });

    $('.tweet').click(function(e) {
        var width = 575
          , height = 400
          , left = ($(window).width() - width) / 2
          , top = ($(window).height() - height) / 2
          , url = this.href
          , opts = 'status=1' + ',width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;

        window.open(url, 'twitter', opts);

        return false;
    });
});
