var build = {
	spent: 0,
	budget: 9999999,
	abilities: new Array( ),

	addAbility : function( skill, tier, cell, branch ) {
		var unlockTier = true;

		skillBlob.skillList[0][tier][cell].abilities[branch].purchased = true;
		skillBlob.skillList[0][tier][cell].abilities[branch].locked = false;

		if( branch < skillBlob.skillList[0][tier][cell].abilities.length - 1 ) {
			skillBlob.skillList[0][tier][cell].abilities[branch+1].locked = false;
		}

		//Check to see if the tier above is unlocked, and if so, unlock it.
		if( tier == 2 ) {
			var linkedCell = 0;

			if( cell < 17 ) {
				if( skillBlob.skillList[0][tier][cell+1].abilities[0].weapon == skill.weapon ) {
					linkedCell = cell+1;
				} else { 
					linkedCell = cell - 1;
				}
			} else {
				linkedCell = cell - 1;
			}

			for( n in skillBlob.skillList[0][tier][cell] ) {
				for( i in skillBlob.skillList[0][tier][cell][n] ) {
					if( skillBlob.skillList[0][tier][cell][n][i].purchased == false ) {
						unlockTier = false;
					}
				}
			}

			for( n in skillBlob.skillList[0][tier][linkedCell] ) {
				for( i in skillBlob.skillList[0][tier][linkedCell][n] ) {
					if( skillBlob.skillList[0][tier][linkedCell][n][i].purchased == false ) {
						unlockTier = false;
					}
				}
			}

		} else {
			unlockTier = false;
		}
		
		this.abilities.push( skill );
		this.updateCellPoints( tier, cell);
		this.spent += parseInt( skill.cost );
		this.updateCost( );



		if( unlockTier ) {
			console.log( 'You unlocked the next tier!' );
			var lowCell = 0;
			//unlock the tiers above this cell.

			if( linkedCell < cell ) {
				lowCell = linkedCell;
			} else {
				lowCell = cell;
			}

			lowCell = (lowCell * 6) - (6 * (lowCell/2));

			// Misc. Trees
			if( lowCell >= 18 ) {
				lowCell += 1;
			}

			if( lowCell >= 37 ) {
				lowCell += 1;
			}

			if( lowCell < 0 ) {
				lowCell = 0; 
			}

			var end = lowCell + 6;
			for( i = lowCell; i < end; i++ ) {
				skillBlob.skillList[0][tier+2][i].abilities[0].locked = false;
			}
		}

	},

	removeAbility: function( skill ) {
		//TODO: this.
	},

	updateCost: function( ) {
		$( '#ap-allocated' ).text( this.spent );
	},

	updateCellPoints: function( tier, cell ) {
		var cellCost = 0;
		var purchasedSkills = 0;
		var totalSkills = 7;

		for( skill in skillBlob.skillList[0][tier][cell].abilities ) {
			if( skillBlob.skillList[0][tier][cell].abilities[skill].purchased ) {
				purchasedSkills++;
				cellCost += skill.cost;
			}
		}
	},

	serialize: function( ) {
		var obj = '';
		for( n in this.abilities ) {
			obj += '{'+this.abilities[n].tier+':'+this.abilities[n].cell+':'+this.abilities[n].branch+'}';
		}

		return( obj );
	},

	unserialize: function( ) {
		var build = getParameterByName( 'b' );
		build = decodeURIComponent( build );
		console.log( 'Loading Build: '+build );
		purchasedAbilities = build.split( '}' );

		for( var i = 0; i < purchasedAbilities.length - 1; i++ ) {
			purchasedAbilities[i] = purchasedAbilities[i].substring( 1 );
			var loc = purchasedAbilities[i].split( ':' );
			var skill = skillBlob.skillAt( loc[0], loc[1], loc[2] );
			
			this.addAbility( skill, parseInt( loc[0] ), parseInt( loc[1] ), parseInt( loc[2] ) );
		}
	},

	reset: function( ) {
		//TODO: this.
		this.abilities = new Array( );
		this.budget = 999999;
		this.spent = 0;
	}
} 

var deck = {
	active: new Array( 7 ),
	passive: new Array( 7 ),

	addAbility: function( skill, slot ) {
		// TODO: Check for elites. Only can have one!
		var type = skill.type.toLowerCase( );
		var index = parseInt( slot ) - 1;
		var clearSlot = -1;
	
		if( type == 'active' ) {
			for( n in this.active ) {
				if( this.active.hasOwnProperty( n ) ) {
					if( this.active[n].title == skill.title ) {
						delete this.active[n];
						clearSlot = parseInt( n ) + 1;
					}
				}
			}

			this.active[index] = skill;
		} else {
			for( n in this.passive ) {
				if( this.passive.hasOwnProperty( n ) ) {
					if( this.passive[n].title == skill.title ) {
						//Same skill check.
						delete this.passive[n];
						clearSlot = parseInt( n ) + 1;
					}
				}
			}

			this.passive[index] = skill;
		}

		$( '#'+type+'-'+slot ).addClass( type );
		if( skill.elite ) {
			$( '#'+type+'-'+slot ).addClass( 'elite' );
		}

		$( '#'+type+'-'+clearSlot ).removeClass( type ).removeClass( 'elite' );
	},

	serialize: function( ) {
		var obj = '';
		for( n in this.active ) {
			if( !typeof this.active[n] === 'undefined' ) {
			} else {
				obj += '{'+this.active[n].tier+':'+this.active[n].cell+':'+this.active[n].branch+':'+n+'}';
			}
		}

		for( n in this.passive ) {
			if( !typeof this.passive[n] === 'undefined' ) {
			} else {
				obj += '{'+this.passive[n].tier+':'+this.passive[n].cell+':'+this.passive[n].branch+':'+n+'}';
			}
		}

		return( obj );
	},

	unserialize: function( ) {
		var deck = getParameterByName( 'd' );
		deck = decodeURIComponent( deck );

		console.log( 'Loading Deck: '+deck );
		deckSlots = deck.split( '}' );

		for( var i = 0; i < deckSlots.length - 1; i++ ) {
			deckSlots[i] = deckSlots[i].substring( 1 );

			var loc = deckSlots[i].split( ':' );
			var skill = skillBlob.skillAt( loc[0], loc[1], loc[2] );
			
			this.addAbility( skill, parseInt( loc[3] ) + 1 );
		}
	},

	reset: function( ) {
		//TODO: this.
	}
} 
