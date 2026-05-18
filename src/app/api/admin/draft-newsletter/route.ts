import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getAllPosts } from "@/lib/mdx";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function POST(req: NextRequest) {
  try {
    // Check admin password
    const { password } = await req.json();
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Read last 3 blog posts full content
    const posts = getAllPosts().slice(0, 3);
    const postsWithContent = posts.map((post) => {
      const filePath = path.join(process.cwd(), "content/blog", `${post.slug}.mdx`);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { content } = matter(raw);
      return { ...post, content: content.slice(0, 1500) };
    });

    const blogSummary = postsWithContent
      .map((p) => `TITLE: ${p.title}\nTAG: ${p.tag}\nEXCERPT: ${p.excerpt}\nCONTENT EXCERPT:\n${p.content}`)
      .join("\n\n---\n\n");

    // Call OpenRouter
    const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://histobit.com",
        "X-Title": "Histobit Newsletter",
      },
      body: JSON.stringify({
        model: "anthropic/claude-3-haiku",
        messages: [
          {
            role: "system",
            content: `You are the editor of Histobit, a premium military history newsletter read by 40,000 people in the USA, UK, and Canada aged 30-60. They watch Epic History TV and Kings and Generals. Your newsletter style is cinematic, authoritative, and direct. No fluff. No motivational language. Write like a senior historian who knows how to tell a story. Always write in HTML format suitable for email.`,
          },
          {
            role: "user",
            content: `Based on these recent Histobit blog posts, write a weekly newsletter edition. 

${blogSummary}

Write the newsletter as HTML. Include:
1. A compelling subject line (output as: SUBJECT: your subject line here)
2. A short editorial opening (2-3 sentences, personal and direct)
3. A featured story section highlighting the most compelling post
4. Brief mentions of the other posts with links to histobit.com/blog/[slug]
5. A closing line that feels like it came from a real person

Format the HTML cleanly with inline styles matching: background #faf5ee, text #3a302a, accent #c2652a, font Georgia serif for headings, Arial for body. Max width 600px. Output the subject line first on its own line, then the full HTML.`,
          },
        ],
      }),
    });

    const aiData = await aiRes.json();
    const rawOutput = aiData.choices?.[0]?.message?.content || "";

    // Parse subject line and HTML
    const lines = rawOutput.split("\n");
    const subjectLine = lines.find((l: string) => l.startsWith("SUBJECT:"))?.replace("SUBJECT:", "").trim() || "This Week from Histobit";
    const htmlContent = lines.filter((l: string) => !l.startsWith("SUBJECT:")).join("\n").trim();

    // Save to Supabase
    const supabase = createServerSupabaseClient();
    const { data: draft, error } = await supabase
      .from("newsletter_drafts")
      .insert({
        subject: subjectLine,
        html_content: htmlContent,
        status: "draft",
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to save draft" }, { status: 500 });
    }

    return NextResponse.json({ success: true, draft });
  } catch (err) {
    console.error("Draft error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
