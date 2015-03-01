function VRInstructions() {
	this.visible = false;

	this.object3d = new THREE.Object3D();

	this.object3d.visible = this.visible;

	var layout = this.makeLayout();

	this.object3d.add(layout);

	return this;
}


VRInstructions.prototype.makeLayout = function() {
	var holder = new THREE.Object3D();

	// setup size variables that will be used for most HUD elements
	var radius = 0.6;
	var leftEdge = 215;


	// instructions


	//make loading animation frames
	var b1Pivot = new THREE.Object3D();
	var b1 = VRUIKit.makeFrame( 0.1, 0.1, 0.1, false, false, true, 0.0015 );
	Utils.shuffleArray( b1.children );
	b1.position.set( 0, 0, 0-radius );
	b1Pivot.add( b1 );
	// bracketPivot.rotation.set( 0, -20*Math.PI/180, 0 );
	holder.add( b1Pivot );

	var b2Pivot = new THREE.Object3D();
	var b2 = VRUIKit.makeFrame( 2, 1, 0.1, false, false, true, 0.0015 );
	Utils.shuffleArray( b2.children );
	b2.position.set( 0, 0, 0-radius );
	b2Pivot.add( b2 );
	// bracketPivot.rotation.set( 0, -20*Math.PI/180, 0 );
	holder.add( b2Pivot );


	// make progress bar
	var progress = VRUIKit.makeBand( radius, 0.0075, leftEdge, 30, 0, null, 0.5 );
	progress.material.map = THREE.ImageUtils.loadTexture( 'images/instructions/progressbar-1.png', THREE.UVMapping, function( tex )
		{
	      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
	      tex.repeat.set( 5, 0.1 );
	      tex.offset.set( 0, 0 );
		});
	holder.add( progress );


	// make loading indicator frame

	var loading_pivot = new THREE.Object3D();
	var loading = VRUIKit.makeFrame( 0.15, 0.15, 0.15, true, true, true, 0.0015 );
	// shuffle( loading.children ); // shuffles order in which the frame pieces draw in
	loading.position.set( 0, -0.15, 0-radius );
	loading_pivot.add( loading );
	loading_pivot.rotation.set( 0, -30*Math.PI/180, 0 );
	holder.add( loading_pivot );


	// make loading indicator sphere

	var geometry = new THREE.SphereGeometry( 0.065, 20, 10 );
	var material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true } );
	var loading_indicator = new THREE.Mesh( geometry, material );
	loading.add( loading_indicator );


	// var geo = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
	// var mat = new THREE.MeshBasicMaterial( {color: 0xff0000} );
	// var cube = new THREE.Mesh( geo, mat );
	// cube.position.z = -2;
	// holder.add( cube );

	return holder;
}

VRInstructions.prototype.show = function() {
	if (!this.visible) {
		this.object3d.visible = this.visible = true;
	}
}

VRInstructions.prototype.hide = function() {
	this.object3d.visible = this.visible = false;
};