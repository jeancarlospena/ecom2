
// 6:35 video on controller

import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

// add product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body



    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]

    // console.log(image1, image2, image3, image4)
    // filter undefined
    const images = [image1, image2, image3, image4].filter((item) => item !== undefined && item !== false)
    if (images.length > 1) {
      console.log(images)
      console.log(name, description, price, category, subCategory, sizes, bestseller)
    }

    // console.log(images)

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" })
        return result.secure_url
      })
    )

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now()
    }

    const product = new productModel(productData)
    await product.save()

    res.json({ success: true, message: "Product added" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Failed to add" })
  }
}

// list products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products })
  } catch (error) {
    console.log(error.stack)
    res.json({ success: false, message: "Unable to load products" })
  }
}

// get single product
const singleProduct = async (req, res) => {
  console.log('hit')
  try {
    const { productId } = req.body
    const product = await productModel.findById(productId)
    res.json({ success: true, product })
  } catch (error) {
    console.log(error.stack)
    res.json({ success: false, message: "Unable to find product" })
  }
}

// remove product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id)
    res.json({ success: true, message: "Product removed" })
  } catch (error) {
    console.log(error.stack)
    res.json({ success: false, message: "Failed to remove product" })
  }
}

export { addProduct, listProducts, singleProduct, removeProduct }