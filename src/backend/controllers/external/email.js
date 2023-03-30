require("dotenv").config();
const nodemailer = require("nodemailer");
const User = require("../../models/User");
const orderEmailTemplate = require("../../views/orderEmailTemplate");
const axios = require("axios");
const { getPartDetails, getAllPartDetails } = require("./parts");
const Order = require("../../models/Order");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendOrderConfirmation = async (order) => {
  try {
    const [user, orderDetails, address] = await Promise.all([
      User.findOne({ _id: order.customer }),
      generateOrderDetailsHTML(order.parts),
      generateAddressHTML(order.shippingAddress),
    ]);
    //const user = await User.findOne({ _id: order.customer });
    //const orderDetails = await generateOrderDetailsHTML(order.parts);
    //const address = await generateAddressHTML(order.shippingAddress);

    if (!user) {
      return console.log("Failed to send confirmation email - No user found");
    }

    const message = `<h2 style="color:#000000;">Thank you for your order!</h2>
      <p>Hello, ${user.username}!</p>
      <p>This email is confirming your recent order, #${order._id}.</p>
      <p>Below are the details of your order. If you see something wrong with your purchase, please reach out to us immediately!</p>`;
    const header = `Order Confirmation`;
    const sh = `
    <tr>
      <td width="75%">Shipping and Handling Fee</th>
      <td width="25%">$${order.shippingAndHandling}</th>
    </tr>`;
    const date = "";
    let html = orderEmailTemplate
      .replace("[title]", header)
      .replace("[header]", header)
      .replace("[message]", message)
      .replace("[orderID]", order._id)
      .replace("[orderDetails]", orderDetails)
      .replace("[shippingAndHandling]", sh)
      .replace("[total]", order.total)
      .replace("[address]", address)
      .replace("[date]", date);
    const email = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `Order Confirmation: Order #${order._id}`,
      html: html,
    };

    const info = await transporter.sendMail(email);
    console.log(`Confirmation Email sent to ${user.email}: ${info.messageId}`);
  } catch (error) {
    console.log(error);
  }
};

const sendOrderShipped = async (order) => {
  try {
    const [user, orderDetails, address, date] = await Promise.all([
      User.findOne({ _id: order.customer }),
      generateOrderDetailsHTML(order.parts),
      generateAddressHTML(order.shippingAddress),
      generateEstimatedDeliveryDate(),
    ]);
    //const user = await User.findOne({ _id: order.customer });
    //const orderDetails = await generateOrderDetailsHTML(order.parts);
    //const address = await generateAddressHTML(order.shippingAddress);
    //const date = await generateEstimatedDeliveryDate();

    if (!user) {
      return console.log("Failed to send confirmation email - No user found");
    }

    const message = `
      <h2 style="color:#000000;">Good news, ${user.username}, your order has shipped!</h2>
      <p>You can expect your parts to arrive in 3-5 business days.</p>
      <p>Below are the details of your order.</p>`;
    const header = `Shipping Confirmation`;
    const sh = `
      <tr>
        <td width="75%">Shipping and Handling Fee</th>
        <td width="25%">$${order.shippingAndHandling}</th>
      </tr>`;

    let html = orderEmailTemplate
      .replace("[title]", header)
      .replace("[header]", header)
      .replace("[message]", message)
      .replace("[orderID]", order._id)
      .replace("[orderDetails]", orderDetails)
      .replace("[shippingAndHandling]", sh)
      .replace("[total]", order.total)
      .replace("[address]", address)
      .replace("[date]", date);
    const email = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `Order Shipped`,
      html: html,
    };

    order.status = "Shipped";
    order.save();

    const info = await transporter.sendMail(email);
    console.log(`Shipping Email sent to ${user.email}: ${info.messageId}`);
  } catch (error) {
    console.log(error);
  }
};

const generateOrderDetailsHTML = async (parts) => {
  try {
    const allPartDetails = await getAllPartDetails();
    const partDetails = parts.map((part) => {
      const partDetail = allPartDetails.find(
        (p) => p.number === part.partNumber
      );
      return `<tr>
                <td width="75%">${partDetail.description} (${
        part.quantity
      })</td>
                <td width="25%">$${partDetail.price * part.quantity}</td>
              </tr>`;
    });

    return partDetails.join("");
  } catch (error) {
    console.log(error);
    return null;
  }
};

const generateAddressHTML = async (address) => {
  let html = `
    <p>${address.name}</p>
    <p>${address.street}</p>
    <p>${address.city}, ${address.state} ${address.zip}</p>
    <p>${address.country}</p>`;
  return html;
};

const generateEstimatedDeliveryDate = async () => {
  let deliveryDate = new Date();
  let days = 0;

  while (days < 3) {
    deliveryDate.setDate(deliveryDate.getDate() + 1);
    if (deliveryDate.getDay() !== 0 && deliveryDate.getDay() !== 6) days++;
  }

  const formattedDate = deliveryDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  let html = `
  <div class="col" style="text-align:right;margin-right:0">
    <h2>Estimated Delivery</h2>
    <p>${formattedDate}</p>
  </div>`;

  return html;
};

module.exports = {
  sendOrderConfirmation,
  sendOrderShipped,
};
