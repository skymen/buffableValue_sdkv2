import { action, condition, expression } from "../template/aceDefine.js";

const general = "general";
const buffs = "Buffs";
const valueParam = {
  id: "value",
  name: "Value",
  desc: "Value",
  type: "number",
  initialValue: "0",
};

const buffIdExprParam = {
  id: "buffId",
  name: "Buff ID",
  desc: "Buff ID",
  type: "string",
};

const buffIdParam = {
  ...buffIdExprParam,
  autocompleteId: "buffId",
  initialValue: "",
};

const durationParam = {
  id: "duration",
  name: "Duration",
  desc: "Duration",
  type: "number",
  initialValue: "0",
};

action(
  general,
  "SetValue",
  {
    highlight: false,
    deprecated: false,
    isAsync: false,
    listName: "Set value",
    displayText: "{my}: Set value to [i]{0}[/i]",
    description: "Set value",
    params: [valueParam],
  },
  function (value) {
    this.baseValue = this.clamp(value, this.minValue, this.maxValue);
  },
  true
);

action(
  general,
  "SetMax",
  {
    highlight: false,
    deprecated: false,
    isAsync: false,
    listName: "Set max",
    displayText: "{my}: Set max to [i]{0}[/i]",
    description: "Set max",
    params: [valueParam],
  },
  function (value) {
    this.maxValue = value;
    this.baseValue = this.clamp(this.baseValue, this.minValue, this.maxValue);
  },
  true
);

action(
  general,
  "SetMin",
  {
    highlight: false,
    deprecated: false,
    isAsync: false,
    listName: "Set min",
    displayText: "{my}: Set min to [i]{0}[/i]",
    description: "Set min",
    params: [valueParam],
  },
  function (value) {
    this.minValue = value;
    this.baseValue = this.clamp(this.baseValue, this.minValue, this.maxValue);
  },
  true
);

action(
  buffs,
  "ApplyPercentBuff",
  {
    highlight: false,
    deprecated: false,
    isAsync: false,
    listName: "Apply buff",
    displayText:
      "{my}: Apply buff [i]{0}[/i] with value [i]{1}[/i]% for [i]{2}[/i] seconds",
    description: "Apply buff",
    params: [buffIdParam, valueParam, durationParam],
  },
  function (tag, value, duration) {
    this.percentBuffs[tag] = {
      value,
      duration,
      startTime: this.GetTime(),
    };
    this.lastBuff = tag;
    this._trigger("OnBuffStarted");
    this._trigger("OnAnyBuffStarted");
  },
  true
);

action(
  buffs,
  "ApplyFixedBuff",
  {
    highlight: false,
    deprecated: false,
    isAsync: false,
    listName: "Apply fixed buff",
    displayText:
      "{my}: Apply buff [i]{0}[/i] with value [i]{1}[/i] for [i]{2}[/i] seconds",
    description: "Apply fixed buff",
    params: [buffIdParam, valueParam, durationParam],
  },
  function (tag, value, duration) {
    this.fixedBuffs[tag] = {
      value,
      duration,
      startTime: this.GetTime(),
    };
    this.lastBuff = tag;
    this._trigger("OnBuffStarted");
    this._trigger("OnAnyBuffStarted");
  },
  true
);

action(
  buffs,
  "StopBuff",
  {
    highlight: false,
    deprecated: false,
    isAsync: false,
    listName: "Stop buff",
    displayText: "{my}: Stop buff [i]{0}[/i]",
    description: "Stop buff",
    params: [buffIdParam],
  },
  function (tag) {
    this.lastBuff = tag;
    this._trigger("OnBuffEnded");
    this._trigger("OnAnyBuffEnded");
    delete this.percentBuffs[tag];
    delete this.fixedBuffs[tag];
  },
  true
);

action(
  buffs,
  "StopAllBuffs",
  {
    highlight: false,
    deprecated: false,
    isAsync: false,
    listName: "Stop all buffs",
    displayText: "{my}: Stop all buffs",
    description: "Stop all buffs",
    params: [],
  },
  function () {
    Object.keys(this.percentBuffs).forEach((tag) => {
      this.lastBuff = tag;
      this._trigger("OnBuffEnded");
      this._trigger("OnAnyBuffEnded");
    });
    Object.keys(this.fixedBuffs).forEach((tag) => {
      this.lastBuff = tag;
      this._trigger("OnBuffEnded");
      this._trigger("OnAnyBuffEnded");
    });
    this.percentBuffs = {};
    this.fixedBuffs = {};
  },
  true
);

