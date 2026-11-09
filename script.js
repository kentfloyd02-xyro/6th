const ALL_PHOTOS = [
    "gwen (1).jfif",
    "gwen (46).jfif",
    "gwen (47).jfif",
    "gwen (48).jfif",
    "gwen (49).jfif",
    "gwen (50).jfif",
    "gwen (51).jfif",
    "gwen (52).jfif",
    "gwen (53).jfif",
    "gwen (54).jfif",
    "gwen (55).jfif",
    "gwen (56).jfif",
    "gwen (57).jfif",
    "gwen (58).jfif",
    "gwen (59).jfif",
    "gwen (60).jfif",
    "gwen (61).jfif",
    "gwen (62).jfif",
    "gwen (63).jfif",
    "gwen (64).jfif",
    "gwen (65).jfif",
    "gwen (66).jfif",
    "gwen (67).jfif",
    "gwen (68).jfif",
    "gwen (69).jfif",
    "gwen (70).jfif",
    "gwen (71).jfif",
    "gwen (72).jfif",
    "gwen (73).jfif",
    "gwen (74).jfif",
    "gwen (75).jfif",
    "gwen (76).jfif",
    "gwen (77).jfif",
    "gwen (78).jfif",
    "gwen (79).jfif",
    "gwen (80).jfif",
    "gwen (81).jfif",
    "gwen (82).jfif",
    "gwen (83).jfif",
    "gwen (84).jfif",
    "gwen (85).jfif",
    "gwen (86).jfif",
    "gwen (87).jfif",
    "gwen (88).jfif",
    "gwen (89).jfif",
    "gwen (90).jfif",
    "gwen (91).jfif",
    "gwen (92).jfif",
    "gwen (93).jfif",
    "gwen (94).jfif",
    "gwen (95).jfif",
    "gwen (96).jfif",
    "gwen (97).jfif",
];

const FLIP_QUOTES = [
    "Grabe, ang ganda naman ng misis ko dito.",
    "Favorite view ko sa buong mundo.",
    "Bawal na magalit, tingnan mo ang ganda mo oh.",
    "Yung mukha parang hindi nag p-pa baby oh.",
];

const FUNNY_DODGE_TEXTS = [
    "Oops bawal! 😜",
    "Di pwede magalit! 🏃‍♂️",
    "Try again! Bawal tampo 😂",
    "Wag na badtrip please 🥺",
    "Bawal mapindot to bebi! 💨",
    "Marupok ka sa'kin aminin! 🥰",
    "Di kita papayagan mag-sungit 🙈",
];

let dodgeCount = 0;
let dispensedTotal = 0;

function dodgeButton() {
    const btn = document.getElementById("btnStillMad");
    const hint = document.getElementById("dodgeHint");

    const randomX = Math.random() * 180 - 90;
    const randomY = Math.random() * 70 - 20;

    btn.style.transform = `translate(${randomX}px, ${randomY}px)`;

    const text = FUNNY_DODGE_TEXTS[dodgeCount % FUNNY_DODGE_TEXTS.length];
    btn.textContent = text;
    dodgeCount++;

    if (dodgeCount > 2) {
        hint.textContent =
            "Sabi sa'yo bawal magalit eh! Pindutin mo na yung 'Hindi na' sa itaas 🥰👆";
        hint.style.color = "#e0245e";
        hint.style.fontWeight = "700";
    }

    if (navigator.vibrate) navigator.vibrate(40);
}

let heartShapes = null;
try {
    if (
        typeof confetti !== "undefined" &&
        typeof confetti.shapeFromText === "function"
    ) {
        heartShapes = [
            confetti.shapeFromText({ text: "❤️", scalar: 2.2 }),
            confetti.shapeFromText({ text: "💖", scalar: 2.2 }),
            confetti.shapeFromText({ text: "💕", scalar: 2.0 }),
            confetti.shapeFromText({ text: "💗", scalar: 2.0 }),
        ];
    }
} catch (e) {
    console.log("Custom heart shapes note:", e);
}

