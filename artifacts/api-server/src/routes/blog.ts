import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { randomUUID } from "crypto";

const router: IRouter = Router();

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  categoryId: string | null;
  isPublished: boolean;
  publishedAt: Date | null;
  featuredImage: string | null;
  readTime: number | null;
  tags: string[] | null;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Seed Categories ──────────────────────────────────────────────────────────
const categories: BlogCategory[] = [
  {
    id: "cat-faith",
    name: "Faith & Spirit",
    slug: "faith-spirit",
    description: "Wrestling with God, doubt, and the cost of belief.",
    createdAt: new Date("2024-09-01"),
    updatedAt: new Date("2024-09-01"),
  },
  {
    id: "cat-identity",
    name: "Black Boy Life",
    slug: "black-boy-life",
    description: "What it means to be a Black boy navigating the world with precision and pain.",
    createdAt: new Date("2024-09-01"),
    updatedAt: new Date("2024-09-01"),
  },
  {
    id: "cat-craft",
    name: "The Craft",
    slug: "the-craft",
    description: "On writing, discipline, and building a literary voice.",
    createdAt: new Date("2024-09-01"),
    updatedAt: new Date("2024-09-01"),
  },
  {
    id: "cat-athletics",
    name: "Court & Page",
    slug: "court-and-page",
    description: "Where basketball and literature share the same discipline.",
    createdAt: new Date("2024-09-01"),
    updatedAt: new Date("2024-09-01"),
  },
  {
    id: "cat-love",
    name: "Love & Loss",
    slug: "love-and-loss",
    description: "On what it costs to love honestly and survive it.",
    createdAt: new Date("2024-09-15"),
    updatedAt: new Date("2024-09-15"),
  },
];

