var skillBlob = {
	//Automated script builder is a GO.
	skillList: [
		{SKILLDATA}
	],

	skillAt: function( tier, cell, branch ) {
		if( cell >= 0 ) {
			if( branch >= 0 ) {
				return( this.skillList[0][tier][cell].abilities[branch] );
			} else { 
				return( this.skillList[0][tier][cell] );
			}
		} else {
			return( this.skillList[0][tier] );
		}
	}

}
