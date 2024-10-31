import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "../sanity/client";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
    <Link href="/" className="hover:underline">
      ← Strona główna
    </Link>
    <h1 className="text-4xl font-bold my-8">Lista blogów</h1>
    <ul className="flex flex-col gap-y-4">
      {posts.map((post) => (
        <li 
          className="group hover:bg-gray-50 p-4 rounded-lg transition-colors duration-200" 
          key={post._id}
        >
          <Link href={`/${post.slug.current}`}>
            <h2 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
              {post.title}
            </h2>
            <p className="text-gray-600">
              {new Date(post.publishedAt).toLocaleDateString()}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  </main>
  );
}