var orderEmailTemplate = `
<!DOCTYPE html>
<html>
  <head>
      <title>[title]</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              font-size: 14px;
              line-height: 1.5;
              margin: 0;
              padding: 0;
          }

          table {
              padding-top:20px;
              width: 100%;
          }

          th, td {
              padding: 10px;
              text-align: left;
          }

          th {

              font-weight: bold;
              background-color: #101820FF;
              color: #FFFFFF;
          }

          h1, h2, h3, p {
              margin: 0;
              padding: 0;
          }

          .header {
              background-color: #101820FF;
              padding: 20px;
              text-align: center;
              color: #FFFFFF;
          }

          .content {
              padding: 20px;
          }

          .footer {
              background-color: #101820FF;
              padding: 20px;
              text-align: center;
              color: #FFFFFF;
              font-weight: bold;
          }
          .container {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              margin: 20px 30px;
          }
          .col {
              flex-basis: 50%;
          }
          .message {
              color: #808080;
              text-align: center;
          }
      </style>
  </head>
  <body>
      <div class="header">
          <h1>[header]</h1>
      </div>
      <div class="content">

          <div class="message">
            [message]
          </div>



          <table>
              <thead>
                  <tr>
                      <th width="75%">Order Confirmation #</th>
                      <th width="25%">[orderID]</th>
                  </tr>
              </thead>
              <tbody>
                [orderDetails]
                [shippingAndHandling]
              </tbody>
              <tfoot>
                  <tr>
                      <th width="75%">Total</th>
                      <th width="25%">$[total]</th>
                  </tr>
              </tfoot>
          </table>

          <div class="container">
              <div class="col">
                <h2>Delivery Address</h2>
                [address]
              </div>

              [date]
          </div>   
      </div>
      <div class="footer">
          <p>This is an automated email. Please do not reply.</p>
      </div>
  </body>
</html>`;
module.exports = orderEmailTemplate;
