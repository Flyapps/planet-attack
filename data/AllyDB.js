var allAllies = {
"allies": [
	{
		"type": "Basic",
		"hp": 5, 
		"damage": 3,
		"cost": 20,
		"cooldown": 1,
		"idleFrames": [0],
		"actionFrames": [1],
		"hurtFrames": [2],
		"iconFrame": 4,
		"unlockLevel": 1,
		"unlockDescription": "something"
	},
	{
		"type": "Double_Whammy",
		"hp": 5, 
		"damage": 5,
		"cost": 45,
		"cooldown": 1,
		"idleFrames": [3],
		"actionFrames": [4],
		"hurtFrames": [5],
		"iconFrame": 3,
		"unlockLevel": 11,
		"unlockDescription": "something"
		
	},
	{
		"type": "Shield",
		"hp": 20, 
		"damage": 0,
		"cost": 35,
		"idleFrames": [9],
		"actionFrames": [],
		"hurtFrames": [10],
		"iconFrame": 5,
		"unlockLevel": 15,
		"unlockDescription": "something"
	},
	{
		"type": "Mine",
		"hp": 5, 
		"damage": 54,
		"cost": 35,
		"idleFrames": [11],
		"actionFrames": [12],
		"hurtFrames": [],
		"iconFrame": 1,
		"unlockLevel": 7,
		"unlockDescription": "something"
	},
	{
		"type": "Laser",
		"hp": 5, 
		"damage": 9,
		"cost": 65,
		"cooldown": 3,
		"idleFrames": [6],
		"actionFrames": [7],
		"hurtFrames": [8],
		"iconFrame": 2,
		"unlockLevel": 21,
		"unlockDescription": "something"
	},
	{
		"type": "Resource",
		"hp": 3, 
		"damage": 0,
		"cost": 10,
		"idleFrames": [13],
		"actionFrames": [],
		"hurtFrames": [14],
		"iconFrame": 0,
		"unlockLevel": 2,
		"unlockDescription": "something"
	},
]};

function AllyDB() {
}

AllyDB.prototype.getAllAllies = function() {
	return allAllies.allies;
}
