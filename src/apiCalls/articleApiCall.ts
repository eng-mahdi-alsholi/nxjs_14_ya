import { DOMAIN } from "@/utils/constans";
import { singleArticle } from "@/utils/types";
import { Article } from "@prisma/client";

export async function getArticles(
  pageNumber: string | undefined
): Promise<Article[]> {
  const response = await fetch(
    `http://localhost:3000/api/articles?pageNumber=${pageNumber}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch articles ....... ");
  }
  return response.json();
}

export async function getArticlesCount(): Promise<number> {
  const response = await fetch(`http://localhost:3000/api/articles/count`);
  if (!response.ok) {
    throw new Error("Failed to fetch articles count ");
  }
  const { count } = (await response.json()) as { count: number };
  return count;
}

// get Article based on search
export async function getArticlesBasedOnSearch(
  searchText: string | undefined
): Promise<Article[]> {
  const response = await fetch(
    `http://localhost:3000/api/articles/search?searchText=${searchText}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch articles ....... ");
  }

  return response.json();
}

// get single article
export async function getSingleArticle(id: string): Promise<singleArticle> {
  const response = await fetch(`${DOMAIN}api/articles/${id}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch article ....... ");
  }
  return response.json();
}
