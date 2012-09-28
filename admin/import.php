<?php

	function import( ) {
		$data = file_get_contents( './abilities.txt' )or die( 'error loading ability source!' );

		$ability_counts = array ( 0, 3, 18, 12, 57 ); //tier 0 *unused*, tier 1, tier 2, tier 3, tier 4
		$tier_count = 5;
		$col_count = 0;

		$skills = array( );
		$skill_cell_arr = array( 
			'title' => '', 
			'weapon' => '',
			'abilities' => array ( )
		);

		$ability_arr = array (
				'title' => '',
				'cost' => '', 
				'type' => '',
				'weapon' => '',
				'tier' => 0,
				'cell' => 0,
				'branch' => 0,
				'cast_time' => 0,
				'cool_down' => 0,
				'elite'	=> false,
				'locked' => true, 
				'purchased' => false,
				'description' => ''
		);

		// Special cases (things you can click but arean't really things.
		// In the game these would be the things that zoom into a section 
		// of the wheel.
		for( $i = 0; $i < $tier_count; $i++ ) {
			$skills[1][0] = array( 'title' => 'Ranged', 'abilities' => array( ) );
			$skills[1][1] = array( 'title' => 'Magic', 'abilities' => array( ) );
			$skills[1][2] = array( 'title' => 'Melee', 'abilities' => array( ));

			$skills[3][0] = array( 'title' => 'Assault Rifles', 'abilities' => array( ));
			$skills[3][1] = array( 'title' => 'Pistols', 'abilities' => array( ));
			$skills[3][2] = array( 'title' => 'Shotguns', 'abilities' => array( ));
			$skills[3][3] = array( 'title' => 'Misc.', 'abilities' => array( ));
			$skills[3][4] = array( 'title' => 'Elementalism', 'abilities' => array( ));
			$skills[3][5] = array( 'title' => 'Chaos', 'abilities' => array( ));
			$skills[3][6] = array( 'title' => 'Blood Magic', 'abilities' => array( ));
			$skills[3][7] = array( 'title' => 'Misc.', 'abilities' => array( ));
			$skills[3][8] = array( 'title' => 'Fists', 'abilities' => array( ));
			$skills[3][9] = array( 'title' => 'Hammers', 'abilities' => array( ));
			$skills[3][10] = array( 'title' => 'Blades', 'abilities' => array( ));
			$skills[3][11] = array( 'title' => 'Misc.', 'abilities' => array( ));
		}

		$data = explode( "\n", $data );
		$keys = array_shift( $data ); 
		$col_count = count( $keys );
		$row_count = count( $data ) - 1;

		$current_cell = -1;
		$current_branch = 0;
		$locked = true;

		for( $i = 0; $i < $row_count; $i++ ) {
			$cols = explode( "\t", $data[$i] );
			$temp_cell = $skill_cell_arr;
			$temp_skill = $ability_arr;

			if( $current_cell != $cols[1] ) {
				$temp_cell = $skill_cell_arr;
				$temp_cell['title'] = $cols[2];
				$temp_cell['weapon'] = $cols[3];

				$skills[$cols[0]][$cols[1]] = $temp_cell;
				$current_cell = $cols[1];
			}

			//Default to unlocking the fist skill in the first tier.
			if( $current_branch == 0 && $cols[0] == 2 ) {
				$temp_skill['locked'] = false;
			}

			//Specal cases (misc. trees)
			if( $cols[0] == 4 && $cols[1] == 18 && $current_branch == 0 ) {
				$temp_skill['locked'] = false;
			}

			if( $cols[0] == 4 && $cols[1] == 37 && $current_branch == 0 ) {
				$temp_skill['locked'] = false;
			}

			if( $cols[0] == 4 && $cols[1] == 56 && $current_branch == 0 ) {
				$temp_skill['locked'] = false;
			}

			$temp_skill['title'] = $cols[4];
			$temp_skill['tier'] = $cols[0];
			$temp_skill['cell'] = $cols[1];
			$temp_skill['weapon'] = $cols[3];
			$temp_skill['cost'] = $cols[5];
			$temp_skill['type'] = $cols[6];
			$temp_skill['branch'] = $current_branch;
			$temp_skill['elite'] = (bool)$cols[7];
			$temp_skill['cast_time'] = $cols[11];
			$temp_skill['cool_down'] = $cols[12];

			$temp_skill['description'] = str_replace( '"', '', $cols[15] );

			// Save the temporary values to the return array.
			$skills[$cols[0]][$cols[1]]['abilities'][] = $temp_skill;
			$current_branch++;

			if( $current_branch > 6 ) {
				$current_branch = 0;
			}
		}

		$boilerplate = file_get_contents( 'skills-boilerplate.js' );
		$boilerplate = str_replace( '{SKILLDATA}', json_encode( $skills ), $boilerplate );

		if( file_put_contents( './skills.js', $boilerplate  ) ) {
			echo 'File updated! Copy over to main directory';
		}
	}

	import();
?>