function spawnFloatingHearts(originX, originY, count = 22) {
    const heartIcons = ["❤️", "💖", "💕", "💗", "💓", "💘", "🥰"];
    const startX = originX || window.innerWidth / 2;
    const startY = originY || window.innerHeight / 2;

    for (let i = 0; i < count; i++) {
        const el = document.createElement("div");
        el.className = "floating-heart-particle";
        el.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];
        el.style.left = `${startX}px`;
        el.style.top = `${startY}px`;
        el.style.fontSize = `${Math.floor(Math.random() * 22 + 20)}px`;

        const angle = Math.random() * 360 * (Math.PI / 180);
        const distance = Math.random() * 200 + 70;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance - (Math.random() * 90 + 50);
        const rot = `${Math.random() * 80 - 40}deg`;
        const scale = (Math.random() * 0.7 + 1.1).toFixed(2);

        el.style.setProperty("--tx", `${tx}px`);
        el.style.setProperty("--ty", `${ty}px`);
        el.style.setProperty("--rot", rot);
        el.style.setProperty("--scale", scale);

        document.body.appendChild(el);
        setTimeout(() => {
            if (el.parentNode) el.parentNode.removeChild(el);
        }, 1700);
    }
}

function burstHearts(options = {}, event = null) {
    const defaults = {
        spread: 90,
        ticks: 120,
        gravity: 0.65,
        decay: 0.94,
        startVelocity: 30,
        scalar: 2.2,
        colors: ["#ff1744", "#ff4081", "#f50057", "#ff6b8b", "#ff85a1", "#ffc2d1"],
    };
    if (heartShapes) {
        defaults.shapes = heartShapes;
    }
    try {
        confetti(Object.assign({}, defaults, options));
    } catch (err) {}

    let ox = window.innerWidth / 2;
    let oy = window.innerHeight * 0.6;
    if (event && event.clientX) {
        ox = event.clientX;
        oy = event.clientY;
    } else if (options.origin) {
        if (typeof options.origin.x === "number")
            ox = window.innerWidth * options.origin.x;
        if (typeof options.origin.y === "number")
            oy = window.innerHeight * options.origin.y;
    }
    spawnFloatingHearts(ox, oy, 20);
}

function startTestAndQuiz() {
    burstHearts({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.6 },
    });
    const stageBati = document.getElementById('gateStageBati');
    const stageQuiz = document.getElementById('gateStageQuiz');
    if (stageBati && stageQuiz) {
        stageBati.style.display = 'none';
        stageQuiz.style.display = 'block';
    }
}

function handleQuizAnswer(choice) {
    const feedback = document.getElementById("quizFeedback");
    if (!feedback) return;

    if (choice === "D") {
        feedback.className = "gate-feedback success";
        feedback.innerHTML = "🎉 TAMA! Ang galing naman ng misis ko! 🥰 Next: Final Password challenge...";
        burstHearts({ particleCount: 35, spread: 75 });

        setTimeout(() => {
            const stageQuiz = document.getElementById("gateStageQuiz");
            const stagePass = document.getElementById("gateStagePassword");
            if (stageQuiz && stagePass) {
                stageQuiz.style.display = "none";
                stagePass.style.display = "block";
                const input = document.getElementById("birthdayPassInput");
                if (input) input.focus();
            }
        }, 950);
    } else if (choice === "A") {
        feedback.className = "gate-feedback error";
        feedback.innerHTML = "Pogi nga talaga hehe 🙈 kaso may mas tamang sagot pa bebi! Tingnan mong mabuti yung choices 😂";
    } else if (choice === "B") {
        feedback.className = "gate-feedback error";
        feedback.innerHTML = "Aba nag-deny pa misis ko! Bawal magsinungaling bebi hahahaha 😜 Subukan mo ulit!";
    } else if (choice === "C") {
        feedback.className = "gate-feedback error";
        feedback.innerHTML = "Hahahaha totoo ba?! Piliin mo yung pinaka-tamang answer bebi! 🙈😂";
    }
}

function checkBirthdayMatch(rawInput) {
    if (!rawInput) return false;
    const clean = rawInput.toLowerCase().trim().replace(/[,\-\.\/]/g, " ").replace(/\s+/g, " ");
    const numbersOnly = rawInput.replace(/\D/g, "");

    // Kent's 2 Birthdays:
    // 1) July 18, 2007
    // 2) January 31, 2007
    const isJuly18Text = clean.includes("july 18") || clean.includes("jul 18");
    const isJuly18Num = (
        numbersOnly === "07182007" ||
        numbersOnly === "7182007" ||
        numbersOnly === "0718" ||
        numbersOnly === "718" ||
        numbersOnly === "071807" ||
        numbersOnly === "71807"
    );

    const isJan31Text = (
        clean.includes("january 31") ||
        clean.includes("jan 31") ||
        clean.includes("january 31st") ||
        clean.includes("jan 31st")
    );
    const isJan31Num = (
        numbersOnly === "01312007" ||
        numbersOnly === "1312007" ||
        numbersOnly === "0131" ||
        numbersOnly === "131" ||
        numbersOnly === "013107" ||
        numbersOnly === "13107"
    );

    return (isJuly18Text || isJuly18Num || isJan31Text || isJan31Num);
}

