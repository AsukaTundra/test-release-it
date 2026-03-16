import { Config } from "release-it";

export default {
  npm: {
    publish: false,
    skipChecks: true,
  },
  github: {
    release: false,
  },
  plugins: {
    "@release-it/conventional-changelog": {
      preset: "conventionalcommits",
      infile: "CHANGELOG.md",
      strictSemVer: true,
    },
  },
  hooks: {
    "after:bump":
      "echo ${version} > VERSION && node scripts/update-env-version.js ${version}",
    "before:release": "git add VERSION .env.example",
  },
} satisfies Config;
