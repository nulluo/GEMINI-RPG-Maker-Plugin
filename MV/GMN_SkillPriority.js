// =============================================================================
// GMN_SkillPriority.js v1.0.0
// =============================================================================
// (C) 2020 GEMINI
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2020/06/01 初版
// 1.0.1 2020/06/03 正常にソートされないことがあるのを修正。
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/gemini_gamedev/
// =============================================================================

/*:
 * @plugindesc GMN_SkillPriority
 * @author GEMINI
 *
 * @help You can set the priority by writing <GMN_Priority:100> in the memo field of the skill.
 * When the priority is the same, it is in order of ID.
 * The default priority value can be specified in the plugin parameter "default_priority".
 *
 *
 * @param default_priority
 * @type number
 * @min 0
 * @default 100
 *
 * 1.0.0 2020/06/01 First version
 * 1.0.1 2020/06/03 Fixed the problem that it may not be sorted correctly.
 * 1.1.0 2020/03/20 Fixed author name.
 */

/*:ja
 * @plugindesc スキル表示順プラグイン
 * @author ジェミニ
 *
 * @help スキルのメモ欄に<GMN_Priority:100>のように記述して
 * 優先度をつけることができます。優先度が同じ場合にはID順となります。
 * 優先度のデフォルト値をプラグインパラメータ"default_priority"で指定できます。
 *
 *
 * @param default_priority
 * @type number
 * @min 0
 * @default 100
 *
 * 1.0.0 2020/06/01 初版
 * 1.0.1 2020/06/03 正常にソートされないことがあるのを修正。
 * 1.1.0 2020/03/20 作者名修正
 */
(function () {
  "use strict";
  // =============================================================================
  // プラグイン パラメータ
  // =============================================================================
  const parameters = PluginManager.parameters("GMN_SkillPriority");
  const default_priority = parameters["default_priority"];
  // =============================================================================
  // GMN_SkillPriority
  // =============================================================================
  function getPriority(elem) {
    var num = Number(elem.meta.GMN_Priority);
    return isNaN(num) ? default_priority : num;
  }
  const _Game_Actor_prototype_skills = Game_Actor.prototype.skills;
  Game_Actor.prototype.skills = function () {
    return _Game_Actor_prototype_skills
      .apply(this, arguments)
      .sort(function (a, b) {
        return getPriority(b) - getPriority(a) === 0
          ? a.id - b.id
          : getPriority(b) - getPriority(a);
      });
  };
})();
