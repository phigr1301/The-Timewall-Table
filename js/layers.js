addLayer("1layer", {
    name: "sideLayer1",
    position: -1,
    row: 0,
    symbol() {return '↓ layer 1 ↓'}, // This appears on the layer's node. Default is the id with the first letter capitalized
    symbolI18N() {return '↓ 主时间墙 ↓'}, // Second name of symbol for internationalization (i18n) if internationalizationMod is enabled (in mod.js)
    small: true,// Set to true to generate a slightly smaller layer node
    nodeStyle: {"font-size": "15px", "height": "30px"},// Style for the layer button
    startData() { return {
        unlocked: true,
        points: new Decimal(0),// This currently does nothing, but it's required. (Might change later if you add mechanics to this layer.)
    }
    },
    update(diff) {
        if (player.devMode == "TimeStudy") player.devSpeed = 1000
        else player.devSpeed=1
    },
    color: "#fefefe",
    type: "none",
    tooltip(){return false},
    layerShown(){return layerDisplayTotal(['t'])},// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.
	tabFormat: [
        ["display-text", function() { return getPointsDisplay() }]
    ],
})

addLayer("t", {
    name: "TimeWall", // This is optional, only used in a few places, If absent it just uses the layer id
    symbol: "Time Wall", // This appears on the layer's node. Default is the id with the first letter capitalized
    symbolI18N: "时间墙", // Second name of symbol for internationalization (i18n) if internationalizationMod is enabled
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 0, // Row the layer is in on the tree (0 is the first row)
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            sacrificedforfalse: zero,
            sacr: false,
            sacrificedforfsecond: zero,
            sacrsecond: false,
            c5Effect:one,
        }
    },
    color: "#FFFFFF",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Time Wall", // Name of prestige currency
    resourceI18N: "时间墙", // Second name of the resource for internationalization (i18n) if internationalizationMod is enabled
    baseResource: "points", // Name of resource prestige is based on
    baseResourceI18N: "点数", // Second name of the baseResource for internationalization (i18n) if internationalizationMod is enabled
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.05, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = one
        if (hasUpgrade("t", 41)) mult = mult.mul(upgradeEffect("t", 41))
        if (hasUpgrade("t", 42)) mult = mult.mul(upgradeEffect("t", 42))
        if (hasUpgrade("t", 43)) mult = mult.mul(upgradeEffect("t", 43))
        if (hasUpgrade("t", 44)) mult = mult.mul(upgradeEffect("t", 44))
        if (hasUpgrade("t", 45)) mult = mult.mul(upgradeEffect("t", 45))
        if (hasChallenge("t", 12)) mult = mult.mul(n(20).div(9))
        if (hasUpgrade("t", 74)) mult = mult.mul(upgradeEffect("t", 74))
        if (hasChallenge("t", 21)) mult = mult.pow(1.3)
        if (player.t.sacrificedforfalse.gt(0) && !inChallenge('t', 22)) mult = mult.mul(player.t.sacrificedforfalse.div(10000).add(1))
        if (player.t.sacrificedforfsecond.gte(1200000) && !inChallenge('t', 22)) mult = mult.pow(player.t.sacrificedforfsecond.sub(1200000).div(1500000).add(1))
        if (hasChallenge("t", 22)) mult = mult.pow(1.05)
        if (hasChallenge("t", 31)) mult = mult.pow(1.35)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        if (hasUpgrade('t', 11)) return one
        return ten.add(ten)
    },
    passiveGeneration() {
        let a = zero
        if (hasUpgrade("t", 31)) a = zero.add(0.001)
        if (hasUpgrade("t", 31) && hasChallenge('t', 21)) a = zero.add(0.05)
        if (hasUpgrade("t", 31) && hasChallenge('t', 21) && hasChallenge('t', 22)) a = zero.add(0.2)
        return a
    },
    update(diff) {
        if (player.t.sacr&&player.t.sacrificedforfalse.lt(30000)) {
            let a = player.points.div(20).mul(diff).max(0).min(player.points.div(10)).min(new Decimal(30000).sub(player.t.sacrificedforfalse))
            player.points = player.points.sub(a)
            player.t.sacrificedforfalse=player.t.sacrificedforfalse.add(a)
            
        }
        if (player.t.sacrificedforfalse.gte(30000)) {
            player.t.sacr=false
        }
        if (player.t.sacrsecond && player.t.sacrificedforfsecond.lt(1500000)) {
            let a = player.points.div(20).mul(diff).max(0).min(player.points.div(10)).min(new Decimal(1500000).sub(player.t.sacrificedforfsecond))
            player.points = player.points.sub(a)
            player.t.sacrificedforfsecond = player.t.sacrificedforfsecond.add(a)

        }
        if (player.t.sacrificedforfsecond.gte(1500000)) {
            player.t.sacrsecond = false
        }
        if (inChallenge('t', 31)) {
            player.t.c5Effect = player.t.c5Effect.mul(0.99)
        }
        else {
            player.t.c5Effect=one
        }
    },
    upgrades: {
        11: {
            title: "Time Walls",
            titleI18N: "时间墙", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "Start Time Walls.",
            descriptionI18N: "开启时间墙之旅", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("1.7977e308") },
            unlocked() { return !hasUpgrade('t', 11) }
        },
        21: {
            title: "21",
            titleI18N: "21", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "点数获取*1.25", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("1") },
            unlocked() { return hasUpgrade('t', 11) }
        },
        22: {
            title: "22",
            titleI18N: "22", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "点数获取*1.25", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("1") },
            unlocked() { return hasUpgrade('t', 21) }
        },
        23: {
            title: "22",
            titleI18N: "23", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "点数获取*1.25", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("1") },
            unlocked() { return hasUpgrade('t', 22) }
        },
        24: {
            title: "22",
            titleI18N: "24", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "点数获取*1.25", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("1") },
            unlocked() { return hasUpgrade('t', 23) }
        },
        25: {
            title: "22",
            titleI18N: "25", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "点数获取*1.25", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("1") },
            unlocked() { return hasUpgrade('t', 24) }
        },
        31: {
            title: "22",
            titleI18N: "31", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "每秒自动获得0.1%重置时获得的时间墙", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("5") },
            unlocked() { return hasUpgrade('t', 25) }
        },
        32: {
            title: "22",
            titleI18N: "32", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "基础点数获取+0.0003", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("1") },
            unlocked() { return hasUpgrade('t', 31) }
        },
        33: {
            title: "22",
            titleI18N: "33", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "基础点数获取+0.0003", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("1") },
            unlocked() { return hasUpgrade('t', 32) }
        },
        34: {
            title: "22",
            titleI18N: "34", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "基础点数获取+0.0003", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("1") },
            unlocked() { return hasUpgrade('t', 33) }
        },
        35: {
            title: "22",
            titleI18N: "35", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "如果点数获取量小于1，点数获取量变为原来的0.9次方，解锁挑战", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("5") },
            unlocked() { return hasUpgrade('t', 34) }
        },
        41: {
            title: "22",
            titleI18N: "41", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "基于大于20的点数增益时间墙获取", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            effect() {
                if (player.points.lte(20) && !hasUpgrade('t', 75)) return one
                if (player.points.lte(1)) return one
                let eff = player.points.div(20).pow(0.12)
                if (hasUpgrade('t', 75)) eff = player.points.pow(0.12)
                if (hasUpgrade('t', 64)) eff = eff.pow(two)
                eff = powsoftcap(eff, two, hasChallenge('t', 21) ? three : five)
                return eff
            },
            effectDisplay() { let a = "x" + format(this.effect()); let b = a; if (this.effect().gte(2)) a = b + "（软上限）"; return a; },
            cost: function () { return new Decimal("5") },
            unlocked() { return hasUpgrade('t', 35) }
        },
        42: {
            title: "22",
            titleI18N: "42", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "基于大于15的点数增益时间墙获取", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            effect() {
                if (player.points.lte(15) && !hasUpgrade('t', 75)) return one
                if (player.points.lte(1)) return one
                let eff = player.points.div(15).pow(0.09)
                if (hasUpgrade('t', 75)) eff = player.points.pow(0.09)
                if (hasUpgrade('t', 64)) eff = eff.pow(two)
                eff = powsoftcap(eff, new Decimal(1.5), hasChallenge('t', 21) ? four : six)
                return eff
            },
            effectDisplay() { let a = "x" + format(this.effect()); let b = a; if (this.effect().gte(1.5)) a = b + "（软上限）"; return a; },
            cost: function () { return new Decimal("7") },
            unlocked() { return hasUpgrade('t', 41) }
        },
        43: {
            title: "22",
            titleI18N: "43", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "基于大于10的点数增益时间墙获取", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            effect() {
                if (player.points.lte(10) && !hasUpgrade('t', 75)) return one
                if (player.points.lte(1)) return one
                let eff = player.points.div(10).pow(0.07)
                if (hasUpgrade('t', 75)) eff = player.points.pow(0.07)
                if (hasUpgrade('t', 64)) eff = eff.pow(two)
                eff = powsoftcap(eff, new Decimal(1.35), hasChallenge('t', 21) ? four : seven)
                return eff
            },
            effectDisplay() { let a = "x" + format(this.effect()); let b = a; if (this.effect().gte(1.35)) a = b + "（软上限）"; return a; },
            cost: function () { return new Decimal("9") },
            unlocked() { return hasUpgrade('t', 42) }
        },
        44: {
            title: "22",
            titleI18N: "44", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "基于大于5的点数增益时间墙获取", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            effect() {
                if (player.points.lte(5)&&!hasUpgrade('t',75)) return one
                if (player.points.lte(1)) return one
                let eff = player.points.div(5).pow(0.05)
                if (hasUpgrade('t', 75)) eff = player.points.pow(0.05)
                if (hasUpgrade('t', 64)) eff = eff.pow(two)
                eff = powsoftcap(eff, new Decimal(1.25), hasChallenge('t', 21) ? four : eight)
                return eff
            },
            effectDisplay() { let a = "x" + format(this.effect()); let b = a; if (this.effect().gte(1.25)) a = b + "（软上限）"; return a; },
            cost: function () { return new Decimal("11") },
            unlocked() { return hasUpgrade('t', 43) }
        },
        45: {
            title: "22",
            titleI18N: "45", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "基于点数增益时间墙获取", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            effect() {
                if (player.points.lte(0)) return one
                let eff = player.points.add(1).pow(0.03)
                if (hasUpgrade('t', 52)) eff = eff.pow(ten)
                if (hasUpgrade('t', 54)) eff = eff.pow(three)
                if (hasUpgrade('t', 64)) eff = eff.pow(two)
                if (hasUpgrade('t', 71)) eff = eff.mul(100)
                eff = powsoftcap(eff, new Decimal(1.2), hasUpgrade('t', 102) ? two : (hasChallenge('t', 21) ? five : ten))
                eff = powsoftcap(eff, new Decimal(2), hasUpgrade('t', 102) ? n(2.5) : (hasChallenge('t', 21) ? seven : ten))
                eff = powsoftcap(eff, new Decimal(3), hasUpgrade('t', 102) ? three : (hasChallenge('t', 21) ? nine : ten))
                eff = powsoftcap(eff, new Decimal(1000), ten)
                return eff
            },
            effectDisplay() { let a = "x" + format(this.effect()); let b = a; if (this.effect().gte(1.2)) a = b + "（软上限）"; if (this.effect().gte(2)) a = b + "（2重软上限）"; if (this.effect().gte(3)) a = b + "（3重软上限）"; if (this.effect().gte(1000)) a = b + "（4重软上限）"; return a; },
            cost: function () { return new Decimal("13") },
            unlocked() { return hasUpgrade('t', 44) }
        },
        51: {
            title: "22",
            titleI18N: "51", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "当点数小于1时：<br>如果点数获取量小于1，点数获取量变为原来的0.6次方", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("20") },
            unlocked() { return hasUpgrade('t', 45) }
        },
        52: {
            title: "22",
            titleI18N: "52", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "升级45的效果变为原来的10次方（仍受软上限影响）", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("35") },
            unlocked() { return hasUpgrade('t', 51) }
        },
        53: {
            title: "22",
            titleI18N: "53", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "当点数小于1时：<br>如果点数获取量小于1，点数获取量变为原来的0.8次方", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("30") },
            unlocked() { return hasUpgrade('t', 52) }
        },
        54: {
            title: "22",
            titleI18N: "54", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "升级45的效果变为原来的3次方（仍受软上限影响）", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("60") },
            unlocked() { return hasUpgrade('t', 53) }
        },
        55: {
            title: "22",
            titleI18N: "55", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "当点数小于1时：<br>如果点数获取量小于1，点数获取量变为原来的0.9次方", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("45") },
            unlocked() { return hasUpgrade('t', 54) }
        },
        61: {
            title: "22",
            titleI18N: "61", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "基于点数增益点数获取量，最低3x", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            effect() {
                if (player.points.lte(1)) return three
                let eff = player.points.add(10).log(10).mul(3)
                if (buyableEffect('t', 11).gt(0)) eff = eff.pow(buyableEffect('t', 11).add(1))
                if (hasUpgrade('t', 104)) eff = eff.pow(1.15)
                eff = powsoftcap(eff, five, inChallenge('t', 22) ? ten : (hasChallenge('t', 21) ? two.sub(buyableEffect('t', 11)) : four))
                eff = powsoftcap(eff, n(100), hasUpgrade('t', 104) ? two : (hasUpgrade('t', 103) ? three : four))
                eff = powsoftcap(eff, n(100000), ten)
                return eff
            },
            effectDisplay() { let a = "x" + format(this.effect()); let b = a; if (this.effect().gte(5)) a = b + "（软上限）"; if (this.effect().gte(100)) a = b + "（2重软上限）"; if (this.effect().gte(100000)) a = b + "（3重软上限）"; return a; },

            cost: function () { return new Decimal("77") },
            unlocked() { return hasUpgrade('t', 55) }
        },
        62: {
            title: "22",
            titleI18N: "62", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "当点数小于1时：<br>如果点数获取量小于1，点数获取量变为原来的0次方", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("77") },
            unlocked() { return hasUpgrade('t', 61) }
        },
        63: {
            title: "22",
            titleI18N: "63", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "当点数小于1时：<br>如果点数获取量小于10，点数获取量变为10", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("114.514") },
            unlocked() { return hasUpgrade('t', 62) }
        },
        64: {
            title: "22",
            titleI18N: "64", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "所有第四行升级（41-45）效果^2（仍受软上限影响）", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("333") },
            unlocked() { return hasUpgrade('t', 63) }
        },
        65: {
            title: "22",
            titleI18N: "65", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "基于时间墙数增益点数获取量，最低2x", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            effect() {
                if (player.t.points.lte(1)) return two
                let eff = player.t.points.add(10).log(10).mul(2)
                if (buyableEffect('t', 11).gt(0)) eff = eff.pow(buyableEffect('t', 11).add(1))
                if (hasUpgrade('t', 104)) eff = eff.pow(1.15)
                eff = powsoftcap(eff, four, inChallenge('t', 22) ? ten : (hasChallenge('t', 21) ? two.sub(buyableEffect('t', 11)) : four))
                eff = powsoftcap(eff, n(100), hasUpgrade('t', 104) ? two : (hasUpgrade('t', 103) ? three : four))
                eff = powsoftcap(eff, n(100000), ten)
                return eff
            },
            effectDisplay() { let a = "x" + format(this.effect()); let b = a; if (this.effect().gte(4)) a = b + "（软上限）"; if (this.effect().gte(100)) a = b + "（2重软上限）"; if (this.effect().gte(100000)) a = b + "（3重软上限）"; return a; },

            cost: function () { return new Decimal("333") },
            unlocked() { return hasUpgrade('t', 64) }
        },
        71: {
            title: "22",
            titleI18N: "71", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "升级45效果x100（在乘方后面，仍受软上限影响）", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("555") },
            unlocked() { return hasUpgrade('t', 65) }
        },
        72: {
            title: "22",
            titleI18N: "72", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "解锁第二个挑战", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("666") },
            unlocked() { return hasUpgrade('t', 71) }
        },
        73: {
            title: "22",
            titleI18N: "73", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "基础点数获取+0.003", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("999") },
            unlocked() { return hasChallenge('t', 12) }
        },
        74: {
            title: "22",
            titleI18N: "74", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "基于时间墙数增益时间墙获取量，最低2x", // Second name of description for internationalization (i18n) if internationalizationMod is enabled

            effect() {
                if (player.t.points.lte(1)) return two
                let eff = player.t.points.add(10).log(10).mul(2)
                if (buyableEffect('t', 11).gt(0)) eff = eff.pow(buyableEffect('t', 11).add(1))
                if (hasUpgrade('t', 104)) eff = eff.pow(1.15)
                eff = powsoftcap(eff, four, hasChallenge('t', 21) ? two.sub(buyableEffect('t', 11)) : four)
                eff = powsoftcap(eff, n(100), hasUpgrade('t', 104) ? two : (hasUpgrade('t', 103) ? three : four))
                eff = powsoftcap(eff, n(100000), ten)
                return eff
            },
            effectDisplay() { let a = "x" + format(this.effect()); let b = a; if (this.effect().gte(4)) a = b + "（软上限）"; if (this.effect().gte(100)) a = b + "（2重软上限）"; if (this.effect().gte(100000)) a = b + "（3重软上限）"; return a; },
            cost: function () { return new Decimal("999") },
            unlocked() { return hasUpgrade('t', 73) }
        },
        75: {
            title: "22",
            titleI18N: "75", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "升级41-44的起点变为1点数", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("3333") },
            unlocked() { return hasUpgrade('t', 74) }
        },
        81: {
            title: "22",
            titleI18N: "81", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "解锁第三个挑战", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("100000") },
            unlocked() { return hasUpgrade('t', 75) }
        },
        82: {
            title: "22",
            titleI18N: "82", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "解锁伪·时间之神页面", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("1000000") },
            unlocked() { return hasChallenge('t', 21) }
        },
        83: {
            title: "22",
            titleI18N: "83", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "减弱软上限可购买的价格变为原来的0.97次方", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("1000000") },
            unlocked() { return getBuyableAmount('t', 11).gte(3) }
        },
        84: {
            title: "22",
            titleI18N: "84", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "减弱软上限可购买的价格变为原来的0.98次方", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("2000000") },
            unlocked() { return hasUpgrade('t', 83) &&getBuyableAmount('t', 11).gte(4) }
        },
        85: {
            title: "22",
            titleI18N: "85", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "减弱软上限可购买的价格变为原来的0.99次方", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("3000000") },
            unlocked() { return hasUpgrade('t', 84) &&getBuyableAmount('t', 11).gte(5) }
        },
        91: {
            title: "22",
            titleI18N: "91", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "第一个伪·时间之神可购买的效果x1.2", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("1e10") },
            unlocked() { return hasChallenge('t', 22) }
        },
        92: {
            title: "22",
            titleI18N: "92", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "第二个伪·时间之神可购买的价格基于点数降低", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            effect() {
                let eff = player.points.add(1).pow(0.4).min(2000.01)
                return eff
            },
            effectDisplay() { let a = "/" + format(this.effect()); let b = a; if (this.effect().gte(2000)) a = b + "（硬上限）";  return a; },

            cost: function () { return new Decimal("1e11") },
            unlocked() { return hasUpgrade('t', 91) }
        },
        93: {
            title: "22",
            titleI18N: "93", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "点数^1.2", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("1e12") },
            unlocked() { return hasChallenge('t', 31) }
        },
        94: {
            title: "22",
            titleI18N: "94", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "点数^1.05", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("1e14") },
            unlocked() { return hasUpgrade('t', 93) }
        },
        95: {
            title: "22",
            titleI18N: "95", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "第二行升级（21-25）效果再次生效", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("1e14") },
            unlocked() { return hasUpgrade('t', 94) }
        },
        101: {
            title: "22",
            titleI18N: "101", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "解锁第三个伪·时间之神可购买", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("1e15") },
            unlocked() { return hasUpgrade('t', 95) }
        },
        102: {
            title: "22",
            titleI18N: "102", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "大幅削弱升级45的前3重软上限", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("1e15") },
            unlocked() { return getBuyableAmount('t', 21).gt(0) }
        },
        103: {
            title: "22",
            titleI18N: "103", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "略微削弱升级61、65、74的第2重软上限", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("1e17") },
            unlocked() { return getBuyableAmount('t', 21).gte(10) }
        },
        104: {
            title: "22",
            titleI18N: "104", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "基础点数获取+0.03，再次削弱升级61、65、74的第2重软上限，并在软上限前^1.15", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("1e18") },
            unlocked() { return getBuyableAmount('t', 21).gte(18) && hasUpgrade('t', 103) }
        },
        6001: {
            title: "22",
            titleI18N: "F-01", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "解锁时间墙维度（Timewall Dimensions）", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("1e100") },
            unlocked() { return hasUpgrade('t', 25) }
        },
        6002: {
            title: "22",
            titleI18N: "F-02", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "解锁QqQe308页面", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("1e600") },
            unlocked() { return hasUpgrade('t', 25) }
        },
        6003: {
            title: "22",
            titleI18N: "F-03", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "在时间墙维度中解锁时间墙星系", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("1e5000") },
            unlocked() { return hasUpgrade('t', 25) }
        },
        6004: {
            title: "22",
            titleI18N: "F-04", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "解锁天神（Celestials）页面", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { if (hasChallenge('t', 21)) return new Decimal("3.07e8686").div(player.points.add(1).pow(100).min("3.07e686")); return new Decimal("3.07e8686"); },
            unlocked() { return hasUpgrade('t', 25) }
        },
        6005: {
            title: "22",
            titleI18N: "F-05", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "解锁下一个层级", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("1e5000000") },
            unlocked() { return hasUpgrade('t', 25) }
        },
        9901: {
            title: "22",
            titleI18N: "114514", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "时间墙削弱0%", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("0") },
            unlocked() { return hasUpgrade('t', 25) }
        },
        9991: {
            title: "Time Walls",
            titleI18N: "时间墙", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "End Time Walls.",
            descriptionI18N: "通关游戏", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { if (player.t.points.gte("e1.79775e308")) return new Decimal("(e^307) 62.7724"); if (player.t.points.gte("1.79775e308")) return new Decimal("e1.7978e308"); return new Decimal("1.7978e308"); },
            unlocked() { return true }
        },
    },
    challenges: {
        11: {
            name: "c1",
            nameI18N: "普通挑战1",
            challengeDescription: "如果点数获取量小于1，则点数获取变为原来的1.2次方<br>",
            canComplete() { return player.points.gte(1) },
            goalDescription: "1点数",
            rewardDescription() { return "如果点数获取量小于1，点数获取量变为原来的0.9次方" },
            unlocked() { return true },
        },
        12: {
            name: "c2",
            nameI18N: "普通挑战2",
            challengeDescription: "点数获取除以2（在所有效果之后）<br>",
            canComplete() { return player.points.gte(20) },
            goalDescription: "20点数",
            rewardDescription() { return "时间墙获取量x2.222222..." },
            unlocked() { return hasUpgrade('t',72) },
        },
        21: {
            name: "c3",
            nameI18N: "普通挑战3",
            challengeDescription: "基础点数获取-0.006<br>",
            canComplete() { return player.points.gte(75) },
            goalDescription: "75点数",
            rewardDescription() { return "削弱部分升级的软上限，基于点数减少升级F-04的需求，升级31的效果x50，时间墙获取^1.3，基础点数获取+0.01" },
            unlocked() { return hasUpgrade('t', 81) },
        },
        22: {
            name: "c4",
            nameI18N: "普通挑战4",
            challengeDescription: "点数^0.5，大幅增强部分升级的软上限，禁用献祭效果<br>",
            canComplete() { return player.points.gte(2000) },
            goalDescription: "2000点数",
            rewardDescription() { return "升级31的效果再x4，时间墙获取^1.05" },
            unlocked() { return getBuyableAmount('t', 12).gte(0.9) },
        },
        31: {
            name: "c5",
            nameI18N: "普通挑战5",
            challengeDescription() { return "点数获取每tick变为原来的0.99次方<br>当前：^"+format(player.t.c5Effect)+"<br>" },
            canComplete() { return player.points.gte(1234) },
            goalDescription: "1234点数",
            rewardDescription() { return "时间墙获取^1.35" },

            onEnter() {
                player.t.c5Effect=one
            },
            unlocked() { return getBuyableAmount('t', 12).gte(1.9) },
        },
        32: {
            name: "c6",
            nameI18N: "普通挑战6",
            challengeDescription: "Placeholder",
            canComplete() { return player.points.gte("1e114514") },
            goalDescription: "QqQe308点数",
            rewardDescription() { return "通关游戏" },
            unlocked() { return getBuyableAmount('t', 12).gte(2.9) },
        },
    },
    bars: {
        sacr1: {
            direction: RIGHT,
            width: 600,
            height: 120,
            req() {
                let req = player.t.sacrificedforfalse.div(30000)
                return req
            },
            fillStyle: { 'background-color': "#FF0000" },
            progress() { return this.req() },
            display() { let a = "解锁伪·时间之神需要献祭" + format(player.t.sacrificedforfalse, 2) + "/30000点数<br>献祭效果：1.时间墙获取x" + (inChallenge('t', 22) ? "1.00" : format(player.t.sacrificedforfalse.div(10000).add(1))); if (player.t.sacrificedforfalse.gte(20000)) a = a + "<br>2.点数获取x" + (inChallenge('t', 22) ? "1.00" : format(player.t.sacrificedforfalse.sub(20000).div(10000).add(1))); if (player.t.sacrificedforfalse.gte(30000)) a = a + (inChallenge('t', 22) ? "<br>3.点数获取^1.00" : "<br>3.点数获取^1.20"); return a; },
        },
        sacr2: {
            direction: RIGHT,
            width: 600,
            height: 120,
            req() {
                let req = player.t.sacrificedforfsecond.div(1500000)
                return req
            },
            fillStyle: { 'background-color': "#FF0000" },
            progress() { return this.req() },
            display() { let a = "解锁第二个可购买需要献祭" + format(player.t.sacrificedforfsecond, 2) + "/1.5e6点数<br>献祭效果：4.第一个可购买的效果x" + (inChallenge('t', 22) ? "1.00" : format(player.t.sacrificedforfsecond.div(7500000).add(1))); if (player.t.sacrificedforfsecond.gte(1200000)) a = a + "<br>5.时间墙获取^" + (inChallenge('t', 22) ? "1.00" : format(player.t.sacrificedforfsecond.sub(1200000).div(1500000).add(1))); return a; },
            unlocked() { return getBuyableAmount('t', 11).gte(10) }
        },
    },
    clickables: {
        11: {
            title() { return "<h4>献祭你的点数</h4><br>每秒献祭5%的当前点数<br>当前：已"+((player.t.sacr||player.t.sacrsecond)?"开启":"关闭") },
            canClick() { return true },
            onClick() {
                if (player.t.sacrificedforfalse.gte(30000)) player.t.sacrsecond = !player.t.sacrsecond
                else player.t.sacr = !player.t.sacr
            },
            style() { return { 'background-color': "#FFFFFF", filter: "brightness(100%)", 'border-radius': "0px", height: "120px", width: "300px" } },
            unlocked() { return hasUpgrade('t', 82) && (player.t.sacrificedforfalse.lt(30000) || (getBuyableAmount('t', 11).gte(10)) && player.t.sacrificedforfsecond.lt(1500000)) },
        },
    },
    buyables: {
        11: {
            title: "减弱软上限",
            cost(x) {
                let a = new Decimal(1.2).pow(x).mul(2000).add(x.mul(3000))
                if (hasUpgrade('t', 83)) a = a.pow(0.97)
                if (hasUpgrade('t', 84)) a = a.pow(0.98)
                if (hasUpgrade('t', 85)) a = a.pow(0.99)
                if(x.gte(10))a=a.tetrate(player.points.add(1).pow(10).log(10).min(1e9))
                return a
            },
            display() {
                return "减弱升级61、65、74的软上限，并在软上限前指数增长它们的效果<br>价格: " + format(this.cost()) + "点数<br>效果: -" + format(this.effect().mul(100)) + "%, ^" + format(this.effect().add(1)) +"<br>已购买: " + format(getBuyableAmount(this.layer, this.id) )+"/"+ format(this.purchaseLimit())
            },
            canAfford() { return player.points.gte(this.cost()) },
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let eff = x.mul(0.05)
                if (player.t.sacrificedforfsecond.gt(0) && !inChallenge('t', 22)) eff = eff.mul(player.t.sacrificedforfsecond.div(7500000).add(1))
                if(hasUpgrade('t',91))eff=eff.mul(1.2)
                return eff
            },
            purchaseLimit() {
                let max = n(10)
                return max
            },
            unlocked() { return player.t.sacrificedforfalse.gte(30000) },
            style() { return { filter: "brightness(100%)", 'border-radius': "0px", height: "240px", width: "240px" } },
        },
        12: {
            title: "解锁挑战",
            cost(x) {
                let a = n(1e9)
                if (x.gte(0.9)) a = n(1e15)
                if (x.gte(1.9)) a = n(1e35)
                if (x.gte(2.9)) a = n("1e4004")
                if (hasUpgrade('t', 92)) a = a.div(upgradeEffect("t", 92).min(2000))
                return a
            },
            display() {
                return "每购买1次解锁一个挑战<br>价格: " + format(this.cost()) + "时间墙<br>效果: +" + format(this.effect()) + "<br>已购买: " + format(getBuyableAmount(this.layer, this.id)) + "/" + format(this.purchaseLimit())
            },
            canAfford() { return player.t.points.gte(this.cost()) },
            buy() {
                player.t.points = player.t.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let eff = x
                return eff
            },
            purchaseLimit() {
                let max = n(3)
                return max
            },
            unlocked() { return player.t.sacrificedforfsecond.gte(1500000) },
            style() { return { filter: "brightness(100%)", 'border-radius': "0px", height: "240px", width: "240px" } },
        },
        21: {
            title: "减弱软上限 2",
            cost(x) {
                let a = two.pow(x.pow(0.8)).mul("1e15")
                return a
            },
            display() {
                return "减弱点数获取软上限<br>价格: " + format(this.cost()) + "时间墙<br>效果: 软上限指数+" + format(this.effect()) + "<br>已购买: " + format(getBuyableAmount(this.layer, this.id)) + "/" + format(this.purchaseLimit())
            },
            canAfford() { return player.t.points.gte(this.cost()) },
            buy() {
                player.t.points = player.t.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let eff = x.mul(0.01)
                return eff
            },
            purchaseLimit() {
                let max = n(20)
                return max
            },
            unlocked() { return hasUpgrade('t',101) },
            style() { return { filter: "brightness(100%)", 'border-radius': "0px", height: "240px", width: "240px" } },
        },
    },
    hotkeys: [
        {
            key: "t", description: "T: 快速重置时间墙层", onPress() {
                if (canReset(this.layer)) doReset(this.layer)
            
            }
        },
    ],
    microtabs:{
        tab:{
            "main":{
                name(){return 'Time Walls'}, // Name of tab button
                nameI18N(){return '时间墙'}, // Second name for internationalization (i18n) if internationalizationMod is enabled
                content:[
                    'upgrades',
                ],
            },
            "a":{
                name(){return 'Challenges'},
                nameI18N(){return '挑战'},
                content: [
                    'challenges',
                ],
                unlocked() { return hasUpgrade("t", 35) },
            },
            "b": {
                name() { return 'Nothing' },
                nameI18N() { return 'QqQe308' },
                content: [
                ],
                unlocked() { return hasUpgrade("t", 6002) },
            },
            "c": {
                name() { return 'Nothing' },
                nameI18N() { return '维度' },
                content: [
                ],
                unlocked() { return hasUpgrade("t", 6001) },
            },
            "d": {
                name() { return 'Nothing' },
                nameI18N() { return '天神' },
                content: [
                ],
                unlocked() { return hasUpgrade("t", 6004) },
            },
            "e": {
                name() { return 'Nothing' },
                nameI18N() { return '伪·时间之神' },
                content: [
                    ["bar", "sacr1"], ["bar", "sacr2"], "blank", ["clickable", 11],"buyables",
                ],
                unlocked() { return hasUpgrade("t", 82) },
            },
            "f": {
                name() { return 'Nothing' },
                nameI18N() { return '真·时间之神' },
                content: [
                ],
                unlocked() { return hasUpgrade("t", 9991) },
            }
        },
    },
    tabFormat: [
       ["display-text", function() { return getPointsDisplay() }],
       "main-display",
       "prestige-button",
       "blank",
       ["microtabs","tab"]
    ],
    layerShown(){return true},
})

// You can delete the second name from each option if internationalizationMod is not enabled.
// You can use function i18n(text, otherText) to return text in two different languages. Typically, text is English and otherText is Chinese. If changedDefaultLanguage is true, its reversed