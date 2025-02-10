import { id, addonType } from "../../config.caw.js";
import AddonTypeMap from "../../template/addonTypeMap.js";

export default function (parentClass) {
  return class extends parentClass {
    constructor() {
      super();

      this.baseValue = 0;
      this.maxValue = 0;
      this.minValue = 0;
      this.clampMode = 0;

      const properties = this._getInitProperties();
      if (properties) {
        this.baseValue = properties[0];
        this.maxValue = properties[1];
        this.minValue = properties[2];
        this.clampMode = properties[3];
      }

      this.percentBuffs = {};
      this.fixedBuffs = {};
      this.lastBuff = "";

      this.events = {};

      this._setTicking(true);
    }

    _trigger(method) {
      this.dispatch(method);
      super._trigger(self.C3[AddonTypeMap[addonType]][id].Cnds[method]);
    }
    on(tag, callback, options) {
      if (!this.events[tag]) {
        this.events[tag] = [];
      }
      this.events[tag].push({ callback, options });
    }

    off(tag, callback) {
      if (this.events[tag]) {
        this.events[tag] = this.events[tag].filter(
          (event) => event.callback !== callback
        );
      }
    }

    dispatch(tag) {
      if (this.events[tag]) {
        this.events[tag].forEach((event) => {
          if (event.options && event.options.params) {
            const fn = self.C3[AddonTypeMap[addonType]][id].Cnds[tag];
            if (fn && !fn.call(this, ...event.options.params)) {
              return;
            }
          }
          event.callback();
          if (event.options && event.options.once) {
            this.off(tag, event.callback);
          }
        });
      }
    }

    _tick() {
      const time = this.GetTime();
      // remove expired buffs
      Object.keys(this.percentBuffs).forEach((tag) => {
        const buff = this.percentBuffs[tag];
        if (buff.startTime + buff.duration < time) {
          this.lastBuff = tag;
          this._trigger("OnBuffEnded");
          this._trigger("OnAnyBuffEnded");
          delete this.percentBuffs[tag];
        }
      });
      Object.keys(this.fixedBuffs).forEach((tag) => {
        const buff = this.fixedBuffs[tag];
        if (buff.startTime + buff.duration < time) {
          this.lastBuff = tag;
          this._trigger("OnBuffEnded");
          this._trigger("OnAnyBuffEnded");
          delete this.fixedBuffs[tag];
        }
      });
    }

    clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }

    GetTime() {
      return this.runtime.gameTime;
    }

    _release() {
      super._release();
    }

    _saveToJson() {
      return {
        baseValue: this.baseValue,
        maxValue: this.maxValue,
        minValue: this.minValue,
        percentBuffs: this.percentBuffs,
        fixedBuffs: this.fixedBuffs,
      };
    }

    _loadFromJson(o) {
      this.baseValue = o.baseValue;
      this.maxValue = o.maxValue;
      this.minValue = o.minValue;
      this.percentBuffs = o.percentBuffs;
      this.fixedBuffs = o.fixedBuffs;
    }
  };
}
