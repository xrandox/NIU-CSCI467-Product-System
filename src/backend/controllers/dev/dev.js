/**
 * Developer Database Functions
 */
const User = require("../../models/User");
const Order = require("../../models/Order");
const PartInventory = require("../../models/PartInventory");
const {
  sendOrderConfirmation,
  sendOrderShipped,
} = require("../external/email");
const { getAllPartDetails } = require("../external/parts");

/**
 * Repopulates the inventory of the database so that we can use it for testing.
 * Sets reserved to 0.
 */
const populateInventory = async (req, res, next) => {
  try {
    const allPartDetails = await getAllPartDetails();
    const bulkOps = [];

    for (let i = 0; i < allPartDetails.length; i++) {
      let randomQuantity = Math.floor(Math.random() * 500) + 1;
      const part = allPartDetails[i];
      //give us a static 0 quantity on part number 1 for testing purposes
      if (part.number === 1) {
        randomQuantity = 0;
      }

      bulkOps.push({
        updateOne: {
          filter: { partNumber: part.number },
          update: {
            $set: {
              quantityTotal: randomQuantity,
              quantityReserved: 0,
              quantityAvailable: randomQuantity,
            },
          },
          upsert: true,
        },
      });
    }

    await PartInventory.bulkWrite(bulkOps);

    return res.json({ dev: "Completed populating the inventory" });
  } catch (error) {
    return res.status(400).json({ error: "Something went wrong" });
  }
};

/**
 * Returns the requested parts inventory
 */
const viewInventory = async (req, res, next) => {
  const { id } = req.params;

  const inventory = await PartInventory.findOne({ partNumber: id });

  return res.json(inventory);
};

/**
 * Directly triggers an email to be sent out
 */
const emailCheck = async (req, res, next) => {
  const { orderID, type } = req.body;
  const order = await Order.findById(orderID);
  const customer = await User.findById(order.customer);
  if (type === "shipping") {
    sendOrderShipped(order);
  } else {
    sendOrderConfirmation(order);
  }

  return res.json({
    info: `Sent ${type} email as requested to ${customer.email}`,
  });
};
module.exports = {
  populateInventory,
  viewInventory,
  emailCheck,
};
