//  VIEWPORT HEIGHT VARIABLE
//--------------------------------------------------------//
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

// window.addEventListener("orientationchange", function() {
//     let vh = window.innerHeight * 0.01;
//     document.documentElement.style.setProperty("--vh", `${vh}px`);
// });


//  ADD CURRENT DATE TO COPYRIGHT
//--------------------------------------------------------//
const currentYear = document.getElementById("currentYear");
if (currentYear) {
    currentYear.innerText = new Date().getFullYear();
}

//  RUN BALANCED TEXT
//--------------------------------------------------------//
if (document.querySelector(".balance-text")) {
    balanceText();
}

//  RUN SMART QUOTES
//--------------------------------------------------------//
//smartquotes();


//  TIME TO READ
//--------------------------------------------------------//
const post = document.querySelector(".view-content");
const readTime = document.querySelector(".read-time");
const wpm = 250;

if (readTime) {
    function getReadTime() {
        let count = post.innerText.match(/\w+/g).length;
        let time = Math.ceil(count / wpm);
        readTime.innerText = time + " min read";
    };
    getReadTime();
}



//  MENU & SEARCH CONTROLS
//--------------------------------------------------------//
const menuIcon = document.querySelector("#menuIcon");
const searchIcon = document.querySelector("#searchIcon");
const b = document.body;
const nav = document.querySelector(".global-navigation");
const search = document.querySelector(".project-search");
if (menuIcon) {
    menuIcon.onclick = function() {
        if (b.classList.contains("searchOPEN")) {
            nav.style.zIndex = "103";
            search.style.zIndex = "102";
            setTimeout(function() {
                search.classList.remove("searchOPEN");
                searchIcon.classList.remove("isACTIVE");
                b.classList.remove("searchOPEN");
            }, 600);
        } else {
            nav.style.zIndex = "101";
        }

        if (b.classList.contains("menuOPEN")) {
            b.classList.remove("menuOPEN");
            nav.classList.remove("menuOPEN");
            menuIcon.classList.remove("isACTIVE");
        } else {
            b.classList.add("menuOPEN");
            nav.classList.add("menuOPEN");
            menuIcon.classList.add("isACTIVE");
        }
    };
}

if (searchIcon) {
    searchIcon.onclick = function() {
        if (b.classList.contains("menuOPEN")) {
            search.style.zIndex = "103";
            setTimeout(function() {
                nav.classList.remove("menuOPEN");
                menuIcon.classList.remove("isACTIVE");
                b.classList.remove("menuOPEN");
            }, 600);
        }  else {
            search.style.zIndex = "101";
        }
        if (b.classList.contains("searchOPEN")) {
            b.classList.remove("searchOPEN");
            search.classList.remove("searchOPEN");
            searchIcon.classList.remove("isACTIVE");
        } else {
            b.classList.add("searchOPEN");
            search.classList.add("searchOPEN");
            searchIcon.classList.add("isACTIVE");
            //document.getElementById("searchInput").focus();
        }
    };
}


//  SEARCH FILTER
//--------------------------------------------------------//
const clearSearch = document.getElementById("clearSearch");
const searchInput = document.getElementById("searchInput");
const searchList = document.getElementById("searchList");
const sli = searchList.getElementsByTagName("li");