condition(
  buffs,
  "HasAnyBuff",
  {
    highlight: false,
    deprecated: false,
    listName: "Has any buff",
    displayText: "{my}: Has any buff",
    description: "Has any buff",
    params: [],
  },
  function () {
    return (
      Object.keys(this.percentBuffs).length > 0 ||
      Object.keys(this.fixedBuffs).length > 0
    );
  },
  true
);

condition(
  buffs,
  "HasBuff",
  {
    highlight: false,
    deprecated: false,
    listName: "Has buff",
    displayText: "{my}: Has buff [i]{0}[/i]",
    description: "Has buff",
    params: [buffIdParam],
  },
  function (tag) {
    return this.percentBuffs[tag] || this.fixedBuffs[tag];
  },
  true
);

condition(
  general,
  "IsAtMax",
  {
    highlight: false,
    deprecated: false,
    listName: "Is at max",
    displayText: "{my}: Is at max",
    description: "Is at max",
    params: [],
  },
  function () {
    return this.baseValue === this.maxValue;
  },
  true
);

condition(
  general,
  "IsAtMin",
  {
    highlight: false,
    deprecated: false,
    listName: "Is at min",
    displayText: "{my}: Is at min",
    description: "Is at min",
    params: [],
  },
  function () {
    return this.baseValue === this.minValue;
  },
  true
);

condition(
  buffs,
  "OnBuffStarted",
  {
    highlight: false,
    deprecated: false,
    isTrigger: true,
    listName: "On buff started",
    displayText: "{my}: On buff {0} started",
    description: "On buff started",
    params: [buffIdParam],
  },
  function (tag) {
    return this.lastBuff === tag;
  }
);

condition(
  buffs,
  "OnBuffEnded",
  {
    highlight: false,
    deprecated: false,
    isTrigger: true,
    listName: "On buff ended",
    displayText: "{my}: On buff {0} ended",
    description: "On buff ended",
    params: [buffIdParam],
  },
  function (tag) {
    return this.lastBuff === tag;
  }
);

condition(
  buffs,
  "OnAnyBuffStarted",
  {
    highlight: false,
    deprecated: false,
    isTrigger: true,
    listName: "On any buff started",
    displayText: "{my}: On any buff started",
    description: "On any buff started",
    params: [],
  },
  function () {
    return true;
  }
);

condition(
  buffs,
  "OnAnyBuffEnded",
  {
    highlight: false,
    deprecated: false,
    isTrigger: true,
    listName: "On any buff ended",
    displayText: "{my}: On any buff ended",
    description: "On any buff ended",
    params: [],
  },
  function () {
    return true;
  }
);

condition(
  buffs,
  "ForEachBuff",
  {
    highlight: false,
    deprecated: false,
    isLooping: true,
    isInvertible: false,
    listName: "For each buff",
    displayText: "{my}: For each buff",
    description: "For each buff",
    params: [],
  },
  function () {
    const loopCtx = this.runtime.sdk.createLoopingConditionContext();

    for (const buff of Object.keys({
      ...this.percentBuffs,
      ...this.fixedBuffs,
    })) {
      this.lastBuff = buff;
      loopCtx.retrigger();
      if (loopCtx.isStopped) break;
    }

    loopCtx.release();
    return false;
  }
);

condition(
  buffs,
  "ForEachPercentBuff",
  {
    highlight: false,
    deprecated: false,
    isLooping: true,
    isInvertible: false,
    listName: "For each percent buff",
    displayText: "{my}: For each percent buff",
    description: "For each percent buff",
    params: [],
  },
  function () {
    const loopCtx = this.runtime.sdk.createLoopingConditionContext();

    for (const buff of Object.keys(this.percentBuffs)) {
      this.lastBuff = buff;
      loopCtx.retrigger();
      if (loopCtx.isStopped) break;
    }

    loopCtx.release();
    return false;
  }
);

