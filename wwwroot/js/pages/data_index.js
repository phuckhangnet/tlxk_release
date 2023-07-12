let uri_api = "/"
let uri_img = "/ftp_images/"
// du lieu menu trang home
let dtmenu = [];
let domain = window.location.origin;
domain = domain.replace("http://", "");
domain = domain.replace("https://", "");
domain = domain.replace("www.", "");
$.ajax({
    type: 'POST',
    url:  uri_api + "store/StoredProcedure",
    data: JSON.stringify({
        "loai": 1,
        "domain": domain,
    }),
    dataType: "json",
    contentType: "application/json",
    async: false,
    globle: false,
    success: function (su) {
        if (su.message === "success")
            dtmenu = su.responses;
    },
    error: function (er) {
        console.log(er)
    }
});