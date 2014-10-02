portfolio = {}

portfolio.ImageSection = function(config){
	this._init(config);
}

portfolio.ImageSection.prototype = {
	_init: function(config){
		this.image = config.image;
		this.width = this.image.width;
		this.height = 100;
		this.crossfadeClipWidth = 150;
		this.drawn = false;
		this.x = config.x || 0;
		/**
		 * This is passed by reference, so it references the same context
		 * as other imagesections (porfolio.ScrollingLogo.context).
		*/
		this.context = config.context;
	},
	draw: function(pos){
		pos = pos || {};
		var x = pos.x || this.x;
		var y = pos.y || 0;
		this.x = x;
		this.end = this.x + this.width;
		this.leftClipPosition = {
			start: this.x,
			end: this.x + this.crossfadeClipWidth
		};
		this.rightClipPosition = {
			start: (this.x + this.width) - this.crossfadeClipWidth,
			end: this.end
		};
		this.context.drawImage(this.image, x, y, this.width, this.height);
		this.leftClip = this.getLeftClip();
		this.rightClip = this.getRightClip();
		this.drawn = true;
	},
	/**
	 * Get the first or last 150px clip of this image.
	*/
	getCrossfadeClip: function(side){
		var clipStartPosition = side === 'left' ? this.leftClipPosition.start : this.rightClipPosition.start;
		var clip = this.context.getImageData(clipStartPosition, 0, this.crossfadeClipWidth, this.height);
		return clip;
	},

	getLeftClip: function(){
		return this.getCrossfadeClip('left');
	},

	getRightClip: function(){
		return this.getCrossfadeClip('right');
	}
}

generateCrossfade = function(pos, width, height, right, left){
	var workingCanvas = document.createElement('canvas'),
	len = 4 * width * height,
	offset = new Array(len),
    delta = new Array(len);
	workingCanvas.width = width;
	workingCanvas.height = height;
	var workingContext = workingCanvas.getContext('2d'),
	result = workingContext.createImageData(width, height);

	if (typeof Int16Array !== 'undefined') {
        offset = new Int16Array(len);
        delta = new Int16Array(len);
    }

    for (i = 0; i < len; i += 1) {
        offset[i] = left.data[i];
        delta[i] = right.data[i] - left.data[i];
        result.data[i] = 255;
    }

    var i, factor,
  		r = result.data,
		canvasHeight = height,
		canvasWidth = width;

    for (var y = 0; y < canvasHeight; ++y) {
		for (var x = 0; x < canvasWidth; ++x) {
			factor -= (.02 / 3);
			i = (y * canvasWidth + x) * 4;
			r[i] = offset[i] + delta[i] * factor;
            r[i + 1] = offset[i + 1] + delta[i + 1] * factor;
            r[i + 2] = offset[i + 2] + delta[i + 2] * factor;
		}
    	// favor the first image at the beginning of each row.
		factor = .99;
	}
	return {
		image: result,
		pos: pos
	}
}

drawCrossfade = function(image, position, context){
	context.putImageData(image, position, 0);
}

portfolio.ScrollingLogo = function(){
	this.maskText = 'RYAN JURGENSEN';
	this.imageDataSource = "/data/allphotos.json";
	this.imageCount = 18;
	this.images = [];
	this.imagePaths = [];
	this.imageSections = [];
	this.$canvas = $('#background');
	this.canvas = this.$canvas[0];
	this.context = this.canvas.getContext('2d');
	this.mask = $('#mask')[0];
	this.maskContext = this.mask.getContext('2d');


	WebFont.load({
		google: {
			families: [ 'Raleway:300,800,700,900:latin', 'Lato:400,700:latin', 'Arvo::latin' ]
		},
		active: $.proxy(function() {
			if($(window).width() > 1024){
				this.start();
			}
			else{
				this.showFallback();
			}
		}, this)
	});
}

portfolio.ScrollingLogo.prototype.start = function(){
	$(document).scroll(function(e){
	    var scrollAmount = $(window).scrollTop();
	    var documentHeight = $(document).height();
	    var scrollPercent = ((scrollAmount) / documentHeight);
	    this.scrollToPercent(scrollPercent);
	}.bind(this));

	$(window).on('resize', this.resize.bind(this));

	$('#fancy-logo').addClass('dynamic');
	$('#stop-logo').click(this.showFallback);
	$('#reload-logo').click(this.reload.bind(this));

	this.createMask();
	this.loadImages();
}

