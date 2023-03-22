# NIU-CSCI467-Product-System

# Problem Statement
> As a group of software engineers with a company that sells auto parts via a catalog and mail order, you are tasked to build a new system that enables Internet customers to place and pay for orders online. The system will handle credit card payment, assist in packing and shipping of the order, and keep inventory.

> Internet customers will be presented with a custom ordering program that allows them to select products from a catalog. Each product is displayed with its name, description, picture, price and available quantity. The customer can order products with differing quantities. The system computes the total price, adds shipping and handling charge. Customers then provide their name, email, mailing address and credit card information to finalize the order. Once the credit card is authorized the order is complete and ready for packing and shipping. An email is sent to the customer confirming the order.

> The company already maintains a legacy product database which contains the part number, description, weight, picture link and price for all products it offers. The new system has to interface with this database (details provided later). A suitable database system has to be selected for additionally needed information: such as quantity on hand for each product, and customer orders.

> Credit card authorization is done via an interface to a credit card processing system which requires the credit card number, expiration date and purchase amount. The processing system confirms with an authorization number (details provided later).

> A second interface to the new system will run on workstations in the warehouse: there workers can print packing lists for completed orders, retrieve the items from the warehouse, package them up, add an invoice and shipping label (both printed with the new system). Successful packing and shipping completes the order and is recorded in the order status. An email is sent to the customer confirming that the order has shipped.

> A third interface also runs in the warehouse, at the receiving desk. Whenever products are delivered they are added to the inventory: they can be recognized by their description or part number. Their quantity on hand is updated. Note that the legacy product database does not contain inventory information.

> And lastly, there will be an administrative interface that allows to set the shipping and handling charges, as well as view all orders. Shipping and handling charges are based on the weight of a complete order. This interface allows to set the weight brackets and their charges. Orders can be searched based on date range, status (authorized, shipped) or prize range. The complete order detail is displayed for a selected order.

# How-to

### Requires:
- Node.js + npm -> https://nodejs.org/en/download/

### Recommended: 
- Github Desktop (Repo Management) -> https://desktop.github.com/
- Visual Studio Code (IDE) -> https://code.visualstudio.com/download
- Postman (Backend Testing) -> https://www.postman.com/downloads/

### Set-up
- After installing node.js, clone the repo
- Open with Visual Studio Code
- Install dependencies
  - `Terminal` -> `New Terminal`
  - I recommend using yarn over npm. If you don't have yarn installed, `npm install --global yarn`
  - If you don't have nodemon installed already, `npm install --global nodemon`
  - `cd src/frontend` -> `yarn install`
  - `cd ../backend` -> `yarn install`
- Set up database credentials
  - Create a copy of the `.example` file in the `/backend/` directory named `.env`
  - Update the credentials with the credentials from our discord
- Start local server
  - While in the backend directory, do `npm run dev`
- Start local client
  - With the server running, open a new terminal with Ctrl+Shift+\` 
  - Drag the server terminal to the right side of the console so that you can see both terminals
  - In the new terminal, cd into the frontend folder `cd src/frontend`
  - While in the `/frontend/` folder, do `npm start`
  - The development server should automatically open
  
Both the server and client should automatically update when you save changes to their respective files. Ctrl+C in their terminal if you need to terminate either one.

If you have any issues, ping null in the discord 
