import { GuideVideo } from "@/components/guide-video";
import { PostBody, PostCta, PostH2, PostHeader, PostLink, PostOl, PostP } from "@/components/blog";

export const POST_META = {
  slug: "extract-clip-from-podcast",
  title: "How to extract highlights from a podcast on iPhone",
  description: "Use the transcript to find and review spoken moments from a podcast video, check captions, and prepare clips for export on iPhone.",
  publishedAt: "2026-08-24",
  updatedAt: "2026-10-20",
  category: "Use case" as const,
  primaryKeyword: "how to clip podcast highlights",
  readMinutes: 4,
};

export default function Post() {
  return <>
    <PostHeader {...POST_META} />
    <PostBody>
        <PostP>
          A transcript can help you find a spoken moment without repeatedly
          scrubbing the whole recording. Start with a video of your podcast or
          interview, then read the transcript and play the surrounding passage
          before choosing a clip.
        </PostP>
        <PostP>
          Keep enough context for someone who has not heard the episode.
          A quotable sentence can still need the question or explanation that
          came before it.
        </PostP>
        <GuideVideo id="edit-transcript" />
        <PostH2>Find and select the passage</PostH2>
        <PostOl>
          <li>Import the video from Photos or Files and choose Transcript.</li>
          <li>Wait for transcription, then check names and any words it misunderstood.</li>
          <li>Read through the text and play a candidate passage in context.</li>
          <li>Use Add as clip for the passage you want, or use Slice when you already know its time range.</li>
        </PostOl>
        <PostP>
          The recorded interface shows Add as clip beside a transcript passage.
          The demo also shows a word removed from the edit. Removing a word
          changes the video edit, so listen at that cut rather than treating it
          as a simple spelling correction.
        </PostP>
        <PostH2>Review captions and sound</PostH2>
        <PostP>
          Preview each candidate clip before exporting. Check its opening,
          ending and any removed speech. If you use captions, review the words
          and their placement over the picture. Check the captions in the
          final saved file as well as the editor preview.
        </PostP>
        <PostP>
          You can inspect the transcript’s Export menu for text and subtitle
          options separately from saving the video. For long quiet gaps, see
          {" "}<PostLink href="/blog/remove-silence-from-video-free">pause cleanup</PostLink>.
        </PostP>
        <PostH2>Save the clip you intend to post</PostH2>
        <PostP>
          Choose Review and inspect the prepared output, then save to Photos.
          Export requires Creator. Check the saved file and its framing before
          uploading it to your chosen platform. Transcription and rendering
          time depend on the recording and device; there is no fixed processing
          time or guaranteed number of useful highlights.
        </PostP>
        <PostP>
          Use <PostLink href="/blog/how-to-cut-long-video-for-tiktok">Cut</PostLink>
          {" "}when regularly spaced clips suit the recording better than
          transcript selection.
        </PostP>
        <PostCta />
    </PostBody>
  </>;
}
