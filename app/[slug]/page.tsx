import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "../sanity/client";
import Link from "next/link";
import {PortableText} from '@portabletext/react'
import Image from "next/image";
import  { ColorComponent } from "../portableTextComponents.js";
import type { PortableTextBlock } from '@portabletext/types';


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
      height="300"
      width="600"
      priority
    />
  );
};

const components = {
  types: {
    image: SanityImage,
  },
  marks: {
    color: ({ children, value }: { children: React.ReactNode; value?: { hex: string } }) => (
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


interface PageProps {

    params: Promise<{
        slug: string; // Ensure this is correctly typed
    }>; // Changed from object to Promise
  }


export default async function PostPage({
  params,
}: PageProps): Promise<JSX.Element> { // Ensure the return type is a Promise of JSX.Element
  const { slug } = await params; // Get slug directly from params

  interface Post {
    title: string;
    publishedAt: string;
    body: PortableTextBlock[]; // Adjust this based on your actual data structure
    image?: SanityImageSource; // Optional if the image might not exist
  }

  // Fetch post data directly
  const post = await client.fetch<Post>(
    POST_QUERY, 
    { slug }, 
    options
  );

  if (!post) {
    // Handle the case when no post is found
    return (
      <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
        <Link href="/Blog" className="hover:underline">
          ← Strona glowna
        </Link>
        <h1 className="text-4xl font-bold mb-8">PNie znaleziono postow</h1>
        <p>Przepraszamy cos poszlo nie tak</p>
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
        <Image
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