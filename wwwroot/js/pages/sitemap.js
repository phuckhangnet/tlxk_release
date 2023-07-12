// let uri_api = "https://dhqt.api.phuckhanggem.com/";
// let uri_img = "https://dhqt.phuckhanggem.com/ftp_images/";
// let uri_api = "https://bndhqt.phuckhangnet.vn/api/";
// let uri_img = "https://bndhqt.phuckhangnet.vn/ftp_images/";
// let uri_api = config.uri_api;
// let uri_img = config.uri_img;
// let uri_sto = config.uri_sto;

function firstLoadPage() {
    if (getUrlParameter("page-name") === false)
        loadPage("home-page");
    else {
        let web_page = getUrlParameter("web-page");
        let menu_name = getUrlParameter("menu-name");
        let menu_id = getUrlParameter("menu-id");
        let scroll_to = getUrlParameter("scroll-to");
        let post_id = getUrlParameter("post-id");
        let table_name = getUrlParameter("table-name");
        let page_name = getUrlParameter("page-name");
        let user_id = getUrlParameter("user-id");
        let department = getUrlParameter("department");
        let position_title = getUrlParameter("position-title");
        loadPage(page_name, menu_name, menu_id, scroll_to, post_id, table_name, web_page, user_id, department, position_title);
    }
    // window.onpopstate = function (e) {
    //     if (getUrlParameter("page-name") === false)
    //         loadPage("home-page");
    //     else {
    //         let web_page = getUrlParameter("web-page");
    //         let menu_name = getUrlParameter("menu-name");
    //         let menu_id = getUrlParameter("menu-id");
    //         let scroll_to = getUrlParameter("scroll-to");
    //         let post_id = getUrlParameter("post-id");
    //         let table_name = getUrlParameter("table-name");
    //         let page_name = getUrlParameter("page-name");
    //         let user_id = getUrlParameter("user-id");
    //         let department = getUrlParameter("department");
    //         let position_title = getUrlParameter("position-title");
    //         loadPage(page_name, menu_name, menu_id, scroll_to, post_id, table_name, web_page, user_id, department, position_title);
    //     }
    // };
}

function getDate(day = 0, month = 0, year = 0) {
    let d = new Date();
    if (year === 0) year = d.getFullYear()
    if (month === 0) month = d.getMonth() + 1;
    if (day === 0) day = d.getDate();
    let output = year + '-' +
        (month < 10 ? '0' : '') + month + '-' +
        (day < 10 ? '0' : '') + day;
    return output;
}

function loadPage(page_name, menu_name = false, menu_id = false, scroll_to = false, post_id = false, table_name = false, web_page = false, user_id = false, department = false, position_title = false) {
    //
    //
    $('nav.cd-dropdown').removeClass('dropdown-is-active');
    // console.log(window.location)
    let random = (1 + Math.floor(Math.random() * 6000));
    $("#content-page").load(`../html/${page_name}.html?_=${random.toString()}`);
    // console.log(window.location)
    let newuri = window.location.origin + "?page-name=" + page_name;
    // newuri = newuri.replace("/?", "?");
    if (menu_name !== undefined && menu_name !== false)
        newuri += "&menu-name=" + menu_name;
    if (menu_id !== undefined && menu_id !== false)
        newuri += "&menu-id=" + menu_id;
    if (scroll_to !== undefined && scroll_to !== false)
        newuri += "&scroll-to=" + scroll_to;
    if (post_id !== undefined && post_id !== false)
        newuri += "&post-id=" + post_id;
    if (table_name !== undefined && table_name !== false)
        newuri += "&table-name=" + table_name;
    if (web_page !== undefined && web_page !== false)
        newuri += "&web-page=" + web_page;
    if (user_id !== undefined && user_id !== false)
        newuri += "&user-id=" + user_id;
    if (department !== undefined && department !== false)
        newuri += "&department=" + department;
    if (position_title !== undefined && position_title !== false)
        newuri += "&position-title=" + position_title;
    replaceURI(newuri);
}

function replaceURI(newuri) {
    try {
        // jQuery("#status").fadeOut();
        // jQuery("#preloader").fadeOut("slow");
        // if (window.history.state === null)
        //     window.history.pushState({ path: newuri, old: [window.location.href] }, '', newuri);
        // else {
        //     let old = window.history.state.old;
        //     if (old.indexOf(window.location.href) === -1)
        //         old.push(window.location.href);
        //     window.history.pushState({ path: newuri, old: old }, '', newuri);
        // }
        window.history.pushState({ path: newuri }, '', newuri);
        // console.log(window.history, 'history')
    } catch (err) { console.log(err); console.log("hello in localhost") }
}

