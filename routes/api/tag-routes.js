const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    // find all tags
    const tagsData = await Tag.findAll({
      // be sure to include its associated Product data
      // JOIN with Product, using the ProductTag through table
      include: [{ model: Product, through: ProductTag, as: "taggedProducts" }],
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
      include: [{ model: Product, through: ProductTag, as: "taggedProducts" }],
    });
    if (!tagById) {
      res.status(404).json({ message: "No tag found with that id!" });
      return;
    }
    res.status(200).json(tagById);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new tag
router.post("/", async (req, res) => {
  try {
    const newTag = await Tag.create();

    res.status(201).json(newTag);
  } catch (err) {
    req.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json(updateTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try {
      const deleteTag = await Tag.destroy({
          where: {
              id: req.params.id,
          },
      });
      if (!deleteTag) {
          res.status(404).json({ message: "No tag found with that id!" });
          return;
      }

      res.status(200).json(deleteTag);
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;
