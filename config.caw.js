import {
  ADDON_CATEGORY,
  ADDON_TYPE,
  PLUGIN_TYPE,
  PROPERTY_TYPE,
} from "./template/enums.js";
import _version from "./version.js";
export const addonType = ADDON_TYPE.BEHAVIOR;
export const type = PLUGIN_TYPE.OBJECT;
export const id = "skymen_buffed_value";
export const name = "Buffable Value";
export const version = _version;
export const author = "skymen";
export const website = "https://www.construct.net";
export const documentation = "https://www.construct.net";
export const description = "Description";
export const category = ADDON_CATEGORY.GENERAL;

export const hasDomside = false;
export const files = {
  extensionScript: {},
  fileDependencies: [],
};

// categories that are not filled will use the folder name
export const aceCategories = {
  general: "General",
  buffs: "Buffs",
};

export const info = {
  // icon: "icon.svg",
  // PLUGIN world only
  // defaultImageUrl: "default-image.png",
  Set: {
    // COMMON to all
    CanBeBundled: true,
    IsDeprecated: false,
    GooglePlayServicesEnabled: false,

    // BEHAVIOR only
    IsOnlyOneAllowed: false,

    // PLUGIN world only
    IsResizable: false,
    IsRotatable: false,
    Is3D: false,
    HasImage: false,
    IsTiled: false,
    SupportsZElevation: false,
    SupportsColor: false,
    SupportsEffects: false,
    MustPreDraw: false,

    // PLUGIN object only
    IsSingleGlobal: true,
  },
  // PLUGIN only
  AddCommonACEs: {
    Position: false,
    SceneGraph: false,
    Size: false,
    Angle: false,
    Appearance: false,
    ZOrder: false,
  },
};

export const properties = [
  /*
  {
    type: PROPERTY_TYPE.INTEGER,
    id: "property_id",
    options: {
      initialValue: 0,
      interpolatable: false,

      // minValue: 0, // omit to disable
      // maxValue: 100, // omit to disable

      // for type combo only
      // items: [
      //   {itemId1: "item name1" },
      //   {itemId2: "item name2" },
      // ],

      // dragSpeedMultiplier: 1, // omit to disable

      // for type object only
      // allowedPluginIds: ["Sprite", "<world>"],

      // for type link only
      // linkCallback: function(instOrObj) {},
      // linkText: "Link Text",
      // callbackType:
      //   "for-each-instance"
      //   "once-for-type"

      // for type info only
      // infoCallback: function(inst) {},
    },
    name: "Property Name",
    desc: "Property Description",
  }
  */
  {
    type: "float",
    id: "buffedValue",
    options: {
      initialValue: 100,
      interpolatable: false,
    },
    name: "Value",
    desc: "Value",
  },
  {
    type: "float",
    id: "buffedValueMax",
    options: {
      initialValue: 100,
      interpolatable: false,
    },
    name: "Max",
    desc: "Max",
  },
  {
    type: "float",
    id: "buffedValueMin",
    options: {
      initialValue: 0,
      interpolatable: false,
    },
    name: "Min",
    desc: "Min",
  },
  {
    type: "combo",
    id: "clampMode",
    options: {
      initialValue: "after",
      items: [{ after: "Clamp After Buffs" }, { before: "Clamp Before Buffs" }],
    },
    name: "Clamp Mode",
    desc: "Clamp Mode",
  },
];
