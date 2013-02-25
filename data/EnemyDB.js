var allEnemies = {
"enemies": [
	{
		"type": "Basic",
		"hp": 18, 
		"damage": 5,
		"speed": 1,
		"creditYield": 0,
		"idleFrames": [0],
		"actionFrames": [],
		"hurtFrames": [1],
	},
	{
		"type": "Fast",
		"hp": 15, 
		"damage": 3,
		"speed": 6,
		"creditYield": 0,
		"idleFrames": [2],
		"actionFrames": [],
		"hurtFrames": [3],
	},
	{
		"type": "Strong",
		"hp": 108, 
		"damage": 5,
		"speed": 1,
		"creditYield": 0,
		"idleFrames": [4],
		"actionFrames": [],
		"hurtFrames": [5],
	},
	{
		"type": "Shooting",
		"hp": 24, 
		"damage": 1,
		"speed": 1,
		"cooldown": 2,
		"creditYield": 0,
		"idleFrames": [6],
		"actionFrames": [7],
		"hurtFrames": [8],
	},
	{
		"type": "Stealth",
		"hp": 15, 
		"damage": 5,
		"speed": 3,
		"creditYield": 0,
		"idleFrames": [10],
		"actionFrames": [9],
		"hurtFrames": [11],
	},
	{
		"type": "Bomb",
		"hp": 24, 
		"damage": 10,
		"speed": 3,
		"creditYield": 0,
		"idleFrames": [12],
		"actionFrames": [],
		"hurtFrames": [13],
	}
]};

function EnemyDB() {
}

EnemyDB.prototype.getAllEnemies = function() {
	return allEnemies.enemies;
}
