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
        ["display-text", function () { return getPointsDisplay() }], "blank", ["display-text", function () { return "恭喜你找到了这里！但是并没有奖励" + "<br>软上限前的点数获取量：" + format(player.pointgain_unsoftcapped) + "<br>4重软上限后的点数获取量：" + format(player.pointgain_4softcapped) + "<br>时间墙gainmult：" + format(layers.t.gainMult()) + "<br>时间墙gainexp：" + format(layers.t.gainExp()) +"<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>0fZI0QRT0hsZ0BxX44sC0BxX0QRT0hsZ0fZI" }],
    ],
})
addLayer("QqQe308bx", {
    name: "test", // This is optional, only used in a few places, If absent it just uses the layer id
    symbol: "Test", // This appears on the layer's node. Default is the id with the first letter capitalized
    symbolI18N: "测试", // Second name of symbol for internationalization (i18n) if internationalizationMod is enabled
    position: -990, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 0, // Row the layer is in on the tree (0 is the first row)
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    tooltip() { return false },
    color: "#E6E6EC",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "点击墙", // Name of prestige currency
    resourceI18N: "点击墙", // Second name of the resource for internationalization (i18n) if internationalizationMod is enabled
    baseResource: "测试", // Name of resource prestige is based on
    baseResourceI18N: "测试", // Second name of the baseResource for internationalization (i18n) if internationalizationMod is enabled
    baseAmount() { return one }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = one
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return one
    },
    resetsNothing() {
        return true
    },
    hotkeys: [
    ],
    upgrades: {
        11: {
            title: "114514",
            description: "点数获取*0（假的）",
            cost: function () { return n(0) },
            unlocked() { return true }
        },
    },
    microtabs: {
        tab: {
            "main": {
                name() { return 'Time Walls' }, // Name of tab button
                nameI18N() { return '测试' }, // Second name for internationalization (i18n) if internationalizationMod is enabled
                content: [
                    'upgrades',
                ],
            },
        },
    },
    tabFormat: [
        ["display-text", function () { return getPointsDisplay() }],
        "main-display",
        "prestige-button",
        "blank",
        ["microtabs", "tab"]
    ],
    layerShown() { return true },
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
            dim1gen: zero,
            dim2gen: zero,
            dim3gen: zero,
            dim4gen: zero,
            dim5gen: zero,
            dim6gen: zero,
            dim7gen: zero,
            qqq:zero,
        }
    },
    color: "#FFFFFF",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "时间墙", // Name of prestige currency
    resourceI18N: "时间墙", // Second name of the resource for internationalization (i18n) if internationalizationMod is enabled
    baseResource: "点数", // Name of resource prestige is based on
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
        if (hasChallenge("t", 21)&&!getBuyableAmount('t',106).gt(0)) mult = mult.pow(1.3)
        if (player.t.sacrificedforfalse.gt(0) && !inChallenge('t', 22)) mult = mult.mul(player.t.sacrificedforfalse.div(10000).add(1))
        if (player.t.sacrificedforfsecond.gte(1200000) && !inChallenge('t', 22) && !getBuyableAmount('t', 106).gt(0)) mult = mult.pow(player.t.sacrificedforfsecond.sub(1200000).div(1500000).add(1))
        if (hasChallenge("t", 22) && !getBuyableAmount('t', 106).gt(0)) mult = mult.pow(1.05)
        if (hasChallenge("t", 31) && !getBuyableAmount('t', 106).gt(0)) mult = mult.pow(1.35)
        if (getBuyableAmount('t', 33).gt(0)) mult = mult.mul(buyableEffect('t', 33))
        if (getBuyableAmount('t', 52).gt(0)) mult = mult.mul(buyableEffect('t', 52))
        if (hasUpgrade("t", 134) && !getBuyableAmount('t', 106).gt(0)) mult = mult.pow(upgradeEffect("t", 134))

        if (hasUpgrade('t', 151)) mult = mult.mul(layers.t.d2Mult())
        if (getBuyableAmount('t', 34).gt(0)&&hasUpgrade('t',155)) mult = mult.mul(buyableEffect('t', 34))
        if (getBuyableAmount('t', 36).gt(0) && hasUpgrade('t', 155)) mult = mult.mul(buyableEffect('t', 36))
        if (getBuyableAmount('t', 51).gt(0) && hasUpgrade('t', 155)) mult = mult.mul(buyableEffect('t', 51))
        if (getBuyableAmount('t', 44).gt(0) && hasUpgrade('t', 161)) mult = mult.mul(buyableEffect('t', 44))
        if (hasUpgrade('t', 122) && hasUpgrade('t', 161)) mult = mult.mul(upgradeEffect('t', 122))
        if (hasUpgrade('t', 165)) mult = mult.mul(1e6)

        mult = mult.mul(buyableEffect('t', 61))
        if (hasUpgrade('t', 205) && !getBuyableAmount('t', 106).gt(0)) mult = mult.pow(1.065)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        if (!hasUpgrade('t', 11)) return ten.add(ten)
        mult = one
        if (hasChallenge("t", 21) && getBuyableAmount('t', 106).gt(0)) mult = mult.mul(1.3)
        if (player.t.sacrificedforfsecond.gte(1200000) && !inChallenge('t', 22) && getBuyableAmount('t', 106).gt(0)) mult = mult.mul(player.t.sacrificedforfsecond.sub(1200000).div(1500000).add(1))
        if (hasChallenge("t", 22) && getBuyableAmount('t', 106).gt(0)) mult = mult.mul(1.05)
        if (hasChallenge("t", 31) && getBuyableAmount('t', 106).gt(0)) mult = mult.mul(1.35)
        if (hasUpgrade("t", 134) && getBuyableAmount('t', 106).gt(0)) mult = mult.mul(upgradeEffect("t", 134))
        if (hasUpgrade('t', 205) && getBuyableAmount('t', 106).gt(0)) mult = mult.mul(1.065)
        if (hasUpgrade('t', 252)) mult = mult.add(0.5)
        return mult
    },
    QqQeffect() {
        let eff = player.t.qqq.mul(0.1).add(1)
        if (getBuyableAmount('t', 105).gt(0)) eff = player.t.qqq.pow(1.111).mul(0.1).add(1)
        if(eff.gte(2))eff=eff.div(2).pow(0.2085).mul(2)
        return eff
    },
    QqQeffect2() {
        if(!hasUpgrade('t',234))return one
        let eff = player.t.qqq.mul(0.04).add(1)
        if (eff.gte(1.35)) eff = eff.div(1.35).pow(0.4170).mul(1.35)
        if (eff.gte(3)) eff = eff.div(3).pow(0.2085).mul(3)
        return eff
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
        if (hasUpgrade("t", 173)) dmult = dmult.mul(player.t.dim5gen.add(getBuyableAmount('t', 72))).max(1)

        dmult=dmult.mul(layers.t.d2Mult())
        return dmult
    },
    designant2Mult() {
        let dmult = one
        if (hasUpgrade("t", 153)) dmult = dmult.mul(upgradeEffect("t", 153))
        if (getBuyableAmount('t', 51).gt(0) && hasUpgrade("t", 154)) dmult = dmult.mul(buyableEffect('t', 51))
        if (hasUpgrade("t", 171)) dmult = dmult.mul(player.t.dim3gen.add(getBuyableAmount('t', 63))).max(1)
        if (hasUpgrade("t", 192)) dmult = dmult.mul(player.t.dim7gen.add(getBuyableAmount('t', 81))).max(1)
        if (hasUpgrade("t", 211)) dmult = dmult.pow(1.166686)
        if (hasUpgrade("t", 212)) dmult = dmult.mul(1e18)
        if (hasUpgrade("t", 213)) dmult = dmult.pow(1.0419)
        if (hasUpgrade("t", 214)) dmult = dmult.pow(1.2085)
        if (getBuyableAmount('t', 102).gt(0)) dmult = dmult.pow(buyableEffect('t', 102))

        dmult=dmult.pow(layers.t.QqQeffect2())
        return dmult
    },
    passiveGeneration() {
        let a = zero
        if (hasUpgrade("t", 31)) a = zero.add(0.001)
        if (hasUpgrade("t", 31) && hasChallenge('t', 21)) a = zero.add(0.05)
        if (hasUpgrade("t", 31) && hasChallenge('t', 21) && hasChallenge('t', 22)) a = zero.add(0.2)
        if (hasUpgrade("t", 31) && hasChallenge('t', 21) && hasChallenge('t', 22) && hasUpgrade('t',123)) a = zero.add(2)
        return a
    },
    tickspeedCal() {
        if (!hasUpgrade('t', 172)) return one
        let a = buyableEffect('t', 91)
        if (hasUpgrade('t', 181)) a = a.mul(1.02)
        if (hasUpgrade('t', 182)) a = a.mul(1.02)
        if (hasUpgrade('t', 183)) a = a.mul(1.02)
        if (hasUpgrade('t', 184)) a = a.mul(1.02)
        if(hasUpgrade('t',185))a=a.mul(1.02)
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
        if (player.t.designant2CD.eq(0) && hasUpgrade('t', 144)) clickClickable('t', 13)
        player.t.dim1gen = player.t.dim1gen.add(buyableEffect('t', 62).mul(diff).mul(layers.t.tickspeedCal()))
        player.t.dim2gen = player.t.dim2gen.add(buyableEffect('t', 63).mul(diff).mul(layers.t.tickspeedCal()))
        player.t.dim3gen = player.t.dim3gen.add(buyableEffect('t', 71).mul(diff).mul(layers.t.tickspeedCal()))
        player.t.dim4gen = player.t.dim4gen.add(buyableEffect('t', 72).mul(diff).mul(layers.t.tickspeedCal()))
        player.t.dim5gen = player.t.dim5gen.add(buyableEffect('t', 73).mul(diff).mul(layers.t.tickspeedCal()))
        player.t.dim6gen = player.t.dim6gen.add(buyableEffect('t', 81).mul(diff).mul(layers.t.tickspeedCal()))
        player.t.dim7gen = player.t.dim7gen.add(buyableEffect('t', 82).mul(diff).mul(layers.t.tickspeedCal()))
        if (hasUpgrade('t', 175)) {
            if (layers.t.buyables[91].canAfford()) layers.t.buyables[91].buy()
            if (layers.t.buyables[82].canAfford()) layers.t.buyables[82].buy()
            if (layers.t.buyables[81].canAfford()) layers.t.buyables[81].buy()
            if (layers.t.buyables[73].canAfford()) layers.t.buyables[73].buy()
            if (layers.t.buyables[72].canAfford()) layers.t.buyables[72].buy()
            if (layers.t.buyables[71].canAfford()) layers.t.buyables[71].buy()
            if (layers.t.buyables[63].canAfford()) layers.t.buyables[63].buy()
            if (layers.t.buyables[62].canAfford()) layers.t.buyables[62].buy()
            if (layers.t.buyables[61].canAfford()) layers.t.buyables[61].buy()
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
                eff = powsoftcap(eff, n(50000), four)
                return eff
            },
            effectDisplay() { let a = "x" + format(this.effect()); let b = a; if (this.effect().gte(1.5)) a = b + "（软上限）"; if (this.effect().gte(50000)) a = b + "（2重软上限）"; return a; },
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
                eff = powsoftcap(eff, n(5e6), four)
                return eff
            },
            effectDisplay() { let a = "x" + format(this.effect()); let b = a; if (this.effect().gte(1.35)) a = b + "（软上限）"; if (this.effect().gte(5e6)) a = b + "（2重软上限）"; return a; },
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
                eff = powsoftcap(eff, n(5e8), four)
                return eff
            },
            effectDisplay() { let a = "x" + format(this.effect()); let b = a; if (this.effect().gte(1.25)) a = b + "（软上限）"; if (this.effect().gte(5e8)) a = b + "（2重软上限）"; return a; },
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
                eff = powsoftcap(eff, five, inChallenge('t', 22) ? ten : (hasChallenge('t', 21) ? two.sub(buyableEffect('t', 11)).max(1) : four))
                eff = powsoftcap(eff, hasUpgrade('t', 105) ? n(1000) : n(100), hasUpgrade('t', 104) ? two : (hasUpgrade('t', 103) ? three : four))
                eff = powsoftcap(eff, n(100000), ten)
                eff = powsoftcap(eff, n(1e12), ten)
                return eff
            },
            effectDisplay() { let a = "x" + format(this.effect()); let b = a; if (this.effect().gte(5)) a = b + "（软上限）"; if (this.effect().gte(hasUpgrade('t', 105) ? n(1000) : n(100))) a = b + "（2重软上限）"; if (this.effect().gte(100000)) a = b + "（3重软上限）"; if (this.effect().gte(1e12)) a = b + "（4重软上限）"; return a; },

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
                eff = powsoftcap(eff, four, inChallenge('t', 22) ? ten : (hasChallenge('t', 21) ? two.sub(buyableEffect('t', 11)).max(1) : four))
                eff = powsoftcap(eff, n(100), hasUpgrade('t', 104) ? two : (hasUpgrade('t', 103) ? three : four))
                eff = powsoftcap(eff, n(100000), ten)
                eff = powsoftcap(eff, n(1e12), ten)
                return eff
            },
            effectDisplay() { let a = "x" + format(this.effect()); let b = a; if (this.effect().gte(4)) a = b + "（软上限）"; if (this.effect().gte(100)) a = b + "（2重软上限）"; if (this.effect().gte(100000)) a = b + "（3重软上限）"; if (this.effect().gte(1e12)) a = b + "（4重软上限）"; return a; },

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
                eff = powsoftcap(eff, four, hasChallenge('t', 21) ? two.sub(buyableEffect('t', 11)).max(1) : four)
                eff = powsoftcap(eff, n(100), hasUpgrade('t', 104) ? two : (hasUpgrade('t', 103) ? three : four))
                eff = powsoftcap(eff, n(100000), ten)
                eff = powsoftcap(eff, n(1e12), ten)
                return eff
            },
            effectDisplay() { let a = "x" + format(this.effect()); let b = a; if (this.effect().gte(4)) a = b + "（软上限）"; if (this.effect().gte(100)) a = b + "（2重软上限）"; if (this.effect().gte(100000)) a = b + "（3重软上限）"; if (this.effect().gte(1e12)) a = b + "（4重软上限）"; return a; },
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
            description: "“减弱软上限2”可购买可以多购买20个",
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
        171: {
            title: "171",
            description: "第三维度数量影响设计蚂蚁^2倍率",
            cost: function () { return new Decimal("2e104") },
            unlocked() { return hasUpgrade('t', 6001) }
        },
        172: {
            title: "172",
            description: "解锁Tickspeed升级",
            cost: function () { return new Decimal("1e106") },
            unlocked() { return hasUpgrade('t', 171) }
        },
        173: {
            title: "173",
            description: "第五维度数量影响设计蚂蚁倍率",
            cost: function () { return new Decimal("1e124") },
            unlocked() { return hasUpgrade('t', 172) }
        },
        174: {
            title: "174",
            description: "升级“设计蚂蚁PRS”的上限+1",
            cost: function () { return new Decimal("1e140") },
            unlocked() { return hasUpgrade('t', 173) }
        },
        175: {
            title: "175",
            description: "每秒自动买维度和Tickspeed",
            cost: function () { return new Decimal("1e175") },
            unlocked() { return hasUpgrade('t', 174) }
        },
        181: {
            title: "181",
            description: "Tickspeed x1.02，升级“设计蚂蚁FTR”的上限+1",
            cost: function () { return new Decimal("1e252") },
            unlocked() { return hasUpgrade('t', 175) }
        },
        182: {
            title: "182",
            description: "Tickspeed x1.02，升级“拉面雨”的效果^1.5",
            cost: function () { return new Decimal("1e264") },
            unlocked() { return hasUpgrade('t', 181) }
        },
        183: {
            title: "183",
            description: "Tickspeed x1.02，再次优化升级“AQ”的公式",
            cost: function () { return new Decimal("1e276") },
            unlocked() { return hasUpgrade('t', 182) }
        },
        184: {
            title: "184",
            description: "Tickspeed x1.02，点数^1.01",
            cost: function () { return new Decimal("1e288") },
            unlocked() { return hasUpgrade('t', 183) }
        },
        185: {
            title: "185",
            description: "Tickspeed x1.02，实际生效蚂蚁^1.02",
            cost: function () { return new Decimal("1e300") },
            unlocked() { return hasUpgrade('t', 184) }
        },
        191: {
            title: "191",
            description: "每次Tickspeed升级的加成变为1.13倍",
            cost: function () { return new Decimal("1.7977e308") },
            unlocked() { return hasUpgrade('t', 185) }
        },
        192: {
            title: "192",
            description: "第七维度数量也增益设计蚂蚁^2，第八维度生产效率的底数1/1280 -> 0.06365",
            cost: function () { return new Decimal("1e320") },
            unlocked() { return hasUpgrade('t', 191) }
        },
        193: {
            title: "193",
            description: "实际生效蚂蚁的slog值增加0.01（软上限前）",
            cost: function () { return new Decimal("3.33e333") },
            unlocked() { return hasUpgrade('t', 192) }
        },
        194: {
            title: "194",
            description: "“减弱软上限”可购买的上限+5，10个之后每拥有1个额外使效果x1.2",
            cost: function () { return new Decimal("1e335") },
            unlocked() { return hasUpgrade('t', 193) }
        },
        195: {
            title: "195",
            description: "“减弱软上限”可购买的效果再x6.6686",
            cost: function () { return new Decimal("1e358") },
            unlocked() { return hasUpgrade('t', 194) }
        },
        201: {
            title: "201",
            description: "Tickspeed更便宜且其购买数量提升减弱软上限可购买的上限",
            effect() {
                let eff = getBuyableAmount('t', 91).sub(70).div(30).max(0).floor()
                eff=eff.min(8)
                return eff
            },
            effectDisplay() { let a = "+" + format(this.effect()); let b = a; if (this.effect().gte(8)) a = b + "（硬上限）";  return a; },
            cost: function () { return new Decimal("1e370") },
            unlocked() { return hasUpgrade('t', 195) }
        },
        202: {
            title: "202",
            description: "基于本层已购买的升级数量给第八维度一个生产速率加成",
            effect() {
                let eff = n(player.t.upgrades.length).max(1)
                return eff
            },
            effectDisplay() { let a = "x" + format(this.effect()); let b = a; return a; },
            cost: function () { return new Decimal("1e376") },
            unlocked() { return hasUpgrade('t', 201) }
        },
        203: {
            title: "203",
            description: "升级202也影响第2-7维度",
            cost: function () { return new Decimal("1e377") },
            unlocked() { return hasUpgrade('t', 202) }
        },
        204: {
            title: "204",
            description: "点数^1.035",
            cost: function () { return new Decimal("1e410") },
            unlocked() { return hasUpgrade('t', 203) }
        },
        205: {
            title: "205",
            description: "时间墙^1.065，Tickspeed价格大幅降低",
            cost: function () { return new Decimal("3e414") },
            unlocked() { return hasUpgrade('t', 204) }
        },
        211: {
            title: "211",
            description: "设计蚂蚁^2数量^1.166686",
            cost: function () { return new Decimal("1e450") },
            unlocked() { return hasUpgrade('t', 205) }
        },
        212: {
            title: "212",
            description: "设计蚂蚁^2数量x1e18",
            cost: function () { return new Decimal("1e470") },
            unlocked() { return hasUpgrade('t', 211) }
        },
        213: {
            title: "213",
            description: "设计蚂蚁^2数量^1.0419",
            cost: function () { return new Decimal("1e487") },
            unlocked() { return hasUpgrade('t', 212) }
        },
        214: {
            title: "214",
            description: "设计蚂蚁^2数量^1.2085",
            cost: function () { return new Decimal("5e503") },
            unlocked() { return hasUpgrade('t', 213) }
        },
        215: {
            title: "215",
            description: "你可以多购买45次升级“设计蚂蚁FTR”和25次升级“设计蚂蚁BYD”",
            cost: function () { return new Decimal("1e525") },
            unlocked() { return hasUpgrade('t', 214) }
        },
        221: {
            title: "221",
            description: "<s>1!5!</s><br>第一维度效果^1.5",
            cost: function () { return new Decimal("5.55e555") },
            unlocked() { return hasUpgrade('t', 215) }
        },
        222: {
            title: "222",
            description: "解锁更多QqQe308升级",
            cost: function () { return new Decimal("6.66e666") },
            unlocked() { return getBuyableAmount('t',101).gt(0) }
        },
        223: {
            title: "223",
            description: "QqQe308重置的点数需求除以1e40",
            cost: function () { return new Decimal("1e690") },
            unlocked() { return hasUpgrade('t', 222) }
        },
        224: {
            title: "224",
            description: "点数第四重软上限指数+0.1",
            cost: function () { return new Decimal("1e695") },
            unlocked() { return hasUpgrade('t', 223) }
        },
        225: {
            title: "225",
            description: "除第一维度外，所有维度和Tickspeed价格大幅下降",
            cost: function () { return new Decimal("1e698") },
            unlocked() { return hasUpgrade('t', 224) }
        },
        231: {
            title: "231",
            description: "更改QqQe308价格的公式",
            cost: function () { return new Decimal("1e2250") },
            unlocked() { return hasUpgrade('t', 225) }
        },
        232: {
            title: "232",
            description: "可购买“减弱软上限2”可以多购买1个（有啥用呢）",
            cost: function () { return new Decimal("1e2300") },
            unlocked() { return hasUpgrade('t', 231) }
        },
        233: {
            title: "233",
            description: "点数基础获取+1e40（有啥用呢）",
            cost: function () { return new Decimal("1e2305") },
            unlocked() { return hasUpgrade('t', 232) }
        },
        234: {
            title: "234",
            description: "解锁QqQe308的第二个效果",
            cost: function () { return new Decimal("1e2323") },
            unlocked() { return hasUpgrade('t', 233) }
        },
        235: {
            title: "235",
            description: "解锁一个普通挑战",
            cost: function () { return new Decimal("1e2470") },
            unlocked() { return hasUpgrade('t', 234) }
        },
        241: {
            title: "241",
            description: "去除点数获取的第一重软上限",
            cost: function () { return new Decimal("1e2963") },
            unlocked() { return hasUpgrade('t', 235) }
        },
        242: {
            title: "242",
            description: "去除点数获取的第二重软上限",
            cost: function () { return new Decimal("1e3072") },
            unlocked() { return hasUpgrade('t', 241) }
        },
        243: {
            title: "243",
            description: "去除点数获取的第三重软上限（？？？？",
            cost: function () { return new Decimal("1e3350") },
            unlocked() { return hasUpgrade('t', 242) }
        },
        244: {
            title: "244",
            description: "设计蚂蚁^2冷却-4.85s",
            cost: function () { return new Decimal("1e3550") },
            unlocked() { return hasUpgrade('t', 243) }
        },
        245: {
            title: "245",
            description: "点数基础获取+1e75",
            cost: function () { return new Decimal("3.55e3555") },
            unlocked() { return hasUpgrade('t', 244) }
        },
        251: {
            title: "251",
            description: "点数^3",
            cost: function () { return new Decimal("6.59e3571") },
            unlocked() { return hasUpgrade('t', 245) }
        },
        252: {
            title: "252",
            description: "时间墙gainexp在最后+0.5",
            cost: function () { return new Decimal("8.34e3835") },
            unlocked() { return hasUpgrade('t', 251) }
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
            cost: function () { return new Decimal("3.23e616") },
            unlocked() { return hasUpgrade('t', 25) }
        },
        6003: {
            title: "22",
            titleI18N: "F-03", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "在时间墙维度中解锁时间墙星系", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
            cost: function () { return new Decimal("1e4500") },
            unlocked() { return hasUpgrade('t', 25) }
        },
        6004: {
            title: "22",
            titleI18N: "F-04", // Second name of title for internationalization (i18n) if internationalizationMod is enabled
            description: "",
            descriptionI18N: "解锁天神页面", // Second name of description for internationalization (i18n) if internationalizationMod is enabled
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
        9903: {
            title: "解锁剧情",
            description: "没做呢",
            cost: function () { return new Decimal("0") },
            unlocked() { return hasChallenge('t',41) }
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
            challengeDescription: "点数^0.5，大幅增强部分升级的软上限，禁用裂缝效果<br>",
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
        41: {
            name: "c7",
            nameI18N: "普通挑战7",
            challengeDescription: "你同时在挑战4和挑战6中，点数^0.25<br>",
            canComplete() { return player.points.gte(3e67) },
            goalDescription: "3e67点数",
            countsAs: [22, 32],
            rewardDescription() { return "QqQe308价格大幅下降" },
            unlocked() { return hasUpgrade('t', 235) },
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
            display() { let a = "解锁伪·时间之神需要" + format(player.t.sacrificedforfalse, 2) + "/30000点数<br>效果：1.时间墙获取x" + (inChallenge('t', 22) ? "1.00" : format(player.t.sacrificedforfalse.div(10000).add(1))); if (player.t.sacrificedforfalse.gte(20000)) a = a + "<br>2.点数获取x" + (inChallenge('t', 22) ? "1.00" : format(player.t.sacrificedforfalse.sub(20000).div(10000).add(1))); if (player.t.sacrificedforfalse.gte(30000)) a = a + (inChallenge('t', 22) ? "<br>3.点数获取^1.00" : "<br>3.点数获取^1.20"); return a; },
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
            display() { let a = "解锁第二个可购买需要" + format(player.t.sacrificedforfsecond, 2) + "/1.5e6点数<br>效果：4.第一个可购买的效果x" + (inChallenge('t', 22) ? "1.00" : format(player.t.sacrificedforfsecond.div(7500000).add(1))); if (player.t.sacrificedforfsecond.gte(1200000)) a = a + "<br>5.时间墙获取^" + (inChallenge('t', 22) ? "1.00" : format(player.t.sacrificedforfsecond.sub(1200000).div(1500000).add(1))); return a; },
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
        if (hasUpgrade('t', 244)) cd = cd.sub(4.85)
        return cd
    },
    qqqResetreq() {
        let a = n(1e10).pow(player.t.qqq.pow(2).add(player.t.qqq).div(2)).mul(1e200)
        if (hasUpgrade('t', 231)) a = n(1e10).pow(player.t.qqq.pow(1.75).add(player.t.qqq.pow(0.875)).div(2)).mul(1e200)
        if (hasChallenge('t', 41)) a = n(1e7).pow(player.t.qqq.pow(1.6).add(player.t.qqq.pow(0.8)).div(2))
        if (hasUpgrade('t', 223)) a = a.div(1e40)
        if (getBuyableAmount('t', 104).gt(0)) a = a.pow(buyableEffect('t', 104))
        if (getBuyableAmount('t', 104).gt(0)) a = a.div(layers.t.buyables[104].effect2())
        return a
    },
    clickables: {
        11: {
            title() { return "<h4>填充点数</h4><br>每秒填充5%的当前点数<br>当前：已"+((player.t.sacr||player.t.sacrsecond)?"开启":"关闭") },
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
        21: {
            title() { return "<h4>重置以获得1只QqQe308</h4><br>需要" + format(layers.t.qqqResetreq()) + "点数" },
            canClick() { return player.points.gte(layers.t.qqqResetreq()) },
            onClick() {
                player.points = zero
                player.t.qqq=player.t.qqq.add(1)
            },
            style() { return { 'background-color': "#FFFFFF", filter: "brightness(100%)", 'border-radius': "15px", height: "160px", width: "240px" } },
            unlocked() { return getBuyableAmount('t',101).gt(0) },
        },
    },
    getDesignantEffect() {
        let a = player.t.designanttotal
        if (inChallenge('t', 32)) a = a.add(1).log(10)
        if (hasChallenge('t', 32)) a = a.pow(1.5)
        if (hasUpgrade("t", 131)) a = a.pow(upgradeEffect("t", 125))
        if (getBuyableAmount('t', 56).gt(0)) a = a.pow(1.14514)
        if (hasUpgrade("t", 185)) a = a.pow(1.02)
        if (hasUpgrade("t", 193)) a = n(10).tetrate(a.max(1).slog(10).add(0.01))
        if (a.gte("1.7977e308")) a = a.div("1.7977e308").pow(0.5).mul("1.7977e308")
        return a
    },
    d2Mult() {
        if (!hasUpgrade('t', 142)) return one
        let a = player.t.designant2s.pow(0.5).add(1)
        if (a.gte(1e100)) a = a.div(1e100).pow(0.5).mul(1e100)
        if (a.gte(1e200)) a = a.div(1e200).pow(0.5).mul(1e200)
        if (a.gte("1.7977e308")) a = a.div("1.7977e308").pow(0.5).mul("1.7977e308")

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
                if (x.gte(10)) a = n("1e336")
                if (x.gte(11)) a = n("1e340")
                if (x.gte(12)) a = n("1e345")
                if (x.gte(13)) a = n("1e354")
                if (x.gte(14)) a = n("1e358")
                if (x.gte(15)) a = n("1e370").mul(n(1e10).pow(x.sub(15)))
                return a
            },
            display() {
                return "减弱升级61、65、74的软上限，并在软上限前指数增长它们的效果<br>价格: " + format(this.cost()) + (getBuyableAmount(this.layer, this.id).gte(10)?"时间墙":"点数")+"<br>效果: -" + format(this.effect().mul(100).min(100)) + "%, ^" + format(this.effect().add(1)) +"<br>已购买: " + format(getBuyableAmount(this.layer, this.id) )+"/"+ format(this.purchaseLimit())
            },
            canAfford() { if (getBuyableAmount(this.layer, this.id).gte(10)) return player.t.points.gte(this.cost()); return player.points.gte(this.cost()); },
            buy() {
                if (getBuyableAmount(this.layer, this.id).gte(10)) {
                    player.t.points = player.t.points.sub(this.cost())
                }
                else { player.points = player.points.sub(this.cost()) }
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let eff = x.mul(0.05)
                if (player.t.sacrificedforfsecond.gt(0) && !inChallenge('t', 22)) eff = eff.mul(player.t.sacrificedforfsecond.div(7500000).add(1))
                if (hasUpgrade('t', 91)) eff = eff.mul(1.2)
                if (x.gte(11)) eff = eff.mul(1.2)
                if (x.gte(12)) eff = eff.mul(1.2)
                if (x.gte(13)) eff = eff.mul(1.2)
                if (x.gte(14)) eff = eff.mul(1.2)
                if (x.gte(15)) eff = eff.mul(1.2)
                if(x.gt(15))eff=eff.mul(n(1.2).pow(x.sub(15)))
                if (hasUpgrade('t', 195)) eff = eff.mul(6.6686)
                return eff
            },
            purchaseLimit() {
                let max = n(10)
                if (hasUpgrade('t', 194)) max = max.add(5)
                if (hasUpgrade('t', 201)) max = max.add(upgradeEffect('t',201))
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
                if (x.gte(60)) a = n("1e280")
                if (x.gte(61)) a = n("1e284")
                if (x.gte(62)) a = n("1e288")
                if (x.gte(63)) a = n("1e293")
                if (x.gte(64)) a = n("1e298")
                if (x.gte(65)) a = n("1e303")
                if (x.gte(66)) a = n("1.7977e308")
                if (x.gte(67)) a = n("1e350")
                if (x.gte(68)) a = n("1e400")
                if (x.gte(69)) a = n("1e500")
                if (x.gte(70)) a = n("1e2300")
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
                if (hasUpgrade('t', 162)) max = max.add(20)
                if (hasUpgrade('t', 232)) max = max.add(1)
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
                if(hasUpgrade('t',174))max=seven
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
                if (hasUpgrade('t', 181)) max = five
                if (hasUpgrade('t', 215)) max = max.add(45)
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
                if (hasUpgrade('t', 182)) eff=eff.pow(1.5)
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
                if (hasChallenge('t', 32)) max = n(10)
                if (hasUpgrade('t', 215)) max = max.add(25)
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
                let poweff = n(2.5)
                if (hasUpgrade('t', 183)) poweff = poweff.add(0.5)
                if (getBuyableAmount('t', 54).gt(0)) poweff = poweff.add(0.5)
                let eff = player.points.max(10).log(10).sub(9).max(1).pow(poweff).pow(x)
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
                let eff = n(9628614)
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
                let eff = n(12.49)
                eff = eff.max(1).min(13.25)
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
                let eff = n(15.81)
                eff = eff.max(1).min(16.80)
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
                return "可购买“减弱软上限2”对点数第2重软上限的效果/2后对第3重软上限生效<br>价格: " + format(this.cost()) + "蚂蚁"
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
            title: "TECHNOPOLIS 2085",
            cost(x) {
                let a = n(2e25)
                if (hasUpgrade('t', 133)) a = a.div(buyableEffect('t', 35))
                return a
            },
            display() {
                return "基础点数获取+2085，实际生效蚂蚁^1.14514，削弱升级134的软上限<br>价格: " + format(this.cost()) + "蚂蚁"
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
        61: {
            title: "第一时间墙维度",
            cost(x) {
                let a = n(1e100)
                a = a.mul(n(100).pow(x.div(10).floor()))
                if(a.gte("1.7977e308"))a=a.div("1.7977e308").pow(a.log(10).div(308.25)).mul("1.7977e308") //scaling
                return a
            },
            display() {
                return "时间墙获取x" + format(this.effect()) + "<br>价格: " + format(this.cost()) + "时间墙<br>已拥有: " + format(player.t.dim1gen.add(getBuyableAmount(this.layer, this.id))) + "<br>已购买: " + format(getBuyableAmount(this.layer, this.id)) + "/" + format(this.purchaseLimit())
            },
            canAfford() { return player.t.points.gte(this.cost()) },
            buy() {
                player.t.points = player.t.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let eff = player.t.dim1gen.add(x).div(10)
                eff = eff.mul(n(2).pow(x.div(10).floor()))
                if(hasUpgrade('t',221))eff=eff.pow(1.5)
                if (eff.gte(1e45)) eff = eff.div(1e45).pow(0.95).mul(1e45) //softcap
                if (eff.gte(1e65)) eff = eff.div(1e65).pow(0.95).mul(1e65) //softcap2
                if (eff.gte(1e85)) eff = eff.div(1e85).pow(0.95).mul(1e85) //softcap3
                if (eff.gte(1e105)) eff = eff.div(1e105).pow(0.95).mul(1e105) //softcap4
                if (eff.gte(1e125)) eff = eff.div(1e125).pow(0.94).mul(1e125) //softcap5
                if (eff.gte(1e145)) eff = eff.div(1e145).pow(0.93).mul(1e145) //softcap6
                if (eff.gte(1e165)) eff = eff.div(1e165).pow(0.92).mul(1e165) //softcap7
                if (eff.gte(1e185)) eff = eff.div(1e185).pow(0.91).mul(1e185) //softcap8
                if (eff.gte(1e205)) eff = eff.div(1e205).pow(0.9).mul(1e205) //softcap9
                if (eff.gte(1e225)) eff = eff.div(1e225).pow(0.89).mul(1e225) //softcap10
                if (eff.gte(1e245)) eff = eff.div(1e245).pow(0.88).mul(1e245) //softcap11
                if (eff.gte(1e265)) eff = eff.div(1e265).pow(0.87).mul(1e265) //softcap12
                if (eff.gte(1e285)) eff = eff.div(1e285).pow(0.86).mul(1e285) //softcap13
                if (eff.gte("1.7977e308")) eff = eff.div("1.7977e308").pow(0.5).mul("1.7977e308") //softcap14
                if (eff.max(10).log(10).gte(4000)) eff = ten.pow(eff.max(10).log(10).div(4000).pow(0.5).mul(4000)) //softcap15
                eff=eff.add(1)
                return eff
            },
            purchaseLimit() {
                let max = n(1e309)
                return max
            },
            unlocked() { return true },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "200px", width: "200px" } },
        },
        62: {
            title: "第二时间墙维度",
            cost(x) {
                let scal = two
                if (hasUpgrade('t', 225)) scal = n(1.15)
                let a = n(1e101)
                a = a.mul(n(2000).pow(x.div(10).floor()))
                if (a.gte("1.7977e308")) a = a.div("1.7977e308").pow(a.log(10).div(308.25).pow(scal)).mul("1.7977e308") //scaling
                return a
            },
            display() {
                return "每秒生产" + format(this.effect()) + "第一维度<br>价格: " + format(this.cost()) + "时间墙<br>已拥有: " + format(player.t.dim2gen.add(getBuyableAmount(this.layer, this.id))) + "<br>已购买: " + format(getBuyableAmount(this.layer, this.id)) + "/" + format(this.purchaseLimit())
            },
            canAfford() { return player.t.points.gte(this.cost()) },
            buy() {
                player.t.points = player.t.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let eff = player.t.dim2gen.add(x).div(20)
                eff = eff.mul(n(2).pow(x.div(10).floor()))
                if (hasUpgrade('t', 203)) eff = eff.mul(upgradeEffect('t', 202))
                if (eff.gte("1.7977e308")) eff = eff.div("1.7977e308").pow(0.5).mul("1.7977e308") //softcap
                if (eff.max(10).log(10).gte(4000)) eff = ten.pow(eff.max(10).log(10).div(4000).pow(0.5).mul(4000)) //softcap2
                return eff
            },
            purchaseLimit() {
                let max = n(1e309)
                return max
            },
            unlocked() { return getBuyableAmount('t', 61).gt(9) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "200px", width: "200px" } },
        },
        63: {
            title: "第三时间墙维度",
            cost(x) {
                let scal = three
                if (hasUpgrade('t', 225)) scal = n(1.3)
                let a = n(2e102)
                a = a.mul(n(40000).pow(x.div(10).floor()))
                if (a.gte("1.7977e308")) a = a.div("1.7977e308").pow(a.log(10).div(308.25).pow(scal)).mul("1.7977e308") //scaling
                return a
            },
            display() {
                return "每秒生产" + format(this.effect()) + "第二维度<br>价格: " + format(this.cost()) + "时间墙<br>已拥有: " + format(player.t.dim3gen.add(getBuyableAmount(this.layer, this.id))) + "<br>已购买: " + format(getBuyableAmount(this.layer, this.id)) + "/" + format(this.purchaseLimit())
            },
            canAfford() { return player.t.points.gte(this.cost()) },
            buy() {
                player.t.points = player.t.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let eff = player.t.dim3gen.add(x).div(40)
                eff = eff.mul(n(2).pow(x.div(10).floor()))
                if (hasUpgrade('t', 203)) eff = eff.mul(upgradeEffect('t', 202))
                if (eff.gte("1.7977e308")) eff = eff.div("1.7977e308").pow(0.5).mul("1.7977e308") //softcap
                if (eff.max(10).log(10).gte(4000)) eff = ten.pow(eff.max(10).log(10).div(4000).pow(0.5).mul(4000)) //softcap2
                return eff
            },
            purchaseLimit() {
                let max = n(1e309)
                return max
            },
            unlocked() { return getBuyableAmount('t', 62).gt(9) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "200px", width: "200px" } },
        },
        71: {
            title: "第四时间墙维度",
            cost(x) {
                let scal = four
                if (hasUpgrade('t', 225)) scal = n(1.45)
                let a = n(3e104)
                a = a.mul(n("1e6").pow(x.div(10).floor()))
                if (a.gte("1.7977e308")) a = a.div("1.7977e308").pow(a.log(10).div(308.25).pow(scal)).mul("1.7977e308") //scaling
                return a
            },
            display() {
                return "每秒生产" + format(this.effect()) + "第三维度<br>价格: " + format(this.cost()) + "时间墙<br>已拥有: " + format(player.t.dim4gen.add(getBuyableAmount(this.layer, this.id))) + "<br>已购买: " + format(getBuyableAmount(this.layer, this.id)) + "/" + format(this.purchaseLimit())
            },
            canAfford() { return player.t.points.gte(this.cost()) },
            buy() {
                player.t.points = player.t.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let eff = player.t.dim4gen.add(x).div(80)
                eff = eff.mul(n(2).pow(x.div(10).floor()))
                if (hasUpgrade('t', 203)) eff = eff.mul(upgradeEffect('t', 202))
                if (eff.gte("1.7977e308")) eff = eff.div("1.7977e308").pow(0.5).mul("1.7977e308") //softcap
                if (eff.max(10).log(10).gte(4000)) eff = ten.pow(eff.max(10).log(10).div(4000).pow(0.5).mul(4000)) //softcap2
                return eff
            },
            purchaseLimit() {
                let max = n(1e309)
                return max
            },
            unlocked() { return getBuyableAmount('t', 63).gt(9) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "200px", width: "200px" } },
        },
        72: {
            title: "第五时间墙维度",
            cost(x) {
                let scal = five
                if(hasUpgrade('t',225))scal=n(1.6)
                let a = n(1e110)
                a = a.mul(n("3e8").pow(x.div(10).floor()))
                if (a.gte("1.7977e308")) a = a.div("1.7977e308").pow(a.log(10).div(308.25).pow(scal)).mul("1.7977e308") //scaling
                return a
            },
            display() {
                return "每秒生产" + format(this.effect()) + "第四维度<br>价格: " + format(this.cost()) + "时间墙<br>已拥有: " + format(player.t.dim5gen.add(getBuyableAmount(this.layer, this.id))) + "<br>已购买: " + format(getBuyableAmount(this.layer, this.id)) + "/" + format(this.purchaseLimit())
            },
            canAfford() { return player.t.points.gte(this.cost()) },
            buy() {
                player.t.points = player.t.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let eff = player.t.dim5gen.add(x).div(160)
                eff = eff.mul(n(2).pow(x.div(10).floor()))
                if (hasUpgrade('t', 203)) eff = eff.mul(upgradeEffect('t', 202))
                if (eff.gte("1.7977e308")) eff = eff.div("1.7977e308").pow(0.5).mul("1.7977e308") //softcap
                if (eff.max(10).log(10).gte(4000)) eff = ten.pow(eff.max(10).log(10).div(4000).pow(0.5).mul(4000)) //softcap2
                return eff
            },
            purchaseLimit() {
                let max = n(1e309)
                return max
            },
            unlocked() { return getBuyableAmount('t', 71).gt(9) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "200px", width: "200px" } },
        },
        73: {
            title: "第六时间墙维度",
            cost(x) {
                let scal = six
                if (hasUpgrade('t', 225)) scal = n(1.75)
                let a = n(1e122)
                a = a.mul(n("1e11").pow(x.div(10).floor()))
                if (a.gte("1.7977e308")) a = a.div("1.7977e308").pow(a.log(10).div(308.25).pow(scal)).mul("1.7977e308") //scaling
                return a
            },
            display() {
                return "每秒生产" + format(this.effect()) + "第五维度<br>价格: " + format(this.cost()) + "时间墙<br>已拥有: " + format(player.t.dim6gen.add(getBuyableAmount(this.layer, this.id))) + "<br>已购买: " + format(getBuyableAmount(this.layer, this.id)) + "/" + format(this.purchaseLimit())
            },
            canAfford() { return player.t.points.gte(this.cost()) },
            buy() {
                player.t.points = player.t.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let eff = player.t.dim6gen.add(x).div(320)
                eff = eff.mul(n(2).pow(x.div(10).floor()))
                if (hasUpgrade('t', 203)) eff = eff.mul(upgradeEffect('t', 202))
                if (eff.gte("1.7977e308")) eff = eff.div("1.7977e308").pow(0.5).mul("1.7977e308") //softcap
                if (eff.max(10).log(10).gte(4000)) eff = ten.pow(eff.max(10).log(10).div(4000).pow(0.5).mul(4000)) //softcap2
                return eff
            },
            purchaseLimit() {
                let max = n(1e309)
                return max
            },
            unlocked() { return getBuyableAmount('t', 72).gt(9) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "200px", width: "200px" } },
        },
        81: {
            title: "第七时间墙维度",
            cost(x) {
                let scal = seven
                if (hasUpgrade('t', 225)) scal = n(1.9)
                let a = n(1e130)
                a = a.mul(n("1e14").pow(x.div(10).floor()))
                if (a.gte("1.7977e308")) a = a.div("1.7977e308").pow(a.log(10).div(308.25).pow(scal)).mul("1.7977e308") //scaling
                return a
            },
            display() {
                return "每秒生产" + format(this.effect()) + "第六维度<br>价格: " + format(this.cost()) + "时间墙<br>已拥有: " + format(player.t.dim7gen.add(getBuyableAmount(this.layer, this.id))) + "<br>已购买: " + format(getBuyableAmount(this.layer, this.id)) + "/" + format(this.purchaseLimit())
            },
            canAfford() { return player.t.points.gte(this.cost()) },
            buy() {
                player.t.points = player.t.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let eff = player.t.dim7gen.add(x).div(640)
                eff = eff.mul(n(2).pow(x.div(10).floor()))
                if (hasUpgrade('t', 203)) eff = eff.mul(upgradeEffect('t', 202))
                if (eff.gte("1.7977e308")) eff = eff.div("1.7977e308").pow(0.5).mul("1.7977e308") //softcap
                if (eff.max(10).log(10).gte(4000)) eff = ten.pow(eff.max(10).log(10).div(4000).pow(0.5).mul(4000)) //softcap2
                return eff
            },
            purchaseLimit() {
                let max = n(1e309)
                return max
            },
            unlocked() { return getBuyableAmount('t', 73).gt(9) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "200px", width: "200px" } },
        },
        82: {
            title: "第八时间墙维度",
            cost(x) {
                let scal = eight
                if (hasUpgrade('t', 225)) scal = n(2.05)
                let a = n(1e145)
                a = a.mul(n("1e18").pow(x.div(10).floor()))
                if (a.gte("1.7977e308")) a = a.div("1.7977e308").pow(a.log(10).div(308.25).pow(scal)).mul("1.7977e308") //scaling
                return a
            },
            display() {
                return "每秒生产" + format(this.effect()) + "第七维度<br>价格: " + format(this.cost()) + "时间墙<br>已拥有: " + format(getBuyableAmount(this.layer, this.id)) + "<br>已购买: " + format(getBuyableAmount(this.layer, this.id)) + "/" + format(this.purchaseLimit())
            },
            canAfford() { return player.t.points.gte(this.cost()) },
            buy() {
                player.t.points = player.t.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let ef = one.div(1280)
                if(hasUpgrade('t',192))ef=n(0.06365)
                let eff = x.mul(ef)
                eff = eff.mul(n(2).pow(x.div(10).floor()))
                if(hasUpgrade('t',202))eff=eff.mul(upgradeEffect('t',202))
                if (eff.gte("1.7977e308")) eff = eff.div("1.7977e308").pow(0.5).mul("1.7977e308") //softcap
                if (eff.max(10).log(10).gte(4000)) eff = ten.pow(eff.max(10).log(10).div(4000).pow(0.5).mul(4000)) //softcap2
                return eff
            },
            purchaseLimit() {
                let max = n(1e309)
                return max
            },
            unlocked() { return getBuyableAmount('t', 81).gt(9) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "200px", width: "200px" } },
        },
        91: {
            title: "Tickspeed升级",
            cost(x) {
                let sp = ten
                if (hasUpgrade('t', 201)) sp = n(3.473)
                if (hasUpgrade('t', 205)) sp = n(1.9728)
                if (hasUpgrade('t', 225)) sp = n(0.8)
                let a = n(1e106)
                a = a.mul(n(10).pow(x))
                if(a.gte(1e200))a=a.div(1e200).pow(2).mul(1e200) //scaling
                if (a.gte("1.7977e308")) a = a.div("1.7977e308").pow(a.log(10).div(308.25).pow(sp)).mul("1.7977e308") //scaling2
                return a
            },
            display() {
                return "Tickspeed变为原来的" + format(this.effect()) + "倍<br>当前: x"+format(layers.t.tickspeedCal())+"（第一维度不受影响）<br>价格: " + format(this.cost()) + "时间墙<br>已购买: " + format(getBuyableAmount(this.layer, this.id)) + "/" + format(this.purchaseLimit())
            },
            canAfford() { return player.t.points.gte(this.cost()) },
            buy() {
                player.t.points = player.t.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let ef = n(1.125)
                if(hasUpgrade('t',191))ef=n(1.13)
                let eff = ef.pow(x)
                return eff
            },
            purchaseLimit() {
                let max = n(1e309)
                return max
            },
            unlocked() { return hasUpgrade('t',172) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "200px", width: "200px" } },
        },
        101: {
            title: "QqQU1",
            cost(x) {
                let a = zero
                return a
            },
            display() {
                return "解锁QqQe308重置<br>价格: " + format(this.cost()) + "只QqQe308"
            },
            canAfford() { return player.t.qqq.gte(this.cost()) },
            buy() {
                player.t.qqq = player.t.qqq.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                let max = one
                return max
            },
            unlocked() { return hasUpgrade('t',6002) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "120px", width: "120px" } },
        },
        102: {
            title: "QqQU2",
            cost(x) {
                let a = four
                return a
            },
            display() {
                return "基于QqQe308增益蚂蚁^2获取量<br>价格: " + format(this.cost()) + "只QqQe308<br>效果: 蚂蚁^2获取量^" + format(this.effect())
            },
            canAfford() { return player.t.qqq.gte(this.cost()) },
            buy() {
                player.t.qqq = player.t.qqq.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let eff = player.t.qqq.pow(0.75).mul(0.05).add(1)
                if(eff.gte(1.5))eff=eff.div(1.5).pow(0.3).mul(1.5)
                return eff
            },
            purchaseLimit() {
                let max = one
                return max
            },
            unlocked() { return hasUpgrade('t', 222) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "120px", width: "120px" } },
        },
        103: {
            title: "QqQU3",
            cost(x) {
                let a = six
                return a
            },
            display() {
                return "基于QqQe308削弱点数第四层软上限<br>价格: " + format(this.cost()) + "只QqQe308<br>效果: 软上限指数+" + format(this.effect())
            },
            canAfford() { return player.t.qqq.gte(this.cost()) },
            buy() {
                player.t.qqq = player.t.qqq.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let eff = player.t.qqq.pow(0.8).mul(0.03)
                eff=eff.min(0.45)
                return eff
            },
            purchaseLimit() {
                let max = one
                return max
            },
            unlocked() { return hasUpgrade('t', 222) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "120px", width: "120px" } },
        },
        104: {
            title: "QqQU4",
            cost(x) {
                let a = n("1e329")
                return a
            },
            display() {
                return "基于时间墙减少QqQe308需求<br>价格: " + format(this.cost()) + "点数<br>效果: 需求^" + format(this.effect()) + "且/" + format(this.effect2())
            },
            canAfford() { return player.points.gte(this.cost()) },
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let eff = one.sub(player.t.points.max(1).pow(0.0001).sub(1).div(10))
                eff = eff.max(0.7)
                return eff
            },
            effect2() {
                let eff = player.t.points.max(1).pow(0.05)
                eff=eff.min(1e50)
                return eff
            },
            purchaseLimit() {
                let max = one
                return max
            },
            unlocked() { return hasUpgrade('t', 222) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "120px", width: "120px" } },
        },
        105: {
            title: "QqQU5",
            cost(x) {
                let a = seven
                return a
            },
            display() {
                return "更改QqQe308对点数加成的公式<br>价格: " + format(this.cost()) + "只QqQe308"
            },
            canAfford() { return player.t.qqq.gte(this.cost()) },
            buy() {
                player.t.qqq = player.t.qqq.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                let max = one
                return max
            },
            unlocked() { return hasUpgrade('t', 222) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "120px", width: "120px" } },
        },
        106: {
            title: "QqQU6",
            cost(x) {
                let a = n("1e350")
                return a
            },
            display() {
                return "所有对时间墙gainmult进行指数运算的效果改为对gainexp进行乘数运算（没啥用）<br>价格: " + format(this.cost()) + "点数"
            },
            canAfford() { return player.points.gte(this.cost()) },
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                let max = one
                return max
            },
            unlocked() { return hasUpgrade('t', 222) },
            style() { return { filter: "brightness(100%)", 'border-radius': "15px", height: "120px", width: "120px" } },
        },
        107: {
            title: "QqQU7",
            cost(x) {
                let a = n(31)
                return a
            },
            display() {
                return "点数^1.8<br>价格: " + format(this.cost()) + "只QqQe308"
            },
            canAfford() { return player.t.qqq.gte(this.cost()) },
            buy() {
                player.t.qqq = player.t.qqq.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                let max = one
                return max
            },
            unlocked() { return hasUpgrade('t', 222) },
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
                nameI18N(){return '升级'}, // Second name for internationalization (i18n) if internationalizationMod is enabled
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
                    ["display-text", function () { let a = "你有" + format(player.t.qqq) + "只QqQe308，增益点数获取^" + format(layers.t.QqQeffect()); if (hasUpgrade('t', 234)) a = a + "，并使蚂蚁^2获取^" + format(layers.t.QqQeffect2()); a = a + "！"; return a; }], "blank", ["clickable", 21], "blank", ["row", [["buyable", 101], ["buyable", 102], ["buyable", 103], ["buyable", 104], ["buyable", 105], ["buyable", 106], ["buyable", 107]]],
                ],
                unlocked() { return hasUpgrade("t", 6002) },
            },
            "c": {
                name() { return 'Nothing' },
                nameI18N() { return '维度' },
                content: [
                    ["row", [["buyable", 91]]], ["row", [["buyable", 61], ["buyable", 62], ["buyable", 63]]], ["row", [["buyable", 71], ["buyable", 72], ["buyable", 73]]], ["row", [["buyable", 81], ["buyable", 82]]],
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
                    ["display-text", function () { return "你设计了" + format(player.t.designants) + "只蚂蚁（总共" + format(player.t.designanttotal) + "只蚂蚁，实际生效" + format(layers.t.getDesignantEffect()) + "只蚂蚁" + (layers.t.getDesignantEffect().gte("1.7977e308")?"（已达软上限）":"")+"）！" }], ["display-text", function () { if (!hasUpgrade('t', 142)) return ""; return "你设计了" + format(player.t.designant2s) + "只蚂蚁^2，设计蚂蚁数量x" +format(layers.t.d2Mult())+ "！"; }], "blank", ["row", [["clickable", 12], ["clickable", 13]]], ["display-text", function () { if (player.t.designantCD.eq(0) && !hasUpgrade('t', 9902)) return ""; return "<br><iframe src=\"http://player.bilibili.com/player.html?isOutside=true&aid=113544087477778&bvid=BV1rtzKYxEWt&cid=27008435804&p=1\" scrolling=\"no\" border=\"0\" frameborder=\"no\" framespacing=\"0\" allowfullscreen=\"true\"></iframe>" }], "blank", ["row", [["buyable", 31], ["buyable", 32], ["buyable", 33], ["buyable", 34], ["buyable", 35], ["buyable", 36]]], ["row", [["buyable", 41], ["buyable", 42], ["buyable", 43], ["buyable", 44], ["buyable", 45], ["buyable", 46]]], ["row", [["buyable", 51], ["buyable", 52], ["buyable", 53], ["buyable", 54], ["buyable", 55], ["buyable", 56]]],
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
    layerShown() { return true },
    uselsee_function() { alert("关注QqQe308喵，关注QqQe308谢谢喵"); return "关注QqQe308喵，关注QqQe308谢谢喵" }
/*0.0.0.2版本正好写到这个层级第2221行*/})



// You can delete the second name from each option if internationalizationMod is not enabled.
// You can use function i18n(text, otherText) to return text in two different languages. Typically, text is English and otherText is Chinese. If changedDefaultLanguage is true, its reversed