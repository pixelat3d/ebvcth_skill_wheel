var canvas = document.getElementById( 'skillWheel' );
var context = canvas.getContext( '2d' );
var canvasLeft = 0;
var canvasTop = 0;
var pointsSpent = 0;
var totalPoints = 252;
var skillBlob = skillBlob;
canvas.width = 1000;
canvas.height = 1000;

function skillWheel( context ) {
	this.colors = {
		blue: '#0000FF',
		red: '#FF0000', 
		green: '#00FF00'
	};

	this.tierCount = 4;
	this.tier1CellCount = 3;
	this.tier2CellCount = 18;
	this.tier3CellCount = 12;
	this.tier4CellCount = 57;

	this.tier1 = new Array( );
	this.tier2 = new Array( );
	this.tier3 = new Array( );
	this.tier4 = new Array( );

	for( var i = 0; i < this.tier1CellCount; i++ ) {
		this.tier1.push( new cell( 1, skillBlob ) );
	}

	for( var i = 0; i < this.tier2CellCount; i++ ) {
		this.tier2.push( new cell( 2, skillBlob ) );
	}
	for( var i = 0; i < this.tier3CellCount; i++ ) { 
		this.tier3.push( new cell( 3, skillBlob ) );
	}
	for( var i = 0; i < this.tier4CellCount; i++ ) {
		this.tier4.push( new cell( 4, skillBlob ) );
	}

	context.scale( 0.74, 0.74 );

	this.drawWheel = function( mouseX, mouseY, eventType ) {
		var i = 0;
		for( cell in this.tier1 ) {
			this.tier1[cell].draw( context, i, mouseX, mouseY, eventType );
			i++;
		}

		i = 0;
		for( cell in this.tier2 ) {
			this.tier2[cell].draw( context, i, mouseX, mouseY, eventType);
			i++;
		}

		i = 0;
		for( cell in this.tier3 ) {
			this.tier3[cell].draw( context, i, mouseX, mouseY, eventType  );
			i++;
		}

		i = 0;
		for( cell in this.tier4 ) {
			this.tier4[cell].draw( context, i, mouseX, mouseY, eventType);
			i++;
		} 

		i = 0;
		for( cell in this.tier5 ) {
			this.tier5[cell].draw( context, i, mouseX, mouseY, eventType);
			i++;
		}
	}

	this.purchaseAbility = function( tier, cell, branch ) {
		// get the cost of the ability.
		var skill = skillBlob.skillAt( tier, cell, branch );

		if( skill.cost <= (build.budget - build.spent) ) {
			build.addAbility( skill, tier, cell, branch );
		} else {
			alert( 'Not Enouh AP for that skill!' );
		}
	}

	this.refundAbility = function( tier, cell, branch ) {

	}

	this.cellPurchaseCount = function( tier, cell ) {
		//TODO: This.
	}
}

var skillWheel = new skillWheel( context );
skillWheel.drawWheel( );