let passWrongCount = 0;

function verifyBirthdayPassword() {
    const input = document.getElementById("birthdayPassInput");
    const feedback = document.getElementById("passFeedback");
    if (!input || !feedback) return;

    const val = input.value;
    if (checkBirthdayMatch(val)) {
        feedback.className = "gate-feedback success";
        feedback.innerHTML = "🎉 TAMA! Galing naman ng misis ko, kabisado ang birthday ko! 🥰 Bati na tayo!";
        burstHearts({
            particleCount: 70,
            spread: 110,
            origin: { y: 0.5 },
        });

        setTimeout(() => {
            unlockSite();
        }, 1100);
    } else {
        passWrongCount++;
        feedback.className = "gate-feedback error";
        feedback.innerHTML = "Mali bebi! 😜 Isipin mong mabuti... kailan yung dalawang birthday ko? Subukan mo ulit! ❤️";
        
        if (passWrongCount >= 3) {
            const hintBox = document.getElementById("passHintsBox");
            if (hintBox) {
                hintBox.style.display = "block";
            }
        }
        input.focus();
    }
}

function unlockSite() {
    const modal = document.getElementById("gateModal");
    modal.classList.add("hidden");

    burstHearts({
        particleCount: 50,
        spread: 90,
        origin: { y: 0.6 },
    });

    playChime();

    playMusic();
}

let isMusicPlaying = false;

function playMusic() {
    const audio = document.getElementById("bgAudio");
    if (!audio) return;

    audio
        .play()
        .then(() => {
            isMusicPlaying = true;
            updateMusicUI(true);
        })
        .catch((err) => {
            console.log("Audio autoplay waiting for user tap:", err);
            updateMusicUI(false);
        });
}

function pauseMusic() {
    const audio = document.getElementById("bgAudio");
    if (audio) audio.pause();
    isMusicPlaying = false;
    updateMusicUI(false);
}