// ─── Seed Posts ───────────────────────────────────────────────────────────────
const posts: BlogPost[] = [
  {
    id: "post-001",
    title: "What Black Boys Are Not Allowed to Feel",
    slug: "what-black-boys-are-not-allowed-to-feel",
    excerpt: "There is a performance tax placed on Black boys before they ever learn to speak. I've been paying it my whole life. This is me refusing to.",
    content: `There is a performance tax placed on Black boys before they ever learn to speak.

Before we know what grief is, we know what grief looks like — suppressed. Before we understand love, we understand that need is weakness. Before we reach for warmth, we've already been taught that coldness is armor.

I started writing at thirteen not because someone told me to, but because the feeling wouldn't fit anywhere else. It couldn't go into a conversation — that would be soft. It couldn't go into silence — that would be invisible. It went onto the page, because the page asked nothing of me except honesty.

Seven books later, I still write for the same reason.

**The Cost of Performance**

There is a specific kind of exhaustion that comes from performing strength. I've seen it in the men around me. I've felt it in myself. You become fluent in a language that has no words for "I'm scared" or "I need this" or "that hurt me." You get so good at not saying those things that eventually you stop knowing they're true.

My books are written in the language I wasn't supposed to learn. *Our Father?* is a question mark at the end of a prayer. *The Spirit of Solomon* is a man trying to understand why wisdom costs him everything. These aren't performances of strength. They're accounts of what strength actually requires.

**What Writing Does**

Writing doesn't fix anything. I want to say that clearly. The feeling doesn't go away because you named it on a page. What writing does is make the feeling real in a way that requires you to acknowledge it. You can't perform health on a blank page. It reflects back what's actually there.

That's why I kept writing through doubt, through seasons where I wondered if any of it mattered, through the noise and the silence both. Because the page never asked me to pretend.

**To Every Black Boy Reading This**

Your feelings are not weakness. Your need is not softness. The grief you carry that has no name yet is real, and it is allowed to exist, and it is allowed to be put somewhere it won't destroy you.

Write it. Paint it. Say it to one person who can hold it. Do something with it besides press it down until it turns hard.

The world will keep asking you to perform. That's not changing overnight. But the interior life — the one that's fully yours — does not have to perform for anyone.

That's where I write from. That's what every book is. An interior that refused to perform.`,
    categoryId: "cat-identity",
    isPublished: true,
    publishedAt: new Date("2024-10-12"),
    featuredImage: null,
    readTime: 6,
    tags: ["identity", "Black boy life", "writing", "mental health"],
    createdAt: new Date("2024-10-10"),
    updatedAt: new Date("2024-10-12"),
  },
  {
    id: "post-002",
    title: "The Court and the Page Are the Same Discipline",
    slug: "the-court-and-the-page-are-the-same-discipline",
    excerpt: "People ask how I balance basketball and writing. I don't. They've never been separate. The same thing that makes you show up to film study makes you sit down with a blank page.",
    content: `People ask how I balance basketball and writing. I don't. They've never been separate.

The same thing that makes you show up to film study at 6am when you'd rather not makes you sit down with a blank page when there's nothing there yet. The same thing that makes you take the same shot ten thousand times until it's instinct makes you rewrite a stanza eleven times until it's true. The discipline is not different. The failure looks different. The patience required is the same.

**On Showing Up**

Basketball taught me to show up when I'm empty. That sounds obvious — show up, do the work — but the specific skill is showing up when you have nothing to offer that day, when the legs are heavy and the shot isn't falling and practice is just grinding through the feeling of inadequacy.

Writing required the exact same thing. The days when nothing comes, when every sentence sits wrong, when the thing you're trying to say refuses to be said. You sit there anyway. You do the reps. Not every session produces something. That's not the point.

The point is that the practice continues.

**On Ego and Craft**

The hardest part of being good at something is that ego gets in the way of getting better. In basketball: the player who won't take coaching because he already knows. In writing: the writer who can't kill a sentence he loves because it sounds good but doesn't serve the piece.

I've had to learn to kill things I loved. On the court and on the page. The move that worked in AAU doesn't work when the athlete guarding you is six-eight and locks down. The line that was beautiful in the draft doesn't work when it breaks the poem's internal logic.

Growth requires releasing what made you proud in order to become something truer.

**On Competition**

I love competition. Not in a reactive way — not needing to beat someone to feel good. But in the sense that I want to see what's possible, what the ceiling actually is, whether the version of me that's been building gets to show up when it matters.

Writing is competitive in the same way. Not against other writers. Against the thing you were trying to say. Against the limit of your current vocabulary, your current precision, your current honesty. Every book is me trying to beat the version I wrote last time.

I haven't stopped competing. On either surface.`,
    categoryId: "cat-athletics",
    isPublished: true,
    publishedAt: new Date("2024-11-05"),
    featuredImage: null,
    readTime: 5,
    tags: ["basketball", "writing", "discipline", "craft"],
    createdAt: new Date("2024-11-03"),
    updatedAt: new Date("2024-11-05"),
  },
  {
    id: "post-003",
    title: "What I Mean When I Write About Faith",
    slug: "what-i-mean-when-i-write-about-faith",
    excerpt: "I didn't title a book 'Our Father?' with a question mark to be provocative. I did it because the question was real. Faith in my work is not decoration. It's the wound.",
    content: `I didn't title a book *Our Father?* with a question mark to be provocative.

I did it because the question was real.

Faith in my work is not decoration. It's not aesthetic. It's not the vague spirituality that gets attached to things to make them feel meaningful. Faith in my work is the wound. It's the thing I keep returning to because it hasn't resolved. Because it keeps demanding something of me that I don't always have to give.

**What the Church Gave Me**

I was raised within the Black church. And the Black church gave me language, community, a framework for understanding suffering that didn't require the suffering to be wasted. It gave me elders who had survived things I couldn't imagine and still showed up on Sunday. It gave me music that was grief and praise at the same time.

It also gave me questions I wasn't supposed to ask. About why certain pain wasn't answered. About where God was in specific moments that didn't suggest His presence. About what it means to believe something is true and watch it cost you anyway.

Those questions don't have clean answers. I've stopped expecting them to.

**The Spirit of Solomon**

*The Spirit of Solomon* is my most direct engagement with this. Solomon as a figure — the man given wisdom, the man who still made choices that cost him everything. What does it mean to be wise and still lose? What does it mean to know what's right and still reach for what's wrong?

I don't write resolutions into that. Because I don't have them. What I write is the interior of that question. What it feels like to be a young person navigating faith and doubt and desire and discipline all at once, without a clean answer at the end.

That's honest. That's what I owe the reader.

**Faith as Discipline**

Where I've landed, at least for now: faith is not a feeling. It's a discipline. It's the daily choice to orient yourself toward something you can't see but believe has coherence, even on the days when nothing confirms it.

That's also how I feel about writing. And basketball. And anything that requires sustained commitment in the absence of guaranteed return.

Faith is the practice. The question mark stays.`,
    categoryId: "cat-faith",
    isPublished: true,
    publishedAt: new Date("2024-12-01"),
    featuredImage: null,
    readTime: 6,
    tags: ["faith", "spirituality", "Our Father", "Spirit of Solomon"],
    createdAt: new Date("2024-11-28"),
    updatedAt: new Date("2024-12-01"),
  },
  {
    id: "post-004",
    title: "Seven Books Before Twenty: Why I Couldn't Stop",
    slug: "seven-books-before-twenty-why-i-couldnt-stop",
    excerpt: "I'm nineteen. I have seven published books. People ask how. The real answer is that I couldn't stop — not as discipline, but as necessity.",
    content: `I'm nineteen. I have seven published books. People ask how.

The real answer is that I couldn't stop. Not as discipline — though that's part of it — but as necessity. The writing wasn't optional. It was the only place where the interior life had room to be what it actually was.

**Book One**

The first book was written in the gap between what I felt and what I was allowed to say. I was younger. I didn't know it would become a book. I knew that the feeling wouldn't fit inside me anymore and it had to go somewhere. The page was the somewhere.

When it became a book, something shifted. The private act became public. The interior became artifact. That was frightening and freeing at the same time.

**The Accumulation**

Each book came from a specific season. A specific question I was living inside. *Our Father?* came from the season where faith was fracturing and I needed to look at it directly. *The Spirit of Solomon* came from studying wisdom as a concept and realizing how little wisdom protects you from yourself. Each title is a door into a specific room I was in when I wrote it.

Seven books means seven seasons. Seven rooms I went through. Seven things I needed to say badly enough to say them in public.

**What People Don't See**

The publishing isn't the hard part. The hard part is the honesty required to write something worth publishing. Every time I sat down to write, I had to decide how much truth I was willing to put on the page. How much of the actual feeling, not the sanitized version. How much of the doubt, the contradiction, the mess.

The reader can always tell when you've held something back. Not in a specific way — they won't know what you withheld. But the writing has a different weight when it's not fully honest. It sits lighter than it should. The reader feels that.

So I had to keep going all the way in. Every time. That's the part that costs something.

**Why Seven**

There's no magic in the number. It's just the number of things I had to say. There will be more. I'm not done. There are rooms I haven't been in yet. Questions I'm not old enough to ask properly. Things that will only become clear with time and experience and more living.

Seven is where I am so far. It's not a ceiling. It's a current count.`,
    categoryId: "cat-craft",
    isPublished: true,
    publishedAt: new Date("2025-01-14"),
    featuredImage: null,
    readTime: 5,
    tags: ["books", "writing life", "creative process", "publishing"],
    createdAt: new Date("2025-01-12"),
    updatedAt: new Date("2025-01-14"),
  },
  {
    id: "post-005",
    title: "On Love That Doesn't Perform",
    slug: "on-love-that-doesnt-perform",
    excerpt: "I keep writing about love because I keep trying to understand it. Not romantic love specifically — love as a practice. Love without an audience. Love that doesn't know it's being watched.",
    content: `I keep writing about love because I keep trying to understand it.

Not romantic love specifically — though that's in there. Love as a practice. Love as a discipline. Love without an audience. Love that doesn't know it's being watched.

**The Performance Problem**

We've become good at performing love. The public declaration. The gesture that has witnesses. The relationship status. The thing we say about people when they're in the room and the very different thing we feel when they're not.

I'm not exempt from this. I've caught myself being more demonstrative when there's someone to observe it. That's not love — that's the performance of love. And the difference matters.

What I try to write toward — and what I try to live toward, with varying success — is love that doesn't need the audience. The consistency of care when no one is watching. The patience in private. The showing up in the moments that aren't cinematic.

**What Love Costs**

I've learned that genuine love is expensive. It costs presence, which is hard to give when you're managing your own interior and your own survival. It costs honesty, which requires being willing to say things that risk the relationship rather than things that protect it. It costs time in a way that can't be scheduled.

That's the love I'm interested in. Not the feeling — feelings shift with weather and sleep and hunger. The practice. The thing you choose when the feeling isn't there.

**Love in the Work**

Every book I've written has love in it somewhere. Not always at the center, but always present. Because love — parental, romantic, spiritual, self-directed — is the thing we're always navigating, even when we think we're doing something else.

*The Spirit of Solomon* is about love's relationship to wisdom and destruction. *Our Father?* is about the love that exists even inside broken trust. The other books carry it differently. But it's always there.

Because what else is there, finally, to write about?

Love without the performance. That's what I'm after. On the page and off it.`,
    categoryId: "cat-love",
    isPublished: true,
    publishedAt: new Date("2025-02-14"),
    featuredImage: null,
    readTime: 5,
    tags: ["love", "relationships", "identity", "emotional honesty"],
    createdAt: new Date("2025-02-10"),
    updatedAt: new Date("2025-02-14"),
  },
  {
    id: "post-006",
    title: "The Lie I Was Told About Discipline",
    slug: "the-lie-i-was-told-about-discipline",
    excerpt: "Discipline is not about wanting to. That's the lie. Discipline is about doing it anyway — when you don't want to, when it doesn't feel good, when the return isn't visible yet.",
    content: `Discipline is not about wanting to.

That's the lie. The version of discipline that gets sold — the 5am routine, the motivation, the mindset — implies that the disciplined person has found a way to want to do the hard thing. That motivation is the precondition.

It isn't. Motivation is unreliable. It comes and goes with sleep and season and whether the last thing you did worked or not. Discipline is what you do in the absence of motivation. That's the entire point of it.

**What I Learned from Practice**

Basketball practice runs whether I feel like it or not. Film study runs whether I feel like it or not. Weight training runs whether I feel like it or not. There are days when every part of me is against it. The legs are heavy. The mind is somewhere else. The body hasn't recovered from the last session.

You do it anyway. And here's the thing no one tells you: it doesn't feel good when you do it anyway. It doesn't feel virtuous. You don't walk away with a sense of accomplishment on those days. You walk away with just the fact of having done it.

The discipline is in that fact. Not the feeling. The fact.

**Writing Is the Same**

There are writing sessions that produce nothing. The page stays mostly empty. What gets written gets deleted. The idea that was clear yesterday refuses to become clear again. You sit with it for an hour and walk away with two sentences that might survive.

Those sessions count the same as the good ones. Maybe more.

Because the practice is what builds the capacity. Not the individual outputs. You can't know which session produces something — you only know that the practice produces everything, over time, if you keep showing up.

**What Discipline Actually Is**

Discipline is the decision, made once, that you're going to do the thing regardless of how you feel about it on any given day. You don't re-litigate it every morning. The decision is made. It's not a question anymore. You show up because you decided to show up, and the showing up is its own justification.

That's it. That's the whole thing.

Not motivation. Not wanting to. Not feeling ready. The decision, made once, honored consistently.

Everything I've built — the books, the athletic development, whatever else — came from that. One decision, made early, kept.`,
    categoryId: "cat-craft",
    isPublished: true,
    publishedAt: new Date("2025-03-22"),
    featuredImage: null,
    readTime: 5,
    tags: ["discipline", "mindset", "craft", "athletics"],
    createdAt: new Date("2025-03-20"),
    updatedAt: new Date("2025-03-22"),
  },
];

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) {
    console.warn("[blog] ADMIN_SECRET not set — write access is disabled");
    return res.status(503).json({ error: "Admin access not configured. Set ADMIN_SECRET env var." });
  }
  const key = req.headers["x-admin-key"];
  if (key !== adminSecret) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  return next();
}

