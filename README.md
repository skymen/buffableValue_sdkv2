<img src="./examples/cover.webp" width="150" /><br>
# Buffable Value
<i>Description</i> <br>
### Version 2.0.0.4

[<img src="https://placehold.co/200x50/4493f8/FFF?text=Download&font=montserrat" width="200"/>](https://github.com/skymen/buffableValue_sdkv2/releases/download/skymen_buffed_value-2.0.0.4.c3addon/skymen_buffed_value-2.0.0.4.c3addon)
<br>
<sub> [See all releases](https://github.com/skymen/buffableValue_sdkv2/releases) </sub> <br>

---
<b><u>Author:</u></b> skymen <br>
<b>[Construct Addon Page](https://www.construct.net/en/make-games/addons/1129/buffable-value)</b>  <br>
<b>[Documentation](https://www.construct.net/en/make-games/addons/1129/buffable-value/documentation)</b>  <br>
<sub>Made using [CAW](https://marketplace.visualstudio.com/items?itemName=skymen.caw) </sub><br>

## Table of Contents
- [Usage](#usage)
- [Examples Files](#examples-files)
- [Properties](#properties)
- [Actions](#actions)
- [Conditions](#conditions)
- [Expressions](#expressions)
---
## Usage
To build the addon, run the following commands:

```
npm i
npm run build
```

To run the dev server, run

```
npm i
npm run dev
```

## Examples Files
| Description | Download |
| --- | --- |

---
## Properties
| Property Name | Description | Type |
| --- | --- | --- |
| Value | Value | float |
| Max | Max | float |
| Min | Min | float |
| Clamp Mode | Clamp Mode | combo |


---
## Actions
| Action | Description | Params
| --- | --- | --- |
| Apply fixed buff | Apply fixed buff | Buff ID             *(string)* <br>Value             *(number)* <br>Duration             *(number)* <br> |
| Apply buff | Apply buff | Buff ID             *(string)* <br>Value             *(number)* <br>Duration             *(number)* <br> |
| Stop all buffs | Stop all buffs |  |
| Stop buff | Stop buff | Buff ID             *(string)* <br> |
| Set max | Set max | Value             *(number)* <br> |
| Set min | Set min | Value             *(number)* <br> |
| Set value | Set value | Value             *(number)* <br> |


---
## Conditions
| Condition | Description | Params
| --- | --- | --- |
| For each buff | For each buff |  |
| For each percent buff | For each percent buff |  |
| For each static buff | For each static buff |  |
| Has any buff | Has any buff |  |
| Has buff | Has buff | Buff ID *(string)* <br> |
| On any buff ended | On any buff ended |  |
| On any buff started | On any buff started |  |
| On buff ended | On buff ended | Buff ID *(string)* <br> |
| On buff started | On buff started | Buff ID *(string)* <br> |
| Is at max | Is at max |  |
| Is at min | Is at min |  |


---
## Expressions
| Expression | Description | Return Type | Params
| --- | --- | --- | --- |
| AllFixedBuffs | All fixed buffs accumulated | number |  | 
| AllPercentBuffs | All percent buffs accumulated | number |  | 
| BaseValue | Base value with no buffs | number |  | 
| BuffCount | Buff count | number |  | 
| BuffDuration | Duration | number | Buff ID *(string)* <br> | 
| BuffProgress | Progress | number | Buff ID *(string)* <br> | 
| BuffTime | Time | number | Buff ID *(string)* <br> | 
| FixedBuffValue | Value | number | Buff ID *(string)* <br> | 
| LastBuff | Last buff | number |  | 
| Max | Max | number |  | 
| Min | Min | number |  | 
| PercentBuffValue | Value | number | Buff ID *(string)* <br> | 
| RawValue | Raw value with all buffs applied but no min/max clamping | number |  | 
| Value | Value with all buffs applied | number |  | 
