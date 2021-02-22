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
/* colourBrightness.js by @jamiebrittain */
(function(e) {
    e.fn.colourBrightness = function() {
        var e, t, n, r, i = this.css("background-color");
        if (i.match(/^rgb/)) {
            i = i.match(/rgb\(([^)]+)\)/)[1];
            i = i.split(/ *, */).map(Number);
            e = i[0];
            t = i[1];
            n = i[2]
        } else if ("#" == i[0] && 7 == i.length) {
            e = parseInt(i.slice(1, 3), 16);
            t = parseInt(i.slice(3, 5), 16);
            n = parseInt(i.slice(5, 7), 16)
        } else if ("#" == i[0] && 4 == i.length) {
            e = parseInt(i[1] + i[1], 16);
            t = parseInt(i[2] + i[2], 16);
            n = parseInt(i[3] + i[3], 16)
        }
        r = (e * 299 + t * 587 + n * 114) / 1e3;
        r < 125 ? this.removeClass("light").addClass("dark") : this.removeClass("dark").addClass("light")
    }
}
)(jQuery);
/* selectText.js by @jamiebrittain */
!function(e) {
    e.fn.selectText = function() {
        var e = this[0];
        if (document.body.createTextRange) {
            var t = document.body.createTextRange();
            t.moveToElementText(e),
            t.select()
        } else if (window.getSelection) {
            var n = window.getSelection()
              , t = document.createRange();
            t.selectNodeContents(e),
            n.removeAllRanges(),
            n.addRange(t)
        }
    }
}(jQuery);

$(window).load(function() {
    function is_touch_device() {
        return (('ontouchstart'in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
    }

    if (!is_touch_device()) {
        $('body').addClass('no-touch');
        $('h1').addClass('s');
        $('h1').html('Press the spacebar');
    } else {
        var hex = '#';
        var range = 'ABCDEF0123456789';

        for (var i = 0; i < 6; i++) {
            hex += range.charAt(Math.floor(Math.random() * range.length));
        }

        $('body').addClass('touch');
        $('h1').addClass('s');
        $('h1').html('<a href="/random-color-picker/' + hex + '">Tap here</a>');
    }

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
                if (!is_touch_device()) {
                    var colour = '#' + urlColour;

                    $('h1').removeClass();
                    $('h1').text(colour);
                    $('body').css('background-color', colour);
                    $('body').colourBrightness();
                } else {
                    var colour = '#' + urlColour;
                    var hex = '#';
                    var range = 'ABCDEF0123456789';

                    for (var i = 0; i < 6; i++) {
                        hex += range.charAt(Math.floor(Math.random() * range.length));
                    }

                    $('h1').removeClass();
                    $('h1').html('<a href="/random-color-picker/' + hex + '">' + colour + '</a>');
                    $('body').css('background-color', colour);
                    $('body').colourBrightness();
                }
            } else {
                if (!is_touch_device()) {
                    $('h1').addClass('s');
                    $('h1').html('Press the spacebar');
                    $('body').css('background-color', '');
                    $('body').colourBrightness();
                } else {
                    var hex = '#';
                    var range = 'ABCDEF0123456789';

                    for (var i = 0; i < 6; i++) {
                        hex += range.charAt(Math.floor(Math.random() * range.length));
                    }

                    $('h1').addClass('s');
                    $('h1').html('<a href="/random-color-picker/' + hex + '">Tap here</a>');
                    $('body').css('background-color', '');
                    $('body').colourBrightness();
                }
            }
        }
    }

    function generateColour() {
        var hex = '#';
        var range = 'ABCDEF0123456789';

        for (var i = 0; i < 6; i++) {
            hex += range.charAt(Math.floor(Math.random() * range.length));
        }

        $('h1').removeClass();
        $('h1').text(hex);
        $('body').css('background-color', hex);
        $('body').colourBrightness();
    }

    $(document).on('keyup', function(e) {
        if (e.keyCode == 32) {
            var hex = '#';
            var range = 'ABCDEF0123456789';

            for (var i = 0; i < 6; i++) {
                hex += range.charAt(Math.floor(Math.random() * range.length));
            }

            window.location.replace('https://colorify.vercel.app/random-color-picker/' + hex);
        }
    });

    $('h1').click(function(e) {
        $(this).selectText();
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
