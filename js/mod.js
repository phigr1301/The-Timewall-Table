let modInfo = {
	name: "The Time Wall Table",
	nameI18N: "时间墙页",// When you enabled the internationalizationMod, this is the name in the second language
	id: "Timewalltable",
	author: "ArcaeawArcaeae308",
	pointsName: "points",
	pointsNameI18N: "点数",
	modFiles: ["layers.js", "tree.js", "func.js"],

	internationalizationMod: true,
	// When enabled, it will ask the player to choose a language at the beginning of the game
	changedDefaultLanguage: false,
	// Changes the mod default language. false -> English, true -> Chinese

	forceOneTab: false,// Enable Single-Tab Mode (This feature doesn't work as smoothly as you might expect; it's designed for experts)
	showTab: 'tree-node',// If forceOneTab is enabled, it will always show this page when the page is refreshed

	initialStartPoints: new Decimal ("1.7977e308"), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

var colors = {
	button: {
		width: '250px',// Table Button
		height: '40px',// Table Button
		font: '25px',// Table Button
		border: '3px'// Table Button
	},
	default: {
		1: "#ffffff",//Branch color 1
		2: "#bfbfbf",//Branch color 2
		3: "#7f7f7f",//Branch color 3
		color: "#dfdfdf",
		points: "#ffffff",
		locked: "#bf8f8f",
		background: "#0f0f0f",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
	},
}

// Set your version in num and name
let VERSION = {
	num: "0.0.0.3",
	name: "时间墙",
}

function changelog(){
	return i18n(`
		<br><br><br><h1>更新日志:</h1><br>(不存在<span style='color: red'><s>剧透警告</s></span>)<br><br>
		<span style="font-size: 17px;">
			<h3>0.0.0.3 时间墙之始</h3><br>
				- 不知道写啥<br>
				- 残局：解锁时间墙星系，e2221只蚂蚁^2<br><br><br>
			<h3>0.0.0.2 时间墙之始</h3><br>
				- 不知道写啥<br>
				- 残局：解锁QqQe308<br><br><br>
			<h3>0.0.0.1 时间墙之始</h3><br>
				- 增加了一个层级！<br>
				- 灵感来源：反物质维度、时间墙树、禁言增量页<br>
				- 残局：到达1.79e308时间墙<br><br><br>


			<h3><s>你应该自己写这个</s></h3><br><br>
			<h3>v3.0 - 史无前例的改动</h3><br>
				- 开发了 The Modding Table, 这何尝不是一种TMT<br>
			<br><br>
		`, `
		<br><br><br><h1>ChangeLog:</h1><br>(No<span style='color: red'><s> Spoiler Warning!</s></span>)<br><br>
		<span style="font-size: 17px;">
			<h3><s>YOU SHOULD WRITE THIS YOURSELF</s></h3><br><br>
			<h3>v3.0 - Unprecedented changes</h3><br>
				- Developed The Modding Table, Which, you could say, is another form of TMT<br>
			<br><br>
	`, false)
} 

function winText(){
	return i18n(`你暂时完成了游戏!`, `Congratulations! You have reached the end and beaten this game, but for now...`, false)
}

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything","uselsee_function"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return hasUpgrade('t',11)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return zero

	let gain = new Decimal(0.0035)

	if (hasUpgrade('t', 32)) gain = gain.add(0.0003)
	if (hasUpgrade('t', 33)) gain = gain.add(0.0003)
	if (hasUpgrade('t', 34)) gain = gain.add(0.0003)
	if (hasUpgrade('t', 73)) gain = gain.add(0.003)
	if (inChallenge('t', 21)) gain = gain.sub(0.006)
	if (hasChallenge('t', 21)) gain = gain.add(0.01)
	if (hasUpgrade('t', 104)) gain = gain.add(0.03)
	if (hasUpgrade('t', 111)) gain = gain.add(0.05)
	if (getBuyableAmount('t', 56).gt(0)) gain = gain.add(2085)
	if (hasUpgrade('t', 163)) gain = gain.add(1e6)
	if (hasUpgrade('t', 233)) gain = gain.add(1e40)
	if (hasUpgrade('t', 245)) gain = gain.add(1e75)

	if (hasUpgrade('t', 21)) gain = gain.mul(1.25)
	if (hasUpgrade('t', 22)) gain = gain.mul(1.25)
	if (hasUpgrade('t', 23)) gain = gain.mul(1.25)
	if (hasUpgrade('t', 24)) gain = gain.mul(1.25)
	if (hasUpgrade('t', 25)) gain = gain.mul(1.25)
	if (hasUpgrade('t', 21)&&hasUpgrade('t',95)) gain = gain.mul(1.25)
	if (hasUpgrade('t', 22) && hasUpgrade('t', 95)) gain = gain.mul(1.25)
	if (hasUpgrade('t', 23) && hasUpgrade('t', 95)) gain = gain.mul(1.25)
	if (hasUpgrade('t', 24) && hasUpgrade('t', 95)) gain = gain.mul(1.25)
	if (hasUpgrade('t', 25) && hasUpgrade('t', 95)) gain = gain.mul(1.25)
	if (hasUpgrade('t', 61)) gain = gain.mul(upgradeEffect('t', 61))
	if (hasUpgrade('t', 65)) gain = gain.mul(upgradeEffect('t', 65))
	if (player.t.sacrificedforfalse.gte(20000) && !inChallenge('t', 22)) gain = gain.mul(player.t.sacrificedforfalse.sub(20000).div(10000).add(1))
	if (getBuyableAmount('t', 32).gt(0)) gain = gain.mul(buyableEffect('t', 32))
	if (hasUpgrade('t', 122)) gain = gain.mul(upgradeEffect('t', 122))
	if (hasUpgrade('t', 124)) gain = gain.mul(upgradeEffect('t', 124))
	if (hasUpgrade('t', 151)) gain = gain.mul(layers.t.d2Mult())
	if (hasUpgrade('t', 164)) gain = gain.mul(1e6)

	if (hasUpgrade('t', 35) && gain.lt(1)) gain = gain.pow(0.9)
	if (inChallenge('t', 11) && gain.lt(1)) gain = gain.pow(1.2)
	if (hasChallenge('t', 11) && gain.lt(1)) gain = gain.pow(0.9)
	if (hasUpgrade('t', 51) && gain.lt(1) && player.points.lt(1)) gain = gain.pow(0.6)
	if (hasUpgrade('t', 53) && gain.lt(1) && player.points.lt(1)) gain = gain.pow(0.8)
	if (hasUpgrade('t', 55) && gain.lt(1) && player.points.lt(1)) gain = gain.pow(0.9)
	if (hasUpgrade('t', 62) && gain.lt(1) && player.points.lt(1)) gain = one
	if (hasUpgrade('t', 63) && gain.lt(10) && player.points.lt(1)) gain = ten

	if (player.t.sacrificedforfalse.gte(30000) && gain.gt(1) && !inChallenge('t', 22)) gain = gain.pow(1.2)
	if (hasUpgrade('t', 93) && gain.gt(1)) gain = gain.pow(1.2)
	if (hasUpgrade('t', 94) && gain.gt(1)) gain = gain.pow(1.05)
	if (hasUpgrade('t', 121) && gain.gt(1)) gain = gain.pow(2)
	if (hasUpgrade("t", 135) && gain.gt(1)) gain = gain.pow(upgradeEffect("t", 134))
	if (hasUpgrade("t", 141) && gain.gt(1)) gain = gain.pow(1.2)
	if (hasUpgrade("t", 184) && gain.gt(1)) gain = gain.pow(1.01)
	if (hasUpgrade("t", 204) && gain.gt(1)) gain = gain.pow(1.035)
	if (hasUpgrade("t", 6002) && gain.gt(1)) gain = gain.pow(layers.t.QqQeffect())
	if (getBuyableAmount('t', 107).gt(0) && gain.gt(1)) gain = gain.pow(1.8)
	if (hasUpgrade("t", 251) && gain.gt(1)) gain = gain.pow(3)


	if (inChallenge('t', 12)) gain = gain.div(2)
	if (inChallenge('t', 22)) gain = gain.pow(0.5)
	if (inChallenge('t', 31)) gain = gain.pow(player.t.c5Effect)
	if (inChallenge('t', 41)) gain = gain.pow(0.25)


	player.pointgain_unsoftcapped = gain

	if (gain.gte(100000)&&!hasUpgrade('t',241)) gain = gain.div(100000).pow(getSoftcap1()).mul(100000)
	if (gain.gte(1e9) && !hasUpgrade('t', 242)) gain = gain.div(1e9).pow(getSoftcap2()).mul(1e9)
	if (gain.gte(1e18) && !hasUpgrade('t', 243)) gain = gain.div(1e18).pow(getSoftcap3()).mul(1e18)
	if (gain.gte("1.7977e308")) gain = gain.div("1.7977e308").pow(getSoftcap4()).mul("1.7977e308")


	player.pointgain_4softcapped = gain


	if (gain.log10().gte(500)) gain = ten.pow(gain.log10().div(500).pow(getSoftcap5()).mul(500))
	if (gain.log10().gte(2000)) gain = ten.pow(gain.log10().div(2000).pow(getSoftcap6()).mul(2000))
	return gain
}