function handleMusicWidgetClick() {
    if (isMusicPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function updateMusicUI(playing) {
    const vinyl = document.getElementById("vinylDisk");
    const stateTag = document.getElementById("musicStateTag");
    if (!vinyl || !stateTag) return;

    if (playing) {
        vinyl.classList.add("spinning");
        stateTag.textContent = "🔊 Tumutugtog na 💖";
        stateTag.style.background = "#ffd6e0";
        stateTag.style.color = "#c7184a";
    } else {
        vinyl.classList.remove("spinning");
        stateTag.textContent = "▶️ Pindutin para tumugtog";
        stateTag.style.background = "#ffe8ee";
        stateTag.style.color = "#9c2748";
    }
}

function playChime() {}

const START_DATE = new Date("2026-05-10T00:00:00");

function updateCounter() {
    const now = new Date();
    let diff = now - START_DATE;
    if (diff < 0) diff = Math.abs(diff);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    document.getElementById("cntDays").textContent = String(days).padStart(
        2,
        "0",
    );
    document.getElementById("cntHours").textContent = String(hours).padStart(
        2,
        "0",
    );
    document.getElementById("cntMins").textContent = String(mins).padStart(
        2,
        "0",
    );
    document.getElementById("cntSecs").textContent = String(secs).padStart(
        2,
        "0",
    );
}
setInterval(updateCounter, 1000);
updateCounter();

const RAW_LETTER_PARAGRAPHS = [
    `Happy Monthsarry Bebi, Asawa, Baby, Love. `,
    `Super thankyou kase nagtitiis ka sa ugali na meron ako kahit super mainipin ko and mapang asar ko, yung tipong kahit alam kung badtrip kana `,
    `[NOTE:aasarin pa rin kita|Lambing ko lang talaga 'yun e hehe 🥺]`,
    `, sa ganoong paraan ko nalang kase pinapakita pagmamahal ko `,
    `[NOTE:shy type ako eh bakit ba|Kunwari matapang sa personal pero marupok sa'yo 🙈]`,
    `. Sorry pala this day kase alam kung super inis ka kase nga hindi tayo nakakapag usap ng matagal alam kung badtrip ka now pero sana kung makita mo'to ma mawala/less(sana) yung galit mo sa'kin now. `,
    `Ayaw ko lang kase pag badtrip ako kausapin kita baka mabadtrip lang din ako sa'yo madamay kapa imbis na okay tayo `,
    `[NOTE:iniingatan kalang|Promise to bebi, ayaw lang kitang masaktan kahit kailan ❤️]`,
    `. Wala naman na akong sasabihin pa kase halos naman sinasabi ko na mahal na mahal kita `,
    `[NOTE:#BOLERO|Totoo naman eh, bolero pero ikaw lang bobolahin habang buhay 😜]`,
    `. ALABYUUU BEBI KO MWA, MORE MS TO COME SA'TIN MWA!!!`,
];

let typingTimeout = null;
let isTypingDone = false;

function openLetter() {
    document.getElementById("sealedEnvelope").style.display = "none";
    const paper = document.getElementById("openedLetter");
    paper.style.display = "block";

    burstHearts({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.5 },
    });

    startTypewriter();
}

function parseTokensToHTML(tokens) {
    return tokens
        .map((t) => {
            if (t.startsWith("[NOTE:") && t.endsWith("]")) {
                const content = t.slice(6, -1);
                const [text, tooltip] = content.split("|");
                return `<span class="interactive-note-tag">${text}<span class="note-tooltip">${tooltip}</span></span>`;
            }
            return t;
        })
        .join("");
}

function startTypewriter() {
    const target = document.getElementById("letterTextTarget");
    target.innerHTML = "";

    const fullTextParts = [];
    RAW_LETTER_PARAGRAPHS.forEach((part) => {
        if (part.startsWith("[NOTE:")) {
            fullTextParts.push({ type: "note", raw: part });
        } else {
            for (let char of part) {
                fullTextParts.push({ type: "char", val: char });
            }
        }
    });

    let idx = 0;

    function typeNext() {
        if (idx >= fullTextParts.length) {
            isTypingDone = true;
            return;
        }

        const item = fullTextParts[idx];
        if (item.type === "note") {
            target.innerHTML += parseTokensToHTML([item.raw]);
        } else {
            target.innerHTML += item.val;
        }

        idx++;

        let delay = 65; // Relaxed base typing speed
        if (item.type === "note") {
            delay = 180;
        } else if (item.val === "." || item.val === "!" || item.val === "?") {
            delay = 450; // Dramatic pause at end of sentence
        } else if (item.val === "," || item.val === ";") {
            delay = 280; // Gentle breath pause
        }
        typingTimeout = setTimeout(typeNext, delay);
    }

    typeNext();
}

function dispenseSmile(e) {
    dispensedTotal++;
    document.getElementById("dispenseCountNum").textContent = dispensedTotal;

    const randomImg = ALL_PHOTOS[Math.floor(Math.random() * ALL_PHOTOS.length)];
    const randomQuote =
        FLIP_QUOTES[Math.floor(Math.random() * FLIP_QUOTES.length)];

    const stage = document.getElementById("dispensedStage");
    const img = document.getElementById("dispensedImg");
    const quote = document.getElementById("dispensedQuote");

    img.src = randomImg;
    quote.textContent = `"${randomQuote}"`;

    stage.style.display = "block";

    stage.style.animation = "none";
    stage.offsetHeight;
    stage.style.animation = null;

    burstHearts({
            particleCount: 40,
            spread: 65,
            origin: { y: 0.7 },
        },
        e,
    );
    playChime();
}

let isMarqueePaused = false;
let allMarqueeFlipped = false;

function renderMarquee() {
    const track = document.getElementById("marqueeTrack");
    if (!track) return;
    track.innerHTML = "";

    const loopList = [...ALL_PHOTOS, ...ALL_PHOTOS];

    loopList.forEach((photo, idx) => {
        const quote = FLIP_QUOTES[idx % FLIP_QUOTES.length];

        const card = document.createElement("div");
        card.className = "marquee-card";

        card.innerHTML = `
          <div class="marquee-card-inner">
            <div class="polaroid-front">
              <div class="washi-tape"></div>
              <img src="${photo}" alt="Gwen" loading="lazy">
              <div class="front-stamp">
                <span>Gwen</span>
                <span>Click to flip 🔄</span>
              </div>
            </div>
            <div class="polaroid-back">
              <div class="back-quote">"${quote}"</div>
              <div class="back-sub">💖 Forever My Asawa 💖</div>
            </div>
          </div>
        `;

        card.addEventListener("click", (e) => {
            card.classList.toggle("is-flipped");
            playChime();
        });

        track.appendChild(card);
    });
}

function toggleMarqueeScroll() {
    const track = document.getElementById("marqueeTrack");
    const icon = document.getElementById("scrollStateIcon");
    const text = document.getElementById("scrollStateText");
    if (!track) return;

    isMarqueePaused = !isMarqueePaused;
    if (isMarqueePaused) {
        track.classList.add("is-paused");
        if (icon) icon.textContent = "▶️";
        if (text) text.textContent = "Paandarin ulit";
    } else {
        track.classList.remove("is-paused");
        if (icon) icon.textContent = "⏸️";
        if (text) text.textContent = "I-pause ang takbo";
    }
    playChime();
}

function toggleFlipAllMarquee() {
    const cards = document.querySelectorAll(".marquee-card");
    allMarqueeFlipped = !allMarqueeFlipped;
    cards.forEach((c, i) => {
        setTimeout(
            () => {
                if (allMarqueeFlipped) {
                    c.classList.add("is-flipped");
                } else {
                    c.classList.remove("is-flipped");
                }
            },
            Math.min(i * 25, 1200),
        );
    });
    playChime();
}

renderMarquee();

function triggerGrandCelebration(e) {
    const duration = 3.5 * 1000;
    const animationEnd = Date.now() + duration;

    burstHearts({ particleCount: 50, spread: 110, origin: { y: 0.7 } }, e);

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
            return clearInterval(interval);
        }
        const particleCount = Math.floor(25 * (timeLeft / duration)) + 10;
        burstHearts({
            particleCount,
            spread: 90,
            origin: { x: randomInRange(0.1, 0.4), y: Math.random() * 0.4 + 0.1 },
        });
        burstHearts({
            particleCount,
            spread: 90,
            origin: { x: randomInRange(0.6, 0.9), y: Math.random() * 0.4 + 0.1 },
        });
    }, 350);

    playChime();
}

