var webengage = webengage || {};
var _weq = _weq || {};
webengage.eLog = function (f, h, d, b, m, c) {
    if (f instanceof Error) {
        d = f.stack || f.description;
        d = (d.length > 900 ? d.substring(0, 900) : d);
        b = f.message || d.substring(0, 50);
        h = "exception"
    }
    if (h) {
        if (c && m) {
            var a = "{'version':'" + webengage.getWidgetVersion() + "','text':'" + d + "', 'et':'" + m + "', 'eid':'" + c + "'}"
        } else {
            var a = "{'version':'" + webengage.getWidgetVersion() + "','text':'" + d + "'}"
        }
        var g = (h === "error" ? "http://c.webengage.com/e.jpg" : "http://c.webengage.com/e.jpg");
        var k = new Image();
        k.src = g + "?event=" + encodeURIComponent(b) + "&category=" + _weq["webengage.licenseCode"] + "&type=" + h + "&data=" + encodeURIComponent(a) + "&ts=" + (new Date()).getTime()
    }
};
webengage.withELog = function (c, a, b) {
    if (typeof c === "function") {
        try {
            if (!(a instanceof Array)) {
                a = []
            }
            return c.apply(undefined, a)
        } catch (d) {
            webengage.eLog(d);
            if (!b) {
                throw d
            }
        }
    } else {
        throw new Error("WithELog : first argument not a function")
    }
};
webengage.setTimeout = function (a, b) {
    return setTimeout(function () {
        webengage.withELog(a)
    }, b)
};
webengage.setInterval = function (b, a) {
    return setInterval(function () {
        webengage.withELog(b)
    }, a)
};
webengage.setTimeout(function () {
    (function (d, a, f, c, e) {
        var b = function () {
            var n = null,
                w = function (D, C, A) {
                    var B = (typeof (A) === "boolean" ? A : true);
                    for (var z in C) {
                        if (D[z] === e || B) {
                            D[z] = C[z]
                        }
                    }
                    return D
                },
                x = {};
            w(c, {
                util: {
                    copy: function (B, A, z) {
                        return w(B, A, z)
                    },
                    loadScript: function (C, D, z, E) {
                        var B = a.createElement("script");
                        B.type = "text/javascript";
                        B.charset = "UTF-8";
                        B.async = true;
                        B.src = C;
                        B.callBack = D;
                        B.callBackArgs = z || [];
                        B.errorCallBack = E;
                        this.appendChild(B);
                        if (c.BrowserDetect.ie() && c.BrowserDetect.version() < 11) {
                            if (typeof D === "function") {
                                var A = function () {
                                    if (B.readyState == "loaded" || B.readyState == "complete") {
                                        c.withELog(D, z)
                                    }
                                };
                                B.defer = true;
                                B.onreadystatechange = A
                            }
                        } else {
                            if (B.addEventListener) {
                                if (typeof D === "function") {
                                    B.addEventListener("load", function (F) {
                                        c.withELog(D, z)
                                    }, false)
                                }
                                B.addEventListener("error", function (F) {
                                    if (c.getWidgetVersion() !== "3.0") {
                                        c.eLog(null, "error", "could not load - " + C, "script loading error")
                                    }
                                    if (typeof E === "function") {
                                        c.withELog(E, [F])
                                    }
                                }, true)
                            } else {
                                if (typeof D === "function") {
                                    B.attachEvent("onload", function (F) {
                                        c.withELog(D, z)
                                    })
                                }
                                B.attachEvent("onerror", function (F) {
                                    if (c.getWidgetVersion() !== "3.0") {
                                        c.eLog(null, "error", "could not load - " + C, "script loading error")
                                    }
                                    if (typeof E === "function") {
                                        c.withELog(E, [F])
                                    }
                                })
                            }
                        }
                    },
                    createObj: function (A) {
                        var B = c,
                            z = A ? A.split(".") : [];
                        for (var C = 0; C < z.length; C++) {
                            var E = z[C],
                                D = B[E];
                            if (!D) {
                                D = {};
                                B[E] = D
                            }
                            B = D
                        }
                        return B
                    },
                    extend: function (z, A) {
                        return c.util.copy((typeof z == "string" ? c.util.createObj(z) : z), A)
                    },
                    isJqueryPresent: function () {
                        return (d.jQuery !== e && parseFloat("." + d.jQuery().jquery.replace(/\./g, "")) >= 0.13)
                    },
                    applyCss: function (B, A) {
                        try {
                            for (var z in A) {
                                if (typeof A[z] == "function") {
                                    B.style[z] = A[z]()
                                } else {
                                    B.style[z] = A[z]
                                }
                            }
                        } catch (C) {}
                        return B
                    },
                    inArray: function (z, B) {
                        for (var A = 0; A < z.length; A++) {
                            if (z[A] == B) {
                                return true
                            }
                        }
                        return false
                    },
                    getMaxZIndex: function () {
                        if (this.maxZIndex === e) {
                            this.maxZIndex = 16776271
                        }
                        return this.maxZIndex++
                    },
                    alignCenter: function (C, B, A) {
                        var z = (A == "left") ? "right" : "left";
                        C.style.top = ((parseInt(c.util.getElementHeight(B), 10) - parseInt(c.util.getElementHeight(C), 10)) / 2 - (/Firefox/i.test(navigator.userAgent) ? 7 : 0)) + "px";
                        C.style[z] = (parseInt(c.util.getElementWidth(B), 10) - parseInt(c.util.getElementWidth(C), 10)) / 2 + 10 + "px"
                    },
                    getElementWidth: function (z) {
                        if (z.clip !== e) {
                            return z.clip.width
                        } else {
                            if (z.style.pixelWidth) {
                                return z.style.pixelWidth
                            } else {
                                return z.offsetWidth
                            }
                        }
                    },
                    getElementHeight: function (z) {
                        if (z.clip !== e) {
                            return z.clip.height
                        } else {
                            if (z.style.pixelHeight) {
                                return z.style.pixelHeight
                            } else {
                                return z.offsetHeight
                            }
                        }
                    },
                    isSupportsLocalStorage: function (B) {
                        try {
                            var z = (typeof (Storage) !== "undefined" && "localStorage" in d && d.localStorage !== null);
                            if (!B && z) {
                                d.localStorage["_we_dm_ios_sup_f_"] = "true";
                                d.localStorage.removeItem("_we_dm_ios_sup_f_")
                            }
                            return z
                        } catch (A) {
                            return false
                        }
                    },
                    getWindowHeight: function () {
                        return "innerHeight" in d ? d.innerHeight : a.documentElement.offsetHeight
                    },
                    getWindowWidth: function () {
                        return "innerWidth" in d ? d.innerWidth : a.documentElement.offsetWidth
                    },
                    getInitParamValue: function (z, D, A, C) {
                        var B = A !== e ? A : null;
                        if (z && z[D]) {
                            var E = z[D];
                            if (C) {
                                if (c.util.inArray(C, E)) {
                                    B = E
                                }
                            } else {
                                B = E
                            }
                        }
                        return B
                    },
                    getInitParamValueAsArray: function (z, F, C, E) {
                        var D = c.util.getInitParamValue(z, F, C);
                        if (D && typeof (D) != "object") {
                            D = D.split(/\s*,\s*/)
                        }
                        if (E && typeof (E) == "object") {
                            var A = [];
                            for (var B = 0; B < D.length; B++) {
                                if (c.util.inArray(E, D[B])) {
                                    A[A.length] = D[B]
                                }
                            }
                            D = A
                        }
                        return D
                    },
                    setCookie: function (A, G, B, I, D, z, C) {
                        if (c.util.isSupportsLocalStorage() && !C) {
                            try {
                                d.localStorage[A] = G;
                                return "ls"
                            } catch (E) {
                                d.localStorage.removeItem(A);
                                return c.util.setCookie(A, G, B, I, D, z, true)
                            }
                        } else {
                            if (c.util.isSupportsLocalStorage(true) && !C) {
                                d.localStorage.removeItem(A)
                            }
                            var F = new Date();
                            F.setTime(F.getTime());
                            if (B) {
                                B = B * 1000 * 60 * 60 * 24
                            }
                            var H = new Date(F.getTime() + (B));
                            a.cookie = A + "=" + encodeURIComponent(G) + ((B) ? ";expires=" + H.toGMTString() : "") + ((I) ? ";path=" + I : "") + ((D) ? ";domain=" + D : "") + ((z) ? ";secure" : "");
                            return "ck"
                        }
                    },
                    getCookie: function (z, B) {
                        if (c.util.isSupportsLocalStorage(true) && !B) {
                            return (d.localStorage[z] ? d.localStorage[z] : c.util.getCookie(z, true))
                        } else {
                            var F = a.cookie.split(";");
                            var A = "";
                            var D = "";
                            var E = "";
                            var C = false;
                            for (i = 0; i < F.length; i++) {
                                A = F[i].split("=");
                                D = A[0].replace(/^\s+|\s+$/g, "");
                                if (D == z) {
                                    C = true;
                                    if (A.length > 1) {
                                        E = decodeURIComponent(A[1].replace(/^\s+|\s+$/g, ""))
                                    }
                                    return E === null ? "" : E
                                }
                                A = null;
                                D = ""
                            }
                            if (!C) {
                                return null
                            }
                        }
                    },
                    bindEvent: function (z, A) {
                        if (d.addEventListener) {
                            d.addEventListener(z, A)
                        } else {
                            if (d.attachEvent) {
                                d.attachEvent("on" + z, A)
                            }
                        }
                    },
                    unbindEvent: function (z, A) {
                        if (d.removeEventListener) {
                            d.removeEventListener(z, A)
                        } else {
                            if (d.detachEvent) {
                                d.detachEvent("on" + z, A)
                            }
                        }
                    },
                    getCurrentTime: function (A) {
                        var D = new Date();
                        var B = D.getTime();
                        if (A !== e) {
                            var C = D.getTimezoneOffset() * 60000;
                            var z = B + C;
                            B = z + (1000 * A)
                        }
                        return B
                    },
                    setWebengageCookie: function (A) {
                        var D = (function () {
                            var E = function () {
                                return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1)
                            };
                            return ((new Date().getTime()) + E() + E() + E() + E())
                        })();
                        var C = A || {};
                        var B = {
                            time: (new Date()).getTime(),
                            luid: D
                        };
                        C = c.util.copy(C, B, false);
                        var z = c.util.stringify(C);
                        x._we_wk_ls_ = C;
                        c.util.setCookie("_we_wk_ls_", z, 99999, "/", "", "");
                        if (this.firstTimeUser === e) {
                            this.firstTimeUser = true
                        }
                    },
                    getWebengageCookie: function () {
                        var z = c.util.getCookie("_we_wk_ls_") || x._we_wk_ls_;
                        if (z) {
                            var z = c.util.getCookie("_we_wk_ls_");
                            if (c.util.isSupportsLocalStorage() && c.util.getCookie("_we_wk_ls_", true)) {
                                c.util.setCookie("_we_wk_ls_", z, -1, "/", "", "", true);
                                c.util.setCookie("_we_wk_ls_", z, 99999, "/", "", "")
                            }
                            x._we_wk_ls_ = new Function("return " + z)() || null
                        } else {
                            c.util.setWebengageCookie()
                        }
                        return x._we_wk_ls_
                    },
                    setSessionCookie: function (C) {
                        var A = {
                            referrer: a.referrer,
                            country: c.GEO.country(),
                            region: c.GEO.region(),
                            city: c.GEO.city(),
                            ip: c.GEO.ip(),
                            tsD: (c.GEO.serverTimeStamp() && !isNaN(c.GEO.serverTimeStamp()) ? ((new Date()).getTime() - parseInt(c.GEO.serverTimeStamp(), 10)) : 0),
                            isFirstTime: c.util.isFirstTimeUser(),
                            sst: (new Date()).getTime(),
                            pvc: 1,
                            suid: (new Date().getTime()),
                            vtd: 0,
                            landingPage: d.location.href
                        };
                        var B = C || {};
                        B = c.util.copy(B, A, false);
                        var D = c.util.stringify(B);
                        x._we_wk_ss_ = B;
                        var z = c.util.setCookie("_we_wk_ss_", D, "", "/", "", "");
                        if (c.util.isSupportsLocalStorage()) {
                            if (z === "ls") {
                                c.util.setCookie("_we_wk_ss_lsf_", true, "", "/", "", "", true)
                            } else {
                                c.util.setCookie("_we_wk_ss_lsf_", false, "", "/", "", "", true)
                            }
                        }
                        return B
                    },
                    getSessionCookie: function () {
                        var C = c.util.getCookie("_we_wk_ss_") || c.util.getCookie("_we_wk_ss_", true) || x._we_wk_ss_;
                        if (C) {
                            try {
                                if (c.util.isSupportsLocalStorage()) {
                                    var B = c.util.getCookie("_we_wk_ss_lsf_", true);
                                    if (!B || B === "false") {
                                        var z = c.util.getCookie("_we_wk_ss_", true);
                                        if (z) {
                                            c.util.setCookie("_we_wk_ss_", C, -1, "/", "", "", true);
                                            c.util.setSessionCookie(z)
                                        } else {
                                            throw new Error()
                                        }
                                    }
                                }
                                x._we_wk_ss_ = (new Function("return " + C)()) || null
                            } catch (A) {
                                x._we_wk_ss_ = c.util.setSessionCookie()
                            }
                        } else {
                            x._we_wk_ss_ = c.util.setSessionCookie()
                        }
                        return x._we_wk_ss_
                    },
                    updateSessionCookie: function (A) {
                        var z = c.util.getSessionCookie();
                        if (z) {
                            c.util.copy(z, (A || {}));
                            c.util.setSessionCookie(z)
                        } else {
                            z = c.util.setSessionCookie()
                        }
                        return z
                    },
                    updateSessionCookieGeoData: function () {
                        var z = {
                            country: c.GEO.country(),
                            region: c.GEO.region(),
                            city: c.GEO.city(),
                            ip: c.GEO.ip(),
                            tsD: (c.GEO.serverTimeStamp() && !isNaN(c.GEO.serverTimeStamp()) ? ((new Date()).getTime() - parseInt(c.GEO.serverTimeStamp(), 10)) : 0)
                        };
                        c.util.updateSessionCookie(z)
                    },
                    getClientPageUrl: function () {
                        return d.location.href
                    },
                    getClientPageHost: function () {
                        return d.location.host
                    },
                    escapeScopeChars: function (z) {
                        return (z + "").replace(/([,#[\]\\])/g, "$1")
                    },
                    escapeForRegExp: function (z) {
                        return (z + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
                    },
                    isFirstTimeUser: function () {
                        return (this.firstTimeUser !== e) ? this.firstTimeUser : false
                    },
                    escapeNewLine: function (z) {
                        return z.replace(/[\\]/g, "\\\\").replace(/[\"]/g, '\\"').replace(/[\/]/g, "\\/").replace(/[\b]/g, "\\b").replace(/[\f]/g, "\\f").replace(/[\n]/g, "\\n").replace(/[\r]/g, "\\r").replace(/[\t]/g, "\\t")
                    },
                    stringify: function (F) {
                        if (typeof JSON !== "undefined" && typeof JSON.stringify === "function") {
                            return JSON.stringify(F)
                        } else {
                            var C = typeof (F);
                            if (C != "object" || F === null) {
                                if (C == "string") {
                                    F = '"' + c.util.escapeNewLine(F) + '"'
                                }
                                return String(F)
                            } else {
                                var G, E, B = [],
                                    z = (F && F.constructor == Array),
                                    D = (F && F instanceof Date);
                                if (z) {
                                    for (var A = 0; A < F.length; A++) {
                                        E = F[A];
                                        C = typeof (E);
                                        if (C == "string") {
                                            E = '"' + c.util.escapeNewLine(E) + '"'
                                        } else {
                                            if (C == "object" && E !== null) {
                                                E = c.util.stringify(E)
                                            }
                                        }
                                        B.push(String(E))
                                    }
                                } else {
                                    if (D) {
                                        return D.toString()
                                    } else {
                                        for (G in F) {
                                            E = F[G];
                                            C = typeof (E);
                                            if (C == "string") {
                                                E = '"' + E + '"'
                                            } else {
                                                if (C == "object" && E !== null) {
                                                    E = c.util.stringify(E)
                                                }
                                            }
                                            B.push('"' + G + '":' + String(E))
                                        }
                                    }
                                }
                                return (z ? "[" : "{") + String(B) + (z ? "]" : "}")
                            }
                        }
                    },
                    trimStr: function (z) {
                        if (typeof z.trim === "function") {
                            return z.trim()
                        } else {
                            if (typeof z === "string") {
                                return z.replace(/^\s+|\s+$/g, "")
                            }
                        }
                        return z
                    },
                    clientDataString: function (F) {
                        var C = function (I) {
                            var G = I;
                            if (typeof I === "function") {
                                try {
                                    G = I()
                                } catch (H) {
                                    G = null
                                }
                            }
                            return G
                        };
                        if (typeof F === "object") {
                            for (var B in F) {
                                var D = F[B];
                                if (D === e || (typeof D !== "boolean" && D !== 0 && !D)) {
                                    delete F[B];
                                    continue
                                }
                                if (!(D instanceof Array)) {
                                    F[B] = new Array();
                                    var E = C(D);
                                    if (E === e || (typeof E !== "boolean" && E !== 0 && !E)) {
                                        delete F[B]
                                    } else {
                                        F[B].push(E)
                                    }
                                } else {
                                    var z = [];
                                    for (var A = 0; A < D.length; A++) {
                                        D[A] = C(D[A]);
                                        if (!(D[A] === e || (typeof D[A] !== "boolean" && D[A] !== 0 && !D[A]))) {
                                            z.push(D[A])
                                        }
                                    }
                                    if (z.length > 0) {
                                        F[B] = z
                                    } else {
                                        delete F[B]
                                    }
                                }
                            }
                        }
                        return c.util.stringify(F)
                    },
                    isColorTooLight: function (A) {
                        A = A.indexOf("#") === 0 ? A.substr(1, A.length) : A;
                        var C = parseInt(A.substr(0, 2), 16);
                        var B = parseInt(A.substr(2, 2), 16);
                        var z = parseInt(A.substr(4, 2), 16);
                        var D = ((C * 299) + (B * 299) + (z * 299)) / 1000;
                        return D >= 128
                    },
                    isEmptyObject: function (z) {
                        for (var A in z) {
                            if (z.hasOwnProperty(A)) {
                                return false
                            }
                        }
                        return true
                    },
                    parseJSON: function (z) {
                        return new Function("return " + z + ";")()
                    },
                    bind: function (E, C) {
                        var F = this;
                        var D = F.callbacks || {};
                        if (E !== e && typeof (C) === "function") {
                            var G = C;
                            C = function () {
                                return G.apply(this, arguments)
                            };
                            C.cbid = (G.cbid = F.cbid++);
                            E = (E || "").match(/\S+/g) || [""];
                            var B = E.length;
                            while (B--) {
                                var A = E[B];
                                var z = D[A] || {};
                                z[C.cbid] = C;
                                D[A] = z
                            }
                            F.callbacks = D
                        }
                        return F
                    },
                    unbind: function (z, A) {
                        var B = this;
                        if (z !== e) {
                            if (typeof (B.callbacks) === "object" && typeof (B.callbacks[z]) === "object") {
                                if (typeof (A) === "function" && A.cbid) {
                                    delete B.callbacks[z][A.cbid]
                                } else {
                                    delete B.callbacks[z]
                                }
                            }
                        }
                        return B
                    },
                    executeCallbacks: function () {
                        var D = this;
                        if (typeof D.enableCallbacks === "boolean" && D.enableCallbacks) {
                            var A = arguments[0];
                            if (A !== e && typeof D.callbacks === "object" && typeof D.callbacks[A] === "object") {
                                for (var B in D.callbacks[A]) {
                                    if (typeof D.callbacks[A][B] === "function") {
                                        var z = {};
                                        if (arguments[1] !== e) {
                                            z = arguments[1]
                                        }
                                        z.event = A;
                                        var C = D.callbacks[A][B].apply(this, [z]);
                                        if (typeof C === "boolean" && !C) {
                                            return false
                                        }
                                    }
                                }
                            }
                        }
                    },
                    markSurveyAsClosed: function (A) {
                        if (A) {
                            try {
                                var z = c.util.getSessionCookie();
                                if (z.closedSurveys === e || !z.closedSurveys) {
                                    z.closedSurveys = ""
                                }
                                if (z.closedSurveys.indexOf("##" + A) < 0) {
                                    z.closedSurveys += "##" + A
                                }
                                c.util.updateSessionCookie(z)
                            } catch (B) {}
                        }
                    },
                    markSurveyAsTaken: function (A) {
                        if (A) {
                            try {
                                var z = c.util.getWebengageCookie();
                                if (z.takenSurveys === e || !z.takenSurveys) {
                                    z.takenSurveys = ""
                                }
                                if (z.takenSurveys.indexOf("##" + A) < 0) {
                                    z.takenSurveys += "##" + A
                                }
                                c.util.setWebengageCookie(z)
                            } catch (B) {}
                        }
                    },
                    markEntityAsShown: function (G, D) {
                        if (G && D) {
                            var B = 1;
                            try {
                                var E = c.util.getWebengageCookie();
                                sessionCookieVal = c.util.getSessionCookie();
                                if ("notification" === D) {
                                    var C = false,
                                        A = false;
                                    var z = u.notification && u.notification.ruleMap;
                                    if (z && z[G] && z[G]["actionLinks"] && z[G]["actionLinks"] instanceof Array && z[G]["actionLinks"].length > 0) {
                                        A = true
                                    }
                                    E.seenNIds = E.seenNIds && E.seenNIds !== e ? E.seenNIds : "";
                                    if (E.seenNIds.indexOf("##" + G) < 0) {
                                        E.seenNIds += "##" + G + "=" + B;
                                        C = true
                                    } else {
                                        var H = new RegExp("##" + G + "=(\\d+)", "g");
                                        E.seenNIds = E.seenNIds.replace(H, function (I, J) {
                                            B = (+J + 1);
                                            return "##" + G + "=" + B
                                        })
                                    }
                                    y.tsTracking("/n.jpg", ("id=" + G + "&licenseCode=" + f["webengage.licenseCode"] + "&v=1&uv=" + (C ? 1 : 0) + (!sessionCookieVal.hsn ? "&hsn=0" : "") + (!sessionCookieVal.hcn && !A ? "&hcn=0" : "") + "&tzo=" + webengage_fs_configurationMap.tzo));
                                    sessionCookieVal.hsn = 1;
                                    if (!sessionCookieVal.hcn && !A) {
                                        sessionCookieVal.hcn = 1
                                    }
                                } else {
                                    if ("survey" === D) {
                                        E.seenSIds = E.seenSIds && E.seenSIds !== e ? E.seenSIds : "";
                                        if (E.seenSIds.indexOf("##" + G) < 0) {
                                            E.seenSIds += "##" + G + "=" + B
                                        } else {
                                            var H = new RegExp("##" + G + "=(\\d+)", "g");
                                            E.seenSIds = E.seenSIds.replace(H, function (I, J) {
                                                B = (+J + 1);
                                                return "##" + G + "=" + B
                                            })
                                        }
                                    }
                                }
                                c.util.updateSessionCookie(sessionCookieVal);
                                c.util.setWebengageCookie(E)
                            } catch (F) {}
                        }
                    },
                    markNotificationAsClicked: function (D, E) {
                        if (D) {
                            try {
                                var B = c.util.getWebengageCookie(),
                                    A = c.util.getSessionCookie();
                                B.takenNIds = B.takenNIds && B.takenNIds !== e ? B.takenNIds : "";
                                if (B.takenNIds.indexOf("##" + D) < 0) {
                                    B.takenNIds += "##" + D
                                }
                                var z = ("id=" + D + "&licenseCode=" + f["webengage.licenseCode"] + "&ck=1" + (!A.hcn ? "&hcn=0" : "") + "&tzo=" + webengage_fs_configurationMap.tzo);
                                if (E) {
                                    z += "&ac=" + E
                                }
                                y.tsTracking("/n.jpg", z);
                                A.hcn = 1;
                                c.util.updateSessionCookie(A);
                                c.util.setWebengageCookie(B)
                            } catch (C) {}
                        }
                    },
                    markNotificationAsClosed: function (B) {
                        if (B) {
                            try {
                                var z = c.util.getSessionCookie();
                                if (z.closedNIds === e || !z.closedNIds) {
                                    z.closedNIds = ""
                                }
                                if (z.closedNIds.indexOf("##" + B) < 0) {
                                    z.closedNIds += "##" + B
                                }
                                c.util.updateSessionCookie(z);
                                y.tsTracking("/n.jpg", ("id=" + B + "&licenseCode=" + f["webengage.licenseCode"] + "&cl=1&tzo=" + webengage_fs_configurationMap.tzo))
                            } catch (A) {}
                        }
                    },
                    setMinimizedState: function (z, B, D) {
                        var C = (z === "notification" ? "minNIds" : "minSIds");
                        if (B) {
                            try {
                                var A = c.util.getSessionCookie();
                                if (A[C] === e || !A[C]) {
                                    A[C] = ""
                                }
                                if (D) {
                                    if (A[C].indexOf("##" + B) < 0) {
                                        A[C] += "##" + B
                                    }
                                } else {
                                    A[C] = A[C].replace("##" + B, "")
                                }
                                c.util.updateSessionCookie(A)
                            } catch (E) {}
                        }
                    },
                    getMinimizedState: function (z, B) {
                        var C = (z === "notification" ? "minNIds" : "minSIds");
                        var D = false;
                        if (B) {
                            try {
                                var A = c.util.getSessionCookie();
                                if (A[C] !== e) {
                                    if (0 <= A[C].indexOf("##" + B)) {
                                        D = true
                                    }
                                }
                            } catch (E) {}
                        }
                        return D
                    },
                    getVersion: function () {
                        return s.widgetVersion
                    },
                    updateSessionCookieOnWidgetLoad: function (B) {
                        var A = c.util.getSessionCookie();
                        A.pvc = (A.pvc ? A.pvc + 1 : 1);
                        if (B && a.referrer && (!A.referrer || A.referrer !== a.referrer)) {
                            var z = a.referrer.match(/:\/\/(.[^\/]+)/)[1];
                            if (!z.match(new RegExp(c.util.escapeForRegExp(B) + "$", "gi"))) {
                                A.referrer = a.referrer
                            }
                        }
                        c.util.updateSessionCookie(A)
                    },
                    getHashCode: function (D) {
                        var B = 0,
                            A, z, C = D || "";
                        if (C.length == 0) {
                            return B
                        }
                        for (A = 0, l = C.length; A < l; A++) {
                            z = C.charCodeAt(A);
                            B = ((B << 5) - B) + z;
                            B |= 0
                        }
                        return B
                    },
                    getTotalTimesShown: function (E, D) {
                        var z = 0;
                        if (E && D) {
                            try {
                                var C = y.getWebengageCookie();
                                if (C && (C.seenNIds || C.seenSIds)) {
                                    var B = new RegExp("##" + E + "=(\\d+)");
                                    var A = "";
                                    if ("notification" === D) {
                                        A = C.seenNIds.match(B)
                                    } else {
                                        if ("survey" === D) {
                                            A = C.seenSIds.match(B)
                                        }
                                    } if (A instanceof Array && A.length > 1) {
                                        z = A[1]
                                    }
                                }
                            } catch (F) {}
                        }
                        return z
                    },
                    attachEventListners: function (C, z) {
                        var A = (C === "survey" ? c.survey.callbacks : (C === "feedback" ? c.feedback.callbacks : c.notification.callbacks));
                        if (typeof A !== e && A) {
                            for (eventName in A) {
                                var B = A[eventName];
                                if (typeof callbacks != e && B) {
                                    for (_cbid in B) {
                                        this.bind.apply(z, [eventName, B[_cbid]])
                                    }
                                }
                            }
                        }
                    },
                    hasSVG: function () {
                        return !!a.createElementNS && !!a.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect
                    },
                    onDocReady: function (z) {
                        if (typeof z === "function") {
                            if (a.body) {
                                c.withELog(function () {
                                    z()
                                });
                                return
                            }
                            if (a.addEventListener) {
                                a.addEventListener("DOMContentLoaded", function () {
                                    c.withELog(function () {
                                        a.removeEventListener("DOMContentLoaded", arguments.callee, false);
                                        z()
                                    })
                                }, false)
                            } else {
                                if (a.attachEvent) {
                                    a.attachEvent("onreadystatechange", function () {
                                        c.withELog(function () {
                                            if (a.readyState === "complete") {
                                                a.detachEvent("onreadystatechange", arguments.callee);
                                                z()
                                            }
                                        })
                                    });
                                    if (a.documentElement.doScroll && d == d.top) {
                                        (function () {
                                            c.withELog(function () {
                                                try {
                                                    a.documentElement.doScroll("left")
                                                } catch (A) {
                                                    setTimeout(arguments.callee, 0);
                                                    return
                                                }
                                                z()
                                            })
                                        })()
                                    }
                                }
                            }
                        }
                    },
                    abortAllInstances: function (z) {
                        c.withELog(function () {
                            if (z.length > 0) {
                                for (var A = 0; A < z.length; A++) {
                                    if (typeof z[A].abort === "function") {
                                        z[A].abort()
                                    }
                                }
                            }
                        })
                    },
                    abortInstance: function (z) {
                        c.withELog(function () {
                            if (z) {
                                if (typeof z.close === "function") {
                                    z.close()
                                } else {
                                    z.onLoad(function () {
                                        this.close()
                                    })
                                }
                            }
                        })
                    },
                    uwats: function () {
                        if (!f["webengage.isDemoMode"]) {
                            var z = 1000 * 60 * 60 * 24;
                            var B = new Date().getTime() - (7 * z);
                            if (webengage_fs_configurationMap.lastWidgetCheckDate) {
                                var A = new Date(webengage_fs_configurationMap.lastWidgetCheckDate);
                                if (A < B) {
                                    c.eLog(null, "info", A.getTime(), "widget-verified")
                                }
                            } else {
                                c.eLog(null, "info", "no-check-date", "widget-verified")
                            }
                        }
                    },
                    isSmallScreen: function () {
                        var z = 480,
                            A = d.screen.availWidth;
                        return (A <= z ? true : false)
                    },
                    webklitWorkAround: function (z) {
                        var A = a.body.scrollTop || 0;
                        if (a.location.toString().match(/#(top)?$/)) {
                            z.body.scrollTop = 0;
                            a.body.scrollTop = A
                        }
                    },
                    getWeDataContainer: function () {
                        return s.weDataContainer
                    },
                    withWeJquery: function (z) {
                        c.jQSt = c.jQSt || 0;
                        switch (c.jQSt) {
                            case 1:
                                setTimeout(function () {
                                    c.util.withWeJquery(z)
                                }, 100);
                                break;
                            case 2:
                                if (typeof z === "function") {
                                    z()
                                }
                                break;
                            default:
                                c.jQSt = 1;
                                c.util.loadScript.apply(s.widgetContainer, [s.weJquery,
                                    function () {
                                        $weJQuery = jQuery.noConflict(true);
                                        c.jQSt = 2;
                                        if (typeof z === "function") {
                                            z()
                                        }
                                    }
                                ]);
                                break
                        }
                    },
                    tsTracking: function (A, B) {
                        if (A) {
                            var z = new Image();
                            z.src = "http://" + s.tstbu + A + (B ? "?" + B : "")
                        }
                    }
                }
            }, true);
            w(c, {
                getWidgetVersion: function () {
                    return f["webengage.widgetVersion"] || "4.0"
                }
            }, true);
            var y = c.util;
            var s = {
                widgetVersion: "4",
                weJquery: ".//jquery.js",
                baseWebEngageUrl: "http://webengage.com",
                feedbackAppHost: "http://feedback.webengage.com",
                surveyAppHost: "survey.webengage.com", //{valueOf: function () { throw new Error();}}, //"",
                widgetDomain: "http://d3701cc9l7v9a6.cloudfront.net",
                baseStaticUrl: "http://d3701cc9l7v9a6.cloudfront.net",
                loadSurveyWidgetUrl: function (z) {
                    return "./surv-widg.js"
                },
                loadSurveyWidgetUrlv3: "/js/widget/we-survey-widget.js?v=232.0",
                notificationWidgetScriptUrl: "/js/widget/we-notification-widget-v-4.1.js?v=232.0",
                findAllTakenSurveysUrl: function () {
                    return "http://survey.webengage.com/publisher-widget-loader.html?action=findAllTakenSurveys&licenseCode=" + f["webengage.licenseCode"] + "&url=" + encodeURIComponent("http://unbouncepages.com/qcl/")
                },
                widgetContainerId: "webklipper-publisher-widget-container",
                feedbackImageBaseUrl: "//s3-ap-southeast-1.amazonaws.com/wk-static-files/webengage/feedbacktab/",
                loadFeedbackWidgetUrl: "/js/widget/we-feedback-widget-v-4.0.js?v=232.0",
                loadFeedbackWidgetUrlv3: "/js/widget/we-feedback-widget.js?v=232.0",
                gaCallbacksScriptUrl: "http://d3701cc9l7v9a6.cloudfront.net/js/widget/ga-callbacks-helper.js?v=232.0",
                tstbu: "c.webengage.com",
                csUrl: "http://d3701cc9l7v9a6.cloudfront.net/js/widget/we-conversion-helper-min-v-1.0.js?v=232.0"
            };
            var u = {};
            y.extend("logger", (function () {
                var A = {
                        containerCss: {
                            position: function () {
                                return c.BrowserDetect.is_this_the_worlds_most_annoying_browser() ? "absolute" : "fixed"
                            },
                            cursor: "default",
                            margin: 0,
                            zIndex: (y.getMaxZIndex() + 1),
                            backgroundColor: "red",
                            right: "0px",
                            bottom: "0px",
                            display: "block",
                            padding: "10px",
                            maxWidth: "500px",
                            textAlign: "left",
                            lineHeight: "17px",
                            background: "none repeat scroll 0 0 #ff9",
                            border: "1px solid #fc6",
                            borderBottomWidth: "0px",
                            borderRightWidth: "0px",
                            borderTopLeftRadius: "5px",
                            MozBorderRadiusTopleft: "5px",
                            WebkitBorderTopLeftRadius: "5px",
                            boxShadow: "0 1px 0 0 rgba(255, 255, 255, 0.6) inset, 0 1px 1px rgba(0, 0, 0, 0.1)",
                            MozBoxShadow: "0 1px 0 0 rgba(255, 255, 255, 0.6) inset, 0 1px 1px rgba(0, 0, 0, 0.1)",
                            WebkitBoxShadow: "0 1px 0 0 rgba(255, 255, 255, 0.6) inset, 0 1px 1px rgba(0, 0, 0, 0.1)",
                            fontFamily: "Arial, sans-serif",
                            fontSize: "13px"
                        },
                        dataDivCss: {
                            margin: "0px",
                            padding: "0px",
                            color: "#000",
                            textShadow: "1px 1px #f1f1f1",
                            textDecoration: "none",
                            fontFamily: "inherit",
                            fontSize: "inherit"
                        },
                        dataDivLinkCss: {
                            color: "#039",
                            textDecoration: "underline",
                            textShadow: "1px 1px #f1f1f1",
                            fontFamily: "inherit",
                            fontSize: "inherit"
                        },
                        closeButtonCss: {
                            color: "#039",
                            textDecoration: "underline",
                            textShadow: "1px 1px #f1f1f1",
                            cursor: "pointer",
                            cssFloat: "right",
                            styleFloat: "right",
                            marginRight: "5px",
                            marginLeft: "30px"
                        }
                    },
                    z = function (L, K) {
                        var D = a.getElementById("webengage-error-messages");
                        if (D) {
                            D.parentNode.removeChild(D)
                        }
                        var F = a.createElement("div");
                        F.setAttribute("id", "webengage-error-messages");
                        F = y.applyCss(F, A.containerCss);
                        a.body.insertBefore(F, null);
                        var J = a.createElement("div");
                        J = y.applyCss(J, A.closeButtonCss);
                        J.innerHTML = "x";
                        F.appendChild(J);
                        J.onclick = function () {
                            this.parentNode.parentNode.removeChild(this.parentNode)
                        };
                        var C = a.createElement("div");
                        C = y.applyCss(C, A.dataDivCss);
                        F.appendChild(C);
                        C.innerHTML = L;
                        var G = C.getElementsByTagName("a");
                        if (G && G.length > 0) {
                            for (var H = 0; H < G.length; H++) {
                                y.applyCss(G[H], A.dataDivLinkCss);
                                var E = G[H].getAttribute("href");
                                var B = E.split("#");
                                var I = B[0];
                                I = I.indexOf("?") < 0 ? (I + "?") : I;
                                I = I + "&ref=widget-message";
                                I = B.length == 2 ? (I + "#" + B[1]) : I;
                                G[H].setAttribute("href", I)
                            }
                        }
                        c.eLog(null, K, L, L);
                        return F
                    };
                return {
                    success: function (B) {
                        return z(B, "success")
                    },
                    warn: function (B) {
                        return z(B, "warn")
                    },
                    error: function (B) {
                        return z(B, "error")
                    }
                }
            })());
            y.extend("GEO", {
                country: function () {
                    return this._country || ""
                },
                country_code: function () {
                    return this._country_code || ""
                },
                region: function () {
                    return this._region || ""
                },
                city: function () {
                    return this._city || ""
                },
                latitude: function () {
                    return this._latitude || ""
                },
                longitude: function () {
                    return this._longitude || ""
                },
                serverTimeStamp: function () {
                    return this._serverTimeStamp
                },
                ip: function () {
                    return this._ip || ""
                },
                setGeoData: function (B) {
                    var A = this,
                        z = B || {};
                    A._country = z.geoplugin_countryName || "";
                    A._country_code = z.geoplugin_country_code || "";
                    A._region = z.geoplugin_region || "";
                    A._city = z.geoplugin_city || "";
                    A._latitude = z.geoplugin_latitude || "";
                    A._longitude = z.geoplugin_longitude || "";
                    A._serverTimeStamp = z.serverTimeStamp;
                    A._ip = z.clientIp;
                    c.getUser().country = A._country;
                    c.getUser().city = A._city;
                    c.getUser().ip = A._ip
                },
                isGeoLoaded: function () {
                    return this._isLoaded ? this._isLoaded : y.getSessionCookie().tsD ? true : false
                },
                load: function (C, z) {
                    var A = this;
                    if (!this.isGeoLoaded()) {
                        var B = "http://geoservice.webengage.com/geoip/?jsoncallback=" + encodeURI("webengage.GEO.setGeoData");
                        y.loadScript.apply(s.widgetContainer, [B,
                            function () {
                                y.updateSessionCookieGeoData();
                                A._isLoaded = true;
                                if (typeof C === "function") {
                                    C()
                                }
                            },
                            null,
                            function () {
                                if (typeof z === "function") {
                                    z()
                                }
                            }
                        ])
                    } else {
                        A._isLoaded = true;
                        if (typeof C === "function") {
                            C()
                        }
                    }
                }
            });
            y.extend("BrowserDetect", (function () {
                var C, E, A, G = [{
                        string: navigator.userAgent,
                        subString: "Chrome",
                        identity: "Chrome"
                    }, {
                        string: navigator.userAgent,
                        subString: "OmniWeb",
                        versionSearch: "OmniWeb/",
                        identity: "OmniWeb"
                    }, {
                        string: navigator.vendor,
                        subString: "Apple",
                        identity: "Safari",
                        versionSearch: "Version"
                    }, {
                        prop: d.opera,
                        identity: "Opera"
                    }, {
                        string: navigator.vendor,
                        subString: "iCab",
                        identity: "iCab"
                    }, {
                        string: navigator.vendor,
                        subString: "KDE",
                        identity: "Konqueror"
                    }, {
                        string: navigator.userAgent,
                        subString: "Firefox",
                        identity: "Firefox"
                    }, {
                        string: navigator.vendor,
                        subString: "Camino",
                        identity: "Camino"
                    }, {
                        string: navigator.userAgent,
                        subString: "Netscape",
                        identity: "Netscape"
                    }, {
                        string: navigator.userAgent,
                        subString: "MSIE",
                        identity: "Explorer",
                        versionSearch: "MSIE"
                    }, {
                        string: navigator.userAgent,
                        subString: "Windows,Trident",
                        identity: "Explorer",
                        versionSearch: "rv"
                    }, {
                        string: navigator.userAgent,
                        subString: "Gecko",
                        identity: "Mozilla",
                        versionSearch: "rv"
                    }, {
                        string: navigator.userAgent,
                        subString: "Mozilla",
                        identity: "Netscape",
                        versionSearch: "Mozilla"
                    }],
                    D = [{
                        string: navigator.userAgent,
                        subString: "iPhone",
                        identity: "iOS"
                    }, {
                        string: navigator.userAgent,
                        subString: "iPad",
                        identity: "iOS"
                    }, {
                        string: navigator.userAgent,
                        subString: "Android",
                        identity: "Android"
                    }, {
                        string: navigator.userAgent,
                        subString: "Windows Phone",
                        identity: "Windows Phone"
                    }, {
                        string: navigator.platform,
                        subString: "Win",
                        identity: "Windows"
                    }, {
                        string: navigator.platform,
                        subString: "Mac",
                        identity: "Mac"
                    }, {
                        string: navigator.platform,
                        subString: "Linux",
                        identity: "Linux"
                    }, {
                        string: navigator.userAgent,
                        subString: "Mobile",
                        identity: "Mobile"
                    }],
                    B = [{
                        string: navigator.userAgent,
                        subString: "iPhone",
                        identity: "Mobile"
                    }, {
                        string: navigator.userAgent,
                        subString: "iPod",
                        identity: "Mobile"
                    }, {
                        string: navigator.userAgent,
                        subString: "Android,Mobile",
                        identity: "Mobile"
                    }, {
                        string: navigator.userAgent,
                        subString: "Windows Phone",
                        identity: "Mobile"
                    }, {
                        string: navigator.userAgent,
                        subString: "BlackBerry,Mobile",
                        identity: "Mobile"
                    }, {
                        string: navigator.userAgent,
                        subString: "BB10,Mobile",
                        identity: "Mobile"
                    }, {
                        string: navigator.userAgent,
                        subString: "Android",
                        identity: "Tablet"
                    }, {
                        string: navigator.userAgent,
                        subString: "iPad",
                        identity: "Tablet"
                    }, {
                        string: navigator.userAgent,
                        subString: "Windows,Tablet",
                        identity: "Tablet"
                    }],
                    z = function (O) {
                        for (var K = 0; K < O.length; K++) {
                            var L = O[K].string;
                            var N = O[K].prop;
                            this._versionSearchString = O[K].versionSearch || O[K].identity;
                            if (L) {
                                var M = O[K].subString.split(",");
                                var J = false;
                                for (var I = 0; I < M.length; I++) {
                                    if (L.indexOf(M[I]) == -1) {
                                        J = false;
                                        break
                                    }
                                    J = true
                                }
                                if (J) {
                                    return O[K].identity
                                }
                            } else {
                                if (N) {
                                    return O[K].identity
                                }
                            }
                        }
                    },
                    F = function (K) {
                        var J = K.indexOf(this._versionSearchString);
                        if (J == -1) {
                            return
                        }
                        var I = parseFloat(K.substring(J + this._versionSearchString.length + 1));
                        if (C == "Explorer" && 7 <= I) {
                            if (K.indexOf("Trident/4") != -1) {
                                I = 8
                            } else {
                                if (K.indexOf("Trident/5") != -1) {
                                    I = 9
                                } else {
                                    if (K.indexOf("Trident/6") != -1) {
                                        I = 10
                                    }
                                }
                            }
                        }
                        return I
                    },
                    H = function () {
                        if (C && E && A) {
                            return
                        }
                        C = z(G) || "An unknown browser";
                        E = F(navigator.userAgent) || F(navigator.appVersion) || "an unknown version";
                        A = z(D) || "an unknown OS";
                        _device = z(B) || (y.isSmallScreen() ? "Mobile" : "Desktop")
                    };
                return {
                    browser: function () {
                        return H() || C
                    },
                    version: function () {
                        return H() || E
                    },
                    os: function () {
                        return H() || A
                    },
                    device: function () {
                        return H() || _device
                    },
                    is_this_the_worlds_most_annoying_browser: function () {
                        return (a.all && !d.opera && !d.XMLHttpRequest)
                    },
                    ie: function () {
                        return H() || C == "Explorer"
                    },
                    isMobile: function () {
                        var K = this.os(),
                            I = false,
                            L = ["iOS", "Android", "Windows Phone", "Mobile"];
                        for (var J = 0; J < L.length; J++) {
                            if (K == L[J]) {
                                I = true;
                                break
                            }
                        }
                        return I
                    }
                }
            })());
            y.extend("feedback", (function () {
                var z = [],
                    A = {
                        onLoad: function (B) {
                            return this.bind("load", B)
                        },
                        onOpen: function (B) {
                            return this.bind("open", B)
                        },
                        onSubmit: function (B) {
                            return this.bind("submit", B)
                        },
                        onClose: function (B) {
                            return this.bind("close", B)
                        },
                        bind: function () {
                            return y.bind.apply(this, arguments)
                        },
                        unbind: function () {
                            return y.unbind.apply(this, arguments)
                        },
                        executeCallbacks: function () {
                            return y.executeCallbacks.apply(this, arguments)
                        }
                    };
                return {
                    cbid: 1,
                    getMobileLoadingDiv: function (C) {
                        var B = a.createElement("div");
                        B.id = C || s.widgetContainerId + "-loading";
                        B = c.util.applyCss(B, {
                            position: "fixed",
                            left: (c.util.getWindowWidth() * 0.05) + "px",
                            width: (c.util.getWindowWidth() * 0.9) + "px",
                            opacity: "1",
                            background: "#f9f9f9",
                            color: "#666",
                            "z-index": c.util.getMaxZIndex(),
                            textAlign: "center",
                            "padding-top": "20px",
                            "padding-bottom": "20px",
                            fontFamily: "Arial, sans-serif",
                            fontSize: "10px",
                            display: "none"
                        });
                        return B
                    },
                    getLoadingDiv: function (C) {
                        var B = a.createElement("div");
                        B.id = C || s.widgetContainerId + "-loading";
                        B = c.util.applyCss(B, {
                            fontFamily: "Arial, sans-serif",
                            fontSize: "10px",
                            color: "#666",
                            textDecoration: "none",
                            position: "absolute",
                            textAlign: "center"
                        });
                        return B
                    },
                    getLightBoxBaseDiv: function () {
                        var B = a.createElement("div");
                        c.util.applyCss(B, {
                            display: "block",
                            margin: "0",
                            padding: "0",
                            "z-index": c.util.getMaxZIndex(),
                            position: "absolute",
                            overflow: "hidden",
                            top: "0",
                            left: "0",
                            height: a.body.scrollHeight + "px",
                            width: "100%",
                            "background-color": "rgba(0, 0, 0, .85)"
                        });
                        B.id = s.widgetContainerId + "-base";
                        return B
                    },
                    getLightBoxContainerDiv: function () {
                        var C = a.createElement("div");
                        c.util.applyCss(C, {
                            display: "block",
                            top: "0",
                            left: "0",
                            width: "100%",
                            height: c.util.getWindowHeight() + "px",
                            position: "absolute",
                            outline: "none !important",
                            "-webkit-backface-visibility": "hidden",
                            margin: "0",
                            padding: "0",
                            "z-index": c.util.getMaxZIndex(),
                            "-webkit-overflow-scrolling": "touch"
                        });
                        C.setAttribute("tabIndex", -1);
                        C.id = s.widgetContainerId + "-light-box-container";
                        var B = a.createElement("div");
                        c.util.applyCss(B, {
                            display: "block",
                            "text-align": "center",
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            left: "0",
                            top: "0",
                            outline: "none !important",
                            "-webkit-box-sizing": "border-box",
                            "-moz-box-sizing": "border-box",
                            "box-sizing": "border-box",
                            padding: "0 8px",
                            margin: "0",
                            "overflow-y": "auto",
                            "overflow-x": "hidden"
                        });
                        B.id = s.widgetContainerId + "-light-box-content";
                        C.appendChild(B);
                        return C
                    },
                    render: function (B) {
                        return c.withELog(function () {
                            return (new function () {
                                c.feedback.clear();
                                var O = this;
                                O.cbid = 1;
                                z[z.length] = O;
                                O.abort = function () {
                                    y.abortInstance(this)
                                };
                                O._feedbackOptions = {
                                    launchType: f["webengage.feedback.launchType"] || "",
                                    externalLinkId: f["webengage.feedback.externalLinkId"] || "",
                                    alignment: f["webengage.feedback.alignment"] || "",
                                    borderColor: f["webengage.feedback.borderColor"] || "",
                                    backgroundColor: f["webengage.feedback.backgroundColor"] || "",
                                    snapshotEnabled: f["webengage.feedback.snapshotEnabled"] || "",
                                    defaultCategory: f["webengage.feedback.defaultCategory"] || "",
                                    showAllCategories: (typeof f["webengage.feedback.showAllCategories"] === "boolean" && !f["webengage.feedback.showAllCategories"]) ? false : true,
                                    showForm: f["webengage.feedback.showForm"] || false,
                                    isDemoMode: f["webengage.feedback.isDemoMode"] || f["webengage.isDemoMode"] || false,
                                    customData: f["webengage.feedback.customData"] || f["webengage.customData"] || {},
                                    formData: f["webengage.feedback.formData"] || f["webengage.formData"] || [],
                                    enableCallbacks: f["webengage.feedback.enableCallbacks"] || f["webengage.enableCallbacks"] || false
                                };
                                if (B !== e && B.data !== e && B.data) {
                                    var ad = B.data;
                                    if (ad.name !== e && ad.name) {
                                        O._feedbackOptions.formData.push({
                                            name: "name",
                                            value: ad.name
                                        })
                                    }
                                    if (ad.email !== e && ad.email) {
                                        O._feedbackOptions.formData.push({
                                            name: "email",
                                            value: ad.email
                                        })
                                    }
                                    if (ad.category !== e && ad.category) {
                                        O._feedbackOptions.formData.push({
                                            name: "category",
                                            value: ad.category
                                        })
                                    }
                                }
                                var G = {
                                    feedbackLaunchType: "launchType",
                                    feedbackExternalLinkId: "externalLinkId",
                                    feedbackButtonAlignment: "alignment",
                                    feedbackButtonBorderColor: "borderColor",
                                    feedbackButtonBackgroundColor: "backgroundColor",
                                    defaultFeedbackCategory: "defaultCategory",
                                    showAllFeedbackCategories: "showAllCategories",
                                    showFeedbackForm: "showForm",
                                    data: "customData",
                                    demo: "isDemoMode"
                                };
                                if (B !== e && !y.isEmptyObject(B)) {
                                    for (var C in B) {
                                        var aa = G[C];
                                        if (aa !== e && aa) {
                                            B[aa] = B[C];
                                            delete B[C]
                                        }
                                    }
                                }
                                O._feedbackOptions = y.copy(O._feedbackOptions, (B ? B : {}), true);
                                O.enableCallbacks = (typeof O._feedbackOptions.enableCallbacks === "boolean" ? O._feedbackOptions.enableCallbacks : false);
                                y.copy(O, A, true);
                                O.onLoad((O._feedbackOptions.onLoad || f["webengage.feedback.onLoad"]));
                                O.onSubmit((O._feedbackOptions.onSubmit || f["webengage.feedback.onSubmit"]));
                                O.onClose((O._feedbackOptions.onClose || f["webengage.feedback.onClose"]));
                                O.onOpen((O._feedbackOptions.onOpen || f["webengage.feedback.onOpen"]));
                                y.attachEventListners("feedback", O);
                                if (u.feedback && (u.feedback.isEnabled || O._feedbackOptions.isDemoMode) && (a.location.protocol == "http:" || (a.location.protocol == "https:" && u.sslEnabled)) && !u.isFQuotaOver) {
                                    var P = u.feedback.config,
                                        W = {
                                            alignment: ["right", "left"],
                                            launchTypes: ["feedbackButton", "externalLink"],
                                            containerCss: {
                                                margin: 0,
                                                padding: 0,
                                                position: (c.BrowserDetect.is_this_the_worlds_most_annoying_browser() ? "absolute" : "fixed"),
                                                border: "5px solid #ccc",
                                                backgroundColor: "#f9f9f9",
                                                borderWidth: "1px",
                                                borderStyle: "solid"
                                            },
                                            containerRightCss: {
                                                right: "0px",
                                                borderRightWidth: "0px"
                                            },
                                            containerLeftCss: {
                                                left: "0px",
                                                borderLeftWidth: "0px"
                                            },
                                            commonCss: {
                                                margin: 0,
                                                padding: 0,
                                                cursor: "pointer",
                                                backgroundColor: "transparent",
                                                backgroundRepeat: "no-repeat",
                                                backgroundPosition: "center 0",
                                                display: "block",
                                                paddingBottom: "7px",
                                                paddingLeft: "3px",
                                                paddingRight: "3px",
                                                paddingTop: "7px"
                                            },
                                            tabCssWithIcon: {
                                                backgroundPosition: "center bottom",
                                                paddingBottom: "33px"
                                            },
                                            closeCommonCss: {
                                                height: "22px",
                                                width: "22px",
                                                cursor: "pointer",
                                                backgroundRepeat: "no-repeat",
                                                backgroundPosition: "0 0",
                                                position: "absolute",
                                                top: "-14px",
                                                backgroundImage: "url('" + s.baseStaticUrl + "/images/icons/feedback-widget-close.png')",
                                                backgroundColor: "transparent",
                                                display: "none"
                                            },
                                            leftCloseCss: {
                                                right: "-14px"
                                            },
                                            rightCloseCss: {
                                                left: "-14px"
                                            },
                                            feedbackBgImageForDarkBackground: s.baseStaticUrl + "/images/webengage/icons/feedback-tab-bg-dark.png",
                                            feedbackBgImageForLightBackground: s.baseStaticUrl + "/images/webengage/icons/feedback-tab-bg-light.png",
                                            feedbackTextImage: s.feedbackImageBaseUrl + P.imgPath,
                                            sizeCss: {
                                                height: P.imgHeight + "px",
                                                width: P.imgWidth + "px"
                                            },
                                            leftCss: {
                                                cssFloat: "right",
                                                styleFloat: "right"
                                            },
                                            rightCss: {
                                                cssFloat: "left",
                                                styleFloat: "left"
                                            },
                                            loadingCss: {
                                                fontFamily: "Arial, sans-serif",
                                                fontSize: "10px",
                                                color: "#666",
                                                textDecoration: "none",
                                                position: "absolute",
                                                textAlign: "center"
                                            },
                                            maxWidth: "450px",
                                            maxHeight: (c.BrowserDetect.ie() ? "349px" : "345px")
                                        },
                                        Y = {
                                            getButtonCssBasedOnConfig: function (af, ag) {
                                                var ae = {};
                                                ae = y.copy(ae, W.sizeCss);
                                                if (af == "left") {
                                                    ae = y.copy(ae, W.leftCss)
                                                } else {
                                                    ae = y.copy(ae, W.rightCss)
                                                } if (ag) {
                                                    ae = y.copy(ae, W.tabCssWithIcon)
                                                }
                                                return ae
                                            },
                                            getContainerCssBasedOnConfig: function (af) {
                                                var ae = {};
                                                ae = y.copy(ae, W.containerCss);
                                                if (af == "right") {
                                                    ae = y.copy(ae, W.containerRightCss)
                                                } else {
                                                    ae = y.copy(ae, W.containerLeftCss)
                                                }
                                                return ae
                                            },
                                            getCloseCssBasedOnConfig: function (af) {
                                                var ae = {};
                                                if (af == "right") {
                                                    ae = y.copy(ae, W.rightCloseCss)
                                                } else {
                                                    ae = y.copy(ae, W.leftCloseCss)
                                                }
                                                return ae
                                            },
                                            getButtonCssBasedOnBackgroundColor: function (af) {
                                                var ae = {};
                                                if (y.isColorTooLight(af)) {
                                                    ae = y.copy(ae, {
                                                        backgroundImage: ("url('" + W.feedbackBgImageForLightBackground + "')")
                                                    })
                                                } else {
                                                    ae = y.copy(ae, {
                                                        backgroundImage: ("url('" + W.feedbackBgImageForDarkBackground + "')")
                                                    })
                                                }
                                                return ae
                                            },
                                            getCustomTextImageCss: function () {
                                                var ae = {};
                                                ae = y.copy(ae, {
                                                    backgroundImage: ("url('" + W.feedbackTextImage + "')")
                                                });
                                                return ae
                                            }
                                        },
                                        V = (P.closeImg === e || P.closeImg === null || P.closeImg === "") ? (s.baseStaticUrl + "/images/icons/feedback-widget-close.png") : ("//s3-ap-southeast-1.amazonaws.com/" + P.closeImg),
                                        U = y.getInitParamValue(O._feedbackOptions, "alignment", P.alignment, W.alignment),
                                        I = y.getInitParamValueAsArray(O._feedbackOptions, "launchType", P.launchType, W.launchTypes),
                                        H = y.getInitParamValueAsArray(O._feedbackOptions, "externalLinkId", P.externalLinkId),
                                        M = y.getInitParamValue(O._feedbackOptions, "backgroundColor", P.backgroundColor),
                                        ab = y.getInitParamValue(O._feedbackOptions, "borderColor", P.borderColor),
                                        X = y.getInitParamValue(O._feedbackOptions, "snapshotEnabled", ((P.snapshotEnabled === e) ? true : P.snapshotEnabled)),
                                        Z = y.inArray(I, W.launchTypes[0]),
                                        Q = P.imgWidth,
                                        K = P.imgHeight,
                                        N = P.showWeIcon;
                                    M = M.indexOf("#") === 0 ? M : ("#" + M);
                                    ab = ab.indexOf("#") === 0 ? ab : ("#" + ab);
                                    var S = a.createElement("div");
                                    s.widgetContainer.appendChild(S);
                                    S.setAttribute("id", s.widgetContainerId + "-content");
                                    var ac = S.style;
                                    S = y.applyCss(S, W.containerCss);
                                    S = y.applyCss(S, Y.getContainerCssBasedOnConfig(U));
                                    S.style.width = (parseInt(Q) + 3 + 3) + "px";
                                    var E = (parseInt(K) + 7 + 7 + (N ? (3 + 26) : 0)) + "px";
                                    ac.borderColor = ab;
                                    ac.top = (("innerHeight" in d ? d.innerHeight : a.documentElement.clientHeight) - parseInt(K)) / 2 + "px";
                                    ac.zIndex = (y.getMaxZIndex() + 1);
                                    var L = a.createElement("div");
                                    S.appendChild(L);
                                    L.id = s.widgetContainerId + "-close-div";
                                    L = y.applyCss(L, W.closeCommonCss);
                                    L = y.applyCss(L, Y.getCloseCssBasedOnConfig(U));
                                    L.style.backgroundImage = "url('" + V + "')";
                                    if (c.BrowserDetect.is_this_the_worlds_most_annoying_browser()) {
                                        L.style.backgroundImage = "";
                                        L.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop src='" + V + "')"
                                    }
                                    var T = a.createElement("div");
                                    S.appendChild(T);
                                    T.setAttribute("id", s.widgetContainerId + "-content-expand-collapse");
                                    var R = T.style;
                                    T = y.applyCss(T, W.commonCss);
                                    T = y.applyCss(T, Y.getButtonCssBasedOnConfig(U, N));
                                    T = y.applyCss(T, Y.getButtonCssBasedOnBackgroundColor(M));
                                    if (c.BrowserDetect.is_this_the_worlds_most_annoying_browser()) {
                                        R.backgroundImage = "";
                                        var D = (y.isColorTooLight(M) ? W.feedbackBgImageForLightBackground : W.feedbackBgImageForDarkBackground);
                                        R.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop src='" + D + "')"
                                    }
                                    R.backgroundColor = M;
                                    R.zIndex = y.getMaxZIndex() + 1;
                                    if (!Z) {
                                        S.style.display = "none"
                                    }
                                    var J = a.createElement("div");
                                    T.appendChild(J);
                                    J.style.width = parseInt(Q) + "px";
                                    J.style.height = parseInt(K) + "px";
                                    J.style.margin = "0px";
                                    J.style.padding = "0px";
                                    J = y.applyCss(J, Y.getCustomTextImageCss());
                                    if (c.BrowserDetect.is_this_the_worlds_most_annoying_browser()) {
                                        J.style.backgroundImage = "";
                                        R.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop src='" + W.feedbackTextImage + "')"
                                    }
                                    L.style.zIndex = y.getMaxZIndex() + 1;
                                    O.close = function () {
                                        try {
                                            S.removeChild(a.getElementById(s.widgetContainerId + "-loading"))
                                        } catch (ae) {}
                                        try {
                                            S.removeChild(a.getElementById(s.widgetContainerId + "-content"))
                                        } catch (ae) {}
                                        try {
                                            a.getElementById(s.widgetContainerId + "-content-expand-collapse").isCurrentlyOpen = false
                                        } catch (ae) {}
                                        L.style.display = "none";
                                        S.style.width = (parseInt(Q) + 3 + 3) + "px";
                                        if (!Z) {
                                            T.style.display = "none"
                                        }
                                    };
                                    L.onclick = function () {
                                        c.withELog(function () {
                                            O.close()
                                        })
                                    };

                                    function F() {
                                        if (P.mobileLB && (c.BrowserDetect.isMobile() || y.isSmallScreen())) {
                                            S.style.display = "block";
                                            var ah = c.feedback.getLightBoxBaseDiv();
                                            s.weDataContainer.appendChild(ah);
                                            var ag = c.feedback.getLightBoxContainerDiv();
                                            s.weDataContainer.appendChild(ag);
                                            var af = c.feedback.getMobileLoadingDiv();
                                            af.innerHTML = "Loading<br/>please wait ...";
                                            s.weDataContainer.appendChild(af);
                                            var ai = c.util.getElementHeight(af);
                                            var aj = c.util.getWindowHeight();
                                            af.style.top = (aj - ai) / 2 + "px";
                                            af.style.display = "block"
                                        } else {
                                            S.style.display = "block";
                                            S.style.width = "300px";
                                            var af = c.feedback.getLoadingDiv();
                                            af = y.applyCss(af, W.loadingCss);
                                            af.innerHTML = "Loading<br/>please wait ...";
                                            S.appendChild(af);
                                            y.alignCenter(af, S, U);
                                            L.style.display = "block"
                                        }
                                        O.feedbackLoadStartTime = new Date();
                                        var ae = s.widgetDomain + (c.BrowserDetect.is_this_the_worlds_most_annoying_browser() ? s.loadFeedbackWidgetUrlv3 : s.loadFeedbackWidgetUrl);
                                        c.feedbackLoadStartTime = new Date();
                                        y.withWeJquery(function () {
                                            var ak = a.createElement("script");
                                            ak.type = "text/javascript";
                                            ak.src = ae;
                                            s.widgetContainer.appendChild(ak)
                                        })
                                    }
                                    T.onclick = function () {
                                        c.withELog(function () {
                                            F()
                                        })
                                    };
                                    if (H && H.length > 0) {
                                        (function () {
                                            for (var af = 0; af < H.length; af++) {
                                                var ag = H[af];
                                                var ae = a.getElementById(ag);
                                                if (ae) {
                                                    ae.onclick = function (ah) {
                                                        var ai = ah || d.event;
                                                        ai.cancelBubble = true;
                                                        if (ai.stopPropagation) {
                                                            ai.stopPropagation()
                                                        }
                                                        if (ai.preventDefault) {
                                                            ai.preventDefault()
                                                        } else {
                                                            ai.returnValue = false
                                                        }
                                                        T.onclick();
                                                        return false
                                                    }
                                                }
                                            }
                                        })()
                                    }
                                    a.$FeedbackWidgetInitializer = {
                                        containerId: s.widgetContainerId,
                                        licenseCode: n,
                                        appHost: s.feedbackAppHost,
                                        minWidth: (parseInt(Q) + 3 + 3) + "px",
                                        maxWidth: W.maxWidth,
                                        minHeight: E,
                                        maxHeight: W.maxHeight,
                                        showFeedbackButton: Z,
                                        buttonAlignment: U,
                                        borderColor: ab.substring(1),
                                        snapshotEnabled: X,
                                        currentInstance: O,
                                        mobileLBEnabled: P.mobileLB && (c.BrowserDetect.isMobile() || y.isSmallScreen())
                                    };
                                    if (O._feedbackOptions.showForm == true) {
                                        T.onclick()
                                    }
                                } else {
                                    if (u.feedback && u.feedback.isEnabled && a.location.protocol == "https:" && !u.sslEnabled) {
                                        c.eLog(null, "error", "Feedback - Widget turned off for SSL encrypted page", "Feedback - Widget turned off for SSL encrypted page")
                                    }
                                }
                            })
                        })
                    },
                    clear: function () {
                        c.withELog(function () {
                            try {
                                s.widgetContainer.removeChild(a.getElementById(s.widgetContainerId + "-content"))
                            } catch (B) {}
                            z = [];
                            a.$FeedbackWidgetInitializer = null
                        })
                    },
                    abort: function () {
                        y.abortAllInstances(z)
                    },
                    attachEventListner: function () {
                        var B = this,
                            C = arguments;
                        c.withELog(function () {
                            y.bind.apply(B, C);
                            if (z.length > 0) {
                                for (var D = 0; D < z.length; D++) {
                                    z[D].enableCallbacks = true;
                                    y.bind.apply(z[D], C)
                                }
                            }
                        })
                    }
                }
            })());
            y.extend("ruleExecutor.constants", {
                SEARCH_ENGINE_REGEXP: {
                    google: {
                        pattern: "^(?:http(s)?://)?(www\\.)?google\\..*/.*$",
                        queryParam: "q"
                    },
                    yahoo: {
                        pattern: "^(?:http(s)?://)?(?:([a-z]{2})\\.)?search\\.yahoo\\.com/.*$",
                        queryParam: "p"
                    },
                    bing: {
                        pattern: "^(?:http(s)?://)?((?:www|[a-z]{2})\\.)?bing\\.com/search\\?.*$",
                        queryParam: "q"
                    },
                    ask: {
                        pattern: "^(?:http(s)?://)?www\\.ask\\.com/.*$",
                        queryParam: "q"
                    },
                    baidu: {
                        pattern: "^(?:http(s)?://)?www\\.baidu\\.com/.*$",
                        queryParam: "wd"
                    },
                    yandex: {
                        pattern: "^(?:http(s)?://)?www\\.yandex\\.com/.*$",
                        queryParam: "text"
                    },
                    duckduckgo: {
                        pattern: "^(?:http(s)?://)?www\\.duckduckgo\\.com/.*$",
                        queryParam: "q"
                    }
                },
                SOCIAL_MEDIA_REGEX: "^(?:http(s)?://)?(.*.)?(facebook|twitter|t|pinterest)\\.(com|co)/.*$",
                XPATH_PLUGIN_FILE: "http://d3701cc9l7v9a6.cloudfront.net/js/jquery/wgxpath.install.js"
            });
            y.extend("ruleExecutor.dependencies", {
                XPATH: function (A, B, z) {
                    c.XPATH.util.loadXPath(B, z)
                },
                GEO: function (A, B, z) {
                    c.GEO.load(B, z)
                }
            });
            y.extend("XPATH.util", (function () {
                return {
                    loadXPath: function (B, A) {
                        if ((c.BrowserDetect.browser() === "Explorer") && (!a.evaluate)) {
                            var z = "http://d3701cc9l7v9a6.cloudfront.net/js/jquery/wgxpath.install.js";
                            y.loadScript.apply(s.widgetContainer, [z,
                                function () {
                                    wgxpath.install();
                                    if (typeof B === "function") {
                                        B()
                                    }
                                },
                                null,
                                function () {
                                    if (typeof A === "function") {
                                        A()
                                    }
                                }
                            ])
                        } else {
                            if (typeof B === "function") {
                                B()
                            }
                        }
                    },
                    isXpathLoaded: function () {
                        return (a.evaluate ? true : false)
                    },
                    getXPathElement: function (B) {
                        var z = null;
                        if (B && B.indexOf("|") > -1) {
                            var A = B.split("|");
                            B = A[0] + "/@" + A[1]
                        }
                        try {
                            xpathResult = a.evaluate(B, a, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
                        } catch (C) {
                            return z
                        }
                        if (!xpathResult) {
                            return z
                        }
                        return xpathResult.singleNodeValue
                    },
                    evaluateXPathQuery: function (A) {
                        var z = c.XPATH.util.getXPathElement(A);
                        if (z) {
                            return z.textContent
                        } else {
                            return null
                        }
                    }
                }
            })());
            y.extend("ruleExecutor.dependency.util", {
                xPathExists: function () {
                    if (c.XPATH.util.isXpathLoaded()) {
                        return true
                    } else {
                        var z = {};
                        z.type = "XPATH";
                        throw z
                    }
                },
                geoDataExists: function () {
                    if (c.GEO.isGeoLoaded()) {
                        return true
                    } else {
                        var z = {};
                        z.type = "GEO";
                        throw z
                    }
                }
            });
            y.extend("ruleExecutor.util", (function (z) {
                return {
                    isMatches: function (C, A) {
                        if (C) {
                            if (C instanceof Array) {
                                for (var D = 0; D < C.length; D++) {
                                    if (c.ruleExecutor.util.isMatches(C[D], A)) {
                                        return true
                                    }
                                }
                            } else {
                                if (A instanceof Array) {
                                    for (var B = 0; B < A.length; B++) {
                                        if (C.match(new RegExp(A[B], "gi"))) {
                                            return true
                                        }
                                    }
                                } else {
                                    if (C.match(new RegExp(A, "gi"))) {
                                        return true
                                    }
                                }
                            }
                        }
                        return false
                    },
                    getCurrentTimeInSec: function (D) {
                        var C = new Date(D);
                        var A = C.getHours();
                        var E = C.getMinutes();
                        var B = C.getSeconds();
                        return (A * 60 * 60 + E * 60 + B)
                    },
                    getClientTime: function () {
                        var A = y.getCurrentTime();
                        return c.ruleExecutor.util.getCurrentTimeInSec(A)
                    },
                    getPublisherTime: function () {
                        var A = y.getCurrentTime(s.publisherTimeZoneOffset);
                        return c.ruleExecutor.util.getCurrentTimeInSec(A)
                    },
                    isContainsSearchTerms: function (C, D) {
                        var B = false;
                        if (typeof C !== "function" || !D || !(D instanceof Array) || D.length <= 0) {
                            return false
                        }
                        var A = C();
                        if (typeof A !== e && A) {
                            for (var E = 0; E < D.length; E++) {
                                B = c.ruleExecutor.util.isContains(A, c.ruleExecutor.util.jsTokenizer(D[E], " "), "contains_all");
                                if (typeof B === "boolean" && B) {
                                    break
                                }
                            }
                        }
                        return B
                    },
                    isContains: function (F, J, B) {
                        var I = F;
                        if (typeof (F) === "function") {
                            I = F()
                        }
                        var H = false;
                        var C = B || "contains_any";
                        if (I !== e && I) {
                            var A = [];
                            if (I instanceof Array) {
                                for (var G = 0; G < I.length; G++) {
                                    A[I[G].toLowerCase()] = true
                                }
                            } else {
                                A[I] = true
                            } if (J !== e && J) {
                                if (J instanceof Array) {
                                    if (C == "contains_all") {
                                        for (var E = 0; E < J.length; E++) {
                                            if (A[J[E].toLowerCase()] == true) {
                                                H = true;
                                                continue
                                            }
                                            H = false;
                                            break
                                        }
                                    } else {
                                        for (var D = 0; D < J.length; D++) {
                                            if (A[J[D].toLowerCase()] == true) {
                                                H = true;
                                                break
                                            }
                                        }
                                    }
                                } else {
                                    H = A[J.toLowerCase()] == true
                                }
                            }
                        }
                        return H
                    },
                    getReferrers: function () {
                        var B = [];
                        if (a.referrer) {
                            B[B.length] = a.referrer.toLowerCase()
                        }
                        var A = y.getSessionCookie();
                        if (A && A.referrer && (!a.referrer || A.referrer != a.referrer)) {
                            B[B.length] = A.referrer.toLowerCase()
                        }
                        return B
                    },
                    getCountry: function () {
                        if (c.ruleExecutor.dependency.util.geoDataExists()) {
                            return y.getSessionCookie().country || null
                        }
                    },
                    getRegion: function () {
                        if (c.ruleExecutor.dependency.util.geoDataExists()) {
                            return y.getSessionCookie().region || null
                        }
                    },
                    getCity: function () {
                        if (c.ruleExecutor.dependency.util.geoDataExists()) {
                            return y.getSessionCookie().city || null
                        }
                    },
                    getSearchEngineMatchResult: function () {
                        var D = c.ruleExecutor.util.getReferrers();
                        var A = {
                            isSER: false
                        };
                        for (var C in z.SEARCH_ENGINE_REGEXP) {
                            for (var B = 0; B < D.length; B++) {
                                if (c.ruleExecutor.util.isMatches(D[B], z.SEARCH_ENGINE_REGEXP[C].pattern) != false) {
                                    A.isSER = true;
                                    A.url = D[B];
                                    A.queryParam = z.SEARCH_ENGINE_REGEXP[C].queryParam;
                                    break
                                }
                            }
                            if (A.isSER === true) {
                                break
                            }
                        }
                        return A
                    },
                    isSearchEngineReference: function () {
                        return (c.ruleExecutor.util.getSearchEngineMatchResult()).isSER
                    },
                    isSocialMediaReference: function () {
                        return c.ruleExecutor.util.isMatches(c.ruleExecutor.util.getReferrers(), z.SOCIAL_MEDIA_REGEX)
                    },
                    isFirstTime: function () {
                        var A = y.getSessionCookie();
                        return (A && (typeof A.isFirstTime === "boolean" && A.isFirstTime)) ? true : false
                    },
                    getSearchTerms: function () {
                        var C = null;
                        var A = c.ruleExecutor.util.getSearchEngineMatchResult();
                        if (A.isSER) {
                            var B = decodeURI(c.ruleExecutor.util.getParamValue(A.url, A.queryParam));
                            if (B) {
                                C = c.ruleExecutor.util.jsTokenizer(B, " ")
                            }
                        }
                        return C
                    },
                    jsTokenizer: function (D, F) {
                        var E = [];
                        if (D !== e && D) {
                            var C = y.escapeForRegExp(",\r\n");
                            if (F !== e && F) {
                                if (F instanceof Array) {
                                    C = y.escapeForRegExp(F.join(""))
                                } else {
                                    C = y.escapeForRegExp(F)
                                }
                            }
                            D = D.replace(new RegExp("[" + C + "]", "g"), "\n");
                            var A = D.split(/\n/g);
                            for (var B = 0; B < A.length; B++) {
                                if (A[B] != "") {
                                    E[E.length] = A[B]
                                }
                            }
                        }
                        return E
                    },
                    getParamValue: function (B, D) {
                        var E = "";
                        var C = new RegExp("[\\?&]" + D + "=([^&#]*)");
                        var A = C.exec(B);
                        if (A !== null) {
                            E = A[1]
                        }
                        return E
                    },
                    getBrowser: function () {
                        return c.BrowserDetect.browser()
                    },
                    getBrowserVersion: function () {
                        return c.BrowserDetect.version()
                    },
                    getOS: function () {
                        return c.BrowserDetect.os()
                    },
                    getDevice: function () {
                        return c.BrowserDetect.device()
                    },
                    escapeForRegExp: function (A) {
                        return y.escapeForRegExp(A)
                    },
                    getTotalPageView: function () {
                        var A = y.getSessionCookie();
                        return (A && A.pvc) ? A.pvc : 1
                    },
                    sampling: function (A) {
                        var B = this.entityId || A;
                        if (B) {
                            var C = y.getWebengageCookie(),
                                D = y.getHashCode(B + C.luid);
                            return Math.abs(D % 100)
                        }
                        return 0
                    },
                    getSessionCookieReferer: function () {
                        var A = y.getSessionCookie();
                        var B = A.referrer;
                        if (!B) {
                            return null
                        }
                        return B
                    },
                    getXpathStringResult: function (A) {
                        if (c.ruleExecutor.dependency.util.xPathExists()) {
                            return c.XPATH.util.evaluateXPathQuery(A)
                        }
                    },
                    getXpathIntegerResult: function (B) {
                        if (c.ruleExecutor.dependency.util.xPathExists()) {
                            var A = c.XPATH.util.evaluateXPathQuery(B);
                            if (A) {
                                return parseFloat(A)
                            } else {
                                return null
                            }
                        }
                    },
                    loadDependency: function (A, C, E, B) {
                        var D = c.ruleExecutor.dependencies[A];
                        if (D && (typeof D === "function")) {
                            D(C, E, B)
                        } else {
                            if (B && typeof B == "function") {
                                B()
                            }
                        }
                    }
                }
            })(c.ruleExecutor.constants));
            y.extend("ruleExecutor", (function (C, B) {
                var z = {};
                var A = function () {
                    z = {
                        referer: C.getReferrers,
                        url: y.getClientPageUrl(),
                        cookie: function (D) {
                            return y.getCookie(D, true)
                        },
                        country: C.getCountry,
                        region: C.getRegion,
                        city: C.getCity,
                        time: "",
                        isFirstTime: C.isFirstTime,
                        isSER: C.isSearchEngineReference,
                        isSMR: C.isSocialMediaReference,
                        searchTerms: C.getSearchTerms,
                        os: C.getOS,
                        device: C.getDevice,
                        browser: C.getBrowser,
                        endUserTime: C.getClientTime,
                        publisherTime: C.getPublisherTime,
                        browser_version: C.getBrowserVersion,
                        totalPageView: C.getTotalPageView,
                        sampling: C.sampling,
                        contentXPathString: C.getXpathStringResult,
                        contentXPathInteger: C.getXpathIntegerResult,
                        contentXPathNode: C.getXpathStringResult,
                        isDirectVisitor: C.getSessionCookieReferer
                    }
                };
                A();
                return {
                    execute: function (E, F, D) {
                        D = y.copy(z, (D ? D : {}), true);
                        D.entityId = E;
                        F = (F !== e) ? F : true;
                        return (new Function("_weUtil", "_ruleUtil", "_constants", "operands", "return (" + F + ");")(y, C, B, D))
                    },
                    loadOperands: function () {
                        A()
                    }
                }
            })(c.ruleExecutor.util, c.ruleExecutor.constants));
            y.extend("survey", (function () {
                var C = [],
                    D = function (N, H) {
                        if (N !== e && N) {
                            var O = this,
                                K = u.survey.config,
                                M = K.theme || "",
                                I = "320px",
                                R = "100%",
                                Q = a.createElement("div");
                            if (O._surveyOptions.width) {
                                var L = parseInt(O._surveyOptions.width, 10);
                                if (!isNaN(L)) {
                                    I = L + "px"
                                }
                            }
                            O.height = R;
                            O.width = I;
                            O.surveyConfigDto = K;
                            O.theme = M;
                            O.surveyEId = N;
                            O._weProperties = s;
                            O.showOnExit = (typeof H === "boolean" ? H : false);
                            var P = O._surveyOptions.scope[N] || O._surveyOptions.scope.all || null;
                            if (P) {
                                O.scope = (P.scope ? P.scope : "");
                                O.scopeType = (P.scopeType ? P.scopeType : "")
                            }
                            s.widgetContainer.appendChild(Q);
                            Q.setAttribute("id", s.widgetContainerId + "-survey-content");
                            a.$SurveyWidgetInitializer = {
                                currentInstance: O,
                                containerId: s.widgetContainerId,
                                licenseCode: n,
                                appHost: s.surveyAppHost,
                                width: parseInt(I, 10)
                            };
                            var J = /*s.widgetDomain + */(c.BrowserDetect.is_this_the_worlds_most_annoying_browser() ? s.loadSurveyWidgetUrlv3 : s.loadSurveyWidgetUrl(O.layoutAttributes.id)); 
                            y.withWeJquery(function () {
                                var S = a.createElement("script");
                                S.type = "text/javascript";
                                S.src = J;
                                s.widgetContainer.appendChild(S)
                            })
                        }
                    },
                    G = {
                        onLoad: function (H) {
                            return this.bind("load", H)
                        },
                        onOpen: function (H) {
                            return this.bind("open", H)
                        },
                        onSubmit: function (H) {
                            return this.bind("submit", H)
                        },
                        onView: function (H) {
                            return this.bind("view", H)
                        },
                        onComplete: function (H) {
                            return this.bind("complete", H)
                        },
                        onClose: function (H) {
                            return this.bind("close", H)
                        },
                        bind: function () {
                            return y.bind.apply(this, arguments)
                        },
                        unbind: function () {
                            return y.unbind.apply(this, arguments)
                        },
                        executeCallbacks: function () {
                            return y.executeCallbacks.apply(this, arguments)
                        }
                    },
                    B = function (K, M, H) {
                        if (K !== e && K) {
                            if (typeof K === "object") {
                                if (K instanceof Array) {
                                    for (var I = 0; I < K.length; I++) {
                                        B(K[I], M, H)
                                    }
                                } else {
                                    var J = K.scope;
                                    if (J) {
                                        var L = K.surveyIds;
                                        if (L !== e && L instanceof Array && L.length > 0) {
                                            for (j = 0; j < L.length; j++) {
                                                H[L[j]] = {
                                                    scope: J,
                                                    scopeType: (K.scopeType || "")
                                                }
                                            }
                                        } else {
                                            H.all = {
                                                scope: J,
                                                scopeType: (K.scopeType || "")
                                            }
                                        }
                                    }
                                }
                            } else {
                                H.all = {
                                    scope: K,
                                    scopeType: (M || "")
                                }
                            }
                        }
                    },
                    z = function (M, H, P) {
                        if (M && M.length > 0) {
                            var af = M[0],
                                T = y.getSessionCookie(),
                                Z = y.getWebengageCookie(),
                                S = y.getInitParamValue(P._surveyOptions, "alignment", u.survey.config.alignment, ["left", "right"]),
                                R = af,
                                W = H[R].ruleCode,
                                X = H[R]["la"],
                                I = H[R].startTimestamp,
                                K = H[R].endTimestamp,
                                L = (typeof H[R].showOnExit === "boolean") ? H[R].showOnExit : false,
                                N = (L ? 0 : (H[R].totalTimeOnSite ? H[R].totalTimeOnSite - ((new Date()).getTime() - (T.sst || 0)) : 0)),
                                ae = (L ? 0 : Math.max(N, H[R].timeSpent)),
                                ab = H[R].maxTimesPerUser,
                                J = P._surveyOptions.scope[R] || P._surveyOptions.scope.all || null,
                                Y = R + (J && J.scope && (J.scopeType + "").toUpperCase() != "GLOBAL" ? "[" + y.escapeScopeChars(J.scope) + "]" : ""),
                                ac = y.escapeForRegExp(Y);
                            if (!P._surveyOptions.isDemoMode) {
                                if (!P._surveyOptions.forcedRender && ((T && T.closedSurveys !== e && (T.closedSurveys.match("##" + ac + "##") || T.closedSurveys.match("##" + ac + "$"))) || (Z && Z.takenSurveys !== e && (Z.takenSurveys.match("##" + ac + "##") || Z.takenSurveys.match("##" + ac + "$"))))) {
                                    M.splice(0, 1);
                                    return z(M, H, P)
                                }
                                var V = c.util.getTotalTimesShown(R, "survey");
                                if (ab !== e) {
                                    if (ab <= V) {
                                        M.splice(0, 1);
                                        return z(M, H, P)
                                    }
                                }
                                var O = {
                                    timeSpent: ae,
                                    showOnExit: L,
                                    maxTimesPerUser: ab,
                                    startTimestamp: I,
                                    endTimestamp: K,
                                    ruleCode: W,
                                    layoutAttributes: X
                                };
                                A(R, O, P, function () {
                                    M.splice(0, 1);
                                    return z(M, H, P)
                                })
                            } else {
                                var O = {
                                    timeSpent: ae,
                                    showOnExit: L,
                                    maxTimesPerUser: ab,
                                    startTimestamp: I,
                                    endTimestamp: K,
                                    ruleCode: W,
                                    layoutAttributes: X
                                };
                                if (!P.surveysToExecuteData) {
                                    P.surveysToExecuteData = {}
                                }
                                P.surveysToExecuteData[R] = O;
                                M.splice(0, 1);
                                return z(M, H, P)
                            }
                        } else {
                            if (P.surveysToExecuteData) {
                                var ad = null;
                                var aa = [];
                                for (var af in P.surveysToExecuteData) {
                                    var U = af;
                                    aa[aa.length] = U;
                                    ad = ((ad == null || ad > P.surveysToExecuteData[U]["timeSpent"]) ? P.surveysToExecuteData[U]["timeSpent"] : ad)
                                }
                                var Q = P.startExecutionTime ? (new Date()).getTime() - P.startExecutionTime : 0;
                                P.totalTimeElapsed = P.totalTimeElapsed + Q;
                                P.minTimespentVal = (ad - Q < 0) ? 0 : ad - Q;
                                return E(aa, P.surveysToExecuteData, P)
                            }
                        }
                    },
                    A = function (H, L, M, P) {
                        try {
                            if (L.startTimestamp || L.endTimestamp) {
                                if (c.ruleExecutor.dependency.util.geoDataExists()) {
                                    var O = y.getSessionCookie(),
                                        N = (new Date()).getTime() + (O.tsD && !isNaN(O.tsD) ? parseInt(O.tsD, 10) : 0),
                                        K = L.startTimestamp,
                                        I = L.endTimestamp;
                                    if (I < N || N < K) {
                                        return P()
                                    }
                                }
                            }
                            if ((M._surveyOptions.skipRules) || (!L.ruleCode) || (c.ruleExecutor.execute(H, L.ruleCode, M._surveyOptions.ruleData))) {
                                if (!M.surveysToExecuteData) {
                                    M.surveysToExecuteData = {}
                                }
                                M.surveysToExecuteData[H] = L
                            }
                            return P()
                        } catch (J) {
                            if (J && J.type) {
                                c.ruleExecutor.util.loadDependency(J.type, L, function () {
                                    A(H, L, M, P)
                                }, P)
                            } else {
                                c.eLog(J);
                                P()
                            }
                        }
                    },
                    F = function (K, I, L, H, J) {
                        totlatTimeElapsed = 0;
                        timespent = 0;
                        if (!L) {
                            if (arguments && arguments[0]) {
                                timespent = I || 0
                            }
                            if (parseInt(J._surveyOptions.delay, 10) >= 0) {
                                timespent = parseInt(J._surveyOptions.delay, 10)
                            }
                            totlatTimeElapsed = J.totalTimeElapsed + J.minTimespentVal
                        }
                        c.setTimeout(function () {
                            D.apply(J, [K, L])
                        }, ((timespent - totlatTimeElapsed) < 0 ? 0 : (timespent - totlatTimeElapsed)))
                    },
                    E = function (H, I, J) {
                        c.setTimeout(function () {
                            if (!J._surveyOptions.forcedRender) {
                                var K = [];
                                for (var M = 0; M < H.length; M++) {
                                    if (M > 0) {
                                        K[K.length] = "&"
                                    }
                                    K[K.length] = "surveyIds=" + H[M]
                                }
                                var L = s.findAllTakenSurveysUrl() + "&" + K.join("") + (J._surveyOptions.scope ? "&scope=" + encodeURIComponent(y.stringify(J._surveyOptions.scope)) : "");
                                y.loadScript.apply(s.widgetContainer, [L,
                                    function (P, R, Q) {
                                        var W = [],
                                            S = {};
                                        if (typeof we_notToExecuteSurveyIdsMap != "undefined") {
                                            we_notToExecuteSurveyIdsMap.takenSurveyIds = [];
                                            if (we_notToExecuteSurveyIdsMap.takenSurveyIds !== e && we_notToExecuteSurveyIdsMap.takenSurveyIds.length > 0) {
                                                for (var O = 0; O < we_notToExecuteSurveyIdsMap.takenSurveyIds.length; O++) {
                                                    var X = J._surveyOptions.scope[we_notToExecuteSurveyIdsMap.takenSurveyIds[O]] || J._surveyOptions.scope.all || null;
                                                    var Z = (X && X.scope ? X.scope : "");
                                                    var V = (X && X.scopeType ? X.scopeType : "");
                                                    S[we_notToExecuteSurveyIdsMap.takenSurveyIds[O]] = true;
                                                    y.markSurveyAsTaken((we_notToExecuteSurveyIdsMap.takenSurveyIds[O] + (Z && (V + "").toUpperCase() != "GLOBAL" ? "[" + y.escapeScopeChars(Z) + "]" : "")))
                                                }
                                            }
                                            if (we_notToExecuteSurveyIdsMap.inactiveSurveyIds !== e && we_notToExecuteSurveyIdsMap.inactiveSurveyIds.length > 0) {
                                                for (var U = 0; U < we_notToExecuteSurveyIdsMap.inactiveSurveyIds.length; U++) {
                                                    S[we_notToExecuteSurveyIdsMap.inactiveSurveyIds[U]] = true
                                                }
                                            }
                                        }
                                        for (var Y = 0; Y < R.length; Y++) {
                                            if (!S[R[Y]]) {
                                                W[W.length] = R[Y]
                                            }
                                        }
                                        if (W.length > 0) {
                                            var T = W[0];
                                            J.layoutAttributes = P[T]["layoutAttributes"];
                                            F(T, (P[T]["timeSpent"] || 0), P[T]["showOnExit"], P[T]["maxTimesPerUser"], J)
                                        }
                                    },
                                    [I, H, J.totalTimeElapsed]
                                ])
                            } else {
                                var N = H[0];
                                J.layoutAttributes = I[N]["layoutAttributes"];
                                F(N, (I[N]["timespent"] || 0), I[N]["showOnExit"], I[N]["maxTimesPerUser"], J)
                            }
                        }, J.minTimespentVal)
                    };
                return {
                    cbid: 1,
                    render: function (H) {
                        return c.withELog(function () {
                            return (new function () {
                                c.survey.clear();
                                var L = this;
                                L.cbid = 1;
                                C[C.length] = L;
                                L.abort = function () {
                                    y.abortInstance(this)
                                };
                                var J = {
                                    surveyId: f["webengage.survey.surveyId"] || "",
                                    skipRules: f["webengage.survey.skipRules"] || false,
                                    forcedRender: f["webengage.survey.forcedRender"] || false,
                                    delay: f["webengage.survey.delay"] || -1,
                                    customData: f["webengage.survey.customData"] || f["webengage.customData"] || {},
                                    ruleData: f["webengage.survey.ruleData"] || f["webengage.ruleData"] || {},
                                    isDemoMode: f["webengage.survey.isDemoMode"] || f["webengage.isDemoMode"] || false,
                                    alignment: f["webengage.survey.alignment"] || "",
                                    scope: f["webengage.survey.scope"] || f["webengage.scope"] || "",
                                    scopeType: f["webengage.survey.scopeType"] || f["webengage.scopeType"] || "",
                                    enableCallbacks: f["webengage.survey.enableCallbacks"] || f["webengage.enableCallbacks"] || false,
                                    width: f["webengage.survey.width"]
                                };
                                var R = {
                                    showAllClosedAndTakenSurveys: "forcedRender",
                                    data: "customData",
                                    demo: "isDemoMode"
                                };
                                if (H !== e && !y.isEmptyObject(H)) {
                                    for (var I in H) {
                                        var M = R[I];
                                        if (M !== e && M) {
                                            H[M] = H[I];
                                            delete H[I]
                                        }
                                    }
                                }
                                L._surveyOptions = y.copy(J, (H ? H : {}), true);
                                L._surveyOptions.forcedRender = typeof L._surveyOptions.forcedRender === "boolean" ? L._surveyOptions.forcedRender : false;
                                if (L._surveyOptions.forcedRender) {
                                    L._surveyOptions.scope = (new Date()).getTime();
                                    L._surveyOptions.scopeType = "session"
                                }
                                var K = {};
                                B(L._surveyOptions.scope, L._surveyOptions.scopeType, K);
                                L._surveyOptions.scope = K || "";
                                L.enableCallbacks = (typeof L._surveyOptions.enableCallbacks === "boolean" ? L._surveyOptions.enableCallbacks : false);
                                if (u.survey && (u.survey.isEnabled || L._surveyOptions.isDemoMode) && !y.isEmptyObject(u.survey.ruleMap) && (a.location.protocol == "http:" || (a.location.protocol == "https:" && u.sslEnabled) || true) && !u.isSRQuotaOver) {
                                    y.copy(L, G, true);
                                    L.onLoad((L._surveyOptions.onLoad || f["webengage.survey.onLoad"]));
                                    L.onSubmit((L._surveyOptions.onSubmit || f["webengage.survey.onSubmit"]));
                                    L.onClose((L._surveyOptions.onClose || f["webengage.survey.onClose"]));
                                    L.onOpen((L._surveyOptions.onOpen || f["webengage.survey.onOpen"]));
                                    L.onComplete((L._surveyOptions.onComplete || f["webengage.survey.onComplete"]));
                                    y.attachEventListners("survey", L);
                                    L.totalTimeElapsed = 0;
                                    var N = u.survey.ruleMap,
                                        Q = u.survey.order,
                                        O = L._surveyOptions.surveyId;
                                    if (O && N[O]) {
                                        var P = [];
                                        P[0] = O;
                                        Q = P
                                    }
                                    L.startExecutionTime = (new Date()).getTime();
                                    z(Q, N, L)
                                } else {
                                    if (u.survey && u.survey.isEnabled && a.location.protocol == "https:" && !u.sslEnabled) {
                                        c.eLog(null, "error", "Survey - Widget turned off for SSL encrypted page", "Survey - Widget turned off for SSL encrypted page")
                                    }
                                }
                            })
                        })
                    },
                    clear: function () {
                        c.withELog(function () {
                            try {
                                s.widgetContainer.removeChild(a.getElementById(s.widgetContainerId + "-survey-content"))
                            } catch (H) {}
                            a.$SurveyWidgetInitializer = null;
                            C = []
                        })
                    },
                    abort: function () {
                        y.abortAllInstances(C)
                    },
                    attachEventListner: function () {
                        var H = this,
                            I = arguments;
                        c.withELog(function () {
                            y.bind.apply(H, I);
                            if (C.length > 0) {
                                for (var J = 0; J < C.length; J++) {
                                    C[J].enableCallbacks = true;
                                    y.bind.apply(C[J], I)
                                }
                            }
                        })
                    }
                }
            })());
            y.extend("IFRAMES", (function () {
                var z = [];
                return {
                    create: function (C, E, G) {
                        this.remove(C);
                        var H = G || {};
                        var A;
                        try {
                            A = a.createElement('<iframe name="' + C + '">')
                        } catch (F) {
                            A = a.createElement("iframe");
                            A.name = C
                        }
                        A.id = C;
                        if (c.BrowserDetect.is_this_the_worlds_most_annoying_browser()) {
                            A.src = "javascript:void(0);"
                        }
                        A.frameBorder = H.frameBorder || "0";
                        A.marginHeight = H.marginHeight || "0";
                        A.marginWidth = H.marginWidth || "0";
                        A.allowTransparency = H.allowTransparency || "true";
                        var B = A.style;
                        B.zIndex = (y.getMaxZIndex() + 1);
                        B.position = "absolute";
                        B.backgroundColor = H.backgroundColor || "transparent";
                        B.bottom = H.bottom || "0px";
                        B.right = H.right || "0px";
                        B.border = H.border || "none";
                        B.overflow = H.overflow || "hidden";
                        B.visibility = H.visibility || "hidden";
                        var D = E || s.widgetContainer;
                        D.appendChild(A);
                        z[C] = A;
                        try {
                            A.contentWindow.name
                        } catch (F) {
                            c.eLog(F);
                            A.src = 'javascript:(function () {document.open();document.domain="' + a.domain + '";document.close();})();'
                        }
                        if (typeof (H.onload) === "function") {
                            if (A.attachEvent) {
                                A.attachEvent("onload", H.onload)
                            } else {
                                A.addEventListener("load", H.onload, false)
                            }
                        }
                        return A
                    },
                    get: function (A) {
                        return z[A]
                    },
                    resize: function (B, A, C) {
                        var D = c.IFRAMES.get(B);
                        D.style.height = A + "px"
                    },
                    remove: function (A) {
                        var B = c.IFRAMES.get(A);
                        if (B) {
                            if (B.parentNode) {
                                B.parentNode.removeChild(B)
                            }
                        }
                        if (d.frames[A]) {
                            delete d.frames[A]
                        }
                        delete z[A]
                    },
                    creatCallbackFrame: function (D, B, G, A) {
                        var F = {};
                        if (typeof (A) === "function") {
                            F.onload = function () {
                                c.withELog(function () {
                                    var J = z[D];
                                    if (!J.widgetCallBackStatus || J.widgetCallBackStatus === 0) {
                                        J.widgetCallBackStatus = 1
                                    } else {
                                        if (J.widgetCallBackStatus === 1) {
                                            J.contentWindow.location = "about:blank";
                                            J.widgetCallBackStatus = 2
                                        } else {
                                            if (J.widgetCallBackStatus === 2) {
                                                var K = (new Date()).getTime() + "CB";
                                                if (!c.IFRAMES.CB) {
                                                    c.IFRAMES.CB = {}
                                                }
                                                c.IFRAMES.CB[K] = function (L) {
                                                    setTimeout(function () {
                                                        if (L !== e && L !== "") {
                                                            try {
                                                                var N = y.parseJSON(L);
                                                                if (N !== null) {
                                                                    if (N.eventName !== e) {
                                                                        A(N.eventName, N.data)
                                                                    }
                                                                }
                                                            } catch (M) {
                                                                c.eLog(M)
                                                            }
                                                        }
                                                        J.widgetCallBackStatus = 0;
                                                        c.IFRAMES.remove(D);
                                                        J = c.IFRAMES.creatCallbackFrame(D, B, G, A)
                                                    }, 10)
                                                };
                                                try {
                                                    var H = J.contentWindow.name;
                                                    c.IFRAMES.CB[K](H)
                                                } catch (I) {
                                                    c.eLog(I);
                                                    J.src = "javascript:(function () {document.write('<script>var _data=window.name;document.domain=\"" + a.domain + '";setTimeout(function(){window.parent.webengage.IFRAMES.CB["' + K + "\"](_data);}, 10);<\/script>')})();"
                                                }
                                            }
                                        }
                                    }
                                })
                            }
                        }
                        var E = c.IFRAMES.create(D, B, F);
                        var C = E.style;
                        C.height = 0;
                        C.width = 0;
                        if (G) {
                            E.src = G
                        }
                        return E
                    }
                }
            })());
            y.extend("notification", (function () {
                var E = [],
                    A = function (L, K, J, F) {
                        var N = this;
                        if (L || N._notificationOptions.previewJson !== e) {
                            N.notificationId = N.notificationEId = L;
                            N.showOnExit = F;
                            N.layout = K || (N._notificationOptions.previewJson && N._notificationOptions.previewJson.layout ? N._notificationOptions.previewJson.layout : "");
                            var M = N.executeCallbacks("run", N);
                            if (typeof M === "boolean" && !M) {
                                return
                            }
                            var H = c.IFRAMES.create(s.widgetContainerId + "-notification-frame", s.widgetContainer);
                            H.style.top = "-1000px";
                            H.style.left = "-1000px";
                            var O = y.getSessionCookie();
                            var I = null;
                            if (H.contentDocument) {
                                I = H.contentDocument
                            } else {
                                if (H.contentWindow) {
                                    I = H.contentWindow.document
                                } else {
                                    if (H.document) {
                                        I = H.document
                                    }
                                }
                            }
                            I.open();
                            var G = (N.layout === "" ? "notification-base.css" : N.layout + "-notification-base.css");
                            I.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html><head><meta http-equiv="cache-control" content="max-age=0" /><meta http-equiv="cache-control" content="no-cache" /><meta http-equiv="pragma" content="no-cache" /><meta http-equiv="content-type" content="text/html; charset=utf-8"/><link rel="stylesheet" type="text/css" href="http://d3701cc9l7v9a6.cloudfront.net/css/webengage/notification/' + G + '?v=232.0" media="screen"/><script type="text/javascript">try{window.parent.window.name}catch(e){document.domain="' + a.domain + '";};<\/script><script type="text/javascript" src="http://d3701cc9l7v9a6.cloudfront.net/js/jquery/jquery-1.3.2.min.js"><\/script></head><body class="notification-body"><script type="text/javascript">window.onload = function () { (function(d){ var _script = d.createElement("script"); _script.type = "text/javascript"; _script.src = "' + s.widgetDomain + s.notificationWidgetScriptUrl + '"; d.body.appendChild(_script); })(document);};<\/script></body></html>');
                            I.close();
                            c.setTimeout(function () {
                                if (N._notificationOptions.previewJson !== e) {
                                    I.$NotificationWidgetInitializer = {
                                        currentInstance: N,
                                        notificationVersion: J,
                                        containerId: s.widgetContainerId,
                                        licenseCode: n,
                                        appHost: s.baseWebEngageUrl,
                                        widgetDomain: s.widgetDomain,
                                        previewJson: N._notificationOptions.previewJson
                                    }
                                } else {
                                    I.$NotificationWidgetInitializer = {
                                        currentInstance: N,
                                        notificationVersion: J,
                                        containerId: s.widgetContainerId,
                                        licenseCode: n,
                                        appHost: s.baseWebEngageUrl,
                                        widgetDomain: s.widgetDomain,
                                        browser: c.BrowserDetect.browser(),
                                        browserVersion: c.BrowserDetect.version(),
                                        os: c.BrowserDetect.os(),
                                        country: O.country || "",
                                        city: O.city || "",
                                        region: O.region || "",
                                        pageTitle: a.title,
                                        ip: O.ip,
                                        referrer: a.referrer
                                    }
                                }
                            }, 0)
                        }
                    },
                    D = {
                        onRun: function (F) {
                            return this.bind("run", F)
                        },
                        onLoad: function (F) {
                            return this.bind("load", F)
                        },
                        onOpen: function (F) {
                            return this.bind("open", F)
                        },
                        onClick: function (F) {
                            return this.bind("click", F)
                        },
                        onClose: function (F) {
                            return this.bind("close", F)
                        },
                        bind: function () {
                            return y.bind.apply(this, arguments)
                        },
                        unbind: function () {
                            return y.unbind.apply(this, arguments)
                        },
                        executeCallbacks: function () {
                            return y.executeCallbacks.apply(this, arguments)
                        }
                    },
                    z = function (K, G, M) {
                        if (K && K.length > 0) {
                            var Y = K[0],
                                T = y.getWebengageCookie(),
                                O = y.getSessionCookie(),
                                F = Y,
                                V = G[F].layout,
                                I = (webengage_fs_configurationMap.config.notificationConfig.wl ? "W" : "N") + G[F].version,
                                S = G[F].ruleCode,
                                J = (G[F].totalTimeOnSite ? G[F].totalTimeOnSite - ((new Date()).getTime() - (O.sst || 0)) : 0),
                                X = Math.max(J, G[F].timespent),
                                L = G[F].skipTargetPage,
                                Q = G[F].actionLinks,
                                H = (typeof G[F].showOnExit === "boolean" ? G[F].showOnExit : false),
                                W = G[F].maxTimesPerUser,
                                P = G[F].mobile;
                            if (!M._notificationOptions.isDemoMode) {
                                if (typeof P !== "undefined" && P && !c.BrowserDetect.isMobile()) {
                                    K.splice(0, 1);
                                    return z(K, G, M)
                                }
                                if (!M._notificationOptions.forcedRender && ((O && O.closedNIds !== e && O.closedNIds.indexOf("##" + F) >= 0) || (T && T.takenNIds !== e && T.takenNIds.indexOf("##" + F) >= 0))) {
                                    K.splice(0, 1);
                                    return z(K, G, M)
                                }
                                if (L && Q instanceof Array && Q.length > 0) {
                                    for (var U in Q) {
                                        var N = a.createElement("a");
                                        N.href = Q[U];
                                        Q[U] = "^" + y.escapeForRegExp(N.href) + "$";
                                        N = null
                                    }
                                    if (c.ruleExecutor.util.isMatches(y.getClientPageUrl(), Q)) {
                                        K.splice(0, 1);
                                        return z(K, G, M)
                                    }
                                }
                                var R = c.util.getTotalTimesShown(F, "notification");
                                if (!M._notificationOptions.isDemoMode && W !== e) {
                                    if (W <= R) {
                                        K.splice(0, 1);
                                        return z(K, G, M)
                                    }
                                }
                                G[F]["timeSpent"] = X;
                                C(F, G[F], M, function () {
                                    K.splice(0, 1);
                                    return z(K, G, M)
                                })
                            } else {
                                G[F]["timeSpent"] = X;
                                B(F, G[F], M)
                            }
                        }
                    },
                    C = function (K, F, L, O) {
                        try {
                            if (F.startTimestamp || F.endTimestamp) {
                                if (c.ruleExecutor.dependency.util.geoDataExists()) {
                                    var N = y.getSessionCookie();
                                    var M = (new Date()).getTime() + (N.tsD && !isNaN(N.tsD) ? parseInt(N.tsD, 10) : 0);
                                    var J = F.startTimestamp,
                                        G = F.endTimestamp;
                                    if (G < M || M < J) {
                                        return O()
                                    }
                                }
                            }
                            if ((L._notificationOptions.skipRules) || (!F.ruleCode) || (c.ruleExecutor.execute(K, F.ruleCode, L._notificationOptions.ruleData))) {
                                var H = L.startExecutionTime ? (new Date()).getTime() - L.startExecutionTime : 0;
                                L.totalTimeElapsed = L.totalTimeElapsed + H;
                                return B(K, F, L)
                            } else {
                                return O()
                            }
                        } catch (I) {
                            if (I && I.type) {
                                c.ruleExecutor.util.loadDependency(I.type, F, function () {
                                    C(K, F, L, O)
                                }, O)
                            } else {
                                c.eLog(I);
                                O()
                            }
                        }
                    },
                    B = function (I, G, H) {
                        var F = G.timeSpent || 0;
                        if (parseInt(H._notificationOptions.delay, 10) >= 0) {
                            F = parseInt(H._notificationOptions.delay, 10)
                        }

                        function J() {
                            y.withWeJquery(function () {
                                c.setTimeout(function () {
                                    A.apply(H, [I, G.layout, G.version, G.showOnExit])
                                }, (G.showOnExit ? 0 : ((F - H.totalTimeElapsed) < 0 ? 0 : (F - H.totalTimeElapsed))))
                            })
                        }
                        c.GEO.load(J, J)
                    };
                return {
                    cbid: 1,
                    render: function (F) {
                        return c.withELog(function () {
                            return (new function () {
                                c.notification.clear();
                                var L = this;
                                L.cbid = 1;
                                E[E.length] = L;
                                L.abort = function () {
                                    y.abortInstance(this)
                                };
                                var H = {
                                    notificationId: f["webengage.notification.notificationId"] || "",
                                    skipRules: f["webengage.notification.skipRules"] || false,
                                    delay: f["webengage.notification.delay"] || -1,
                                    isDemoMode: f["webengage.notification.isDemoMode"] || f["webengage.isDemoMode"] || false,
                                    customData: f["webengage.notification.customData"] || f["webengage.customData"] || {},
                                    ruleData: f["webengage.notification.ruleData"] || f["webengage.ruleData"] || {},
                                    tokens: f["webengage.notification.tokens"] || f["webengage.tokens"] || {},
                                    previewJson: f["webengage.notification.previewJson"],
                                    forcedRender: f["webengage.notification.forcedRender"] || false,
                                    enableCallbacks: f["webengage.notification.enableCallbacks"] || f["webengage.enableCallbacks"] || false
                                };
                                var I = {
                                    data: "customData",
                                    demo: "isDemoMode"
                                };
                                if (F !== e && !y.isEmptyObject(F)) {
                                    for (var G in F) {
                                        var M = I[G];
                                        if (M !== e && M) {
                                            F[M] = F[G];
                                            delete F[G]
                                        }
                                    }
                                }
                                L._notificationOptions = y.copy(H, (F ? F : {}), true);
                                L.enableCallbacks = (typeof L._notificationOptions.enableCallbacks === "boolean" ? L._notificationOptions.enableCallbacks : false);
                                y.copy(L, D, true);
                                L.onRun((L._notificationOptions.onRun || f["webengage.notification.onRun"]));
                                L.onLoad((L._notificationOptions.onLoad || f["webengage.notification.onLoad"]));
                                L.onClick((L._notificationOptions.onClick || f["webengage.notification.onClick"]));
                                L.onClose((L._notificationOptions.onClose || f["webengage.notification.onClose"]));
                                L.onOpen((L._notificationOptions.onOpen || f["webengage.notification.onOpen"]));
                                y.attachEventListners("notification", L);
                                if (L._notificationOptions.previewJson !== e) {
                                    y.withWeJquery(function () {
                                        A.apply(L)
                                    })
                                } else {
                                    if (u.notification && (u.notification.isEnabled || L._notificationOptions.isDemoMode) && (a.location.protocol == "http:" || (a.location.protocol == "https:" && u.sslEnabled)) && !u.isNQuotaOver) {
                                        var N = u.notification.order,
                                            J = u.notification.ruleMap;
                                        L.totalTimeElapsed = 0;
                                        var K = L._notificationOptions.notificationId;
                                        if (K && J[K]) {
                                            var O = [];
                                            O[0] = K;
                                            N = O
                                        }
                                        L.startExecutionTime = (new Date()).getTime();
                                        z(N, J, L)
                                    } else {
                                        if (u.notification && u.notification.isEnabled && a.location.protocol == "https:" && !u.sslEnabled) {
                                            c.eLog(null, "error", "Notification - Widget turned off for SSL encrypted page", "Notification - Widget turned off for SSL encrypted page")
                                        }
                                    }
                                }
                            })
                        })
                    },
                    getNotificationFrame: function () {
                        return a.getElementById(s.widgetContainerId + "-notification-frame")
                    },
                    resize: function (H) {
                        var G = a.getElementById(s.widgetContainerId + "-notification-frame");
                        G.height = H.height || G.contentWindow.document.body.scrollHeight;
                        G.width = H.width || G.contentWindow.document.body.scrollWidth;
                        var F = G.style;
                        F.visibility = "visible";
                        F.height = parseInt(H.height || G.contentWindow.document.body.scrollHeight) + "px";
                        F.width = parseInt(H.width || G.contentWindow.document.body.scrollWidth) + "px";
                        F.top = "auto";
                        F.bottom = "0px";
                        F.left = "auto";
                        if ("right" == H.launchType) {
                            F.right = "0px"
                        } else {
                            F.left = "0px"
                        }
                    },
                    clear: function () {
                        var F = this;
                        c.withELog(function () {
                            try {
                                c.IFRAMES.remove(s.widgetContainerId + "-notification-frame")
                            } catch (G) {}
                            E = []
                        })
                    },
                    abort: function () {
                        y.abortAllInstances(E)
                    },
                    attachEventListner: function () {
                        var F = this,
                            G = arguments;
                        c.withELog(function () {
                            y.bind.apply(F, G);
                            if (E.length > 0) {
                                for (var H = 0; H < E.length; H++) {
                                    E[H].enableCallbacks = true;
                                    y.bind.apply(E[H], G)
                                }
                            }
                        })
                    }
                }
            })());
            y.extend("", {
                abort: function () {
                    c.withELog(function () {
                        c.feedback.abort();
                        c.survey.abort();
                        c.notification.abort()
                    })
                }
            });
            y.extend("", {
                init: function (z) {
                    var A = function (B) {
                        if (z[B] !== e && z[B]) {
                            f["webengage." + B] = z[B]
                        }
                    };
                    A("licenseCode");
                    A("language");
                    A("isDemoMode");
                    A("delay");
                    f["webengage.widgetVersion"] = "3.0";
                    if (f["webengage.licenseCode"] !== e && f["webengage.licenseCode"]) {
                        y.onDocReady(h)
                    }
                    return c
                }
            });
            y.extend("", {
                onReady: function (z) {
                    if (z !== e && typeof z === "function") {
                        f["webengage.oldOnReady"] = z
                    }
                }
            });
            y.extend("", {
                render: function (z) {
                    if (z) {
                        if (z.showFeedbackByDefault !== e && !z.showFeedbackByDefault) {
                            f["webengage.feedback.defaultRender"] = false
                        }
                        if (z.showSurveyByDefault !== e && !z.showSurveyByDefault) {
                            f["webengage.survey.defaultRender"] = false
                        }
                        if (z.showNotificationByDefault !== e && !z.showNotificationByDefault) {
                            f["webengage.notification.defaultRender"] = false
                        }
                    }
                    _render()
                }
            });
            var h = function () {
                n = f["webengage.licenseCode"];
                var B = a.createElement("webengagedata");
                a.body.insertBefore(B, null);
                s.weDataContainer = B;
                try {
                    var F = a.createElement("style");
                    var C = a.createTextNode("#webklipper-publisher-widget-container, #webklipper-publisher-widget-container * {overflow:visible; -webkit-box-sizing: content-box; -moz-box-sizing: content-box;  box-sizing: content-box;}");
                    F.type = "text/css";
                    if (F.styleSheet) {
                        F.styleSheet.cssText = C.nodeValue
                    } else {
                        F.appendChild(C)
                    }
                    s.weDataContainer.appendChild(F)
                } catch (E) {}
                var z = a.createElement("div");
                z.setAttribute("id", s.widgetContainerId);
                s.weDataContainer.appendChild(z);
                s.widgetContainer = z;
                var A = y.getWebengageCookie();
                if (!A) {
                    A = y.setWebengageCookie()
                } else {
                    if (!A.luid) {
                        A = y.setWebengageCookie(y.getWebengageCookie())
                    }
                }
                var D = y.getSessionCookie();
                if (!D) {
                    D = y.setSessionCookie()
                } else {
                    if (!D.suid) {
                        D = y.setSessionCookie(y.getSessionCookie())
                    }
                } if (typeof A.isGzip === "undefined" || !A.isGzip) {
                    c.util.loadScript.apply(s.widgetContainer, ["http://z.webengage.com/gz.js",
                        function () {
                            A.isGzip = (typeof f.isGzip != "undefined" && f.isGzip ? true : false);
                            y.setWebengageCookie(A);
                            t(A.isGzip, A.luid, D.suid)
                        }
                    ])
                } else {
                    t(A.isGzip, A.luid, D.suid)
                }
            };
            var t = function (A, B, z) {
                    d.webengage.setTimeout(function () {
                        var D = (A ? "webengage-zfiles" : "webengage-files");
                        var C = "http://s3.amazonaws.com/" + D + "/webengage/" + n + "/v3.js?r=" + Math.floor((new Date()).getTime() / 60000) + "&u=" + B + "|" + z;
                        y.loadScript.apply(s.widgetContainer, [C,
                            function () {
                                var E = c.setInterval(function () {
                                    if (typeof webengage_fs_configurationMap !== "undefined" && webengage_fs_configurationMap.config) {
                                        clearInterval(E);
                                        if (((webengage_fs_configurationMap.sites !== e && webengage_fs_configurationMap.sites) || (webengage_fs_configurationMap.domain !== e && webengage_fs_configurationMap.domain)) && !f["webengage.isDemoMode"]) {
                                            var M = false;
                                            var F = y.getClientPageHost(),
                                                J;
                                            if (F.match(/\:[\d]*$/)) {
                                                J = F.substring(F.indexOf(":") + 1, F.length);
                                                F = F.substring(0, F.indexOf(":"))
                                            }
                                            var S = [];
                                            var N = [];
                                            if (webengage_fs_configurationMap.sites === e || !webengage_fs_configurationMap.sites) {
                                                webengage_fs_configurationMap.sites = {};
                                                webengage_fs_configurationMap.sites[webengage_fs_configurationMap.domain] = "DOMAIN"
                                            }
                                            for (var Q in webengage_fs_configurationMap.sites) {
                                                var O = Q,
                                                    R;
                                                if (webengage_fs_configurationMap.sites[Q] == "DOMAIN") {
                                                    S[S.length] = O;
                                                    if (O.match(/^www\./i)) {
                                                        O = O.substring(4, O.length)
                                                    }
                                                    if (O.match(/\:[\d]*$/)) {
                                                        R = O.substring(O.indexOf(":") + 1, O.length);
                                                        O = O.substring(0, O.indexOf(":"))
                                                    }
                                                    if ((F.match(new RegExp(y.escapeForRegExp(O) + "$", "gi")) && (!R || R == J))) {
                                                        M = true;
                                                        break
                                                    }
                                                } else {
                                                    if (webengage_fs_configurationMap.sites[Q] == "REGEXP") {
                                                        var H = O;
                                                        N[N.length] = O;
                                                        if ((y.getClientPageUrl().match(H))) {
                                                            M = true;
                                                            break
                                                        }
                                                    }
                                                }
                                            }
                                            M = true;
                                            if (!M) {
                                                var L = 'The <a style="color: #00f;" href="http://webengage.com/" target="_blank">WebEngage (Survey, Feedback &amp; Notification)</a> widget on this page is incorrectly configured. It is meant for use only on ';
                                                if (S.length > 0) {
                                                    L += "<b>" + S.join(", ") + "</b>"
                                                }
                                                if (N.length > 0) {
                                                    if (S.length > 0) {
                                                        L += (" and ")
                                                    }
                                                    L += ("pages with URLs that matches following regular expression(s) <b>" + N.join(", ") + "</b>")
                                                }
                                                c.logger.error(L + ".");
                                                return
                                            }
                                        }
                                        s.publisherTimeZoneOffset = webengage_fs_configurationMap.tzo;
                                        var P = y.getSessionCookie(),
                                            G = y.getWebengageCookie();
                                        if (!f["webengage.isDemoMode"] && !P.vtd) {
                                            var I = G.lvt || 0;
                                            y.tsTracking("/v.jpg", ("licenseCode=" + f["webengage.licenseCode"] + "&nvst=" + c.util.isFirstTimeUser() + "&tzo=" + webengage_fs_configurationMap.tzo + "&lvt=" + I));
                                            y.updateSessionCookie({
                                                vtd: 1
                                            });
                                            var K = new Date();
                                            G.lvt = (K.getTime()) + (K.getTimezoneOffset() * 60 * 1000);
                                            y.setWebengageCookie(G)
                                        }
                                        y.copy(u, (function (T) {
                                            return {
                                                configurationMap: T ? T : {}
                                            }
                                        })(webengage_fs_configurationMap));
                                        _executeCustomWidgetCodeAndStartExecution(D)
                                    }
                                }, 1)
                            },
                            null,
                            function () {}
                        ])
                    }, (f["webengage.delay"] && parseInt(f["webengage.delay"]) > 0 ? parseInt(f["webengage.delay"]) : 0))
                },
                g = function (D, z, B, C) {
                    var A = "http://s3.amazonaws.com/" + D + "/webengage/" + n + "/" + z[B] + ".js?r=" + C[B];
                    y.loadScript.apply(s.widgetContainer, [A,
                        function () {
                            if (B == (z.length - 1)) {
                                _ready()
                            } else {
                                g.apply(this, [D, z, (B + 1), C])
                            }
                        }
                    ])
                },
                r = function (E) {
                    var A = f["webengage.customWidgetCode.ruleData"] || f["webengage.ruleData"] || {};
                    customWidgetCodeIdsToExecuteClient = [];
                    customWidgetCodeIdsToExecuteClientTimestamps = [];
                    if (webengage_fs_configurationMap.cwcRuleList) {
                        var C = webengage_fs_configurationMap.cwcRuleList;
                        for (var B = 0; B < C.length; B++) {
                            var D = C[B].ruleCode;
                            if (D) {
                                if (!c.ruleExecutor.execute(C[B].cwcEncId, D, A)) {
                                    continue
                                }
                            }
                            var z = customWidgetCodeIdsToExecuteClient.length;
                            customWidgetCodeIdsToExecuteClient[z] = C[B].cwcEncId;
                            customWidgetCodeIdsToExecuteClientTimestamps[z] = C[B].lastModifiedTimestamp
                        }
                    }
                    if (customWidgetCodeIdsToExecuteClient.length > 0) {
                        g.apply(this, [E, customWidgetCodeIdsToExecuteClient, 0, customWidgetCodeIdsToExecuteClientTimestamps])
                    } else {
                        _ready()
                    }
                },
                m = function (E, z, D) {
                    var C = y.getSessionCookie();
                    if (!C || !C.country) {
                        if ((a.location.protocol == "http:" || (a.location.protocol == "https:" && webengage_fs_configurationMap.sslEnabled))) {
                            c.GEO.load();
                            if (z) {
                                var B = 0;
                                var A = setInterval(function () {
                                    var F = y.getSessionCookie();
                                    if (F && F.country || B >= 5000) {
                                        clearInterval(A);
                                        E.apply(this, [D])
                                    }
                                    B += 200
                                }, 200)
                            } else {
                                E.apply(this, [D])
                            }
                        } else {
                            if (a.location.protocol == "https:" && !u.sslEnabled) {
                                c.eLog(null, "error", "Widget turned off for SSL encrypted page", "CustomWidgetCode - Widget turned off for SSL encrypted page")
                            }
                        }
                    } else {
                        y.updateSessionCookieOnWidgetLoad(webengage_fs_configurationMap.domain);
                        E.apply(this, [D])
                    }
                };
            _executeCustomWidgetCodeAndStartExecution = function (z) {
                if ((a.location.protocol == "http:" || (a.location.protocol == "https:" && webengage_fs_configurationMap.sslEnabled)) || true) {
                    y.updateSessionCookieOnWidgetLoad(webengage_fs_configurationMap.domain);
                    if (webengage_fs_configurationMap.cwcRuleList && webengage_fs_configurationMap.cwcRuleList.length > 0) {
                        r(z)
                    } else {
                        _ready()
                    }
                } else {
                    if (a.location.protocol == "https:" && !u.sslEnabled) {
                        c.eLog(null, "error", "Widget turned off for SSL encrypted page", "CustomWidgetCode - Widget turned off for SSL encrypted page")
                    }
                }
            }, _ready = function () {
                (function (A) {
                    y.extend("widgetConfiguration", {});
                    if (A && A.config) {
                        y.copy(u, {
                            feedback: {
                                isEnabled: (typeof A.config.enableFeedback == "boolean" && A.config.enableFeedback),
                                config: A.config.feedbackConfig ? A.config.feedbackConfig : {}
                            }
                        }, true);
                        y.copy(u, {
                            survey: {
                                isEnabled: (typeof A.config.enableSurvey == "boolean" && A.config.enableSurvey),
                                config: A.config.surveyConfig ? A.config.surveyConfig : {},
                                order: [],
                                ruleMap: {}
                            }
                        }, true);
                        (function (D) {
                            if (A.surveyRuleList) {
                                var B = A.surveyRuleList;
                                for (var C = 0; C < B.length; C++) {
                                    D.order[C] = B[C].surveyEncId;
                                    D.ruleMap[B[C].surveyEncId] = B[C]
                                }
                            }
                        })(u.survey);
                        y.copy(u, {
                            notification: {
                                isEnabled: (typeof A.config.enableNotification == "boolean" && A.config.enableNotification),
                                order: [],
                                ruleMap: {}
                            }
                        }, true);
                        (function (C) {
                            if (A.notificationRuleList) {
                                var D = A.notificationRuleList;
                                for (var B = 0; B < D.length; B++) {
                                    C.order[B] = D[B].notificationEncId;
                                    C.ruleMap[D[B].notificationEncId] = {
                                        ruleCode: D[B].ruleCode,
                                        timespent: parseInt(D[B].timeSpent) != "NaN" ? parseInt(D[B].timeSpent) : 0,
                                        totalTimeOnSite: parseInt(D[B].totalTimeOnSite) != "NaN" ? parseInt(D[B].totalTimeOnSite) : 0,
                                        actionLinks: D[B].actionLinks || [],
                                        skipTargetPage: typeof (D[B].skipTargetPage) == "boolean" ? D[B].skipTargetPage : false,
                                        maxTimesPerUser: D[B].maxTimesPerUser,
                                        startTimestamp: D[B].startTimestamp,
                                        endTimestamp: D[B].endTimestamp,
                                        layout: D[B].layout,
                                        version: ((typeof D[B].v != "undefined") ? D[B].v : 0),
                                        showOnExit: D[B].showOnExit,
                                        mobile: D[B].mobile
                                    }
                                }
                            }
                        })(u.notification);
                        y.copy(u, {
                            sslEnabled: (A.sslEnabled ? A.sslEnabled : false),
                            isSRQuotaOver: (A.isSRQ ? A.isSRQ : false),
                            isNQuotaOver: (A.isNQ ? A.isNQ : false),
                            isFQuotaOver: (A.isFQ ? A.isFQ : false)
                        }, true);
                        y.uwats(A.lastWidgetCheckDate)
                    }

                    function z() {
                        if (f["webengage.oldOnReady"] !== e && typeof f["webengage.oldOnReady"] === "function") {
                            f["webengage.oldOnReady"].apply(this)
                        } else {
                            if (f["webengage.onReady"] !== e && typeof f["webengage.onReady"] === "function") {
                                f["webengage.onReady"].apply(this);
                                _render()
                            } else {
                                _render()
                            }
                        } if (c.BrowserDetect.ie() && c.BrowserDetect.version() < 11) {
                            d.attachEvent("onbeforeunload", function () {
                                c.withELog(function () {
                                    y.setWebengageCookie(y.getWebengageCookie());
                                    y.updateSessionCookie(y.getSessionCookie())
                                })
                            })
                        }
                    }
                    if (A && A.goals !== e && A.goals instanceof Array) {
                        y.loadScript.apply(s.widgetContainer, [s.csUrl,
                            function () {
                                if (typeof f["webengage.conversion.start"] === "function") {
                                    f["webengage.conversion.start"](A)
                                }
                            }
                        ])
                    }
                    if (A && A.GAEnabled) {
                        if (typeof _gaq === "undefined" && (typeof ga === "undefined" || typeof ga !== "function")) {
                            c.eLog(f["webengage.licenseCode"], "error", "_gaq/ga undefined - not loading ga-callback-helper", "_gaq/ga undefined");
                            z()
                        } else {
                            y.loadScript.apply(s.widgetContainer, [s.gaCallbacksScriptUrl, z, null, z])
                        }
                    } else {
                        z()
                    }
                })(u.configurationMap)
            }, _render = function () {
                var z = function (B) {
                    var A = typeof f["webengage." + B + ".defaultRender"] === "boolean" ? f["webengage." + B + ".defaultRender"] : f["webengage.defaultRender"];
                    return (typeof A === "boolean" ? A : true)
                };
                if (z("feedback")) {
                    setTimeout(function () {
                        c.feedback.render()
                    }, 1)
                }
                if (z("survey")) {
                    setTimeout(function () {
                        c.survey.render()
                    }, 1)
                }
                if (z("notification")) {
                    setTimeout(function () {
                        c.notification.render()
                    }, 1)
                }
            };
            if (d.webengageWidgetInit !== e && typeof d.webengageWidgetInit === "function") {
                d.webengageWidgetInit()
            } else {
                var q = a.getElementsByTagName("webengage")[0];
                if (q && q.attributes) {
                    var o = q.attributes;
                    f["webengage.licenseCode"] = o.license.value;
                    f["webengage.language"] = (o.language ? o.language.value : "");
                    if (o.feedbackButtonAlignment) {
                        f["webengage.feedback.alignment"] = o.feedbackButtonAlignment.value
                    }
                    if (o.feedbackExternalLinkId) {
                        f["webengage.feedback.externalLinkId"] = o.feedbackExternalLinkId.value
                    }
                }
                if (f["webengage.licenseCode"] !== e && f["webengage.licenseCode"]) {
                    y.onDocReady(h)
                }
            } if (location.search.indexOf("libraryScript") > -1 || sessionStorage.getItem("webengage-library") == "true") {
                var v = new RegExp("[\\?&]libraryScript=([^&#]*)");
                var p = v.exec(location.search);
                var k;
                if (p != null) {
                    k = decodeURIComponent(p[1]);
                    sessionStorage.setItem("webengage-library-script", k)
                } else {
                    if (sessionStorage.getItem("webengage-library-script")) {
                        k = sessionStorage.getItem("webengage-library-script")
                    }
                } if (k) {
                    c.util.loadScript.apply(s.widgetContainer, ["http://d3701cc9l7v9a6.cloudfront.net/js/library/" + k + ".js",
                        function () {
                            c.feedback.abort();
                            c.survey.abort();
                            c.notification.abort();
                            sessionStorage.setItem("webengage-library", true)
                        }
                    ])
                }
            }
        };
        if (navigator.appName == "Microsoft Internet Explorer") {
            if (a.body && (a.body.readyState == "loaded" || a.body.readyState == "complete")) {
                b()
            } else {
                if (d.addEventListener) {
                    d.addEventListener("load", function () {
                        b()
                    }, false)
                } else {
                    if (d.attachEvent) {
                        d.attachEvent("onload", function () {
                            b()
                        })
                    }
                }
            }
        } else {
            b()
        }
        c.getUser = function () {
            var g = c.util.getSessionCookie();
            return {
                pageUrl: d.location.href,
                pageTitle: a.title,
                referrer: (a.referrer || ""),
                browser: c.BrowserDetect.browser(),
                browserVersion: c.BrowserDetect.version(),
                platform: c.BrowserDetect.os(),
                ip: (g ? g.ip : ""),
                city: (g ? g.city : ""),
                country: (g ? g.country : "")
            }
        }
    })(window, document, _weq, webengage)
}, 10);