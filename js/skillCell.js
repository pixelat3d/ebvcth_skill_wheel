	function cell( tier, skillObject ) {
		this.color = 'red';
		this.lineWidth = 20;
		this.locked = false;
		this.active = false;
		this.gap_size = 0.0025;
		this.id = -1;
		this.tier = tier;

		this.animation = { 
			interval: 0, 
			step: 0, 
			steps: 5,
			stepSize: 1 
		};

		cell.prototype.resetAngles = function( tier, id ) {
			switch( tier ) {
				case 1:
					this.radius = 345; //345
					this.startAngle = 1.46;
					this.endAngle = 0.88;
					this.angleStep = ( this.startAngle - this.endAngle ) + this.gap_size;
					this.lineWidth = 30;
				break; 

				case 2:
					this.radius = 380; //380
					this.startAngle = 1.46;
					this.endAngle = (1.4301/6) + (this.gap_size * 6*8.4712) + 1; //1.36545 (manual)
					this.angleStep = ( this.startAngle - this.endAngle ) + this.gap_size;
					this.lineWidth = 25;
				break;

				case 3:
					this.radius = 445;
					this.startAngle = 1.46;
					this.endAngle = (1.4301/6) + (this.gap_size*12.013) + 1; // 1.26839
					this.angleStep = ( this.startAngle - this.endAngle ) + this.gap_size;
					this.lineWidth = 25;
				break;

				case 4:
					this.radius = 475;
					this.startAngle = 1.46;
					this.endAngle = 1.4301;
					this.angleStep = ( this.startAngle - this.endAngle ) + this.gap_size;
					this.lineWidth = 20;
				break;
			}
		}

		this.resetAngles( this.tier );

		this.drawTextAlongArc = function (context, str, centerX, centerY, radius, angle){
		    context.save();
		    context.translate( centerX, centerY );
		    context.rotate( -1 * angle / 2 );
		    context.rotate( -1 * ( angle / str.length ) / 2 );

		    for ( var n = 0; n < str.length; n++ ) {
			context.rotate(angle / str.length);
			context.save();
			context.translate(0, -1 * radius);

			var char = str[n];
			context.fillText( char, 0, 0 );
			context.restore( );
		    }

		    context.restore( );
		}

		cell.prototype.isMouseInCell = function( context, mouseX, mouseY, fudgeFactor ) {
			var retval = false;
			if( !this.active ) {
				for( var j = mouseX - fudgeFactor; j < mouseX + fudgeFactor; j++ ) {
					for( var n = mouseY - fudgeFactor; n < mouseY + fudgeFactor; n++ ) {
						if( context.isPointInPath( j, n ) ) {
							return( true );
						}
					}
				}
			}

			return context.isPointInPath( mouseX, mouseY );
		}

		this.draw = function( context, id, mouseX, mouseY, eventType ) {
			if( this.tier == 1 ) {

				if( id == 1 ) {
					this.startAngle -= ( this.gap_size * (16 * this.tier) ) + ( this.gap_size * 6 ) * 3;
					this.endAngle -= (this.gap_size * (16 * this.tier)) + ( this.gap_size * 6 ) * 3;
					this.color = 'blue';
				}

				if( id == 2 ) {
					this.startAngle -= ( this.gap_size * (16 * this.tier) ) + ( this.gap_size * 8.6 ) * 6;
					this.endAngle -= (this.gap_size * (16 * this.tier)) + ( this.gap_size * 8.6 ) * 6; 
					this.color = 'orange';
				}
			}

			// Misc. row handling for tier 2 (leave blank spots in the cicle)
			if( this.tier == 2 ) {

				if( id > 5 ) {
					this.startAngle -= ( this.gap_size * (16 * this.tier) ) + ( this.gap_size * 2);
					this.endAngle -= (this.gap_size * (16 * this.tier)) + ( this.gap_size * 2 );
					if( this.color != skillWheel.colors.green ) {
						this.color = 'blue';
					}
				}

				if( id > 11 ) {
					this.startAngle -= ( this.gap_size * (16 * this.tier) ) + ( this.gap_size * 2);
					this.endAngle -= (this.gap_size * (16 * this.tier)) + ( this.gap_size * 2 );
					if( this.color != skillWheel.colors.green ) {
						this.color = 'orange';
					}
				}
			}

			if( this.tier == 3 ) {
				if( id == 3 || id == 7 || id == 11 ) {
					this.startAngle -= this.gap_size * 4;
					this.endAngle += (this.gap_size * (16 * this.tier) );
					this.color = '#88C425';
				}


				if( id > 3 ) {
					this.startAngle += ( this.gap_size * (16 * this.tier) ) - ( this.gap_size * 4);
					this.endAngle += ( this.gap_size * (16 * this.tier) ) - ( this.gap_size * 4 );
					if( this.color != '#88C425' ) {
						this.color = 'blue';
					}
				}

				if( id > 7 ) {
					this.startAngle += ( this.gap_size * (16 * this.tier) ) - ( this.gap_size * 4);
					this.endAngle += ( this.gap_size * (16 * this.tier) ) - ( this.gap_size * 4 );
					if( this.color != '#88C425' ) {
						this.color = 'orange';
					}
				}
			}

			if( this.tier == 4 ) {
				if( id == 18 || id == 37 || id == 56 ) {
					this.startAngle -= this.gap_size * 4;
					this.endAngle -= this.gap_size * 16;

					this.color = '#88C425';
				}

				if( id > 18 ) {
					this.startAngle -= this.gap_size * 20;
					this.endAngle -= this.gap_size * 20;
					if( this.color != '#88C425' ) {
						this.color = 'blue';
					}
				}

				if( id > 37 ) {
					this.startAngle -= this.gap_size * 20;
					this.endAngle -= this.gap_size * 20;

					if( this.color != '#88C425' ) {
						this.color = 'orange';
					}
				}

				// Because i'm bad at math.
				if( id == 56 ) {
					this.startAngle -= 0.001;
					this.endAngle -= 0.002;
				}
			}

			startOffset = this.startAngle - (this.angleStep * id );
			endOffset = this.endAngle - ( this.angleStep * id );

			context.beginPath( );
			context.lineWidth = this.lineWidth; 

			context.arc( 500, 500, this.radius, startOffset * Math.PI, endOffset * Math.PI, true );

			var fudgeFactor = 5.0;
			if( this.isMouseInCell( context, mouseX, mouseY, fudgeFactor) ) {

				/*
			        context.font = "40px Calibri";
				var textString = 'Tier: '+tier+' Cell: '+cell;
				context.fillText( textString, 500, 500 ); */

				if( eventType == 1 ) { // clicked.
					context.strokeStyle = 'pink';
					this.active = true;

					var skillSet = skillBlob.skillAt( tier, id );
					$( '#cellTier' ).text( this.tier+':'+this.id );
					$( '#cellName' ).text( skillSet.weapon );
					$( '#cellTitle' ).text( skillSet.title );


					$( 'ol#cell-abilities li' ).each( 
						function( ) {
							$( this ).remove( );
						}
					);

					//Start parsing 'dat template.
					for( var i = 0; i < skillSet.abilities.length; i++ ) {
						var tempString = skillTemplate;
						tempString = tempString.replace( /\{tier\}/g, tier );
						tempString = tempString.replace( /\{cell\}/g, cell );
						tempString = tempString.replace( /\{branch\}/g, i );
						tempString = tempString.replace( /\{cost\}/g, skillSet.abilities[i].cost  );
						tempString = tempString.replace( /\{name\}/g, skillSet.abilities[i].title );
						tempString = tempString.replace( /\{type\}/g, skillSet.abilities[i].type );
						tempString = tempString.replace( /\{cost\}/g, skillSet.abilities[i].cost );
						tempString = tempString.replace( /\{description\}/g, skillSet.abilities[i].description );

						//Cooldown Images.
						if( skillSet.abilities[i].type == 'Active' ) {
							var coolDownString = '';
							var casTimeString = '';

							tempString = tempString.replace( /\{cooldownImage\}/g, cooldownImageTemplate );
							tempString = tempString.replace( /\{castTimeImage\}/g, castTimeImageTemplate );
							skillSet.abilities[i].cool_down = parseFloat( skillSet.abilities[i].cool_down );
							skillSet.abilities[i].cast_time = parseFloat( skillSet.abilities[i].cast_time );

							if( skillSet.abilities[i].cast_time == 0 ) {
								castTimeString = 'Instant';
							} else {
								castTimeString = skillSet.abilities[i].cast_time;
								castTimeString += ( skillSet.abilities[i].cast_time == 1 ) ? ' second' : ' seconds';
							}

							if( skillSet.abilities[i].cool_down == 0 ) {
								coolDownString = 'Instant';
							} else {
								coolDownString = skillSet.abilities[i].cool_down;
								coolDownString += ( skillSet.abilities[i].cool_down == 1 ) ? ' second' : ' seconds';
							}

							tempString = tempString.replace( /\{castTime\}/g, castTimeString );
							tempString = tempString.replace( /\{cooldown\}/g, coolDownString );
						} else {
							tempString = tempString.replace( /\{cooldownImage\}/g, '' );
							tempString = tempString.replace( /\{castTimeImage\}/g, '' );
							tempString = tempString.replace( /\{cooldown\}/g, '' );
							tempString = tempString.replace( /\{castTime\}/g, '' );
						}

						if( skillSet.abilities[i].elite == true ) {
							tempString = tempString.replace( /\{elite\}/g, ' elite' );
						} else {
							tempString = tempString.replace( /\{elite\}/g, '' );
						}

						if( skillSet.abilities[i].locked == false && skillSet.abilities[i].purchased == false ) {
							var purchaseLink = purchaseSkillButtonTemplate;
							purchaseLink = purchaseLink.replace( /\{cost\}/g, skillSet.abilities[i].cost );
							tempString = tempString.replace( /\{purchasePlaceholder\}/g, purchaseLink );
						}

						if( skillSet.abilities[i].locked ) {
							var lockedImage = lockedSkillImageTemplate;
							tempString = tempString.replace( /\{lockedPlaceholder\}/g, lockedImage );
						} else {
							tempString = tempString.replace( /\{lockedPlaceholder\}/g, '' ); 
						}

						if( skillSet.abilities[i].locked == false && skillSet.abilities[i].purchased == true ) {
							var skillEquipper = equipSkillTemplate;
							tempString = tempString.replace( /\{purchasePlaceholder\}/g, skillEquipper );
						} else {
							tempString = tempString.replace( /\{purchasePlaceholder\}/g, '' ); 
						}

						$( 'ol#cell-abilities' ).append( tempString );
					}

					//console.log( skillBlob.skillAt( tier, id ) );
					//console.log( 'Clicked: '+tier+':'+id );
				} else {
					context.strokeStyle = 'black';
				}

				if( tier == 1 || tier == 3 ) {
					this.active = false;
					context.strokeStyle = this.color;
				}
			} else {
				if( eventType == 1 ) {
					this.active = false;
				}

				$( '#skillWheel' ).css( 'cursor', 'default' );
				context.strokeStyle = this.color;
			}

			if( this.active == true ) {
				context.lineWidth = this.lineWidth + 5;
				context.strokeStyle = 'pink';
			}

			context.textAlgin = 'center';
			context.font = "20pt Calibri";

			context.stroke( );
//			this.drawTextAlongArc( context, "T", 500, 500, this.radius, endOffset * Math.PI );
			context.closePath( );

			if( this.id < 0 ) {
				this.id = id; 
			}

			this.resetAngles( this.tier, this.id );
//			console.log( 'Drew Cell( ) Tier:'+tier+' index:'+id+' startOffset: '+startOffset+' endOffset:' + endOffset );	
		}
	}
