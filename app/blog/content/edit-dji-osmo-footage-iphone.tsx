import { AppStoreLink } from "@/components/app-store-link";
import { PostBody, PostCta, PostH2, PostH3, PostHeader, PostLink, PostOl, PostP, PostUl } from "@/components/blog";

export const POST_META = {
  "slug": "edit-dji-osmo-footage-iphone",
  "title": "How to edit DJI footage on iPhone: import, choose moments and review the result",
  "description": "Transfer Osmo footage with DJI Mimo or a compatible card reader, import from Photos or Files, then choose and review clips in ReelClip.",
  "publishedAt": "2026-08-25",
  "updatedAt": "2026-10-21",
  "category": "How-to" as const,
  "primaryKeyword": "edit dji osmo footage on iphone",
  "readMinutes": 5
};

export default function Post() {
  return <>
    <PostHeader {...POST_META} />
    <PostBody>
<PostP>To edit DJI footage on iPhone, transfer the original recording to a location you can access, import it in ReelClip, and choose how you want to select moments. Check color, framing and captions before saving the clips for your publishing workflow.</PostP>
<PostH2>Keep the original when transferring</PostH2>
<PostP>Use a transfer method supported by your camera and iPhone. Keep the original camera file and a note of its recording mode rather than relying on an already processed sharing copy. If the file is in cloud storage, make sure it is available before starting the edit.</PostP>
<PostP>For camera-specific transfer steps, use the <PostLink href="https://www.dji.com/downloads" external>DJI download and manual resources</PostLink> for your model. Transfer support depends on the camera, storage and connection; one method is not guaranteed for every Osmo, Action or drone.</PostP>
<PostH2>Transfer Osmo Pocket footage to your iPhone</PostH2>
<PostH3>Download with DJI Mimo</PostH3>
<PostOl><li>Connect the camera to DJI Mimo using the connection supported by your model.</li><li>Open the camera album or playback view. Select a recording and use its download action. For a batch, select the recordings in the thumbnail view and download them together.</li><li>Wait for the download to finish, then check that the video is available in your iPhone Photos library before importing it in ReelClip.</li></PostOl>
<PostP>DJI documents these album and download actions in its <PostLink href="https://repair.dji.com/help/content?customId=01700006849&amp;lang=en&amp;paperDocType=ARTICLE&amp;re=US&amp;spaceId=17" external>Osmo footage export guide</PostLink>. The connection and controls can vary by camera and app version. Keep the camera original when exporting a copy with edits or effects.</PostP>
<PostH3>Import from the camera’s memory card</PostH3>
<PostOl><li>Use a card reader and adapter compatible with your iPhone and the camera’s microSD card.</li><li>Connect the reader, open Photos and use its import option to copy the selected videos. Keep the files on the card until you have checked the copies.</li><li>Open the copied video on your iPhone, then select it from Photos in ReelClip. If you copied it to a local Files folder instead, use ReelClip’s Files import.</li></PostOl>
<PostP>Apple explains <PostLink href="https://support.apple.com/guide/iphone/import-and-export-photos-and-videos-iph480caa1f3/ios" external>importing videos from a camera or memory card</PostLink> and <PostLink href="https://support.apple.com/guide/iphone/external-storage-devices-iph95baac91f/ios" external>accessing a connected card in Files</PostLink>. A matching port alone does not establish that a direct camera-to-phone cable connection will work; check DJI’s instructions for the exact camera.</PostP>
<PostH2>If the recording is missing or will not open</PostH2>
<PostUl><li>If it is still visible only in DJI Mimo, finish the camera download and check the phone copy before opening ReelClip.</li><li>If it is stored in iCloud or another cloud location, wait for the full file to download. A thumbnail is not proof that the recording is available locally.</li><li>Check the copied file’s duration and play it outside ReelClip. If the copy is incomplete, transfer it again while retaining the camera original.</li><li>If a reader is not visible, check the adapter and power requirements in Apple’s storage guide. Try a short original recording before transferring a large batch.</li></PostUl>
<PostP><AppStoreLink data-analytics-event="download_click_blog" data-analytics-event-placement="dji_transfer_cta" className="text-accent hover:underline">Try ReelClip with your transferred DJI recording</AppStoreLink>. Import and preview are free; saving video to your iPhone requires Creator mode.</PostP>
<PostH2>Choose the editing mode for the task</PostH2>
<PostUl><li>Slice lets you choose a time window, move it to a moment you want and refine the edges.</li><li>Cut plans clips using the amount, duration and spacing controls. Review the selected moments before saving.</li><li>Transcript is useful for spoken recordings: read the recognized words, check errors and choose the passage in context.</li><li>AI can help plan moments from a prompt when its required device features are available. Review the proposed cuts yourself.</li></PostUl>
<PostP>The <PostLink href="/blog/edit-vertical-video-on-iphone">Slice walkthrough</PostLink> and <PostLink href="/blog/how-to-cut-long-video-for-tiktok">Cut walkthrough</PostLink> show the actual selection controls. The app prepares clips; it does not post them directly to social platforms.</PostP>
<PostH2>Check the color profile</PostH2>
<PostP>DJI recording modes differ by model. Match the conversion to the source rather than applying the same LUT to every file. Normal, D-Cinelike, D-Log M and HLG should not be treated as one format. See the <PostLink href="/blog/dji-osmo-pocket-color-grading">Pocket color guide</PostLink> for profile identification and the <PostLink href="/blog/how-to-apply-lut-on-iphone">LUT import demo</PostLink> for the controls.</PostP>
<PostH2>Review captions, framing and sound</PostH2>
<PostP>Read captions against the spoken recording and correct recognition errors. Play through edits to check that words and gestures are not cut abruptly. Choosing a shorter time range does not by itself reframe a wide shot for a vertical post, so inspect the picture separately.</PostP>
<PostP>Different recording lengths, codecs and device conditions affect processing. Preview a representative section instead of relying on a fixed promise about transcription or export time.</PostP>
<PostH2>Save the version you checked</PostH2>
<PostP>Open Review, watch the rendered result and save the clips you want. Saving the video to your iPhone requires Creator mode. Check the actual file in Photos before sharing, particularly if you changed color or caption settings. Keep the source so you can make another version later.</PostP>
      <PostCta />
    </PostBody>
  </>;
}