condition(
  buffs,
  "ForEachStaticBuff",
  {
    highlight: false,
    deprecated: false,
    isLooping: true,
    isInvertible: false,
    listName: "For each static buff",
    displayText: "{my}: For each static buff",
    description: "For each static buff",
    params: [],
  },
  function () {
    const loopCtx = this.runtime.sdk.createLoopingConditionContext();

    for (const buff of Object.keys(this.fixedBuffs)) {
      this.lastBuff = buff;
      loopCtx.retrigger();
      if (loopCtx.isStopped) break;
    }

    loopCtx.release();
    return false;
  }
);

expression(
  general,
  "Value",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Value with all buffs applied",
    params: [],
  },
  function () {
    return this.clampMode === 0
      ? this.clamp(this.RawValue(), this.minValue, this.maxValue)
      : this.RawValue();
  },
  true
);

expression(
  general,
  "BaseValue",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Base value with no buffs",
    params: [],
  },
  function () {
    return this.baseValue;
  },
  false
);

expression(
  general,
  "RawValue",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Raw value with all buffs applied but no min/max clamping",
    params: [],
  },
  function () {
    return (
      this.baseValue +
      (this.baseValue * this.AllPercentBuffs()) / 100 +
      this.AllFixedBuffs()
    );
  },
  true
);

expression(
  general,
  "Max",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Max",
    params: [],
  },
  function () {
    return this.maxValue;
  },
  false
);

expression(
  general,
  "Min",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Min",
    params: [],
  },
  function () {
    return this.minValue;
  },
  false
);

expression(
  general,
  "AllPercentBuffs",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "All percent buffs accumulated",
    params: [],
  },
  function () {
    let percentBuff = 0;
    Object.keys(this.percentBuffs).forEach((tag) => {
      const buff = this.percentBuffs[tag];
      percentBuff += buff.value;
    });
    return percentBuff;
  },
  true
);

expression(
  general,
  "AllFixedBuffs",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "All fixed buffs accumulated",
    params: [],
  },
  function () {
    let fixedBuff = 0;
    Object.keys(this.fixedBuffs).forEach((tag) => {
      const buff = this.fixedBuffs[tag];
      fixedBuff += buff.value;
    });
    return fixedBuff;
  },
  true
);

expression(
  general,
  "BuffCount",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Buff count",
    params: [],
  },
  function () {
    return (
      Object.keys(this.percentBuffs).length +
      Object.keys(this.fixedBuffs).length
    );
  },
  true
);

expression(
  general,
  "BuffTime",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Time",
    params: [buffIdExprParam],
  },
  function (tag) {
    const buff = this.percentBuffs[tag] || this.fixedBuffs[tag];
    if (buff) {
      return buff.duration - (this.GetTime() - buff.startTime);
    }
    return 0;
  },
  true
);

expression(
  general,
  "FixedBuffValue",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Value",
    params: [buffIdExprParam],
  },
  function (tag) {
    const buff = this.fixedBuffs[tag];
    if (buff) {
      return buff.value;
    }
    return 0;
  },
  true
);

expression(
  general,
  "PercentBuffValue",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Value",
    params: [buffIdExprParam],
  },
  function (tag) {
    const buff = this.percentBuffs[tag];
    if (buff) {
      return buff.value;
    }
    return 0;
  },
  true
);

expression(
  general,
  "BuffProgress",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Progress",
    params: [buffIdExprParam],
  },
  function (tag) {
    const buff = this.percentBuffs[tag] || this.fixedBuffs[tag];
    if (buff) {
      // return progress
      return (this.GetTime() - buff.startTime) / buff.duration;
    }
    return 0;
  },
  true
);

expression(
  general,
  "BuffDuration",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Duration",
    params: [buffIdExprParam],
  },
  function (tag) {
    const buff = this.percentBuffs[tag] || this.fixedBuffs[tag];
    if (buff) {
      return buff.duration;
    }
    return 0;
  },
  true
);

expression(
  general,
  "LastBuff",
  {
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "Last buff",
    params: [],
  },
  function () {
    return this.lastBuff;
  },
  false
);
