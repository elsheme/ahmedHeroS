/**
 * Botanical Rose Petal Particle Model
 * Models individual fluttering rose petals with organic curves, 3D tilt, and romantic blush-champagne tones.
 */
window.FallingBotanicalRose = class FallingBotanicalRose {
    constructor(w, h, isInitial = false, forceTop = false) {
        this.reset(w, h, isInitial, forceTop);
    }

    reset(w, h, isInitial = false, forceTop = false) {
        this.x = Math.random() * w;
        this.y = forceTop ? -(20 + Math.random() * 160) : (isInitial ? Math.random() * h : -30);
        this.size = 14 + Math.random() * 12;
        this.speedY = 0.7 + Math.random() * 0.9;
        this.speedX = -0.4 + Math.random() * 0.8;
        this.opacity = 0.65 + Math.random() * 0.3;
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = (Math.random() - 0.5) * 0.02;
        this.tilt = Math.random() * Math.PI;
        this.tiltSpeed = 0.012 + Math.random() * 0.02;
        this.windOffset = Math.random() * 100;
        this.petalType = Math.floor(Math.random() * 3);
    }

    update(w, h, time) {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(time * 0.01 + this.windOffset) * 0.75;
        this.angle += this.angleSpeed;
        this.tilt += this.tiltSpeed;
        if (this.y > h + 30 || this.x < -30 || this.x > w + 30) {
            this.reset(w, h, false, false);
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        const tScale = Math.sin(this.tilt);
        ctx.scale(1, Math.abs(tScale) < 0.15 ? 0.15 : tScale);

        const s = this.size;
        ctx.beginPath();

        if (this.petalType === 0) {
            ctx.moveTo(0, s * 0.8);
            ctx.bezierCurveTo(s * 0.6, s * 0.6, s * 0.9, -s * 0.2, s * 0.4, -s * 0.9);
            ctx.bezierCurveTo(s * 0.15, -s * 1.05, -s * 0.15, -s * 1.05, -s * 0.4, -s * 0.9);
            ctx.bezierCurveTo(-s * 0.9, -s * 0.2, -s * 0.6, s * 0.6, 0, s * 0.8);
        } else if (this.petalType === 1) {
            ctx.moveTo(0, s * 0.85);
            ctx.bezierCurveTo(s * 0.7, s * 0.4, s * 0.85, -s * 0.4, 0, -s);
            ctx.bezierCurveTo(-s * 0.85, -s * 0.4, -s * 0.7, s * 0.4, 0, s * 0.85);
        } else {
            ctx.moveTo(-s * 0.1, s * 0.85);
            ctx.bezierCurveTo(s * 0.75, s * 0.5, s * 0.8, -s * 0.3, s * 0.2, -s * 0.95);
            ctx.bezierCurveTo(-s * 0.3, -s * 0.8, -s * 0.85, -s * 0.1, -s * 0.1, s * 0.85);
        }

        ctx.closePath();

        const grad = ctx.createRadialGradient(-s * 0.2, -s * 0.3, 2, 0, 0, s);
        grad.addColorStop(0, `rgba(255, 235, 240, ${this.opacity * 0.95})`);
        grad.addColorStop(0.45, `rgba(244, 168, 180, ${this.opacity * 0.9})`);
        grad.addColorStop(0.85, `rgba(225, 135, 150, ${this.opacity * 0.85})`);
        grad.addColorStop(1, `rgba(201, 162, 75, ${this.opacity * 0.55})`);

        ctx.fillStyle = grad;
        ctx.fill();

        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.35})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();

        ctx.restore();
    }
};
