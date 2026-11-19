import {
  PostBody,
  PostCta,
  PostH2,
  PostHeader,
  PostLink,
  PostOl,
  PostP,
  PostUl,
} from "@/components/blog";

export const POST_META = {
  slug: "gta6-clips-iphone",
  title: "GTA 6 clips on iPhone: a rights-aware launch workflow",
  description:
    "Plan a GTA VI clip workflow for Shorts, TikTok and Reels: capture your own gameplay or get streamer approval, transfer the file to iPhone, then edit it in ReelClip.",
  publishedAt: "2026-10-21",
  category: "How-to" as const,
  primaryKeyword: "GTA 6 clips",
  readMinutes: 6,
};

export default function Post() {
  return (
    <>
      <PostHeader {...POST_META} />
      <PostBody>
        <PostP>
          As of October 21, 2026, Rockstar’s publisher lists Grand Theft Auto
          VI for PlayStation 5 and Xbox Series X|S with a planned launch date of
          November 19, 2026. Players cannot capture their own game session
          until launch. Use this as a launch checklist, and skip leaked pre-release
          footage. Check the
          {" "}
          <PostLink href="https://ir.take2games.com/node/32311/pdf" external>
            current Take-Two release announcement
          </PostLink>
          {" "}before you rely on that date.
        </PostP>
        <PostP>
          After launch, a short GTA 6 post can begin with your own gameplay or
          a streamer’s approved clip. The capture source and game publisher
          have separate rights. Rockstar’s current public
          {" "}
          <PostLink href="https://support.rockstargames.com/articles/7bNaeoMFTV0iUDGhStTXvz/policy-on-posting-copyrighted-rockstar-games-material" external>
            fan video policy
          </PostLink>
          {" "}describes occasional gameplay use as non-commercial and says it
          does not cover advertising or other commercial distribution. Do not
          assume a paid clipping campaign or monetized post is covered; request
          case-specific written permission from Take-Two before accepting one.
        </PostP>

        <PostH2>Capture a source you have permission to edit</PostH2>
        <PostUl>
          <li>
            <strong>Your own gameplay:</strong> use the console’s capture
            controls to record a moment or save recent gameplay. PlayStation
            documents its PS5 capture options and the PlayStation App transfer
            process. The app only keeps supported captures for a limited time,
            so download the file to your device while it is available. For
            Xbox, follow the current
            {" "}
            <PostLink href="https://www.xbox.com/en-US/apps/xbox-app-on-mobile" external>
              Xbox mobile capture instructions
            </PostLink>
            {" "}for your console and region.
          </li>
          <li>
            <strong>A streamer’s moment:</strong> use the clip feature only
            where the channel permits it, then ask the streamer or campaign
            owner for explicit permission to edit and repost the file. KICK
            clips can be downloaded as MP4 from the clip page; Twitch
            broadcasters can control clip creation. Neither platform’s clip
            button clears the game footage, music or other guests’ rights.
          </li>
        </PostUl>
        <PostP>
          PlayStation’s help page notes that voice chat can be included in a
          capture and says to ask chat participants before including their
          voices. Keep private chat and identifiable guest audio out unless
          everyone involved has agreed.
          {" "}
          <PostLink href="https://www.playstation.com/en-us/support/games/capture-ps5-gameplay-screenshots/" external>
            PS5 capture and audio settings
          </PostLink>
          {" "}·{" "}
          <PostLink href="https://www.playstation.com/en-us/support/games/ps5-game-captures-ps-app/" external>
            transfer captures to PlayStation App
          </PostLink>
          {" "}·{" "}
          <PostLink href="https://help.kick.com/en/articles/7120566-how-to-create-clips-on-kick" external>
            download a KICK clip
          </PostLink>
          {" "}·{" "}
          <PostLink href="https://help.twitch.tv/s/article/clips-settings" external>
            Twitch clip settings
          </PostLink>
          .
        </PostP>

        <PostH2>Move the capture to iPhone and make the edit</PostH2>
        <PostOl>
          <li>
            Transfer your own capture or approved source file to Photos or
            Files. Keep the original recording in case the clip needs another
            edit or the campaign asks for a different version.
          </li>
          <li>
            Import the video into ReelClip. Use <strong>Slice</strong> to
            select one memorable moment from a longer VOD. Use
            {" "}
            <strong>Cut</strong> to split a recording into planned clips by
            count, duration and spacing. Cut does not detect the best GTA
            moments automatically.
          </li>
          <li>
            If the moment depends on spoken commentary, open
            {" "}
            <strong>Transcript</strong>, find the passage and check the words
            and timing against playback. Keep the setup and payoff together so
            the clip makes sense without the full stream.
          </li>
          <li>
            Check the first and last frame, game audio, voice chat, subtitles
            and picture framing. A 9:16 export is a separate framing decision;
            a shorter time selection does not crop a landscape capture.
          </li>
          <li>
            Review the prepared output, export the approved clips and upload
            them yourself to the platform named in the campaign brief. ReelClip
            can import and edit a video file; it cannot record the console,
            fetch a stream or publish the clip for you. Saving or exporting the finished video requires Creator mode.
          </li>
        </PostOl>

        <PostH2>Check rights before you monetize a GTA 6 post</PostH2>
        <PostP>
          There are at least two permission questions: whether the streamer
          lets you reuse their recording, and whether the publisher permits
          the commercial use of GTA VI footage. A streamer’s “clip me” message
          answers only the first. Rockstar’s public policy is framed around
          non-commercial fan posts, while YouTube says gaming monetization
          depends on the publisher’s commercial-use license and commentary or
          educational value. Get written clearance for a paid job, avoid story
          spoilers and isolated cinematics, and do not use leaked footage.
          {" "}
          <PostLink href="https://support.google.com/youtube/answer/138161" external>
            YouTube’s game-content monetization rules
          </PostLink>
          {" "}and{" "}
          <PostLink href="https://support.rockstargames.com/articles/7bNaeoMFTV0iUDGhStTXvz/policy-on-posting-copyrighted-rockstar-games-material" external>
            Rockstar’s current posting policy
          </PostLink>
          {" "}set out the checks to make first.
        </PostP>
        <PostP>
          For the iPhone editing controls, continue with the
          {" "}
          <PostLink href="/blog/how-to-cut-long-video-for-tiktok">Cut walkthrough</PostLink>
          {" "}or the guide to{" "}
          <PostLink href="/blog/edit-vertical-video-on-iphone">choosing a moment with Slice</PostLink>
          .
        </PostP>
        <PostCta />
      </PostBody>
    </>
  );
}