router.get("/blog/categories", (_req, res) => {
  res.json(categories);
});

router.post("/blog/categories", requireAdmin, (req, res) => {
  const now = new Date();
  const cat: BlogCategory = {
    id: randomUUID(),
    name: req.body.name,
    slug: req.body.slug || req.body.name.toLowerCase().replace(/\s+/g, "-"),
    description: req.body.description ?? null,
    createdAt: now,
    updatedAt: now,
  };
  categories.push(cat);
  res.status(201).json(cat);
});

router.put("/blog/categories/:id", requireAdmin, (req, res) => {
  const idx = categories.findIndex((c) => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Category not found" });
  categories[idx] = { ...categories[idx], ...req.body, updatedAt: new Date() };
  res.json(categories[idx]);
});

router.delete("/blog/categories/:id", requireAdmin, (req, res) => {
  const idx = categories.findIndex((c) => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Category not found" });
  categories.splice(idx, 1);
  res.json({ ok: true });
});

router.get("/blog/posts", (req, res) => {
  let result = [...posts];
  if (req.query.published === "true") {
    result = result.filter((p) => p.isPublished);
  }
  if (req.query.category) {
    result = result.filter((p) => p.categoryId === req.query.category);
  }
  res.json(result);
});

router.get("/blog/posts/:identifier", (req, res) => {
  const post = posts.find(
    (p) => p.id === req.params.identifier || p.slug === req.params.identifier,
  );
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
});

router.post("/blog/posts", requireAdmin, (req, res) => {
  const now = new Date();
  const post: BlogPost = {
    id: randomUUID(),
    title: req.body.title,
    slug: req.body.slug || req.body.title.toLowerCase().replace(/\s+/g, "-"),
    excerpt: req.body.excerpt ?? null,
    content: req.body.content,
    categoryId: req.body.categoryId ?? null,
    isPublished: req.body.isPublished ?? false,
    publishedAt: req.body.isPublished ? now : null,
    featuredImage: req.body.featuredImage ?? null,
    readTime: req.body.readTime ?? null,
    tags: req.body.tags ?? null,
    createdAt: now,
    updatedAt: now,
  };
  posts.push(post);
  res.status(201).json(post);
});

router.put("/blog/posts/:id", requireAdmin, (req, res) => {
  const idx = posts.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Post not found" });
  posts[idx] = { ...posts[idx], ...req.body, updatedAt: new Date() };
  res.json(posts[idx]);
});

router.patch("/blog/posts/:id/publish", requireAdmin, (req, res) => {
  const idx = posts.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Post not found" });
  posts[idx].isPublished = true;
  posts[idx].publishedAt = new Date();
  posts[idx].updatedAt = new Date();
  res.json(posts[idx]);
});

router.patch("/blog/posts/:id/unpublish", requireAdmin, (req, res) => {
  const idx = posts.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Post not found" });
  posts[idx].isPublished = false;
  posts[idx].updatedAt = new Date();
  res.json(posts[idx]);
});

router.delete("/blog/posts/:id", requireAdmin, (req, res) => {
  const idx = posts.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Post not found" });
  posts.splice(idx, 1);
  res.json({ ok: true });
});

export default router;
