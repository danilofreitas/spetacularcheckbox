(function ($, document) {
    'use strict';
    if (typeof Object.create !== "function") {
        Object.create = function (obj) {
            function F() {
            }

            F.prototype = obj;
            return new F();
        };
    }

    var SpectacularCheckbox = {
        init: function (options, el) {
            var base = this;

            base.$elem = $(el);
            base.options = $.extend({}, $.fn.spectacularCheckbox.options, base.$elem.data(), options);
            base.manager = $.fn.spectacularCheckbox.manager;

            base.userOptions = options;
            base.makeCheckbox();
        },
        makeCheckbox: function () {
            var base = this;

            base.createButton();

            if (base.options.typehead) {
                base.createTypeHead();
            }

            if (base.options.actionButton) {
                base.createActionButton();
            }

            $(document).keyup(function (e) {
                if (e.keyCode === 27 && $('.spetacular-checkbox-toggle-button', base.$elem).hasClass('active')) {
                    base.closeSelect();
                }
            });
        },
        closeSelect: function () {
            var base = this,
                toggleButton = $('.spetacular-checkbox-toggle-button', base.$elem);

            if (toggleButton.hasClass('active')) {
                toggleButton.removeClass('active');
                $('.wrap-spetacular-checkbox', base.$elem).hide();
            }
        },
        showSelect: function () {
            var base = this,
                toggleButton = $('.spetacular-checkbox-toggle-button', base.$elem);

            base.manager.closeAll(base.$elem);
            if (!toggleButton.hasClass('active')) {
                toggleButton.addClass('active');
                $('.wrap-spetacular-checkbox', base.$elem).show();
            }
        },
        toggleSelect: function () {
            var base = this,
                toggleButton = $('.spetacular-checkbox-toggle-button', base.$elem);

            if (!toggleButton.hasClass('active')) {
                base.showSelect();

            } else {
                base.closeSelect();
            }
        },
        createButton: function () {
            var base = this;
            base.$elem.prepend("<button type='button' class='spetacular-checkbox-toggle-button " +
                base.options.buttonClass +
                "'>" +
                base.options.buttonContent +
                "</button>");

            $('.spetacular-checkbox-toggle-button', base.$elem).click(function () {
                base.toggleSelect();
            });

        },
        createTypeHead: function () {
            var base = this;
            $('.wrap-spetacular-checkbox', base.$elem).prepend("<input type='text' class='typehead-field " + base.options.typeheadClass + "' placeholder='" + base.options.typeheadPlaceholder + "'>");

            $('.typehead-field', base.$elem).keyup(function () {
                base.matchCheckBox($(this).val());
            });

        },
        matchCheckBox: function (input) {
            var base = this,
                reg;

            reg = new RegExp(input.split('').join('\\w*').replace(/\W/, ""), 'i');
            $('.checkbox label', base.$elem).each(function () {

                var source = $(this).text();

                console.log(source.match(reg));

                if (!source.match(reg) && !$('input', this).is(':checked')) {
                    $(this).parent().hide();
                } else {
                    $(this).parent().show();
                }
            });

        },
        createActionButton: function () {
            var base = this,
                actionButton;

            $('.wrap-spetacular-checkbox', base.$elem).append("<button type='" +
                base.options.actionButtonType +
                "' class='spetacular-checkbox-action-button " +
                base.options.actionButtonClass +
                "' " +
                (base.options.actionButtonId ? "id='" +
                    base.options.actionButtonId +
                    "'" : "") +
                ">" +
                base.options.actionButtonContent +
                "</button>");

            actionButton = $('.spetacular-checkbox-action-button', base.$elem);
            actionButton.click(function () {
                base.closeSelect();
            });


        }

    };

    $.fn.spectacularCheckbox = function (options) {
        return this.each(function () {
            if ($(this).data("owl-init") === true) {
                return false;
            }
            $(this).data("owl-init", true);
            var spectacular = Object.create(SpectacularCheckbox);
            spectacular.init(options, this);
            $.data(this, "spectacularCheckbox", spectacular);
        });
    };

    $.fn.spectacularCheckbox.options = {
        buttonContent: 'This is a fake',
        buttonClass: 'btn btn-default',
        typehead: false,
        typeheadPlaceholder: '',
        typeheadClass: '',
        actionButton: false,
        actionButtonType: 'button',
        actionButtonContent: 'OK',
        actionButtonId: false,
        actionButtonClass: ''
    };

    $.fn.spectacularCheckbox.manager = {
        closeAll: function (excluded) {
            console.log($('.spetacular-checkbox-toggle-button', excluded));
            var toggleButton = $('.spetacular-checkbox-toggle-button').not($('.spetacular-checkbox-toggle-button', excluded));
            if (toggleButton.hasClass('active')) {
                toggleButton.removeClass('active');
                $('.wrap-spetacular-checkbox').not($('.wrap-spetacular-checkbox', excluded)).hide();
            }
        }
    };

}(jQuery, document));
