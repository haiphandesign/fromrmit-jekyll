// ONLOAD

window.onload = function () {
    loadImageFile();
}


// RANDOMIZE CARD ONLOAD

var cards = $(".directory-item").not('.is-skeleton').not('.is-empty');
for (var i = 0; i < cards.length; i++) {
    var target = Math.floor(Math.random() * cards.length - 1) + 1;
    var target2 = Math.floor(Math.random() * cards.length - 1) + 1;
    cards.eq(target).before(cards.eq(target2));
}


// DIRECTORY FILTER

$(".directory-filter :checkbox").change(function () {
    if ($(".directory-filter :checkbox:checked").length > 0) {
        $(".directory-item").not('.is-skeleton').hide();
        $(".directory-filter :checkbox:checked").each(function () {
            $(".directory-item." + $(this).val()).show();
        });
        if ($('.directory-item:visible').length > 0) {
            $(".directory-item.is-empty").hide();
        } else {
            $(".directory-item.is-empty").show();
        }
    } else {
        $(".directory-wrapper > div").show();
        $(".directory-item.is-empty").hide();
    }
});


// LAZYLOADING

lazyload();

// LIMIT NOMINEE OCCUPATION TO 3

$('#nominate .directory-filter input[type=checkbox]').on('change', function (e) {
    if ($('input[type=checkbox]:checked').length > 3) {
        $(this).prop('checked', false);
    }
});


// CANVAS IMAGE UPLOAD



var oFReader = new FileReader();
var rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

oFReader.onload = function (oFREvent) {
    var img = new Image();
    img.onload = function () {
        document.getElementById("originalImg").src = img.src;
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = 500;
        canvas.height = 500;
        ctx.fillStyle = '#fff';

        var imageCoverSize = getCoverSize(
            img.naturalWidth,
            img.naturalHeight,
            canvas.width,
            canvas.height,
            0.5,
            0.5
        );

        ctx.drawImage(
            img,
            imageCoverSize.offsetLeft,
            imageCoverSize.offsetTop,
            imageCoverSize.width,
            imageCoverSize.height
        );

        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imgData.data;
        for (var i = 0; i < data.length; i += 4) {
            if (data[i + 3] < 255) {
                data[i] = 255;
                data[i + 1] = 255;
                data[i + 2] = 255;
                data[i + 3] = 255;
            }
        }
        ctx.putImageData(imgData, 0, 0);

        document.getElementById("uploadPreview").src = canvas.toDataURL("image/jpeg");
        document.getElementById("imageBase64").value = canvas.toDataURL("image/jpeg");
        document.getElementById("uploadPreview").parentElement.classList.remove('is-hidden');
    }
    img.src = oFREvent.target.result;
};

function loadImageFile() {
    if (document.getElementById("uploadImage").files.length === 0) {
        return;
    }
    var oFile = document.getElementById("uploadImage").files[0];
    if (!rFilter.test(oFile.type)) {
        alert("You must select a valid image file.");
        return;
    }
    oFReader.readAsDataURL(oFile);
}

// MENU TOGGLE
$('.sidebar-toggle').click(function () {
    $('.menu-mobile').addClass('is-active');
})
$('.menu-mobile-toggle').click(function () {
    $('.menu-mobile').removeClass('is-active');
})