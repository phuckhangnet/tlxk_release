$(function () {
    // $('#status').fadeIn("slow");
    // $('#preloader').fadeIn("slow");
    firstLoadPage();

    loadMenu(getDataMenu());
    addRootCss();
    //
    functionEventCall();
    localStorage.removeItem("lang");
    localStorage.setItem("lang", $('html').attr("lang"));
    // $('#status').fadeOut("slow");
    // $('#preloader').fadeOut("slow");
});

document.onmouseover = function() {
    //User's mouse is inside the page.
    window.innerDocClick = true;
}

document.onmouseleave = function() {
    //User's mouse has left the page.
    window.innerDocClick = false;
}

$(window).on('popstate', function (event) {
    if (window.innerDocClick) {
        window.innerDocClick = false;
    } else {
        firstLoadPage();
    }
});

function loadMenu(lsmenu) {
    if (lsmenu.length > 0) {
        $('ul#menu').html('');
        $.map(lsmenu, function (el) {
            $.map(el.menu, function (el2) {
                let ela = $(el2.description);
                if (ela.attr("hide") === undefined) {
                    ela.attr("id", el2.id).attr("position", el2.position);
                    ela.removeAttr('rootcss');
                    ela.removeAttr('data-groups');
                    //
                    let ela2 = $(el2.description);
                    ela2.attr("id", el2.id).attr("position", el2.position);
                    ela2.empty();
                    ela2.text($(el2.description).text());
                    ela2 = $(ela2.prop('outerHTML').replace(/div/g, 'a'));
                    ela2.attr('href', '#');
                    ela2.removeClass();
                    ela2.removeAttr('rootcss');
                    // level 1
                    let parent = el2.parent;
                    if ($(`ul#menu > li#${parent}`).length === 0) {
                        $(`ul#menu`).append(`<li id="${el2.id}">`);
                        ela.append(`<div class="drop-menu" id="${el2.id}">`);
                        $(`ul#menu > li#${el2.id}`).append(ela);
                    }
                    else {
                        $(`ul#menu > li#${parent} div#${parent}.drop-menu`).append(ela);
                    }
                    //
                    if ($(`ul#menu > li#${parent}`).length === 0) {
                        let li = $(`<li id="${el2.id}">`).append(ela2);
                        let nextlv = el.level + 1;
                        let nexts = lsmenu.find(x => x.level === nextlv);
                        if (nexts !== undefined) {
                            let haschild = nexts.menu.find(x => x.parent.toString() === el2.id.toString());
                            if (haschild !== undefined) {
                                li.addClass('has-children');
                                li.append(ela2).append(`<ul class="cd-secondary-dropdown is-hidden" id="${el2.id}"><li class="go-back"><a href="#0"></a></li></ul>`);
                            }
                        }
                        $(`ul#menu_mini`).append(li);
                    }
                    else {
                        let li = $(`<li id="${el2.id}">`).append(ela2);
                        $(`ul#menu_mini > li#${parent} ul#${parent}.cd-secondary-dropdown`).append(li);
                    }
                }
            });
        });
    }
}