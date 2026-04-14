/* Using a self-executing anonymous function - (function(){})(); - so that all variables and functions defined within
arenâ€™t available to the outside world. */

(function () {
    const loadScript = function (url, callback) {
        const script = document.createElement("script")

        script.type = "text/javascript"

        // If the browser is Internet Explorer.
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null
                    callback()
                }
            };
            // For any other browser.
        } else {
            script.onload = function () {
                callback()
            }
        }
        script.src = url
        document.getElementsByTagName("head")[0].appendChild(script)
    }

    /* This is Timesact main function. */
    timesactScriptNew = async function ($) {
        const style = document.createElement("style")
        style.id = "TimesactCSS"
        style.innerHTML = `.timesact-badge-ribbon span::before {
                            content: "";
                            position: absolute; left: 0px; top: 100%;
                            z-index: -1;
                            border-left: 3px solid #888888;
                            border-right: 3px solid transparent;
                            border-bottom: 3px solid transparent;
                            border-top: 3px solid #888888;
                        }
                        .timesact-badge-ribbon span::after {
                            content: "";
                            position: absolute; right: 0px; top: 100%;
                            z-index: -1;
                            border-left: 3px solid transparent;
                            border-right: 3px solid #888888;
                            border-bottom: 3px solid transparent;
                            border-top: 3px solid #888888;
                        }
                        .md-modal {
                            position: fixed;
                            top: 50%;
                            left: 50%;
                            width: 40%;
                            height: auto;
                            z-index: 999999999999;
                            visibility: hidden;
                            transform: translateX(-50%) translateY(-50%);
                        }
                        .md-content {
                            background: #fff;
                            position: relative;
                            border-radius: 10px;
                            margin: 0 auto;
                        }
                        .md-show {
                            visibility: visible;
                        }
                        .md-show ~ .md-overlay {
                            opacity: 1;
                            visibility: visible;
                            display: block;
                        }
                        .popup-container {
                            min-height: 100%;
                            display: none;
                        }
                        .md-overlay {
                            position: fixed;
                            width: 100%;
                            height: 100%;
                            visibility: hidden;
                            top: 0;
                            left: 0;
                            z-index: 1000;
                            opacity: 0;
                            background: #c9c9c9c2;
                            -webkit-transition: all 0.3s;
                            -moz-transition: all 0.3s;
                            transition: all 0.3s;
                        }
                        .md-body {
                            text-align: center;
                            padding-top: 10%;
                            padding-bottom: 10%;
                            font-family: "Roboto";
                        }
                        p.message {
                              padding: 20px;
                        }
                        .md-close {
                            background: #f70427;
                            border: none;
                            color: white;
                            padding: 10px;
                            border-radius: 4px;
                            cursor: pointer;
                        }
                        @media screen and (max-width: 32em) {
                            .md-modal { width: 80%; }
                        }
                        .timesact_bis_popup_overlay {
                            position: fixed;
                            top: 0;
                            left: 0;
                            z-index: 1040;
                            visibility: hidden;
                            width: 100vw;
                            height: 100vh;
                            background-color: #000;
                            opacity: .5;
                            display: block !important;
                        }

                        .timesact_bis_dialog {
                            display: inline-table;
                            position: fixed;
                            top: 0;
                            left: 0;
                            z-index: 1050;
                            visibility: hidden;
                            width: 100%;
                            height: 100%;
                            overflow-x: hidden;
                            overflow-y: auto;
                            outline: 0;
                        }
                        
                        .timesact_bis_popup_overlay_show,
                        .timesact_bis_dialog_show {
                            visibility: visible;
                        }
                        
                        .timesact_bis_popup {
                            z-index: 1000000;
                            background: #fff;
                            color: #000;
                            margin: auto;
                            pointer-events: none;
                            max-width: 460px;
                            width: 96%;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            position: fixed;
                            border-radius: 10px;
                            font-size: 14px;
                            /*add dynamic value*/
                        }

                        .timesact_bis_popup_content {
                            pointer-events: auto;
                            position: relative
                        }

                        .timesact_bis_popup_body {
                            padding: 20px;
                            position: relative;
                            display: flex;
                            flex-direction: column;
                            width: 100%;
                            border-radius: .3rem
                        }

                        .timesact_bis_close_button {
                            padding: 5px;
                            background: 0 0;
                            font-size: 1.4rem;
                            font-weight: 700;
                            line-height: 1;
                            opacity: 1;
                            cursor: pointer;
                            outline: 0;
                            border-radius: 0;
                            position: absolute;
                            top: 0;
                            right: 0;
                            border: 0
                        }

                        .timesact_bis_close_span {
                            display: inline-block;
                            height: 20px;
                            width: 20px;
                            color: #000;
                            margin-top: 0;
                        }

                        .timesact_bis_heading {
                            margin-bottom: 0;
                            color: #000;
                            /*dynamic value*/
                            margin-top: 0;
                            font-size: calc(2 * 1em);
                            /*dynamic value*/
                            font-weight: 700
                        }

                        .timesact_bis_desc {
                            margin-bottom: 0;
                            color: #000;
                            /*dynamic value*/
                            font-size: 14px;
                            /*dynamic value*/
                        }

                        .timesact_bis_line {
                            margin: 10px 0
                        }

                        .timesact_bis_form_field {
                            margin-top: 10px
                        }

                        .timesact_bis_input {
                            padding: 8px 15px;
                            border: 1px solid #949494;
                            background-color: #fff;
                            color: #000;
                            max-width: 100%;
                            line-height: 1.2;
                            width: 100%;
                            outline: 0;
                            border-radius: 10px;
                            /*dynamic value*/
                        }

                        .timesact_bis_submit_button {
                            width: 100%;
                            outline: 0;
                            border: 0;
                            padding: 10px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            background: #000;
                            /*dynamic value*/
                            color: #fff;
                            /*dynamic value*/
                            border-radius: 10px;
                            /*dynamic value*/
                            font-size: 14px;
                            cursor: pointer;
                        }

                        .timesact_bis_submit_button--disabled {
                            background: #ddd
                        }

                        .timesact_bis_loading_icon {
                            width: 15px !important;
                            height: 15px !important;
                            margin-right: 5px !important;
                        }

                        .timesact_bis_loading_icon:after {
                            content: " ";
                            display: block;
                            width: 15px !important;
                            height: 15px !important;
                            border-radius: 50%;
                            border: 2px solid #fff;
                            border-color: #fff transparent #fff transparent;
                            animation: timesact-bis-loading 1.2s linear infinite
                        }

                        @keyframes timesact-bis-loading {
                            0% {
                                transform: rotate(0)
                            }

                            100% {
                                transform: rotate(360deg)
                            }
                        }

                        .timesact_bis_note {
                            color: black;
                            font-size: 80%;
                            margin-bottom: 0
                        }
                        
                        .timesact_bis_response {
                            margin-bottom: 0;
                        }

                        .timesact_bis_message_success {
                            width: 100%;
							text-align: center;
							font-weight: 600;
                            display: none;
                            color: #28a745;
                        }

                        .timesact_bis_message_error {
                            width: 100%;
							text-align: center;
							font-weight: 600;
                            display: none;
                            color: red;
                        }

                        .timesact_powered_by {
                            margin-top: 15px;
                            left: 0;
                            right: 0;
                            text-align: center;
                        }

                        .timesact_powered_by a {
                          text-decoration: none;
                          color: #000 !important;
                          font-weight: 700;
                        }
                        
                        .timesact_bis_field_empty {
                          border: 1px solid red;
                        }
                        
                        .timesact_bis_message_show {
                            display: block !important;
                        }
                        
                        .timesact-button:after {
                            content: none
                        }

                        .timesact-button:before {
                            content: none
                        }
                        .timesact_bis_subscribe {
                          font-size: 80%;
                        }
                          `
        document.getElementsByTagName("head")[0].appendChild(style)

        const mixedCartModal = '<div class="md-modal" id="mixed-modal"><div class="md-content"><div class="md-body"></div></div></div><div class="popup-container"><div class="column"><button class="md-trigger md-setperspective" data-modal="mixed-modal"></button></div></div><div class="md-overlay"></div>';
        document.getElementsByTagName("body")[0].insertAdjacentHTML('afterbegin', mixedCartModal)

        const timesactBIS = `<div class="timesact_bis_popup_overlay"></div>
        <div aria-modal="true" aria-hidden="true" tabindex="-1" role="dialog" class="timesact_bis_dialog">
            <div class="timesact_bis_popup">
                <div class="timesact_bis_popup_content">
                    <div class="timesact_bis_popup_body">
                        <button type="button" data-dismiss="modal" aria-label="Close"
                            class="timesact_bis_close_button">
                            <span aria-hidden="true" class="timesact_bis_close_span">x</span>
                        </button>
                        <h3 class="timesact_bis_heading"></h3>
                        <p class="timesact_bis_desc"></p>
                        <p class="timesact_bis_response">
                            <span class="timesact_bis_message_success"></span>
                            <span class="timesact_bis_message_error"></span>
                             
                        </p>
                        <hr class="timesact_bis_line">
                        <div id="subscriptionForm">
                            <div class="timesact_bis_form_field">
                                <input id="timesact_bis_email" class="timesact_bis_input " type="email"
                                placeholder="eg. username@example.com" name="email" value="">
                            </div>
                            <div class="timesact_bis_form_field">
                                <button type="button" class="timesact_bis_submit_button ">
                                    <span class="timesact_bis_loading_icon"></span>
                                </button>
                            </div>
                            <div class="timesact_bis_form_field">
                                <p class="timesact_bis_note"></p>
                            </div>
                            <div class="timesact_bis_form_field timesact_sub">
                                <input type="checkbox" id="newsletter" name="newsletter" checked />
                                <label class="timesact_bis_subscribe" for="newsletter"></label>
                            </div>
                        </div>
                        <div class="timesact_powered_by">
                            <a href="https://timesact.com" target="_blank" rel="noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8 24l2.674-9h-9.674l16-15-2.674 9h8.674l-15 15zm-1.586-11h6.912l-1.326 4 5.739-6h-6.065l1.304-4-6.564 6z"></path></svg>
                                <span>by Timesact</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`

        document.getElementsByTagName("body")[0].insertAdjacentHTML('afterbegin', timesactBIS)

        const emailInputFieldSelector = document.querySelector('#timesact_bis_email')
        const newsletterCheckboxFieldSelector = document.querySelector('#newsletter')

        // Cart alert modal global variables.
        const cartModal = {
            isOpen: false,
            queue: JSON.parse(window.sessionStorage.getItem("modal-queue") || null) || []
        }

        /* Models */
        class Badge {
            add(selector, badgeType, value, settingType) {
                if (badgeType === "RIBBON") {
                    $(selector).remove(`.timesact-badge-common-${settingType}`);
                    $(selector).remove(`.timesact-badge-ribbon-${settingType}`);
                    $(selector).append(`<div class='timesact-badge-ribbon timesact-badge-ribbon-${settingType}'><span class='timesact-badge-ribbon-span-${settingType}'><p>` + value + "</p></span></div>")
                    return;
                }

                if (badgeType === "ROUNDED") {
                    $(selector).remove(`.timesact-badge-common-${settingType}`);
                    $(selector).remove(`.timesact-badge-ribbon-${settingType}`);
                    $(selector).append(`<div class='timesact-badge-common-${settingType}'><span class='timesact-badge-rounded-span-${settingType}'>` + value + "</span></div>");
                }

                if (badgeType === "RECTANGLE") {
                    $(selector).remove(`.timesact-badge-common-${settingType}`);
                    $(selector).remove(`.timesact-badge-ribbon-${settingType}`);
                    $(selector).append(`<div class='timesact-badge-common-${settingType}'><span class='timesact-badge-rectangle-span-${settingType}'>` + value + "</span></div>");
                }

                if (badgeType === "SQUARE") {
                    $(selector).remove(`.timesact-badge-common-${settingType}`);
                    $(selector).remove(`.timesact-badge-ribbon-${settingType}`);
                    $(selector).append(`<div class='timesact-badge-common-${settingType}'><span class='timesact-badge-square-span-${settingType}'>` + value + "</span></div>");
                }

                if (badgeType === "CIRCLE") {
                    $(selector).remove(`.timesact-badge-common-${settingType}`);
                    $(selector).remove(`.timesact-badge-ribbon-${settingType}`);
                    $(selector).append(`<div class='timesact-badge-common-${settingType}'><span class='timesact-badge-circle-span-${settingType}'>` + value + "</span></div>");
                }
            }

            getPositions(isTop, isRight, x, y) {
                return {
                    "top": isTop && y,
                    "bottom": !isTop && y,
                    "left": !isRight && x,
                    "right": isRight && x,
                }
            }

            getPositionsRibbon(isTop, isRight) {
                const top = isTop ? "19px" : "35px"
                const right = !isRight ? "-5px" : "-20px"
                return { top, right }
            }

            getTransformRibbon(isTop, isRight) {
                // top right
                let degree = 45
                if (isTop && !isRight) {
                    // left top
                    degree -= 90
                } else if (!isTop && !isRight) {
                    // left bottom
                    degree -= 180
                } else if (!isTop && isRight) {
                    // bottom right
                    degree -= 270
                }

                return {
                    "transform": `rotate(${degree}deg)`,
                    "-webkit-transform": `rotate(${degree}deg)`,
                }
            }

            getTransformRibbonText(isTop) {
                return isTop ? {} : {
                    "transform": `rotate(180deg)`,
                    "-webkit-transform": `rotate(180deg)`,
                }
            }

            applyStyles(style, settingType) {
                const isTop = style.top || style.top === undefined
                const isRight = style.right || style.right === undefined

                $('.timesact-badge').css({
                    "position": "relative"
                });
                $(`.timesact-badge-ribbon-${settingType}`).css({
                    "position": "absolute",
                    ...this.getPositions(isTop, isRight, "-5px", "-5px"),
                    "width": "75px",
                    "height": "75px",
                    "text-align": "right",
                    "z-index": "1",
                    "overflow": "hidden",
                });
                $(`.timesact-badge-ribbon-${settingType} span`).css({
                    "position": "absolute",
                    ...this.getPositionsRibbon(isTop, isRight),
                    "display": "block",
                    "width": "100px",
                    "font-size": `${style.fontSize}px`,
                    "font-weight": "bold",
                    "color": style.fontColor,
                    "text-transform": "uppercase",
                    "text-align": "center",
                    "line-height": "20px",
                    "white-space": "nowrap",
                    ...this.getTransformRibbon(isTop, isRight),
                });
                $(`.timesact-badge-ribbon-${settingType} span p`).css({
                    "margin": 0,
                    ...this.getTransformRibbonText(isTop),
                    "font-size": `${style.fontSize}px`,
                    "color": style.fontColor,
                });
                $(`.timesact-badge-ribbon-span-${settingType}`).css({
                    "background-color": style.backgroundColor,
                    "box-shadow": "0 3px 10px -5px rgba(0, 0, 0, 1)"
                });
                $(`.timesact-badge-rounded-span-${settingType}`).css({
                    "border": "1px solid transparent",
                    "border-radius": "4rem",
                    "display": "inline-block",
                    "letter-spacing": ".1rem",
                    "line-height": "1",
                    "padding": "0.6rem 1.3rem",
                    "text-align": "center",
                    "background-color": style.backgroundColor,
                    "border-color": style.backgroundColor,
                    "font-size": `${style.fontSize}px`,
                    "color": style.fontColor,
                    "font-weight": "bold",
                    "word-break": "break-word",
                })
                $(`.timesact-badge-rectangle-span-${settingType}`).css({
                    "display": "inline-block",
                    "min-width": "60px",
                    "padding": "0.6rem 1.3rem",
                    "letter-spacing": ".1rem",
                    "line-height": "1",
                    "text-align": "center",
                    "font-size": `${style.fontSize}px`,
                    "color": style.fontColor,
                    "font-weight": "bold",
                    "word-break": "break-word",
                    "background-color": style.backgroundColor,
                    "border-color": style.backgroundColor,
                    "border": "1px solid transparent",
                })
                $(`.timesact-badge-square-span-${settingType}`).css({
                    "display": "flex",
                    "align-items": "center",
                    "justify-content": "center",
                    "min-height": "60px",
                    "min-width": "60px",
                    "width": `${style.width}px`,
                    "height": `${style.width}px`,
                    "letter-spacing": ".1rem",
                    "line-height": "1",
                    "text-align": "center",
                    "font-size": `${style.fontSize}px`,
                    "color": style.fontColor,
                    "font-weight": "bold",
                    "word-break": "break-word",
                    "background-color": style.backgroundColor,
                    "border-color": style.backgroundColor,
                    "border": "1px solid transparent",
                    "overflow": "hidden"
                })
                $(`.timesact-badge-circle-span-${settingType}`).css({
                    "display": "flex",
                    "align-items": "center",
                    "justify-content": "center",
                    "min-height": "60px",
                    "min-width": "60px",
                    "width": `${style.width + 28}px`,
                    "height": `${style.width + 28}px`,
                    "padding": "14px",
                    "letter-spacing": ".1rem",
                    "line-height": "1",
                    "text-align": "center",
                    "font-size": `${style.fontSize}px`,
                    "color": style.fontColor,
                    "font-weight": "bold",
                    "word-break": "break-word",
                    "background-color": style.backgroundColor,
                    "border-color": style.backgroundColor,
                    "border": "1px solid transparent",
                    "border-radius": "50%",
                    "overflow": "hidden"
                });
                $(`.timesact-badge-common-${settingType}`).css({
                    "position": "absolute",
                    ...this.getPositions(isTop, isRight, "10px", "10px"),
                    "display": "flex",
                    "flex-wrap": "wrap",
                    "z-index": "10"
                });
            }
        }

        class Modal {
            static updateStorage() {
                window.sessionStorage.setItem("modal-queue", JSON.stringify(cartModal.queue))
            }

            static pushQueue(settings, closeCb) {
                // if exist
                if (cartModal.queue.find(it => it.settings.id === settings.id)) return

                cartModal.queue.push({ settings, closeCb })
                this.updateStorage()
            }

            static popQueue() {
                if (cartModal.queue.length <= 0) return
                const item = cartModal.queue.pop()
                this.updateStorage()
                return item
            }

            static clearQueue() {
                cartModal.queue = []
                this.updateStorage()
            }

            static showFirst() {
                if (cartModal.isOpen) return
                const item = this.popQueue()
                item && new Modal().display(item.settings, item.closeCb)
            }

            display(settings, closeCb) {
                if (cartModal.isOpen) {
                    return Modal.pushQueue(settings, closeCb)
                }

                cartModal.isOpen = true
                $(".md-body").append('<h3>' + settings.header + '</h3><p class="message">' + settings.body + '</p><button class="md-close">' + settings.button + '</button><p><input type="checkbox" id="md-stop" name="md-stop"><label for="md-stop">' + settings.stop + '</label></p>');
                $("#mixed-modal").addClass('md-show');
                $(".md-close, .md-overlay").click(function (event) {
                    event.stopPropagation()
                    if (closeCb instanceof Function) closeCb()

                    cartModal.isOpen = false
                    $("#mixed-modal").removeClass('md-show');
                    $(".md-body").empty()
                    Modal.showFirst()
                });
                $('.md-close').attr('style', `
				background: ${settings.buttonBackgroundColor}!important;
				color: ${settings.buttonFontColor}!important;`)
            }
        }

        class Product {
            constructor(id, variants, title) {
                this.id = id
                this.variants = variants
                this.title = title
            }

            setActiveVariant(variantId) {
                this.variantId = variantId
            }

            setTimesactVariants(productConfig) {
                if (!productConfig || !productConfig.variants) {
                    console.log('[ERROR 2002]: Product config is undefined.')

                    return
                }
                this.timesactVariants = productConfig.variants
            }

            isPOEnabledForVariant() {
                if (!this.timesactVariants[this.variantId] || !this.timesactVariants[this.variantId].config) {
                    return false
                }

                // New flow.
                if ('isPOEnabled' in this.timesactVariants[this.variantId]) {
                    return this.timesactVariants[this.variantId].isPOEnabled
                }

                // Old flow.
                return this.timesactVariants[this.variantId].config.status === "ACTIVE" || this.timesactVariants[this.variantId].config.status === "NO_STOCK"
            }

            isISEnabledForVariant() {
                if (!this.timesactVariants[this.variantId]) {
                    return false
                }

                if ('isISEnabled' in this.timesactVariants[this.variantId]) {
                    return this.timesactVariants[this.variantId].isISEnabled
                }

                return false
            }

            isBISEnabledForVariant() {
                if (!this.timesactVariants[this.variantId]) {
                    return false
                }

                window.ta.currentTimesactProductData.variantId = this.variantId
                window.ta.currentTimesactProductData.productName = this.timesactVariants[this.variantId].displayName

                return this.timesactVariants[this.variantId].isBISEnabled
            }
            isCSEnabledForVariant() {
                if (!this.timesactVariants[this.variantId]) {
                    return false
                }

                return this.timesactVariants[this.variantId].isCSEnabled
            }

            getVariantSettings(settings, defaultSettingId, type) {
                if (!this.timesactVariants[this.variantId].config.settingsTemplate) {
                    // Old flow, if the variant does not have a template assigned.
                    const defaultSettings = settings[defaultSettingId]
                    if (!this.hasCustomSettings()) {
                        return defaultSettings
                    }

                    const customSettings = this.timesactVariants[this.variantId].settings

                    return {
                        button: {
                            ...defaultSettings.button,
                            name: customSettings.buttonName || defaultSettings.button.name
                        },
                        message: {
                            ...defaultSettings.message,
                            type: customSettings.messageType || defaultSettings.message.type,
                            value: customSettings.messageValue || defaultSettings.message.value,
                        },
                        cart: {
                            ...defaultSettings.cart,
                            labelText: {
                                key: customSettings.cartLabelTextKey || defaultSettings.cart.labelText.key,
                                value: customSettings.cartLabelTextValue || defaultSettings.cart.labelText.value,
                            }
                        },
                        badge: defaultSettings.badge
                    }
                }

                if (type === "PO") {
                    return this.timesactVariants[this.variantId].config.settingsTemplate in settings
                        ? settings[this.timesactVariants[this.variantId].config.settingsTemplate]
                        : settings[defaultSettingId]
                }

                if (type === "BIS") {
                    return this.timesactVariants[this.variantId].configBIS.settingsTemplate in settings
                        ? settings[this.timesactVariants[this.variantId].configBIS.settingsTemplate]
                        : settings[defaultSettingId]
                }

                if (type === "CS") {
                    return this.timesactVariants[this.variantId].configCS.settingsTemplate in settings
                        ? settings[this.timesactVariants[this.variantId].configCS.settingsTemplate]
                        : settings[defaultSettingId]
                }

                if (type === "IS") {
                    return this.timesactVariants[this.variantId].configIS.settingsTemplate in settings
                        ? settings[this.timesactVariants[this.variantId].configIS.settingsTemplate]
                        : settings[defaultSettingId]
                }

                return settings[defaultSettingId]
            }

            hasCustomSettings() {
                if (!this.timesactVariants[this.variantId].settings) {
                    return false;
                }
                return this.timesactVariants[this.variantId].settings.type === "CUSTOM";
            }

            isVariantOutOfStock() {
                if (!this.timesactVariants[this.variantId]) {
                    return false;
                }

                const variant = this.timesactVariants[this.variantId]
                if (variant.quantity > 0) { return false; }

                if (variant.inventoryPolicy === "DENY") { return true; }
                return false;
            }
        }

        class ShopUtil {
            constructor() { }

            initTimesact() {
                if ("undefined" != typeof window.ta) {
                    return;
                }

                const products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : {}
                const settings = localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')) : undefined

                const lastProductUpdate = this.computeLastProductUpdate(products)
                const lastSettingsUpdate = localStorage.getItem('lastSettingsUpdate') ? JSON.parse(localStorage.getItem('lastSettingsUpdate')) : 0

                window.ta = {
                    products,
                    settings,
                    lastProductUpdate,
                    lastSettingsUpdate,
                    cart: {
                        showMixedCartAlert: sessionStorage.getItem('showCartMixedAlert') ? JSON.parse(sessionStorage.getItem('showCartMixedAlert')) : true
                    },
                    quickView: {
                        selectors: {
                            button: ".quick-add__submit, .productitem--action-qs, .boost-pfs-quickview-btn, .cc-quick-buy-btn, .button--quick-shop, .sca-qv-button, .quick-view-btn, .bc-quickview-btn-wrapper, .sca-qv-cartbtn, .js-quick-shop-link, .searchit-quick-view-button, .quick-view, .js-quickbuy-button, .quick-product__btn, .product-card-interaction-quickshop, .product-modal, .productitem--action button, a.quickview, .overlay, a.quickview, .has-quick-view .btn .v-b, .shop-now-button, .quick-buy, .quick_shop, a[data-action='show-product'], .trigger-quick-view, .quickview-button, .quick_view, .qview-button, button.btn-addToCart:last, .quick-shop, .fancybox.ajax, .quick-add-button-variants, .product-thumbnail__quickshop-button, .js-quickView-button",
                            form: `.product__form:visible,
							#sca-qv-add-item-form:visible,
							.shopify-product-form:visible,
							.bc-modal-wrapper:visible
							#bc-quickview-cart-form:visible,
							.product_form:visible,
							.searchit-quick-view-form-wrapper
							form:visible, .product-form:visible,
							.quick-buy__product-form:visible,
							.product-single__form:visible,
							form[action='/cart/add']:visible,
							#AddToCartForm:visible,
							form.module:visible,
							#add-to-cart-quickview-form:visible`,
                            addToCartButton: "[type=submit]:visible:first span, .sca-qv-cartbtn:visible, #addToCart:visible, #bc-quickview-cart-btn:visible, .add_to_cart:visible, #searchit-quick-view-add-to-cart:visible, .product-form__cart-submit:visible, .quickbuy__submit:visible, .add-to-cart:visible, .product-submit:visible, .add:visible, .product-form--atc-button:visible, input.action-button.submit:visible, .addto.cart.sliding-cart:visible, #AddToCart:visible, .product-add:visible, .add-to-cart:visible, .product__submit__add:visible, .product-add-to-cart:visible, #add-to-cart:visible, .product-submit.action-button.product-submit, .product-form__add-button:visible, .add-to-cart-btn:visible, .qview-btn-addtocart:visible, button.btn-addToCart:last, .button--add-to-cart:visible",
                            variant: "#sca-qv-variant-options select.single-option-selector, .bc-quickview-single-option-selector, .searchit-option-selector-wrapper select, .qview-variants select, select:visible, .radio-wrapper fieldset, input[type='radio']",
                            quantity: "[name='quantity']",
                            quickviewModalContainer: ".quick-add-modal, .theme-modal--quickbuy, .quickview-product .product-quickview:visible, .sca-fancybox-wrap:visible, .mfp-container:visible, .bc-modal-wrapper:visible, .quick-shop:visible, .searchit-modal:visible, #colorbox:visible, .modal--quick-shop:visible, .quickshop:visible, .fancybox-wrap:visible, .fancybox-container:visible, .modal-content:visible, .product-quick-view, section.quick-view, #ShopNowContainer, #ProductScreens, .product.preview, .modal__inner__wrapper:visible, .halo-modal-content:visible, #quickView:visible, .quickshop-content:visible, .modal__inner:visible, .quick-view .content:visible, .qview-product:visible"
                        }
                    }
                }
            }

            computeLastProductUpdate(products) {
                let timestamp = parseInt(new Date().getTime() / 1000);
                for (let product of Object.values(products)) {
                    if (product.lastUpdate && product.lastUpdate < timestamp) {
                        timestamp = product.lastUpdate;
                        continue;
                    }
                    if (!product.lastUpdate) {
                        timestamp = 1;
                    }
                }
                return timestamp;
            }

            isProductPage() {
                return -1 < window.location.href.indexOf("/products/") || -1 < window.location.href.indexOf("/products_preview?");
            }

            isCollectionPage() {
                return -1 < window.location.href.indexOf("/collections/");
            }

            isSearchPage() {
                return -1 < window.location.href.indexOf("/search?");
            }

            isPagesPage() {
                return -1 < window.location.href.indexOf("/pages/");
            }

            isHomePage() {
                return document.location.pathname === "/";
            }

            isCartPage() {
                return -1 < window.location.pathname.indexOf("/cart");
            }

            initQuickView(shop) {
                this.shopData = shop;
                this.createQuickViewButtonListener();
            }

            createQuickViewButtonListener() {
                var thisShop = this;
                $(window.ta.quickView.selectors.button).click(function (target) {
                    const handle = thisShop.getProductHandle(target.currentTarget);
                    if (!handle) { return; }
                    const url = thisShop.getProductPageJsURL(handle);
                    var product;
                    $.getJSON(url, function (data) {
                        product = new Product(data.product.id, data.product.variants);
                    }).done(function () {
                        // thisShop.cleanupModal();
                        new ScriptRunner(thisShop.shopData, product).run(/*isQuickView=*/true);
                    }).fail(function () {
                        console.log("[Error 1001]: Product could not be fetched.");
                    });
                });
            }

            getProductHandle(target) {
                return $(target).data("product-url").split('/').pop();
            }

            getProductPageJsURL(handle) {
                return "https://" + window.location.hostname + "/products/" + handle;
            }

            sleep(e) {
                return new Promise(function (t) {
                    setTimeout(t, e);
                });
            }

            cleanupModal() {
                $(window.ta.quickView.selectors.quickviewModalContainer).find("#preorder-label").remove();
                $(window.ta.quickView.selectors.quickviewModalContainer).find(".timesact-preorder-description").remove();
            }
        }

        /* Util classes */
        class ProductUtil {
            extractVariantId(variants, formSelector) {
                var productParams = window.location.search.match(/variant=([0-9]+)/);
                if (productParams != null) return productParams[1];
                const variantIdFromForm =
                    "radio" === $(formSelector).find("select[name='id'], input[name='id'], select[name='id[]'], input[name='id[]']").attr("type")
                        ? $(formSelector).find("input[name='id']:checked, input[name='id[]']:checked").val()
                        : $(formSelector).find("select[name='id'], input[name='id'], select[name='id[]'], input[name='id[]']").val();

                if (variants.some(variant => variant.id.toString() === variantIdFromForm)) {
                    return variantIdFromForm;
                }
                // console.log("Variants are different: " + variantIdFromForm + ' ' + variants[0].id);
                return variants[0].id;
            }
        }

        class TimesactBisModal {
            static createListeners() {
                $('.timesact_bis_input').focusout(function () {
                    const timesactBisInput = $('.timesact_bis_input')

                    if (timesactBisInput.val() && timesactBisInput.hasClass('timesact_bis_field_empty')) {
                        timesactBisInput.removeClass('timesact_bis_field_empty')
                        $('.timesact_bis_message_success').removeClass('timesact_bis_message_show')
                        $('.timesact_bis_message_error').removeClass('timesact_bis_message_show')
                    }
                })
                $('.timesact_bis_close_button').click(TimesactBisModal.hidenBisModal)
                $('.timesact_bis_submit_button').click(TimesactBisModal.createSubscription)
            }

            static displayBisModal() {
                const { defaultSettings, productId, productVariants, variantId } = window.ta.currentTimesactProductData
                const product = new Product(productId, productVariants)

                product.setActiveVariant(variantId)
                product.setTimesactVariants({ variants: productVariants })

                const { form } = product.getVariantSettings(window.ta.settings, defaultSettings.templates['BIS'], 'BIS');

                // Set styles.
                $('h3.timesact_bis_heading').attr('style', `color: ${form.headingFontColor} !important;`)

                $('#subscriptionForm .timesact_bis_submit_button').attr('style', `
				background: ${form.buttonBackgroundColor} !important;
				color: ${form.buttonFontColor} !important;
				border-radius: ${form.fieldsBorderRadius}px !important;
				font-size: ${form.fontSize}px !important;`)

                $('#subscriptionForm .timesact_bis_input').attr('style', `
				border-radius: ${form.fieldsBorderRadius}px !important;
				font-size: ${form.fontSize}px !important;`)

                $('.timesact_bis_popup').attr('style', `border-radius: ${form.popupBorderRadius}px !important;`)
                $('.timesact_bis_desc, .timesact_bis_note, .timesact_bis_subscribe').attr('style', `color: ${form.textFontColor} !important;`)
                $('.timesact_bis_email').attr('style', `border-radius: ${form.fieldsBorderRadius}px !important;`)

                // Set texts.
                $('.timesact_bis_heading').text(form.heading)
                $('.timesact_bis_desc').text(form.description)
                $('.timesact_bis_submit_button').text(form.buttonName)
                $('.timesact_bis_form_field .timesact_bis_note').text(form.note)
                $('.timesact_bis_form_field .timesact_bis_subscribe').text(form.messageNewsletter)
                $('.timesact_bis_message_success').text(form.messageSuccess)
                $('.timesact_bis_message_error').text(form.messageError)


                !form.isNewsletterEnabled && $('.timesact_sub').attr("style", "display: none;")

                $(".timesact_bis_popup_overlay").addClass("timesact_bis_popup_overlay_show")
                $(".timesact_bis_dialog").addClass("timesact_bis_dialog_show")
                if (!form.isBrandEnabled) {
                    $(".timesact_powered_by").hide()
                }
            }

            static hidenBisModal() {
                $('.timesact_bis_popup_overlay').removeClass('timesact_bis_popup_overlay_show')
                $('.timesact_bis_dialog').removeClass("timesact_bis_dialog_show")
                $('.timesact_bis_message_success').removeClass("timesact_bis_message_show").html('')
                $('.timesact_bis_message_error').removeClass("timesact_bis_message_show").html('')

                emailInputFieldSelector.value = ''
            }

            static async createSubscription() {
                const timesactBisMessageSuccess = $('.timesact_bis_message_success')
                const timesactBisMessageError = $('.timesact_bis_message_error')
                const timesactBisInput = $('.timesact_bis_input')

                if (!emailInputFieldSelector.value) {
                    timesactBisInput.addClass('timesact_bis_field_empty')
                    return
                }

                const data = {
                    type: 'EMAIL',
                    status: 'PENDING',
                    value: emailInputFieldSelector.value,
                    productId: window.ta.currentTimesactProductData.productId,
                    variantId: window.ta.currentTimesactProductData.variantId,
                    productName: window.ta.currentTimesactProductData.productName,
                    isSubNewsletter: $('#newsletter').is(":checked")
                }

                const created = await Api.createSubscription(data)

                created && timesactBisMessageError.removeClass('timesact_bis_message_show') && timesactBisMessageSuccess.addClass('timesact_bis_message_show') && $('#timesact_bis_email').val('')

                !created && timesactBisMessageSuccess.removeClass('timesact_bis_message_show') && timesactBisMessageError.addClass('timesact_bis_message_show')
            }
        }

        class TimesactButton {
            constructor(buttonSelector, className) {
                this.addToCartButtonSelector = buttonSelector
                this.hasInsideSpan = $(this.addToCartButtonSelector).first().prop('tagName')?.toLowerCase() === "span"

                if (className === "timesact-button-po" || className === "timesact-button-is") {
                    // Pre-order and In stock features use the existing "Add to cart" button.
                    this.button = buttonSelector
                } else {
                    // BIS and CS features use our own button.
                    this.button = $(`<button type="button" class="${className}" />`).attr('style', `display: none !important;`)

                    if (this.hasInsideSpan) {
                        $(this.addToCartButtonSelector).first().parent().after(this.button)
                    } else {
                        $(this.addToCartButtonSelector).first().after(this.button)
                    }
                }
            }

            showPO(settings) {
                if (this.hasInsideSpan) {
                    $(this.button).parent().show()
                } else {
                    $(this.button).show()
                }
                $(this.button).val(settings.button.name)
                $(this.button).text(settings.button.name)
                $(this.button).prop("disabled", false)
                if (settings.button.type === "DEFAULT") {
                    return
                }

                // Custom button
                if (this.hasInsideSpan) {
                    $(this.button).first().parent().addClass("timesact-button")
                } else {
                    $(this.button).first().addClass("timesact-button")
                }

                this.applyStyles(settings.button.style, "timesact-button")
            }

            showBIS(settings) {
                $(this.button).text(settings.button.name)
                this.applyStyles(settings.button.style, "timesact-button-bis")
                $(this.button).click(TimesactBisModal.displayBisModal)
                $(this.button).show()

                if (this.hasInsideSpan) {
                    $(this.addToCartButtonSelector).first().parent().attr('style', `display: none !important;`)
                } else {
                    $(this.addToCartButtonSelector).first().attr('style', `display: none !important;`)
                }
            }

            showCS(settings) {
                $(this.button).text(settings.button.name)
                this.button.prop("disabled", true);
                this.applyStyles(settings.button.style, "timesact-button-cs")
                $(this.button).show()

                if (this.hasInsideSpan) {
                    $(this.addToCartButtonSelector).first().parent().attr('style', `display: none !important;`)
                } else {
                    $(this.addToCartButtonSelector).first().attr('style', `display: none !important;`)
                }
            }

            showAddToCart() {
                if (this.hasInsideSpan) {
                    $(this.addToCartButtonSelector).first().parent().show()
                    $(this.addToCartButtonSelector).first().parent().removeClass("timesact-button")
                    $(this.addToCartButtonSelector).first().parent().removeAttr("style")
                } else {
                    $(this.addToCartButtonSelector).first().show()
                    $(this.addToCartButtonSelector).first().removeClass("timesact-button")
                    $(this.addToCartButtonSelector).first().removeAttr("style")
                }

                $(this.addToCartButtonSelector).val(this.addToCartText)
                $(this.addToCartButtonSelector).text(this.addToCartText)
                $(this.addToCartButtonSelector).prop("disabled", false)
            }

            showOutOfStock() {
                if (this.hasInsideSpan) {
                    $(this.addToCartButtonSelector).first().parent().show()
                    $(this.addToCartButtonSelector).first().parent().removeClass("timesact-button")
                    $(this.addToCartButtonSelector).first().parent().removeAttr("style")
                } else {
                    $(this.addToCartButtonSelector).first().show()
                    $(this.addToCartButtonSelector).first().removeClass("timesact-button")
                    $(this.addToCartButtonSelector).first().removeAttr("style")
                }

                $(this.addToCartButtonSelector).val(this.soldOutText)
                $(this.addToCartButtonSelector).text(this.soldOutText)
                $(this.addToCartButtonSelector).prop("disabled", true)
            }

            setAddToCartText(text) {
                this.addToCartText = text || $(this.addToCartButtonSelector).text()
            }

            setSoldOutText(text) {
                this.soldOutText = text
            }

            hide() {
                $(this.button).hide()
            }

            disable() {
                if (this.hasInsideSpan) {
                    $(this.button).parent().prop("disabled", true)
                } else {
                    $(this.button).prop("disabled", true)
                }
                $(this.addToCartButtonSelector).prop("disabled", true)
            }

            confirmButtonExists() {
                return $(this.button).closest("body").length > 0;
            }

            identifyButton(selectors) {
                this.button = selectors.formSelector.find(selectors.ids.addToCartButton);
            }

            applyStyles(style, className) {
                $(`.${className}`).attr('style', `
                width: ${style.width}${style.widthType === "PERCENT" ? "%" : "px"} !important;
                height: ${style.height}${style.heightType === "PERCENT" ? "%" : "px"} !important;
                background-color: ${style.backgroundColor} !important;
                border: ${style.borderWidth}px solid ${style.borderColor} !important;
                border-color: ${style.borderColor} !important;
                border-radius: ${style.borderRadius}px !important;
                border-width: ${style.borderWidth}px !important;
                color: ${style.fontColor} !important;
                font-size: ${style.fontSize}px !important;
                font-style: ${style.fontStyle} !important;
                font-weight: ${style.fontWeight} !important;
                margin-bottom: 10px !important;
                cursor: pointer;`);

                // set px height to make dependency in %
                if (style.heightType === "PERCENT") {
                    const parentHeight = $(`.${className}`).parent().height()
                    $(`.${className}`).height(`${parentHeight * style.height / 100}px`)
                }
            }

            // PO cart alert functions
            removeCartAlertListener() {
                $(this.button).parent().off("click", this.cartAlertModalClickHandler)
            }

            closeCartAlertModal(settings, tmps = {}) {
                window.sessionStorage.setItem("showCartAlert", JSON.stringify({
                    ...tmps,
                    [settings.id]: { dismiss: $('#md-stop').is(":checked") },
                }));

                // if not dismissed
                if (!($('#md-stop').is(":checked"))) return

                this.removeCartAlertListener()
            }

            addCartAlertListener(settings, product) {
                const tmps = JSON.parse(window.sessionStorage.getItem("showCartAlert") || null) || {}
                const closedTmpsIds = JSON.parse(window.sessionStorage.getItem("closedModals") || null) || []
                const tmpId = `${settings.type}-${product.id}-${product.variantId}`

                // if not enabled or closed already with this template
                if (!settings.cart.alert) {
                    return
                }

                if (
                    !settings.cart.alert.isEnabled || settings.cart.alert.onButtonClick !== true ||
                    tmps[tmpId]?.dismiss || closedTmpsIds.includes(tmpId)
                ) {
                    return
                }

                // save temporary to reset event handling
                this.cartAlertModalClickHandler = () => {
                    const s = { ...settings.cart.alert, id: tmpId }
                    return new Modal().display(s, () => this.closeCartAlertModal(s, tmps));
                }

                $(this.button).parent().on("click", this.cartAlertModalClickHandler)
            }
        }

        class TimesactCountdownTimer {
            constructor(timerSelector, className) {
                this.timerSelector = timerSelector

                // for inner operations
                this.utils = {
                    delims: [60, 60, 24, 365]
                }

                // component
                this.components = {
                    timer: null,
                    timerElements: [null, null, null, null]
                }
                this.componentsClasses = {
                    timer: `timer-container-${className}`,
                    title: "timer-title",
                    subheading: "timer-subheading",
                    timerValueContainer: "timer-value-container",
                    timerLabels: "timer-value-labels",
                    timerValues: "timer-values"
                }
            }

            setTimerInfo({ content, isEnabled, placement, style, productConfig }) {
                this.title = content.title;
                this.subheading = content.subheading;
                this.labels = content.labels;
                this.dates = content?.dates;
                this.placement = placement;
                this.isEnabled = isEnabled || false;
                this.style = style || null;

                this.onceItEnds = content.onceItEnds

                this.productConfig = productConfig
            }

            show() {
                if (!this.isEnable()) return false

                this.createTimer()

                this.placement === "BELOW"
                    ? $(this.timerSelector).after(this.components.timer)
                    : $(this.timerSelector).before(this.components.timer)

                this.applyStyles()

                this.countdown()
            }

            hide() {
                // stop & remove old timer
                this.stop()
                $(`.${this.componentsClasses.timer}`).remove();
            }

            createTitle() {
                return $(`<h2 class="${this.componentsClasses.title}">${this.title}</h2>`)
            }

            createSubheading() {
                return $(`<p class="${this.componentsClasses.subheading}">${this.subheading}</p>`)
            }

            createTimerLabels() {
                const els = []
                const labelOrder = ["days", "hours", "mins", "secs"]
                for (const propName of labelOrder) {
                    els.push($(`<div class="${this.componentsClasses.timerLabels}">${this.labels[propName]}</div>`))
                }
                return els
            }

            createTimerValues() {
                const els = []
                const vals = ["00", ":", "00", ":", "00", ":", "00"]
                vals.forEach(v => els.push($(`<div class="${this.componentsClasses.timerValues}">${v}</div>`)))

                // add to handle
                this.components.timerElements = els.filter((_, i) => i % 2 === 0)

                return els
            }

            createTimerValueContainer() {
                const el = $(`<div class="${this.componentsClasses.timerValueContainer}"></div>`)
                el.append(...this.createTimerValues(), ...this.createTimerLabels())
                return el
            }

            createTimer() {
                const el = $(`<div class="${this.componentsClasses.timer}"></div>`)

                // add title & subheading & timer
                el.append(this.createTitle(), this.createSubheading(), this.createTimerValueContainer())

                this.components.timer = el

                return el
            }

            getEndDateFromPeriod(type, value) {
                const now = parseInt(Date.now() / 1000)
                const dayInSeconds = parseInt(value) * 60 * 60 * 24

                switch (type) {
                    case "MONTH":
                        return now + (dayInSeconds * 30)
                    case "WEEK":
                        return now + (dayInSeconds * 7)
                    // DAY
                    default:
                        return now + dayInSeconds
                }
            }

            getActualEndDate() {
                switch (this.dates.endAt) {
                    case "END_DATE":
                        return (this.productConfig.hasEndDate && this.productConfig.endDate) || parseInt(Date.now() / 1000)

                    case "SHIPPING_DATE": {
                        switch (this.productConfig.shippingDate.type) {
                            case "PERIOD":
                                return this.getEndDateFromPeriod(this.productConfig.shippingDate.periodType, this.productConfig.shippingDate.periodValue)

                            case "INTERVAL":
                                return this.getEndDateFromPeriod(this.productConfig.shippingDate.periodEnd.type, this.productConfig.shippingDate.periodEnd.value)

                            default:
                                return this.productConfig.shippingDate.date || parseInt(Date.now() / 1000)
                        }
                    }

                    // DATE
                    default: {
                        switch (this.dates.type) {
                            case "FIXED":
                                return parseInt(Date.now() / 1000) + (parseInt(this.dates.minutes) * 60)

                            default:
                                return this.dates.endDate._seconds
                        }
                    }
                }
            }

            isEnable() {
                // is expired?
                if (this.getActualEndDate() < Date.now() / 1000) return false

                // is started?
                if (this.dates?.startDate) {
                    return this.isEnabled && this.dates.startDate._seconds < Date.now() / 1000
                }

                // is enabled at all?
                return this.isEnabled
            }

            make2Digit(number) {
                return `${number < 10 ? '0' : ''}${number}`
            }

            handleOnEnd() {
                const { value, customTitle } = this.onceItEnds

                switch (value) {
                    case "unpublish-timer":
                        return this.hide()

                    case "repeat-the-countdown":
                        // cant repeat not fixed timer
                        // cant repeat not specific date timer
                        if (this.dates.type !== "FIXED" || (!!this.dates.endAt && this.dates.endAt !== "DATE")) {
                            return
                        }

                        // set new end date
                        this.dates.endDate._seconds = this.getActualEndDate()

                        // restart countdown with delay
                        return setTimeout(() => {
                            return this.countdown()
                        }, 500);

                    case "show-custom-title":
                        return this.components.timer.html(customTitle)

                    default: break
                }
            }

            // [dd, hh, mm, ss]
            calculateRelativeDatetime(fromSeconds, toSeconds) {
                if (typeof fromSeconds !== "number" || typeof toSeconds !== "number") return ["00", "00", "00", "00"]
                if (fromSeconds - toSeconds <= 0) return ["00", "00", "00", "00"]

                const remains = [0, 0, 0, 0]

                let diff = Math.abs(fromSeconds - toSeconds)

                // calculate difference
                for (let i = 0; i < this.utils.delims.length; i++) {
                    const delimeter = this.utils.delims[i];
                    remains[i] = Math.floor(diff % delimeter);

                    if (diff >= delimeter) {
                        diff /= delimeter;
                        continue;
                    }
                    break
                }

                return remains.map(v => this.make2Digit(v)).reverse()
            };

            countdown() {
                let prevVals = []
                let timerDateSeconds = parseInt(Date.now() / 1000)
                const endDateSeconds = this.getActualEndDate()
                const timerInterval = 1000

                this.timerId = setInterval(() => {
                    if (endDateSeconds < timerDateSeconds) {
                        this.handleOnEnd()
                        return this.stop()
                    }

                    // get difference between end and now
                    const timerVals = this.calculateRelativeDatetime(endDateSeconds, timerDateSeconds)

                    // update content
                    this.components.timerElements.forEach((el, i) => {
                        if (prevVals[i] !== timerVals[i]) el.text(timerVals[i])
                    })

                    // update prev vals
                    prevVals = timerVals

                    // update current time
                    timerDateSeconds += timerInterval / 1000
                }, timerInterval);
            }

            stop() {
                clearInterval(this.timerId)
            }

            applyStyles() {
                $(`.${this.componentsClasses.timer} *`).css({
                    "margin": 0,
                    "padding": 0,
                    "box-sizing": "border-box",
                });

                $(`.${this.componentsClasses.timer}`).css({
                    "max-width": "420px",
                    "min-width": "260px",
                    "display": "flex",
                    "flex-flow": "column",
                    "text-align": "center",
                    "-webkit-box-align": "center",
                    "align-items": "center",
                    "overflow": "hidden",

                    // customer
                    "margin-bottom": `${this.style.container?.marginBottom}px`,
                    "margin-top": `${this.style.container?.marginTop}px`,
                    "padding-bottom": `${this.style.container?.paddingBottom}px`,
                    "padding-top": `${this.style.container?.paddingTop}px`,
                    "background-color": this.style.container?.background,
                    "border-color": this.style.container?.borderColor,
                    "border-radius": `${this.style.container?.borderRadius}px`,
                    "border-width": `${this.style.container?.borderSize}px`
                });

                $(`.${this.componentsClasses.title}`).css({
                    "font-weight": "bold",

                    // customer
                    "color": this.style.title?.color,
                    "font-size": `${this.style.title?.fontSize}px`
                });

                $(`.${this.componentsClasses.subheading}`).css({
                    "padding-top": "2px",
                    "line-height": "1.5",

                    // customer
                    "color": this.style.subheading?.color,
                    "font-size": `${this.style.subheading?.fontSize}px`
                });

                $(`.${this.componentsClasses.timerValueContainer}`).css({
                    "display": "grid",
                    "grid-template-columns": "1fr 10px 1fr 10px 1fr 10px 1fr",
                    "gap": "6px 2px",
                    "place-items": "center",
                    "align-items": "flex-start",
                });

                $(`.${this.componentsClasses.timerValues}`).css({
                    "font-weight": "bold",
                    "font-feature-settings": "tnum",
                    "font-variant-numeric": "tabular-nums",
                    "letter-spacing": "-2px",
                    "line-height": "1",

                    // customer
                    "color": this.style.timer?.color,
                    "font-size": `${this.style.timer?.fontSize}px`,
                });

                $(`.${this.componentsClasses.timerLabels}`).css({
                    "max-width": "100px",
                    "white-space": "pre-line",
                    "grid-column": "span 2 / auto",
                    "text-align": "center",
                    "padding-right": "10px",
                    "line-height": "1",

                    // customer
                    "color": this.style.labels?.color,
                    "font-size": `${this.style.labels?.fontSize}px`
                });

                $(`.${this.componentsClasses.timerLabels}:last-of-type`).css({
                    "grid-column": "span 1 / auto",
                    "padding-right": 0,
                });
            }
        }

        class Message {
            constructor(locale) {
                this.locale = locale;
            }

            addStylePreorderMessage(style, type) {
                $(`.timesact-${type}-description`).css({
                    "font-size": `${style.fontSize}px`,
                    "color": style.fontColor,
                    "text-align": style.textAlign,
                    "font-weight": style.fontWeight,
                    "font-style": style.fontStyle
                });
            }

            populateDynamicValues(variant, value, isCartLabel, configType) {
                value = value.replace("{{preorderQuantity}}", this.getQuantity(variant, isCartLabel, configType));
                value = value.replace("{{shippingDate}}", this.getShippingDate(variant[configType].shippingDate, isCartLabel));
                value = value.replace("{{daysLeftUntilShippingDate}}", this.getDaysLeftUntilShippingDate(variant[configType].shippingDate, isCartLabel));
                value = value.replace("{{daysLeftUntilPreorderEndDate}}", this.getDaysLeftUntilEndDate(variant[configType], isCartLabel));
                return value;
            }

            getQuantity(variant, isCartLabel, configType) {
                if (variant[configType].stock.option == "STOCK3") {
                    // Stock3 uses Shopify stock inventory.
                    return variant.quantity;
                }
                if (variant[configType].stock.hasUnlimitedQuantity) {
                    return isCartLabel ? 'VARIABLE_NOT_SET' : '<span style="color:red;">VARIABLE_NOT_SET</span>';
                }

                return variant[configType].stock.quantity;
            }

            getShippingDate(shippingDate, isCartLabel) {
                if (!shippingDate || shippingDate.type === "NO_SET") {
                    return isCartLabel ? 'VARIABLE_NOT_SET' : '<span style="color:red;">VARIABLE_NOT_SET</span>';
                }

                if (shippingDate.type === "DATE") {
                    const date = new Date(shippingDate.date * 1000);
                    return date.toLocaleDateString(this.locale, { day: "numeric", month: "long", year: "numeric" });
                }

                if (shippingDate.type === "PERIOD") {
                    var days = 1;
                    switch (shippingDate.periodType) {
                        case "DAY": days = shippingDate.periodValue; break;
                        case "WEEK": days = shippingDate.periodValue * 7; break;
                        case "MONTH": days = shippingDate.periodValue * 30; break;
                    }

                    var date = new Date();
                    date.setDate(date.getDate() + days);
                    return date.toLocaleDateString(this.locale, { day: "numeric", month: "long", year: "numeric" });
                }

                if (shippingDate.type === "INTERVAL") {
                    var periodStartDays = 1
                    var periodEndDays = 1
                    switch (shippingDate.periodStart.type) {
                        case "DAY": periodStartDays = shippingDate.periodStart.value; break;
                        case "WEEK": periodStartDays = shippingDate.periodStart.value * 7; break;
                        case "MONTH": periodStartDays = shippingDate.periodStart.value * 30; break;
                    }
                    switch (shippingDate.periodEnd.type) {
                        case "DAY": periodEndDays = shippingDate.periodEnd.value; break;
                        case "WEEK": periodEndDays = shippingDate.periodEnd.value * 7; break;
                        case "MONTH": periodEndDays = shippingDate.periodEnd.value * 30; break;
                    }

                    var dateStart = new Date();
                    dateStart.setDate(dateStart.getDate() + periodStartDays);

                    var dateEnd = new Date();
                    dateEnd.setDate(dateEnd.getDate() + periodEndDays);
                    return dateStart.toLocaleDateString(this.locale, { day: "numeric", month: "long", year: "numeric" }) + ' - ' + dateEnd.toLocaleDateString(this.locale, { day: "numeric", month: "long", year: "numeric" });
                }
            }

            getDaysLeftUntilShippingDate(shippingDate, isCartLabel) {
                if (!shippingDate || shippingDate.type === "NO_SET") {
                    return isCartLabel ? 'VARIABLE_NOT_SET' : '<span style="color:red;">VARIABLE_NOT_SET</span>';
                }

                const today = new Date();
                if (shippingDate.type === "DATE") {
                    const date = new Date(shippingDate.date * 1000);
                    return Math.ceil((date.getTime() - today.getTime()) / (1000 * 3600 * 24));
                }

                if (shippingDate.type === "PERIOD") {
                    switch (shippingDate.periodType) {
                        case "DAY": return shippingDate.periodValue;
                        case "WEEK": return shippingDate.periodValue * 7;
                        case "MONTH": return shippingDate.periodValue * 30;
                        default: return 1;
                    }
                }

                if (shippingDate.type === "INTERVAL") {
                    var periodStartDays = 1
                    var periodEndDays = 1
                    switch (shippingDate.periodStart.type) {
                        case "DAY": periodStartDays = shippingDate.periodStart.value; break;
                        case "WEEK": periodStartDays = shippingDate.periodStart.value * 7; break;
                        case "MONTH": periodStartDays = shippingDate.periodStart.value * 30; break;
                    }
                    switch (shippingDate.periodEnd.type) {
                        case "DAY": periodEndDays = shippingDate.periodEnd.value; break;
                        case "WEEK": periodEndDays = shippingDate.periodEnd.value * 7; break;
                        case "MONTH": periodEndDays = shippingDate.periodEnd.value * 30; break;
                    }
                    return periodStartDays + ' - ' + periodEndDays
                }
            }

            getDaysLeftUntilEndDate(config, isCartLabel) {
                if (!config.hasEndDate) { return isCartLabel ? 'VARIABLE_NOT_SET' : '<span style="color:red;">VARIABLE_NOT_SET</span>'; }
                const today = new Date();
                const date = new Date(config.endDate * 1000);
                return Math.ceil((date.getTime() - today.getTime()) / (1000 * 3600 * 24));
            }
        }

        class Timesact {
            constructor(selectors, product, defaultSettingIds, shop) {
                this.selectors = selectors
                this.product = product
                this.settings = window.ta.settings
                this.defaultSettingIds = defaultSettingIds
                this.buttonPO = new TimesactButton(this.selectors.buttonSelector, "timesact-button-po")
                this.buttonIS = new TimesactButton(this.selectors.buttonSelector, "timesact-button-is")
                this.buttonBIS = new TimesactButton(this.selectors.buttonSelector, "timesact-button-bis")
                this.buttonCS = new TimesactButton(this.selectors.buttonSelector, "timesact-button-cs")
                this.timerPO = new TimesactCountdownTimer(this.selectors.timerSelector, "timesact-timer-po")
                this.timerIS = new TimesactCountdownTimer(this.selectors.timerSelector, "timesact-timer-is")
                this.timerBIS = new TimesactCountdownTimer(this.selectors.timerSelector, "timesact-timer-bis")
                this.timerCS = new TimesactCountdownTimer(this.selectors.timerSelector, "timesact-timer-cs")
                this.uuid = Math.floor(100000000 + Math.random() * 900000000)
                $(this.selectors.variantSelector).addClass("timesact-variant-picker-" + this.uuid)
                this.shop = shop
            }

            init() {
                this.createWidget();
                new TimesactEventListener().initVariantEventListener(this);
            }

            createWidget() {
                const variant = this.product.timesactVariants[this.product.variantId]

                if (this.product.isBISEnabledForVariant()) {
                    const settings = this.product.getVariantSettings(this.settings, this.defaultSettingIds.BIS, "BIS")

                    this.buttonBIS.setAddToCartText(settings.button.addToCartText)
                    this.buttonBIS.setSoldOutText(settings.button.soldOutText)

                    if (variant.configBIS.status === "ACTIVE") {
                        this.buttonBIS.showBIS(settings)
                        this.addCommonElements(settings, variant)
                    }
                }

                if (this.product.isISEnabledForVariant()) {
                    const settings = this.product.getVariantSettings(this.settings, this.defaultSettingIds.IS, "IS")

                    this.buttonIS.setAddToCartText(settings.button.addToCartText)
                    this.buttonIS.setSoldOutText(settings.button.soldOutText)

                    if (variant.configIS.status === "NO_STOCK") {
                        this.buttonIS.showOutOfStock()
                        $(this.selectors.formSelector).find(".shopify-payment-button").hide()
                    }

                    if (variant.configIS.status === "ACTIVE") {
                        if (!this.buttonIS.confirmButtonExists()) {
                            this.buttonIS.identifyButton(this.selectors)
                            this.selectors.buttonSelector = $(this.selectors.formSelector).find(this.selectors.ids.addToCartButton)
                        }

                        this.buttonIS.showPO(settings)
                        this.buttonIS.addCartAlertListener(settings, this.product)

                        // Shop has been disabled but the product was not marked accordingly.
                        if (this.shop.isDisabled) {
                            this.buttonIS.disable()
                        }

                        this.addCommonElements(settings, variant)

                        // Set-up cart label.
                        const message = new Message(settings.message.locale || "en-US")
                        const cartLabelTextKey = message.populateDynamicValues(variant, settings.cart.labelText.key, /*isCartLabel=*/true, /*configType=*/'configIS')
                        const cartLabelTextValue = message.populateDynamicValues(variant, settings.cart.labelText.value,  /*isCartLabel=*/true, /*configType=*/'configIS')

                        this.showPreorderLineItemProperty(cartLabelTextKey, cartLabelTextValue)
                    }

                }

                if (this.product.isPOEnabledForVariant()) {
                    const settings = this.product.getVariantSettings(this.settings, this.defaultSettingIds.PO, "PO")

                    this.buttonPO.setAddToCartText(settings.button.addToCartText)
                    this.buttonPO.setSoldOutText(settings.button.soldOutText)

                    if (variant.config.status === "NO_STOCK") {
                        this.buttonPO.showOutOfStock()
                        $(this.selectors.formSelector).find(".shopify-payment-button").hide()
                    }

                    if (variant.config.status === "ACTIVE") {
                        if (!this.buttonPO.confirmButtonExists()) {
                            this.buttonPO.identifyButton(this.selectors)
                            this.selectors.buttonSelector = $(this.selectors.formSelector).find(this.selectors.ids.addToCartButton)
                        }

                        this.buttonPO.showPO(settings)
                        this.buttonPO.addCartAlertListener(settings, this.product)

                        // Shop has been disabled but the product was not marked accordingly.
                        if (this.shop.isDisabled) {
                            this.buttonPO.disable()
                        }

                        this.addCommonElements(settings, variant)

                        // Set-up cart label.
                        const message = new Message(settings.message.locale || "en-US")
                        const cartLabelTextKey = message.populateDynamicValues(variant, settings.cart.labelText.key, /*isCartLabel=*/true, /*configType=*/'config')
                        const cartLabelTextValue = message.populateDynamicValues(variant, settings.cart.labelText.value,  /*isCartLabel=*/true, /*configType=*/'config')

                        this.showPreorderLineItemProperty(cartLabelTextKey, cartLabelTextValue)

                        if (!variant.config.stock.hasUnlimitedQuantity) {
                            // If pre-order quantity has been set, we should add quantity limitation.
                            this.addQuantityListener(variant.config.stock.quantity)
                        }
                    }
                }

                if (this.product.isCSEnabledForVariant()) {
                    const settings = this.product.getVariantSettings(this.settings, this.defaultSettingIds.CS, "CS")

                    this.buttonCS.setAddToCartText(settings.button.addToCartText)
                    this.buttonCS.setSoldOutText(settings.button.soldOutText)
                    if (variant.configCS.status === "ACTIVE") {
                        this.buttonCS.showCS(settings)
                        this.addCommonElements(settings, variant)
                    }
                }
            }

            resetDefault() {
                this.buttonBIS.hide()
                this.buttonCS.hide()

                // timer
                this.timerPO.hide()
                this.timerIS.hide()
                this.timerBIS.hide()
                this.timerCS.hide()

                // listeners
                this.buttonPO.removeCartAlertListener()
                this.buttonIS.removeCartAlertListener()

                if (!this.buttonPO.confirmButtonExists() || !this.buttonIS.confirmButtonExists()) {
                    this.buttonPO.identifyButton(this.selectors);
                    this.buttonIS.identifyButton(this.selectors);
                    this.selectors.buttonSelector = $(this.selectors.formSelector).find(this.selectors.ids.addToCartButton);
                }

                if (this.product.isVariantOutOfStock()) {
                    this.buttonPO.showOutOfStock();
                    $(this.selectors.formSelector).find(".shopify-payment-button").hide();
                } else {
                    this.buttonPO.showAddToCart();
                    $(this.selectors.formSelector).find(".shopify-payment-button").show();
                }
                this.removePreorderLineItemProperty();
                this.removePreorderMessage();
                this.removePreorderBadge();
                this.removePreorderQuantity();

                if (this.selectors.hideProductElements) {
                    this.addHiddenElements();
                }
            }

            addCommonElements(settings, variant) {
                const type = settings.type === "BIS" ? "bis" : settings.type === "CS" ? "cs" : settings.type === "IS" ? "is" : "preorder"

                if (type !== "is") {
                    $(this.selectors.formSelector).find(".shopify-payment-button").hide();
                }

                this.addPreorderMessage(settings.message, variant, type)

                settings.badge.product && this.addBadge(this.selectors.badgeSelector, settings.badge, type)

                this.selectors.hideProductElements && $(this.selectors.hideProductElements).hide();

                // set timer & activate
                const timer = settings.message.timer
                if (!!timer) {
                    const configType = settings.type !== "PO" ? settings.type : ""
                    this[`timer${settings.type}`].setTimerInfo({ ...timer, productConfig: variant[`config${configType}`] })
                    this[`timer${settings.type}`].show()
                }
            }

            showPreorderLineItemProperty(key, value) {
                0 === $(this.selectors.formSelector).find("#preorder-label").length
                    ? $(this.selectors.formSelector).append('<input type="hidden" id="preorder-label" name="properties[' + key + ']" value="' + value + '" />')
                    : $(this.selectors.formSelector).find("#preorder-label").val(value);
            }

            removePreorderLineItemProperty() {
                $(this.selectors.formSelector).find("#preorder-label").remove();
            }

            removePreorderBadge() {
                $(this.selectors.badgeSelector).find(".timesact-badge-ribbon-preorder, .timesact-badge-ribbon-bis, .timesact-badge-ribbon-cs, .timesact-badge-ribbon-is").remove();
                $(this.selectors.badgeSelector).find(".timesact-badge-common-preorder, .timesact-badge-common-bis, .timesact-badge-common-cs, .timesact-badge-common-is").remove();
            }

            addBadge(selector, settings, settingType) {
                const badge = new Badge();
                badge.add(selector, settings.type, settings.value, settingType);
                badge.applyStyles(settings, settingType);
            }

            addPreorderMessage(settings, variant, type) {
                const message = new Message(settings.locale || "en-US");

                // Set-up preorder message.
                if (settings.value != "") {
                    const configType = type === "bis" ? 'configBIS' : type === "cs" ? "configCS" : type === 'is' ? 'configIS' : 'config'
                    const messageValue = message.populateDynamicValues(variant, settings.value, /*isCartLabel=*/false, /*configType=*/ configType)
                    this.showPreorderMessage(settings.type, messageValue, type);
                    message.addStylePreorderMessage(settings, type);
                }
            }

            showPreorderMessage(placementType, value, type) {
                if (this.selectors.messageSelector) {
                    0 === $(this.selectors.formSelector).find(`.timesact-${type}-description`).length
                        ? placementType === "BELOW"
                            ? $(this.selectors.messageSelector).after(`<div class='timesact-${type}-description'>` + value + "</div>")
                            : $(this.selectors.messageSelector).before(`<div class='timesact-${type}-description'>` + value + "</div>")
                        : $(this.selectors.formSelector).find(`.timesact-${type}-description`).val(value);
                    return
                }
                0 === $(this.selectors.formSelector).find(`.timesact-${type}-description`).length
                    ? placementType === "BELOW"
                        ? $(this.selectors.buttonSelector).after(`<div class='timesact-${type}-description'>` + value + "</div>")
                        : $(this.selectors.buttonSelector).before(`<div class='timesact-${type}-description'>` + value + "</div>")
                    : $(this.selectors.formSelector).find(`.timesact-${type}-description`).val(value);
            }

            removePreorderMessage() {
                $(this.selectors.formSelector).find(".timesact-preorder-description, .timesact-bis-description, .timesact-cs-description, .timesact-is-description").remove();
            }

            removePreorderQuantity() {
                $(".timesact-quantity-message").remove();
                $(this.selectors.quantitySelector).off('change.quantityChange');
                $(this.selectors.buttonSelector).off('click.quantityButtonClick');
            }

            addHiddenElements() {
                $(this.selectors.hideProductElements).show();
            }

            addQuantityListener(preorderQty) {
                const selectors = this.selectors;
                $(this.selectors.quantitySelector).on('change.quantityChange', function () {
                    if (preorderQty < parseInt($(this).val())) {
                        if (!$(".timesact-quantity-message").length) {
                            if (selectors.messageSelector) {
                                $(selectors.messageSelector).before("<div class='timesact-quantity-message' style='color:red'>" + `You can only pre-order ${preorderQty} items!` + "</div>");
                            } else {
                                $(selectors.buttonSelector).before("<div class='timesact-quantity-message' style='color:red'>" + `You can only pre-order ${preorderQty} items!` + "</div>");
                            }
                        }
                        $(selectors.buttonSelector).prop("disabled", true);
                    } else {
                        $(".timesact-quantity-message").remove();
                        $(selectors.buttonSelector).prop("disabled", false);
                    }
                });

                $(this.selectors.buttonSelector).on('click.quantityButtonClick', function (event) {
                    const qty = $(selectors.quantitySelector).val();
                    if (preorderQty < parseInt(qty)) {
                        event.preventDefault();
                        if (!$(".timesact-quantity-message").length) {
                            if (selectors.messageSelector) {
                                $(selectors.messageSelector).before("<div class='timesact-quantity-message' style='color:red'>" + `You can only pre-order ${preorderQty} items!` + "</div>");
                            } else {
                                $(selectors.buttonSelector).before("<div class='timesact-quantity-message' style='color:red'>" + `You can only pre-order ${preorderQty} items!` + "</div>");
                            }
                        }
                    } else {
                        $(".timesact-quantity-message").remove();
                    }
                });
            }
        }

        class TimesactEventListener {
            initVariantEventListener(preorder) {
                var event = this;
                ($(document).on("change", ".timesact-variant-picker-" + preorder.uuid, function (e) {
                    event.variantChangeHandler(preorder);
                }),
                    event.setup(function () {
                        event.variantChangeHandler(preorder);
                    }));
            }

            sleep(e) {
                return new Promise(function (t) {
                    setTimeout(t, e);
                });
            }

            variantChangeHandler(preorder) {
                const preorderEntry = preorder;

                this.sleep(preorder.selectors.variantChangingTime).then(function () {
                    var selectedVariantId = window.location.search.replace(/.*variant=(\d+).*/, '$1');
                    if (!selectedVariantId) {
                        selectedVariantId =
                            "radio" === $(preorderEntry.selectors.formSelector).find("select[name='id'], input[name='id'], select[name='id[]'], input[name='id[]']").attr("type")
                                ? $(preorderEntry.selectors.formSelector).find("input[name='id']:checked, input[name='id[]']:checked").val()
                                : $(preorderEntry.selectors.formSelector).find("select[name='id'], input[name='id'], select[name='id[]'], input[name='id[]']").val();
                    }
                    preorderEntry.product.setActiveVariant(selectedVariantId);
                    preorderEntry.resetDefault();
                    preorderEntry.createWidget();
                });
            }


            track(fn, handler, before) {
                return function r() {
                    if (before) return handler.apply(this, arguments), fn.apply(this, arguments);
                    var result = fn.apply(this, arguments);
                    return handler.apply(this, arguments), result;
                };
            }

            setup(handler) {
                history.pushState = this.track(history.pushState, handler);
                history.replaceState = this.track(history.replaceState, handler);
                window.addEventListener("popstate", handler);
            };
        }

        class Api {
            static async createSubscription(data) {
                try {
                    await $.ajax({
                        url: `/apps/timesact/notifications/bis`,
                        type: 'POST',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: JSON.stringify(data)
                    })

                    return true
                } catch (err) {
                    console.log("Subscription no create", err)

                    return false
                }
            }

            static async getProductPreOrderConfig(productId) {
                try {
                    return await $.ajax({
                        url: `/apps/timesact/config?productId=${productId}`,
                        type: 'GET',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json"
                    })
                } catch (err) {
                    console.log("Product is not active on pre-order.")
                    return null
                }
            }

            async getProducts(productIds = []) {
                try {
                    return await $.ajax({
                        url: `/apps/timesact/products?productIds=${productIds}`,
                        type: 'GET',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json"
                    });
                } catch (err) {
                    console.log("Products config couldn't be fetched.");
                    return null;
                }
            }

            async getShop() {
                try {
                    return await $.ajax({
                        url: `/apps/timesact/shop`,
                        type: 'GET',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json"
                    })
                } catch (err) {
                    console.log("Shop data couldn't be fetched.")
                    return null
                }
            }

            async getSettings() {
                try {
                    return await $.ajax({
                        url: `/apps/timesact/shop/settings`,
                        type: 'GET',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json"
                    })
                } catch (err) {
                    console.log("Settings data couldn't be fetched.")
                    return null
                }
            }
        }

        class Selectors {
            constructor(selectors) {
                this.ids = selectors;
            }

            setNormalSelectors() {
                this.formSelector = $(this.ids.form)
                this.buttonSelector = this.formSelector.find(this.ids.addToCartButton)
                if (this.buttonSelector.length === 0) {
                    // In case the Add To Cart button was not identified, we try some generic selectors.
                    this.buttonSelector = this.formSelector.find('[type="submit"]:visible:first, [name="add"], .product-submit, .addtocart-button-active, .product-form--add-to-cart, .button--addToCart, .product-form__submit, .add-to-cart, .btn-addtocart, .single_add_to_cart_button, .product-form__cart-submit, .product-form--atc-button, .ProductForm__AddToCart, [type="button"]:visible:first').first()
                }
                this.variantSelector = this.formSelector.find(this.ids.variant)

                if (this.ids.quantity) {
                    this.quantitySelector = this.formSelector.find(this.ids.quantity)
                } else {
                    this.quantitySelector = this.formSelector.find('[name="quantity"]')
                    if (this.quantitySelector.length === 0) {
                        this.quantitySelector = $('[name="quantity"]')
                    }
                }

                if (this.ids.badge) {
                    this.badgeSelector = $(this.ids.badge)
                } else {
                    this.badgeSelector = $('.timesact-badge')
                }

                if (this.ids.message) {
                    this.messageSelector = this.formSelector.find(this.ids.message)
                }

                // timer
                this.timerSelector = this.formSelector.find('[type="submit"]:visible:first')
                if (this.ids.timer) {
                    this.timerSelector = this.formSelector.find(this.ids.timer)
                }

                if (this.ids.hide && this.ids.hide.product) {
                    this.hideProductElements = this.ids.hide.product
                }
                this.variantChangingTime = this.ids.variantChangingTime || 250

                // PageFly Integration.
                if (this.formSelector.find('[data-pf-type="ProductATC"], [data-pf-type="ProductATC2"]').length > 0) {
                    this.buttonSelector = this.formSelector.find('[data-pf-type="ProductATC"] span:first, [data-pf-type="ProductATC2"] span:first')
                    this.messageSelector = this.formSelector.find(this.ids.message || '[data-pf-type="ProductATC"]')
                    this.badgeSelector = $('[data-pf-type="MainMedia"]')

                }
            }

            setQuickViewSelectors() {
                this.formSelector = $(window.ta.quickView.selectors.quickviewModalContainer).find(window.ta.quickView.selectors.form);
                this.buttonSelector = $(window.ta.quickView.selectors.quickviewModalContainer).find(window.ta.quickView.selectors.addToCartButton);
                this.variantSelector = $(window.ta.quickView.selectors.quickviewModalContainer).find(window.ta.quickView.selectors.variant);
                this.quantitySelector = $(window.ta.quickView.selectors.quickviewModalContainer).find(window.ta.quickView.selectors.quantity);
                if (this.ids.message) {
                    this.messageSelector = this.formSelector.find(this.ids.message);
                }
                this.variantChangingTime = this.ids.variantChangingTime || 250;

                if (this.ids.badge) {
                    this.badgeSelector = $(this.ids.badge);
                } else {
                    this.badgeSelector = $('.timesact-badge');
                }
            }
        }

        /* Main entry point. */
        class ScriptRunner {
            constructor(shop, product) {
                this.shop = shop
                this.product = product
            }

            async run(isQuickView) {
                const timesactProduct = await Api.getProductPreOrderConfig(this.product.id)

                if (!timesactProduct) {
                    // Product is not set in the app. Store it in the cache.
                    window.ta.products[this.product.id] = {
                        isPreorder: false,
                        isBIS: false,
                        isCS: false,
                        isIS: false,
                        lastUpdate: parseInt(new Date().getTime() / 1000)
                    };
                    localStorage.setItem("products", JSON.stringify(window.ta.products))

                    return
                }

                window.ta.currentTimesactProductData = {
                    defaultSettings: this.shop.settings,
                    productId: this.product.id,
                    productName: this.product.title,
                    productVariants: timesactProduct.product.variants,
                    variantId: null
                }

                this.selectors = new Selectors(this.shop.selectors)

                if (!isQuickView) {
                    this.selectors.setNormalSelectors()
                } else {
                    this.selectors.setQuickViewSelectors()
                }

                this.product.setActiveVariant(new ProductUtil().extractVariantId(this.product.variants, this.selectors.formSelector))
                this.product.setTimesactVariants(timesactProduct.product)

                const timesact = new Timesact(this.selectors, this.product, this.shop.settings.templates, this.shop)

                timesact.init()

                window.ta.products[this.product.id] = {
                    isPreorder: this.isActiveOnPreorder(timesactProduct.product.variants),
                    isBIS: this.isActiveOnBIS(timesactProduct.product.variants),
                    isCS: this.isActiveOnCS(timesactProduct.product.variants),
                    isIS: this.isActiveOnIS(timesactProduct.product.variants),
                    variants: timesactProduct.product.variants,
                    lastUpdate: parseInt(new Date().getTime() / 1000)
                }
                localStorage.setItem("products", JSON.stringify(window.ta.products))
            }

            async runCollection() {
                if (window.ta.settings[this.shop.settings.templates.PO].badge.collection ||
                    window.ta.settings[this.shop.settings.templates.BIS].badge.collection ||
                    window.ta.settings[this.shop.settings.templates.CS].badge.collection ||
                    window.ta.settings[this.shop.settings.templates.IS].badge.collection) {
                    if (this.shop.lastProductUpdate && window.ta.lastProductUpdate < this.shop.lastProductUpdate) {
                        // Invalidate the product cache if there was a change on server-side.
                        window.ta.products = {};
                    }
                    // Enable badge on collection.
                    let possibleClasses = ['.timesact-badge', '.product-item', '.card--standard', '.card--card', '.ProductItem', '[data-pf-type="ProductBox"]'];
                    if (this.shop.selectors.collection && this.shop.selectors.collection.badge) {
                        possibleClasses = [this.shop.selectors.collection.badge];
                    }

                    let items = [];
                    for (let i = 0; i < possibleClasses.length; i++) {
                        if ($(possibleClasses[i]).length > 0) {
                            items = $(possibleClasses[i]);
                            break;
                        }
                    }

                    this.enableBadgeOnCollection(items)
                }
            }

            async runMixedCartAlert(data) {
                if (!window.ta.cart.showMixedCartAlert) {
                    return;
                }

                if (!data.items.length) {
                    return;
                }

                const isCartPage = window.location.pathname.includes("cart")
                const defaultSettingsPO = window.ta.settings[this.shop.settings.templates.PO]
                if (
                    !defaultSettingsPO.cart.mixed.isEnabled ||
                    (isCartPage && defaultSettingsPO.cart.mixed.onCartPage === false) || // on /cart check page enabled
                    (!isCartPage && defaultSettingsPO.cart.mixed.onButtonClick !== true) // on other check button click
                ) {
                    return;
                }

                let hasPreorderProduct = false;
                let hasNormalProduct = false;
                let products = {};

                for (const item of data.items) {
                    if (window.ta.products[item.product_id]) {
                        if (window.ta.products[item.product_id].variants && window.ta.products[item.product_id].variants[item.variant_id]) {
                            if (window.ta.products[item.product_id].variants[item.variant_id].config.status === "ACTIVE") {
                                hasPreorderProduct = true;
                                continue;
                            }
                        }
                        hasNormalProduct = true;
                        continue;
                    }
                    // products is not in the cache.
                    products[item.product_id] = products[item.product_id] || [];
                    products[item.product_id].push(item.variant_id);
                }

                const modal = new Modal();
                const modalSettings = { ...defaultSettingsPO.cart.mixed, id: defaultSettingsPO.id || defaultSettingsPO.name }

                const closeModal = () => {
                    window.sessionStorage.setItem("showCartMixedAlert", !($('#md-stop').is(":checked")));
                    window.ta.cart.showMixedCartAlert = !($('#md-stop').is(":checked"))
                }

                if (hasPreorderProduct && hasNormalProduct) {
                    return modal.display(modalSettings, closeModal);
                }

                if (!Object.keys(products).length) {
                    return;
                }

                const timesact = await new Api().getProducts(Object.keys(products))
                if (!timesact) {
                    console.log('[Error] Timesact API getProducts.')
                    return
                }

                for (const productId of Object.keys(products)) {
                    if (!(productId in timesact.products)) {
                        hasNormalProduct = true
                        // Product is not set in the app. Store it in the cache.
                        window.ta.products[productId] = {
                            isPreorder: false,
                            isBIS: false,
                            isCS: false,
                            lastUpdate: parseInt(new Date().getTime() / 1000)
                        }
                        continue
                    }

                    for (const variantId of products[productId]) {
                        if (timesact.products[productId].variants[variantId] && timesact.products[productId].variants[variantId].config.status === "ACTIVE") {
                            hasPreorderProduct = true
                            continue
                        }
                        hasNormalProduct = true
                    }

                    window.ta.products[productId] = {
                        isPreorder: this.isActiveOnPreorder(timesact.products[productId].variants),
                        isBIS: this.isActiveOnBIS(timesact.products[productId].variants),
                        isCS: this.isActiveOnCS(timesact.products[productId].variants),
                        isIS: this.isActiveOnIS(timesact.products[productId].variants),
                        variants: timesact.products[productId].variants,
                        lastUpdate: parseInt(new Date().getTime() / 1000)
                    };

                    if (hasNormalProduct && hasPreorderProduct) {
                        modal.display(modalSettings, closeModal);
                        break;
                    }
                }
                localStorage.setItem("products", JSON.stringify(window.ta.products));
            }

            async runCartAlert(data) {
                if (!data.items.length) {
                    return;
                }

                // collect products here
                const products = {};

                // from cache
                for (var item of data.items) {
                    const product = window.ta.products[item.product_id]
                    // not in cache
                    if (!product) continue

                    const variant = product?.variants?.[item.variant_id]
                    const configName = product.isIS ? "configIS" : "config"
                    if (variant?.[configName]?.status !== "ACTIVE") continue

                    products[item.product_id] = {
                        ...(products[item.product_id] || {}),
                        [item.variant_id]: variant,
                    }
                }

                // empty products
                if (!Object.keys(products).length) return;

                // get products & variants & set templates
                const storageTmps = JSON.parse(window.sessionStorage.getItem("showCartAlert") || null) || {}
                const tmps = {}
                for (const [productId, product] of Object.entries(products)) {
                    for (const [variantId, variant] of Object.entries(product)) {
                        const configName = variant.isISEnabled ? "configIS" : "config"
                        const tmpSettings = window.ta.settings[variant[configName]?.settingsTemplate]
                        const id = `${tmpSettings.type}-${productId}-${variantId}`
                        tmps[id] = {
                            dismiss: !!storageTmps[id]?.dismiss,
                            settings: {
                                id,
                                ...tmpSettings.cart?.alert
                            }
                        }
                    }
                }

                const closeModal = (settings) => {
                    return () => {
                        const actualStorageTmps = JSON.parse(window.sessionStorage.getItem("showCartAlert") || null) || {}
                        return new TimesactButton("", "").closeCartAlertModal(settings, actualStorageTmps)
                    }
                }

                // check enabled & push to queue
                for (const tmp of Object.values(tmps)) {
                    if (!tmp.settings.isEnabled || tmp.settings.onCartPage === false || tmp.dismiss) {
                        continue
                    }
                    Modal.pushQueue(tmp.settings, closeModal(tmp.settings))
                }
                Modal.showFirst()
            }

            /** Checks if all the variants are active on pre-order. */
            isActiveOnPreorder(variants) {
                return Object.values(variants).every((variant) => variant.config.status === "ACTIVE")
            }

            /** Checks if all the variants are active on back in stock. */
            isActiveOnBIS(variants) {
                return Object.values(variants).every((variant) => variant.configBIS && variant.configBIS.status === "ACTIVE")
            }

            /** Checks if all the variants are active on coming soon. */
            isActiveOnCS(variants) {
                return Object.values(variants).every((variant) => variant.configCS && variant.configCS.status === "ACTIVE")
            }

            /** Checks if all the variants are active on in stock. */
            isActiveOnIS(variants) {
                return Object.values(variants).some((variant) => variant.configIS && variant.configIS.status === "ACTIVE")
            }

            async enableBadgeOnCollection(items) {
                if (items.length === 0) {
                    console.log('No items detected.')
                    return
                }

                const products = {}
                const defaultSettingsPO = window.ta.settings[this.shop.settings.templates.PO]
                const defaultSettingsBIS = window.ta.settings[this.shop.settings.templates.BIS]
                const defaultSettingsCS = window.ta.settings[this.shop.settings.templates.CS]
                const defaultSettingsIS = window.ta.settings[this.shop.settings.templates.IS]

                await Promise.all(Array.from(items).map(async (item) => {
                    var productId;
                    if ($(item).data('product-id')) {
                        // PageFly Integration.
                        productId = $(item).data('product-id')
                    } else {
                        let href = $(item).find('a').attr('href')
                        if (!href) {
                            return
                        }
                        let handle = href.split("/").pop().split('?')[0]
                        if (!handle) {
                            return
                        }

                        const data = await $.getJSON(window.location.origin + href)
                        if (!data || !data.product || !data.product.id) {
                            return;
                        }

                        productId = String(data.product.id)
                    }

                    if (window.ta.products[productId]) {
                        let shouldHide = false
                        if (window.ta.products[productId].isPreorder && defaultSettingsPO.badge.collection) {
                            this.addBadge(item, defaultSettingsPO.badge, 'preorder')
                            shouldHide = true
                            // Enable button on collection.
                            defaultSettingsPO.button.collection && defaultSettingsPO.button.collection.isEnabled && this.enableButtonOnCollection(item, this.shop, window.ta.products[productId], defaultSettingsPO)
                        }

                        if (window.ta.products[productId].isBIS && defaultSettingsBIS.badge.collection) {
                            this.addBadge(item, defaultSettingsBIS.badge, 'bis')
                            shouldHide = true
                        }

                        if (window.ta.products[productId].isCS && defaultSettingsCS.badge.collection) {
                            this.addBadge(item, defaultSettingsCS.badge, 'cs')
                            shouldHide = true
                        }

                        if (window.ta.products[productId].isIS && defaultSettingsIS.badge.collection) {
                            this.addBadge(item, defaultSettingsIS.badge, 'is')
                            shouldHide = true
                        }

                        // Hide elements from the collection page.
                        shouldHide && this.shop.selectors.hide && this.shop.selectors.hide.collection && $(item).find(this.shop.selectors.hide.collection).hide()

                        return
                    }

                    products[productId] = item
                }))

                const timesact = await new Api().getProducts(Object.keys(products))
                if (!timesact) {
                    console.log('[Error] Timesact API getProducts.')
                    return
                }

                for (const [productId, item] of Object.entries(products)) {
                    if (!(productId in timesact.products)) {
                        // Product is not set in the app. Store it in the cache.
                        window.ta.products[productId] = {
                            isPreorder: false,
                            isBIS: false,
                            isCS: false,
                            isIS: false,
                            lastUpdate: parseInt(new Date().getTime() / 1000)
                        }
                        continue
                    }

                    const isPreorder = this.isActiveOnPreorder(timesact.products[productId].variants)
                    const isBIS = this.isActiveOnBIS(timesact.products[productId].variants)
                    const isCS = this.isActiveOnCS(timesact.products[productId].variants)
                    const isIS = this.isActiveOnIS(timesact.products[productId].variants)

                    let shouldHide = false
                    if (isPreorder && defaultSettingsPO.badge.collection) {
                        this.addBadge(item, defaultSettingsPO.badge, 'preorder')
                        shouldHide = true
                        // Enable button on collection.
                        defaultSettingsPO.button.collection && defaultSettingsPO.button.collection.isEnabled && this.enableButtonOnCollection(item, this.shop, timesact.products[productId], defaultSettingsPO)
                    }

                    if (isBIS && defaultSettingsBIS.badge.collection) {
                        this.addBadge(item, defaultSettingsBIS.badge, 'bis')
                        shouldHide = true
                    }

                    if (isCS && defaultSettingsCS.badge.collection) {
                        this.addBadge(item, defaultSettingsCS.badge, 'cs')
                        shouldHide = true
                    }

                    if (isIS && defaultSettingsIS.badge.collection) {
                        this.addBadge(item, defaultSettingsIS.badge, 'is')
                        shouldHide = true
                    }

                    // Hide elements from the collection page.
                    shouldHide && this.shop.selectors.hide && this.shop.selectors.hide.collection && $(item).find(this.shop.selectors.hide.collection).hide()

                    window.ta.products[productId] = {
                        isPreorder,
                        isBIS,
                        isCS,
                        isIS,
                        variants: timesact.products[productId].variants,
                        lastUpdate: parseInt(new Date().getTime() / 1000)
                    };
                }
                localStorage.setItem("products", JSON.stringify(window.ta.products));
            }

            enableButtonOnCollection(item, shop, product, defaultSettingsPO) {
                let formCollectionSelector = 'form[action="/cart/add"]'
                if (shop.selectors.collection && shop.selectors.collection.form) {
                    formCollectionSelector = shop.selectors.collection.form
                }

                let addToCartButtonCollectionSelector = '[type=submit]:visible:first, [data-pf-type="ProductATC"] span:first, [data-pf-type="ProductATC2"] span:first'
                if (shop.selectors.collection && shop.selectors.collection.addToCartButton) {
                    addToCartButtonCollectionSelector = shop.selectors.collection.addToCartButton
                }

                const productForm = $(item).find(formCollectionSelector);
                for (let variant in product.variants) {
                    if (product.variants[variant].config.status === "ACTIVE") {
                        const buttonSelector = $(item).find(addToCartButtonCollectionSelector);
                        let buttonName = window.ta.settings[product.variants[variant].config.settingsTemplate] ? window.ta.settings[product.variants[variant].config.settingsTemplate].button.name : defaultSettingsPO.button.name
                        $(buttonSelector).val(buttonName);
                        $(buttonSelector).text(buttonName);
                        $(buttonSelector).prop("disabled", false);
                        $(item).find(".shopify-payment-button").hide();

                        const message = new Message(defaultSettingsPO.message.locale || "en-US")
                        let cartValue = window.ta.settings[product.variants[variant].config.settingsTemplate] ? window.ta.settings[product.variants[variant].config.settingsTemplate].cart.labelText.value : defaultSettingsPO.cart.labelText.value;
                        let cartKey = window.ta.settings[product.variants[variant].config.settingsTemplate] ? window.ta.settings[product.variants[variant].config.settingsTemplate].cart.labelText.key : defaultSettingsPO.cart.labelText.key;


                        cartKey = message.populateDynamicValues(product.variants[variant], cartKey, /*isCartLabel=*/true, /*configType=*/'config')
                        cartValue = message.populateDynamicValues(product.variants[variant], cartValue,  /*isCartLabel=*/true, /*configType=*/'config')

                        0 === $(productForm).find("#preorder-label").length
                            ? $(productForm).append('<input type="hidden" id="preorder-label" name="properties[' + cartKey + ']" value="' + cartValue + '" />')
                            : $(productForm).find("#preorder-label").val(cartValue);
                    }
                }
            }

            addBadge(selector, settings, settingType) {
                // PageFly Integration.
                if ($(selector).find('[data-pf-type="ProductMedia"], [data-pf-type="ProductMedia2"]').length > 0) {
                    selector = $(selector).find('[data-pf-type="ProductMedia"], [data-pf-type="ProductMedia2"]')
                }

                // add position relative to product item if not absolute
                if ($(selector).css("position") !== "absolute") {
                    $(selector).css({
                        "position": "relative"
                    });
                }

                const badge = new Badge();
                badge.add(selector, settings.type, settings.value, settingType);
                badge.applyStyles(settings, settingType);
            }
        }

        $(document).ready(async function () {
            const api = new Api()
            const utils = new ShopUtil()

            TimesactBisModal.createListeners()

            // Initialize app.
            utils.initTimesact()

            if (!utils.isProductPage() && !utils.isCollectionPage() && !utils.isSearchPage()
                && !utils.isPagesPage() && !utils.isHomePage() && !utils.isCartPage()) {
                return
            }

            const shop = await api.getShop()

            // Get the new settings if they have been updated on the backend side.
            if (!window.ta.settings || (shop.lastSettingsUpdate && window.ta.lastSettingsUpdate < shop.lastSettingsUpdate)) {
                const { settings } = await api.getSettings()

                window.ta.settings = settings
                window.ta.lastSettingsUpdate = shop.lastSettingsUpdate || parseInt(new Date().getTime() / 1000);
                localStorage.setItem("settings", JSON.stringify(window.ta.settings))
                localStorage.setItem("lastSettingsUpdate", JSON.stringify(window.ta.lastSettingsUpdate))
            }

            if (utils.isProductPage()) {
                let product = {}

                $.getJSON(window.location.href, function (data) {
                    product = new Product(data.product.id, data.product.variants, data.product.title)
                }).done(function () {
                    new ScriptRunner(shop, product).run(/*isQuickView=*/false)
                }).fail(function () {
                    console.log("[Error 1001]: Product could not be fetched.")
                });
            }

            if (utils.isCollectionPage() || utils.isHomePage() || utils.isSearchPage() || utils.isPagesPage()) {
                utils.initQuickView(shop);
                new ScriptRunner(shop).runCollection();
            }

            // mixing alert popup 
            // cart alert popup
            function callRunningMixedCartAlert(timeout = 0, isNeedCartAlert = false) {
                const closedTmpsIds = JSON.parse(window.sessionStorage.getItem("closedModals") || null) || []
                const t = shop.settings.templates.PO
                if (closedTmpsIds.includes(t)) return

                setTimeout(() => {
                    $.getJSON(window.location.origin + "/cart", function (data) {
                        isNeedCartAlert && new ScriptRunner(shop).runCartAlert(data);
                        new ScriptRunner(shop).runMixedCartAlert(data);
                    }).fail(function () {
                        console.log("[Error 1001]: Product could not be fetched.");
                    });
                }, timeout);
            }

            // add click handlers and /cart page handler
            let submitBtn = $(shop.selectors.form).find(shop.selectors.addToCartButton)
            if (submitBtn.prop("tagName") !== "button") submitBtn = submitBtn.parent()
            submitBtn.click(() => callRunningMixedCartAlert(2000))
            $('a[href="/cart"]').click(() => callRunningMixedCartAlert(500))
            if (utils.isCartPage()) {
                callRunningMixedCartAlert(0, true)
            }
        });
    };

    /* If jQuery has not yet been loaded or if it has but it's too old for our needs,
    we will load jQuery from the Google CDN, and when it's fully loaded, we will run
    our app's JavaScript. */
    if ((typeof jQuery === 'undefined') || (parseFloat(jQuery.fn.jquery) < 100.0)) {
        loadScript('https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js', function () {
            jQuery191 = jQuery.noConflict(true);
            timesactScriptNew(jQuery191);
        });
    } else {
        timesactScriptNew(jQuery);
    }

})()