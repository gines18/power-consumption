import {type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "../sanity/client";
import Link from "next/link";
import {PortableText} from '@portabletext/react'
import Image from "next/image";
import  { ColorComponent } from "../portableTextComponents.js";
import { Metadata } from 'next'
const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

const SanityImage = ({ value }: { value: SanityImageSource & { alt?: string } }) => {
  const imageUrl = urlFor(value)?.width(800).url();
  return (
    <Image
      src={imageUrl || ''}
      alt={value.alt || ' '}
      className="rounded-lg my-6"
      width={800}
      height={300}
      priority
    />
  );
};

interface ColorMarkDefinition {
  hex: string;
  alpha?: number;
  _type: 'color';
}

const components = {
  types: {
    image: SanityImage,
  },
  marks: {
    color: ({ children, value }: { 
      children: React.ReactNode; 
      value?: ColorMarkDefinition 
    }) => (
      <ColorComponent value={value}>{children}</ColorComponent>
    )
  },
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => <p>{children}</p>,
    h1: ({ children }: { children?: React.ReactNode }) => <h1>{children}</h1>,
    h2: ({ children }: { children?: React.ReactNode }) => <h1>{children}</h1>,
    h3: ({ children }: { children?: React.ReactNode }) => <h1>{children}</h1>,
    h4: ({ children }: { children?: React.ReactNode }) => <h2>{children}</h2>,
    blockquote: ({ children }: { children?: React.ReactNode }) => <blockquote>{children}</blockquote>,
  }
};
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const post = await client.fetch<SanityDocument>(
    POST_QUERY, 
    { slug: params.slug },
    options
  );

  return {
    title: post?.title || 'Post',
    description: post?.excerpt || '',
  }
}
interface PageProps {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

  export default async function PostPage({
    params,
    searchParams, // Add this even if you don't use it
  }: PageProps) {
    const resolvedParams = params; // Remove the await since params is already resolved
    const post = await client.fetch<SanityDocument>(
      POST_QUERY, 
      { slug: resolvedParams.slug }, 
      options
    );
    
  if (!post) {
    // Handle the case when no post is found
    return (
      <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
        <Link href="/Blog" className="hover:underline">
          ← Back to posts
        </Link>
        <h1 className="text-4xl font-bold mb-8">Post not found</h1>
        <p>Sorry, the requested post could not be found.</p>
      </main>
    );
  }

  const postImageUrl = post.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;

    
  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/Blog" className="hover:underline">
        ← Wróć do postów
      </Link>
      {postImageUrl && (
        <img
          src={postImageUrl}
          alt={post.title}
          className="aspect-video rounded-xl"
          width="550"
          height="310"
        />
      )}
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <div className="prose">
        <p>Opublikowano: {new Date(post.publishedAt).toLocaleDateString()}</p>
        {Array.isArray(post.body) && (
          <PortableText 
            value={post.body} 
            components={components}
          />
        )}
      </div>
    </main>
  );
}