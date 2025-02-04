import awsSdk from 'aws-sdk';

const ses =  awsSdk.SES({ region: "us-east-2" });

export async function handler(event) {
  try {
    const { name, email, message } = JSON.parse(event.body);

    const params = {
      Source: "rgorowsky@gmail.com",
      Destination: { ToAddresses: ["rgorowsky@gmail.com"] },
      Message: {
        Subject: { Data: "New Contact Form Submission" },
        Body: { Text: { Data: `Name: ${name}\nEmail: ${email}\nMessage: ${message}` } }
      }
    };

    await ses.sendEmail(params).promise();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: JSON.stringify({ message: "Email sent successfully!" })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email" })
    };
  }
}
