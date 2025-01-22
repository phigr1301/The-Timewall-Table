addLayer("1layer", {
    name: "sideLayer1",
    position: -1,
    row: 0,
    symbol() { return 'AntiDm19728BCEFGHIJKLMNOPQRSTUVWXYZabcdefghjklopqrsuvwxyz03456+/'}, // This appears on the layer's node. Default is the id with the first letter capitalized
    symbolI18N() { return i18n('↓ 主时间墙 ↓', 'AntiDm19728BCEFGHIJKLMNOPQRSTUVWXYZabcdefghjklopqrsuvwxyz03456+/', false) }, // Second name of symbol for internationalization (i18n) if internationalizationMod is enabled (in mod.js)
    small: true,// Set to true to generate a slightly smaller layer node
    nodeStyle: {"font-size": "15px", "height": "30px"},// Style for the layer button
    startData() { return {
        unlocked: true,
        points: new Decimal(0),// This currently does nothing, but it's required. (Might change later if you add mechanics to this layer.)
    }
    },
    color: "#fefefe",
    type: "none",
    tooltip(){return false},
    layerShown(){return layerDisplayTotal(['t'])},// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.
	tabFormat: [
        ["display-text", function () { return getPointsDisplay() }], "blank", ["display-text", function () { return "恭喜你找到了这里！但是并没有奖励<br>软上限前的点数获取量：" + format(player.pointgain_unsoftcapped)+"<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>0fZI0QRT0hsZ0BxX44sC0BxX0QRT0hsZ0fZI" }],
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
            c5Effect: one,
            designants: zero,
            designanttotal: zero,
            designantCD: zero,
            designant2s: zero,
            designant2CD: zero,
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
        if (getBuyableAmount('t', 33).gt(0)) mult = mult.mul(buyableEffect('t', 33))
        if (getBuyableAmount('t', 52).gt(0)) mult = mult.mul(buyableEffect('t', 52))
        if (hasUpgrade("t", 134)) mult = mult.pow(upgradeEffect("t", 134))

        if (hasUpgrade('t', 151)) mult = mult.mul(layers.t.d2Mult())
        if (getBuyableAmount('t', 34).gt(0)&&hasUpgrade('t',155)) mult = mult.mul(buyableEffect('t', 34))
        if (getBuyableAmount('t', 36).gt(0) && hasUpgrade('t', 155)) mult = mult.mul(buyableEffect('t', 36))
        if (getBuyableAmount('t', 51).gt(0) && hasUpgrade('t', 155)) mult = mult.mul(buyableEffect('t', 51))
        if (getBuyableAmount('t', 44).gt(0) && hasUpgrade('t', 161)) mult = mult.mul(buyableEffect('t', 44))
        if (hasUpgrade('t', 122) && hasUpgrade('t', 161)) mult = mult.mul(upgradeEffect('t', 122))
        if (hasUpgrade('t', 165)) mult = mult.mul(1e6)
        return mult
    },
    designantMult() {
        let dmult = one
        if (hasUpgrade("t", 113)) dmult = dmult.mul(upgradeEffect("t", 113))
        if (getBuyableAmount('t', 34).gt(0)) dmult = dmult.mul(buyableEffect('t', 34))
        if (getBuyableAmount('t', 36).gt(0)) dmult = dmult.mul(buyableEffect('t', 36))
        if (getBuyableAmount('t', 42).gt(0)) dmult = dmult.pow(1.15)
        if (hasUpgrade("t", 125)) dmult = dmult.pow(upgradeEffect("t", 125))
        if (getBuyableAmount('t', 51).gt(0)) dmult = dmult.mul(buyableEffect('t', 51))
        if (hasUpgrade("t", 141)) dmult = dmult.pow(1.2)

        dmult=dmult.mul(layers.t.d2Mult())
        return dmult
    },
    designant2Mult() {
        let dmult = one
        if (hasUpgrade("t", 153)) dmult = dmult.mul(upgradeEffect("t", 153))
        if (getBuyableAmount('t', 51).gt(0) && hasUpgrade("t", 154)) dmult = dmult.mul(buyableEffect('t', 51))
        return dmult
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
        if (hasUpgrade("t", 31) && hasChallenge('t', 21) && hasChallenge('t', 22) && hasUpgrade('t',123)) a = zero.add(2)
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
        if (player.t.designantCD.neq(0)) {
            player.t.designantCD = player.t.designantCD.sub(diff)
            if (player.t.designantCD.lte(0)) player.t.designantCD = zero
            if (player.t.designantCD.eq(0)) {
                player.t.designants = player.t.designants.add(layers.t.designantMult())
                player.t.designanttotal = player.t.designanttotal.add(layers.t.designantMult())
            }
        }
        if (player.t.designantCD.eq(0) && getBuyableAmount('t', 41).gt(0)) clickClickable('t', 12)
        if (player.t.designant2CD.neq(0)) {
            player.t.designant2CD = player.t.designant2CD.sub(diff)
            if (player.t.designant2CD.lte(0)) player.t.designant2CD = zero
            if (player.t.designant2CD.eq(0)) {
                player.t.designant2s = player.t.designant2s.add(layers.t.designant2Mult())
            }
        }
        if (player.t.designant2CD.eq(0) && hasUpgrade('t',144)) clickClickable('t', 13)
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
                eff = powsoftcap(eff, n(500), four)
                return eff
            },
            effectDisplay() { let a = "x" + format(this.effect()); let b = a; if (this.effect().gte(2)) a = b + "（软上限）"; if (this.effect().gte(500)) a = b + "（2重软上限）"; return a; },
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
                if (inChallenge('t', 32)) return one
                if (player.points.lte(1)) return three
                let eff = player.points.add(10).log(10).mul(3)
                if (buyableEffect('t', 11).gt(0)) eff = eff.pow(buyableEffect('t', 11).add(1))
                if (hasUpgrade('t', 104)) eff = eff.pow(1.15)
                if (hasUpgrade('t', 105)) eff = eff.pow(2)
                if (getBuyableAmount('t', 44).gt(0)) eff = eff.mul(buyableEffect('t', 44))
                eff = powsoftcap(eff, five, inChallenge('t', 22) ? ten : (hasChallenge('t', 21) ? two.sub(buyableEffect('t', 11)) : four))
                eff = powsoftcap(eff, hasUpgrade('t', 105) ? n(1000) : n(100), hasUpgrade('t', 104) ? two : (hasUpgrade('t', 103) ? three : four))
                eff = powsoftcap(eff, n(100000), ten)
                return eff
            },
            effectDisplay() { let a = "x" + format(this.effect()); let b = a; if (this.effect().gte(5)) a = b + "（软上限）"; if (this.effect().gte(hasUpgrade('t', 105) ? n(1000) : n(100))) a = b + "（2重软上限）"; if (this.effect().gte(100000)) a = b + "（3重软上限）"; return a; },

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
                if (inChallenge('t', 32)) return one
                if (player.t.points.lte(1)) return two
                let eff = player.t.points.add(10).log(10).mul(2)
                if (buyableEffect('t', 11).gt(0)) eff = eff.pow(buyableEffect('t', 11).add(1))
                if (hasUpgrade('t', 104)) eff = eff.pow(1.15)
                if (getBuyableAmount('t', 45).gt(0)) eff = eff.mul(buyableEffect('t', 44))
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
                if (getBuyableAmount('t', 45).gt(0)) eff = eff.mul(buyableEffect('t', 44))
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
                let eff = player.points.add(1).pow(0.4)
                if (!hasUpgrade('t', 111)) eff = eff.min(2000)
                else eff=powsoftcap(eff,n(2000),four)
                return eff
            },
            effectDisplay() { let a = "/" + format(this.effect()); let b = a; if (this.effect().gte(2000)) a = b + (hasUpgrade('t', 111) ?"（软上限）":"（硬上限）");  return a; },

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
        105: {
            title: "22",
            titleI18N: "105", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "升级61的2重软上限延后至1e3，并在1重软上限前^2", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("5e18") },
            unlocked() { return getBuyableAmount('t', 21).gte(20) && hasUpgrade('t', 104) }
        },
        111: {
            title: "22",
            titleI18N: "111", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "去除升级92的硬上限（但改为软上限），基础点数获取+0.05", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("1e19") },
            unlocked() { return hasUpgrade('t', 105) }
        },
        112: {
            title: "22",
            titleI18N: "112", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "解锁“设计蚂蚁”页面", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("5e19") },
            unlocked() { return hasUpgrade('t', 111) }
        },
        113: {
            title: "22",
            titleI18N: "113", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "基于时间墙增加蚂蚁获取", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            effect() {
                let eff = player.t.points.max(10).log(10).sub(19).max(1).pow(3)
                if(hasUpgrade('t',115))eff=eff.pow(2)
                eff = powsoftcap(eff, n(100), four)
                eff=eff.min("1.7977e308")
                return eff
            },
            effectDisplay() { let a = "x" + format(this.effect()); let b = a; if (this.effect().gte(100)) a = b + "（软上限）"; if (this.effect().gte("1.7977e308")) a = b + "（硬上限）"; return a; },
            cost: function () { return new Decimal("1e20") },
            unlocked() { return getBuyableAmount('t', 31).gt(0) }
        },
        114: {
            title: "22",
            titleI18N: "114", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "升级“设计蚂蚁PST”的效果额外+10", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("2e20") },
            unlocked() { return hasUpgrade('t', 113) && getBuyableAmount('t', 35).gt(0) }
        },
        115: {
            title: "22",
            titleI18N: "115", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "升级113的效果额外^2（在软上限前）", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("1e30") },
            unlocked() { return hasUpgrade('t', 114) }
        },
        121: {
            title: "22",
            titleI18N: "121", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "点数获取^2（？？？", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("3.3333e33") },
            unlocked() { return getBuyableAmount('t',21).gt(49) }
        },
        122: {
            title: "122",
            description: "基于作者Testify BYD的分数倍增点数获取",
            effect() {
                let eff = n(9621350)
                eff=eff.min(10002221)
                return eff
            },
            effectDisplay() { let a = "x" + format(this.effect()); let b = a;if (this.effect().gte(10002221)) a = b + "（硬上限）"; return a; },
            cost: function () { return new Decimal("1e36") },
            unlocked() { return hasUpgrade('t', 121) }
        },
        123: {
            title: "123",
            description: "升级31的效果再x10",
            cost: function () { return new Decimal("2e36") },
            unlocked() { return hasUpgrade('t', 122) }
        },
        124: {
            title: "124",
            description: "基于点数增益点数获取量",
            effect() {
                if (player.points.lte("1e20")) return one
                let eff = player.points.div("1e20")
                eff = powsoftcap(eff, n(10000), four)
                eff = powsoftcap(eff, n("1e9"), ten)
                eff = eff.min("1.7977e308")
                return eff
            },
            effectDisplay() { let a = "x" + format(this.effect()); let b = a; if (this.effect().gte(10000)) a = b + "（软上限）"; if (this.effect().gte("1e9")) a = b + "（2重软上限）"; if (this.effect().gte("1.7977e308")) a = b + "（硬上限）"; return a; },

            cost: function () { return new Decimal("1e38") },
            unlocked() { return hasUpgrade('t', 123) }
        },
        125: {
            title: "125",
            description: "基于时间墙增加蚂蚁获取指数",
            effect() {
                let eff = player.t.points.max(10).log(10).sub(34).max(1).pow(0.1)
                eff = powsoftcap(eff, n(1.3), (hasUpgrade('t',143) ? three : five))
                eff = eff.min(2)
                return eff
            },
            effectDisplay() { let a = "^" + format(this.effect()); let b = a; if (this.effect().gte(1.3)) a = b + "（软上限）"; if (this.effect().gte(2)) a = b + "（硬上限）"; return a; },
            cost: function () { return new Decimal("1.5e38") },
            unlocked() { return hasUpgrade('t', 124) }
        },
        131: {
            title: "131",
            description: "升级125的效果对实际生效总蚂蚁生效",
            cost: function () { return new Decimal("3.4e38") },
            unlocked() { return hasUpgrade('t', 125) }
        },
        132: {
            title: "132",
            description: "解锁下一行设计蚂蚁升级",
            cost: function () { return new Decimal("1e41") },
            unlocked() { return hasUpgrade('t', 131) }
        },
        133: {
            title: "133",
            description: "升级“设计蚂蚁BYD”对第三行设计蚂蚁升级生效",
            cost: function () { return new Decimal("1e42") },
            unlocked() { return hasUpgrade('t', 132) }
        },
        134: {
            title: "134",
            description: "基于总蚂蚁增加时间墙获取指数",
            effect() {
                let eff = layers.t.getDesignantEffect().max(10).log(10).sub(28).max(1).pow(0.1)
                eff = powsoftcap(eff, n(1.15),(getBuyableAmount('t', 56).gt(0)?three:five))
                eff = eff.min(1.4)
                return eff
            },
            effectDisplay() { let a = "^" + format(this.effect()); let b = a; if (this.effect().gte(1.15)) a = b + "（软上限）"; if (this.effect().gte(1.4)) a = b + "（硬上限）"; return a; },
            cost: function () { return new Decimal("3e42") },
            unlocked() { return hasUpgrade('t', 133) }
        },
        135: {
            title: "135",
            description: "升级134的效果对点数生效",
            cost: function () { return new Decimal("1e46") },
            unlocked() { return hasUpgrade('t', 134) }
        },
        141: {
            title: "141",
            description: "点数和蚂蚁^1.2",
            cost: function () { return new Decimal("1e52") },
            unlocked() { return getBuyableAmount('t',56).gt(0) }
        },
        142: {
            title: "142",
            description: "解锁设计蚂蚁^2",
            cost: function () { return new Decimal("1e56") },
            unlocked() { return hasUpgrade('t',141) }
        },
        143: {
            title: "143",
            description: "削弱升级125的软上限",
            cost: function () { return new Decimal("1e57") },
            unlocked() { return hasUpgrade('t', 142) }
        },
        144: {
            title: "144",
            description: "自动设计蚂蚁^2，升级“设计蚂蚁PST”效果也对设计蚂蚁^2生效",
            cost: function () { return new Decimal("1.1e57") },
            unlocked() { return hasUpgrade('t', 143) }
        },
        145: {
            title: "145",
            description: "设计蚂蚁^2时间/30",
            cost: function () { return new Decimal("2e57") },
            unlocked() { return hasUpgrade('t', 144) }
        },
        151: {
            title: "151",
            description: "设计蚂蚁^2效果也增益点数、时间墙获取",
            cost: function () { return new Decimal("2.1e57") },
            unlocked() { return hasUpgrade('t', 145) }
        },
        152: {
            title: "152",
            description: "点数的前3重软上限指数都+0.05",
            cost: function () { return new Decimal("1e58") },
            unlocked() { return hasUpgrade('t', 151) }
        },
        153: {
            title: "153",
            description: "实际生效总蚂蚁反向倍增蚂蚁^2获取",
            effect() {
                let eff = layers.t.getDesignantEffect().max(10).log(10).max(1)
                eff = eff.min(1e5)
                return eff
            },
            effectDisplay() { let a = "x" + format(this.effect()); let b = a; if (this.effect().gte(1e5)) a = b + "（硬上限）"; return a; },

            cost: function () { return new Decimal("1e60") },
            unlocked() { return hasUpgrade('t', 152) }
        },
        154: {
            title: "154",
            description: "升级“Hello (BPM) 2021”也对设计蚂蚁^2生效",
            cost: function () { return new Decimal("3e61") },
            unlocked() { return hasUpgrade('t', 153) }
        },
        155: {
            title: "155",
            description: "升级“拉面雨”“AQ”“Hello (BPM) 2021”的效果对时间墙生效",
            cost: function () { return new Decimal("5e62") },
            unlocked() { return hasUpgrade('t', 154) && getBuyableAmount('t', 32).gt(5.14) }
        },
        161: {
            title: "161",
            description: "升级122和“The Modding Tree”的效果也对时间墙生效",
            cost: function () { return new Decimal("1e73") },
            unlocked() { return hasUpgrade('t', 155) }
        },
        162: {
            title: "162",
            description: "“减弱软上限2”可购买可以多购买10个",
            cost: function () { return new Decimal("1e87") },
            unlocked() { return hasUpgrade('t', 161) }
        },
        163: {
            title: "163",
            description: "基础点数获取+1e6",
            cost: function () { return new Decimal("1e90") },
            unlocked() { return hasUpgrade('t', 162) }
        },
        164: {
            title: "164",
            description: "点数获取*1e6",
            cost: function () { return new Decimal("1e91") },
            unlocked() { return hasUpgrade('t', 163) }
        },
        165: {
            title: "165",
            description: "升级164效果对时间墙同时生效",
            cost: function () { return new Decimal("1e93") },
            unlocked() { return hasUpgrade('t', 164) }
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
        9902: {
            title: "22",
            titleI18N: "1919810", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "在设计蚂蚁页面永久显示设计蚂蚁视频", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("0") },
            unlocked() { return player.t.designanttotal.gte(100000) }
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
            challengeDescription: "实际生效的总蚂蚁数量变为log10，升级61、65的效果总是1<br>",
            canComplete() { return player.points.gte(10000) },
            goalDescription: "1e4点数",
            rewardDescription() { return "实际生效的总蚂蚁数量^1.5，优化升级“设计蚂蚁 BYD”" },
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
    designantMaxCD() {
        let cd = n(30)
        if (getBuyableAmount('t', 31).gt(0)) cd = cd.sub(buyableEffect('t', 31))
        return cd
    },
    designant2MaxCD() {
        let cd = n(180)
        if (getBuyableAmount('t', 31).gt(0) && hasUpgrade('t', 144)) cd = cd.sub(buyableEffect('t', 31))
        if (hasUpgrade('t', 145)) cd = cd.div(30)
        return cd
    },
    clickables: {
        11: {
            title() { return "<h4>献祭你的点数</h4><br>每秒献祭5%的当前点数<br>当前：已"+((player.t.sacr||player.t.sacrsecond)?"开启":"关闭") },
            canClick() { return true },
            onClick() {
                if (player.t.sacrificedforfalse.gte(30000)) player.t.sacrsecond = !player.t.sacrsecond
                else player.t.sacr = !player.t.sacr
            },
            style() { return { 'background-color': "#FFFFFF", filter: "brightness(100%)", 'border-radius': "15px", height: "120px", width: "300px" } },
            unlocked() { return hasUpgrade('t', 82) && (player.t.sacrificedforfalse.lt(30000) || (getBuyableAmount('t', 11).gte(10)) && player.t.sacrificedforfsecond.lt(1500000)) },
        },

        12: {
            title() { return "<h4>设计" + (layers.t.designantMult().eq(1) ? "一" : format(layers.t.designantMult()) )+"只蚂蚁</h4><br>需要"+format(layers.t.designantMaxCD())+"秒<br>当前: "+(player.t.designantCD.eq(0)?"可以设计":("剩余"+format(player.t.designantCD)+"秒")) },
            canClick() { return player.t.designantCD.eq(0) },
            onClick() {
                player.t.designantCD=layers.t.designantMaxCD()
            },
            style() { return { 'background-color': "#FFFFFF", filter: "brightness(100%)", 'border-radius': "15px", height: "160px", width: "240px" } },
            unlocked() { return true },
        },

        13: {
            title() { return "<h4>设计" + (layers.t.designant2Mult().eq(1) ? "一" : format(layers.t.designant2Mult())) +"只蚂蚁^2</h4><br>需要" + format(layers.t.designant2MaxCD()) + "秒<br>当前: " + (player.t.designant2CD.eq(0) ? "可以设计" : ("剩余" + format(player.t.designant2CD) + "秒")) },
            canClick() { return player.t.designant2CD.eq(0) },
            onClick() {
                player.t.designant2CD = layers.t.designant2MaxCD()
            },
            style() { return { 'background-color': "#FFFFFF", filter: "brightness(100%)", 'border-radius': "15px", height: "160px", width: "240px" } },
            unlocked() { return hasUpgrade('t',142) },
        },
    },
    getDesignantEffect() {
        let a = player.t.designanttotal
        if (inChallenge('t', 32)) a = a.add(1).log(10)
        if (hasChallenge('t', 32)) a = a.pow(1.5)
        if (hasUpgrade("t", 131)) a = a.pow(upgradeEffect("t", 125))
        if(getBuyableAmount('t',56).gt(0))a=a.pow(1.14514)

        return a
    },
    d2Mult() {
        if (!hasUpgrade('t', 142)) return one
        let a=player.t.designant2s.pow(0.5).add(1)

        return a
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
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "240px", width: "240px" } },
        },
        12: {
            title: "解锁挑战",
            cost(x) {
                let a = n(1e9)
                if (x.gte(0.9)) a = n(1e15)
                if (x.gte(1.9)) a = n(3e34)
                if (x.gte(2.9)) a = n("1e4004")
                if (hasUpgrade('t', 92)) a = a.div(upgradeEffect("t", 92))
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
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "240px", width: "240px" } },
        },
        21: {
            title: "减弱软上限 2",
            cost(x) {
                let a = two.pow(x.pow(0.8)).mul("1e15")
                if (x.gte(20)) a = two.pow(x.sub(20).pow(0.7)).mul("5e28")
                if (x.gte(50)) a = two.pow(x.sub(50).pow(0.9)).mul("5e85")
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
                if(eff.gt(0.2))eff=eff.sub(0.2).div(2).add(0.2)
                return eff
            },
            purchaseLimit() {
                let max = n(20)
                if (getBuyableAmount('t', 46).gt(0)) max = max.add(30)
                if (hasUpgrade('t',162)) max = max.add(10)
                return max
            },
            unlocked() { return hasUpgrade('t',101) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "240px", width: "240px" } },
        },
        31: {
            title: "设计蚂蚁 PST",
            cost(x) {
                let a = n(40).pow(x.pow(2).add(x).div(2)).mul(3)
                if (getBuyableAmount('t', 35).gt(0)) a = a.div(buyableEffect('t', 35))
                if (getBuyableAmount('t', 43).gt(0)) a = a.div(3)
                return a
            },
            display() {
                return "基于总蚂蚁减少设计蚂蚁时间<br>价格: " + format(this.cost()) + "蚂蚁<br>效果: 设计蚂蚁时间-" + format(this.effect()) + "s<br>已购买: " + format(getBuyableAmount(this.layer, this.id)) + "/" + format(this.purchaseLimit())
            },
            canAfford() { return player.t.designants.gte(this.cost()) },
            buy() {
                player.t.designants = player.t.designants.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let eff = x.pow(0.5).mul(layers.t.getDesignantEffect().add(1).log(10).pow(1.5)).min(29.5)
                if (hasUpgrade('t', 114)) eff = eff.add(10).min(29.5)
                if (getBuyableAmount('t', 53).gt(0)) eff = eff.add(0.35)
                return eff
            },
            purchaseLimit() {
                let max = n(3)
                return max
            },
            unlocked() { return player.t.designanttotal.gt(0) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "120px", width: "120px" } },
        },
        32: {
            title: "设计蚂蚁 PRS",
            cost(x) {
                let a = n(150).pow(x.pow(2).add(x).div(2)).mul(10)
                if (getBuyableAmount('t', 35).gt(0)) a = a.div(buyableEffect('t', 35))
                if (getBuyableAmount('t', 43).gt(0)) a = a.div(3)
                return a
            },
            display() {
                return "基于总蚂蚁增加点数获取<br>价格: " + format(this.cost()) + "蚂蚁<br>效果: 点数获取x" + format(this.effect()) + "<br>已购买: " + format(getBuyableAmount(this.layer, this.id)) + "/" + format(this.purchaseLimit())
            },
            canAfford() { return player.t.designants.gte(this.cost()) },
            buy() {
                player.t.designants = player.t.designants.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let eff = layers.t.getDesignantEffect().add(10).log(10).pow(1.5).pow(x)
                return eff
            },
            purchaseLimit() {
                let max = n(6)
                return max
            },
            unlocked() { return getBuyableAmount('t', 31).gt(0) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "120px", width: "120px" } },
        },
        33: {
            title: "设计蚂蚁 FTR",
            cost(x) {
                let a = n(1000).pow(x.pow(2).add(x).div(2)).mul(20)
                if (getBuyableAmount('t', 35).gt(0)) a = a.div(buyableEffect('t', 35))
                if (getBuyableAmount('t', 43).gt(0)) a = a.div(3)
                return a
            },
            display() {
                return "基于总蚂蚁增加时间墙获取<br>价格: " + format(this.cost()) + "蚂蚁<br>效果: 时间墙获取x" + format(this.effect()) + "<br>已购买: " + format(getBuyableAmount(this.layer, this.id)) + "/" + format(this.purchaseLimit())
            },
            canAfford() { return player.t.designants.gte(this.cost()) },
            buy() {
                player.t.designants = player.t.designants.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let eff = layers.t.getDesignantEffect().add(10).log(10).pow(x)
                return eff
            },
            purchaseLimit() {
                let max = n(4)
                return max
            },
            unlocked() { return getBuyableAmount('t', 32).gt(0) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "120px", width: "120px" } },
        },
        34: {
            title: "拉面雨",
            cost(x) {
                let a = n(80)
                if (getBuyableAmount('t', 35).gt(0)) a = a.div(buyableEffect('t', 35))
                if (getBuyableAmount('t', 43).gt(0)) a = a.div(3)
                return a
            },
            display() {
                return "基于总蚂蚁增加蚂蚁获取<br>价格: " + format(this.cost()) + "蚂蚁<br>效果: 蚂蚁获取x" + format(this.effect())
            },
            canAfford() { return player.t.designants.gte(this.cost()) },
            buy() {
                player.t.designants = player.t.designants.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let eff = layers.t.getDesignantEffect().add(10).log(10).pow(x)
                if (getBuyableAmount('t', 54).gt(0)) eff = eff.pow(1.5)
                eff=eff.min("1.7977e308")
                return eff
            },
            purchaseLimit() {
                let max = one
                return max
            },
            unlocked() { return getBuyableAmount('t', 33).gt(0) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "120px", width: "120px" } },
        },
        35: {
            title: "设计蚂蚁 BYD",
            cost(x) {
                let a = (hasChallenge('t', 32) ? n(15) : n(100)).pow(hasChallenge('t', 32) ?x:(x.pow(2).add(x).div(2))).mul(50)
                if (getBuyableAmount('t', 43).gt(0)) a = a.div(3)
                return a
            },
            display() {
                return "基于购买次数减少前4个升级的价格<br>价格: " + format(this.cost()) + "蚂蚁<br>效果: 前4个升级价格/" + format(this.effect()) + "<br>已购买: " + format(getBuyableAmount(this.layer, this.id)) + "/" + format(this.purchaseLimit())
            },
            canAfford() { return player.t.designants.gte(this.cost()) },
            buy() {
                player.t.designants = player.t.designants.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let eff = n(10).pow(x.pow(hasChallenge('t', 32)?n(0.8):n(0.5)))
                return eff
            },
            purchaseLimit() {
                let max = n(4)
                if (hasChallenge('t', 32))max=n(10)
                return max
            },
            unlocked() { return getBuyableAmount('t', 34).gt(0) && getBuyableAmount('t', 31).gt(1) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "120px", width: "120px" } },
        },
        36: {
            title: "AQ",
            cost(x) {
                let a = n(300)
                if (getBuyableAmount('t', 43).gt(0)) a = a.div(3)
                return a
            },
            display() {
                return "基于点数增加蚂蚁获取<br>价格: " + format(this.cost()) + "蚂蚁<br>效果: 蚂蚁获取x" + format(this.effect())
            },
            canAfford() { return player.t.designants.gte(this.cost()) },
            buy() {
                player.t.designants = player.t.designants.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let eff = player.points.max(10).log(10).sub(9).max(1).pow(getBuyableAmount('t', 54).gt(0)?n(3):n(2.5)).pow(x)
                eff = eff.min("1e9")
                return eff
            },
            purchaseLimit() {
                let max = one
                return max
            },
            unlocked() { return getBuyableAmount('t', 35).gt(0) && getBuyableAmount('t', 32).gt(1) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "120px", width: "120px" } },
        },
        41: {
            title: "Cookie Clicker",
            cost(x) {
                let a = n(114514)
                return a
            },
            display() {
                return "自动设计蚂蚁<br>价格: " + format(this.cost()) + "蚂蚁"
            },
            canAfford() { return player.t.designants.gte(this.cost()) },
            buy() {
                player.t.designants = player.t.designants.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                let max = one
                return max
            },
            unlocked() { return getBuyableAmount('t', 32).gt(2) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "120px", width: "120px" } },
        },
        42: {
            title: "Antimatter Dimensions",
            cost(x) {
                let a = n(1919810)
                return a
            },
            display() {
                return "单次设计蚂蚁的数量^1.15<br>价格: " + format(this.cost()) + "蚂蚁"
            },
            canAfford() { return player.t.designants.gte(this.cost()) },
            buy() {
                player.t.designants = player.t.designants.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                let max = one
                return max
            },
            unlocked() { return getBuyableAmount('t', 41).gt(0) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "120px", width: "120px" } },
        },
        43: {
            title: "The Prestige Tree",
            cost(x) {
                let a = n(10002184)
                return a
            },
            display() {
                return "点数获取的二重软上限变为^0.3473，前一行升级价格除以3<br>价格: " + format(this.cost()) + "蚂蚁"
            },
            canAfford() { return player.t.designants.gte(this.cost()) },
            buy() {
                player.t.designants = player.t.designants.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                let max = one
                return max
            },
            unlocked() { return getBuyableAmount('t', 42).gt(0) && getBuyableAmount('t', 35).gt(2) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "120px", width: "120px" } },
        },
        44: {
            title: "The Modding Tree",
            cost(x) {
                let a = n(10002221)
                return a
            },
            display() {
                return "基于作者Designant. BYD的分数增加升级61的效果<br>价格: " + format(this.cost()) + "蚂蚁<br>效果: 升级61的效果x" + format(this.effect())
            },
            canAfford() { return player.t.designants.gte(this.cost()) },
            buy() {
                player.t.designants = player.t.designants.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let eff = n(9619482)
                eff = eff.min(10002184)
                return eff
            },
            purchaseLimit() {
                let max = one
                return max
            },
            unlocked() { return getBuyableAmount('t', 43).gt(0) && getBuyableAmount('t', 33).gt(2) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "120px", width: "120px" } },
        },
        45: {
            title: "The Modding Table",
            cost(x) {
                let a = n(2e8)
                return a
            },
            display() {
                return "升级“The Modding Tree”效果对升级65、74生效<br>价格: " + format(this.cost()) + "蚂蚁"
            },
            canAfford() { return player.t.designants.gte(this.cost()) },
            buy() {
                player.t.designants = player.t.designants.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                let max = one
                return max
            },
            unlocked() { return getBuyableAmount('t', 44).gt(0) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "120px", width: "120px" } },
        },
        46: {
            title: "The Spring Festival Tree 2025",
            cost(x) {
                let a = n(2e9)
                return a
            },
            display() {
                return "可购买“减弱软上限2”的上限+30，但超过20的效果/2后同时对第1、第2重软上限生效<br>价格: " + format(this.cost()) + "蚂蚁"
            },
            canAfford() { return player.t.designants.gte(this.cost()) },
            buy() {
                player.t.designants = player.t.designants.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                let max = one
                return max
            },
            unlocked() { return hasChallenge('t',32) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "120px", width: "120px" } },
        },
        51: {
            title: "Hello (BPM) 2021",
            cost(x) {
                let a = n(1e14)
                if (hasUpgrade('t',133)) a = a.div(buyableEffect('t', 35))
                return a
            },
            display() {
                return "基于作者当前的ptt增加蚂蚁获取量（最低1x）<br>价格: " + format(this.cost()) + "蚂蚁<br>效果: 蚂蚁获取x" + format(this.effect())
            },
            canAfford() { return player.t.designants.gte(this.cost()) },
            effect(x) {
                let eff = n(12.48)
                eff = eff.max(1).min(13.24)
                return eff
            },
            buy() {
                player.t.designants = player.t.designants.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                let max = one
                return max
            },
            unlocked() { return hasUpgrade('t', 132) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "120px", width: "120px" } },
        },
        52: {
            title: "Hello (BPM) 2022",
            cost(x) {
                let a = n(1e15)
                if (hasUpgrade('t', 133)) a = a.div(buyableEffect('t', 35))
                return a
            },
            display() {
                return "基于作者当前的rks增加时间墙获取量（最低1x）<br>价格: " + format(this.cost()) + "蚂蚁<br>效果: 时间墙获取x" + format(this.effect())
            },
            canAfford() { return player.t.designants.gte(this.cost()) },
            effect(x) {
                let eff = n(15.60)
                eff = eff.max(1).min(16.39)
                return eff
            },
            buy() {
                player.t.designants = player.t.designants.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                let max = one
                return max
            },
            unlocked() { return getBuyableAmount('t', 51).gt(0) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "120px", width: "120px" } },
        },
        53: {
            title: "Hello (BPM) 2023",
            cost(x) {
                let a = n(2e21)
                if (hasUpgrade('t', 133)) a = a.div(buyableEffect('t', 35))
                return a
            },
            display() {
                return "升级“设计蚂蚁PST”的效果额外+0.35（在硬上限之后）<br>价格: " + format(this.cost()) + "蚂蚁"
            },
            canAfford() { return player.t.designants.gte(this.cost()) },
            buy() {
                player.t.designants = player.t.designants.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                let max = one
                return max
            },
            unlocked() { return getBuyableAmount('t', 52).gt(0) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "120px", width: "120px" } },
        },
        54: {
            title: "Hello (BPM) 2024",
            cost(x) {
                let a = n(1e22)
                if (hasUpgrade('t', 133)) a = a.div(buyableEffect('t', 35))
                return a
            },
            display() {
                return "升级“拉面雨”的效果^1.5，并优化升级“AQ”的公式<br>价格: " + format(this.cost()) + "蚂蚁"
            },
            canAfford() { return player.t.designants.gte(this.cost()) },
            buy() {
                player.t.designants = player.t.designants.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                let max = one
                return max
            },
            unlocked() { return getBuyableAmount('t', 32).gt(4) && getBuyableAmount('t', 53).gt(0) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "120px", width: "120px" } },
        },
        55: {
            title: "Hello (BPM) 2025",
            cost(x) {
                let a = n(5e24)
                if (hasUpgrade('t', 133)) a = a.div(buyableEffect('t', 35))
                return a
            },
            display() {
                return "<s>when?</s><br>可购买“减弱软上限2”对点数第2重软上限的效果/2后对第3重软上限生效<br>价格: " + format(this.cost()) + "蚂蚁"
            },
            canAfford() { return player.t.designants.gte(this.cost()) },
            buy() {
                player.t.designants = player.t.designants.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                let max = one
                return max
            },
            unlocked() { return getBuyableAmount('t', 54).gt(0) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "120px", width: "120px" } },
        },
        56: {
            title: "Hello (BPM) 2085",
            cost(x) {
                let a = n(2e25)
                if (hasUpgrade('t', 133)) a = a.div(buyableEffect('t', 35))
                return a
            },
            display() {
                return "<s>会赢吗？</s><br>基础点数获取+2085，实际生效蚂蚁^1.14514，削弱升级134的软上限<br>价格: " + format(this.cost()) + "蚂蚁"
            },
            canAfford() { return player.t.designants.gte(this.cost()) },
            buy() {
                player.t.designants = player.t.designants.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                let max = one
                return max
            },
            unlocked() { return getBuyableAmount('t', 55).gt(0) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "120px", width: "120px" } },
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
                    ["bar", "sacr1"], ["bar", "sacr2"], "blank", ["clickable", 11], ["row", [["buyable", 11], ["buyable", 12]]], ["row", [["buyable", 21]]],
                ],
                unlocked() { return hasUpgrade("t", 82) },
            },
            "f": {
                name() { return 'Nothing' },
                nameI18N() { return '真·时间之神' },
                content: [
                ],
                unlocked() { return hasUpgrade("t", 9991) },
            },
            "g": {
                name() { return 'Nothing' },
                nameI18N() { return '设计蚂蚁' },
                content: [
                    ["display-text", function () { return "你设计了" + format(player.t.designants) + "只蚂蚁（总共" + format(player.t.designanttotal) + "只蚂蚁，实际生效" + format(layers.t.getDesignantEffect()) + "只蚂蚁）！" }], ["display-text", function () { if (!hasUpgrade('t', 142)) return ""; return "你设计了" + format(player.t.designant2s) + "只蚂蚁^2，设计蚂蚁数量x" +format(layers.t.d2Mult())+ "！"; }], "blank", ["row", [["clickable", 12], ["clickable", 13]]], ["display-text", function () { if (player.t.designantCD.eq(0) && !hasUpgrade('t', 9902)) return ""; return "<br><iframe src=\"http://player.bilibili.com/player.html?isOutside=true&aid=113544087477778&bvid=BV1rtzKYxEWt&cid=27008435804&p=1\" scrolling=\"no\" border=\"0\" frameborder=\"no\" framespacing=\"0\" allowfullscreen=\"true\"></iframe>" }], "blank", ["row", [["buyable", 31], ["buyable", 32], ["buyable", 33], ["buyable", 34], ["buyable", 35], ["buyable", 36]]], ["row", [["buyable", 41], ["buyable", 42], ["buyable", 43], ["buyable", 44], ["buyable", 45], ["buyable", 46]]], ["row", [["buyable", 51], ["buyable", 52], ["buyable", 53], ["buyable", 54], ["buyable", 55], ["buyable", 56]]],
                ],
                unlocked() { return hasUpgrade("t", 112) },
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