function scrollList() {
    setTimeout(function() {
        searchList.scrollTo({
            //top: scrl,
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        //ul.scrollTo(0,scrl);
    }, 200);
};

function filterSearch() {
    let filter = searchInput.value.toUpperCase();

    for (i = 0; i < sli.length; i++) {
        let a = sli[i].getElementsByTagName("a")[0];
        let txtValue = a.textContent || a.innerText;

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            sli[i].classList.remove("isHIDDEN");
            a.tabIndex = "";
        } else {
            sli[i].classList.add("isHIDDEN");
            a.tabIndex = -1;
        }
    }
    if (searchList.children.length - 1 == searchList.querySelectorAll(".isHIDDEN").length) {
        searchList.classList.add("isEMPTY");
    } else {
        searchList.classList.remove("isEMPTY");
    }
    if (searchInput && searchInput.value) {
        clearSearch.classList.add("isACTIVE");
    } else {
        clearSearch.classList.remove("isACTIVE");
    }
    scrollList();
};

if(clearSearch) {
    clearSearch.onclick = function() {
        searchInput.value = "";
        searchInput.focus();
        this.classList.remove("isACTIVE");
        searchList.classList.remove("isEMPTY");
        for (i = 0; i < sli.length; i++) {
            sli[i].classList.remove("isHIDDEN");
        }
        scrollList();
    };
}


//  PROGRESS BAR
//--------------------------------------------------------//
const pBar = document.querySelector(".progress-bar");
if (pBar) {
    window.addEventListener("scroll", function() {
        const y = window.scrollY;
        const vpH = window.innerHeight;
        const pgH = b.scrollHeight;
        const progress = (y / (pgH - vpH)) * 100 + "%";
        pBar.style.setProperty("--progress", progress);
    }, { passive: true }
    );
}


//  HEADER TITLE
//--------------------------------------------------------//
const pt = document.querySelector(".scrollMARKER");
if (pt) {
    window.addEventListener("scroll", function() {
        const y = window.scrollY;
        const ptOffset = pt.offsetTop;
        const ptHeight = pt.getBoundingClientRect().height;
        const subHeader = document.querySelector(".sub-header");

        if (y > (ptOffset + ptHeight)) {
            subHeader.classList.add("isACTIVE");
        } else {
            subHeader.classList.remove("isACTIVE");
        }
    }, { passive: true }
    );
}


//  HOME PARALLAX FIXES
//--------------------------------------------------------//
const homeparallax = document.querySelector(".parallaxMARKER");

if (homeparallax) {
    var fixParallax = function() {
        const y = window.scrollY;
        const homeparallaxOffset = homeparallax.offsetTop;
        const homeparallaxHeight = homeparallax.getBoundingClientRect().height;

        if (y > (homeparallaxOffset + homeparallaxHeight)) {
            b.classList.add("parallaxACTIVE");
        } else {
            b.classList.remove("parallaxACTIVE");
        }
        if (y >= 100) {
            b.classList.remove("overscrollACTIVE");
        } else {
            b.classList.add("overscrollACTIVE");
        }
    };
    window.addEventListener("scroll", fixParallax, { passive: true });
    window.addEventListener("load", fixParallax, { passive: true });
}


//  STICKY VIEW BAR
//--------------------------------------------------------//
let globalView = document.querySelector(".global-view");
if (globalView.offsetHeight <= window.innerHeight) {
    globalView.classList.add("noSTICKY");
} else {
    globalView.classList.remove("noSTICKY");
};


//  GRID TOGGLE
//--------------------------------------------------------//
var gridStatus = sessionStorage.getItem("grid");
let gridSwitch = document.querySelector("#gridToggle");

if (gridStatus == "on") {
    gridSwitch.checked = true;
    b.classList.add("showGRID");
}

function gridToggle() {
    if (gridSwitch.checked == true){
        b.classList.add("showGRID");
        sessionStorage.setItem("grid", "on");
    } else {
        b.classList.remove("showGRID");
        sessionStorage.setItem("grid", "off");
    }
};

//  DARK MODE
//--------------------------------------------------------//
var colorStatus = sessionStorage.getItem("color");
let colorSwitch = document.querySelector("#colorToggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

if (colorStatus == "dark") {
    colorSwitch.checked = true;
    b.classList.remove("lightMODE");
    b.classList.add("darkMODE");
} else if (prefersDarkScheme.matches && colorStatus != "light") {
    colorSwitch.checked = true;
    b.classList.remove("lightMODE");
    b.classList.add("darkMODE");
} else {
    colorSwitch.checked = false;
    b.classList.add("lightMODE");
}

function colorToggle() {
    if (colorSwitch.checked == true) {
        b.classList.remove("lightMODE");
        sessionStorage.setItem("color", "dark");
        b.classList.add("darkMODE");
    } else {
        b.classList.remove("darkMODE");
        sessionStorage.setItem("color", "light");
        b.classList.add("lightMODE");
    }
};


//  FORM VALIDATION
//--------------------------------------------------------//
const name = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");
const submit = document.getElementById("submit");
const form = document.querySelector(".contact-form");

if (form) {
    form.addEventListener("input", function (event) {
        if (name.validity.valid && email.validity.valid && message.validity.valid) {
            submit.disabled = false;
        } else {
            submit.disabled = true;
        }
    });
}

const timer = document.getElementById("timer");
if (timer) {
    let timeleft = 5;
    let downloadTimer = setInterval(function() {
    timeleft--;
    timer.textContent = timeleft;
    if(timeleft <= 0)
        clearInterval(downloadTimer);
    }, 1000);

    setTimeout(function () {
       window.location.href = "/contact.html";
    }, 5000);
}


//  SIGNATURE PAD
//--------------------------------------------------------//
const wrapper = document.getElementById("signature-pad");
const clearButton = document.querySelector("[data-action=clear]");
const undoButton = document.querySelector("[data-action=undo]");
const canvas = document.querySelector("canvas");

function resizeCanvas() {
    var ratio =  Math.max(window.devicePixelRatio || 1, 1);
    var imgData = signaturePad ? signaturePad.toData() : null;
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
    // context.putImageData(imgData,0,0);
    imgData && signaturePad.fromData(imgData);
    //signaturePad.clear();
    var penMQ = window.matchMedia( "(max-width: 820px)" );
    if (penMQ.matches) {
        signaturePad.maxWidth = 4;
    }
    else {
        signaturePad.maxWidth = 6;
    }
};

function clearDrawing(event) {
    b.classList.add("drawCLEAR");
    setTimeout(function() {
        signaturePad.clear();
        resizeCanvas();
        b.classList.remove("drawCLEAR");
    }, 400);
};

if (clearButton) {
    clearButton.onclick = function() {
        clearDrawing();
    };
}

if (undoButton) {
    undoButton.onclick = function() {
        var currentColor = signaturePad.penColor;
        var canvasData = signaturePad.toData();
        if (canvasData) {
            canvasData.pop();
            signaturePad.fromData(canvasData);
        }
        signaturePad.penColor = currentColor;
    };
}

//  DOODLE FORM
//--------------------------//
if (form) {
    var signaturePad = new SignaturePad(canvas, {
        //backgroundColor: 'rgb(255, 255, 255)',
        dotSize: 2,
        minWidth: 2,
        maxWidth: 3,
        velocityFilterWeight: .1,
        penColor: "rgb(214, 9, 21)"
    });
    window.onresize = resizeCanvas;
    window.onorientationchange = resizeCanvas;
    resizeCanvas();

    var formSubmit = document.getElementById("submit");
    formSubmit.onclick = function() {
        var dataURL = signaturePad.toDataURL("image/png");
        // var dataURL = signaturePad.toDataURL("image/svg+xml");
        document.getElementById("hidden_data").value = dataURL;
    };
}

//  DRAWING CANVAS
//--------------------------//
const drawingCanvas = document.querySelector(".drawing-canvas");
if (drawingCanvas) {
    var drawDark = document.getElementById("draw-dark");
    var drawLight = document.getElementById("draw-light");
    var drawRed = document.getElementById("draw-red");
    var drawYellow = document.getElementById("draw-yellow");
    var drawBlue = document.getElementById("draw-blue");
    // var drawSize = document.getElementById("drawSize");
    var signaturePad = new SignaturePad(canvas, {
        //backgroundColor: 'rgb(255,255,255)',
        dotSize: 3,
        minWidth: 3,
        maxWidth: 6,
        // dotSize: Number(drawSize.value),
        // minWidth: Number(drawSize.value),
        // maxWidth: Number(drawSize.value),
        velocityFilterWeight: .1,
        penColor: "rgb(214,9,21)"
    });

    window.onresize = resizeCanvas;
    window.onorientationchange = resizeCanvas;
    resizeCanvas();

    var setActive = function(elem) {
        var siblings = [];
        var sibling = elem.parentNode.firstChild;

        while (sibling) {
            if (sibling.nodeType === 1 && sibling !== elem) {
                siblings.push(sibling);
            }
            sibling = sibling.nextSibling
        }
        for (var i = 0; i < siblings.length; i++) {
            siblings[i].classList.remove("isACTIVE");
        }
        elem.classList.add("isACTIVE");
    };

    // drawSize.onchange = function() {
    //     signaturePad.dotSize = Number(drawSize.value);
    //     signaturePad.minWidth = Number(drawSize.value);
    //     signaturePad.maxWidth = Number(drawSize.value);
    // }

    drawDark.onclick = function() {
        setActive(drawDark);
        signaturePad.penColor = "rgb(40,40,40)";
    };
    drawLight.onclick = function() {
        setActive(drawLight);
        signaturePad.penColor = "rgb(248,248,248)";
    };
    drawRed.onclick = function() {
        setActive(drawRed);
        signaturePad.penColor = "rgb(214,9,21)";
    };
    drawYellow.onclick = function() {
        setActive(drawYellow);
        signaturePad.penColor = "rgb(249,237,50)";
    };
    drawBlue.onclick = function() {
        setActive(drawBlue);
        signaturePad.penColor = "rgb(0,133,239)";
    };
}


//  ACTIVITY RANDOMIZER
//--------------------------------------------------------//
const activityImage = document.getElementById("activityImage");
const activityTitle = document.getElementById("activityTitle");
const changeActivity = document.getElementById("changeActivity");
const toggleActivity = document.getElementById("toggleActivity");

var activity = [
    // "nine-dots.png",
    // "tic-tac-toe.png",
    "grand-staff.png",
    "face.png",
    "ampersand.png",
    "color-wheel.png",
    //"squiggle-1.png",
    // "squiggle-2.png",
    //"hound-maze.png",
    "lettering.png",
    "logo-steps.png",
    // "etch-a-sketch.png",
    "flower-pot.png"
];
var activityInstructions = [
    // "Join the dots with 4 straight lines",
    // "Play Tic-Tac-Toe",
    "Write a short tune",
    "Make a face",
    "Connect the Dots",
    "Fill in the color wheel",
    //"Create something with the squiggle",
    // "Create something with the squiggle",
    //"Get Bodoni to the cheese",
    "Practice lettering",
    "Draw my logo",
    // "Make a sketch",
    "Grow a plant"
];
var seenActivity = {};
var seenCount = 0;
let count = activity.length;

function newActivity() {
    var num = Math.floor(count * Math.random());
    if(!seenActivity[num]) {
        activityImage.style.backgroundImage = `url(images/activity/${activity[num]})`;
        activityTitle.innerText = activityInstructions[num];
        seenActivity[num] = true;
        seenCount++;
        if (seenCount == count) {
            seenCount = 0;
            seenActivity = {};
        }
    } else {
        newActivity();
    }
};

if (activityImage) {
    window.onload = function() {
        newActivity();
    };
}

if (changeActivity && activityTitle) {
    changeActivity.onclick = function() {
        var timer = 400;
        if (signaturePad.isEmpty() == false) {
            clearDrawing();
            var timer = 0;
        }
        toggleActivity.classList.remove("isHIDDEN");
        setTimeout(function () {
            activityImage.style.display = "none";
            newActivity();
        }, 400 - timer);
        setTimeout(function () {
            activityImage.style.display = "block";
        }, 500 - timer);
    };
}

if (toggleActivity) {
    toggleActivity.onclick = function() {
        if (toggleActivity.classList.contains("isHIDDEN")) {
            toggleActivity.classList.remove("isHIDDEN");
            activityImage.style.display = "block";
        } else {
            toggleActivity.classList.add("isHIDDEN");
            activityImage.style.display = "none";
        }
    };
}


//  ALLOW COOKIES
//--------------------------------------------------------//
// const cookieAccept = getElementById("cookieAccept");
// const googleAnalytics = window['ga-disable-UA-63651647-1'];
// if (cookieAccept) {
//     cookieAccept.onclick = function() {
//         googleAnalytics = false;
//     };
// }