function addRootCss() {
    let rootcsses = $(`[rootadd="true"]`);
    //
    let ls = dtmenu.map(entry => ({ ...entry }));
    $.each(rootcsses, function (i, elrootcss) {
        let el = ls.filter(x => x.description.indexOf(`rootcss="${$(elrootcss).attr("rootcss")}"`) > -1);
        var cls = null;
        if ($(elrootcss).attr("rootcss") === "in-booking") {
            cls = "hs_btn_hover";
        }
        if (el.length > 0)
            loadRootCss(el, $(elrootcss), cls);
    });
    functionEventCall();
}

function loadRootCss(el, elrootcss, cls = null) {// set rootcss
    $.map(el, function (el2) {
        let ela3 = $(el2.description);
        // remove all class + add id
        ela3.attr("id", el2.id); ela3.removeClass();
        if (cls !== null) ela3.addClass(cls);
        //
        if (ela3.attr("rootcss") !== undefined) {
            if (elrootcss.length > 0) {
                let data_groups = ela3.attr("data-groups");
                let html = el2.html;
                if (html !== "") {
                    if (data_groups !== undefined)
                        html = html.replace(':data_groups:', data_groups);
                    //
                    let loaditem = ela3.attr("loaditem");
                    let keys = Object.keys(el2);
                    let result = [el2];
                    // load item change keys [] and resule [{}]
                    if (loaditem !== undefined) {
                        $.ajax({
                            type: 'POST',
                            url: uri_api + "store/StoredProcedure",
                            data: JSON.stringify({
                                "loai": 6,
                                "sotrang": 1,
                                "soitem": loaditem,
                                "menuparentid": el2.id,
                                "menuid": el2.id,
                                "lang": localStorage.getItem('lang'),
                            }),
                            dataType: "json",
                            contentType: "application/json",
                            async: false,
                            globle: false,
                            success: function (su) {
                                if (su.message === "success") {
                                    result = su.responses;
                                    console.log(result)
                                    keys = Object.keys(result[0]);
                                }
                            },
                            error: function (er) {
                                console.log(er)
                            }
                        });
                    }
                    //
                    $.map(result, function (re) {
                        let html2 = html;
                        $.map(keys, function (k) {
                            if (k === 'avatar' && re[k] !== null && re[k] !== '') re[k] = uri_img + re[k].toString();
                            var val = re[k];
                            if (val === undefined) val = "";
                            if (val === null) val = "";
                            while (html2.indexOf(`:${k}:`) > -1)
                                html2 = html2.replace(`:${k}:`, val);
                        });
                        let htmlel = $(html2);
                        if (htmlel.find('p[name="summary"]').length > 0)
                            $(htmlel.find('p[name="summary"]')).html(result.summary);
                        htmlel.attr("id", result.id);
                        if ($(elrootcss[0]).find(`#${result.id}`).length === 0 && ($(elrootcss[0]).attr('id') === undefined || $(elrootcss[0]).attr('id') !== result.id))
                            $(elrootcss[0]).append(htmlel);
                    });
                }
                else {
                    if (ela3.find('p[name="summary"]').length > 0)
                        $(ela3.find('p[name="summary"]')).html(el2.summary);
                    if ($(elrootcss[0]).find(`#${el2.id}`).length === 0 && ($(elrootcss[0]).attr('id') === undefined || $(elrootcss[0]).attr('id') !== el2.id))
                        $(elrootcss[0]).append(ela3);
                }
            }
        }
    });
    $(elrootcss[0]).attr("rootadd", "false");
}

