import { Project } from "@atomist/rug/model/Project";
import { Given, When, Then, ProjectScenarioWorld } from "@atomist/rug/test/project/Core";

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
When("ConvertExistingProjectToRugArchive for ConvertExistingProjectToRugArchive should add Rug archive files", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("ConvertExistingProjectToRugArchive");
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    psworld.editWith(editor, { archiveName: "my-rug-archive", groupId: "my-rug-group", version: "0.0.1", manifest: ".atomist/manifest.yml" });
});

Then("fileExists manifest for ConvertExistingProjectToRugArchive should add Rug archive files", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    return p.fileExists(manifest);
});

Then("fileContains manifest artifact archiveName for ConvertExistingProjectToRugArchive should add Rug archive files", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    return p.fileContains(manifest, 'artifact: "' + archiveName + '"');
});

Then("fileContains manifest group groupId for ConvertExistingProjectToRugArchive should add Rug archive files", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    return p.fileContains(manifest, 'group: "' + groupId + '"');
});

Then("fileContains manifest version for ConvertExistingProjectToRugArchive should add Rug archive files", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    return p.fileContains(manifest, version);
});

When("ConvertExistingProjectToRugArchive archiveName is my-rug-archive, groupId is my-rug-group, version is 0.0.1 for ConvertExistingProjectToRugArchive should make no change if project already contains a manifest", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("ConvertExistingProjectToRugArchive");

    psworld.editWith(editor, { archiveName: "my-rug-archive", groupId: "my-rug-group", version: "0.0.1" });
});

