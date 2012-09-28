<!doctype html>
<html>
	<head>
		<title>The Secret World Skill Wheel</title>
		<script type="text/javascript" src="http://code.jquery.com/jquery-1.7.2.min.js"></script>
		<script type="text/javascript" src="js/util.js"></script>
		<script type="text/javascript" src="js/skillCell.js"></script>
		<script type="text/javascript" src="js/skills.js"></script>
		<script type="text/javascript" src="js/deck.js"></script>
		<script type="text/javascript" src="js/skillTemplate.js"></script>

		<!--[if IE]>
		  <script type="text/javascript" src="js/lib/excanvas.compiled.js"></script>
		<![endif]-->

		<link rel="stylesheet" type="text/css" media="screen" href="css/screen.css" />
		<link rel="stylesheet" type="text/css" media="screen" href="css/skill_wheel.css" />
		<link href='http://fonts.googleapis.com/css?family=Voltaire' rel='stylesheet' type='text/css' />
	</head>
	<body>
		<div id="header">
			<p><a href="http://ebvcth.com">Encyclopedia Brown vs. Cthulhu</a> &raquo; Skill Wheel</p>
		</div>
		<div class="wrap">
			<a name="top"></a>
			<div id="cell-details">
				<!--<div style="float: right"><a href="#" class="button">Reset all Skills</a></div>-->
				<a id="saveBuild" href="#" class="button">Save this Build</a>
				<h1 id="cellName"></h1>
				<h2 id="cellTitle">Weapon Type</h2>
				<hr />
				<ol id="cell-abilities">
					<li class="ability">Select a cell from the skill wheel to begin.</li>
				</ol>
			</div>
			<div id="wrap-right">
				<div id="canvas-cheat">
					<canvas id="skillWheel"></canvas>
					<script type="text/javascript" src="js/skillWheel.js"></script>
				</div>
				<div id="ap-tally">
					<h2>AP Spent/Budget</h2>
					<span id="ap-allocated">0</span>/<span id="ap-budget">&infin;</span>
				</div>
				<div id="skills-tray">
					<div id="tooltip"><h1>{skillName}</h1> <hr /><p>{skillDescription}</p></div>
					<div id="active-skills">
						<h2>Active</h2>
						<div id="active-1" class="skill">1</div>
						<div id="active-2" class="skill">2</div>
						<div id="active-3" class="skill">3</div>
						<div id="active-4" class="skill">4</div>
						<div id="active-5" class="skill">5</div>
						<div id="active-6" class="skill">6</div>
						<div id="active-7" class="skill">7</div>
					</div>

					<div id="passive-skills">
						<h2>Passive</h2>
						<div id="passive-1" class="skill">1</div>
						<div id="passive-2" class="skill">2</div>
						<div id="passive-3" class="skill">3</div>
						<div id="passive-4" class="skill">4</div>
						<div id="passive-5" class="skill">5</div>
						<div id="passive-6" class="skill">6</div>
						<div id="passive-7" class="skill">7</div>
					</div>
				</div>

				<a href="#top">Back to top</a>
			</div>
		</div>
	</body>
</html>
