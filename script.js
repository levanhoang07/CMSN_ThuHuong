document.addEventListener("DOMContentLoaded", () => {

    /* ============================================================
       🌟 START EXPERIENCE – INTRO
    ============================================================ */
    const intro = document.getElementById("intro");
    const main = document.getElementById("main-content");
    const music = document.getElementById("bgMusic");

    window.startExperience = function () {
        if (!intro || !main) return;

        intro.classList.add("hidden");
        main.classList.add("show");

        // Play nhạc nền
        if (music) {
            music.volume = 0.55;
            music.play().catch(() => {
                console.warn("Autoplay bị chặn – cần thao tác người dùng.");
            });
        }
    };


    /* ============================================================
       💌 ENVELOPE – MỞ THƯ 3D
    ============================================================ */
    window.openEnvelope = function () {
        const envelope = document.getElementById("envelope");
        const inst = document.getElementById("clickInstruction");

        if (!envelope) return;

        if (!envelope.classList.contains("open")) {
            envelope.classList.add("open");

            if (inst) inst.style.opacity = "0";

            envelope.style.animation = "pop .45s ease";
            setTimeout(() => (envelope.style.animation = ""), 450);
        }
    };


    /* ============================================================
       🎁 GIFT BOX – HỘP QUÀ 3D
    ============================================================ */
    window.openGift = function () {
        const gift = document.getElementById("giftBox");
        const msg = document.getElementById("giftMessage");

        if (!gift) return;

        if (!gift.classList.contains("opened")) {
            gift.classList.add("opened");

            if (msg) msg.classList.add("show");

            createHeartExplosion(gift);

            gift.style.transform = "scale(1.15)";
            setTimeout(() => (gift.style.transform = "scale(1)"), 800);
        }
    };


    /* ============================================================
       💥 HEART EXPLOSION – NỔ TIM 💙
    ============================================================ */
    function createHeartExplosion(box) {
        for (let i = 0; i < 28; i++) {
            const p = document.createElement("div");
            p.classList.add("particle");
            p.textContent = "💙";

            const tx = `${Math.random() * 300 - 150}px`;
            const ty = `${Math.random() * 300 - 150}px`;

            p.style.setProperty("--tx", tx);
            p.style.setProperty("--ty", ty);

            box.appendChild(p);

            setTimeout(() => p.classList.add("explode"), 30);
            setTimeout(() => p.remove(), 1500);
        }
    }


    /* ============================================================
       🎬 VIDEO POPUP
    ============================================================ */
    window.openVideo = function () {
        const popup = document.getElementById("videoPopup");
        const video = document.getElementById("popupVideo");

        if (!popup || !video) return;

        popup.classList.remove("hidden");

        video.currentTime = 0;
        video.play();
    };

    window.closeVideo = function () {
        const popup = document.getElementById("videoPopup");
        const video = document.getElementById("popupVideo");

        if (!popup || !video) return;

        popup.classList.add("hidden");

        video.pause();
        video.currentTime = 0;
    };


    /* ============================================================
       🎆 FIREWORKS – PHÁO HOA
    ============================================================ */
    const canvas = document.getElementById("fireworksCanvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let fireworks = [];

    function createFirework() {
        fireworks.push({
            x: Math.random() * canvas.width,
            y: canvas.height,
            targetY: Math.random() * (canvas.height / 2),
            speed: 4 + Math.random() * 3,
            exploded: false,
            particles: []
        });
    }

    function renderFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        fireworks.forEach((fw, idx) => {
            if (!fw.exploded) {
                fw.y -= fw.speed;

                ctx.beginPath();
                ctx.arc(fw.x, fw.y, 4, 0, Math.PI * 2);
                ctx.fillStyle = "#9CE0FF";
                ctx.shadowColor = "#9CE0FF";
                ctx.shadowBlur = 25;
                ctx.fill();

                if (fw.y <= fw.targetY) {
                    fw.exploded = true;

                    for (let i = 0; i < 40; i++) {
                        fw.particles.push({
                            x: fw.x,
                            y: fw.y,
                            angle: Math.random() * Math.PI * 2,
                            speed: 2 + Math.random() * 4,
                            alpha: 1
                        });
                    }
                }

            } else {
                fw.particles.forEach((p) => {
                    p.x += Math.cos(p.angle) * p.speed;
                    p.y += Math.sin(p.angle) * p.speed;
                    p.alpha -= 0.018;

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(150,220,255,${p.alpha})`;
                    ctx.shadowColor = "rgba(150,220,255,0.9)";
                    ctx.shadowBlur = 18;
                    ctx.fill();
                });

                if (fw.particles.every((p) => p.alpha <= 0)) {
                    fireworks.splice(idx, 1);
                }
            }
        });

        requestAnimationFrame(renderFireworks);
    }

    setInterval(createFirework, 950);
    renderFireworks();


    /* ============================================================
       📸 GALLERY 3D TILT
    ============================================================ */
    document.querySelectorAll(".photo-card").forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width;
            const y = (e.clientY - r.top) / r.height;

            const rotY = (x - 0.5) * 25;
            const rotX = (0.5 - y) * 25;

            card.style.transform =
                `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.1)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform =
                "perspective(700px) rotateX(0) rotateY(0) scale(1)";
        });
    });
    const track = document.querySelector(".gallery-track");
const cards = document.querySelectorAll(".gallery-track .photo-card");
const cardWidth = cards[0].offsetWidth + 25; // width + gap
let position = 0;

// Clone các ảnh để loop liên tục
cards.forEach(card => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
});

function animateGallery() {
    position -= 1; // tốc độ trượt (px/frame)
    if (Math.abs(position) >= cardWidth * cards.length) {
        position = 0; // quay lại đầu
    }
    track.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animateGallery);
}

animateGallery();


});
