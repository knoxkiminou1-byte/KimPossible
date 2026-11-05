"""Original procedural artwork for the kiminou-knox-site 'instruments' section.
All art is generated in-code (no borrowed imagery). Palette: ink #101400,
cream #F2EFE6, trophy gold #FFC400. Deterministic (seeded)."""
import math, random
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

INK = (16, 20, 0)
GOLD = (255, 196, 0)
CREAM = (242, 239, 230)
OUT = "/home/hatch/workspace/kiminou-knox-site/assets/instruments"


def grain(img, amount=9):
    arr = np.asarray(img).astype(np.int16)
    noise = np.random.default_rng(7).normal(0, amount, arr.shape[:2])
    arr = np.clip(arr + noise[:, :, None], 0, 255).astype(np.uint8)
    return Image.fromarray(arr)


def vignette(img, strength=0.55):
    w, h = img.size
    yy, xx = np.mgrid[0:h, 0:w]
    cx, cy = w / 2, h / 2
    dist = np.sqrt(((xx - cx) / (w / 2)) ** 2 + ((yy - cy) / (h / 2)) ** 2) / math.sqrt(2)
    mask = 1 - strength * np.clip(dist, 0, 1) ** 1.6
    arr = (np.asarray(img).astype(np.float32) * mask[:, :, None]).astype(np.uint8)
    return Image.fromarray(arr)


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


# ---------------------------------------------------------------- puzzle hero
def puzzle_hero():
    W, H = 1600, 1000
    img = Image.new("RGB", (W, H), INK)
    d = ImageDraw.Draw(img, "RGBA")
    # vertical gradient lift
    for y in range(H):
        t = y / H
        d.line([(0, y), (W, y)], fill=(16 + int(14 * t), 20 + int(14 * t), int(10 * t)))
    # faint giant court circle behind
    d.ellipse([(-560, -260), (760, 1260)], outline=(255, 196, 0, 30), width=8)
    d.ellipse([(-440, -140), (640, 1140)], outline=(242, 239, 230, 14), width=3)

    rng = random.Random(11)
    cx, cy, R = 330, 500, 340
    # basketball body: filled disc, slightly lighter than bg
    d.ellipse([cx - R, cy - R, cx + R, cy + R], fill=(34, 38, 12))
    # leather shading: darker edge ring
    d.ellipse([cx - R, cy - R, cx + R, cy + R], outline=(255, 196, 0, 220), width=10)
    # seams: classic basketball curves
    d.arc([cx - R, cy - R, cx + R, cy + R], start=195, end=345, fill=(255, 196, 0, 235), width=7)  # side curve
    d.arc([cx - R, cy - R, cx + R, cy + R], start=15, end=165, fill=(255, 196, 0, 235), width=7)
    # vertical seam
    d.line([(cx, cy - R), (cx, cy + R)], fill=(255, 196, 0, 235), width=7)
    # horizontal seam curved
    pts = []
    for i in range(61):
        t = i / 60
        x = cx - R + 2 * R * t
        y = cy + 120 * math.sin(math.pi * t) * 0.9 - 40
        pts.append((x, y))
    d.line(pts, fill=(255, 196, 0, 235), width=7)
    # stitch dashes along the top arc
    for i in range(24):
        ang = math.radians(200 + i * 6)
        x1 = cx + (R - 26) * math.cos(ang); y1 = cy + (R - 26) * math.sin(ang)
        x2 = cx + (R - 44) * math.cos(ang); y2 = cy + (R - 44) * math.sin(ang)
        d.line([(x1, y1), (x2, y2)], fill=(242, 239, 230, 160), width=3)

    # seams unwind into page lines: from ball's right edge, lines stream right,
    # wave amplitude decaying into straight "text lines"
    x0 = cx + R - 40
    n_lines = 15
    for li in range(n_lines):
        y0 = 180 + li * 46 + rng.uniform(-6, 6)
        length = rng.uniform(620, 940)
        amp = rng.uniform(26, 60)
        phase = rng.uniform(0, 6.28)
        wline = rng.choice([3, 4, 4, 5])
        step = 14
        prev = None
        x = x0
        while x < x0 + length and x < W - 60:
            decay = math.exp(-(x - x0) / 520)
            y = y0 + amp * decay * math.sin((x - x0) / 90 + phase)
            tcol = min(1.0, (x - x0) / 700)
            col = lerp(GOLD, CREAM, tcol) + (255,)
            if prev:
                d.line([prev, (x, y)], fill=col, width=wline)
            prev = (x, y)
            x += step
        # gold "drop cap" block at line start
        d.rounded_rectangle([x0 - 34, y0 - 12, x0 - 12, y0 + 12], radius=4, fill=(255, 196, 0, 235))

    # a few cream sparks drifting off the seams
    for _ in range(26):
        x = rng.uniform(x0, W - 80); y = rng.uniform(120, H - 120)
        r = rng.uniform(1.5, 4.5)
        d.ellipse([x - r, y - r, x + r, y + r], fill=(242, 239, 230, 120))

    img = grain(img, 8)
    img = vignette(img, 0.5)
    img.save(f"{OUT}/puzzle-hero.jpg", quality=84)
    print("puzzle-hero.jpg", img.size)


