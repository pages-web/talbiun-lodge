"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { useQuery } from "@apollo/client/react";
import { CP_POSTS } from "@/graphql/cms/queries/post";
import type {
  CpPostsData,
  CpPostsVariables,
} from "@/graphql/cms/queries/post";

export default function AboutPage() {
  const locale = useLocale();

  const { data, loading } = useQuery<CpPostsData, CpPostsVariables>(
    CP_POSTS,
    {
      variables: { language: locale },
    }
  );  

  const mainPost = data?.cpPosts?.[0];

  const thumbnailUrl = mainPost?.thumbnail?.url
    ? mainPost.thumbnail.url.startsWith("http")
      ? mainPost.thumbnail.url
      : `https://erxes-saas.s3.amazonaws.com/${mainPost.thumbnail.url}`
    : "/images/about-ger.jpg";

  const content = mainPost?.content
    ?.replace(/<h1[^>]*>.*?<\/h1>/gi, "")
    .trim();

  return (
    <section className="bg-[#f7f4ef] min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.4em] text-[#9c7c3c] text-sm mb-6">
            About Us
          </p>

          <h1 className="font-serif text-[#1f1a17] text-5xl md:text-6xl lg:text-7xl font-light leading-tight">
            {mainPost?.title || "A Ger Retreat on the Open Steppe"}
          </h1>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <img
              src={thumbnailUrl}
              alt={mainPost?.title || "About Us"}
              className="w-full rounded-3xl shadow-lg object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/images/about-ger.jpg";
              }}
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="prose prose-lg max-w-none
                       prose-p:text-[#4a3f36]
                       prose-p:leading-[1.9]
                       prose-p:text-[1.15rem]
                       prose-headings:hidden"
          >
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-5 bg-[#d8c9b3] rounded w-full" />
                <div className="h-5 bg-[#d8c9b3] rounded w-5/6" />
                <div className="h-5 bg-[#d8c9b3] rounded w-full" />
                <div className="h-5 bg-[#d8c9b3] rounded w-4/5" />
              </div>
            ) : content ? (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              <p>Content coming soon.</p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}