function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

const canvas = document.getElementById("ambientCanvas");
const ctx = canvas.getContext("2d");
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

class FloatingHeart {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * width;
        this.y = height + 20 + Math.random() * 40;
        this.size = 10 + Math.random() * 16;
        this.speedY = 0.5 + Math.random() * 1.1;
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.opacity = 0.15 + Math.random() * 0.35;
        this.color = Math.random() > 0.5 ? "#ff758c" : "#ff94aa";
    }
    update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        if (this.y < -30) this.reset();
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        const topCurveHeight = this.size * 0.3;
        ctx.moveTo(this.x, this.y + topCurveHeight);
        ctx.bezierCurveTo(
            this.x,
            this.y,
            this.x - this.size / 2,
            this.y,
            this.x - this.size / 2,
            this.y + topCurveHeight,
        );
        ctx.bezierCurveTo(
            this.x - this.size / 2,
            this.y + (this.size + topCurveHeight) / 2,
            this.x,
            this.y + (this.size + topCurveHeight) / 2,
            this.x,
            this.y + this.size,
        );
        ctx.bezierCurveTo(
            this.x,
            this.y + (this.size + topCurveHeight) / 2,
            this.x + this.size / 2,
            this.y + (this.size + topCurveHeight) / 2,
            this.x + this.size / 2,
            this.y + topCurveHeight,
        );
        ctx.bezierCurveTo(
            this.x + this.size / 2,
            this.y,
            this.x,
            this.y,
            this.x,
            this.y + topCurveHeight,
        );
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}

const hearts = Array.from({ length: 22 }, () => new FloatingHeart());

function animateHearts() {
    ctx.clearRect(0, 0, width, height);
    hearts.forEach((h) => {
        h.update();
        h.draw();
    });
    requestAnimationFrame(animateHearts);
}
animateHearts();

function toggleTheme() {
    document.body.classList.toggle("light-theme");
    const isLight = document.body.classList.contains("light-theme");
    const icon = document.getElementById("themeToggleIcon");
    const text = document.getElementById("themeToggleText");

    if (isLight) {
        if (icon) icon.textContent = "🌙";
        if (text) text.textContent = "Dark Mode";
        localStorage.setItem("gwen_monthsary_theme", "light");
    } else {
        if (icon) icon.textContent = "☀️";
        if (text) text.textContent = "Light Mode";
        localStorage.setItem("gwen_monthsary_theme", "dark");
    }
}

(function() {
    const savedTheme = localStorage.getItem("gwen_monthsary_theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
        const icon = document.getElementById("themeToggleIcon");
        const text = document.getElementById("themeToggleText");
        if (icon) icon.textContent = "🌙";
        if (text) text.textContent = "Dark Mode";
    }
})();