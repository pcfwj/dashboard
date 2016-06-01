// Copyright 2015 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Controller for the environment variables directive.
 *
 * @final
 */
export class EnvironmentVariablesController {
  /** @ngInject */
  constructor() {
    /**
     * Two way data binding from the scope.
     * @export {!Array<!backendApi.EnvironmentVariable>}
     */
    this.variables = [this.newVariable_()];

    /**
     * Pattern that matches valid variable names. Like C identifier.
     * @const
     * @export {!RegExp}
     */
    this.namePattern = new RegExp('^[A-Za-z_][A-Za-z0-9_]*$');

    /**
     * @export
     */
    this.i18n = i18n;
  }

  /**
   * @return {!backendApi.EnvironmentVariable}
   * @private
   */
  newVariable_() { return {name: '', value: ''}; }

  /**
   * @export
   */
  addVariableIfNeeed() {
    let last = this.variables[this.variables.length - 1];
    if (this.isVariableFilled_(last)) {
      this.variables.push(this.newVariable_());
    }
  }

  /**
   * @param {number} index
   * @return {boolean}
   * @export
   */
  isRemovable(index) { return index !== (this.variables.length - 1); }

  /**
   * @param {number} index
   * @export
   */
  remove(index) { this.variables.splice(index, 1); }

  /**
   * @param {!backendApi.EnvironmentVariable} variable
   * @return {boolean}
   * @private
   */
  isVariableFilled_(variable) { return !!variable.name; }
}

const i18n = {
  /** @export {string} @desc Title of the Environment Variables section on the deploy page. */
  MSG_DEPLOY_ENV_VARS_TITLE: goog.getMsg(`Environment variables`),

  /** @export {string} @desc Label "Name" which appears as a placeholder for the input of a environment variable name on the deploy page. */
  MSG_DEPLOY_ENV_VARS_NAME_LABEL: goog.getMsg(`Name`),

  /** @export {string} @desc Label "Value" which appears as a placeholder for the input of a environment variable value on the deploy page. */
  MSG_DEPLOY_ENV_VARS_VALUE_LABEL: goog.getMsg(`Value`),

  /** @export {string} @desc Appears when the name of an environment variable on the deploy page does not match the expected pattern. */
  MSG_DEPLOY_ENV_VARS_NAME_PATTERN_WARNING:
      goog.getMsg(`Variable name must be a valid C identifier.`),
};