function getSoftcap1() {
	let sc1 = new Decimal(0.3)
	if (getBuyableAmount('t', 21).gt(0)) sc1 = sc1.add(buyableEffect('t', 21))
	if(hasUpgrade('t',152))sc1=sc1.add(0.05)
	return sc1
}

function getSoftcap2() {
	let sc2 = new Decimal(0.3)
	if (getBuyableAmount('t', 43).gt(0)) sc2 = n(0.3473)
	if (buyableEffect('t', 21).gt(0.2)) sc2 = sc2.add(buyableEffect('t', 21).sub(0.2))
	if (hasUpgrade('t', 152)) sc2 = sc2.add(0.05)
	return sc2
}
function getSoftcap3() {
	let sc3 = new Decimal(0.2)
	if (buyableEffect('t', 21).gt(0.2) && getBuyableAmount('t', 55).gt(0)) sc3 = sc3.add(buyableEffect('t', 21).sub(0.2).div(2))
	if (hasUpgrade('t', 152)) sc3 = sc3.add(0.05)
	return sc3
}
function getSoftcap4() {
	let sc4 = new Decimal(0.05)
	if (getBuyableAmount('t', 103).gt(0)) sc4 = sc4.add(buyableEffect('t', 103))
	if (hasUpgrade('t', 224)) sc4 = sc4.add(0.1)
	return sc4
}
function getSoftcap5() {
	let sc5 = new Decimal(0.75)
	return sc5
}
function getSoftcap6() {
	let sc6 = new Decimal(0.25)
	return sc6
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() {
	return {
		devMode: "Antimatter",
		pointgain_unsoftcapped: zero,
		pointgain_4softcapped: zero,
}}

// Display extra information at the top of the page
var displayThings = [
	function() {
		if(options.ch==undefined && modInfo.internationalizationMod==true){return '<big><br>You should choose your language first<br>你需要先选择语言</big>'}
		return '<div class="res">'+displayThingsRes()+'</div><br><div class="vl2"></div></span>'
	}
]

// You can write code here to easily display information in the top-left corner
function displayThingsRes(){
	let a = '点数: ' + format(player.points) + ' |  当前残局: 解锁时间墙星系'; if (isEndgame()) a += " |  你通关了当前版本！"; a += "<br>"; if (getPointGen().gte(100000) && !hasUpgrade('t', 241)) a += '点数获取已达到软上限1e5，超出部分^' + format(getSoftcap1()) + '!<br>'; if (getPointGen().gte(1e9) && !hasUpgrade('t', 242)) a += '点数获取已达到2重软上限1e9，超出部分^' + format(getSoftcap2()) + '!<br>'; if (getPointGen().gte(1e18) && !hasUpgrade('t', 243)) a += '点数获取已达到3重软上限1e18，超出部分^' + format(getSoftcap3()) + '!<br>'; if (getPointGen().gte("1.7977e308")) a += '你的点数获取超过无限啦！超出部分^' + format(getSoftcap4()) + '!<br>'; if (getPointGen().gte("1e500")) a += '不行，膨胀太快了，必须限制一下了，点数获取超过1e500的部分指数^' + format(getSoftcap5()) + '!<br>'; if (getPointGen().gte("1e2000")) a += '膨胀还是太快了，点数获取超1e2000的部分指数^' + format(getSoftcap6()) + '!<br>'; return a;
}

// Determines when the game "ends"
function isEndgame() {
	return hasUpgrade('t',6003)
}

function getPointsDisplay(){
	let a = ''
	if(player.devSpeed && player.devSpeed!=1){
		a += options.ch ? '<br>游戏速率: '+format(player.devSpeed)+'x' : '<br>Dev Speed: '+format(player.devSpeed)+'x'
	}
	if(player.offTime!==undefined){
		a += options.ch ? '<br>离线加速剩余时间: '+formatTime(player.offTime.remain) : '<br>Offline Time: '+formatTime(player.offTime.remain)
	}
	a += '<br>'
	if(!(options.ch==undefined && modInfo.internationalizationMod==true)){
		a += `<span class="overlayThing">${(i18n("你有", "You have", false))} <h2 class="overlayThing" id="points"> ${format(player.points)}</h2> ${i18n(modInfo.pointsName, modInfo.pointsNameI18N)}</span>`
		if(canGenPoints()){
			a += `<br><span class="overlayThing">(`+(tmp.other.oompsMag != 0 ? format(tmp.other.oomps) + " OoM" + (tmp.other.oompsMag < 0 ? "^OoM" : tmp.other.oompsMag > 1 ? "^" + tmp.other.oompsMag : "") + "s" : formatSmall(getPointGen()))+`/sec)</span>`
		}
		a += `<div style="margin-top: 3px"></div>`
	}
	a += tmp.displayThings
	a += '<br><br>'
	return a
}

// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(86400) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
