document.addEventListener("DOMContentLoaded", () => {

    /* ============================================================
       💙 HEART RAIN - MƯA TIM
    ============================================================ */
    function createHeartRain() {
        const heartRain = document.querySelector(".heart-rain");
        if (!heartRain) return;

        setInterval(() => {
            const heart = document.createElement("div");
            heart.classList.add("heart");
            heart.textContent = "💙";
            heart.style.left = Math.random() * 100 + "%";
            heart.style.fontSize = (Math.random() * 15 + 15) + "px";
            heart.style.animationDuration = (Math.random() * 3 + 4) + "s";
            heart.style.animationDelay = Math.random() * 2 + "s";

            heartRain.appendChild(heart);
            setTimeout(() => heart.remove(), 8000);
        }, 400);
    }
    createHeartRain();


    /* ============================================================
       🌟 START EXPERIENCE – INTRO
    ============================================================ */
    const intro = document.getElementById("intro");
    const main = document.getElementById("main-content");
    const music = document.getElementById("bgMusic");

    window.startExperience = function () {
    if (!intro || !main) return;

    // Ẩn intro, hiện main-content
    intro.classList.add("hidden");
    main.classList.remove("hidden");
    main.classList.add("show");

    // Play nhạc nền ngay lập tức trong onclick
    if (music) {
        music.volume = 0.55;
        const playPromise = music.play();  // phát nhạc trực tiếp
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Trình duyệt chặn autoplay trên mobile nhưng vì đây là onclick nên hiếm khi xảy ra
                console.warn("Nhạc không phát được, vui lòng chạm lại.");
            });
        }
    }
};



    /* ============================================================
       💌 ENVELOPE – MỞ THƯ 3D
    ============================================================ */
    window.openEnvelope = function () {
        const envelope = document.getElementById("envelope");
        const inst = document.getElementById("clickInst");

        if (!envelope) return;

        if (!envelope.classList.contains("open")) {
            envelope.classList.add("open");

            if (inst) {
                inst.style.opacity = "0";
                inst.style.transform = "translateY(-20px)";
            }

            // Hiệu ứng pop
            envelope.style.animation = "none";
            setTimeout(() => {
                envelope.style.animation = "floatUp 3.3s infinite ease-in-out";
            }, 100);
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

            if (msg) {
                msg.classList.add("show");
            }

            createHeartExplosion(gift);

            // Hiệu ứng scale
            gift.style.transform = "scale(1.15)";
            setTimeout(() => {
                gift.style.transform = "scale(1)";
            }, 800);
        }
    };


    /* ============================================================
       💥 HEART EXPLOSION – NỔ TIM 💙
    ============================================================ */
    function createHeartExplosion(box) {
        const container = document.createElement("div");
        container.style.position = "absolute";
        container.style.top = "50%";
        container.style.left = "50%";
        container.style.transform = "translate(-50%, -50%)";
        container.style.pointerEvents = "none";
        box.appendChild(container);

        for (let i = 0; i < 35; i++) {
            const p = document.createElement("div");
            p.textContent = "💙";
            p.style.position = "absolute";
            p.style.fontSize = (Math.random() * 20 + 15) + "px";
            p.style.opacity = "1";
            p.style.transition = "all 1.5s ease-out";

            const angle = (Math.PI * 2 * i) / 35;
            const distance = Math.random() * 200 + 100;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            container.appendChild(p);

            setTimeout(() => {
                p.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
                p.style.opacity = "0";
            }, 30);

            setTimeout(() => p.remove(), 1600);
        }

        setTimeout(() => container.remove(), 1600);
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
    if (canvas) {
        const ctx = canvas.getContext("2d");

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        let fireworks = [];

        function createFirework() {
            const colors = [
                "#60a5fa", "#c084fc", "#f0abfc", "#9CE0FF", 
                "#81D4FA", "#4FC3F7", "#BBDEFB"
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];

            fireworks.push({
                x: Math.random() * canvas.width,
                y: canvas.height,
                targetY: Math.random() * (canvas.height / 2),
                speed: 4 + Math.random() * 3,
                exploded: false,
                particles: [],
                color: color
            });
        }

        function renderFireworks() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            fireworks.forEach((fw, idx) => {
                if (!fw.exploded) {
                    fw.y -= fw.speed;

                    ctx.beginPath();
                    ctx.arc(fw.x, fw.y, 4, 0, Math.PI * 2);
                    ctx.fillStyle = fw.color;
                    ctx.shadowColor = fw.color;
                    ctx.shadowBlur = 25;
                    ctx.fill();

                    if (fw.y <= fw.targetY) {
                        fw.exploded = true;

                        for (let i = 0; i < 50; i++) {
                            fw.particles.push({
                                x: fw.x,
                                y: fw.y,
                                angle: Math.random() * Math.PI * 2,
                                speed: 2 + Math.random() * 5,
                                alpha: 1,
                                color: fw.color
                            });
                        }
                    }

                } else {
                    fw.particles.forEach((p) => {
                        p.x += Math.cos(p.angle) * p.speed;
                        p.y += Math.sin(p.angle) * p.speed + 0.5; // gravity
                        p.alpha -= 0.015;

                        ctx.beginPath();
                        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
                        
                        const hex = p.color.replace('#', '');
                        const r = parseInt(hex.substr(0, 2), 16);
                        const g = parseInt(hex.substr(2, 2), 16);
                        const b = parseInt(hex.substr(4, 2), 16);
                        
                        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha})`;
                        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.9)`;
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

        setInterval(createFirework, 800);
        renderFireworks();
    }


    /* ============================================================
       📸 GALLERY 3D TILT & AUTO SCROLL
    ============================================================ */
    const track = document.querySelector(".gallery-track");
    const cards = document.querySelectorAll(".gallery-track .photo-card");

    if (track && cards.length > 0) {
        // Clone các ảnh để loop liên tục
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
        });

        const cardWidth = cards[0].offsetWidth + 25; // width + gap
        let position = 0;

        function animateGallery() {
            position -= 0.8; // tốc độ trượt
            if (Math.abs(position) >= cardWidth * cards.length) {
                position = 0;
            }
            track.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(animateGallery);
        }
        animateGallery();

        // 3D Tilt Effect
        document.querySelectorAll(".photo-card").forEach((card) => {
            card.addEventListener("mousemove", (e) => {
                const r = card.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width;
                const y = (e.clientY - r.top) / r.height;
                const rotY = (x - 0.5) * 20;
                const rotX = (0.5 - y) * 20;
                card.style.transform =
                    `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.08)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
            });
        });
    }


    /* ============================================================
       ✨ SCROLL REVEAL ANIMATION
    ============================================================ */
    const observerOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    document.querySelectorAll(".section").forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(50px)";
        section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        observer.observe(section);
    });

});