# ---------------------------------------------------------------- depth layers
def depth_bg():
    W, H = 1600, 900
    img = Image.new("RGB", (W, H), (8, 10, 0))
    d = ImageDraw.Draw(img, "RGBA")
    # radial gold glow
    glow = Image.new("L", (W, H), 0)
    gd = ImageDraw.Draw(glow)
    for r in range(620, 0, -8):
        a = int(46 * (1 - r / 620) ** 1.8)
        gd.ellipse([W / 2 - r, H / 2 - r * 0.62, W / 2 + r, H / 2 + r * 0.62], fill=a)
    glow = glow.filter(ImageFilter.GaussianBlur(60))
    gold_layer = Image.new("RGB", (W, H), (120, 84, 8))
    img = Image.composite(gold_layer, img, glow)
    d = ImageDraw.Draw(img, "RGBA")
    rng = random.Random(23)
    for _ in range(60):  # dust motes
        x = rng.uniform(0, W); y = rng.uniform(0, H); r = rng.uniform(1, 3.4)
        d.ellipse([x - r, y - r, x + r, y + r], fill=(242, 239, 230, rng.randint(24, 70)))
    img = grain(img, 10)
    img = vignette(img, 0.62)
    img.save(f"{OUT}/depth-bg.jpg", quality=82)
    print("depth-bg.jpg", img.size)


def depth_mid():
    W, H = 1600, 900
    # RGBA with a transparent base: the court lines composite over the bg wash.
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    C = (242, 239, 230)
    m = 90
    L, top, R, bottom = m, m, W - m, H - m
    cx, cy = W / 2, (top + bottom) / 2
    wline = 4
    d.rectangle([L, top, R, bottom], outline=C, width=wline)      # boundary
    d.line([(cx, top), (cx, bottom)], fill=C, width=wline)         # half-court
    d.ellipse([cx - 95, cy - 95, cx + 95, cy + 95], outline=C, width=wline)  # center circle

    # 3pt geometry: arc r=356 about the hoop; corner lines at |dy|=330 meet
    # the arc where dx = sqrt(356^2 - 330^2) ~= 133.6  -> half-angle ~= 68 deg
    r3, dy3 = 356, 330
    dx3 = math.sqrt(r3 ** 2 - dy3 ** 2)
    half_ang = math.degrees(math.atan2(dy3, dx3))

    def basket(side):
        # side = -1 -> left baseline, +1 -> right baseline
        base = L if side < 0 else R
        hoop_x = base - side * 79          # hoop 79px in front of baseline
        s = -side                          # +1 = toward center court for left basket
        # key
        kx0, kx1 = (base, base + 285) if side < 0 else (base - 285, base)
        d.rectangle([kx0, cy - 120, kx1, cy + 120], outline=C, width=wline)
        # free-throw circle
        ftx = base + s * 285
        d.ellipse([ftx - 90, cy - 90, ftx + 90, cy + 90], outline=C, width=wline)
        # backboard + rim
        bx = base + s * 60
        d.line([(bx, cy - 45), (bx, cy + 45)], fill=C, width=6)
        d.ellipse([hoop_x - 23, cy - 23, hoop_x + 23, cy + 23],
                  outline=(255, 196, 0), width=4)
        # three-point arc bulging toward center court
        if side < 0:
            d.arc([hoop_x - r3, cy - r3, hoop_x + r3, cy + r3],
                  start=-half_ang, end=half_ang, fill=C, width=wline)
            ex = hoop_x + dx3
            d.line([(base, cy - dy3), (ex, cy - dy3)], fill=C, width=wline)
            d.line([(base, cy + dy3), (ex, cy + dy3)], fill=C, width=wline)
            d.arc([hoop_x - 60, cy - 60, hoop_x + 60, cy + 60],
                  start=290, end=70, fill=C, width=3)  # restricted arc
        else:
            d.arc([hoop_x - r3, cy - r3, hoop_x + r3, cy + r3],
                  start=180 - half_ang, end=180 + half_ang, fill=C, width=wline)
            ex = hoop_x - dx3
            d.line([(base, cy - dy3), (ex, cy - dy3)], fill=C, width=wline)
            d.line([(base, cy + dy3), (ex, cy + dy3)], fill=C, width=wline)
            d.arc([hoop_x - 60, cy - 60, hoop_x + 60, cy + 60],
                  start=110, end=250, fill=C, width=3)  # restricted arc

    basket(-1)
    basket(1)
    img.save(f"{OUT}/depth-mid.png", optimize=True)
    print("depth-mid.png", img.size)