portfolio.ScrollingLogo.prototype.buildCompositeBackground = function(){
	var i, previous, pos, is,
		nextPos = 0;

	if (this.imageSections.length === 0 ) {
		for (var i = this.images.length - 1; i >= 0; i--) {
			this.imageSections.push(new portfolio.ImageSection({
				image: this.images[i],
				context: this.context,
			}));
		};
	}

	// Draw each image section, and create and insert the crossfaded sections.
	for(i=0; i < this.imageSections.length; i++){
		is = this.imageSections[i];
		previous = i!=0 ? this.imageSections[i-1] : null;
		pos = i!=0 ? previous.rightClipPosition.start : 0;
		is.draw({x: pos});
		if(previous){
			var cf = generateCrossfade(is.x, is.crossfadeClipWidth, is.height, previous.rightClip, is.leftClip);
			drawCrossfade(cf.image, cf.pos, this.context);
		}
	}
	this.totalBackgroundWidth = is.rightClipPosition.end;
	this.$canvas.fadeIn('slow');

}

portfolio.ScrollingLogo.prototype.createMask = function(){
	var width = $(window).width(), textSize;
	var textSize = width >= 1260 ? '140px' : '120px';
	this.maskContext.fillStyle = '#fff';
	this.maskContext.fillRect(0, 0, width, 150);
    var oldGCO = this.maskContext.globalCompositeOperation;
	this.maskContext.globalCompositeOperation = "destination-out";
	this.maskContext.fillStyle = "blue";
	this.maskContext.textAlign = 'center';
	this.maskContext.font = "800 " +textSize+ " 'Raleway'";
	this.maskContext.fillText(this.maskText, width / 2, 105);

	this.maskContext.closePath();

	this.maskContext.globalCompositeOperation = oldGCO;
	this.maskContext.strokeStyle = "#C0C0C0";
	this.maskContext.strokeText(this.maskText, width / 2, 105);
	$('#mask').fadeIn('fast');
}

// When loaded on mobile, or if they manually diable the logo.
portfolio.ScrollingLogo.prototype.showFallback = function(){
	$('#fancy-logo canvas').hide();
	$('#fancy-logo h1').show();
	$('#fancy-logo').removeClass('dynamic');

}

portfolio.ScrollingLogo.prototype.hideFallback = function(){
	$('#fancy-logo h1').hide();
	$('#mask').show();
	$('#background').fadeIn('slow');
	$('#fancy-logo').addClass('dynamic');

}

portfolio.ScrollingLogo.prototype.resize = function(){
	if ($(window).width() < 1024){
		this.showFallback();
	}
	else{
		this.createMask();
		this.hideFallback();
	}
}

portfolio.ScrollingLogo.prototype.reload = function(){
	this.imageSections = [];
	this.images = this.getRandomImages(this.images);
	this.buildCompositeBackground();
}

portfolio.ScrollingLogo.prototype.scrollToPercent = function(scrollPercent){
	if(scrollPercent >= 0){
		this.$canvas.css('left', (scrollPercent * this.totalBackgroundWidth) * -1);
	}
}

portfolio.ScrollingLogo.prototype.loadImages = function(){
	this.loadedImageCount = 0;
	$.getJSON( this.imageDataSource, $.proxy(function(data) {
		this.imagePaths = this.getRandomImages(data.images);
		for(var i = 0; i < this.imagePaths.length; i++){
			this.loadImage(this.imagePaths[i]);
		}
	}, this)).error(function(jqXHR, status, error) {
		console.log("Image loading error: " + status);
	});
}

portfolio.ScrollingLogo.prototype.loadImage = function(imagePath){
	var img = new Image();
	img.onload = $.proxy(function(){
		this.images.push(img);
		if(++this.loadedImageCount == this.imagePaths.length){
			this.buildCompositeBackground();
		}
	}, this);
	img.src = imagePath;
}

portfolio.ScrollingLogo.prototype.getRandomImages = function(allImagePaths) {
    var counter = allImagePaths.length, temp, index;
    while (counter--) {
        index = (Math.random() * counter) | 0;

        temp = allImagePaths[counter];
        allImagePaths[counter] = allImagePaths[index];
        allImagePaths[index] = temp;
    }

	allImagePaths.length = this.imageCount;
	return allImagePaths;
}
