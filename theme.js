/*! For license information please see theme.js.LICENSE.txt */
"use strict";
(self.webpackChunkunseen = self.webpackChunkunseen || []).push([[155], {
    3715: function(e, t, s) {
        s(3948),
        s(1637);
        var i = s(9477);
        var o = {
            html: document.documentElement,
            body: document.body,
            window: {
                w: window.innerWidth,
                h: window.innerHeight,
                fullHeight: window.innerHeight,
                dpr: window.devicePixelRatio
            },
            mouse: {
                x: 0,
                y: 0,
                gl: new i.FM8,
                glNormalized: new i.FM8,
                glScreenSpace: new i.FM8,
                smooth: {
                    glNormalized: new i.FM8
                }
            },
            mq: {
                xs: window.matchMedia("(max-width: 415px)"),
                sm: window.matchMedia("(min-width: 768px)"),
                md: window.matchMedia("(min-width: 1024px)"),
                lg: window.matchMedia("(min-width: 1366px)"),
                xlg: window.matchMedia("(min-width: 1921px)")
            },
            urlParams: new URLSearchParams(window.location.search),
            isTouch: !1,
            isIOS: ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend"in document,
            projectToProjectTransition: !1,
            currentProjectMenuId: 0,
            projectLightMode: !1,
            ASScroll: null,
            AssetLoader: null,
            TaskScheduler: null,
            Dom2Webgl: null,
            Gl: null,
            HomeContact: null,
            ProjectMenu: null,
            World: null,
            Audio: null,
            audioMuted: !1,
            debug: new URLSearchParams(window.location.search).has("debug")
        };
        var n = new (s(1613).Z)
          , r = s(1296)
          , a = s.n(r)
          , l = s(990);
        class h {
            constructor() {
                n.bindAll(this, ["addTouchEvents", "onPointerMove", "onPointerUp", "onPointerDown", "onRaf"]),
                o.events = {
                    RAF: "GRAF",
                    MOUSEMOVE: "GMouseMove",
                    MOUSEDRAG: "GMouseDrag",
                    MOUSEDOWN: "GMouseDown",
                    MOUSEUP: "GMouseUp",
                    RESIZE: "GResize",
                    TOUCHDETECTED: "TouchDetected",
                    WHEEL: "GWheel"
                },
                this.mousePos = {
                    x: 0,
                    y: 0
                },
                this.prevMousePos = {
                    x: 0,
                    y: 0
                },
                "ontouchstart"in document.documentElement && (o.isTouch = !0,
                o.body.classList.add("is-touch"),
                this.detectMouse()),
                o.isTouch ? this.addTouchEvents() : this.addMouseEvents(),
                this.onResize(),
                l.ZP.ticker.add(this.onRaf)
            }
            onRaf(e) {
                o.Gui && o.Gui.fps.begin(),
                n.emit(o.events.RAF, e),
                o.Gui && o.Gui.fps.end()
            }
            onResize() {
                document.documentElement.style.setProperty("--screen-height", `${window.innerHeight}px`),
                document.documentElement.style.setProperty("--vh", .01 * o.window.h + "px"),
                o.window.fullHeight = document.querySelector(".height-div").clientHeight,
                window.addEventListener("resize", a()((()=>{
                    document.documentElement.style.setProperty("--vh", .01 * o.window.h + "px"),
                    o.isTouch && o.window.w === window.innerWidth || (o.window.w = window.innerWidth,
                    o.window.h = window.innerHeight,
                    o.window.fullHeight = document.querySelector(".height-div").clientHeight,
                    o.ASScroll.resize({
                        width: o.window.w,
                        height: o.window.h
                    }),
                    n.emit(o.events.RESIZE))
                }
                ), 150))
            }
            addMouseEvents() {
                window.addEventListener("mousemove", this.onPointerMove, {
                    passive: !0
                }),
                window.addEventListener("mousedown", this.onPointerDown),
                window.addEventListener("mouseup", this.onPointerUp),
                window.addEventListener("dragend", this.onPointerUp),
                window.addEventListener("contextmenu", this.onPointerUp)
            }
            addTouchEvents() {
                window.addEventListener("touchmove", this.onPointerMove),
                window.addEventListener("touchstart", this.onPointerDown),
                window.addEventListener("touchend", this.onPointerUp)
            }
            onPointerMove(e) {
                this.mousePos = {
                    x: e.changedTouches ? e.changedTouches[0].clientX : e.clientX,
                    y: e.changedTouches ? e.changedTouches[0].clientY : e.clientY
                },
                o.mouse.x = this.mousePos.x,
                o.mouse.y = this.mousePos.y,
                o.mouse.gl.set(this.mousePos.x - o.window.w / 2, -this.mousePos.y + o.window.h / 2),
                o.mouse.glNormalized.set(this.mousePos.x / o.window.w * 2 - 1, -this.mousePos.y / o.window.h * 2 + 1),
                o.mouse.glScreenSpace.set(this.mousePos.x / o.window.w, 1 - this.mousePos.y / o.window.h),
                n.emit(o.events.MOUSEMOVE, {
                    mousePos: this.mousePos,
                    event: e
                }),
                this.dragging && (n.emit(o.events.MOUSEDRAG, {
                    ox: this.origMousePos.x,
                    px: this.prevMousePos.x,
                    x: this.mousePos.x,
                    oy: this.origMousePos.y,
                    py: this.prevMousePos.y,
                    y: this.mousePos.y,
                    event: e
                }),
                this.prevMousePos = {
                    x: this.mousePos.x,
                    y: this.mousePos.y
                })
            }
            onPointerDown(e) {
                o.Gui && o.Gui.element.contains(e.target) || (this.mousePos = this.origMousePos = this.prevMousePos = {
                    x: e.changedTouches ? e.changedTouches[0].clientX : e.clientX,
                    y: e.changedTouches ? e.changedTouches[0].clientY : e.clientY
                },
                o.mouse.x = this.mousePos.x,
                o.mouse.y = this.mousePos.y,
                o.mouse.gl.set(this.mousePos.x - o.window.w / 2, -this.mousePos.y + o.window.h / 2),
                o.mouse.glNormalized.set(this.mousePos.x / o.window.w * 2 - 1, -this.mousePos.y / o.window.h * 2 + 1),
                o.mouse.glScreenSpace.set(this.mousePos.x / o.window.w, 1 - this.mousePos.y / o.window.h),
                n.emit(o.events.MOUSEDOWN, {
                    mousePos: this.mousePos,
                    event: e
                }),
                this.dragging = !0)
            }
            onPointerUp(e) {
                o.Gui && o.Gui.element.contains(e.target) || (n.emit(o.events.MOUSEUP, {
                    event: e
                }),
                this.dragging = !1)
            }
            detectMouse() {
                window.addEventListener("mousemove", (function(e) {
                    (Math.abs(e.movementX) > 0 || Math.abs(e.movementY) > 0) && (o.isTouch = !1,
                    o.body.classList.remove("is-touch"),
                    n.emit(o.events.TOUCHMOUSE))
                }
                ))
            }
        }
        var c = s(1219)
          , d = s(4212)
          , u = s.n(d);
        class m {
            constructor() {
                var e, t, s;
                s = e=>{
                    let t = 0;
                    const s = this.callbacks.length;
                    for (; t < s; t++)
                        this.callbacks[t].cb(e)
                }
                ,
                (t = "fire")in (e = this) ? Object.defineProperty(e, t, {
                    value: s,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = s,
                this.callbacks = [],
                n.on(o.events.RAF, this.fire)
            }
            add(e, t) {
                this.callbacks.push({
                    index: t,
                    cb: e
                }),
                this.callbacks.sort(this.sort)
            }
            remove(e) {
                for (let t = 0; t < this.callbacks.length; t++)
                    this.callbacks[t].cb === e && this.callbacks.splice(t, 1)
            }
            sort(e, t) {
                return e.index > t.index ? 1 : -1
            }
        }
        function p(e, t=document) {
            const s = t.querySelectorAll(e);
            return Array.prototype.slice.call(s)
        }
        function g(e, t=document) {
            return t.querySelector(e)
        }
        class f {
            constructor(e, t) {
                var s, i, o;
                if (o = [],
                (i = "components")in (s = this) ? Object.defineProperty(s, i, {
                    value: o,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : s[i] = o,
                this.Component = e,
                this.parentEl = t || document.body,
                void 0 === e.selector)
                    throw new Error(`The component "${e.name}" does not implement the selector property, or it is nto available statically`);
                const n = p(e.selector, this.parentEl);
                for (let e = 0; e < n.length; e++)
                    this.components.push(new this.Component(n[e]))
            }
            make(e) {
                this.components.push(new this.Component(e))
            }
            forEach(e) {
                for (let t = 0; t < this.components.length; t++)
                    e(this.components[t])
            }
            callAll(e, ...t) {
                for (let s = 0; s < this.components.length; s++)
                    this.components[s][e](...t)
            }
            destroy() {
                this.callAll("destroy")
            }
        }
        var v = s(5317)
          , x = s(5500);
        class y {
            static get selector() {
                return ".js-btn:not(.js-manager-ignore)"
            }
            constructor(e) {
                n.bindAll(this),
                this.dom = {
                    el: e,
                    btnInner: e.querySelector(".js-btn-inner"),
                    btnContent: e.querySelector(".js-btn-content"),
                    btnContentCloned: e.querySelector(".js-btn-content-cloned"),
                    btnIcon: e.querySelector(".js-btn-icon")
                },
                this.btnWidth = e.clientWidth,
                this.btnHeight = e.clientHeight,
                this.svgSettings = {
                    width: "100%",
                    height: "100%",
                    strokeWidth: 2,
                    rx: "1.3em",
                    ry: "3em"
                },
                this.buttonType = e.dataset.btn,
                this.togglecontent = e.dataset.togglecontent,
                this.build(),
                this.addEvents()
            }
            build() {
                this.buildSvgCanvas(),
                "border" === this.buttonType && this.buildBtnBorder(),
                "fill" === this.buttonType && this.buildBtnBg(),
                this.buildBtnFill(),
                this.cloneContent("cloned"),
                this.buildAnimateContentTl(),
                "border" === this.buttonType && (this.buildRevealBorder(),
                this.buildMaskSections(),
                this.buildRevealBorderTl()),
                "none" !== this.togglecontent && "border" === this.buttonType && (this.buildselectableBtn(),
                this.dom.el === document.querySelector(".js-btn-selected") && (o.contentToggle.activeButton = this,
                this.setActiveButton()))
            }
            addEvents() {
                n.on("mouseenter", this.dom.el, this.mouseEvents),
                n.on("mouseleave", this.dom.el, this.mouseEvents),
                "none" === this.togglecontent || "fill" === this.buttonType || this.dom.el.href && !this.dom.el.getAttribute("href").startsWith("#") || n.on("click", this.dom.el, this.click)
            }
            buildSvgCanvas() {
                this.canvas = (0,
                x.Wj)().addTo(this.dom.el).size(this.btnWidth, this.btnHeight)
            }
            buildBtnBorder() {
                this.btnBorder = this.canvas.rect(this.svgSettings.width, this.svgSettings.height).attr({
                    fill: "none",
                    stroke: "#000",
                    class: "btn__border btn__rect",
                    x: 1,
                    y: 1
                }).stroke({
                    width: this.svgSettings.strokeWidth
                }).radius(this.svgSettings.rx, this.svgSettings.ry)
            }
            buildBtnBg() {
                this.buildBtnBg = this.canvas.rect(this.svgSettings.width, this.svgSettings.height).attr({
                    fill: "none",
                    stroke: "#000",
                    class: "btn__bg btn__rect",
                    x: 1,
                    y: 1
                }).stroke({
                    width: this.svgSettings.strokeWidth
                }).radius(this.svgSettings.rx, this.svgSettings.ry)
            }
            buildBtnFill() {
                const e = this.canvas.rect(this.svgSettings.width, this.svgSettings.height).attr({
                    fill: "#000",
                    stroke: "#000",
                    class: "btn__fill btn__rect",
                    x: 1,
                    y: 1
                }).stroke({
                    width: this.svgSettings.strokeWidth
                }).radius(this.svgSettings.rx, this.svgSettings.ry)
                  , t = this.canvas.rect(this.svgSettings.width, this.svgSettings.height).attr({
                    fill: "#000"
                })
                  , s = this.canvas.rect(this.svgSettings.width, this.svgSettings.height).attr({
                    fill: "#fff",
                    stroke: "#fff",
                    class: "btn__fill-mask js-btn-fill"
                }).stroke({
                    width: this.svgSettings.strokeWidth
                })
                  , i = this.canvas.mask().add(t).add(s);
                if (e.maskWith(i),
                "fill" === this.buttonType) {
                    const e = t.clone().attr({
                        fill: "#fff"
                    })
                      , i = s.clone().attr({
                        fill: "#000",
                        stroke: "#000"
                    })
                      , o = this.canvas.mask().add(e).add(i);
                    this.buildBtnBg.maskWith(o)
                }
                l.ZP.set(this.dom.el.querySelectorAll(".js-btn-fill"), {
                    yPercent: 120
                }, "<")
            }
            cloneContent(e) {
                const t = this.dom.btnContent.cloneNode(!0);
                this.dom.btnInner.append(t),
                t.classList.add("btn__content--" + e, "js-btn-content-" + e),
                t.classList.remove("js-btn-" + e);
                const s = t.querySelector(".btn__icon");
                t.querySelector(".btn__text").classList.add("btn__text--" + e),
                s && s.classList.add("btn__icon--" + e)
            }
            buildAnimateContentTl() {
                this.contentTimeline = l.ZP.timeline({
                    paused: !0,
                    defaults: {
                        ease: "expo.inOut",
                        duration: .6
                    }
                }).to(this.dom.el.querySelector(".js-btn-content"), {
                    y: "250%"
                }, "<").to(this.dom.el.querySelector(".js-btn-content-cloned"), {
                    y: 0,
                    duration: .8
                }, "<"),
                this.dom.el.querySelector(".js-btn-icon") && this.contentTimeline.to(this.dom.el.querySelector(".js-btn-icon"), {
                    x: "200%"
                }, "<").to(this.dom.el.querySelector(".js-btn-content-cloned .btn__icon"), {
                    x: 0,
                    duration: .8
                }, "<"),
                "fill" === this.buttonType && this.contentTimeline.to(this.dom.el.querySelectorAll(".js-btn-fill"), {
                    yPercent: 0
                }, "<"),
                this.contentTimeline.call((()=>{
                    this.contentTimeline.reversed() || o.Audio.play({
                        key: "audio.hover"
                    })
                }
                ), [], .1)
            }
            buildRevealBorder() {
                this.borderSections = {
                    borderRight: "",
                    borderBottom: "",
                    borderLeft: ""
                },
                this.btnBorderHover = this.canvas.rect(this.svgSettings.width, this.svgSettings.height).attr({
                    fill: "none",
                    stroke: "#000",
                    class: "btn__border--hover btn__rect",
                    x: 1,
                    y: 1
                }).stroke({
                    width: this.svgSettings.strokeWidth
                }).radius(this.svgSettings.rx, this.svgSettings.ry)
            }
            buildMaskSections() {
                const e = this.canvas.rect(this.svgSettings.width, this.svgSettings.height).attr({
                    fill: "#fff"
                })
                  , t = this.canvas.rect("0%", "0%").attr({
                    x: "50%",
                    y: "-6px",
                    fill: "#000",
                    class: "btn__clip-right js-right-reveal"
                })
                  , s = this.canvas.rect("0%", "25%").attr({
                    y: "84%",
                    fill: "#000",
                    class: "btn__clip-bottom js-bottom-reveal"
                })
                  , i = this.canvas.rect("15%", "0%").attr({
                    x: "0",
                    y: "10%",
                    fill: "#000",
                    class: "btn__clip-left js-left-reveal"
                })
                  , o = this.canvas.mask().add(e).add(t).add(s).add(i);
                this.btnBorder.maskWith(o);
                const n = e.clone().attr({
                    fill: "#000"
                })
                  , r = t.clone().attr({
                    fill: "#fff"
                })
                  , a = s.clone().attr({
                    fill: "#fff"
                })
                  , l = i.clone().attr({
                    fill: "#fff"
                })
                  , h = this.canvas.mask().add(n).add(r).add(a).add(l);
                this.btnBorderHover.maskWith(h)
            }
            buildRevealBorderTl() {
                this.borderTimeline = l.ZP.timeline({
                    paused: !0,
                    defaults: {
                        duration: .1
                    }
                }).set(this.dom.el.querySelectorAll(".js-right-reveal"), {
                    height: "18%"
                }).to(this.dom.el.querySelectorAll(".js-right-reveal"), {
                    width: "50%",
                    ease: "expo.in",
                    duration: .25
                }).to(this.dom.el.querySelectorAll(".js-right-reveal"), {
                    height: "100%",
                    ease: "none",
                    duration: .12
                }).to(this.dom.el.querySelectorAll(".js-bottom-reveal"), {
                    width: "100%",
                    ease: "none",
                    duration: .12
                }, "-=0.01").to(this.dom.el.querySelectorAll(".js-left-reveal"), {
                    height: "100%",
                    ease: "none"
                }).to(this.dom.el.querySelectorAll(".js-left-reveal"), {
                    width: "51%",
                    ease: "expo.out",
                    duration: .25
                })
            }
            buildselectableBtn() {
                this.cloneContent("select"),
                this.selectTimeline = l.ZP.timeline({
                    paused: !0,
                    defaults: {
                        ease: "expo.inOut",
                        duration: .6
                    }
                }).to(this.dom.el.querySelector(".js-btn-content-cloned"), {
                    y: "250%",
                    onComplete: ()=>{
                        l.ZP.set(this.dom.el.querySelector(".js-btn-content-cloned"), {
                            y: "-120%",
                            opacity: 0
                        })
                    }
                    ,
                    onReverseComplete: ()=>{
                        l.ZP.set(this.dom.el.querySelector(".js-btn-content-cloned"), {
                            y: "-120%",
                            opacity: 1
                        })
                    }
                }, "<").to(this.dom.el.querySelector(".js-btn-content-select"), {
                    y: 0,
                    duration: .8
                }, "<"),
                this.dom.btnIcon && this.selectTimeline.to(this.dom.el.querySelector(".js-btn-content-cloned .btn__icon"), {
                    x: "200%"
                }, "<").to(this.dom.el.querySelector(".js-btn-content-select .btn__icon"), {
                    x: 0,
                    duration: .8
                }, "<"),
                this.selectTimeline.to(this.dom.el.querySelectorAll(".js-btn-fill"), {
                    yPercent: 0
                }, "<")
            }
            mouseEvents(e) {
                o.contentToggle && e.target === o.contentToggle.activeButton.dom.el || ("mouseenter" === e.type ? (this.contentTimeline.play(),
                "border" === this.buttonType && this.borderTimeline.play()) : "mouseleave" === e.type && (this.contentTimeline.reverse(),
                "border" === this.buttonType && this.borderTimeline.reverse()))
            }
            click(e) {
                e.preventDefault(),
                o.contentToggle.sectionTl[0].isActive() || o.contentToggle.sectionTl[1].isActive() || this.setActiveButton(e)
            }
            setActiveButton(e) {
                if (!e)
                    return setTimeout((()=>{
                        this.contentTimeline.progress(1),
                        this.borderTimeline.progress(1),
                        this.selectTimeline.progress(1)
                    }
                    ), 1),
                    void o.contentToggle.updateContent(e);
                o.contentToggle.activeButton && this.dom.el !== o.contentToggle.activeButton.dom.el && (this.borderTimeline.play(),
                this.selectTimeline.play(),
                this.contentTimeline.play(),
                o.contentToggle.activeButton.borderTimeline.reverse(),
                o.contentToggle.activeButton.selectTimeline.reverse(),
                o.contentToggle.activeButton.contentTimeline.reverse()),
                o.contentToggle && (o.contentToggle.activeButton = this,
                o.contentToggle.updateContent(e))
            }
            destroy() {
                this.canvas.clear(),
                n.off("mouseenter", this.dom.el, this.mouseEvents),
                n.off("mouseleave", this.dom.el, this.mouseEvents),
                n.off("click", this.dom.el, this.click)
            }
        }
        function P(e, t, s) {
            return t in e ? Object.defineProperty(e, t, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = s,
            e
        }
        class w {
            constructor() {
                P(this, "onAssetsProgress", (({percent: e})=>{
                    this.percent !== e && (this.percent = e,
                    l.ZP.set(this.dom.progress, {
                        y: 100 - this.percent + "%"
                    }),
                    l.ZP.set(this.dom.progressInner, {
                        y: -(100 - this.percent) + "%"
                    }))
                }
                )),
                P(this, "onAssetsLoaded", (()=>{
                    this.onAssetsProgress({
                        percent: 100
                    }),
                    o.isTouch || this.buildEyes(),
                    l.ZP.to(this.dom.loaderBox, {
                        onComplete: this.showEyes,
                        duration: .5,
                        scale: 0,
                        autoAlpha: 0,
                        ease: "power2.out",
                        delay: .5
                    }),
                    l.ZP.to(this.enterButton.dom.el, {
                        duration: .5,
                        autoAlpha: 1,
                        ease: "power2.inOut",
                        delay: .5
                    }),
                    l.ZP.to(this.enterNoAudioButton, {
                        duration: .5,
                        autoAlpha: 1,
                        ease: "power2.inOut",
                        delay: .5
                    }),
                    o.urlParams.has("skiploader") && this.hide()
                }
                )),
                P(this, "buildEyes", (()=>{
                    this.createEyelidTl(),
                    this.getBtnCenter(),
                    n.on("mouseenter", this.enterButton.dom.el, this.eyesMouseEnter),
                    n.on("mouseleave", this.enterButton.dom.el, this.eyesMouseLeave),
                    n.on(o.events.RESIZE, this.onResize),
                    n.on(o.events.MOUSEMOVE, this.onPointerMove),
                    o.RAFCollection.add(this.onRAF, 3)
                }
                )),
                P(this, "showEyes", (()=>{
                    this.openEyes(),
                    l.ZP.to(this.eyes.el, {
                        display: "block",
                        scale: 1,
                        duration: 1,
                        ease: v.tQ.easeOut.config(.5, .4),
                        onComplete: ()=>{
                            this.getEyesCenter(),
                            o.isTouch && window.setTimeout((()=>{
                                this.animateEyes()
                            }
                            ), 200)
                        }
                    })
                }
                )),
                P(this, "createEyelidTl", (()=>{
                    this.eyelidTl = l.ZP.timeline({
                        paused: !0
                    }).to(this.eyes.leftTop, {
                        yPercent: -59
                    }, 0).to(this.eyes.leftBottom, {
                        yPercent: 43
                    }, 0).to(this.eyes.rightTop, {
                        yPercent: -59
                    }, 0).to(this.eyes.rightBottom, {
                        yPercent: 67
                    }, 0)
                }
                )),
                P(this, "getEyesCenter", (()=>{
                    const e = this.eyes.el.getBoundingClientRect();
                    this.eyesCenterY = e.top + e.height / 2;
                    this.maxMovementX = e.width / 15,
                    this.maxMovementY = e.width / o.window.w * 65,
                    this.eyesMin = -this.eyesCenterY / o.window.h,
                    this.eyesMax = (o.window.h - this.eyesCenterY) / o.window.h
                }
                )),
                P(this, "getBtnCenter", (()=>{
                    this.btnRect = this.enterButton.dom.el.getBoundingClientRect(),
                    this.btnCenterX = this.btnRect.left + this.btnRect.width / 2,
                    this.btnCenterY = this.btnRect.top + this.btnRect.height / 2,
                    this.btnMin = -this.btnCenterY / o.window.h,
                    this.btnMax = (o.window.h - this.btnCenterY) / o.window.h
                }
                )),
                P(this, "bringToTop", (e=>{
                    for (let t = 0; t < e.length; t++)
                        e[t].parentNode.appendChild(e[t])
                }
                )),
                P(this, "eyesMouseEnter", (()=>{
                    window.clearTimeout(this.timeout),
                    this.bringToTop(this.eyes.heart),
                    l.ZP.timeline({
                        defaults: {
                            transformOrigin: "center center",
                            duration: .3
                        }
                    }).to(this.eyes.normal, {
                        scale: .2
                    }).to(this.eyes.heart, {
                        scale: 1,
                        ease: v.tQ.easeOut.config(.5, .3)
                    }, .1)
                }
                )),
                P(this, "eyesMouseLeave", (()=>{
                    this.timeout = window.setTimeout((()=>{
                        this.bringToTop(this.eyes.normal),
                        l.ZP.timeline({
                            defaults: {
                                transformOrigin: "center center",
                                duration: .3
                            }
                        }).to(this.eyes.heart, {
                            scale: 0,
                            duration: .2
                        }).to(this.eyes.normal, {
                            scale: 1
                        }, 0)
                    }
                    ), 200)
                }
                )),
                P(this, "onResize", (()=>{
                    this.getEyesCenter(),
                    this.getBtnCenter()
                }
                )),
                P(this, "onPointerMove", (()=>{
                    this.mouse.x = (o.mouse.x - this.btnCenterX) / o.window.w * 2,
                    this.mouse.y = (o.mouse.y - this.btnCenterY) / o.window.h * 2,
                    o.mouse.y < this.btnCenterY ? this.mouse.y *= -.5 / this.btnMin : this.mouse.y *= .5 / this.btnMax,
                    this.eyes.y = (o.mouse.y - this.eyesCenterY) / o.window.h * 2,
                    o.mouse.y < this.eyesCenterY ? this.eyes.y *= -.5 / this.eyesMin : this.eyes.y *= 1.2 / this.eyesMax
                }
                )),
                P(this, "onRAF", (()=>{
                    const e = Math.min(this.eyes.y || 0, 3);
                    this.current.x = l.ZP.utils.interpolate(this.current.x, this.mouse.x, .1),
                    this.current.y = l.ZP.utils.interpolate(this.current.y, e, .1);
                    const t = Math.sqrt(Math.pow(this.mouse.x, 2) + Math.pow(this.mouse.y, 2));
                    this.currentDist = l.ZP.utils.interpolate(this.currentDist, t, .09),
                    this.eyelidTl.progress(1 - v.Yv.easeOut(l.ZP.utils.clamp(0, 1, this.currentDist))),
                    this.eyes.left.style.transform = `translate3d(${this.current.x * this.maxMovementX}px, ${this.current.y * this.maxMovementY}px, 0)`,
                    this.eyes.right.style.transform = `translate3d(${this.current.x * this.maxMovementX}px, ${this.current.y * this.maxMovementY}px, 0)`
                }
                )),
                P(this, "onEnterButtonClick", (()=>{
                    o.Audio.muteAll(!1),
                    this.hide()
                }
                )),
                P(this, "onEnterNoAudioButtonClick", (()=>{
                    o.Audio.muteAll(!0),
                    this.hide()
                }
                )),
                this.dom = {
                    loader: g(".js-loader"),
                    loaderBox: p(".js-loader-box"),
                    progress: g(".js-loader-progress"),
                    progressInner: g(".js-loader-progress-inner")
                },
                this.eyes = {
                    el: g(".js-eyes"),
                    left: g(".js-eyes-left"),
                    right: g(".js-eyes-right"),
                    leftTop: g(".js-eyes-eyelid-left-top"),
                    leftBottom: g(".js-eyes-eyelid-left-bottom"),
                    rightTop: g(".js-eyes-eyelid-right-top"),
                    rightBottom: g(".js-eyes-eyelid-right-bottom"),
                    normal: p(".js-eyes-normal"),
                    heart: p(".js-eyes-heart")
                },
                this.enterButton = new y(document.querySelector(".js-enter-btn")),
                this.enterNoAudioButton = document.querySelector(".js-enter-no-audio-btn"),
                this.hidden = !1,
                this.percent = 0,
                this.throttledProgressFunc = this.throttle(this.onAssetsProgress, 150),
                n.on("AssetsProgress", this.throttledProgressFunc),
                n.on("AssetLoader:afterResolve", this.onAssetsLoaded),
                n.on("click", this.enterButton.dom.el, this.onEnterButtonClick),
                n.on("click", this.enterNoAudioButton, this.onEnterNoAudioButtonClick),
                this.hiddenPromise = new Promise((e=>{
                    this.hiddenResolve = e
                }
                )),
                this.current = {
                    x: 0,
                    y: 0
                },
                this.mouse = {
                    x: 0,
                    y: 0
                },
                this.currentDist = 0,
                l.ZP.set(this.eyes.heart, {
                    transformOrigin: "center center",
                    scale: 0
                })
            }
            show() {
                return new Promise((e=>{
                    l.ZP.timeline({
                        defaults: {
                            ease: "expo.inOut"
                        },
                        onComplete: e
                    }).set(this.dom.progressInner, {
                        autoAlpha: 1,
                        scale: 1
                    }, 0).to(this.dom.loader, {
                        duration: 1,
                        autoAlpha: 1
                    }, 0)
                }
                ))
            }
            hide() {
                return this.removeEvents(),
                this.hidden = !0,
                l.ZP.timeline({
                    defaults: {
                        ease: "expo.inOut"
                    }
                }).to(this.eyes.el, {
                    opacity: 0,
                    duration: .5,
                    onComplete: ()=>{
                        this.eyes.el.style.display = "none"
                    }
                }, 0).to(this.dom.loader, {
                    duration: 1,
                    autoAlpha: 0
                }, 0).to(this.dom.progressInner, {
                    duration: .8,
                    autoAlpha: 0
                }, 0).to(this.dom.progressInner, {
                    duration: 1.1,
                    scale: 1.8
                }, 0).set(this.enterButton.dom.el, {
                    autoAlpha: 0
                }).set(this.enterNoAudioButton, {
                    autoAlpha: 0
                }).set(this.dom.loaderBox, {
                    autoAlpha: 1,
                    scale: 1
                }).call((()=>{
                    this.hiddenResolve()
                }
                ), null, .3),
                this.hiddenPromise
            }
            openEyes() {
                l.ZP.timeline({
                    defaults: {
                        duration: .5,
                        ease: "power3.out"
                    }
                }).to(this.eyes.leftTop, {
                    yPercent: -59
                }, 0).to(this.eyes.leftBottom, {
                    yPercent: 43
                }, 0).to(this.eyes.rightTop, {
                    yPercent: -59
                }, 0).to(this.eyes.rightBottom, {
                    yPercent: 67
                }, 0)
            }
            animateEyes() {
                l.ZP.timeline({
                    defaults: {
                        duration: .5,
                        ease: "power3.out"
                    },
                    onComplete: ()=>{
                        window.setTimeout((()=>{
                            this.animateEyes()
                        }
                        ), 3e3)
                    }
                }).to(this.eyes.left, {
                    y: this.maxMovementY
                }, 0).to(this.eyes.right, {
                    y: this.maxMovementY
                }, 0).addLabel("center", "+=0.5").to(this.eyes.left, {
                    y: 0
                }, "center").to(this.eyes.right, {
                    y: 0
                }, "center").addLabel("down", "+=1").to(this.eyes.left, {
                    y: this.maxMovementY
                }, "down").to(this.eyes.right, {
                    y: this.maxMovementY
                }, "down").addLabel("center2", "+=0.6").to(this.eyes.left, {
                    y: 0
                }, "center2").to(this.eyes.right, {
                    y: 0
                }, "center2").addLabel("sus", "+=0.6").to(this.eyes.leftTop, {
                    yPercent: 0
                }, "sus").to(this.eyes.leftBottom, {
                    yPercent: 0
                }, "sus").to(this.eyes.rightTop, {
                    yPercent: 0
                }, "sus").to(this.eyes.rightBottom, {
                    yPercent: 0
                }, "sus").addLabel("open", "+=0.8").to(this.eyes.leftTop, {
                    yPercent: -59
                }, "open").to(this.eyes.leftBottom, {
                    yPercent: 43
                }, "open").to(this.eyes.rightTop, {
                    yPercent: -59
                }, "open").to(this.eyes.rightBottom, {
                    yPercent: 67
                }, "open")
            }
            throttle(e, t) {
                let s = !1;
                return function() {
                    s || (e.apply(this, arguments),
                    s = !0,
                    setTimeout((function() {
                        s = !1
                    }
                    ), t))
                }
            }
            removeEvents() {
                n.off("AssetsProgress", this.throttledProgressFunc),
                n.off("AssetLoader:afterResolve", this.onAssetsLoaded),
                n.off("click", this.enterButton.dom.el, this.onEnterButtonClick),
                n.off("click", this.enterNoAudioButton, this.onEnterNoAudioButtonClick),
                o.isTouch || (n.off("mouseenter", this.enterButton.dom.el, this.eyesMouseEnter),
                n.off("mouseleave", this.enterButton.dom.el, this.eyesMouseLeave),
                n.off(o.events.RESIZE, this.onResize),
                n.off(o.events.MOUSEMOVE, this.onPointerMove),
                o.RAFCollection.remove(this.onRAF))
            }
        }
        s(285),
        s(7145),
        s(3824),
        s(9135),
        s(4197),
        s(5109),
        s(5125),
        s(2472),
        s(8255);
        var b = s(6043)
          , T = s(634);
        const S = {};
        class M extends T.a {
            constructor(e) {
                super(e)
            }
            load(e, t, s, i) {
                void 0 === e && (e = ""),
                void 0 !== this.path && (e = this.path + e),
                e = this.manager.resolveURL(e);
                const o = this
                  , n = b.C.get(e);
                if (void 0 !== n)
                    return o.manager.itemStart(e),
                    setTimeout((function() {
                        t && t(n),
                        o.manager.itemEnd(e)
                    }
                    ), 0),
                    n;
                if (void 0 !== S[e])
                    return void S[e].push({
                        onLoad: t,
                        onProgress: s,
                        onError: i
                    });
                const r = e.match(/^data:(.*?)(;base64)?,(.*)$/);
                let a;
                if (r) {
                    const s = r[1]
                      , n = !!r[2];
                    let a = r[3];
                    a = decodeURIComponent(a),
                    n && (a = atob(a));
                    try {
                        let i;
                        const n = (this.responseType || "").toLowerCase();
                        switch (n) {
                        case "arraybuffer":
                        case "blob":
                            const e = new Uint8Array(a.length);
                            for (let t = 0; t < a.length; t++)
                                e[t] = a.charCodeAt(t);
                            i = "blob" === n ? new Blob([e.buffer],{
                                type: s
                            }) : e.buffer;
                            break;
                        case "document":
                            const t = new DOMParser;
                            i = t.parseFromString(a, s);
                            break;
                        case "json":
                            i = JSON.parse(a);
                            break;
                        default:
                            i = a
                        }
                        setTimeout((function() {
                            t && t(i),
                            o.manager.itemEnd(e)
                        }
                        ), 0)
                    } catch (t) {
                        setTimeout((function() {
                            i && i(t),
                            o.manager.itemError(e),
                            o.manager.itemEnd(e)
                        }
                        ), 0)
                    }
                } else {
                    S[e] = [],
                    S[e].push({
                        onLoad: t,
                        onProgress: s,
                        onError: i
                    }),
                    a = new XMLHttpRequest,
                    a.open("GET", e, !0),
                    a.addEventListener("load", (function(t) {
                        const s = this.response
                          , i = S[e];
                        if (delete S[e],
                        200 === this.status || 0 === this.status) {
                            0 === this.status && console.warn("THREE.FileLoader: HTTP Status 0 received."),
                            b.C.add(e, s);
                            for (let e = 0, t = i.length; e < t; e++) {
                                const t = i[e];
                                t.onLoad && t.onLoad(s)
                            }
                            o.manager.itemEnd(e)
                        } else {
                            for (let e = 0, s = i.length; e < s; e++) {
                                const s = i[e];
                                s.onError && s.onError(t)
                            }
                            o.manager.itemError(e),
                            o.manager.itemEnd(e)
                        }
                    }
                    ), !1),
                    a.addEventListener("progress", (function(t) {
                        const s = S[e];
                        for (let e = 0, i = s.length; e < i; e++) {
                            const i = s[e];
                            i.onProgress && i.onProgress(t)
                        }
                    }
                    ), !1),
                    a.addEventListener("error", (function(t) {
                        const s = S[e];
                        delete S[e];
                        for (let e = 0, i = s.length; e < i; e++) {
                            const i = s[e];
                            i.onError && i.onError(t)
                        }
                        o.manager.itemError(e),
                        o.manager.itemEnd(e)
                    }
                    ), !1),
                    a.addEventListener("abort", (function(t) {
                        const s = S[e];
                        delete S[e];
                        for (let e = 0, i = s.length; e < i; e++) {
                            const i = s[e];
                            i.onError && i.onError(t)
                        }
                        o.manager.itemError(e),
                        o.manager.itemEnd(e)
                    }
                    ), !1),
                    void 0 !== this.responseType && (a.responseType = this.responseType),
                    void 0 !== this.withCredentials && (a.withCredentials = this.withCredentials),
                    a.overrideMimeType && a.overrideMimeType(void 0 !== this.mimeType ? this.mimeType : "text/plain");
                    for (const e in this.requestHeader)
                        a.setRequestHeader(e, this.requestHeader[e]);
                    a.send(null)
                }
                return o.manager.itemStart(e),
                a
            }
            setResponseType(e) {
                return this.responseType = e,
                this
            }
            setMimeType(e) {
                return this.mimeType = e,
                this
            }
        }
        const C = new WeakMap;
        class _ extends i.aNw {
            constructor(e) {
                super(e),
                this.decoderPath = "",
                this.decoderConfig = {},
                this.decoderBinary = null,
                this.decoderPending = null,
                this.workerLimit = 4,
                this.workerPool = [],
                this.workerNextTaskID = 1,
                this.workerSourceURL = "",
                this.defaultAttributeIDs = {
                    position: "POSITION",
                    normal: "NORMAL",
                    color: "COLOR",
                    uv: "TEX_COORD"
                },
                this.defaultAttributeTypes = {
                    position: "Float32Array",
                    normal: "Float32Array",
                    color: "Float32Array",
                    uv: "Float32Array"
                }
            }
            setDecoderPath(e) {
                return this.decoderPath = e,
                this
            }
            setDecoderConfig(e) {
                return this.decoderConfig = e,
                this
            }
            setWorkerLimit(e) {
                return this.workerLimit = e,
                this
            }
            load(e, t, s, i) {
                const o = new M(this.manager);
                o.setPath(this.path),
                o.setResponseType("arraybuffer"),
                o.setRequestHeader(this.requestHeader),
                o.setWithCredentials(this.withCredentials),
                o.load(e, (e=>{
                    const s = {
                        attributeIDs: this.defaultAttributeIDs,
                        attributeTypes: this.defaultAttributeTypes,
                        useUniqueIDs: !1
                    };
                    this.decodeGeometry(e, s).then(t).catch(i)
                }
                ), s, i)
            }
            decodeDracoFile(e, t, s, i) {
                const o = {
                    attributeIDs: s || this.defaultAttributeIDs,
                    attributeTypes: i || this.defaultAttributeTypes,
                    useUniqueIDs: !!s
                };
                this.decodeGeometry(e, o).then(t)
            }
            decodeGeometry(e, t) {
                for (const e in t.attributeTypes) {
                    const s = t.attributeTypes[e];
                    void 0 !== s.BYTES_PER_ELEMENT && (t.attributeTypes[e] = s.name)
                }
                const s = JSON.stringify(t);
                if (C.has(e)) {
                    const t = C.get(e);
                    if (t.key === s)
                        return t.promise;
                    if (0 === e.byteLength)
                        throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")
                }
                let i;
                const o = this.workerNextTaskID++
                  , n = e.byteLength
                  , r = this._getWorker(o, n).then((s=>(i = s,
                new Promise(((s,n)=>{
                    i._callbacks[o] = {
                        resolve: s,
                        reject: n
                    },
                    i.postMessage({
                        type: "decode",
                        id: o,
                        taskConfig: t,
                        buffer: e
                    }, [e])
                }
                ))))).then((e=>this._createGeometry(e.geometry)));
                return r.catch((()=>!0)).then((()=>{
                    i && o && this._releaseTask(i, o)
                }
                )),
                C.set(e, {
                    key: s,
                    promise: r
                }),
                r
            }
            _createGeometry(e) {
                const t = new i.u9r;
                e.index && t.setIndex(new i.TlE(e.index.array,1));
                for (let s = 0; s < e.attributes.length; s++) {
                    const o = e.attributes[s]
                      , n = o.name
                      , r = o.array
                      , a = o.itemSize;
                    t.setAttribute(n, new i.TlE(r,a))
                }
                return t
            }
            _loadLibrary(e, t) {
                const s = new M(this.manager);
                return s.setPath(this.decoderPath),
                s.setResponseType(t),
                s.setWithCredentials(this.withCredentials),
                new Promise(((t,i)=>{
                    s.load(e, t, void 0, i)
                }
                ))
            }
            preload() {
                return this._initDecoder(),
                this
            }
            _initDecoder() {
                if (this.decoderPending)
                    return this.decoderPending;
                const e = "object" != typeof WebAssembly || "js" === this.decoderConfig.type
                  , t = [];
                return e ? t.push(this._loadLibrary("draco_decoder.js", "text")) : (t.push(this._loadLibrary("draco_wasm_wrapper.js", "text")),
                t.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"))),
                this.decoderPending = Promise.all(t).then((t=>{
                    const s = t[0];
                    e || (this.decoderConfig.wasmBinary = t[1]);
                    const i = j.toString()
                      , o = ["/* draco decoder */", s, "", "/* worker */", i.substring(i.indexOf("{") + 1, i.lastIndexOf("}"))].join("\n");
                    this.workerSourceURL = URL.createObjectURL(new Blob([o]))
                }
                )),
                this.decoderPending
            }
            _getWorker(e, t) {
                return this._initDecoder().then((()=>{
                    if (this.workerPool.length < this.workerLimit) {
                        const e = new Worker(this.workerSourceURL);
                        e._callbacks = {},
                        e._taskCosts = {},
                        e._taskLoad = 0,
                        e.postMessage({
                            type: "init",
                            decoderConfig: this.decoderConfig
                        }),
                        e.onmessage = function(t) {
                            const s = t.data;
                            switch (s.type) {
                            case "decode":
                                e._callbacks[s.id].resolve(s);
                                break;
                            case "error":
                                e._callbacks[s.id].reject(s);
                                break;
                            default:
                                console.error('THREE.DRACOLoader: Unexpected message, "' + s.type + '"')
                            }
                        }
                        ,
                        this.workerPool.push(e)
                    } else
                        this.workerPool.sort((function(e, t) {
                            return e._taskLoad > t._taskLoad ? -1 : 1
                        }
                        ));
                    const s = this.workerPool[this.workerPool.length - 1];
                    return s._taskCosts[e] = t,
                    s._taskLoad += t,
                    s
                }
                ))
            }
            _releaseTask(e, t) {
                e._taskLoad -= e._taskCosts[t],
                delete e._callbacks[t],
                delete e._taskCosts[t]
            }
            debug() {
                console.log("Task load: ", this.workerPool.map((e=>e._taskLoad)))
            }
            dispose() {
                for (let e = 0; e < this.workerPool.length; ++e)
                    this.workerPool[e].terminate();
                return this.workerPool.length = 0,
                this
            }
        }
        function j() {
            let e, t;
            function s(e, t, s, i, o, n) {
                const r = n.num_components()
                  , a = s.num_points() * r
                  , l = a * o.BYTES_PER_ELEMENT
                  , h = function(e, t) {
                    switch (t) {
                    case Float32Array:
                        return e.DT_FLOAT32;
                    case Int8Array:
                        return e.DT_INT8;
                    case Int16Array:
                        return e.DT_INT16;
                    case Int32Array:
                        return e.DT_INT32;
                    case Uint8Array:
                        return e.DT_UINT8;
                    case Uint16Array:
                        return e.DT_UINT16;
                    case Uint32Array:
                        return e.DT_UINT32
                    }
                }(e, o)
                  , c = e._malloc(l);
                t.GetAttributeDataArrayForAllPoints(s, n, h, l, c);
                const d = new o(e.HEAPF32.buffer,c,a).slice();
                return e._free(c),
                {
                    name: i,
                    array: d,
                    itemSize: r
                }
            }
            onmessage = function(i) {
                const o = i.data;
                switch (o.type) {
                case "init":
                    e = o.decoderConfig,
                    t = new Promise((function(t) {
                        e.onModuleLoaded = function(e) {
                            t({
                                draco: e
                            })
                        }
                        ,
                        DracoDecoderModule(e)
                    }
                    ));
                    break;
                case "decode":
                    const i = o.buffer
                      , n = o.taskConfig;
                    t.then((e=>{
                        const t = e.draco
                          , r = new t.Decoder
                          , a = new t.DecoderBuffer;
                        a.Init(new Int8Array(i), i.byteLength);
                        try {
                            const e = function(e, t, i, o) {
                                const n = o.attributeIDs
                                  , r = o.attributeTypes;
                                let a, l;
                                const h = t.GetEncodedGeometryType(i);
                                if (h === e.TRIANGULAR_MESH)
                                    a = new e.Mesh,
                                    l = t.DecodeBufferToMesh(i, a);
                                else {
                                    if (h !== e.POINT_CLOUD)
                                        throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
                                    a = new e.PointCloud,
                                    l = t.DecodeBufferToPointCloud(i, a)
                                }
                                if (!l.ok() || 0 === a.ptr)
                                    throw new Error("THREE.DRACOLoader: Decoding failed: " + l.error_msg());
                                const c = {
                                    index: null,
                                    attributes: []
                                };
                                for (const i in n) {
                                    const l = self[r[i]];
                                    let h, d;
                                    if (o.useUniqueIDs)
                                        d = n[i],
                                        h = t.GetAttributeByUniqueId(a, d);
                                    else {
                                        if (d = t.GetAttributeId(a, e[n[i]]),
                                        -1 === d)
                                            continue;
                                        h = t.GetAttribute(a, d)
                                    }
                                    c.attributes.push(s(e, t, a, i, l, h))
                                }
                                h === e.TRIANGULAR_MESH && (c.index = function(e, t, s) {
                                    const i = 3 * s.num_faces()
                                      , o = 4 * i
                                      , n = e._malloc(o);
                                    t.GetTrianglesUInt32Array(s, o, n);
                                    const r = new Uint32Array(e.HEAPF32.buffer,n,i).slice();
                                    return e._free(n),
                                    {
                                        array: r,
                                        itemSize: 1
                                    }
                                }(e, t, a));
                                return e.destroy(a),
                                c
                            }(t, r, a, n)
                              , i = e.attributes.map((e=>e.array.buffer));
                            e.index && i.push(e.index.array.buffer),
                            self.postMessage({
                                type: "decode",
                                id: o.id,
                                geometry: e
                            }, i)
                        } catch (e) {
                            console.error(e),
                            self.postMessage({
                                type: "error",
                                id: o.id,
                                error: e.message
                            })
                        } finally {
                            t.destroy(a),
                            t.destroy(r)
                        }
                    }
                    ))
                }
            }
        }
        s(5306);
        class A extends i.aNw {
            constructor(e) {
                super(e),
                this.dracoLoader = null,
                this.ktx2Loader = null,
                this.meshoptDecoder = null,
                this.pluginCallbacks = [],
                this.register((function(e) {
                    return new k(e)
                }
                )),
                this.register((function(e) {
                    return new B(e)
                }
                )),
                this.register((function(e) {
                    return new N(e)
                }
                )),
                this.register((function(e) {
                    return new D(e)
                }
                )),
                this.register((function(e) {
                    return new G(e)
                }
                )),
                this.register((function(e) {
                    return new z(e)
                }
                )),
                this.register((function(e) {
                    return new H(e)
                }
                )),
                this.register((function(e) {
                    return new O(e)
                }
                )),
                this.register((function(e) {
                    return new U(e)
                }
                )),
                this.register((function(e) {
                    return new F(e)
                }
                )),
                this.register((function(e) {
                    return new I(e)
                }
                )),
                this.register((function(e) {
                    return new W(e)
                }
                ))
            }
            load(e, t, s, o) {
                const n = this;
                let r;
                r = "" !== this.resourcePath ? this.resourcePath : "" !== this.path ? this.path : i.Zp0.extractUrlBase(e),
                this.manager.itemStart(e);
                const a = function(t) {
                    o ? o(t) : console.error(t),
                    n.manager.itemError(e),
                    n.manager.itemEnd(e)
                }
                  , l = new M(this.manager);
                l.setPath(this.path),
                l.setResponseType("arraybuffer"),
                l.setRequestHeader(this.requestHeader),
                l.setWithCredentials(this.withCredentials),
                l.load(e, (function(s) {
                    try {
                        n.parse(s, r, (function(s) {
                            t(s),
                            n.manager.itemEnd(e)
                        }
                        ), a)
                    } catch (e) {
                        a(e)
                    }
                }
                ), s, a)
            }
            setDRACOLoader(e) {
                return this.dracoLoader = e,
                this
            }
            setDDSLoader() {
                throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')
            }
            setKTX2Loader(e) {
                return this.ktx2Loader = e,
                this
            }
            setMeshoptDecoder(e) {
                return this.meshoptDecoder = e,
                this
            }
            register(e) {
                return -1 === this.pluginCallbacks.indexOf(e) && this.pluginCallbacks.push(e),
                this
            }
            unregister(e) {
                return -1 !== this.pluginCallbacks.indexOf(e) && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1),
                this
            }
            parse(e, t, s, o) {
                let n;
                const r = {}
                  , a = {};
                if ("string" == typeof e)
                    n = e;
                else {
                    if (i.Zp0.decodeText(new Uint8Array(e,0,4)) === Z) {
                        try {
                            r[E.KHR_BINARY_GLTF] = new Y(e)
                        } catch (e) {
                            return void (o && o(e))
                        }
                        n = r[E.KHR_BINARY_GLTF].content
                    } else
                        n = i.Zp0.decodeText(new Uint8Array(e))
                }
                const l = JSON.parse(n);
                if (void 0 === l.asset || l.asset.version[0] < 2)
                    return void (o && o(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.")));
                const h = new Ce(l,{
                    path: t || this.resourcePath || "",
                    crossOrigin: this.crossOrigin,
                    requestHeader: this.requestHeader,
                    manager: this.manager,
                    ktx2Loader: this.ktx2Loader,
                    meshoptDecoder: this.meshoptDecoder
                });
                h.fileLoader.setRequestHeader(this.requestHeader);
                for (let e = 0; e < this.pluginCallbacks.length; e++) {
                    const t = this.pluginCallbacks[e](h);
                    a[t.name] = t,
                    r[t.name] = !0
                }
                if (l.extensionsUsed)
                    for (let e = 0; e < l.extensionsUsed.length; ++e) {
                        const t = l.extensionsUsed[e]
                          , s = l.extensionsRequired || [];
                        switch (t) {
                        case E.KHR_MATERIALS_UNLIT:
                            r[t] = new R;
                            break;
                        case E.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:
                            r[t] = new Q;
                            break;
                        case E.KHR_DRACO_MESH_COMPRESSION:
                            r[t] = new K(l,this.dracoLoader);
                            break;
                        case E.KHR_TEXTURE_TRANSFORM:
                            r[t] = new X;
                            break;
                        case E.KHR_MESH_QUANTIZATION:
                            r[t] = new J;
                            break;
                        default:
                            s.indexOf(t) >= 0 && void 0 === a[t] && console.warn('THREE.GLTFLoader: Unknown extension "' + t + '".')
                        }
                    }
                h.setExtensions(r),
                h.setPlugins(a),
                h.parse(s, o)
            }
            parseAsync(e, t) {
                const s = this;
                return new Promise((function(i, o) {
                    s.parse(e, t, i, o)
                }
                ))
            }
        }
        function L() {
            let e = {};
            return {
                get: function(t) {
                    return e[t]
                },
                add: function(t, s) {
                    e[t] = s
                },
                remove: function(t) {
                    delete e[t]
                },
                removeAll: function() {
                    e = {}
                }
            }
        }
        const E = {
            KHR_BINARY_GLTF: "KHR_binary_glTF",
            KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
            KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
            KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
            KHR_MATERIALS_IOR: "KHR_materials_ior",
            KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS: "KHR_materials_pbrSpecularGlossiness",
            KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
            KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
            KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
            KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
            KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
            KHR_MATERIALS_VOLUME: "KHR_materials_volume",
            KHR_TEXTURE_BASISU: "KHR_texture_basisu",
            KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
            KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
            KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
            EXT_TEXTURE_WEBP: "EXT_texture_webp",
            EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression"
        };
        class I {
            constructor(e) {
                this.parser = e,
                this.name = E.KHR_LIGHTS_PUNCTUAL,
                this.cache = {
                    refs: {},
                    uses: {}
                }
            }
            _markDefs() {
                const e = this.parser
                  , t = this.parser.json.nodes || [];
                for (let s = 0, i = t.length; s < i; s++) {
                    const i = t[s];
                    i.extensions && i.extensions[this.name] && void 0 !== i.extensions[this.name].light && e._addNodeRef(this.cache, i.extensions[this.name].light)
                }
            }
            _loadLight(e) {
                const t = this.parser
                  , s = "light:" + e;
                let o = t.cache.get(s);
                if (o)
                    return o;
                const n = t.json
                  , r = ((n.extensions && n.extensions[this.name] || {}).lights || [])[e];
                let a;
                const l = new i.Ilk(16777215);
                void 0 !== r.color && l.fromArray(r.color);
                const h = void 0 !== r.range ? r.range : 0;
                switch (r.type) {
                case "directional":
                    a = new i.Ox3(l),
                    a.target.position.set(0, 0, -1),
                    a.add(a.target);
                    break;
                case "point":
                    a = new i.cek(l),
                    a.distance = h;
                    break;
                case "spot":
                    a = new i.PMe(l),
                    a.distance = h,
                    r.spot = r.spot || {},
                    r.spot.innerConeAngle = void 0 !== r.spot.innerConeAngle ? r.spot.innerConeAngle : 0,
                    r.spot.outerConeAngle = void 0 !== r.spot.outerConeAngle ? r.spot.outerConeAngle : Math.PI / 4,
                    a.angle = r.spot.outerConeAngle,
                    a.penumbra = 1 - r.spot.innerConeAngle / r.spot.outerConeAngle,
                    a.target.position.set(0, 0, -1),
                    a.add(a.target);
                    break;
                default:
                    throw new Error("THREE.GLTFLoader: Unexpected light type: " + r.type)
                }
                return a.position.set(0, 0, 0),
                a.decay = 2,
                void 0 !== r.intensity && (a.intensity = r.intensity),
                a.name = t.createUniqueName(r.name || "light_" + e),
                o = Promise.resolve(a),
                t.cache.add(s, o),
                o
            }
            createNodeAttachment(e) {
                const t = this
                  , s = this.parser
                  , i = s.json.nodes[e]
                  , o = (i.extensions && i.extensions[this.name] || {}).light;
                return void 0 === o ? null : this._loadLight(o).then((function(e) {
                    return s._getNodeRef(t.cache, o, e)
                }
                ))
            }
        }
        class R {
            constructor() {
                this.name = E.KHR_MATERIALS_UNLIT
            }
            getMaterialType() {
                return i.vBJ
            }
            extendParams(e, t, s) {
                const o = [];
                e.color = new i.Ilk(1,1,1),
                e.opacity = 1;
                const n = t.pbrMetallicRoughness;
                if (n) {
                    if (Array.isArray(n.baseColorFactor)) {
                        const t = n.baseColorFactor;
                        e.color.fromArray(t),
                        e.opacity = t[3]
                    }
                    void 0 !== n.baseColorTexture && o.push(s.assignTexture(e, "map", n.baseColorTexture, i.knz))
                }
                return Promise.all(o)
            }
        }
        class O {
            constructor(e) {
                this.parser = e,
                this.name = E.KHR_MATERIALS_EMISSIVE_STRENGTH
            }
            extendMaterialParams(e, t) {
                const s = this.parser.json.materials[e];
                if (!s.extensions || !s.extensions[this.name])
                    return Promise.resolve();
                const i = s.extensions[this.name].emissiveStrength;
                return void 0 !== i && (t.emissiveIntensity = i),
                Promise.resolve()
            }
        }
        class k {
            constructor(e) {
                this.parser = e,
                this.name = E.KHR_MATERIALS_CLEARCOAT
            }
            getMaterialType(e) {
                const t = this.parser.json.materials[e];
                return t.extensions && t.extensions[this.name] ? i.EJi : null
            }
            extendMaterialParams(e, t) {
                const s = this.parser
                  , o = s.json.materials[e];
                if (!o.extensions || !o.extensions[this.name])
                    return Promise.resolve();
                const n = []
                  , r = o.extensions[this.name];
                if (void 0 !== r.clearcoatFactor && (t.clearcoat = r.clearcoatFactor),
                void 0 !== r.clearcoatTexture && n.push(s.assignTexture(t, "clearcoatMap", r.clearcoatTexture)),
                void 0 !== r.clearcoatRoughnessFactor && (t.clearcoatRoughness = r.clearcoatRoughnessFactor),
                void 0 !== r.clearcoatRoughnessTexture && n.push(s.assignTexture(t, "clearcoatRoughnessMap", r.clearcoatRoughnessTexture)),
                void 0 !== r.clearcoatNormalTexture && (n.push(s.assignTexture(t, "clearcoatNormalMap", r.clearcoatNormalTexture)),
                void 0 !== r.clearcoatNormalTexture.scale)) {
                    const e = r.clearcoatNormalTexture.scale;
                    t.clearcoatNormalScale = new i.FM8(e,e)
                }
                return Promise.all(n)
            }
        }
        class F {
            constructor(e) {
                this.parser = e,
                this.name = E.KHR_MATERIALS_IRIDESCENCE
            }
            getMaterialType(e) {
                const t = this.parser.json.materials[e];
                return t.extensions && t.extensions[this.name] ? i.EJi : null
            }
            extendMaterialParams(e, t) {
                const s = this.parser
                  , i = s.json.materials[e];
                if (!i.extensions || !i.extensions[this.name])
                    return Promise.resolve();
                const o = []
                  , n = i.extensions[this.name];
                return void 0 !== n.iridescenceFactor && (t.iridescence = n.iridescenceFactor),
                void 0 !== n.iridescenceTexture && o.push(s.assignTexture(t, "iridescenceMap", n.iridescenceTexture)),
                void 0 !== n.iridescenceIor && (t.iridescenceIOR = n.iridescenceIor),
                void 0 === t.iridescenceThicknessRange && (t.iridescenceThicknessRange = [100, 400]),
                void 0 !== n.iridescenceThicknessMinimum && (t.iridescenceThicknessRange[0] = n.iridescenceThicknessMinimum),
                void 0 !== n.iridescenceThicknessMaximum && (t.iridescenceThicknessRange[1] = n.iridescenceThicknessMaximum),
                void 0 !== n.iridescenceThicknessTexture && o.push(s.assignTexture(t, "iridescenceThicknessMap", n.iridescenceThicknessTexture)),
                Promise.all(o)
            }
        }
        class D {
            constructor(e) {
                this.parser = e,
                this.name = E.KHR_MATERIALS_SHEEN
            }
            getMaterialType(e) {
                const t = this.parser.json.materials[e];
                return t.extensions && t.extensions[this.name] ? i.EJi : null
            }
            extendMaterialParams(e, t) {
                const s = this.parser
                  , o = s.json.materials[e];
                if (!o.extensions || !o.extensions[this.name])
                    return Promise.resolve();
                const n = [];
                t.sheenColor = new i.Ilk(0,0,0),
                t.sheenRoughness = 0,
                t.sheen = 1;
                const r = o.extensions[this.name];
                return void 0 !== r.sheenColorFactor && t.sheenColor.fromArray(r.sheenColorFactor),
                void 0 !== r.sheenRoughnessFactor && (t.sheenRoughness = r.sheenRoughnessFactor),
                void 0 !== r.sheenColorTexture && n.push(s.assignTexture(t, "sheenColorMap", r.sheenColorTexture, i.knz)),
                void 0 !== r.sheenRoughnessTexture && n.push(s.assignTexture(t, "sheenRoughnessMap", r.sheenRoughnessTexture)),
                Promise.all(n)
            }
        }
        class G {
            constructor(e) {
                this.parser = e,
                this.name = E.KHR_MATERIALS_TRANSMISSION
            }
            getMaterialType(e) {
                const t = this.parser.json.materials[e];
                return t.extensions && t.extensions[this.name] ? i.EJi : null
            }
            extendMaterialParams(e, t) {
                const s = this.parser
                  , i = s.json.materials[e];
                if (!i.extensions || !i.extensions[this.name])
                    return Promise.resolve();
                const o = []
                  , n = i.extensions[this.name];
                return void 0 !== n.transmissionFactor && (t.transmission = n.transmissionFactor),
                void 0 !== n.transmissionTexture && o.push(s.assignTexture(t, "transmissionMap", n.transmissionTexture)),
                Promise.all(o)
            }
        }
        class z {
            constructor(e) {
                this.parser = e,
                this.name = E.KHR_MATERIALS_VOLUME
            }
            getMaterialType(e) {
                const t = this.parser.json.materials[e];
                return t.extensions && t.extensions[this.name] ? i.EJi : null
            }
            extendMaterialParams(e, t) {
                const s = this.parser
                  , o = s.json.materials[e];
                if (!o.extensions || !o.extensions[this.name])
                    return Promise.resolve();
                const n = []
                  , r = o.extensions[this.name];
                t.thickness = void 0 !== r.thicknessFactor ? r.thicknessFactor : 0,
                void 0 !== r.thicknessTexture && n.push(s.assignTexture(t, "thicknessMap", r.thicknessTexture)),
                t.attenuationDistance = r.attenuationDistance || 0;
                const a = r.attenuationColor || [1, 1, 1];
                return t.attenuationColor = new i.Ilk(a[0],a[1],a[2]),
                Promise.all(n)
            }
        }
        class H {
            constructor(e) {
                this.parser = e,
                this.name = E.KHR_MATERIALS_IOR
            }
            getMaterialType(e) {
                const t = this.parser.json.materials[e];
                return t.extensions && t.extensions[this.name] ? i.EJi : null
            }
            extendMaterialParams(e, t) {
                const s = this.parser.json.materials[e];
                if (!s.extensions || !s.extensions[this.name])
                    return Promise.resolve();
                const i = s.extensions[this.name];
                return t.ior = void 0 !== i.ior ? i.ior : 1.5,
                Promise.resolve()
            }
        }
        class U {
            constructor(e) {
                this.parser = e,
                this.name = E.KHR_MATERIALS_SPECULAR
            }
            getMaterialType(e) {
                const t = this.parser.json.materials[e];
                return t.extensions && t.extensions[this.name] ? i.EJi : null
            }
            extendMaterialParams(e, t) {
                const s = this.parser
                  , o = s.json.materials[e];
                if (!o.extensions || !o.extensions[this.name])
                    return Promise.resolve();
                const n = []
                  , r = o.extensions[this.name];
                t.specularIntensity = void 0 !== r.specularFactor ? r.specularFactor : 1,
                void 0 !== r.specularTexture && n.push(s.assignTexture(t, "specularIntensityMap", r.specularTexture));
                const a = r.specularColorFactor || [1, 1, 1];
                return t.specularColor = new i.Ilk(a[0],a[1],a[2]),
                void 0 !== r.specularColorTexture && n.push(s.assignTexture(t, "specularColorMap", r.specularColorTexture, i.knz)),
                Promise.all(n)
            }
        }
        class B {
            constructor(e) {
                this.parser = e,
                this.name = E.KHR_TEXTURE_BASISU
            }
            loadTexture(e) {
                const t = this.parser
                  , s = t.json
                  , i = s.textures[e];
                if (!i.extensions || !i.extensions[this.name])
                    return null;
                const o = i.extensions[this.name]
                  , n = t.options.ktx2Loader;
                if (!n) {
                    if (s.extensionsRequired && s.extensionsRequired.indexOf(this.name) >= 0)
                        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
                    return null
                }
                return t.loadTextureImage(e, o.source, n)
            }
        }
        class N {
            constructor(e) {
                this.parser = e,
                this.name = E.EXT_TEXTURE_WEBP,
                this.isSupported = null
            }
            loadTexture(e) {
                const t = this.name
                  , s = this.parser
                  , i = s.json
                  , o = i.textures[e];
                if (!o.extensions || !o.extensions[t])
                    return null;
                const n = o.extensions[t]
                  , r = i.images[n.source];
                let a = s.textureLoader;
                if (r.uri) {
                    const e = s.options.manager.getHandler(r.uri);
                    null !== e && (a = e)
                }
                return this.detectSupport().then((function(o) {
                    if (o)
                        return s.loadTextureImage(e, n.source, a);
                    if (i.extensionsRequired && i.extensionsRequired.indexOf(t) >= 0)
                        throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
                    return s.loadTexture(e)
                }
                ))
            }
            detectSupport() {
                return this.isSupported || (this.isSupported = new Promise((function(e) {
                    const t = new Image;
                    t.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
                    t.onload = t.onerror = function() {
                        e(1 === t.height)
                    }
                }
                ))),
                this.isSupported
            }
        }
        class W {
            constructor(e) {
                this.name = E.EXT_MESHOPT_COMPRESSION,
                this.parser = e
            }
            loadBufferView(e) {
                const t = this.parser.json
                  , s = t.bufferViews[e];
                if (s.extensions && s.extensions[this.name]) {
                    const e = s.extensions[this.name]
                      , i = this.parser.getDependency("buffer", e.buffer)
                      , o = this.parser.options.meshoptDecoder;
                    if (!o || !o.supported) {
                        if (t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0)
                            throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
                        return null
                    }
                    return Promise.all([i, o.ready]).then((function(t) {
                        const s = e.byteOffset || 0
                          , i = e.byteLength || 0
                          , n = e.count
                          , r = e.byteStride
                          , a = new ArrayBuffer(n * r)
                          , l = new Uint8Array(t[0],s,i);
                        return o.decodeGltfBuffer(new Uint8Array(a), n, r, l, e.mode, e.filter),
                        a
                    }
                    ))
                }
                return null
            }
        }
        const Z = "glTF"
          , q = 1313821514
          , V = 5130562;
        class Y {
            constructor(e) {
                this.name = E.KHR_BINARY_GLTF,
                this.content = null,
                this.body = null;
                const t = new DataView(e,0,12);
                if (this.header = {
                    magic: i.Zp0.decodeText(new Uint8Array(e.slice(0, 4))),
                    version: t.getUint32(4, !0),
                    length: t.getUint32(8, !0)
                },
                this.header.magic !== Z)
                    throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
                if (this.header.version < 2)
                    throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
                const s = this.header.length - 12
                  , o = new DataView(e,12);
                let n = 0;
                for (; n < s; ) {
                    const t = o.getUint32(n, !0);
                    n += 4;
                    const s = o.getUint32(n, !0);
                    if (n += 4,
                    s === q) {
                        const s = new Uint8Array(e,12 + n,t);
                        this.content = i.Zp0.decodeText(s)
                    } else if (s === V) {
                        const s = 12 + n;
                        this.body = e.slice(s, s + t)
                    }
                    n += t
                }
                if (null === this.content)
                    throw new Error("THREE.GLTFLoader: JSON content not found.")
            }
        }
        class K {
            constructor(e, t) {
                if (!t)
                    throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
                this.name = E.KHR_DRACO_MESH_COMPRESSION,
                this.json = e,
                this.dracoLoader = t,
                this.dracoLoader.preload()
            }
            decodePrimitive(e, t) {
                const s = this.json
                  , i = this.dracoLoader
                  , o = e.extensions[this.name].bufferView
                  , n = e.extensions[this.name].attributes
                  , r = {}
                  , a = {}
                  , l = {};
                for (const e in n) {
                    const t = pe[e] || e.toLowerCase();
                    r[t] = n[e]
                }
                for (const t in e.attributes) {
                    const i = pe[t] || t.toLowerCase();
                    if (void 0 !== n[t]) {
                        const o = s.accessors[e.attributes[t]]
                          , n = ce[o.componentType];
                        l[i] = n,
                        a[i] = !0 === o.normalized
                    }
                }
                return t.getDependency("bufferView", o).then((function(e) {
                    return new Promise((function(t) {
                        i.decodeDracoFile(e, (function(e) {
                            for (const t in e.attributes) {
                                const s = e.attributes[t]
                                  , i = a[t];
                                void 0 !== i && (s.normalized = i)
                            }
                            t(e)
                        }
                        ), r, l)
                    }
                    ))
                }
                ))
            }
        }
        class X {
            constructor() {
                this.name = E.KHR_TEXTURE_TRANSFORM
            }
            extendTexture(e, t) {
                return void 0 !== t.texCoord && console.warn('THREE.GLTFLoader: Custom UV sets in "' + this.name + '" extension not yet supported.'),
                void 0 === t.offset && void 0 === t.rotation && void 0 === t.scale || (e = e.clone(),
                void 0 !== t.offset && e.offset.fromArray(t.offset),
                void 0 !== t.rotation && (e.rotation = t.rotation),
                void 0 !== t.scale && e.repeat.fromArray(t.scale),
                e.needsUpdate = !0),
                e
            }
        }
        class $ extends i.Wid {
            constructor(e) {
                super(),
                this.isGLTFSpecularGlossinessMaterial = !0;
                const t = ["#ifdef USE_SPECULARMAP", "\tuniform sampler2D specularMap;", "#endif"].join("\n")
                  , s = ["#ifdef USE_GLOSSINESSMAP", "\tuniform sampler2D glossinessMap;", "#endif"].join("\n")
                  , o = ["vec3 specularFactor = specular;", "#ifdef USE_SPECULARMAP", "\tvec4 texelSpecular = texture2D( specularMap, vUv );", "\t// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture", "\tspecularFactor *= texelSpecular.rgb;", "#endif"].join("\n")
                  , n = ["float glossinessFactor = glossiness;", "#ifdef USE_GLOSSINESSMAP", "\tvec4 texelGlossiness = texture2D( glossinessMap, vUv );", "\t// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture", "\tglossinessFactor *= texelGlossiness.a;", "#endif"].join("\n")
                  , r = ["PhysicalMaterial material;", "material.diffuseColor = diffuseColor.rgb * ( 1. - max( specularFactor.r, max( specularFactor.g, specularFactor.b ) ) );", "vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );", "float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );", "material.roughness = max( 1.0 - glossinessFactor, 0.0525 ); // 0.0525 corresponds to the base mip of a 256 cubemap.", "material.roughness += geometryRoughness;", "material.roughness = min( material.roughness, 1.0 );", "material.specularColor = specularFactor;"].join("\n")
                  , a = {
                    specular: {
                        value: (new i.Ilk).setHex(16777215)
                    },
                    glossiness: {
                        value: 1
                    },
                    specularMap: {
                        value: null
                    },
                    glossinessMap: {
                        value: null
                    }
                };
                this._extraUniforms = a,
                this.onBeforeCompile = function(e) {
                    for (const t in a)
                        e.uniforms[t] = a[t];
                    e.fragmentShader = e.fragmentShader.replace("uniform float roughness;", "uniform vec3 specular;").replace("uniform float metalness;", "uniform float glossiness;").replace("#include <roughnessmap_pars_fragment>", t).replace("#include <metalnessmap_pars_fragment>", s).replace("#include <roughnessmap_fragment>", o).replace("#include <metalnessmap_fragment>", n).replace("#include <lights_physical_fragment>", r)
                }
                ,
                Object.defineProperties(this, {
                    specular: {
                        get: function() {
                            return a.specular.value
                        },
                        set: function(e) {
                            a.specular.value = e
                        }
                    },
                    specularMap: {
                        get: function() {
                            return a.specularMap.value
                        },
                        set: function(e) {
                            a.specularMap.value = e,
                            e ? this.defines.USE_SPECULARMAP = "" : delete this.defines.USE_SPECULARMAP
                        }
                    },
                    glossiness: {
                        get: function() {
                            return a.glossiness.value
                        },
                        set: function(e) {
                            a.glossiness.value = e
                        }
                    },
                    glossinessMap: {
                        get: function() {
                            return a.glossinessMap.value
                        },
                        set: function(e) {
                            a.glossinessMap.value = e,
                            e ? (this.defines.USE_GLOSSINESSMAP = "",
                            this.defines.USE_UV = "") : (delete this.defines.USE_GLOSSINESSMAP,
                            delete this.defines.USE_UV)
                        }
                    }
                }),
                delete this.metalness,
                delete this.roughness,
                delete this.metalnessMap,
                delete this.roughnessMap,
                this.setValues(e)
            }
            copy(e) {
                return super.copy(e),
                this.specularMap = e.specularMap,
                this.specular.copy(e.specular),
                this.glossinessMap = e.glossinessMap,
                this.glossiness = e.glossiness,
                delete this.metalness,
                delete this.roughness,
                delete this.metalnessMap,
                delete this.roughnessMap,
                this
            }
        }
        class Q {
            constructor() {
                this.name = E.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS,
                this.specularGlossinessParams = ["color", "map", "lightMap", "lightMapIntensity", "aoMap", "aoMapIntensity", "emissive", "emissiveIntensity", "emissiveMap", "bumpMap", "bumpScale", "normalMap", "normalMapType", "displacementMap", "displacementScale", "displacementBias", "specularMap", "specular", "glossinessMap", "glossiness", "alphaMap", "envMap", "envMapIntensity"]
            }
            getMaterialType() {
                return $
            }
            extendParams(e, t, s) {
                const o = t.extensions[this.name];
                e.color = new i.Ilk(1,1,1),
                e.opacity = 1;
                const n = [];
                if (Array.isArray(o.diffuseFactor)) {
                    const t = o.diffuseFactor;
                    e.color.fromArray(t),
                    e.opacity = t[3]
                }
                if (void 0 !== o.diffuseTexture && n.push(s.assignTexture(e, "map", o.diffuseTexture, i.knz)),
                e.emissive = new i.Ilk(0,0,0),
                e.glossiness = void 0 !== o.glossinessFactor ? o.glossinessFactor : 1,
                e.specular = new i.Ilk(1,1,1),
                Array.isArray(o.specularFactor) && e.specular.fromArray(o.specularFactor),
                void 0 !== o.specularGlossinessTexture) {
                    const t = o.specularGlossinessTexture;
                    n.push(s.assignTexture(e, "glossinessMap", t)),
                    n.push(s.assignTexture(e, "specularMap", t, i.knz))
                }
                return Promise.all(n)
            }
            createMaterial(e) {
                const t = new $(e);
                return t.fog = !0,
                t.color = e.color,
                t.map = void 0 === e.map ? null : e.map,
                t.lightMap = null,
                t.lightMapIntensity = 1,
                t.aoMap = void 0 === e.aoMap ? null : e.aoMap,
                t.aoMapIntensity = 1,
                t.emissive = e.emissive,
                t.emissiveIntensity = void 0 === e.emissiveIntensity ? 1 : e.emissiveIntensity,
                t.emissiveMap = void 0 === e.emissiveMap ? null : e.emissiveMap,
                t.bumpMap = void 0 === e.bumpMap ? null : e.bumpMap,
                t.bumpScale = 1,
                t.normalMap = void 0 === e.normalMap ? null : e.normalMap,
                t.normalMapType = i.IOt,
                e.normalScale && (t.normalScale = e.normalScale),
                t.displacementMap = null,
                t.displacementScale = 1,
                t.displacementBias = 0,
                t.specularMap = void 0 === e.specularMap ? null : e.specularMap,
                t.specular = e.specular,
                t.glossinessMap = void 0 === e.glossinessMap ? null : e.glossinessMap,
                t.glossiness = e.glossiness,
                t.alphaMap = null,
                t.envMap = void 0 === e.envMap ? null : e.envMap,
                t.envMapIntensity = 1,
                t
            }
        }
        class J {
            constructor() {
                this.name = E.KHR_MESH_QUANTIZATION
            }
        }
        class ee extends i._C8 {
            constructor(e, t, s, i) {
                super(e, t, s, i)
            }
            copySampleValue_(e) {
                const t = this.resultBuffer
                  , s = this.sampleValues
                  , i = this.valueSize
                  , o = e * i * 3 + i;
                for (let e = 0; e !== i; e++)
                    t[e] = s[o + e];
                return t
            }
            interpolate_(e, t, s, i) {
                const o = this.resultBuffer
                  , n = this.sampleValues
                  , r = this.valueSize
                  , a = 2 * r
                  , l = 3 * r
                  , h = i - t
                  , c = (s - t) / h
                  , d = c * c
                  , u = d * c
                  , m = e * l
                  , p = m - l
                  , g = -2 * u + 3 * d
                  , f = u - d
                  , v = 1 - g
                  , x = f - d + c;
                for (let e = 0; e !== r; e++) {
                    const t = n[p + e + r]
                      , s = n[p + e + a] * h
                      , i = n[m + e + r]
                      , l = n[m + e] * h;
                    o[e] = v * t + x * s + g * i + f * l
                }
                return o
            }
        }
        const te = new i._fP;
        class se extends ee {
            interpolate_(e, t, s, i) {
                const o = super.interpolate_(e, t, s, i);
                return te.fromArray(o).normalize().toArray(o),
                o
            }
        }
        const ie = 0
          , oe = 1
          , ne = 2
          , re = 3
          , ae = 4
          , le = 5
          , he = 6
          , ce = {
            5120: Int8Array,
            5121: Uint8Array,
            5122: Int16Array,
            5123: Uint16Array,
            5125: Uint32Array,
            5126: Float32Array
        }
          , de = {
            9728: i.TyD,
            9729: i.wem,
            9984: i.YLQ,
            9985: i.qyh,
            9986: i.aH4,
            9987: i.D1R
        }
          , ue = {
            33071: i.uWy,
            33648: i.OoA,
            10497: i.rpg
        }
          , me = {
            SCALAR: 1,
            VEC2: 2,
            VEC3: 3,
            VEC4: 4,
            MAT2: 4,
            MAT3: 9,
            MAT4: 16
        }
          , pe = {
            POSITION: "position",
            NORMAL: "normal",
            TANGENT: "tangent",
            TEXCOORD_0: "uv",
            TEXCOORD_1: "uv2",
            COLOR_0: "color",
            WEIGHTS_0: "skinWeight",
            JOINTS_0: "skinIndex"
        }
          , ge = {
            scale: "scale",
            translation: "position",
            rotation: "quaternion",
            weights: "morphTargetInfluences"
        }
          , fe = {
            CUBICSPLINE: void 0,
            LINEAR: i.NMF,
            STEP: i.Syv
        }
          , ve = "OPAQUE"
          , xe = "MASK"
          , ye = "BLEND";
        function Pe(e, t, s) {
            for (const i in s.extensions)
                void 0 === e[i] && (t.userData.gltfExtensions = t.userData.gltfExtensions || {},
                t.userData.gltfExtensions[i] = s.extensions[i])
        }
        function we(e, t) {
            void 0 !== t.extras && ("object" == typeof t.extras ? Object.assign(e.userData, t.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + t.extras))
        }
        function be(e, t) {
            if (e.updateMorphTargets(),
            void 0 !== t.weights)
                for (let s = 0, i = t.weights.length; s < i; s++)
                    e.morphTargetInfluences[s] = t.weights[s];
            if (t.extras && Array.isArray(t.extras.targetNames)) {
                const s = t.extras.targetNames;
                if (e.morphTargetInfluences.length === s.length) {
                    e.morphTargetDictionary = {};
                    for (let t = 0, i = s.length; t < i; t++)
                        e.morphTargetDictionary[s[t]] = t
                } else
                    console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")
            }
        }
        function Te(e) {
            const t = e.extensions && e.extensions[E.KHR_DRACO_MESH_COMPRESSION];
            let s;
            return s = t ? "draco:" + t.bufferView + ":" + t.indices + ":" + Se(t.attributes) : e.indices + ":" + Se(e.attributes) + ":" + e.mode,
            s
        }
        function Se(e) {
            let t = "";
            const s = Object.keys(e).sort();
            for (let i = 0, o = s.length; i < o; i++)
                t += s[i] + ":" + e[s[i]] + ";";
            return t
        }
        function Me(e) {
            switch (e) {
            case Int8Array:
                return 1 / 127;
            case Uint8Array:
                return 1 / 255;
            case Int16Array:
                return 1 / 32767;
            case Uint16Array:
                return 1 / 65535;
            default:
                throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")
            }
        }
        class Ce {
            constructor(e={}, t={}) {
                this.json = e,
                this.extensions = {},
                this.plugins = {},
                this.options = t,
                this.cache = new L,
                this.associations = new Map,
                this.primitiveCache = {},
                this.meshCache = {
                    refs: {},
                    uses: {}
                },
                this.cameraCache = {
                    refs: {},
                    uses: {}
                },
                this.lightCache = {
                    refs: {},
                    uses: {}
                },
                this.sourceCache = {},
                this.textureCache = {},
                this.nodeNamesUsed = {};
                const s = !0 === /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
                  , o = navigator.userAgent.indexOf("Firefox") > -1
                  , n = o ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1;
                "undefined" == typeof createImageBitmap || s || o && n < 98 ? this.textureLoader = new i.dpR(this.options.manager) : this.textureLoader = new i.QRU(this.options.manager),
                this.textureLoader.setCrossOrigin(this.options.crossOrigin),
                this.textureLoader.setRequestHeader(this.options.requestHeader),
                this.fileLoader = new M(this.options.manager),
                this.fileLoader.setResponseType("arraybuffer"),
                "use-credentials" === this.options.crossOrigin && this.fileLoader.setWithCredentials(!0)
            }
            setExtensions(e) {
                this.extensions = e
            }
            setPlugins(e) {
                this.plugins = e
            }
            parse(e, t) {
                const s = this
                  , i = this.json
                  , o = this.extensions;
                this.cache.removeAll(),
                this._invokeAll((function(e) {
                    return e._markDefs && e._markDefs()
                }
                )),
                Promise.all(this._invokeAll((function(e) {
                    return e.beforeRoot && e.beforeRoot()
                }
                ))).then((function() {
                    return Promise.all([s.getDependencies("scene"), s.getDependencies("animation"), s.getDependencies("camera")])
                }
                )).then((function(t) {
                    const n = {
                        scene: t[0][i.scene || 0],
                        scenes: t[0],
                        animations: t[1],
                        cameras: t[2],
                        asset: i.asset,
                        parser: s,
                        userData: {}
                    };
                    Pe(o, n, i),
                    we(n, i),
                    Promise.all(s._invokeAll((function(e) {
                        return e.afterRoot && e.afterRoot(n)
                    }
                    ))).then((function() {
                        e(n)
                    }
                    ))
                }
                )).catch(t)
            }
            _markDefs() {
                const e = this.json.nodes || []
                  , t = this.json.skins || []
                  , s = this.json.meshes || [];
                for (let s = 0, i = t.length; s < i; s++) {
                    const i = t[s].joints;
                    for (let t = 0, s = i.length; t < s; t++)
                        e[i[t]].isBone = !0
                }
                for (let t = 0, i = e.length; t < i; t++) {
                    const i = e[t];
                    void 0 !== i.mesh && (this._addNodeRef(this.meshCache, i.mesh),
                    void 0 !== i.skin && (s[i.mesh].isSkinnedMesh = !0)),
                    void 0 !== i.camera && this._addNodeRef(this.cameraCache, i.camera)
                }
            }
            _addNodeRef(e, t) {
                void 0 !== t && (void 0 === e.refs[t] && (e.refs[t] = e.uses[t] = 0),
                e.refs[t]++)
            }
            _getNodeRef(e, t, s) {
                if (e.refs[t] <= 1)
                    return s;
                const i = s.clone()
                  , o = (e,t)=>{
                    const s = this.associations.get(e);
                    null != s && this.associations.set(t, s);
                    for (const [s,i] of e.children.entries())
                        o(i, t.children[s])
                }
                ;
                return o(s, i),
                i.name += "_instance_" + e.uses[t]++,
                i
            }
            _invokeOne(e) {
                const t = Object.values(this.plugins);
                t.push(this);
                for (let s = 0; s < t.length; s++) {
                    const i = e(t[s]);
                    if (i)
                        return i
                }
                return null
            }
            _invokeAll(e) {
                const t = Object.values(this.plugins);
                t.unshift(this);
                const s = [];
                for (let i = 0; i < t.length; i++) {
                    const o = e(t[i]);
                    o && s.push(o)
                }
                return s
            }
            getDependency(e, t) {
                const s = e + ":" + t;
                let i = this.cache.get(s);
                if (!i) {
                    switch (e) {
                    case "scene":
                        i = this.loadScene(t);
                        break;
                    case "node":
                        i = this.loadNode(t);
                        break;
                    case "mesh":
                        i = this._invokeOne((function(e) {
                            return e.loadMesh && e.loadMesh(t)
                        }
                        ));
                        break;
                    case "accessor":
                        i = this.loadAccessor(t);
                        break;
                    case "bufferView":
                        i = this._invokeOne((function(e) {
                            return e.loadBufferView && e.loadBufferView(t)
                        }
                        ));
                        break;
                    case "buffer":
                        i = this.loadBuffer(t);
                        break;
                    case "material":
                        i = this._invokeOne((function(e) {
                            return e.loadMaterial && e.loadMaterial(t)
                        }
                        ));
                        break;
                    case "texture":
                        i = this._invokeOne((function(e) {
                            return e.loadTexture && e.loadTexture(t)
                        }
                        ));
                        break;
                    case "skin":
                        i = this.loadSkin(t);
                        break;
                    case "animation":
                        i = this._invokeOne((function(e) {
                            return e.loadAnimation && e.loadAnimation(t)
                        }
                        ));
                        break;
                    case "camera":
                        i = this.loadCamera(t);
                        break;
                    default:
                        throw new Error("Unknown type: " + e)
                    }
                    this.cache.add(s, i)
                }
                return i
            }
            getDependencies(e) {
                let t = this.cache.get(e);
                if (!t) {
                    const s = this
                      , i = this.json[e + ("mesh" === e ? "es" : "s")] || [];
                    t = Promise.all(i.map((function(t, i) {
                        return s.getDependency(e, i)
                    }
                    ))),
                    this.cache.add(e, t)
                }
                return t
            }
            loadBuffer(e) {
                const t = this.json.buffers[e]
                  , s = this.fileLoader;
                if (t.type && "arraybuffer" !== t.type)
                    throw new Error("THREE.GLTFLoader: " + t.type + " buffer type is not supported.");
                if (void 0 === t.uri && 0 === e)
                    return Promise.resolve(this.extensions[E.KHR_BINARY_GLTF].body);
                const o = this.options;
                return new Promise((function(e, n) {
                    s.load(i.Zp0.resolveURL(t.uri, o.path), e, void 0, (function() {
                        n(new Error('THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".'))
                    }
                    ))
                }
                ))
            }
            loadBufferView(e) {
                const t = this.json.bufferViews[e];
                return this.getDependency("buffer", t.buffer).then((function(e) {
                    const s = t.byteLength || 0
                      , i = t.byteOffset || 0;
                    return e.slice(i, i + s)
                }
                ))
            }
            loadAccessor(e) {
                const t = this
                  , s = this.json
                  , o = this.json.accessors[e];
                if (void 0 === o.bufferView && void 0 === o.sparse)
                    return Promise.resolve(null);
                const n = [];
                return void 0 !== o.bufferView ? n.push(this.getDependency("bufferView", o.bufferView)) : n.push(null),
                void 0 !== o.sparse && (n.push(this.getDependency("bufferView", o.sparse.indices.bufferView)),
                n.push(this.getDependency("bufferView", o.sparse.values.bufferView))),
                Promise.all(n).then((function(e) {
                    const n = e[0]
                      , r = me[o.type]
                      , a = ce[o.componentType]
                      , l = a.BYTES_PER_ELEMENT
                      , h = l * r
                      , c = o.byteOffset || 0
                      , d = void 0 !== o.bufferView ? s.bufferViews[o.bufferView].byteStride : void 0
                      , u = !0 === o.normalized;
                    let m, p;
                    if (d && d !== h) {
                        const e = Math.floor(c / d)
                          , s = "InterleavedBuffer:" + o.bufferView + ":" + o.componentType + ":" + e + ":" + o.count;
                        let h = t.cache.get(s);
                        h || (m = new a(n,e * d,o.count * d / l),
                        h = new i.vpT(m,d / l),
                        t.cache.add(s, h)),
                        p = new i.kB5(h,r,c % d / l,u)
                    } else
                        m = null === n ? new a(o.count * r) : new a(n,c,o.count * r),
                        p = new i.TlE(m,r,u);
                    if (void 0 !== o.sparse) {
                        const t = me.SCALAR
                          , s = ce[o.sparse.indices.componentType]
                          , l = o.sparse.indices.byteOffset || 0
                          , h = o.sparse.values.byteOffset || 0
                          , c = new s(e[1],l,o.sparse.count * t)
                          , d = new a(e[2],h,o.sparse.count * r);
                        null !== n && (p = new i.TlE(p.array.slice(),p.itemSize,p.normalized));
                        for (let e = 0, t = c.length; e < t; e++) {
                            const t = c[e];
                            if (p.setX(t, d[e * r]),
                            r >= 2 && p.setY(t, d[e * r + 1]),
                            r >= 3 && p.setZ(t, d[e * r + 2]),
                            r >= 4 && p.setW(t, d[e * r + 3]),
                            r >= 5)
                                throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")
                        }
                    }
                    return p
                }
                ))
            }
            loadTexture(e) {
                const t = this.json
                  , s = this.options
                  , i = t.textures[e].source
                  , o = t.images[i];
                let n = this.textureLoader;
                if (o.uri) {
                    const e = s.manager.getHandler(o.uri);
                    null !== e && (n = e)
                }
                return this.loadTextureImage(e, i, n)
            }
            loadTextureImage(e, t, s) {
                const o = this
                  , n = this.json
                  , r = n.textures[e]
                  , a = n.images[t]
                  , l = (a.uri || a.bufferView) + ":" + r.sampler;
                if (this.textureCache[l])
                    return this.textureCache[l];
                const h = this.loadImageSource(t, s).then((function(t) {
                    t.flipY = !1,
                    r.name && (t.name = r.name);
                    const s = (n.samplers || {})[r.sampler] || {};
                    return t.magFilter = de[s.magFilter] || i.wem,
                    t.minFilter = de[s.minFilter] || i.D1R,
                    t.wrapS = ue[s.wrapS] || i.rpg,
                    t.wrapT = ue[s.wrapT] || i.rpg,
                    o.associations.set(t, {
                        textures: e
                    }),
                    t
                }
                )).catch((function() {
                    return null
                }
                ));
                return this.textureCache[l] = h,
                h
            }
            loadImageSource(e, t) {
                const s = this
                  , o = this.json
                  , n = this.options;
                if (void 0 !== this.sourceCache[e])
                    return this.sourceCache[e].then((e=>e.clone()));
                const r = o.images[e]
                  , a = self.URL || self.webkitURL;
                let l = r.uri || ""
                  , h = !1;
                if (void 0 !== r.bufferView)
                    l = s.getDependency("bufferView", r.bufferView).then((function(e) {
                        h = !0;
                        const t = new Blob([e],{
                            type: r.mimeType
                        });
                        return l = a.createObjectURL(t),
                        l
                    }
                    ));
                else if (void 0 === r.uri)
                    throw new Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
                const c = Promise.resolve(l).then((function(e) {
                    return new Promise((function(s, o) {
                        let r = s;
                        !0 === t.isImageBitmapLoader && (r = function(e) {
                            const t = new i.xEZ(e);
                            t.needsUpdate = !0,
                            s(t)
                        }
                        ),
                        t.load(i.Zp0.resolveURL(e, n.path), r, void 0, o)
                    }
                    ))
                }
                )).then((function(e) {
                    var t;
                    return !0 === h && a.revokeObjectURL(l),
                    e.userData.mimeType = r.mimeType || ((t = r.uri).search(/\.jpe?g($|\?)/i) > 0 || 0 === t.search(/^data\:image\/jpeg/) ? "image/jpeg" : t.search(/\.webp($|\?)/i) > 0 || 0 === t.search(/^data\:image\/webp/) ? "image/webp" : "image/png"),
                    e
                }
                )).catch((function(e) {
                    throw console.error("THREE.GLTFLoader: Couldn't load texture", l),
                    e
                }
                ));
                return this.sourceCache[e] = c,
                c
            }
            assignTexture(e, t, s, i) {
                const o = this;
                return this.getDependency("texture", s.index).then((function(n) {
                    if (void 0 === s.texCoord || 0 == s.texCoord || "aoMap" === t && 1 == s.texCoord || console.warn("THREE.GLTFLoader: Custom UV set " + s.texCoord + " for texture " + t + " not yet supported."),
                    o.extensions[E.KHR_TEXTURE_TRANSFORM]) {
                        const e = void 0 !== s.extensions ? s.extensions[E.KHR_TEXTURE_TRANSFORM] : void 0;
                        if (e) {
                            const t = o.associations.get(n);
                            n = o.extensions[E.KHR_TEXTURE_TRANSFORM].extendTexture(n, e),
                            o.associations.set(n, t)
                        }
                    }
                    return void 0 !== i && (n.encoding = i),
                    e[t] = n,
                    n
                }
                ))
            }
            assignFinalMaterial(e) {
                const t = e.geometry;
                let s = e.material;
                const o = void 0 === t.attributes.tangent
                  , n = void 0 !== t.attributes.color
                  , r = void 0 === t.attributes.normal;
                if (e.isPoints) {
                    const e = "PointsMaterial:" + s.uuid;
                    let t = this.cache.get(e);
                    t || (t = new i.UY4,
                    i.F5T.prototype.copy.call(t, s),
                    t.color.copy(s.color),
                    t.map = s.map,
                    t.sizeAttenuation = !1,
                    this.cache.add(e, t)),
                    s = t
                } else if (e.isLine) {
                    const e = "LineBasicMaterial:" + s.uuid;
                    let t = this.cache.get(e);
                    t || (t = new i.nls,
                    i.F5T.prototype.copy.call(t, s),
                    t.color.copy(s.color),
                    this.cache.add(e, t)),
                    s = t
                }
                if (o || n || r) {
                    let e = "ClonedMaterial:" + s.uuid + ":";
                    s.isGLTFSpecularGlossinessMaterial && (e += "specular-glossiness:"),
                    o && (e += "derivative-tangents:"),
                    n && (e += "vertex-colors:"),
                    r && (e += "flat-shading:");
                    let t = this.cache.get(e);
                    t || (t = s.clone(),
                    n && (t.vertexColors = !0),
                    r && (t.flatShading = !0),
                    o && (t.normalScale && (t.normalScale.y *= -1),
                    t.clearcoatNormalScale && (t.clearcoatNormalScale.y *= -1)),
                    this.cache.add(e, t),
                    this.associations.set(t, this.associations.get(s))),
                    s = t
                }
                s.aoMap && void 0 === t.attributes.uv2 && void 0 !== t.attributes.uv && t.setAttribute("uv2", t.attributes.uv),
                e.material = s
            }
            getMaterialType() {
                return i.Wid
            }
            loadMaterial(e) {
                const t = this
                  , s = this.json
                  , o = this.extensions
                  , n = s.materials[e];
                let r;
                const a = {}
                  , l = n.extensions || {}
                  , h = [];
                if (l[E.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]) {
                    const e = o[E.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS];
                    r = e.getMaterialType(),
                    h.push(e.extendParams(a, n, t))
                } else if (l[E.KHR_MATERIALS_UNLIT]) {
                    const e = o[E.KHR_MATERIALS_UNLIT];
                    r = e.getMaterialType(),
                    h.push(e.extendParams(a, n, t))
                } else {
                    const s = n.pbrMetallicRoughness || {};
                    if (a.color = new i.Ilk(1,1,1),
                    a.opacity = 1,
                    Array.isArray(s.baseColorFactor)) {
                        const e = s.baseColorFactor;
                        a.color.fromArray(e),
                        a.opacity = e[3]
                    }
                    void 0 !== s.baseColorTexture && h.push(t.assignTexture(a, "map", s.baseColorTexture, i.knz)),
                    a.metalness = void 0 !== s.metallicFactor ? s.metallicFactor : 1,
                    a.roughness = void 0 !== s.roughnessFactor ? s.roughnessFactor : 1,
                    void 0 !== s.metallicRoughnessTexture && (h.push(t.assignTexture(a, "metalnessMap", s.metallicRoughnessTexture)),
                    h.push(t.assignTexture(a, "roughnessMap", s.metallicRoughnessTexture))),
                    r = this._invokeOne((function(t) {
                        return t.getMaterialType && t.getMaterialType(e)
                    }
                    )),
                    h.push(Promise.all(this._invokeAll((function(t) {
                        return t.extendMaterialParams && t.extendMaterialParams(e, a)
                    }
                    ))))
                }
                !0 === n.doubleSided && (a.side = i.ehD);
                const c = n.alphaMode || ve;
                if (c === ye ? (a.transparent = !0,
                a.depthWrite = !1) : (a.transparent = !1,
                c === xe && (a.alphaTest = void 0 !== n.alphaCutoff ? n.alphaCutoff : .5)),
                void 0 !== n.normalTexture && r !== i.vBJ && (h.push(t.assignTexture(a, "normalMap", n.normalTexture)),
                a.normalScale = new i.FM8(1,1),
                void 0 !== n.normalTexture.scale)) {
                    const e = n.normalTexture.scale;
                    a.normalScale.set(e, e)
                }
                return void 0 !== n.occlusionTexture && r !== i.vBJ && (h.push(t.assignTexture(a, "aoMap", n.occlusionTexture)),
                void 0 !== n.occlusionTexture.strength && (a.aoMapIntensity = n.occlusionTexture.strength)),
                void 0 !== n.emissiveFactor && r !== i.vBJ && (a.emissive = (new i.Ilk).fromArray(n.emissiveFactor)),
                void 0 !== n.emissiveTexture && r !== i.vBJ && h.push(t.assignTexture(a, "emissiveMap", n.emissiveTexture, i.knz)),
                Promise.all(h).then((function() {
                    let s;
                    return s = r === $ ? o[E.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].createMaterial(a) : new r(a),
                    n.name && (s.name = n.name),
                    we(s, n),
                    t.associations.set(s, {
                        materials: e
                    }),
                    n.extensions && Pe(o, s, n),
                    s
                }
                ))
            }
            createUniqueName(e) {
                const t = i.iUV.sanitizeNodeName(e || "");
                let s = t;
                for (let e = 1; this.nodeNamesUsed[s]; ++e)
                    s = t + "_" + e;
                return this.nodeNamesUsed[s] = !0,
                s
            }
            loadGeometries(e) {
                const t = this
                  , s = this.extensions
                  , o = this.primitiveCache;
                function n(e) {
                    return s[E.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e, t).then((function(s) {
                        return je(s, e, t)
                    }
                    ))
                }
                const r = [];
                for (let s = 0, a = e.length; s < a; s++) {
                    const a = e[s]
                      , l = Te(a)
                      , h = o[l];
                    if (h)
                        r.push(h.promise);
                    else {
                        let e;
                        e = a.extensions && a.extensions[E.KHR_DRACO_MESH_COMPRESSION] ? n(a) : je(new i.u9r, a, t),
                        o[l] = {
                            primitive: a,
                            promise: e
                        },
                        r.push(e)
                    }
                }
                return Promise.all(r)
            }
            loadMesh(e) {
                const t = this
                  , s = this.json
                  , o = this.extensions
                  , n = s.meshes[e]
                  , r = n.primitives
                  , a = [];
                for (let e = 0, t = r.length; e < t; e++) {
                    const t = void 0 === r[e].material ? (void 0 === (l = this.cache).DefaultMaterial && (l.DefaultMaterial = new i.Wid({
                        color: 16777215,
                        emissive: 0,
                        metalness: 1,
                        roughness: 1,
                        transparent: !1,
                        depthTest: !0,
                        side: i.Wl3
                    })),
                    l.DefaultMaterial) : this.getDependency("material", r[e].material);
                    a.push(t)
                }
                var l;
                return a.push(t.loadGeometries(r)),
                Promise.all(a).then((function(s) {
                    const a = s.slice(0, s.length - 1)
                      , l = s[s.length - 1]
                      , h = [];
                    for (let s = 0, c = l.length; s < c; s++) {
                        const c = l[s]
                          , d = r[s];
                        let u;
                        const m = a[s];
                        if (d.mode === ae || d.mode === le || d.mode === he || void 0 === d.mode)
                            u = !0 === n.isSkinnedMesh ? new i.TUv(c,m) : new i.Kj0(c,m),
                            !0 !== u.isSkinnedMesh || u.geometry.attributes.skinWeight.normalized || u.normalizeSkinWeights(),
                            d.mode === le ? u.geometry = Ae(u.geometry, i.UlW) : d.mode === he && (u.geometry = Ae(u.geometry, i.z$h));
                        else if (d.mode === oe)
                            u = new i.ejS(c,m);
                        else if (d.mode === re)
                            u = new i.x12(c,m);
                        else if (d.mode === ne)
                            u = new i.blk(c,m);
                        else {
                            if (d.mode !== ie)
                                throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + d.mode);
                            u = new i.woe(c,m)
                        }
                        Object.keys(u.geometry.morphAttributes).length > 0 && be(u, n),
                        u.name = t.createUniqueName(n.name || "mesh_" + e),
                        we(u, n),
                        d.extensions && Pe(o, u, d),
                        t.assignFinalMaterial(u),
                        h.push(u)
                    }
                    for (let s = 0, i = h.length; s < i; s++)
                        t.associations.set(h[s], {
                            meshes: e,
                            primitives: s
                        });
                    if (1 === h.length)
                        return h[0];
                    const c = new i.ZAu;
                    t.associations.set(c, {
                        meshes: e
                    });
                    for (let e = 0, t = h.length; e < t; e++)
                        c.add(h[e]);
                    return c
                }
                ))
            }
            loadCamera(e) {
                let t;
                const s = this.json.cameras[e]
                  , o = s[s.type];
                if (o)
                    return "perspective" === s.type ? t = new i.cPb(i.M8C.radToDeg(o.yfov),o.aspectRatio || 1,o.znear || 1,o.zfar || 2e6) : "orthographic" === s.type && (t = new i.iKG(-o.xmag,o.xmag,o.ymag,-o.ymag,o.znear,o.zfar)),
                    s.name && (t.name = this.createUniqueName(s.name)),
                    we(t, s),
                    Promise.resolve(t);
                console.warn("THREE.GLTFLoader: Missing camera parameters.")
            }
            loadSkin(e) {
                const t = this.json.skins[e]
                  , s = {
                    joints: t.joints
                };
                return void 0 === t.inverseBindMatrices ? Promise.resolve(s) : this.getDependency("accessor", t.inverseBindMatrices).then((function(e) {
                    return s.inverseBindMatrices = e,
                    s
                }
                ))
            }
            loadAnimation(e) {
                const t = this.json.animations[e]
                  , s = []
                  , o = []
                  , n = []
                  , r = []
                  , a = [];
                for (let e = 0, i = t.channels.length; e < i; e++) {
                    const i = t.channels[e]
                      , l = t.samplers[i.sampler]
                      , h = i.target
                      , c = void 0 !== h.node ? h.node : h.id
                      , d = void 0 !== t.parameters ? t.parameters[l.input] : l.input
                      , u = void 0 !== t.parameters ? t.parameters[l.output] : l.output;
                    s.push(this.getDependency("node", c)),
                    o.push(this.getDependency("accessor", d)),
                    n.push(this.getDependency("accessor", u)),
                    r.push(l),
                    a.push(h)
                }
                return Promise.all([Promise.all(s), Promise.all(o), Promise.all(n), Promise.all(r), Promise.all(a)]).then((function(s) {
                    const o = s[0]
                      , n = s[1]
                      , r = s[2]
                      , a = s[3]
                      , l = s[4]
                      , h = [];
                    for (let e = 0, t = o.length; e < t; e++) {
                        const t = o[e]
                          , s = n[e]
                          , c = r[e]
                          , d = a[e]
                          , u = l[e];
                        if (void 0 === t)
                            continue;
                        let m;
                        switch (t.updateMatrix(),
                        ge[u.path]) {
                        case ge.weights:
                            m = i.dUE;
                            break;
                        case ge.rotation:
                            m = i.iLg;
                            break;
                        default:
                            m = i.yC1
                        }
                        const p = t.name ? t.name : t.uuid
                          , g = void 0 !== d.interpolation ? fe[d.interpolation] : i.NMF
                          , f = [];
                        ge[u.path] === ge.weights ? t.traverse((function(e) {
                            e.morphTargetInfluences && f.push(e.name ? e.name : e.uuid)
                        }
                        )) : f.push(p);
                        let v = c.array;
                        if (c.normalized) {
                            const e = Me(v.constructor)
                              , t = new Float32Array(v.length);
                            for (let s = 0, i = v.length; s < i; s++)
                                t[s] = v[s] * e;
                            v = t
                        }
                        for (let e = 0, t = f.length; e < t; e++) {
                            const t = new m(f[e] + "." + ge[u.path],s.array,v,g);
                            "CUBICSPLINE" === d.interpolation && (t.createInterpolant = function(e) {
                                return new (this instanceof i.iLg ? se : ee)(this.times,this.values,this.getValueSize() / 3,e)
                            }
                            ,
                            t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0),
                            h.push(t)
                        }
                    }
                    const c = t.name ? t.name : "animation_" + e;
                    return new i.m7l(c,void 0,h)
                }
                ))
            }
            createNodeMesh(e) {
                const t = this.json
                  , s = this
                  , i = t.nodes[e];
                return void 0 === i.mesh ? null : s.getDependency("mesh", i.mesh).then((function(e) {
                    const t = s._getNodeRef(s.meshCache, i.mesh, e);
                    return void 0 !== i.weights && t.traverse((function(e) {
                        if (e.isMesh)
                            for (let t = 0, s = i.weights.length; t < s; t++)
                                e.morphTargetInfluences[t] = i.weights[t]
                    }
                    )),
                    t
                }
                ))
            }
            loadNode(e) {
                const t = this.json
                  , s = this.extensions
                  , o = this
                  , n = t.nodes[e]
                  , r = n.name ? o.createUniqueName(n.name) : "";
                return function() {
                    const t = []
                      , s = o._invokeOne((function(t) {
                        return t.createNodeMesh && t.createNodeMesh(e)
                    }
                    ));
                    return s && t.push(s),
                    void 0 !== n.camera && t.push(o.getDependency("camera", n.camera).then((function(e) {
                        return o._getNodeRef(o.cameraCache, n.camera, e)
                    }
                    ))),
                    o._invokeAll((function(t) {
                        return t.createNodeAttachment && t.createNodeAttachment(e)
                    }
                    )).forEach((function(e) {
                        t.push(e)
                    }
                    )),
                    Promise.all(t)
                }().then((function(t) {
                    let a;
                    if (a = !0 === n.isBone ? new i.N$j : t.length > 1 ? new i.ZAu : 1 === t.length ? t[0] : new i.Tme,
                    a !== t[0])
                        for (let e = 0, s = t.length; e < s; e++)
                            a.add(t[e]);
                    if (n.name && (a.userData.name = n.name,
                    a.name = r),
                    we(a, n),
                    n.extensions && Pe(s, a, n),
                    void 0 !== n.matrix) {
                        const e = new i.yGw;
                        e.fromArray(n.matrix),
                        a.applyMatrix4(e)
                    } else
                        void 0 !== n.translation && a.position.fromArray(n.translation),
                        void 0 !== n.rotation && a.quaternion.fromArray(n.rotation),
                        void 0 !== n.scale && a.scale.fromArray(n.scale);
                    return o.associations.has(a) || o.associations.set(a, {}),
                    o.associations.get(a).nodes = e,
                    a
                }
                ))
            }
            loadScene(e) {
                const t = this.json
                  , s = this.extensions
                  , o = this.json.scenes[e]
                  , n = this
                  , r = new i.ZAu;
                o.name && (r.name = n.createUniqueName(o.name)),
                we(r, o),
                o.extensions && Pe(s, r, o);
                const a = o.nodes || []
                  , l = [];
                for (let e = 0, s = a.length; e < s; e++)
                    l.push(_e(a[e], r, t, n));
                return Promise.all(l).then((function() {
                    return n.associations = (e=>{
                        const t = new Map;
                        for (const [e,s] of n.associations)
                            (e instanceof i.F5T || e instanceof i.xEZ) && t.set(e, s);
                        return e.traverse((e=>{
                            const s = n.associations.get(e);
                            null != s && t.set(e, s)
                        }
                        )),
                        t
                    }
                    )(r),
                    r
                }
                ))
            }
        }
        function _e(e, t, s, o) {
            const n = s.nodes[e];
            return o.getDependency("node", e).then((function(e) {
                if (void 0 === n.skin)
                    return e;
                let t;
                return o.getDependency("skin", n.skin).then((function(e) {
                    t = e;
                    const s = [];
                    for (let e = 0, i = t.joints.length; e < i; e++)
                        s.push(o.getDependency("node", t.joints[e]));
                    return Promise.all(s)
                }
                )).then((function(s) {
                    return e.traverse((function(e) {
                        if (!e.isMesh)
                            return;
                        const o = []
                          , n = [];
                        for (let e = 0, r = s.length; e < r; e++) {
                            const r = s[e];
                            if (r) {
                                o.push(r);
                                const s = new i.yGw;
                                void 0 !== t.inverseBindMatrices && s.fromArray(t.inverseBindMatrices.array, 16 * e),
                                n.push(s)
                            } else
                                console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', t.joints[e])
                        }
                        e.bind(new i.OdW(o,n), e.matrixWorld)
                    }
                    )),
                    e
                }
                ))
            }
            )).then((function(e) {
                t.add(e);
                const i = [];
                if (n.children) {
                    const t = n.children;
                    for (let n = 0, r = t.length; n < r; n++) {
                        const r = t[n];
                        i.push(_e(r, e, s, o))
                    }
                }
                return Promise.all(i)
            }
            ))
        }
        function je(e, t, s) {
            const o = t.attributes
              , n = [];
            function r(t, i) {
                return s.getDependency("accessor", t).then((function(t) {
                    e.setAttribute(i, t)
                }
                ))
            }
            for (const t in o) {
                const s = pe[t] || t.toLowerCase();
                s in e.attributes || n.push(r(o[t], s))
            }
            if (void 0 !== t.indices && !e.index) {
                const i = s.getDependency("accessor", t.indices).then((function(t) {
                    e.setIndex(t)
                }
                ));
                n.push(i)
            }
            return we(e, t),
            function(e, t, s) {
                const o = t.attributes
                  , n = new i.ZzF;
                if (void 0 === o.POSITION)
                    return;
                {
                    const e = s.json.accessors[o.POSITION]
                      , t = e.min
                      , r = e.max;
                    if (void 0 === t || void 0 === r)
                        return void console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
                    if (n.set(new i.Pa4(t[0],t[1],t[2]), new i.Pa4(r[0],r[1],r[2])),
                    e.normalized) {
                        const t = Me(ce[e.componentType]);
                        n.min.multiplyScalar(t),
                        n.max.multiplyScalar(t)
                    }
                }
                const r = t.targets;
                if (void 0 !== r) {
                    const e = new i.Pa4
                      , t = new i.Pa4;
                    for (let i = 0, o = r.length; i < o; i++) {
                        const o = r[i];
                        if (void 0 !== o.POSITION) {
                            const i = s.json.accessors[o.POSITION]
                              , n = i.min
                              , r = i.max;
                            if (void 0 !== n && void 0 !== r) {
                                if (t.setX(Math.max(Math.abs(n[0]), Math.abs(r[0]))),
                                t.setY(Math.max(Math.abs(n[1]), Math.abs(r[1]))),
                                t.setZ(Math.max(Math.abs(n[2]), Math.abs(r[2]))),
                                i.normalized) {
                                    const e = Me(ce[i.componentType]);
                                    t.multiplyScalar(e)
                                }
                                e.max(t)
                            } else
                                console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")
                        }
                    }
                    n.expandByVector(e)
                }
                e.boundingBox = n;
                const a = new i.aLr;
                n.getCenter(a.center),
                a.radius = n.min.distanceTo(n.max) / 2,
                e.boundingSphere = a
            }(e, t, s),
            Promise.all(n).then((function() {
                return void 0 !== t.targets ? function(e, t, s) {
                    let i = !1
                      , o = !1
                      , n = !1;
                    for (let e = 0, s = t.length; e < s; e++) {
                        const s = t[e];
                        if (void 0 !== s.POSITION && (i = !0),
                        void 0 !== s.NORMAL && (o = !0),
                        void 0 !== s.COLOR_0 && (n = !0),
                        i && o && n)
                            break
                    }
                    if (!i && !o && !n)
                        return Promise.resolve(e);
                    const r = []
                      , a = []
                      , l = [];
                    for (let h = 0, c = t.length; h < c; h++) {
                        const c = t[h];
                        if (i) {
                            const t = void 0 !== c.POSITION ? s.getDependency("accessor", c.POSITION) : e.attributes.position;
                            r.push(t)
                        }
                        if (o) {
                            const t = void 0 !== c.NORMAL ? s.getDependency("accessor", c.NORMAL) : e.attributes.normal;
                            a.push(t)
                        }
                        if (n) {
                            const t = void 0 !== c.COLOR_0 ? s.getDependency("accessor", c.COLOR_0) : e.attributes.color;
                            l.push(t)
                        }
                    }
                    return Promise.all([Promise.all(r), Promise.all(a), Promise.all(l)]).then((function(t) {
                        const s = t[0]
                          , r = t[1]
                          , a = t[2];
                        return i && (e.morphAttributes.position = s),
                        o && (e.morphAttributes.normal = r),
                        n && (e.morphAttributes.color = a),
                        e.morphTargetsRelative = !0,
                        e
                    }
                    ))
                }(e, t.targets, s) : e
            }
            ))
        }
        function Ae(e, t) {
            let s = e.getIndex();
            if (null === s) {
                const t = []
                  , i = e.getAttribute("position");
                if (void 0 === i)
                    return console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),
                    e;
                for (let e = 0; e < i.count; e++)
                    t.push(e);
                e.setIndex(t),
                s = e.getIndex()
            }
            const o = s.count - 2
              , n = [];
            if (t === i.z$h)
                for (let e = 1; e <= o; e++)
                    n.push(s.getX(0)),
                    n.push(s.getX(e)),
                    n.push(s.getX(e + 1));
            else
                for (let e = 0; e < o; e++)
                    e % 2 == 0 ? (n.push(s.getX(e)),
                    n.push(s.getX(e + 1)),
                    n.push(s.getX(e + 2))) : (n.push(s.getX(e + 2)),
                    n.push(s.getX(e + 1)),
                    n.push(s.getX(e)));
            n.length / 3 !== o && console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
            const r = e.clone();
            return r.setIndex(n),
            r
        }
        var Le = s(5479)
          , Ee = s(7150);
        const {read: Ie, KHR_DF_FLAG_ALPHA_PREMULTIPLIED: Re, KHR_DF_TRANSFER_SRGB: Oe, VK_FORMAT_UNDEFINED: ke, VK_FORMAT_R16_SFLOAT: Fe, VK_FORMAT_R16G16_SFLOAT: De, VK_FORMAT_R16G16B16A16_SFLOAT: Ge, VK_FORMAT_R32_SFLOAT: ze, VK_FORMAT_R32G32_SFLOAT: He, VK_FORMAT_R32G32B32A32_SFLOAT: Ue, VK_FORMAT_R8_SRGB: Be, VK_FORMAT_R8_UNORM: Ne, VK_FORMAT_R8G8_SRGB: We, VK_FORMAT_R8G8_UNORM: Ze, VK_FORMAT_R8G8B8A8_SRGB: qe, VK_FORMAT_R8G8B8A8_UNORM: Ve} = Ee
          , Ye = new WeakMap;
        let Ke = 0;
        class Xe extends i.aNw {
            constructor(e) {
                super(e),
                this.transcoderPath = "",
                this.transcoderBinary = null,
                this.transcoderPending = null,
                this.workerPool = new Le.h,
                this.workerSourceURL = "",
                this.workerConfig = null,
                "undefined" != typeof MSC_TRANSCODER && console.warn('THREE.KTX2Loader: Please update to latest "basis_transcoder". "msc_basis_transcoder" is no longer supported in three.js r125+.')
            }
            setTranscoderPath(e) {
                return this.transcoderPath = e,
                this
            }
            setWorkerLimit(e) {
                return this.workerPool.setWorkerLimit(e),
                this
            }
            detectSupport(e) {
                return this.workerConfig = {
                    astcSupported: e.extensions.has("WEBGL_compressed_texture_astc"),
                    etc1Supported: e.extensions.has("WEBGL_compressed_texture_etc1"),
                    etc2Supported: e.extensions.has("WEBGL_compressed_texture_etc"),
                    dxtSupported: e.extensions.has("WEBGL_compressed_texture_s3tc"),
                    bptcSupported: e.extensions.has("EXT_texture_compression_bptc"),
                    pvrtcSupported: e.extensions.has("WEBGL_compressed_texture_pvrtc") || e.extensions.has("WEBKIT_WEBGL_compressed_texture_pvrtc")
                },
                e.capabilities.isWebGL2 && (this.workerConfig.etc1Supported = !1),
                this
            }
            init() {
                if (!this.transcoderPending) {
                    const e = new M(this.manager);
                    e.setPath(this.transcoderPath),
                    e.setWithCredentials(this.withCredentials);
                    const t = e.loadAsync("basis_transcoder.js")
                      , s = new M(this.manager);
                    s.setPath(this.transcoderPath),
                    s.setResponseType("arraybuffer"),
                    s.setWithCredentials(this.withCredentials);
                    const i = s.loadAsync("basis_transcoder.wasm");
                    this.transcoderPending = Promise.all([t, i]).then((([e,t])=>{
                        const s = Xe.BasisWorker.toString()
                          , i = ["/* constants */", "let _EngineFormat = " + JSON.stringify(Xe.EngineFormat), "let _TranscoderFormat = " + JSON.stringify(Xe.TranscoderFormat), "let _BasisFormat = " + JSON.stringify(Xe.BasisFormat), "/* basis_transcoder.js */", e, "/* worker */", s.substring(s.indexOf("{") + 1, s.lastIndexOf("}"))].join("\n");
                        this.workerSourceURL = URL.createObjectURL(new Blob([i])),
                        this.transcoderBinary = t,
                        this.workerPool.setWorkerCreator((()=>{
                            const e = new Worker(this.workerSourceURL)
                              , t = this.transcoderBinary.slice(0);
                            return e.postMessage({
                                type: "init",
                                config: this.workerConfig,
                                transcoderBinary: t
                            }, [t]),
                            e
                        }
                        ))
                    }
                    )),
                    Ke > 0 && console.warn("THREE.KTX2Loader: Multiple active KTX2 loaders may cause performance issues. Use a single KTX2Loader instance, or call .dispose() on old instances."),
                    Ke++
                }
                return this.transcoderPending
            }
            load(e, t, s, i) {
                if (null === this.workerConfig)
                    throw new Error("THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`.");
                const o = new M(this.manager);
                o.setResponseType("arraybuffer"),
                o.setWithCredentials(this.withCredentials),
                o.load(e, (e=>{
                    if (Ye.has(e)) {
                        return Ye.get(e).promise.then(t).catch(i)
                    }
                    this._createTexture(e).then((e=>t ? t(e) : null)).catch(i)
                }
                ), s, i)
            }
            _createTextureFrom(e) {
                const {mipmaps: t, width: s, height: o, format: n, type: r, error: a, dfdTransferFn: l, dfdFlags: h} = e;
                if ("error" === r)
                    return Promise.reject(a);
                const c = new i.EB7(t,s,o,n,i.ywz);
                return c.minFilter = 1 === t.length ? i.wem : i.D1R,
                c.magFilter = i.wem,
                c.generateMipmaps = !1,
                c.needsUpdate = !0,
                c.encoding = l === Oe ? i.knz : i.rnI,
                c.premultiplyAlpha = !!(h & Re),
                c
            }
            _createTexture(e, t={}) {
                const s = Ie(new Uint8Array(e));
                if (s.vkFormat !== ke)
                    return function(e) {
                        const {vkFormat: t, pixelWidth: s, pixelHeight: o, pixelDepth: n} = e;
                        if (void 0 === $e[t])
                            throw new Error("THREE.KTX2Loader: Unsupported vkFormat.");
                        let r;
                        const a = e.levels[0].levelData;
                        r = Qe[t] === i.VzW ? new Float32Array(a.buffer,a.byteOffset,a.byteLength / Float32Array.BYTES_PER_ELEMENT) : Qe[t] === i.cLu ? new Uint16Array(a.buffer,a.byteOffset,a.byteLength / Uint16Array.BYTES_PER_ELEMENT) : a;
                        const l = 0 === n ? new i.IEO(r,s,o) : new i.JUT(r,s,o,n);
                        return l.type = Qe[t],
                        l.format = $e[t],
                        l.encoding = Je[t] || i.rnI,
                        l.needsUpdate = !0,
                        Promise.resolve(l)
                    }(s);
                const o = t
                  , n = this.init().then((()=>this.workerPool.postMessage({
                    type: "transcode",
                    buffer: e,
                    taskConfig: o
                }, [e]))).then((e=>this._createTextureFrom(e.data)));
                return Ye.set(e, {
                    promise: n
                }),
                n
            }
            dispose() {
                return this.workerPool.dispose(),
                this.workerSourceURL && URL.revokeObjectURL(this.workerSourceURL),
                Ke--,
                this
            }
        }
        Xe.BasisFormat = {
            ETC1S: 0,
            UASTC_4x4: 1
        },
        Xe.TranscoderFormat = {
            ETC1: 0,
            ETC2: 1,
            BC1: 2,
            BC3: 3,
            BC4: 4,
            BC5: 5,
            BC7_M6_OPAQUE_ONLY: 6,
            BC7_M5: 7,
            PVRTC1_4_RGB: 8,
            PVRTC1_4_RGBA: 9,
            ASTC_4x4: 10,
            ATC_RGB: 11,
            ATC_RGBA_INTERPOLATED_ALPHA: 12,
            RGBA32: 13,
            RGB565: 14,
            BGR565: 15,
            RGBA4444: 16
        },
        Xe.EngineFormat = {
            RGBAFormat: i.wk1,
            RGBA_ASTC_4x4_Format: i.ptH,
            RGBA_BPTC_Format: i.bsb,
            RGBA_ETC2_EAC_Format: i.ekQ,
            RGBA_PVRTC_4BPPV1_Format: i.eaV,
            RGBA_S3TC_DXT5_Format: i.ILR,
            RGB_ETC1_Format: i.fto,
            RGB_ETC2_Format: i.l0P,
            RGB_PVRTC_4BPPV1_Format: i._AM,
            RGB_S3TC_DXT1_Format: i.wuA
        },
        Xe.BasisWorker = function() {
            let e, t, s;
            const i = _EngineFormat
              , o = _TranscoderFormat
              , n = _BasisFormat;
            self.addEventListener("message", (function(r) {
                const c = r.data;
                switch (c.type) {
                case "init":
                    e = c.config,
                    d = c.transcoderBinary,
                    t = new Promise((e=>{
                        s = {
                            wasmBinary: d,
                            onRuntimeInitialized: e
                        },
                        BASIS(s)
                    }
                    )).then((()=>{
                        s.initializeBasis(),
                        void 0 === s.KTX2File && console.warn("THREE.KTX2Loader: Please update Basis Universal transcoder.")
                    }
                    ));
                    break;
                case "transcode":
                    t.then((()=>{
                        try {
                            const {width: t, height: r, hasAlpha: d, mipmaps: u, format: m, dfdTransferFn: p, dfdFlags: g} = function(t) {
                                const r = new s.KTX2File(new Uint8Array(t));
                                function c() {
                                    r.close(),
                                    r.delete()
                                }
                                if (!r.isValid())
                                    throw c(),
                                    new Error("THREE.KTX2Loader:\tInvalid or unsupported .ktx2 file");
                                const d = r.isUASTC() ? n.UASTC_4x4 : n.ETC1S
                                  , u = r.getWidth()
                                  , m = r.getHeight()
                                  , p = r.getLevels()
                                  , g = r.getHasAlpha()
                                  , f = r.getDFDTransferFunc()
                                  , v = r.getDFDFlags()
                                  , {transcoderFormat: x, engineFormat: y} = function(t, s, r, c) {
                                    let d, u;
                                    const m = t === n.ETC1S ? a : l;
                                    for (let i = 0; i < m.length; i++) {
                                        const o = m[i];
                                        if (e[o.if] && (o.basisFormat.includes(t) && !(c && o.transcoderFormat.length < 2) && (!o.needsPowerOfTwo || h(s) && h(r))))
                                            return d = o.transcoderFormat[c ? 1 : 0],
                                            u = o.engineFormat[c ? 1 : 0],
                                            {
                                                transcoderFormat: d,
                                                engineFormat: u
                                            }
                                    }
                                    return console.warn("THREE.KTX2Loader: No suitable compressed texture format found. Decoding to RGBA32."),
                                    d = o.RGBA32,
                                    u = i.RGBAFormat,
                                    {
                                        transcoderFormat: d,
                                        engineFormat: u
                                    }
                                }(d, u, m, g);
                                if (!u || !m || !p)
                                    throw c(),
                                    new Error("THREE.KTX2Loader:\tInvalid texture");
                                if (!r.startTranscoding())
                                    throw c(),
                                    new Error("THREE.KTX2Loader: .startTranscoding failed");
                                const P = [];
                                for (let e = 0; e < p; e++) {
                                    const t = r.getImageLevelInfo(e, 0, 0)
                                      , s = t.origWidth
                                      , i = t.origHeight
                                      , o = new Uint8Array(r.getImageTranscodedSizeInBytes(e, 0, 0, x));
                                    if (!r.transcodeImage(o, e, 0, 0, x, 0, -1, -1))
                                        throw c(),
                                        new Error("THREE.KTX2Loader: .transcodeImage failed.");
                                    P.push({
                                        data: o,
                                        width: s,
                                        height: i
                                    })
                                }
                                return c(),
                                {
                                    width: u,
                                    height: m,
                                    hasAlpha: g,
                                    mipmaps: P,
                                    format: y,
                                    dfdTransferFn: f,
                                    dfdFlags: v
                                }
                            }(c.buffer)
                              , f = [];
                            for (let e = 0; e < u.length; ++e)
                                f.push(u[e].data.buffer);
                            self.postMessage({
                                type: "transcode",
                                id: c.id,
                                width: t,
                                height: r,
                                hasAlpha: d,
                                mipmaps: u,
                                format: m,
                                dfdTransferFn: p,
                                dfdFlags: g
                            }, f)
                        } catch (e) {
                            console.error(e),
                            self.postMessage({
                                type: "error",
                                id: c.id,
                                error: e.message
                            })
                        }
                    }
                    ))
                }
                var d
            }
            ));
            const r = [{
                if: "astcSupported",
                basisFormat: [n.UASTC_4x4],
                transcoderFormat: [o.ASTC_4x4, o.ASTC_4x4],
                engineFormat: [i.RGBA_ASTC_4x4_Format, i.RGBA_ASTC_4x4_Format],
                priorityETC1S: 1 / 0,
                priorityUASTC: 1,
                needsPowerOfTwo: !1
            }, {
                if: "bptcSupported",
                basisFormat: [n.ETC1S, n.UASTC_4x4],
                transcoderFormat: [o.BC7_M5, o.BC7_M5],
                engineFormat: [i.RGBA_BPTC_Format, i.RGBA_BPTC_Format],
                priorityETC1S: 3,
                priorityUASTC: 2,
                needsPowerOfTwo: !1
            }, {
                if: "dxtSupported",
                basisFormat: [n.ETC1S, n.UASTC_4x4],
                transcoderFormat: [o.BC1, o.BC3],
                engineFormat: [i.RGB_S3TC_DXT1_Format, i.RGBA_S3TC_DXT5_Format],
                priorityETC1S: 4,
                priorityUASTC: 5,
                needsPowerOfTwo: !1
            }, {
                if: "etc2Supported",
                basisFormat: [n.ETC1S, n.UASTC_4x4],
                transcoderFormat: [o.ETC1, o.ETC2],
                engineFormat: [i.RGB_ETC2_Format, i.RGBA_ETC2_EAC_Format],
                priorityETC1S: 1,
                priorityUASTC: 3,
                needsPowerOfTwo: !1
            }, {
                if: "etc1Supported",
                basisFormat: [n.ETC1S, n.UASTC_4x4],
                transcoderFormat: [o.ETC1],
                engineFormat: [i.RGB_ETC1_Format],
                priorityETC1S: 2,
                priorityUASTC: 4,
                needsPowerOfTwo: !1
            }, {
                if: "pvrtcSupported",
                basisFormat: [n.ETC1S, n.UASTC_4x4],
                transcoderFormat: [o.PVRTC1_4_RGB, o.PVRTC1_4_RGBA],
                engineFormat: [i.RGB_PVRTC_4BPPV1_Format, i.RGBA_PVRTC_4BPPV1_Format],
                priorityETC1S: 5,
                priorityUASTC: 6,
                needsPowerOfTwo: !0
            }]
              , a = r.sort((function(e, t) {
                return e.priorityETC1S - t.priorityETC1S
            }
            ))
              , l = r.sort((function(e, t) {
                return e.priorityUASTC - t.priorityUASTC
            }
            ));
            function h(e) {
                return e <= 2 || 0 == (e & e - 1) && 0 !== e
            }
        }
        ;
        const $e = {
            [Ue]: i.wk1,
            [Ge]: i.wk1,
            [Ve]: i.wk1,
            [qe]: i.wk1,
            [He]: i.av9,
            [De]: i.av9,
            [Ze]: i.av9,
            [We]: i.av9,
            [ze]: i.hEm,
            [Fe]: i.hEm,
            [Be]: i.hEm,
            [Ne]: i.hEm
        }
          , Qe = {
            [Ue]: i.VzW,
            [Ge]: i.cLu,
            [Ve]: i.ywz,
            [qe]: i.ywz,
            [He]: i.VzW,
            [De]: i.cLu,
            [Ze]: i.ywz,
            [We]: i.ywz,
            [ze]: i.VzW,
            [Fe]: i.cLu,
            [Be]: i.ywz,
            [Ne]: i.ywz
        }
          , Je = {
            [qe]: i.knz,
            [We]: i.knz,
            [Be]: i.knz
        };
        function et(e, t, s) {
            return t in e ? Object.defineProperty(e, t, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = s,
            e
        }
        class tt {
            constructor({name: e="AssetLoader", progressEventName: t="AssetsProgress"}={}) {
                et(this, "load", (({element: e=document.body, progress: t=!0}={})=>{
                    e && (this.element = e,
                    this.addFonts(),
                    this.addMedia());
                    let s = 0;
                    if (t)
                        for (let e = 0; e < this.promisesToLoad.length; e++)
                            this.promisesToLoad[e].then((()=>{
                                s++,
                                this.progressCallback(100 * s / this.promisesToLoad.length)
                            }
                            ));
                    return this.loaded = new Promise((e=>{
                        Promise.all(this.promisesToLoad).then((()=>{
                            this.reset(),
                            n.emit(`${this.name}:beforeResolve`),
                            e(),
                            n.emit(`${this.name}:afterResolve`)
                        }
                        ))
                    }
                    )),
                    this.loaded
                }
                )),
                et(this, "progressCallback", (e=>{
                    n.emit(this.progressEventName, {
                        percent: Math.ceil(e)
                    })
                }
                )),
                et(this, "add", (e=>(this.promisesToLoad.push(e),
                e))),
                et(this, "addMedia", (()=>{
                    const e = this.element.querySelectorAll('img:not([lazy="full"])');
                    for (let t = 0; t < e.length; t++)
                        this.addImage(e[t]);
                    const t = this.element.querySelectorAll("video");
                    for (let e = 0; e < t.length; e++)
                        this.add(new Promise((s=>{
                            const i = t[e].muted;
                            t[e].muted = !0,
                            t[e].crossOrigin = "",
                            t[e].addEventListener("loadeddata", (()=>{
                                t[e].addEventListener("timeupdate", (()=>{
                                    !o.isTouch && t[e].getAttribute("dom2webgl") && t[e].pause(),
                                    s(),
                                    t[e].currentTime = 0,
                                    t[e].muted = i
                                }
                                ), {
                                    once: !0
                                })
                            }
                            ), {
                                once: !0
                            }),
                            t[e].addEventListener("error", s),
                            o.isIOS && t[e].addEventListener("suspend", s),
                            "" === t[e].src && t[e].dataset.src && (t[e].src = t[e].dataset.src),
                            t[e].load(),
                            t[e].play().catch((e=>{
                                console.error(e),
                                s()
                            }
                            ))
                        }
                        )))
                }
                )),
                et(this, "addFonts", (()=>{
                    document.fonts && this.add(document.fonts.ready),
                    !this.fontsLoaded && window.Typekit && this.add(new Promise((e=>{
                        window.Typekit.load({
                            active: ()=>{
                                this.fontsLoaded = !0,
                                e()
                            }
                        })
                    }
                    )))
                }
                )),
                et(this, "loadJson", (e=>(this.jsons[e] || (this.jsons[e] = this.add(new Promise(((t,s)=>{
                    fetch(e, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then((s=>{
                        if (!s.ok)
                            throw new Error("Network response was not ok for request: ",e);
                        t(s.json())
                    }
                    ), s)
                }
                )))),
                this.jsons[e]))),
                et(this, "loadGltf", (e=>(this.gltfs[e] || (this.gltfs[e] = this.add(new Promise(((t,s)=>{
                    this.gltfLoader.load(e, (e=>{
                        t(e)
                    }
                    ), void 0, (t=>{
                        console.error(t, e),
                        s(t)
                    }
                    ))
                }
                )))),
                this.gltfs[e]))),
                et(this, "loadTexture", ((e,t)=>(this.textures[e] || (this.textures[e] = this.add(new Promise(((s,i)=>{
                    this.textureLoader.load(e, (e=>{
                        s(o.Gl.generateTexture(e, t))
                    }
                    ), void 0, (t=>{
                        console.error(t, e),
                        i(t)
                    }
                    ))
                }
                )))),
                this.textures[e]))),
                et(this, "reset", (()=>{
                    this.promisesToLoad = []
                }
                )),
                this.promisesToLoad = [],
                this.fontsLoaded = !1,
                this.loaded = !1,
                this.name = e,
                this.progressEventName = t,
                this.jsons = {},
                this.gltfs = {},
                this.textures = {},
                this.ktxTextures = {},
                this.textureLoader = new i.dpR,
                this.ktxLoader = new Xe,
                this.ktxLoader.setTranscoderPath(`${o.assetsUrl}basis/`),
                this.gltfLoader = new A,
                this.dracoLoader = new _,
                this.dracoLoader.setDecoderPath(`${o.assetsUrl}draco/`),
                this.gltfLoader.setDRACOLoader(this.dracoLoader)
            }
            addImage(e) {
                return this.add(new Promise((t=>{
                    e.complete && 0 !== e.naturalWidth ? t(e) : (e.addEventListener("load", (()=>{
                        t(e)
                    }
                    )),
                    e.addEventListener("error", (()=>{
                        t(e)
                    }
                    )))
                }
                )))
            }
            loadKtxTexture(e, t) {
                return this.ktxTextures[e] || (this.ktxTextures[e] = this.add(new Promise(((s,i)=>{
                    this.ktxLoader.load(e, (e=>{
                        s(o.Gl.generateTexture(e, t, !0))
                    }
                    ), void 0, (t=>{
                        console.error(t, null == t ? void 0 : t.name, null == t ? void 0 : t.stack, null == t ? void 0 : t.message, null == t ? void 0 : t.cause, e),
                        console.dir(t),
                        i(t)
                    }
                    ))
                }
                )))),
                this.ktxTextures[e]
            }
        }
        var st = "#define GLSLIFY 1\nvarying vec2 vUv;\n\nvoid main () {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1 );\n}"
          , it = s(8606)
          , ot = s(7531)
          , nt = s(9240)
          , rt = s(185);
        class at {
            constructor(e) {
                this.array = [],
                this.sourceArray = e || []
            }
            add(e, t) {
                this.array.push({
                    index: t,
                    item: e
                }),
                this.array.sort(this.sort),
                this.updateSourceArray()
            }
            remove(e) {
                for (let t = 0; t < this.array.length; t++)
                    this.array[t].item === e && this.array.splice(t, 1);
                this.updateSourceArray()
            }
            updateSourceArray() {
                this.sourceArray.length = 0;
                for (let e = 0; e < this.array.length; e++)
                    this.sourceArray[e] = this.array[e].item
            }
            sort(e, t) {
                return e.index > t.index ? 1 : -1
            }
        }
        const lt = new i.Pa4
          , ht = new i._fP
          , ct = new i.Pa4;
        class dt extends i.Tme {
            constructor(e=document.createElement("div")) {
                super(),
                this.isCSS3DObject = !0,
                this.element = e,
                this.element.style.position = "absolute",
                this.element.style.pointerEvents = "auto",
                this.element.style.userSelect = "none",
                this.element.setAttribute("draggable", !1),
                this.addEventListener("removed", (function() {
                    this.traverse((function(e) {
                        e.element instanceof Element && null !== e.element.parentNode && e.element.parentNode.removeChild(e.element)
                    }
                    ))
                }
                ))
            }
            copy(e, t) {
                return super.copy(e, t),
                this.element = e.element.cloneNode(!0),
                this
            }
        }
        const ut = new i.yGw
          , mt = new i.yGw;
        class pt {
            constructor(e={}) {
                const t = this;
                let s, i, o, r;
                t.cache = {
                    camera: {
                        fov: 0,
                        style: ""
                    },
                    objects: new WeakMap
                };
                const a = void 0 !== e.element ? e.element : document.createElement("div");
                a.style.overflow = "hidden",
                this.domElement = a;
                const l = document.createElement("div");
                function h(e) {
                    return Math.abs(e) < 1e-10 ? 0 : e
                }
                function c(e) {
                    const t = e.elements;
                    return "matrix3d(" + h(t[0]) + "," + h(-t[1]) + "," + h(t[2]) + "," + h(t[3]) + "," + h(t[4]) + "," + h(-t[5]) + "," + h(t[6]) + "," + h(t[7]) + "," + h(t[8]) + "," + h(-t[9]) + "," + h(t[10]) + "," + h(t[11]) + "," + h(t[12]) + "," + h(-t[13]) + "," + h(t[14]) + "," + h(t[15]) + ")"
                }
                function d(e) {
                    const t = e.elements;
                    return "translate(-50%,-50%)" + ("matrix3d(" + h(t[0]) + "," + h(t[1]) + "," + h(t[2]) + "," + h(t[3]) + "," + h(-t[4]) + "," + h(-t[5]) + "," + h(-t[6]) + "," + h(-t[7]) + "," + h(t[8]) + "," + h(t[9]) + "," + h(t[10]) + "," + h(t[11]) + "," + h(t[12]) + "," + h(t[13]) + "," + h(t[14]) + "," + h(t[15]) + ")")
                }
                function u(e, s, i, o) {
                    if (e.isCSS3DObject) {
                        const o = !0 === e.visible && !0 === e.layers.test(i.layers);
                        if (e.element.style.display = !0 === o ? "" : "none",
                        !0 === o) {
                            let o;
                            e.onBeforeRender(t, s, i),
                            e.isCSS3DSprite ? (ut.copy(i.matrixWorldInverse),
                            ut.transpose(),
                            0 !== e.rotation2D && ut.multiply(mt.makeRotationZ(e.rotation2D)),
                            e.matrixWorld.decompose(lt, ht, ct),
                            ut.setPosition(lt),
                            ut.scale(ct),
                            ut.elements[3] = 0,
                            ut.elements[7] = 0,
                            ut.elements[11] = 0,
                            ut.elements[15] = 1,
                            o = d(ut)) : o = d(e.matrixWorld);
                            const n = e.element
                              , r = t.cache.objects.get(e);
                            if (void 0 === r || r.style !== o) {
                                n.style.transform = o;
                                const s = {
                                    style: o
                                };
                                t.cache.objects.set(e, s)
                            }
                            n.parentNode !== l && l.appendChild(n),
                            e.onAfterRender(t, s, i)
                        }
                    }
                    for (let t = 0, n = e.children.length; t < n; t++)
                        u(e.children[t], s, i, o)
                }
                l.style.transformStyle = "preserve-3d",
                l.style.pointerEvents = "none",
                a.appendChild(l),
                this.getSize = function() {
                    return {
                        width: s,
                        height: i
                    }
                }
                ,
                this.render = function(e, s) {
                    const i = s.projectionMatrix.elements[5] * r;
                    let d, m;
                    t.cache.camera.fov !== i && (a.style.perspective = s.isPerspectiveCamera ? i + "px" : "",
                    t.cache.camera.fov = i,
                    n.emit("cssrenderer:cacheUpdated")),
                    !0 === e.autoUpdate && e.updateMatrixWorld(),
                    null === s.parent && s.updateMatrixWorld(),
                    s.isOrthographicCamera && (d = -(s.right + s.left) / 2,
                    m = (s.top + s.bottom) / 2);
                    const p = s.isOrthographicCamera ? "scale(" + i + ")translate(" + h(d) + "px," + h(m) + "px)" + c(s.matrixWorldInverse) : "translateZ(" + i + "px)" + c(s.matrixWorldInverse)
                      , g = p + "translate(" + o + "px," + r + "px)";
                    t.cache.camera.style !== g && (l.style.transform = g,
                    t.cache.camera.style = g),
                    u(e, e, s, p)
                }
                ,
                this.setSize = function(e, t) {
                    s = e,
                    i = t,
                    o = s / 2,
                    r = i / 2,
                    a.style.width = e + "px",
                    a.style.height = t + "px",
                    l.style.width = e + "px",
                    l.style.height = t + "px"
                }
            }
        }
        function gt(e) {
            return `${o.assetsUrl}${e}?v=1711462287482`
        }
        let ft, vt, xt;
        const yt = ()=>ft || "undefined" != typeof window && (ft = window.gsap) && ft.registerPlugin && ft
          , Pt = {
            x: "position",
            y: "position",
            z: "position"
        }
          , wt = Math.PI / 180
          , bt = (e,t,s)=>{
            s = !!s,
            e.visible !== s && (e.visible = s,
            e.traverse((e=>{
                e.visible = s
            }
            )))
        }
          , Tt = e=>("string" == typeof e && "=" === e.charAt(1) ? e.substr(0, 2) + parseFloat(e.substr(2)) : e) * wt
          , St = e=>{
            ft = e || yt(),
            ft && (xt = ft.core.PropTween,
            vt = 1)
        }
        ;
        "position,scale,rotation".split(",").forEach((e=>{
            Pt[e + "X"] = Pt[e + "Y"] = Pt[e + "Z"] = e
        }
        ));
        const Mt = {
            version: "3.0.0",
            name: "three",
            register: St,
            init(e, t) {
                let s, i, o, n, r, a;
                for (n in vt || St(),
                t) {
                    if (s = Pt[n],
                    o = t[n],
                    s)
                        r = n.charAt(n.length - 1).toLowerCase(),
                        i = ~r.indexOf("x") ? "x" : ~r.indexOf("z") ? "z" : "y",
                        this.add(e[s], i, e[s][i], ~n.indexOf("rotation") ? Tt(o) : o);
                    else if ("scale" === n)
                        this.add(e[n], "x", e[n].x, o),
                        this.add(e[n], "y", e[n].y, o),
                        this.add(e[n], "z", e[n].z, o);
                    else if ("opacity" === n)
                        for (a = e.material.length ? e.material : [e.material],
                        r = a.length; --r > -1; )
                            a[r].transparent = !0,
                            this.add(a[r], n, a[r][n], o);
                    else
                        "visible" === n ? e.visible !== o && (this._pt = new xt(this._pt,e,n,o ? 0 : 1,o ? 1 : -1,0,0,bt)) : this.add(e, n, e[n], o);
                    this._props.push(n)
                }
            }
        };
        yt() && ft.registerPlugin(Mt);
        class Ct {
            constructor({fragmentShader: e, uniforms: t={}, width: s=32, height: n=32, data: r=!1, count: a, filter: l, wrap: h, type: c, createTexture: d=!0, pingPong: u=!0, autoSwap: m=!0}) {
                a ? (this.width = function(e) {
                    const t = [4, 16, 64, 256, 1024, 2048, 4096, 8192, 16384, 32768, 65536, 131072, 262144]
                      , s = t.reduce(((t,s)=>Math.abs(s - e) < Math.abs(t - e) ? s : t));
                    return s < e ? Math.sqrt(t[t.indexOf(s) + 1]) : Math.sqrt(s)
                }(a),
                this.height = this.width,
                this.count = a) : (this.width = s,
                this.height = n,
                this.count = s * n),
                this.uniforms = t,
                this.renderTargets = {},
                this.texture = null,
                this.createTexture = d,
                this.pingPong = u,
                this.autoSwap = m,
                this.filter = l || i.TyD,
                this.wrap = h || i.uWy,
                this.type = c || i.cLu,
                !1 !== o.Gl.renderer.autoClear && (o.Gl.renderer.autoClear = !1),
                this.scene = new i.xsS,
                this.camera = new i.V1s,
                this.camera.position.z = 1,
                this.buildRenderTargets(),
                this.buildPlane(e),
                this.createTexture && this.buildBaseTexture(r),
                this.buildDebugPlane(),
                this.setFboUv(),
                this.render()
            }
            buildBaseTexture(e) {
                const t = 4 * this.count
                  , s = new Float32Array(this.width * this.height * 4);
                if (e)
                    for (let i = 0; i < t; i += 4)
                        s[i + 0] = e[i + 0],
                        s[i + 1] = e[i + 1],
                        s[i + 2] = e[i + 2],
                        s[i + 3] = e[i + 3];
                else
                    for (let e = 0; e < t; e += 4)
                        s[e + 0] = 0,
                        s[e + 1] = 0,
                        s[e + 2] = 0,
                        s[e + 3] = 1;
                this.baseTexture = new i.IEO(s,this.width,this.height,i.wk1,this.type),
                this.baseTexture.minFilter = this.filter,
                this.baseTexture.magFilter = this.filter,
                this.baseTexture.generateMipmaps = !1,
                this.uniforms.uBaseTexture.value = this.baseTexture,
                this.uniforms.uTexture.value = this.baseTexture
            }
            buildRenderTargets() {
                this.renderTargets.a = new i.dd2(this.width,this.height,{
                    minFilter: this.filter,
                    magFilter: this.filter,
                    wrapS: this.wrap,
                    wrapT: this.wrap,
                    generateMipmaps: !1,
                    format: i.wk1,
                    type: this.type,
                    encoding: i.rnI,
                    depthBuffer: !1,
                    stencilBuffer: !1
                }),
                this.renderTargets.write = this.renderTargets.a,
                this.pingPong && (this.renderTargets.b = this.renderTargets.a.clone(),
                this.renderTargets.read = this.renderTargets.b)
            }
            buildPlane(e) {
                Object.assign(this.uniforms, {
                    uBaseTexture: {
                        value: null
                    },
                    uTexture: {
                        value: null
                    },
                    uTime: o.Gl.globalUniforms.uTime,
                    uDelta: o.Gl.globalUniforms.uDelta,
                    uResolution: {
                        value: new i.FM8(this.width,this.height)
                    },
                    uCellSize: {
                        value: new i.FM8(1 / this.width,1 / this.height)
                    }
                }),
                this.plane = new i.Kj0(new i._12(2,2),new i.jyz({
                    vertexShader: st,
                    fragmentShader: e,
                    uniforms: this.uniforms
                })),
                this.scene.add(this.plane)
            }
            buildDebugPlane() {
                this.debugPlane = new i.Kj0(new i._12,new i.vBJ)
            }
            setFboUv() {
                this.fboUv = {},
                this.fboUv.data = new Float32Array(2 * this.count);
                const e = 1 / this.width / 2
                  , t = 1 / this.height / 2;
                for (let s = 0; s < this.count; s++) {
                    const i = s % this.width / this.width + e
                      , o = Math.floor(s / this.width) / this.height + t;
                    this.fboUv.data[2 * s + 0] = i,
                    this.fboUv.data[2 * s + 1] = o
                }
                this.fboUv.attribute = new i.TlE(this.fboUv.data,2),
                this.fboUv.attributeInstanced = new i.lb7(this.fboUv.data,2)
            }
            render() {
                const e = o.Gl.renderer.getRenderTarget();
                o.Gl.renderer.setRenderTarget(this.renderTargets.write),
                o.Gl.renderer.render(this.scene, this.camera),
                o.Gl.renderer.setRenderTarget(e),
                this.pingPong && this.autoSwap ? this.swap() : this.texture = this.renderTargets.write.texture,
                this.debugPlane.material.map = this.texture
            }
            swap() {
                const e = this.renderTargets.write;
                this.renderTargets.write = this.renderTargets.read,
                this.renderTargets.read = e,
                this.texture = this.renderTargets.read.texture
            }
            update(e=!0) {
                e && (this.pingPong ? this.uniforms.uTexture.value = this.renderTargets.read.texture : this.uniforms.uTexture.value = this.renderTargets.write.texture),
                this.render()
            }
            setSize(e, t) {
                this.renderTargets.a.setSize(e, t),
                this.renderTargets.b && this.renderTargets.b.setSize(e, t),
                this.uniforms.uResolution.value.set(e, t),
                this.uniforms.uCellSize.value.set(1 / e, 1 / t)
            }
            destroy() {
                this.renderTargets.a.dispose(),
                this.renderTargets.b && this.renderTargets.b.dispose(),
                this.uniforms.uTexture.value.dispose(),
                this.baseTexture && this.baseTexture.dispose()
            }
        }
        function _t(e, t, s) {
            return t in e ? Object.defineProperty(e, t, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = s,
            e
        }
        class jt {
            constructor(e={}) {
                _t(this, "onRaf", (()=>{
                    if (this.velocitySim.uniforms.uPrevMouse.value.copy(this.prevMouse),
                    this.pointerMoved) {
                        if (null !== this.options.raycastObject) {
                            this.raycaster.setFromCamera(this.options.raycastPointer, this.options.raycastCamera);
                            const e = this.raycaster.intersectObject(this.options.raycastObject);
                            if (e.length) {
                                this.mousePosTween && this.mousePosTween.isActive() && (this.forcePointer = !1,
                                this.mousePosTween.pause(),
                                this.mousePosTween.kill());
                                const {x: t, y: s} = e[0].uv;
                                -1 === this.prevMouse.x && -1 === this.prevMouse.y && this.prevMouse.set(t, s),
                                this.velocitySim.uniforms.uMouse.value.set(t, s),
                                this.velocitySim.uniforms.uForce.value.set((t - this.prevMouse.x) * this.options.fluid.force, (s - this.prevMouse.y) * this.options.fluid.force),
                                this.options.fluid.forceClamp && this.velocitySim.uniforms.uForce.value.clampScalar(-this.options.fluid.forceClamp, this.options.fluid.forceClamp),
                                this.prevMouse.set(t, s)
                            } else
                                this.velocitySim.uniforms.uMouse.value.set(-1, -1),
                                this.velocitySim.uniforms.uForce.value.set(0, 0),
                                this.prevMouse.set(-1, -1)
                        } else {
                            const {x: e, y: t} = o.mouse.glScreenSpace;
                            -1 === this.prevMouse.x && -1 === this.prevMouse.y && this.prevMouse.set(e, t),
                            this.velocitySim.uniforms.uMouse.value.set(e, t),
                            this.velocitySim.uniforms.uForce.value.set((e - this.prevMouse.x) * this.options.fluid.force, (t - this.prevMouse.y) * this.options.fluid.force),
                            this.options.fluid.forceClamp && this.velocitySim.uniforms.uForce.value.clampScalar(-this.options.fluid.forceClamp, this.options.fluid.forceClamp),
                            this.prevMouse.set(e, t)
                        }
                        this.pointerMoved = !1
                    } else
                        this.forcePointer || (this.velocitySim.uniforms.uMouse.value.set(-1, -1),
                        this.velocitySim.uniforms.uForce.value.set(0, 0),
                        this.prevMouse.set(-1, -1));
                    this.velocitySim.uniforms.uMouseVelocity.value.set((this.velocitySim.uniforms.uMouse.value.x - this.velocitySim.uniforms.uPrevMouse.value.x) / 16, (this.velocitySim.uniforms.uMouse.value.y - this.velocitySim.uniforms.uPrevMouse.value.y) / 16),
                    this.velocitySim.update(),
                    this.divergenceSim.uniforms.uVelocity.value = this.velocitySim.texture,
                    this.divergenceSim.update(),
                    this.pressureSim.uniforms.uDivergence.value = this.divergenceSim.texture;
                    for (let e = 0; e < this.options.fluid.iterations; e++)
                        this.pressureSim.update();
                    this.subtractPressureSim.uniforms.uPressure.value = this.pressureSim.texture,
                    this.subtractPressureSim.uniforms.uVelocity.value = this.velocitySim.texture,
                    this.subtractPressureSim.update(),
                    this.velocitySim.uniforms.uTexture.value = this.subtractPressureSim.texture,
                    this.velocitySim.update(!1)
                }
                )),
                _t(this, "onPointerMove", (()=>{
                    this.pointerMoved = !0
                }
                )),
                _t(this, "tweenMousePos", ((e,t,s,i)=>{
                    this.mousePosTween = l.ZP.fromTo(this.velocitySim.uniforms.uMouse.value, {
                        x: e.x,
                        y: e.y
                    }, {
                        x: t.x,
                        y: t.y,
                        duration: s,
                        ease: i,
                        onStart: ()=>{
                            this.forcePointer = !0
                        }
                        ,
                        onUpdate: ()=>{
                            this.velocitySim.uniforms.uForce.value.set((this.velocitySim.uniforms.uMouse.value.x - this.prevMouse.x) * this.options.fluid.force, (this.velocitySim.uniforms.uMouse.value.y - this.prevMouse.y) * this.options.fluid.force),
                            this.prevMouse.set(this.velocitySim.uniforms.uMouse.value.x, this.velocitySim.uniforms.uMouse.value.y)
                        }
                        ,
                        onComplete: ()=>{
                            this.forcePointer = !1
                        }
                    })
                }
                )),
                this.raycaster = new i.iMs,
                this.prevMouse = new i.FM8,
                this.enabled = !1,
                this.pointerMoved = !1,
                this.forcePointer = !1,
                this.options = {
                    raycastPointer: null,
                    raycastCamera: null,
                    raycastObject: null,
                    fluid: {
                        resolution: 256,
                        force: 50,
                        iterations: 2,
                        mouseRadius: .008,
                        pressure: .999,
                        viscosity: .999,
                        forceClamp: !1
                    }
                },
                Object.assign(this.options, e),
                this.build()
            }
            build() {
                this.velocitySim = new Ct({
                    fragmentShader: "#define GLSLIFY 1\nvarying vec2 vUv;\n\nuniform sampler2D uTexture;\nuniform vec2 uCellSize;\nuniform vec2 uForce;\nuniform vec2 uMouse;\nuniform vec2 uPrevMouse;\nuniform vec2 uMouseVelocity;\nuniform float uMouseRadius;\nuniform float uPressure;\n\nfloat sdLine( vec2 p, vec2 a, vec2 b ){\n\tfloat velocity = clamp(length(uMouseVelocity), 0.5, 1.5);\n\tvec2 pa = p - a, ba = b - a;\n\tfloat h = clamp( dot(pa, ba)/dot(ba, ba), 0.0, 1.0 );\n\treturn length( pa - ba*h ) / velocity;\n}\n\nvoid main() {\n\n    vec4 color = texture2D(uTexture, vUv - texture2D(uTexture, vUv).xy * uCellSize);\n\n    // apply mouse interaction\n    float dir = smoothstep(1. - uMouseRadius, 1., 1.0 - min(sdLine(vUv, uPrevMouse, uMouse), 1.0));\n    vec4 minColor = vec4(-1.);\n    vec4 maxColor = vec4(1.);\n    color = clamp((color + vec4(uForce * dir, 0.0, 1.0)) * uPressure, minColor, maxColor); // blend\n    gl_FragColor = color;\n}",
                    uniforms: {
                        uMouse: {
                            value: new i.FM8(-1,-1)
                        },
                        uPrevMouse: {
                            value: new i.FM8(-1,-1)
                        },
                        uMouseVelocity: {
                            value: new i.FM8
                        },
                        uForce: {
                            value: new i.FM8
                        },
                        uMouseRadius: {
                            value: this.options.fluid.mouseRadius
                        },
                        uPressure: {
                            value: this.options.fluid.pressure
                        }
                    },
                    width: this.options.fluid.resolution,
                    height: this.options.fluid.resolution,
                    filter: i.wem,
                    wrap: i.rpg,
                    createTexture: !1
                }),
                this.divergenceSim = new Ct({
                    fragmentShader: "#define GLSLIFY 1\nvarying vec2 vUv;\n\nuniform sampler2D uVelocity;\nuniform vec2 uCellSize;\nuniform float uViscosity;\n\nvoid main() {\n    // gradient\n    float x0 = texture2D(uVelocity, vUv - vec2(uCellSize.x, 0.0)).x;\n    float x1 = texture2D(uVelocity, vUv + vec2(uCellSize.x, 0.0)).x;\n    float y0 = texture2D(uVelocity, vUv - vec2(0.0, uCellSize.y)).y;\n    float y1 = texture2D(uVelocity, vUv + vec2(0.0, uCellSize.y)).y;\n\n    float divergence = (x1 - x0 + y1 - y0) * uViscosity;\n    gl_FragColor = vec4(divergence);\n}",
                    uniforms: {
                        uVelocity: {
                            value: this.velocitySim.texture
                        },
                        uViscosity: {
                            value: this.options.fluid.viscosity
                        }
                    },
                    width: this.options.fluid.resolution,
                    height: this.options.fluid.resolution,
                    filter: i.wem,
                    wrap: i.rpg,
                    pingPong: !1,
                    createTexture: !1
                }),
                this.pressureSim = new Ct({
                    fragmentShader: "#define GLSLIFY 1\nuniform sampler2D uTexture;\nuniform sampler2D uDivergence;\nuniform float uAlpha;\nuniform float uBeta;\nuniform vec2 uCellSize;\n\nvarying vec2 vUv;\n\nvoid main(){\n    float x0 = texture2D(uTexture, vUv - vec2(uCellSize.x, 0.0)).r;\n    float x1 = texture2D(uTexture, vUv + vec2(uCellSize.x, 0.0)).r;\n    float y0 = texture2D(uTexture, vUv - vec2(0.0, uCellSize.y)).r;\n    float y1 = texture2D(uTexture, vUv + vec2(0.0, uCellSize.y)).r;\n    float b = texture2D(uDivergence, vUv).r;\n\n    // program representation for Equation 16\n    float relaxed = (x0 + x1 + y0 + y1 + uAlpha * b) * uBeta;\n\n    gl_FragColor = vec4(relaxed);\n}",
                    uniforms: {
                        uDivergence: {
                            value: this.divergenceSim.texture
                        },
                        uAlpha: {
                            value: -1
                        },
                        uBeta: {
                            value: .25
                        }
                    },
                    width: this.options.fluid.resolution,
                    height: this.options.fluid.resolution,
                    filter: i.wem,
                    wrap: i.rpg,
                    createTexture: !1
                }),
                this.subtractPressureSim = new Ct({
                    fragmentShader: "#define GLSLIFY 1\nuniform sampler2D uPressure;\nuniform sampler2D uVelocity;\nuniform vec2 uCellSize;\n\nvarying vec2 vUv;\n\nvoid main() {\n\n    float x0 = texture2D(uPressure, vUv - vec2(uCellSize.x, 0)).r;\n    float x1 = texture2D(uPressure, vUv + vec2(uCellSize.x, 0)).r;\n    float y0 = texture2D(uPressure, vUv - vec2(0, uCellSize.y)).r;\n    float y1 = texture2D(uPressure, vUv + vec2(0, uCellSize.y)).r;\n\n    vec2 v = texture2D(uVelocity, vUv).xy;\n\n    // subtract gradient of pressure from velocity\n    gl_FragColor = vec4(\n        (v - vec2(x1 - x0, y1 - y0) * 0.5),\n        1.0,\n        1.0\n    );\n\n}",
                    uniforms: {
                        uPressure: {
                            value: this.pressureSim.texture
                        },
                        uVelocity: {
                            value: this.velocitySim.texture
                        }
                    },
                    width: this.options.fluid.resolution,
                    height: this.options.fluid.resolution,
                    filter: i.wem,
                    wrap: i.rpg,
                    createTexture: !1
                })
            }
            updateFluidResolution(e) {
                this.velocitySim.setSize(e, e),
                this.divergenceSim.setSize(e, e),
                this.pressureSim.setSize(e, e),
                this.subtractPressureSim.setSize(e, e)
            }
            addEvents() {
                n.on(o.events.MOUSEMOVE, this.onPointerMove),
                o.RAFCollection.add(this.onRaf, 2)
            }
            removeEvents() {
                n.off(o.events.MOUSEMOVE, this.onPointerMove),
                o.RAFCollection.remove(this.onRaf)
            }
            destroy() {
                this.removeEvents(),
                this.velocitySim.destroy(),
                this.divergenceSim.destroy(),
                this.pressureSim.destroy(),
                this.subtractPressureSim.destroy()
            }
            enable() {
                this.enabled || (this.enabled = !0,
                this.addEvents())
            }
            disable() {
                this.enabled && (this.enabled = !1,
                this.removeEvents())
            }
        }
        function At(e, t, s) {
            return t in e ? Object.defineProperty(e, t, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = s,
            e
        }
        class Lt {
            constructor() {
                At(this, "onRaf", (e=>{
                    o.clockDelta = this.clock.getDelta(),
                    this.globalUniforms.u_time.value = e,
                    this.screenFxPass.uniforms.u_time.value = e,
                    o.mouse.smooth.glNormalized.lerp(o.mouse.glNormalized, .05),
                    this.composer.render()
                }
                )),
                At(this, "onFPSChecked", (e=>{
                    e < 4 && (2 === this.renderer.getPixelRatio() ? (this.renderer.setPixelRatio(1.5),
                    this.composer.setPixelRatio(1.5)) : 1.5 !== this.renderer.getPixelRatio() || o.isTouch || (this.composer.reset(new i.dd2(o.window.w,o.window.fullHeight,{
                        samples: 0
                    })),
                    this.renderer.setPixelRatio(1),
                    this.composer.setPixelRatio(1)),
                    this.composer.setSize(o.window.w, o.window.fullHeight),
                    this.fxaaPass.material.uniforms.resolution.value.set(1 / (o.window.w * this.renderer.getPixelRatio()), 1 / (o.window.fullHeight * this.renderer.getPixelRatio())),
                    this.globalUniforms.u_resolution.value.set(o.window.w * this.renderer.getPixelRatio(), o.window.fullHeight * this.renderer.getPixelRatio()))
                }
                )),
                n.bindAll(this, ["onResize"]),
                this.dom = {
                    canvas: document.getElementById("gl")
                },
                this.assets = {
                    models: {},
                    textures: {}
                },
                l.ZP.registerPlugin(Mt),
                this.setup(),
                this.addEvents()
            }
            setup() {
                this.renderer = new i.CP7({
                    alpha: !0,
                    antialias: !1,
                    canvas: this.dom.canvas,
                    powerPreference: "high-performance",
                    stencil: !1
                }),
                this.renderer.setPixelRatio(o.window.dpr <= 2 ? o.window.dpr : 2),
                this.renderer.setSize(o.window.w, o.window.fullHeight);
                const e = 1500
                  , t = 2 * Math.atan(o.window.fullHeight / 2 / e) * 180 / Math.PI;
                this.camera = new i.cPb(t,o.window.w / o.window.fullHeight,1,2200),
                this.camera.position.set(0, 0, e),
                this.scene = new i.xsS,
                this.scene.fog = new i.ybr(16777215,e,this.camera.far),
                this.scene.fog.origVals = {
                    near: this.scene.fog.near,
                    far: this.scene.fog.far
                },
                o.AssetLoader.ktxLoader.detectSupport(this.renderer);
                const s = this.renderer.getDrawingBufferSize(new i.FM8);
                let n;
                n = o.isTouch ? 0 : o.window.dpr > 1 ? 1 : 2;
                const r = new i.dd2(s.width,s.height,{
                    samples: n
                });
                this.composer = new it.xC(this.renderer,r),
                this.composerPasses = new at(this.composer.passes),
                this.clock = new i.SUY,
                this.cssRenderer = new pt,
                this.cssRenderer.setSize(o.window.w, o.window.fullHeight),
                this.cssRenderer.domElement.style.position = "absolute",
                this.cssRenderer.domElement.style.top = 0,
                this.cssRenderer.domElement.style.zIndex = 60,
                this.cssRenderer.domElement.style.pointerEvents = "none",
                this.cssRenderer.domElement.style.opacity = 0,
                this.cssRenderer.domElement.style.visibility = "hidden",
                document.body.appendChild(this.cssRenderer.domElement),
                this.cssScene = new i.xsS,
                this.globalUniforms = {
                    u_time: {
                        value: 0
                    },
                    u_resolution: {
                        value: new i.FM8(o.window.w * this.renderer.getPixelRatio(),o.window.fullHeight * this.renderer.getPixelRatio())
                    },
                    fogNear: {
                        value: e
                    },
                    fogFar: {
                        value: this.camera.far
                    },
                    fogColor: {
                        value: new i.Ilk
                    }
                },
                this.loadGlobalAssets()
            }
            loadGlobalAssets() {
                this.webglFonts = {
                    "Neue Montreal": {
                        url: `${o.assetsUrl}fonts/NeueMontreal-Regular.woff`,
                        sdfGlyphSize: 128
                    },
                    "Saol Display": {
                        url: `${o.assetsUrl}fonts/SaolDisplay-LightItalic.woff`,
                        sdfGlyphSize: 128
                    }
                },
                o.AssetLoader.add(new Promise((e=>{
                    (0,
                    nt.C5)({
                        font: this.webglFonts["Neue Montreal"].url,
                        characters: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789â€™()&-,",
                        sdfGlyphSize: this.webglFonts["Neue Montreal"].sdfGlyphSize
                    }, e)
                }
                ))),
                o.AssetLoader.add(new Promise((e=>{
                    (0,
                    nt.C5)({
                        font: this.webglFonts["Saol Display"].url,
                        characters: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789â€™()&-",
                        sdfGlyphSize: this.webglFonts["Saol Display"].sdfGlyphSize
                    }, e)
                }
                ))),
                o.AssetLoader.loadTexture(gt("images/matcap-white.png")).then((e=>{
                    this.assets.textures.matcap = e
                }
                )),
                o.AssetLoader.loadTexture(gt("images/matcap-black.png")).then((e=>{
                    this.assets.textures.matcapBlack = e
                }
                )),
                o.AssetLoader.loadTexture(gt("images/project-model-matcap.png")).then((e=>{
                    this.assets.textures.projectModelMatcap = e
                }
                )),
                o.AssetLoader.loadTexture(gt("images/project-model-matcap-dark.png")).then((e=>{
                    this.assets.textures.projectModelMatcapDark = e
                }
                )),
                o.AssetLoader.loadTexture(gt("images/noise-small.png"), {
                    wrapping: i.rpg
                }).then((e=>{
                    this.assets.textures.noiseSmall = e
                }
                )),
                o.AssetLoader.loadTexture(gt("images/gradient-noise.jpg"), {
                    wrapping: i.rpg
                }).then((e=>{
                    this.assets.textures.gradientNoise = e
                }
                ))
            }
            generateTexture(e, t={}, s=!1) {
                return e instanceof HTMLImageElement ? e = new i.xEZ(e) : e instanceof HTMLVideoElement && (e = new i.fO1(e)),
                e.minFilter = t.minFilter || (s ? i.wem : i.D1R),
                e.magFilter = t.magFilter || i.wem,
                e.wrapS = e.wrapT = t.wrapping || i.uWy,
                e.flipY = void 0 === t.flipY || t.flipY,
                e.needsUpdate = !0,
                this.renderer.initTexture(e),
                e
            }
            addPasses() {
                this.screenFxPass = new ot.T({
                    uniforms: {
                        tDiffuse: {
                            value: null
                        },
                        u_time: {
                            value: 0
                        },
                        u_noiseOnly: {
                            value: 0
                        },
                        u_maxDistort: {
                            value: .4
                        },
                        u_bendAmount: {
                            value: -.15
                        },
                        u_vignetteStrength: {
                            value: o.urlParams.has("novignette") ? 0 : .05
                        }
                    },
                    fragmentShader: "precision highp float;\n#define GLSLIFY 1\n\nuniform sampler2D tDiffuse;\nuniform float u_time;\nuniform float u_noiseOnly;\nuniform float u_maxDistort;\nuniform float u_bendAmount;\nuniform float u_vignetteStrength;\nvarying vec2 vUv;\n\nconst int iterations = 5;\n\nvec2 barrelDistortion(vec2 coord, float amt) {\n\tvec2 cc = coord - 0.5;\n\tfloat dist = dot(cc, cc);\n\treturn coord + cc * dist * amt;\n}\n\nfloat sat( float t )\n{\n\treturn clamp( t, 0.0, 1.0 );\n}\n\nfloat linterp( float t ) {\n\treturn sat( 1.0 - abs( 2.0*t - 1.0 ) );\n}\n\nfloat remap( float t, float a, float b ) {\n\treturn sat( (t - a) / (b - a) );\n}\n\nvec4 spectrum_offset( float t ) {\n\tvec4 ret;\n\tfloat lo = step(t,0.5);\n\tfloat hi = 1.0-lo;\n\tfloat w = linterp( remap( t, 1.0/6.0, 5.0/6.0 ) );\n\tret = vec4(lo,1.0,hi, 1.) * vec4(1.0-w, w, 1.0-w, 1.);\n\n\treturn pow( ret, vec4(1.0/2.2) );\n}\n\nfloat hash12(vec2 p) {\n\tvec3 p3  = fract(vec3(p.xyx) * .1031);\n    p3 += dot(p3, p3.yzx + 33.33);\n    return fract((p3.x + p3.y) * p3.z);\n}\n\nvoid main() {\n    float f = hash12(gl_FragCoord.xy + u_time);\n    vec4 noise = vec4(vec3(f), 0.05) * 0.07;\n\n\tvec4 baseColor;\n\tif (u_noiseOnly > 0.) {\n\t\tbaseColor = texture2D(tDiffuse, vUv);\n\t}\n\n\tvec4 screenFx;\n\tif (u_noiseOnly < 1.) {\n\t\tvec4 sumcol = vec4(0.0);\n\t\tvec4 sumw = vec4(0.0);\n\t\tfloat reci_num_iter_f = 1.0 / float(iterations);\n\t\tfor (int i = 0; i < iterations; i++){\n\t\t\tfloat t = float(i) * reci_num_iter_f;\n\t\t\tvec4 w = spectrum_offset( t );\n\t\t\tsumw += w;\n\t\t\tsumcol += w * texture2D( tDiffuse, barrelDistortion(vUv, u_bendAmount * u_maxDistort*t ) );\n\t\t}\n\n\t\tvec2 uv2 = vUv;\n\t\tuv2 *= 1.0 - vUv.yx;   //vec2(1.0)- uv.yx; -> 1.-u.yx; Thanks FabriceNeyret !\n\t\tfloat vig = uv2.x*uv2.y * 20.0; // multiply with sth for intensity\n\t\tvig = pow(vig, u_vignetteStrength); // change pow for modifying the extend of the  vignette\n\n\t\tscreenFx = mix(vec4(vec3(0.), 1.), sumcol / sumw, vig);\n\t}\n\t\n\t\t\n\tgl_FragColor = mix(screenFx, baseColor, u_noiseOnly) + noise;\n}",
                    vertexShader: st
                }),
                this.fxaaPass = new ot.T(rt.C),
                this.fxaaPass.material.uniforms.resolution.value.x = 1 / (o.window.w * this.renderer.getPixelRatio()),
                this.fxaaPass.material.uniforms.resolution.value.y = 1 / (o.window.fullHeight * this.renderer.getPixelRatio()),
                this.fluidSim = new jt({
                    fluid: {
                        resolution: 128,
                        force: 20,
                        iterations: 1,
                        mouseRadius: .2,
                        pressure: .999,
                        viscosity: .999,
                        forceClamp: !1
                    }
                }),
                this.fluidPass = new ot.T(new i.jyz({
                    vertexShader: "#define GLSLIFY 1\nvarying vec2 vUv;\n\nvoid main()\t{\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
                    fragmentShader: "#define GLSLIFY 1\nvarying vec2 vUv;\n\nuniform sampler2D uFluidTexture;\nuniform sampler2D tDiffuse;\nuniform float uOpacity;\nuniform vec2 uRamp;\nuniform float uImageDistortion;\n\nconst vec3 W = vec3(0.2125, 0.7154, 0.0721);\nfloat luminance(in vec3 color) {\n    return dot(color, W);\n}\n\nvoid main(){\n    vec4 fluid = texture2D(uFluidTexture, vUv);\n\tvec2 fluidPos = -normalize(fluid.rgb).xy;\n    vec4 sceneColor = texture2D(tDiffuse, vUv + fluidPos * uImageDistortion);\n    float lum = luminance(abs(fluid.rgb));\n    float gradient = smoothstep(uRamp.x, uRamp.y, lum);\n\tsceneColor.rgb += gradient * uOpacity * (1. - sceneColor.a );\n\tgl_FragColor = sceneColor;\n}",
                    uniforms: {
                        uFluidTexture: {
                            value: this.fluidSim.velocitySim.texture
                        },
                        tDiffuse: {
                            value: null
                        },
                        uOpacity: {
                            value: .03
                        },
                        uImageDistortion: {
                            value: 0
                        },
                        uRamp: {
                            value: new i.FM8(0,1)
                        }
                    }
                })),
                this.composerPasses.add(this.screenFxPass, 101)
            }
            addEvents() {
                n.on(o.events.RESIZE, this.onResize),
                o.RAFCollection.add(this.onRaf, 99),
                n.on("FPSChecked", this.onFPSChecked)
            }
            onResize() {
                this.camera.fov = 2 * Math.atan(o.window.fullHeight / 2 / this.camera.position.z) * 180 / Math.PI,
                this.camera.aspect = o.window.w / o.window.fullHeight,
                this.camera.updateProjectionMatrix(),
                this.renderer.setSize(o.window.w, o.window.fullHeight),
                this.composer.setSize(o.window.w, o.window.fullHeight),
                this.fxaaPass.material.uniforms.resolution.value.x = 1 / (o.window.w * this.renderer.getPixelRatio()),
                this.fxaaPass.material.uniforms.resolution.value.y = 1 / (o.window.fullHeight * this.renderer.getPixelRatio()),
                this.cssRenderer.setSize(o.window.w, o.window.fullHeight),
                this.globalUniforms.u_resolution.value.set(o.window.w * this.renderer.getPixelRatio(), o.window.fullHeight * this.renderer.getPixelRatio())
            }
        }
        s(6337);
        function Et(e, t, s) {
            return t in e ? Object.defineProperty(e, t, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = s,
            e
        }
        class It extends IntersectionObserver {
            constructor(e={}, t, s) {
                super(((...e)=>this.handler(...e)), e),
                Et(this, "handler", ((e,t)=>{
                    for (let t = 0; t < e.length; t++)
                        for (let s = 0; s < this.els.length; s++)
                            this.els[s].el === e[t].target && (this.els[s].bcr = e[t].boundingClientRect,
                            this.eventName && n.emit(this.eventName, this.els[s]),
                            e[t].isIntersecting ? (this.els[s].enter && this.els[s].enter(this.els[s].el, this.els[s].params || null),
                            this.visibleEls[s] = this.els[s]) : (this.els[s].leave && this.els[s].leave(this.els[s].el, this.els[s].params || null),
                            this.visibleEls[s] = !1));
                    this.fireFirstObservation && (this.firstObservationFired = !0,
                    n.emit("firstObservation", this.els))
                }
                )),
                Et(this, "reset", (()=>{
                    this.disconnect(),
                    this.els = [],
                    this.visibleEls = [],
                    this.firstObservationFired = !1
                }
                )),
                this.eventName = t,
                this.fireFirstObservation = s,
                this.firstObservationFired = !1,
                this.els = [],
                this.visibleEls = []
            }
        }
        var Rt = s(7082);
        function Ot(e, t) {
            var s = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                t && (i = i.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                s.push.apply(s, i)
            }
            return s
        }
        function kt(e, t, s) {
            return t in e ? Object.defineProperty(e, t, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = s,
            e
        }
        var Ft = {
            name: "webglTextReveal",
            extendTimeline: !0,
            effect: (e,t)=>(t.glProps && delete t.glProps,
            e[0]._glProps.uniforms.u_progress = 0,
            l.ZP.to(e[0], function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var s = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? Ot(Object(s), !0).forEach((function(t) {
                        kt(e, t, s[t])
                    }
                    )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(s)) : Ot(Object(s)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(s, t))
                    }
                    ))
                }
                return e
            }({
                glProps: {
                    uniforms: {
                        u_progress: 1
                    }
                },
                onComplete() {
                    e[0]._webGLItem.visible = !1
                }
            }, t))),
            defaults: {
                duration: 3.5,
                ease: "power2.out"
            }
        };
        function Dt(e, t) {
            var s = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                t && (i = i.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                s.push.apply(s, i)
            }
            return s
        }
        function Gt(e, t, s) {
            return t in e ? Object.defineProperty(e, t, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = s,
            e
        }
        var zt = {
            name: "webglPeelEffect",
            extendTimeline: !0,
            effect: (e,t)=>(t.glProps && delete t.glProps,
            o.mq.sm.matches && (e[0]._glProps.uniforms.u_enableBend = !0),
            e[0]._glProps.uniforms.u_progress = 0,
            l.ZP.to(e[0], function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var s = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? Dt(Object(s), !0).forEach((function(t) {
                        Gt(e, t, s[t])
                    }
                    )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(s)) : Dt(Object(s)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(s, t))
                    }
                    ))
                }
                return e
            }({
                glProps: {
                    uniforms: {
                        u_progress: 1.5
                    }
                }
            }, t), 0)),
            defaults: {
                ease: "sine.out",
                scrollTrigger: {
                    scrub: !0,
                    once: !1,
                    start: "top bottom",
                    end: "bottom 70%"
                }
            }
        };
        function Ht(e, t) {
            var s = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                t && (i = i.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                s.push.apply(s, i)
            }
            return s
        }
        function Ut(e, t, s) {
            return t in e ? Object.defineProperty(e, t, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = s,
            e
        }
        var Bt = {
            name: "webglParallaxEffect",
            extendTimeline: !0,
            effect: (e,t)=>(t.glProps && delete t.glProps,
            e[0]._glProps.uniforms.u_innerY = -.2,
            e[0]._glProps.uniforms.u_innerScale = 1.2,
            l.ZP.to(e[0], function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var s = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? Ht(Object(s), !0).forEach((function(t) {
                        Ut(e, t, s[t])
                    }
                    )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(s)) : Ht(Object(s)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(s, t))
                    }
                    ))
                }
                return e
            }({
                glProps: {
                    uniforms: {
                        u_innerY: .1,
                        u_innerScale: 1
                    }
                }
            }, t), 0)),
            defaults: {
                ease: "none",
                scrollTrigger: {
                    scrub: !0,
                    once: !1,
                    start: "top bottom",
                    end: "bottom top"
                }
            }
        };
        var Nt = {
            fade: {
                name: "fade",
                extendTimeline: !0,
                effect: (e,t)=>l.ZP.from(e, t),
                defaults: {
                    autoAlpha: 0,
                    duration: 1.5,
                    ease: "expo.out",
                    clearProps: "all"
                }
            },
            fadeUp: {
                name: "fadeUp",
                extendTimeline: !0,
                effect: (e,t)=>l.ZP.from(e, t),
                defaults: {
                    autoAlpha: 0,
                    y: 30,
                    duration: 1.5,
                    ease: "expo.out",
                    clearProps: "all",
                    force3D: !0
                }
            },
            webglTextReveal: Ft,
            webglPeelEffect: zt,
            webglParallaxEffect: Bt,
            mobileWithText: {
                name: "mobileWithText",
                effect: (e,t)=>{
                    const s = e[0]
                      , o = g('[dom2webgl="c:PhoneModel"]', s)
                      , n = p('[dom2webgl="c:TextReveal"]', s)
                      , r = o.getBoundingClientRect()
                      , a = n[n.length - 1].getBoundingClientRect();
                    n[0]._glProps = {
                        uniforms: {
                            u_progress: 0
                        }
                    },
                    n[1]._glProps = {
                        uniforms: {
                            u_progress: 0
                        }
                    },
                    l.ZP.timeline({
                        scrollTrigger: {
                            trigger: n[0],
                            scrub: .5,
                            start: "top bottom",
                            end: "bottom top"
                        },
                        defaults: {
                            ease: "none"
                        }
                    }).to(n[0], {
                        glProps: {
                            uniforms: {
                                u_progress: 1
                            }
                        }
                    }).to(n[0], {
                        glProps: {
                            uniforms: {
                                u_progress: 0
                            }
                        }
                    }),
                    l.ZP.timeline({
                        scrollTrigger: {
                            trigger: n[1],
                            scrub: .5,
                            start: "top bottom",
                            end: "bottom top"
                        },
                        defaults: {
                            ease: "none"
                        }
                    }).to(n[1], {
                        glProps: {
                            uniforms: {
                                u_progress: 1
                            }
                        }
                    }).to(n[1], {
                        glProps: {
                            uniforms: {
                                u_progress: 0
                            }
                        }
                    }),
                    o._glProps = {
                        "position.x": 0,
                        "position.y": 0,
                        "rotation.y": i.M8C.degToRad(30),
                        "rotation.z": i.M8C.degToRad(10)
                    };
                    const h = l.ZP.timeline({
                        scrollTrigger: {
                            scrub: .5,
                            trigger: o,
                            endTrigger: n[n.length - 1],
                            start: "center center-=15%",
                            end: "center center"
                        }
                    }).to(o, {
                        duration: 1,
                        glProps: {
                            "position.x": a.right - r.left,
                            "position.y": a.top - r.top - r.height / 2 + a.height / 2,
                            "rotation.y": i.M8C.degToRad(-390),
                            "rotation.z": i.M8C.degToRad(-10)
                        }
                    }, 0).call((()=>{
                        o._webGLItem.textures.length > 1 && (o._webGLItem.screen.material.map.image instanceof HTMLVideoElement && o._webGLItem.screen.material.map.image.pause(),
                        h.scrollTrigger.direction > 0 ? o._webGLItem.screen.material.map = o._webGLItem.textures[1].texture : o._webGLItem.screen.material.map = o._webGLItem.textures[0].texture,
                        o._webGLItem.screen.material.map.image instanceof HTMLVideoElement && o._webGLItem.screen.material.map.image.play())
                    }
                    ), null, .4);
                    return h
                }
                ,
                defaults: {
                    ease: "none"
                }
            }
        };
        function Wt(e) {
            return Function('"use strict";return (' + e + ")")()
        }
        function Zt(e, t) {
            var s = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                t && (i = i.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                s.push.apply(s, i)
            }
            return s
        }
        function qt(e) {
            for (var t = 1; t < arguments.length; t++) {
                var s = null != arguments[t] ? arguments[t] : {};
                t % 2 ? Zt(Object(s), !0).forEach((function(t) {
                    Vt(e, t, s[t])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(s)) : Zt(Object(s)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(s, t))
                }
                ))
            }
            return e
        }
        function Vt(e, t, s) {
            return t in e ? Object.defineProperty(e, t, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = s,
            e
        }
        class Yt {
            constructor() {
                this.fromAttr = "animate-from",
                this.toAttr = "animate-to",
                this.mirrorGlProps = {
                    x: "position.x",
                    y: "position.y",
                    z: "position.z",
                    rotationX: "rotation.x",
                    rotationY: "rotation.y",
                    rotationZ: "rotation.z"
                },
                this.registerGsapPlugins(),
                this.registerGsapEffects()
            }
            build() {
                this.els = [];
                const e = document.querySelectorAll(`[${this.fromAttr}], [${this.toAttr}]`)
                  , t = e.length;
                for (let s = 0; s < t; s++) {
                    if (e[s].attributes[this.fromAttr] && "" === e[s].attributes[this.fromAttr].value && e[s].attributes[this.toAttr] && "" === e[s].attributes[this.toAttr].value)
                        continue;
                    let t = {
                        uniforms: {}
                    };
                    const i = {
                        ease: "none",
                        duration: 1.5,
                        scrollTrigger: {
                            trigger: e[s],
                            horizontal: o.ASScroll.isHorizontal,
                            once: !0
                        }
                    }
                      , n = e[s].getBoundingClientRect();
                    let r, a = e[s], h = !1, c = !1;
                    if (e[s].attributes[this.fromAttr] && (h = Wt(`{${e[s].attributes[this.fromAttr].value}}`),
                    e[s].hasAttribute("dom2webgl"))) {
                        const e = this.parseGlPropsFrom(h, t, n);
                        h = e.from,
                        t = e.glProps
                    }
                    if (!h.preset || Nt[h.preset]) {
                        if (e[s].attributes[this.toAttr] && (c = qt(qt({}, i), Wt(`{${e[s].attributes[this.toAttr].value}}`)),
                        e[s].hasAttribute("dom2webgl") && (c = this.parseGlPropsTo(c, n))),
                        (c.stagger || h.stagger) && (a = e[s].children),
                        i.scrollTrigger = Object.assign(i.scrollTrigger, h.scrollTrigger),
                        delete h.scrollTrigger,
                        !a.length && a.hasAttribute("dom2webgl") && (a._glProps || (a._glProps = t),
                        i.scrollTrigger.pin && (this.updateGlPropsPinPos(i, a),
                        i.scrollTrigger.onUpdate = ()=>{
                            this.updateGlPropsPinPos(i, a)
                        }
                        )),
                        h && h.preset) {
                            const e = h.preset;
                            delete h.preset,
                            Nt[e].defaults.scrollTrigger && (i.scrollTrigger = Object.assign(i.scrollTrigger, Nt[e].defaults.scrollTrigger)),
                            h.scrollTrigger = i.scrollTrigger,
                            r = l.ZP.effects[e](a, h)
                        } else
                            h && c ? (c = Object.assign(i, c),
                            r = l.ZP.fromTo(a, h, c)) : !c && h ? (h = Object.assign(i, h),
                            r = l.ZP.from(a, h)) : (c = Object.assign(i, c),
                            r = l.ZP.to(a, c));
                        r.scrollTrigger && r.scrollTrigger.disable(),
                        r.pause(),
                        this.els.push({
                            el: e[s],
                            tween: r
                        })
                    }
                }
            }
            enable() {
                for (let e = 0; e < this.els.length; e++)
                    this.els[e].tween.scrollTrigger && (this.els[e].tween.scrollTrigger.enable(),
                    this.els[e].tween.scrollTrigger.isActive && !this.els[e].tween.scrollTrigger.vars.scrub && this.els[e].tween.restart(!0))
            }
            parseGlPropsFrom(e, t, s) {
                e.glProps = {},
                Object.prototype.hasOwnProperty.call(e, "uniforms") && (e.glProps.uniforms = qt({}, e.uniforms),
                t.uniforms = qt({}, e.uniforms),
                delete e.uniforms);
                for (const i in e)
                    if (Object.prototype.hasOwnProperty.call(this.mirrorGlProps, i)) {
                        const o = this.parseMirroredValue(i, e[i], s);
                        e.glProps[this.mirrorGlProps[i]] = o,
                        t[this.mirrorGlProps[i]] = o
                    }
                return {
                    from: e,
                    glProps: t
                }
            }
            parseGlPropsTo(e, t) {
                e.glProps = {},
                Object.prototype.hasOwnProperty.call(e, "uniforms") && (e.glProps.uniforms = qt({}, e.uniforms),
                delete e.uniforms);
                for (const s in e)
                    if (Object.prototype.hasOwnProperty.call(this.mirrorGlProps, s)) {
                        const i = this.parseMirroredValue(s, e[s], t);
                        e.glProps[this.mirrorGlProps[s]] = i
                    }
                return e
            }
            parseMirroredValue(e, t, s) {
                if ("function" == typeof t && (t = t()),
                "string" == typeof t && t.includes("%")) {
                    t = ("x" === e ? s.width : s.height) * parseFloat(t) * .01
                }
                return e.includes("rotation") && (t = i.M8C.degToRad(t)),
                t
            }
            updateGlPropsPinPos(e, t) {
                e.scrollTrigger.horizontal ? t._glProps["position.x"] = l.ZP.getProperty(t, "x") : t._glProps["position.y"] = l.ZP.getProperty(t, "y")
            }
            registerGsapEffects() {
                for (const e in Nt)
                    l.ZP.registerEffect(Nt[e])
            }
            registerGsapPlugins() {
                l.ZP.registerPlugin(Rt.Z),
                l.ZP.registerPlugin({
                    name: "glProps",
                    init(e, t) {
                        for (const s in t)
                            if ("object" != typeof t[s])
                                this.add(e._glProps, s, e._glProps[s], t[s]);
                            else
                                for (const i in t[s])
                                    this.add(e._glProps[s], i, e._glProps[s][i], t[s][i]),
                                    this._props.push(i)
                    }
                })
            }
            destroy() {
                for (let e = 0; e < this.els.length; e++)
                    this.els[e].tween && this.els[e].tween.kill(),
                    this.els[e].tween.scrollTrigger && this.els[e].tween.scrollTrigger.kill(!1)
            }
        }
        function Kt(e, t) {
            var s = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                t && (i = i.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                s.push.apply(s, i)
            }
            return s
        }
        function Xt(e) {
            for (var t = 1; t < arguments.length; t++) {
                var s = null != arguments[t] ? arguments[t] : {};
                t % 2 ? Kt(Object(s), !0).forEach((function(t) {
                    $t(e, t, s[t])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(s)) : Kt(Object(s)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(s, t))
                }
                ))
            }
            return e
        }
        function $t(e, t, s) {
            return t in e ? Object.defineProperty(e, t, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = s,
            e
        }
        class Qt extends i.ZAu {
            constructor(e) {
                super(),
                this.options = Xt({
                    name: "",
                    domEl: null,
                    assetType: null
                }, e),
                this.options.item && (this.item = this.options.item,
                this.add(this.item)),
                this.name = this.options.name,
                this.domEl = this.options.domEl,
                this.domEl._webGLItem = this,
                this.assetType = this.options.assetType,
                this.bbox = new i.ZzF,
                this.pixelScale = new i.FM8,
                this.originalPosition = new i.Pa4,
                this.originalRotation = new i.Pa4,
                this.updatePosition = !0,
                this.visible = !1,
                this.animateProps = !1
            }
            calcPixelScale() {
                this.bbox.setFromObject(this.item),
                this.pixelScale.set(-this.bbox.min.x + this.bbox.max.x, -this.bbox.min.y + this.bbox.max.y)
            }
            syncDomSize() {
                this.widthPx = this.domEl.clientWidth,
                this.heightPx = this.domEl.clientHeight,
                this.item.scale.set(this.widthPx, this.heightPx, 1),
                "image" === this.assetType && (this.item.material.uniforms.u_size && (this.item.material.uniforms.u_size.value = [this.widthPx, this.heightPx]),
                this.item.material.uniforms.u_imageSize && (this.item.material.uniforms.u_imageSize.value = [this.domEl.naturalWidth, this.domEl.naturalHeight]))
            }
            build() {
                "image" === this.assetType && o.TaskScheduler.enqueueTask((()=>{
                    this.item.material.uniforms.u_texture.value.needsUpdate = !0,
                    o.Gl.renderer.initTexture(this.item.material.uniforms.u_texture.value)
                }
                ))
            }
            mapAnimateProps() {
                if (this.domEl._glProps) {
                    this.animateProps = Xt({}, this.domEl._glProps);
                    for (const e in this.animateProps)
                        if (this.animateProps[e] = {},
                        "uniforms" === e)
                            for (const t in this.domEl._glProps.uniforms)
                                this.animateProps[e][t] = {},
                                this.animateProps[e][t].target = this.item.material.uniforms[t],
                                this.animateProps[e][t].property = "value";
                        else {
                            const t = e.split(".");
                            this.animateProps[e].target = t.length > 1 ? this.item[t[0]] : this.item,
                            this.animateProps[e].property = t[1] || t[0]
                        }
                }
            }
            animate(e, t) {
                const s = o.Dom2Webgl.axis;
                if (this.updatePosition && (this.position[s] = o.Dom2Webgl.operations[o.Dom2Webgl.operator](this.originalPosition[s], e),
                this.animateProps)) {
                    for (const t in this.animateProps)
                        if ("uniforms" !== t)
                            t === "position." + s ? this.position[s] = o.Dom2Webgl.operations[o.Dom2Webgl.operator](this.originalPosition[s], e, this.domEl._glProps[t]) : this.animateProps[t].target[this.animateProps[t].property] = this.domEl._glProps[t];
                        else
                            for (const e in this.animateProps[t])
                                this.animateProps[t][e].target[this.animateProps[t][e].property] = this.domEl._glProps[t][e];
                    this.item.material && this.item.material.uniforms && this.item.material.uniforms.u_time && (this.item.material.uniforms.u_time.value = t),
                    this.item.material && this.item.material.uniforms && this.item.material.uniforms.u_scrollPos && (this.item.material.uniforms.u_scrollPos.value = e)
                }
            }
            dispose() {
                this.domEl._webGLItem = null
            }
        }
        class Jt extends Qt {
            constructor(e) {
                super(e),
                this.domEl._glProps = {
                    "position.x": 0,
                    "position.y": 0
                },
                this.initialLoad = !0,
                o.TextLoader.add(new Promise((e=>{
                    this.resolve = e
                }
                )))
            }
            build() {
                this.item = new nt.xv,
                Object.assign(this.item, {
                    text: this.domEl.innerText,
                    anchorX: "center",
                    anchorY: "middle"
                }),
                this.item.material.depthTest = !1,
                this.item.material.renderOrder = 10,
                this.item.material.defines.FOG = !0,
                this.add(this.item)
            }
            calcPixelScale() {}
            syncDomSize() {
                const e = window.getComputedStyle(this.domEl)
                  , t = this.domEl.getBoundingClientRect()
                  , s = e.fontFamily.split(",")[0].replace(/"/g, "");
                var i;
                this.fontSize = parseFloat(e.fontSize),
                Object.assign(this.item, {
                    font: o.Gl.webglFonts[s].url,
                    fontSize: this.fontSize,
                    letterSpacing: parseFloat(e.letterSpacing) / this.fontSize,
                    maxWidth: t.width + 4,
                    lineHeight: parseFloat(e.lineHeight) / this.fontSize,
                    textAlign: e.textAlign,
                    color: parseInt("0x" + (i = e.color,
                    `#${i.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map((e=>parseInt(e, 10).toString(16).padStart(2, "0"))).join("")}`).replace("#", ""), 16),
                    sdfGlyphSize: o.Gl.webglFonts[s].sdfGlyphSize,
                    clipRect: [.6 * -t.width, .5 * -t.height, .6 * t.width, .5 * t.height]
                }),
                this.item.sync((()=>{
                    this.copyGlyphPositions(),
                    this.initialLoad && (this.initialLoad = !1,
                    this.resolve())
                }
                ))
            }
            copyGlyphPositions() {
                this.glyphPositions = [];
                let e = 0;
                for (let t = 0; t < this.item.geometry.attributes.aTroikaGlyphBounds.count; t++)
                    this.glyphPositions[t] = {
                        minX: this.item.geometry.attributes.aTroikaGlyphBounds.array[e++],
                        minY: this.item.geometry.attributes.aTroikaGlyphBounds.array[e++],
                        maxX: this.item.geometry.attributes.aTroikaGlyphBounds.array[e++],
                        maxY: this.item.geometry.attributes.aTroikaGlyphBounds.array[e++]
                    }
            }
            updateGlyphPositions() {
                let e = 0;
                for (let t = 0; t < this.item.geometry.attributes.aTroikaGlyphBounds.count; t++)
                    this.item.geometry.attributes.aTroikaGlyphBounds.array[e++] = this.glyphPositions[t].minX,
                    this.item.geometry.attributes.aTroikaGlyphBounds.array[e++] = this.glyphPositions[t].minY,
                    this.item.geometry.attributes.aTroikaGlyphBounds.array[e++] = this.glyphPositions[t].maxX,
                    this.item.geometry.attributes.aTroikaGlyphBounds.array[e++] = this.glyphPositions[t].maxY;
                this.item.geometry.attributes.aTroikaGlyphBounds.needsUpdate = !0
            }
            addToGlyphPositions(e={}) {
                let t = 0;
                for (let s = 0; s < this.item.geometry.attributes.aTroikaGlyphBounds.count; s++)
                    this.item.geometry.attributes.aTroikaGlyphBounds.array[t++] += e.minX || 0,
                    this.item.geometry.attributes.aTroikaGlyphBounds.array[t++] += e.minY || 0,
                    this.item.geometry.attributes.aTroikaGlyphBounds.array[t++] += e.maxX || 0,
                    this.item.geometry.attributes.aTroikaGlyphBounds.array[t++] += e.maxY || 0;
                this.item.geometry.attributes.aTroikaGlyphBounds.needsUpdate = !0
            }
        }
        const es = new i._12
          , ts = new i.jyz({
            uniforms: {
                u_bgColor: {
                    value: [0, 0, 0]
                },
                u_progress: {
                    value: 0
                },
                u_scrollPos: {
                    value: 0
                },
                u_ratio: {
                    value: 1
                }
            },
            vertexShader: "#define GLSLIFY 1\nvarying vec3 vWorldPosition;\nvarying vec2 vUv;\n\nvoid main () {\n\tvUv = uv;\n\tvWorldPosition = (modelMatrix * vec4(position, 1.)).xyz;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1 );\n}",
            fragmentShader: "precision highp float;\n#define GLSLIFY 1\n\nvarying vec3 vWorldPosition;\nvarying vec2 vUv;\n\nuniform vec3 u_bgColor;\nuniform float u_progress;\nuniform float u_scrollPos;\nuniform float u_ratio;\n\nfloat scale = 0.03; // = 4.0\nfloat smoothness = 0.5; // = 0.01\nfloat seed = 12.9898; // = 12.9898\n\n// http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/\nfloat random(vec2 co)\n{\n    highp float a = seed;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\n// 2D Noise based on Morgan McGuire @morgan3d\n// https://www.shadertoy.com/view/4dS3Wd\nfloat noise (in vec2 st) {\n    vec2 i = floor(st);\n    vec2 f = fract(st);\n\n    // Four corners in 2D of a tile\n    float a = random(i);\n    float b = random(i + vec2(1.0, 0.0));\n    float c = random(i + vec2(0.0, 1.0));\n    float d = random(i + vec2(1.0, 1.0));\n\n    // Smooth Interpolation\n\n    // Cubic Hermine Curve.  Same as SmoothStep()\n    vec2 u = f*f*(3.0-2.0*f);\n    // u = smoothstep(0.,1.,f);\n\n    // Mix 4 coorners porcentages\n    return mix(a, b, u.x) +\n            (c - a)* u.y * (1.0 - u.x) +\n            (d - b) * u.x * u.y;\n}\n\nvoid main() {\n    vec4 from = vec4(u_bgColor.rgb, 1.);\n    vec4 to = vec4(u_bgColor.rgb, 0.);\n\n\tvec2 ratio = vec2(1.0, 1.0 / u_ratio);\n\tfloat dist = length((vec2(vUv) - vec2(0., 1.)) * ratio * 0.75);\n\n    float n = noise(vec2(vWorldPosition.x, vWorldPosition.y - u_scrollPos) * scale);\n  \n    float p = mix(-smoothness, 1.0 + smoothness, u_progress);\n    float lower = p - smoothness;\n    float higher = p + smoothness;\n    \n\tfloat edge = smoothstep(lower, higher, n);\n\tfloat q = smoothstep(u_progress - edge, u_progress, dist);\n\n\tgl_FragColor = mix(from, to, 1. - q);\n}",
            transparent: !0,
            depthTest: !1
        });
        function ss(e) {
            const t = {
                animations: e.animations,
                scene: e.scene.clone(!0)
            }
              , s = {};
            e.scene.traverse((e=>{
                e.isSkinnedMesh && (s[e.name] = e)
            }
            ));
            const o = {}
              , n = {};
            t.scene.traverse((e=>{
                e.isBone && (o[e.name] = e),
                e.isSkinnedMesh && (n[e.name] = e)
            }
            ));
            for (const e in s) {
                const t = s[e].skeleton
                  , r = n[e]
                  , a = [];
                for (let e = 0; e < t.bones.length; ++e) {
                    const s = o[t.bones[e].name];
                    a.push(s)
                }
                r.bind(new i.OdW(a,t.boneInverses), r.matrixWorld)
            }
            return t
        }
        var is = "#define GLSLIFY 1\nvarying vec3 vNormal;\nvarying vec3 vViewPosition;\n\nvoid main() {\n\tvec3 objectNormal = vec3( normal );\n\tvec3 transformedNormal = objectNormal;\n\t#ifdef USE_INSTANCING\n        mat3 m = mat3( instanceMatrix );\n        transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );\n        transformedNormal = m * transformedNormal;\n    #endif\n\ttransformedNormal = normalMatrix * transformedNormal;\n\tvNormal = normalize( transformedNormal );\n\n\tvec3 transformed = vec3( position );\n\tvec4 mvPosition = vec4( transformed, 1.0 );\n\tmvPosition = modelViewMatrix * mvPosition;\n    gl_Position = projectionMatrix * mvPosition;\n\n\tvViewPosition = - mvPosition.xyz;\n}";
        const os = {};
        function ns(e, t, s) {
            return t in e ? Object.defineProperty(e, t, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = s,
            e
        }
        var rs = "#define GLSLIFY 1\nvoid main () {\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1 );\n}"
          , as = "#define GLSLIFY 1\n#define M_PI 3.141592653589\n\nuniform vec2 u_resolution;\nuniform vec3 u_fromColor;\nuniform vec3 u_toColor;\nuniform float u_progress;\nuniform float u_adjust;\nuniform float u_velo;\nuniform vec3 fogColor;\nuniform float fogNear;\nuniform float fogFar;\n\nfloat parabola( float x, float k, float curve ){\n    return pow( curve * x * (1.0 - x), k );\n}\n\nvoid main() {\n\t// vec2 st = gl_FragCoord.xy / u_resolution.xy;\n\t// float curve = parabola(st.x, (1. - u_progress) * 4.340, u_progress * 4.728);\n\t// vec3 finalColor = mix(u_fromColor, u_toColor, step(st.y, curve));\n\t// gl_FragColor = vec4(finalColor, 1.);\n\n\tvec2 uv = gl_FragCoord.xy / u_resolution.xy;\n\tfloat pct = 1. - ((distance(uv, vec2(.5))) * u_adjust);\n    pct = smoothstep(0., 1., pct);\n    uv.y -= ((sin(uv.x * M_PI) * u_velo) * .5);\n    float tf = step(uv.y, clamp(u_progress * pct, 0., 1.));\n    vec3 finalColor = mix(u_fromColor, u_toColor, tf);\n\tgl_FragColor = vec4(finalColor, 1.);\n\n\tfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n\tfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n}";
        var ls = "#define GLSLIFY 1\nvarying vec3 vNormal;\nvarying vec3 vViewPosition;\n\nuniform sampler2D uMatcap;\nuniform vec3 uBaseColor;\nuniform float uOpacity;\nuniform vec3 fogColor;\nuniform float fogNear;\nuniform float fogFar;\n\nvoid main() {\n\tfloat faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * faceDirection;\n\t#endif\n\n\tvec3 viewDir = normalize( vViewPosition );\n    vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n    vec3 y = cross( viewDir, x );\n    vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5; // 0.495 to remove artifacts caused by undersized matcap disks\n\t\n\tvec3 matcapColor = texture2D( uMatcap, uv ).rgb;\n\n\t#ifdef LIGHTMODE\n\t\tmatcapColor += uBaseColor;\n\t#endif\n\n\tgl_FragColor = vec4(matcapColor, uOpacity);\n\n\tfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n\tfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n}";
        function hs(e, t, s) {
            return t in e ? Object.defineProperty(e, t, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = s,
            e
        }
        const cs = ["awwwards", "css", "euro", "fwa", "lovie", "webby"];
        var ds = {
            WebGLText: Jt,
            TextReveal: class extends Qt {
                constructor(e) {
                    super(e),
                    this.item = new i.Kj0(es,ts.clone()),
                    this.item.material.uniforms.u_bgColor.value = o.Project.backgroundColorGl,
                    this.renderOrder = -2,
                    this.add(this.item)
                }
                syncDomSize() {
                    super.syncDomSize(),
                    this.widthPx > this.heightPx ? this.item.material.uniforms.u_ratio.value = this.widthPx / this.heightPx : this.item.material.uniforms.u_ratio.value = this.heightPx / this.widthPx
                }
                animate(e, t) {
                    super.animate(e, t),
                    this.item.material.uniforms.u_scrollPos.value = e
                }
            }
            ,
            ProjectModel: class extends Qt {
                constructor(e) {
                    var t, s, i;
                    super(e),
                    i = e=>{
                        for (let t = 0; t < this.item.children.length; t++) {
                            const s = this.item.children[t];
                            s.rotation.x = s.originalRotation.x + (.1 * -o.mouse.smooth.glNormalized.y + .02 * Math.sin(e + s.index)),
                            s.rotation.y = s.originalRotation.y + (.15 * o.mouse.smooth.glNormalized.x + .05 * Math.cos(e + s.index + 21.263)),
                            s.position.y = s.originalPosition.y + 5 * Math.cos(e + s.index) / this.item.scale.x
                        }
                        this.rotation.x = .1 * -o.mouse.smooth.glNormalized.y,
                        this.rotation.y = .15 * o.mouse.smooth.glNormalized.x
                    }
                    ,
                    (s = "onRaf")in (t = this) ? Object.defineProperty(t, s, {
                        value: i,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[s] = i,
                    this.loadAssets(),
                    this.domEl._glProps = {
                        "position.y": 0
                    }
                }
                loadAssets() {
                    this.assets = {},
                    o.AssetLoader.loadGltf(this.domEl.dataset.src).then((e=>{
                        this.assets.gltf = ss(e)
                    }
                    ))
                }
                build() {
                    this.item = this.assets.gltf.scene;
                    const e = new i.jyz({
                        vertexShader: is,
                        fragmentShader: "#define GLSLIFY 1\nvarying vec3 vNormal;\nvarying vec3 vViewPosition;\n\nuniform sampler2D uMatcapLight;\nuniform sampler2D uMatcapDark;\nuniform float uTransitionProgress;\nuniform vec3 uBaseColor;\nuniform vec3 uNextBaseColor;\nuniform vec3 fogColor;\nuniform float fogNear;\nuniform float fogFar;\n\nvoid main() {\n\tfloat faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * faceDirection;\n\t#endif\n\n\tvec3 viewDir = normalize( vViewPosition );\n    vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n    vec3 y = cross( viewDir, x );\n    vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5; // 0.495 to remove artifacts caused by undersized matcap disks\n\n\t#ifdef LIGHTMODE\n\t\tvec3 matcapA = texture2D( uMatcapDark, uv ).rgb;\n\t\tmatcapA += uBaseColor;\n\t#else\n\t\tvec3 matcapA = texture2D( uMatcapLight, uv ).rgb;\n\t#endif\n\n\t#ifdef TRANSITION\n\t\t#ifdef TO_LIGHTMODE\n\t\t\tvec3 matcapB = texture2D( uMatcapDark, uv ).rgb;\n\t\t\tmatcapB += uNextBaseColor;\n\t\t#else\n\t\t\tvec3 matcapB = texture2D( uMatcapLight, uv ).rgb;\n\t\t#endif\n\n\t\tvec3 matcapColor = mix(matcapA, matcapB, smoothstep(0.333, 0.666, uTransitionProgress));\n\t#else\n\t\tvec3 matcapColor = matcapA;\n\t#endif\n\n\tgl_FragColor = vec4(matcapColor.rgb, 0.3);\n\n\tfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n\tfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n}",
                        uniforms: {
                            uMatcapLight: {
                                value: o.Gl.assets.textures.projectModelMatcap
                            },
                            uMatcapDark: {
                                value: o.Gl.assets.textures.projectModelMatcapDark
                            },
                            uBaseColor: {
                                value: o.Project.backgroundColorGl
                            },
                            uNextBaseColor: {
                                value: new i.Ilk(this.domEl.dataset.nextBgcolor ? this.domEl.dataset.nextBgcolor : 0)
                            },
                            uTransitionProgress: {
                                value: 0
                            },
                            fogNear: o.Gl.globalUniforms.fogNear,
                            fogFar: o.Gl.globalUniforms.fogFar,
                            fogColor: o.Gl.globalUniforms.fogColor
                        },
                        transparent: !0,
                        side: i.ehD,
                        depthTest: !1,
                        defines: {
                            LIGHTMODE: o.projectLightMode,
                            TRANSITION: void 0 !== this.domEl.dataset.transition,
                            TO_LIGHTMODE: "true" === this.domEl.dataset.lightMode
                        }
                    });
                    this.item.children.forEach(((t,s)=>{
                        t.index = s,
                        t.originalPosition = t.position.clone(),
                        t.originalRotation = t.rotation.clone(),
                        t.material = e
                    }
                    )),
                    this.item.renderOrder = -1,
                    this.add(this.item),
                    this.originalRotation.copy(this.item.rotation),
                    this.domEl.dataset.scale && this.scale.setScalar(parseFloat(this.domEl.dataset.scale)),
                    o.RAFCollection.add(this.onRaf, 4)
                }
                syncDomSize() {
                    super.syncDomSize(),
                    this.item.scale.setScalar(Math.min(this.widthPx / this.pixelScale.x, this.heightPx / this.pixelScale.y))
                }
                dispose() {
                    super.dispose(),
                    o.RAFCollection.remove(this.onRaf)
                }
            }
            ,
            PhoneModel: class extends Qt {
                constructor(e) {
                    super(e),
                    this.options = e,
                    this.domEl = this.options.domEl,
                    this.domMedia = p("img, video", this.domEl),
                    this.loadAssets()
                }
                loadAssets() {
                    os.model || (os.model = !0,
                    o.AssetLoader.loadGltf(gt("models/phone.glb")).then((e=>{
                        os.model = e
                    }
                    )))
                }
                build() {
                    this.textures = [],
                    this.domMedia.forEach((e=>{
                        const t = {};
                        if (e instanceof HTMLImageElement) {
                            const s = new Image;
                            s.crossOrigin = "",
                            t.texture = new i.xEZ(s),
                            s.addEventListener("load", (()=>{
                                t.texture.flipY = !1,
                                t.texture.needsUpdate = !0,
                                o.Gl.renderer.initTexture(t.texture)
                            }
                            ), {
                                once: !0
                            }),
                            s.src = e.src,
                            t.type = "image"
                        } else
                            t.texture = o.Gl.generateTexture(e, {
                                flipY: !1,
                                minFilter: i.wem
                            }),
                            t.type = "video";
                        this.textures.push(t)
                    }
                    )),
                    this.item = new i.ZAu;
                    const e = os.model.scene.clone(!0)
                      , t = e.getObjectByName("Body");
                    this.screen = e.getObjectByName("Screen"),
                    t.material = new i.kaV({
                        matcap: o.projectLightMode ? o.Gl.assets.textures.projectModelMatcapDark : o.Gl.assets.textures.projectModelMatcap,
                        color: o.Project ? o.Project.backgroundColorGl : 16777215,
                        opacity: .3,
                        transparent: !0
                    }),
                    this.screen.material = new i.vBJ({
                        map: this.textures[0].texture,
                        transparent: !0
                    }),
                    t.renderOrder = 100,
                    this.screen.renderOrder = 100,
                    this.item.add(e),
                    this.add(this.item),
                    this.originalRotation.copy(this.item.rotation),
                    this.ambientMovementModifier = 100 * Math.random(),
                    ("video" === this.textures[0].type || this.textures[1] && "video" === this.textures[1].type) && (this.videoController = Rt.Z.create({
                        trigger: this.domEl.closest(".container"),
                        onToggle: e=>{
                            this.screen.material.map.image instanceof HTMLVideoElement && (e.isActive ? this.screen.material.map.image.play() : this.screen.material.map.image.pause())
                        }
                    }))
                }
                syncDomSize() {
                    super.syncDomSize(),
                    this.item.scale.setScalar(Math.min(this.widthPx / this.pixelScale.x, this.heightPx / this.pixelScale.y))
                }
                animate(e, t) {
                    super.animate(e, t),
                    this.item && (this.item.rotation.x += 75e-5 * Math.sin(t + this.ambientMovementModifier),
                    this.item.rotation.y += .01 * Math.cos(t + this.ambientMovementModifier),
                    this.item.children[0].rotation.x += .075 * (-.05 * o.mouse.glNormalized.y - this.item.children[0].rotation.x),
                    this.item.children[0].rotation.y += .075 * (.1 * o.mouse.glNormalized.x - this.item.children[0].rotation.y),
                    this.item.position.y += .1 * Math.cos(t + this.ambientMovementModifier))
                }
                dispose() {
                    super.dispose(),
                    this.videoController && this.videoController.kill()
                }
            }
            ,
            Slider: class extends Qt {
                constructor(e) {
                    super(e),
                    ns(this, "prevSlide", (()=>{
                        const e = this.activeIndex - 1;
                        e < 0 || (this.activeIndex = e,
                        this.dragPos = -this.origPositions[e],
                        this.updateButtonStates(),
                        this.updateIndexText())
                    }
                    )),
                    ns(this, "nextSlide", (()=>{
                        const e = this.activeIndex + 1;
                        e > this.slideCount - 1 || (this.activeIndex = e,
                        this.dragPos = -this.origPositions[e],
                        this.updateButtonStates(),
                        this.updateIndexText())
                    }
                    )),
                    ns(this, "onMouseDown", (({event: e})=>{
                        this.dom.wrap.contains(e.target) && (document.body.style.userSelect = "none",
                        this.mouseDown = !0,
                        this.hoveredItem && this.slideMouseLeave())
                    }
                    )),
                    ns(this, "onMouseUp", (()=>{
                        if (document.body.style.removeProperty("user-select"),
                        this.mouseDown = !1,
                        this.hasDragged) {
                            const e = this.origPositions.reduce(((e,t)=>Math.abs(t - -this.dragPos) < Math.abs(e - -this.dragPos) ? t : e));
                            this.activeIndex = this.origPositions.indexOf(e),
                            this.updateButtonStates(),
                            this.updateIndexText(),
                            this.dragPos = -e
                        } else
                            this.hoveredItem && (this.dragPos = -this.hoveredItem.parent.origPos,
                            this.activeIndex = this.hoveredItem.slideIndex,
                            this.updateButtonStates(),
                            this.updateIndexText(),
                            this.slideMouseLeave());
                        this.hasDragged = !1
                    }
                    )),
                    ns(this, "onDrag", (({ox: e, px: t, x: s, event: o})=>{
                        this.dom.wrap.contains(o.target) && (Math.abs(e - s) < 2 || (this.dragPos -= (t - s) * this.dragSpeed,
                        this.dragPos = i.M8C.clamp(this.dragPos, this.maxDragPos, 0),
                        this.hasDragged = !0,
                        this.dragProgress = this.dragPos / this.maxDragPos,
                        this.dom.wrap.dataset.cursorProgress = this.dragProgress,
                        n.emit("cursor:progress", this.dragProgress)))
                    }
                    )),
                    ns(this, "onEnter", (()=>{
                        this.active = !0
                    }
                    )),
                    ns(this, "onLeave", (()=>{
                        this.active = !1
                    }
                    )),
                    ns(this, "onNavMouseEnter", (e=>{
                        v.ZP.fromTo(e.target.querySelector("span"), {
                            x: "-101%"
                        }, {
                            x: "0%",
                            duration: .5,
                            ease: "expo.out"
                        })
                    }
                    )),
                    ns(this, "onNavMouseLeave", (e=>{
                        v.ZP.to(e.target.querySelector("span"), {
                            x: "101%",
                            duration: .5,
                            ease: "expo.out"
                        })
                    }
                    )),
                    this.dom = {
                        wrap: this.domEl.closest(".js-slider-wrap"),
                        images: this.domEl.querySelectorAll(".js-slider-image")
                    },
                    this.dom.prev = this.dom.wrap.querySelector(".js-slider-prev"),
                    this.dom.next = this.dom.wrap.querySelector(".js-slider-next"),
                    this.dom.index = this.dom.wrap.querySelector(".js-slider-index"),
                    v.ZP.set([this.dom.prev.querySelector("span"), this.dom.next.querySelector("span")], {
                        x: "-101%"
                    }),
                    this.built = !1,
                    this.active = !1,
                    this.slideCount = this.dom.images.length,
                    this.dragPos = 0,
                    this.maxDragPos = 0,
                    this.smoothDragPos = 0,
                    this.minWidth = 0,
                    this.dragSpeed = o.isTouch ? .75 : .5,
                    this.origPositions = [],
                    this.activeIndex = 0,
                    this.raycastObjects = [],
                    this.hoveredItem = !1,
                    this.mouseDown = !1,
                    e.elObj.enter = this.onEnter,
                    e.elObj.leave = this.onLeave,
                    this.raycaster = new i.iMs
                }
                build() {
                    const e = new i.jyz({
                        vertexShader: "#define GLSLIFY 1\nvarying vec2 vUv;\nvarying vec2 ssCoords;\n\nvoid main () {\n    vUv = uv;\n\tvec3 pos = position;\n\n    mat4 MVPM = projectionMatrix * modelViewMatrix;\n    vec4 originalPosition = MVPM * vec4(position, 1.);\n    ssCoords = vec2(originalPosition.xy / originalPosition.w);\n\n    gl_Position = MVPM * vec4(pos, 1.);\n}",
                        fragmentShader: "#define GLSLIFY 1\nvec2 backgroundCoverUv( vec2 screenSize, vec2 imageSize, vec2 uv ) {\n    float screenRatio = screenSize.x / screenSize.y;\n    float imageRatio = imageSize.x / imageSize.y;\n    vec2 newSize = screenRatio < imageRatio \n        ? vec2(imageSize.x * (screenSize.y / imageSize.y), screenSize.y)\n        : vec2(screenSize.x, imageSize.y * (screenSize.x / imageSize.x));\n    vec2 newOffset = (screenRatio < imageRatio \n        ? vec2((newSize.x - screenSize.x) / 2.0, 0.0) \n        : vec2(0.0, (newSize.y - screenSize.y) / 2.0)) / newSize;\n    return uv * screenSize / newSize + newOffset;\n}\n\nvec4 blur9(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {\n  vec4 color = vec4(0.0);\n  vec2 off1 = vec2(1.3846153846) * direction;\n  vec2 off2 = vec2(3.2307692308) * direction;\n  color += texture2D(image, uv) * 0.2270270270;\n  color += texture2D(image, uv + (off1 / resolution)) * 0.3162162162;\n  color += texture2D(image, uv - (off1 / resolution)) * 0.3162162162;\n  color += texture2D(image, uv + (off2 / resolution)) * 0.0702702703;\n  color += texture2D(image, uv - (off2 / resolution)) * 0.0702702703;\n  return color;\n}\n\nvec2 scaleUv(vec2 uv, vec2 scaleOrigin, float scale) {\n    return vec2(uv - scaleOrigin) / scale + scaleOrigin;\n}\n\nvarying vec2 vUv;\nvarying vec2 ssCoords;\n\nuniform sampler2D u_texture;\nuniform vec2 u_imageSize;\nuniform vec2 u_meshSize;\nuniform vec2 u_resolution;\nuniform float u_innerScale;\n\nvec2 scaleOrigin = vec2(0.5, 0.5);\n\nvoid main() {\n\tvec2 uv = backgroundCoverUv(u_meshSize, u_imageSize, vUv);\n\tuv = vec2(vec2(uv - scaleOrigin) / u_innerScale + scaleOrigin);\n\n\tvec4 color = texture2D(u_texture, uv);\n    \n    float colorShiftR = blur9(u_texture, uv + vec2(0., 0.005), u_resolution, vec2(3., -3.)).r;\n    float colorShiftG = blur9(u_texture, uv + vec2(0., -0.005), u_resolution, vec2(-3., 3.)).g;\n\n    float thresholdLeft = smoothstep(-0.7, -1., ssCoords.x);\n    float thresholdRight = smoothstep(0.7, 1., ssCoords.x);\n    float thresholdTop = smoothstep(0.7, 1., ssCoords.y);\n    float thresholdBottom = smoothstep(-0.7, -1., ssCoords.y);\n    float threshold = thresholdLeft + thresholdRight + thresholdBottom + thresholdTop;\n    color.r = mix(color.r, colorShiftR, threshold);\n    color.g = mix(color.g, colorShiftG, threshold);\n\n\tgl_FragColor = color;\n}",
                        uniforms: {
                            u_texture: {
                                value: null
                            },
                            u_imageSize: {
                                value: new i.FM8
                            },
                            u_meshSize: {
                                value: new i.FM8
                            },
                            u_resolution: o.Gl.globalUniforms.u_resolution,
                            u_innerScale: {
                                value: 1
                            }
                        }
                    });
                    for (let t = 0; t < this.dom.images.length; t++) {
                        const s = new i.ZAu
                          , n = new i.Kj0(new i._12,e.clone())
                          , r = new Image;
                        r.crossOrigin = "";
                        const a = new i.xEZ(r);
                        r.addEventListener("load", (()=>{
                            a.needsUpdate = !0,
                            o.Gl.renderer.initTexture(a)
                        }
                        ), {
                            once: !0
                        }),
                        r.src = this.dom.images[t].src,
                        n.material.uniforms.u_texture.value = a,
                        n.material.uniforms.u_imageSize.value.set(this.dom.images[t].naturalWidth, this.dom.images[t].naturalHeight),
                        a.needsUpdate = !0,
                        n.slideIndex = t,
                        s.add(n),
                        this.add(s),
                        this.raycastObjects.push(n)
                    }
                    this.built = !0,
                    this.addEvents()
                }
                animate() {
                    if (this.position.y = this.originalPosition.y + o.ASScroll.currentPos,
                    !this.active)
                        return;
                    if (!this.built)
                        return;
                    this.smoothDragPos += .1 * (this.dragPos - this.smoothDragPos);
                    for (let e = 0; e < this.slideCount; e++) {
                        const t = this.children[e];
                        t.position.x = t.origPos + this.smoothDragPos;
                        const s = i.M8C.clamp(2 * ((Math.abs(t.position.x) - this.leftEdge) / (this.rightEdge - this.leftEdge) - .5), 0, 1)
                          , o = i.M8C.clamp(2 * ((t.position.x - this.leftEdge) / (this.rightEdge - this.leftEdge) - .5), -1, 1);
                        t.children[0].scale.x = Math.max(this.widthPx * (1 - s), this.minWidth),
                        t.children[0].position.x = i.M8C.clamp(.5 * this.widthPx * o, -this.positionOffsetLimit, this.positionOffsetLimit),
                        t.children[0].material.uniforms.u_meshSize.value.x = t.children[0].scale.x
                    }
                    if (this.mouseDown)
                        return;
                    this.raycaster.setFromCamera(o.mouse.glNormalized, o.Gl.camera);
                    const e = this.raycaster.intersectObjects(this.raycastObjects, !1);
                    e.length ? this.hoveredItem !== e[0].object && (this.hoveredItem && (this.slideMouseLeave(),
                    this.hoveredItem = !1,
                    this.dom.wrap.style.cursor = "default"),
                    e[0].object.slideIndex !== this.activeIndex && (this.hoveredItem = e[0].object,
                    this.dom.wrap.style.cursor = "pointer",
                    this.slideMouseEnter())) : this.hoveredItem && (this.slideMouseLeave(),
                    this.hoveredItem = !1,
                    this.dom.wrap.style.cursor = "default")
                }
                slideMouseEnter() {
                    const e = this.hoveredItem;
                    v.ZP.to(e.material.uniforms.u_innerScale, {
                        value: 1.05,
                        duration: .5,
                        ease: "expo.out"
                    }),
                    o.isTouch || o.Cursor.hideEnter()
                }
                slideMouseLeave() {
                    const e = this.hoveredItem;
                    v.ZP.to(e.material.uniforms.u_innerScale, {
                        value: 1,
                        duration: .5,
                        ease: "expo.out"
                    }),
                    o.isTouch || o.Cursor.hideLeave()
                }
                addEvents() {
                    n.on(o.events.MOUSEDOWN, this.onMouseDown),
                    n.on(o.events.MOUSEUP, this.onMouseUp),
                    n.on(o.events.MOUSEDRAG, this.onDrag),
                    n.on("click", this.dom.prev, this.prevSlide),
                    n.on("click", this.dom.next, this.nextSlide),
                    o.isTouch || (n.on("mouseenter", [this.dom.prev, this.dom.next], this.onNavMouseEnter),
                    n.on("mouseleave", [this.dom.prev, this.dom.next], this.onNavMouseLeave))
                }
                updateButtonStates() {
                    this.dom.prev.disabled = 0 === this.activeIndex,
                    this.dom.next.disabled = this.activeIndex === this.slideCount - 1,
                    this.dragProgress = this.dragPos / this.maxDragPos,
                    this.dom.wrap.dataset.cursorProgress = this.dragProgress,
                    n.emit("cursor:progress", this.dragProgress)
                }
                updateIndexText() {
                    this.dom.index.innerHTML = this.activeIndex + 1
                }
                syncDomSize() {
                    let e;
                    this.widthPx = this.domEl.clientWidth,
                    this.heightPx = this.domEl.clientHeight,
                    this.minWidth = this.dom.images[1].clientWidth,
                    e = o.mq.xs.matches ? 15 : o.mq.sm.matches ? 25 : 35,
                    this.leftEdge = -this.minWidth - 33.5,
                    this.rightEdge = this.minWidth + 33.5,
                    this.positionOffsetLimit = this.widthPx / 2 - this.minWidth / 2,
                    this.maxDragPos = (-this.minWidth - e) * (this.slideCount - 1);
                    for (let t = 0; t < this.slideCount; t++)
                        this.children[t].children[0].scale.set(this.widthPx, this.heightPx, 1),
                        this.children[t].children[0].material.uniforms.u_meshSize.value.set(this.widthPx, this.heightPx),
                        this.children[t].children[0].material.uniforms.u_resolution.value.set(o.window.w, o.window.fullHeight),
                        this.children[t].origPos = (this.minWidth + e) * t,
                        this.origPositions[t] = this.children[t].origPos
                }
                calcPixelScale() {}
                dispose() {
                    super.dispose(),
                    n.off(o.events.MOUSEDOWN, this.onMouseDown),
                    n.off(o.events.MOUSEUP, this.onMouseUp),
                    n.off(o.events.MOUSEDRAG, this.onDrag),
                    n.off("click", this.dom.prev, this.prevSlide),
                    n.off("click", this.dom.next, this.nextSlide),
                    o.isTouch || (n.off("mouseenter", [this.dom.prev, this.dom.next], this.onNavMouseEnter),
                    n.off("mouseleave", [this.dom.prev, this.dom.next], this.onNavMouseLeave))
                }
            }
            ,
            ProjectTransition: class extends Qt {
                build() {
                    this.item = new i.Kj0(new i._12,new i.jyz({
                        vertexShader: "#define GLSLIFY 1\nvarying vec2 vUv;\n\nvoid main () {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1 );\n}",
                        fragmentShader: "#define GLSLIFY 1\n#define M_PI 3.141592653589\n\nvarying vec2 vUv;\n\nuniform vec3 u_toColor;\nuniform float u_progress;\nuniform float u_adjust;\nuniform float u_velo;\n\nvoid main() {\n\tvec2 uv = vUv;\n\tfloat pct = 1. - ((distance(uv, vec2(.5))) * u_adjust);\n    pct = smoothstep(0., 1., pct);\n    uv.y -= ((sin(uv.x * M_PI) * u_velo) * .5);\n    float tf = step(uv.y, clamp(u_progress * pct, 0., 1.));\n    vec4 finalColor = mix(vec4(0.), vec4(u_toColor, 1.), tf);\n\tgl_FragColor = finalColor;\n}",
                        uniforms: {
                            u_toColor: {
                                value: new i.Ilk(this.domEl.dataset.nextBgcolor)
                            },
                            u_progress: {
                                value: 0
                            },
                            u_adjust: {
                                value: 1
                            },
                            u_velo: {
                                value: 0
                            }
                        },
                        depthTest: !1
                    })),
                    this.item.renderOrder = 0,
                    this.add(this.item)
                }
            }
            ,
            ProjectTransitionText: class extends Jt {
                build() {
                    super.build(),
                    this.item.material = new i.jyz({
                        vertexShader: rs,
                        fragmentShader: as,
                        uniforms: {
                            u_fromColor: {
                                value: new i.Ilk
                            },
                            u_toColor: {
                                value: new i.Ilk(this.domEl.dataset.nextColor)
                            },
                            u_progress: {
                                value: 0
                            },
                            u_adjust: {
                                value: 1
                            },
                            u_velo: {
                                value: 0
                            },
                            u_resolution: o.Gl.globalUniforms.u_resolution,
                            fogNear: o.Gl.globalUniforms.fogNear,
                            fogFar: o.Gl.globalUniforms.fogFar,
                            fogColor: o.Gl.globalUniforms.fogColor
                        },
                        depthTest: !1,
                        transparent: !0
                    })
                }
                syncDomSize() {
                    super.syncDomSize(),
                    this.item.material.uniforms.u_fromColor.value.set(this.item.color),
                    this.item.material.uniforms.u_resolution.value.set(o.window.w * o.Gl.renderer.getPixelRatio(), o.window.fullHeight * o.Gl.renderer.getPixelRatio())
                }
            }
            ,
            ProjectScrollProgress: class extends Qt {
                constructor(e) {
                    super(e),
                    this.widthReferenceEl = g(".js-keep-scrolling")
                }
                build() {
                    this.item = new i.Kj0(new i._12,new i.jyz({
                        vertexShader: rs,
                        fragmentShader: as,
                        uniforms: {
                            u_fromColor: {
                                value: new i.Ilk(this.domEl.dataset.color)
                            },
                            u_toColor: {
                                value: new i.Ilk(this.domEl.dataset.nextColor)
                            },
                            u_progress: {
                                value: 0
                            },
                            u_adjust: {
                                value: 1
                            },
                            u_velo: {
                                value: 0
                            },
                            u_resolution: o.Gl.globalUniforms.u_resolution,
                            fogNear: o.Gl.globalUniforms.fogNear,
                            fogFar: o.Gl.globalUniforms.fogFar,
                            fogColor: o.Gl.globalUniforms.fogColor
                        },
                        depthTest: !1,
                        transparent: !0
                    })),
                    this.item.renderOrder = 10,
                    this.scale.x = 0,
                    this.add(this.item)
                }
                syncDomSize() {
                    this.item.scale.set(this.widthReferenceEl.offsetWidth, 2, 1),
                    this.item.material.uniforms.u_resolution.value.set(o.window.w * o.Gl.renderer.getPixelRatio(), o.window.fullHeight * o.Gl.renderer.getPixelRatio())
                }
                calcPixelScale() {}
            }
            ,
            Awards: class extends Qt {
                constructor(e) {
                    super(e),
                    hs(this, "onRaf", (e=>{
                        this.rotation.x = .1 * -o.mouse.smooth.glNormalized.y + .02 * Math.sin(e),
                        this.rotation.y = .15 * o.mouse.smooth.glNormalized.x + .05 * Math.cos(e + 21.263),
                        this.item.position.y = 5 * Math.cos(e)
                    }
                    )),
                    hs(this, "updateState", (e=>{
                        let t;
                        clearTimeout(this.mouseLeaveTimeout),
                        e instanceof HTMLElement ? t = e : (clearInterval(this.cycleInterval),
                        this.hovering = !0,
                        t = e.target),
                        this.activeModel !== this.models[t.dataset.awardModel] && (this.activeModel && this.hideModel(this.activeModel),
                        this.activeModel = this.models[t.dataset.awardModel],
                        this.activeId = this.dom.list.indexOf(t),
                        this.showModel(this.activeModel)),
                        this.activeDomEl && this.unsetListHoverState(),
                        this.activeDomEl = t.querySelector(".js-award-inner"),
                        this.setListHoverState()
                    }
                    )),
                    hs(this, "onMouseLeave", (()=>{
                        this.mouseLeaveTimeout = setTimeout((()=>{
                            this.hovering = !1,
                            this.cycleInterval = setInterval((()=>{
                                this.cycle()
                            }
                            ), 3e3)
                        }
                        ), 1e3)
                    }
                    )),
                    this.dom = {
                        list: p(".js-awards .js-award")
                    },
                    this.hovering = !1,
                    this.activeId = -1,
                    this.activeModel = !1,
                    this.activeDomEl = !1,
                    this.loadAssets()
                }
                loadAssets() {
                    this.assets = {
                        models: {}
                    };
                    const e = [];
                    this.dom.list.forEach((t=>{
                        "generic" === t.dataset.awardModel && e.indexOf("generic") < 0 ? e.push("generic") : cs.indexOf(t.dataset.awardModel) < 0 || e.push(t.dataset.awardModel)
                    }
                    )),
                    e.forEach((e=>{
                        o.AssetLoader.loadGltf(gt(`models/awards/${e}.glb`)).then((t=>{
                            this.assets.models[e] = ss(t)
                        }
                        ))
                    }
                    ))
                }
                build() {
                    this.item = new i.ZAu,
                    this.models = {};
                    for (const e in this.assets.models)
                        this.item.add(this.assets.models[e].scene),
                        this.models[e] = this.assets.models[e].scene;
                    const e = new i.jyz({
                        vertexShader: is,
                        fragmentShader: ls,
                        uniforms: {
                            uMatcap: {
                                value: o.projectLightMode ? o.Gl.assets.textures.projectModelMatcapDark : o.Gl.assets.textures.projectModelMatcap
                            },
                            uBaseColor: {
                                value: o.Project.backgroundColorGl
                            },
                            uOpacity: {
                                value: .3
                            },
                            fogNear: o.Gl.globalUniforms.fogNear,
                            fogFar: o.Gl.globalUniforms.fogFar,
                            fogColor: o.Gl.globalUniforms.fogColor
                        },
                        transparent: !0,
                        side: i.ehD,
                        depthTest: !1,
                        defines: {
                            LIGHTMODE: o.projectLightMode
                        }
                    });
                    this.item.children.forEach((t=>{
                        t.bbox = new i.ZzF,
                        t.pixelScale = new i.FM8,
                        t.originalScale = new i.Pa4,
                        t.children[0].material = e.clone(),
                        t.children[0].material.uniforms.fogNear = o.Gl.globalUniforms.fogNear,
                        t.children[0].material.uniforms.fogFar = o.Gl.globalUniforms.fogFar,
                        t.children[0].material.uniforms.fogColor = o.Gl.globalUniforms.fogColor,
                        t.children[0].material.uniforms.uMatcap.value.needsUpdate = !0,
                        t.visible = !1
                    }
                    )),
                    this.item.rotation.set(-.1, 0, .3),
                    this.add(this.item),
                    this.cycleInterval = setInterval((()=>{
                        this.cycle()
                    }
                    ), 2500),
                    o.RAFCollection.add(this.onRaf, 4),
                    n.on("mouseenter", this.dom.list, this.updateState),
                    n.on("mouseleave", this.dom.list, this.onMouseLeave)
                }
                cycle() {
                    this.hovering || (this.activeId++,
                    this.activeId > this.dom.list.length - 1 && (this.activeId = 0),
                    this.updateState(this.dom.list[this.activeId]))
                }
                showModel(e) {
                    e && (e.visibilityTween && e.visibilityTween.kill(),
                    e.visible = !0,
                    e.visibilityTween = l.ZP.timeline({
                        defaults: {
                            duration: 1,
                            ease: "expo.out"
                        }
                    }).fromTo(e.scale, {
                        x: .5 * e.originalScale.x,
                        y: .5 * e.originalScale.y,
                        z: .5 * e.originalScale.z
                    }, {
                        x: e.originalScale.x,
                        y: e.originalScale.y,
                        z: e.originalScale.z
                    }, 0).fromTo(e.children[0].material.uniforms.uOpacity, {
                        value: 0
                    }, {
                        value: .3
                    }, 0).fromTo(e.rotation, {
                        y: i.M8C.degToRad(180),
                        x: i.M8C.degToRad(-45)
                    }, {
                        y: i.M8C.degToRad(360),
                        x: i.M8C.degToRad(0)
                    }, 0))
                }
                hideModel(e) {
                    e.visibilityTween && e.visibilityTween.kill(),
                    e.visibilityTween = l.ZP.timeline({
                        defaults: {
                            duration: .5,
                            ease: "expo.out"
                        },
                        onComplete: ()=>{
                            e.visible = !1
                        }
                    }).to(e.scale, {
                        x: .5 * e.originalScale.x,
                        y: .5 * e.originalScale.y,
                        z: .5 * e.originalScale.z
                    }, 0).to(e.children[0].material.uniforms.uOpacity, {
                        value: 0
                    }, 0)
                }
                setListHoverState() {
                    l.ZP.timeline({
                        defaults: {
                            duration: 1,
                            ease: "expo.out"
                        }
                    }).to(this.activeDomEl, {
                        x: "1.25rem"
                    }, 0).to(this.activeDomEl.querySelector(".js-award-arrow span"), {
                        x: "0%"
                    }, 0)
                }
                unsetListHoverState() {
                    l.ZP.timeline({
                        defaults: {
                            duration: 1,
                            ease: "expo.out"
                        }
                    }).to(this.activeDomEl, {
                        x: "0rem"
                    }, 0).to(this.activeDomEl.querySelector(".js-award-arrow span"), {
                        x: "100%"
                    }, 0)
                }
                calcPixelScale() {
                    this.item.children.forEach((e=>{
                        e.bbox.setFromObject(e),
                        e.pixelScale.set(-e.bbox.min.x + e.bbox.max.x, -e.bbox.min.y + e.bbox.max.y)
                    }
                    ))
                }
                syncDomSize() {
                    this.widthPx = this.domEl.clientWidth,
                    this.heightPx = this.domEl.clientHeight,
                    this.item.children.forEach((e=>{
                        e.scale.setScalar(Math.min(this.widthPx / e.pixelScale.x, this.heightPx / e.pixelScale.y)),
                        e.originalScale.copy(e.scale)
                    }
                    ))
                }
                dispose() {
                    super.dispose(),
                    this.models = {},
                    this.assets = {},
                    clearInterval(this.cycleInterval),
                    o.RAFCollection.remove(this.onRaf),
                    n.off("mouseenter", this.dom.list, this.updateState),
                    n.off("mouseleave", this.dom.list, this.onMouseLeave)
                }
            }
        };
        const us = new i._12(1,1,4,20)
          , ms = new i.jyz({
            uniforms: {
                u_texture: {
                    value: null
                },
                u_texture2: {
                    value: null
                },
                u_opacity: {
                    value: 1
                },
                u_innerScale: {
                    value: 1
                },
                u_innerY: {
                    value: 0
                },
                u_innerX: {
                    value: 0
                },
                u_screenCenterTexture: {
                    value: 0
                },
                u_edgeFade: {
                    value: 1
                },
                u_progress: {
                    value: 0
                },
                u_enableBend: {
                    value: !1
                },
                u_time: {
                    value: 0
                },
                u_size: {
                    value: [1, 1]
                },
                fogNear: {
                    value: 0
                },
                fogFar: {
                    value: 0
                },
                fogColor: {
                    value: new i.Ilk
                }
            },
            vertexShader: "#define GLSLIFY 1\nvarying vec2 vUv;\nvarying vec4 v_worldPos;\nvarying vec2 ssCoords;\n\nuniform float u_progress;\nuniform bool u_enableBend;\n\n#define M_PI 3.1415926535897932384626433832795\n\nvoid main () {\n\n    vec3 pos = position;\n    v_worldPos = modelMatrix * vec4(position, 1.);\n\n    mat4 MVPM = projectionMatrix * modelViewMatrix;\n    vec4 originalPosition = MVPM * vec4(position, 1.);\n    ssCoords = vec2(originalPosition.xy / originalPosition.w);\n\n\tif (u_enableBend) {\n\t\tfloat startAt = uv.y - 0.5;\n\t\tfloat finishAt = uv.y;\n\t\tfloat bend = smoothstep(startAt, finishAt, 1. - u_progress);\n\t\t\n\t\tpos.x *= 1. + (bend * .2) * abs(ssCoords.x);\n\t\tpos.z += ((1. - u_progress + 0.5) * 250.);\n\t}\n    \n    vUv = uv;\n    gl_Position = MVPM * vec4(pos, 1.);\n\n}",
            fragmentShader: "vec4 blur9(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {\n  vec4 color = vec4(0.0);\n  vec2 off1 = vec2(1.3846153846) * direction;\n  vec2 off2 = vec2(3.2307692308) * direction;\n  color += texture2D(image, uv) * 0.2270270270;\n  color += texture2D(image, uv + (off1 / resolution)) * 0.3162162162;\n  color += texture2D(image, uv - (off1 / resolution)) * 0.3162162162;\n  color += texture2D(image, uv + (off2 / resolution)) * 0.0702702703;\n  color += texture2D(image, uv - (off2 / resolution)) * 0.0702702703;\n  return color;\n}\n\nvec2 scaleUv(vec2 uv, vec2 scaleOrigin, float scale) {\n    return vec2(uv - scaleOrigin) / scale + scaleOrigin;\n}\n\nprecision highp float;\n#define GLSLIFY 1\n\nvarying vec2 vUv;\nvarying vec4 v_worldPos;\nvarying vec2 ssCoords;\n\nuniform sampler2D u_texture;\nuniform float u_opacity;\nuniform float u_innerScale;\nuniform float u_innerY;\nuniform float u_innerX;\nuniform float u_screenCenterTexture;\nuniform float u_edgeFade;\nuniform vec2 u_resolution;\nuniform vec2 u_size;\nuniform vec3 fogColor;\nuniform float fogNear;\nuniform float fogFar;\n\nvec2 scaleOrigin = vec2(0.5, 0.5);\n\nvoid main() {\n    vec2 uv = vUv;\n    uv.y += u_innerY;\n    uv.x += u_innerX;\n\n    vec2 screenCenter = (v_worldPos.xy / u_size) + 0.5;\n    uv = screenCenter * (0. + u_screenCenterTexture) + uv * (1. - u_screenCenterTexture);\n\n\tvec4 color = texture2D(u_texture, vec2(vec2(uv - scaleOrigin) / u_innerScale + scaleOrigin));\n    \n    float colorShiftR = blur9(u_texture, scaleUv(uv + vec2(0., 0.005), scaleOrigin, u_innerScale), u_resolution, vec2(3., -3.)).r;\n    float colorShiftG = blur9(u_texture, scaleUv(uv + vec2(0., -0.005), scaleOrigin, u_innerScale), u_resolution, vec2(-3., 3.)).g;\n\tcolor.a = color.a * u_opacity;\n\n    float thresholdLeft = smoothstep(-0.85, -1., ssCoords.x) * u_edgeFade;\n    float thresholdRight = smoothstep(0.85, 1., ssCoords.x) * u_edgeFade;\n    float thresholdTop = smoothstep(0.85, 1., ssCoords.y) * u_edgeFade;\n    float thresholdBottom = smoothstep(-0.85, -1., ssCoords.y) * u_edgeFade;\n    float threshold = thresholdLeft + thresholdRight + thresholdBottom + thresholdTop;\n    color.r = mix(color.r, colorShiftR, threshold);\n    color.g = mix(color.g, colorShiftG, threshold);\n\n\tgl_FragColor = color;\n\n\tfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n\tfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n}",
            transparent: !0
        });
        class ps extends Qt {
            constructor(e) {
                let t;
                if (super({
                    domEl: e.domEl,
                    name: e.name,
                    assetType: "image"
                }),
                e.domEl instanceof HTMLVideoElement)
                    t = new i.fO1(e.domEl);
                else {
                    const s = new Image;
                    s.crossOrigin = "",
                    t = new i.xEZ(s),
                    s.addEventListener("load", (()=>{
                        t.needsUpdate = !0,
                        o.Gl.renderer.initTexture(t)
                    }
                    ), {
                        once: !0
                    }),
                    s.src = e.domEl.src
                }
                o.isIOS && (t.minFilter = i.wem,
                t.generateMipmaps = !1,
                t.needsUpdate = !0);
                const s = ms.clone();
                s.uniforms.u_texture.value = t,
                s.uniforms.u_resolution = o.Gl.globalUniforms.u_resolution,
                this.item = new i.Kj0(us,s),
                this.item.material.uniforms.fogNear = o.Gl.globalUniforms.fogNear,
                this.item.material.uniforms.fogFar = o.Gl.globalUniforms.fogFar,
                this.item.material.uniforms.fogColor = o.Gl.globalUniforms.fogColor,
                this.add(this.item)
            }
        }
        class gs {
            constructor() {
                var e, t, s;
                s = e=>{
                    if (!e || this.resources.has(e))
                        return e;
                    if (Array.isArray(e))
                        return e.forEach((e=>this.track(e))),
                        e;
                    if ((e.dispose || e instanceof i.Tme || e instanceof dt) && this.resources.add(e),
                    e instanceof i.Tme)
                        this.track(e.geometry),
                        this.track(e.material),
                        this.track(e.children);
                    else if (e instanceof i.F5T) {
                        for (const t of Object.values(e))
                            t instanceof i.xEZ && this.track(t);
                        if (e.uniforms)
                            for (const t of Object.values(e.uniforms))
                                if (t) {
                                    const e = t.value;
                                    (e instanceof i.xEZ || Array.isArray(e)) && this.track(e)
                                }
                    }
                    return e
                }
                ,
                (t = "track")in (e = this) ? Object.defineProperty(e, t, {
                    value: s,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = s,
                this.resources = new Set
            }
            untrack(e) {
                if (!e)
                    return e;
                if (Array.isArray(e))
                    return e.forEach((e=>this.untrack(e))),
                    e;
                if (e instanceof i.Tme)
                    this.untrack(e.geometry),
                    this.untrack(e.material),
                    this.untrack(e.children);
                else if (e instanceof i.F5T) {
                    for (const t of Object.values(e))
                        t instanceof i.xEZ && this.untrack(t);
                    if (e.uniforms)
                        for (const t of Object.values(e.uniforms))
                            if (t) {
                                const e = t.value;
                                (e instanceof i.xEZ || Array.isArray(e)) && this.untrack(e)
                            }
                }
                this.resources.has(e) && this.resources.delete(e)
            }
            dispose() {
                for (const e of this.resources)
                    (e instanceof i.Tme || e instanceof dt) && e.parent && e.parent.remove(e),
                    e.dispose && e.dispose();
                this.resources.clear()
            }
        }
        function fs(e, t, s) {
            return t in e ? Object.defineProperty(e, t, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = s,
            e
        }
        class vs {
            constructor() {
                fs(this, "onRaf", (e=>{
                    this.smoothScrollPos = o.ASScroll.currentPos,
                    this.animateDomEls(e)
                }
                )),
                fs(this, "onElIntersect", (e=>{
                    !this.firstObservation && e.updateSize && (e.updateSize = !1,
                    this.updateDom2Webgl(e))
                }
                )),
                fs(this, "onFirstObservation", (e=>{
                    if (this.firstObservation) {
                        this.firstObservation = !1;
                        for (let t = 0; t < e.length; t++)
                            this.webGLItems[e[t].params.webglEl].mapAnimateProps(),
                            this.webGLItems[e[t].params.webglEl].visible = !0,
                            this.updateDom2Webgl(e[t]),
                            e[t].updateSize = !1
                    }
                }
                )),
                fs(this, "onResize", (()=>{
                    for (let e = 0; e < o.Dom2WebglObserver.els.length; e++)
                        o.Dom2WebglObserver.unobserve(o.Dom2WebglObserver.els[e].el),
                        this.webGLItems[o.Dom2WebglObserver.els[e].params.webglEl].syncDomSize(),
                        o.Dom2WebglObserver.observe(o.Dom2WebglObserver.els[e].el);
                    this.firstObservation = !0,
                    o.Dom2WebglObserver.firstObservationFired = !0,
                    this.updateAxis()
                }
                )),
                this.selector = "dom2webgl",
                this.updateAxis(),
                this.resourceTracker = new gs,
                this.components = ds,
                n.on(o.events.RESIZE, this.onResize),
                n.on("dom2webgl", this.onElIntersect),
                n.on("firstObservation", this.onFirstObservation),
                o.RAFCollection.add(this.onRaf, 3)
            }
            build() {
                this.els = [];
                const e = document.querySelectorAll(`[${this.selector}]`);
                this.visibleEls = o.Dom2WebglObserver.visibleEls,
                this.webGLItems = {},
                this.componentIds = {},
                this.firstObservation = !0;
                const t = e.length;
                for (let s = 0; s < t; s++) {
                    let t;
                    const i = e[s].attributes[this.selector].value
                      , n = {
                        el: e[s],
                        updateSize: !0,
                        params: {}
                    };
                    if (e[s]instanceof HTMLImageElement || e[s]instanceof HTMLVideoElement) {
                        if (o.isTouch) {
                            e[s].style.visibility = "visible";
                            continue
                        }
                        t = this.addImage(e[s])
                    } else {
                        if (!i.includes("c:"))
                            continue;
                        {
                            const e = i.substring(2);
                            if (!this.components[e])
                                continue;
                            t = this.addComponent(e, i, n)
                        }
                    }
                    n.params.webglEl = t,
                    this.els.push(e[s]),
                    e[s]instanceof HTMLVideoElement && (n.enter = ()=>{
                        e[s].play()
                    }
                    ,
                    n.leave = ()=>{
                        e[s].pause()
                    }
                    ),
                    o.Dom2WebglObserver.els.push(n)
                }
            }
            addComponent(e, t, s) {
                const i = t + this.componentIdGen(e);
                return this.webGLItems[i] = new this.components[e]({
                    name: i,
                    domEl: s.el,
                    assetType: "component",
                    elObj: s
                }),
                i
            }
            componentIdGen(e) {
                return this.componentIds[e] || (this.componentIds[e] = 0),
                this.componentIds[e]++
            }
            addImage(e) {
                const t = e.attributes.dom2webgl.value;
                return this.webGLItems[t] = new ps({
                    name: t,
                    domEl: e
                }),
                t
            }
            enable() {
                for (const e in this.webGLItems)
                    o.Dom2WebglObserver.observe(this.webGLItems[e].domEl),
                    this.webGLItems[e].build && this.webGLItems[e].build(),
                    this.resourceTracker.track(this.webGLItems[e]),
                    this.webGLItems[e].calcPixelScale(),
                    this.webGLItems[e].syncDomSize(),
                    o.Gl.scene.add(this.webGLItems[e])
            }
            animateDomEls(e) {
                for (const t in this.webGLItems)
                    this.webGLItems[t].animate(this.smoothScrollPos, e)
            }
            updateDom2Webgl(e) {
                const t = e.el._glProps && e.el._glProps["position.x"] ? parseFloat(e.el._glProps["position.x"]) : 0
                  , s = e.el._glProps && e.el._glProps["position.y"] ? parseFloat(e.el._glProps["position.y"]) : 0
                  , i = -o.window.w / 2 + (e.bcr.x + e.bcr.width / 2) - t + (o.ASScroll.isHorizontal ? this.smoothScrollPos : 0)
                  , n = o.window.fullHeight / 2 - e.bcr.y - e.bcr.height / 2 + s - (o.ASScroll.isHorizontal ? 0 : this.smoothScrollPos);
                this.webGLItems[e.params.webglEl].position.x = i,
                this.webGLItems[e.params.webglEl].position.y = n,
                this.webGLItems[e.params.webglEl].originalPosition.copy(this.webGLItems[e.params.webglEl].position.clone())
            }
            updateAxis() {
                [this.operator,this.axis] = o.ASScroll.isHorizontal ? ["+", "x"] : ["-", "y"],
                this.operations = {
                    "+": (e,t,s)=>e - t + (s || 0),
                    "-": (e,t,s)=>e + t - (s || 0)
                }
            }
            reset() {
                this.resourceTracker.dispose(),
                this.els = [],
                this.visibleEls = [],
                this.webGLItems = {}
            }
        }
        function xs(e) {
            let t = e.nodeType
              , s = "";
            if (1 === t || 9 === t || 11 === t) {
                if ("string" == typeof e.textContent)
                    return e.textContent;
                for (e = e.firstChild; e; e = e.nextSibling)
                    s += xs(e)
            } else if (3 === t || 4 === t)
                return e.nodeValue;
            return s
        }
        let ys, Ps, ws, bs = /(?:\r|\n|\t\t)/g, Ts = /(?:\s\s+)/g, Ss = e=>Ps.getComputedStyle(e), Ms = Array.isArray, Cs = [].slice, _s = (e,t)=>{
            let s;
            return Ms(e) ? e : "string" == (s = typeof e) && !t && e ? Cs.call(ys.querySelectorAll(e), 0) : e && "object" === s && "length"in e ? Cs.call(e, 0) : e ? [e] : []
        }
        , js = e=>"absolute" === e.position || !0 === e.absolute, As = (e,t)=>{
            let s, i = t.length;
            for (; --i > -1; )
                if (s = t[i],
                e.substr(0, s.length) === s)
                    return s.length
        }
        , Ls = (e="",t)=>{
            let s = ~e.indexOf("++")
              , i = 1;
            return s && (e = e.split("++").join("")),
            ()=>"<" + t + " style='position:relative;display:inline-block;'" + (e ? " class='" + e + (s ? i++ : "") + "'>" : ">")
        }
        , Es = (e,t,s)=>{
            let i = e.nodeType;
            if (1 === i || 9 === i || 11 === i)
                for (e = e.firstChild; e; e = e.nextSibling)
                    Es(e, t, s);
            else
                3 !== i && 4 !== i || (e.nodeValue = e.nodeValue.split(t).join(s))
        }
        , Is = (e,t)=>{
            let s = t.length;
            for (; --s > -1; )
                e.push(t[s])
        }
        , Rs = (e,t,s)=>{
            let i;
            for (; e && e !== t; ) {
                if (i = e._next || e.nextSibling,
                i)
                    return i.textContent.charAt(0) === s;
                e = e.parentNode || e._parent
            }
        }
        , Os = e=>{
            let t, s, i = _s(e.childNodes), o = i.length;
            for (t = 0; t < o; t++)
                s = i[t],
                s._isSplit ? Os(s) : (t && 3 === s.previousSibling.nodeType ? s.previousSibling.nodeValue += 3 === s.nodeType ? s.nodeValue : s.firstChild.nodeValue : 3 !== s.nodeType && e.insertBefore(s.firstChild, s),
                e.removeChild(s))
        }
        , ks = (e,t)=>parseFloat(t[e]) || 0, Fs = (e,t,s,i,o,n,r)=>{
            let a, l, h, c, d, u, m, p, g, f, v, x, y = Ss(e), P = ks("paddingLeft", y), w = -999, b = ks("borderBottomWidth", y) + ks("borderTopWidth", y), T = ks("borderLeftWidth", y) + ks("borderRightWidth", y), S = ks("paddingTop", y) + ks("paddingBottom", y), M = ks("paddingLeft", y) + ks("paddingRight", y), C = .2 * ks("fontSize", y), _ = y.textAlign, j = [], A = [], L = [], E = t.wordDelimiter || " ", I = t.tag ? t.tag : t.span ? "span" : "div", R = t.type || t.split || "chars,words,lines", O = o && ~R.indexOf("lines") ? [] : null, k = ~R.indexOf("words"), F = ~R.indexOf("chars"), D = js(t), G = t.linesClass, z = ~(G || "").indexOf("++"), H = [];
            for (z && (G = G.split("++").join("")),
            l = e.getElementsByTagName("*"),
            h = l.length,
            d = [],
            a = 0; a < h; a++)
                d[a] = l[a];
            if (O || D)
                for (a = 0; a < h; a++)
                    c = d[a],
                    u = c.parentNode === e,
                    (u || D || F && !k) && (x = c.offsetTop,
                    O && u && Math.abs(x - w) > C && ("BR" !== c.nodeName || 0 === a) && (m = [],
                    O.push(m),
                    w = x),
                    D && (c._x = c.offsetLeft,
                    c._y = x,
                    c._w = c.offsetWidth,
                    c._h = c.offsetHeight),
                    O && ((c._isSplit && u || !F && u || k && u || !k && c.parentNode.parentNode === e && !c.parentNode._isSplit) && (m.push(c),
                    c._x -= P,
                    Rs(c, e, E) && (c._wordEnd = !0)),
                    "BR" === c.nodeName && (c.nextSibling && "BR" === c.nextSibling.nodeName || 0 === a) && O.push([])));
            for (a = 0; a < h; a++)
                c = d[a],
                u = c.parentNode === e,
                "BR" !== c.nodeName ? (D && (g = c.style,
                k || u || (c._x += c.parentNode._x,
                c._y += c.parentNode._y),
                g.left = c._x + "px",
                g.top = c._y + "px",
                g.position = "absolute",
                g.display = "block",
                g.width = c._w + 1 + "px",
                g.height = c._h + "px"),
                !k && F ? c._isSplit ? (c._next = c.nextSibling,
                c.parentNode.appendChild(c)) : c.parentNode._isSplit ? (c._parent = c.parentNode,
                !c.previousSibling && c.firstChild && (c.firstChild._isFirst = !0),
                c.nextSibling && " " === c.nextSibling.textContent && !c.nextSibling.nextSibling && H.push(c.nextSibling),
                c._next = c.nextSibling && c.nextSibling._isFirst ? null : c.nextSibling,
                c.parentNode.removeChild(c),
                d.splice(a--, 1),
                h--) : u || (x = !c.nextSibling && Rs(c.parentNode, e, E),
                c.parentNode._parent && c.parentNode._parent.appendChild(c),
                x && c.parentNode.appendChild(ys.createTextNode(" ")),
                "span" === I && (c.style.display = "inline"),
                j.push(c)) : c.parentNode._isSplit && !c._isSplit && "" !== c.innerHTML ? A.push(c) : F && !c._isSplit && ("span" === I && (c.style.display = "inline"),
                j.push(c))) : O || D ? (c.parentNode && c.parentNode.removeChild(c),
                d.splice(a--, 1),
                h--) : k || e.appendChild(c);
            for (a = H.length; --a > -1; )
                H[a].parentNode.removeChild(H[a]);
            if (O) {
                for (D && (f = ys.createElement(I),
                e.appendChild(f),
                v = f.offsetWidth + "px",
                x = f.offsetParent === e ? 0 : e.offsetLeft,
                e.removeChild(f)),
                g = e.style.cssText,
                e.style.cssText = "display:none;"; e.firstChild; )
                    e.removeChild(e.firstChild);
                for (p = " " === E && (!D || !k && !F),
                a = 0; a < O.length; a++) {
                    for (m = O[a],
                    f = ys.createElement(I),
                    f.style.cssText = "display:block;text-align:" + _ + ";position:" + (D ? "absolute;" : "relative;"),
                    G && (f.className = G + (z ? a + 1 : "")),
                    L.push(f),
                    h = m.length,
                    l = 0; l < h; l++)
                        "BR" !== m[l].nodeName && (c = m[l],
                        f.appendChild(c),
                        p && c._wordEnd && f.appendChild(ys.createTextNode(" ")),
                        D && (0 === l && (f.style.top = c._y + "px",
                        f.style.left = P + x + "px"),
                        c.style.top = "0px",
                        x && (c.style.left = c._x - x + "px")));
                    0 === h ? f.innerHTML = "&nbsp;" : k || F || (Os(f),
                    Es(f, String.fromCharCode(160), " ")),
                    D && (f.style.width = v,
                    f.style.height = c._h + "px"),
                    e.appendChild(f)
                }
                e.style.cssText = g
            }
            D && (r > e.clientHeight && (e.style.height = r - S + "px",
            e.clientHeight < r && (e.style.height = r + b + "px")),
            n > e.clientWidth && (e.style.width = n - M + "px",
            e.clientWidth < n && (e.style.width = n + T + "px"))),
            Is(s, j),
            k && Is(i, A),
            Is(o, L)
        }
        , Ds = (e,t,s,i)=>{
            let o, n, r, a, l, h, c, d = t.tag ? t.tag : t.span ? "span" : "div", u = ~(t.type || t.split || "chars,words,lines").indexOf("chars"), m = js(t), p = t.wordDelimiter || " ", g = " " !== p ? "" : m ? "&#173; " : " ", f = "</" + d + ">", v = 1, x = t.specialChars ? "function" == typeof t.specialChars ? t.specialChars : As : null, y = ys.createElement("div"), P = e.parentNode;
            for (P.insertBefore(y, e),
            y.textContent = e.nodeValue,
            P.removeChild(e),
            o = xs(e = y),
            h = -1 !== o.indexOf("<"),
            !1 !== t.reduceWhiteSpace && (o = o.replace(Ts, " ").replace(bs, "")),
            h && (o = o.split("<").join("{{LT}}")),
            a = o.length,
            n = (" " === o.charAt(0) ? g : "") + s(),
            r = 0; r < a; r++)
                if (l = o.charAt(r),
                x && (c = x(o.substr(r), t.specialChars)))
                    l = o.substr(r, c || 1),
                    n += u && " " !== l ? i() + l + "</" + d + ">" : l,
                    r += c - 1;
                else if (l === p && o.charAt(r - 1) !== p && r) {
                    for (n += v ? f : "",
                    v = 0; o.charAt(r + 1) === p; )
                        n += g,
                        r++;
                    r === a - 1 ? n += g : ")" !== o.charAt(r + 1) && (n += g + s(),
                    v = 1)
                } else
                    "{" === l && "{{LT}}" === o.substr(r, 6) ? (n += u ? i() + "{{LT}}</" + d + ">" : "{{LT}}",
                    r += 5) : n += u && " " !== l ? i() + l + "</" + d + ">" : l;
            e.outerHTML = n + (v ? f : ""),
            h && Es(P, "{{LT}}", "<")
        }
        , Gs = (e,t,s,i)=>{
            let o, n, r = _s(e.childNodes), a = r.length, l = js(t);
            if (3 !== e.nodeType || a > 1) {
                for (t.absolute = !1,
                o = 0; o < a; o++)
                    n = r[o],
                    (3 !== n.nodeType || /\S+/.test(n.nodeValue)) && (l && 3 !== n.nodeType && "inline" === Ss(n).display && (n.style.display = "inline-block",
                    n.style.position = "relative"),
                    n._isSplit = !0,
                    Gs(n, t, s, i));
                return t.absolute = l,
                void (e._isSplit = !0)
            }
            Ds(e, t, s, i)
        }
        ;
        class zs {
            constructor(e, t) {
                ws || (ys = document,
                Ps = window,
                ws = 1),
                this.elements = _s(e),
                this.chars = [],
                this.words = [],
                this.lines = [],
                this._originals = [],
                this.vars = t || {},
                this.split(t)
            }
            split(e) {
                this.isSplit && this.revert(),
                this.vars = e = e || this.vars,
                this._originals.length = this.chars.length = this.words.length = this.lines.length = 0;
                let t, s, i, o = this.elements.length, n = e.tag ? e.tag : e.span ? "span" : "div", r = Ls(e.wordsClass, n), a = Ls(e.charsClass, n);
                for (; --o > -1; )
                    i = this.elements[o],
                    this._originals[o] = i.innerHTML,
                    t = i.clientHeight,
                    s = i.clientWidth,
                    Gs(i, e, r, a),
                    Fs(i, e, this.chars, this.words, this.lines, s, t);
                return this.chars.reverse(),
                this.words.reverse(),
                this.lines.reverse(),
                this.isSplit = !0,
                this
            }
            revert() {
                let e = this._originals;
                if (!e)
                    throw "revert() call wasn't scoped properly.";
                return this.elements.forEach(((t,s)=>t.innerHTML = e[s])),
                this.chars = [],
                this.words = [],
                this.lines = [],
                this.isSplit = !1,
                this
            }
            static create(e, t) {
                return new zs(e,t)
            }
        }
        zs.version = "3.0.5";
        class Hs {
            constructor() {
                n.bindAll(this);
                const e = document.querySelector(".js-navigation");
                this.dom = {
                    nav: e,
                    inner: e.querySelector(".js-nav-inner"),
                    items: e.querySelectorAll(".js-nav-item"),
                    iconInner: e.querySelectorAll(".js-menu-icon-circle"),
                    text: e.querySelectorAll(".js-nav-item-text"),
                    hoverText: e.querySelectorAll(".js-nav-item-hover-text")
                },
                this.navItems = [...document.querySelectorAll(".js-nav-item")],
                this.navItemTl = [],
                this.hidden = !1,
                this.navInnerWidth = this.dom.inner.offsetWidth,
                this.build()
            }
            build() {
                this.splitText(),
                this.navItemsTimeline(),
                this.addEvents()
            }
            addEvents() {
                n.on("mouseenter", this.dom.items, this.mouseEvents),
                n.on("mouseleave", this.dom.items, this.mouseEvents)
            }
            splitText() {
                this.splitNavItemText = new zs(this.dom.text,{
                    type: "chars",
                    charsClass: "js-nav-item-chars"
                }),
                this.splitNavItemHoverText = new zs(this.dom.hoverText,{
                    type: "chars",
                    charsClass: "js-nav-item-hover-chars"
                }),
                l.ZP.set(".js-nav-item-hover-chars", {
                    yPercent: 150,
                    onComplete: ()=>{
                        document.querySelectorAll(".nav-item__text--hover").forEach((e=>e.style.opacity = 1))
                    }
                })
            }
            handleScroll(e) {
                o.mq.sm.matches && (e > 0 ? this.hideNavItems() : this.showNavItems())
            }
            navItemsTimeline() {
                this.navItemsTl = l.ZP.timeline({
                    paused: !0,
                    defaults: {
                        ease: "expo.inOut"
                    }
                }),
                this.navItemsTl.to(this.dom.items, {
                    x: this.navInnerWidth,
                    ease: "expo.in",
                    stagger: -.04,
                    duration: .8
                }).to(this.dom.iconInner[0], {
                    x: 9,
                    ease: "expo.inOut",
                    duration: .6
                }, "<0.2").to(this.dom.iconInner[1], {
                    x: -9,
                    ease: "expo.inOut",
                    duration: .6
                }, "<").set(this.dom.inner, {
                    autoAlpha: 0
                })
            }
            hideNavItems() {
                this.hidden || (this.hidden = !0,
                this.navItemsTl.play())
            }
            showNavItems() {
                this.hidden && (this.hidden = !1,
                this.navItemsTl.reverse())
            }
            onResize() {
                o.mq.sm.matches && (this.isClosed ? this.hideNavItems() : this.showNavItems())
            }
            mouseEvents(e) {
                const t = e.target;
                this.tl = this.navItemTl[this.navItems.indexOf(t)],
                "mouseenter" === e.type ? l.ZP.timeline({
                    defaults: {
                        ease: "circ.inOut"
                    }
                }).to(t.querySelectorAll(".js-nav-item-chars"), {
                    yPercent: -120,
                    stagger: {
                        each: .014
                    }
                }).to(t.querySelectorAll(".js-nav-item-hover-chars"), {
                    yPercent: 0,
                    stagger: {
                        each: .014
                    }
                }, "<0.014") : "mouseleave" === e.type && l.ZP.timeline({
                    defaults: {
                        ease: "circ.inOut"
                    }
                }).to(t.querySelectorAll(".js-nav-item-chars"), {
                    yPercent: 0,
                    stagger: {
                        each: .014
                    }
                }).to(t.querySelectorAll(".js-nav-item-hover-chars"), {
                    yPercent: 150,
                    stagger: {
                        each: .014
                    }
                }, "<0.014")
            }
            destroy() {
                this.showNavItems()
            }
        }
        class Us {
            constructor() {
                n.bindAll(this);
                const e = document.querySelector(".js-navigation")
                  , t = document.querySelector(".js-menu");
                this.dom = {
                    nav: e,
                    inner: e.querySelector(".js-nav-inner"),
                    button: e.querySelector(".js-menu-toggle"),
                    buttonBg: e.querySelector(".js-menu-toggle-bg"),
                    buttonInnerBg: e.querySelector(".js-menu-toggle-inner-bg"),
                    buttonInnerIcon: e.querySelector(".js-menu-toggle-inner-icon"),
                    icon: e.querySelector(".js-menu-icon"),
                    iconInner: e.querySelectorAll(".js-menu-icon-circle"),
                    footerCr: document.querySelector(".js-footer-cr"),
                    footerBtn: document.querySelector(".js-footer-cta"),
                    menu: t,
                    menuInner: t.querySelector(".js-menu-inner"),
                    menuItem: t.querySelectorAll(".js-menu-item"),
                    menuText: t.querySelectorAll(".js-menu-text"),
                    menuHoverText: t.querySelectorAll(".js-menu-hover-text"),
                    menuLinks: t.querySelectorAll(".js-menu-link"),
                    socials: t.querySelectorAll(".js-social-links"),
                    worldIcon: t.querySelector(".js-menu-world-icon"),
                    underline: t.querySelectorAll(".js-active-underline"),
                    menuWrapper: document.querySelector(".js-menu-wrapper")
                },
                this.menuItems = [...document.querySelectorAll(".js-menu-item")],
                this.menuItemTl = [],
                this.menuOpen = !1,
                this.menuIsAnimating = !1,
                this.menuWidth = "41rem",
                this.activeItem = !1,
                this.build()
            }
            build() {
                this.updateActiveItem(),
                this.splitText(),
                this.setElemsPosition(),
                this.buildMenuItemTimelines(),
                this.openMenuTL(),
                this.addEvents(),
                o.isTouch || this.menuToggleHoverTL()
            }
            addEvents() {
                n.on(o.events.RESIZE, this.onResize),
                n.on("click", [this.dom.button, this.dom.menuWrapper], this.handleToggle),
                n.on("click", this.dom.menuItem, this.clickItem),
                o.isTouch || (n.on("mouseenter", this.dom.button, this.onMouseEnterMenuToggle),
                n.on("mouseleave", this.dom.button, this.onMouseLeaveMenuToggle),
                n.on("mouseenter", this.dom.menuItem, this.mouseEvents),
                n.on("mouseleave", this.dom.menuItem, this.mouseEvents))
            }
            splitText() {
                this.splitMenuChars = new zs(this.dom.menuText,{
                    type: "chars",
                    charsClass: "js-menu-chars"
                }),
                this.splitMenuHoverChars = new zs(this.dom.menuHoverText,{
                    type: "chars",
                    charsClass: "js-menu-hover-chars"
                })
            }
            setElemsPosition() {
                for (let e = 0; e < this.dom.menuItem.length; e++) {
                    const t = this.dom.menuItem[e].querySelectorAll(".js-menu-chars");
                    l.ZP.set(t, {
                        scaleX: 0,
                        opacity: 0,
                        x: e=>e * (.9 * e) + "px"
                    }, "<")
                }
                l.ZP.set(this.dom.menuItem, {
                    x: e=>10 * (e + 1) + "%"
                }),
                l.ZP.set(".js-menu-hover-chars", {
                    scaleX: "0",
                    opacity: 0
                }),
                l.ZP.set(".js-menu-hover-text", {
                    opacity: 1,
                    x: "-10%"
                })
            }
            buildMenuItemTimelines() {
                for (let e = 0; e < this.menuItems.length; e++) {
                    const t = this.menuItems[e]
                      , s = t.querySelectorAll(".js-menu-chars")
                      , i = t.querySelectorAll(".js-menu-hover-chars")
                      , o = t.querySelector(".js-menu-hover-text")
                      , n = t.querySelector(".js-menu-number")
                      , r = t.querySelector(".js-menu-world-icon")
                      , a = l.ZP.timeline({
                        paused: !0,
                        defaults: {
                            ease: "expo.inOut",
                            duration: .8
                        }
                    });
                    a.to(s, {
                        scaleX: 0,
                        opacity: 0,
                        x: "50%",
                        duration: .6,
                        stagger: .03
                    }).to(i, {
                        scaleX: 1,
                        opacity: 1,
                        duration: .6,
                        stagger: .03
                    }, "<0.1").to(o, {
                        x: "5%"
                    }, "<").to(n, {
                        x: "100%"
                    }, "<"),
                    r && a.to(r, {
                        x: "40%",
                        y: "-40%",
                        scaleX: -1
                    }, "<"),
                    this.menuItemTl.push(a)
                }
            }
            mouseEvents(e) {
                if (e.target === this.activeItem)
                    return;
                const t = e.target;
                if (this.tl = this.menuItemTl[this.menuItems.indexOf(t)],
                "mouseenter" === e.type) {
                    if (this.menuIsAnimating)
                        return;
                    this.tl.isActive() || o.Audio.play({
                        key: "audio.navlinks_hover",
                        isInteraction: !0
                    }),
                    this.tl.play()
                } else
                    "mouseleave" === e.type && (this.tl.reverse(),
                    this.tl = null)
            }
            clickItem(e) {
                this.clickedItem = e.target.closest(".js-menu-item"),
                this.clickedItem !== this.activeItem && (this.menuIsAnimating || o.isTouch || (this.clickedItem.querySelector(".js-menu-text").style.opacity = 0),
                this.closeMenu())
            }
            onMouseEnterMenuToggle() {
                this.menuOpen || (this.hoverTL.play(),
                l.ZP.timeline().to(this.dom.buttonBg, {
                    scale: 1.15,
                    duration: .25,
                    ease: "none"
                }).to(this.dom.buttonBg, {
                    scale: 1,
                    duration: .25,
                    ease: "none"
                }, "<0.15"))
            }
            onMouseLeaveMenuToggle() {
                this.menuOpen || this.hoverTL.reverse()
            }
            menuToggleHoverTL() {
                this.hoverTL = l.ZP.timeline({
                    paused: !0
                }).to(this.dom.icon, {
                    rotate: "180deg",
                    ease: "expo.inOut",
                    duration: .5
                })
            }
            isOpen() {
                return o.body.classList.contains("has-open-mobile-menu")
            }
            handleToggle() {
                this.isOpen() ? l.ZP.timeline({
                    defaults: {
                        ease: "none",
                        duration: .1
                    }
                }).to(this.dom.buttonInnerBg, {
                    scale: .9
                }).to(this.dom.buttonInnerBg, {
                    scale: 1,
                    onComplete: ()=>{
                        this.closeMenu()
                    }
                }) : (this.openMenu(),
                l.ZP.timeline({
                    defaults: {
                        ease: "none",
                        duration: .1
                    }
                }).to(this.dom.buttonBg, {
                    scale: .9
                }).to(this.dom.buttonBg, {
                    scale: 1
                }))
            }
            openMenu() {
                o.body.classList.add("has-open-mobile-menu"),
                this.menuIsAnimating = !0,
                this.menuOpen = !0,
                this.dom.menuWrapper.style.display = "block",
                this.openTL.play(),
                this.btnTL.play(),
                setTimeout((()=>o.Audio.play({
                    key: "audio.menu_swoosh"
                })), 100),
                o.ASScroll.disable()
            }
            closeMenu() {
                o.body.classList.remove("has-open-mobile-menu"),
                this.menuIsAnimating = !0,
                this.menuOpen = !1,
                this.dom.menuWrapper.style.display = "none",
                this.openTL.reverse(),
                this.btnTL.reverse(),
                setTimeout((()=>o.Audio.play({
                    key: "audio.menu_close"
                })), 400),
                o.ASScroll.enable()
            }
            openMenuTL() {
                this.openTL = l.ZP.timeline({
                    repeatRefresh: !0,
                    paused: !0,
                    defaults: {
                        ease: "expo.inOut",
                        duration: 1
                    },
                    onComplete: ()=>{
                        this.menuIsAnimating = !1,
                        this.tl && this.tl.play()
                    }
                    ,
                    onReverseComplete: ()=>{
                        this.updateActiveItem(),
                        this.menuIsAnimating = !1,
                        this.dom.menuText.forEach((e=>{
                            e.style.opacity = 1
                        }
                        )),
                        this.dom.menu.style.removeProperty("transform"),
                        this.dom.menuInner.style.removeProperty("transform")
                    }
                }).to(this.dom.menu, {
                    x: "0%"
                }, 0).to(this.dom.menuInner, {
                    x: "0%"
                }, 0),
                this.openTL.to(this.dom.menuItem, {
                    x: 0
                }, "<").to(this.dom.underline, {
                    width: "100%",
                    x: 0
                }, "<");
                for (let e = 0; e < this.dom.menuItem.length; e++) {
                    const t = this.dom.menuItem[e].querySelectorAll(".js-menu-chars");
                    this.openTL.to(t, {
                        x: 0,
                        opacity: 1,
                        scaleX: 1,
                        stagger: .02
                    }, "<")
                }
                this.openTL.to(this.dom.worldIcon, {
                    opacity: 1,
                    scaleX: 1
                }, "<0.1").to(this.dom.menuLinks, {
                    opacity: 1,
                    stagger: .075
                }, "<0.1").to([this.dom.inner, this.dom.footerCr], {
                    autoAlpha: 0,
                    duration: .4
                }, "<").to(this.dom.socials, {
                    opacity: 1,
                    duration: .7
                }, "<"),
                o.mq.lg.matches || this.openTL.to(this.dom.footerBtn, {
                    opacity: 0,
                    duration: .4
                }, "<"),
                this.btnTL = l.ZP.timeline({
                    paused: !0,
                    defaults: {
                        ease: "expo.inOut"
                    }
                }).to(this.dom.buttonInnerBg, {
                    scale: 1,
                    duration: 1
                }, "<").to(this.dom.buttonInnerIcon, {
                    rotate: 0,
                    scale: 1,
                    duration: 1
                }, "<").to(this.dom.iconInner[0], {
                    x: 4.5,
                    duration: .5
                }, "<0.1").to(this.dom.iconInner[1], {
                    x: -4.5,
                    duration: .5
                }, "<")
            }
            updateActiveItem() {
                this.activeItem = !1;
                for (let e = 0; e < this.dom.menuItem.length; e++)
                    this.dom.menuItem[e].classList.remove("active"),
                    this.dom.menuItem[e].href === location.href && (this.dom.menuItem[e].classList.add("active"),
                    this.activeItem = this.dom.menuItem[e])
            }
            onResize() {
                o.mq.lg.matches ? this.menuWidth = "40vw" : this.menuWidth = "100%"
            }
            destroy() {
                this.showNavItems()
            }
        }
        class Bs {
            constructor() {
                n.bindAll(this);
                const e = document.querySelector(".js-world-btn");
                this.dom = {
                    el: e,
                    icon: e.querySelector(".js-world-icon"),
                    bg: e.querySelector(".js-world-inner-bg"),
                    hover: e.querySelector(".js-world-btn-hover"),
                    hoverIcon: e.querySelector(".js-world-hover-icon"),
                    textLeft: e.querySelector(".js-world-text-left"),
                    textRight: e.querySelector(".js-world-text-right")
                },
                this.build()
            }
            build() {
                o.isTouch || this.addEvents()
            }
            addEvents() {
                n.on("mouseenter", this.dom.el, this.onMouseEnter),
                n.on("mouseleave", this.dom.el, this.onMouseLeave),
                n.on("click", this.dom.el, this.click)
            }
            onMouseEnter() {
                this.animateBtnIn()
            }
            onMouseLeave() {
                this.animateBtnOut()
            }
            click() {
                l.ZP.timeline({
                    defaults: {
                        ease: "none",
                        duration: .1
                    }
                }).to([this.dom.bg, this.dom.hover], {
                    scale: .9
                }).to([this.dom.bg, this.dom.hover], {
                    scale: 1
                })
            }
            animateBtnIn() {
                this.timeline && this.timeline.clear(),
                this.timeline = l.ZP.timeline({
                    defaults: {
                        ease: "expo.inOut",
                        duration: .5
                    }
                }).to(this.dom.bg, {
                    scale: 1.15,
                    duration: .25,
                    ease: "none"
                }).to(this.dom.icon, {
                    scaleX: .3,
                    scaleY: .7,
                    rotate: "10deg"
                }, "<").to(this.dom.hover, {
                    scale: 1.05,
                    duration: .6
                }, "<0.05").to(this.dom.hoverIcon, {
                    scale: 1,
                    opacity: 1,
                    rotate: 0
                }, "<").to([this.dom.textLeft, this.dom.textRight], {
                    x: "0%"
                }, "<").to(this.dom.bg, {
                    scale: 1,
                    duration: .25,
                    ease: "none"
                }, "<0.15")
            }
            animateBtnOut() {
                this.timeline && this.timeline.clear(),
                this.timeline = l.ZP.timeline().to(this.dom.hoverIcon, {
                    scale: 0,
                    opacity: 0,
                    rotate: "-80deg",
                    ease: "expo.out",
                    duration: .5
                }).to(this.dom.hover, {
                    scale: 0,
                    ease: "expo.out",
                    duration: .6
                }, "<").to(this.dom.icon, {
                    scale: 1,
                    rotate: 0,
                    duration: .5
                }, "<").to(this.dom.textLeft, {
                    x: "100%",
                    ease: "expo.out",
                    duration: .5
                }, "<").to(this.dom.textRight, {
                    x: "-100%",
                    ease: "expo.out",
                    duration: .5
                }, "<")
            }
            hideBtn() {
                l.ZP.timeline().to(this.dom.el, {
                    opacity: 0,
                    ease: "expo.out",
                    duration: .2
                })
            }
            showBtn() {
                l.ZP.timeline().to(this.dom.el, {
                    opacity: 1,
                    ease: "expo.out",
                    duration: .2
                })
            }
        }
        class Ns {
            static get selector() {
                return ".js-mute"
            }
            constructor(e) {
                var t, s, i;
                i = e=>{
                    e ? (o.audioMuted = !0,
                    this.unmuteAnimationTL.pause(),
                    this.muteAnimationTL.restart()) : (o.audioMuted = !1,
                    this.muteAnimationTL.pause(),
                    this.unmuteAnimationTL.restart())
                }
                ,
                (s = "onAudioMuteChange")in (t = this) ? Object.defineProperty(t, s, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[s] = i,
                n.bindAll(this),
                this.dom = {
                    el: e,
                    bg: e.querySelector(".js-mute-bg"),
                    icon: e.querySelectorAll(".js-mute-icon"),
                    lines: e.querySelectorAll(".js-sound-line"),
                    fill: e.querySelectorAll(".js-mute-fill")
                },
                this.scales = [.4, .3, 1, .8, .6],
                o.audioMuted = !1,
                this.build()
            }
            build() {
                this.animateLines(),
                this.resetLines(),
                this.muteAnimation(),
                this.unmuteAnimation(),
                o.audioMuted && (this.mutedOnLoad = !0),
                this.resetLinesTL.play(),
                this.addEvents()
            }
            addEvents() {
                n.on("mouseenter", this.dom.el, this.onMouseEnter),
                n.on("mouseleave", this.dom.el, this.onMouseLeave),
                n.on("click", this.dom.el, this.handleToggle),
                n.on("AudioMute", this.onAudioMuteChange)
            }
            onMouseEnter() {
                o.audioMuted || (this.animateLines(),
                this.animateLinesTL.play(),
                l.ZP.timeline().to(this.dom.bg, {
                    scale: 1.15,
                    duration: .25,
                    ease: "none"
                }).to(this.dom.bg, {
                    scale: 1,
                    duration: .25,
                    ease: "none"
                }, "<0.15"))
            }
            onMouseLeave() {
                o.audioMuted || (this.animateLinesTL.pause(),
                this.resetLinesTL.invalidate().restart(),
                this.animateLinesTL.clear())
            }
            handleToggle() {
                var e;
                null === (e = this.toggleTL) || void 0 === e || e.kill(),
                this.toggleTL = l.ZP.timeline({
                    defaults: {
                        ease: "none",
                        duration: .1
                    }
                }),
                o.audioMuted ? this.toggleTL.to([this.dom.fill, this.dom.bg], {
                    scale: .9
                }).to([this.dom.fill, this.dom.bg], {
                    scale: 1.05,
                    onComplete: ()=>{
                        this.unmute()
                    }
                }) : (this.mute(),
                this.toggleTL.to(this.dom.bg, {
                    scale: .9
                }).to(this.dom.bg, {
                    scale: 1
                }))
            }
            mute() {
                o.audioMuted = !0,
                o.Audio.muteAll(!0)
            }
            unmute() {
                o.audioMuted = !1,
                o.Audio.muteAll(!1)
            }
            animateLines() {
                l.ZP.set(this.dom.lines, {
                    transformOrigin: "50% 100%"
                }),
                this.animateLinesTL = l.ZP.timeline({
                    repeat: -1,
                    repeatRefresh: !0,
                    yoyo: !0,
                    paused: !0
                });
                for (let e = 0; e < this.dom.lines.length; e++)
                    this.animateLinesTL.to(this.dom.lines[e], {
                        scaleY: "random(0.1, 0.95, 0.05)",
                        duration: .45,
                        ease: "none"
                    }, "<")
            }
            resetLines() {
                this.resetLinesTL = l.ZP.timeline({
                    paused: !0,
                    onComplete: ()=>{
                        this.mutedOnLoad && (this.muteAnimationTL.play(),
                        this.mutedOnLoad = !1)
                    }
                });
                for (let e = 0; e < this.dom.lines.length; e++)
                    this.resetLinesTL.to(this.dom.lines[e], {
                        scaleY: this.scales[e],
                        duration: .5,
                        ease: "none"
                    }, "<")
            }
            muteAnimation() {
                this.muteAnimationTL = l.ZP.timeline({
                    paused: !0,
                    defaults: {
                        ease: "expo.inOut",
                        duration: .3
                    },
                    onStart: ()=>{
                        this.animateLinesTL.pause()
                    }
                }).to(this.dom.icon, {
                    scaleY: .15
                }).to(this.dom.fill, {
                    scale: 1.05,
                    duration: .7
                }, "<").to(this.dom.lines, {
                    scaleY: 1,
                    stroke: "#fff"
                }, "<0.05")
            }
            unmuteAnimation() {
                this.unmuteAnimationTL = l.ZP.timeline({
                    paused: !0,
                    defaults: {
                        ease: "expo.inOut",
                        duration: .5
                    },
                    onComplete: ()=>{
                        this.animateLinesTL.invalidate().restart()
                    }
                }),
                this.unmuteAnimationTL.to(this.dom.fill, {
                    scale: 0
                }).to(this.dom.lines, {
                    stroke: "#000"
                }, "<").to(this.dom.icon, {
                    scaleY: 1,
                    onStart: ()=>{
                        this.resetLinesTL.invalidate().restart()
                    }
                }, "<")
            }
            destroy() {
                n.off("mouseenter", this.dom.el, this.onMouseEnter),
                n.off("mouseleave", this.dom.el, this.onMouseLeave),
                n.off("click", this.dom.el, this.handleToggle),
                n.off("AudioMute", this.onAudioMuteChange)
            }
        }
        function Ws(e, t, s) {
            return t in e ? Object.defineProperty(e, t, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = s,
            e
        }
        class Zs {
            constructor() {
                Ws(this, "updateProgress", (e=>{
                    l.ZP.set(this.dom.progressRing, {
                        strokeDashoffset: Math.round(2.44 * (100 - 100 * e))
                    }),
                    e <= 0 ? l.ZP.set(this.dom.progressRing, {
                        opacity: 0
                    }) : l.ZP.set(this.dom.progressRing, {
                        opacity: 1
                    })
                }
                )),
                Ws(this, "changeState", (e=>{
                    const t = e.type
                      , s = e.currentTarget.dataset.cursor && e.currentTarget.dataset.cursor.split(" ") || ["link"];
                    if (this.enabled)
                        switch (t) {
                        case "mouseenter":
                            this[s[0] + "Enter"] && this[s[0] + "Enter"](e, s[1]);
                            break;
                        case "mouseleave":
                            this[s[0] + "Leave"] && this[s[0] + "Leave"](e, s[1]);
                            break;
                        case "mousedown":
                            this[s[0] + "Down"] && this[s[0] + "Down"](e, s[1]);
                            break;
                        case "mouseup":
                            this[s[0] + "Up"] && this[s[0] + "Up"](e, s[1])
                        }
                    this.currentState = "mouseleave" === t ? null : s[0]
                }
                )),
                Ws(this, "hideEnter", (()=>{
                    l.ZP.to(this.dom.wrap, {
                        scale: 0,
                        opacity: 0,
                        ease: "expo.out",
                        duration: .8
                    })
                }
                )),
                Ws(this, "hideLeave", (()=>{
                    l.ZP.to(this.dom.wrap, {
                        scale: 1,
                        opacity: 1,
                        ease: "expo.out",
                        duration: .8
                    })
                }
                )),
                Ws(this, "navWrapperEnter", (e=>{
                    this.stopSqueeze = !0,
                    this.stopMouseMove = !0
                }
                )),
                Ws(this, "navWrapperLeave", (()=>{
                    this.stopMouseMove = !1
                }
                )),
                Ws(this, "navItemEnter", (e=>{
                    this.leaveNavItemTl && this.leaveNavItemTl.clear(),
                    l.ZP.set(this.dom.circle, {
                        rotate: 0,
                        scale: 1
                    }),
                    this.clickHoldPromptActive && (l.ZP.to(this.dom.clickHoldPrompt, {
                        scale: 0,
                        opacity: 0,
                        ease: "expo.out",
                        duration: .8
                    }),
                    l.ZP.to(this.dom.inner, {
                        autoAlpha: 1,
                        ease: "expo.out",
                        duration: .8
                    })),
                    this.enterNavItemTimeline(e)
                }
                )),
                Ws(this, "navItemLeave", (e=>{
                    this.enterNavItemTl && this.enterNavItemTl.clear(),
                    this.leaveNavItemTl = l.ZP.timeline().to(this.dom.circle, {
                        width: "2.2rem",
                        ease: "expo.out",
                        duration: .2,
                        onComplete: ()=>{
                            this.stopSqueeze = !1,
                            l.ZP.set(this.dom.circle, {
                                clearProps: "all"
                            })
                        }
                    }),
                    this.clickHoldPromptActive && (l.ZP.to(this.dom.clickHoldPrompt, {
                        scale: 1,
                        opacity: 1,
                        ease: "expo.out",
                        duration: .8
                    }),
                    l.ZP.to(this.dom.inner, {
                        autoAlpha: 0,
                        ease: "expo.out",
                        duration: .8
                    }))
                }
                )),
                Ws(this, "enterNavItemTimeline", (e=>{
                    this.enterNavItemTl && this.enterNavItemTl.clear(),
                    this.linkPosition = e.target.getBoundingClientRect(),
                    this.width = e.target.offsetWidth,
                    this.height = e.target.offsetHeight,
                    this.enterNavItemTl = l.ZP.timeline().to(this.mouse, {
                        x: this.linkPosition.left + this.width / 2,
                        y: this.linkPosition.top + this.height / 2,
                        ease: "expo.out",
                        duration: .2
                    }).to(this.dom.circle, {
                        width: this.width + "px",
                        ease: "expo.inOut",
                        duration: .65
                    }, "<")
                }
                )),
                Ws(this, "mouseDown", (()=>{
                    if (this.isMouseDown = !0,
                    l.ZP.timeline().to(this.dom.inner, {
                        scale: .8,
                        duration: .2
                    }),
                    "projects" !== o.Highway.properties.slug)
                        return;
                    const e = this.clickHoldTl
                      , t = this.isMouseDown;
                    this.timeout = setTimeout((function() {
                        t && e.play()
                    }
                    ), 250)
                }
                )),
                Ws(this, "mouseUp", (()=>{
                    clearTimeout(this.timeout),
                    this.isMouseDown = !1,
                    this.clickHoldTl.isActive() ? this.reverseOnEnd = !0 : this.hasPlayed ? this.clickHoldTl.reverse() : l.ZP.timeline().to(this.dom.inner, {
                        scale: 1,
                        duration: .2
                    })
                }
                )),
                Ws(this, "clickHoldTimeline", (()=>{
                    this.clickHoldTl = l.ZP.timeline({
                        paused: !0,
                        onComplete: ()=>{
                            this.hasPlayed = !0,
                            this.reverseOnEnd && this.clickHoldTl.reverse()
                        }
                        ,
                        onReverseComplete: ()=>{
                            this.hasPlayed = !1,
                            this.reverseOnEnd = !1,
                            l.ZP.timeline().to(this.dom.inner, {
                                scale: 1,
                                duration: .2
                            })
                        }
                    }),
                    this.clickHoldTl.to(this.dom.inner, {
                        scale: 0,
                        duration: .2
                    }).to(this.dom.hold.inner, {
                        scale: .65,
                        duration: .2,
                        ease: "expo.out"
                    }, "<0.05").to(this.dom.hold.outer, {
                        scale: 1,
                        duration: .2,
                        ease: "expo.out"
                    }, "<0.05")
                }
                )),
                Ws(this, "videoEnter", (()=>{
                    this.videoCursorTl.play(),
                    l.ZP.to(this.dom.progressWrap, {
                        scale: 1,
                        duration: .3,
                        ease: "power1.inOut"
                    })
                }
                )),
                Ws(this, "videoLeave", (()=>{
                    this.videoCursorTl.reverse(),
                    l.ZP.to(this.dom.progressWrap, {
                        scale: 0,
                        duration: .3,
                        ease: "power1.inOut"
                    }),
                    this.updateProgress(0)
                }
                )),
                Ws(this, "dragEnter", (e=>{
                    e.target.dataset.cursorProgress && this.updateProgress(e.target.dataset.cursorProgress),
                    l.ZP.to(this.dom.drag, {
                        scale: 1,
                        duration: .3,
                        ease: "power1.inOut"
                    }),
                    l.ZP.to(this.dom.progressWrap, {
                        scale: 1,
                        duration: .3,
                        ease: "power1.inOut"
                    })
                }
                )),
                Ws(this, "dragLeave", (()=>{
                    l.ZP.to(this.dom.drag, {
                        scale: 0,
                        duration: .3,
                        ease: "power1.inOut"
                    }),
                    l.ZP.to(this.dom.progressWrap, {
                        scale: 0,
                        duration: .3,
                        ease: "power1.inOut"
                    }),
                    this.updateProgress(0)
                }
                )),
                Ws(this, "videoCursorTimeline", (()=>{
                    l.ZP.set([this.dom.video.outer, this.dom.video.icon, this.dom.video.play, this.dom.video.pause], {
                        transformOrigin: "center",
                        scale: 0
                    }),
                    this.videoCursorTl = l.ZP.timeline({
                        paused: !0
                    }).to([this.dom.video.outer, this.dom.video.icon], {
                        scale: 1,
                        duration: .3,
                        ease: "power1.inOut",
                        transformOrigin: "center"
                    })
                }
                )),
                Ws(this, "showClickHoldPrompt", (()=>{
                    o.isTouch || (this.clickHoldPromptActive = !0,
                    l.ZP.timeline().to(this.dom.clickHoldPrompt, {
                        autoAlpha: 1,
                        duration: .5,
                        ease: "expo.out"
                    }).to(this.dom.inner, {
                        autoAlpha: 0,
                        duration: .2,
                        ease: "expo.out"
                    }, "<0.25"))
                }
                )),
                Ws(this, "hideClickHoldPrompt", (()=>{
                    o.isTouch || (this.clickHoldPromptActive = !1,
                    l.ZP.timeline().to(this.dom.clickHoldPrompt, {
                        autoAlpha: 0,
                        duration: .3,
                        ease: "sine.out"
                    }).to(this.dom.inner, {
                        autoAlpha: 1,
                        duration: .2,
                        ease: "expo.out"
                    }, "<"))
                }
                ));
                const e = document.querySelector(".js-cursor");
                o.isTouch ? e.remove() : (n.bindAll(this, ["onMouseMove", "onRaf"]),
                this.dom = {
                    el: e,
                    wrap: e.querySelector(".js-cursor-wrap"),
                    inner: e.querySelector(".js-cursor-inner"),
                    circle: e.querySelector(".js-cursor-circle"),
                    hold: {
                        inner: e.querySelector(".js-cursor-hold-inner"),
                        outer: e.querySelector(".js-cursor-hold-outer")
                    },
                    video: {
                        outer: e.querySelector(".js-cursor-video-outer"),
                        play: e.querySelector(".js-cursor-video-play"),
                        pause: e.querySelector(".js-cursor-video-pause"),
                        icon: e.querySelector(".js-cursor-video-icon")
                    },
                    drag: e.querySelector(".js-cursor-drag"),
                    progressWrap: e.querySelector(".js-cursor-progress"),
                    progressRing: e.querySelector(".js-cursor-progress-ring"),
                    clickHoldPrompt: e.querySelector(".js-cursor-click-hold-prompt"),
                    link: document.querySelector(".js-nav-item")
                },
                this.enabled = !0,
                this.isMouseDown = !1,
                this.hasPlayed = !1,
                this.reverseOnEnd = !1,
                this.timeout = null,
                this.stopMouseMove = !1,
                this.stopSqueeze = !1,
                this.clickHoldPromptActive = !1,
                this.currentState = null,
                this.selectors = "a, button, [data-cursor]",
                this.mouse = {
                    x: -100,
                    y: -100
                },
                this.pos = {
                    x: 0,
                    y: 0
                },
                this.speed = .2,
                this.clickHoldTimeline(),
                this.videoCursorTimeline(),
                this.addEvents())
            }
            disable() {
                o.isTouch || (this.enabled = !1,
                l.ZP.to(this.dom.el, {
                    autoAlpha: 0,
                    duration: .5
                }),
                this.hideEnter(),
                this.dragLeave(),
                this.navWrapperLeave(),
                this.navItemLeave())
            }
            enable() {
                o.isTouch || (this.enabled = !0,
                l.ZP.to(this.dom.el, {
                    autoAlpha: 1,
                    duration: .5
                }),
                "navItem" !== this.currentState && "navWrapper" !== this.currentState || this.navWrapperEnter(),
                this.hideLeave())
            }
            addEvents() {
                n.on(o.events.MOUSEMOVE, this.onMouseMove),
                n.on(o.events.MOUSEDOWN, this.mouseDown),
                n.on(o.events.MOUSEUP, this.mouseUp),
                n.on(o.events.RAF, this.onRaf),
                n.delegate("mouseenter", this.selectors, this.changeState),
                n.delegate("mouseleave", this.selectors, this.changeState),
                n.delegate("mousedown", this.selectors, this.changeState),
                n.delegate("mouseup", this.selectors, this.changeState),
                n.on("cursor:progress", this.updateProgress)
            }
            getAngle(e, t) {
                return 180 * Math.atan2(t, e) / Math.PI
            }
            getSqueeze(e, t) {
                const s = Math.sqrt(Math.pow(e, 2) + Math.pow(t, 2));
                return Math.min(s / 200, .55)
            }
            onRaf() {
                if (!this.enabled)
                    return;
                const e = Math.round(this.mouse.x - this.pos.x)
                  , t = Math.round(this.mouse.y - this.pos.y);
                this.pos.x += e * this.speed,
                this.pos.y += t * this.speed;
                const s = this.getAngle(e, t)
                  , i = this.getSqueeze(e, t)
                  , o = "translate3d(" + this.pos.x + "px ," + this.pos.y + "px, 0)";
                if (this.dom.el.style.transform = o,
                this.stopSqueeze)
                    return;
                const n = "scale(" + (1 + i) + ", " + (1 - i) + ")"
                  , r = "rotate(" + s + "deg)";
                this.dom.circle.style.transform = r + n
            }
            onMouseMove({mousePos: e, event: t}) {
                this.stopMouseMove || (this.mouse.x = t.clientX,
                this.mouse.y = t.clientY)
            }
            reset() {
                this.currentState && this[this.currentState + "Leave"] && this[this.currentState + "Leave"](),
                this.currentState = null
            }
        }
        class qs {
            static get selector() {
                return ".js-video"
            }
            constructor(e) {
                var t, s, i;
                i = ()=>{
                    this.video && (this.progress = this.video.currentTime / this.video.duration,
                    !o.isTouch && this.hovered && n.emit("cursor:progress", this.progress),
                    0 === this.progress && (this.playScale = 1,
                    this.pauseScale = 0,
                    this.iconToggle()))
                }
                ,
                (s = "onTimeUpdate")in (t = this) ? Object.defineProperty(t, s, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[s] = i,
                n.bindAll(this);
                const r = e.closest(".js-video-wrapper");
                this.dom = {
                    el: e,
                    soundToggle: r.querySelector(".js-mute"),
                    videoProgress: r.querySelector(".js-mobile-video-progress"),
                    play: r.querySelector(".js-video-play"),
                    pause: r.querySelector(".js-video-pause")
                },
                o.targetVideo = null,
                this.hovered = !1,
                this.playScale = 1,
                this.pauseScale = 0,
                o.isTouch ? (this.video = this.dom.el,
                this.playIcon = this.dom.play,
                this.pauseIcon = this.dom.pause) : (this.video = o.targetVideo ? o.targetVideo : this.dom.el,
                this.playIcon = ".js-cursor-video-play",
                this.pauseIcon = ".js-cursor-video-pause"),
                this.addEvents(),
                this.isTouch(),
                this.iconToggle()
            }
            addEvents() {
                n.on("click", this.dom.el, this.clickVideo),
                n.on("click", this.dom.soundToggle, this.toggleSound),
                o.isTouch || (n.on("timeupdate", this.dom.el, this.onTimeUpdate),
                n.on("mouseenter", this.dom.el, this.getTargetVideo),
                n.on("mouseleave", this.dom.el, this.removeTargetVideo))
            }
            isTouch() {
                o.isTouch ? this.dom.videoProgress.style.display = "block" : this.dom.videoProgress.style.display = "none"
            }
            getTargetVideo(e) {
                this.dom.el === e.target && (this.hovered = !0,
                o.targetVideo = this.dom.el,
                o.targetVideo.paused ? (this.playScale = 1,
                this.pauseScale = 0) : o.targetVideo.paused || (this.playScale = 0,
                this.pauseScale = 1),
                this.video = o.targetVideo ? o.targetVideo : this.dom.el,
                this.playIcon = ".js-cursor-video-play",
                this.pauseIcon = ".js-cursor-video-pause",
                this.iconToggle(),
                this.onTimeUpdate())
            }
            removeTargetVideo() {
                this.hovered = !1,
                o.targetVideo = null,
                this.playScale = 0,
                this.pauseScale = 0,
                this.iconToggle()
            }
            clickVideo() {
                o.isTouch && (this.video = this.dom.el,
                this.playIcon = this.dom.play,
                this.pauseIcon = this.dom.pause),
                this.video.paused ? this.video.play() : this.video.paused || this.video.pause(),
                this.playScale = 1 === this.playScale ? 0 : 1,
                this.pauseScale = 1 === this.pauseScale ? 0 : 1,
                this.iconToggle()
            }
            iconToggle() {
                l.ZP.to(this.playIcon, {
                    scale: this.playScale,
                    ease: "power1.out",
                    duration: .1
                }),
                l.ZP.to(this.pauseIcon, {
                    scale: this.pauseScale,
                    ease: "power1.out",
                    duration: .1
                })
            }
            toggleSound() {
                this.dom.el.muted ? this.dom.el.muted = !1 : this.dom.el.muted = !0
            }
            destroy() {
                n.off("mouseenter", this.dom.el, this.getTargetVideo),
                n.off("mouseleave", this.dom.el, this.removeTargetVideo),
                n.off("timeupdate", this.dom.el, this.onTimeUpdate),
                n.off("click", this.dom.el, this.clickVideo),
                n.off("click", this.dom.soundToggle, this.toggleSound),
                o.targetVideo = null
            }
        }
        var Vs = s(4458);
        function Ys(e, t, s, i) {
            const o = Math.min(s / e, i / t);
            return {
                width: e * o,
                height: t * o
            }
        }
        class Ks extends i.Kj0 {
            constructor(e, t) {
                super(),
                this.options = t,
                this.assetType = this.options.type,
                this.geometry = new i._12(1,1),
                this.material = e.clone(),
                this.options.position && this.position.copy(this.options.position),
                this.offsetPosition = new i.Pa4,
                this.name = this.options.title,
                this.renderOrder = 1
            }
            updateTexture(e) {
                const t = {
                    w: "image" === this.assetType ? this.options.image_size[0] : e.image.videoWidth,
                    h: "image" === this.assetType ? this.options.image_size[1] : e.image.videoHeight
                }
                  , s = Ys(t.w, t.h, 550, 550);
                this.material.uniforms.u_texture.value = e,
                this.material.uniforms.u_textureSize.value = [t.w, t.h],
                this.material.uniforms.u_meshSize.value = [s.width, s.height],
                this.geometry = new i._12(s.width,s.height);
                const o = i.M8C.randFloat(.6, .9);
                this.scale.set(o, o, 1),
                this.originalScale = this.scale.clone(),
                this.geometry.computeBoundingBox()
            }
        }
        class Xs extends i.jyz {
            constructor() {
                super({
                    uniforms: {
                        fogColor: {
                            value: null
                        },
                        fogNear: {
                            value: null
                        },
                        fogFar: {
                            value: null
                        },
                        u_texture: {
                            value: null
                        },
                        u_textureSize: {
                            value: [1, 1]
                        },
                        u_meshSize: {
                            value: [1, 1]
                        },
                        u_velocity: {
                            value: 0
                        },
                        opacity: {
                            value: 1
                        }
                    },
                    fragmentShader: "#define GLSLIFY 1\nvarying vec2 vUv;\n\nuniform vec3 fogColor;\nuniform float fogNear;\nuniform float fogFar;\nuniform sampler2D u_texture;\nuniform vec2 u_textureSize;\nuniform vec2 u_meshSize;\nuniform float u_velocity;\nuniform float opacity;\n\nvoid main() {\n\n\tvec2 uv = vUv;\n\tvec2 scaleOrigin = vec2(0.5, 0.5);\n\n\tvec4 origColor = texture2D(u_texture, vec2(vec2(vUv - scaleOrigin) / (1. + u_velocity) + scaleOrigin));\n\torigColor.a = origColor.a * opacity;\n\n\tgl_FragColor = origColor;\n\n\t#ifdef USE_FOG\n\t\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\t\tfloat depth = gl_FragDepthEXT / gl_FragCoord.w;\n\t\t#else\n\t\t\tfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n\t\t#endif\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n\t\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n\t#endif\n\n}",
                    vertexShader: st,
                    fog: !0,
                    transparent: !0,
                    depthTest: !1
                })
            }
            setFog(e) {
                this.uniforms.fogColor.value = e.color,
                this.uniforms.fogNear.value = e.near,
                this.uniforms.fogFar.value = e.far
            }
        }
        var $s = "#define GLSLIFY 1\nvarying vec2 vUv;\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;\n\nvoid main () {\n    vUv = uv;\n\n\tvec3 objectNormal = vec3(normal);\n\tvec3 transformedNormal = objectNormal;\n\tvNormal = normalMatrix * transformedNormal;\n\n\tvec4 mvPosition = vec4( position, 1.0 );\n\tmvPosition = modelViewMatrix * mvPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\n\tvViewPosition = -mvPosition.xyz;\n}"
          , Qs = "precision highp float;\n#define GLSLIFY 1\n\nvarying vec2 vUv;\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;\n\nuniform float uAlpha;\nuniform sampler2D uMatcap;\nuniform sampler2D uMatcapMap;\n\nvoid main() {\n    vec2 uv = vUv;\n\n\tvec3 normal = normalize( vNormal );\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 matcapUv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n\n\tvec4 matcapColor = texture2D( uMatcap, matcapUv );\n\n\tvec3 matcapMap = texture2D(uMatcapMap, uv).rgb;\n\n\tvec3 matcapMask = matcapColor.rgb * matcapMap.r;\n\tvec3 finalColor = (1. - matcapMap) + matcapMask;\n\n    gl_FragColor = vec4(finalColor, uAlpha);\n}\n"
          , Js = s(5184)
          , ei = s(8304);
        const ti = {
            uniforms: {
                damp: {
                    value: .96
                },
                tOld: {
                    value: null
                },
                tNew: {
                    value: null
                }
            },
            vertexShader: "\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvUv = uv;\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t}",
            fragmentShader: "\n\n\t\tuniform float damp;\n\n\t\tuniform sampler2D tOld;\n\t\tuniform sampler2D tNew;\n\n\t\tvarying vec2 vUv;\n\n\t\tvec4 when_gt( vec4 x, float y ) {\n\n\t\t\treturn max( sign( x - y ), 0.0 );\n\n\t\t}\n\n\t\tvoid main() {\n\n\t\t\tvec4 texelOld = texture2D( tOld, vUv );\n\t\t\tvec4 texelNew = texture2D( tNew, vUv );\n\n\t\t\ttexelOld *= damp * when_gt( texelOld, 0.05 );\n\n\t\t\tgl_FragColor = max(texelNew, texelOld);\n\n\t\t}"
        };
        class si extends ei.w {
            constructor(e=.96) {
                super(),
                void 0 === ti && console.error("THREE.AfterimagePass relies on AfterimageShader"),
                this.shader = ti,
                this.uniforms = i.rDY.clone(this.shader.uniforms),
                this.uniforms.damp.value = e,
                this.textureComp = new i.dd2(window.innerWidth,window.innerHeight,{
                    minFilter: i.wem,
                    magFilter: i.TyD,
                    format: i.wk1
                }),
                this.textureOld = new i.dd2(window.innerWidth,window.innerHeight,{
                    minFilter: i.wem,
                    magFilter: i.TyD,
                    format: i.wk1
                }),
                this.shaderMaterial = new i.jyz({
                    uniforms: this.uniforms,
                    vertexShader: this.shader.vertexShader,
                    fragmentShader: this.shader.fragmentShader
                }),
                this.compFsQuad = new ei.T(this.shaderMaterial);
                const t = new i.vBJ;
                this.copyFsQuad = new ei.T(t)
            }
            render(e, t, s) {
                this.uniforms.tOld.value = this.textureOld.texture,
                this.uniforms.tNew.value = s.texture,
                e.setRenderTarget(this.textureComp),
                this.compFsQuad.render(e),
                this.copyFsQuad.material.map = this.textureComp.texture,
                this.renderToScreen ? (e.setRenderTarget(null),
                this.copyFsQuad.render(e)) : (e.setRenderTarget(t),
                this.clear && e.clear(),
                this.copyFsQuad.render(e));
                const i = this.textureOld;
                this.textureOld = this.textureComp,
                this.textureComp = i
            }
            setSize(e, t) {
                this.textureComp.setSize(e, t),
                this.textureOld.setSize(e, t)
            }
            dispose() {
                this.compFsQuad.dispose(),
                this.copyFsQuad.dispose(),
                this.textureComp.dispose(),
                this.textureOld.dispose()
            }
        }
        class ii extends i.ZAu {
            constructor(e, t, s, n) {
                super(),
                this.mesh = new i.Kj0(e,t),
                this.add(this.mesh),
                this.navType = s,
                this._dragPos = new i.Pa4,
                this.rotating = !1,
                "prev" === this.navType ? (this.mesh.rotation.set(i.M8C.degToRad(180), i.M8C.degToRad(0), i.M8C.degToRad(90)),
                this.position.x = -n) : "next" === this.navType && (this.mesh.rotation.set(i.M8C.degToRad(0), i.M8C.degToRad(0), i.M8C.degToRad(-90)),
                this.position.x = n),
                o.mq.sm.matches || (this.position.y = -525,
                this.position.x = "prev" === this.navType ? -100 : 100),
                this.originalPosition = this.position.clone(),
                this.originalRotation = this.mesh.rotation.clone(),
                this.mesh.scale.setScalar(20),
                this.originalScale = this.mesh.scale.clone(),
                this.spinCount = 0,
                this.bbox = (new i.ZzF).setFromObject(this),
                this.bbox.expandByScalar(75),
                this.originalBbox = this.bbox.clone(),
                this.position.x = 0
            }
            updateBox3(e) {
                this._dragPos.copy(e).setZ(290),
                this.bbox.copy(this.originalBbox).translate(this._dragPos)
            }
            updateHoverRotation(e) {
                l.ZP.killTweensOf(this.rotation),
                this.rotation.x = i.M8C.lerp(this.rotation.x, 3 * e.y, .1),
                this.rotation.y = i.M8C.lerp(this.rotation.y, -2 * e.x, .1)
            }
            onHover() {
                o.isTouch || l.ZP.to(this.mesh.scale, {
                    x: this.originalScale.x + 10,
                    y: this.originalScale.y + 10,
                    z: this.originalScale.z + 10,
                    duration: 1,
                    ease: "expo.out"
                })
            }
            reset() {
                l.ZP.to(this.rotation, {
                    x: 0,
                    y: 0,
                    z: 0,
                    duration: 1,
                    ease: "expo.out"
                }),
                l.ZP.to(this.mesh.scale, {
                    x: this.originalScale.x,
                    y: this.originalScale.y,
                    z: this.originalScale.z,
                    duration: 1,
                    ease: "expo.out"
                })
            }
        }
        function oi(e, t) {
            var s = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                t && (i = i.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                s.push.apply(s, i)
            }
            return s
        }
        function ni(e) {
            for (var t = 1; t < arguments.length; t++) {
                var s = null != arguments[t] ? arguments[t] : {};
                t % 2 ? oi(Object(s), !0).forEach((function(t) {
                    ri(e, t, s[t])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(s)) : oi(Object(s)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(s, t))
                }
                ))
            }
            return e
        }
        function ri(e, t, s) {
            return t in e ? Object.defineProperty(e, t, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = s,
            e
        }
        class ai {
            constructor() {
                ri(this, "introRaf", (e=>{
                    this.params.velocity *= .94,
                    this.sphere.rotation.y += this.params.velocity + .002 * Math.sign(this.params.velocity),
                    this.camera.position.z = this.initialCameraZ,
                    this.camera.lookAt(this.camera.position),
                    this.camera.translateZ(this.options.cameraTranslateZ),
                    this.renderIntroText(e),
                    this.transitionPass.uniforms.u_time.value = e
                }
                )),
                ri(this, "onRaf", (e=>{
                    this.allowControl && (this.dragging ? (this.dragVelocity.x = this.dragPos.x - this.previousDragPos.x,
                    this.dragVelocity.y = this.dragPos.y - this.previousDragPos.y) : this.itemOpen || (this.dragPos.x += this.dragVelocity.x,
                    this.dragPos.y += this.dragVelocity.y,
                    this.dragVelocity.multiplyScalar(this.dragFriction))),
                    this.smoothDragVelocity.x += .05 * (Math.abs(this.dragVelocity.x) - this.smoothDragVelocity.x),
                    this.smoothDragVelocity.y += .05 * (Math.abs(this.dragVelocity.y) - this.smoothDragVelocity.y),
                    this.afterImagePass.uniforms.damp.value = i.M8C.clamp((this.smoothDragVelocity.x + this.smoothDragVelocity.y) * this.params.trailVelocity, 0, this.params.trailDrag),
                    this.mouseVelocity.multiplyScalar(.9),
                    this.smoothMouse.lerp(o.mouse.glNormalized, .075),
                    this.smoothMouse2.lerp(o.mouse.glNormalized, .02),
                    this.updateCamera(),
                    this.sphere.position.x = this.camera.position.x,
                    this.sphere.position.y = this.camera.position.y,
                    this.updatePositions(),
                    this.updateCursorPosition(),
                    this.checkVisibility(),
                    this.updateProximity(),
                    this.updateRaycaster(),
                    this.scanlines.uniforms.time.value = e,
                    o.Gl.cssRenderer.render(o.Gl.cssScene, this.camera)
                }
                )),
                ri(this, "onClick", (e=>{
                    if (e.contains(o.ASScroll.containerElement) && !this.dragging && this.allowSwitch)
                        if (this.itemOpen) {
                            if (this.hoveringPrev)
                                return void this.switchItem();
                            if (this.hoveringNext)
                                return void this.switchItem(!0);
                            this.hideItem()
                        } else
                            this.intersects.length > 0 && (this.itemOpen = !0,
                            this.dragVelocity.setScalar(0),
                            this.openItem = this.intersects[0].object,
                            this.showItem())
                }
                )),
                ri(this, "onWheel", (e=>{
                    this.allowControl && (this.itemOpen || (this.dragging = !0,
                    this.previousDragPos.copy(this.dragPos),
                    this.dragPos.x += 1.2 * e.deltaX,
                    this.dragPos.y -= 1.2 * e.deltaY,
                    this.params.velocity -= 1e-5 * e.deltaX))
                }
                )),
                ri(this, "onPointerDrag", (({ox: e, px: t, x: s, oy: i, py: o, y: n})=>{
                    this.allowControl && (this.itemOpen || Math.abs(e - s) < 2 || Math.abs(i - n) < 2 || (this.dragging = !0,
                    this.previousDragPos.copy(this.dragPos),
                    this.dragPos.x += (t - s) * this.dragMultiplier,
                    this.dragPos.y -= (o - n) * this.dragMultiplier,
                    this.params.velocity += 1e-4 * (s - t)))
                }
                )),
                ri(this, "onPointerMove", (({mousePos: e, event: t})=>{
                    this.allowControl && (this.mouseVelocity.x += .2 * (this.mousePos.x - e.x),
                    this.mouseVelocity.y += .2 * (this.mousePos.y - e.y),
                    this.mousePos.copy(e))
                }
                )),
                ri(this, "onPointerDown", (({mousePos: e, event: t})=>{
                    this.allowControl && (this.pointerDown = !0,
                    this.doClick = t.target,
                    clearTimeout(this.clickTimeout),
                    this.clickTimeout = setTimeout((()=>{
                        this.doClick = !1
                    }
                    ), 200),
                    this.itemOpen || (this.cursor && (this.cursor.grab.visible = !1,
                    this.cursor.grabbing.visible = !0,
                    this.cursor.pointer.visible = !1),
                    this.openTimeline && this.openTimeline.isActive() && (l.ZP.killTweensOf(this.edgeWarp.u_strength, null),
                    l.ZP.killTweensOf(this.edgeWarp.u_scale),
                    l.ZP.killTweensOf(this.camera.scale, "x,y")),
                    this.draggingTl && this.draggingTl.kill(),
                    this.draggingTl = l.ZP.timeline({
                        defaults: {
                            ease: "power2.out",
                            duration: .75,
                            delay: .1
                        }
                    }).to(this.edgeWarp.uniforms.u_strength, {
                        value: this.edgeWarpParams.strength
                    }, 0).to(this.edgeWarp.uniforms.u_scale, {
                        value: 1.2
                    }, 0).to(this.camera.scale, {
                        x: this.camera.originalScale.x + .35,
                        y: this.camera.originalScale.y + .35
                    }, 0),
                    this.cursor && this.draggingTl.to(this.cursor.position, {
                        z: -100,
                        duration: 1
                    }, 0)))
                }
                )),
                ri(this, "onPointerUp", (({event: e})=>{
                    clearTimeout(this.clickTimeout),
                    this.doClick && this.onClick(this.doClick),
                    this.dragging = !1,
                    this.pointerDown = !1,
                    this.cursor && (this.cursor.grab.visible = !0,
                    this.cursor.grabbing.visible = !1),
                    this.itemOpen || (this.draggingTl && this.draggingTl.kill(),
                    this.draggingTl = l.ZP.timeline({
                        defaults: {
                            ease: "expo.out",
                            duration: 1
                        }
                    }).to(this.edgeWarp.uniforms.u_strength, {
                        value: 0
                    }, 0).to(this.edgeWarp.uniforms.u_scale, {
                        value: 1
                    }, 0).to(this.camera.scale, {
                        x: this.camera.originalScale.x,
                        y: this.camera.originalScale.y
                    }, 0),
                    this.cursor && this.draggingTl.to(this.cursor.position, {
                        z: 0,
                        duration: 1
                    }, 0))
                }
                )),
                ri(this, "onKeyUp", (e=>{
                    this.itemOpen && !this.dragging && this.allowSwitch && ("ArrowLeft" !== e.key ? "ArrowRight" !== e.key ? "Escape" === e.key && this.hideItem() : this.switchItem(!0) : this.switchItem())
                }
                )),
                ri(this, "onLinkEnter", (()=>{
                    this.cursor && this.allowControl && l.ZP.to(this.cursor.scale, {
                        x: 0,
                        y: 0,
                        z: 0,
                        ease: "expo.out",
                        duration: .2,
                        overwrite: !0
                    })
                }
                )),
                ri(this, "onLinkLeave", (()=>{
                    this.cursor && this.allowControl && l.ZP.to(this.cursor.scale, {
                        x: this.cursor.originalScale,
                        y: this.cursor.originalScale,
                        z: this.cursor.originalScale,
                        ease: "elastic.out(1, 0.3)",
                        duration: 2,
                        overwrite: !0
                    })
                }
                )),
                ri(this, "onResize", (()=>{
                    this.scaleScene(),
                    this.camera.fov = 2 * Math.atan(o.window.fullHeight / 2 / this.initialCameraZ) * 180 / Math.PI,
                    this.camera.aspect = o.window.w / o.window.fullHeight,
                    this.camera.updateProjectionMatrix(),
                    this.setOpenItemScale()
                }
                )),
                ri(this, "updateHtmlScale", (()=>{
                    this.details.scale.setScalar(1.5 / (.001 * o.Gl.cssRenderer.cache.camera.fov))
                }
                )),
                this.dom = {},
                this.camera = o.Gl.camera.clone(),
                this.scene = new i.xsS,
                this.firstLoad = !1,
                this.allowControl = !1,
                this.allowSwitch = !0,
                this.pointerDown = !1,
                this.itemOpen = !1,
                this.hoveredItem = !1,
                this.hoveredHand = !1,
                this.updateIntroText = !0,
                this.introFinished = !1,
                this.showGridPlayed = !1,
                this.gridReady = !1,
                this.hasVisited = !1,
                this.switchTimeline = null,
                this.params = {
                    velocity: .005,
                    trailDrag: .7,
                    trailVelocity: .03
                },
                this.backgroundColorGl = new i.Ilk(328965),
                this.scene.background = this.backgroundColorGl,
                this.scene.fog = new i.ybr(this.backgroundColorGl,this.camera.position.z,this.camera.far),
                this.scaleScene(),
                this.clickableItems = [],
                this.postLoadVideos = [],
                this.sectionWidth = 700,
                this.sectionHeight = 700,
                this.mousePos = new i.FM8(o.window.w / 2,o.window.h / 2),
                this.mouseVelocity = new i.FM8,
                this.initialCameraZ = this.camera.position.z,
                this.dragVelocity = new i.FM8,
                this.smoothDragVelocity = new i.FM8,
                this.dragFriction = o.isTouch ? .94 : .96,
                this.dragMultiplier = o.isTouch ? 3 : 1.25,
                this.smoothMouse = new i.FM8,
                this.smoothMouse2 = new i.FM8,
                this._q = new i._fP,
                this._e = new i.USm,
                this.options = {
                    mouseMoveAngleX: .135,
                    mouseMoveAngleY: .035,
                    cameraZOffset: 100,
                    cameraTranslateZ: 0,
                    cameraMovementMultiplier: 0,
                    navHandsSpaceFromCenter: o.mq.md.matches ? 520 : 320,
                    openItemScale: 1.3
                },
                this.setOpenItemScale(),
                this.raycaster = new i.iMs,
                this.frustum = new i.iWj,
                this.cameraViewProjectionMatrix = new i.yGw,
                this.resourceTracker = new gs
            }
            build() {
                Object.assign(this.dom, {
                    details: g(".js-details"),
                    detailsTitleWrap: g(".js-details-title-wrap"),
                    detailsTitle: g(".js-details-title"),
                    detailsMeta: g(".js-details-meta"),
                    detailsAuthorWrap: g(".js-details-author-wrap"),
                    detailsAuthor: g(".js-details-author"),
                    detailsBtn: g(".js-details-btn"),
                    detailsCaption: g(".js-details-caption")
                }),
                this.camera.rotation.set(0, 0, 0),
                this.detailsScene = new i.xsS,
                this.mediaMaterial = new Xs,
                this.mediaMaterial.setFog(this.scene.fog),
                this.media = window.worldData;
                for (let e = 0; e < this.media.length; e++)
                    this.media[e].color = new i.Ilk(this.media[e].color);
                this.addItems(),
                this.addDetails(),
                this.buildNavHands(),
                this.buildCursor(),
                this.initialCameraZ = this.camera.position.z,
                this.dragPos = this.camera.position.clone(),
                this.previousDragPos = this.dragPos.clone(),
                this.addPost(),
                this.addEvents(),
                this.gridReady = !0,
                this.firstLoad || this.showGrid(),
                o.urlParams.has("skipintro") && (this.introFinished = !0,
                this.showGrid())
            }
            buildIntro() {
                this.dom.introWrap = g(".js-world-intro"),
                this.dom.introSvg = g("svg", this.dom.introWrap),
                this.dom.introText = g("p", this.dom.introWrap),
                document.body.appendChild(this.dom.introWrap),
                this.addSphere();
                const e = [];
                this.introTextGroup = new i.ZAu;
                const t = new nt.xv;
                Object.assign(t, {
                    text: "UNSEEN",
                    font: o.Gl.webglFonts["Neue Montreal"].url,
                    fontSize: 2 === this.camera.scale.x ? 85 : 170,
                    letterSpacing: -.03,
                    anchorX: "center",
                    anchorY: "middle",
                    color: 16777215,
                    sdfGlyphSize: o.Gl.webglFonts["Neue Montreal"].sdfGlyphSize,
                    textAlign: "center",
                    material: new i.jyz({
                        vertexShader: "#define GLSLIFY 1\nvarying vec2 vUv;\n\nvoid main () {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1 );\n}",
                        fragmentShader: "#define GLSLIFY 1\nvarying vec2 vUv;\n\nuniform float u_time;\nuniform float u_strength;\nuniform float u_opacity;\n\nvoid main () {\n\tvec4 color = vec4(1.);\n\n\tfloat time = fract(u_time * u_strength) * 15.;\n\tfloat division = 1. / 12.;\n\n    float a1 = (step(division, abs(vUv.x - division)) + sin(time + 1.12)) * u_opacity;\n    float a2 = (step(division, abs(vUv.x - division * 3.)) + sin(time + 0.25)) * u_opacity;\n\tfloat a3 = (step(division, abs(vUv.x - division * 5.)) + sin(time + 1.23)) * u_opacity;\n    float a4 = (step(division, abs(vUv.x - division * 7.)) + sin(time + 0.86)) * u_opacity;\n\tfloat a5 = (step(division, abs(vUv.x - division * 9.)) + sin(time + 1.832)) * u_opacity;\n    float a6 = (step(division, abs(vUv.x - division * 11.)) + sin(time + 1.)) * u_opacity;\n\n\tcolor.a = a1 * a2 * a3 * a4 * a5 * a6;\n\tgl_FragColor = color;\n}",
                        uniforms: {
                            u_time: {
                                value: 0
                            },
                            u_strength: {
                                value: 1
                            },
                            u_opacity: {
                                value: 0
                            }
                        },
                        depthTest: !1
                    })
                }),
                e.push(new Promise((e=>{
                    t.sync(e)
                }
                ))),
                this.introTextGroup.add(t);
                const s = new nt.xv;
                Object.assign(s, {
                    text: "WORLD",
                    font: o.Gl.webglFonts["Saol Display"].url,
                    fontSize: 2 === this.camera.scale.x ? 91 : 178,
                    letterSpacing: -.03,
                    anchorX: "center",
                    anchorY: "middle",
                    color: 16777215,
                    sdfGlyphSize: o.Gl.webglFonts["Saol Display"].sdfGlyphSize
                }),
                s.material.opacity = 0,
                s.material.depthTest = !1,
                s.position.y = 2 === this.camera.scale.x ? 6 : 11,
                e.push(new Promise((e=>{
                    s.sync(e)
                }
                ))),
                this.introTextGroup.add(s),
                this.scene.add(this.introTextGroup),
                Promise.all(e).then((()=>{
                    const e = (2 * t.geometry.boundingBox.max.x - 2 * s.geometry.boundingBox.max.x) / 2;
                    this.unseenWordPos = -t.geometry.boundingBox.max.x + e,
                    this.worldWordPos = s.geometry.boundingBox.max.x + e - 20,
                    2 === this.camera.scale.x && (this.worldWordPos += 7),
                    this.firstLoad && o.PageLoader.hiddenPromise.then((()=>{
                        this.playIntro(0)
                    }
                    ))
                }
                )),
                this.addIntroPost()
            }
            in() {
                return new Promise((e=>{
                    this.renderPass.enabled = !0,
                    this.savePass.enabled = !0,
                    this.transitionPass.enabled = !0,
                    l.ZP.timeline().fromTo(this.transitionPass.uniforms.u_progress, {
                        value: 0
                    }, {
                        value: 1,
                        duration: 2.5,
                        ease: "power2.inOut",
                        onComplete: ()=>{
                            this.savePass.enabled = !1,
                            this.transitionPass.enabled = !1,
                            e()
                        }
                    }).fromTo(this.options, {
                        cameraTranslateZ: 1e3
                    }, {
                        cameraTranslateZ: 0,
                        duration: 2.5,
                        ease: "power2.inOut"
                    }, "<").call((()=>{
                        document.body.classList.add("dark")
                    }
                    ), null, 1.6),
                    this.playIntro()
                }
                ))
            }
            out() {
                return new Promise((e=>{
                    this.allowControl = !1,
                    this.savePass.enabled = !0,
                    this.transitionPass.enabled = !0,
                    l.ZP.fromTo(this.transitionPass.uniforms.u_progress, {
                        value: 1
                    }, {
                        value: 0,
                        duration: 2.5,
                        ease: "power2.inOut",
                        onComplete: ()=>{
                            e(),
                            setTimeout((()=>{
                                this.savePass.enabled = !1,
                                this.transitionPass.enabled = !1
                            }
                            ), 100)
                        }
                    }),
                    l.ZP.fromTo(this.options, {
                        cameraTranslateZ: 0
                    }, {
                        cameraTranslateZ: 1e3,
                        duration: 2.5,
                        ease: "power2.inOut"
                    })
                }
                ))
            }
            playIntro(e=.5) {
                this.updateIntroText = !0,
                this.addIntroEvents(),
                this.introPass.enabled = !0,
                this.introTimeline = l.ZP.timeline({
                    delay: e,
                    defaults: {
                        ease: "expo.inOut",
                        duration: this.hasVisited ? 1 : 1.5
                    },
                    onComplete: ()=>{
                        this.introFinished = !0,
                        this.gridReady && this.showGrid(),
                        this.hasVisited = !0
                    }
                }).to(this.sphere.scale, {
                    x: 500,
                    y: 500,
                    z: 500,
                    duration: this.hasVisited ? 2 : 3,
                    ease: "expo.out"
                }, 0).to(this.introTextGroup.children[0].material.uniforms.u_opacity, {
                    value: 1,
                    duration: .25,
                    ease: "expo.out"
                }, this.hasVisited ? "<1" : "<").to(this.introTextGroup.children[0].material.uniforms.u_strength, {
                    value: 0,
                    duration: .2,
                    ease: "power2.out"
                }, ">0.5").to(this.introTextGroup.children[0].position, {
                    x: this.unseenWordPos
                }, ">0.3").to(this.introTextGroup.children[1].position, {
                    x: this.worldWordPos
                }, "<").to(this.introTextGroup.children[1].material, {
                    opacity: 1
                }, "<"),
                this.hasVisited || this.introTimeline.set(this.dom.introWrap, {
                    visibility: "visible"
                }, "<").fromTo(this.dom.introSvg, {
                    rotateY: 90
                }, {
                    rotateY: 0
                }, "<").fromTo(this.dom.introText, {
                    rotateZ: 5,
                    y: "100%"
                }, {
                    rotateZ: 0,
                    y: "0%",
                    ease: "expo.out"
                }, "<")
            }
            showGrid() {
                this.introFinished && (this.showGridPlayed || (this.showGridPlayed = !0,
                this.showGridTimeline = l.ZP.timeline({
                    delay: this.hasVisited ? 0 : 1.5,
                    defaults: {
                        ease: "expo.inOut",
                        duration: 1.5
                    },
                    onComplete: ()=>{
                        this.updateIntroText = !1,
                        this.introTextGroup.visible = !1,
                        this.introPass.enabled = !1
                    }
                }).to(this.introPass.uniforms.u_strength, {
                    value: 0,
                    duration: 1,
                    ease: "power2.inOut"
                }, 0).to(this.sphere.scale, {
                    x: 700,
                    y: 700,
                    z: 700
                }, 0).to(this.introTextGroup.children[0].material.uniforms.u_opacity, {
                    value: 0
                }, "<").to(this.introTextGroup.children[1].material, {
                    opacity: 0
                }, "<").to(this.dom.introSvg, {
                    rotateY: 90
                }, "<").to(this.dom.introText, {
                    rotateZ: 5,
                    y: "100%"
                }, "<").to(this.dom.introWrap, {
                    autoAlpha: 0,
                    duration: .5
                }, "<0.5").to(this.items.position, {
                    z: 0,
                    duration: 1.5,
                    ease: "power4.out"
                }, .4).to(this.options, {
                    cameraMovementMultiplier: .5
                }, "<").to(o.Gl.cssRenderer.domElement, {
                    autoAlpha: 1,
                    duration: .5,
                    ease: "power2.out"
                }, "<").call((()=>{
                    this.allowControl = !0,
                    this.cursor && l.ZP.to(this.cursor.scale, {
                        x: this.cursor.originalScale,
                        y: this.cursor.originalScale,
                        z: this.cursor.originalScale,
                        ease: "elastic.out(1, 0.3)",
                        duration: 2
                    })
                }
                ), null, 1)))
            }
            addItems() {
                this.items = new i.ZAu,
                this.items.position.z = -this.camera.far,
                this.gridMap = {
                    columns: [],
                    rows: []
                },
                this.itemCount = Math.pow(Math.round(Math.sqrt(2 * this.media.length)), 2),
                this.itemCount = this.itemCount < 25 ? 25 : this.itemCount;
                const e = Math.sqrt(this.itemCount);
                let t = 0
                  , s = 0
                  , o = 0
                  , n = 0;
                const r = 100 + Math.round(this.itemCount / 2);
                this.loopCount = new i.FM8(r,r),
                this.camera.position.x = this.sectionWidth * this.loopCount.x,
                this.camera.position.y = this.sectionHeight * this.loopCount.y;
                for (let r = 0; r < this.itemCount; r++) {
                    this.gridMap.columns[o] || (this.gridMap.columns[o] = []),
                    this.gridMap.rows[n] || (this.gridMap.rows[n] = []);
                    const a = new i.ZAu;
                    a.offsetPosition = new i.Pa4;
                    const l = new Ks(this.mediaMaterial,ni(ni({}, this.media[t]), {}, {
                        index: r
                    }));
                    l.updateTexture(this.assets.itemTextures[t]),
                    l.position.set(i.M8C.randInt(-125, 125), i.M8C.randInt(-125, 125), i.M8C.randInt(-50, 50)),
                    l.originalPosition = l.position.clone(),
                    a.add(l),
                    this.gridMap.columns[o].push(a),
                    this.gridMap.rows[n].push(a),
                    this.items.add(a),
                    this.clickableItems.push(l),
                    t++,
                    s++,
                    o++,
                    o === e && (o = 0),
                    s % e == 0 && n++,
                    t === this.media.length && (t = 0)
                }
                this.updatePositions(!0),
                this.scene.add(this.items),
                this.resourceTracker.track(this.items)
            }
            buildNavHands() {
                this.navHands = new i.ZAu,
                this.navHands.position.z = 290,
                this.handMaterial = new i.jyz({
                    vertexShader: $s,
                    fragmentShader: Qs,
                    uniforms: {
                        uMatcapMap: {
                            value: this.assets.textures.pointer
                        },
                        uMatcap: {
                            value: o.Gl.assets.textures.matcapBlack
                        },
                        uAlpha: {
                            value: 0
                        }
                    },
                    depthTest: !1,
                    transparent: !0
                }),
                this.prevHand = new ii(this.assets.models.pointer.geometry.clone(),this.handMaterial,"prev",this.options.navHandsSpaceFromCenter),
                this.navHands.add(this.prevHand),
                this.nextHand = new ii(this.assets.models.pointer.geometry.clone(),this.handMaterial,"next",this.options.navHandsSpaceFromCenter),
                this.navHands.add(this.nextHand),
                this.detailsScene.add(this.navHands),
                this.resourceTracker.track(this.navHands)
            }
            buildCursor() {
                o.isTouch || (this.cursor = new i.ZAu,
                this.cursor.grab = new i.Kj0(this.assets.models.grab.geometry,new i.jyz({
                    vertexShader: $s,
                    fragmentShader: Qs,
                    uniforms: {
                        uMatcapMap: {
                            value: this.assets.textures.grab
                        },
                        uMatcap: {
                            value: o.Gl.assets.textures.matcapBlack
                        },
                        uAlpha: {
                            value: 1
                        }
                    },
                    depthTest: !1,
                    transparent: !0
                })),
                this.cursor.add(this.cursor.grab),
                this.cursor.grabbing = new i.Kj0(this.assets.models.grabbing.geometry,new i.jyz({
                    vertexShader: $s,
                    fragmentShader: Qs,
                    uniforms: {
                        uMatcapMap: {
                            value: this.assets.textures.grabbing
                        },
                        uMatcap: {
                            value: o.Gl.assets.textures.matcapBlack
                        },
                        uAlpha: {
                            value: 1
                        }
                    },
                    depthTest: !1,
                    transparent: !0
                })),
                this.cursor.grabbing.visible = !1,
                this.cursor.add(this.cursor.grabbing),
                this.cursor.pointer = new i.Kj0(this.assets.models.pointer.geometry.clone(),new i.jyz({
                    vertexShader: $s,
                    fragmentShader: Qs,
                    uniforms: {
                        uMatcapMap: {
                            value: this.assets.textures.pointer
                        },
                        uMatcap: {
                            value: o.Gl.assets.textures.matcapBlack
                        },
                        uAlpha: {
                            value: 1
                        }
                    },
                    depthTest: !1,
                    transparent: !0
                })),
                this.cursor.pointer.visible = !1,
                this.cursor.add(this.cursor.pointer),
                this.cursor.renderOrder = 100,
                this.cursor.position.z = 0,
                this.cursor.originalScale = 20,
                this.cursor.scale.setScalar(0),
                this.resourceTracker.track(this.cursor),
                this.scene.add(this.cursor))
            }
            addDetails() {
                this.details = new dt(g(".js-details")),
                this.resourceTracker.track(this.details),
                o.Gl.cssScene.add(this.details)
            }
            addSphere() {
                const e = new i.TOt(new i.Aip(1,50,28))
                  , t = new i.nls({
                    color: 3881787
                });
                this.sphere = new i.ejS(e,t),
                this.sphere.scale.setScalar(50),
                this.sphere.position.z = -450,
                this.scene.add(this.sphere)
            }
            addIntroPost() {
                this.renderPass = new Vs.C(this.scene,this.camera),
                this.renderPass.name = "World",
                this.renderPass.enabled = this.firstLoad,
                this.savePass = new Js.o(new i.dd2(o.window.w * o.Gl.renderer.getPixelRatio(),o.window.fullHeight * o.Gl.renderer.getPixelRatio(),{
                    minFilter: i.wem,
                    magFilter: i.wem,
                    depthBuffer: !1
                })),
                this.savePass.name = "World Final",
                this.savePass.enabled = !1,
                this.transitionPass = new ot.T(new i.jyz({
                    vertexShader: "#define GLSLIFY 1\nvarying vec2 vUv;\n\nvoid main () {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1 );\n}",
                    fragmentShader: "#define GLSLIFY 1\nvarying vec2 vUv;\n\nuniform sampler2D u_fromScene;\nuniform sampler2D u_toScene;\nuniform float u_progress;\nuniform float u_time;\nuniform sampler2D u_noise;\n\nfloat circle(in vec2 _st, in float _scale, in float _radius, in float _fade){\n    vec2 dist = (_st-vec2(0.5)) / _scale;\n\treturn 1.-smoothstep(_radius-(_radius*_fade),\n                         _radius+(_radius*_fade),\n                         dot(dist,dist)*4.0);\n}\n\nvec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}\nvec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}\n\nfloat noise(vec3 p){\n    vec3 a = floor(p);\n    vec3 d = p - a;\n    d = d * d * (3.0 - 2.0 * d);\n\n    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);\n    vec4 k1 = perm(b.xyxy);\n    vec4 k2 = perm(k1.xyxy + b.zzww);\n\n    vec4 c = k2 + a.zzzz;\n    vec4 k3 = perm(c);\n    vec4 k4 = perm(c + 1.0);\n\n    vec4 o1 = fract(k3 * (1.0 / 41.0));\n    vec4 o2 = fract(k4 * (1.0 / 41.0));\n\n    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);\n    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);\n\n    return o4.y * d.y + o4.x * (1.0 - d.y);\n}\n\n//2D (returns 0 - 1)\nfloat random2d(vec2 n) { \n    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);\n}\n\nfloat randomRange (in vec2 seed, in float min, in float max) {\n\t\treturn min + random2d(seed) * (max - min);\n}\n\n// return 1 if v inside 1d range\nfloat insideRange(float v, float bottom, float top) {\n   return step(bottom, v) - step(top, v);\n}\n\n//inputs\nfloat SPEED = 0.3; //0 - 1 speed\n\nvoid main() {\n\tvec2 uv = vUv;\n\n\tfloat time = floor(u_time * SPEED * 60.0);\n    \n    //copy orig\n    vec3 outCol = texture2D(u_toScene, uv).rgb;\n\n\tfloat AMT = u_progress * 0.7;\n    \n    //randomly offset slices horizontally\n    float maxOffset = AMT/2.0;\n\tvec2 uvOff;\n    for (int i = 0; i < 2; i += 1) {\n        float sliceY = random2d(vec2(time , 2345.0 + float(i)));\n        float sliceH = random2d(vec2(time , 9035.0 + float(i))) * 0.25;\n        float hOffset = randomRange(vec2(time , 9625.0 + float(i)), -maxOffset, maxOffset);\n        uvOff = uv;\n        uvOff.x += hOffset;\n        if (insideRange(uv.y, sliceY, fract(sliceY+sliceH)) == 1.0 ){\n        \toutCol = texture2D(u_toScene, uvOff).rgb;\n        }\n    }\n    \n    //do slight offset on one entire channel\n    float maxColOffset = AMT/50.0;\n    float rnd = random2d(vec2(time , 9545.0));\n    vec2 colOffset = vec2(randomRange(vec2(time , 9545.0),-maxColOffset,maxColOffset), \n                       randomRange(vec2(time , 7205.0),-maxColOffset,maxColOffset));\n    if (rnd < 0.33){\n        outCol.r = texture2D(u_toScene, uv + colOffset).r;\n        \n    }else if (rnd < 0.66){\n        outCol.g = texture2D(u_toScene, uv + colOffset).g;\n        \n    } else{\n        outCol.b = texture2D(u_toScene, uv + colOffset).b;  \n    }\n\n\tfloat n1 = noise(vec3(vUv * (16.2412), 0.5));\n    float n2 = noise(vec3(vUv * 7.633, u_time * 0.35 + n1));\n\n\tvec2 circleUv = vec2(vec2(vUv - vec2(0.5)) / 1.5 + vec2(0.5));\n\tvec2 circleUv2 = vec2(vec2(vUv - vec2(0.5)) / 1.8 + vec2(0.5));\n\tfloat noiseReveal = circle(circleUv, u_progress + 0.001, u_progress + n2, 0.1);\n    float noiseEdge = circle(circleUv2, u_progress + 0.001, u_progress + n2, 0.5);\n\n\tvec4 worldCol = texture2D(u_fromScene, vUv);\n\n\t// vec4 origCol = texture2D( u_toScene, vUv );\n\tvec4 origCol = vec4(outCol, 1.);\n    vec3 baseColor = origCol.rgb * clamp(noiseEdge * 2., 1., 1.5);\n    vec3 revealColor = worldCol.rgb;\n\n    gl_FragColor = mix(vec4(baseColor, origCol.a), vec4(revealColor, 1.), noiseReveal);\n}",
                    uniforms: {
                        u_fromScene: {
                            value: this.savePass.renderTarget.texture
                        },
                        u_toScene: {
                            value: null
                        },
                        u_noise: {
                            value: o.Gl.assets.textures.gradientNoise
                        },
                        u_progress: {
                            value: 0
                        },
                        u_time: {
                            value: 0
                        }
                    },
                    transparent: !0
                })),
                this.transitionPass.name = "World Transition",
                this.transitionPass.enabled = !1,
                this.introPass = new ot.T(new i.jyz({
                    vertexShader: st,
                    fragmentShader: "#define GLSLIFY 1\nvarying vec2 vUv;\n\nuniform sampler2D tDiffuse;\nuniform sampler2D u_noise;\nuniform float u_time;\nuniform float u_strength;\n\n#define pi 3.1415926\n\nvec2 glitch(vec2 uv, float s)\n{\n    float v = pow(0.5 - 0.5 * cos(2.0 * pi * uv.y * 10.), 50.0) * sin(2.0 * pi * uv.y * 0.5);\n    uv.x += v * s * 0.1;\n    return uv;\n}\n\nvoid main() {\n\tfloat t = u_time / 10.;\n\n\tvec2 uv = vUv;\n    \n    float r = texture2D(u_noise, vec2(t, 0.0)).x;\n    float jitter = texture2D(u_noise, vec2(t * 5., 0.0)).x;\n    uv = glitch(uv + vec2(0.0, fract(t * 2.0)), 5.0 * sign(r) * pow(abs(r), 5.0) * u_strength) - vec2(0.0, fract(t * 2.0));\n\tuv.x += jitter * 0.001 * u_strength;\n    \n    vec3 col;\n\n\tvec2 rgbOffset = vec2(jitter * 0.003, 0.001) * u_strength;\n\n    col.r = texture2D(tDiffuse, uv + rgbOffset).r;\n    col.g = texture2D(tDiffuse, uv).g;\n    col.b = texture2D(tDiffuse, uv - rgbOffset).b;\t\n\t\n\tfloat c = 1.;\n\n\tfloat scanlineSpeed = u_time * 10.;\n\t\n\tc += 2. * sin(scanlineSpeed + uv.y * 1000.);\n\tc += 1. * sin(scanlineSpeed + uv.y * 999.);\n\n\tfloat x = uv.x * uv.y * 1.0 *  1000.0;\n    x = mod( x, 13.0 ) * mod( x, 123.0 );\n    float dx = mod( x, 0.01 );\n    vec3 cResult = col.rgb + col.rgb * clamp( 0.1 + dx * 100.0, 0.0, 1.0 );\n    vec2 sc = vec2( sin( uv.y * 1500. + scanlineSpeed ), cos( uv.y * 1500. + scanlineSpeed ) );\n    cResult += col.rgb * vec3( sc.x, sc.y, sc.x ) * 2.;\n    cResult = col.rgb + clamp( 0.3, 0.0, 1.0 ) * ( cResult - col.rgb ) * u_strength;\n\t\n\tgl_FragColor = vec4(cResult, 1.);\n}",
                    uniforms: {
                        tDiffuse: {
                            value: null
                        },
                        u_strength: {
                            value: 1
                        },
                        u_noise: {
                            value: o.Gl.assets.textures.gradientNoise
                        },
                        u_time: o.Gl.globalUniforms.u_time
                    },
                    transparent: !0
                })),
                this.introPass.name = "World Intro",
                this.introPass.enabled = !1,
                o.Gl.composerPasses.add(this.renderPass, 50),
                o.Gl.composerPasses.add(this.introPass, 55),
                o.Gl.composerPasses.add(this.savePass, 56),
                o.Gl.composerPasses.add(this.transitionPass, 57)
            }
            addPost() {
                this.renderDetails = new Vs.C(this.detailsScene,this.camera),
                this.renderDetails.clear = !1,
                this.renderDetails.clearDepth = !0,
                this.renderDetails.enabled = !1,
                this.renderDetails.name = "World Details",
                this.edgeWarpParams = {
                    strength: .6
                },
                this.edgeWarp = new ot.T({
                    uniforms: {
                        tDiffuse: {
                            value: null
                        },
                        u_strength: {
                            value: 0
                        },
                        u_scale: {
                            value: 1
                        }
                    },
                    fragmentShader: "precision highp float;\n#define GLSLIFY 1\n\nuniform sampler2D tDiffuse;\nuniform float u_strength;\nuniform float u_scale;\nvarying vec2 vUv;\n\nvec2 barrelPincushion(vec2 uv, float strength) {\n    vec2 st = uv - 0.5;\n    float theta = atan(st.x, st.y);\n    float radius = sqrt(dot(st, st));\n    radius *= 1.0 + strength * (radius * radius);\n\n    return 0.5 + radius * vec2(sin(theta), cos(theta));\n}\n\nvoid main() {\n\n    vec2 scaleOrigin = vec2(0.5, 0.5);\n\n    gl_FragColor = texture2D(tDiffuse, barrelPincushion(vec2(vec2(vUv - scaleOrigin) / u_scale + scaleOrigin), u_strength));\n\n}",
                    vertexShader: "#define GLSLIFY 1\nvarying vec2 vUv;\n\nvoid main () {\n\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1 );\n\n}"
                }),
                this.edgeWarp.name = "World Edge Warp",
                this.scanlines = new ot.T({
                    uniforms: {
                        tDiffuse: {
                            value: null
                        },
                        time: {
                            value: 0
                        },
                        u_strength: {
                            value: 0
                        },
                        u_color: {
                            value: new i.Ilk(16776960)
                        }
                    },
                    fragmentShader: "precision highp float;\n#define GLSLIFY 1\n\nuniform sampler2D tDiffuse;\nuniform float time;\nuniform float u_strength;\nuniform vec3 u_color;\nvarying vec2 vUv;\n\nvoid main() {\n\n\tvec2 pos = vUv;\n\t\n\tvec4 origcol = texture2D(tDiffuse, pos);\n    vec3 col;\n\n    col.r = texture2D(tDiffuse, vec2(pos.x+0.001,pos.y)).x;\n    col.g = texture2D(tDiffuse, vec2(pos.x+0.000,pos.y)).y;\n    col.b = texture2D(tDiffuse, vec2(pos.x-0.001,pos.y)).z;\t\n\t\n\tfloat c = 1.;\n\t\n\tc += 2. * sin(time * 4. + pos.y * 1000.);\n\tc += 1. * sin(time * 4. + pos.y * 999.);\n\t\n\t//vignetting\n\tc *= sin(pos.x*3.15);\n\tc *= sin(pos.y*3.);\n\tc *= 1.;\n\t\n\tgl_FragColor = mix(origcol, vec4(col.x * c * u_color.r, col.y * c * u_color.g, col.z * c * u_color.b, origcol.a), u_strength);\n}",
                    vertexShader: "#define GLSLIFY 1\nvarying vec2 vUv;\n\nvoid main () {\n\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1 );\n\n}"
                }),
                this.scanlines.name = "World Scanlines",
                this.scanlines.enabled = !1,
                this.afterImagePass = new si,
                o.Gl.composerPasses.add(this.afterImagePass, 51),
                o.Gl.composerPasses.add(this.edgeWarp, 52),
                o.Gl.composerPasses.add(this.scanlines, 53),
                o.Gl.composerPasses.add(this.renderDetails, 54)
            }
            checkVisibility() {
                this.camera.updateMatrixWorld(),
                this.camera.matrixWorldInverse.copy(this.camera.matrixWorld).invert(),
                this.cameraViewProjectionMatrix.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse),
                this.frustum.setFromProjectionMatrix(this.cameraViewProjectionMatrix),
                this.visibleItems = [];
                for (let e = 0; e < this.items.children.length; e++) {
                    const t = this.items.children[e];
                    this.frustum.intersectsObject(t.children[0]) && this.visibleItems.push(t)
                }
            }
            updatePositions(e=!1) {
                const t = Math.round(this.camera.position.x / this.sectionWidth)
                  , s = Math.round(this.camera.position.y / this.sectionHeight);
                let i = 0;
                if (t !== this.loopCount.x || e) {
                    this.loopCount.x = t,
                    i = this.sectionWidth * this.loopCount.x;
                    for (let e = 0; e < this.gridMap.columns.length; e++)
                        for (let t = 0; t < this.gridMap.columns[e].length; t++)
                            this.gridMap.columns[Math.abs(e + this.loopCount.x) % this.gridMap.columns.length][t].position.x = this.sectionWidth * (e - 2) + i
                }
                if (s !== this.loopCount.y || e) {
                    this.loopCount.y = s,
                    i = this.sectionHeight * this.loopCount.y;
                    for (let e = 0; e < this.gridMap.rows.length; e++)
                        for (let t = 0; t < this.gridMap.rows[e].length; t++)
                            this.gridMap.rows[Math.abs(e + this.loopCount.y) % this.gridMap.rows.length][t].position.y = this.sectionHeight * (e - 2) + i
                }
            }
            updateProximity() {
                if (!this.itemOpen)
                    for (let e = 0; e < this.visibleItems.length; e++) {
                        const t = this.visibleItems[e];
                        t.offsetPosition.x = t.position.x + t.children[0].position.x - this.camera.position.x,
                        t.offsetPosition.y = t.position.y + t.children[0].position.y - this.camera.position.y;
                        const s = o.mouse.gl.distanceTo(t.offsetPosition);
                        t.children[0].position.z = i.M8C.lerp(t.children[0].position.z, t.children[0].originalPosition.z - .15 * s, .05)
                    }
            }
            updateCamera() {
                this.camera.position.x = i.M8C.lerp(this.camera.position.x, this.dragPos.x, .15),
                this.camera.position.y = i.M8C.lerp(this.camera.position.y, this.dragPos.y, .15),
                this.camera.position.z = this.initialCameraZ,
                this.camera.lookAt(this.camera.position),
                this.camera.translateZ(this.options.cameraTranslateZ),
                o.isTouch || (this.camera.translateZ(-this.options.cameraZOffset * this.options.cameraMovementMultiplier),
                this._e.set(this.smoothMouse.y * this.options.mouseMoveAngleY * this.options.cameraMovementMultiplier, -this.smoothMouse.x * this.options.mouseMoveAngleX * this.options.cameraMovementMultiplier, 0),
                this._q.setFromEuler(this._e),
                this.camera.quaternion.multiply(this._q),
                this._e.set(0, 0, -.05 * (this.smoothMouse.x - this.smoothMouse2.x) * this.options.cameraMovementMultiplier),
                this._q.setFromEuler(this._e),
                this.camera.quaternion.multiply(this._q),
                this.camera.translateZ(this.options.cameraZOffset * this.options.cameraMovementMultiplier),
                this.camera.updateMatrixWorld())
            }
            updateRaycaster() {
                if (this.allowControl) {
                    if (this.raycaster.setFromCamera(o.mouse.glNormalized, this.camera),
                    this.itemOpen)
                        return this.hoveringPrev = this.raycaster.ray.intersectsBox(this.prevHand.bbox),
                        this.hoveringNext = this.raycaster.ray.intersectsBox(this.nextHand.bbox),
                        this.hoveringNext && this.hoveredHand !== this.nextHand && (this.hoveredHand = this.nextHand,
                        this.hoveredHand.onHover()),
                        this.hoveringPrev && this.hoveredHand !== this.prevHand && (this.hoveredHand = this.prevHand,
                        this.hoveredHand.onHover()),
                        this.hoveringPrev || this.hoveringNext || !1 === this.hoveredHand || (this.hoveredHand.reset(),
                        this.hoveredHand = !1),
                        void (this.hoveredHand && !o.isTouch && this.hoveredHand.updateHoverRotation(this.raycaster.ray.direction));
                    if (o.isTouch || !this.pointerDown)
                        if (this.intersects = this.raycaster.intersectObjects(this.clickableItems, !1),
                        this.intersects.length > 0 && this.hoveredItem !== this.intersects[0].object) {
                            if ("video" === this.hoveredItem.assetType && !this.hoveredItem.material.uniforms.u_texture.value.image.paused) {
                                const e = this.hoveredItem;
                                l.ZP.to(this.hoveredItem.material.uniforms.u_texture.value.image, {
                                    volume: 0,
                                    duration: .2,
                                    onComplete: ()=>{
                                        e.material.uniforms.u_texture.value.image.pause()
                                    }
                                })
                            }
                            this.hoveredItem = this.intersects[0].object,
                            "video" === this.hoveredItem.assetType && this.hoveredItem.material.uniforms.u_texture.value.image.paused && (this.hoveredItem.material.uniforms.u_texture.value.image.muted = !1,
                            this.hoveredItem.material.uniforms.u_texture.value.image.volume = 0,
                            this.hoveredItem.material.uniforms.u_texture.value.image.play(),
                            l.ZP.to(this.hoveredItem.material.uniforms.u_texture.value.image, {
                                volume: 1,
                                duration: .2
                            })),
                            this.cursor && (this.cursor.grab.visible = !1,
                            this.cursor.grabbing.visible = !1,
                            this.cursor.pointer.visible = !0)
                        } else if (0 === this.intersects.length && !1 !== this.hoveredItem) {
                            if ("video" === this.hoveredItem.assetType && !this.hoveredItem.material.uniforms.u_texture.value.image.paused) {
                                const e = this.hoveredItem;
                                l.ZP.to(this.hoveredItem.material.uniforms.u_texture.value.image, {
                                    volume: 0,
                                    duration: .2,
                                    onComplete: ()=>{
                                        e.material.uniforms.u_texture.value.image.pause()
                                    }
                                })
                            }
                            this.cursor && (this.cursor.grab.visible = !0,
                            this.cursor.grabbing.visible = !1,
                            this.cursor.pointer.visible = !1),
                            this.hoveredItem = !1
                        }
                }
            }
            updateDetails() {
                this.openItem.options.show_caption ? (this.dom.detailsTitle.style.display = "none",
                this.dom.detailsAuthorWrap.style.display = "none",
                this.dom.detailsCaption.style.display = "block",
                this.dom.detailsCaption.innerHTML = this.openItem.options.caption) : (this.dom.detailsTitle.innerHTML = this.openItem.options.title,
                this.dom.detailsTitle.style.display = "block",
                this.openItem.options.author.length ? (this.dom.detailsAuthor.innerHTML = this.openItem.options.author,
                this.dom.detailsAuthorWrap.style.display = "block") : this.dom.detailsAuthorWrap.style.display = "none",
                this.dom.detailsCaption.style.display = "none"),
                "" !== this.openItem.options.link ? (this.dom.detailsBtn.href = this.openItem.options.link,
                this.dom.detailsBtn.style.visibility = "visible") : this.dom.detailsBtn.style.visibility = "hidden"
            }
            switchItem(e) {
                if (!this.itemOpen)
                    return;
                this.allowSwitch = !1,
                clearTimeout(this.allowSwitchTimeout),
                this.allowSwitchTimeout = setTimeout((()=>{
                    this.allowSwitch = !0
                }
                ), 1e3),
                l.ZP.killTweensOf([this.prevHand.position, this.nextHand.position]);
                const t = this.openItem
                  , s = e ? 1 : -1;
                let o = t.options.index + s;
                o === this.itemCount ? o = 0 : -1 === o && (o = this.itemCount - 1),
                this.openItem = this.clickableItems[o],
                this.dragPos.x = this.openItem.parent.position.x + this.openItem.position.x,
                this.dragPos.y = this.openItem.parent.position.y + this.openItem.position.y,
                this.prevHand.updateBox3(this.dragPos),
                this.nextHand.updateBox3(this.dragPos),
                this.updateDetails();
                const n = this.openItem.options.color;
                this.detailsScene.add(this.openItem.parent),
                this.items.add(t.parent);
                const r = this.openItem.geometry.boundingBox.max
                  , a = e ? this.nextHand : this.prevHand;
                a.spinCount++,
                "video" !== t.assetType || t.material.uniforms.u_texture.value.image.paused || l.ZP.to(t.material.uniforms.u_texture.value.image, {
                    volume: 0,
                    duration: .4,
                    onComplete: ()=>{
                        t.material.uniforms.u_texture.value.image.pause()
                    }
                }),
                "video" === this.openItem.assetType && this.openItem.material.uniforms.u_texture.value.image.paused && (this.openItem.material.uniforms.u_texture.value.image.muted = !1,
                this.openItem.material.uniforms.u_texture.value.image.volume = 0,
                this.openItem.material.uniforms.u_texture.value.image.play(),
                l.ZP.to(this.openItem.material.uniforms.u_texture.value.image, {
                    volume: 1,
                    duration: .4
                })),
                this.switchTimeline = l.ZP.timeline({
                    defaults: {
                        ease: "expo.out",
                        duration: .75
                    }
                }).to(t.position, {
                    duration: 1,
                    z: t.originalPosition.z
                }, 0).to(t.scale, {
                    duration: 1,
                    x: t.originalScale.x,
                    y: t.originalScale.y
                }, 0).to(this.openItem.position, {
                    duration: 1,
                    z: 300
                }, 0).to(this.openItem.scale, {
                    duration: 1,
                    x: this.options.openItemScale,
                    y: this.options.openItemScale
                }, 0).to(this.scanlines.uniforms.u_color.value, {
                    duration: 1,
                    r: n.r,
                    g: n.g,
                    b: n.b
                }, 0).to(this.navHands.position, {
                    x: this.dragPos.x,
                    y: this.dragPos.y
                }, 0).to(this.details.position, {
                    x: this.dragPos.x,
                    y: this.dragPos.y
                }, 0).to(this.dom.detailsTitleWrap, {
                    y: -r.y * this.options.openItemScale - 140
                }, 0).to(this.dom.detailsMeta, {
                    y: r.y * this.options.openItemScale + 140
                }, 0).to(a.mesh.rotation, {
                    x: i.M8C.degToRad(e ? 0 : 180) + i.M8C.degToRad(360) * a.spinCount
                }, 0)
            }
            showItem() {
                this.openTimeline && this.openTimeline.kill(),
                this.dragPos.x = this.openItem.parent.position.x + this.openItem.position.x,
                this.dragPos.y = this.openItem.parent.position.y + this.openItem.position.y,
                this.prevHand.updateBox3(this.dragPos),
                this.nextHand.updateBox3(this.dragPos),
                this.updateDetails();
                const e = this.openItem.geometry.boundingBox.max;
                l.ZP.set(this.details.position, {
                    x: this.dragPos.x,
                    y: this.dragPos.y,
                    z: 0
                }),
                l.ZP.set(this.dom.detailsTitleWrap, {
                    y: -e.y * this.options.openItemScale - 140
                }),
                l.ZP.set(this.dom.detailsMeta, {
                    y: e.y * this.options.openItemScale + 140
                }),
                this.navHands.position.set(this.dragPos.x, this.dragPos.y, -10),
                this.cursor && (this.cursor.visible = !1),
                this.scanlines.uniforms.u_color.value.copy(this.openItem.options.color),
                this.renderDetails.enabled = !0,
                this.scanlines.enabled = !0,
                this.detailsScene.add(this.openItem.parent),
                this.openTimeline = l.ZP.timeline({
                    defaults: {
                        ease: "expo.out",
                        duration: 1.5
                    }
                }).to(this.openItem.position, {
                    duration: 2,
                    z: 300
                }, 0).to(this.openItem.scale, {
                    duration: 2,
                    x: this.options.openItemScale,
                    y: this.options.openItemScale
                }, 0).to(this.scanlines.uniforms.u_strength, {
                    value: 1
                }, 0).to(this.edgeWarp.uniforms.u_strength, {
                    value: this.edgeWarpParams.strength
                }, 0).to(this.edgeWarp.uniforms.u_scale, {
                    value: 1.2
                }, 0).to(this.camera.scale, {
                    duration: 2,
                    x: this.camera.originalScale.x + .35,
                    y: this.camera.originalScale.y + .35
                }, 0).to(this.options, {
                    duration: 2,
                    cameraMovementMultiplier: 1
                }, 0).to(this.navHands.position, {
                    z: 290,
                    duration: 2
                }, .2).to(this.prevHand.position, {
                    x: this.prevHand.originalPosition.x,
                    duration: 1.8
                }, .2).to(this.nextHand.position, {
                    x: this.nextHand.originalPosition.x,
                    duration: 1.8
                }, .2).to(this.handMaterial.uniforms.uAlpha, {
                    value: 1,
                    duration: 1.8,
                    onComplete: ()=>{
                        this.prevHand.renderOrder = 10,
                        this.nextHand.renderOrder = 10
                    }
                }, .2).to(this.details.position, {
                    z: 200,
                    duration: 1.5,
                    ease: "expo.out"
                }, .5).to(this.details.element, {
                    autoAlpha: 1,
                    duration: 1
                }, .5),
                this.cursor && this.openTimeline.to(this.cursor.scale, {
                    x: 0,
                    y: 0,
                    z: 0
                }, 0)
            }
            hideItem() {
                var e;
                if (!this.openItem)
                    return;
                if (null !== (e = this.switchTimeline) && void 0 !== e && e.isActive())
                    return;
                const t = this.openItem;
                this.openItem = !1,
                this.openTimeline && this.openTimeline.kill(),
                this.prevHand.spinCount = 0,
                this.nextHand.spinCount = 0,
                this.prevHand.rotation.x = 0,
                this.nextHand.rotation.x = 0,
                this.cursor && (this.cursor.visible = !0),
                this.openTimeline = l.ZP.timeline({
                    defaults: {
                        ease: "expo.inOut",
                        duration: 1.5
                    },
                    onComplete: ()=>{
                        this.itemOpen || (this.renderDetails.enabled = !1,
                        this.scanlines.enabled = !1)
                    }
                }).to(t.position, {
                    duration: 1.1,
                    z: t.originalPosition.z
                }, 0).to(t.scale, {
                    duration: 1.1,
                    x: t.originalScale.x,
                    y: t.originalScale.y
                }, 0).to(this.camera.rotation, {
                    x: 0,
                    y: 0,
                    z: 0
                }, 0).to(this.options, {
                    cameraMovementMultiplier: .5
                }, 0).to(this.scanlines.uniforms.u_strength, {
                    value: 0
                }, 0).to(this.edgeWarp.uniforms.u_strength, {
                    value: 0
                }, 0).to(this.edgeWarp.uniforms.u_scale, {
                    value: 1
                }, 0).to(this.camera.scale, {
                    x: this.camera.originalScale.x,
                    y: this.camera.originalScale.y
                }, 0).call((()=>{
                    this.prevHand.renderOrder = 0,
                    this.nextHand.renderOrder = 0
                }
                ), null, 0).to(this.navHands.position, {
                    z: -10,
                    duration: 1.1
                }, 0).to(this.prevHand.position, {
                    x: o.mq.sm.matches ? 0 : this.prevHand.originalPosition.x + 40
                }, 0).to(this.nextHand.position, {
                    x: o.mq.sm.matches ? 0 : this.nextHand.originalPosition.x - 40
                }, 0).to(this.handMaterial.uniforms.uAlpha, {
                    value: 0,
                    duration: 1.35
                }, 0).to(this.details.position, {
                    duration: .8,
                    z: 0
                }, 0).to(this.details.element, {
                    duration: .65,
                    autoAlpha: 0
                }, 0).call((()=>{
                    this.itemOpen = !1
                }
                ), null, .2).call((()=>{
                    this.openItem && this.openItem === t || this.items.add(t.parent)
                }
                ), null, 1.1),
                this.cursor && this.openTimeline.to(this.cursor.scale, {
                    x: this.cursor.originalScale,
                    y: this.cursor.originalScale,
                    z: this.cursor.originalScale,
                    duration: .5
                }, 1)
            }
            addIntroEvents() {
                o.RAFCollection.add(this.introRaf, 70),
                n.on(o.events.RESIZE, this.onResize)
            }
            removeIntroEvents() {
                o.RAFCollection.remove(this.introRaf),
                n.off(o.events.RESIZE, this.onResize)
            }
            addEvents() {
                o.RAFCollection.add(this.onRaf, 80),
                n.on(o.events.MOUSEMOVE, this.onPointerMove),
                n.on(o.events.MOUSEDRAG, this.onPointerDrag),
                n.on(o.events.MOUSEDOWN, this.onPointerDown),
                n.on(o.events.MOUSEUP, this.onPointerUp),
                n.on("wheel", window, this.onWheel),
                n.on("keyup", window, this.onKeyUp),
                n.delegate("mouseenter", "a, button", this.onLinkEnter),
                n.delegate("mouseleave", "a, button", this.onLinkLeave)
            }
            renderIntroText(e) {
                this.updateIntroText && (this.introTextGroup.position.x = this.camera.position.x,
                this.introTextGroup.position.y = this.camera.position.y,
                this.introTextGroup.children[0].material.uniforms.u_time.value = e)
            }
            updateCursorPosition() {
                this.cursor && (this.cursor.position.x = i.M8C.lerp(this.cursor.position.x, o.mouse.gl.x * this.camera.scale.x * 1.1 + this.dragPos.x, .15),
                this.cursor.position.y = i.M8C.lerp(this.cursor.position.y, o.mouse.gl.y * this.camera.scale.x * 1.1 + this.dragPos.y, .15),
                this.cursor.rotation.x = .03 * -this.mouseVelocity.y,
                this.cursor.rotation.y = .02 * this.mouseVelocity.x,
                this.cursor.rotation.z = .01 * this.mouseVelocity.x)
            }
            scaleScene() {
                let e = 1920 / o.window.w;
                e = i.M8C.clamp(e, .3, 2),
                this.camera.scale.set(e, e, 1),
                this.camera.originalScale = this.camera.scale.clone(),
                this.itemOpen && (this.camera.scale.x = this.camera.originalScale.x + .35,
                this.camera.scale.y = this.camera.originalScale.y + .35)
            }
            setOpenItemScale() {
                (o.window.w > o.window.h && o.window.h / o.window.w < .5 || o.window.w < o.window.h && o.window.w / o.window.h > .5) && (this.options.openItemScale = 1)
            }
            sampleVideos() {
                this.assets.itemTextures.forEach((e=>{
                    e.image.play && e.image.play().then((()=>{
                        e.image.pause()
                    }
                    ))
                }
                ))
            }
            load() {
                this.assets = {
                    itemTextures: [],
                    models: {},
                    textures: {}
                };
                const e = (e,t,s)=>{
                    if (this.assets.itemTextures[t])
                        return;
                    const n = new i.fO1(e);
                    o.Gl.renderer.initTexture(n),
                    this.assets.itemTextures[t] = n,
                    e.pause(),
                    e.currentTime = 0,
                    s()
                }
                ;
                for (let t = 0; t < window.worldData.length; t++)
                    "image" === window.worldData[t].type ? "ktx2" === window.worldData[t].file.split(".").pop() ? o.AssetLoader.loadKtxTexture(window.worldData[t].file).then((e=>{
                        this.assets.itemTextures[t] = e
                    }
                    )) : o.AssetLoader.loadTexture(window.worldData[t].file).then((e=>{
                        this.assets.itemTextures[t] = e
                    }
                    )) : o.AssetLoader.add(new Promise((s=>{
                        const i = document.createElement("video");
                        i.crossOrigin = "",
                        i.muted = !0,
                        i.loop = !0,
                        i.playsInline = !0,
                        i.addEventListener("loadeddata", (()=>{
                            i.addEventListener("timeupdate", (()=>{
                                e(i, t, s)
                            }
                            ), {
                                once: !0
                            })
                        }
                        ), {
                            once: !0
                        }),
                        i.addEventListener("error", (()=>{
                            e(i, t, s)
                        }
                        )),
                        o.isIOS && i.addEventListener("suspend", (()=>{
                            e(i, t, s)
                        }
                        ), {
                            once: !0
                        }),
                        i.src = window.worldData[t].file,
                        i.load(),
                        i.play().catch((o=>{
                            console.error(o),
                            e(i, t, s)
                        }
                        ))
                    }
                    )));
                o.AssetLoader.loadGltf(gt("models/world/pointer.glb")).then((e=>{
                    this.assets.models.pointer = e.scene.children[0]
                }
                )),
                o.AssetLoader.loadGltf(gt("models/world/grab.glb")).then((e=>{
                    this.assets.models.grab = e.scene.children[0]
                }
                )),
                o.AssetLoader.loadGltf(gt("models/world/grabbing.glb")).then((e=>{
                    this.assets.models.grabbing = e.scene.children[0]
                }
                )),
                o.AssetLoader.loadTexture(gt("images/world/pointer.png")).then((e=>{
                    this.assets.textures.pointer = e
                }
                )),
                o.AssetLoader.loadTexture(gt("images/world/grab.png")).then((e=>{
                    this.assets.textures.grab = e
                }
                )),
                o.AssetLoader.loadTexture(gt("images/world/grabbing.png")).then((e=>{
                    this.assets.textures.grabbing = e
                }
                ))
            }
            destroy() {
                o.RAFCollection.remove(this.onRaf),
                n.off(o.events.MOUSEMOVE, this.onPointerMove),
                n.off(o.events.MOUSEDRAG, this.onPointerDrag),
                n.off(o.events.MOUSEDOWN, this.onPointerDown),
                n.off(o.events.MOUSEUP, this.onPointerUp),
                n.off("wheel", window, this.onWheel),
                n.off("keyup", window, this.onKeyUp),
                n.off("mouseenter", "a, button", this.onLinkEnter),
                n.off("mouseleave", "a, button", this.onLinkLeave),
                this.renderDetails.enabled = !1,
                o.Gl.composerPasses.remove(this.renderDetails),
                this.edgeWarp.enabled = !1,
                this.edgeWarp.fsQuad.dispose(),
                o.Gl.composerPasses.remove(this.edgeWarp),
                this.scanlines.enabled = !1,
                this.scanlines.fsQuad.dispose(),
                o.Gl.composerPasses.remove(this.scanlines),
                this.afterImagePass.enabled = !1,
                this.afterImagePass.dispose(),
                o.Gl.composerPasses.remove(this.afterImagePass),
                this.renderPass.enabled = !1,
                this.transitionPass.enabled = !1,
                this.savePass.enabled = !1,
                this.introPass.enabled = !1,
                this.introPass.uniforms.u_strength.value = 1,
                this.resourceTracker.dispose(),
                this.camera.rotation.set(0, 0, 0),
                this.camera.scale.copy(this.camera.originalScale),
                this.dom.introWrap.style.visibility = "hidden",
                this.clickableItems = [],
                this.openItem = !1,
                this.firstLoad = !1,
                this.allowControl = !1,
                this.allowSwitch = !0,
                this.pointerDown = !1,
                this.itemOpen = !1,
                this.hoveredItem = !1,
                this.hoveredHand = !1,
                this.updateIntroText = !0,
                this.introFinished = !1,
                this.showGridPlayed = !1,
                this.gridReady = !1,
                this.camera.position.z = this.initialCameraZ,
                this.options.cameraTranslateZ = 0,
                this.showGridTimeline.pause().progress(0, !0),
                this.showGridTimeline.clear(),
                this.introTimeline.pause().progress(0, !0),
                this.introTimeline.clear(),
                this.introTextGroup.visible = !0,
                this.removeIntroEvents()
            }
        }
        var li = s(441);
        function hi() {
            this.position = new i.Pa4,
            this.rotation = new i._fP,
            this.scale = new i.Pa4(1,1,1),
            this.matrix = new i.yGw,
            this.enablePositionNoise = !0,
            this.enableRotationNoise = !0,
            this.positionFrequency = .25,
            this.rotationFrequency = .25,
            this.positionAmplitude = .3,
            this.rotationAmplitude = .003,
            this.positionScale = new i.Pa4(1,1,1),
            this.rotationScale = new i.Pa4(1,1,0),
            this.positionFractalLevel = 3,
            this.rotationFractalLevel = 3,
            this.times = new Float32Array(6),
            this.rehash()
        }
        var ci = hi;
        const di = hi.prototype;
        di.rehash = function() {
            for (let e = 0; e < 6; e++)
                this.times[e] = -1e4 * Math.random()
        }
        ,
        di.update = function(e) {
            let t;
            if (e = void 0 === e ? 1e3 / 60 : e,
            this.enablePositionNoise) {
                for (t = 0; t < 3; t++)
                    this.times[t] += this.positionFrequency * e;
                mi.set(fi(this.times[0], this.positionFractalLevel), fi(this.times[1], this.positionFractalLevel), fi(this.times[2], this.positionFractalLevel)),
                mi.multiply(this.positionScale),
                mi.multiplyScalar(this.positionAmplitude * pi),
                this.position.copy(mi)
            }
            if (this.enableRotationNoise) {
                for (t = 0; t < 3; t++)
                    this.times[t + 3] += this.rotationFrequency * e;
                mi.set(fi(this.times[3], this.rotationFractalLevel), fi(this.times[4], this.rotationFractalLevel), fi(this.times[5], this.rotationFractalLevel)),
                mi.multiply(this.rotationScale),
                mi.multiplyScalar(this.rotationAmplitude * pi),
                ui.set(mi.x, mi.y, mi.z),
                this.rotation.setFromEuler(ui)
            }
            this.matrix.compose(this.position, this.rotation, this.scale)
        }
        ;
        const ui = new i.USm
          , mi = new i.Pa4
          , pi = 1 / .75;
        const gi = new function() {
            let e = 1
              , t = 1;
            const s = [];
            for (let e = 0; e < 256; ++e)
                s.push(Math.random());
            const i = function(e, t, s) {
                return e * (1 - s) + t * s
            };
            return {
                getVal: function(o) {
                    const n = o * t
                      , r = Math.floor(n)
                      , a = n - r
                      , l = a * a * (3 - 2 * a)
                      , h = 255 & r
                      , c = h + 1 & 255;
                    return i(s[h], s[c], l) * e
                },
                setAmplitude: function(t) {
                    e = t
                },
                setScale: function(e) {
                    t = e
                }
            }
        }
        ;
        function fi(e, t) {
            let s = 0
              , i = .5;
            for (let o = 0; o < t; o++)
                s += i * gi.getVal(e),
                e *= 2,
                i *= .5;
            return s
        }
        class vi {
            constructor() {
                n.bindAll(this);
                const e = document.querySelector(".js-content-toggle");
                e && (this.dom = {
                    el: e,
                    buttons: e.querySelectorAll(".js-content-toggle-btn"),
                    section: e.querySelectorAll(".js-content-toggle-section")
                },
                this.activeButton = !1,
                this.sections = [...document.querySelectorAll(".js-content-toggle-section")],
                this.sectionTl = [],
                this.splitText(),
                this.buildSectionTimelines())
            }
            splitText() {
                this.splitContent = new zs(this.dom.section,{
                    type: "chars, words",
                    wordsClass: "js-content-toggle-words",
                    charsClass: "js-content-toggle-chars"
                }),
                v.ZP.set(this.splitContent.chars, {
                    yPercent: 120
                }),
                v.ZP.set(this.splitContent.words, {
                    overflow: "hidden"
                })
            }
            updateContent(e) {
                const t = e ? 400 : 0
                  , s = this.activeButton.dom.el.dataset.togglecontent;
                for (let e = 0; e < this.dom.section.length; e++) {
                    if (s === this.dom.section[e].dataset.content) {
                        const s = this.sectionTl[this.sections.indexOf(this.dom.section[e])];
                        setTimeout((()=>{
                            s.play(),
                            this.dom.section[e].style.zIndex = "10"
                        }
                        ), t)
                    } else {
                        this.sectionTl[this.sections.indexOf(this.dom.section[e])].reverse(),
                        this.dom.section[e].style.zIndex = "-1"
                    }
                }
            }
            buildSectionTimelines() {
                for (let e = 0; e < this.sections.length; e++) {
                    const t = this.sections[e].querySelectorAll(".js-content-toggle-words")
                      , s = v.ZP.timeline({
                        paused: !0,
                        defaults: {
                            ease: "expo.inOut",
                            duration: .9
                        }
                    });
                    for (let e = 0; e < t.length; e++) {
                        const i = t[e].querySelectorAll(".js-content-toggle-chars");
                        s.to(i, {
                            yPercent: 0,
                            stagger: {
                                each: .014
                            }
                        }, "<")
                    }
                    this.sectionTl.push(s)
                }
            }
        }
        class xi {
            get camera() {
                return this._camera
            }
            get material() {
                return this._mesh.material
            }
            set material(e) {
                this._mesh.material = e
            }
            constructor(e) {
                const t = new i.iKG(-1,1,1,-1,0,1)
                  , s = new i._12(2,2);
                this._mesh = new i.Kj0(s,e),
                this._camera = t
            }
            dispose() {
                this._mesh.geometry.dispose()
            }
            render(e) {
                e.render(this._mesh, this._camera)
            }
        }
        class yi {
            constructor() {
                this.material = new i.jyz({
                    vertexShader: "#define GLSLIFY 1\nvarying vec2 vUv;\n\nvoid main() {\n    #include <begin_vertex>\n    #include <project_vertex>\n    vUv = uv;\n}",
                    fragmentShader: '#define GLSLIFY 1\nvarying vec2 vUv;\n\nuniform sampler2D map;\nuniform int parentLevel;\nuniform vec2 parentMapSize;\nuniform vec2 originalMapSize;\n\n// With original size argument\nvec4 packedTexture2DLOD( sampler2D tex, vec2 uv, int level, vec2 originalPixelSize ) {\n\n    float floatLevel = float( level );\n    vec2 atlasSize;\n    atlasSize.x = floor( originalPixelSize.x * 1.5 );\n    atlasSize.y = originalPixelSize.y;\n\n    // we stop making mip maps when one dimension == 1\n    float maxLevel = min( floor( log2( originalPixelSize.x ) ), floor( log2( originalPixelSize.y ) ) );\n    floatLevel = min( floatLevel, maxLevel );\n\n    // use inverse pow of 2 to simulate right bit shift operator\n    vec2 currentPixelDimensions = floor( originalPixelSize / pow( 2.0, floatLevel ) );\n    vec2 pixelOffset = vec2(\n        floatLevel > 0.0 ? originalPixelSize.x : 0.0,\n        floatLevel > 0.0 ? currentPixelDimensions.y : 0.0\n    );\n\n    // "minPixel / atlasSize" samples the top left piece of the first pixel\n    // "maxPixel / atlasSize" samples the bottom right piece of the last pixel\n    vec2 minPixel = pixelOffset;\n    vec2 maxPixel = pixelOffset + currentPixelDimensions;\n    vec2 samplePoint = mix( minPixel, maxPixel, uv );\n    samplePoint /= atlasSize;\n\n    vec2 halfPixelSize = 1.0 / ( 2.0 * atlasSize );\n    samplePoint = min( samplePoint, maxPixel / atlasSize - halfPixelSize );\n    samplePoint = max( samplePoint, minPixel / atlasSize + halfPixelSize );\n\n    return texture2D( tex, samplePoint );\n\n}\n\n#define SAMPLES 9\n\nvec4 sampleAt( vec2 uv ) {\n    return packedTexture2DLOD( map, uv, parentLevel, originalMapSize );\n}\n\nvoid main() {\n\n    vec2 childMapSize = parentMapSize / 2.0;\n    vec2 childPixelPos = floor( vUv * childMapSize );\n\n    vec2 parentPixelSize = 1.0 / parentMapSize;\n    vec2 halfParentPixelSize = parentPixelSize / 2.0;\n    vec2 parentPixelPos = childPixelPos * 2.0;\n\n    vec2 baseUv = ( parentPixelPos / parentMapSize ) + halfParentPixelSize;\n\n    vec4 samples[ SAMPLES ];\n    float weights[ SAMPLES ];\n\n    float xden = 2.0 * parentMapSize.x + 1.0;\n    float wx0 = ( parentMapSize.x - parentPixelPos.x ) / xden;\n    float wx1 = ( parentMapSize.x ) / xden;\n    float wx2 = ( parentPixelPos.x + 1.0 ) / xden;\n\n    float yden = 2.0 * parentMapSize.y + 1.0;\n    float wy0 = ( parentMapSize.y - parentPixelPos.y ) / yden;\n    float wy1 = ( parentMapSize.y ) / yden;\n    float wy2 = ( parentPixelPos.y + 1.0 ) / yden;\n\n    samples[ 0 ] = sampleAt( baseUv );\n    samples[ 1 ] = sampleAt( baseUv + vec2( parentPixelSize.x, 0.0 ) );\n    samples[ 2 ] = sampleAt( baseUv + vec2( 2.0 * parentPixelSize.x, 0.0 ) );\n\n    samples[ 3 ] = sampleAt( baseUv + vec2( 0.0, parentPixelSize.y ) );\n    samples[ 4 ] = sampleAt( baseUv + vec2( parentPixelSize.x, parentPixelSize.y ) );\n    samples[ 5 ] = sampleAt( baseUv + vec2( 2.0 * parentPixelSize.x, parentPixelSize.y ) );\n\n    samples[ 6 ] = sampleAt( baseUv + vec2( 0.0, 2.0 * parentPixelSize.y ) );\n    samples[ 7 ] = sampleAt( baseUv + vec2( parentPixelSize.x, 2.0 * parentPixelSize.y ) );\n    samples[ 8 ] = sampleAt( baseUv + vec2( 2.0 * parentPixelSize.x, 2.0 * parentPixelSize.y ) );\n\n    weights[ 0 ] = wx0 * wy0;\n    weights[ 1 ] = wx1 * wy0;\n    weights[ 2 ] = wx2 * wy0;\n\n    weights[ 3 ] = wx0 * wy1;\n    weights[ 4 ] = wx1 * wy1;\n    weights[ 5 ] = wx2 * wy1;\n\n    weights[ 6 ] = wx0 * wy2;\n    weights[ 7 ] = wx1 * wy2;\n    weights[ 8 ] = wx2 * wy2;\n\n    #pragma unroll_loop\n    for ( int i = 0; i < SAMPLES; i ++ ) {\n        gl_FragColor += samples[ i ] * weights[ i ];\n    }\n}',
                    uniforms: {
                        map: {
                            value: null
                        },
                        originalMapSize: {
                            value: new i.FM8
                        },
                        parentMapSize: {
                            value: new i.FM8
                        },
                        parentLevel: {
                            value: 0
                        }
                    }
                }),
                this.swapTarget = new i.dd2,
                this.swapTarget.texture.minFilter = i.TyD,
                this.swapTarget.texture.magFilter = i.TyD,
                this.copyQuad = new xi(new i.FIo({
                    vertexShader: "precision highp float;\nprecision highp int;\n#define GLSLIFY 1\n\nattribute vec3 position;\nattribute vec2 uv;\n\nvarying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n    gl_Position = vec4(position, 1.0 );\n}",
                    fragmentShader: "precision highp float;\nprecision highp int;\n#define GLSLIFY 1\n\nuniform sampler2D uTexture;\n\nvarying vec2 vUv;\n\nvoid main () {\n    gl_FragColor = texture2D(uTexture, vUv);\n}\n",
                    uniforms: {
                        uTexture: {
                            value: null
                        }
                    },
                    depthTest: !1,
                    depthWrite: !1,
                    blending: i.jFi
                })),
                this.mipQuad = new xi(this.material),
                this.size = new i.FM8,
                this.targetSize = new i.FM8,
                this.maxMipMapLevel = 1
            }
            resize(e, t) {
                const s = Math.floor(e.x)
                  , i = Math.floor(e.y);
                this.size.set(s, i),
                this.targetSize.set(Math.floor(1.5 * this.size.x), this.size.y),
                this.maxMipMapLevel = 1,
                t.setSize(this.targetSize.x, this.targetSize.y),
                this.swapTarget.setSize(this.targetSize.x, this.targetSize.y)
            }
            update(e, t, s) {
                const i = s.autoClear
                  , o = s.getRenderTarget();
                s.autoClear = !1,
                this.copyQuad.material.uniforms.uTexture.value = e,
                s.setRenderTarget(this.swapTarget),
                this.copyQuad.render(s);
                let n = this.size.x
                  , r = this.size.y
                  , a = 0;
                for (; n > this.maxMipMapLevel && r > this.maxMipMapLevel; ) {
                    this.material.uniforms.map.value = this.swapTarget.texture,
                    this.material.uniforms.parentLevel.value = a,
                    this.material.uniforms.parentMapSize.value.set(n, r),
                    this.material.uniforms.originalMapSize.value.set(this.size.x, this.size.y),
                    n = Math.floor(n / 2),
                    r = Math.floor(r / 2);
                    const e = this.targetSize.y - 2 * r;
                    s.setRenderTarget(t),
                    this.mipQuad.camera.setViewOffset(n, r, -this.size.x, -e, this.targetSize.x, this.targetSize.y),
                    this.mipQuad.render(s),
                    s.setRenderTarget(this.swapTarget),
                    this.material.uniforms.map.value = t.texture,
                    this.mipQuad.render(s),
                    a++
                }
                s.setRenderTarget(o),
                s.autoClear = i
            }
            dispose() {
                this.swapTarget.dispose(),
                this.mipQuad.dispose(),
                this.copyQuad.dispose()
            }
        }
        class Pi extends i.Kj0 {
            constructor(e, t, s) {
                var r, a, l;
                super(e, t),
                l = ()=>{
                    this.textureSize.set(.5 * o.window.w, .5 * o.window.fullHeight),
                    this.mipmapper.resize(this.textureSize, this.renderTarget)
                }
                ,
                (a = "onResize")in (r = this) ? Object.defineProperty(r, a, {
                    value: l,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : r[a] = l,
                this.name = s,
                this.ignoreObjects = [],
                this.renderReflection = !0,
                this.camera = null,
                this.scene = null,
                this.sceneCamera = null,
                this.reflectorPlane = new i.JOQ,
                this.normal = new i.Pa4,
                this.reflectorWorldPosition = new i.Pa4,
                this.cameraWorldPosition = new i.Pa4,
                this.rotationMatrix = new i.yGw,
                this.lookAtPosition = new i.Pa4(0,0,-1),
                this.clipPlane = new i.Ltg,
                this.view = new i.Pa4,
                this.target = new i.Pa4,
                this.q = new i.Ltg,
                this.textureSize = new i.FM8(.5 * o.window.w,.5 * o.window.fullHeight),
                this.textureMatrix = new i.yGw,
                this.renderTarget = new i.dd2(this.textureSize.x,this.textureSize.y,{
                    minFilter: i.wem
                }),
                this.mipmapper = new yi,
                this.mipmapper.resize(this.textureSize, this.renderTarget),
                this.material.uniforms.uTextureMatrix = {
                    value: this.textureMatrix
                },
                this.material.uniforms.uTexture = {
                    value: this.renderTarget.texture
                },
                this.material.uniforms.uMipmapTextureSize = {
                    value: this.mipmapper.targetSize
                },
                this.matrixAutoUpdate = !1,
                n.on(o.events.RESIZE, this.onResize)
            }
            onBeforeRender() {
                if (this.reflectorWorldPosition.setFromMatrixPosition(this.matrixWorld),
                this.cameraWorldPosition.setFromMatrixPosition(this.sceneCamera.matrixWorld),
                this.rotationMatrix.extractRotation(this.matrixWorld),
                this.normal.set(0, 0, 1),
                this.normal.applyMatrix4(this.rotationMatrix),
                this.view.subVectors(this.reflectorWorldPosition, this.cameraWorldPosition),
                this.view.dot(this.normal) > 0)
                    return;
                this.view.reflect(this.normal).negate(),
                this.view.add(this.reflectorWorldPosition),
                this.rotationMatrix.extractRotation(this.sceneCamera.matrixWorld),
                this.lookAtPosition.set(0, 0, -1),
                this.lookAtPosition.applyMatrix4(this.rotationMatrix),
                this.lookAtPosition.add(this.cameraWorldPosition),
                this.target.subVectors(this.reflectorWorldPosition, this.lookAtPosition),
                this.target.reflect(this.normal).negate(),
                this.target.add(this.reflectorWorldPosition),
                this.camera.position.copy(this.view),
                this.camera.up.set(0, 1, 0),
                this.camera.up.applyMatrix4(this.rotationMatrix),
                this.camera.up.reflect(this.normal),
                this.camera.lookAt(this.target),
                this.camera.far = this.sceneCamera.far,
                this.camera.updateMatrixWorld(),
                this.camera.projectionMatrix.copy(this.sceneCamera.projectionMatrix),
                this.textureMatrix.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1),
                this.textureMatrix.multiply(this.camera.projectionMatrix),
                this.textureMatrix.multiply(this.camera.matrixWorldInverse),
                this.textureMatrix.multiply(this.matrixWorld),
                this.reflectorPlane.setFromNormalAndCoplanarPoint(this.normal, this.reflectorWorldPosition),
                this.reflectorPlane.applyMatrix4(this.camera.matrixWorldInverse),
                this.clipPlane.set(this.reflectorPlane.normal.x, this.reflectorPlane.normal.y, this.reflectorPlane.normal.z, this.reflectorPlane.constant);
                const e = this.camera.projectionMatrix;
                this.q.x = (Math.sign(this.clipPlane.x) + e.elements[8]) / e.elements[0],
                this.q.y = (Math.sign(this.clipPlane.y) + e.elements[9]) / e.elements[5],
                this.q.z = -1,
                this.q.w = (1 + e.elements[10]) / e.elements[14],
                this.clipPlane.multiplyScalar(2 / this.clipPlane.dot(this.q)),
                e.elements[2] = this.clipPlane.x,
                e.elements[6] = this.clipPlane.y,
                e.elements[10] = this.clipPlane.z + 1 - .003,
                e.elements[14] = this.clipPlane.w,
                this.visible = !1;
                for (let e = 0; e < this.ignoreObjects.length; e++)
                    this.ignoreObjects[e].visible = !1;
                if (this.renderReflection) {
                    const e = o.Gl.renderer.getRenderTarget();
                    o.Gl.renderer.setRenderTarget(this.renderTarget),
                    o.Gl.renderer.setViewport(0, 0, this.textureSize.x / o.Gl.renderer.getPixelRatio(), this.textureSize.y / o.Gl.renderer.getPixelRatio()),
                    o.Gl.renderer.setScissor(0, 0, this.textureSize.x, this.textureSize.y),
                    o.Gl.renderer.setScissorTest(!0),
                    o.Gl.renderer.clear(!0),
                    o.Gl.renderer.render(this.scene, this.camera),
                    o.Gl.renderer.setRenderTarget(null),
                    o.Gl.renderer.setViewport(0, 0, o.window.w, o.window.fullHeight),
                    o.Gl.renderer.setScissor(0, 0, o.window.w, o.window.fullHeight),
                    o.Gl.renderer.setRenderTarget(e),
                    this.mipmapper.update(this.renderTarget.texture, this.renderTarget, o.Gl.renderer)
                }
                this.visible = !0;
                for (let e = 0; e < this.ignoreObjects.length; e++)
                    this.ignoreObjects[e].visible = !0
            }
            updateCameraScene(e, t) {
                this.sceneCamera = e,
                this.camera = e.clone(),
                this.scene = t
            }
            clearIgnoreObjects() {
                this.ignoreObjects = []
            }
            destroy() {
                this.renderTarget.dispose(),
                this.geometry.dispose(),
                this.material.dispose(),
                this.mipmapper.dispose(),
                n.off(o.events.RESIZE, this.onResize)
            }
        }
        function wi(e, t, s) {
            return t in e ? Object.defineProperty(e, t, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = s,
            e
        }
        class bi {
            constructor() {
                wi(this, "onProjectsBtnClick", (()=>{
                    n.off("mouseenter", this.viewProjectsBtn3D.element, this.onProjectsBtnEnter),
                    n.off("mouseleave", this.viewProjectsBtn3D.element, this.onProjectsBtnLeave)
                }
                )),
                wi(this, "onProjectsBtnEnter", (()=>{
                    l.ZP.to(this.options, {
                        cameraTranslateZ: -.005,
                        overwrite: !0,
                        duration: 2,
                        ease: "power2.out"
                    })
                }
                )),
                wi(this, "onProjectsBtnLeave", (()=>{
                    l.ZP.to(this.options, {
                        cameraTranslateZ: 0,
                        overwrite: !0,
                        duration: 1,
                        ease: "power2.out"
                    })
                }
                )),
                wi(this, "onRaf", (e=>{
                    this.smoothMouse.lerp(o.mouse.glNormalized, .075),
                    this.smoothMouse2.lerp(o.mouse.glNormalized, .02),
                    this.world.rotation.y -= 1e-4,
                    this.globalUniforms.u_time.value = e,
                    this.renderCss && (this.camera.position.multiplyScalar(1e3),
                    o.Gl.cssRenderer.render(o.Gl.cssScene, this.camera),
                    this.camera.position.multiplyScalar(.001)),
                    this.updateCameraPosition()
                }
                )),
                wi(this, "onResize", (()=>{
                    this.camera.aspect = o.window.w / o.window.fullHeight,
                    this.camera.updateProjectionMatrix(),
                    this.camera.setFocalLength(o.mq.sm.matches ? 36 : 42)
                }
                )),
                wi(this, "updateHtmlScale", (()=>{
                    if (!this.viewProjectsBtn3D)
                        return;
                    const e = 1e3 * -(this.objectsData.ho.position.z - this.objectsData.cam.children[3].position.z);
                    this.viewProjectsBtn3D.scale.setScalar(e / o.Gl.cssRenderer.cache.camera.fov),
                    this.contactContent3D.scale.setScalar(100 / o.Gl.cssRenderer.cache.camera.fov)
                }
                )),
                this.scene = new i.xsS,
                this.camera = o.Gl.camera.clone(),
                this.firstLoad = !1,
                this.renderCss = !1,
                this.isHome = document.body.classList.contains("home"),
                this.dom = {
                    navHome: p(".js-nav-home"),
                    navContact: p(".js-nav-contact")
                },
                this.globalUniforms = {
                    u_time: {
                        value: 0
                    }
                },
                this.tweenParams = {
                    cameraPathProgress: this.isHome ? 1 : 0,
                    cameraYOffset: 0
                },
                this.devCam = o.urlParams.has("devcam"),
                this.camPos = new i.Pa4(-.15,.05,0),
                this.lookAt = new i.Pa4(-.26,.04,-.1),
                this.options = {
                    mouseMoveAngleX: .135,
                    mouseMoveAngleY: .035,
                    cameraZOffset: .1,
                    cameraTranslateZ: 0,
                    cameraMotionPosAmplitude: .026,
                    cameraMotionRotAmplitude: .0132,
                    cameraMotionPosFrequency: .21,
                    cameraMotionRotFrequency: .59,
                    homeDemo: o.urlParams.has("homedemo"),
                    disableCursor: o.urlParams.has("disablecursor")
                },
                this.smoothMouse = new i.FM8,
                this.smoothMouse2 = new i.FM8,
                this.resourceTracker = new gs,
                this.load()
            }
            build() {
                this.instanceDummy = new i.Tme,
                this.brownianMotion = new ci,
                this.brownianMotion.positionAmplitude = this.options.cameraMotionPosAmplitude,
                this.brownianMotion.rotationAmplitude = this.options.cameraMotionRotAmplitude,
                this.brownianMotion.positionFrequency = this.options.cameraMotionPosFrequency,
                this.brownianMotion.rotationFrequency = this.options.cameraMotionRotFrequency,
                this.brownianMotion.positionScale.multiplyScalar(.1),
                this.mapObjectsData(),
                this.camera.near = .001,
                this.camera.far = 2,
                this.onResize(),
                this.buildObjects(),
                this.buildGrass(),
                this.buildWater(),
                this.buildText(),
                this.buildParticles(),
                this.buildCameraProps(),
                this.buildFluidSim(),
                this.buildHtml(),
                this.options.homeDemo && this.options.disableCursor && (g(".cursor").style.display = "none"),
                this.buildPasses(),
                this.firstLoad && this.enable(),
                n.on(o.events.RESIZE, this.onResize)
            }
            mapObjectsData() {
                this.objectsData = {};
                for (let e = 0; e < this.assets.objectsData.children.length; e++) {
                    const t = this.assets.objectsData.children[e];
                    this.objectsData[t.name] = t
                }
            }
            buildObjects() {
                this.container = new i.ZAu,
                this.scene.add(this.container),
                this.assets.textures.skymap.mapping = i.dSO,
                this.assets.textures.skymap.wrapT = this.assets.textures.skymap.wrapS = i.rpg,
                this.assets.textures.skymap.flipY = !0,
                this.assets.textures.skymap.repeat.set(6, 6),
                this.assets.textures.skymap.offset.set(0, 1.254),
                this.assets.textures.skymap.needsUpdate = !0,
                this.homeRoom = this.assets.models.homeRoom,
                this.homeRoom.material = new i.vBJ({
                    map: this.assets.textures.homeRoom
                }),
                this.applyObjectTransforms(this.homeRoom, "room-1"),
                this.homeRoom.matrixAutoUpdate = !1,
                this.homeRoom.updateMatrix(),
                this.container.add(this.homeRoom),
                this.contactRoom = this.assets.models.contactRoom,
                this.contactRoom.material = new i.vBJ({
                    map: this.assets.textures.contactRoom
                }),
                this.applyObjectTransforms(this.contactRoom, "room-2"),
                this.contactRoom.matrixAutoUpdate = !1,
                this.contactRoom.updateMatrix(),
                this.container.add(this.contactRoom),
                this.chair = this.assets.models.chair,
                this.chair.material = new i.vBJ({
                    map: this.assets.textures.chair
                }),
                this.applyObjectTransforms(this.chair, "chair"),
                this.chair.matrixAutoUpdate = !1,
                this.chair.updateMatrix(),
                this.container.add(this.chair),
                this.pillows = this.assets.models.pillows,
                this.pillows.material = new i.vBJ({
                    map: this.assets.textures.pillows
                }),
                this.applyObjectTransforms(this.pillows, "pillow"),
                this.pillows.matrixAutoUpdate = !1,
                this.pillows.updateMatrix(),
                this.container.add(this.pillows),
                this.rocks = this.assets.models.rocks,
                this.rocks.material = new i.vBJ({
                    map: this.assets.textures.rock
                }),
                this.applyObjectTransforms(this.rocks, "rock"),
                this.rocks.matrixAutoUpdate = !1,
                this.rocks.updateMatrix(),
                this.container.add(this.rocks),
                this.table = this.assets.models.table,
                this.table.geometry.setAttribute("uv2", new i.TlE(this.table.geometry.attributes.uv.array,2)),
                this.table.material = new i.vBJ({
                    map: this.assets.textures.table,
                    envMap: this.assets.textures.skymap,
                    reflectivity: 1
                }),
                this.applyObjectTransforms(this.table, "table-3"),
                this.table.matrixAutoUpdate = !1,
                this.table.updateMatrix(),
                this.container.add(this.table),
                this.assets.textures.pearlMatcap.flipY = !0,
                this.assets.textures.pearlMatcap.needsUpdate = !0,
                this.ballContainer = new i.ZAu,
                this.ball = new i.Kj0(new i.Aip(1,20,20),new i.kaV({
                    matcap: this.assets.textures.pearlMatcap
                })),
                this.applyObjectTransforms(this.ballContainer, "sphere"),
                this.ballContainer.scale.setScalar(.01),
                this.ball.geometry.computeBoundingBox(),
                this.ball.position.y = this.ball.geometry.boundingBox.max.z,
                this.ball.matrixAutoUpdate = !1,
                this.ball.updateMatrix(),
                this.ballContainer.add(this.ball),
                this.container.add(this.ballContainer),
                this.world = new i.Kj0(new i.Aip(1,6,6),new i.vBJ({
                    color: 16777215,
                    map: this.assets.textures.skymap,
                    side: i._Li,
                    fog: !1
                })),
                this.container.add(this.world)
            }
            buildGrass() {
                let e;
                this.grassSharedUniforms = {
                    u_baseColor: {
                        value: new i.Ilk(14396108)
                    },
                    u_gradientNoiseTexture: {
                        value: o.Gl.assets.textures.gradientNoise
                    },
                    fogNear: {
                        value: .29
                    },
                    fogFar: {
                        value: 1.09
                    },
                    fogColor: {
                        value: new i.Ilk(14733263)
                    },
                    lightPos: {
                        value: new i.Pa4(-.26,-1.06,-.22)
                    }
                },
                this.land = this.assets.models.land,
                this.land.material = new i.jyz({
                    vertexShader: "#define GLSLIFY 1\nvarying vec3 vWorldPosition;\n\nvoid main () {\n\tvWorldPosition = (modelMatrix * vec4(position, 1.)).xyz;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1 );\n}",
                    fragmentShader: "#define GLSLIFY 1\nvarying vec3 vWorldPosition;\n\nuniform vec3 u_baseColor;\nuniform sampler2D u_gradientNoiseTexture;\nuniform float u_time;\nuniform vec3 fogColor;\nuniform float fogNear;\nuniform float fogFar;\n\nvoid main() {\n\tvec3 baseColor = u_baseColor;\n\n\t// vec2 noisePos = vWorldPosition.xz * 8.;\n\n\t// vec3 n1 = (texture2D(u_gradientNoiseTexture, noisePos * 0.3 - vec2(0.5, 0.0)).rgb - 0.5) * 0.2;\n    // vec3 n2 = (texture2D(u_gradientNoiseTexture, noisePos * 0.6 + vec2(n1.x + n1.y) * 0.3 + 200.0 - vec2(0.0, n1.z * 1.0)).rgb - 0.5);\n\t// float noise = (n1.x + n2.x * 4.0 - n1.y + n2.y * 5.0) * 0.3;\n\n\t// baseColor += clamp(noise, -0.2, 0.2) * 0.5;\n\tgl_FragColor = vec4(baseColor, 1.);\n\n\tfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n\tfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n}",
                    uniforms: {
                        u_baseColor: this.grassSharedUniforms.u_baseColor,
                        u_gradientNoiseTexture: this.grassSharedUniforms.u_gradientNoiseTexture,
                        u_time: this.globalUniforms.u_time,
                        fogNear: this.grassSharedUniforms.fogNear,
                        fogFar: this.grassSharedUniforms.fogFar,
                        fogColor: this.grassSharedUniforms.fogColor
                    }
                }),
                this.applyObjectTransforms(this.land, "land"),
                this.land.matrixAutoUpdate = !1,
                this.land.updateMatrix(),
                this.container.add(this.land),
                e = o.mq.md.matches ? 25e3 : o.mq.sm.matches ? 15e3 : 5e3;
                const t = new i.Pa4
                  , s = new i.Pa4
                  , n = this.land.geometry.clone().toNonIndexed()
                  , r = new i.Kj0(n)
                  , a = new li.a(r).build()
                  , l = new i._12(.01,1,2,5)
                  , h = (new i.yGw).makeTranslation(0, -.5, 0);
                l.applyMatrix4(h);
                const c = (new i.yGw).makeRotationX(-Math.PI);
                l.applyMatrix4(c);
                const d = l.attributes.position.array;
                for (let e = 0; e < d.length; e += 3)
                    0 === d[e + 0] && (d[e + 2] = .005);
                this.grass = new i.SPe(l,new i.FIo({
                    vertexShader: "precision highp float;\n#define GLSLIFY 1\n\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute mat4 instanceMatrix;\nattribute vec3 instanceColor;\nuniform mat3 normalMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 modelMatrix;\nuniform float u_time;\nuniform sampler2D u_noise;\nvarying vec3 vNormal;\nvarying vec3 vPosition;\nvarying vec4 vWorldPosition;\nvarying vec3 vViewPosition;\nvarying vec2 vUv;\n\nfloat inCubic(in float t) {\n  return t * t * t;\n}\n\nmat4 inverse(mat4 m) {\n  float a00 = m[0][0], a01 = m[0][1], a02 = m[0][2], a03 = m[0][3],\n      a10 = m[1][0], a11 = m[1][1], a12 = m[1][2], a13 = m[1][3],\n      a20 = m[2][0], a21 = m[2][1], a22 = m[2][2], a23 = m[2][3],\n      a30 = m[3][0], a31 = m[3][1], a32 = m[3][2], a33 = m[3][3],\n\n      b00 = a00 * a11 - a01 * a10,\n      b01 = a00 * a12 - a02 * a10,\n      b02 = a00 * a13 - a03 * a10,\n      b03 = a01 * a12 - a02 * a11,\n      b04 = a01 * a13 - a03 * a11,\n      b05 = a02 * a13 - a03 * a12,\n      b06 = a20 * a31 - a21 * a30,\n      b07 = a20 * a32 - a22 * a30,\n      b08 = a20 * a33 - a23 * a30,\n      b09 = a21 * a32 - a22 * a31,\n      b10 = a21 * a33 - a23 * a31,\n      b11 = a22 * a33 - a23 * a32,\n\n      det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;\n\n  return mat4(\n      a11 * b11 - a12 * b10 + a13 * b09,\n      a02 * b10 - a01 * b11 - a03 * b09,\n      a31 * b05 - a32 * b04 + a33 * b03,\n      a22 * b04 - a21 * b05 - a23 * b03,\n      a12 * b08 - a10 * b11 - a13 * b07,\n      a00 * b11 - a02 * b08 + a03 * b07,\n      a32 * b02 - a30 * b05 - a33 * b01,\n      a20 * b05 - a22 * b02 + a23 * b01,\n      a10 * b10 - a11 * b08 + a13 * b06,\n      a01 * b08 - a00 * b10 - a03 * b06,\n      a30 * b04 - a31 * b02 + a33 * b00,\n      a21 * b02 - a20 * b04 - a23 * b00,\n      a11 * b07 - a10 * b09 - a12 * b06,\n      a00 * b09 - a01 * b07 + a02 * b06,\n      a31 * b01 - a30 * b03 - a32 * b00,\n      a20 * b03 - a21 * b01 + a22 * b00) / det;\n}\n\nmat4 transpose(mat4 m) {\n  return mat4(m[0][0], m[1][0], m[2][0], m[3][0],\n              m[0][1], m[1][1], m[2][1], m[3][1],\n              m[0][2], m[1][2], m[2][2], m[3][2],\n              m[0][3], m[1][3], m[2][3], m[3][3]);\n}\n\nvoid main() {\n\tvUv = vec2(uv.x, 1.-uv.y);\n\t\n\tvec2 size = vec2(256.);\n\tfloat id = float(int(instanceColor.x));\n\tvec2 curlUv = instanceColor.yz;\n\tcurlUv = vec2(mod(id, size.x)/(size.x), (id/size.x)/(size.y));\n\tvec4 c = texture2D(u_noise, curlUv);\n\tfloat noise2 = texture2D(u_noise, curlUv * 0.08 + u_time * 0.007).r;\n\tfloat h = 0.8 + noise2;\n\t\n\t// noise2 = clamp((noise2 - 0.5), -0.15, 0.15);\n\tvec3 pNormal = (transpose(inverse(modelMatrix)) * vec4(normalize(vec3((noise2 - 0.5) * c.x, 1., (noise2 - 0.5) * c.z)), 1.)).xyz;\n\tvec3 target = normalize(position + pNormal ) * h;\n\tvNormal = normalMatrix * pNormal;\n\tvec3 offset;\n\tfloat f = inCubic(position.y);\n\toffset = mix(position, target, f);\n\t\n\tvec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(offset, 1.0);\n\tvPosition = mvPosition.xyz;\n\tvViewPosition = -mvPosition.xyz;\n\tvWorldPosition = (modelMatrix * instanceMatrix * vec4(position, 1.));\n\tgl_Position = projectionMatrix * mvPosition;\n}",
                    fragmentShader: "precision highp float;\n#define GLSLIFY 1\n\nuniform vec3 cameraPosition;\n\nvarying vec2 vUv;\nvarying vec3 vNormal;\nvarying vec3 vPosition;\nvarying vec4 vWorldPosition;\n\nuniform sampler2D u_blade;\nuniform sampler2D u_noise;\nuniform float u_time;\nuniform vec3 fogColor;\nuniform float fogNear;\nuniform float fogFar;\nuniform vec3 u_color1;\nuniform vec3 u_color2;\n\nvoid main() {\n\tvec4 c = texture2D(u_blade, vUv);\n\tif(c.r < .35) {\n\t\tdiscard;\n\t}\n\n\tfloat noise = (texture2D(u_noise, vWorldPosition.xz * 1. + u_time * 0.01).r - 0.2) * 2.;\n\tnoise = clamp(noise, 0., 1.);\n\tvec3 color = mix(u_color1, u_color2, noise);\n\n\tgl_FragColor = vec4(color * clamp(vUv.y + 0.4, 1., 1.2) * clamp(1. - abs(vUv.x * 2. - 1.), 0.7, 1.) + 0.1, 1.);\n\n\t// vec3 adjustedLight = vec3(15., 2., -5.) + cameraPosition;\n\t// vec3 lightDirection = normalize(vPosition - adjustedLight);\n\t// gl_FragColor.rgb += dot(-lightDirection, vNormal) * vec3(1.);\n\n\tfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n\tfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n}",
                    uniforms: {
                        u_baseColor: this.grassSharedUniforms.u_baseColor,
                        u_time: this.globalUniforms.u_time,
                        u_blade: {
                            value: this.assets.textures.blade
                        },
                        u_noise: this.grassSharedUniforms.u_gradientNoiseTexture,
                        u_color1: {
                            value: new i.Ilk(16765927)
                        },
                        u_color2: {
                            value: new i.Ilk(13931456)
                        },
                        u_matcap: {
                            value: o.Gl.assets.textures.projectModelMatcap
                        },
                        fogNear: this.grassSharedUniforms.fogNear,
                        fogFar: this.grassSharedUniforms.fogFar,
                        fogColor: this.grassSharedUniforms.fogColor,
                        lightPos: this.grassSharedUniforms.lightPos
                    },
                    side: i.ehD
                }),e);
                for (let o = 0; o < e; o++)
                    a.sample(t, s),
                    this.instanceDummy.position.copy(t),
                    this.instanceDummy.scale.set(.07, .005, .07),
                    this.instanceDummy.rotation.y = i.M8C.randFloat(-.5, .5),
                    this.instanceDummy.updateMatrix(),
                    this.grass.setMatrixAt(o, this.instanceDummy.matrix),
                    this.grass.setColorAt(o, new i.Pa4(o,o % 256 / 256,Math.floor(o / 256) / 256));
                this.applyObjectTransforms(this.grass, "land"),
                this.grass.matrixAutoUpdate = !1,
                this.grass.updateMatrix(),
                this.container.add(this.grass)
            }
            buildWater() {
                this.water = new Pi(new i._12,new i.jyz({
                    vertexShader: "#define GLSLIFY 1\nvarying vec4 vMirrorCoord;\nvarying vec2 vUv;\nvarying vec3 vWorldPosition;\n\nuniform mat4 uTextureMatrix;\n\nvoid main () {\n\tvec3 transformedPosition = position;\n\n\tvUv = uv;\n\n\tvWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;\n\n\tvMirrorCoord = uTextureMatrix * vec4( transformedPosition, 1.0 );\n\n\tvec4 mvPosition = vec4( transformedPosition, 1.0 );\n\tmvPosition = modelViewMatrix * mvPosition;\n\n\tgl_Position = projectionMatrix * mvPosition;\n}",
                    fragmentShader: '#define GLSLIFY 1\nvarying vec4 vMirrorCoord;\nvarying vec2 vUv;\nvarying vec3 vWorldPosition;\n\nuniform sampler2D uTexture;\nuniform sampler2D uAOTexture;\nuniform sampler2D uNoiseTexture;\nuniform sampler2D uFluidTexture;\nuniform vec2 uMipmapTextureSize;\nuniform vec2 uResolution;\nuniform vec3 uColor;\nuniform float uBaseLod;\nuniform float uDistortionAmount;\nuniform float uReflectionIntensity;\nuniform float uTime;\n\nvec4 cubic(float v) {\n    vec4 n = vec4(1.0, 2.0, 3.0, 4.0) - v;\n    vec4 s = n * n * n;\n    float x = s.x;\n    float y = s.y - 4.0 * s.x;\n    float z = s.z - 4.0 * s.y + 6.0 * s.x;\n    float w = 6.0 - x - y - z;\n    return vec4(x, y, z, w);\n}\n\n// https://stackoverflow.com/questions/13501081/efficient-bicubic-filtering-code-in-glsl\nvec4 textureBicubic(sampler2D t, vec2 texCoords, vec2 textureSize) {\n   vec2 invTexSize = 1.0 / textureSize;\n   texCoords = texCoords * textureSize - 0.5;\n\n    vec2 fxy = fract(texCoords);\n    texCoords -= fxy;\n    vec4 xcubic = cubic(fxy.x);\n    vec4 ycubic = cubic(fxy.y);\n\n    vec4 c = texCoords.xxyy + vec2 (-0.5, 1.5).xyxy;\n\n    vec4 s = vec4(xcubic.xz + xcubic.yw, ycubic.xz + ycubic.yw);\n    vec4 offset = c + vec4 (xcubic.yw, ycubic.yw) / s;\n\n    offset *= invTexSize.xxyy;\n\n    vec4 sample0 = texture2D(t, offset.xz);\n    vec4 sample1 = texture2D(t, offset.yz);\n    vec4 sample2 = texture2D(t, offset.xw);\n    vec4 sample3 = texture2D(t, offset.yw);\n\n    float sx = s.x / (s.x + s.y);\n    float sy = s.z / (s.z + s.w);\n\n    return mix(\n       mix(sample3, sample2, sx), mix(sample1, sample0, sx)\n    , sy);\n}\n\n// With original size argument\nvec4 packedTexture2DLOD( sampler2D tex, vec2 uv, int level, vec2 originalPixelSize ) {\n    float floatLevel = float( level );\n    vec2 atlasSize;\n    atlasSize.x = floor( originalPixelSize.x * 1.5 );\n    atlasSize.y = originalPixelSize.y;\n    \n    // we stop making mip maps when one dimension == 1\n    \n    float maxLevel = min( floor( log2( originalPixelSize.x ) ), floor( log2( originalPixelSize.y ) ) );\n    floatLevel = min( floatLevel, maxLevel );\n    \n    // use inverse pow of 2 to simulate right bit shift operator\n    \n    vec2 currentPixelDimensions = floor( originalPixelSize / pow( 2.0, floatLevel ) );\n    vec2 pixelOffset = vec2(\n    floatLevel > 0.0 ? originalPixelSize.x : 0.0, floatLevel > 0.0 ? currentPixelDimensions.y : 0.0\n    );\n    \n    // "minPixel / atlasSize" samples the top left piece of the first pixel\n    // "maxPixel / atlasSize" samples the bottom right piece of the last pixel\n    vec2 minPixel = pixelOffset;\n    vec2 maxPixel = pixelOffset + currentPixelDimensions;\n    vec2 samplePoint = mix( minPixel, maxPixel, uv );\n    samplePoint /= atlasSize;\n    vec2 halfPixelSize = 1.0 / ( 2.0 * atlasSize );\n    samplePoint = min( samplePoint, maxPixel / atlasSize - halfPixelSize );\n    samplePoint = max( samplePoint, minPixel / atlasSize + halfPixelSize );\n    return textureBicubic( tex, samplePoint, originalPixelSize );\n}\n\nvec4 packedTexture2DLOD( sampler2D tex, vec2 uv, float level, vec2 originalPixelSize ) {\n    float ratio = mod( level, 1.0 );\n    int minLevel = int( floor( level ) );\n    int maxLevel = int( ceil( level ) );\n    vec4 minValue = packedTexture2DLOD( tex, uv, minLevel, originalPixelSize );\n    vec4 maxValue = packedTexture2DLOD( tex, uv, maxLevel, originalPixelSize );\n    return mix( minValue, maxValue, ratio );\n}\n\nconst vec3 W = vec3(0.2125, 0.7154, 0.0721);\nfloat luminance(in vec3 color) {\n    return dot(color, W);\n}\n\nvoid main() {\n\tvec3 baseColor = uColor;\n    float ao = texture2D(uAOTexture, vUv).r;\n\tvec4 fluid = texture2D(uFluidTexture, vUv);\n\tvec2 fluidPos = normalize(fluid.rgb).xy;\n\n\tfloat noiseTime = uTime * 0.05;\n\tvec2 noisePos = vec2((vUv.x + 0.5) * 6., vUv.y * 20.) * 0.25;\n\tvec3 n1 = texture2D(uNoiseTexture, noisePos + vec2(0., 1. - noiseTime)).rgb - 0.5;\n\n\tfloat edgeReduce = smoothstep(0., uResolution.x * 0.1, gl_FragCoord.x) * smoothstep(uResolution.x, uResolution.x * 0.9, gl_FragCoord.x);\n\n    vec2 reflectionUv = vMirrorCoord.xy / vMirrorCoord.w;\n\treflectionUv.x += n1.x * 0.03 * edgeReduce * ao;\n\treflectionUv.xy += fluidPos * 0.02 * ao * edgeReduce;\n\n\tvec2 fluidSpec = n1.xy + abs(fluidPos * 8.);\n\tvec3 worldNormal = normalize(vec3(fluidSpec.x, 0.5 + fluidSpec.x, fluidSpec.y));\n\tvec3 specRay = reflect(normalize(vWorldPosition - cameraPosition), worldNormal);\n\tfloat spec = smoothstep(0.05, 1., dot(specRay, normalize(vec3(-1.0, 1.0, 1.0))));\n\t// spec += fluidPos.x + fluidPos.y;\n\n    float lod = clamp(uBaseLod + spec * 2., 0., 4.) * ao;\n\n    vec3 color = packedTexture2DLOD(uTexture, reflectionUv, lod + clamp(length(fluidPos.xy) * 12., 0., 2.), uMipmapTextureSize).rgb;\n\n\tcolor *= baseColor;\n\tcolor *= mix(0.9, 1., n1.x) + spec * 0.2 * ao;\n\n\tfloat lum = luminance(abs(fluid.rgb));\n    color += lum * 0.7 * ao;\n\n    gl_FragColor = vec4(color, 1.);\n    // gl_FragColor = vec4(vec3(ao), 1.);\n}',
                    uniforms: {
                        uNoiseTexture: {
                            value: o.Gl.assets.textures.gradientNoise
                        },
                        uTime: o.Gl.globalUniforms.u_time,
                        uColor: {
                            value: new i.Ilk(14870006)
                        },
                        uAOTexture: {
                            value: this.assets.textures.aoMap
                        },
                        uBaseLod: {
                            value: 1
                        },
                        uDistortionAmount: {
                            value: .013
                        },
                        uReflectionIntensity: {
                            value: .24
                        },
                        uFluidTexture: {
                            value: null
                        },
                        uResolution: o.Gl.globalUniforms.u_resolution
                    }
                }),"water"),
                this.applyObjectTransforms(this.water, "wate"),
                this.water.rotation.x = i.M8C.degToRad(-90),
                this.water.position.set(-.1193, .007851, .048929),
                this.water.scale.setScalar(.5),
                this.water.updateMatrix(),
                this.water.updateCameraScene(this.camera, this.scene),
                this.container.add(this.water)
            }
            buildText() {
                this.textScene = new i.xsS,
                this.textCamera = new i.iKG(-1,1,1,-1,.1,2),
                this.textCamera.position.z = 1,
                this.textRT = new i.dd2(o.window.w * o.Gl.renderer.getPixelRatio() * .5,o.window.fullHeight * o.Gl.renderer.getPixelRatio() * .5),
                this.homeText = new i.ZAu,
                this.introText = new nt.xv,
                Object.assign(this.introText, {
                    text: "A BRAND, DIGITAL & MOTION STUDIO",
                    font: o.Gl.webglFonts["Neue Montreal"].url,
                    fontSize: .0014,
                    letterSpacing: -.01,
                    anchorX: "center",
                    anchorY: "middle",
                    color: 3487029,
                    sdfGlyphSize: o.Gl.webglFonts["Neue Montreal"].sdfGlyphSize,
                    textAlign: "center"
                }),
                this.introText.position.y = this.introText.fontSize / 2 + .0082,
                this.introText.sync(),
                this.homeText.add(this.introText),
                this.line1 = new nt.xv,
                Object.assign(this.line1, {
                    text: "Creating the",
                    font: o.Gl.webglFonts["Saol Display"].url,
                    fontSize: .009,
                    letterSpacing: -.04,
                    anchorX: "center",
                    anchorY: "middle",
                    color: 3487029,
                    sdfGlyphSize: o.Gl.webglFonts["Saol Display"].sdfGlyphSize
                }),
                this.line1.position.y = this.line1.fontSize / 2 - 4e-4,
                this.line1.sync(),
                this.homeText.add(this.line1),
                this.line2 = new nt.xv,
                Object.assign(this.line2, {
                    text: "unexpected",
                    font: o.Gl.webglFonts["Neue Montreal"].url,
                    fontSize: .009,
                    letterSpacing: -.02,
                    anchorX: "center",
                    anchorY: "middle",
                    color: 3487029,
                    sdfGlyphSize: o.Gl.webglFonts["Neue Montreal"].sdfGlyphSize,
                    textAlign: "center"
                }),
                this.line2.position.y = -this.line2.fontSize / 2 + 4e-4,
                this.line2.sync((()=>{
                    this.homeText.bbox = (new i.ZzF).setFromObject(this.homeText),
                    this.homeText.bbox.getSize(this.homeTextMesh.scale),
                    this.homeTextMesh.scale.x *= 1.08,
                    this.homeTextMesh.scale.y *= 1.08,
                    this.homeTextMesh.scale.z = 1;
                    const e = this.homeTextMesh.scale.x / 2
                      , t = this.homeTextMesh.scale.y / 2;
                    this.textCamera.left = -e,
                    this.textCamera.right = e,
                    this.textCamera.top = t,
                    this.textCamera.bottom = -t,
                    this.textCamera.updateProjectionMatrix(),
                    o.Gl.renderer.setRenderTarget(this.textRT),
                    o.Gl.renderer.clear(),
                    o.Gl.renderer.render(this.textScene, this.textCamera),
                    o.Gl.renderer.setRenderTarget(null)
                }
                )),
                this.homeText.add(this.line2),
                this.textScene.add(this.homeText),
                this.homeTextMesh = new i.Kj0(new i._12,new i.jyz({
                    vertexShader: "#define GLSLIFY 1\nvarying vec2 vUv;\n\nvoid main () {\n\tvUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1 );\n}",
                    fragmentShader: "#define GLSLIFY 1\nvarying vec2 vUv;\n\nuniform sampler2D uTexture;\nuniform sampler2D uFluidTexture;\nuniform float uOpacity;\nuniform vec3 uTextColor1;\nuniform vec3 uTextColor2;\nuniform vec3 uTextColor3;\nuniform vec3 uTextColor4;\nuniform float uProgress;\n\nconst vec3 W = vec3(0.2125, 0.7154, 0.0721);\nfloat luminance(in vec3 color) {\n    return dot(color, W);\n}\n\nfloat scale = 15.; // = 4.0\nfloat smoothness = 0.1; // = 0.01\nfloat seed = 12.9898; // = 12.9898\n\n// http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/\nfloat random(vec2 co)\n{\n    highp float a = seed;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\n// 2D Noise based on Morgan McGuire @morgan3d\n// https://www.shadertoy.com/view/4dS3Wd\nfloat noise (in vec2 st) {\n    vec2 i = floor(st);\n    vec2 f = fract(st);\n\n    // Four corners in 2D of a tile\n    float a = random(i);\n    float b = random(i + vec2(1.0, 0.0));\n    float c = random(i + vec2(0.0, 1.0));\n    float d = random(i + vec2(1.0, 1.0));\n\n    // Smooth Interpolation\n\n    // Cubic Hermine Curve.  Same as SmoothStep()\n    vec2 u = f*f*(3.0-2.0*f);\n    // u = smoothstep(0.,1.,f);\n\n    // Mix 4 coorners porcentages\n    return mix(a, b, u.x) +\n            (c - a)* u.y * (1.0 - u.x) +\n            (d - b) * u.x * u.y;\n}\n\nvoid main() {\n\tvec2 uv = vUv;\n\n\tvec2 ratio = vec2(1.0, 1.0 / 1.6);\n\tfloat dist = length((vec2(vUv) - vec2(0., 1.)) * ratio * 0.75);\n\n\tgl_FragColor = vec4(1.);\n\n\tvec4 fluid = texture2D(uFluidTexture, vUv);\n\tvec2 fluidPos = -normalize(fluid.rgb).xy;\n\n\tif (uProgress < 1.) {\n\t\tfloat n = noise(vUv * scale);\n\t\tfloat p = mix(-smoothness, 1.0 + smoothness, uProgress);\n\t\tfloat lower = p - smoothness;\n\t\tfloat higher = p + smoothness;\n\t\t\n\t\tfloat edge = smoothstep(lower, higher, n);\n\t\tfloat q = smoothstep(uProgress - edge, uProgress, dist);\n\t\tgl_FragColor.a *= 1. - q;\n\t}\n\n\tuv += fluidPos * 0.025;\n\n\tvec4 tex = texture2D(uTexture, uv);\n\tfloat lum = luminance(abs(fluid.rgb));\n\tfloat intensity = smoothstep(0., 1., (abs(normalize(fluid.xyz).r)) * 3.);\n\n\tfloat h = 0.333;\n\tvec3 col1 = mix(mix(uTextColor1, uTextColor2, intensity/h), mix(uTextColor2, uTextColor3, (intensity - h)/(1.0 - h*2.0)), step(h, intensity));  \n    vec3 col2 = mix(mix(uTextColor2, uTextColor3, (intensity - h)/(1.0 - h*2.0)), mix(uTextColor3, uTextColor4, (intensity - h*2.0)/(1.0-h*2.0)), step(h*2.0, intensity));\n    vec3 col = mix(col1,col2,step(h*2.0,intensity));\n\n\tvec3 color = col * lum;\n\tcolor = max(vec3(0.13), color);\n\tgl_FragColor.rgb = color;\n\tgl_FragColor.a *= tex.a * uOpacity;\n}",
                    uniforms: {
                        uTexture: {
                            value: this.textRT.texture
                        },
                        uOpacity: {
                            value: 0
                        },
                        uFluidTexture: {
                            value: null
                        },
                        uTextColor1: {
                            value: new i.Ilk(16777215)
                        },
                        uTextColor2: {
                            value: new i.Ilk(15650815)
                        },
                        uTextColor3: {
                            value: new i.Ilk(11910143)
                        },
                        uTextColor4: {
                            value: new i.Ilk(16048383)
                        },
                        uProgress: {
                            value: this.firstLoad ? 0 : 1
                        }
                    },
                    transparent: !0
                })),
                this.homeTextMesh.name = "text",
                this.homeTextMesh.position.copy(this.objectsData.ho.position),
                this.homeTextMesh.rotation.y = -this.objectsData.ho.rotation.z,
                this.homeTextMesh.updateMatrixWorld(),
                this.container.add(this.homeTextMesh),
                this.water.ignoreObjects.push(this.homeTextMesh),
                this.textFluidSim = new jt({
                    raycastPointer: o.mouse.glNormalized,
                    raycastCamera: this.camera,
                    raycastObject: this.homeTextMesh,
                    fluid: {
                        resolution: 128,
                        force: 20,
                        iterations: 1,
                        mouseRadius: .2,
                        pressure: .999,
                        viscosity: .999,
                        forceClamp: !1
                    }
                }),
                this.homeTextMesh.material.uniforms.uFluidTexture.value = this.textFluidSim.velocitySim.texture,
                this.contactText = new i.ZAu,
                this.contactText.position.copy(this.objectsData.conta.position),
                this.contactText.rotation.y = -this.objectsData.conta.rotation.z,
                this.container.add(this.contactText)
            }
            buildParticles() {
                this.particles = new i.SPe(new i._12(.001,.001),new i.jyz({
                    vertexShader: "#define GLSLIFY 1\nvarying vec3 vWorldPosition;\nvarying vec3 vPos;\nvarying vec2 vUv;\nvarying float aUv;\n\nattribute float a_progress;\nattribute float a_uv;\n\n// uniform sampler2D u_gradientNoiseTexture;\nuniform float u_time;\n\nvoid main () {\n\tvUv = uv;\n\taUv = a_uv;\n\tvWorldPosition = (modelMatrix * instanceMatrix * vec4(position, 1.)).xyz;\n\n\t// float noiseTime = 100. + u_time * 0.005;\n\n\tvec3 up = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);\n    vec3 right = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);\n    vec3 billboardPos = right * position.x + up * position.y;\n\n    vec4 mvPosition = vec4( billboardPos, 1.0 );\n\n    // vec4 mvPosition = modelViewMatrix * (instanceMatrix * vec4(0., 0., 0., 1.));\n\t// mvPosition += vec4(position.x, position.y, position.z, 0.);\n\n\t// vec4 mvPosition = modelViewMatrix * (instanceMatrix * vec4(position, 1.));\n\n\t// vec2 noisePos = vWorldPosition.xz * 1.5;\n\n\t// vec3 n1 = (texture2D(u_gradientNoiseTexture, noisePos * 0.3 - vec2(noiseTime * 0.5, 0.0)).rgb - 0.5) * 0.2;\n    // vec3 n2 = (texture2D(u_gradientNoiseTexture, noisePos * 0.6 + vec2(n1.x + n1.y) * 0.3 + 200.0 - vec2(0.0, noiseTime + n1.z * 1.0)).rgb - 0.5);\n\t// float noise = (n1.x + n2.x * 4.0 - n1.y + n2.y * 5.0) * 0.3;\n\n\tfloat progressTime = 100. + u_time * 0.8;\n\tfloat progress = mod(a_progress + progressTime * 0.002, 0.09);\n\n\tmvPosition = instanceMatrix * mvPosition;\n\n\tmvPosition.y -= progress;\n\tmvPosition.z -= progress;\n\tmvPosition.x += progress * 0.8;\n\n    // mvPosition.xyz += (noise * 0.0015);\n    // mvPosition.x += sin(noise) * 0.003;\n    // mvPosition.y -= sin(noise) * 0.004;\n    // mvPosition.z += sin(noise) * 0.005;\n\n\tvWorldPosition = mvPosition.xyz;\n\n\tmvPosition = modelViewMatrix * mvPosition;\n\tvPos = mvPosition.xyz;\n    gl_Position = projectionMatrix * mvPosition;\n}",
                    fragmentShader: "#define GLSLIFY 1\nvarying vec3 vWorldPosition;\nvarying vec3 vPos;\nvarying vec2 vUv;\nvarying float aUv;\n\nuniform vec3 u_baseColor;\nuniform sampler2D u_particleTex;\nuniform vec3 u_lightPos;\n\nvec2 rotate2d(vec2 uv, float a) {\n    return mat2(cos(a), -sin(a), sin(a), cos(a)) * uv;\n}\n\nvoid main() {\n\tvec3 baseColor = u_baseColor;\n\n\tvec4 particleColor = texture2D(u_particleTex, vec2((vUv.x + aUv) * 0.125, vUv.y * 0.5));\n\tvec4 particleBlur = texture2D(u_particleTex, vec2((vUv.x + aUv) * 0.125, (vUv.y + 1.) * 0.5));\n\tvec4 particleMix = mix(particleBlur, particleColor, smoothstep(0., 1., (cameraPosition.z - vWorldPosition.z) * 10.));\n\t// vec4 particleMix = mix(vec4(1., 0., 0., 1.), vec4(0., 1., 0., 1.), (cameraPosition.z - vWorldPosition.z) * 10.);\n\n\tvec3 normal = vec3(particleMix.rg * 2.0 - 1.0, 0.0);\n    normal.xy = rotate2d(normal.xy, 3.1415926);\n    normal.z = sqrt(1.0 - normal.x * normal.x - normal.y * normal.y);\n    normal = normalize(normal);\n    vec3 lightPosition = u_lightPos;\n    float light = max(0.0, dot(normal, normalize(lightPosition)));\n    \n    float alpha = particleMix.b;\n    gl_FragColor = vec4(baseColor, alpha * light);\n\tgl_FragColor.a *= 1. - smoothstep(-0.015, -0.02, vPos.y);\n\t// gl_FragColor = particleMix;\n}",
                    uniforms: {
                        u_baseColor: {
                            value: new i.Ilk(16049391)
                        },
                        u_time: this.globalUniforms.u_time,
                        u_particleTex: {
                            value: this.assets.textures.particle
                        },
                        u_lightPos: {
                            value: new i.Pa4(.79,.24,.63)
                        }
                    },
                    transparent: !0,
                    depthWrite: !1
                }),300);
                const e = []
                  , t = [];
                this.instanceDummy.position.set(0, 0, 0),
                this.instanceDummy.rotation.set(0, 0, 0),
                this.instanceDummy.scale.setScalar(1);
                for (let s = 0; s < 300; s++)
                    this.instanceDummy.position.set(i.M8C.randFloat(-.2, .05), .09, i.M8C.randFloat(-.1, .3)),
                    this.instanceDummy.updateMatrix(),
                    this.particles.setMatrixAt(s, this.instanceDummy.matrix),
                    e.push(Math.random()),
                    t.push(s % 8);
                this.particles.geometry.setAttribute("a_progress", new i.lb7(new Float32Array(e),1)),
                this.particles.geometry.setAttribute("a_uv", new i.lb7(new Float32Array(t),1)),
                this.container.add(this.particles),
                this.water.ignoreObjects.push(this.particles)
            }
            buildFluidSim() {
                this.fluidSim = new jt({
                    raycastPointer: o.mouse.glNormalized,
                    raycastCamera: this.camera,
                    raycastObject: this.water
                }),
                this.water.material.uniforms.uFluidTexture.value = this.fluidSim.velocitySim.texture
            }
            applyObjectTransforms(e, t) {
                e.position.copy(this.objectsData[t].position),
                e.rotation.copy(this.objectsData[t].rotation),
                e.scale.copy(this.objectsData[t].scale)
            }
            buildPasses() {
                this.renderPass = new Vs.C(this.scene,this.camera),
                this.renderPass.name = "HomeContact",
                this.renderPass.enabled = !1,
                this.savePass = new Js.o(new i.dd2(o.window.w * o.Gl.renderer.getPixelRatio(),o.window.fullHeight * o.Gl.renderer.getPixelRatio(),{
                    minFilter: i.wem,
                    magFilter: i.wem,
                    depthBuffer: !1
                })),
                this.savePass.name = "Home Final",
                this.savePass.enabled = !1,
                this.transitionPass = new ot.T(new i.jyz({
                    vertexShader: "#define GLSLIFY 1\nvarying vec2 vUv;\n\nvoid main () {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1 );\n}",
                    fragmentShader: "#define GLSLIFY 1\nvarying vec2 vUv;\n\nuniform sampler2D u_fromScene;\nuniform sampler2D u_toScene;\nuniform sampler2D u_noise;\nuniform float u_progress;\nuniform float u_time;\n\nvec2 mirrored(vec2 v) {\n\tvec2 m = mod(v, 2.);\n\treturn mix(m, 2.0 - m, step(1.0, m));\n}\n\nvoid main() {\n\tvec2 noiseUv = vUv + u_time * 0.04;\n\tnoiseUv.x *= 0.1;\n\tvec4 noise = texture2D(u_noise, mirrored(noiseUv));\n\tfloat prog = u_progress - 0.05 + noise.g * 0.06;\n\tfloat intpl = pow(abs(smoothstep(0., 1., (prog * 2. - vUv.y + 0.5))), 20.);\n\n\tvec4 fromColor = texture2D(u_fromScene, (vUv - 0.5) * (1.0 - intpl) + 0.5);\n\tvec4 toColor = texture2D(u_toScene, (vUv - 0.5) * intpl + 0.5);\n\tgl_FragColor = mix(fromColor, toColor, intpl);\n}",
                    uniforms: {
                        u_fromScene: {
                            value: this.savePass.renderTarget.texture
                        },
                        u_toScene: {
                            value: null
                        },
                        u_noise: {
                            value: o.Gl.assets.textures.gradientNoise
                        },
                        u_progress: {
                            value: 0
                        },
                        u_time: this.globalUniforms.u_time
                    }
                })),
                this.transitionPass.name = "Home Transition",
                this.transitionPass.enabled = !1,
                o.Gl.composerPasses.add(this.renderPass, 0),
                o.Gl.composerPasses.add(this.savePass, 1),
                o.Gl.composerPasses.add(this.transitionPass, 30)
            }
            buildHtml() {
                Object.assign(this.dom, {
                    contactContent: g(".js-contact-content"),
                    viewProjectsBtn: g(".js-view-projects-btn")
                }),
                o.contentToggle = new vi,
                this.viewProjectsBtn = new y(g(".js-btn", this.dom.viewProjectsBtn)),
                this.contactBtns = [],
                p(".js-btn", this.dom.contactContent).forEach((e=>{
                    this.contactBtns.push(new y(e))
                }
                )),
                this.viewProjectsBtn3D = new dt(this.dom.viewProjectsBtn),
                this.viewProjectsBtn3D.position.copy(this.homeTextMesh.position).multiplyScalar(1e3),
                this.viewProjectsBtn3D.position.y -= 13,
                this.viewProjectsBtn3D.rotation.copy(this.homeTextMesh.rotation);
                const e = 1e3 * -(this.objectsData.ho.position.z - this.objectsData.cam.children[3].position.z);
                this.viewProjectsBtn3D.scale.setScalar(e / o.Gl.cssRenderer.cache.camera.fov),
                o.Gl.cssScene.add(this.viewProjectsBtn3D),
                this.contactContent3D = new dt(this.dom.contactContent),
                this.contactContent3D.position.copy(this.contactText.position).multiplyScalar(1e3),
                this.contactContent3D.rotation.copy(this.contactText.rotation),
                this.contactContent3D.scale.setScalar(100 / o.Gl.cssRenderer.cache.camera.fov),
                o.Gl.cssScene.add(this.contactContent3D)
            }
            buildCameraProps() {
                const e = [];
                for (let t = 0; t < this.objectsData.cam.children.length; t++)
                    e[t] = this.objectsData.cam.children[t].position;
                this.cameraCurvePath = new i.YT8(e);
                const t = [];
                for (let e = 0; e < this.objectsData.tgt.children.length; e++)
                    t[e] = this.objectsData.tgt.children[e].position;
                this.cameraTargetPath = new i.YT8(t),
                this._q = new i._fP,
                this._e = new i.USm
            }
            updateCameraPosition() {
                const e = this.cameraCurvePath.getPointAt(this.tweenParams.cameraPathProgress)
                  , t = this.cameraTargetPath.getPointAt(this.tweenParams.cameraPathProgress);
                this.devCam ? (this.camera.position.copy(this.camPos),
                this.camera.lookAt(this.lookAt)) : (this.camera.position.copy(e),
                this.camera.lookAt(t)),
                this.camera.translateZ(this.options.cameraTranslateZ),
                this.options.disableCursor || (this.brownianMotion.update(.5 * o.clockDelta),
                this.camera.updateMatrix(),
                this.camera.matrix.multiply(this.brownianMotion.matrix),
                this.camera.matrix.decompose(this.camera.position, this.camera.quaternion, this.camera.scale),
                o.isTouch || (this.camera.translateZ(-this.options.cameraZOffset),
                this._e.set(this.smoothMouse.y * this.options.mouseMoveAngleY, -this.smoothMouse.x * this.options.mouseMoveAngleX, 0),
                this._q.setFromEuler(this._e),
                this.camera.quaternion.multiply(this._q),
                this._e.set(0, 0, -.05 * (this.smoothMouse.x - this.smoothMouse2.x)),
                this._q.setFromEuler(this._e),
                this.camera.quaternion.multiply(this._q),
                this.camera.translateZ(this.options.cameraZOffset))),
                this.camera.position.y += this.tweenParams.cameraYOffset,
                this.camera.updateMatrixWorld()
            }
            showContact(e=!1) {
                this.showUI();
                return l.ZP.timeline().to(this.homeTextMesh.material.uniforms.uOpacity, {
                    value: 0,
                    duration: 1,
                    ease: "expo.out"
                }, e ? 0 : 1).to(this.dom.viewProjectsBtn, {
                    autoAlpha: 0,
                    ease: "expo.out"
                }, e ? 0 : 1.2).fromTo(this.dom.contactContent.querySelectorAll(".js-reveal-anim"), {
                    autoAlpha: 0
                }, {
                    autoAlpha: 1,
                    stagger: .04,
                    duration: 1,
                    ease: "power2.out",
                    onComplete: ()=>{
                        this.renderCss = !0
                    }
                }, e ? 0 : 2)
            }
            showHome(e=!1) {
                this.showUI();
                return l.ZP.timeline().to(this.dom.contactContent.querySelectorAll(".js-reveal-anim"), {
                    autoAlpha: 0,
                    stagger: .05,
                    duration: 1,
                    ease: "expo.out"
                }, e ? 0 : .5).to(this.homeTextMesh.material.uniforms.uOpacity, {
                    value: 1,
                    duration: 1,
                    ease: "power2.out"
                }, e ? 0 : 1.6).fromTo(this.dom.viewProjectsBtn, {
                    autoAlpha: 0
                }, {
                    autoAlpha: 1,
                    ease: "power2.out",
                    onComplete: ()=>{
                        this.renderCss = !0
                    }
                }, e ? .25 : 1.85)
            }
            showUI() {
                this.dom.viewProjectsBtn.style.visibility = "visible",
                this.dom.contactContent.style.visibility = "visible"
            }
            hideUI() {
                this.dom.viewProjectsBtn.style.visibility = "hidden",
                this.dom.contactContent.style.visibility = "hidden"
            }
            addEvents() {
                o.RAFCollection.add(this.onRaf, 100),
                n.on("cssrenderer:cacheUpdated", this.updateHtmlScale),
                n.on("click", this.viewProjectsBtn3D.element, this.onProjectsBtnClick),
                n.on("mouseenter", this.viewProjectsBtn3D.element, this.onProjectsBtnEnter),
                n.on("mouseleave", this.viewProjectsBtn3D.element, this.onProjectsBtnLeave)
            }
            load() {
                this.assets = {
                    models: {},
                    textures: {}
                };
                const e = {
                    homeRoom: "room-1.glb",
                    contactRoom: "room-2.glb",
                    chair: "chair.glb",
                    pillows: "pillows.glb",
                    rocks: "rocks.glb",
                    table: "table-3.glb",
                    land: "land-group.glb",
                    grass: "grass-simple.glb"
                }
                  , t = {
                    homeRoom: "room-1",
                    contactRoom: "room-2",
                    chair: "chair",
                    pillows: "pillows",
                    rock: "rocks",
                    table: "table",
                    pearlMatcap: "pearl-matcap",
                    particle: "particles",
                    skymap: "skymap-tile",
                    aoMap: "ao"
                };
                for (const t in e)
                    o.AssetLoader.loadGltf(`${o.assetsUrl}models/home/${e[t]}`).then((e=>{
                        this.assets.models[t] = e.scene.children[0]
                    }
                    ));
                for (const e in t)
                    o.AssetLoader.loadKtxTexture(gt(`images/home/${t[e]}.ktx2`)).then((t=>{
                        this.assets.textures[e] = t
                    }
                    ));
                o.AssetLoader.loadTexture(gt("images/home/blade.jpg")).then((e=>{
                    this.assets.textures.blade = e
                }
                )),
                o.AssetLoader.loadGltf(gt("models/home/objectsData.glb")).then((e=>{
                    this.assets.objectsData = e.scene
                }
                ))
            }
            enable() {
                this.renderPass.enabled = !0,
                this.isHome = document.body.classList.contains("home"),
                this.tweenParams.cameraPathProgress = this.isHome ? 1 : 0,
                this.addEvents(),
                this.fluidSim.addEvents(),
                this.textFluidSim.addEvents()
            }
            destroy() {
                o.RAFCollection.remove(this.onRaf),
                n.off("cssrenderer:cacheUpdated", this.updateHtmlScale),
                n.off("mouseenter", this.viewProjectsBtn3D.element, this.onProjectsBtnEnter),
                n.off("mouseleave", this.viewProjectsBtn3D.element, this.onProjectsBtnLeave),
                this.renderCss = !1,
                this.renderPass.enabled = !1,
                this.savePass.enabled = !1,
                this.transitionPass.enabled = !1,
                this.camera.position.set(0, 0, 0),
                this.camera.lookAt(0, 0, 0),
                this.tweenParams.cameraYOffset = 0,
                this.options.cameraTranslateZ = 0,
                o.Gl.renderer.setRenderTarget(null),
                o.Gl.renderer.setScissorTest(!1),
                this.resourceTracker.dispose(),
                this.fluidSim.removeEvents(),
                this.textFluidSim.removeEvents()
            }
        }
        var Ti = s(1154);
        class Si extends ei.w {
            constructor(e) {
                super(),
                void 0 === Ti.C && console.error("THREE.SavePass relies on CopyShader");
                const t = Ti.C;
                this.textureID = "tDiffuse",
                this.uniforms = i.rDY.clone(t.uniforms),
                this.material = new i.jyz({
                    uniforms: this.uniforms,
                    vertexShader: t.vertexShader,
                    fragmentShader: t.fragmentShader
                }),
                this.renderTarget = e,
                void 0 === this.renderTarget && (this.renderTarget = new i.dd2(window.innerWidth,window.innerHeight),
                this.renderTarget.texture.name = "SavePass.rt"),
                this.needsSwap = !1,
                this.fsQuad = new ei.T(this.material)
            }
            render(e, t, s) {
                this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = s.texture),
                e.setRenderTarget(this.renderTarget),
                this.clear && e.clear(),
                this.fsQuad.render(e)
            }
            setSize(e, t) {
                this.renderTarget.setSize(e, t)
            }
        }
        class Mi {
            constructor(e, t=0) {
                this.dom = {
                    wrapper: g(".js-infinity-wrap"),
                    line: g(".js-infinity")
                },
                this.dashLength = 188,
                this.dashLengthLimit = 2 * this.dashLength,
                this.dom.line.style.strokeDasharray = this.dashLength,
                this.dom.line.style.strokeDashoffset = this.dashLength,
                this.scrollPos = t,
                this.progress = 0,
                this.smoothProgress = 0,
                this.update = !0,
                this.scrollEnd = e,
                this.updateProgress(),
                this.addToBody()
            }
            updateProgress() {
                const e = this.progress;
                this.progress = (this.scrollPos % this.scrollEnd + this.scrollEnd) % this.scrollEnd / this.scrollEnd,
                e < .1 && this.progress > .9 ? (this.update = !1,
                l.ZP.set(this.dom.line, {
                    strokeDasharray: this.dashLength
                }),
                l.ZP.fromTo(this.dom.line, {
                    strokeDashoffset: this.dashLength
                }, {
                    strokeDashoffset: this.dashLengthLimit,
                    duration: .6,
                    ease: "power4.out",
                    onStart: ()=>{
                        this.smoothProgress = 1
                    }
                    ,
                    onComplete: ()=>{
                        l.ZP.set(this.dom.line, {
                            strokeDashoffset: this.dashLength
                        }),
                        this.update = !0
                    }
                })) : e > .9 && this.progress < .1 && (this.update = !1,
                l.ZP.set(this.dom.line, {
                    strokeDasharray: this.dashLengthLimit
                }),
                l.ZP.fromTo(this.dom.line, {
                    strokeDashoffset: 0
                }, {
                    strokeDashoffset: -this.dashLength,
                    duration: .6,
                    ease: "power4.out",
                    onStart: ()=>{
                        this.smoothProgress = 0
                    }
                    ,
                    onComplete: ()=>{
                        l.ZP.set(this.dom.line, {
                            strokeDashoffset: this.dashLength
                        }),
                        this.update = !0
                    }
                }))
            }
            updateLine() {
                this.update && (this.smoothProgress += .1 * (this.progress - this.smoothProgress),
                this.dom.line.style.strokeDasharray = this.dashLength + this.dashLength * this.smoothProgress)
            }
            addToBody() {
                document.body.appendChild(this.dom.wrapper)
            }
            removeFromBody() {
                document.body.removeChild(this.dom.wrapper)
            }
            destroy() {
                this.removeFromBody()
            }
        }
        var Ci = s(7006);
        function _i(e, t, s) {
            return t in e ? Object.defineProperty(e, t, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = s,
            e
        }
        class ji {
            constructor() {
                _i(this, "onScroll", (e=>{
                    var t;
                    if (this.listOpen || !this.allowControl)
                        return;
                    null !== (t = this.introScrollTween) && void 0 !== t && t.isActive() && this.introScrollTween.kill();
                    const s = 2 * e.deltaY;
                    this.scrollPos += s,
                    this.archPos += s,
                    this.godRayPos += s,
                    this.infinityProgress.scrollPos += s,
                    this.infinityProgress.updateProgress()
                }
                )),
                _i(this, "onMouseDown", (({event: e})=>{
                    if (this.allowControl && e.currentTarget !== this.dom.viewProjectBtn)
                        if (o.isTouch)
                            this.touchHoldTimeout = setTimeout((()=>{
                                this.openList()
                            }
                            ), 200);
                        else {
                            if (0 !== e.button)
                                return;
                            this.openList()
                        }
                }
                )),
                _i(this, "onMouseUp", (()=>{
                    this.allowControl && (o.isTouch && (o.body.style.removeProperty("user-select"),
                    clearTimeout(this.touchHoldTimeout)),
                    this.listOpen && this.closeList())
                }
                )),
                _i(this, "onMouseDrag", (({py: e, y: t})=>{
                    if (this.allowControl)
                        if (this.listOpen)
                            this.listPos -= 2 * (e - t),
                            this.listPos = i.M8C.clamp(this.listPos, 0, -this.linePositions[this.projectIndexCount] * this.textScale);
                        else if (o.isTouch) {
                            Math.abs(e - t) > 3 && clearTimeout(this.touchHoldTimeout);
                            const s = 10 * -(e - t);
                            this.scrollPos -= s,
                            this.archPos -= s,
                            this.godRayPos -= s,
                            this.infinityProgress.scrollPos -= s,
                            this.infinityProgress.updateProgress()
                        }
                }
                )),
                _i(this, "onPreSceneRaf", (()=>{
                    this.smoothMouse.lerp(o.mouse.glNormalized, .075),
                    this.smoothMouse2.lerp(o.mouse.glNormalized, .02),
                    this.updateCamera(),
                    this.updateArchPos(),
                    this.updateFloorPos(),
                    this.updateGodRayPos()
                }
                )),
                _i(this, "onRaf", (()=>{
                    var e;
                    this.calculateVelocity(),
                    this.rotateModels(),
                    this.updateScrollPos(),
                    this.updateProjectsPos(),
                    this.updateListPos(),
                    null === (e = this.infinityProgress) || void 0 === e || e.updateLine(),
                    this.allowControl && this.updateRaycaster(),
                    this.camera.position.multiplyScalar(10),
                    o.Gl.cssRenderer.render(o.Gl.cssScene, this.camera),
                    this.camera.position.multiplyScalar(.1)
                }
                )),
                _i(this, "onResize", (()=>{
                    this.scaleScene(),
                    this.camera.aspect = o.window.w / o.window.fullHeight,
                    this.camera.updateProjectionMatrix()
                }
                )),
                _i(this, "updateHtmlScale", (()=>{
                    this.viewProjectBtn3D.scale.setScalar(1.9 / (1e-4 * o.Gl.cssRenderer.cache.camera.fov))
                }
                )),
                this.scene = new i.xsS,
                this.camera = o.Gl.camera.clone(),
                this.textScene = new i.xsS,
                this.firstLoad = !1,
                this.hasAnimatedIn = !1,
                this.dummyObject = new i.Tme,
                this.initialCameraPos = 2e3,
                this.camera.position.z = this.initialCameraPos,
                this.camera.fov = 2 * Math.atan(o.window.fullHeight / 2 / this.camera.position.z) * 180 / Math.PI,
                this.camera.near = 100,
                this.camera.far = 3500,
                this.camera.updateProjectionMatrix(),
                this.initialCameraPosition = this.camera.position.clone(),
                this.initialColor = new i.Ilk(window.projects[0].project.bg_color).getHex(),
                this.scene.fog = new i.ybr(this.initialColor,this.camera.position.z,this.camera.far),
                o.Gl.globalUniforms.fogColor.value.copy(this.scene.fog.color),
                o.Gl.globalUniforms.fogNear.value = this.scene.fog.near,
                o.Gl.globalUniforms.fogFar.value = this.scene.fog.far,
                this.scene.background = new i.Ilk(this.initialColor),
                this.colorBlackHex = 16777215,
                this.colorWhiteHex = 16777215,
                this.colorBlack = new i.Ilk(this.colorBlackHex),
                this.colorWhite = new i.Ilk(this.colorWhiteHex),
                this.nearClip = this.camera.position.z,
                this.farClip = this.camera.far - this.camera.position.z,
                this.options = {
                    mouseMoveAngleX: .135,
                    mouseMoveAngleY: .035,
                    cameraZOffset: 1500,
                    cameraMotionPosAmplitude: .026,
                    cameraMotionRotAmplitude: .0132,
                    cameraMotionPosFrequency: .21,
                    cameraMotionRotFrequency: .59,
                    cameraMovementMultiplier: 1
                },
                this.brownianMotion = new ci,
                this.brownianMotion.positionAmplitude = this.options.cameraMotionPosAmplitude,
                this.brownianMotion.rotationAmplitude = this.options.cameraMotionRotAmplitude,
                this.brownianMotion.positionFrequency = this.options.cameraMotionPosFrequency,
                this.brownianMotion.rotationFrequency = this.options.cameraMotionRotFrequency,
                this.brownianMotion.positionScale.multiplyScalar(.1),
                this._q = new i._fP,
                this._e = new i.USm,
                this.raycaster = new i.iMs,
                this.resourceTracker = new gs,
                this.smoothMouse = new i.FM8,
                this.smoothMouse2 = new i.FM8,
                this.originalScreenFxBendAmount = o.Gl.screenFxPass.uniforms.u_bendAmount.value,
                this.originalScreenFxMaxDistort = o.Gl.screenFxPass.uniforms.u_maxDistort.value,
                this.originalScreenFxVignetteStrength = o.Gl.screenFxPass.uniforms.u_vignetteStrength.value,
                this.initialScrollPos = 200,
                this.scrollPos = this.initialScrollPos,
                this.archPos = this.initialScrollPos,
                this.godRayPos = this.initialScrollPos,
                this.tweenParams = {
                    smoothScrollPos: this.initialScrollPos,
                    smoothArchPos: this.initialScrollPos,
                    smoothGodRayPos: this.initialScrollPos,
                    listPos: 0,
                    cameraXOffset: 0,
                    cameraYOffset: 0,
                    cameraZOffset: 0,
                    cameraYRotationOffset: 0,
                    velocity: 0
                },
                this.globalUniforms = {
                    u_velocity: {
                        value: 0
                    }
                },
                this.activeProjectIndex = 0,
                this.scrollOffset = 0,
                this.listPos = this.smoothListPos = 0,
                this.hoveredItem = !1,
                this.listOpen = !1,
                this.listAnimating = !1,
                this.allowListSelection = !1,
                this.scrollDelta = 0,
                this.smoothScrollDelta = 0,
                this.allowControl = !0,
                this.clickHoldPromptHidden = !1,
                this.assets = {
                    projects: [],
                    models: {},
                    textures: {}
                },
                this.loadArches(),
                this.load()
            }
            preBuild() {
                this.buildArches(),
                this.buildFloor(),
                this.preBuildPasses(),
                this.buildGodRays(),
                this.buildProjects(),
                this.buildList(),
                this.buildText(),
                this.scaleScene(),
                n.on(o.events.RESIZE, this.onResize)
            }
            build(e=!1) {
                this.dom = {
                    viewProjectBtnWrap: g(".js-view-project-btn"),
                    tapHoldPrompt: g(".js-tap-hold-prompt")
                },
                this.dom.viewProjectBtn = g(".btn", this.dom.viewProjectBtnWrap),
                this.dom.viewProjectBtn.setAttribute("href", this.activeProject.projectLink),
                this.projects.children[this.activeProjectIndex].lightMode ? o.body.classList.add("dark") : o.body.classList.remove("dark"),
                this.buildHtml(),
                this.infinityProgress = new Mi(this.scrollEnd,-this.activeProject.startZ),
                document.body.appendChild(this.dom.tapHoldPrompt);
                for (let e = 0; e < this.projects.children.length; e++)
                    for (let t = 0; t < this.projects.children[e].children.length; t++) {
                        const s = this.projects.children[e].children[t];
                        "video" === s.mediaType && (s.material.uniforms.uTexture.value.image.src = s.material.uniforms.uTexture.value.image.dataset.src,
                        s.material.uniforms.uTexture.value.image.load())
                    }
                for (let e = 0; e < this.projects.children[this.activeProjectIndex].children.length; e++) {
                    const t = this.projects.children[this.activeProjectIndex].children[e];
                    "video" === t.mediaType && t.material.uniforms.uTexture.value.image.play()
                }
                this.scaleScene(),
                this.firstLoad && this.enable(),
                n.on("cssrenderer:cacheUpdated", this.updateHtmlScale),
                this.hasAnimatedIn || (v.ZP.set([this.projectText.children[this.activeProjectIndex].children[0].material, this.projectText.children[this.activeProjectIndex].children[1].material, this.selectedProjects.material], {
                    opacity: 0
                }),
                v.ZP.set(this.tweenParams, {
                    smoothScrollPos: -this.farClip,
                    smoothArchPos: -this.farClip,
                    smoothGodRayPos: -this.farClip
                })),
                e ? this.addEvents() : (this.addInteractionEvents(),
                this.in(),
                this.hasAnimatedIn = !0)
            }
            enable() {
                this.addPreSceneEvents(),
                this.options.cameraMovementMultiplier = 1,
                this.renderPass.enabled = !0,
                this.savePass.enabled = !0,
                this.textRenderPass.enabled = !0,
                this.combinePass.enabled = !0,
                o.isTouch || o.Gl.fluidSim.enable()
            }
            resetState(e=0, t=!1) {
                const s = this.activeProjectIndex;
                this.activeProjectIndex = e,
                this.activeProject = this.projects.children[this.activeProjectIndex],
                this.projects.children.forEach((e=>{
                    e.position.z = e !== this.activeProject || t ? 2 * -this.farClip : this.initialScrollPos
                }
                )),
                this.projectText.children.forEach(((e,s)=>{
                    e.children[0].material.opacity = this.activeProjectIndex !== s || t ? 0 : 1,
                    e.children[1].material.opacity = this.activeProjectIndex !== s || t ? 0 : 1
                }
                ));
                for (let e = 0; e < this.listTextMaterials.length; e++)
                    this.listTextMaterials[e].color.copy(this.projects.children[this.activeProjectIndex].lightMode ? this.colorWhite : this.colorBlack);
                this.selectedProjects.material.opacity = t ? 0 : 1,
                this.selectedProjects.material.color.copy(this.projects.children[this.activeProjectIndex].lightMode ? this.colorWhite : this.colorBlack),
                this.listActiveText.material.color.copy(this.projects.children[this.activeProjectIndex].lightMode ? this.colorWhite : this.colorBlack),
                this.list.children[s].visible = !0,
                this.list.children[this.activeProjectIndex].visible = !1,
                this.listActiveText.text = this.list.children[this.activeProjectIndex].text,
                this.listActiveText.sync(),
                this.listActiveText.position.y = this.list.children[this.activeProjectIndex].position.y - 8,
                this.projectText.children[s].visible = !1,
                this.projectText.children[this.activeProjectIndex].visible = !0,
                this.projectText.children[this.activeProjectIndex].position.z = 0,
                this.projectText.position.z = 0,
                this.selectedProjectsGroup.position.z = 0
            }
            in() {
                this.inTimeline = v.ZP.timeline({
                    defaults: {
                        duration: 2,
                        ease: "expo.out"
                    },
                    onStart: ()=>{
                        this.list.visible = !1
                    }
                }),
                this.hasAnimatedIn || this.inTimeline.to([this.scene.background, this.scene.fog.color, this.archMaterial.color, this.floorMaterial.color], {
                    r: this.activeProject.bgColor.r,
                    g: this.activeProject.bgColor.g,
                    b: this.activeProject.bgColor.b
                }, "<").fromTo([this.projectText.children[this.activeProjectIndex].children[0].material, this.projectText.children[this.activeProjectIndex].children[1].material, this.selectedProjects.material], {
                    opacity: 0
                }, {
                    opacity: 1,
                    duration: 1.5
                }, "<0.5"),
                this.inTimeline.to(o.Gl.cssRenderer.domElement, {
                    autoAlpha: 1,
                    duration: 1.5
                }, "<").to(this.infinityProgress.dom.wrapper, {
                    autoAlpha: 1
                }, "<").call((()=>{
                    o.isTouch ? v.ZP.to(this.dom.tapHoldPrompt, {
                        autoAlpha: 1,
                        duration: .5
                    }) : this.clickHoldPromptHidden || o.Cursor.showClickHoldPrompt()
                }
                ), null, "<0.5"),
                this.hasAnimatedIn || (this.introScrollTween = v.ZP.fromTo(this.tweenParams, {
                    smoothScrollPos: -this.farClip,
                    smoothArchPos: -this.farClip,
                    smoothGodRayPos: -this.farClip
                }, {
                    smoothScrollPos: this.initialScrollPos,
                    smoothArchPos: this.initialScrollPos,
                    smoothGodRayPos: this.initialScrollPos,
                    duration: 2,
                    ease: "expo.out"
                }))
            }
            scaleScene() {
                this.sceneScale = o.window.w / 2150,
                this.projects.scale.set(this.sceneScale, this.sceneScale, 1),
                this.arches.scale.set(this.sceneScale, this.sceneScale * (o.mq.sm.matches ? 1 : 1.75), 1),
                this.floor.scale.set(this.sceneScale, this.sceneScale * (o.mq.sm.matches ? 1 : 1.75), 1),
                this.textScale = o.mq.md.matches ? o.window.w / 2150 : o.window.w / 900,
                this.projectText.scale.set(this.textScale, this.textScale, 1),
                this.selectedProjectsGroup.scale.set(this.textScale, this.textScale, 1),
                this.list.scale.set(this.textScale, this.textScale, 1),
                this.viewProjectBtn3D && (this.viewProjectBtn3D.position.y = (o.mq.md.matches ? -2e3 : -2500) * this.textScale)
            }
            buildProjects() {
                this.projects = new i.ZAu,
                this.projectText = new i.ZAu,
                this.scrollEnd = 0;
                const e = new i.jyz({
                    vertexShader: "#define GLSLIFY 1\nvarying vec2 vUv;\nvarying vec3 vWorldPos;\nvarying vec3 vViewDir;\nvarying float zPos;\nvarying vec3 vFluid;\n\nuniform sampler2D u_fluidTex;\nuniform float u_velocity;\nuniform float u_time;\nuniform float u_random;\n\nvoid main() {\n\tvUv = uv;\n    vViewDir = -vec3(modelViewMatrix * vec4(position, 1.0));\n    vWorldPos = vec3(modelMatrix * vec4(position, 1.0));\n\n\tfloat distToCenter = distance(vec3(0.), position);\n\n\tvec3 transformedPos = position;\n\n\tfloat pinchAmount = clamp(-u_velocity * 500. * distToCenter, -400., 400.);\n\tfloat ripple = sin((position.x - position.y) * 2.9 + (-u_time + u_random * 2.) * 2. * u_random * 0.5) * 18. * (1. - abs(u_velocity));\n\ttransformedPos.z += pinchAmount + ripple;\n\n\t#ifdef FLUID\n\t\tvec4 earlyProjection = projectionMatrix * modelViewMatrix * vec4(transformedPos, 1.0);\n\t\tvec2 screenSpace = earlyProjection.xy / earlyProjection.w * 0.5 + vec2(0.5);\n\t\tvec3 fluidColor = texture2D(u_fluidTex, screenSpace).rgb;\n\t\tvec2 fluidPos = -normalize(fluidColor.rgb).xy * 0.01;\n\t\tvFluid = fluidColor;\n\t\ttransformedPos.xy += fluidPos;\n\t#endif\n\t\n\tzPos = ripple;\n\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformedPos, 1.0);\n}",
                    fragmentShader: "#define GLSLIFY 1\nvarying vec2 vUv;\nvarying vec3 vWorldPos;\nvarying float zPos;\nvarying vec3 vFluid;\n\nuniform sampler2D uTexture;\nuniform vec3 fogColor;\nuniform float fogNear;\nuniform float fogFar;\n\nfloat range(float oldValue, float oldMin, float oldMax, float newMin, float newMax) {\n    vec3 sub = vec3(oldValue, newMax, oldMax) - vec3(oldMin, newMin, oldMin);\n    return sub.x * sub.y / sub.z + newMin;\n}\n\nfloat crange(float oldValue, float oldMin, float oldMax, float newMin, float newMax) {\n    return clamp(range(oldValue, oldMin, oldMax, newMin, newMax), min(newMin, newMax), max(newMin, newMax));\n}\n\nbool isClipping(vec2 vUv, vec3 vWorldPos) {\n    vec2 uvRepeat = fract(vUv * 400.) - 0.5;\n    float radius = crange(length(cameraPosition - vWorldPos) * 0.003, 0., 1.0, 1., 0.0);\n    float circle = 1.0 - smoothstep(radius - radius * 0.1, radius, length(uvRepeat));\n    return circle > 0.3;\n}\n\nconst vec3 W = vec3(0.2125, 0.7154, 0.0721);\nfloat luminance(in vec3 color) {\n    return dot(color, W);\n}\n\nvoid main() {\n\tif (isClipping(vUv, vWorldPos)) discard;\n\n\tvec3 imageColor = texture2D(uTexture, vUv).rgb;\n\timageColor += smoothstep(0., 10., zPos * 0.3) * 0.3;\n\n\t#ifdef FLUID\n\t\tfloat lum = luminance(abs(vFluid));\n\t\timageColor += lum * 0.15;\n\t#endif\n\n\tgl_FragColor = vec4(imageColor, 1.);\n\n\tfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n\tfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n\n\tfloat fogFactor2 = smoothstep( 1500., -300., depth );\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor2 );\n}",
                    uniforms: {
                        uTexture: {
                            value: null
                        },
                        fogColor: {
                            value: this.scene.fog.color
                        },
                        fogNear: {
                            value: this.scene.fog.near
                        },
                        fogFar: {
                            value: this.scene.fog.far
                        }
                    }
                });
                for (let t = 0; t < window.projects.length; t++) {
                    const s = window.projects[t]
                      , n = new i.ZAu;
                    for (let i = 0; i < s.images.length; i++) {
                        const o = this.buildMediaMesh("image", e, this.assets.projects[t].textures[s.images[i].name], s.images[i]);
                        n.add(o)
                    }
                    for (let i = 0; i < s.videos.length; i++) {
                        const o = this.buildMediaMesh("video", e, this.assets.projects[t].textures[s.videos[i].name], s.videos[i]);
                        n.add(o)
                    }
                    for (let e = 0; e < s.models.length; e++) {
                        const r = this.assets.projects[t].models[s.models[e].name];
                        r.material = new i.jyz({
                            vertexShader: is,
                            fragmentShader: ls,
                            uniforms: {
                                uMatcap: {
                                    value: s.project.light_mode ? o.Gl.assets.textures.projectModelMatcapDark : o.Gl.assets.textures.projectModelMatcap
                                },
                                uBaseColor: {
                                    value: new i.Ilk(s.project.bg_color)
                                },
                                uOpacity: {
                                    value: .3
                                },
                                fogNear: o.Gl.globalUniforms.fogNear,
                                fogFar: o.Gl.globalUniforms.fogFar,
                                fogColor: o.Gl.globalUniforms.fogColor
                            },
                            transparent: !0,
                            depthWrite: !1,
                            side: Ci.ehD,
                            defines: {
                                LIGHTMODE: s.project.light_mode
                            }
                        }),
                        r.position.copy(s.models[e].position),
                        r.position.z *= 2,
                        r.originalPosition = r.position.clone(),
                        r.scale.setScalar(s.models[e].scale),
                        r.mediaType = "model",
                        r.rotateSpeed = s.models[e].rotate_speed,
                        n.add(r)
                    }
                    n.name = s.project.title,
                    n.projectLink = s.project.link,
                    n.bgColor = new i.Ilk(s.project.bg_color),
                    n.lightMode = s.project.light_mode,
                    n.endZ = (new i.ZzF).setFromObject(n).min.z - this.nearClip,
                    n.position.z = 2 * -this.farClip,
                    n.startZ = this.scrollEnd,
                    this.scrollEnd += n.endZ - this.farClip,
                    this.buildProjectText(s.project.title, s.project.description, n.lightMode, t === this.activeProjectIndex),
                    this.projects.add(n)
                }
                this.scrollEnd = Math.abs(this.scrollEnd),
                this.activeProject = this.projects.children[this.activeProjectIndex],
                this.projectIndexCount = this.projects.children.length - 1,
                this.scene.add(this.projects),
                this.textScene.add(this.projectText)
            }
            buildMediaMesh(e, t, s, n) {
                const r = new i.Kj0(new i._12(1,1,10,10),t.clone());
                r.material.uniforms.uTexture.value = s,
                r.material.uniforms.u_velocity = this.globalUniforms.u_velocity,
                r.material.uniforms.u_time = o.Gl.globalUniforms.u_time,
                r.material.uniforms.u_random = {
                    value: Math.random() + 1
                },
                r.material.uniforms.u_fluidTex = {
                    value: o.Gl.fluidSim.velocitySim.texture
                },
                o.isTouch || (r.material.defines.FLUID = !0),
                r.material.uniforms.fogColor.value = this.scene.fog.color;
                const a = {
                    x: "image" === e ? n.image_size[0] : s.image._videoWidth,
                    y: "image" === e ? n.image_size[1] : s.image._videoHeight
                }
                  , l = Ys(a.x, a.y, 500, 500);
                return r.scale.set(l.width, l.height, 1),
                r.position.copy(n.position),
                r.position.z *= 2,
                r.originalPosition = r.position.clone(),
                r.mediaType = e,
                r
            }
            buildProjectText(e, t, s, n) {
                const r = new i.ZAu;
                r.visible = !1,
                r.renderOrder = 1;
                const a = new nt.xv;
                Object.assign(a, {
                    text: t,
                    font: o.Gl.webglFonts["Neue Montreal"].url,
                    fontSize: 40,
                    letterSpacing: -.02,
                    anchorX: "center",
                    anchorY: "middle",
                    textAlign: "center",
                    color: s ? this.colorWhiteHex : this.colorBlackHex,
                    sdfGlyphSize: o.Gl.webglFonts["Neue Montreal"].sdfGlyphSize
                }),
                a.material.depthTest = !1,
                a.material.fog = !1,
                a.material.opacity = 0,
                a.position.y = -110,
                r.add(a);
                const l = new nt.xv;
                Object.assign(l, {
                    text: e.toUpperCase(),
                    font: o.Gl.webglFonts["Neue Montreal"].url,
                    fontSize: 130,
                    letterSpacing: -.02,
                    anchorX: "center",
                    anchorY: "middle",
                    color: s ? this.colorWhiteHex : this.colorBlackHex,
                    sdfGlyphSize: o.Gl.webglFonts["Neue Montreal"].sdfGlyphSize,
                    textAlign: "center",
                    lineHeight: .85,
                    maxWidth: o.mq.md.matches ? 1 / 0 : 750
                }),
                l.material.depthTest = !1,
                l.material.fog = !1,
                l.material.opacity = 0,
                l.position.y -= 9,
                l.sync((()=>{
                    l.geometry.boundingBox.max.y > 55.25 && (a.position.y -= l.geometry.boundingBox.max.y / 2)
                }
                )),
                r.add(l),
                r.visible = n,
                this.projectText.add(r)
            }
            buildText() {
                this.selectedProjectsGroup = new i.ZAu,
                this.selectedProjects = new nt.xv,
                Object.assign(this.selectedProjects, {
                    text: "Selected projects",
                    font: o.Gl.webglFonts["Saol Display"].url,
                    fontSize: 64,
                    letterSpacing: -.04,
                    anchorX: "center",
                    anchorY: "middle",
                    color: this.projects.children[this.activeProjectIndex].lightMode ? this.colorWhiteHex : this.colorBlackHex,
                    sdfGlyphSize: o.Gl.webglFonts["Saol Display"].sdfGlyphSize
                }),
                this.selectedProjects.material.depthTest = !1,
                this.selectedProjects.material.fog = !1,
                this.selectedProjects.material.opacity = 0,
                this.selectedProjects.position.y = 110,
                this.selectedProjects.position.z = -50,
                this.selectedProjects.renderOrder = 1,
                this.selectedProjects.matrixAutoUpdate = !1,
                this.selectedProjects.updateMatrix(),
                this.selectedProjects.sync(),
                this.selectedProjects.visible = o.mq.md.matches,
                this.selectedProjectsGroup.add(this.selectedProjects),
                this.textScene.add(this.selectedProjectsGroup)
            }
            buildArches() {
                this.archMaterial = new i.kaV({
                    matcap: o.Gl.assets.textures.projectModelMatcap,
                    color: this.initialColor
                });
                this.arches = new i.SPe(this.assets.models.arch.geometry,this.archMaterial,6),
                this.dummyObject.scale.setScalar(300),
                this.dummyObject.rotation.set(0, i.M8C.degToRad(90), 0),
                this.archLength = 2 * this.dummyObject.scale.x,
                this.archScrollOffset = this.archLength;
                for (let e = 0; e < 6; e++)
                    this.dummyObject.position.set(0, 300, -this.archLength * e),
                    this.dummyObject.updateMatrix(),
                    this.arches.setMatrixAt(e, this.dummyObject.matrix);
                this.archesGroup = new i.ZAu,
                this.archesGroup.add(this.arches),
                this.archesGroup.position.z = this.initialScrollPos,
                this.arches.position.z = 2 * this.archLength,
                this.scene.add(this.archesGroup)
            }
            buildFloor() {
                this.floorMaterial = new i.kaV({
                    color: this.initialColor,
                    matcap: o.Gl.assets.textures.projectModelMatcap
                });
                this.floor = new i.SPe(this.assets.models.floor.geometry,this.floorMaterial,5),
                this.assets.models.floor.geometry.rotateY(i.M8C.degToRad(-90)),
                this.dummyObject.scale.setScalar(300),
                this.dummyObject.rotation.set(0, 0, 0),
                this.assets.models.floor.geometry.computeBoundingBox(),
                this.floorLength = (-this.assets.models.floor.geometry.boundingBox.min.z + this.assets.models.floor.geometry.boundingBox.max.z) * this.dummyObject.scale.x * 2 - 70,
                this.floorScrollOffset = this.floorLength;
                for (let e = 0; e < 5; e++)
                    this.dummyObject.position.set(0, -300, .5 * -this.floorLength * e),
                    this.dummyObject.rotation.set(0, i.M8C.degToRad(180) * (e % 2), 0),
                    this.dummyObject.updateMatrix(),
                    this.floor.setMatrixAt(e, this.dummyObject.matrix);
                this.floorGroup = new i.ZAu,
                this.floorGroup.add(this.floor),
                this.floorGroup.position.z = this.initialScrollPos,
                this.floor.position.z = this.floorLength / 1.5,
                this.scene.add(this.floorGroup)
            }
            buildGodRays() {
                this.godrayLength = 1500,
                this.godrayScrollOffset = 1500;
                this.godrays = new i.SPe(new i._12,new i.jyz({
                    vertexShader: "#define GLSLIFY 1\nattribute float aOffset;\n\nvarying vec2 vUv;\nvarying vec4 vWorldPosition;\n\nvoid main () {\n    vUv = uv;\n\n\tvec4 worldPosition = vec4( position, 1.0 );\n\t#ifdef USE_INSTANCING\n\t\tworldPosition = instanceMatrix * worldPosition;\n\t#endif\n\tvWorldPosition = modelMatrix * worldPosition;\n\n\tvec4 mvPosition = vec4( position, 1.0 );\n\t#ifdef USE_INSTANCING\n\t\tmvPosition = instanceMatrix * mvPosition;\n\t#endif\n\tmvPosition = modelViewMatrix * mvPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n}",
                    fragmentShader: "#define GLSLIFY 1\nvarying vec2 vUv;\nvarying vec4 vWorldPosition;\n\nuniform sampler2D uNoiseTexture;\nuniform float uTime;\nuniform vec2 uDirection;\nuniform float uStrength;\nuniform float uLength;\nuniform float uFadeSmoothness;\nuniform float uScale;\nuniform float uSpeed;\nuniform vec3 uLightColor;\nuniform float fogNear;\nuniform float fogFar;\n\nconst vec2 lengthDirection = vec2(0., -1.);\nconst vec2 center = vec2(0.5);\n\nvoid main() {\n\tvec2 worldPos = vWorldPosition.xy * 0.1;\n\tvec2 godRayOrigin = worldPos + vec2(-uDirection.x, uDirection.y);\n    float uvDirection = atan(godRayOrigin.y, godRayOrigin.x);\n\tuvDirection *= uScale;\n\n\tfloat noise1 = texture2D(uNoiseTexture, vec2(uvDirection - uTime * 0.01)).r;\n\tfloat noise2 = texture2D(uNoiseTexture, vec2(uvDirection + uTime * 0.05 * uSpeed, uvDirection) * 1.5).g;\n\tfloat alpha = min(noise1, noise2);\n\n\tvec2 v2 = normalize(lengthDirection);\n    float d = v2.x * center.x + v2.y * center.y;\n\tfloat length = uLength;\n\talpha *= (1.0 - smoothstep(-uFadeSmoothness, 0.0, v2.x * vUv.x + v2.y * vUv.y - (d - 0.5 + length * (1. + uFadeSmoothness))));\n\n\talpha *= uStrength;\n\n\tgl_FragColor = vec4(uLightColor, alpha);\n\n\tgl_FragColor.a *= smoothstep(0., 500., cameraPosition.z - 1000. - vWorldPosition.z);\n\n\tfloat fogDepth = gl_FragCoord.z / gl_FragCoord.w;\n\tfloat fogFactor = smoothstep(fogNear, fogFar, fogDepth);\n\tgl_FragColor.a = mix(gl_FragColor.a, 0., fogFactor);\n}",
                    uniforms: {
                        uTime: o.Gl.globalUniforms.u_time,
                        uNoiseTexture: {
                            value: o.Gl.assets.textures.gradientNoise
                        },
                        fogNear: {
                            value: this.scene.fog.near
                        },
                        fogFar: {
                            value: this.scene.fog.far
                        },
                        uDirection: {
                            value: new i.FM8(-100,-150)
                        },
                        uStrength: {
                            value: .25
                        },
                        uLength: {
                            value: .4
                        },
                        uFadeSmoothness: {
                            value: .7
                        },
                        uScale: {
                            value: .26
                        },
                        uSpeed: {
                            value: .45
                        },
                        uLightColor: {
                            value: new i.Ilk(16770496)
                        }
                    },
                    transparent: !0,
                    depthTest: !1,
                    blending: i.WMw
                }),3),
                this.godrays.renderOrder = 100,
                this.dummyObject.position.set(0, 0, 0),
                this.dummyObject.rotation.set(0, 0, 0),
                this.dummyObject.scale.set(1, 1, 1);
                const e = [];
                for (let t = 0; t < 3; t++)
                    this.dummyObject.position.set(0, 0, -this.godrayLength * t),
                    this.dummyObject.scale.set(1e4, 3e3, 1),
                    this.dummyObject.updateMatrix(),
                    this.godrays.setMatrixAt(t, this.dummyObject.matrix),
                    e.push(Math.random());
                this.godraysGroup = new i.ZAu,
                this.godraysGroup.add(this.godrays),
                this.godraysGroup.position.z = this.initialScrollPos,
                this.scene.add(this.godraysGroup)
            }
            buildList() {
                this.list = new i.ZAu;
                const e = window.projects.length;
                this.listLineHeight = 110,
                this.listTextMaterials = [],
                this.linePositions = [],
                this.listRaycastItems = [];
                for (let t = 0; t < e; t++) {
                    const s = new nt.xv;
                    Object.assign(s, {
                        text: window.projects[t].project.title.toUpperCase(),
                        font: o.Gl.webglFonts["Saol Display"].url,
                        fontSize: 130,
                        letterSpacing: -.02,
                        anchorX: "center",
                        anchorY: "middle",
                        sdfGlyphSize: o.Gl.webglFonts["Saol Display"].sdfGlyphSize,
                        textAlign: "center",
                        lineHeight: .85,
                        maxWidth: o.mq.md.matches ? 1 / 0 : 700
                    }),
                    s.material.depthTest = !1,
                    s.material.fog = !1,
                    s.material.opacity = 0,
                    s.material.color.set(this.projects.children[this.activeProjectIndex].lightMode ? this.colorWhiteHex : this.colorBlackHex),
                    s.position.y = t * -this.listLineHeight,
                    s.projectId = t,
                    s.renderOrder = 2,
                    s.visible = t !== this.activeProjectIndex,
                    o.AssetLoader.add(new Promise((i=>{
                        s.sync((()=>{
                            o.mq.md.matches || 0 === t || (s.position.y = this.linePositions[t - 1] - this.list.children[t - 1].geometry.boundingBox.max.y - s.geometry.boundingBox.max.y - 50),
                            this.linePositions[t] = s.position.y,
                            t === e - 1 && (this.listPos = -this.linePositions[this.activeProjectIndex] * this.textScale,
                            this.smoothListPos = this.listPos,
                            this.listActiveText.position.y = this.list.children[this.activeProjectIndex].position.y - 8),
                            i()
                        }
                        ))
                    }
                    ))),
                    this.listTextMaterials.push(s.material),
                    this.list.add(s),
                    this.listRaycastItems.push(s)
                }
                this.listActiveText = new nt.xv,
                Object.assign(this.listActiveText, {
                    text: window.projects[this.activeProjectIndex].project.title.toUpperCase(),
                    font: o.Gl.webglFonts["Neue Montreal"].url,
                    fontSize: 130,
                    letterSpacing: -.02,
                    anchorX: "center",
                    anchorY: "middle",
                    sdfGlyphSize: o.Gl.webglFonts["Neue Montreal"].sdfGlyphSize,
                    textAlign: "center",
                    lineHeight: .85,
                    maxWidth: o.mq.md.matches ? 1 / 0 : 750
                }),
                this.listActiveText.material.color.set(this.projects.children[this.activeProjectIndex].lightMode ? this.colorWhiteHex : this.colorBlackHex),
                this.listActiveText.material.depthTest = !1,
                this.listActiveText.material.fog = !1,
                this.listActiveText.material.opacity = 0,
                this.listActiveText.renderOrder = 110,
                this.listActiveText.sync(),
                this.list.add(this.listActiveText),
                this.textScene.add(this.list)
            }
            preBuildPasses() {
                this.renderPass = new Vs.C(this.scene,this.camera),
                this.renderPass.name = "Project Menu",
                this.renderPass.enabled = !1,
                this.renderPass.clear = !1,
                this.savePass = new Si(new i.dd2(o.window.w * o.Gl.renderer.getPixelRatio(),o.window.fullHeight * o.Gl.renderer.getPixelRatio(),{
                    minFilter: i.wem,
                    magFilter: i.wem,
                    depthBuffer: !1
                })),
                this.savePass.name = "Project Menu Scene Texture",
                this.savePass.enabled = !1,
                this.textRenderPass = new Vs.C(this.textScene,this.camera),
                this.textRenderPass.name = "Project Menu Text",
                this.textRenderPass.enabled = !1,
                this.textRenderPass.clear = !0,
                this.combinePass = new ot.T(new i.jyz({
                    vertexShader: st,
                    fragmentShader: "#define GLSLIFY 1\nvarying vec2 vUv;\n\nuniform sampler2D u_scene;\nuniform sampler2D tDiffuse;\n\nvec3 blendExclusion(vec3 base, vec3 blend) {\n\treturn base+blend-2.0*base*blend;\n}\n\nvoid main() {\n\tvec4 sceneColor = texture2D(u_scene, vUv);\n\tvec4 textSceneColor = texture2D(tDiffuse, vUv);\n\tvec3 excluded = blendExclusion(textSceneColor.rgb, sceneColor.rgb);\n\n\tgl_FragColor = vec4(mix(sceneColor.rgb, excluded, textSceneColor.a), 1.);\n}",
                    uniforms: {
                        tDiffuse: {
                            value: null
                        },
                        u_scene: {
                            value: this.savePass.renderTarget.texture
                        }
                    },
                    transparent: !0
                })),
                this.combinePass.name = "Project Menu Scene + Text",
                this.combinePass.enabled = !1,
                this.combinePass.clear = !0,
                this.combinedSavePass = new Si(new i.dd2(o.window.w * o.Gl.renderer.getPixelRatio(),o.window.fullHeight * o.Gl.renderer.getPixelRatio(),{
                    minFilter: i.wem,
                    magFilter: i.wem,
                    depthBuffer: !1
                })),
                this.combinedSavePass.name = "Project Menu Final Texture",
                this.combinedSavePass.enabled = !1,
                this.transitionPass = new ot.T(new i.jyz({
                    vertexShader: "#define GLSLIFY 1\nvarying vec2 vUv;\n\nvoid main () {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1 );\n}",
                    fragmentShader: "#define GLSLIFY 1\nvarying vec2 vUv;\n\nuniform sampler2D tDiffuse;\nuniform vec3 u_bgColor;\nuniform float u_progress;\nuniform float u_opacity;\n\nconst vec2 center = vec2(0.5, 0.5);\nconst float smoothness = 0.6;\n\nvoid main() {\n\tvec2 v = normalize(vec2(1., 0.));\n\tv /= abs(v.x)+abs(v.y);\n\tfloat d = v.x * center.x + v.y * center.y;\n\tfloat m =\n\t\t(1.0-step(1. - u_progress, 0.0)) *\n\t\t(1.0 - smoothstep(-smoothness, 0.0, v.x * vUv.x + v.y * vUv.y - (d-0.5+(1. - u_progress)*(1.+smoothness))));\n\tvec4 sceneColor = texture2D(tDiffuse, vUv);\n\tgl_FragColor = mix(vec4(u_bgColor, u_opacity), sceneColor, m);\n}",
                    uniforms: {
                        tDiffuse: {
                            value: null
                        },
                        u_bgColor: {
                            value: new i.Ilk
                        },
                        u_progress: {
                            value: 0
                        },
                        u_opacity: {
                            value: 1
                        }
                    },
                    transparent: !0
                })),
                this.transitionPass.name = "Project Menu to Project Transition",
                this.transitionPass.enabled = !1,
                o.Gl.composerPasses.add(this.renderPass, 10),
                o.Gl.composerPasses.add(this.savePass, 11),
                o.Gl.composerPasses.add(this.textRenderPass, 12),
                o.Gl.composerPasses.add(this.combinePass, 13),
                o.Gl.composerPasses.add(this.combinedSavePass, 14),
                o.Gl.composerPasses.add(this.transitionPass, 15)
            }
            updateScrollPos() {
                this.allowControl && (this.tweenParams.smoothScrollPos += .05 * (this.scrollPos - this.tweenParams.smoothScrollPos))
            }
            updateProjectsPos() {
                if (this.activeProject.position.z = this.tweenParams.smoothScrollPos - this.scrollOffset,
                !this.listOpen && this.allowControl)
                    if (this.activeProject.position.z > -this.activeProject.endZ) {
                        const e = this.activeProjectIndex;
                        this.activeProject.position.z = 2 * -this.farClip,
                        this.activeProjectIndex++,
                        this.activeProjectIndex > this.projectIndexCount && (this.activeProjectIndex = 0),
                        this.scrollOffset += -this.activeProject.endZ + this.farClip,
                        this.activeProject = this.projects.children[this.activeProjectIndex],
                        this.onProjectChange(e, this.activeProjectIndex, !0)
                    } else if (this.activeProject.position.z < -this.farClip) {
                        const e = this.activeProjectIndex;
                        this.activeProject.position.z = 2 * -this.farClip,
                        this.activeProjectIndex--,
                        this.activeProjectIndex < 0 && (this.activeProjectIndex = this.projectIndexCount),
                        this.scrollOffset -= -this.projects.children[this.activeProjectIndex].endZ + this.farClip,
                        this.activeProject = this.projects.children[this.activeProjectIndex],
                        this.onProjectChange(e, this.activeProjectIndex, !1)
                    }
            }
            updateArchPos() {
                this.allowControl && (this.tweenParams.smoothArchPos += .05 * (this.archPos - this.tweenParams.smoothArchPos)),
                this.archesGroup.position.z = this.tweenParams.smoothArchPos,
                this.archesGroup.position.z > this.archScrollOffset ? (this.archScrollOffset += this.archLength,
                this.arches.position.z -= this.archLength) : this.archesGroup.position.z < this.archScrollOffset - this.archLength && (this.archScrollOffset -= this.archLength,
                this.arches.position.z += this.archLength)
            }
            updateFloorPos() {
                this.floorGroup.position.z = this.tweenParams.smoothArchPos,
                this.floorGroup.position.z > this.floorScrollOffset ? (this.floorScrollOffset += this.floorLength,
                this.floor.position.z -= this.floorLength) : this.floorGroup.position.z < this.floorScrollOffset - this.floorLength && (this.floorScrollOffset -= this.floorLength,
                this.floor.position.z += this.floorLength)
            }
            updateGodRayPos() {
                this.allowControl && (this.tweenParams.smoothGodRayPos += .05 * (this.godRayPos - this.tweenParams.smoothGodRayPos)),
                this.godraysGroup.position.z = this.tweenParams.smoothGodRayPos,
                this.godraysGroup.position.z > this.godrayScrollOffset ? (this.godrayScrollOffset += this.godrayLength,
                this.godrays.position.z -= this.godrayLength) : this.godraysGroup.position.z < this.godrayScrollOffset - this.godrayLength && (this.godrayScrollOffset -= this.godrayLength,
                this.godrays.position.z += this.godrayLength)
            }
            updateListPos() {
                this.smoothListPos += .05 * (this.listPos - this.smoothListPos),
                this.list.position.y = this.smoothListPos
            }
            openList() {
                this.listAnimating || (this.listAnimating = !0,
                this.list.visible = !0,
                this.listOpen = !0,
                this.list.children[this.activeProjectIndex].visible = !1,
                this.prevHoveredItem = this.list.children[this.activeProjectIndex],
                v.ZP.killTweensOf([this.projectText.children[this.activeProjectIndex].children[0].material, this.projectText.children[this.activeProjectIndex].children[1].material]),
                this.listToggleTimeline && this.listToggleTimeline.clear(),
                this.listToggleTimeline = v.ZP.timeline({
                    defaults: {
                        ease: "power4.inOut",
                        duration: 1
                    }
                }).set(this.projectText.children[this.activeProjectIndex].children[1].material, {
                    opacity: 0
                }, "<").set(this.listActiveText.material, {
                    opacity: 1
                }, "<").to(this.activeProject.children, {
                    three: {
                        positionX: e=>this.activeProject.children[e].position.x < 0 ? -2e3 : 2e3
                    }
                }, "<").to([this.projectText.children[this.activeProjectIndex].children[0].material, this.selectedProjects.material], {
                    opacity: 0,
                    overwrite: !0
                }, "<").to(this.listTextMaterials, {
                    opacity: 1
                }, "<").to(this.dom.viewProjectBtn, {
                    autoAlpha: 0,
                    scale: .8,
                    duration: .7,
                    transformOrigin: "top"
                }, "<").to(o.Gl.screenFxPass.uniforms.u_bendAmount, {
                    value: -.45
                }, "<").to(o.Gl.screenFxPass.uniforms.u_maxDistort, {
                    value: 1.2
                }, "<").to(o.Gl.screenFxPass.uniforms.u_vignetteStrength, {
                    value: o.urlParams.has("novignette") ? 0 : .2
                }, "<").call((()=>{
                    this.allowListSelection = !0,
                    this.clickHoldPromptHidden || (this.clickHoldPromptHidden = !0,
                    o.isTouch ? v.ZP.to(this.dom.tapHoldPrompt, {
                        autoAlpha: 0,
                        duration: .2
                    }) : o.Cursor.hideClickHoldPrompt())
                }
                ), null, "<0.5"))
            }
            closeList() {
                if (!this.listOpen)
                    return;
                this.allowListSelection = !1;
                const e = this.activeProjectIndex;
                let t;
                if (this.hoveredItem ? (t = this.hoveredItem,
                this.activeProjectIndex = this.hoveredItem.projectId,
                this.prevHoveredItem = this.hoveredItem) : this.prevHoveredItem && (t = this.prevHoveredItem,
                this.activeProjectIndex = this.prevHoveredItem.projectId),
                e !== this.activeProjectIndex) {
                    for (let t = 0; t < this.projects.children[e].children.length; t++)
                        this.projects.children[e].children[t].material.opacity = 1,
                        this.projects.children[e].children[t].position.copy(this.projects.children[e].children[t].originalPosition);
                    this.projectText.children[e].visible = !1,
                    this.projectText.children[this.activeProjectIndex].visible = !0,
                    this.projectText.children[this.activeProjectIndex].children[0].material.opacity = 0,
                    this.projectText.children[this.activeProjectIndex].children[1].material.opacity = 0,
                    this.projectText.children[this.activeProjectIndex].position.z = 0,
                    t && (this.projects.children[e].position.z = 2 * -this.farClip,
                    this.activeProject = this.projects.children[this.activeProjectIndex],
                    this.activeProject.position.z = 0,
                    this.onProjectChange(e, this.activeProjectIndex, !0, !0),
                    this.scrollPos = this.tweenParams.smoothScrollPos = this.initialScrollPos,
                    this.scrollOffset = 0,
                    this.infinityProgress.scrollPos = -this.activeProject.startZ,
                    this.infinityProgress.updateProgress(),
                    this.activeProject.children.forEach((e=>{
                        e.position.x = e.position.x < 0 ? -1500 : 1500
                    }
                    )))
                }
                const s = [];
                for (let e = 0; e < this.listTextMaterials.length; e++)
                    s.push(this.listTextMaterials[e]);
                let i;
                this.tweenParams.listPos = this.smoothListPos,
                i = -this.linePositions[this.activeProjectIndex] * this.textScale,
                t && (i -= this.textScale),
                this.listToggleTimeline && this.listToggleTimeline.clear(),
                this.listToggleTimeline = v.ZP.timeline({
                    defaults: {
                        ease: "power4.out",
                        duration: 1
                    },
                    onComplete: ()=>{
                        this.listOpen = !1,
                        this.list.visible = !1
                    }
                }).to(this.tweenParams, {
                    listPos: i,
                    onUpdate: ()=>{
                        this.listPos = this.smoothListPos = this.tweenParams.listPos
                    }
                }, "<").to(s, {
                    opacity: 0
                }, "<").to(this.activeProject.children, {
                    three: {
                        positionX: e=>this.activeProject.children[e].originalPosition.x
                    }
                }, "<").to([this.projectText.children[this.activeProjectIndex].children[0].material, this.selectedProjects.material], {
                    opacity: 1
                }, "<").to(this.dom.viewProjectBtn, {
                    autoAlpha: 1,
                    scale: 1
                }, "<").to(o.Gl.screenFxPass.uniforms.u_bendAmount, {
                    value: this.originalScreenFxBendAmount
                }, "<").to(o.Gl.screenFxPass.uniforms.u_maxDistort, {
                    value: this.originalScreenFxMaxDistort
                }, "<").to(o.Gl.screenFxPass.uniforms.u_vignetteStrength, {
                    value: this.originalScreenFxVignetteStrength
                }, "<").set(this.projectText.children[this.activeProjectIndex].children[1].material, {
                    opacity: 1
                }, ">").set(this.listActiveText.material, {
                    opacity: 0
                }, "<"),
                this.hoveredItem = !1,
                this.listAnimating = !1
            }
            onProjectChange(e, t, s, i=!1) {
                v.ZP.to([this.scene.background, this.scene.fog.color, o.Gl.globalUniforms.fogColor.value, this.archMaterial.color, this.floorMaterial.color], {
                    r: this.activeProject.bgColor.r,
                    g: this.activeProject.bgColor.g,
                    b: this.activeProject.bgColor.b,
                    duration: 1,
                    ease: "expo.out"
                }),
                this.updateVideoState(e, t),
                this.dom.viewProjectBtn.setAttribute("href", this.activeProject.projectLink),
                this.projects.children[t].lightMode ? o.body.classList.add("dark") : o.body.classList.remove("dark");
                const n = [];
                for (let e = 0; e < this.listTextMaterials.length; e++)
                    n.push(this.listTextMaterials[e].color);
                this.list.children[e].visible = !0,
                this.list.children[t].visible = !1,
                this.listActiveText.text = this.list.children[t].text,
                this.listActiveText.sync(),
                this.listActiveText.position.y = this.list.children[t].position.y - 8,
                this.projectTextTimeline = v.ZP.timeline({
                    defaults: {
                        ease: "power4.out",
                        duration: 1.5,
                        overwrite: !0
                    }
                }).to([this.selectedProjects.material.color, n, this.listActiveText.material.color], {
                    r: this.projects.children[t].lightMode ? this.colorWhite.r : this.colorBlack.r,
                    g: this.projects.children[t].lightMode ? this.colorWhite.g : this.colorBlack.g,
                    b: this.projects.children[t].lightMode ? this.colorWhite.b : this.colorBlack.b,
                    duration: 2
                }, 0),
                i || (this.projectTextTimeline.to(this.projectText.children[e].position, {
                    z: s ? 300 : -300,
                    onComplete: ()=>{
                        this.projectText.children[e].visible = !1
                    }
                }, 0).to([this.projectText.children[e].children[0].material, this.projectText.children[e].children[1].material], {
                    opacity: 0,
                    duration: 1
                }, "<").fromTo(this.projectText.children[t].position, {
                    z: s ? -300 : 300
                }, {
                    z: 0,
                    onStart: ()=>{
                        this.projectText.children[t].visible = !0
                    }
                }, "<0.25").fromTo([this.projectText.children[t].children[0].material, this.projectText.children[t].children[1].material], {
                    opacity: 0
                }, {
                    opacity: 1
                }, "<"),
                this.listPos = -this.linePositions[t] * this.textScale,
                this.smoothListPos = this.listPos)
            }
            updateRaycaster() {
                if (this.raycaster.setFromCamera(o.mouse.glNormalized, this.camera),
                this.allowListSelection) {
                    const e = this.raycaster.intersectObjects(this.listRaycastItems, !1);
                    e.length ? this.hoveredItem !== e[0].object && (this.hoveredItem && (this.onTitleMouseLeave(),
                    this.hoveredItem = !1),
                    this.hoveredItem = e[0].object,
                    this.onTitleMouseEnter()) : this.hoveredItem && (this.onTitleMouseLeave(),
                    this.hoveredItem = !1)
                }
            }
            onTitleMouseEnter() {
                this.prevHoveredItem && (this.prevHoveredItem.visible = !0),
                this.listActiveText.text !== this.hoveredItem.text ? (o.Audio.play({
                    key: "audio.ratchet"
                }),
                this.listActiveText.text = this.hoveredItem.text,
                this.listActiveText.sync((()=>{
                    this.listActiveText.position.y = this.hoveredItem.position.y - 8,
                    this.hoveredItem.visible = !1
                }
                ))) : this.hoveredItem.visible = !1
            }
            onTitleMouseLeave() {
                this.prevHoveredItem = this.hoveredItem
            }
            updateVideoState(e, t) {
                for (let t = 0; t < this.projects.children[e].children.length; t++) {
                    const s = this.projects.children[e].children[t];
                    "video" === s.mediaType && s.material.uniforms.uTexture.value.image.pause()
                }
                for (let e = 0; e < this.projects.children[t].children.length; e++) {
                    const s = this.projects.children[t].children[e];
                    "video" === s.mediaType && s.material.uniforms.uTexture.value.image.play()
                }
            }
            updateCamera() {
                this.camera.position.copy(this.initialCameraPosition),
                this.camera.lookAt(0, 0, 0),
                o.isTouch || (this.brownianMotion.update(.5 * o.clockDelta),
                this.camera.updateMatrix(),
                this.camera.matrix.multiply(this.brownianMotion.matrix),
                this.camera.matrix.decompose(this.camera.position, this.camera.quaternion, this.camera.scale),
                this.camera.translateZ(-this.options.cameraZOffset),
                this._e.set(this.smoothMouse.y * this.options.mouseMoveAngleY * this.options.cameraMovementMultiplier, -this.smoothMouse.x * this.options.mouseMoveAngleX * this.options.cameraMovementMultiplier, 0),
                this._q.setFromEuler(this._e),
                this.camera.quaternion.multiply(this._q),
                this._e.set(0, 0, -.05 * (this.smoothMouse.x - this.smoothMouse2.x) * this.options.cameraMovementMultiplier),
                this._q.setFromEuler(this._e),
                this.camera.quaternion.multiply(this._q),
                this.camera.translateZ(this.options.cameraZOffset)),
                this.camera.position.x += this.tweenParams.cameraXOffset,
                this.camera.position.y += this.tweenParams.cameraYOffset,
                this.camera.position.z += this.tweenParams.cameraZOffset,
                this.camera.rotation.y += this.tweenParams.cameraYRotationOffset,
                this.camera.updateMatrixWorld()
            }
            rotateModels() {
                for (let e = 0; e < this.activeProject.children.length; e++) {
                    const t = this.activeProject.children[e];
                    "model" === t.mediaType && (t.rotation.y += .002 + .08 * Math.abs(this.tweenParams.velocity) + .025 * t.rotateSpeed)
                }
            }
            calculateVelocity() {
                this.scrollDelta = 5e-4 * (this.scrollPos - this.tweenParams.smoothScrollPos),
                this.smoothScrollDelta = i.M8C.lerp(this.scrollDelta, 0, .01),
                this.tweenParams.velocity += .075 * (this.smoothScrollDelta - this.tweenParams.velocity),
                this.globalUniforms.u_velocity.value = this.tweenParams.velocity
            }
            buildHtml() {
                this.viewProjectBtn = new y(this.dom.viewProjectBtn),
                this.viewProjectBtn3D = new dt(this.dom.viewProjectBtnWrap),
                this.viewProjectBtn3D.scale.setScalar(1.9 / (1e-4 * o.Gl.cssRenderer.cache.camera.fov)),
                o.Gl.cssScene.add(this.viewProjectBtn3D)
            }
            addPreSceneEvents() {
                o.RAFCollection.add(this.onPreSceneRaf, 10)
            }
            removePreSceneEvents() {
                o.RAFCollection.remove(this.onPreSceneRaf)
            }
            addEvents() {
                o.RAFCollection.add(this.onRaf, 11)
            }
            addInteractionEvents() {
                n.on("wheel", window, this.onScroll),
                n.on(o.events.MOUSEDOWN, this.onMouseDown),
                n.on(o.events.MOUSEUP, this.onMouseUp),
                n.on(o.events.MOUSEDRAG, this.onMouseDrag)
            }
            sampleVideos() {
                this.assets.projects.forEach((e=>{
                    for (const t in e.textures)
                        e.textures[t].image.play && e.textures[t].image.play().then((()=>{
                            e.textures[t].image.pause()
                        }
                        ))
                }
                ))
            }
            load() {
                const e = [];
                for (let t = 0; t < window.projects.length; t++) {
                    const s = window.projects[t]
                      , n = {
                        textures: {},
                        models: {}
                    };
                    for (let e = 0; e < s.images.length; e++)
                        "ktx2" === s.images[e].image.split(".").pop() ? o.AssetLoader.loadKtxTexture(s.images[e].image).then((t=>{
                            n.textures[s.images[e].name] = t
                        }
                        )) : o.AssetLoader.loadTexture(s.images[e].image).then((t=>{
                            n.textures[s.images[e].name] = t
                        }
                        ));
                    const r = (e,t,s)=>{
                        if (n.textures[t])
                            return;
                        const r = new i.fO1(e);
                        o.Gl.renderer.initTexture(r),
                        n.textures[t] = r,
                        e.pause(),
                        e.currentTime = 0,
                        e._videoWidth = e.videoWidth,
                        e._videoHeight = e.videoHeight,
                        e.removeAttribute("src"),
                        e.load(),
                        s()
                    }
                    ;
                    for (let t = 0; t < s.videos.length; t++) {
                        const i = o.AssetLoader.add(new Promise((e=>{
                            const i = document.createElement("video");
                            i.crossOrigin = "",
                            i.muted = !0,
                            i.loop = !0,
                            i.playsInline = !0,
                            i.addEventListener("loadeddata", (()=>{
                                i.addEventListener("timeupdate", (()=>{
                                    r(i, s.videos[t].name, e)
                                }
                                ), {
                                    once: !0
                                })
                            }
                            ), {
                                once: !0
                            }),
                            i.addEventListener("error", (o=>{
                                r(i, s.videos[t].name, e)
                            }
                            )),
                            o.isIOS && i.addEventListener("suspend", (()=>{
                                r(i, s.videos[t].name, e)
                            }
                            ), {
                                once: !0
                            }),
                            i.src = s.videos[t].video,
                            i.dataset.src = s.videos[t].video,
                            i.load(),
                            i.play().catch((o=>{
                                console.error(o),
                                r(i, s.videos[t].name, e)
                            }
                            ))
                        }
                        )));
                        e.push(i)
                    }
                    for (let e = 0; e < s.models.length; e++)
                        o.AssetLoader.loadGltf(s.models[e].model).then((t=>{
                            n.models[s.models[e].name] = ss(t).scene.children[0]
                        }
                        ));
                    this.assets.projects.push(n)
                }
                this.videosLoaded = Promise.all(e)
            }
            loadArches() {
                o.AssetLoader.loadKtxTexture(gt("images/project-menu/arch.ktx2")).then((e=>{
                    this.assets.textures.arch = e
                }
                )),
                o.AssetLoader.loadTexture(gt("images/project-menu/sand-rotate.jpg"), {
                    wrapping: i.rpg
                }).then((e=>{
                    e.repeat.set(5, 5),
                    e.needsUpdate = !0,
                    this.assets.textures.sand = e
                }
                )),
                o.AssetLoader.loadGltf(gt("models/project-menu/arch-dc.glb")).then((e=>{
                    this.assets.models.arch = e.scene.children[0]
                }
                )),
                o.AssetLoader.loadGltf(gt("models/project-menu/floor-dc.glb")).then((e=>{
                    this.assets.models.floor = e.scene.children[0]
                }
                ))
            }
            destroy() {
                n.off("wheel", window, this.onScroll),
                o.RAFCollection.remove(this.onRaf),
                n.off(o.events.MOUSEDOWN, this.onMouseDown),
                n.off(o.events.MOUSEUP, this.onMouseUp),
                n.off(o.events.MOUSEDRAG, this.onMouseDrag),
                n.off("cssrenderer:cacheUpdated", this.updateHtmlScale),
                this.removePreSceneEvents(),
                o.Gl.fluidSim.disable(),
                this.options.cameraMovementMultiplier = 1,
                this.camera.position.copy(this.initialCameraPosition),
                this.camera.rotation.set(0, 0, 0),
                this.scene.fog.color.set(this.initialColor),
                this.scene.background.set(this.initialColor),
                this.archMaterial.color.set(this.initialColor),
                this.floorMaterial.color.set(this.initialColor),
                this.hoveredItem = !1,
                this.listOpen = !1,
                this.listAnimating = !1,
                this.allowListSelection = !1,
                this.scrollDelta = 0,
                this.smoothScrollDelta = 0,
                this.scrollPos = this.initialScrollPos,
                this.archPos = this.initialScrollPos,
                this.godRayPos = this.initialScrollPos,
                this.archesGroup.position.z = this.initialScrollPos,
                this.floorGroup.position.z = this.initialScrollPos,
                this.arches.position.z = 2 * this.archLength,
                this.floor.position.z = this.floorLength / 1.5,
                this.godrays.position.z = 0,
                this.archScrollOffset = this.archLength,
                this.floorScrollOffset = this.floorLength,
                this.godrayScrollOffset = this.godrayLength,
                this.scrollOffset = 0,
                this.listPos = this.smoothListPos = 0,
                this.allowControl = !0,
                this.tweenParams = {
                    smoothScrollPos: this.initialScrollPos,
                    smoothArchPos: this.initialScrollPos,
                    smoothGodRayPos: this.initialScrollPos,
                    listPos: 0,
                    cameraXOffset: 0,
                    cameraYOffset: 0,
                    cameraZOffset: 0,
                    cameraYRotationOffset: 0,
                    velocity: 0
                };
                for (let e = 0; e < this.projects.children.length; e++)
                    for (let t = 0; t < this.projects.children[e].children.length; t++) {
                        const s = this.projects.children[e].children[t];
                        "video" === s.mediaType && (s.material.uniforms.uTexture.value.image.src = "",
                        s.material.uniforms.uTexture.value.image.load())
                    }
                document.body.removeChild(this.dom.tapHoldPrompt),
                this.clickHoldPromptHidden || o.Cursor.hideClickHoldPrompt(),
                this.infinityProgress.destroy(),
                this.resourceTracker.dispose(),
                this.viewProjectBtn.destroy(),
                this.renderPass.enabled = !1,
                this.savePass.enabled = !1,
                this.textRenderPass.enabled = !1,
                this.combinePass.enabled = !1,
                this.combinedSavePass.enabled = !1,
                this.transitionPass.enabled = !1,
                this.resetState()
            }
        }
        var Ai = s(6498)
          , Li = s(6041)
          , Ei = s(670);
        class Ii extends Ai.Pane {
            constructor() {
                super({
                    expanded: !0
                }),
                this.containerElem_.style.position = "fixed",
                this.containerElem_.style.top = "auto",
                this.containerElem_.style.bottom = "8px",
                this.containerElem_.style.width = "350px",
                this.containerElem_.style.zIndex = 99999,
                this.registerPlugin(Li),
                this.registerPlugin(Ei),
                this.options = {},
                this.materials = [],
                this.init(),
                this.initScreenFx(),
                this.initHomeContact(),
                this.initProjectMenu(),
                this.initProject(),
                this.initWorld()
            }
            init() {
                this.fps = this.addBlade({
                    view: "fpsgraph"
                })
            }
            initScreenFx() {
                const e = this.addFolder({
                    title: "Screen FX"
                });
                e.addInput(o.Gl.screenFxPass.uniforms.u_maxDistort, "value", {
                    label: "max distort",
                    min: 0,
                    max: 10,
                    step: .001
                }),
                e.addInput(o.Gl.screenFxPass.uniforms.u_bendAmount, "value", {
                    label: "bend amount",
                    min: -4,
                    max: 0,
                    step: .001
                }),
                e.addInput(o.Gl.screenFxPass.uniforms.u_vignetteStrength, "value", {
                    label: "vignette strength",
                    min: 0,
                    max: 1,
                    step: .001
                })
            }
            initHomeContact() {
                if ("homeContact" !== o.Highway.properties.slug)
                    return;
                const e = this.addFolder({
                    title: "Home/Contact"
                })
                  , t = {
                    skyboxScaleX: 6,
                    skyboxScaleY: 1,
                    skyboxPosX: 0,
                    skyboxPosY: 0,
                    transitionProgress: o.HomeContact.transitionPass.uniforms.u_progress.value
                }
                  , s = {
                    room1: {
                        image: new Image,
                        firstUpdate: !0
                    },
                    room2: {
                        image: new Image,
                        firstUpdate: !0
                    },
                    skybox: {
                        image: new Image,
                        firstUpdate: !0
                    }
                };
                e.addInput(s.room1, "image", {
                    label: "Room 1",
                    view: "input-image"
                }).on("change", (e=>{
                    s.room1.firstUpdate ? s.room1.firstUpdate = !1 : (o.HomeContact.homeRoom.material.map = o.Gl.generateTexture(e.value, {
                        flipY: !1
                    }),
                    o.HomeContact.homeRoom.material.map.needsUpdate = !0)
                }
                )),
                e.addInput(s.room2, "image", {
                    label: "Room 2",
                    view: "input-image"
                }).on("change", (e=>{
                    s.room2.firstUpdate ? s.room2.firstUpdate = !1 : (o.HomeContact.contactRoom.material.map = o.Gl.generateTexture(e.value, {
                        flipY: !1
                    }),
                    o.HomeContact.contactRoom.material.map.needsUpdate = !0)
                }
                )),
                e.addInput(s.skybox, "image", {
                    label: "Skybox",
                    view: "input-image"
                }).on("change", (e=>{
                    s.skybox.firstUpdate ? s.skybox.firstUpdate = !1 : (o.HomeContact.world.material.map = o.Gl.generateTexture(e.value, {
                        wrapping: Ci.rpg
                    }),
                    o.HomeContact.world.material.map.needsUpdate = !0)
                }
                )),
                e.addInput(t, "skyboxScaleX", {
                    min: 0,
                    max: 20,
                    step: .01
                }).on("change", (e=>{
                    o.HomeContact.world.material.map.repeat.set(t.skyboxScaleX, t.skyboxScaleY),
                    o.HomeContact.world.material.map.needsUpdate = !0
                }
                )),
                e.addInput(t, "skyboxScaleY", {
                    min: 0,
                    max: 20,
                    step: .01
                }).on("change", (e=>{
                    o.HomeContact.world.material.map.repeat.set(t.skyboxScaleX, t.skyboxScaleY),
                    o.HomeContact.world.material.map.needsUpdate = !0
                }
                )),
                e.addInput(t, "skyboxPosX", {
                    min: -20,
                    max: 20,
                    step: .01
                }).on("change", (e=>{
                    o.HomeContact.world.material.map.offset.set(t.skyboxPosX, t.skyboxPosY),
                    o.HomeContact.world.material.map.needsUpdate = !0
                }
                )),
                e.addInput(t, "skyboxPosY", {
                    min: -10,
                    max: 10,
                    step: .001
                }).on("change", (e=>{
                    o.HomeContact.world.material.map.offset.set(t.skyboxPosX, t.skyboxPosY),
                    o.HomeContact.world.material.map.needsUpdate = !0
                }
                ));
                const i = {
                    color1: "#" + o.HomeContact.grass.material.uniforms.u_color1.value.getHexString(),
                    color2: "#" + o.HomeContact.grass.material.uniforms.u_color2.value.getHexString(),
                    landColor: "#" + o.HomeContact.land.material.uniforms.u_baseColor.value.getHexString(),
                    textColor1: "#" + o.HomeContact.homeTextMesh.material.uniforms.uTextColor1.value.getHexString(),
                    textColor2: "#" + o.HomeContact.homeTextMesh.material.uniforms.uTextColor2.value.getHexString(),
                    textColor3: "#" + o.HomeContact.homeTextMesh.material.uniforms.uTextColor3.value.getHexString(),
                    textColor4: "#" + o.HomeContact.homeTextMesh.material.uniforms.uTextColor4.value.getHexString()
                };
                e.addInput(i, "color1", {
                    label: "grass color 1",
                    picker: "inline"
                }).on("change", (e=>{
                    o.HomeContact.grass.material.uniforms.u_color1.value.set(e.value)
                }
                )),
                e.addInput(i, "color2", {
                    label: "grass color 2",
                    picker: "inline"
                }).on("change", (e=>{
                    o.HomeContact.grass.material.uniforms.u_color2.value.set(e.value)
                }
                )),
                e.addInput(i, "landColor", {
                    picker: "inline"
                }).on("change", (e=>{
                    o.HomeContact.land.material.uniforms.u_baseColor.value.set(e.value)
                }
                )),
                e.addInput(i, "textColor1", {
                    picker: "inline"
                }).on("change", (e=>{
                    o.HomeContact.homeTextMesh.material.uniforms.uTextColor1.value.set(e.value)
                }
                )),
                e.addInput(i, "textColor2", {
                    picker: "inline"
                }).on("change", (e=>{
                    o.HomeContact.homeTextMesh.material.uniforms.uTextColor2.value.set(e.value)
                }
                )),
                e.addInput(i, "textColor3", {
                    picker: "inline"
                }).on("change", (e=>{
                    o.HomeContact.homeTextMesh.material.uniforms.uTextColor3.value.set(e.value)
                }
                )),
                e.addInput(i, "textColor4", {
                    picker: "inline"
                }).on("change", (e=>{
                    o.HomeContact.homeTextMesh.material.uniforms.uTextColor4.value.set(e.value)
                }
                ))
            }
            initProjectMenu() {
                if ("projects" !== o.Highway.properties.slug)
                    return;
                const e = this.addFolder({
                    title: "Project Menu"
                }).addFolder({
                    title: "godrays"
                });
                e.addInput(o.ProjectMenu.godrays.material.uniforms.uDirection, "value", {
                    label: "origin",
                    picker: "inline",
                    x: {
                        step: .1,
                        min: -350,
                        max: 350
                    },
                    y: {
                        step: .1,
                        min: -350,
                        max: 0
                    }
                }),
                e.addInput(o.ProjectMenu.godrays.material.uniforms.uStrength, "value", {
                    label: "strength",
                    min: 0,
                    max: 2,
                    step: .01
                }),
                e.addInput(o.ProjectMenu.godrays.material.uniforms.uLength, "value", {
                    label: "length",
                    min: 0,
                    max: 2,
                    step: .01
                }),
                e.addInput(o.ProjectMenu.godrays.material.uniforms.uFadeSmoothness, "value", {
                    label: "fadeSmoothness",
                    min: 0,
                    max: 2,
                    step: .01
                }),
                e.addInput(o.ProjectMenu.godrays.material.uniforms.uScale, "value", {
                    label: "scale",
                    min: 0,
                    max: 2,
                    step: .01
                }),
                e.addInput(o.ProjectMenu.godrays.material.uniforms.uSpeed, "value", {
                    label: "speed",
                    min: 0,
                    max: 2,
                    step: .01
                }),
                o.ProjectMenu.godrays.material.uniforms.uLightColor.guiValue = "#" + o.ProjectMenu.godrays.material.uniforms.uLightColor.value.getHexString(),
                e.addInput(o.ProjectMenu.godrays.material.uniforms.uLightColor, "guiValue", {
                    label: "color",
                    picker: "inline"
                }).on("change", (e=>{
                    o.ProjectMenu.godrays.material.uniforms.uLightColor.value.set(e.value)
                }
                ))
            }
            initProject() {
                if ("project" !== o.Highway.properties.slug)
                    return;
                const e = this.addFolder({
                    title: "Project"
                });
                e.addInput(o.Project.fluidPass.uniforms.uOpacity, "value", {
                    label: "fluid opacity",
                    min: 0,
                    max: 1,
                    step: .001
                }),
                e.addInput(o.Project.fluidPass.uniforms.uRamp, "value", {
                    label: "fluid opacity ramp",
                    x: {
                        min: 0,
                        max: 1,
                        step: .001
                    },
                    y: {
                        min: 0,
                        max: 1,
                        step: .001
                    }
                }),
                e.addInput(o.Project.fluidPass.uniforms.uImageDistortion, "value", {
                    label: "fluid distortion",
                    min: 0,
                    max: .01,
                    step: 1e-4
                });
                const t = e.addFolder({
                    title: "Model Material"
                });
                t.addInput(o.Project.currentModel.item.children[0].material, "opacity", {
                    min: 0,
                    max: 1,
                    step: .001
                }),
                t.addInput(o.Project.currentModel.item.children[0].material.matcap, "image", {
                    label: "Matcap",
                    view: "input-image"
                }).on("change", (e=>{
                    o.Project.currentModel.item.children[0].material.matcap.needsUpdate = !0
                }
                ))
            }
            initWorld() {
                if ("world" !== o.Highway.properties.slug)
                    return;
                const e = this.addFolder({
                    title: "World"
                });
                e.addInput(o.World.params, "trailDrag", {
                    min: 0,
                    max: 1,
                    step: .001
                }),
                e.addInput(o.World.params, "trailVelocity", {
                    min: 0,
                    max: .25,
                    step: .001
                })
            }
        }
        let Ri = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi
          , Oi = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi
          , ki = Math.PI / 180
          , Fi = (Math.PI,
        Math.sin)
          , Di = Math.cos
          , Gi = Math.abs
          , zi = Math.sqrt
          , Hi = (Math.atan2,
        e=>"number" == typeof e)
          , Ui = 1e5
          , Bi = e=>Math.round(e * Ui) / Ui || 0;
        function Ni(e, t, s, i, o, n, r, a, l) {
            if (e === a && t === l)
                return;
            s = Gi(s),
            i = Gi(i);
            let h = o % 360 * ki
              , c = Di(h)
              , d = Fi(h)
              , u = Math.PI
              , m = 2 * u
              , p = (e - a) / 2
              , g = (t - l) / 2
              , f = c * p + d * g
              , v = -d * p + c * g
              , x = f * f
              , y = v * v
              , P = x / (s * s) + y / (i * i);
            P > 1 && (s = zi(P) * s,
            i = zi(P) * i);
            let w = s * s
              , b = i * i
              , T = (w * b - w * y - b * x) / (w * y + b * x);
            T < 0 && (T = 0);
            let S = (n === r ? -1 : 1) * zi(T)
              , M = S * (s * v / i)
              , C = S * (-i * f / s)
              , _ = (e + a) / 2 + (c * M - d * C)
              , j = (t + l) / 2 + (d * M + c * C)
              , A = (f - M) / s
              , L = (v - C) / i
              , E = (-f - M) / s
              , I = (-v - C) / i
              , R = A * A + L * L
              , O = (L < 0 ? -1 : 1) * Math.acos(A / zi(R))
              , k = (A * I - L * E < 0 ? -1 : 1) * Math.acos((A * E + L * I) / zi(R * (E * E + I * I)));
            isNaN(k) && (k = u),
            !r && k > 0 ? k -= m : r && k < 0 && (k += m),
            O %= m,
            k %= m;
            let F, D = Math.ceil(Gi(k) / (m / 4)), G = [], z = k / D, H = 4 / 3 * Fi(z / 2) / (1 + Di(z / 2)), U = c * s, B = d * s, N = d * -i, W = c * i;
            for (F = 0; F < D; F++)
                f = Di(o = O + F * z),
                v = Fi(o),
                A = Di(o += z),
                L = Fi(o),
                G.push(f - H * v, v + H * f, A + H * L, L - H * A, A, L);
            for (F = 0; F < G.length; F += 2)
                f = G[F],
                v = G[F + 1],
                G[F] = f * U + v * N + _,
                G[F + 1] = f * B + v * W + j;
            return G[F - 2] = a,
            G[F - 1] = l,
            G
        }
        function Wi(e) {
            let t, s, i, o, n, r, a, l, h, c, d, u, m, p, g, f = (e + "").replace(Oi, (e=>{
                let t = +e;
                return t < 1e-4 && t > -1e-4 ? 0 : t
            }
            )).match(Ri) || [], v = [], x = 0, y = 0, P = 2 / 3, w = f.length, b = 0, T = "ERROR: malformed path: " + e, S = function(e, t, s, i) {
                c = (s - e) / 3,
                d = (i - t) / 3,
                a.push(e + c, t + d, s - c, i - d, s, i)
            };
            if (!e || !isNaN(f[0]) || isNaN(f[1]))
                return console.log(T),
                v;
            for (t = 0; t < w; t++)
                if (m = n,
                isNaN(f[t]) ? (n = f[t].toUpperCase(),
                r = n !== f[t]) : t--,
                i = +f[t + 1],
                o = +f[t + 2],
                r && (i += x,
                o += y),
                t || (l = i,
                h = o),
                "M" === n)
                    a && (a.length < 8 ? v.length -= 1 : b += a.length),
                    x = l = i,
                    y = h = o,
                    a = [i, o],
                    v.push(a),
                    t += 2,
                    n = "L";
                else if ("C" === n)
                    a || (a = [0, 0]),
                    r || (x = y = 0),
                    a.push(i, o, x + 1 * f[t + 3], y + 1 * f[t + 4], x += 1 * f[t + 5], y += 1 * f[t + 6]),
                    t += 6;
                else if ("S" === n)
                    c = x,
                    d = y,
                    "C" !== m && "S" !== m || (c += x - a[a.length - 4],
                    d += y - a[a.length - 3]),
                    r || (x = y = 0),
                    a.push(c, d, i, o, x += 1 * f[t + 3], y += 1 * f[t + 4]),
                    t += 4;
                else if ("Q" === n)
                    c = x + (i - x) * P,
                    d = y + (o - y) * P,
                    r || (x = y = 0),
                    x += 1 * f[t + 3],
                    y += 1 * f[t + 4],
                    a.push(c, d, x + (i - x) * P, y + (o - y) * P, x, y),
                    t += 4;
                else if ("T" === n)
                    c = x - a[a.length - 4],
                    d = y - a[a.length - 3],
                    a.push(x + c, y + d, i + (x + 1.5 * c - i) * P, o + (y + 1.5 * d - o) * P, x = i, y = o),
                    t += 2;
                else if ("H" === n)
                    S(x, y, x = i, y),
                    t += 1;
                else if ("V" === n)
                    S(x, y, x, y = i + (r ? y - x : 0)),
                    t += 1;
                else if ("L" === n || "Z" === n)
                    "Z" === n && (i = l,
                    o = h,
                    a.closed = !0),
                    ("L" === n || Gi(x - i) > .5 || Gi(y - o) > .5) && (S(x, y, i, o),
                    "L" === n && (t += 2)),
                    x = i,
                    y = o;
                else if ("A" === n) {
                    if (p = f[t + 4],
                    g = f[t + 5],
                    c = f[t + 6],
                    d = f[t + 7],
                    s = 7,
                    p.length > 1 && (p.length < 3 ? (d = c,
                    c = g,
                    s--) : (d = g,
                    c = p.substr(2),
                    s -= 2),
                    g = p.charAt(1),
                    p = p.charAt(0)),
                    u = Ni(x, y, +f[t + 1], +f[t + 2], +f[t + 3], +p, +g, (r ? x : 0) + 1 * c, (r ? y : 0) + 1 * d),
                    t += s,
                    u)
                        for (s = 0; s < u.length; s++)
                            a.push(u[s]);
                    x = a[a.length - 2],
                    y = a[a.length - 1]
                } else
                    console.log(T);
            return t = a.length,
            t < 6 ? (v.pop(),
            t = 0) : a[0] === a[t - 2] && a[1] === a[t - 1] && (a.closed = !0),
            v.totalPoints = b + t,
            v
        }
        function Zi(e) {
            Hi(e[0]) && (e = [e]);
            let t, s, i, o, n = "", r = e.length;
            for (s = 0; s < r; s++) {
                for (o = e[s],
                n += "M" + Bi(o[0]) + "," + Bi(o[1]) + " C",
                t = o.length,
                i = 2; i < t; i++)
                    n += Bi(o[i++]) + "," + Bi(o[i++]) + " " + Bi(o[i++]) + "," + Bi(o[i++]) + " " + Bi(o[i++]) + "," + Bi(o[i]) + " ";
                o.closed && (n += "z")
            }
            return n
        }
        let qi, Vi, Yi = ()=>qi || "undefined" != typeof window && (qi = window.gsap) && qi.registerPlugin && qi, Ki = ()=>{
            qi = Yi(),
            qi ? (qi.registerEase("_CE", eo.create),
            Vi = 1) : console.warn("Please gsap.registerPlugin(CustomEase)")
        }
        , Xi = e=>~~(1e3 * e + (e < 0 ? -.5 : .5)) / 1e3, $i = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi, Qi = /[cLlsSaAhHvVtTqQ]/g, Ji = function(e, t, s, i, o, n, r, a, l, h, c) {
            let d, u = (e + s) / 2, m = (t + i) / 2, p = (s + o) / 2, g = (i + n) / 2, f = (o + r) / 2, v = (n + a) / 2, x = (u + p) / 2, y = (m + g) / 2, P = (p + f) / 2, w = (g + v) / 2, b = (x + P) / 2, T = (y + w) / 2, S = r - e, M = a - t, C = Math.abs((s - r) * M - (i - a) * S), _ = Math.abs((o - r) * M - (n - a) * S);
            return h || (h = [{
                x: e,
                y: t
            }, {
                x: r,
                y: a
            }],
            c = 1),
            h.splice(c || h.length - 1, 0, {
                x: b,
                y: T
            }),
            (C + _) * (C + _) > l * (S * S + M * M) && (d = h.length,
            Ji(e, t, u, m, x, y, b, T, l, h, c),
            Ji(b, T, P, w, f, v, r, a, l, h, c + 1 + (h.length - d))),
            h
        };
        class eo {
            constructor(e, t, s) {
                Vi || Ki(),
                this.id = e,
                this.setData(t, s)
            }
            setData(e, t) {
                t = t || {};
                let s, i, o, n, r, a, l, h, c, d = (e = e || "0,0,1,1").match($i), u = 1, m = [], p = [], g = t.precision || 1, f = g <= 1;
                if (this.data = e,
                (Qi.test(e) || ~e.indexOf("M") && e.indexOf("C") < 0) && (d = Wi(e)[0]),
                s = d.length,
                4 === s)
                    d.unshift(0, 0),
                    d.push(1, 1),
                    s = 8;
                else if ((s - 2) % 6)
                    throw "Invalid CustomEase";
                for (0 == +d[0] && 1 == +d[s - 2] || ((e,t,s)=>{
                    s || 0 === s || (s = Math.max(+e[e.length - 1], +e[1]));
                    let i, o = -1 * +e[0], n = -s, r = e.length, a = 1 / (+e[r - 2] + o), l = -t || (Math.abs(+e[r - 1] - +e[1]) < .01 * (+e[r - 2] - +e[0]) ? (e=>{
                        let t, s = e.length, i = 1e20;
                        for (t = 1; t < s; t += 6)
                            +e[t] < i && (i = +e[t]);
                        return i
                    }
                    )(e) + n : +e[r - 1] + n);
                    for (l = l ? 1 / l : -a,
                    i = 0; i < r; i += 2)
                        e[i] = (+e[i] + o) * a,
                        e[i + 1] = (+e[i + 1] + n) * l
                }
                )(d, t.height, t.originY),
                this.segment = d,
                n = 2; n < s; n += 6)
                    i = {
                        x: +d[n - 2],
                        y: +d[n - 1]
                    },
                    o = {
                        x: +d[n + 4],
                        y: +d[n + 5]
                    },
                    m.push(i, o),
                    Ji(i.x, i.y, +d[n], +d[n + 1], +d[n + 2], +d[n + 3], o.x, o.y, 1 / (2e5 * g), m, m.length - 1);
                for (s = m.length,
                n = 0; n < s; n++)
                    l = m[n],
                    h = m[n - 1] || l,
                    l.x > h.x || h.y !== l.y && h.x === l.x || l === h ? (h.cx = l.x - h.x,
                    h.cy = l.y - h.y,
                    h.n = l,
                    h.nx = l.x,
                    f && n > 1 && Math.abs(h.cy / h.cx - m[n - 2].cy / m[n - 2].cx) > 2 && (f = 0),
                    h.cx < u && (h.cx ? u = h.cx : (h.cx = .001,
                    n === s - 1 && (h.x -= .001,
                    u = Math.min(u, .001),
                    f = 0)))) : (m.splice(n--, 1),
                    s--);
                if (s = 1 / u + 1 | 0,
                r = 1 / s,
                a = 0,
                l = m[0],
                f) {
                    for (n = 0; n < s; n++)
                        c = n * r,
                        l.nx < c && (l = m[++a]),
                        i = l.y + (c - l.x) / l.cx * l.cy,
                        p[n] = {
                            x: c,
                            cx: r,
                            y: i,
                            cy: 0,
                            nx: 9
                        },
                        n && (p[n - 1].cy = i - p[n - 1].y);
                    p[s - 1].cy = m[m.length - 1].y - i
                } else {
                    for (n = 0; n < s; n++)
                        l.nx < n * r && (l = m[++a]),
                        p[n] = l;
                    a < m.length - 1 && (p[n - 1] = m[m.length - 2])
                }
                return this.ease = e=>{
                    let t = p[e * s | 0] || p[s - 1];
                    return t.nx < e && (t = t.n),
                    t.y + (e - t.x) / t.cx * t.cy
                }
                ,
                this.ease.custom = this,
                this.id && qi.registerEase(this.id, this.ease),
                this
            }
            getSVGData(e) {
                return eo.getSVGData(this, e)
            }
            static create(e, t, s) {
                return new eo(e,t,s).ease
            }
            static register(e) {
                qi = e,
                Ki()
            }
            static get(e) {
                return qi.parseEase(e)
            }
            static getSVGData(e, t) {
                let s, i, o, n, r, a, l, h, c, d, u = (t = t || {}).width || 100, m = t.height || 100, p = t.x || 0, g = (t.y || 0) + m, f = qi.utils.toArray(t.path)[0];
                if (t.invert && (m = -m,
                g = 0),
                "string" == typeof e && (e = qi.parseEase(e)),
                e.custom && (e = e.custom),
                e instanceof eo)
                    s = Zi(function(e, t, s, i, o, n, r) {
                        let a, l, h, c, d, u = e.length;
                        for (; --u > -1; )
                            for (a = e[u],
                            l = a.length,
                            h = 0; h < l; h += 2)
                                c = a[h],
                                d = a[h + 1],
                                a[h] = c * t + d * i + n,
                                a[h + 1] = c * s + d * o + r;
                        return e._dirty = 1,
                        e
                    }([e.segment], u, 0, 0, -m, p, g));
                else {
                    for (s = [p, g],
                    l = Math.max(5, 200 * (t.precision || 1)),
                    n = 1 / l,
                    l += 2,
                    h = 5 / l,
                    c = Xi(p + n * u),
                    d = Xi(g + e(n) * -m),
                    i = (d - g) / (c - p),
                    o = 2; o < l; o++)
                        r = Xi(p + o * n * u),
                        a = Xi(g + e(o * n) * -m),
                        (Math.abs((a - d) / (r - c) - i) > h || o === l - 1) && (s.push(c, d),
                        i = (a - d) / (r - c)),
                        c = r,
                        d = a;
                    s = "M" + s.join(",")
                }
                return f && f.setAttribute("d", s),
                s
            }
        }
        Yi() && qi.registerPlugin(eo),
        eo.version = "3.2.4";
        const to = 3e3;
        class so {
            constructor() {
                var e, t, s;
                s = e=>{
                    for (; (e.timeRemaining() > 0 || e.didTimeout) && this.taskList.length && this.currentTaskNumber - this.tasksCompleted < this.concurrency; ) {
                        const e = this.taskList.shift();
                        this.currentTaskNumber += 1,
                        e.task(),
                        e.resolve(),
                        this.tasksCompleted += 1
                    }
                    this.taskList.length ? this.taskHandle = requestIdleCallback(this.runTaskQueue, {
                        timeout: to
                    }) : this.taskHandle = 0
                }
                ,
                (t = "runTaskQueue")in (e = this) ? Object.defineProperty(e, t, {
                    value: s,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = s,
                this.taskList = [],
                this.tasksCompleted = 0,
                this.currentTaskNumber = 0,
                this.taskHandle = null,
                this.maxConcurrency = 1,
                this.concurrency = 1,
                this.promises = [],
                this.finished = !1
            }
            enqueueTask(e) {
                this.promises.push(new Promise((t=>{
                    this.taskList.push({
                        task: e,
                        resolve: t
                    })
                }
                ))),
                this.taskHandle || (this.taskHandle = requestIdleCallback(this.runTaskQueue, {
                    timeout: to
                }))
            }
            get queueFinished() {
                return this.finished || (this.finished = new Promise((e=>{
                    Promise.all(this.promises).then((()=>{
                        this.finished = !1,
                        this.promises = [],
                        e()
                    }
                    ))
                }
                ))),
                this.finished
            }
        }
        window.requestIdleCallback = window.requestIdleCallback || function(e) {
            const t = Date.now();
            return setTimeout((()=>{
                e({
                    didTimeout: !1,
                    timeRemaining: ()=>Math.max(0, to - (Date.now() - t))
                })
            }
            ), 1)
        }
        ;
        var io = s(1766);
        const oo = {
            audio: JSON.parse('{"E":{"backing":[0,30747.16553287982,true],"click":[31200,500],"contact_swoosh":[32400,4500],"hover":[37600,500],"menu_close":[38800.00000000001,1000],"menu_swoosh":[40000.00000000001,1071.020408163264],"navlinks_hover":[42200,1567.3469387755076],"new_water_projects":[44400,2500],"ratchet":[47600,61.609977324259546],"world_static":[48800,5294.8526077097495],"world-intro":[54999.99999999999,12800.000000000004],"world-loop":[68200,12799.999999999996,true]}}').E
        };
        function no(e) {
            return e.split(".")
        }
        class ro {
            constructor() {
                this.sprites = {
                    audio: null
                },
                io.Howler.mute(!0),
                this.html5 = !1;
                const e = navigator ? navigator.userAgent : ""
                  , t = e.match(/Mac OS X 10_15/)
                  , s = -1 !== e.indexOf("Safari") && -1 === e.indexOf("Chrome")
                  , i = e.match(/Version\/(.*?) /);
                t && s && 15 === parseInt(i[1], 10) && (this.html5 = !0);
                for (const e in this.sprites)
                    this.loadSprite(e);
                this.addDomEvents(),
                document.addEventListener("visibilitychange", (()=>{
                    o.PageLoader.hidden && (document.hidden ? io.Howler.mute(!0) : o.audioMuted || io.Howler.mute(!1))
                }
                )),
                this.activeSounds = {},
                this.activeNarration = null
            }
            loadSprite(e) {
                o.AssetLoader.add(new Promise(((t,s)=>{
                    this.sprites[e] = new io.Howl({
                        src: [gt(`audio/${e}.webm`), gt(`audio/${e}.mp3`)],
                        sprite: oo[e],
                        html5: this.html5,
                        onload: ()=>{
                            t()
                        }
                        ,
                        onloaderror: (t,i)=>{
                            console.error(t, i, e),
                            s()
                        }
                    })
                }
                )))
            }
            unloadSprite(e) {
                this.sprites[e].unload()
            }
            addDomEvents() {
                n.delegate("mouseenter", "[data-audio-enter]", (e=>{
                    document.body.classList.contains("is-touch") || this.play({
                        key: e.currentTarget.dataset.audioEnter,
                        isInteraction: !0
                    })
                }
                )),
                n.delegate("mouseleave", "[data-audio-leave]", (e=>{
                    document.body.classList.contains("is-touch") || this.play({
                        key: e.currentTarget.dataset.audioLeave,
                        isInteraction: !0
                    })
                }
                )),
                n.delegate("click", "[data-audio-click]", (e=>{
                    this.play({
                        key: e.currentTarget.dataset.audioClick,
                        isInteraction: !0
                    })
                }
                )),
                n.delegate("click", "[data-audio-mute]", (e=>{
                    e.currentTarget.dataset.audioMute && "" !== e.currentTarget.dataset.audioMute ? this.mute(e.currentTarget.dataset.audioMute, !0) : this.muteAll(!0)
                }
                )),
                n.delegate("click", "[data-audio-unmute]", (e=>{
                    e.currentTarget.dataset.audioUnmute && "" !== e.currentTarget.dataset.audioUnmute ? this.mute(e.currentTarget.dataset.audioUnmute, !1) : this.muteAll(!1)
                }
                )),
                n.delegate("click", "[data-audio-stop]", (e=>{
                    e.currentTarget.dataset.audioStop && "" !== e.currentTarget.dataset.audioStop ? this.stop(e.currentTarget.dataset.audioStop) : this.stopAll()
                }
                ))
            }
            play({key: e, fade: t, volume: s, speed: i, isInteraction: o, callback: n}) {
                const [r,a] = no(e);
                if (!this.sprites[r])
                    return void console.error(`Sound not found - ${r}.${a}`);
                const l = oo[r][a][2];
                if (l && this.activeSounds[e] || (this.activeSounds[e] = this.sprites[r].play(a, !1)),
                this.activeSounds[e] && (t && this.sprites[r].fade(t.from, t.to, 1e3 * t.duration, this.activeSounds[e]),
                s && this.sprites[r].volume(s, this.activeSounds[e]),
                i && !this.html5))
                    for (let t = 0; t < this.sprites[r]._sounds.length; t++)
                        this.sprites[r]._sounds[t]._id === this.activeSounds[e] && this.sprites[r]._sounds[t]._node.bufferSource.playbackRate && (this.sprites[r]._sounds[t]._node.bufferSource.playbackRate.value = i);
                o && !l && delete this.activeSounds[e],
                o || (this.sprites[r].once("stop", (()=>{
                    this.activeSounds[e] && delete this.activeSounds[e]
                }
                ), this.activeSounds[e]),
                l || this.sprites[r].once("end", (()=>{
                    this.activeSounds[e] && delete this.activeSounds[e],
                    n && n()
                }
                ), this.activeSounds[e]))
            }
            isPlaying(e) {
                return !!this.activeSounds[e]
            }
            lerpSpeed(e, t, s) {
                const [i,o] = no(e);
                if (this.sprites[i]._sprite[o])
                    for (let e = 0; e < this.sprites[i]._sounds.length; e++) {
                        const a = this.sprites[i]._sounds[e];
                        if (a._sprite === o) {
                            var n, r;
                            const e = null == a || null === (n = a._node) || void 0 === n || null === (r = n.bufferSource) || void 0 === r ? void 0 : r.playbackRate.value;
                            if (!e)
                                return;
                            const i = (e > t ? e - t : t - e) / (s / 50)
                              , o = setInterval((()=>{
                                var s, n, r;
                                const l = null == a || null === (s = a._node) || void 0 === s || null === (n = s.bufferSource) || void 0 === n || null === (r = n.playbackRate) || void 0 === r ? void 0 : r.value;
                                if (l)
                                    if (e > t) {
                                        if (l <= t)
                                            return void window.clearInterval(o);
                                        a._node.bufferSource.playbackRate.value = l - i
                                    } else {
                                        if (l >= t)
                                            return void window.clearInterval(o);
                                        a._node.bufferSource.playbackRate.value = l + i
                                    }
                                else
                                    window.clearInterval(o)
                            }
                            ), 50);
                            break
                        }
                    }
            }
            filterTo({key: e, type: t, duration: s, from: i={}, to: o={}}) {
                if (this.html5)
                    return void this.fadeToStop({
                        key: e,
                        duration: 1
                    });
                const [n,r] = no(e)
                  , a = Object.assign({
                    frequency: 350,
                    q: 1,
                    gain: 0,
                    detune: 0
                }, i)
                  , l = Object.assign({
                    frequency: 350,
                    q: 1,
                    gain: 0,
                    detune: 0
                }, o);
                if (this.sprites[n]._sprite[r])
                    for (let e = 0; e < this.sprites[n]._sounds.length; e++) {
                        const i = this.sprites[n]._sounds[e];
                        if (i._sprite === r) {
                            const e = io.Howler.ctx.createBiquadFilter();
                            e.type = t,
                            e.frequency.value = a.frequency,
                            e.Q.value = a.q,
                            e.gain.value = a.gain,
                            e.detune.value = a.detune,
                            i._node.bufferSource.disconnect(),
                            i.filter && i.filter.disconnect(),
                            i._node.bufferSource.connect(e),
                            i.filter = e,
                            e.connect(i._node),
                            e.frequency.exponentialRampToValueAtTime(l.frequency, i._node.context.currentTime + s / 1e3),
                            a.detune !== l.detune && e.detune.exponentialRampToValueAtTime(l.detune, i._node.context.currentTime + s / 1e3),
                            a.q !== l.q && e.q.exponentialRampToValueAtTime(l.q, i._node.context.currentTime + s / 1e3);
                            break
                        }
                    }
            }
            fadeTo({key: e, to: t, duration: s, callback: i}) {
                const o = ()=>{
                    i && i()
                }
                ;
                if (e) {
                    const [i] = no(e);
                    this.activeSounds[e] && (this.sprites[i].once("fade", o, this.activeSounds[e]),
                    this.sprites[i].fade(this.sprites[i].volume(this.activeSounds[e]), t, 1e3 * s, this.activeSounds[e]))
                } else {
                    let e = null;
                    for (const i in this.activeSounds) {
                        const n = this.activeSounds[i]
                          , [r] = no(i);
                        e || (this.sprites[r].once("fade", o, n),
                        e = !0),
                        this.sprites[r].fade(this.sprites[r].volume(n), t, 1e3 * s, n)
                    }
                }
            }
            fadeToStop({key: e, to: t=0, duration: s}) {
                this.fadeTo({
                    key: e,
                    to: t,
                    duration: s,
                    callback: ()=>this.stop(e)
                })
            }
            stop(e) {
                if (this.activeSounds[e]) {
                    const [t] = no(e);
                    this.sprites[t].stop(this.activeSounds[e], !1),
                    delete this.activeSounds[e]
                }
            }
            stopAll() {
                io.Howler.stop(),
                this.activeSounds = {}
            }
            setVolume({key: e, volume: t}) {
                if (this.activeSounds[e]) {
                    const [s] = no(e);
                    this.sprites[s].volume(t, this.activeSounds[e])
                }
            }
            mute(e, t) {
                if (this.activeSounds[e]) {
                    const [s] = no(e);
                    this.sprites[s].mute(t, this.activeSounds[e])
                }
            }
            muteAll(e) {
                io.Howler.mute(e),
                n.emit("AudioMute", e)
            }
            duration(e) {
                const [t,s] = no(e);
                return this.sprites[t]._sprite[s] ? this.sprites[t]._sprite[s][1] : null
            }
            lerp(e, t, s) {
                return e + (t - e) * (s = (s = s < 0 ? 0 : s) > 1 ? 1 : s)
            }
        }
        function ao(e, t, s) {
            return t in e ? Object.defineProperty(e, t, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = s,
            e
        }
        class lo {
            constructor() {
                ao(this, "check", (()=>{
                    if (!this.run)
                        return;
                    this.frames++;
                    const e = performance.now();
                    if (e >= this.prevTime + this.checkInterval) {
                        const t = 1e3 * this.frames / (e - this.prevTime);
                        if (t > 1 && (this.avgFps.push(t),
                        this.checkCount++,
                        5 === this.checkCount)) {
                            this.run = !1;
                            const e = Math.min(...this.avgFps)
                              , t = Math.max(...this.avgFps);
                            for (let t = 0; t < this.avgFps.length; t++)
                                if (this.avgFps[t] === e) {
                                    this.avgFps.splice(t, 1);
                                    break
                                }
                            for (let e = 0; e < this.avgFps.length; e++)
                                if (this.avgFps[e] === t) {
                                    this.avgFps.splice(e, 1);
                                    break
                                }
                            const s = Math.ceil(this.avgFps.reduce(((e,t)=>e + t), 0) / this.avgFps.length);
                            this.avgFps = [],
                            o.gpuTier = this.tiers.filter((e=>s >= e)).length,
                            this.totalChecks++,
                            requestAnimationFrame((()=>{
                                setTimeout((()=>{
                                    n.emit("FPSChecked", o.gpuTier)
                                }
                                ), 0)
                            }
                            )),
                            o.gpuTier < this.totalCheckLimit && this.totalChecks < this.totalCheckLimit && this.enable()
                        }
                        this.prevTime = e,
                        this.frames = 0
                    }
                }
                )),
                ao(this, "onDocVisibilityChange", (()=>{
                    this.run && "visible" === document.visibilityState && (this.prevTime = performance.now(),
                    this.frames = 0)
                }
                )),
                ao(this, "onResize", (()=>{
                    this.run && (this.prevTime = performance.now(),
                    this.frames = 0,
                    this.checkCount = 0,
                    this.avgFps = [])
                }
                )),
                this.run = !1,
                this.hasRun = !1,
                this.checkInterval = 600,
                this.frames = 0,
                this.prevTime = 0,
                this.checkCount = 0,
                this.totalChecks = 0,
                this.tiers = [15, 30, 45, 55],
                this.totalCheckLimit = 10,
                o.gpuTier = this.tiers.length,
                this.avgFps = [],
                o.urlParams.has("forcehq") || (o.RAFCollection.add(this.check, 100),
                document.addEventListener("visibilitychange", this.onDocVisibilityChange),
                n.on(o.events.RESIZE, this.onResize),
                n.on("CheckFPS", (()=>{
                    this.avgFps = [],
                    this.totalChecks = 0,
                    this.hasRun = !0,
                    this.enable()
                }
                )))
            }
            enable() {
                this.checkCount = 0,
                this.run = !0
            }
            disable() {
                this.run = !1
            }
        }
        class ho {
            constructor() {
                this.dom = {
                    loader: g(".js-naked-loader"),
                    loaderWrap: g(".js-naked-loader-wrap"),
                    loaderBox: p(".js-naked-loader-box"),
                    text: g(".js-naked-loader-text")
                },
                this.dom.textSplit = new zs(".js-naked-loader-text > div",{
                    type: "chars"
                }).chars
            }
            show(e="ffffff", t=!1, s=!1) {
                l.ZP.set([this.dom.loader, this.dom.loaderBox], {
                    backgroundColor: "#" + e
                });
                const i = l.ZP.timeline({
                    defaults: {
                        ease: "expo.inOut"
                    }
                }).fromTo(this.dom.loader, {
                    autoAlpha: 0
                }, {
                    autoAlpha: 1,
                    duration: 1
                }).fromTo(this.dom.loaderWrap, {
                    scale: 0
                }, {
                    scale: t ? .5 : 1,
                    duration: .8
                }, "<").call((()=>{
                    this.dom.loader.classList.add("loader--animate")
                }
                ), null, .6);
                if (t) {
                    if (s) {
                        const {x: e, y: t, width: i, height: o} = s.getBoundingClientRect();
                        l.ZP.set(this.dom.text, {
                            x: e + i / 2,
                            y: t + o / 2
                        })
                    }
                    i.set(this.dom.text, {
                        visibility: "visible"
                    }, 0).fromTo(this.dom.textSplit, {
                        y: "100%"
                    }, {
                        y: "0%",
                        stagger: .03,
                        duration: .7,
                        ease: "power3.inOut"
                    }, 0)
                }
                return i
            }
            hide(e=!1) {
                const t = l.ZP.timeline({
                    defaults: {
                        ease: "power4.out"
                    }
                }).to(this.dom.loader, {
                    autoAlpha: 0,
                    duration: .8
                }).to(this.dom.loaderWrap, {
                    scale: 0,
                    duration: .9
                }, "<").call((()=>{
                    this.dom.loader.classList.remove("loader--animate")
                }
                ), null);
                return e && t.set(this.dom.text, {
                    visibility: "hidden",
                    x: 0,
                    y: 0
                }),
                t
            }
        }
        class co extends c.Z.Renderer {
            constructor(...e) {
                var t, s, i;
                super(...e),
                i = ()=>{
                    o.HomeContact.build(),
                    o.ProjectMenu.preBuild(),
                    o.World.buildIntro(),
                    this.rebrandBtn = new y(g(".js-rebrand-btn")),
                    this.muteBtn = new Ns(g(".js-global-mute-btn")),
                    o.TextLoader.loaded.then((()=>{
                        o.PageLoader.hiddenPromise.then((()=>{
                            this.onEnterCompleted(),
                            n.emit("CheckFPS"),
                            l.ZP.from(o.Gl.screenFxPass.uniforms.u_maxDistort, {
                                value: 5,
                                duration: 1.5,
                                ease: "power2.out"
                            })
                        }
                        ))
                    }
                    )),
                    n.off("AssetLoader:beforeResolve", this.onFirstAssetsLoad)
                }
                ,
                (s = "onFirstAssetsLoad")in (t = this) ? Object.defineProperty(t, s, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[s] = i
            }
            onFirstLoad() {
                if (o.ASScroll = new (u())({
                    disableRaf: !0,
                    disableResize: !0,
                    touchScrollType: "transform",
                    lockIOSBrowserUI: !1,
                    disableNativeScrollbar: !1,
                    limitLerpRate: !1
                }),
                o.RAFCollection = new m,
                o.FPSChecker = new lo,
                o.AssetLoader = new tt,
                o.TextLoader = new tt({
                    name: "TextLoader",
                    progressEventName: "TextLoaderProgress"
                }),
                o.Dom2WebglObserver = new It({
                    rootMargin: "0% 0% 0% 0%"
                },"dom2webgl",!0),
                o.PageLoader = new w,
                o.NakedLoader = new ho,
                o.ScrollAnimations = new Yt,
                o.TaskScheduler = new so,
                o.Gl = new Lt,
                o.Gl.addPasses(),
                o.Audio = new ro,
                o.Dom2Webgl = new vs,
                l.ZP.registerPlugin(eo),
                eo.create("projectMenuToProject", "M0,0 C0.532,0 0.5,0.5 1,1 "),
                o.HomeContact = new bi,
                o.ProjectMenu = new ji,
                o.World = new ai,
                o.Navigation = new Hs,
                o.Menu = new Us,
                o.WorldButton = new Bs,
                o.Cursor = new Zs,
                o.RAFCollection.add(o.ASScroll.update, 0),
                o.ASScroll.on("update", Rt.Z.update),
                Rt.Z.addEventListener("refresh", o.ASScroll.resize),
                o.urlParams.has("mobilerecording")) {
                    const e = parseFloat(o.urlParams.get("mobilerecording") || 150);
                    g(".header").style.top = `${e}px`,
                    g(".js-global-mute-btn").style.bottom = `${e}px`,
                    g(".js-footer-cta").style.bottom = `${e}px`,
                    g(".js-world-btn").style.bottom = `${e}px`,
                    g(".js-footer-cr").style.bottom = `${e}px`
                }
                o.ProjectMenu.videosLoaded.then((()=>{
                    this.onEnter()
                }
                )),
                n.on("AssetLoader:beforeResolve", this.onFirstAssetsLoad)
            }
            onEnter({loadScripts: e=!0}={}) {
                this.page = this.wrap.lastElementChild,
                e && this.loadScripts(),
                o.ASScroll.currentPos = 0,
                window.scrollTo(0, 0),
                o.Dom2Webgl.build(),
                this.buttons = new f(y,this.page),
                this.video = new f(qs,this.page),
                this.muteToggles = new f(Ns,this.page),
                o.AssetLoader.load({
                    element: this.page
                }).then((()=>{
                    this.updateScrollTrigger(),
                    o.ScrollAnimations.build(),
                    o.Dom2Webgl.enable(),
                    o.debug && setTimeout((()=>{
                        o.Gui = new Ii
                    }
                    ), 2e3)
                }
                )),
                o.TextLoader.load({
                    element: !1
                })
            }
            onEnterCompleted() {
                o.ScrollAnimations.enable(),
                o.Navigation.showNavItems(),
                o.Cursor.enable(),
                o.Menu.updateActiveItem()
            }
            onLeave() {
                o.Cursor.disable(),
                o.ASScroll.disable(),
                o.html.classList.add("asscroll-disabled"),
                o.ScrollAnimations.destroy(),
                o.Dom2WebglObserver.reset(),
                o.Highway.firstLoad = !1
            }
            onLeaveCompleted() {
                o.Dom2Webgl.reset(),
                this.buttons.callAll("destroy"),
                this.video.callAll("destroy"),
                this.muteToggles.callAll("destroy")
            }
            updateScrollTrigger() {
                Rt.Z.defaults({
                    scroller: o.ASScroll.containerElement
                }),
                Rt.Z.scrollerProxy(o.ASScroll.containerElement, {
                    scrollTop: this.getScrollTriggerPos,
                    scrollLeft: this.getScrollTriggerPos,
                    getBoundingClientRect() {
                        return {
                            top: 0,
                            left: 0,
                            width: o.window.w,
                            height: o.window.h
                        }
                    }
                })
            }
            getScrollTriggerPos(e) {
                return arguments.length ? o.ASScroll.scrollTo(e) : o.ASScroll.currentPos
            }
            loadScripts() {
                this.reloadScripts = [];
                const e = this.page.querySelectorAll("script")
                  , t = e.length;
                for (let s = 0; s < t; s++) {
                    const t = e[s].innerText
                      , i = e[s].src;
                    !o.Highway.firstLoad && t.length > 0 ? window.eval(t) : i.length > 0 && this.appendScript(i, i.split("/").pop()).catch((e=>{
                        console.error(e)
                    }
                    ))
                }
            }
            appendScript(e, t) {
                return new Promise(((s,i)=>{
                    if (document.querySelector(`[data-filename="${t}"]`))
                        return;
                    const n = document.createElement("script");
                    this.reloadScripts.includes(t) || (n.dataset.filename = t),
                    o.Highway.firstLoad || (n.addEventListener("load", s),
                    n.addEventListener("error", (()=>i(new Error("Error loading script: " + t)))),
                    n.addEventListener("abort", (()=>i(new Error("Script loading aborted: " + t)))),
                    n.async = !0,
                    n.src = e),
                    document.body.appendChild(n)
                }
                ))
            }
            setup() {
                o.Highway.firstLoad = !0,
                this.onFirstLoad()
            }
            show(e) {
                return new Promise((async t=>{
                    this.update(),
                    this.onEnter && await this.onEnter(),
                    this.Transition && await this.Transition.show(e),
                    this.onEnterCompleted && this.onEnterCompleted(),
                    t()
                }
                ))
            }
        }
        class uo extends co {
            onEnter() {
                this.page = this.wrap.lastElementChild,
                super.loadScripts(),
                o.ProjectMenu.firstLoad = o.Highway.firstLoad,
                super.onEnter({
                    loadScripts: !1
                }),
                o.AssetLoader.loaded.then((()=>{
                    o.ProjectMenu.build(o.Highway.firstLoad),
                    o.Highway.firstLoad ? o.PageLoader.hiddenPromise.then((()=>{
                        o.ProjectMenu.in(),
                        o.ProjectMenu.addInteractionEvents(),
                        o.Audio.isPlaying("audio.backing") || (o.Audio.play({
                            key: "audio.backing",
                            fade: {
                                from: 0,
                                to: 1,
                                duration: 1
                            }
                        }),
                        o.Audio.filterTo({
                            key: "audio.backing",
                            duration: 1,
                            type: "lowpass",
                            from: {
                                frequency: 14e3
                            },
                            to: {
                                frequency: 160
                            }
                        }))
                    }
                    )) : o.Audio.isPlaying("audio.backing") || (o.Audio.play({
                        key: "audio.backing",
                        fade: {
                            from: 0,
                            to: 1,
                            duration: 1
                        }
                    }),
                    setTimeout((()=>{
                        o.Audio.filterTo({
                            key: "audio.backing",
                            duration: 1,
                            type: "lowpass",
                            from: {
                                frequency: 14e3
                            },
                            to: {
                                frequency: 160
                            }
                        })
                    }
                    ), 0)),
                    "notFound" === o.Highway.From.properties.slug && (o.ProjectMenu.enable(),
                    o.ProjectMenu.addEvents())
                }
                ))
            }
            onLeave() {
                super.onLeave(),
                o.Cursor.hideClickHoldPrompt(),
                v.ZP.to(o.Gl.cssRenderer.domElement, {
                    autoAlpha: 0,
                    duration: .5,
                    ease: "power2.out",
                    onComplete: ()=>{
                        o.ProjectMenu.viewProjectBtn3D.parent.remove(o.ProjectMenu.viewProjectBtn3D)
                    }
                })
            }
            onLeaveCompleted() {
                super.onLeaveCompleted(),
                this.isTransitioningToProject || o.ProjectMenu.destroy()
            }
        }
        function mo(e, t, s) {
            return t in e ? Object.defineProperty(e, t, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = s,
            e
        }
        class po {
            constructor() {
                mo(this, "onRaf", (e=>{
                    this.transitioning || (this.params.smoothTransitionProgress += .2 * (this.params.transitionProgress - this.params.smoothTransitionProgress),
                    this.transitionTimeline && this.transitionTimeline.progress(this.params.smoothTransitionProgress),
                    this.transitionDelta = this.params.transitionProgress - this.params.smoothTransitionProgress,
                    this.velocity += .1 * (this.transitionDelta - this.velocity),
                    this.velocity = i.M8C.clamp(this.velocity, -.1, 2),
                    this.transitionPlane.item.material.uniforms.u_velo.value = this.velocity,
                    this.keepScrolling.item.material.uniforms.u_velo.value = this.velocity,
                    this.footerNext.item.material.uniforms.u_velo.value = this.velocity,
                    this.nextTitle.item.material.uniforms.u_velo.value = this.velocity,
                    this.scrollProgress.item.material.uniforms.u_velo.value = this.velocity)
                }
                )),
                mo(this, "onScroll", (e=>{
                    if (this.transitioning)
                        return;
                    if (o.ASScroll.currentPos < o.ASScroll.maxScroll - 10)
                        return void (this.params.scrollPos = this.params.dragPos = this.params.transitionProgress = 0);
                    this.setTransitionTimeout(),
                    this.params.scrollPos += e.deltaY;
                    const t = 2 * o.window.h;
                    this.params.transitionProgress = (this.params.scrollPos - 0) / (t - 0)
                }
                )),
                mo(this, "onDrag", (({oy: e, py: t, y: s})=>{
                    if (this.transitioning)
                        return;
                    if (Math.abs(e - s) < 2)
                        return;
                    if (o.ASScroll.currentPos + o.window.h < o.ASScroll.maxScroll + o.window.h - 1)
                        return void (this.params.dragPos = this.params.transitionProgress = 0);
                    this.setTransitionTimeout(),
                    this.params.dragPos += t - s;
                    this.params.transitionProgress = (this.params.dragPos - 0) / 400
                }
                )),
                mo(this, "onResize", (()=>{
                    const {y: e, height: t} = this.dom.nextTitlePosition.getBoundingClientRect();
                    this.nextTitlePos = -(e + o.ASScroll.currentPos - o.window.fullHeight / 2 + t / 2)
                }
                )),
                this.resourceTracker = new gs,
                this.backgroundColor = g("[data-bgcolor]").dataset.bgcolor,
                this.backgroundColorGl = new i.Ilk(this.backgroundColor),
                this.nextBackgroundColor = g("[data-next-bgcolor]").dataset.nextBgcolor,
                this.nextBackgroundColorGl = new i.Ilk(this.nextBackgroundColor),
                this.transitioning = !1,
                this.params = {
                    scrollPos: 0,
                    dragPos: 0,
                    transitionProgress: 0,
                    footerContentTweenProgress: 0,
                    smoothTransitionProgress: 0
                },
                this.transitionDelta = 0,
                this.smoothTransitionDelta = 0,
                this.velocity = 0,
                this.dom = {
                    currentModel: g(".js-current-model"),
                    nextModel: g(".js-next-model"),
                    projectsText: g(".js-projects-text"),
                    description1: g(".js-description1"),
                    description2: g(".js-description2"),
                    currentTitle: g(".js-current-title"),
                    nextTitle: g(".js-next-title"),
                    nextTitlePosition: g(".js-next-title-position"),
                    footerNext: g(".js-footer-next"),
                    keepScrolling: g(".js-keep-scrolling"),
                    scrollProgress: g(".js-scroll-progress"),
                    transitionPlane: g(".js-transition-plane")
                },
                this.setup()
            }
            setup() {
                this.scene = o.Gl.scene,
                this.camera = o.Gl.camera,
                this.camera.position.y = 0,
                document.body.style.backgroundColor = this.backgroundColor,
                this.scene.fog.color.set(this.backgroundColorGl),
                o.projectToProjectTransition && (this.prevRenderPass = o.Project.renderPass),
                this.renderPass = new Vs.C(this.scene,this.camera),
                this.renderPass.name = "Project",
                this.renderPass.clearColor = o.World.backgroundColorGl,
                o.Highway.From.isTransitioningToProject || (this.resume(),
                v.ZP.killTweensOf(o.Gl.screenFxPass.uniforms.u_noiseOnly),
                o.Gl.screenFxPass.uniforms.u_noiseOnly.value = 1)
            }
            resume() {
                o.Gl.composerPasses.add(this.renderPass, 20),
                o.isTouch || (o.projectToProjectTransition || o.Gl.composerPasses.add(o.Gl.fluidPass, 21),
                o.Gl.fluidSim.enable()),
                o.Gl.fxaaPass.enabled = !1,
                o.projectToProjectTransition && (this.prevRenderPass.enabled = !1,
                o.Gl.composerPasses.remove(this.prevRenderPass))
            }
            build() {
                this.currentModel = this.dom.currentModel._webGLItem,
                this.nextModel = this.dom.nextModel._webGLItem,
                this.transitionPlane = this.dom.transitionPlane._webGLItem,
                this.keepScrolling = this.dom.keepScrolling._webGLItem,
                this.footerNext = this.dom.footerNext._webGLItem,
                this.scrollProgress = this.dom.scrollProgress._webGLItem,
                this.projectsText = this.dom.projectsText._webGLItem,
                this.description1 = this.dom.description1._webGLItem,
                this.description2 = this.dom.description2._webGLItem,
                this.currentTitle = this.dom.currentTitle._webGLItem,
                this.nextTitle = this.dom.nextTitle._webGLItem,
                this.dom.nextTitlePosition.innerHTML = this.dom.nextTitle.innerHTML,
                this.onResize(),
                o.Gl.globalUniforms.fogNear.value = this.scene.fog.near,
                o.Gl.globalUniforms.fogFar.value = this.scene.fog.far,
                o.Gl.globalUniforms.fogColor.value.copy(this.scene.fog.color),
                o.Gl.fluidPass.uniforms.uOpacity.value = 0,
                this.buildIntro(),
                this.addEvents(),
                o.Gl.renderer.compile(this.scene, this.camera),
                o.Highway.From.isTransitioningToProject || this.introTimeline.play()
            }
            buildIntro() {
                if (this.projectsText.addToGlyphPositions({
                    minY: -this.projectsText.fontSize,
                    maxY: -this.projectsText.fontSize
                }),
                this.projectsText.copyGlyphPositions(),
                this.description1.addToGlyphPositions({
                    minY: -this.description1.fontSize,
                    maxY: -this.description1.fontSize
                }),
                this.description1.copyGlyphPositions(),
                this.description2.addToGlyphPositions({
                    minY: -this.description2.fontSize,
                    maxY: -this.description2.fontSize
                }),
                this.description2.copyGlyphPositions(),
                this.introTimeline = v.ZP.timeline({
                    paused: !0,
                    delay: .1,
                    defaults: {
                        ease: "expo.inOut"
                    },
                    onStart: ()=>{
                        this.buildTransition()
                    }
                }).to("main", {
                    autoAlpha: 1,
                    duration: .5
                }, 0).to(o.Gl.fluidPass.uniforms.uOpacity, {
                    value: .03,
                    duration: 1
                }, 0).to(this.projectsText.glyphPositions, {
                    minY: `+=${this.projectsText.fontSize}`,
                    maxY: `+=${this.projectsText.fontSize}`,
                    duration: .9,
                    stagger: .03,
                    onUpdate: ()=>{
                        this.projectsText.updateGlyphPositions()
                    }
                }, "<0.25").to(this.description1.glyphPositions, {
                    minY: `+=${this.description1.fontSize}`,
                    maxY: `+=${this.description1.fontSize}`,
                    duration: .9,
                    stagger: .03,
                    onUpdate: ()=>{
                        this.description1.updateGlyphPositions()
                    }
                }, "<").to(this.description2.glyphPositions, {
                    minY: `+=${this.description2.fontSize}`,
                    maxY: `+=${this.description2.fontSize}`,
                    duration: .9,
                    stagger: .03,
                    onUpdate: ()=>{
                        this.description2.updateGlyphPositions()
                    }
                }, "<"),
                o.mq.sm.matches) {
                    const e = this.dom.currentTitle.getBoundingClientRect().left - this.dom.currentTitle.parentElement.getBoundingClientRect().left;
                    this.introTimeline.to(this.dom.currentTitle, {
                        x: -e,
                        glProps: {
                            "position.x": -e
                        },
                        duration: 1.3
                    }, 0)
                }
            }
            buildFooterContentTween() {
                let e;
                e = (o.isTouch,
                this.nextTitlePos - (this.nextTitle.originalPosition.y + o.ASScroll.maxScroll));
                const t = this.currentModel.originalPosition.y;
                this.footerContentTween = v.ZP.timeline({
                    paused: !0,
                    defaults: {
                        ease: "power4.out",
                        duration: 1
                    }
                }).to(this.footerNext.glyphPositions, {
                    minY: "+=" + 1.1 * this.footerNext.fontSize,
                    maxY: "+=" + 1.1 * this.footerNext.fontSize,
                    duration: .25,
                    onUpdate: ()=>{
                        this.footerNext.updateGlyphPositions()
                    }
                }, 0).to(this.dom.nextTitle, {
                    y: e,
                    glProps: {
                        "position.y": -e
                    }
                }, 0).to(this.dom.nextModel, {
                    y: t,
                    glProps: {
                        "position.y": -t
                    }
                }, 0)
            }
            buildTransition() {
                this.transitionTimeline = v.ZP.timeline({
                    paused: !0,
                    defaults: {
                        duration: 1,
                        ease: "sine.out"
                    },
                    onStart: ()=>{
                        this.buildFooterContentTween()
                    }
                    ,
                    onUpdate: ()=>{
                        this.footerContentTween.progress(this.params.footerContentTweenProgress)
                    }
                    ,
                    onComplete: ()=>{
                        this.transitioning = !0,
                        clearTimeout(this.transitionTimeout),
                        o.projectToProjectTransition = !0,
                        o.isTouch,
                        o.ASScroll.currentPos = o.ASScroll.maxScroll,
                        o.Highway.redirect(g("[data-next-link]").dataset.nextLink, "projectToProject")
                    }
                }).to([this.transitionPlane.item.material.uniforms.u_progress, this.keepScrolling.item.material.uniforms.u_progress, this.footerNext.item.material.uniforms.u_progress, this.nextTitle.item.material.uniforms.u_progress, this.nextModel.item.children[0].material.uniforms.uTransitionProgress, this.scrollProgress.item.material.uniforms.u_progress], {
                    value: .5
                }, 0).to([this.transitionPlane.item.material.uniforms.u_adjust, this.keepScrolling.item.material.uniforms.u_adjust, this.footerNext.item.material.uniforms.u_adjust, this.nextTitle.item.material.uniforms.u_adjust, this.scrollProgress.item.material.uniforms.u_adjust], {
                    value: .9,
                    ease: "power4.out"
                }, 0).to(this.scrollProgress.scale, {
                    x: 1
                }, 0).to(this.params, {
                    footerContentTweenProgress: .2
                }, 0)
            }
            setTransitionTimeout() {
                v.ZP.killTweensOf(this.params, "scrollPos,dragPos,transitionProgress"),
                clearTimeout(this.transitionTimeout),
                this.transitionTimeout = setTimeout((()=>{
                    v.ZP.to(this.params, {
                        scrollPos: 0,
                        dragPos: 0,
                        transitionProgress: 0,
                        duration: 1,
                        ease: "power2.in"
                    })
                }
                ), 75)
            }
            addEvents() {
                n.on("wheel", window, this.onScroll),
                n.on(o.events.MOUSEDRAG, this.onDrag),
                o.RAFCollection.add(this.onRaf, 3)
            }
            destroy() {
                n.off("wheel", window, this.onScroll),
                n.off(o.events.MOUSEDRAG, this.onDrag),
                o.RAFCollection.remove(this.onRaf),
                this.resourceTracker.dispose(),
                o.projectToProjectTransition || (this.renderPass.enabled = !1,
                o.Gl.composerPasses.remove(this.renderPass),
                o.isTouch || (o.Gl.composerPasses.remove(o.Gl.fluidPass),
                o.Gl.fluidSim.disable())),
                o.Gl.fxaaPass.enabled = !0
            }
        }
        function go(e, t, s) {
            return t in e ? Object.defineProperty(e, t, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = s,
            e
        }
        class fo {
            static get selector() {
                return ".js-grid-slider"
            }
            constructor(e) {
                go(this, "onRaf", (()=>{
                    this.smoothDragPos += .15 * (this.dragPos - this.smoothDragPos),
                    this.smoothDragProgress += .15 * (this.dragProgress - this.smoothDragProgress);
                    for (let e = 0; e < this.dom.items.length; e++) {
                        const t = this.dom.items[e];
                        l.ZP.set(t, {
                            x: this.smoothDragPos,
                            glProps: {
                                "position.x": this.smoothDragPos
                            }
                        })
                    }
                    this.dom.text.style.transform = `translate3d(0px, 0px, ${-200 * this.smoothDragProgress * 4}px)`,
                    this.dom.text.style.opacity = 1 - 5 * this.smoothDragProgress
                }
                )),
                go(this, "onDrag", (({ox: e, px: t, x: s, event: o})=>{
                    this.sliderEl.contains(o.target) && (Math.abs(e - s) < 2 || (this.dragPos -= 1.5 * (t - s),
                    this.dragPos = i.M8C.clamp(this.dragPos, this.maxDragPos, 0),
                    this.dragProgress = this.dragPos / this.maxDragPos,
                    this.sliderEl.dataset.cursorProgress = this.dragProgress,
                    n.emit("cursor:progress", this.dragProgress)))
                }
                )),
                go(this, "onResize", (()=>{
                    const {left: e} = this.dom.itemWrap.getBoundingClientRect();
                    this.maxDragPos = -this.dom.itemWrap.scrollWidth - e + o.window.w - 50
                }
                )),
                this.sliderEl = e,
                this.dom = {
                    text: this.sliderEl.querySelector(".js-grid-slider-text"),
                    itemWrap: this.sliderEl.querySelector(".js-slider-items"),
                    items: this.sliderEl.querySelectorAll(".js-slider-item")
                },
                this.dragPos = 0,
                this.smoothDragPos = 0,
                this.dragProgress = 0,
                this.smoothDragProgress = 0,
                o.AssetLoader.loaded.then((()=>{
                    this.build(),
                    this.addEvents()
                }
                ))
            }
            build() {
                for (let e = 0; e < this.dom.items.length; e++)
                    this.dom.items[e]._originalZ = this.dom.items[e].dataset.z || 0,
                    this.dom.items[e]._glProps = {
                        "position.x": 0,
                        "position.z": this.dom.items[e]._originalZ,
                        uniforms: {
                            u_edgeFade: 1
                        }
                    };
                this.onResize()
            }
            addEvents() {
                n.on(o.events.MOUSEDRAG, this.onDrag),
                n.on(o.events.RESIZE, this.onResize),
                o.RAFCollection.add(this.onRaf, 4)
            }
            destroy() {
                n.off(o.events.MOUSEDRAG, this.onDrag),
                n.off(o.events.RESIZE, this.onResize),
                o.RAFCollection.remove(this.onRaf)
            }
        }
        class vo extends co {
            onEnter() {
                o.ASScroll.currentPos = 0,
                o.ASScroll.scrollTo(0),
                o.Project = new po,
                super.onEnter(),
                this.gridSliders = new f(fo),
                o.currentProjectMenuId = window.currentProjectMenuId,
                o.projectLightMode = document.body.classList.contains("dark"),
                o.PageLoader.hiddenPromise.then((()=>{
                    o.Audio.isPlaying("audio.backing") || (o.Audio.play({
                        key: "audio.backing",
                        fade: {
                            from: 0,
                            to: 1,
                            duration: 1
                        }
                    }),
                    o.Audio.filterTo({
                        key: "audio.backing",
                        duration: 1,
                        type: "lowpass",
                        from: {
                            frequency: 14e3
                        },
                        to: {
                            frequency: 160
                        }
                    }))
                }
                )),
                this.projectBuilt = new Promise((e=>{
                    Promise.all([o.AssetLoader.loaded, o.TextLoader.loaded]).then((()=>{
                        o.Project.build(),
                        e(),
                        o.ASScroll.on("scroll", o.Navigation.handleScroll)
                    }
                    ))
                }
                ))
            }
            onEnterCompleted() {
                super.onEnterCompleted(),
                o.ASScroll.enable({
                    newScrollElements: this.page,
                    reset: !0
                }),
                o.html.classList.remove("asscroll-disabled"),
                o.ASScroll.currentPos = 0,
                o.ASScroll.scrollTo(0)
            }
            onLeave() {
                super.onLeave(),
                o.ASScroll.off("scroll", o.Navigation.handleScroll),
                o.projectToProjectTransition || l.ZP.to(o.Gl.screenFxPass.uniforms.u_noiseOnly, {
                    value: 0,
                    ease: "power2.out",
                    duration: 1,
                    delay: 2
                })
            }
            onLeaveCompleted() {
                super.onLeaveCompleted(),
                o.Project.destroy(),
                this.gridSliders.destroy(),
                o.currentProjectMenuId = 0
            }
        }
        class xo extends co {
            onEnter() {
                o.World.firstLoad = o.Highway.firstLoad,
                this.page = this.wrap.lastElementChild,
                super.loadScripts(),
                o.World.load(),
                super.onEnter({
                    loadScripts: !1
                }),
                o.AssetLoader.loaded.then((()=>{
                    o.World.build()
                }
                )),
                o.WorldButton.hideBtn()
            }
            onEnterCompleted() {
                super.onEnterCompleted(),
                o.AssetLoader.loaded.then((()=>{
                    o.isIOS && o.World && o.World.sampleVideos()
                }
                )),
                o.Cursor.disable(),
                "notFound" === o.Highway.From.properties.slug && o.World.in(),
                o.Audio.isPlaying("audio.world-loop") || o.Audio.play({
                    key: "audio.world-loop",
                    fade: {
                        from: 0,
                        to: 1,
                        duration: 1
                    }
                })
            }
            onLeave() {
                super.onLeave(),
                o.Audio.fadeToStop({
                    key: "audio.world-loop",
                    duration: 2
                }),
                o.Audio.lerpSpeed("audio.world-loop", .5, 2e3),
                l.ZP.to(o.Gl.cssRenderer.domElement, {
                    autoAlpha: 0,
                    duration: .5,
                    ease: "power2.out"
                }),
                l.ZP.to(o.World.dom.introWrap, {
                    autoAlpha: 0,
                    duration: .5,
                    ease: "power2.out"
                })
            }
            onLeaveCompleted() {
                super.onLeaveCompleted(),
                o.World.destroy(),
                o.WorldButton.showBtn(),
                o.Cursor.enable()
            }
        }
        class yo extends co {
            onEnter() {
                super.onEnter(),
                o.Gl.composer.readBuffer.dispose(),
                o.Gl.screenFxPass.uniforms.u_noiseOnly.value = 1
            }
            onLeave() {
                super.onLeave(),
                l.ZP.to(o.Gl.screenFxPass.uniforms.u_noiseOnly, {
                    value: 0,
                    ease: "power2.out",
                    duration: 1,
                    delay: 2
                })
            }
        }
        class Po extends c.Z.Transition {
            in({from: e, to: t, trigger: s, done: i}) {
                o.AssetLoader.loaded.then((()=>{
                    o.PageLoader.hide().then((()=>{
                        i()
                    }
                    ))
                }
                ))
            }
            out({from: e, trigger: t, done: s}) {
                o.Highway.cached = o.Highway.cache.has(o.Highway.location.href),
                o.PageLoader.show().then((()=>{
                    e.parentNode.removeChild(e),
                    s()
                }
                ))
            }
        }
        class wo extends c.Z.Transition {
            in({from: e, to: t, trigger: s, done: i}) {
                this.fromProject ? o.AssetLoader.loaded.then((()=>{
                    o.World.renderPass.enabled = !0,
                    i(),
                    o.World.playIntro(),
                    o.PageLoader.hide()
                }
                )) : i()
            }
            out({from: e, trigger: t, done: s}) {
                o.Highway.cached = o.Highway.cache.has(o.Highway.location.href),
                l.ZP.timeline().call((()=>{
                    o.Audio.fadeToStop({
                        key: "audio.backing",
                        duration: 2
                    }),
                    o.Audio.lerpSpeed("audio.backing", .5, 2e3),
                    "project" !== e.dataset.routerView && o.Audio.play({
                        key: "audio.world_static"
                    })
                }
                )).call((()=>{
                    o.Audio.play({
                        key: "audio.world-loop",
                        fade: {
                            from: 0,
                            to: 1,
                            duration: 3
                        }
                    })
                }
                ), [], 1),
                "project" === e.dataset.routerView ? (this.fromProject = !0,
                o.PageLoader.show().then((()=>{
                    e.parentNode.removeChild(e),
                    s()
                }
                ))) : ("homeContact" === e.dataset.routerView && (o.HomeContact.savePass.enabled = !0,
                o.World.transitionPass.uniforms.u_fromScene.value = o.World.savePass.renderTarget.texture,
                o.World.transitionPass.uniforms.u_toScene.value = o.HomeContact.savePass.renderTarget.texture,
                l.ZP.to(o.HomeContact.options, {
                    cameraTranslateZ: -.09,
                    duration: 2.5,
                    ease: "power2.inOut"
                })),
                "projects" === e.dataset.routerView && (o.ProjectMenu.combinedSavePass.enabled = !0,
                o.World.transitionPass.uniforms.u_fromScene.value = o.World.savePass.renderTarget.texture,
                o.World.transitionPass.uniforms.u_toScene.value = o.ProjectMenu.combinedSavePass.renderTarget.texture,
                l.ZP.to(o.ProjectMenu.tweenParams, {
                    cameraZOffset: -1e3,
                    duration: 2.5,
                    ease: "power2.inOut"
                })),
                o.World.in().then((()=>{
                    e.parentNode.removeChild(e),
                    s()
                }
                )))
            }
        }
        class bo extends co {
            onFirstLoad() {
                super.onFirstLoad(),
                o.ProjectMenu.videosLoaded.then((()=>{
                    o.AssetLoader.loaded.then((()=>{
                        o.PageLoader.hiddenPromise.then((()=>{
                            o.HomeContact.isHome ? o.HomeContact.showHome().pause().progress(1) : o.HomeContact.showContact().pause().progress(1),
                            v.ZP.fromTo(o.HomeContact.options, {
                                cameraTranslateZ: .05
                            }, {
                                cameraTranslateZ: 0,
                                duration: 2,
                                ease: "power4.out"
                            }),
                            o.urlParams.has("homedemo") || v.ZP.to(o.HomeContact.homeTextMesh.material.uniforms.uProgress, {
                                value: 1,
                                duration: 4,
                                ease: "power4.out",
                                onStart: ()=>{
                                    o.HomeContact.textFluidSim.tweenMousePos({
                                        x: 0,
                                        y: 1
                                    }, {
                                        x: 1,
                                        y: 0
                                    }, 4, "power4.out")
                                }
                            }),
                            o.urlParams.has("homedemo") && (v.ZP.to(o.HomeContact.tweenParams, {
                                cameraPathProgress: 1,
                                duration: 3,
                                ease: "power4.inOut",
                                delay: 5
                            }),
                            v.ZP.to(o.HomeContact.homeTextMesh.material.uniforms.uOpacity, {
                                value: 1,
                                duration: 1,
                                ease: "power2.out"
                            }, 6.6),
                            v.ZP.to(o.HomeContact.homeTextMesh.material.uniforms.uProgress, {
                                value: 1,
                                duration: 4,
                                ease: "power4.out",
                                onStart: ()=>{
                                    o.HomeContact.textFluidSim.tweenMousePos({
                                        x: 0,
                                        y: 1
                                    }, {
                                        x: 1,
                                        y: 0
                                    }, 4, "power4.out")
                                }
                                ,
                                delay: 6.6
                            }),
                            v.ZP.fromTo(o.HomeContact.dom.viewProjectsBtn, {
                                autoAlpha: 0
                            }, {
                                autoAlpha: 1,
                                ease: "power2.out",
                                onComplete: ()=>{
                                    this.renderCss = !0
                                }
                                ,
                                delay: 7.3
                            }))
                        }
                        ))
                    }
                    ))
                }
                ))
            }
            onEnter() {
                o.HomeContact.firstLoad = o.Highway.firstLoad,
                o.PageLoader.hiddenPromise.then((()=>{
                    o.Audio.isPlaying("audio.backing") || o.Audio.play({
                        key: "audio.backing",
                        fade: {
                            from: 0,
                            to: 1,
                            duration: 1
                        }
                    })
                }
                )),
                super.onEnter(),
                o.AssetLoader.loaded.then((()=>{
                    "homeContact" === o.Highway.From.properties.slug && o.Highway.To && "homeContact" === o.Highway.To.properties.slug || (v.ZP.to(o.Gl.cssRenderer.domElement, {
                        autoAlpha: 1,
                        duration: .5,
                        ease: "power2.out"
                    }),
                    "notFound" === o.Highway.From.properties.slug && (o.HomeContact.enable(),
                    "/" === o.Highway.location.pathname ? (o.HomeContact.isHome = !0,
                    o.HomeContact.tweenParams.cameraPathProgress = 1,
                    o.HomeContact.showHome(!0)) : (o.HomeContact.isHome = !1,
                    o.HomeContact.tweenParams.cameraPathProgress = 0,
                    o.HomeContact.showContact(!0))))
                }
                ))
            }
            onLeave() {
                super.onLeave(),
                o.Highway.location.pathname.includes("contact") || null !== o.Highway.location.pathname.match(/^\/$/) || v.ZP.to(o.Gl.cssRenderer.domElement, {
                    autoAlpha: 0,
                    duration: 1,
                    ease: "power2.out"
                })
            }
            onLeaveCompleted() {
                super.onLeaveCompleted(),
                o.Highway.location.pathname.includes("contact") || null !== o.Highway.location.pathname.match(/^\/$/) || (o.HomeContact.hideUI(),
                o.HomeContact.destroy())
            }
        }
        class To extends c.Z.Transition {
            in({to: e, trigger: t, done: s}) {
                s()
            }
            out({from: e, trigger: t, done: s}) {
                if (o.Highway.cached = o.Highway.cache.has(o.Highway.location.href),
                "homeContact" === e.dataset.routerView && (v.ZP.to(o.HomeContact.tweenParams, {
                    cameraPathProgress: 1,
                    duration: 3,
                    ease: "power4.inOut"
                }),
                o.Audio.play({
                    key: "audio.contact_swoosh"
                }),
                o.HomeContact.showHome().then((()=>{
                    e.parentNode.removeChild(e),
                    s()
                }
                ))),
                "projects" === e.dataset.routerView && (o.HomeContact.transitionPass.uniforms.u_fromScene.value = o.HomeContact.savePass.renderTarget.texture,
                o.HomeContact.transitionPass.uniforms.u_toScene.value = o.ProjectMenu.combinedSavePass.renderTarget.texture,
                o.HomeContact.enable(),
                o.HomeContact.isHome = !0,
                o.HomeContact.tweenParams.cameraPathProgress = 1,
                o.HomeContact.showHome(!0),
                v.ZP.timeline({
                    defaults: {
                        duration: 3,
                        ease: "expo.inOut"
                    },
                    onStart: ()=>{
                        o.HomeContact.savePass.enabled = !0,
                        o.HomeContact.transitionPass.enabled = !0,
                        o.ProjectMenu.combinedSavePass.enabled = !0
                    }
                    ,
                    onComplete: ()=>{
                        o.HomeContact.savePass.enabled = !1,
                        o.HomeContact.transitionPass.enabled = !1,
                        o.ProjectMenu.savePass.enabled = !1,
                        o.ProjectMenu.renderPass.enabled = !1,
                        o.ProjectMenu.textRenderPass.enabled = !1,
                        o.ProjectMenu.combinePass.enabled = !1,
                        o.ProjectMenu.combinedSavePass.enabled = !1,
                        e.parentNode.removeChild(e),
                        s()
                    }
                }).fromTo(o.HomeContact.transitionPass.uniforms.u_progress, {
                    value: 1
                }, {
                    value: 0
                }, 0).fromTo(o.HomeContact.tweenParams, {
                    cameraYOffset: o.window.h / 2 * -5e-5
                }, {
                    cameraYOffset: 0
                }, "<").to(o.ProjectMenu.tweenParams, {
                    cameraYOffset: 2 * o.window.h
                }, "<").call((()=>{
                    o.Audio.play({
                        key: "audio.new_water_projects",
                        isInteraction: !0
                    }),
                    o.Audio.filterTo({
                        key: "audio.backing",
                        duration: 1800,
                        type: "lowpass",
                        to: {
                            frequency: 2e4
                        },
                        from: {
                            frequency: 160
                        }
                    })
                }
                ), [], .6)),
                "world" === e.dataset.routerView && (o.HomeContact.enable(),
                o.HomeContact.isHome = !0,
                o.HomeContact.tweenParams.cameraPathProgress = 1,
                o.HomeContact.showHome(!0),
                o.HomeContact.savePass.enabled = !0,
                o.World.transitionPass.uniforms.u_toScene.value = o.HomeContact.savePass.renderTarget.texture,
                o.Audio.play({
                    key: "audio.backing",
                    speed: .7,
                    fade: {
                        from: 0,
                        to: 1,
                        duration: 4
                    }
                }),
                o.Audio.lerpSpeed("audio.backing", 1, 2e3),
                v.ZP.fromTo(o.HomeContact.options, {
                    cameraTranslateZ: -.09
                }, {
                    cameraTranslateZ: 0,
                    duration: 2.5,
                    ease: "power2.inOut"
                }),
                v.ZP.delayedCall(.8, (()=>{
                    document.body.classList.remove("dark")
                }
                )),
                o.World.out().then((()=>{
                    e.parentNode.removeChild(e),
                    s(),
                    o.HomeContact.savePass.enabled = !1
                }
                ))),
                "project" === e.dataset.routerView) {
                    o.Project.transitioning = !0;
                    const t = o.Project.camera.position.y
                      , i = o.Gl.scene.fog.near
                      , n = o.Gl.scene.fog.far;
                    o.HomeContact.transitionPass.uniforms.u_fromScene.value = o.HomeContact.savePass.renderTarget.texture,
                    o.HomeContact.transitionPass.uniforms.u_toScene.value = null,
                    o.HomeContact.enable(),
                    o.HomeContact.isHome = !0,
                    o.HomeContact.tweenParams.cameraPathProgress = 1,
                    o.HomeContact.showHome(!0),
                    v.ZP.timeline({
                        defaults: {
                            duration: 1.5,
                            ease: "power4.inOut"
                        },
                        onComplete: ()=>{
                            o.HomeContact.savePass.enabled = !1,
                            o.HomeContact.transitionPass.enabled = !1,
                            o.Project.renderPass.enabled = !1,
                            v.ZP.set(o.ASScroll.containerElement, {
                                clearProps: "transform,opacity,visibility"
                            }),
                            o.Project.camera.position.y = t,
                            o.Gl.scene.fog.near = i,
                            o.Gl.scene.fog.far = n,
                            o.Gl.globalUniforms.fogNear.value = i,
                            o.Gl.globalUniforms.fogFar.value = n,
                            e.parentNode.removeChild(e),
                            s()
                        }
                    }).to(o.Project.camera.position, {
                        y: "+=" + o.window.h
                    }, 0).to([o.ASScroll.containerElement, o.Project.dom.headerClone], {
                        y: "+=" + o.window.h
                    }, 0).to([o.ASScroll.containerElement, o.Project.dom.headerClone], {
                        autoAlpha: 0,
                        duration: 1
                    }, "<").to(o.Gl.scene.fog, {
                        near: "-=1000",
                        far: "-=1000"
                    }, "<").to([o.Gl.globalUniforms.fogNear, o.Gl.globalUniforms.fogFar], {
                        value: "-=1000"
                    }, "<").call((()=>{
                        o.HomeContact.savePass.enabled = !0,
                        o.HomeContact.transitionPass.enabled = !0
                    }
                    ), null, ">-0.5").fromTo(o.HomeContact.transitionPass.uniforms.u_progress, {
                        value: 1
                    }, {
                        value: 0,
                        ease: "power4.out"
                    }, "<").fromTo(o.HomeContact.tweenParams, {
                        cameraYOffset: o.window.h / 2 * -5e-5
                    }, {
                        cameraYOffset: 0,
                        ease: "power4.out"
                    }, "<").call((()=>{
                        o.Audio.play({
                            key: "audio.new_water_projects",
                            isInteraction: !0
                        }),
                        o.Audio.filterTo({
                            key: "audio.backing",
                            duration: 1800,
                            type: "lowpass",
                            to: {
                                frequency: 2e4
                            },
                            from: {
                                frequency: 160
                            }
                        })
                    }
                    ), [], .6)
                }
            }
        }
        class So extends c.Z.Transition {
            in({to: e, trigger: t, done: s}) {
                s()
            }
            out({from: e, trigger: t, done: s}) {
                if (o.Highway.cached = o.Highway.cache.has(o.Highway.location.href),
                "homeContact" === e.dataset.routerView && (v.ZP.to(o.HomeContact.tweenParams, {
                    cameraPathProgress: 0,
                    duration: 3,
                    ease: "power4.inOut"
                }),
                o.Audio.play({
                    key: "audio.contact_swoosh"
                }),
                o.HomeContact.showContact().then((()=>{
                    e.parentNode.removeChild(e),
                    s()
                }
                ))),
                "projects" === e.dataset.routerView && (o.HomeContact.transitionPass.uniforms.u_fromScene.value = o.HomeContact.savePass.renderTarget.texture,
                o.HomeContact.transitionPass.uniforms.u_toScene.value = o.ProjectMenu.combinedSavePass.renderTarget.texture,
                o.HomeContact.enable(),
                o.HomeContact.isHome = !1,
                o.HomeContact.tweenParams.cameraPathProgress = 0,
                v.ZP.timeline({
                    defaults: {
                        duration: 3,
                        ease: "expo.inOut"
                    },
                    onStart: ()=>{
                        o.HomeContact.savePass.enabled = !0,
                        o.HomeContact.transitionPass.enabled = !0,
                        o.ProjectMenu.combinedSavePass.enabled = !0
                    }
                    ,
                    onComplete: ()=>{
                        o.HomeContact.savePass.enabled = !1,
                        o.HomeContact.transitionPass.enabled = !1,
                        o.ProjectMenu.savePass.enabled = !1,
                        o.ProjectMenu.renderPass.enabled = !1,
                        o.ProjectMenu.textRenderPass.enabled = !1,
                        o.ProjectMenu.combinePass.enabled = !1,
                        o.ProjectMenu.combinedSavePass.enabled = !1,
                        e.parentNode.removeChild(e),
                        s()
                    }
                }).fromTo(o.HomeContact.transitionPass.uniforms.u_progress, {
                    value: 1
                }, {
                    value: 0
                }, 0).fromTo(o.HomeContact.tweenParams, {
                    cameraYOffset: o.window.h / 2 * -5e-5
                }, {
                    cameraYOffset: 0
                }, "<").to(o.ProjectMenu.tweenParams, {
                    cameraYOffset: 2 * o.window.h
                }, "<").call((()=>{
                    o.HomeContact.showContact(!0)
                }
                ), null, 1).call((()=>{
                    o.Audio.play({
                        key: "audio.new_water_projects",
                        isInteraction: !0
                    }),
                    o.Audio.filterTo({
                        key: "audio.backing",
                        duration: 1800,
                        type: "lowpass",
                        to: {
                            frequency: 2e4
                        },
                        from: {
                            frequency: 160
                        }
                    })
                }
                ), [], .6)),
                "world" === e.dataset.routerView && (o.HomeContact.enable(),
                o.HomeContact.isHome = !1,
                o.HomeContact.tweenParams.cameraPathProgress = 0,
                o.HomeContact.savePass.enabled = !0,
                o.World.transitionPass.uniforms.u_toScene.value = o.HomeContact.savePass.renderTarget.texture,
                o.Audio.play({
                    key: "audio.backing",
                    speed: .7,
                    fade: {
                        from: 0,
                        to: 1,
                        duration: 4
                    }
                }),
                o.Audio.lerpSpeed("audio.backing", 1, 2e3),
                v.ZP.fromTo(o.HomeContact.options, {
                    cameraTranslateZ: -.09
                }, {
                    cameraTranslateZ: 0,
                    duration: 2.5,
                    ease: "power2.inOut"
                }),
                v.ZP.delayedCall(.8, (()=>{
                    document.body.classList.remove("dark"),
                    o.HomeContact.showContact(!0)
                }
                )),
                o.World.out().then((()=>{
                    e.parentNode.removeChild(e),
                    s(),
                    o.HomeContact.savePass.enabled = !1
                }
                ))),
                "project" === e.dataset.routerView) {
                    o.Project.transitioning = !0;
                    const t = o.Project.camera.position.y
                      , i = o.Gl.scene.fog.near
                      , n = o.Gl.scene.fog.far;
                    o.HomeContact.transitionPass.uniforms.u_fromScene.value = o.HomeContact.savePass.renderTarget.texture,
                    o.HomeContact.transitionPass.uniforms.u_toScene.value = null,
                    o.HomeContact.enable(),
                    o.HomeContact.isHome = !1,
                    o.HomeContact.tweenParams.cameraPathProgress = 0,
                    v.ZP.timeline({
                        defaults: {
                            duration: 1.5,
                            ease: "power4.inOut"
                        },
                        onComplete: ()=>{
                            o.HomeContact.savePass.enabled = !1,
                            o.HomeContact.transitionPass.enabled = !1,
                            o.Project.renderPass.enabled = !1,
                            v.ZP.set(o.ASScroll.containerElement, {
                                clearProps: "transform,opacity,visibility"
                            }),
                            o.Project.camera.position.y = t,
                            o.Gl.scene.fog.near = i,
                            o.Gl.scene.fog.far = n,
                            o.Gl.globalUniforms.fogNear.value = i,
                            o.Gl.globalUniforms.fogFar.value = n,
                            e.parentNode.removeChild(e),
                            s()
                        }
                    }).to(o.Project.camera.position, {
                        y: "+=" + o.window.h
                    }, 0).to([o.ASScroll.containerElement, o.Project.dom.headerClone], {
                        y: "+=" + o.window.h
                    }, 0).to([o.ASScroll.containerElement, o.Project.dom.headerClone], {
                        autoAlpha: 0,
                        duration: 1
                    }, "<").to(o.Gl.scene.fog, {
                        near: "-=1000",
                        far: "-=1000"
                    }, "<").to([o.Gl.globalUniforms.fogNear, o.Gl.globalUniforms.fogFar], {
                        value: "-=1000"
                    }, "<").call((()=>{
                        o.HomeContact.savePass.enabled = !0,
                        o.HomeContact.transitionPass.enabled = !0
                    }
                    ), null, ">-0.5").fromTo(o.HomeContact.transitionPass.uniforms.u_progress, {
                        value: 1
                    }, {
                        value: 0,
                        ease: "power4.out"
                    }, "<").fromTo(o.HomeContact.tweenParams, {
                        cameraYOffset: o.window.h / 2 * -5e-5
                    }, {
                        cameraYOffset: 0,
                        ease: "power4.out"
                    }, "<").call((()=>{
                        o.HomeContact.showContact(!0)
                    }
                    ), null, 1).call((()=>{
                        o.Audio.play({
                            key: "audio.new_water_projects",
                            isInteraction: !0
                        }),
                        o.Audio.filterTo({
                            key: "audio.backing",
                            duration: 1800,
                            type: "lowpass",
                            to: {
                                frequency: 2e4
                            },
                            from: {
                                frequency: 160
                            }
                        })
                    }
                    ), [], .6)
                }
            }
        }
        class Mo extends c.Z.Transition {
            in({to: e, trigger: t, done: s}) {
                this.fromProject && (o.isTouch || o.Gl.fluidSim.enable()),
                s()
            }
            out({from: e, trigger: t, done: s}) {
                if (o.Highway.cached = o.Highway.cache.has(o.Highway.location.href),
                this.fromProject = !1,
                "homeContact" === e.dataset.routerView && (o.HomeContact.transitionPass.uniforms.u_fromScene.value = o.HomeContact.savePass.renderTarget.texture,
                o.HomeContact.transitionPass.uniforms.u_toScene.value = o.ProjectMenu.combinedSavePass.renderTarget.texture,
                o.ProjectMenu.hasAnimatedIn = !0,
                o.ProjectMenu.allowControl = !1,
                o.ProjectMenu.tweenParams.smoothScrollPos = 1.5 * -o.ProjectMenu.farClip,
                o.ProjectMenu.tweenParams.smoothArchPos = 1.5 * -o.ProjectMenu.farClip,
                o.ProjectMenu.tweenParams.smoothGodRayPos = 1.5 * -o.ProjectMenu.farClip,
                o.ProjectMenu.scene.fog.color.set(o.ProjectMenu.activeProject.bgColor),
                o.Gl.globalUniforms.fogColor.value.copy(o.ProjectMenu.scene.fog.color),
                o.Gl.globalUniforms.fogNear.value = o.ProjectMenu.scene.fog.near,
                o.Gl.globalUniforms.fogFar.value = o.ProjectMenu.scene.fog.far,
                o.isTouch || o.Gl.fluidSim.enable(),
                o.ProjectMenu.addEvents(),
                v.ZP.timeline({
                    defaults: {
                        duration: 3,
                        ease: "power4.inOut"
                    },
                    onStart: ()=>{
                        o.HomeContact.savePass.enabled = !0,
                        o.HomeContact.transitionPass.enabled = !0,
                        o.ProjectMenu.renderPass.enabled = !0,
                        o.ProjectMenu.savePass.enabled = !0,
                        o.ProjectMenu.textRenderPass.enabled = !0,
                        o.ProjectMenu.combinePass.enabled = !0,
                        o.ProjectMenu.combinedSavePass.enabled = !0,
                        o.ProjectMenu.addPreSceneEvents()
                    }
                    ,
                    onComplete: ()=>{
                        o.HomeContact.savePass.enabled = !1,
                        o.HomeContact.transitionPass.enabled = !1,
                        o.ProjectMenu.combinedSavePass.enabled = !1,
                        o.ProjectMenu.allowControl = !0,
                        e.parentNode.removeChild(e),
                        s()
                    }
                }).fromTo(o.HomeContact.transitionPass.uniforms.u_progress, {
                    value: 0
                }, {
                    value: 1
                }, 0).fromTo(o.HomeContact.tweenParams, {
                    cameraYOffset: 0
                }, {
                    cameraYOffset: o.window.h / 2 * -5e-5
                }, "<").fromTo(o.ProjectMenu.tweenParams, {
                    cameraYOffset: 2 * o.window.h
                }, {
                    cameraYOffset: 0
                }, "<").to(o.HomeContact.options, {
                    cameraTranslateZ: -.09
                }, "<").fromTo([o.ProjectMenu.projectText.children[o.ProjectMenu.activeProjectIndex].children[0].material, o.ProjectMenu.projectText.children[o.ProjectMenu.activeProjectIndex].children[1].material, o.ProjectMenu.selectedProjects.material], {
                    opacity: 0
                }, {
                    opacity: 1,
                    duration: 1.5
                }, "<1.5").call((()=>{
                    o.Audio.play({
                        key: "audio.new_water_projects",
                        isInteraction: !0
                    }),
                    o.Audio.filterTo({
                        key: "audio.backing",
                        duration: 1800,
                        type: "lowpass",
                        from: {
                            frequency: 14e3
                        },
                        to: {
                            frequency: 160
                        }
                    })
                }
                ), [], .6),
                o.ProjectMenu.introScrollTween = v.ZP.to(o.ProjectMenu.tweenParams, {
                    smoothScrollPos: o.ProjectMenu.initialScrollPos,
                    smoothArchPos: o.ProjectMenu.initialScrollPos,
                    smoothGodRayPos: o.ProjectMenu.initialScrollPos,
                    delay: 1.5,
                    duration: 2,
                    ease: "expo.out"
                })),
                "world" === e.dataset.routerView && (o.ProjectMenu.resetState(o.currentProjectMenuId, !1),
                o.ProjectMenu.renderPass.enabled = !0,
                o.ProjectMenu.savePass.enabled = !0,
                o.ProjectMenu.textRenderPass.enabled = !0,
                o.ProjectMenu.combinePass.enabled = !0,
                o.ProjectMenu.combinedSavePass.enabled = !0,
                o.ProjectMenu.addPreSceneEvents(),
                o.World.transitionPass.uniforms.u_toScene.value = o.ProjectMenu.combinedSavePass.renderTarget.texture,
                o.ProjectMenu.hasAnimatedIn = !0,
                o.ProjectMenu.allowControl = !1,
                o.ProjectMenu.scene.fog.color.set(o.ProjectMenu.activeProject.bgColor),
                o.Gl.globalUniforms.fogColor.value.copy(o.ProjectMenu.scene.fog.color),
                o.Gl.globalUniforms.fogNear.value = o.ProjectMenu.scene.fog.near,
                o.Gl.globalUniforms.fogFar.value = o.ProjectMenu.scene.fog.far,
                o.isTouch || o.Gl.fluidSim.enable(),
                o.ProjectMenu.addEvents(),
                v.ZP.fromTo(o.ProjectMenu.tweenParams, {
                    cameraZOffset: -1e3
                }, {
                    cameraZOffset: 0,
                    duration: 2.5,
                    ease: "power2.inOut"
                }),
                o.World.out().then((()=>{
                    e.parentNode.removeChild(e),
                    o.Audio.isPlaying("audio.backing") || (o.Audio.play({
                        key: "audio.backing",
                        fade: {
                            from: 0,
                            to: 1,
                            duration: 1
                        }
                    }),
                    o.Audio.filterTo({
                        key: "audio.backing",
                        duration: 1,
                        type: "lowpass",
                        from: {
                            frequency: 14e3
                        },
                        to: {
                            frequency: 160
                        }
                    })),
                    s(),
                    o.ProjectMenu.combinedSavePass.enabled = !1,
                    o.ProjectMenu.allowControl = !0
                }
                ))),
                "project" === e.dataset.routerView) {
                    this.fromProject = !0,
                    o.ProjectMenu.resetState(o.currentProjectMenuId, !0),
                    o.ProjectMenu.hasAnimatedIn = !0,
                    o.ProjectMenu.renderPass.enabled = !0,
                    o.ProjectMenu.savePass.enabled = !0,
                    o.ProjectMenu.textRenderPass.enabled = !0,
                    o.ProjectMenu.combinePass.enabled = !0,
                    o.ProjectMenu.transitionPass.enabled = !0,
                    o.ProjectMenu.addPreSceneEvents(),
                    o.ProjectMenu.allowControl = !1,
                    o.ProjectMenu.transitionPass.uniforms.u_bgColor.value.copy(o.Project.backgroundColorGl),
                    o.Project.transitioning = !0,
                    o.ProjectMenu.addEvents();
                    const t = o.Project.camera.position.x;
                    v.ZP.timeline({
                        defaults: {
                            duration: 1.5,
                            ease: "power4.inOut"
                        },
                        onComplete: ()=>{
                            v.ZP.set(o.ASScroll.containerElement, {
                                clearProps: "transform,opacity,visibility"
                            }),
                            o.Project.camera.position.x = t,
                            o.ProjectMenu.allowControl = !0,
                            e.parentNode.removeChild(e),
                            s()
                        }
                    }).set([o.ProjectMenu.scene.background, o.ProjectMenu.scene.fog.color, o.ProjectMenu.archMaterial.color, o.ProjectMenu.floorMaterial.color], {
                        r: o.Project.backgroundColorGl.r,
                        g: o.Project.backgroundColorGl.g,
                        b: o.Project.backgroundColorGl.b
                    }, 0).to(o.Project.camera.position, {
                        x: .25 * -o.window.w
                    }, 0).to([o.ASScroll.containerElement, o.Project.dom.headerClone], {
                        x: .25 * o.window.w
                    }, "<").to(o.Gl.fluidPass.uniforms.uOpacity, {
                        value: 0,
                        duration: .5,
                        ease: "power2.out"
                    }, "<").to([o.ASScroll.containerElement, o.Project.dom.headerClone], {
                        autoAlpha: 0,
                        duration: 1
                    }, "<0.17").to(o.Project.scene.fog, {
                        near: "-=1000",
                        far: "-=1000",
                        duration: 1
                    }, "<").to(o.Gl.globalUniforms.fogNear, {
                        value: "-=1000",
                        duration: 1
                    }, "<").to(o.Gl.globalUniforms.fogFar, {
                        value: "-=1000",
                        duration: 1
                    }, "<").call((()=>{
                        o.Project.renderPass.enabled = !1,
                        o.ProjectMenu.scene.fog.color.set(o.ProjectMenu.activeProject.bgColor),
                        o.Gl.globalUniforms.fogColor.value.copy(o.ProjectMenu.scene.fog.color),
                        o.Gl.globalUniforms.fogNear.value = o.ProjectMenu.scene.fog.near,
                        o.Gl.globalUniforms.fogFar.value = o.ProjectMenu.scene.fog.far
                    }
                    ), null, ">").fromTo(o.ProjectMenu.tweenParams, {
                        cameraXOffset: 1400
                    }, {
                        cameraXOffset: 0,
                        duration: 2
                    }, ">-0.05").fromTo(o.ProjectMenu.transitionPass.uniforms.u_progress, {
                        value: 1
                    }, {
                        value: 0,
                        duration: 1.7
                    }, "<").fromTo([o.ProjectMenu.projectText.children[o.ProjectMenu.activeProjectIndex].children[0].material, o.ProjectMenu.projectText.children[o.ProjectMenu.activeProjectIndex].children[1].material, o.ProjectMenu.selectedProjects.material], {
                        opacity: 0
                    }, {
                        opacity: 1,
                        duration: 1.5
                    }, "<1").call((()=>{
                        o.ProjectMenu.selectedProjects.material.color.copy(o.ProjectMenu.projects.children[o.ProjectMenu.activeProjectIndex].lightMode ? o.ProjectMenu.colorWhite : o.ProjectMenu.colorBlack)
                    }
                    ), null, "<")
                }
            }
        }
        class Co extends c.Z.Transition {
            in({from: e, to: t, trigger: s, done: i}) {
                const r = function() {
                    Promise.all([o.AssetLoader.loaded, o.TextLoader.loaded, o.TaskScheduler.queueFinished, o.Highway.To.projectBuilt]).then((()=>{
                        this.loaded = !0,
                        this.outTimeline.then((()=>{
                            clearTimeout(this.showLoaderTimeout),
                            this.loaderVisible ? (o.ProjectMenu.transitionPass.enabled = !1,
                            o.ProjectMenu.transitionPass.clear = !1,
                            o.ProjectMenu.transitionPass.uniforms.u_opacity.value = 1,
                            o.NakedLoader.hide()) : o.ProjectMenu.destroy(),
                            o.Project.resume(),
                            v.ZP.timeline({
                                onComplete: ()=>{
                                    o.ProjectMenu.options.cameraMovementMultiplier = 1,
                                    i()
                                }
                            }).from(o.Project.camera.position, {
                                x: .25 * -o.window.w,
                                ease: "power2.out",
                                duration: 1
                            }, "<").from([o.ASScroll.containerElement, o.Project.dom.headerClone], {
                                x: .25 * o.window.w,
                                ease: "power2.out",
                                duration: 1,
                                clearProps: "transform"
                            }, "<").from([o.ASScroll.containerElement, o.Project.dom.headerClone], {
                                autoAlpha: 0,
                                duration: .8,
                                ease: "power2.out"
                            }, "<").fromTo(o.Project.scene.fog, {
                                near: "-=1000",
                                far: "-=1000"
                            }, {
                                near: o.Project.scene.fog.origVals.near,
                                far: o.Project.scene.fog.origVals.far,
                                duration: .8
                            }, "<").fromTo(o.Gl.globalUniforms.fogNear, {
                                value: "-=1000"
                            }, {
                                value: o.Project.scene.fog.origVals.near,
                                duration: .8
                            }, "<").fromTo(o.Gl.globalUniforms.fogFar, {
                                value: "-=1000"
                            }, {
                                value: o.Project.scene.fog.origVals.far,
                                duration: .8
                            }, "<").call((()=>{
                                o.Project.introTimeline.play(),
                                o.Highway.From.isTransitioningToProject = !1
                            }
                            ), null, "<")
                        }
                        ))
                    }
                    )),
                    n.off("firstObservation", r)
                }
                .bind(this);
                n.on("firstObservation", r)
            }
            out({from: e, trigger: t, done: s}) {
                var i, n, r;
                o.Highway.From.isTransitioningToProject = !0,
                this.loaded = !1,
                this.loaderVisible = !1,
                o.ProjectMenu.transitionPass.enabled = !0,
                o.ProjectMenu.transitionPass.uniforms.u_bgColor.value.copy(o.ProjectMenu.scene.background),
                "projects" !== e.dataset.routerView && o.Audio.isPlaying("audio.backing") && o.Audio.filterTo({
                    key: "audio.backing",
                    duration: 1,
                    type: "lowpass",
                    from: {
                        frequency: 14e3
                    },
                    to: {
                        frequency: 160
                    }
                }),
                null === (i = o.ProjectMenu.inTimeline) || void 0 === i || i.clear(),
                null === (n = o.ProjectMenu.projectTextTimeline) || void 0 === n || n.clear(),
                null === (r = o.ProjectMenu.listToggleTimeline) || void 0 === r || r.progress(1),
                o.ProjectMenu.allowControl = !1,
                this.outTimeline = v.ZP.timeline({
                    defaults: {
                        duration: 2,
                        ease: "power4.inOut"
                    },
                    onComplete: ()=>{
                        this.showLoaderTimeout = setTimeout((()=>{
                            this.loaderVisible = !0;
                            const e = o.ProjectMenu.scene.background.getHexString();
                            v.ZP.set(o.body, {
                                backgroundColor: "#" + e
                            }),
                            o.ProjectMenu.destroy(),
                            o.ProjectMenu.transitionPass.enabled = !0,
                            o.ProjectMenu.transitionPass.clear = !0,
                            o.ProjectMenu.transitionPass.uniforms.u_opacity.value = 0,
                            o.NakedLoader.show(e)
                        }
                        ), 500)
                    }
                }).to(o.ProjectMenu.tweenParams, {
                    cameraXOffset: 1400
                }, "<").fromTo(o.ProjectMenu.transitionPass.uniforms.u_progress, {
                    value: 0
                }, {
                    value: 1,
                    duration: 1.7
                }, "<").to(o.ProjectMenu.tweenParams, {
                    velocity: 0,
                    duration: .5,
                    onComplete: ()=>{
                        o.ProjectMenu.updateScreenFx = !1
                    }
                }, "<").to(o.Gl.screenFxPass.uniforms.u_noiseOnly, {
                    value: 1,
                    duration: 1
                }, "<").to(o.ProjectMenu.infinityProgress.dom.wrapper, {
                    autoAlpha: 0,
                    duration: 1
                }, "<").call((()=>{
                    e.parentNode.removeChild(e),
                    s()
                }
                ), null, 1.2)
            }
        }
        function _o(e) {
            if (e) {
                if (Array.isArray(e))
                    return e.forEach((e=>_o(e))),
                    e;
                if (e instanceof i.Tme)
                    _o(e.geometry),
                    _o(e.material),
                    _o(e.children);
                else if (e instanceof i.F5T) {
                    for (const t of Object.values(e))
                        t instanceof i.xEZ && _o(t);
                    if (e.uniforms)
                        for (const t of Object.values(e.uniforms))
                            if (t) {
                                const e = t.value;
                                (e instanceof i.xEZ || Array.isArray(e)) && _o(e)
                            }
                }
                (e instanceof i.Tme || e instanceof dt) && e.parent && e.parent.remove(e),
                e.dispose && e.dispose()
            }
        }
        class jo extends c.Z.Transition {
            in({from: e, to: t, trigger: s, done: i}) {
                if (o.ASScroll.scrollTo(0),
                o.ASScroll.currentPos = 0,
                o.projectToProjectTransition) {
                    function r() {
                        this.title.visible = !1,
                        this.model.visible = !1,
                        this.transitionPlane.visible = !1,
                        _o(this.title),
                        _o(this.model),
                        _o(this.transitionPlane),
                        n.off("firstObservation", a)
                    }
                    o.projectToProjectTransition = !1;
                    const a = r.bind(this);
                    n.on("firstObservation", a),
                    o.Highway.To.projectBuilt.then((()=>{
                        clearTimeout(this.showLoaderTimeout),
                        this.loaderVisible && (o.NakedLoader.hide(!0),
                        v.ZP.to(o.Gl.fluidPass.uniforms.uOpacity, {
                            value: .03
                        })),
                        i()
                    }
                    ))
                } else
                    o.AssetLoader.loaded.then((()=>{
                        o.PageLoader.hide().then((()=>{
                            i()
                        }
                        ))
                    }
                    ))
            }
            out({from: e, trigger: t, done: s}) {
                if (o.Project.transitioning)
                    this.loaderVisible = !1,
                    o.Dom2Webgl.resourceTracker.untrack(o.Project.nextModel),
                    o.Dom2Webgl.resourceTracker.untrack(o.Project.nextTitle),
                    o.Dom2Webgl.resourceTracker.untrack(o.Project.transitionPlane),
                    this.title = o.Project.nextTitle,
                    this.model = o.Project.nextModel,
                    this.transitionPlane = o.Project.transitionPlane,
                    this.nextBackgroundColorGl = o.Project.nextBackgroundColorGl,
                    this.keepScrollingEl = o.Project.keepScrolling.domEl,
                    v.ZP.timeline({
                        defaults: {
                            duration: .7,
                            ease: "power3.inOut"
                        },
                        onComplete: ()=>{
                            this.title.updatePosition = !1,
                            this.model.updatePosition = !1,
                            this.transitionPlane.updatePosition = !1,
                            e.parentNode.removeChild(e),
                            s()
                        }
                    }).to([o.Project.transitionPlane.item.material.uniforms.u_progress, o.Project.keepScrolling.item.material.uniforms.u_progress, o.Project.footerNext.item.material.uniforms.u_progress, o.Project.nextTitle.item.material.uniforms.u_progress, o.Project.nextModel.item.children[0].material.uniforms.uTransitionProgress, o.Project.scrollProgress.item.material.uniforms.u_progress], {
                        value: 1
                    }, 0).to([o.Project.transitionPlane.item.material.uniforms.u_adjust, o.Project.keepScrolling.item.material.uniforms.u_adjust, o.Project.footerNext.item.material.uniforms.u_adjust, o.Project.nextTitle.item.material.uniforms.u_adjust, o.Project.scrollProgress.item.material.uniforms.u_adjust, o.Project.transitionPlane.item.material.uniforms.u_velo, o.Project.keepScrolling.item.material.uniforms.u_velo, o.Project.footerNext.item.material.uniforms.u_velo, o.Project.nextTitle.item.material.uniforms.u_velo, o.Project.scrollProgress.item.material.uniforms.u_velo], {
                        value: 0
                    }, 0).to(o.Project.footerContentTween, {
                        progress: 1
                    }, 0).to(o.Project.keepScrolling.glyphPositions, {
                        minY: "+=" + 1.1 * o.Project.keepScrolling.fontSize,
                        maxY: "+=" + 1.1 * o.Project.keepScrolling.fontSize,
                        stagger: .03,
                        onUpdate: ()=>{
                            o.Project.keepScrolling.updateGlyphPositions()
                        }
                    }, 0).to(o.Project.scrollProgress.scale, {
                        x: 0
                    }, 0).to(o.Gl.globalUniforms.fogColor.value, {
                        r: o.Project.nextBackgroundColorGl.r,
                        g: o.Project.nextBackgroundColorGl.g,
                        b: o.Project.nextBackgroundColorGl.b
                    }, 0).call((()=>{
                        this.showLoaderTimeout = setTimeout((()=>{
                            this.loaderVisible = !0;
                            const e = this.nextBackgroundColorGl.getHexString();
                            v.ZP.set(o.body, {
                                backgroundColor: "#" + e
                            }),
                            o.Gl.fluidPass.uniforms.uOpacity.value = 0,
                            this.transitionPlane.visible = !1,
                            o.NakedLoader.show(e, !0, this.keepScrollingEl)
                        }
                        ), 500)
                    }
                    ), null, .5).call((()=>{
                        "1" === g(".js-footer").dataset.nextLightMode ? document.body.classList.add("dark") : document.body.classList.remove("dark")
                    }
                    ), null, .3);
                else {
                    const t = o.Project.camera.position.z;
                    v.ZP.timeline({
                        defaults: {
                            duration: 1.5,
                            ease: "power4.inOut"
                        },
                        onComplete: ()=>{
                            v.ZP.set(o.ASScroll.containerElement, {
                                clearProps: "transform,opacity,visibility"
                            }),
                            o.Project.camera.position.z = t,
                            e.parentNode.removeChild(e),
                            s()
                        }
                    }).to(o.Project.camera.position, {
                        z: 2.1 * o.Project.camera.position.z
                    }, 0).to([o.ASScroll.containerElement, o.Project.dom.headerClone], {
                        scale: .4
                    }, "<").to([o.ASScroll.containerElement, o.Project.dom.headerClone], {
                        autoAlpha: 0,
                        duration: 1
                    }, "<").call((()=>{
                        o.PageLoader.show()
                    }
                    ), null, .2)
                }
            }
        }
        class Ao extends c.Z.Transition {
            in({from: e, to: t, trigger: s, done: i}) {
                o.AssetLoader.loaded.then((()=>{
                    o.PageLoader.hide().then((()=>{
                        i()
                    }
                    ))
                }
                ))
            }
            out({from: e, trigger: t, done: s}) {
                o.Highway.cached = o.Highway.cache.has(o.Highway.location.href),
                o.PageLoader.show().then((()=>{
                    o.Audio.isPlaying("audio.backing") && o.Audio.filterTo({
                        key: "audio.backing",
                        duration: 1800,
                        type: "lowpass",
                        from: {
                            frequency: 14e3
                        },
                        to: {
                            frequency: 160
                        }
                    }),
                    e.parentNode.removeChild(e),
                    s()
                }
                ))
            }
        }
        class Lo extends co {
            onEnter() {
                const e = o.urlParams;
                let t;
                if (e.has("ktx"))
                    t = e.get("ktx");
                else {
                    if (!window.ktxUrl)
                        return;
                    t = window.ktxUrl
                }
                o.AssetLoader.loadKtxTexture(t).then((e=>{
                    const t = new i.Kj0(new i._12,new i.vBJ({
                        map: e
                    }));
                    window.ktxSize ? t.scale.set(window.ktxSize[0], window.ktxSize[1], 1) : t.scale.set(1024, 1024, 1),
                    o.Gl.scene.add(t)
                }
                )),
                super.onEnter(),
                this.renderPass = new Vs.C(o.Gl.scene,o.Gl.camera),
                o.Gl.composerPasses.add(this.renderPass, 20),
                o.Gl.screenFxPass.enabled = !1
            }
        }
        class Eo extends c.Z.Core {
            constructor() {
                super({
                    renderers: {
                        default: co,
                        homeContact: bo,
                        projects: uo,
                        project: vo,
                        world: xo,
                        notFound: yo,
                        ktxPreview: Lo
                    },
                    transitions: {
                        default: Po,
                        contextual: {
                            default: Po,
                            homeToProject: Ao,
                            toWorld: wo,
                            toHome: To,
                            toContact: So,
                            toProjectMenu: Mo,
                            toProject: Co,
                            projectToProject: jo
                        }
                    }
                }),
                this.addContextualRoute("/", "/contact/", "toContact"),
                this.addContextualRoute("/", "/world/", "toWorld"),
                this.addContextualRoute("/", "/projects/", "toProjectMenu"),
                this.addContextualRoute("/contact/", "/", "toHome"),
                this.addContextualRoute("/contact/", "/world/", "toWorld"),
                this.addContextualRoute("/contact/", "/projects/", "toProjectMenu"),
                this.addContextualRoute("/world/", "/", "toHome"),
                this.addContextualRoute("/world/", "/contact/", "toContact"),
                this.addContextualRoute("/world/", "/projects/", "toProjectMenu"),
                this.addContextualRoute("/world/", "/projects/.+", "default"),
                this.addContextualRoute("/projects/", "/", "toHome"),
                this.addContextualRoute("/projects/", "/contact/", "toContact"),
                this.addContextualRoute("/projects/", "/world/", "toWorld"),
                this.addContextualRoute("/projects/", "/projects/.+", "toProject"),
                this.addContextualRoute("/projects/.+", "/", "toHome"),
                this.addContextualRoute("/projects/.+", "/contact/", "toContact"),
                this.addContextualRoute("/projects/.+", "/world/", "toWorld"),
                this.addContextualRoute("/projects/.+", "/projects/", "toProjectMenu"),
                this.addContextualRoute("/projects/.+", "/projects/.+", "projectToProject"),
                this.addContextualRoute("/", "/projects/.+", "homeToProject"),
                this.addContextualRoute("/contact/", "/projects/.+", "homeToProject"),
                this.cached = !1,
                this.on("NAVIGATE_IN", this.onNavigateIn),
                this.on("NAVIGATE_END", this.onNavigateEnd),
                this.onNavigateIn({
                    to: !1,
                    location: window.location
                })
            }
            onNavigateIn({to: e, location: t}) {
                e && (document.body.className = e.page.body.className),
                o.isTouch && document.body.classList.add("is-touch")
            }
            onNavigateEnd({from: e, to: t, location: s}) {
                "undefined" != typeof gtag && (gtag("js", new Date),
                gtag("config", "UA-138901605-1", {
                    page_path: s.pathname,
                    page_title: t.page.title,
                    page_location: s.href
                }))
            }
            addContextualRoute(e, t, s) {
                this.router || (this.router = {}),
                this.router[e] || (this.router[e] = []),
                this.router[e].push({
                    toPattern: t,
                    transition: s
                })
            }
            getContextualFromRouter(e, t) {
                if (e !== t)
                    for (const s in this.router)
                        if (e.match(new RegExp(`^${s}$`))) {
                            for (let e = 0; e < this.router[s].length; e++)
                                if (t.match(new RegExp(`^${this.router[s][e].toPattern}$`))) {
                                    const t = this.router[s][e].transition;
                                    this.Contextual = this.Transitions.contextual[t].prototype,
                                    this.Contextual.name = t;
                                    break
                                }
                            break
                        }
            }
            popState() {
                if (this.popping)
                    return window.history.pushState(this.location, "", this.location.href),
                    !1;
                this.trigger = "popstate",
                this.Contextual = !1;
                const e = this.Helpers.getLocation(window.location.href);
                this.getContextualFromRouter(this.location.pathname, e.pathname),
                this.location.pathname !== e.pathname || !this.location.anchor && !e.anchor ? (this.popping = !0,
                this.location = e,
                this.beforeFetch()) : this.location = e
            }
            navigate(e) {
                if (!e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    const t = !!e.currentTarget.hasAttribute("data-transition") && e.currentTarget.dataset.transition;
                    this.redirect(e.currentTarget.href, t, e.currentTarget) && (this.popping = !0)
                }
            }
            redirect(e, t=!1, s="script") {
                if (this.trigger = s,
                this.running || e === this.location.href)
                    return !1;
                {
                    const s = this.Helpers.getLocation(e);
                    return this.Contextual = !1,
                    t && (this.Contextual = this.Transitions.contextual[t].prototype,
                    this.Contextual.name = t),
                    s.origin !== this.location.origin || s.anchor && s.pathname === this.location.pathname ? window.location.href = e : (this.location = s,
                    this.beforeFetch()),
                    !0
                }
            }
            async beforeFetch() {
                !1 === this.Contextual && this.getContextualFromRouter(this.Helpers.getLocation(window.location.href).pathname, this.location.pathname),
                super.beforeFetch()
            }
            attach() {
                this.links = document.querySelectorAll('a[href]:not([target]):not([href|="#"]):not([data-router-disabled]):not(.sf-dump-toggle)');
                for (const e of this.links)
                    e.addEventListener("click", this._navigate)
            }
        }
        class Io {
            static toEyes() {
                p("link[rel*='icon']").forEach((e=>{
                    e.href = "/wp-content/themes/unseen/resources/assets/images/eyes-" + e.sizes + ".png?=" + Math.random()
                }
                ))
            }
            static toDefault() {
                p("link[rel*='icon']").forEach((e=>{
                    e.href = "/wp-content/themes/unseen/public/favicon/favicon-" + e.sizes + ".png?=" + Math.random()
                }
                ))
            }
        }
        function Ro(e, t) {
            var s = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                t && (i = i.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                s.push.apply(s, i)
            }
            return s
        }
        function Oo(e, t, s) {
            return t in e ? Object.defineProperty(e, t, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = s,
            e
        }
        class ko {
            static init() {
                "scrollRestoration"in window.history && (window.history.scrollRestoration = "manual"),
                n.on("DOMContentLoaded", window, ko.onDOMContentLoaded),
                this.handleFavicon()
            }
            static onDOMContentLoaded() {
                Object.assign(o, function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var s = null != arguments[t] ? arguments[t] : {};
                        t % 2 ? Ro(Object(s), !0).forEach((function(t) {
                            Oo(e, t, s[t])
                        }
                        )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(s)) : Ro(Object(s)).forEach((function(t) {
                            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(s, t))
                        }
                        ))
                    }
                    return e
                }({}, window.globalData)),
                o.GlobalEvents = new h,
                o.Highway = new Eo,
                window.store = o
            }
            static handleFavicon() {
                document.addEventListener("visibilitychange", (()=>{
                    document.hidden ? Io.toEyes() : Io.toDefault()
                }
                ))
            }
        }
        ko.init()
    },
    7030: function() {},
    9790: function() {},
    1380: function() {}
}, function(e) {
    var t = function(t) {
        return e(e.s = t)
    };
    e.O(0, [136, 613, 938, 941], (function() {
        return t(3715),
        t(7030),
        t(9790),
        t(1380)
    }
    ));
    e.O()
}
]);
