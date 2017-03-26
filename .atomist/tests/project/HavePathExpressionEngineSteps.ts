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
import { Given, When, Then, ProjectScenarioWorld } from "@atomist/rug/test/project/Core";

When("HavePathExpressionEngine rugNameisTypeScriptEditor for HavePathExpressionEngine puts a path expression in the typescript", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("HavePathExpressionEngine");
    let target = ".atomist/editors/TypeScriptEditor.ts";
    psworld.editWith(editor, { rugName: "TypeScriptEditor", target: ".atomist/editors/TypeScriptEditor.ts" });
});

Then("fileContains target let eng PathExpressionEngine project context pathExpressionEngine for HavePathExpressionEngine puts a path expression in the typescript", (p, world) => {
    let target = ".atomist/editors/TypeScriptEditor.ts";
    return p.fileContains(target, "let eng: PathExpressionEngine = project.context().pathExpressionEngine();");
});

Then("fileContains target import PathExpression PathExpressionEngine from atomist rug tree PathExpression for HavePathExpressionEngine puts a path expression in the typescript", (p, world) => {
    let target = ".atomist/editors/TypeScriptEditor.ts";
    return p.fileContains(target, "import { PathExpression, PathExpressionEngine } from '@atomist/rug/tree/PathExpression");
});