def depth_fg():
    W, H = 1600, 900
    # RGBA with a transparent base; the inner pieslice carves with alpha 0.
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img, "RGBA")
    rng = random.Random(41)
    # large thin gold circle behind
    d.ellipse([1050, -160, 1850, 640], outline=(255, 196, 0, 200), width=10)
    # trophy arc: thick crescent
    d.pieslice([980, 330, 1620, 970], start=195, end=345, fill=(255, 196, 0, 255))
    d.pieslice([1052, 402, 1548, 898], start=195, end=345, fill=(0, 0, 0, 0))
    # trophy cup hint: small stem + base
    d.rectangle([1270, 640, 1300, 740], fill=(255, 196, 0, 255))
    d.rectangle([1220, 740, 1350, 762], fill=(255, 196, 0, 255))
    # stack of book spines, bottom-left, slight rotations
    import math as _m
    bx, by = 200, 830
    widths = [120, 96, 132, 104, 116]
    heights = [430, 500, 380, 540, 460]
    cols = [(255, 196, 0, 255), (242, 239, 230, 255), (196, 148, 0, 255),
            (242, 239, 230, 255), (255, 196, 0, 255)]
    x = bx
    for i, (ww, hh, col) in enumerate(zip(widths, heights, cols)):
        ang = rng.uniform(-4, 4)
        tilt = math.tan(math.radians(ang)) * hh
        pts = [(x, by - hh + tilt / 2), (x + ww, by - hh - tilt / 2),
               (x + ww, by), (x, by)]
        d.polygon(pts, fill=col)
        # pages edge
        d.line([(x + 10, by - hh + 14), (x + 10, by - 12)], fill=(16, 20, 0, 200), width=3)
        x += ww + 14
    # sweeping ribbon across the top
    pts = []
    for i in range(81):
        t = i / 80
        x = 60 + t * 1480
        y = 150 + 90 * math.sin(t * 5.2 + 0.6) - t * 60
        pts.append((x, y))
    d.line(pts, fill=(242, 239, 230, 235), width=30, joint="curve")
    pts2 = [(x + 26, y + 26) for x, y in pts]
    d.line(pts2, fill=(255, 196, 0, 200), width=8, joint="curve")
    # scattered sparks
    for _ in range(30):
        x = rng.uniform(60, W - 60); y = rng.uniform(60, H - 60)
        r = rng.uniform(2, 6)
        col = (255, 196, 0, 220) if rng.random() < 0.5 else (242, 239, 230, 200)
        d.ellipse([x - r, y - r, x + r, y + r], fill=col)
    img.save(f"{OUT}/depth-fg.png", optimize=True)
    print("depth-fg.png", img.size)


if __name__ == "__main__":
    puzzle_hero()
    depth_bg()
    depth_mid()
    depth_fg()
