$window = window;
$SurveyWidgetInitializer = document.$SurveyWidgetInitializer;

$weJQuery.alignLayout = function (l, m, j) {
    var k = l.alignment;
    k = (k ? (k === "BOTTOM_RIGHT" ? "right" : "left") : "left");
    var e = j.theme,
        g = j._weProperties,
        n = j.height,
        c = j.width;
    var f = m.style;
    if ("right" == k) {
        f.right = "0px"
    } else {
        f.left = "10px"
    }
    f.height = n;
    f.width = c;
    f.zIndex = (webengage.util.getMaxZIndex() + 1);
    f.position = (webengage.BrowserDetect.is_this_the_worlds_most_annoying_browser() ? "absolute" : "fixed");
    f.backgroundColor = "transparent";
    f.bottom = "0px";
    f.display = "block";
    var o;
    var b;
    if (e == "dark" || e == "light") {
        o = g.baseStaticUrl + "/images/webengage/icons/mini-survey-close-" + e + ".png";
        b = g.baseStaticUrl + "/images/webengage/icons/mini-survey-expand-collapse-" + e + ".png"
    } else {
        o = g.baseStaticUrl + "/images/webengage/icons/mini-survey-close-light.png";
        b = g.baseStaticUrl + "/images/webengage/icons/mini-survey-expand-collapse-light.png"
    }
    var h = document.createElement("div");
    h.id = g.widgetContainerId + "-survey-close-div";
    h.innerHTML = "&nbsp;";
    m.appendChild(h);
    var d = h.style;
    d.zIndex = webengage.util.getMaxZIndex() + 1;
    d.position = "absolute";
    d.right = "30px";
    d.bottom = "5px";
    d.height = "16px";
    d.width = "16px";
    d.cursor = "pointer";
    d.backgroundImage = "url('" + o + "')";
    d.backgroundRepeat = "no-repeat";
    d.backgroundPosition = "0 0";
    d.backgroundColor = "transparent";
    if (webengage.BrowserDetect.is_this_the_worlds_most_annoying_browser()) {
        d.backgroundImage = "";
        d.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop src='" + o + "')"
    }
    $weJQuery.resizeIframe = function (p, q) {
        f.height = (p + 20) + "px"
    };
    var a = document.createElement("div");
    a.id = g.widgetContainerId + "-survey-minimize-div";
    a.innerHTML = "&nbsp;";
    m.appendChild(a);
    var i = a.style;
    i.zIndex = webengage.util.getMaxZIndex() + 1;
    i.position = "absolute";
    i.right = "50px";
    i.bottom = "5px";
    i.height = "16px";
    i.width = "16px";
    i.cursor = "pointer";
    i.backgroundImage = "url('" + b + "')";
    i.backgroundRepeat = "no-repeat";
    i.backgroundPosition = "0 0";
    i.backgroundColor = "transparent";
    if (webengage.BrowserDetect.is_this_the_worlds_most_annoying_browser()) {
        i.backgroundImage = "";
        i.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop src='" + b + "')"
    }
};
webengage.setTimeout(function () {
    (function (b, a, c) {
        c.fixFlashBleed = function () {
            try {
                c("object:not(:has(wmode))").each(function () {
                    try {
                        c(this).attr("wmode", "transparent");
                        c(this).prepend('<param name="wmode" value="transparent">');
                        c(this).children("embed").attr("wmode", "transparent")
                    } catch (f) {}
                })
            } catch (d) {}
        };
        c.loadSurveyForm = function () {
            var u = $SurveyWidgetInitializer.containerId,
                p = $SurveyWidgetInitializer.licenseCode,
                F = $SurveyWidgetInitializer.appHost,
                j = $SurveyWidgetInitializer.width,
                e = $SurveyWidgetInitializer.currentInstance,
                A = e.layoutAttributes,
                r = e.surveyEId,
                s = e.theme,
                B = (typeof e.showOnExit === "boolean" ? e.showOnExit : false),
                n = e._surveyOptions.customData || {},
                k = (typeof (e._surveyOptions.forcedRender) == "boolean" ? e._surveyOptions.forcedRender : false),
                z = (typeof (e._surveyOptions.isDemoMode) == "boolean" ? e._surveyOptions.isDemoMode : false),
                v = (e.scope !== undefined && e.scope ? e.scope : ""),
                E = (e.scopeType !== undefined && e.scopeType ? e.scopeType : ""),
                d = (typeof (e._surveyOptions.enableCallbacks) == "boolean" ? e._surveyOptions.enableCallbacks : false),
                g = a.getElementById(u + "-survey-content"),
                i = b.location.href,
                q = a.title,
                w = e.cssUrl,
                o = {
                    surveyId: r,
                    licenseCode: p,
                    activity: webengage.getUser(),
                    type: "survey"
                };
            if (!z) {
                var m = webengage.util.getTotalTimesShown(r, "survey")
            }
            g.style.zIndex = webengage.util.getMaxZIndex() + 1;
            g.style.display = "block";
            c.fixFlashBleed();
            var G = false;
            var y = "we-survey-callback-frame";
            var l = "//" + F + "/widget/callback.htm?v=2";
            var H = function (J, K) {
                if (typeof K.height !== "undefined") {
                    c.resizeIframe(K.height, K.width)
                }
                if (typeof (K.response) === "object") {
                    webengage.util.copy(o, K.response)
                }
                switch (J) {
                case "submit":
                case "complete":
                    if (r && !k && !z) {
                        webengage.util.markSurveyAsTaken(r)
                    }
                    e.executeCallbacks(J, o);
                    break;
                case "close":
                    e.close(true);
                    break;
                case "open":
                    if (!G) {
                        G = true;
                        webengage.util.markEntityAsShown(r, "survey");
                        if (!B) {
                            e.executeCallbacks("open", o)
                        } else {
                            g.style.display = "none"
                        }
                    }
                    break;
                default:
                    break
                }
            };
            webengage.survey.callbackWrapper = function (J) {
                webengage.withELog(function () {
                    var K = webengage.util.parseJSON(J);
                    if (_weq["webengage.licenseCode"] == "~10a5cc197") {
                        webengage.eLog(null, "debug", J, "cpt-survey-" + K.eventName)
                    }
                    H(K.eventName, K.data)
                })
            };
            var t;
            if (typeof b.postMessage !== "undefined") {
                t = webengage.IFRAMES.create(y, g);
                t.style.display = "none";
                webengage.setTimeout(function () {
                    var J = null;
                    if (t.contentDocument) {
                        J = t.contentDocument
                    } else {
                        if (t.contentWindow) {
                            J = t.contentWindow.document
                        } else {
                            if (t.document) {
                                J = t.document
                            }
                        }
                    }
                    J.open();
                    F = 'survey.webengage.com';
                    J.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html><head><meta http-equiv="cache-control" content="max-age=0" /><meta http-equiv="cache-control" content="no-cache" /><meta http-equiv="pragma" content="no-cache" /><meta http-equiv="content-type" content="text/html; charset=utf-8"><script type="text/javascript">try{window.parent.window.name}catch(e){document.domain="' + a.domain + '";}; setTimeout(function(){if (window.attachEvent) {window.attachEvent( "onmessage", function (e) { if(e.origin !== "' + b.location.protocol + "//" + F + '"){ return; } window.parent.window.webengage.survey.callbackWrapper(e.data);},false);} else {window.addEventListener( "message", function (e) { if(e.origin !== "' + b.location.protocol + "//" + F + '"){ return; } window.parent.window.webengage.survey.callbackWrapper(e.data);},false);}},10);<\/script></head><body></body></html>');
                    J.close()
                }, 10)
            } else {
                widgetCallBackFrame = webengage.IFRAMES.creatCallbackFrame(y, g, l, H)
            }
            c.alignLayout(A, g, e);
            
            var C = c(webengage.IFRAMES.create(u + "-survey-frame", g));
            C.css({
                height: "100%",
                width: "100%",
                position: "relative",
                display: "none",
                bottom: "0px",
                visibility: "visible",
                left: "0px"
            });
            var I =
                //"//" + F + "//" +
                "." +
                "/mini-survey.html?action=edit&surveyEId=" + r + "&licenseCode=" + p + "&events=open&widgetVersion=" + webengage.util.getVersion() + (v ? "&scope=" + v : "") + (E ? "&scopeType=" + E : "") + "&width=" + j + "&pageUrl=" + encodeURIComponent(i) + (w !== undefined && w ? "&cssUrl=" + encodeURIComponent(w) : "") + "&theme=" + encodeURIComponent(s) + "&pageTitle=" + encodeURIComponent(q) + "&timesShown=" + m + "&enableCallbacks=" + d + "&defaultTracking=" + !B + "&r=" + Math.random();
            var f = {};
            if (n) {
                f = webengage.util.copy({}, n)
            }
            I += "&clientDataString=" + encodeURIComponent(webengage.util.clientDataString(f));
            if (z) {
                I += "&demo=" + z
            }
            C.attr("src", I);
            C.css("opacity", 0);
            var h = a.getElementById(u + "-survey-close-div"),
                x = a.getElementById(u + "-survey-minimize-div");
            var D = false;
            C.load(function () {
                webengage.withELog(function () {
                    function J() {
                        C.animate({
                            opacity: 1
                        }, "slow");
                        if (h) {
                            c(h).show();
                            h.style.zIndex = webengage.util.getMaxZIndex() + 2
                        }
                        if (x) {
                            c(x).show();
                            x.style.zIndex = webengage.util.getMaxZIndex() + 2
                        }
                        if (!D) {
                            D = true
                        }
                    }
                    if (!D) {
                        e.executeCallbacks("load", o)
                    }
                    if (B) {
                        if (!webengage.BrowserDetect.isMobile()) {
                            var L = {
                                x: 0,
                                y: 0
                            };
                            var K = c("body").get(0);
                            c(K).bind("mouseleave.webengage_exit_survey", function (O) {
                                O = O ? O : b.event;
                                var N = O.relatedTarget || O.toElement;
                                var M = c(b).height() / 5;
                                if ((!N || N.nodeName == "HTML") && O.clientY <= 0 && (L.y <= 0 || L.y < M)) {
                                    c(K).unbind("mouseleave.webengage_exit_survey").unbind("mousemove.webengage_exit_survey");
                                    g.style.width = j;
                                    g.style.display = "block";
                                    J();
                                    c.ajax({
                                        url: "//" + F + "/track/survey.html?action=track",
                                        dataType: "jsonp",
                                        data: {
                                            surveyEId: r,
                                            act: "view",
                                            licenseCode: p
                                        }
                                    });
                                    e.executeCallbacks("open", o)
                                }
                            }).bind("mousemove.webengage_exit_survey", function (M) {
                                L.x = M.clientX;
                                L.y = M.clientY
                            })
                        }
                    } else {
                        J()
                    }
                })
            });
            C.get(0).style.display = "block";
            e.close = function (J) {
                webengage.IFRAMES.remove(y);
                webengage.IFRAMES.remove(u + "-survey-frame");
                var K = a.getElementById(u + "-film");
                if (g) {
                    c(g).remove()
                }
                if (K) {
                    c(K).remove()
                }
                c(h).parent().remove();
                if (typeof J === "boolean" && J) {
                    if (r && !k && !z) {
                        webengage.util.markSurveyAsClosed(r + (v && (!E || (E + "").toUpperCase() != "GLOBAL" ? "[" + webengage.util.escapeScopeChars(v) + "]" : "")))
                    }
                    this.executeCallbacks("close", o)
                }
            };
            if (h) {
                h.onclick = function () {
                    webengage.withELog(function () {
                        e.close(true);
                        return false
                    })
                }
            }
            if (x) {
                x.onclick = function () {
                    webengage.withELog(function () {
                        if (c(g).attr("isMinimized")) {
                            c(g).css({
                                height: parseInt(c.data(g, "actualHeight")),
                                width: parseInt(c.data(g, "actualWidth")),
                                right: 0,
                                opacity: 1,
                                backgroundColor: "transparent",
                                borderTopLeftRadius: "0",
                                borderTopRightRadius: "0",
                                MozBorderRadiusTopleft: "0",
                                MozBorderRadiusTopright: "0",
                                WebkitBorderTopLeftRadius: "0",
                                WebkitBorderTopRightRadius: "0"
                            });
                            c(x).css("backgroundPosition", "0 0");
                            c(h).css("right", parseInt(c(h).css("right")) + 25);
                            c(x).css("right", parseInt(c(x).css("right")) + 25);
                            c(g).unbind("mouseenter").unbind("mouseleave");
                            c(g).removeAttr("isMinimized");
                            c(C).show()
                        } else {
                            c.data(g, "actualHeight", c(g).height());
                            c.data(g, "actualWidth", c(g).width());
                            c(g).css({
                                height: 32,
                                width: 48,
                                right: 10,
                                opacity: 0.5,
                                backgroundColor: "#333",
                                borderTopLeftRadius: "5px",
                                borderTopRightRadius: "5px",
                                MozBorderRadiusTopleft: "5px",
                                MozBorderRadiusTopright: "5px",
                                WebkitBorderTopLeftRadius: "5px",
                                WebkitBorderTopRightRadius: "5px"
                            });
                            c(C).hide();
                            c(x).css("backgroundPosition", "0 -16px");
                            c(h).css("right", parseInt(c(h).css("right")) - 25);
                            c(x).css("right", parseInt(c(x).css("right")) - 25);
                            c(g).mouseenter(function () {
                                c(this).css("opacity", 1)
                            }).mouseleave(function () {
                                c(this).css("opacity", 0.5)
                            });
                            c(g).attr("isMinimized", true)
                        }
                    })
                }
            }
        };
        c.loadSurveyForm()
    }($window, $window.document, $weJQuery))
}, 10);
