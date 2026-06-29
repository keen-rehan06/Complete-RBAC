export const createProduct = async (req, res) => {

  res.json({
    success: true,
    message: "Product Created Successfully",
  });

};

export const deleteProduct = async (req, res) => {

  res.json({
    success: true,
    message: "Product Deleted Successfully",
  });

};

export const viewProduct = async (req, res) => {

  res.json({
    success: true,
    message: "All Products",
  });

};