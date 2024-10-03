import { AuthorsRespone, PaintsResponse } from "../app/types";

type Author = AuthorsRespone;
type Paint = PaintsResponse;

type PaintWithName = Paint & {
  authorName: string;
};

export const linkAuthorsWithPaints = (
  paintsData: Paint[] | undefined,
  authorsData: Author[] | undefined,
): PaintWithName[] | undefined => {
  if (authorsData && paintsData) {
    return paintsData.map((paint: Paint) => {
      const author = authorsData.find(
        (author: Author) => author.id === paint.authorId,
      );

      const newPaint = { ...paint };
      newPaint.name = newPaint.name.toUpperCase();

      return {
        ...newPaint,
        authorName: author ? author.name.toUpperCase() : "Unknown",
      };
    });
  }
  return;
};
