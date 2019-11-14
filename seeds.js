var mongooos = require("mongoose"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment");

//DATA FOR NEW CAMPGROUNDS
var data = [{
		name: "Clouds Rest",
		image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus elementum risus eget efficitur convallis. Maecenas rhoncus venenatis orci sit amet facilisis. Cras non aliquam enim, mattis convallis ipsum. Aenean eu arcu odio. Mauris cursus nec neque vel malesuada. Aliquam tincidunt erat sit amet lacus suscipit rutrum. Suspendisse in faucibus felis, ac rhoncus lectus. Mauris aliquam sed tellus sit amet gravida. Praesent iaculis ligula eget augue dictum, vitae luctus augue pellentesque."
	},
	{
		name: "Blach Ridge",
		image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus elementum risus eget efficitur convallis. Maecenas rhoncus venenatis orci sit amet facilisis. Cras non aliquam enim, mattis convallis ipsum. Aenean eu arcu odio. Mauris cursus nec neque vel malesuada. Aliquam tincidunt erat sit amet lacus suscipit rutrum. Suspendisse in faucibus felis, ac rhoncus lectus. Mauris aliquam sed tellus sit amet gravida. Praesent iaculis ligula eget augue dictum, vitae luctus augue pellentesque."
	},
	{
		name: "Cranberry Mount.",
		image: "https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus elementum risus eget efficitur convallis. Maecenas rhoncus venenatis orci sit amet facilisis. Cras non aliquam enim, mattis convallis ipsum. Aenean eu arcu odio. Mauris cursus nec neque vel malesuada. Aliquam tincidunt erat sit amet lacus suscipit rutrum. Suspendisse in faucibus felis, ac rhoncus lectus. Mauris aliquam sed tellus sit amet gravida. Praesent iaculis ligula eget augue dictum, vitae luctus augue pellentesque."
	}
]

//FUNCTION FOR REMOVING ALL CAMPGROUNDS
//ADDING NEW CAMPGROUNDS
//ADDING A COMMENT TO EACH OF THOSE CAMPGROUNDS
function seedDB() {
	Campground.deleteMany({}, function (err) {
		if (err) {
			console.log(err);
		} else
			console.log("removed campgrounds")
		//add campgrounds
		data.forEach(function (seed) {
			Campground.create(seed, function (err, campground) {
				if (err) {
					console.log(err);
				} else {
					console.log("added a campground");
					//create a comment
					Comment.create({
						text: "This place is awesome, just wish it had some wifi.",
						author: "Anthony"
					}, function (err, comment) {
						if (err) {
							console.log(err);
						} else {
							campground.comments.push(comment);
							campground.save();
							console.log("created new comment");
						}
					});
				}
			});
		});
	})
};

module.exports = seedDB;