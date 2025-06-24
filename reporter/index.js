import { Octokit } from "octokit";

const { GITHUB_TOKEN } = process.env;
const { RUN_ID } = process.env;
const { REPO, OWNER, SHA } = process.env;
const { BUILDING } = process.env;
const { BUILD_ANDROID, BUILD_IOS, BUILD_ANDROID_APK } = process.env;

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

octokit.request("POST /repos/{owner}/{repo}/statuses/{sha}", {
  owner: OWNER,
  repo: REPO,
  sha: SHA,
  state: BUILDING === "true" ? "pending" : "success",
  target_url: `https://github.com/USThing/USThingAppBuilder/actions/runs/${RUN_ID}`,
  description:
    BUILDING === "true" ? (
      "Build in progress..."
    ) : (
      `#### Build Status of Commit ${COMMIT_SHA}\n\n` +
      `- Android: ${BUILD_ANDROID === "true" ? "🟢" : "🔴"}\n` +
      `- iOS: ${BUILD_IOS === "true" ? "🟢" : "🔴"}\n` +
      `- Android APK: ${BUILD_ANDROID_APK === "true" ? "🟢" : "🔴"}\n`
    ),
  context: "USThing App Builder",
})