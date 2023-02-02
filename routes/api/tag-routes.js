const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    // find all tags
    const tagsData = await Tag.findAll({
      // be sure to include its associated Product data
      // JOIN with Product, using the ProductTag through table
      include: [{ model: Product, through: ProductTag, as: "productTags" }],
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // find a single tag by its `id`
    const tagById = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product data
      // JOIN with Product, using the ProductTag through table
      include: [{ model: Product, through: ProductTag, as: "productTags" }],
    });
    if (!tagById) {
      res.status(404).json({ message: "No tag found with that id" });
      return;
    }
    res.status(200).json(tagById);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  // create a new tag
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
