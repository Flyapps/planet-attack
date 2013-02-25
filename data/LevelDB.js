var allLevels = {

"levels": [
	{
		"id": 1,
		"initialBalance": 60,
		"resourceCollectAmount": 15,
		"resourceCollectInterval": 7,
		"content": [

			{"type": "wait", "duration": 2},
			{"type": "waveNotice", "number": 1},
			{"type": "attack", "duration": 5, "rate": "constant", "enemies": [{"id": "Basic", "amount": 1}]},
			{"type": "wait", "duration": 5},
			{"type": "attack", "duration": 5, "rate": "constant", "enemies": [{"id": "Basic", "amount": 2}]},
			{"type": "wait", "duration": 1},
		]
	},
	{
		"id": 2,
		"initialBalance": 30,
		"resourceCollectAmount": 5,
		"resourceCollectInterval": 7,
		"content": [
			
			{"type": "wait", "duration": 2},
			{"type": "waveNotice", "number": 1},
			{"type": "attack", "duration": 5, "rate": "constant", "enemies": [{"id": "Basic", "amount": 1}]},
			{"type": "wait", "duration": 5},
			{"type": "attack", "duration": 5, "rate": "constant", "enemies": [{"id": "Basic", "amount": 1}]},
			{"type": "wait", "duration": 2},

			{"type": "wait", "duration": 15},
			{"type": "waveNotice", "number": 0},
			{"type": "attack", "duration": 5, "rate": "constant", "enemies": [{"id": "Basic", "amount": 1}]},
			{"type": "wait", "duration": 5},
			{"type": "attack", "duration": 5, "rate": "constant", "enemies": [{"id": "Basic", "amount": 1}]},
			{"type": "wait", "duration": 1},
		]
	},
	{
		"id": 3,
		"initialBalance": 30,
		"resourceCollectAmount": 5,
		"resourceCollectInterval": 7,
		"content": [

			{"type": "wait", "duration": 2},
			{"type": "waveNotice", "number": 1},
			{"type": "attack", "duration": 15, "rate": "constant", "enemies": [{"id": "Basic", "amount": 2}]},
			{"type": "wait", "duration": 1},

			{"type": "wait", "duration": 20},
			{"type": "waveNotice", "number": 0},
			{"type": "attack", "duration": 15, "rate": "constant", "enemies": [{"id": "Basic", "amount": 8}]},
			{"type": "wait", "duration": 1},
		]
	},
	{
		"id": 4,
		"initialBalance": 30,
		"resourceCollectAmount": 5,
		"resourceCollectInterval": 7,
		"content": [

			{"type": "wait", "duration": 2},
			{"type": "waveNotice", "number": 1},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Basic", "amount": 4}]},
			{"type": "wait", "duration": 1},

			{"type": "wait", "duration": 15},
			{"type": "waveNotice", "number": 0},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Fast", "amount": 6}]},
			{"type": "wait", "duration": 1},
		]
	},
	{
		"id": 5,
		"initialBalance": 30,
		"resourceCollectAmount": 5,
		"resourceCollectInterval": 7,
		"content": [
			{"type": "wait", "duration": 2},
			{"type": "waveNotice", "number": 1},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Basic", "amount": 5}]},
			{"type": "wait", "duration": 2},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Fast", "amount": 6}]},

			{"type": "wait", "duration": 10},
			{"type": "waveNotice", "number": 0},
			{"type": "attack", "duration": 20, "rate": "constant", "enemies": [{"id": "Basic", "amount": 20}, {"id": "Fast", "amount": 10}]},
			{"type": "wait", "duration": 1},
		]
	},
	{
		"id": 6,
		"initialBalance": 30,
		"resourceCollectAmount": 5,
		"resourceCollectInterval": 7,
		"content": [
			{"type": "wait", "duration": 4},
			{"type": "waveNotice", "number": 1},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "Basic", "amount": 7}]},

			{"type": "wait", "duration": 8},
			{"type": "waveNotice", "number": 2},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Fast", "amount": 12}, {"id": "Basic", "amount": 9}]},

			{"type": "wait", "duration": 10},
			{"type": "waveNotice", "number": 0},
			{"type": "attack", "duration": 5, "rate": "constant", "enemies": [{"id": "strong", "amount": 1}]},
		]
	},
	{
		"id": 7,
		"initialBalance": 30,
		"resourceCollectAmount": 5,
		"resourceCollectInterval": 7,
		"content": [
			{"type": "wait", "duration": 4},
			{"type": "waveNotice", "number": 1},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "Basic", "amount": 10}]},
			{"type": "attack", "duration": 20, "rate": "constant", "enemies": [{"id": "Fast", "amount": 7}]},

			{"type": "wait", "duration": 8},
			{"type": "waveNotice", "number": 2},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Fast", "amount": 16}, {"id": "Basic", "amount": 20}]},
		

			{"type": "wait", "duration": 10},
			{"type": "waveNotice", "number": 0},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Fast", "amount": 16}, {"id": "Basic", "amount": 10},{"id": "strong", "amount": 5}]},
		]
	},
	{
		"id": 8,
		"initialBalance": 30,
		"resourceCollectAmount": 5,
		"resourceCollectInterval": 7,
		"content": [
			{"type": "wait", "duration": 3},
			{"type": "waveNotice", "number": 1},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "Basic", "amount": 10}]},
			{"type": "attack", "duration": 24, "rate": "constant", "enemies": [{"id": "Fast", "amount": 9}]},

			{"type": "wait", "duration": 10},
			{"type": "waveNotice", "number": 2},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "Fast", "amount": 10}, {"id": "strong", "amount": 6}]},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Basic", "amount": 20}]},

			{"type": "wait", "duration": 10},
			{"type": "waveNotice", "number": 0},
			{"type": "attack", "duration": 50, "rate": "constant", "enemies": [{"id": "Fast", "amount": 20}, {"id": "Basic", "amount": 30},{"id": "strong", "amount": 6}]},
		]
	},
	{
		"id": 9,
		"initialBalance": 30,
		"resourceCollectAmount": 5,
		"resourceCollectInterval": 7,
		"content": [
			{"type": "wait", "duration": 3},
			{"type": "waveNotice", "number": 1},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "Basic", "amount": 10}]},
			{"type": "wait", "duration": 2},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Strong", "amount": 5}]},

			{"type": "wait", "duration": 20},
			{"type": "waveNotice", "number": 2},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "Fast", "amount": 10}, {"id": "Basic", "amount": 15}]},
			{"type": "attack", "duration": 50, "rate": "constant", "enemies": [{"id": "Fast", "amount": 9}, {"id": "Basic", "amount": 7}, {"id": "strong", "amount": 9}]},

			{"type": "wait", "duration": 7},
			{"type": "waveNotice", "number": 0},
			{"type": "attack", "duration": 45, "rate": "constant", "enemies": [{"id": "Fast", "amount": 20}, {"id": "Basic", "amount": 15},{"id": "strong", "amount": 7}]},
			{"type": "attack", "duration": 20, "rate": "constant", "enemies": [{"id": "Fast", "amount": 15}, {"id": "Basic", "amount": 15},{"id": "strong", "amount": 11}]},
		]
	},
	{
		"id": 10,
		"initialBalance": 30,
		"resourceCollectAmount": 5,
		"resourceCollectInterval": 7,
		"content": [
			{"type": "wait", "duration": 3},
			{"type": "waveNotice", "number": 1},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "Basic", "amount": 10}]},
			{"type": "wait", "duration": 6},
			{"type": "attack", "duration": 20, "rate": "constant", "enemies": [{"id": "Shooting", "amount": 6}]},

			{"type": "wait", "duration": 10},
			{"type": "waveNotice", "number": 2},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "Basic", "amount": 15}, {"id": "strong", "amount": 5}]},
			{"type": "wait", "duration": 10},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "Basic", "amount": 25}, {"id": "Shooting", "amount": 10}]},

			{"type": "wait", "duration": 10},
			{"type": "waveNotice", "number": 0},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Shooting", "amount": 12}]},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Shooting", "amount": 8}, {"id": "strong", "amount": 15}]},
		]
	},
	{
		"id": 11,
		"initialBalance": 30,
		"resourceCollectAmount": 5,
		"resourceCollectInterval": 7,
		"content": [
			{"type": "wait", "duration": 3},
			{"type": "waveNotice", "number": 1},
			{"type": "attack", "duration": 35, "rate": "constant", "enemies": [{"id": "Basic", "amount": 10}]},
			{"type": "wait", "duration": 6},
			{"type": "attack", "duration": 20, "rate": "constant", "enemies": [{"id": "Fast", "amount": 10}]},

			{"type": "wait", "duration": 10},
			{"type": "waveNotice", "number": 0},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "Basic", "amount": 15}, {"id": "Fast", "amount": 8}]},
			{"type": "wait", "duration": 10},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "Fast", "amount": 10}, {"id": "Basic", "amount": 18}, {"id": "Shooting", "amount": 15}]},

		]
	},
	{
		"id": 12,
		"initialBalance": 30,
		"resourceCollectAmount": 5,
		"resourceCollectInterval": 7,
		"content": [
			{"type": "wait", "duration": 3},
			{"type": "waveNotice", "number": 1},
			{"type": "attack", "duration": 35, "rate": "constant", "enemies": [{"id": "Basic", "amount": 11}]},
			{"type": "wait", "duration": 6},
			{"type": "attack", "duration": 25, "rate": "constant", "enemies": [{"id": "Fast", "amount": 10}, {"id": "Basic", "amount": 10}]},
			{"type": "wait", "duration": 10},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Fast", "amount": 5}, {"id": "Shooting", "amount": 8}]},

			{"type": "wait", "duration": 10},
			{"type": "waveNotice", "number": 2},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "strong", "amount": 15}]},

			{"type": "wait", "duration": 15},
			{"type": "waveNotice", "number": 0},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "Fast", "amount": 15}, {"id": "Basic", "amount": 20}]},
			{"type": "wait", "duration": 7},
			{"type": "attack", "duration": 35, "rate": "constant", "enemies": [{"id": "Shooting", "amount": 20}, {"id": "Fast", "amount": 15}]},
		]
	},
	{
		"id": 13,
		"initialBalance": 30,
		"resourceCollectAmount": 5,
		"resourceCollectInterval":7,
		"content": [
			{"type": "wait", "duration": 3},
			{"type": "waveNotice", "number": 1},
			{"type": "attack", "duration": 35, "rate": "constant", "enemies": [{"id": "Basic", "amount": 12}]},
			{"type": "wait", "duration": 6},
			{"type": "attack", "duration": 25, "rate": "constant", "enemies": [{"id": "strong", "amount": 12}]},
			{"type": "wait", "duration": 12},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Fast", "amount": 8}, {"id": "Basic", "amount": 20}]},

			{"type": "wait", "duration": 10},
			{"type": "waveNotice", "number": 2},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Basic", "amount": 25}]},
			{"type": "wait", "duration": 10},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Fast", "amount": 10}, {"id": "Shooting", "amount": 7}]},

			{"type": "wait", "duration": 15},
			{"type": "waveNotice", "number": 0},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "Shooting", "amount": 12}, {"id": "Fast", "amount": 10}, {"id": "strong", "amount": 6}]},
		]
	},
	{
		"id": 14,
		"initialBalance": 30,
		"resourceCollectAmount": 5,
		"resourceCollectInterval": 7,
		"content": [
			{"type": "wait", "duration": 3},
			{"type": "waveNotice", "number": 1},
			{"type": "attack", "duration": 35, "rate": "constant", "enemies": [{"id": "Basic", "amount": 11}]},
			{"type": "wait", "duration": 6},
			{"type": "attack", "duration": 25, "rate": "constant", "enemies": [{"id": "Fast", "amount": 10}, {"id": "strong", "amount": 3}]},

			{"type": "wait", "duration": 15},
			{"type": "waveNotice", "number": 0},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "Fast", "amount": 14}, {"id": "Basic", "amount": 15}]},
			{"type": "wait", "duration": 4},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Bomb", "amount": 12}, {"id": "strong", "amount": 10}]},

		]
	},
	{
		"id": 15,
		"initialBalance": 30,
		"resourceCollectAmount": 5,
		"resourceCollectInterval": 7,
		"content": [
			{"type": "wait", "duration": 3},
			{"type": "waveNotice", "number": 1},
			{"type": "attack", "duration": 35, "rate": "constant", "enemies": [{"id": "Basic", "amount": 12}]},
			{"type": "wait", "duration": 6},
			{"type": "attack", "duration": 35, "rate": "constant", "enemies": [{"id": "Basic", "amount": 6}, {"id": "Bomb", "amount": 12}]},

			{"type": "wait", "duration": 10},
			{"type": "waveNotice", "number": 2},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "Fast", "amount": 7}, {"id": "strong", "amount": 5}]},
			{"type": "wait", "duration": 4},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Basic", "amount": 10}]},

			{"type": "wait", "duration": 15},
			{"type": "waveNotice", "number": 0},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "Basic", "amount": 15}, {"id": "strong", "amount": 7}]},
			{"type": "wait", "duration": 6},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Fast", "amount": 10}, {"id": "Bomb", "amount": 10}]},
		]
	},
	{
		"id": 16,
		"initialBalance": 30,
		"resourceCollectAmount": 5,
		"resourceCollectInterval": 7,
		"content": [
			{"type": "wait", "duration": 3},
			{"type": "waveNotice", "number": 1},
			{"type": "attack", "duration": 35, "rate": "constant", "enemies": [{"id": "Basic", "amount": 13}]},
			{"type": "wait", "duration": 6},
			{"type": "attack", "duration": 25, "rate": "constant", "enemies": [{"id": "Fast", "amount": 10}, {"id": "strong", "amount": 5}]},
			{"type": "wait", "duration": 15},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Bomb", "amount": 6}, {"id": "Basic", "amount": 13}]},

			{"type": "wait", "duration": 10},
			{"type": "waveNotice", "number": 2},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "Basic", "amount": 12}, {"id": "strong", "amount": 6}]},
			{"type": "wait", "duration": 10},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Fast", "amount": 12}, {"id": "Bomb", "amount": 8}]},

			{"type": "wait", "duration": 15},
			{"type": "waveNotice", "number": 0},
			{"type": "attack", "duration": 50, "rate": "constant", "enemies": [{"id": "Basic", "amount": 25}, {"id": "Fast", "amount": 15}]},
			{"type": "wait", "duration": 10},
			{"type": "attack", "duration": 35, "rate": "constant", "enemies": [{"id": "strong", "amount": 10}, {"id": "Bomb", "amount": 8}]},
		]
	},
	{
		"id": 17,
		"initialBalance": 30,
		"resourceCollectAmount": 5,
		"resourceCollectInterval": 7,
		"content": [
			{"type": "wait", "duration": 3},
			{"type": "waveNotice", "number": 1},
			{"type": "attack", "duration": 35, "rate": "constant", "enemies": [{"id": "Basic", "amount": 13}]},
			{"type": "wait", "duration": 6},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Shooting", "amount": 5}, {"id": "strong", "amount": 3}]},

			{"type": "wait", "duration": 10},
			{"type": "waveNotice", "number": 2},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Fast", "amount": 8}, {"id": "Basic", "amount": 12}]},
			{"type": "wait", "duration": 10},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "Fast", "amount": 8}, {"id": "Bomb", "amount": 10}]},

			{"type": "wait", "duration": 10},
			{"type": "waveNotice", "number": 0},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "Fast", "amount": 8}, {"id": "Shooting", "amount": 6}]},
			{"type": "wait", "duration": 10},
			{"type": "attack", "duration": 25, "rate": "constant", "enemies": [{"id": "Basic", "amount": 15}, {"id": "strong", "amount": 9}]},
			{"type": "wait", "duration": 10},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Shooting", "amount": 10}, {"id": "Bomb", "amount": 8}]},
		]
	},
	{
		"id": 18,
		"initialBalance": 30,
		"resourceCollectAmount": 5,
		"resourceCollectInterval": 7,
		"content": [
			{"type": "wait", "duration": 3},
			{"type": "waveNotice", "number": 1},
			{"type": "attack", "duration": 35, "rate": "constant", "enemies": [{"id": "Basic", "amount": 13}]},
			{"type": "wait", "duration": 10},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Fast", "amount": 5}, {"id": "Shooting", "amount": 5}]},
			{"type": "wait", "duration": 10},
			{"type": "attack", "duration": 20, "rate": "constant", "enemies": [{"id": "Basic", "amount": 10}, {"id": "strong", "amount": 6}]},

			{"type": "wait", "duration": 10},
			{"type": "waveNotice", "number": 2},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Bomb", "amount": 5}, {"id": "Shooting", "amount": 6}]},
			{"type": "wait", "duration": 15},
			{"type": "attack", "duration": 25, "rate": "constant", "enemies": [{"id": "Basic", "amount": 10}, {"id": "Fast", "amount": 10}]},

			{"type": "wait", "duration": 10},
			{"type": "waveNotice", "number": 3},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Fast", "amount": 15}, {"id": "strong", "amount": 10}]},
			{"type": "wait", "duration": 15},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "Basic", "amount": 20}, {"id": "Shooting", "amount": 15}]},

			{"type": "wait", "duration": 10},
			{"type": "waveNotice", "number": 0},
			{"type": "attack", "duration": 50, "rate": "constant", "enemies": [{"id": "Fast", "amount": 10}, {"id": "Bomb", "amount": 10}, {"id": "Shooting", "amount": 10}, {"id": "strong", "amount": 9}]},
		]
	},
	{
		"id": 19,
		"initialBalance": 30,
		"resourceCollectAmount": 5,
		"resourceCollectInterval": 7,
		"content": [
			{"type": "wait", "duration": 3},
			{"type": "waveNotice", "number": 0},
			{"type": "attack", "duration": 35, "rate": "constant", "enemies": [{"id": "Basic", "amount": 13}]},
			{"type": "wait", "duration": 10},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Fast", "amount": 5}, {"id": "Bomb", "amount": 4}]},
			{"type": "wait", "duration": 7},
			{"type": "attack", "duration": 20, "rate": "constant", "enemies": [{"id": "Basic", "amount": 11}, {"id": "strong", "amount": 6}]},
			{"type": "wait", "duration": 7},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "Basic", "amount": 15}, {"id": "Fast", "amount": 10}, {"id": "Shooting", "amount": 6}]},
		]
	},
	{
		"id": 20,
		"initialBalance": 30,
		"resourceCollectAmount": 5,
		"resourceCollectInterval": 7,
		"content": [
			{"type": "wait", "duration": 3},
			{"type": "waveNotice", "number": 1},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Basic", "amount": 10}]},
			{"type": "wait", "duration": 7},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Fast", "amount": 8}, {"id": "Basic", "amount": 18}]},

			{"type": "wait", "duration": 10},
			{"type": "waveNotice", "number": 2},
			{"type": "attack", "duration": 20, "rate": "constant", "enemies": [{"id": "Stealth", "amount": 12}]},

			{"type": "wait", "duration": 7},
			{"type": "waveNotice", "number": 0},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Fast", "amount": 12}, {"id": "strong", "amount": 5}]},
			{"type": "wait", "duration": 4},
			{"type": "attack", "duration": 25, "rate": "constant", "enemies": [{"id": "Bomb", "amount": 11}, {"id": "strong", "amount": 5}]},
			{"type": "wait", "duration": 12},
			{"type": "attack", "duration": 35, "rate": "constant", "enemies": [{"id": "Stealth", "amount": 15}, {"id": "Basic", "amount": 15}]},
		]
	},
	{
		"id": 21,
		"initialBalance": 30,
		"resourceCollectAmount": 5,
		"resourceCollectInterval": 7,
		"content": [
			{"type": "wait", "duration": 3},
			{"type": "waveNotice", "number": 1},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Basic", "amount": 10}]},
			{"type": "wait", "duration": 10},
			{"type": "attack", "duration": 25, "rate": "constant", "enemies": [{"id": "Stealth", "amount": 3}, {"id": "Basic", "amount": 12}]},

			{"type": "wait", "duration": 10},
			{"type": "waveNotice", "number": 2},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "strong", "amount": 6}, {"id": "Fast", "amount": 15}]},
			{"type": "wait", "duration": 10},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Stealth", "amount": 15}, {"id": "Basic", "amount": 15}]},

			{"type": "wait", "duration": 10},
			{"type": "waveNotice", "number": 0},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Stealth", "amount": 10}, {"id": "Fast", "amount": 15}]},
			{"type": "wait", "duration": 10},
			{"type": "attack", "duration": 50, "rate": "constant", "enemies": [{"id": "strong", "amount": 10}, {"id": "Fast", "amount": 10}, {"id": "Stealth", "amount": 15}, {"id": "Basic", "amount": 15}]},
			{"type": "wait", "duration": 10},
			{"type": "attack", "duration": 35, "rate": "constant", "enemies": [{"id": "Basic", "amount": 40}]},
		]
	},
	{
		"id": 22,
		"initialBalance": 30,
		"resourceCollectAmount": 5,
		"resourceCollectInterval": 7,
		"content": [
			{"type": "wait", "duration": 3},
			{"type": "waveNotice", "number": 1},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Basic", "amount": 10}]},
			{"type": "wait", "duration": 10},
			{"type": "attack", "duration": 25, "rate": "constant", "enemies": [{"id": "Shooting", "amount": 3}, {"id": "Fast", "amount": 4}]},

			{"type": "wait", "duration": 10},
			{"type": "waveNotice", "number": 2},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "strong", "amount": 6}, {"id": "Basic", "amount": 20}]},
			{"type": "wait", "duration": 10},
			{"type": "attack", "duration": 50, "rate": "constant", "enemies": [{"id": "Stealth", "amount": 15}, {"id": "Fast", "amount": 15}]},

			{"type": "wait", "duration": 10},
			{"type": "waveNotice", "number": 0},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Shooting", "amount": 10}, {"id": "Fast", "amount": 15}]},
			{"type": "wait", "duration": 10},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "Basic", "amount": 15}, {"id": "Fast", "amount": 10}, {"id": "Stealth", "amount": 10}, {"id": "strong", "amount": 10}]},
		]
	},
	{
		"id": 23,
		"initialBalance": 30,
		"resourceCollectAmount": 5,
		"resourceCollectInterval": 7,
		"content": [
			{"type": "wait", "duration": 3},
			{"type": "waveNotice", "number": 1},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Basic", "amount": 10}]},
			{"type": "wait", "duration": 10},
			{"type": "attack", "duration": 25, "rate": "constant", "enemies": [{"id": "Bomb", "amount": 3}, {"id": "Fast", "amount": 4}]},

			{"type": "wait", "duration": 10},
			{"type": "waveNotice", "number": 2},
			{"type": "attack", "duration": 25, "rate": "constant", "enemies": [{"id": "strong", "amount": 6}, {"id": "Shooting", "amount": 6}]},
			{"type": "wait", "duration": 10},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Stealth", "amount": 12}, {"id": "Bomb", "amount": 8}]},

			{"type": "wait", "duration": 7},
			{"type": "waveNotice", "number": 3},
			{"type": "attack", "duration": 50, "rate": "constant", "enemies": [{"id": "Basic", "amount": 20}, {"id": "Fast", "amount": 10}, {"id": "Stealth", "amount": 10}]},

			{"type": "wait", "duration": 10},
			{"type": "waveNotice", "number": 0},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "Bomb", "amount": 6}, {"id": "Shooting", "amount": 6}, {"id": "Stealth", "amount": 10}, {"id": "strong", "amount": 6}]},
		]
	},
	{
		"id": 24,
		"initialBalance": 30,
		"resourceCollectAmount": 5,
		"resourceCollectInterval": 7,
		"content": [
			{"type": "wait", "duration": 3},
			{"type": "waveNotice", "number": 1},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Basic", "amount": 10}]},
			{"type": "wait", "duration": 7},
			{"type": "attack", "duration": 35, "rate": "constant", "enemies": [{"id": "Basic", "amount": 10}, {"id": "strong", "amount": 6}]},

			{"type": "wait", "duration": 10},
			{"type": "waveNotice", "number": 2},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Fast", "amount": 10}, {"id": "Shooting", "amount": 6}]},
			{"type": "wait", "duration": 10},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "Stealth", "amount": 12}, {"id": "Bomb", "amount": 5}, {"id": "Basic", "amount": 10}]},

			{"type": "wait", "duration": 7},
			{"type": "waveNotice", "number": 3},
			{"type": "attack", "duration": 25, "rate": "constant", "enemies": [{"id": "Fast", "amount": 8}, {"id": "Basic", "amount": 10}, {"id": "Shooting", "amount": 5}]},
			{"type": "wait", "duration": 7},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "strong", "amount": 8}, {"id": "Stealth", "amount": 15}]},

			{"type": "wait", "duration": 12},
			{"type": "waveNotice", "number": 0},
			{"type": "attack", "duration": 50, "rate": "constant", "enemies": [{"id": "strong", "amount": 6}, {"id": "Shooting", "amount": 15}, {"id": "Bomb", "amount": 6}]},
		]
	},
	{
		"id": 25,
		"initialBalance": 30,
		"resourceCollectAmount": 5,
		"resourceCollectInterval": 7,
		"content": [
			{"type": "wait", "duration": 3},
			{"type": "waveNotice", "number": 1},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Basic", "amount": 10}]},
			{"type": "wait", "duration": 7},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Fast", "amount": 5}, {"id": "Stealth", "amount": 4}]},

			{"type": "wait", "duration": 10},
			{"type": "waveNotice", "number": 2},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "strong", "amount": 12}]},
			{"type": "wait", "duration": 12},
			{"type": "attack", "duration": 50, "rate": "constant", "enemies": [{"id": "Shooting", "amount": 12}, {"id": "Bomb", "amount": 6}, {"id": "Stealth", "amount": 10}]},

			{"type": "wait", "duration": 7},
			{"type": "waveNotice", "number": 3},
			{"type": "attack", "duration": 35, "rate": "constant", "enemies": [{"id": "Fast", "amount": 15}]},
			{"type": "wait", "duration": 7},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "Basic", "amount": 15}, {"id": "Shooting", "amount": 10}]},

			{"type": "wait", "duration": 12},
			{"type": "waveNotice", "number": 0},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Fast", "amount": 15}, {"id": "Bomb", "amount": 8}]},
			{"type": "wait", "duration": 7},
			{"type": "attack", "duration": 45, "rate": "constant", "enemies": [{"id": "strong", "amount": 25}]},

		]
	},
	{
		"id": 26,
		"initialBalance": 30,
		"resourceCollectAmount": 5,
		"resourceCollectInterval": 7,
		"content": [
			{"type": "wait", "duration": 3},
			{"type": "waveNotice", "number": 1},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Basic", "amount": 10}]},
			{"type": "wait", "duration": 7},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Bomb", "amount": 5}]},

			{"type": "wait", "duration": 10},
			{"type": "waveNotice", "number": 2},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "Fast", "amount": 15}, {"id": "Basic", "amount": 20}]},
			{"type": "wait", "duration": 12},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Shooting", "amount": 10}, {"id": "Stealth", "amount": 15}]},

			{"type": "wait", "duration": 7},
			{"type": "waveNotice", "number": 3},
			{"type": "attack", "duration": 35, "rate": "constant", "enemies": [{"id": "Shooting", "amount": 10}, {"id": "Basic", "amount": 20}]},
			{"type": "wait", "duration": 7},
			{"type": "attack", "duration": 35, "rate": "constant", "enemies": [{"id": "Fast", "amount": 15}, {"id": "strong", "amount": 15}]},

			{"type": "wait", "duration": 12},
			{"type": "waveNotice", "number": 4},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Stealth", "amount": 11}, {"id": "Bomb", "amount": 15}]},
			{"type": "wait", "duration": 7},
			{"type": "attack", "duration": 45, "rate": "constant", "enemies": [{"id": "Basic", "amount": 45}]},

			{"type": "wait", "duration": 12},
			{"type": "waveNotice", "number": 0},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Fast", "amount": 20}, {"id": "Stealth", "amount": 20}]},
			{"type": "wait", "duration": 7},
			{"type": "attack", "duration": 60, "rate": "constant", "enemies": [{"id": "strong", "amount": 20}, {"id": "Bomb", "amount": 20}, {"id": "Shooting", "amount": 15}]},
		]
	},
	{
		"id": 27,
		"initialBalance": 30,
		"resourceCollectAmount": 5,
		"resourceCollectInterval": 7,
		"content": [
			{"type": "wait", "duration": 3},
			{"type": "waveNotice", "number": 1},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Basic", "amount": 10}]},
			{"type": "wait", "duration": 10},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Stealth", "amount": 7}]},

			{"type": "wait", "duration": 10},
			{"type": "waveNotice", "number": 2},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "Shooting", "amount": 10}, {"id": "Fast", "amount": 15}]},
			{"type": "wait", "duration": 12},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Basic", "amount": 15}, {"id": "strong", "amount": 10}, {"id": "Bomb", "amount": 4}]},

			{"type": "wait", "duration": 7},
			{"type": "waveNotice", "number": 3},
			{"type": "attack", "duration": 35, "rate": "constant", "enemies": [{"id": "Shooting", "amount": 10}, {"id": "Stealth", "amount": 20}]},
			{"type": "wait", "duration": 7},
			{"type": "attack", "duration": 35, "rate": "constant", "enemies": [{"id": "Basic", "amount": 15}, {"id": "strong", "amount": 15}]},

			{"type": "wait", "duration": 12},
			{"type": "waveNotice", "number": 4},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Stealth", "amount": 8}, {"id": "Shooting", "amount": 8}]},

			{"type": "wait", "duration": 12},
			{"type": "waveNotice", "number": 0},
			{"type": "attack", "duration": 35, "rate": "constant", "enemies": [{"id": "strong", "amount": 10}, {"id": "Bomb", "amount": 6}]},
			{"type": "wait", "duration": 10},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "Basic", "amount": 20}, {"id": "Fast", "amount": 10}]},
		]
	},
	{
		"id": 28,
		"initialBalance": 30,
		"resourceCollectAmount": 5,
		"resourceCollectInterval": 7,
		"content": [
			{"type": "wait", "duration": 3},
			{"type": "waveNotice", "number": 1},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Basic", "amount": 10}]},
			{"type": "wait", "duration": 10},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Fast", "amount": 6}, {"id": "Shooting", "amount": 5}]},

			{"type": "wait", "duration": 10},
			{"type": "waveNotice", "number": 2},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "Basic", "amount": 45}]},
			{"type": "wait", "duration": 12},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "strong", "amount": 10}, {"id": "Stealth", "amount": 10}]},

			{"type": "wait", "duration": 12},
			{"type": "waveNotice", "number": 3},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Bomb", "amount": 6}, {"id": "Fast", "amount": 10}, {"id": "Stealth", "amount": 6}]},
			{"type": "wait", "duration": 7},
			{"type": "attack", "duration": 35, "rate": "constant", "enemies": [{"id": "strong", "amount": 20}]},

			{"type": "wait", "duration": 14},
			{"type": "waveNotice", "number": 4},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "Stealth", "amount": 12}, {"id": "Shooting", "amount": 12}, {"id": "Basic", "amount": 12}]},
			{"type": "wait", "duration": 10},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Bomb", "amount": 30}]},

			{"type": "wait", "duration": 12},
			{"type": "waveNotice", "number": 0},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "strong", "amount": 15}, {"id": "Fast", "amount": 15}]},
			{"type": "wait", "duration": 10},
			{"type": "attack", "duration": 50, "rate": "constant", "enemies": [{"id": "Basic", "amount": 20}, {"id": "Fast", "amount": 20}, {"id": "Shooting", "amount": 10}, {"id": "Bomb", "amount": 10}, {"id": "strong", "amount": 5}]},
		]
	},
	{
		"id": 29,
		"initialBalance": 30,
		"resourceCollectAmount": 5,
		"resourceCollectInterval": 7,
		"content": [
			{"type": "wait", "duration": 3},
			{"type": "waveNotice", "number": 1},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Basic", "amount": 10}]},
			{"type": "wait", "duration": 11},
			{"type": "attack", "duration": 25, "rate": "constant", "enemies": [{"id": "Basic", "amount": 7}, {"id": "Bomb", "amount": 3}]},

			{"type": "wait", "duration": 10},
			{"type": "waveNotice", "number": 2},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "Stealth", "amount": 10}, {"id": "strong", "amount": 5}, {"id": "Fast", "amount": 6}]},
			{"type": "wait", "duration": 13},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Shooting", "amount": 25}]},

			{"type": "wait", "duration": 12},
			{"type": "waveNotice", "number": 3},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Basic", "amount": 20}, {"id": "Stealth", "amount": 15}]},
			{"type": "wait", "duration": 7},
			{"type": "attack", "duration": 35, "rate": "constant", "enemies": [{"id": "Fast", "amount": 20}, {"id": "Bomb", "amount": 6}]},

			{"type": "wait", "duration": 12},
			{"type": "waveNotice", "number": 0},
			{"type": "attack", "duration": 50, "rate": "constant", "enemies": [{"id": "Fast", "amount": 20}, {"id": "Shooting", "amount": 10}, {"id": "Bomb", "amount": 15}, {"id": "strong", "amount": 10}]},
		]
	},
	{
		"id": 30,
		"initialBalance": 30,
		"resourceCollectAmount": 5,
		"resourceCollectInterval": 7,
		"content": [
			{"type": "wait", "duration": 3},
			{"type": "waveNotice", "number": 1},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Basic", "amount": 10}]},
			{"type": "wait", "duration": 10},
			{"type": "attack", "duration": 35, "rate": "constant", "enemies": [{"id": "Fast", "amount": 15}]},
			{"type": "wait", "duration": 7},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "strong", "amount": 10}, {"id": "Basic", "amount": 20}]},
			{"type": "wait", "duration": 12},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Bomb", "amount": 6}, {"id": "Shooting", "amount": 10}]},
			{"type": "wait", "duration": 10},
			{"type": "attack", "duration": 30, "rate": "constant", "enemies": [{"id": "Stealth", "amount": 30}]},
			{"type": "wait", "duration": 10},
			{"type": "attack", "duration": 40, "rate": "constant", "enemies": [{"id": "Basic", "amount": 20}, {"id": "strong", "amount": 15}, {"id": "Bomb", "amount": 5}]},
			{"type": "wait", "duration": 12},
			{"type": "attack", "duration": 50, "rate": "constant", "enemies": [{"id": "Fast", "amount": 30}, {"id": "Shooting", "amount": 10}, {"id": "Stealth", "amount": 10}]},
			{"type": "wait", "duration": 10},
			{"type": "attack", "duration": 25, "rate": "constant", "enemies": [{"id": "Shooting", "amount": 15}, {"id": "strong", "amount": 6}]},
			{"type": "wait", "duration": 12},
			{"type": "attack", "duration": 60, "rate": "constant", "enemies": [{"id": "Basic", "amount": 30}, {"id": "Bomb", "amount": 10}, {"id": "Stealth", "amount": 15}, {"id": "Fast", "amount": 15}]},
			{"type": "wait", "duration": 12},
			{"type": "attack", "duration": 80, "rate": "constant", "enemies": [{"id": "Basic", "amount": 20}, {"id": "strong", "amount": 15}, {"id": "Stealth", "amount": 20}, {"id": "Fast", "amount": 15}, {"id": "Shooting", "amount": 15}]},
		]
	}
]};

function LevelDB() {
}

LevelDB.prototype.getAllLevels = function() {
	return allLevels.levels;
}
