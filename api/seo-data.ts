export default function handler(_req: unknown, res: { status: (code: number) => { json: (body: unknown) => void } }) {
  res.status(200).json({
    title: "Kiminou Knox | Author, Athlete, Speaker",
    description:
      "The official digital home of Kiminou Knox: author, student-athlete, speaker, and creative voice.",
    url: "https://www.kiminouknox.com",
    image: "/og-image.png"
  });
}
