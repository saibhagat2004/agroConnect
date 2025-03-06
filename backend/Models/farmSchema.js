import mongoose from "mongoose";

const farmSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  pincode: { type: String, required: true },
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
  products: [
    {
      name: { type: String, required: true }, // Product name
      price: { type: Number, required: true }, // Price per unit
    }
  ],
  contacts: [{ type: String, required: true }], // Array of contact numbers
});

// Index for geospatial search
farmSchema.index({ location: "2dsphere" });

const Farm = mongoose.model("Farm", farmSchema);

export default Farm;