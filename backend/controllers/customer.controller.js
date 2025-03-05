import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import Farm from "../models/farmSchema.model.js"

// export const updateUser = async (req, res) => {
// 	const { fullName, goal, username, weight , height , currentPassword, newPassword} = req.body;
// 	// let { profileImg, coverImg } = req.body;

// 	const userId = req.user._id;

// 	try {
// 		let user = await User.findById(userId);
// 		if (!user) return res.status(404).json({ message: "User not found" });

// 		if ((!newPassword && currentPassword) || (!currentPassword && newPassword)) {
// 			return res.status(400).json({ error: "Please provide both current password and new password" });
// 		}

// 		if (currentPassword && newPassword) {
// 			const isMatch = await bcrypt.compare(currentPassword, user.password);
// 			if (!isMatch) return res.status(400).json({ error: "Current password is incorrect" });
// 			if (newPassword.length < 6) {
// 				return res.status(400).json({ error: "Password must be at least 6 characters long" });
// 			}

// 			const salt = await bcrypt.genSalt(10);
// 			user.password = await bcrypt.hash(newPassword, salt);
// 		}

// // 		if (profileImg) {
// // 			if (user.profileImg) {
// // 				// https://res.cloudinary.com/dyfqon1v6/image/upload/v1712997552/zmxorcxexpdbh8r0bkjb.png
// // 				await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0]);
// // 			}

// // 			const uploadedResponse = await cloudinary.uploader.upload(profileImg);
// // 			profileImg = uploadedResponse.secure_url;
			
// // 			//uploadedResponse contains various pieces of information about the uploaded image, such as its URL, public ID, width, height, etc.
// //             //secure_url is a property of uploadedResponse that holds the URL of the uploaded image, which is accessible over HTTPS.
// // 			// profileImg = uploadedResponse.secure_url:
// // 			//This line assigns the secure_url of the uploaded image to the profileImg variable.
// // 			//After this assignment, profileImg will hold the URL of the uploaded image, rather than the original image data or path.
// // 			//Summary:
// // 			//The code uploads an image to Cloudinary and then updates the profileImg variable to hold the URL of the uploaded image. This URL can then be used to display the image on a website or store it in a database for future use.		

// // }


// // 		if (coverImg) {
// // 			if (user.coverImg) {
// // 				await cloudinary.uploader.destroy(user.coverImg.split("/").pop().split(".")[0]);
// // 			}

// // 			const uploadedResponse = await cloudinary.uploader.upload(coverImg);
// // 			coverImg = uploadedResponse.secure_url;
// // 		}

// 		user.fullName = fullName || user.fullName;      //if user pass fullName then we update it  OR just keep old fullName
// 		user.weight = weight || user.weight;
//         user.height = height || user.height;
//         user.goal = goal || user.goal;
// 		user.username = username || user.username;
// 		// user.profileImg = profileImg || user.profileImg;
//         //user.coverImg = coverImg || user.coverImg;

// 		user = await user.save();

// 		// password should be null in response not in database
// 		user.password = null; 

// 		return res.status(200).json(user);
// 	} catch (error) {
// 		console.log("Error in updateUser: ", error.message);
// 		res.status(500).json({ error: error.message });
// 	}
// };


/** 
 * @desc Create a new farm
 * @route POST /api/farms
 * @access Public
 */
export const createFarm = async (req, res) => {
  try {
    const { name, address, city, state, district, pincode, latitude, longitude, products, contacts } = req.body;

    if (!name || !address || !city || !state || !district || !pincode || !latitude || !longitude || !products || !contacts) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newFarm = new Farm({
      name,
      address,
      city,
      state,
      district,
      pincode,
      location: { type: "Point", coordinates: [longitude, latitude] }, // [longitude, latitude]
      products,
      contacts,
    });

    await newFarm.save();
    res.status(201).json({ message: "Farm created successfully", farm: newFarm });
  } catch (error) {
    console.error("Error creating farm:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/** 
 * @desc Get all farms
 * @route GET /api/farms
 * @access Public
 */
export const getAllFarms = async (req, res) => {
  try {
    const farms = await Farm.find();
    res.status(200).json(farms);
  } catch (error) {
    console.error("Error fetching farms:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/** 
 * @desc Get nearby farms based on location
 * @route GET /api/farms/nearby?latitude=18.9253&longitude=72.8245&radius=10
 * @access Public
 */
export const getNearbyFarms = async (req, res) => {
  try {
    const { latitude, longitude, radius } = req.query;

    if (!latitude || !longitude || !radius) {
      return res.status(400).json({ error: "Latitude, longitude, and radius are required" });
    }

    const radiusInRadians = parseFloat(radius) / 6378.1; // Convert km to radians

    const farms = await Farm.find({
      location: {
        $geoWithin: {
          $centerSphere: [[parseFloat(longitude), parseFloat(latitude)], radiusInRadians],
        },
      },
    });

    res.status(200).json(farms);
  } catch (error) {
    console.error("Error fetching nearby farms:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