function loadLang(lang) {
    $('.flag-lang').css('display', 'flex');
    $(`#menu-mini .flag-lang[lang="${lang}"]`).hide();
    //set ngon ngu
    try {
        localStorage.setItem('lang', lang);
        //
        let opt = resource_lang[lang];
        let els = Object.keys(opt);
        $.each(els, function (i, el) {
            $(`[relg="${el}"]`).text(opt[el]);
        });
    } catch (e) {
        if (e.name == "NS_ERROR_FILE_CORRUPTED") {
            console.log("Sorry, it looks like your browser storage has been corrupted. Please clear your storage by going to Tools -> Clear Recent History -> Cookies and set time range to 'Everything'. This will remove the corrupted browser storage across all sites.")
        }
    }
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

function changeURIMenuScroll(name = false, scroll = false, postid = false, tablename = false, webpage = false, user_id = false, department = false, position_title = false) {
    let search = window.location.search.split("&");
    if (name !== false) {
        search = search.filter(x => x.indexOf("menu-name") === -1 || x === "");
        search.push("menu-name=" + name);
    }
    if (scroll !== false) {
        search = search.filter(x => x.indexOf("scroll-to") === -1 || x === "");
        search.push("scroll-to=" + scroll);
    }
    if (postid !== false) {
        search = search.filter(x => x.indexOf("post-id") === -1 || x === "");
        search.push("post-id=" + postid);
    }
    if (tablename !== false) {
        search = search.filter(x => x.indexOf("table-name") === -1 || x === "");
        search.push("table-name=" + tablename);
    }
    if (webpage !== false) {
        search = search.filter(x => x.indexOf("web-page") === -1 || x === "");
        search.push("web-page=" + webpage);
    }
    if (user_id !== false) {
        search = search.filter(x => x.indexOf("user-id") === -1 || x === "");
        search.push("user-id=" + user_id);
    }
    if (department !== false) {
        search = search.filter(x => x.indexOf("department") === -1 || x === "");
        search.push("department=" + department);
    }
    if (position_title !== false) {
        search = search.filter(x => x.indexOf("position-title") === -1 || x === "");
        search.push("position-title=" + position_title);
    }
    let newuri = window.location.origin + search.join("&");
    replaceURI(newuri);
}

function getDataMenu(id = 0) {
    let lsmenu = [], obj = {}, ilv = 1;
    let tempmenu = dtmenu.map(entry => ({ ...entry }));
    if (id !== 0) {
        ilv--;
        obj[ilv] = tempmenu.filter(x => x.id.toString() === id);
    }
    else {
        obj[ilv] = tempmenu.filter(x => x.menulevel.toString() === ilv.toString());
    }
    let idparents = obj[ilv].map(x2 => x2.id.toString());
    while (idparents.length > 0) {
        lsmenu.push({ level: ilv, menu: $.each(obj[ilv], function (i, x) { x.menulevel = ilv }) });
        ilv++;
        obj[ilv] = tempmenu.filter(x => idparents.indexOf(x.parent.toString()) > -1);
        idparents = obj[ilv].map(x2 => x2.id.toString());
    }
    lsmenu = lsmenu.filter(x => x.level.toString() !== "0");
    return lsmenu;
}

function setColor(pros) {
    $.map(pros, function (cs) {
        let kva = cs.split(":");
        if (kva[1] !== undefined) {
            let key = kva[0].toString().trim();
            let value = kva[1].toString().replace(/^\s+|\s+$/gm, '').replace("!important", "");
            $("body").get(0).style.setProperty(key, value);
        }
    });
}

function functionEventCall(el_name = "") {
    let el = el_name;
    if (el !== "") el = "#" + el + " ";

    $(`${el}[webpage="true"]`).unbind('click');
    $(`${el}[webpage="true"]`).bind('click', function (e) {
        e.stopPropagation();
        let id = $(this).attr('id');
        let elid = dtmenu.find(x => x.id.toString() === id);
        let pros = elid.rootcss.split(";");
        setColor(pros);
        $('#title-subpage').html(`<span id="txtSubpageName" relg="${$(this).attr('relg')}">${$(elid.description).text().toUpperCase()}</span>`);
        //
        let lsmenu = getDataMenu(id);
        //
        if (lsmenu.length > 0) {
            loadMenu(lsmenu, true);
            functionEventCall();
            $('#menu-part div.menu-part-level1 .menu-item:first-child').trigger('click');
        }
        sessionStorage.setItem("webpage", id);
        loadLang(localStorage.getItem("lang"));
    });

    $(`${el}[reset="true"]`).unbind('click');
    $(`${el}[reset="true"]`).bind('click', function (e) {
        e.stopPropagation();
        //
        sessionStorage.removeItem("webpage");
        let lsmenu = getDataMenu();
        loadMenu(lsmenu);
        loadPage("home-page");
    });

    $(`${el}[html="true"]`).unbind('click');
    $(`${el}[html="true"]`).bind('click', function (e) {
        e.stopPropagation();
        loadPage($(this).attr(`page`), $(this).attr(`menu`), $(this).attr(`id`), $(this).attr(`scroll`), false, false, false, false, $(this).attr(`department`), $(this).attr(`position_title`));
    });

    $(`${el}[single="true"]`).unbind('click');
    $(`${el}[single="true"]`).bind('click', function (e) {
        e.stopPropagation();
        let postid = $(this).attr("postid");
        let tablename = $(this).attr("tablename");
        if (tablename !== undefined)
            loadPage("single-post", $(this).attr(`menu`), $(this).attr(`id`), $(this).attr(`scroll`), postid, tablename, false, false, $(this).attr(`department`), $(this).attr(`position_title`));
        else if (postid !== undefined)
            loadPage("single-post", $(this).attr(`menu`), $(this).attr(`id`), $(this).attr(`scroll`), postid, false, false, false, $(this).attr(`department`), $(this).attr(`position_title`));
        else
            loadPage("single-post", $(this).attr(`menu`), $(this).attr(`id`), $(this).attr(`scroll`), false, false, false, false, $(this).attr(`department`), $(this).attr(`position_title`));

    });

    $(`${el}[multimini="true"]`).unbind('click');
    $(`${el}[multimini="true"]`).bind('click', function (e) {
        e.stopPropagation();
        loadPage("multi-mini-post", $(this).attr(`menu`), $(this).attr(`id`), $(this).attr(`scroll`), false, false, false, false, $(this).attr(`department`), $(this).attr(`position_title`));
    });

    $(`${el}[multi="true"]`).unbind('click');
    $(`${el}[multi="true"]`).bind('click', function (e) {
        e.stopPropagation();
        loadPage("multi-post", $(this).attr(`menu`), $(this).attr(`id`), $(this).attr(`scroll`), false, false, false, false, $(this).attr(`department`), $(this).attr(`position_title`));
    });

    $(`${el}[multileft="true"]`).unbind('click');
    $(`${el}[multileft="true"]`).bind('click', function (e) {
        e.stopPropagation();
        loadPage("multi-mini-post-left", $(this).attr(`menu`), $(this).attr(`id`), $(this).attr(`scroll`), false, false, false, false, $(this).attr(`department`), $(this).attr(`position_title`));
    });

    $(`${el}[multiright="true"]`).unbind('click');
    $(`${el}[multiright="true"]`).bind('click', function (e) {
        e.stopPropagation();
        loadPage("multi-mini-post-right", $(this).attr(`menu`), $(this).attr(`id`), $(this).attr(`scroll`), false, false, false, false, $(this).attr(`department`), $(this).attr(`position_title`));
    });
    // event for template
}

function loadCountRow(data, el_name, menuid, lang) {
    if (data.length > 0) {
        let soitemtong = parseFloat(data[0].countrow);
        //
        if (soitemtong > 0) {
            let numberofpost = Math.floor(parseInt(soitemtong) / soitem);
            if ((soitemtong % parseFloat(soitem)) > 0) numberofpost++;
            if (numberofpost > 0) {
                $(`#${el_name} #number-of-post`).text(`/` + numberofpost);
                $(`#${el_name} #number-of-post`).attr(`value`, numberofpost);
            }

            $(`#${el_name} .btn-page`).click(function (e) {
                let page = parseInt($(`#${el_name} #current-page-post`).text());
                let numpage = parseInt($(`#${el_name} #number-of-post`).attr(`value`));
                if ($(this).attr(`id`) === "left")
                    page--;
                else page++;
                page = (page < 1 ? 1 : page);
                page = (page > numpage ? numpage : page);
                if (parseInt($(`#${el_name} #current-page-post`).text()) !== page) { }
                $(`#${el_name} #current-page-post`).text(page);
                loadMultiPost(page, el_name, menuid, lang)
            });
        }
    }
}

function loadMultiPost(page, el_name, menuid, lang, loai = "articles", readmore = true) {
    let firstid = 0;
    let dtpage = [];
    if (loai === "articles") {
        $.ajax({
            type: 'POST',
            url: uri_api + "store/StoredProcedure",
            data: JSON.stringify({
                "loai": 61,
                "sotrang": page,
                "soitem": soitem,
                "menuparentid": menuid,
                "lang": lang,
            }),
            async: false,
            globle: false,
            dataType: "json",
            contentType: "application/json",
            success: function (su) {
                if (su.message === "success") {
                    if (su.responses.length === 0) {
                        $.ajax({
                            type: 'POST',
                            url: uri_api + "store/StoredProcedure",
                            data: JSON.stringify({
                                "loai": 6,
                                "sotrang": page,
                                "soitem": soitem,
                                "menuid": menuid,
                                "lang": lang,
                            }),
                            dataType: "json",
                            contentType: "application/json",
                            async: false,
                            globle: false,
                            success: function (su2) {
                                if (su2.message === "success")
                                    dtpage = su2.responses;
                            },
                            error: function (er) {
                                console.log(er)
                            }
                        });
                    }
                    else
                        dtpage = su.responses;
                }
            },
            error: function (er) {
                console.log(er)
            }
        });
    }
    else if (loai === "qasample") {
        $.ajax({
            type: 'POST',
            url: uri_api + "store/StoredProcedure",
            data: JSON.stringify({
                "loai": 64,
                "sotrang": page,
                "soitem": soitem,
                "menuparentid": menuid,
                "lang": lang,
            }),
            async: false,
            globle: false,
            dataType: "json",
            contentType: "application/json",
            success: function (su) {
                if (su.message === "success")
                    dtpage = su.responses;
            },
            error: function (er) {
                console.log(er)
            }
        });
    }
    //
    if ($(`#${el_name} #content`).length === 0) console.log("Can't load: " + el_name)
    else {
        $(`#${el_name} #content`).html('');
        $.each(dtpage, function (i, p) {
            let html = `<div class="content-post" postid="${p.id}">`;
            if (p.avatar !== undefined && p.avatar.length > 0 && p.avatar !== "")
                html += `<div><img src="${uri_img}${p.avatar}" /></div>`;
            if (p.createdate !== undefined && p.createdate !== "")
                html += `<div class="date">${p.createdate}</div>`;
            if (p.title !== undefined && p.title !== "")
                html += `<div class="title">${p.title}</div>`;
            if (p.question !== undefined && p.question !== "") {
                html += `<div class="title" relg="question">Câu Hỏi</div>`;
                html += `<div class="question" postid="${p.id}">${p.question}</div>`;
                html += `<hr />`;
            }
            if (p.summary !== undefined && p.summary !== "")
                html += `<div class="content" postid="${p.id}">${p.summary}</div>`;
            if (p.answer !== undefined && p.answer !== "") {
                html += `<div class="title" relg="question">Trả Lời</div>`;
                html += `<div class="content answer" postid="${p.id}">${p.answer}</div>`;
            }
            if (p.articlecontent !== undefined && p.articlecontent !== "")
                html += `<div class="contenthtml" style="display: none !important;" postid="${p.id}">${p.articlecontent}</div>`;
            // if (readmore && cutcontent)
            if (readmore)
                html += `<div class="read-more" postid="${p.id}" single="true">Xem thêm</div>`
            html += `</div>`;
            $(`#${el_name} #content`).append(html);
            if (i === 0) firstid = p.id;

            if ($(`#${el_name} #content > div`).length > 0) {
                $(`#${el_name} #content > div`).click(function () {
                    let postid = $(this).attr('postid');
                    let p = {
                        id: postid,
                        title: $(`#${el_name} #content .content-post[postid="${postid}"] .title`).text(),
                        createdate: $(`#${el_name} #content .content-post[postid="${postid}"] .date`).text(),
                        articlecontent: $(`#${el_name} #content .content-post[postid="${postid}"] .contenthtml`).html(),
                    }
                    loadPostToRead(p, `${el_name} #content-post`);
                });
            }
        });
        functionEventCall(el_name);
    }
    return { firstid: firstid, data: dtpage };
}

function loadPostToRead(p, el_name) {
    $(`#${el_name}`).html('');
    let html = `<div class="content-post" postid="${p.id}">`;
    html += `<div class="title">${p.title}</div>`;
    // html += `<div class="date">${p.createdate}</div>`;
    html += `<div class="content sun-editor-editable" postid="${p.id}">${p.articlecontent}</div>`;
    html += `</div>`;
    $(`#${el_name}`).append(html);
}
