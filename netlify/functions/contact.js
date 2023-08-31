const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

const handler = async function (event) {

  const { name, email, subject, message } = JSON.parse(event.body);
  client.setApiKey(SENDGRID_API_KEY);
  const data = {
    to: "test@example.com", // Change to your recipient (your email in this case)
    from: "test@example.com", // Change to your verified sender
    subject: `${subject} from ${name} (${email})`,
    html: `<p>${message}</p>`,
  };

  // function code here
  try {
    await sgMail.send(data);
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        msg: "Message sent successfully",
      }),
    };
  } catch (err) {
    return {
      statusCode: err.code,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        msg: err.message
      }),
    };
  };
};

export { handler };
