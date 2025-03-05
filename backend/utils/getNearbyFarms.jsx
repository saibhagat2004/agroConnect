const getNearbyFarms = async (req, res) => {
    const { latitude, longitude, radius } = req.query;
  
    if (!latitude || !longitude || !radius) {
      return res.status(400).json({ error: "Latitude, longitude, and radius are required" });
    }
  
    const farms = await Farm.find({
      location: {
        $geoWithin: {
          $centerSphere: [[parseFloat(longitude), parseFloat(latitude)], parseFloat(radius) / 6378.1],
        },
      },
    });
  
    res.json(farms);
  };
  