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
  state: BUILDING === "true" ? 
    "pending" : 
    (BUILD_ANDROID === "true" && BUILD_IOS === "true" && BUILD_ANDROID_APK === "true" ? "success" : "failure"),
  target_url: `https://github.com/USThing/USThingAppBuilder/actions/runs/${RUN_ID}`,
  description:
    BUILDING === "true" ? (
      "Build in progress..."
    ) : (
      BUILD_ANDROID === "true" && BUILD_IOS === "true" && BUILD_ANDROID_APK === "true" ? 
        "Build suceeded!" : 
        "Build failed on one or more platforms. Please check the logs for details."
    ),
  context: "USThing App Builder",
})