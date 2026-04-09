
var IMAGES_BASE_URL = "images/";

// Caches images
var Images = {
	DEFAULT_IMAGE: new Image(),
	imageCache: [],
	getImage: function(imageName) {
		if (imageName === '') {
			return Images.DEFAULT_IMAGE;
		}
		var imagePath = IMAGES_BASE_URL + imageName;
		var image = Images.imageCache[imagePath];
		if (!image) {
			image = new Image();
			image.src = imagePath;
		}
		return image;
	}
};

Images.DEFAULT_IMAGE.src = IMAGES_BASE_URL + "noimage.png";
