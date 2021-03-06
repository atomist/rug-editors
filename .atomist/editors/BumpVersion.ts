/*
 * Copyright © 2017 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Project } from "@atomist/rug/model/Project";
import { Editor, Parameter, Tags } from "@atomist/rug/operations/Decorators";
import { EditProject } from "@atomist/rug/operations/ProjectEditor";

import { isRugArchive, NotRugArchiveError } from "./RugEditorsPredicates";

/**
 * Increment the Rug archive version in .atomist/package.json.
 */
@Editor("BumpVersion", "bump the version of this Rug archive project")
@Tags("rug", "version")
export class BumpVersion implements EditProject {

    @Parameter({
        displayName: "version component",
        description: "which component of the version to increment, major|minor|patch",
        pattern: "^(major|minor|patch)$",
        validInput: "one of: major, minor, patch",
        minLength: 5,
        maxLength: 5,
        required: false,
    })
    public component: string = "minor";

    public edit(project: Project) {
        if (!isRugArchive(project)) {
            throw new NotRugArchiveError();
        }
        const pkgJsonPath = ".atomist/package.json";
        const pkgJson = project.findFile(pkgJsonPath);
        if (pkgJson == null) {
            const err = `failed to open file: ${pkgJsonPath}`;
            console.log(err);
            throw new Error(err);
        }

        const extractVersionRegex = /"version"\s*:\s*"(.*?)"/;
        const versionMatch = extractVersionRegex.exec(pkgJson.content);
        if (!versionMatch) {
            const err = `unable to extract version from ${pkgJsonPath}: ${pkgJson.content}`;
            console.log(err);
            throw new Error(err);
        }

        const comp = this.component as "major" | "minor" | "patch";
        const newVersion = incrementVersion(versionMatch[1], comp);

        pkgJson.regexpReplace(`"version"\\s*:\\s*".*?"`, `"version": "${newVersion}"`);
    }
}

export const bumpVersion = new BumpVersion();

export function incrementVersion(version: string, component: "major" | "minor" | "patch"): string {
    const versionRegex = /^(\d+)\.(\d+)\.(\d+)([-.].*)?$/;
    const versionMatch = versionRegex.exec(version);
    if (versionMatch === null || versionMatch.length < 4) {
        throw new Error(`version does not appear to be valid: ${version}`);
    }

    let major = parseInt(versionMatch[1], 10);
    let minor = parseInt(versionMatch[2], 10);
    let patch = parseInt(versionMatch[3], 10);
    const rest = (versionMatch[4] != null) ? versionMatch[4] : "";

    if (component === "major") {
        major = major + 1;
        minor = 0;
        patch = 0;
    } else if (component === "minor") {
        minor = minor + 1;
        patch = 0;
    } else if (component === "patch") {
        patch = patch + 1;
    }
    return `${major}.${minor}.${patch}${rest}`;
}