$( function( ) {						
	$( '#skillWheel' ).mousemove( 
		function( e ) {
			var relX = relY = 0.0;
			var parentOffset = $(this).parent().offset();
			canvasLeft = parentOffset.left; 
			canvasTop = parentOffset.top;

			relX = e.pageX - parentOffset.left;
			relY = e.pageY - parentOffset.top;

			context.clearRect( 0, 0, canvas.width, canvas.height );
			skillWheel.drawWheel( relX, relY, 0 );
		}
	);

	$( 'li.ability' ).live({
		mouseenter: function( ) {
			if( !$( this ).children( 'div.ability-right' ).children( 'div.skillEquipper:first' ).is( ':visible' ) ) {
				$( this ).children( 'div.ability-right' ).children( 'div.skillEquipper:first' ).toggle( );
			}
			return( false );
		}, 
		mouseleave: function( ) {
			$( this ).children( 'div.ability-right' ).children( 'div.skillEquipper:first' ).toggle( );
			return( false );
		}
	});

	$( '#skills-tray .skill' ).live({
		mouseenter: function( e ) {
			var skillId = $( this ).attr( 'id' );
			var type = $( this ).attr( 'id' );
			var skill;
			type = type.substring( 0, type.length - 2 );
			skillId = parseInt( skillId.substring( skillId.length - 1 ) ) - 1;

			skill = ( type == 'active' ) ? deck.active[skillId] : deck.passive[skillId];
			if( typeof skill === 'undefined' ) {
				$( '#tooltip h1:first' ).text( 'No Skill in Slot' );
				$( '#tooltip p:first' ).text( 'Fill this slot' );
			} else {
				$( '#tooltip h1:first' ).text( skill.title );
				if( skill.description == '' ) {
					skill.description = 'No Description.';
				}

				$( '#tooltip p:first' ).text( skill.description );
			}

			$( '#tooltip' ).css( 'top', e.pageY - 150 );
			$( '#tooltip' ).css( 'left', e.pageX + 25 );
			$( '#tooltip' ).css( 'position', 'absolute' );
			$( '#tooltip' ).css( 'opacity', '0.9' );
			$( '#tooltip' ).stop( ).fadeIn( );

			return( false );
		},

		mouseleave: function( e ) {
			$( '#tooltip' ).stop( ).fadeOut( );
		}
	});

	$( '#skills-tray' ).live({
		mouseleave: function( e ) {
			$( '#tooltip' ).fadeOut( 'fast' );
		}
	});

	$( 'a.equipSlot' ).live( 'click',
		function( ) {
			var loc = $( this ).parents( 'li:first' ).attr( 'data-where' );
			var locSplit = loc.split( ':' );
			var skill = skillBlob.skillAt( locSplit[0], locSplit[1], locSplit[2] );

			deck.addAbility( skill, parseInt( $( this ).text( ) ) );

			return( false );
		}
	);

	/*
	// TODO: this.
	$( 'a.equipSlot' ).live({
		mouseenter: function( ) {
			return( false );
		}, 
		mouseleave: function( ) {
			return( false );
		}
	}); */

	$( '#skillWheel' ).click( 
		function( e ) {
			var relX = relY = 0.0;
			var parentOffset = $(this).parent().offset();
			canvasLeft = parentOffset.left; 
			canvasTop = parentOffset.top;

			relX = e.pageX - parentOffset.left;
			relY = e.pageY - parentOffset.top;

			context.clearRect( 0, 0, canvas.width, canvas.height );
			skillWheel.drawWheel( relX, relY, 1 );
		}
	);

	$( 'a#saveBuild' ).live( 'click',
		function( ) {
			//loop through everything and save it. 
			var buildString = build.serialize( );
			var deckString =  deck.serialize( );

			document.write( 'http://www.ebvcth.com/skill_wheel.php?d='+deckString+'&b='+buildString );
			return( false );
		}
	);

	$( '.purchaseSkill' ).live( 'click', 
		function( ) {
			var loc = $( this ).parents( 'li.ability:first' ).attr( 'data-where' );
			var next = $( this ).parents( 'li.ability:first' ).next( 'li.ability' );
			var locSplit = loc.split( ':' );

			$( this ).before( equipSkillTemplate );
			$( this ).prev( '.skillEquipper' ).show( );
			$( this ).fadeOut( 'fast' );
			if( next.length ) {
				$( this ).clone( ).appendTo( next.children( '.ability-right:first' ) ).fadeIn( 'fast' );
				next.children( 'img:first' ).remove( );
			}

			skillWheel.purchaseAbility( parseInt( locSplit[0] ), parseInt( locSplit[1] ), parseInt( locSplit[2] ) );
			return false;
		}
	);

	$( window ).resize( 
		function( ) {
			$( '#skillWheel' ).mousemove( );
		}
	);

	build.unserialize( );
	deck.unserialize( );
} );
