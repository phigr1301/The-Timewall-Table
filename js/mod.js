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
	num: "0.0.0.1",
	name: "时间墙",
}

function changelog(){
	return i18n(`
		<br><br><br><h1>更新日志:</h1><br>(不存在<span style='color: red'><s>剧透警告</s></span>)<br><br>
		<span style="font-size: 17px;">
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
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

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


	if (inChallenge('t', 12)) gain = gain.div(2)
	if (inChallenge('t', 22)) gain = gain.pow(0.5)
	if (inChallenge('t', 31)) gain = gain.pow(player.t.c5Effect)

	

	if (gain.gte(100000)) gain = gain.div(100000).pow(getSoftcap1()).mul(100000)
	if (gain.gte(1e9)) gain = gain.div(1e9).pow(getSoftcap2()).mul(1e9)
	if (gain.gte(1e18)) gain = gain.div(1e18).pow(getSoftcap3()).mul(1e18)
	if (gain.gte("1.7977e308")) gain = gain.div("1.7977e308").pow(getSoftcap4()).mul("1.7977e308")
	return gain
}

function getSoftcap1() {
	let sc1 = new Decimal(0.3)
	if (getBuyableAmount('t', 21).gt(0)) sc1 = sc1.add(buyableEffect('t', 21))
	return sc1
}

function getSoftcap2() {
	let sc2 = new Decimal(0.3)
	return sc2
}
function getSoftcap3() {
	let sc3 = new Decimal(0.2)
	return sc3
}
function getSoftcap4() {
	let sc4 = new Decimal(0.05)
	return sc4
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() {
	return {
		devMode: "Antimatter",
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
	let a = '点数: ' + format(player.points) + ' |  当前残局: 到达1.79e308时间墙（Beta残局*：到达1e7蚂蚁）<br>'; if (getPointGen().gte(100000)) a += '点数获取已达到软上限1e5，超出部分^' + format(getSoftcap1()) + '!<br>'; if (getPointGen().gte(1e9)) a += '点数获取已达到2重软上限1e9，超出部分^' + format(getSoftcap2()) + '!<br>'; if (getPointGen().gte(1e18)) a += '点数获取已达到3重软上限1e18，超出部分^' + format(getSoftcap3()) + '!<br>'; a+='<br>*Beta残局是指非正式版本的残局，不会触发Endgame。'; return a;
}

// Determines when the game "ends"
function isEndgame() {
	return player.t.points.gte("1.7978e308")
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
